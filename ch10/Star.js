Ext.onReady(function() {

    var dc = Ext.create('Ext.draw.Component', {
        items : {
            type : 'path',
            fill : '#ca433F',
            path : 'M 0 -100 L 58 81 -95 -31 95 -31 -59 81 Z'
        }

    });

    Ext.create('Ext.window.Window', {
        width       : 600,
        height      : 400,
        autoShow    : true,
        title       : 'Star (path)',
        maximizable : true,
        layout      : 'fit',
        items       : dc,
        resizable   : {
            dynamic : true
        }
    });

});