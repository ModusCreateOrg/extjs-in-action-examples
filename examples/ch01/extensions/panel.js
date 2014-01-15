Ext.define('MyApp.MyPanel', {
    extend : 'Ext.panel.Panel',
    alias  : 'widget.MyApp.MyPanel',

    frame : true,
    title : 'Master Panel',

    layout : {
        type  : 'hbox',
        align : 'stretch'
    },
    defaults : {
        flex  : 1,
        frame : true
    },
    initComponent : function() {
        this.items = this.buildItems();
        this.callParent();
    },
    buildItems : function() {
        return [
            {
                html  : 'Panel 1',
                title : 'Panel 1 title'
            },
            {
                html    : 'Panel 2',
                title   : 'Panel 1 title',
                buttons : [
                    {
                        text    : 'press me!',
                        scope   : this,
                        handler : this.onPressMeBtn
                    }
                ]
            }
        ];
    },
    onPressMeBtn : function() {
        Ext.Msg.alert('Hee hee!', 'That tickles!');
    }

});


Ext.define('MyApp.MyPanel', {
    extend : 'Ext.panel.Panel',
    alias  : 'widget.MyApp.MyPanel',

    frame : true,
    title : 'Master Panel',

    layout : {
        type  : 'hbox',
        align : 'stretch'
    },
    defaults : {
        flex  : 1,
        frame : true
    },
    initComponent : function() {
        this.items = this.buildItems();
        this.callParent();
    },
    buildItems : function() {
        return [
           // child items
        ];
    }
});