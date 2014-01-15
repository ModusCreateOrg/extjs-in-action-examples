Ext.define('MyApp.grid.ContextMenuGridPanel', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.contextmenugrid',

    constructor : function() {
        this.callParent(arguments);
        if (this.menu) {
            if (! (this.menu instanceof Ext.menu.Menu)) {
                this.menu = this.buildMenu(this.menu);
            }

            this.on({
                scope           : this,
                itemcontextmenu : this.onItemContextMenu
            });
        }
    },

    buildMenu : function(menuCfg) {
        if (Ext.isArray(menuCfg)) {
            menuCfg = {
                items : menuCfg
            };
        }

        return Ext.create('Ext.menu.Menu', menuCfg);
    },

    onItemContextMenu : function(grid, model, row, index, evt) {
        evt.stopEvent();
        this.menu.showAt(evt.getXY());
    },

    onDestroy : function() {

        if (this.menu && this.menu.destroy) {
            this.menu.destroy();
        }

        this.callParent(arguments);
    }
});

