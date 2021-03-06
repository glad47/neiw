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
    element.on('tab(tab-planToger)', function(data){
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
            elem: '#iqcIncom_auditor'
            ,url: setter.baseUrl+'iqc/pcborder/incomingAuditor/list'
            ,toolbar: "#sqeMana_incoAuTb"
            ,cellMinWidth: 80
            ,id: "iqcIncom_auditor"
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
                ,{field: 'status',title: '状态', width: 110, templet:'#iqcMana_ia', sort: true}      // 1 ＝ 已指派  2= 已报价
                ,{field: 'id',title: 'ID', hide: true, sort: true}
                ,{field: 'supplierContractNo', title: '合同单号', minWidth: 171, sort: true}
                ,{field: 'deliveryTime',title: '交期', width: 110, templet: ' <a>{{ d.deliveryTime.substring(0,10) }}</a> ', sort: true}
                ,{field: 'supplierId', title: '供应商编号', width: 117, sort: true}
                ,{field: 'factoryMake', title: '供应商厂编', width: 117, sort: true}
                ,{field: 'productNo', title: '聚谷型号', width: 135, sort: true}
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
                ,{fixed: 'right', title:'操作', toolbar: '#iqcManaIncau_tabbar',width: 160}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }

    table.on('toolbar(iqcIncom_auditor)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        if (data.length<1) {
            layer.msg('请选择一条数据');
            return false;
        } else if(obj.event == 'plrk'){     //通知出货
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
                    url: setter.baseUrl+'iqc/pcborder/batchStatusOk',
                    success: function () {
                        layer.msg('批量入库成功');
                        table.reload('iqcIncom_auditor');
                        layer.closeAll();
                    }
                });
            });
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(iqcIncom_auditor)', function (obj) {
        var data = obj.data;
        console.log(data);
        if (obj.event == 'edit'){
            admin.popup({
                title: 'PCB此批来料检验'
                ,area: ['624px','494px']
                ,btn: ['NG评审', 'NG批退', 'OK入库', '保存']
                ,btn1: function (index, layero) {
                    data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    layer.confirm('确定评审？', function () {
                        admin.req({
                            type: 'post',
                            data: data,
                            url: setter.baseUrl+'iqc/pcborder/statusReview',
                            success: function (result) {
                                table.reload('iqcIncom_auditor');
                                layer.closeAll();
                            }
                        });
                    });
                },
                btn2: function () {
                    data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    layer.confirm('确定批退？', function () {
                        admin.req({
                            type: 'post',
                            data: data,
                            url: setter.baseUrl+'iqc/pcborder/statusBack',
                            success: function (result) {
                                table.reload('iqcIncom_auditor');
                                layer.closeAll();
                            }
                        });
                    });
                    return false;
                },
                btn3: function () {
                    data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    console.log(data);
                    layer.confirm('确定入库？', function () {
                        admin.req({
                            type: 'post',
                            data: data,
                            url: setter.baseUrl+'iqc/pcborder/statusOk',
                            success: function (result) {
                                table.reload('iqcIncom_auditor');
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
                            url: setter.baseUrl+'iqc/pcborder/updateOrderShipment',
                            success: function () {
                                table.reload('iqcIncom_auditor');
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
        } else if (obj.event == 'search'){
            layer.msg('查看订单协同');
        }
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ Stencil 钢网 订单
    function tabRenderStencil() {
        table.render({
            elem: '#iqcIncom_auditorS'
            ,url: setter.baseUrl+'iqc/stencilorder/incomingAuditor/list'
            ,toolbar: "#sqeMana_incoAuTbS"
            ,cellMinWidth: 80
            ,id: "iqcIncom_auditorS"
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
                ,{field: 'status',title: '状态', width: 110, templet:'#iqcMana_ia', sort: true}      // 1 ＝ 已指派  2= 已报价
                ,{field: 'id',title: 'ID', hide: true, sort: true}
                ,{field: 'supplierContractNo', title: '合同单号', minWidth: 171, sort: true}
                ,{field: 'deliveryTime',title: '交期', width: 110, templet: ' <a>{{ d.deliveryTime.substring(0,10) }}</a> ', sort: true}
                ,{field: 'supplierId', title: '供应商编号', width: 117, sort: true}
                ,{field: 'factoryMake', title: '供应商厂编', width: 117, sort: true}
                ,{field: 'productNo', title: '聚谷型号', width: 135, sort: true}
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
                ,{fixed: 'right', title:'操作', toolbar: '#iqcManaIncau_tabbarS',width: 160}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }
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
    exports('iqcMana_incoming_auditor', {});
});