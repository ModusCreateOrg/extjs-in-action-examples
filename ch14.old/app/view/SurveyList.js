Ext.define('Survey.view.SurveyList', {
    extend : 'Ext.grid.Panel',
    alias  : 'widget.surveylist',

    title       : 'Surveys',
    columnLines : false,
    store       : 'Surveys',
    cls         : 'surveylist',

    columns : [
        {
            xtype     : 'gridcolumn',
            flex      : 1,
            dataIndex : 'name',
            text      : 'Surveys'
        }
    ]
});