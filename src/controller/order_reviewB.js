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
        elem: '#orderReviewB_pert_sys'
        ,url: setter.baseUrl+'pert/revieworder/list?status=4'
        ,toolbar: "#orderReviewB_pertSys_tb"
        ,cellMinWidth: 80
        ,id: "orderReviewB_pert_sys"
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {type:'checkbox',fixed: 'left'}
            ,{field:'productNo',fixed: 'left', title: 'Product No', align:'center', width: 135, sort: true}
            ,{field: 'status',title: '状态', width: 110, sort: true}      // 1 ＝ 待报价
            ,{field: 'customerNo',title: '客户编号', Width: 110, sort: true}
            ,{field: 'productNo',title: 'P/N', minWidth: 219, sort: true}
            ,{field: 'boardFee',title: '板费', Width: 110, sort: true}
            ,{field: 'engineeringFee',title: '工程费', Width: 110, sort: true}
            ,{field: 'overworkFee',title: '加急费', Width: 110, sort: true}
            ,{field: 'postFee',title: '邮费', Width: 110, sort: true}
            ,{field: 'testCostFee',title: '测试费', Width: 110, sort: true}
            ,{field: 'toolingFee',title: '工具费', Width: 110, sort: true}
            ,{field: 'unitPrice',title: '单价', Width: 110, sort: true}
            ,{field: 'quoteGerberName',title: '文件名', Width: 110, hide: true, sort: true}
            ,{field: 'quoteGerberPath',title: '文件路径', Width: 110, hide: true, sort: true}
            ,{field: 'id',title: 'ID', hide: true, sort: true}
            ,{fixed: 'right', title:'操作', toolbar: '#orderReviewB_pertSys_tabbar',width: 220, sort: true}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(orderReviewB_pert_sys)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var pertData = new Object();
        var data = checkStatus.data;
        if (data.length>1) {
            layer.msg("最多只能选择一条数据！");
        } else if (data.length != 0) {
            var _this_id = data[0].id;
        } else {
            layer.msg("请选择一条要提交的数据！");
            return false;
        }
        console.log(data);
        switch (obj.event) {
            case 'add':
                pertData.opType = 'add';
                admin.popup({
                    title: '修改评审订单'
                    ,area: ['985px','701px']
                    ,btn: ['保存', '取消']
                    ,yes: function (index, layero) {
                        $(".bot-subbtn").click();
                    }
                    ,success: function (layero, index) {
                        view(this.id).render('epcManagement/iframeWindow/pert_pcbDetailAdd',data).done(function () {
                            form.on('submit(pertDetailForm)', function (data) {
                                var field = data.field;
                                field.orderId = _this_id;
                                console.log(field);
                                admin.req({
                                    type: 'post',
                                    data: field,
                                    url: setter.baseUrl + 'pert/pcbinfo/save',
                                    success: function () {
                                        layer.alert('供应商报价添加成功！', function () {
                                            layer.closeAll();
                                        });
                                    }
                                });
                                return false;
                            });
                            form.render();
                        });
                    }
                });
                break;

            case 'submit':
                var data = checkStatus.data;
                layer.confirm('确定提交评审？', function () {
                    admin.req({
                        type: 'post',
                        url: setter.baseUrl + 'pert/revieworder/update',
                        data: {id:data[0].id,status: 3},
                        success: function () {
                            layer.alert('评审提交成功！', function () {
                                table.reload('epcMana_pertSys');
                                layer.closeAll();
                            });
                        }
                    });
                });
                break;
            case 'addOffer':
                var data = checkStatus.data;
                admin.req({
                    type: 'post',
                    url: setter.baseUrl + 'sys/consumer/user/all',
                    success: function (resCus) {
                        var resData = {};
                        var pcbInfo = data[0];
                        resData.cInfo = resCus.data;
                        resData.pcbInfo = pcbInfo;
                        admin.popup({
                            title: '[添加&修改]供应商报价',
                            area: ['749px','486px'],
                            btn: ['保存', '取消'],
                            yes: function (index, layero) {
                                $("#pertSysOrderAddSubmit").click();
                            }
                            ,success: function (layero, index) {
                                view(this.id).render('sqeManagement/iframeWindow/pert_sysOrderAdd', resData).done(function () {
                                    console.log(resData);
                                    form.render();
                                    form.on('submit(pertSysOrderAddSubmit)', function (data) {
                                        var field = data.field;
                                        field.orderId = data.orderId;
                                        field.id = _this_id;
                                        admin.req({
                                            type: 'post',
                                            data: field,
                                            url: setter.baseUrl + 'pert/revieworder/update',
                                            success: function () {
                                                layer.alert('供应商报价添加成功！', function () {
                                                    table.reload('orderReviewB_pert_sys');
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
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(orderReviewB_pert_sys)', function (obj) {
        var data = obj.data;
        var _this_id = data.id;
        console.log("_this_id"+ _this_id);
        if (obj.event == 'del'){
            layer.confirm('确定删除？', function () {
                admin.req({
                    type: 'post',
                    data: {ids: _this_id},
                    url: setter.baseUrl + 'pert/revieworder/delete',
                    success: function (data) {
                        layer.alert("评审订单删除成功！");
                        table.reload('orderReviewB_pert_sys');
                        layer.closeAll();
                    }
                });
            });
        } else if (obj.event == 'detail') {
            admin.req({
                type: 'post',
                url: setter.baseUrl + 'pert/pcbinfo/info/' + _this_id,
                success: function (res) {
                    var resData = res.pcbInfo;
                    if (resData != null) {
                        admin.popup({
                            title: '查看PCB订单信息'
                            ,btn:['立即提交', '取消']
                            ,area: ['76%', '90%']
                            ,yes: function () {
                                $(".submit-ok").click();
                            }
                            ,success: function (layero, index) {
                                view(this.id).render('epcManagement/iframeWindow/pert_sysPCB_detail', resData).done(function () {
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
                    } else {
                        layer.alert('当前订单不存在pcb参数信息，添加选择表格左上角的添加按钮');
                    }
                }
            });
        } else if (obj.event == 'sOrderDetail') {
           var popData = {type: 'marketPert'}
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
            })
        }
    });
    exports('order_reviewB', {});
});