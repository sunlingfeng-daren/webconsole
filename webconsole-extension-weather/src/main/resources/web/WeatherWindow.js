Ext.define('weather.WeatherWindow', {
	extend : 'Ext.window.Window',

	plain : true,

	initComponent : function() {
		Ext.apply(this, {
			width : 400,
			height : 300,
			modal : true,
			title : 'Weather',
			layout : 'fit',
			html : '<br/><center><strong>Weather service!</strong></center>',
			buttons : [ {
				xtype : 'button',
				text : 'Ajax',
				scope : this,
				handler : this.onAjaxClick
			},

			{
				xtype : 'button',
				text : 'Close',
				scope : this,
				handler : this.destroy
			} ]
		});

		this.callParent(arguments);
	},

	onAjaxClick : function() {
		var jsonData = Ext.encode("{'city' : 'Antibes'}");
		
		Ext.Ajax.request({
			url : 'weather/service/temperatures',
			jsonData : "{'city' : 'Antibes'}",
			success : this.onAjaxSuccess,
			failure : this.onAjaxFailure,
			scope : this
		});
	},

	onAjaxSuccess : function(response, opts) {
		var jsonResp = Ext.decode(response.responseText);
		alert('udalo sie? ' + jsonResp.success);
	},

	onAjaxFailure : function(response, opts) {
		alert("FAILURE" + response.statusText);
	}

});
