Ext.define('Survey.view.QuestionsForm', {
    extend : 'Ext.form.Panel',
    alias  : 'widget.questions',

    requires : [
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Display',
        'Ext.form.field.Hidden',
        'Ext.form.field.HtmlEditor',
        'Ext.form.field.Number',
        'Ext.form.field.Picker',
        'Ext.form.field.Radio',
        'Ext.form.field.Spinner',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.Time',
        'Ext.form.RadioGroup',
        'Ext.form.CheckboxGroup'
    ],

    layout : {
        type  : 'vbox',
        align : 'center'
    }
});