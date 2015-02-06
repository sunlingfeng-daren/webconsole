/**
 * The main WebConsole application.
 * 
 * @author Daniel Pacak
 */
Ext.define('WebConsole', {
	extend : 'Ext.container.Viewport',

	initComponent : function() {
		Ext.apply(this, {
			layout : 'border',
			padding : 5,
			items : [ {
				xtype : 'box',
				id : 'header',
				region : 'north',
				html : '<h1>OSGi Web Console</h1>',
				height : 30
			},

			this.createMainPanel() ]
		});

		this.callParent(arguments);
	},

	createMainPanel : function() {
		this.mainPanel = Ext.create('widget.mainpanel', {
			region : 'center'
		});
		return this.mainPanel;
	},

	statics : {
		/**
		 * A generic Ajax call failure handler that displays the error message.
		 */
		onAjaxFailure : function(response) {
			Ext.MessageBox.show({
				title : 'Application Error',
				msg : 'There was a problem processing your request. Please try again later or contact your system administrator.',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		}
	}

});