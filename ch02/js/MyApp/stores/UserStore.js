Ext.define('MyApp.stores.UserStore', {
    extend    : 'Ext.data.Store',
    singleton : true,
    requires  : ['MyApp.models.UserModel'],

    model     : 'MyApp.models.UserModel',
//    storeId   : 'MyApp.stores.UserStore',

    constructor : function() {
        this.callParent(arguments);
        this.loadData([
            {
                firstName : 'Louis',
                lastName  : 'Dobbs',
                dob       : '12/21/34',
                userName  : 'ldobbs'
            },
            {
                firstName : 'Sam',
                lastName  : 'Hart',
                dob       : '03/23/54',
                userName  : 'shart'
            },
            {
                firstName : 'Nancy',
                lastName  : 'Garcia',
                dob       : '01/18/24',
                userName  : 'ngarcia'
            }
        ]);
    }
});