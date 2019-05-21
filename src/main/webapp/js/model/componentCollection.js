define(["model/componentCollectionItem","jquery"],
function(ComponentCollectionItem,$)
{
	/**
	 * Class to hold a collection of "subView" items for a Component
	 * @param {Array.<ComponentCollectionItem|ComponentCollectionItem_paramObject>} [items]
	 * @class
	 * @alias ComponentCollection
	 */
	let ComponentCollection=function(items)
	{
		/**
		 * @private
		 * @type {Array}
		 */
		this.items=[];
		if(items) this.pushAll(items);

		let _self=this;
		Object.defineProperty(this,"length",{
			get:function()
			{
				return _self.items.length;
			}
		});
	};
	/**
	 * {@link ComponentCollectionItem} class of collection(items)
	 * @static
	 * @protected
	 * @readonly
	 * @type {Function}
	 */
	ComponentCollection.prototype.itemClass=ComponentCollectionItem;
	/**
	 * (create and) add new item
	 * @public
	 * @param {ComponentCollectionItem|ComponentCollectionItem_paramObject} item
	 * @param {Number} [index]
	 * @returns {ComponentCollectionItem}
	 */
	ComponentCollection.prototype.push=function(item,index)
	{
		let addedItem=this.get(item);
		if(addedItem)
		{
			this.remove(addedItem);
			item=addedItem;
		}
		else if(!(item instanceof this.itemClass))
		{
			let collectionItem=new this.itemClass(item);
			item = collectionItem;
		}
		if(index==null) index=this.items.length;
		this.items.splice(index,0,item);
		return item;
	};
	/**
	 * push all items in array
	 * @public
	 * @param {Array.<ComponentCollectionItem|ComponentCollectionItem_paramObject>} array
	 * @returns {number} new count of items
	 */
	ComponentCollection.prototype.pushAll=function(array)
	{
		for(let i=0; i<array.length; i++)
		{
			this.push(array[i]);
		}
		return this.items.length;
	};

	/**
	 * find the CollectionItem for a component
	 * @public
	 * @param {ComponentCollectionItem|Component} item
	 * @returns {Number} index or -1
	 */
	ComponentCollection.prototype.indexOf=function(item)
	{
		if(!item) return -1;
		if (item instanceof this.itemClass)
		{
			return this.items.indexOf(item);
		}
		let component=item;
		//unwrap ComponentCollectionItem_paramObject
		if(item.component) component=item.component;
		for(let i=0; i<this.items.length; i++)
		{
			if(this.items[i].component===component)
			{
				return i;
			}
		}
		return -1;
	};
	/**
	 * find the CollectionItem for a component
	 * @public
	 * @param {ComponentCollectionItem|Component} component
	 * @returns {ComponentCollectionItem|Null}
	 */
	ComponentCollection.prototype.get=function(component)
	{
		let index=this.indexOf(component);
		if(index!==-1)return this.items[index];
		return null;
	};
	/**
	 * forward {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Syntax array.prototype.forEach} function
	 * and makes it safe for manipulation.
	 * @public
	 * @param {Function} fn
	 * @param {Any} [scope]
	 * @returns {undefined}
	 */
	ComponentCollection.prototype.forEach=function(fn,scope)
	{
		return this.items.slice().forEach(fn,scope);
	};
	/**
	 * forward {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Syntax array.prototype.map} function
	 * @param {Function} fn
	 * @param {Any} [scope]
	 * @returns {Any[]}
	 */
	ComponentCollection.prototype.map=function(fn,scope)
	{
		return this.items.map(fn,scope);
	};
	/**
	 * Load all items.
	 * The returned Promise is resolved when every item is loaded, but rejected as soon as the first item failed to load.
	 * @returns {Thenable} resolves to this
	 */
	ComponentCollection.prototype.loadAll=function()
	{
		let promises=this.items.map(function(item)
		{
			return item.load();
		});
		let _self=this;
		return $.when.apply($,promises)
		.then(function()
		{
			return _self;
		});
	};
	/**
	 * Render all items.
	 * The returned Promise is resolved when every item is rendered, but rejected as soon as the first item failed to render.
	 * @param {Boolean} [skipRendered=false] - does not render component when component.rendered is true
	 * @returns {Thenable} resolves to this
	 */
	ComponentCollection.prototype.renderAll=function(skipRendered)
	{
		let promises=this.items.map(function(item)
		{
			return item.render(skipRendered);
		});
		let _self=this;
		return $.when.apply($,promises).then(function()
		{
			return _self;
		});
	};
	/**
	 * remove item from the collection
	 * @param {ComponentCollectionItem|Component} component
	 * @returns {boolean}
	 */
	ComponentCollection.prototype.remove=function(component)
	{
		let index=this.indexOf(component);
		if(index!==-1)
		{
			this.items.splice(index,1);
			return true;
		}
		return false;
	};
	/**
	 * remove all irems from the collection
	 * @returns {undefined}
	 */
	ComponentCollection.prototype.clear=function()
	{
		this.items.length=0;
	};

	/**
	 * forward {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find#Syntax array.prototype.find} function
	 * also polyfills for IE
	 * @param {Function} predicate
	 * @param {Any} scope
	 * @returns {*}
	 */
	ComponentCollection.prototype.find=function(predicate,scope)
	{
		//workaround because IE doesn't support Array.find
		//TODO replace with Array.find when possible
		/*
		return this.items.find(predicate,scope);
		/*/
		for(let i=0; i<this.items.length; i++)
		{
			let item=this.items[i];
			if(predicate.call(scope,item,i,this.items))
			{
				return item;
			}
		}
		//*/
		return undefined;
	};
	/**
	 * get an item by its {@link Component.componentID componentID}
	 * uses path if the item is not loaded
	 * @param {String} id
	 * @returns {ComponentCollectionItem}
	 */
	ComponentCollection.prototype.getByComponentID=function(id)
	{
		return this.find(function(item)
		{
			if(item.isLoaded())
			{
				return item.component.componentID===id;
			}
			else
			{
				// ends with "/"+id or is the complete path
				return item.path.slice(item.path.lastIndexOf("/"+id)+1)===id;
			}
		});
	};

	/**
	 * get an item by its {@link Component.el Element}
	 * @param {Element} element
	 * @returns {ComponentCollectionItem|null}
	 */
	ComponentCollection.prototype.getByElement=function(element)
	{
		return this.find(function(item)
		{
			return item.isLoaded()&&item.component.el===element;
		});
	};

	/**
	 * implements {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Syntax array.prototype.filter} function
	 * but returns the items filtered out instead!
	 * @param {Function} filter
	 * @param {Any} [scope]
	 * @returns {Array} items filtered out
	 */
	ComponentCollection.prototype.filter=function(filter,scope)
	{
		let removed=[];
		for(let i=0; i<this.items.length; i++)
		{
			if(!filter.call(scope,this.items[i],i,this.items))
			{
				removed.push(this.items[i]);
				this.items.splice(i--,1);
			}
		}
		return removed;
	};

	return ComponentCollection;
});