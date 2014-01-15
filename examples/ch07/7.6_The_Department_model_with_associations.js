Ext.define('Department', {
    extend       : 'Ext.data.Model',
    fields       : [
        'id',
        'name',
        'active',
        'dateActive',
        'dateInactive',
        'description',
        'director',
        'numEmployees'
    ],
    sortInfo     : {
        field : 'name',
        dir   : 'ASC'
    },
    associations : [
        {
            type  : 'hasMany',
            model : 'Employee',
            name  : 'employees'
        }
    ]
});
