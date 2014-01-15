Ext.ns('MyApp.plugins');

var GridCtxMenuPlugin = Ext.extend(Object, {
    constructor : function(config) {
        config = config || {};
        Ext.apply(this, config);
    },
    init : function(parent) {
        this.parent = parent;
        if (parent instanceof Ext.grid.GridPanel) {
            if (! (this.menu instanceof Ext.menu.Menu)) {
                this.menu = new Ext.menu.Menu(this.menu);
            }
            parent.on({
                scope           : this,
                cellcontextmenu : this.onCellContextMenu,
                destroy         : this.onDestroy
            });

            Ext.apply(parent, this.parentOverrides);
        }
    },

    onCellContextMenu : function(grid, rowIndex, cellIndex, evtObj) {
        evtObj.stopEvent();

        if (grid.selModel instanceof Ext.grid.RowSelectionModel) {
            grid.selModel.selectRow(rowIndex);
        }
        else if (grid.selModel instanceof Ext.grid.CellSelectionModel) {
            grid.selModel.select(rowIndex, cellIndex);
        }
        this.menu.showAt(evtObj.getXY());
    },

    onDestroy : function() {
        if (this.menu && this.menu.destroy) {
            this.menu.destroy();
        }
    },
    parentOverrides : {
        getSelectedRecord : function() {
            if (this.selModel instanceof Ext.grid.RowSelectionModel) {
                return this.selModel.getSelected();
            }
            else if (this.selModel instanceof Ext.grid.CellSelectionModel) {
                var selectedCell = this.selModel.getSelectedCell();
                return this.store.getAt(selectedCell[0]);
            }

        }
    }

});

Ext.preg('gridCtxMenuPlugin', GridCtxMenuPlugin);

