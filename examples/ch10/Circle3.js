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
        title       : 'Animating sprites',
        maximizable : true,
        layout      : 'fit',
        items       : [dc],
        resizable   : {
            dynamic : true
        },

        listeners : {
            show : function () {
                Ext.defer(function () {
                    var sprite = dc.surface.add({
                        type   : 'circle',
                        fill   : 'rgba(012,123,230,.4)',
                        stroke : 'red',

                        /**
                         * Both fill and stroke
                         * @type {Number}
                         */
                        opacity : 0,
                        radius  : 100,

                        /**
                         * If autoSize: true or viewBox: true, the component
                         * will obey delta x and y to position this sprite
                         * @type {Number}
                         */
                        x : 300,
                        y : 200
                    });

                    sprite.show();

                    /**
                     * Animate entry of the second circle
                     */
                    sprite.animate({
                        duration : 1000,
                        easing   : 'easeOut',
                        to       : {
                            opacity : .9
                        }
                    });

                    sprite.on('mouseover', Ext.bind(
                        sprite.animate,
                        sprite,
                        [
                            {
                                duration : 500,
                                easing   : 'easeOut',
                                to       : {
                                    opacity   : .6,
                                    translate : {
                                        x : -100
                                    }
                                }
                            }
                        ]
                    ));

                    sprite.on('mouseout', Ext.bind(
                        sprite.animate,
                        sprite,
                        [
                            {
                                duration : 300,
                                easing   : 'easeIn',
                                to       : {
                                    opacity   : .9,
                                    translate : {
                                        x : 0
                                    }
                                }
                            }
                        ]
                    ));

                }, 500);
            }
        }
    });

});