/**

 @Name:    财务管理  - 订单利润

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

    form.render(null,'fin-order-profits-formlist');

    // 全局变量
    var defVal = {
        orderType: 0,   //订单类型
    };
    tabRenderPCB();
    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(fin-order-profits-tabs-brief)', function(data){
         defVal.orderType = data.index;
        if (defVal.orderType === 0){
            tabRenderPCB();
        } else if (defVal.orderType === 1){
            tabRenderStencil();
        } else if(defVal.orderType === 2){
            console.log("贴片订单选项卡");
        }
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    function tabRenderPCB(){
        table.render({
            elem: '#finManaOrderProfit_tabPcb'
            ,url: setter.baseUrl+'fms/reconciliation/orderProfit'
            ,toolbar: "#finManaOrderProfit_tb"
            ,cellMinWidth: 80
            ,id: "finManaOrderProfit_tabPcb"
            ,page: true
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,cols: [[
                // {type:'checkbox'}
                //{field: 'productNo',title: '内部型号', width: 115, templet: '<div>{{ d.status == 4 ? "待确认交期" : "" }}</div>'}      // 1 ＝ 待报价
                {field: 'productNo', title: '内部型号', width: 135, sort: true}
                ,{field: 'gmtCreate',title: '报价时间', width: 166, sort: true}
                ,{field: 'invoiceNo',title: '合同编号', width: 210, sort: true}
                ,{field: 'subtotal', title: '客户报价', width: 124, sort: true, templet:'<div>{{ (d.subtotal + d.pcbaSubtotalFee).toFixed(2) }}</div>'}
                ,{field: 'testCost', title: '测试架', width: 117, sort: true, hide: true}
                ,{field: 'modelCost', title: '模具', width: 117, sort: true, hide:true}
                ,{field: 'materialCost', title: '物料费   ', width: 117, sort: true, hide:true}
                ,{field: 'totalFee', title: '供应商报价', width: 450, sort: true, templet:'<div>总计:{{ (d.totalFee+d.testCost+d.modelCost+d.modelCost).toFixed(2) }}（测试架or飞针费:{{ d.testCost }} 模具费:{{ d.modelCost }} 物料费:{{ d.materialCost }} pcba:{{ d.supplierPacaSubtotal }})</div>'}
                ,{field: 'profits', title: '利润', width: 144,templet:'<div>{{ (d.subtotal + d.pcbaSubtotalFee - d.totalFee - d.modelCost - d.testCost - d.materialCost).toFixed(2) }}</div>', sort: true}
                ,{field: 'profitsThan',title:'利润比',width:144, templet:'<div>{{ (((d.subtotal + d.pcbaSubtotalFee - d.totalFee - d.modelCost - d.testCost - d.materialCost)/(d.subtotal+d.pcbaSubtotalFee))*100).toFixed(2) }}%</div>', sort: true}
                // ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134}
                // ,{field: 'unitPrice', title: '单价', width: 96}
                // ,{field: 'subtotal', title: '合计', width: 96}
                // ,{field: 'remark', title: '订单备注', width: 168}
                // ,{field: 'gerberName',title: '文件名'}
                // ,{field: 'pcbType',title: 'PCB类型'}
                // ,{fixed: 'right', title:'操作', toolbar: '#finManaOrderProfit_tbar',width: 150}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }
    
    function tabRenderStencil(){
        table.render({
            elem: '#finManaOrderProfit_tabSmt'
            ,url: setter.baseUrl+'fms/reconciliation/orderProfitSml'
            ,toolbar: "#finManaOrderProfit_tb"
            ,cellMinWidth: 80
            ,id: "finManaOrderProfit_tabSmt"
            ,page: true
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,cols: [[
                // {type:'checkbox'}
                //{field: 'productNo',title: '内部型号', width: 115, templet: '<div>{{ d.status == 4 ? "待确认交期" : "" }}</div>'}      // 1 ＝ 待报价
                {field: 'productNo', title: '内部型号', width: 135, sort: true}
                ,{field: 'gmtCreate',title: '报价时间', width: 166, sort: true}
                ,{field: 'invoiceNo',title: '合同编号', width: 210, sort: true}
                ,{field: 'subtotal', title: '客户报价', width: 124, sort: true}
                // ,{field: 'testCost', title: '测试架', width: 117}
                // ,{field: 'modelCost', title: '模具', width: 117}
                ,{field: 'totalFee', title: '供应商报价', width: 117, sort: true}
                ,{field: 'profits', title: '利润', width: 144,templet:'<div>{{ (d.subtotal - d.totalFee).toFixed(2) }}</div>', sort: true}
                ,{field: 'profitsThan',title:'利润比',width:144, templet:'<div>{{ (((d.subtotal - d.totalFee)/d.subtotal)*100).toFixed(2) }}%</div>', sort: true}
                // ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134}
                // ,{field: 'unitPrice', title: '单价', width: 96}
                // ,{field: 'subtotal', title: '合计', width: 96}
                // ,{field: 'remark', title: '订单备注', width: 168}
                // ,{field: 'gerberName',title: '文件名'}
                // ,{field: 'pcbType',title: 'PCB类型'}
                // ,{fixed: 'right', title:'操作', toolbar: '#finManaOrderProfit_tbar',width: 150}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }
    // table.on('toolbar(finManaSupRe_tabPcb)', function (obj) {
    //     var checkStatus = table.checkStatus(obj.config.id);
    //     if(obj.event === 'submit'){
    //         var data = checkStatus.data;
    //         if (data.length < 1) {
    //             layer.msg('最少选择一条数据！');
    //         } else {
    //             layer.confirm('确认提交？', function(index){
    //                 var reconciliationNos = data.map(function (elem) {
    //                     return elem.reconciliationNo
    //                 }).join(',');
    //                 admin.req({
    //                     type: 'post',
    //                     data: {reconciliationId:reconciliationNos},
    //                     url: setter.baseUrl+'fms/reconciliation/supplierReconciliation',
    //                     success: function (data) {
    //                         if (data.code != '500'){
    //                             layer.alert("提交成功！！");
    //                             var trigger = setTimeout(function () {
    //                                 table.reload('finManaSupRe_tabPcb');
    //                                 layer.close(index);
    //                             },1200);
    //                         }
    //                     }
    //                 });
    //             });
    //         }
    //     }
    // });
    //监听行工具事件＝＝＝＝》pcb订单
    // table.on('tool(finManaSupRe_tabPcb)', function (obj) {
    //     var data = obj.data;
    //     if (obj.event == 'edit'){
    //         layer.msg('编辑操作');
    //         admin.popup({
    //             title: '订单协同编辑'
    //             ,area: ['434px','448px']
    //             ,btn: ['保存', '取消']
    //             ,yes: function (index, layero) {
    //                 layer.msg('提交信息');
    //                 $(".otEdit").click();
    //             }
    //             ,success: function (layero, index) {
    //                 var id = data.id;
    //                 var supplierId = data.supplierId;
    //                 var orderId = data.orderId;
    //                 view(this.id).render('sqeManagement/iframeWindow/order_together_edit',data).done(function () {
    //                     form.on('submit(otEdit)', function (data) {
    //                         var field = data.field;
    //                         field.id = id;
    //                         field.orderId = orderId;
    //                         field.supplierId = supplierId;
    //                         console.log(field);
    //                         admin.req({
    //                             type: 'post',
    //                             data: field,
    //                             url: setter.baseUrl+'scm/ordersupplier/update',
    //                             success: function (data) {
    //                                 layer.alert("订单协同修改成功");
    //                                 // layer.closeAll();
    //                                 table.reload('finManaSupRe_tabPcb');
    //                                 layer.close(index);
    //                             }
    //                         });
    //                         return false;
    //                     });
    //                 });
    //             }
    //         });
    //     } else if (obj.event == 'search'){
    //         layer.msg('查看订单协同');
    //     }
    // });
    //监听搜索
    form.on('submit(LAY-fin-order-profits-search)', function(data){
        var field = data.field;
        //执行重载
        var reTab;
        if (defVal.orderType === 0) {   // PCB
            reTab = 'finManaOrderProfit_tabPcb';
        } else if (defVal.orderType === 1) {    //  Stencil
            reTab = 'finManaOrderProfit_tabSmt';
        }
        //执行重载
        table.reload(reTab, {
            where: field
        });
    });
    
    // $(".order-profits-form-search input").bind("input propertychange", function (even) {
    //     $("*[lay-filter='order-profits-mangement-search']").click();
    // });

    exports('finMana_order_profits', {});
});