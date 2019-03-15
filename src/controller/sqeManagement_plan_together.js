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
        elem: '#sqeManaPlan_tabPcb'
        ,url: setter.baseUrl+'sqe/pcborder/planTogether/list'
        ,toolbar: "#ord_sqpManaPlan_tb"
        ,cellMinWidth: 80
        ,id: "sqeManaPlan_tabPcb"
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
            ,{field: 'status',title: '状态',templet: '#planStatus', width: 110}      // 1 ＝ 待报价
            ,{field: 'supplierContractNo', title: '合同单号', minWidth: 171}
            ,{field: '',title: '签约日期', width: 110}
            ,{field: 'supplierNo', title: '供应商编号', width: 117}
            ,{field: 'factoryMake', title: '供应商厂编', width: 117}
            ,{field: 'productNo', title: '聚谷订单号', width: 124}
            ,{field: 'productNo', title: '聚谷P/N', width: 124}
            ,{field: 'pcbName', title: '聚谷产品型号', width: 144}
            ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134}
            ,{field: 'remark', title: '在线数量(PCS)', width: 168}
            ,{field: 'deliveryTime',title: '交期', width: 110, templet: '#sqeManaDt'}
            ,{field: '',title: '当前工序', width: 110}
            ,{field: '',title: '进度', width: 110}
            // ,{field: 'gerberName',title: '文件名'}
            // ,{field: 'pcbType',title: 'PCB类型'}
            ,{fixed: 'right', title:'操作', toolbar: '#scmManaPlan_tabbar',width: 150}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(sqeManaPlan_tabPcb)', function (obj) {
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
                                         table.reload('sqeManaPlan_tabPcb');
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
    table.on('tool(sqeManaPlan_tabPcb)', function (obj) {
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
    exports('sqeManagement_plan_together', {});
});