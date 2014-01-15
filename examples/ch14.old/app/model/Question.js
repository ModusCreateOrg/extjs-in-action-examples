Ext.define('Survey.model.Question', {
    extend : 'Ext.data.Model',

    requires : [
        'Ext.data.association.BelongsTo'
    ],

    uses : [
        'Survey.model.Group'
    ],

    fields : [
        {
            name : 'id'
        },
        {
            name : 'group_id'
        },
        {
            name : 'survey_id'
        },
        {
            name : 'index'
        },
        {
            name : 'question'
        },
        {
            name : 'answer'
        },
        {
            name : 'config'
        }
    ],

    belongsTo : [
        {
            model      : 'Survey.model.Group',
            foreignKey : 'group_id'
        }
    ],

    proxy : {
        type   : 'memory'
    }
});