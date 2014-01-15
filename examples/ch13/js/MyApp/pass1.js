Ext.Loader.setPath('MyApp', 'js/MyApp');

Ext.onReady(function() {
    Ext.create('MyApp.view.UserEditorWindow').show();
});
