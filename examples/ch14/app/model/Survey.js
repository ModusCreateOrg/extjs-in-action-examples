Ext.define('Survey.model.Survey', {
    extend : 'Ext.data.Model',

    requires : [
        'Ext.data.association.HasMany'
    ],

    uses: [
        'Survey.model.Group'
    ],

    associations : [
        {
            type           : 'hasMany',
            model          : 'Survey.model.Group',
            primaryKey     : 'id',
            foreignKey     : 'survey_id',
            autoLoad       : true,
            associationKey : 'groups',
            name           : 'groups'
        }
    ],

    proxy : {
        type   : 'ajax',
        url    : 'data.json',
        reader : {
            type : 'json'
        }
    },

    fields : [
        {
            name : 'id'
        },
        {
            name : 'name'
        }
    ]
});