Ext.define('Survey.controller.Authentication', {
    extend : 'Ext.app.Controller',

    views : [
        'AuthorizationForm'
    ],

    init : function (application) {
        this.control({
            "button#loginBtn" : {
                click : this.onLoginClick
            }
        });
    },

    onLoginClick : function (button) {
        // process authentication...
        button.up('vp').getLayout().setActiveItem(1);
    }
});