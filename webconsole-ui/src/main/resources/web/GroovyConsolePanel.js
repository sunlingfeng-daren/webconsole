Ext.define('WebConsole.GroovyConsolePanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.groovyconsolepanel',

	initComponent : function() {
		this.scriptTextArea = Ext.create('Ext.form.field.TextArea', {
			name : 'groovyScript',
			region : 'center',
			padding : '5'
		});
		this.resultTextArea = Ext.create('Ext.form.field.TextArea', {
			name : 'executionResult',
			region : 'south',
			padding : '0 5 5 5'
		});

		Ext.apply(this, {
			layout : 'border',
			dockedItems : this._createToolbar(),
			items : [ this.scriptTextArea, this.resultTextArea ]
		});

		this.callParent(arguments);
	},

	_createToolbar : function() {
		var toolbar = Ext.create('widget.toolbar', {
			items : [ {
				text : 'Run',
				icon : 'css/images/service_test.png',
				handler : this.onRunGroovyClick,
				scope : this
			} ]
		});

		return toolbar;
	},

	onRunGroovyClick : function() {
		var script = this.scriptTextArea.getValue();
		Ext.Ajax.request({
			url : 'service/groovy',
			params : {
				script : script
			},
			success : this.onRunGroovySuccess,
			failure : WebConsole.onAjaxFailure,
			scope : this
		});
	},
	
	onRunGroovySuccess : function(response) {
		//alert('script executed: ' + response.responseText);
		var jsonResponse = Ext.decode(response.responseText);
		this.resultTextArea.setValue(jsonResponse.consoleOutput);
	}

});