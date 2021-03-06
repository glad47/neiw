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

    // 全局变量
    var _public_val = {
        orderType: 1        //订单类型 （1 pcb 2钢网 3 贴片）
    };

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(tab-planToger)', function(data){
        console.log(data.index);
        if (data.index === 0){
            _public_val.orderType = 1;       //pcb
        } else if (data.index === 1){
            _public_val.orderType = 2;      //钢网
        } else if (data.index === 2){
            _public_val.orderType = 3;      //贴片
        }
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    table.render({
        elem: '#iqcMana_pertSys'
        ,url: setter.baseUrl+'pert/revieworder/list?status=1'
        ,toolbar: "#iqcMana_pertSys_tb"
        ,cellMinWidth: 80
        ,id: "iqcMana_pertSys"
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {type:'checkbox'}
            ,{field: 'status',title: '状态', width: 110}      // 1 ＝ 待报价
            ,{field: 'customerNo',title: '客户编号', Width: 110}
            ,{field: 'productNo',title: 'P/N', minWidth: 219}
            ,{field: 'boardFee',title: '板费', Width: 110}
            ,{field: 'engineeringFee',title: '工程费', Width: 110}
            ,{field: 'overworkFee',title: '加急费', Width: 110}
            ,{field: 'postFee',title: '邮费', Width: 110}
            ,{field: 'testCostFee',title: '测试费', Width: 110}
            ,{field: 'toolingFee',title: '工具费', Width: 110}
            ,{field: 'unitPrice',title: '单价', Width: 110}
            ,{field: 'quoteGerberName',title: '文件名', Width: 110, hide: true}
            ,{field: 'quoteGerberPath',title: '文件路径', Width: 110, hide: true}
            ,{field: 'id',title: 'ID', hide: true}
            ,{fixed: 'right', title:'操作', toolbar: '#markerMana_tabbar',width: 150}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(iqcMana_pertSys)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var pertData = new Object();
        switch (obj.event) {
            case 'add':
                pertData.opType = 'add';
                admin.popup({
                    title: '添加评审订单'
                    ,area: ['506px','288px']
                    ,btn: ['添加', '取消']
                    ,yes: function (layero, index) {
                        $("#pertSysAddSubmit").click();
                    }
                    ,success: function (layero, index) {
                        view(this.id).render('marketManagement/iframeWindow/pert_sysAdd', pertData).done(function () {
                            form.render();
                        });
                    }
                });
                break;
            case 'submit':
                layer.msg(1);
                var data = checkStatus.data;
                if (data.length>1) {
                    layer.msg("最多只能选择一条数据！");
                } else if (data.length <= 0) {
                    layer.msg("请选择一条要提交的数据！");
                } else {
                    layer.confirm('确定提交评审？', function () {
                       admin.req({
                          type: 'post',
                          url: setter.baseUrl + 'pert/revieworder/update',
                          data: {id:data[0].id,status: 2},
                          success: function () {
                              layer.alert('评审提交成功！', function () {
                                 table.reload('iqcMana_pertSys');
                                 layer.closeAll();
                              });
                          } 
                       });
                    });
                }
                break;
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(iqcMana_pertSys)', function (obj) {
        var data = obj.data;
        if (obj.event == 'edit'){
            data.opType = 'edit';
            admin.popup({
                title: '修改评审订单'
                ,area: ['506px','288px']
                ,btn: ['保存', '取消']
                ,yes: function (index, layero) {
                    $("#pertSysAddSubmit").click();
                }
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/pert_sysAdd',data).done(function () {

                    });
                }
            });
        } else if (obj.event == 'del'){
            layer.confirm('确定删除？', function () {
                admin.req({
                    type: 'post',
                    data: {ids: data.id},
                    url: setter.baseUrl + 'pert/revieworder/delete',
                    success: function (data) {
                        layer.alert("评审订单删除成功！");
                        table.reload('iqcMana_pertSys');
                        layer.closeAll();
                    }
                });
            });
        }
    });
    exports('iqcMana_pert_sys', {});
});