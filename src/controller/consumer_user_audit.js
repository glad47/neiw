/**

 @Name:    市场管理－－［订单评审］

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

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    table.render({
        elem: '#tabConsumerUserAudit'
        ,url: setter.baseUrl+'/sys/pa/consumerUserList'
        ,toolbar: "#orderReviewB_pertSys_tb"
        ,cellMinWidth: 80
        ,id: "tabConsumerUserAudit"
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {type:'checkbox',fixed: 'left'}
            ,{field: 'businessName',title: '业务员', width: 110, sort: true}      // 1 ＝ 待报价
            ,{field: 'userName',title: '客户名称', Width: 110, sort: true}
            ,{field: 'country',title: '国家', minWidth: 219, sort: true}
            ,{field: 'siteUrl',title: '网站', Width: 110, sort: true}
            ,{field: 'engineeringFee',title: '客户邮箱', Width: 110, sort: true}
            ,{field: 'overworkFee',title: '下单日期', Width: 110, sort: true}
            ,{field: 'postFee',title: '订单金额', Width: 110, sort: true}
            ,{field: 'commission',title: '提成', Width: 110, sort: true}
            ,{field: 'channel',title: '渠道', Width: 110, sort: true}
            ,{field: 'toolingFee',title: '支付', Width: 110, sort: true}
            ,{field: 'unitPrice',title: '新客户', Width: 110, sort: true}
            ,{field: 'orderNumNo',title: '订单编号', Width: 110, hide: true, sort: true}
            // ,{fixed: 'right', title:'操作', toolbar: '#orderReviewB_pertSys_tabbar',width: 220, sort: true}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    exports('order_reviewB', {});
});