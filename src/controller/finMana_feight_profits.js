/**

 @Name:    财务管理  - 运费利润列表

 */


layui.define(['admin','table','index','form'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,$ = layui.jquery;


    table.render({
        elem: '#finManaFeightProfits_tabPcb'
        ,url: setter.baseUrl+'fms/freightprofit/list'
        ,toolbar: "#finManaPaypalLog_toolbar"
        ,cellMinWidth: 80
        ,id: "finManaFeightProfits_tabPcb"
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {field: 'id', title: 'id', width: 124, sort: true}
            ,{field: 'invoiceId', title: '发票id', width: 124, sort: true}
            ,{field: 'expressNo',title: '运单号', width: 180, sort: true}
            ,{field: 'totalFreightFee',title: '运费(收)', width: 150, sort: true}
            ,{field: 'payFreightFee',title: '运费(支)', width: 210, sort: true}
            ,{field: 'profit', title: '盈利', width: 250, sort: true}
            ,{field: 'gmtCreate', title: '创建时间', width: 117, sort: true}
            ,{field: 'gmtModified', title: '修改时间', width: 144, sort: true}
            ,{title: '操作', width: 260, align:'center', fixed: 'right', toolbar: '#finManaPaypalLog_tbar'}
        ]]
        ,done: function (res, curr, count) {

        }
    });

    // 监听stencil表格工具条
    table.on('tool(finManaPaypalLog_tabPcb)',function (obj) {
        var d = obj.data;
        console.log(d);
    });

    table.on('toolbar(finManaPaypalLog_tabPcb)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        if (obj.event === 'evPaypalAdd') {}
    });

    exports('finMana_feight_profits', {});
});