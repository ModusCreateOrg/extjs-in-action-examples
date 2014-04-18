Ext.define('Employee', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name: 'id',type: 'int'},
        {name: 'departmentId', type: 'int' },
        {name:'dateHired', type:'date', format:'Y-m-d'},
        {name:'dateFired', type:'date', format:'Y-m-d'},
        {name:'dob', type:'date', format: 'Y-m-d'},
        'firstName',
        'lastName',
        'middle',
        'title',
        'street',
        'city',
        'state',
        'zip',
        'departmentName',
        'rate',
        'officePhone',
        'homePhone',
        'mobilePhone',
        'email'
    ],
    validations: [
       {type: 'presence', field: 'firstName'},
       {type: 'presence', field: 'lastName'},
       {type: 'presence', field: 'departmentId'},
       {type: 'format', field: 'email',  matcher: /@/}
    ],
    associations: [{
        type: 'belongsTo',
        model:'Department',
        associationKey: 'departmentId'
    }]
});
