(function() {
    Ext.Loader.setConfig({
        enabled : true,
        paths   : {
            MyApp : 'js/MyApp'
        } 
    });
    
    Ext.require('MyApp.views.UserEditorWindow');
    
    Ext.onReady(function() {
        Ext.create('MyApp.views.UserEditorWindow').show();
    });
})();
