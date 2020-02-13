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
        ,toolbar: "#finManaFeightProfits_toolbar"
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
            {field: 'id', title: 'id', minWidth: 124, sort: true}
            ,{field: 'invoiceId', title: '发票id', minWidth: 124, sort: true}
            ,{field: 'expressNo',title: '运单号', minWidth: 180, sort: true}
            ,{field: 'totalFreightFee',title: '运费(收)', minWidth: 150, sort: true}
            ,{field: 'payFreightFee',title: '运费(支)', minWidth: 210, sort: true}
            ,{field: 'profit', title: '盈利', minWidth: 250, sort: true}
            ,{field: 'gmtCreate', title: '创建时间', sort: true}
            ,{field: 'gmtModified', title: '修改时间', sort: true}
            // ,{title: '操作', width: 260, align:'center', fixed: 'right'}
        ]]
        ,done: function (res, curr, count) {

        }
    });

    // 监听stencil表格工具条
    table.on('tool(finManaPaypalLog_tabPcb)',function (obj) {
        var d = obj.data;
        console.log(d);
    });

    table.on('toolbar(finManaFeightProfits_tabPcb)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        if (obj.event === 'feightProfitsAdd') {
            admin.popup({
                title: '添加运费利润'
                ,area: ['456px', '452px']
                ,btn: ['保存', '取消']
                ,yes: function (index, layero) {
                    $("#submitFpSave").click();
                }
                ,success: function (layero, index) {
                    view(this.id).render('/finManagement/iframeWindow/feight_profits_add').done(function () {

                    });
                }
            });
        }
    });

    exports('finMana_feight_profits', {});
});
