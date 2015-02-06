Ext.define('WebConsole.BundlesPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bundlespanel',

	initComponent : function() {
		Ext.define('WebConsole.data.Bundle', {
			extend : 'Ext.data.Model',
			fields : [ {
				name : 'id',
				type : 'long'
			}, {
				name : 'symbolicName',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			}, {
				name : 'description',
				type : 'string'
			}, {
				name : 'version',
				type : 'string'
			}, {
				name : 'category',
				type : 'string'
			}, {
				name : 'location',
				type : 'string'
			}, {
				name : 'lastModified',
				type : 'long'
			}, {
				name : 'state',
				type : 'string'
			}, {
				name : 'manifestHeaders',
				type : 'object'
			}, {
				name : 'exportedPackages',
				type : 'object'
			}, {
				name : 'importedPackages',
				type : 'object'
			}, {
				name : 'importingBundles',
				type : 'object'
			}, {
				name : 'services',
				type : 'object'
			} ]
		});
		this.bundlesStore = Ext.create('Ext.data.Store', {
			model : 'WebConsole.data.Bundle',
			proxy : {
				type : 'ajax',
				url : 'service/bundles',
				reader : {
					type : 'json',
					root : 'bundles'
				}
			},
			sorters : [ {
				property : 'id',
				direction : 'ASC'
			} ],
			autoLoad : false
		});

		this.bundlesGrid = Ext.create('Ext.grid.Panel', {
			dockedItems : this._createToolbar(),
			padding : '5',
			region : 'center',
			store : this.bundlesStore,
			columns : [ {
				header : 'Id',
				dataIndex : 'id'
			}, {
				header : 'Name',
				dataIndex : 'name',
				flex : 1
			}, {
				header : 'Version',
				dataIndex : 'version'
			}, {
				header : 'Category',
				dataIndex : 'category',
				width : 200
			}, {
				header : 'State',
				dataIndex : 'state'
			}, {
				xtype : 'actioncolumn',
				width : 100,
				align : 'center',
				items : [ {
					getClass : function(v, meta, rec) {
						if (rec.get('state') == 'Active') {
							//this.items[4].tooltip = 'Stop';
							return 'bundle-stop';
						} else {
							//this.items[4].tooltip = 'Start';
							return 'bundle-start';
						}
					},
					handler : this.executeAction,
					scope : this
				}, {
					icon : 'css/images/bundle_refresh.png',
					tooltip : 'Refresh package imports',
					handler : this.onRefreshPackageImportsClick
				}, {
					icon : 'css/images/bundle_update.png',
					tooltip : 'Update',
					handler : this.onUpdateClick
				}, {
					icon : 'css/images/bundle_delete.png',
					tooltip : 'Uninstall',
					handler : this.onUninstallClick,
					scope : this
				}]
			} ],
			plugins : [ {
				ptype : 'rowexpander',
				rowBodyTpl : [
					'<table style="margin-left: 30px; margin-top: 10px; margin-bottom: 4px;">',
						'<tr><td class="x-grid-cell-property">Symbolic Name</td><td>{symbolicName}</td></tr>',
						'<tr><td class="x-grid-cell-property">Bundle Location</td><td>{location}</td></tr>',
						'<tr><td class="x-grid-cell-property">Last Modified</td><td>{lastModified:date("d-m-Y h:i:s")}</td></tr>',
						'<tr><td class="x-grid-cell-property">Description</td><td>{description}</td></tr>',
						'<tpl if="services.length &gt; 0">',
							'<tr>',
								'<td class="x-grid-cell-property">Registered Services</td>',
								'<td>',
									'<table>',
										'<tpl for="services">',
											'<tr>',
												'<td class="x-grid-cell-property">{id}</td>',
												'<td>',
													'<tpl for="types">',
														'{.}<br/>',
													'</tpl>',
												'</td>',
											'</tr>',
										'</tpl>',
									'</table>',
								'</td>',
							'</tr>',
						'</tpl>',
						'<tr>',
							'<td class="x-grid-cell-property">Exported Packages</td>',
							'<td>',
								'<table>',
									'<tpl for="exportedPackages">',
							'			<tr><td class="x-grid-cell-property">{name}</td><td>{version}</td></tr>',
									'</tpl>',
								'</table>',
							'</td>',
						'</tr>',
						'<tpl if="importedPackages.length &gt; 0">',
							'<tr>',
								'<td class="x-grid-cell-property">Imported Packages</td>',
								'<td>',
									'<table>',
										'<tpl for="importedPackages">',
											'<tr>',
												'<td class="x-grid-cell-property">{name}</td>',
												'<td>{version}</td>',
												'<td style="padding-left: 10px">from&nbsp;{exportingBundle.symbolicName}&nbsp;({exportingBundle.id})</td>',
											'</tr>',
										'</tpl>',
									'</table>',
								'</td>',
							'</tr>',
						'</tpl>',
						'<tpl if="importingBundles.length &gt; 0">',
							'<tr>',
								'<td class="x-grid-cell-property">Importing Bundles</td>',
								'<td>',
									'<tpl for="importingBundles">',
										'{symbolicName}&nbsp;({id})<br/>',
									'</tpl>',
								'</td>',
							'</tr>',
						'</tpl>',
						'<tr>',
							'<td class="x-grid-cell-property">Manifest Headers</td>',
							'<td>',
								'<table>',
									'<tpl for="manifestHeaders">',
										'<tr><td class="x-grid-cell-property">{key}</td><td>{value}</td></tr>',
									'</tpl>',
								'</table>',
							'</td>',
						'</tr>',
						'</table>'
				]
			}]
		});

		Ext.apply(this, {
			layout : 'border',
			items : [
				this.bundlesGrid
			]
		});

		this.callParent(arguments);
	},

	onActivate : function() {
		this.bundlesStore.load();
	},

	_createToolbar : function() {
		var toolbar = Ext.create('widget.toolbar', {
			items : [ {
				text : 'Reload',
				icon : 'css/images/reload.png',
				handler : this.onReloadClick,
				scope : this
			}, '-', {
				text : 'Install',
				handler : this.onBundleInstallClick,
				scope : this
			} ]
		});

		return toolbar;
	},

	onReloadClick: function() {
		this.bundlesStore.load();
	},

	executeAction : function(grid, rowIndex, colIndex) {
		var rec = grid.getStore().getAt(rowIndex);
		var action = rec.get('state') == 'Active' ? 'stop' : 'start';
		var bundleId = rec.get('id');

		this.doExecuteAction(action, bundleId);
	},

	doExecuteAction : function(action, bundleId) {
		Ext.Ajax.request({
			url : 'service/bundles',
			params : {
				action : action,
				bundleId : bundleId
			},
			success : this.onStopClickSuccess,
			failure : WebConsole.onAjaxFailure,
			scope : this
		});
	},

	onStopClick : function(grid, rowIndex, colIndex) {
		var rec = grid.getStore().getAt(rowIndex);
		var bundleId = rec.get('id');
		Ext.Ajax.request({
			url : 'service/bundles',
			params : {
				bundleId : bundleId
			},
			success : this.onStopClickSuccess,
			failure : WebConsole.onAjaxFailure,
			scope : this
		});
	},

	onStopClickSuccess : function(response) {
		this.bundlesStore.load();
	},

	onUninstallClick : function(grid, rowIndex, colIndex) {
		var rec = grid.getStore().getAt(rowIndex);
		var bundleId = rec.get('id');
		this.doExecuteAction('uninstall', bundleId);
	},

	onUpdateClick : function() {
		alert('Updating...');
	},
	
	onRefreshPackageImportsClick : function() {
		alert('on refresh pkg imports..');
	},

	readBundle : function(bundleId) {
		Ext.Ajax.request({
			url : 'service/bundles/read',
			params : {
				bundleId : bundleId
			},
			success : this.onReadBundleSuccess,
			failure : WebConsole.onAjaxFailure,
			scope : this
		});
	},

	onReadBundleSuccess : function(response) {
		var jsonData = Ext.decode(response.responseText);
		this.bundleInfoPanel.setBundle(jsonData);
	},
	
	onBundleInstallClick : function() {
		var win = Ext.create('widget.bundleinstallwindow', {
			listeners : {
				scope : this,
				bundleinstalled : this.onBundleInstalled
			}
		});

		win.show();
	},

	onBundleInstalled : function(win) {
		this.bundlesStore.load();
	}

});