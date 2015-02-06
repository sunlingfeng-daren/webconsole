Ext.define('hello.HelloWindow',{
	extend : 'Ext.window.Window',

	initComponent : function() {
		Ext.apply(this, {
			width : 400,
			height : 300,
			modal : true,
			title : 'Hello Extension',
			layout : 'fit',
			html : '<br/><center><strong>Hello! I am a very simple OSGi Web Console extension! Enjoy using me :)</strong></center>',
			buttons : [ {
				xtype : 'button',
				text : 'Close',
				scope : this,
				handler : this.destroy
			} ]
		});

		this.callParent(arguments);
	}

});
