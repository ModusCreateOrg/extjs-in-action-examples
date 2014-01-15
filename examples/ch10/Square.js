Ext.onReady(function () {

    var dc = Ext.create('Ext.draw.Component', {
        viewBox  : false,
        autoSize : false,
        items    : [
            {                                
                type: 'rect',
                width: 300,
                height: 250,
                x : 140,
                y : 50,
                radius: 16,
                fill: '#2266ff',
                opacity: 0.5
            }
        ]
    });


    Ext.create('Ext.window.Window', {
        width       : 600,
        height      : 400,
        autoShow    : true,
        title       : 'Square with rounded corners',
        maximizable : true,
        layout      : 'fit',
        items       : [dc],
        resizable   : {
            dynamic : true
        }
    });

});