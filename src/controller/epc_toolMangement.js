/**

 @Name:    市场管理－－［订单评审］

 */


layui.define(['admin','table','index','element','form'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,element = layui.element;
    var $ = layui.jquery;

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    table.render({
        elem: '#epcToolMana_tab'
        ,url: setter.baseUrl+'epc/tool/list'
        ,toolbar: "#epcToolMana_tb"
        ,cellMinWidth: 80
        ,id: "epcToolMana_tab"
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {type:'checkbox', fixed: 'left'}
            ,{field: 'productNo',title: '内部型号', width: 130, fixed: 'left'}      // 1 ＝ 待报价
            ,{field: 'makeWay',title: '制作方式', minWidth: 89}
            ,{field: 'type',title: '类型', Width: 110}
            ,{field: 'cost',title: '费用', Width: 110}
            ,{field: 'manufacturers',title: '制造商', Width: 110}
            ,{field: 'productionTime',title: '制作时间', Width: 110}
            ,{field: 'supplier',title: '供应商存放', Width: 110}
            ,{field: 'storageTime',title: '存放时间', Width: 110}
            ,{field: 'remark',title: '备注', Width: 110}
            ,{field: 'id',title: 'ID', hide: true}
            ,{fixed: 'right', title:'操作', toolbar: '#epcToolMana_tabbar',width: 150}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(epcToolMana_tab)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var pertData = new Object();
        switch (obj.event) {
            case 'add':
                admin.popup({
                    title: '添加工具'
                    ,area: ['733px','532px']
                    ,btn: ['保存', '取消']
                    ,yes: function (index, layero) {
                        $("button[lay-filter='add_tool_submit']").click();
                        table.reload('epcToolMana_tab');
                    }
                    ,success: function (layero, index) {
                        view(this.id).render('epcManagement/iframeWindow/add_tool').done(function () {

                        });
                    }
                });
                break;
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(epcToolMana_tab)', function (obj) {
        var data = obj.data;
        var _this_id = data.id;
        console.log("_this_id"+ _this_id);
        if (obj.event == 'edit'){
            admin.popup({
                title: '工具编辑'
                ,area: ['733px','532px']
                ,btn: ['保存', '取消']
                ,yes: function (index, layero) {
                    $("button[lay-filter='add_tool_submit']").click();
                    table.reload('epcToolMana_tab');
                }
                ,success: function (layero, index) {
                    view(this.id).render('epcManagement/iframeWindow/add_tool', data).done(function () {

                    });
                }
            });
        } else if (obj.event == 'del'){

        } else if (obj.event == 'detail') {

        }
    });
    exports('epc_toolMangement', {});
});