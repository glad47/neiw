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
        elem: '#iqcIncom_auditor'
        ,url: setter.baseUrl+'iqc/pcborder/incomingAuditor/list'
        ,toolbar: "#ord_sqpManaPlan_tb"
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
        ,where: {
            access_token: layui.data('layuiAdmin').access_token
        }
        ,cols: [[
            {type:'checkbox'}
            ,{field: 'status',title: '状态', width: 110, templet:'#iqcMana_ia'}      // 1 ＝ 已指派  2= 已报价
            ,{field: 'id',title: 'ID', hide: true}
            ,{field: 'deliveryTime',title: '交期', width: 110, templet: ' <a>{{ d.deliveryTime.substring(0,10) }}</a> '}
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
            ,{fixed: 'right', title:'操作', toolbar: '#iqcManaIncau_tabbar',width: 160}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(iqcIncom_auditor)', function (obj) {
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
                                    data.donePcsNumber = parseInt($("#donePcsNumber").text());          // 已交PCS数
                                    data.surplusPcsNumber = parseInt($("#surplusPcsNumber").text());    // 未交PCS数
                                    console.log(data);
                                    admin.req({
                                        type: 'post',
                                        data: data,
                                        url: setter.baseUrl+'sqe/pcborder/saveShipmentOrderByPt',
                                        success: function (result) {
                                            layer.alert("提交成功！");
                                            table.reload('iqcIncom_auditor' );
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
    table.on('tool(iqcIncom_auditor)', function (obj) {
        var data = {data:{}};
        data.data = obj.data;
        var d_data = {};        // 公共发送的对象
        d_data.id = obj.data.id;               // 供应商订单id
        d_data.orderSupplierId = obj.data.orderSupplierId;    // 供应商订单id
        d_data.supplierId = obj.data.supplierId;              // 供应商编号
        d_data.factoryMake = obj.data.factoryMake;            // 供应商厂编
        d_data.orderPcsNumber = obj.data.orderPcsNumber;      // 订单PCS数
        d_data.donePcsNumber = obj.data.donePcsNumber;        // 已交PCS数
        d_data.currPcsNumber = obj.data.currPcsNumber;        // 此次数量
        d_data.orderPeriod = "";    // 订单周期
        // d_data.totalPcsNumber = "";   // 总计 PCS
        console.log(d_data);
        if (obj.event == 'edit'){
            admin.popup({
                title: '此批来料检验'
                ,area: ['624px','494px']
                ,btn: ['NG评审', 'NG批退', 'OK入库', '返回']
                ,btn1: function (index, layero) {
                    d_data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    d_data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    console.log(d_data);
                    layer.confirm('确定评审？', function () {
                        admin.req({
                            type: 'post',
                            data: d_data,
                            url: setter.baseUrl+'iqc/pcborder/statusReview',
                            success: function (result) {
                                table.reload('iqcIncom_auditor');
                                layer.closeAll();
                            }
                        });
                    });
                },
                btn2: function () {
                    d_data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    d_data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    layer.confirm('确定批退？', function () {
                        admin.req({
                            type: 'post',
                            data: d_data,
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
                    d_data.pcsMantissa = $("input[name='pcsMantissa']").val();          // 尾数数量
                    d_data.failPcsNumber = $("input[name='failPcsNumber']").val();      // 不合格的数量
                    layer.confirm('确定入库？', function () {
                        admin.req({
                            type: 'post',
                            data: d_data,
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
                    layer.msg('退出');
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
    exports('iqcMana_incoming_auditor', {});
});