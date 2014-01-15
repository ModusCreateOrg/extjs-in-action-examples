Ext.define('MyApp.plugins.ViewContextMenu', {
    extend : 'Ext.AbstractPlugin',
    alias  : 'plugin.viewcontextmenu',

    init : function() {
        if (this.menu) {
            if (! (this.menu instanceof Ext.menu.Menu)) {
                this.menu = this.buildMenu(this.menu);
            }

            this.cmp.on({
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

    onItemContextMenu : function(view, model, row, index, evt) {
        evt.stopEvent();
        this.menu.showAt(evt.getXY());
    },

    destroy : function() {
        if (this.menu && this.menu.destroy) {
            this.menu.destroy();
        }
    }
});

