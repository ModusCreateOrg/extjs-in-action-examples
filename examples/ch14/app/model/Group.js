Ext.define('Survey.model.Group', {
    extend : 'Ext.data.Model',

    requires : [
        'Ext.data.association.HasMany',
        'Ext.data.association.BelongsTo'
    ],

    uses : [
        'Survey.model.Survey',
        'Survey.model.Question'
    ],

    fields : [
        {
            name : 'id'
        },
        {
            name : 'survey_id'
        },
        {
            name : 'name'
        },
        {
            name : 'index'
        }
    ],

    associations : [
        {
            type       : 'belongsTo',
            model      : 'Survey.model.Survey',
            primaryKey : 'id',
            foreignKey : 'survey_id'
        },
        {
            type           : 'hasMany',
            model          : 'Survey.model.Question',
            primaryKey     : 'id',
            foreignKey     : 'group_id',
            autoLoad       : true,
            associationKey : 'questions',
            name           : 'questions'
        }
    ],

    proxy : {
        type   : 'memory'
    }
});