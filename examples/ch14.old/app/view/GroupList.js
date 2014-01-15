Ext.define('Survey.view.GroupList', {
    extend : 'Ext.grid.Panel',
    alias  : 'widget.grouplist',

    title       : 'Sections',
    columnLines : true,
    store       : 'Groups',
    cls         : 'groupList',

    columns : [
        {
            flex      : 1,
            dataIndex : 'name',
            text      : 'Section'
        },
        {
            xtpe     : 'numbercolumn',
            width    : 50,
            text     : '#',
            renderer : function (value, meta, record) {
                return record.questions().getCount();
            }
        }
    ]
});