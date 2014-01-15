Ext.define('MyApp.EmployeeModel', {
    extend : 'Ext.data.Model',
    fields : [
        'id',
        'firstName',
        'lastName',
        'middle',
        'title',
        'street',
        'city',
        'state',
        'zip',
        'departmentId',
        'dateHired',
        'dateFired',
        'dob',
        'officePhone',
        'homePhone',
        'mobilePhone',
        'email',
        'fullName'
    ]
});

Ext.define('MyApp.EmployeeStore', {
    extend   : 'Ext.data.Store',
    type     : 'json',
    model    : 'MyApp.EmployeeModel',
    autoLoad : true,
    proxy    : {
        type : 'ajax',
        url  : 'employees.json'
    }
});

Ext.define('MyApp.Mygrid', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.MyApp_MyGrid',

    border : false,


    initComponent : function() {

        this.columns = this.buildColumns();
        this.store   = Ext.create('MyApp.EmployeeStore');
        this.plugins = Ext.create('plugin.cellediting',{
            clicksToEdit : 1
        });

        this.callParent();
    },
    buildColumns : function() {
        return [
            {
                text      : 'Last Name',
                flex      : 1,
                dataIndex : 'lastName'
            },
            {
                text      : 'DOB',
                flex      : 1,
                dataIndex : 'dob',
                field     : {
                    xtype : 'datefield'
                }
            },
            {
                text      : 'Email',
                dataIndex : 'email',
                flex      : 1,
                field     : {
                    xtype : 'textfield'
                }
            }
        ];
    }

});