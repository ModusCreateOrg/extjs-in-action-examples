Ext.onReady(function () {

    var generateData = function (n, floor) {
        var data = [],
            p = (Math.random() * 11) + 1,
            i;

        floor = (!floor && floor !== 0) ? 20 : floor;

        for (i = 0; i < (n || 12); i++) {
            data.push({
                name  : Ext.Date.monthNames[i % 12],
                data1 : Math.floor(Math.max((Math.random() * 100), floor)),
                data2 : Math.floor(Math.max((Math.random() * 100), floor)),
                data3 : Math.floor(Math.max((Math.random() * 100), floor)),
                data4 : Math.floor(Math.max((Math.random() * 100), floor)),
                data5 : Math.floor(Math.max((Math.random() * 100), floor)),
                data6 : Math.floor(Math.max((Math.random() * 100), floor)),
                data7 : Math.floor(Math.max((Math.random() * 100), floor)),
                data8 : Math.floor(Math.max((Math.random() * 100), floor)),
                data9 : Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    };

    var store = Ext.create('Ext.data.JsonStore', {
            fields : ['name', 'data1'],
            data   : generateData(4, 30)
        }),

        chart = Ext.create('Ext.chart.Chart', {
            animate      : true,
            store        : store,
            shadow       : true,
            insetPadding : 10,
            legend       : {
                position : 'bottom'
            },
            background   : {
                fill : '#fff'
            },
            series       : [
                {
                    type         : 'pie',
                    field        : 'data1',
                    donut        : 40,
                    showInLegend : true,
                    tips         : {
                        trackMouse : true,
                        width      : 150,
                        height     : 28,
                        renderer   : function (record) {
                            this.setTitle(record.get('name') + ': ' + record.get('data1'));
                        }
                    },
                    highlight    : {
                        segment : {
                            margin : 20
                        }
                    },
                    label        : {
                        field    : 'name',
                        display  : 'rotate',
                        contrast : true,
                        font     : '18px Arial'
                    }
                }
            ]
        });

    Ext.create('Ext.window.Window', {
        width       : 600,
        height      : 470,
        autoShow    : true,
        title       : 'Our First Ext JS Chart',
        maximizable : true,
        layout      : 'fit',
        items       : [chart],
        resizable   : {
            dynamic : true
        }

    });
});