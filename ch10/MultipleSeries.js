Ext.onReady(function () {

    var generateData = function (n, floor) {
        var data = [],
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

    Ext.chart.Shape.self.override({
        star : function (surface, opts) {
            return surface.add(Ext.applyIf({
                type           : 'path',
                path           : 'M 0 -10 L 6 8 -9 -3 10 -3 -6 8 Z',
                'stroke-width' : 0
            }, opts));
        }
    });

    var store = Ext.create('Ext.data.JsonStore', {
            fields : ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
            data   : generateData()
        }),

        chart = Ext.create('Ext.chart.Chart', {
            animate    : true,
            store      : store,
            background : {
                fill : '#fff'
            },
            items      : [
                {
                    type : 'path',
                    fill : '#fff2cc',
                    path : 'M 200 100 L 258 281 105 169 295 169 141 281 Z'
                }
            ],
            axes       : [
                {
                    type           : 'Numeric',
                    position       : 'left',
                    fields         : ['data1'],
                    title          : 'Values Axis',
                    grid           : true,
                    minimum        : 0,
                    minorTickSteps : 5,
                    majorTickSteps : 10,
                    label          : {
                        renderer : Ext.util.Format.numberRenderer('0,0.0')
                    }
                },
                {
                    type     : 'Category',
                    position : 'bottom',
                    fields   : 'name',
                    title    : 'Metrics Axis',
                    label    : {
                        rotate : {
                            degrees : 270
                        }
                    }
                }
            ],
            series     : [
                {
                    type         : 'line',
                    highlight    : {
                        size   : 7,
                        radius : 7
                    },
                    axis         : 'left',
                    xField       : 'name',
                    yField       : 'data1',
                    title        : '% Returning Customers',
                    markerConfig : {
                        type : 'star'
                    },
                    tips         : {
                        trackMouse : true,
                        width      : 150,
                        height     : 28,
                        renderer   : function (record) {
                            this.setTitle(record.get('name') + ': ' + record.get('data1') + ' customers');
                        }
                    }
                },
                {
                    type         : 'area',
                    highlight    : {
                        size   : 7,
                        radius : 7
                    },
                    axis         : 'left',
                    xField       : 'name',
                    yField       : 'data2',
                    title        : '% New Customers',
                    markerConfig : {
                        type : 'diamond'
                    }
                }
            ],
            legend     : {
                position : 'top'
            }
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