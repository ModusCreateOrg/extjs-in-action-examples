
Ext.define('MyApp.registration.RegistrationWindow', {
    extend   : 'Ext.Window',
    requires : ['MyApp.registration.UsersGridPanel','MyApp.registration.UserFormPanel'],

    height : 200,
    width  : 550,
    border : false,
    layout : {
        type  : 'hbox',
        align : 'stretch'
    },

    initComponent : function() {
        this.items = this.buildItems();
        this.buttons = this.buildButtons();
        this.callParent();
    },
    buildItems : function() {
        return [
            {
                xtype     : 'MyApp.registration.UsersGridPanel',
                width     : 280,
                listeners : {
                    scope     : this,
                    itemclick : this.onGridItemClick
                }
            },
            {
                xtype     : 'MyApp.registration.UserFormPanel',
                flex      : 1
            }
        ];
    },
    buildButtons : function() {
        return [
            {
                text   : 'Save',
                scope   : this,
                handler : this.onSaveBtn
            }
        ];
    },
    onGridItemClick : function(view, record) {
        this.items.items[1].loadRecord(record)
    },
    onSaveBtn : function() {
        var record = this.items.items[0].selModel.getSelection()[0],
            data   = this.items.items[1].getForm().getValues(),
            key;

        if (! record) {
            return;
        }
        console.log(record);

        record.beginEdit();
        for (key in data) {
            record.set(key, data[key]);
        }
        record.beginEdit();
        record.commit();

    }

});