Ext.define('MyApp.models.UserModel', {
    extend   : 'Ext.data.Model',
    requires : ['Ext.data.Model'],
    fields : [
        'firstName',
        'lastName',
        'dob',
        'userName'
    ]
});
