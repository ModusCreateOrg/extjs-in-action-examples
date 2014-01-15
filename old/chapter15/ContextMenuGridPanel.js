
var CtxMenuGridPanel = Ext.extend(Ext.grid.GridPanel, {
    constructor : function() {
        
        CtxMenuGridPanel.superclass.constructor.apply(this, arguments);

        if (this.menu) {

            if (! (this.menu instanceof Ext.menu.Menu)) {
                this.menu = new Ext.menu.Menu(this.menu);
            }

            this.on({
                scope           : this,
                cellcontextmenu : this.onCellContextMenu
            });
        }
    },

    onCellContextMenu : function(grid, rowIndex, cellIndex, evtObj) {

        evtObj.stopEvent();

        if (this.selModel instanceof Ext.grid.RowSelectionModel) {
            this.selModel.selectRow(rowIndex);
        }
        else if (this.selModel instanceof Ext.grid.CellSelectionModel) {
            this.selModel.select(rowIndex, cellIndex);
        }
        this.menu.showAt(evtObj.getXY());
    },

    getSelectedRecord : function() {
        if (this.selModel instanceof Ext.grid.RowSelectionModel) {
            return this.selModel.getSelected();
        }
        else if (this.selModel instanceof Ext.grid.CellSelectionModel) {
            var selectedCell = this.selModel.getSelectedCell();
            return this.store.getAt(selectedCell[0]);
        }
    },

    onDestroy : function() {

        if (this.menu && this.menu.destroy) {
            this.menu.destroy();
        }

        CtxMenuGridPanel.superclass.onDestroy.apply(this, arguments);
    }

});

Ext.reg('contextMenuGridPanel', CtxMenuGridPanel);

