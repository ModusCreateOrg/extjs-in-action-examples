Ext.Loader.setConfig({
    enabled : true,
    paths : {
        'MyApp':'MyApp'
    }
});

Ext.require('MyApp.registration.RegistrationWindow');

Ext.onReady(function() {
    Ext.create('MyApp.registration.RegistrationWindow').show();
});

//// comment
