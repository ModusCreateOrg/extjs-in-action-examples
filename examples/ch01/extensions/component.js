
    Ext.define('MyApp.MyComponent', {
        extend   : 'Ext.Component',
        tpl : new Ext.XTemplate(
            '<tpl for=".">',
                '<div style="', '{[this.getStyle(values)]}', '">',
                    '{name}, {age}',
                '</div>',
            '</tpl>',
            {
                getStyle : function(prsn) {
                    var color = prsn.sex == 'M' ? '#E9E9F9' : '#F9E9E9';
                    return 'background-color: ' + color + ';'
                }
            }
        ),
        data  : [
            { name : 'Jay Garcia', sex : 'M', age  : 32 },
            { name : 'Erika Garcia', sex : 'F', age  : 32 },
            { name : 'Takeshi Garcia', sex : 'M', age  : 5 },
            { name : 'Kenji Garcia', sex  : 'M', age  : 3 }
        ]
    });

