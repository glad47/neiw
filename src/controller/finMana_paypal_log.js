/**

 @Name:    财务管理  - paypal到账记录

 */


layui.define(['admin','table','index','element','form','laydate'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        // ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element
        ,$ = layui.jquery;

    // 全局变量
    var _public_val = {
        orderType: 1        //订单类型 （1 pcb 2钢网 3 贴片）
    };

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    // element.on('tab(tab-quotationToger)', function(data){
    //     console.log(data.index);
    //     if (data.index === 0){
    //         _public_val.orderType = 1;       //pcb
    //     } else if (data.index === 1){
    //         _public_val.orderType = 2;      //钢网
    //     } else if (data.index === 2){
    //         _public_val.orderType = 3;      //贴片
    //     }
    // });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    table.render({
        elem: '#finManaPaypalLog_tabPcb'
        ,url: setter.baseUrl+'paypal/paylog/list'
        // ,toolbar: "#finManaOrderProfit_tb"
        ,cellMinWidth: 80
        ,id: "finManaPaypalLog_tabPcb"
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
            {field: 'id', title: 'id', width: 124}
            ,{field: 'txnId',title: '交易id', width: 166}
            ,{field: 'paymentDate',title: '付款时间', width: 210}
            ,{field: 'payerEmail', title: '付款人email', width: 250}
            ,{field: 'firstName', title: '付款人姓', width: 117}
            ,{field: 'lastName', title: '付款人名', width: 144}
            ,{field: 'mcGross', title: '交易金额', width: 144}
            ,{field: 'paymentFee', title: 'payPal 手续费', width: 144}
            ,{field: 'totalNet', title: '总净额', width: 144}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    exports('finMana_paypal_log', {});
});