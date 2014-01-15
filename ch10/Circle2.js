Ext.onReady(function () {
    var dc = Ext.create('Ext.draw.Component', {
        viewBox  : false,
        autoSize : false,
        items    : [
            {
                type   : 'circle',
                fill   : '#79BB3F',
                radius : 100,
                x      : 200,
                y      : 200
            }
        ]
    });


    Ext.create('Ext.window.Window', {
        width       : 600,
        height      : 400,
        autoShow    : true,
        title       : 'Dynamically adding a new sprite to surface with a 2-sec delay',
        maximizable : true,
        layout      : 'fit',
        items       : [dc],
        resizable   : {
            dynamic : true
        },

        listeners : {
            show : function () {
                var sprite = dc.surface.add({
                    type   : 'circle',
                    fill   : '#846393',
                    stroke : '#a54222',

                    /**
                     * Needs to be quoted due to '-' separator
                     */
                    'stroke-width' : 5,

                    /**
                     * Both fill and stroke
                     * @type {Number}
                     */
                    opacity : .8,
                    radius  : 100,

                    /**
                     * If autoSize: true or viewBox: true, the component
                     * will obey delta x and y to position this sprite
                     * @type {Number}
                     */
                    x : 300,
                    y : 200
                });

                // need to show the sprite with redraw set to true
                sprite.show(true);
            }
        }
    });

});