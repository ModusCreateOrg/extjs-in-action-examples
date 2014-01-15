Ext.define('Survey.store.Groups', {
    extend : 'Ext.data.Store',

    requires : [
        'Survey.model.Group'
    ],

    storeId : 'Groups',
    model   : 'Survey.model.Group'
});