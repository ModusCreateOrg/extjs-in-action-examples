Ext.define('Survey.controller.Surveys', {
    extend : 'Ext.app.Controller',

    models : [
        'Survey',
        'Group'
    ],
    stores : [
        'Surveys',
        'Groups'
    ],
    views  : [
        'GroupList',
        'SurveyList',
        'QuestionsForm'
    ],

    refs : [
        {
            ref      : 'groupList',
            selector : 'grouplist'
        }
    ],

    init : function () {
        this.control({
            surveylist : {
                select : this.loadGroups
            }
        });
    },

    loadGroups : function (grid, record) {
        var groups = this.getGroupList(),
            groupRec,
            questions;

        groups.show();

        groups.reconfigure(record.groups());

        groupRec = groups.getStore().getAt(0);
        if (groupRec) {
            groups.getSelectionModel().select([groupRec]);
        }

        questions = groups.up('#mainContainer').down('questions');
        questions.setTitle(record.get('name'));
    }
});
