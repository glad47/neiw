/**

 @Name:    品质管理－－［来料检验］

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
    element.on('tab(tab-pruchprocurmentDetail)', function(data){
        console.log(data.index);
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
            elem: '#proMana_procuDetailPCB'
            ,url: setter.baseUrl+'scm/pcborder/purchasingDetails'
            ,toolbar: "#sqeMana_incoAuTb"
            ,cellMinWidth: 80
            ,id: "proMana_procuDetailPCB"
            ,page: true
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.data.list,
                    "count": res.data.totalCount
                }
            }
            ,cols: [[
                {type:'checkbox', fixed: 'left'}
                ,{field: 'productNo',title: '内部编号', width: 130, fixed: 'left', templet:'#iqcMana_ia', sort: true}      // 1 ＝ 已指派  2= 已报价
                ,{field: 'id',title: '客户编号', width: 134, sort: true}
                ,{field: 'gmtCreate', title: '下单日期', minWidth: 171, sort: true}
                ,{field: 'currentProcess',title: '进度', width: 110, sort: true}
                ,{field: 'supplierId', title: '工艺要求', width: 313, sort: true, templet: '#purchase_gyyy'}
                ,{field: 'factoryMake', title: '尺寸(mm)', width: 117, sort: true, templet: '#purchase_CC'}
                ,{field: 'quantityPcs', title: '数量(PCS)', width: 134, sort: true}
                ,{field: 'unitPrice', title: 'K单价(元)', width: 134, sort: true}
                ,{field: 'totalFee', title: 'K金额(元)', width: 134, sort: true}
                ,{field: 'supplierId', title: '供应商', width: 134, sort: true}
                ,{field: 'supplierUnitPrice', title: 'G单价(元)', width: 134, sort: true}
                ,{field: 'supplierTotalFee', title: 'G金额(元)', width: 134, sort: true}
                ,{field: '', title: '利润(元)', width: 134, sort: true, templet: '#purchase_LR'}
                ,{field: 'donePcsNumber', title: 'G支付情况', width: 134, sort: true}
                ,{field: 'supplierProcurementRemark', title: '备注', width: 134, sort: true, edit: 'text'}
                ,{field: 'shippingDeliveryDate', title: '出货日期', width: 134, sort: true}
                ,{field: 'countries', title: '目的地', width: 134, sort: true}
                ,{field: 'shippingWeight', title: '重量(kg)', width: 134, sort: true}
                ,{field: 'supplierTotalFee', title: '金额(元)', width: 134, sort: true}
                ,{field: 'donePcsNumber', title: '支付情况', width: 134, sort: true}
                ,{field: 'businessName', title: '业务员', width: 134, sort: true}
                ,{field: 'courierName', title: '物流公司', width: 134, sort: true}
                ,{field: 'shippingCourierNumber', title: '运单号', width: 134, sort: true}
                ,{field: 'shippingPostalFee', title: '运费', width: 134, sort: true}
                ,{field: 'shippingProcurementRemark', title: '备注', width: 134, sort: true, edit: 'text'}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }

    table.on('toolbar(proMana_procuDetailPCB)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(proMana_procuDetailPCB)', function (obj) {
        var data = obj.data;
        console.log(data);
    });

    // 监听 PCB 单元格编辑
    table.on('edit(proMana_procuDetailPCB)', function(obj){
        // console.log(obj.value); //得到修改后的值
        // console.log(obj.field); //当前编辑的字段名
        // console.log(obj.data); //所在行的所有相关数据
        var postData = {};
        if (obj.field == 'shippingProcurementRemark') {
            postData = {isiId: obj.data.isiId, shippingProcurementRemark: obj.value};
        } else if (obj.field == 'supplierProcurementRemark') {
            postData = {sosId: obj.data.sosId, supplierProcurementRemark: obj.value};
        }
        admin.req({
            type: 'post',
            data: postData,
            url: setter.baseUrl + 'scm/pcborder/editPurchasingDetails',
            success: function (res) {
                layer.msg("修改成功！");
            }
        })
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ Stencil 钢网 订单
    function tabRenderStencil() {
        table.render({
            elem: '#proMana_procuDetailS'
            ,url: setter.baseUrl+'scm/stencilorder/purchasingDetails'
            ,toolbar: "#proMana_procuDetailS"
            ,cellMinWidth: 80
            ,id: "proMana_procuDetailS"
            ,page: true
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.data.list,
                    "count": res.data.totalCount
                }
            }
            ,cols: [[
                {type:'checkbox', fixed: 'left'}
                ,{field: 'productNo',title: '内部编号', width: 130, fixed: 'left', templet:'#iqcMana_ia', sort: true}      // 1 ＝ 已指派  2= 已报价
                ,{field: 'id',title: '客户编号', width: 134, sort: true}
                ,{field: 'gmtCreate', title: '下单日期', minWidth: 171, sort: true}
                ,{field: 'currentProcess',title: '进度', width: 110, sort: true}
                ,{field: 'supplierId', title: '工艺要求', width: 395, sort: true, templet: '#purchase_gyyyS'}
                ,{field: 'factoryMake', title: '尺寸(mm)', width: 207, sort: true, templet: '#purchase_CCS'}
                ,{field: 'quantity', title: '数量(PCS)', width: 134, sort: true}
                ,{field: 'unitPrice', title: 'K单价(元)', width: 134, sort: true}
                ,{field: 'totalStencilFee', title: 'K金额(元)', width: 134, sort: true}
                ,{field: 'supplierId', title: '供应商', width: 134, sort: true}
                ,{field: 'supplierUnitPrice', title: 'G单价(元)', width: 134, sort: true}
                ,{field: 'supplierTotalFee', title: 'G金额(元)', width: 134, sort: true}
                ,{field: '', title: '利润(元)', width: 134, sort: true, templet: '#purchase_LRS'}
                ,{field: 'donePcsNumber', title: 'G支付情况', width: 134, sort: true}
                ,{field: 'supplierProcurementRemark', title: '备注', width: 134, sort: true, edit: 'text'}
                ,{field: 'shippingDeliveryDate', title: '出货日期', width: 134, sort: true}
                ,{field: 'countries', title: '目的地', width: 134, sort: true}
                ,{field: 'shippingWeight', title: '重量(kg)', width: 134, sort: true}
                ,{field: 'supplierTotalFee', title: '金额(元)', width: 134, sort: true}
                ,{field: 'donePcsNumber', title: '支付情况', width: 134, sort: true}
                ,{field: 'businessName', title: '业务员', width: 134, sort: true}
                ,{field: 'courierName', title: '物流公司', width: 134, sort: true}
                ,{field: 'shippingCourierNumber', title: '运单号', width: 134, sort: true}
                ,{field: 'shippingPostalFee', title: '运费', width: 134, sort: true}
                ,{field: 'shippingProcurementRemark', title: '备注', width: 134, sort: true, edit: 'text'}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }

    // 监听 Stencil 单元格编辑
    table.on('edit(proMana_procuDetailS)', function(obj){
        var postData = {};
        if (obj.field == 'shippingProcurementRemark') {
            postData = {isiId: obj.data.isiId, shippingProcurementRemark: obj.value};
        } else if (obj.field == 'supplierProcurementRemark') {
            postData = {sosId: obj.data.sosId, supplierProcurementRemark: obj.value};
        }
        admin.req({
            type: 'post',
            data: postData,
            url: setter.baseUrl + 'scm/pcborder/editPurchasingDetails',
            success: function (res) {
                layer.msg("修改成功！");
            }
        })
    });

    table.on('toolbar(iqcIncom_auditorS)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        if (data.length<1) {
            layer.msg('请选择一条数据');
            return false;
        } else if(obj.event === 'plrk'){     //通知出货
            var sendData = new Array();
            for (var i=0;i< data.length;i++) {
                sendData.push({'id':data[i].id,'orderId':data[i].orderId,'orderPcsNumber':data[i].orderPcsNumber,'currPcsNumber':data[i].currPcsNumber,'orderType':data[i].orderType,'isInternal':data[i].isInternal,'onlineOid':data[i].onlineOid});
            }
            layer.confirm('确定批量入库？', function () {
                admin.req({
                    type: 'post',
                    headers: {access_token:layui.data('layuiAdmin').access_token},
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(sendData),
                    url: setter.baseUrl+'iqc/stencilorder/batchStatusOk',
                    success: function () {
                        layer.msg('批量入库成功');
                        table.reload('iqcIncom_auditorS');
                        layer.closeAll();
                    }
                });

            });
        }
    });
    //监听行工具事件＝＝＝＝》Stencil 订单
    table.on('tool(iqcIncom_auditorS)', function (obj) {
        var data = obj.data;
        console.log(data);
        if (obj.event == 'edit'){
            admin.popup({
                title: 'Stencil此批来料检验'
                ,area: ['624px','494px']
                ,btn: ['NG评审', 'NG批退', 'OK入库', '保存']
                ,btn1: function (index, layero) {
                    data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    layer.confirm('确定评审？', function () {
                        admin.req({
                            type: 'post',
                            data: data,
                            url: setter.baseUrl+'iqc/stencilorder/statusReview',
                            success: function (result) {
                                table.reload('iqcIncom_auditorS');
                                layer.closeAll();
                            }
                        });
                    });
                },
                btn2: function () {
                    //d_data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    //d_data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    //console.log(d_data);
                    data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    layer.confirm('确定批退？', function () {
                        admin.req({
                            type: 'post',
                            data: data,
                            url: setter.baseUrl+'iqc/stencilorder/statusBack',
                            success: function (result) {
                                table.reload('iqcIncom_auditorS');
                                layer.closeAll();
                            }
                        });
                    });
                    // layer.confirm('确定批退？', function () {
                    //     admin.req({
                    //         type: 'post',
                    //         data: d_data,
                    //         url: setter.baseUrl+'iqc/stencilorder/statusBack',
                    //         success: function (result) {
                    //             table.reload('iqcIncom_auditorS');
                    //             layer.closeAll();
                    //         }
                    //     });
                    // });
                    return false;
                },
                btn3: function () {
                    data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    layer.confirm('确定入库？', function () {
                        admin.req({
                            type: 'post',
                            data: data,
                            url: setter.baseUrl+'iqc/stencilorder/statusOk',
                            success: function (result) {
                                table.reload('iqcIncom_auditorS');
                                layer.closeAll();
                            }
                        });
                    });
                    return false;
                },
                btn4: function () {
                    data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    layer.confirm('确定保存？', function () {
                        admin.req({
                            type: 'post',
                            data: data,
                            url: setter.baseUrl+'iqc/stencilorder/updateOrderShipment',
                            success: function () {
                                table.reload('iqcIncom_auditorS');
                                layer.closeAll();
                            }
                        });
                    });
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
                                    layer.alert("Stencil订单协同修改成功");
                                    // layer.closeAll();
                                    table.reload('iqcIncom_auditorS');
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
    exports('purchase_procurement_detail', {});
});