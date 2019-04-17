/**

 @Name:    市场管理－－［订单评审］

 */


layui.define(['admin','table','index','element','form','laydate'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        // ,laydate = layui.laydate
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
        elem: '#sqeMana_pert_sys'
        ,url: setter.baseUrl+'pert/revieworder/list?status=3'
        ,toolbar: "#sqeMana_pertSys_tb"
        ,cellMinWidth: 80
        ,id: "sqeMana_pertSys"
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
            // ,{field: 'boardFee',title: '板费', Width: 110}
            // ,{field: 'engineeringFee',title: '工程费', Width: 110}
            // ,{field: 'overworkFee',title: '加急费', Width: 110}
            // ,{field: 'postFee',title: '邮费', Width: 110}
            // ,{field: 'testCostFee',title: '测试费', Width: 110}
            // ,{field: 'toolingFee',title: '工具费', Width: 110}
            // ,{field: 'unitPrice',title: '单价', Width: 110}
            // ,{field: 'quoteGerberName',title: '文件名', Width: 110, hide: true}
            // ,{field: 'quoteGerberPath',title: '文件路径', Width: 110, hide: true}
            ,{field: 'id',title: 'ID', hide: true}
            ,{fixed: 'right', title:'操作', toolbar: '#sqeMana_pertSys_tabbar',width: 150}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(sqeMana_pert_sys)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var pertData = new Object();
        switch (obj.event) {
            case 'submit':
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
                            data: {id:data[0].id,status: 4},
                            success: function () {
                                layer.alert('评审提交成功！', function () {
                                    table.reload('sqeMana_pertSys');
                                    layer.closeAll();
                                });
                            }
                        });
                    });
                }
                break;
            case 'addOffer':
                var data = checkStatus.data;
                admin.req({
                    type: 'post',
                    url: setter.baseUrl + 'sys/consumer/user/all',
                    success: function (resCus) {
                        var resData = {};
                        var pcbInfo = {supplierNo:'', unitPrice:'',boardFee: '',postFee:'',testCostFee:'',engineeringFee:'',toolingFee:'',overworkFee:''}
                        resData.cInfo = resCus.data;
                        resData.pcbInfo = pcbInfo;
                        admin.popup({
                            title: '添加供应商报价',
                            area: ['749px','486px'],
                            btn: ['保存', '取消'],
                            yes: function (index, layero) {
                                $("#pertSysSOrderAddSubmit").click();
                            }
                            ,success: function (layero, index) {
                                view(this.id).render('sqeManagement/iframeWindow/pert_sysSOrderAdd', resData).done(function () {
                                    form.render();
                                    form.on('submit(pertSysSOrderAddSubmit)', function (data) {
                                        var field = data.field;
                                        field.orderId = _this_id;
                                        admin.req({
                                            type: 'post',
                                            data: field,
                                            url: setter.baseUrl + 'pert/supplierquote/save',
                                            success: function () {
                                                layer.alert('供应商报价添加成功！', function () {
                                                    table.reload('sqeMana_pertSys');
                                                    layer.closeAll();
                                                });
                                            }
                                        });
                                        console.log(field);
                                    })
                                });
                            }
                        });
                    }
                });
                break;
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(sqeMana_pert_sys)', function (obj) {
        var data = obj.data;
        var _this_id = data.id;
        console.log("_this_id"+ _this_id);
        if (obj.event == 'del'){
            layer.confirm('确定删除？', function () {
                admin.req({
                    type: 'post',
                    data: {ids: data.id},
                    url: setter.baseUrl + 'pert/revieworder/delete',
                    success: function (data) {
                        layer.alert("评审订单删除成功！");
                        table.reload('sqeMana_pertSys');
                        layer.closeAll();
                    }
                });
            });
        } else if (obj.event == 'detail') {
            admin.popup({
                title: '编辑PCB订单信息'
                ,btn:['立即提交', '取消']
                ,area: ['76%', '90%']
                ,yes: function () {
                    $(".submit-ok").click();
                }
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderPCB_update', data).done(function () {
                        console.log(data);
                        form.render(null, '');
                        form.on('submit(LAY-pcborder-update-submit)',function (data) {
                            var field = data.field;
                            console.log("提交的字段信息："+JSON.stringify(field));
                            admin.req({
                                type: 'post'
                                ,url: setter.baseUrl+'pert/pcbinfo/save'
                                ,data: field
                                ,done: function (res) {
                                    layer.msg('订单信息修改成功');
                                    layui.table.reload('interior_order_Tabpcb');
                                }
                                ,fail: function (res) {
                                    layer.msg("订单信息修改失败，请稍后再试！");
                                },
                            });
                            layer.close(index);
                            return false;
                        });
                    });
                }
            });
        } else if (obj.event == 'sOrderDetail') {
            var popData = {type: 'sqeMana_pert'}
            admin.popup({
                title: '供应商报价详情'
                ,btn:['返回']
                ,area: ['56%','56%']
                ,yes: function () {
                    layer.closeAll();
                }
                ,success: function (layero, index) {
                    view(this.id).render('sqeManagement/iframeWindow/supplierOrder_detail', popData).done(function () {
                        console.log(popData);
                        form.render();
                    });
                }
            });
        }
    });
    exports('sqeMana_pert_sys', {});
});