Ext.define('chart.ChartWindow',{
	extend : 'Ext.window.Window',

	initComponent : function() {
		this.chart = this._createChart();

		Ext.apply(this, {
			width : 400,
			height : 300,
			modal : true,
			title : 'OSGi Web Console Extension: Chart',
			layout : 'border',
			items : [ this.chart ],
			buttons : [ {
				xtype : 'button',
				text : 'Close',
				scope : this,
				handler : this.destroy
			} ],
			dockedItems : this._createToolbar()
		});

		this.callParent(arguments);
	},

	_createToolbar : function() {
		var toolbar = Ext.create('widget.toolbar', {
			items : [ {
				text : 'Reload',
				icon : 'css/images/reload.png',
				handler : this._onReloadClick,
				scope : this
			} ]
		});
		return toolbar;
	},

	_createChart : function() {
		this.store = Ext.create('Ext.data.Store', {
			fields: ['x', 'y'],
			proxy : {
				type : 'ajax',
				url : 'chart/service/data',
				reader : {
					type : 'json'
				}
			},
			autoLoad : true

		});
		var chart = Ext.create('Ext.chart.Chart', {
			region : 'center',
			style : 'background: #fff',
			store : this.store,
			axes : [{
				type: 'Numeric',
				position: 'left',
				fields: ['y'],
				grid: true,
				label: {
					font: '9px Arial'
				}
			}, {
				type: 'Numeric',
				position: 'bottom',
				fields: ['x'],
				label: {
					font: '9px Arial'
				}
			}],
			series: [{
				type: 'column',
				axis: 'left',
				xField: 'x',
				yField: 'y',
				style: {
					fill: '#456d9f'
				}
			}]
		});

		return chart;
	},

	_onReloadClick : function() {
		this.store.load();
	}

});
