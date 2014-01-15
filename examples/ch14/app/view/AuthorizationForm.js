Ext.define('Survey.view.AuthorizationForm', {
    extend : 'Ext.form.Panel',
    alias  : 'widget.authform',

    requires: [
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
        'Ext.Button'
    ],

    layout : {
        align : 'center',
        pack  : 'center',
        type  : 'vbox'
    },

    items : [
        {
            xtype : 'fieldset',
            width : 300,
            title : 'Log in',
            items : [
                {
                    xtype      : 'textfield',
                    anchor     : '100%',
                    fieldLabel : 'Email'
                },
                {
                    xtype      : 'textfield',
                    anchor     : '100%',
                    inputType  : 'password',
                    fieldLabel : 'Password'
                },
                {
                    xtype  : 'button',
                    anchor : '100%',
                    itemId : 'loginBtn',
                    text   : 'Log in'
                }
            ]
        }
    ]

});