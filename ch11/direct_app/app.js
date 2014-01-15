Ext.require([
    'Ext.direct.*',
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.grid.plugin.CellEditing'
]);

Ext.define('Company', {
    extend : 'Ext.data.Model',

    fields : [
        'name',
        'data',
        {name : 'id', type : 'int'}
    ],
    proxy  : {
        type   : 'direct',
        api    : {
            create  : RPC.Actors.create,
            read    : RPC.Actors.read,
            update  : RPC.Actors.update,
            destroy : RPC.Actors.destroy
        },
        writer : {
            type           : 'json',
            writeAllFields : true
        },
        reader : {
            root            : 'data',
            idProperty      : 'id',
            type            : 'json',
            successProperty : 'success'
        }
    }
});

Ext.onReady(function() {
    var editing = Ext.create('Ext.grid.plugin.CellEditing'),
        grid,
        onAdd,
        onDelete;

    onAdd = function() {
        var record = Ext.create('Company'),
            store = grid.getStore();

        editing.cancelEdit();
        store.insert(0, record);
    };

    onDelete = function() {
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            grid.getStore().remove(selection);
        }
    };

    grid = Ext.create('Ext.grid.Panel', {
        selType : 'cellmodel',
        border      : false,
        store   : {
            model    : 'Company',
            autoLoad : true,
            autoSync : true
        },
        columns : [
            {
                dataIndex : 'name',
                flex      : 1,
                text      : 'Name',
                field     : {
                    type : 'textfield'
                }
            },
            {
                dataIndex : 'id',
                align     : 'right',
                width     : 120,
                text      : 'Id'
            }
        ],
        plugins : [
            editing
        ]
    });

    Ext.create('Ext.window.Window', {
        layout      : 'fit',
        title       : 'Actors Grid',
        height      : 150,
        width       : 400,
        items       : grid,
        dockedItems : [
            {
                xtype : 'toolbar',
                dock  : 'top',
                items : [
                    {
                        text    : 'Add',
                        handler : onAdd
                    },
                    {
                        text    : 'Delete',
                        handler : onDelete
                    }
                ]
            }
        ]

    }).show();

    grid.getStore().on('update', function (store, record, operation, modFields) {
        if (operation !== Ext.data.Model.COMMIT) {
            return;
        }

        editing.startEditByPosition({
            row    : 0,
            column : 0
        });
    }, grid, {buffer: 200});
});