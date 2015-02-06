Ext.define('WebConsole.BundlesDependenciesPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bundlesdependenciespanel',

	initComponent : function() {
		var drawComponent = Ext.create('Ext.draw.Component', {
			viewBox : false,
			items : [ {
				type : 'circle',
				fill : '#EA3818',
				x : 110,
				y : 110,
				radius : 50
			} ]
		});

		Ext.apply(this, {
			layout : 'border',
			items : drawComponent
		});

		this.callParent(arguments);
	},

	onReloadClick : function() {
		Ext.Ajax.request({
			url : 'service/system',
			success : this.onReloadSuccess,
			failure : WebConsole.onAjaxFailure,
			scope : this
		});
	}

});