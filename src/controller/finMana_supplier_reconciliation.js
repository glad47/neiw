/**

 @Name:    财务管理  - 【供应商对账］

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
    element.on('tab(tab-quotationToger)', function(data){
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
        elem: '#finManaSupRe_tabPcb'
        ,url: setter.baseUrl+'fms/reconciliation/list'
        ,toolbar: "#finManaSupRe_tb"
        ,cellMinWidth: 80
        ,id: "finManaSupRe_tabPcb"
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
            ,{field: 'status',title: '状态',templet: '#pcb', width: 115, templet: '<div>{{ d.status == 4 ? "待确认交期" : "" }}</div>'}      // 1 ＝ 待报价
            ,{field: 'gmtCreate',title: '报价时间', width: 166}
            ,{field: 'reconciliationNo',title: '对账编号', width: 210}
            ,{field: 'supplierNo', title: '供应商编号', width: 124}
            ,{field: 'factoryMake', title: '供应商厂编', width: 117}
            ,{field: 'productNo', title: '聚谷型号', width: 124}
            ,{field: 'pcbName', title: '聚谷物料号', width: 144}
            ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134}
            ,{field: 'unitPrice', title: '单价', width: 96}
            ,{field: 'subtotal', title: '合计', width: 96}
            ,{field: 'remark', title: '订单备注', width: 168}
            // ,{field: 'gerberName',title: '文件名'}
            // ,{field: 'pcbType',title: 'PCB类型'}
            ,{fixed: 'right', title:'操作', toolbar: '#finManaSupRe_tbar',width: 150}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(finManaSupRe_tabPcb)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        if(obj.event === 'submit'){
            var data = checkStatus.data;
            if (data.length < 1) {
                layer.msg('最少选择一条数据！');
            } else {
                layer.confirm('确认提交？', function(index){
                    var reconciliationNos = data.map(function (elem) {
                        return elem.reconciliationNo
                    }).join(',');
                    admin.req({
                        type: 'post',
                        data: {reconciliationId:reconciliationNos},
                        url: setter.baseUrl+'fms/reconciliation/supplierReconciliation',
                        success: function (data) {
                            if (data.code != '500'){
                                layer.alert("提交成功！！");
                                var trigger = setTimeout(function () {
                                    table.reload('finManaSupRe_tabPcb');
                                    layer.close(index);
                                },1200);
                            }
                        }
                    });
                });
            }
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(finManaSupRe_tabPcb)', function (obj) {
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
                                    table.reload('finManaSupRe_tabPcb');
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
    exports('finMana_supplier_reconciliation', {});
});