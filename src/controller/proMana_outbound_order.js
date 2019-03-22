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
            ,{field: 'pcbName',title: '聚谷产品型号', width: 132}
            ,{fixed: 'right', title:'操作', toolbar: '#proManaNgveiw_tabbar',width: 230}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(iqcMana_outBound)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        if(obj.event === 'submit'){     //通知出货
            var ids = data.map(function(elem){return elem.id}).join(",");
            layer.confirm('确定出货？', function () {
                admin.req({
                    type: 'post',
                    data: {'':ids},
                    url: '',
                    success: function () {
                        layer.alert('出货成功!');
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
            admin.popup({
                title: '出货信息'
                ,area: ['734px','468px']
                ,btn: ['保存', '提交', '返回']
                ,yes: function (index, layero) {
                    layer.msg('保存');
                },
                btn2: function () {
                    layer.msg('保存');
                },
                btn3: function () {
                    layer.msg('删除');
                }
                ,success: function (layero, index) {
                    view(this.id).render('productManagement/iframeWindow/outbound_info',data).done(function () {

                    });

                }
            })
            if (data.finishPcsNumber === data.quantityPcs) {

            } else {
                layer.msg('PCS数未全部交清，操作失败！');
            }
        }
    });
    exports('proMana_outbound_order', {});
});