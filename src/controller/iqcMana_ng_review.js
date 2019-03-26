/**

 @Name:    供应商管理－－［尾数管理］

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
        elem: '#iqcMana_ngReview'
        ,url: setter.baseUrl+'iqc/pcborder/ngReview/list'
        ,toolbar: "#ord_sqpManaPlan_tb"
        ,cellMinWidth: 80
        ,id: "iqcMana_ngReview"
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

            ,{field: 'orderPcsNumber',title: '订单PCS数', minWidth: 110}
            ,{field: 'donePcsNumber',title: '已交PCS数', minWidth: 110}
            ,{field: 'surplusPcsNumber',title: '未交PCS数', minWidth: 110}
            ,{field: 'failPcsNumber',title: '不合格PCS数', minWidth: 110}
            ,{field: 'currPcsNumber',title: '当前PCS数', minWidth: 110}
            ,{field: 'totalPcsNumber',title: '总PCS数', minWidth: 110}
            ,{field: 'deliveryNo',title: '交货批次', minWidth: 110}
            ,{field: 'deliveryTime',title: '交期', minWidth: 110}
            ,{field: 'productNo',title: 'P/N', minWidth: 110}
            ,{field: 'courierCompany',title: '快递公司', minWidth: 110}
            ,{field: 'courierOrderNo',title: '快递单号', minWidth: 110}
            ,{field: 'pcbName',title: '聚谷产品型号', minWidth: 110}
            ,{field: 'supplierContractNo',title: '供应商合同', minWidth: 140}
            ,{field: 'supplierId',title: '供应商id', hide: true}
            ,{fixed: 'right', title:'操作', toolbar: '#iqcManaNgveiw_tabbar',width: 150}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(iqcMana_ngReview)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var Pdata = {data:{},result:{}};     // data为表格数据/result为请求到的数据
        Pdata.data = checkStatus.data[0];
        if(obj.event === 'submit'){     //通知出货
            if (checkStatus.data.length < 1) {
                layer.msg('请选择一条数据');
                return false;
            } else if (checkStatus.data.length >= 2) {
                layer.msg('最多只能选择一条数据！');
                return false;
            }
            admin.req({
                type: 'post',
                data: {'oid':checkStatus.data[0].id},
                url: setter.baseUrl+'scm/ordershipment/infoByOid',
                success: function (result) {
                    Pdata.result = result.data;
                    console.log(Pdata);
                    admin.popup({
                        title: '交货明细'
                        ,area: ['702px','547px']
                        ,btn: ['出货', '取消']
                        ,yes: function (index, layero) {
                            layer.confirm('确定要生产送货单？', function () {
                                $("#subdetailsDelivery").click();
                            });
                        }
                        ,success: function (layero, index) {
                            var id = Pdata.data.id;
                            view(this.id).render('sqeManagement/iframeWindow/details_delivery', Pdata).done(function () {
                                form.render();
                                form.on('submit(detailsDelivery)', function (data) {
                                    layer.msg("提交");
                                    var data = data.field;
                                    data.orderSupplierId = Pdata.data.id;                               // 供应商订单id
                                    data.supplierNo = Pdata.data.supplierNo;                            // 供应商编号
                                    data.deliveryTime = new Date().toLocaleDateString();                // 交期
                                    data.orderPcsNumber = Pdata.data.quantityPcs;                       // 订单PCS数
                                    data.orderId = Pdata.data.orderId;                                  // 订单id
                                    data.donePcsNumber = parseInt($("#donePcsNumber").text());          // 已交PCS数
                                    data.surplusPcsNumber = parseInt($("#surplusPcsNumber").text());    // 未交PCS数
                                    console.log(data);
                                    admin.req({
                                        type: 'post',
                                        data: data,
                                        url: setter.baseUrl+'sqe/pcborder/saveShipmentOrderByPt',
                                        success: function (result) {
                                            layer.alert("提交成功！");
                                            table.reload('iqcMana_ngReview');
                                            layer.closeAll();
                                        }
                                    });
                                    return false;
                                });
                            });
                        }
                    });
                }
            });
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(iqcMana_ngReview)', function (obj) {
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
                                    table.reload('iqcMana_ngReview');
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
    exports('iqcMana_ng_review', {});
});