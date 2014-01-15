Ext.define('Survey.view.Viewport', {
    extend : 'Ext.container.Viewport',
    alias  : 'widget.vp',

    requires : [
        'Survey.view.AuthorizationForm',
        'Survey.view.SurveyList',
        'Ext.container.Container',
        'Ext.layout.container.Card'
    ],

    layout : {
        type : 'card'
    },

    items : [
        {
            xtype : 'authform'
        },
        {
            xtype  : 'container',
            itemId : 'mainContainer',
            layout : {
                align : 'stretch',
                type  : 'hbox'
            },
            items  : [
                {
                    xtype    : 'container',
                    minWidth : 200,
                    flex     : 1,
                    layout   : {
                        align : 'stretch',
                        type  : 'vbox'
                    },
                    items    : [
                        {
                            xtype  : 'grouplist',
                            flex   : 2,
                            hidden : true
                        },
                        {
                            xtype : 'surveylist',
                            flex  : 1
                        }
                    ]
                },
                {
                    xtype       : 'questions',
                    bodyPadding : 10,
                    flex        : 3
                }

            ]
        }
    ]
});