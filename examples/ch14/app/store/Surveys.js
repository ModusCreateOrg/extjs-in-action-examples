Ext.define('Survey.store.Surveys', {
    extend : 'Ext.data.Store',

    requires : [
        'Survey.model.Survey'
    ],

    storeId : 'Surveys',
    autoLoad: true,
    model   : 'Survey.model.Survey'
});
