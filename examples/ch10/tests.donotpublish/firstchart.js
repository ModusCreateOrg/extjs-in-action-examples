Ext.onReady(function () {
    var generateData = function (n, floor){
        var data = [],
            p = (Math.random() *  11) + 1,
            i;
            
        floor = (!floor && floor !== 0)? 20 : floor;
        
        for (i = 0; i < (n || 12); i++) {
            data.push({
                name: Ext.Date.monthNames[i % 12],
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                data4: Math.floor(Math.max((Math.random() * 100), floor)),
                data5: Math.floor(Math.max((Math.random() * 100), floor)),
                data6: Math.floor(Math.max((Math.random() * 100), floor)),
                data7: Math.floor(Math.max((Math.random() * 100), floor)),
                data8: Math.floor(Math.max((Math.random() * 100), floor)),
                data9: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    };
    
    var store = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
        data: generateData()
    }),

    chart = Ext.create('Ext.chart.Chart', {
        store: store,
        background: {
            fill: '#fff'
        },
        axes: [
            {
                type: 'Numeric',
                position: 'left',
                title: 'Values Axis'
            },
            {
                type: 'Category',
                position: 'bottom',
                fields: 'name',
                title: 'Metrics Axis',
                label: {
                    rotate: {
                        degrees: 270
                    }
                }
            }
        ],
        series: [
            {
                type: 'line',
                axis: 'left',
                xField: 'name',
                yField: 'data1',
                title: ['% Returning Customers']
            }
        ]
    });

    Ext.create('Ext.window.Window', {
        width       : 600,
        height      : 470,
        autoShow    : true,
        title       : 'Our Very First Ext JS Chart',
        maximizable : true,
        layout      : 'fit',
        items       : [chart],
        resizable   : {
            dynamic: true
        }

    });
});