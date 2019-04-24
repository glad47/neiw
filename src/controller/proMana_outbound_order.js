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

    tabRenderPCB();
    // 全局变量
    var _public_val = {
        orderType: 1        //订单类型 （1 pcb 2钢网 3 贴片）
    };

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(tab-planToger)', function(data){
        console.log(data.index);
        if (data.index === 0){
            tabRenderPCB();
            _public_val.orderType = 1;       //pcb
        } else if (data.index === 1){
            tabRenderStencil();
            _public_val.orderType = 2;      //钢网
        } else if (data.index === 2){
            _public_val.orderType = 3;      //贴片
        }
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    function tabRenderPCB() {
        table.render({
            elem: '#iqcMana_outBound'
            ,url: setter.baseUrl+'iqc/pcborder/outboundOrder/list'
            ,toolbar: "#ord_sqpManaPlan_tb"
            ,cellMinWidth: 80
            ,id: "iqcMana_outBound"
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
                ,{field: 'status',title: '状态', width: 110, templet: '#proManaquo_status'}      // 1 ＝ 待报价
                ,{field: 'invoiceNo',title: '合同号', minWidth: 165}
                ,{field: 'productNo',title: '聚谷型号', minWidth: 141}
                ,{field: 'deliveryTime',title: '交期'}
                ,{field: 'quantityPcs',title: '订单PCS数'}
                ,{field: 'finishPcsNumber',title: '已交PCS数', templet: '<div>{{ d.finishPcsNumber || 0 }}</div>'}
                ,{field: 'courierCompany',title: '快递公司'}
                ,{field: 'courierOrderNo',title: '快递单号'}
                ,{field: 'pcbName',title: '256', width: 132}
                ,{fixed: 'right', title:'操作', toolbar: '#proManaNgveiw_tabbar',width: 230}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }
    table.on('toolbar(iqcMana_outBound)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        var postData = new Array();
        if(obj.event === 'submit'){     //通知出货
            // // var id = data.map(function(elem){return elem.id}).join("id:");
            // var id = data.map(function(elem){
            //     // return elem.id;
            //     postData[id] = elem.id
            // }).join(",");
            // var uuid = data.map(function(elem){
            //     // return elem.uuid;
            //     postData[uuid] = elem.uuid
            // }).join(",");
            for (var i=0;i<data.length;i++) {
                postData[i] = {'id':data[i].id,'uuid':data[i].uuid};
            }
            var newData = new Object();
            newData.shipmentVoList = postData;
            // newData.access_token = layui.data('layuiAdmin').access_token;
            console.log(newData);
            console.log(postData);
            layer.confirm('确定出货？', function () {
                $.ajax({
                    type: 'post',
                    headers: {access_token:layui.data('layuiAdmin').access_token},
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(newData),
                    url: setter.baseUrl+'iqc/pcborder/shipment',
                    success: function () {
                        layer.alert('出货成功!');
                        table.reload("iqcMana_outBound");
                        layer.closeAll();
                    }
                })
            });
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(iqcMana_outBound)', function (obj) {
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
                                    table.reload('iqcMana_outBound');
                                    layer.close(index);
                                }
                            });
                            return false;
                        });
                    });
                }
            });
        } else if (obj.event == 'search') {
            layer.msg('查看订单协同');
        } else if (obj.event == 'chxx') {
            // console.log(data)
            var isNullShippingInfo;
            admin.req({
               type: 'post',
               url: setter.baseUrl + 'iqc/shippinginfo/info/'+data.id,
               success: function (res) {
                   data.shippingInfo = res.shippingInfo;
                   admin.popup({
                       title: '出货信息'
                       ,area: ['734px','468px']
                       ,btn: ['保存', '提交', '返回']
                       ,btn1: function (index, layero) {
                           layer.msg('保存');
                           $(".outbound-submit").attr("data","save");
                           $(".outbound-submit").click();
                           return false;
                       },
                       btn2: function () {
                           $(".outbound-submit").attr("data","submit");
                           $(".outbound-submit").click();
                           return false;
                       },
                       btn3: function () {
                           layer.msg('取消');
                       }
                       ,success: function (layero, index) {
                           view(this.id).render('productManagement/iframeWindow/outbound_info',data).done(function () {
                               //监听出货提交
                               form.on('submit(fomrOutboundInfo)', function (data) {
                                   var field = data.field;
                                   console.log(field);
                                   admin.req({
                                       url: setter.baseUrl+"iqc/pcborder/saveShippingInfo",
                                       type: 'POST',
                                       data: field,
                                       success: function (data) {
                                           if (data.code == 0) {
                                               layer.msg(data.msg);
                                           }else {
                                               layer.msg(data.msg,{icon: 5});
                                           }
                                           layui.table.reload('iqcMana_outBound'); //重载表格
                                           layer.close(index); //执行关闭
                                       }
                                   });
                                   return false;
                               });
                           });

                       }
                   });
               }
            });
            if (data.finishPcsNumber !== data.quantityPcs) {
                layer.msg('PCS数未全部交清，操作失败！');
            } else {
                layer.msg('PCS数全交期，操作成功！');
            }
        }
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ Stencil 钢网订单
    function tabRenderStencil() {
        table.render({
            elem: '#iqcMana_outBoundS'
            ,url: setter.baseUrl+'iqc/stencilorder/outboundOrder/list'
            ,toolbar: "#ord_sqpManaPlan_tb"
            ,cellMinWidth: 80
            ,id: "iqcMana_outBoundS"
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
                ,{field: 'status',title: '状态', width: 110, templet: '#proManaquo_status'}      // 1 ＝ 待报价
                ,{field: 'invoiceNo',title: '合同号', minWidth: 165}
                ,{field: 'productNo',title: '聚谷型号', minWidth: 141}
                ,{field: 'deliveryTime',title: '交期'}
                ,{field: 'quantityPcs',title: '订单PCS数'}
                ,{field: 'finishPcsNumber',title: '已交PCS数', templet: '<div>{{ d.finishPcsNumber || 0 }}</div>'}
                ,{field: 'courierCompany',title: '快递公司'}
                ,{field: 'courierOrderNo',title: '快递单号'}
                ,{field: 'pcbName',title: '256', width: 132}
                ,{fixed: 'right', title:'操作', toolbar: '#proManaNgveiw_tabbar',width: 230}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }
    exports('proMana_outbound_order', {});
});