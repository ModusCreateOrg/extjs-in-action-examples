Ext.define('Survey.Application', {
    name: 'Survey',

    extend: 'Ext.app.Application',

    models             : [
        'Question'
    ],
    controllers        : [
        'Authentication',
        'Questions',
        'Surveys'
    ]
});
