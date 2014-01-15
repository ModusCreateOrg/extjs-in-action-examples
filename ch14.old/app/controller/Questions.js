Ext.define('Survey.controller.Questions', {
    extend : 'Ext.app.Controller',

    views : [
        'QuestionsForm'
    ],

    refs : [
        {
            ref      : 'form',
            selector : 'questions'
        },
        {
            ref      : 'groups',
            selector : 'grouplist'
        }
    ],

    init : function (application) {
        this.control({
            grouplist : {
                select : this.showGroupQuestions
            },

            '#groupNext' : {
                click : this.showNextGroup
            },

            '#surveyFinish' : {
                click : this.finishSurvey
            },

            'questions field' : {
                change : this.saveItem
            }
        });
    },

    showGroupQuestions : function (grid, record, index) {
        var questions = record.questions(),
            form = this.getForm(),
            store = grid.store,
            isLastGroup = (store.getCount() - index) === 1,
            fields = [];

        questions.each(function (question) {
            var field = Ext.apply({
                fieldLabel : question.get('question'),
                value      : question.get('answer'),
                question   : question,
                anchor     : '100%',
                xtype      : 'textfield'
            }, question.get('config'));

            fields.push(field);
        });

        form.removeAll();
        form.add({
            xtype : 'fieldset',
            title : record.get('name'),
            items : fields,
            width : '100%'
        });

        form.add({
            xtype  : 'button',
            text   : isLastGroup ? 'Save' : 'Next',
            itemId : isLastGroup ? 'surveyFinish' : 'groupNext',
            width  : 200
        });
    },

    showNextGroup : function () {
        var grid = this.getGroups(),
            store = grid.getStore(),
            selModel = grid.getSelectionModel(),
            selected = selModel.getLastSelected(),
            curIndex = store.indexOf(selected),
            next = store.getAt(curIndex + 1);

        if (next) {
            selModel.select([next]);
        }
    },

    finishSurvey : function () {
        var groups = this.getGroups();
        this.getForm().removeAll();
        groups.getSelectionModel().deselectAll();
        groups.hide();
        groups.up().down('surveylist').getSelectionModel().deselectAll();

    },

    saveItem : function (field) {
        var question = field.question;

        if (!question) {
            field = field.up('[question]');
            question = field.question;
        }

        if (question) {
            question.set('answer', field.getValue());
        }
    }


});
