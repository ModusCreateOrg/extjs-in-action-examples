Ext.define('MyApp.store.UserStore', {
    extend    : 'Ext.data.Store',
    singleton : true,
    requires  : ['MyApp.model.UserModel'],

    model     : 'MyApp.model.UserModel',
//    storeId   : 'MyApp.store.UserStore',

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