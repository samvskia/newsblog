define(["jquery", "model/componentCollection"],
    function ($, ComponentCollection) {
        let Component = function () {

            this.parent = null;

            this.subViews = new ComponentCollection();

            this.rendered = false;
            this.$el = (!this.el) ? $("<div>"): $(this.el);

            this.el = this.$el[0];
            this.$el.addClass(this.componentID);
            this.$ = this.$el.find.bind(this.$el);

            this.delegateEvents();

            this.init.apply(this, arguments);
            delete this.init;

        };

        Component.prototype.init = function () {};

        Component.prototype.events = {};

        Component.prototype.globalEvents = {};

        Component.prototype.delegateEvents = function () {
            if (typeof this.events == "function") this.events = this.events();
            if (!Array.isArray(this.events)) {
                // transform events into an array of [type,selector,boundFunction]
                let events = [];

                for (let key in this.events) {
                    let split = key.split(/\s+/);
                    let type = split[0];
                    let selector = split.slice(1).join(" ");

                    let func = null;
                    let listeners = this.events[key];
                    if (!Array.isArray(listeners)) listeners = [listeners];
                    // this is not working in IE 11
                    //TODO replace with for...of on IE support
                    for (let i = 0; i < listeners.length; i++) {
                        let listener = listeners[i];
                        if (typeof listener == "function") {
                            func = listener.bind(this);
                        } else if (listener in this) {
                            func = this[listener].bind(this);
                        } else {
                            throw new SyntaxError("no method " + listener + " in component " + this.componentID);
                        }
                        events.push({
                            type: type,
                            selector: selector,
                            fn: func
                        });
                    }
                }
                this.events = events;
            }
            //delegate events
            for (let i = 0; i < this.events.length; i++) {
                let event = this.events[i];
                this.$el.on(event.type, event.selector, event.fn);
            }

        };

        Component.prototype.render = function (renderParam) {
            let htmlContent = this.template({
                param: renderParam,
                translation: this.translation
            });
            this.$el.html(htmlContent);
            this.rendered = true;
            return this;
        };

        Component.prototype.addSubView = function (subView, target, index) {
            let collectionItem = this.subViews.push(subView, index);
            let _self = this;
            return collectionItem.load()
                .then(function () {
                    let subComponent = collectionItem.component;
                    subComponent._setParent(_self);
                    _self.addSubViewToDom(collectionItem, target);
                    return subComponent;
                });
        };

        Component.prototype.addSubViewToDom = function (collectionItem, target)
        {
            collectionItem = this.subViews.get(collectionItem);
            if (!collectionItem || !collectionItem.isLoaded()) return;

            let $target = this.$el;
            if (target) collectionItem.target = target;
            //$.find() doesn't find itself so prevent that
            if (collectionItem.target && collectionItem.target !== this.el) $target = this.$(collectionItem.target);

            if ($target.length == 0)
            {
                let _self = this;
                require(["logger!" + this.componentID], function (logger)
                {
                    logger.error("could not find target container: " + collectionItem.target, _self, collectionItem);
                });
            }
            $target.append(collectionItem.component.el);
        };

        Component.prototype.detachSubView = function (subView) {
            if (this.subViews.remove(subView)) {
                if (!(subView instanceof Component)) {//ComponentCollectionItem
                    if (!subView.component) {
                        return true;
                    }
                    subView = subView.component;
                }
                this.stopListening(subView);
                subView.parent = null;
                subView.$el.detach();
                return true;
            }
            return false;
        };

        Component.prototype._setParent = function (parentComponent)
        {
            // detach from different parent
            if (this.parent && this.parent != parentComponent) this.parent.detachSubView(this);
            this.parent = parentComponent;
        };

        Component.prototype.destroy = function () {
            if (this.parent) this.parent.detachSubView(this);
            this.$el.remove();
            this.undelegateEvents();
            this.unbindGlobalEvent();

            if (this.busy) {
                if (this.isDestroyed) return; // prevent multiple calls while component is busy
                this.isDestroyed = true;
                let _self = this;
                return this.busy.then(function () {
                    _self.destroy();
                });
            }
            this.subViews.forEach(function (subViewItem) {
                if (subViewItem.component) {
                    subViewItem.component.parent = null;
                    subViewItem.component.destroy();
                }
            });
            this.subViews.clear();
            if (this.parent && !this.parent.isDestroyed) this.parent.detachSubView(this);
            this.$el.remove();

            for (let key in this) {
                this[key] = null;
            }
            this.isDestroyed = true;

            return $.Deferred().resolve().promise();
        };

        Component.extend = function (prototype, abstract)
        {
            if (typeof prototype.template === "string") prototype.template = _.template(prototype.template);
            if (!abstract)
            {
                if (!("componentID" in prototype))
                {
                    throw "no componentID";
                }
                if (typeof prototype.template !== "function" && typeof this.prototype.template !== "function")
                {
                    throw "no template (function)";
                }
            }


            let newClass = function ()
            {
                if (abstract && this.constructor === newClass) throw new SyntaxError("can not instantiate abstract class");
                Component.apply(this, arguments);
            };
            newClass.prototype = Object.create(this.prototype);
            $.extend(newClass.prototype, prototype);
            newClass.prototype.constructor = newClass;
            newClass.extend = Component.extend;

            return newClass;
        };

        return Component;
    });
