Ext.define('WebConsole.ExtensionsPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.extensionspanel',

	initComponent : function() {
		Ext.define('WebConsole.data.Extension', {
			extend : 'Ext.data.Model',
			fields : [ {
				name : 'id',
				type : 'long'
			}, {
				name : 'name',
				type : 'string'
			}, {
				name : 'description',
				type : 'string'
			}, {
				name : 'bundle',
				type : 'object'
			}, {
				name : 'componentClass',
				type : 'string'
			},{
                name : 'resources',
                type : 'string'
            } ]
		});

		this.extensionsStore = Ext.create('Ext.data.Store', {
			model : 'WebConsole.data.Extension',
			proxy : {
				type : 'ajax',
				url : 'service/extensions',
				reader : {
					type : 'json',
					root : 'extensions'
				}
			},
			sorters : [ {
				property : 'name',
				direction : 'ASC'
			} ],
			autoLoad : false
		});

		this.extensionsGrid = Ext.create('Ext.grid.Panel', {
			dockedItems : this._createToolbar(),
			padding : '5',
			region : 'center',
			sortableColumns : false,
			store : this.extensionsStore,
			columns : [ {
				header : 'Id',
				dataIndex : 'id'
			}, {
				header : 'Name',
				dataIndex : 'name'
			}, {
				header : 'Description',
				dataIndex : 'description',
				flex : 1
			}, {
				header : 'Bundle',
				dataIndex : 'bundle',
				width : 300,
				renderer : this._bundleRenderer
			}, {
				header : 'Component Class',
				dataIndex : 'componentClass',
				width : 250
			}, {
				xtype : 'actioncolumn',
				width : 50,
				align : 'center',
				items : [ {
					icon : 'css/images/extension_go.png', // Use a URL in the icon config
					tooltip : 'Run this extension',
					handler : this.onRunExtensionClick
				} ]
			} ]
		});

		Ext.apply(this, {
			layout : 'border',
			items : this.extensionsGrid
		});

		this.callParent(arguments);
	},

	onActivate : function() {
		this.extensionsStore.load();
	},

	_createToolbar : function() {
		this.toolbar = Ext.create('widget.toolbar', {
			items : [ {
				text : 'Reload',
				icon : 'css/images/reload.png',
				handler : this.onReloadClick,
				scope : this
			} ]
		});

		return this.toolbar;
	},

	_bundleRenderer : function(jsonBundle) {
		return jsonBundle.symbolicName + ' (' + jsonBundle.id + ')';
	},

	onReloadClick : function() {
		this.extensionsStore.load();
	},

	onRunExtensionClick : function(grid, rowIndex, colIndex) {
		var store = grid.getStore();
		var rec = store.getAt(rowIndex);
		var componentClass = rec.get('componentClass');
		var extensionWin = Ext.create(componentClass);
		extensionWin.show();
	}

});