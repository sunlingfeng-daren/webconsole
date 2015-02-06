Ext.define('WebConsole.SystemInfoPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.systeminfopanel',

	initComponent : function() {
		this.systemInfoForm = Ext.create('widget.form', {
			dockedItems : this._createToolbar(),
			bodyPadding : '10',
			padding : '5',
			region : 'center',
			items : [ {
				xtype : 'textfield',
				anchor : '100%',
				name : 'javaRuntime',
				fieldLabel : 'Java Runtime',
				readOnly : true,
				labelWidth : 200
			}, {
				xtype : 'textfield',
				anchor : '100%',
				name : 'javaVirtualMachine',
				fieldLabel : 'Java Virtual Machine',
				readOnly : true,
				labelWidth : 200
			}, {
				xtype : 'textfield',
				anchor : '100%',
				name : 'numberOfProcessors',
				fieldLabel : 'Number of Processors',
				readOnly : true,
				labelWidth : 200
			}, {
				xtype : 'textfield',
				anchor : '100%',
				name : 'totalMemory',
				fieldLabel : 'Total Memory',
				readOnly : true,
				labelWidth : 200
			}, {
				xtype : 'textfield',
				anchor : '100%',
				name : 'usedMemory',
				fieldLabel : 'Used Memory',
				readOnly : true,
				labelWidth : 200
			}, {
				xtype : 'textfield',
				anchor : '100%',
				name : 'freeMemory',
				fieldLabel : 'Free Memory',
				readOnly : true,
				labelWidth : 200
			} ]
		});

		Ext.apply(this, {
			layout : 'border',
			items : this.systemInfoForm
		});

		this.callParent(arguments);
	},

	onActivate : function() {
		this.onReloadClick();
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

	onReloadClick : function() {
		Ext.Ajax.request({
			url : 'service/system',
			success : this.onReloadSuccess,
			failure : WebConsole.onAjaxFailure,
			scope : this
		});
	},

	onReloadSuccess : function(response) {
		var jsonData = Ext.decode(response.responseText);
		this.systemInfoForm.getForm().setValues(jsonData);
	}

});