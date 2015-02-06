// Responsible for displaying all tabs
Ext.define('WebConsole.MainPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.mainpanel',

	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				title : 'Bundles',
				iconCls : 'tabIcon',
				xtype : 'bundlespanel',
				listeners : {
					activate : function(tab){
						tab.onActivate(); // TODO CHECK IF DEFINED
					}
				}
			}, {
				title : 'Services',
				iconCls : 'tabIcon',
				xtype : 'servicespanel',
				listeners : {
					activate : function(tab){
						tab.onActivate(); // TODO CHECK IF DEFINED
					}
				}
			}, {
				title : 'Bundles Dependencies',
				iconCls : 'tabIcon',
				xtype : 'bundlesdependenciespanel'
			}, {
				title : 'System Information',
				iconCls : 'tabIcon',
				xtype : 'systeminfopanel',
				listeners : {
					activate : function(tab){
						tab.onActivate(); // TODO CHECK IF DEFINED
					}
				}
			}, {
				title : 'Groovy Console',
				iconCls : 'tabIcon',
				xtype : 'groovyconsolepanel'
			}, {
				title : 'Log Viewer',
				iconCls : 'tabIcon',
				xtype : 'logviewerpanel',
				listeners : {
					activate : function(tab){
						tab.onActivate(); // TODO CHECK IF DEFINED
					}
				}
			}, {
				title : 'Extensions',
				iconCls : 'tabIcon',
				xtype : 'extensionspanel',
				listeners : {
					activate : function(tab){
						tab.onActivate(); // TODO CHECK IF DEFINED
					}
				}
			} ]
		});

		this.callParent(arguments);
	}

});