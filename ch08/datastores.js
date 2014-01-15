//datastores described in chapter 7
Ext.define('Employee', {
    extend     : 'Ext.data.Model',
    idProperty : 'id',
    fields     : [
        {name : 'id', type : 'int'},
        {name : 'departmentId', type : 'int' },
        {name : 'dateHired', type : 'date', format : 'Y-m-d'},
        {name : 'dateFired', type : 'date', format : 'Y-m-d'},
        {name : 'dob', type : 'date', format : 'Y-m-d'},
        'firstName',
        'lastName',
        'title',
        'street',
        'city',
        'state',
        'zip'
    ]
});


var urlRoot = 'http://extjsinaction.com/crud.php?model=Employee&method=';
var employeeStore = Ext.create('Ext.data.Store', {
    model    : 'Employee',
    pageSize : 50,
    proxy    : {
        type   : 'jsonp',
        api    : {
            create  : urlRoot + 'CREATE',
            read    : urlRoot + 'READ',
            update  : urlRoot + 'UPDATE',
            destroy : urlRoot + 'DESTROY'
        },
        reader : {
            type            : 'json',
            metaProperty    : 'meta',
            root            : 'data',
            idProperty      : 'id',
            totalProperty   : 'meta.total',
            successProperty : 'meta.success'
        },
        writer : {
            type           : 'json',
            encode         : true,
            writeAllFields : true,
            root           : 'data',
            allowSingle    : true,
            batch          : false,
            writeRecords   : function(request, data) {
                request.jsonData = data;
                return request;
            }
        }
    }
});



Ext.define('State', {
    extend : 'Ext.data.Model',
    fields : ['id', 'state']
});

var stateStore = Ext.create("Ext.data.Store", {
    model : 'State',
    proxy : {
        type   : 'jsonp',
        url    : 'http://extjsinaction.com/crud.php??model=State&method=READ',
        reader : {
            type            : 'json',
            root            : 'data',
            idProperty      : 'id',
            successProperty : 'meta.success'
        }
    }
});
