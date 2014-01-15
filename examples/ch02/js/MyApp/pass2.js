Ext.Loader.setPath('MyApp', 'js/MyApp');
Ext.require('MyApp.views.UserEditorWindow');
Ext.onReady(function() {
    Ext.create('MyApp.views.UserEditorWindow').show();
});
