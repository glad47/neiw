/**

 @Name:    品质管理 ng评审

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

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(tab-planToger-ng-review)', function(data){

        if (data.index === 0){
            tabRenderPCB();
        } else if (data.index === 1){
            tabRenderStencil();
        } else if (data.index === 2){
        }
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    function tabRenderPCB() {
        table.render({
            elem: '#iqcMana_ngReview'
            ,url: setter.baseUrl+'iqc/pcborder/ngReview/list'
            //,toolbar: "#ord_sqpManaPlan_tb"
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
                {field: 'status',title: '状态', width: 110, templet:'#iqcMana_ia', sort: true}      // 1 ＝ 已指派  2= 已报价
                ,{field: 'id',title: 'ID', hide: true, sort: true}
                ,{field: 'supplierContractNo', title: '合同单号', minWidth: 171, sort: true}
                ,{field: 'deliveryTime',title: '交期', width: 110, templet: ' <a>{{ d.deliveryTime.substring(0,10) }}</a> ', sort: true}
                ,{field: 'supplierId', title: '供应商编号', width: 117, sort: true}
                ,{field: 'factoryMake', title: '供应商厂编', width: 117, sort: true}
                ,{field: 'productNo', title: '聚谷型号', width: 124, sort: true}
                ,{field: 'orderPcsNumber', title: '订单数量(PCS)', width: 134, sort: true}
                ,{field: 'donePcsNumber', title: '已交数量(PCS)', width: 134, sort: true}
                ,{field: 'surplusPcsNumber', title: '未交数量(PCS)', width: 134, sort: true}
                ,{field: 'currPcsNumber', title: '送货数量', minWidth: 133, sort: true}
                ,{field: 'courierCompany', title: '快递公司', width: 124, sort: true}
                ,{field: 'courierOrderNo', title: '快递订单号', width: 117, sort: true}
                ,{field: 'deliveryOrderNo', title: '送货单号', width: 117, sort: true}
                ,{field: 'deliveryNo', title: '交货批次', width: 144, sort: true}
                ,{field: 'gmtCreate', title: 'gmtCreate', hide: true}
                ,{field: 'gmtModified', title: 'gmtModified', hide: true}
                ,{fixed: 'right', title:'操作', toolbar: '#iqcManaNgveiw_tabbar_ngReview',width: 160}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }
    // table.on('toolbar(iqcMana_ngReview)', function (obj) {
    //     var checkStatus = table.checkStatus(obj.config.id);
    //     var Pdata = {data:{},result:{}};     // data为表格数据/result为请求到的数据
    //     Pdata.data = checkStatus.data[0];
    //     if(obj.event === 'submit'){     //通知出货
    //         if (checkStatus.data.length < 1) {
    //             layer.msg('请选择一条数据');
    //             return false;
    //         } else if (checkStatus.data.length >= 2) {
    //             layer.msg('最多只能选择一条数据！');
    //             return false;
    //         }
    //         admin.req({
    //             type: 'post',
    //             data: {'oid':checkStatus.data[0].id},
    //             url: setter.baseUrl+'scm/ordershipment/infoByOid',
    //             success: function (result) {
    //                 Pdata.result = result.data;
    //                 console.log(Pdata);
    //                 admin.popup({
    //                     title: '交货明细'
    //                     ,area: ['702px','547px']
    //                     ,btn: ['出货', '取消']
    //                     ,yes: function (index, layero) {
    //                         layer.confirm('确定要生产送货单？', function () {
    //                             $("#subdetailsDelivery").click();
    //                         });
    //                     }
    //                     ,success: function (layero, index) {
    //                         var id = Pdata.data.id;
    //                         Pdata.type = 0;
    //                         console.log(Pdata);
    //                         view(this.id).render('sqeManagement/iframeWindow/details_delivery', Pdata).done(function () {
    //                             form.render();
    //                             form.on('submit(detailsDelivery)', function (data) {
    //                                 layer.msg("提交");
    //                                 var data = data.field;
    //                                 data.orderSupplierId = Pdata.data.id;                               // 供应商订单id
    //                                 data.supplierNo = Pdata.data.supplierId;                            // 供应商编号
    //                                 data.deliveryTime = new Date().toLocaleDateString();                // 交期
    //                                 data.orderPcsNumber = Pdata.data.quantityPcs;                       // 订单PCS数
    //                                 data.orderId = Pdata.data.orderId;                                  // 订单id
    //                                 data.donePcsNumber = parseInt($("#donePcsNumber").text());          // 已交PCS数
    //                                 data.surplusPcsNumber = parseInt($("#surplusPcsNumber").text());    // 未交PCS数
    //                                 console.log(data);
    //                                 admin.req({
    //                                     type: 'post',
    //                                     data: data,
    //                                     url: setter.baseUrl+'sqe/pcborder/saveShipmentOrderByPt',
    //                                     success: function (result) {
    //                                         layer.alert("提交成功！");
    //                                         table.reload('iqcMana_ngReview');
    //                                         layer.closeAll();
    //                                     }
    //                                 });
    //                                 return false;
    //                             });
    //                         });
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(iqcMana_ngReview)', function (obj) {
        var data = obj.data;
        if (obj.event == 'edit'){
            admin.popup({
                title: 'PCB此批来料检验'
                ,area: ['624px','494px']
                ,btn: ['NG批退', 'OK入库']
                ,btn1: function () {
                    data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    layer.confirm('确定批退？', function () {
                        admin.req({
                            type: 'post',
                            data: data,
                            url: setter.baseUrl+'iqc/pcborder/statusBack',
                            success: function (result) {
                                table.reload('iqcMana_ngReview');
                                layer.closeAll();
                            }
                        });
                    });
                    return false;
                },
                btn2: function () {
                    data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    console.log(data);
                    layer.confirm('确定入库？', function () {
                        admin.req({
                            type: 'post',
                            data: data,
                            url: setter.baseUrl+'iqc/pcborder/statusOk',
                            success: function (result) {
                                table.reload('iqcMana_ngReview');
                                layer.closeAll();
                            }
                        });
                    });
                    return false;
                }
                ,success: function (layero, index) {
                    var id = data.id;
                    var supplierId = data.supplierId;
                    var orderId = data.orderId;
                    view(this.id).render('iqcManagement/iframeWindow/incoming_auditor_edit',data).done(function () {
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
                                    table.reload('iqcIncom_auditor');
                                    layer.close(index);
                                }
                            });
                            return false;
                        });
                    });
                }
            });
        }
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ Stencil 钢网 订单
    function tabRenderStencil() {
        table.render({
            elem: '#iqcMana_ngReviewS'
            ,url: setter.baseUrl+'iqc/stencilorder/ngReview/list'
            //,toolbar: "#ord_sqpManaPlan_tbS"
            ,cellMinWidth: 80
            ,id: "iqcMana_ngReviewS"
            ,page: true
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,cols: [[
                 {field: 'status',title: '状态', width: 110, templet:'#iqcMana_ia', sort: true}      // 1 ＝ 已指派  2= 已报价
                ,{field: 'id',title: 'ID', hide: true, sort: true}
                ,{field: 'supplierContractNo', title: '合同单号', minWidth: 171, sort: true}
                ,{field: 'deliveryTime',title: '交期', width: 110, templet: ' <a>{{ d.deliveryTime.substring(0,10) }}</a> ', sort: true}
                ,{field: 'supplierId', title: '供应商编号', width: 117, sort: true}
                ,{field: 'factoryMake', title: '供应商厂编', width: 117, sort: true}
                ,{field: 'productNo', title: '聚谷型号', width: 124, sort: true}
                ,{field: 'orderPcsNumber', title: '订单数量(PCS)', width: 134, sort: true}
                ,{field: 'donePcsNumber', title: '已交数量(PCS)', width: 134, sort: true}
                ,{field: 'surplusPcsNumber', title: '未交数量(PCS)', width: 134, sort: true}
                ,{field: 'currPcsNumber', title: '送货数量', minWidth: 133, sort: true}
                ,{field: 'courierCompany', title: '快递公司', width: 124, sort: true}
                ,{field: 'courierOrderNo', title: '快递订单号', width: 117, sort: true}
                ,{field: 'deliveryOrderNo', title: '送货单号', width: 117, sort: true}
                ,{field: 'deliveryNo', title: '交货批次', width: 144, sort: true}
                ,{field: 'gmtCreate', title: 'gmtCreate', hide: true}
                ,{field: 'gmtModified', title: 'gmtModified', hide: true}
                ,{fixed: 'right', title:'操作', toolbar: '#iqcManaNgveiw_tabbar_ngReviewS',width: 160}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }

    //监听行工具事件＝＝＝＝》钢网订单
    table.on('tool(iqcMana_ngReviewS)', function (obj) {
        var data = obj.data;
        if (obj.event == 'edit'){
            admin.popup({
                title: 'PCB此批来料检验'
                ,area: ['624px','494px']
                ,btn: ['NG批退', 'OK入库']
                ,btn1: function () {
                    data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    layer.confirm('确定批退？', function () {
                        admin.req({
                            type: 'post',
                            data: data,
                            url: setter.baseUrl+'iqc/stencilorder/statusBack',
                            success: function (result) {
                                table.reload('iqcMana_ngReviewS');
                                layer.closeAll();
                            }
                        });
                    });
                    return false;
                },
                btn2: function () {
                    data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    console.log(data);
                    layer.confirm('确定入库？', function () {
                        admin.req({
                            type: 'post',
                            data: data,
                            url: setter.baseUrl+'iqc/stencilorder/statusOk',
                            success: function (result) {
                                table.reload('iqcMana_ngReviewS');
                                layer.closeAll();
                            }
                        });
                    });
                    return false;
                }
                ,success: function (layero, index) {
                    var id = data.id;
                    var supplierId = data.supplierId;
                    var orderId = data.orderId;
                    view(this.id).render('iqcManagement/iframeWindow/incoming_auditor_edit',data).done(function () {
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
                                    table.reload('iqcIncom_auditor');
                                    layer.close(index);
                                }
                            });
                            return false;
                        });
                    });
                }
            });
        }
    });
    exports('iqcMana_ng_review', {});
});