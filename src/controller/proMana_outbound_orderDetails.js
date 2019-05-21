/**

 @Name:    成品管理－－［出货明细］

 */


layui.define(['admin','table','index','element','form','laydate'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,element = layui.element;
    var $ = layui.jquery;

    tabRenderPCB();
    // 全局变量
    var _public_val = {
        orderType: 1        //订单类型 （1 pcb 2钢网 3 贴片）
    };

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(tab-otOrderDetail)', function(data){
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
            elem: '#proMana_outBoundOD'
            ,url: setter.baseUrl+'iqc/pcborder/outboundOrderDetails'
            ,toolbar: "#proMana_outBoundOD_to"
            ,cellMinWidth: 80
            ,id: "proMana_outBoundOD_tb"
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
                {type:'checkbox',fixed: 'left'}
                ,{field: 'productNo',title: '聚谷型号', minWidth: 141,fixed: 'left'}
                ,{field: 'status',title: '状态', width: 110, templet: '#proManaquo_status'}      // 1 ＝ 待报价
                ,{field: 'invoiceNo',title: '合同号', minWidth: 165}
                ,{field: 'deliveryDate',title: '交期', templet: '#outboundDDatePCB'}
                ,{field: 'quantityPcs',title: '订单PCS数'}
                ,{field: 'finishPcsNumber',title: '已交PCS数', templet: '<div>{{ d.finishPcsNumber || 0 }}</div>'}
                ,{field: 'courierName',title: '快递公司'}
                ,{field: 'courierNumber',title: '快递单号'}
                ,{field: 'pcbName',title: '客户型号', width: 132}
                ,{fixed: 'right', title:'操作', toolbar: '#proMana_outBoundOD_tbar',width: 230}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }
    table.on('toolbar(proMana_outBoundOD)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(proMana_outBoundOD)', function (obj) {
        var data = obj.data;
        if (obj.event == 'edit'){
        } else if (obj.event == 'search') {
            layer.msg('查看订单协同');
        } else if (obj.event == 'chxx') {
        }
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ Stencil 钢网订单
    function tabRenderStencil() {
        table.render({
            elem: '#proMana_outBoundODS'
            ,url: setter.baseUrl+'iqc/stencilorder/outboundOrderDetails'
            ,toolbar: "#proMana_outBoundODS_to"
            ,cellMinWidth: 80
            ,id: "proMana_outBoundODS"
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
                {type:'checkbox',fixed: 'left'}
                ,{field: 'productNo',title: '聚谷型号', minWidth: 141,fixed: 'left'}
                ,{field: 'status',title: '状态', width: 110, templet: '#proManaquo_status'}      // 1 ＝ 待报价
                ,{field: 'invoiceNo',title: '合同号', minWidth: 165}
                ,{field: 'deliveryDate',title: '交期', templet: '#outboundDDateStencil'}
                ,{field: 'quantity',title: '订单PCS数'}
                ,{field: 'finishNumber',title: '已交PCS数', templet: '<div>{{ d.finishNumber || 0 }}</div>'}
                ,{field: 'courierName',title: '快递公司'}
                ,{field: 'courierNumber',title: '快递单号'}
                ,{field: 'pcbName',title: '客户型号', width: 132}
                ,{fixed: 'right', title:'操作', toolbar: '#proManaNgveiw_tabbar',width: 230}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }
    exports('proMana_outbound_orderDetails', {});
});