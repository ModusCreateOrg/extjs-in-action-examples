//Ext.require('Ext.Component');

Ext.onReady(function() {
    Ext.create('Ext.Component', {
        height    : 50,
        html     : 'Hello programmer!!!!!',
        renderTo : Ext.getBody()
    });
});