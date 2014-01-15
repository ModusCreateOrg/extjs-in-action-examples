Ext.onReady(function() {
    var maleElements = Ext.get('maleLockerRoom').select('div');
    Ext.each(maleElements.elements, function(el) {
        new Ext.dd.DD(el);
    });

    var femaleElements = Ext.get('femaleLockerRoom').select('div');
    Ext.each(femaleElements.elements, function(el) {
        new Ext.dd.DD(el);
    });
});
