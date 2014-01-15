Ext.require(['Ext.grid.Panel']);

Ext.onReady(function() {
    Ext.define('CarsDataModel', {
        extend    : 'Ext.data.Model',
        fields    : [
            'engine',
            'wheels',
            'color',
            'turbo'
        ]
    });


    Ext.define('CardDataStore', {
        storeId   : 'cardDataStore',
        extend    : 'Ext.data.Store',
        singleton : true,
        model     : 'CarsDataModel'
    });

    var grid = {
        xtype      : 'gridpanel',
        store      : 'cardDataStore',
        border : false,
        columns    : [
            {
                header    : 'Engine Type',
                dataIndex : 'engine'
            },
            {
                header    : 'Wheel Type',
                dataIndex : 'wheels'
            },
            {
                header    : 'Color',
                dataIndex : 'color'
            },
            {
                header    : 'Turbo',
                dataIndex : 'turbo'
            }
        ]
    };

    var win = Ext.create('Ext.window.Window', {
        height : 200,
        width  : 400,
        layout : 'fit',
        title  : 'Cars in inventory',
        items  : grid
    });

    win.show();

    CardDataStore.loadData([
        {
            engine : 'V6',
            wheels : 'Alloy',
            color  : 'Ruby Red',
            turbo  : 'I wish!'
        },
        {
            engine : 'V8',
            wheels : 'Chrome',
            color  : 'Jet Black',
            turbo  : 'Twin'
        }
    ]);
});



