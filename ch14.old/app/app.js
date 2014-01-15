Ext.Loader.setConfig({
    enabled : true
});

Ext.application({
    name               : 'Survey',
    autoCreateViewport : true,
    models             : [
        'Question'
    ],
    controllers        : [
        'Authentication',
        'Questions',
        'Surveys'
    ]
});