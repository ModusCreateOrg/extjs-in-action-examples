Ext.define('MyApp.views.UserEditorWindow', {
    extend   : 'Ext.Window',
    requires : ['MyApp.views.UsersGridPanel','MyApp.views.UserFormPanel'],

    height : 200,
    width  : 550,
    border : false,
    layout : {
        type  : 'hbox',
        align : 'stretch'
    },

    initComponent : function() {
        this.items   = this.buildItems();
        this.buttons = this.buildButtons();
        this.callParent();

        this.on('afterrender', this.onAfterRenderLoadForm, this);
    },
    buildItems : function() {
        return [
            {
                xtype     : 'UsersGridPanel',
                width     : 280,
                itemId    : 'userGrid',
                listeners : {
                    scope     : this,
                    itemclick : this.onGridItemClick
                }
            },
            {
                xtype  : 'UserFormPanel',
                itemId : 'userForm',
                flex   : 1
            }
        ];
    },
    buildButtons : function() {
        return [
            {
                text    : 'Save',
                scope   : this,
                handler : this.onSaveBtn
            },
            {
                text    : 'New',
                scope   : this,
                handler : this.onNewBtn
            }
        ];
    },
    onGridItemClick : function(view, record) {
        var formPanel = this.getComponent('userForm');
        formPanel.loadRecord(record)
    },
    onSaveBtn : function() {
        var gridPanel  = this.getComponent('userGrid'),
            gridStore  = gridPanel.getStore(),
            formPanel  = this.getComponent('userForm'),
            basicForm  = formPanel.getForm(),
            currentRec = basicForm.getRecord(),
            formData   = basicForm.getValues(),
            storeIndex = gridStore.indexOf(currentRec),
            key;

        //loop through the record and set values
        currentRec.beginEdit();
        for (key in formData) {
            currentRec.set(key, formData[key]);
        }
        currentRec.endEdit();
        currentRec.commit();

        // Add and select
        if (storeIndex == -1) {
            gridStore.add(currentRec);
            gridPanel.getSelectionModel().select(currentRec)
        }
    },
    onNewBtn : function() {
        var gridPanel = this.getComponent('userGrid'),
            formPanel = this.getComponent('userForm'),
            newModel  = Ext.ModelManager.create({}, 'MyApp.models.UserModel');

        gridPanel.getSelectionModel().clearSelections();
        formPanel.getForm().loadRecord(newModel)
    },
    onAfterRenderLoadForm : function() {
        this.onNewBtn();
    }
});