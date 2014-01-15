Ext.define('Survey.store.Questions', {
    extend : 'Ext.data.Store',

    requires : [
        'Survey.model.Question'
    ],

    autoSync : true,
    storeId  : 'Questions',
    model    : 'Survey.model.Question'
});