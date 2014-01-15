Ext.define('MyApp.stores.UserStore', {
    extend    : 'Ext.data.Store',
    singleton : true,
    requires  : ['MyApp.models.UserModel'],

    model     : 'MyApp.models.UserModel',
    storeId   : 'MyApp.stores.UserStore',

    constructor : function() {
        this.callParent(arguments);
        this.loadData([
            {
                firstName : 'Louis',
                lastName  : 'Dobbs',
                dob       : '12/21/98',
                userName  : 'ldobbs'
            },
            {
                firstName : 'Sam',
                lastName  : 'Hit',
                dob       : '03/23/54',
                userName  : 'shit'
            },
            {
                firstName : 'Nancy',
                lastName  : 'Ipple',
                dob       : '01/18/82',
                userName  : 'nipple'
            }
        ]);
    }
});