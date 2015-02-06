Ext.define('WebConsole.BundleInfoPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bundleinfopanel',

	initComponent : function() {
		this.bundleForm = Ext.create('widget.form', {
			bodyPadding : '10 10 10 10',
			border : false,
			items : [ {
				xtype : 'textfield',
				anchor : '100%',
				name : 'bundleId',
				fieldLabel : 'Bundle Id',
				readOnly : true,
				labelWidth : 120
			}, {
				xtype : 'textfield',
				anchor : '100%',
				name : 'symbolicName',
				fieldLabel : 'Symbolic Name',
				readOnly : true,
				labelWidth : 120
			}, {
				xtype : 'textfield',
				anchor : '100%',
				name : 'version',
				fieldLabel : 'Version',
				readOnly : true,
				labelWidth : 120
			}, {
				xtype : 'textarea',
				anchor : '100%',
				name : 'description',
				fieldLabel : 'Description',
				readOnly : true,
				labelWidth : 120
			}, {
				xtype : 'textfield',
				anchor : '100%',
				name : 'location',
				fieldLabel : 'Bundle Location',
				readOnly : true,
				labelWidth : 120
			}, {
				xtype : 'textarea',
				anchor : '100%',
				name : 'manifestHeaders',
				fieldLabel : 'Manifest Headers',
				readOnly : true,
				labelWidth : 120
			}, {
				xtype : 'textarea',
				anchor : '100%',
				name : 'services',
				fieldLabel : 'Services',
				readOnly : true,
				labelWidth : 120
			} ]
		});

		Ext.apply(this, {
			items : this.bundleForm,
			dockedItems : this.createToolbar()
		});

		this.callParent(arguments);
	},

	createToolbar : function() {
		var toolbar = Ext.create('widget.toolbar', {
			items : [ {
				text : 'Stop',
				handler : this.onReloadClick,
				scope : this
			}, '-', {
				text : 'Update',
				handler : this.onBundleInstallClick,
				scope : this
			}, '-', {
				text : 'Uninstall',
				handler : this.onExtensionsClick,
				scope : this
			} ]
		});

		return toolbar;
	},

	setBundle : function(jsonData) {
		this.bundleForm.getForm().setValues(jsonData);
	}

});
