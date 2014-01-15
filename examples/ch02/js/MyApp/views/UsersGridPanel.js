Ext.define('MyApp.views.UsersGridPanel', {
    extend   : 'Ext.grid.Panel',
    alias    : 'widget.UsersGridPanel',
    requires : ['MyApp.stores.UserStore'],

    initComponent : function() {
        this.store   = MyApp.stores.UserStore;
        this.columns = this.buildColumns();
        this.callParent();
    },
    buildColumns : function() {
        return [
            {
                header    : 'First Name',
                dataIndex : 'firstName',
                width     : 70
            },
            {
                header    : 'Last Name',
                dataIndex : 'lastName',
                width     : 70
            },
            {
                header    : 'DOB',
                dataIndex : 'dob',
                width     : 70
            },
            {
                header    : 'Login',
                dataIndex : 'userName',
                width     : 70
            }
        ];
    }
});
