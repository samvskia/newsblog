define(["jquery"],function($)
{
	/**
	 * @typedef {Object} ComponentCollectionItem_paramObject
	 * @property {Component} [component] -  component or path is needed !
	 * @property {String} [path] - path of component
	 * @property {Array} [arguments] - "arguments" for constructor if component is loaded from path
	 * @property {String|Element} [target] - default target for adding
	 */
	/**
	 * Item for {@link ComponentCollection}
	 * @param {String|Component|ComponentCollectionItem_paramObject} path - path of component, component instance or param object
	 * @param {Array} [args] - "arguments" for constructor if component is loaded from path
	 * @param {String|Element} [target] - default target for adding
	 * @class
	 * @alias ComponentCollectionItem
	 */
	let ComponentCollectionItem=function(path,args,target)
	{
		/**
		 * @protected
		 * @type {String}
		 */
		this.path=null;
		/**
		 * @protected
		 * @type {Array}
		 */
		this.arguments=null;
		/**
		 * @public
		 * @type {String|Element}
		 */
		this.target=null;
		/**
		 * @public
		 * @type {Component}
		 */
		this.component=null;

		/**
		 * holds Promise when item should be loaded and prevents multiple calls
		 * @type {null}
		 * @private
		 */
		this._loading=null;

		if(typeof path==="object")
		{
			if(path instanceof require("component/component")) // Component : resolve loop dependency
			{
				this.component=path;
				path=null;
			}
			else
			{
				let param=path;
				ComponentCollectionItem.call(this,
				param.component||param.path,
				param.arguments,
				param.target
				);
				return;
			}
		}
		this.path=path;
		this.arguments=args||[];
		this.target=target;
	};
	/**
	 * load class and make an instance with the items arguments
	 * @public
	 * @returns {Thenable} resolving to the item itself
	 */
	ComponentCollectionItem.prototype.load=function()
	{
		if(this._loading===null);
		{
			let dfd = $.Deferred();
			if(!this.isLoaded()) //has instance
			{
				let _self=this;
				require([_self.path], function (componentClass)
				{
					try
					{
						_self.component = new (Function.prototype.bind.apply(componentClass, [null].concat(_self.arguments)));
						dfd.resolve(_self);
					}
					catch(error)
					{
						dfd.reject(error);
					}
				},dfd.reject);
			}
			else
			{
				dfd.resolve(this);
			}
			this._loading=dfd.promise();
		}
		return this._loading;
	};
	/**
	 * Render the {@link Component} if the item is loaded.
	 * If not return rejected Promise.
	 * @param {Boolean} [skipRendered=false] - does not render component when component.rendered is true
	 * @returns {Thenable|Component|undefined} result of render method of the Component
	 */
	ComponentCollectionItem.prototype.render=function(skipRendered)
	{
		if(!this.isLoaded()) //has instance
		{
			return $.Deferred().reject("item is not loaded yet");
		}
		if(skipRendered&&this.component.rendered)
		{
			return $.Deferred().resolve(this.component).promise();
		}
		return this.component.render();
	};
	/**
	 * @public
	 * @returns {boolean}
	 */
	ComponentCollectionItem.prototype.isLoaded=function()
	{
		return this.component!=null;
	};

	return ComponentCollectionItem;
});