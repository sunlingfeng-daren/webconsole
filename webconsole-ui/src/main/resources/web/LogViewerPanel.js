Ext.define('WebConsole.LogViewerPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.logviewerpanel',

	initComponent : function() {
		Ext.define('WebConsole.data.LogEntry', {
			extend : 'Ext.data.Model',
			fields : [ {
				name : 'time',
				type : 'long'
			}, {
				name : 'message',
				type : 'string'
			}, {
				name : 'level',
				type : 'string'
			}, {
				name : 'exception',
				type : 'object'
			}, {
				name : 'service',
				type : 'object'
			}, {
				name : 'bundle',
				type : 'object'
			} ]
		});
        Ext.define('WebConsole.data.AboutWindow', {
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
		this.logStore = Ext.create('Ext.data.Store', {
			model : 'WebConsole.data.LogEntry',
			proxy : {
				type : 'ajax',
				url : 'service/log',
				reader : {
					type : 'json'
				}
			},
			sorters : [ {
				property : 'time',
				direction : 'DESC'
			} ],
			autoLoad : false
		});

        this.aboutStore = Ext.create('Ext.data.Store', {
            model : 'WebConsole.data.AboutWindow',
            proxy : {
                type : 'ajax',
                url : 'service/about',
                reader : {
                    type : 'json'
                }
            },
            autoLoad : false
        });

		this.logGrid = Ext.create('Ext.grid.Panel', {
			dockedItems : this._createToolbar(),
			padding : '5',
			region : 'center',
			sortableColumns : false,
			store : this.logStore,
			columns : [ {
				header : 'Time',
				dataIndex : 'time',
				renderer : this._dateRendered,
				width : 150
			}, {
				header : 'Level',
				dataIndex : 'level'
			}, {
				header : 'Message',
				dataIndex : 'message',
				flex : 1
			} ],
			plugins: [ {
				ptype: 'rowexpander',
				rowBodyTpl : [
					'<table style="margin-left: 30px; margin-top: 10px; margin-bottom: 4px;">',
						'<tpl if="exception != null">',
							'<tr>',
								'<td class="x-grid-cell-property">Exception</td>',
								'<td>',
									'<table>',
										'<tr><td colspan="2">{exception.message}</td></tr>',
										'<tpl for="exception.stackTrace">',
											'<tr><td>&nbsp;&nbsp;</td><td>at&nbsp;{className}.{methodName}({fileName}:{lineNumber})</td></tr>',
										'</tpl>',
									'</table>',
								'</td>',
							'</tr>',
						'</tpl>',
						'<tpl if="service != null">',
							'<tr>',
								'<td class="x-grid-cell-property">Service</td>',
								'<td>{service.id}&nbsp;{service.types}</td>',
							'</tr>',
						'</tpl>',
						'<tpl if="bundle != null">',
							'<tr>',
								'<td class="x-grid-cell-property">Bundle</td>',
								'<td>{bundle.symbolicName}&nbsp;({bundle.id})</td>',
							'</tr>',
						'</tpl>',
					'</table>'
				]
			} ]
		});

		Ext.apply(this, {
			layout : 'border',
			items : this.logGrid
		});

		this.callParent(arguments);
	},

	/**
	 * Called on tab activation
	 */
	onActivate : function() {
		//alert('i am activated');
		this.logStore.load();
        this.aboutStore.load();
	},

	_createToolbar : function() {
		this.toolbar = Ext.create('widget.toolbar', {
			items : [ {
				text : 'Reload',
				iconCls : 'reloadIcon',
				handler : this.onReloadClick,
				scope : this
			} ,{
                text : 'about',
                iconCls : 'reloadIcon',
                handler : this.onAboutClick,
                store:this.aboutStore,
                scope : this
            }]
		});

		return this.toolbar;
	},

	_dateRendered : function(jsonLogEntry, metaData) {
		return Ext.util.Format.date(new Date(jsonLogEntry), 'd-m-Y H:i:s');
	},

	onReloadClick : function() {
		this.logStore.load();
	}
    ,

    onAboutClick : function() {

        var store = this.aboutStore.getAt(0);
        //alert(store);
        var componentClass = store.get('componentClass');
        //alert(componentClass);
        Ext.create(componentClass).show();
    }

});