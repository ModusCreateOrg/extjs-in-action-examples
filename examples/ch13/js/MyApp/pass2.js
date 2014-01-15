Ext.Loader.setPath('MyApp', 'js/MyApp');
Ext.require('MyApp.view.UserEditorWindow');
Ext.onReady(function() {
    Ext.create('MyApp.view.UserEditorWindow').show();
});
