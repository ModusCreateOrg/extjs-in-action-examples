Ext.define('MyApp.registration.UsersGridPanel', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.MyApp.registration.UsersGridPanel',
    requires : ['MyApp.models.UserModel','MyApp.stores.UserStore'],

    initComponent : function() {
        this.store   = MyApp.stores.UserStore;
        this.columns = [
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
        this.callParent();
    }
});