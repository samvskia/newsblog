define(["jquery", "underscore", "component/component", "text!template/newsfeed.html"],
    function ($, _, component, template) {

        let contentView = component.extend({

            componentID: "newsfeed",
            template: _.template(template),
            init: function () {

            },
            render: function () {
                component.prototype.render.call(this);
            }


        });
        return contentView;
    });