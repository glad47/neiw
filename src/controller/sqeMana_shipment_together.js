/**

 @Name:    供应商管理－－［报价协同］

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

    tabRenderPCB();
    // 全局变量
    var _public_val = {
        orderType: 1        //订单类型 （1 pcb 2钢网 3 贴片）
    };

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(tab-planToger)', function(data){
        console.log(data.index);
        if (data.index === 0){
            _public_val.orderType = 1;       //pcb
            tabRenderPCB();
        } else if (data.index === 1){
            _public_val.orderType = 2;      //钢网
            tabRenderStencil();
        } else if (data.index === 2){
            _public_val.orderType = 3;      //贴片
        }
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    function tabRenderPCB () {
        table.render({
            elem: '#sqeManaShip_tabPcb'
            ,url: setter.baseUrl+'sqe/pcborder/shipmentTogether/list'
            ,toolbar: "#ord_sqpManaShip_tb"
            ,cellMinWidth: 80
            ,id: "sqeManaShip_tabPcb"
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
                ,{field: 'productNo',title: '聚谷型号', width: 148, fixed: 'left'}
                ,{field: 'status',title: '状态', width: 110, templet:'#sqeMan_shipto'}
                ,{field: 'id',title: 'ID', hide: true}
                ,{field: 'supplierId',title: '供应商编号', width: 117}
                ,{field: 'factoryMake',title: '供应商厂编', width: 117}
                ,{field: 'gmtModified',title: '修改时间', width: 175}
                ,{field: 'deliveryTime',title: '交期', width: 110, templet: '#scmManaShip_deliver'}
                ,{field: 'orderPcsNumber', title: '订单PCS数', minWidth: 117}// 1 ＝ 待报价
                ,{field: 'donePcsNumber', title: '已提交PCS数', minWidth: 117}
                ,{field: 'surplusPcsNumber', title: '未交PCS数', minWidth: 117}
                ,{field: 'currPcsNumber', title: '当前提交PCS数', minWidth: 133}
                ,{field: 'totalPcsNumber', title: '总PCS数', minWidth: 117}
                ,{field: 'courierCompany', title: '快递公司', width: 124}
                ,{field: 'courierOrderNo', title: '快递订单号', width: 117}
                ,{field: 'deliveryNo', title: '交货批次', width: 144}
                ,{field: 'orderSupplierId', title: '供应商订单ID', minWidth: 122}
                ,{field: 'gmtCreate', title: 'gmtCreate', hide: true}
                ,{field: 'gmtModified', title: 'gmtModified', hide: true}
                ,{fixed: 'right', title:'操作', toolbar: '#scmManaShip_tabbar',width: 150}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }
    table.on('toolbar(sqeManaShip_tabPcb)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        if(obj.event === 'submit'){
            var data = checkStatus.data;
            var supplierContractNo = null;
            for (var i=0;i<data.length;i++){
                if (supplierContractNo == null){
                    supplierContractNo = data[i].supplierContractNo;
                } else {
                    supplierContractNo += ',' + data[i].supplierContractNo;
                }
            }
            layer.confirm('确认提交 ['+supplierContractNo+'] ?', function(index){
                admin.req({
                    type: 'post',
                    data: {'supplierContractNo':supplierContractNo},
                    url: setter.baseUrl+'sqe/pcborder/submitByOt',
                    success: function (data) {
                        if (data.code == '0'){
                            layer.alert("提交成功！！");
                            table.reload('sqeManaShip_tabPcb');
                            layer.close(index);
                        }
                    }
                });
                table.reload('sqeManaPlan_tabPcb');
            });
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(sqeManaShip_tabPcb)', function (obj) {
        var data = obj.data;
        if (obj.event == 'edit'){
            layer.msg('编辑操作');
            admin.popup({
                title: '订单协同编辑'
                ,area: ['434px','448px']
                ,btn: ['保存', '取消']
                ,yes: function (index, layero) {
                    layer.msg('提交信息');
                    $(".otEdit").click();
                }
                ,success: function (layero, index) {
                    var id = data.id;
                    var supplierId = data.supplierId;
                    var orderId = data.orderId;
                    view(this.id).render('sqeManagement/iframeWindow/order_together_edit',data).done(function () {
                        form.on('submit(otEdit)', function (data) {
                            var field = data.field;
                            field.id = id;
                            field.orderId = orderId;
                            field.supplierId = supplierId;
                            console.log(field);
                            admin.req({
                                type: 'post',
                                data: field,
                                url: setter.baseUrl+'scm/ordersupplier/update',
                                success: function (data) {
                                    layer.alert("订单协同修改成功");
                                    // layer.closeAll();
                                    table.reload('sqeManaPlan_tabPcb');
                                    layer.close(index);
                                }
                            });
                            return false;
                        });
                    });
                }
            });
        } else if (obj.event == 'search'){
            layer.msg('查看订单协同');
        }
    });


    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 钢网订单
    function tabRenderStencil () {
        table.render({
            elem: '#sqeManaShip_tabStencil'
            ,url: setter.baseUrl+'sqe/stencilorder/shipmentTogether/list'
            ,toolbar: "#ord_sqpManaShip_tbS"
            ,cellMinWidth: 80
            ,id: "sqeManaShip_tabStencil"
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
                ,{field: 'status',title: '状态', width: 110, templet:'#iqcMana_ia'}
                ,{field: 'id',title: 'ID', hide: true}
                ,{field: 'gmtModified',title: '修改时间', width: 175}
                ,{field: 'deliveryTime',title: '交期', width: 110, templet: '#scmManaShip_deliverS'}
                ,{field: 'orderPcsNumber', title: '订单PCS数', minWidth: 117}// 1 ＝ 待报价
                ,{field: 'donePcsNumber', title: '已提交PCS数', minWidth: 117}
                ,{field: 'surplusPcsNumber', title: '未交PCS数', minWidth: 117}
                ,{field: 'currPcsNumber', title: '当前提交PCS数', minWidth: 133}
                ,{field: 'totalPcsNumber', title: '总PCS数', minWidth: 117}
                ,{field: 'courierCompany', title: '快递公司', width: 124}
                ,{field: 'courierOrderNo', title: '快递订单号', width: 117}
                ,{field: 'deliveryNo', title: '交货批次', width: 144}
                ,{field: 'orderSupplierId', title: '供应商订单ID', minWidth: 122}
                ,{field: 'gmtCreate', title: 'gmtCreate', hide: true}
                ,{field: 'gmtModified', title: 'gmtModified', hide: true}
                ,{fixed: 'right', title:'操作', toolbar: '#scmManaShip_tabbarS',width: 150}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }
    // 监听Stencil工具头
    table.on('toolbar(sqeManaShip_tabStencil)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        if (data.length<1) {
            layer.msg('请选择一条数据！');
        } else if(obj.event === 'submit'){
            var ids = null;
            for (var i=0;i<data.length;i++){
                if (ids == null){
                    ids = ids + data[i].id;
                } else {
                    ids = ids + ',' + data[i].id;
                }
            }
            layer.confirm('确认提交 ['+ids+'] ?', function(index){
                admin.req({
                    type: 'post',
                    data: {ids},
                    url: setter.baseUrl+'sqe/pcborder/batch/submit',
                    success: function (data) {
                        if (data.code == '0'){
                            layer.alert("提交成功！！");
                            table.reload('sqeMana_reconPcbTab');
                            layer.close(index);
                        }
                    }
                });
            });
        }
    });
    //监听行工具事件＝＝＝＝》Stencil 订单
    table.on('tool(sqeManaShip_tabStencil)', function (obj) {
       var data = obj.data;
       if (obj.event == 'edit') {

       }
    });

    //监听搜索
    form.on('submit(shipmentTogether_search)', function(data){
        var field = data.field;
        var reTab;
        if (_public_val.orderType === 1) {   // PCB
            reTab = 'sqeManaShip_tabPcb';
        } else if (_public_val.orderType === 2) {    //  Stencil
            reTab = 'sqeManaShip_tabStencil';
        }
        table.reload(reTab, {
            where: field
        });
    });
    $(".shipment-together-search input").bind("input propertychange", function (even) {
        $("*[lay-filter='shipmentTogether_search']").click();
    })
    exports('sqeMana_shipment_together', {});
});