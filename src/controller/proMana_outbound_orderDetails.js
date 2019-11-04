/**

 @Name:    成品管理－－［出货明细］

 */


layui.define(['admin','table','index','element','form','laydate', 'tools_printLable'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,tools_printLable = layui.tools_printLable
        ,element = layui.element;
    var $ = layui.jquery;

    tabRenderPCB();
    // 全局变量
    var _public_val = {
        orderType: 1        //订单类型 （1 pcb 2钢网 3 贴片）
    };

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(tab-otOrderDetail)', function(data){
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
                ,{field: 'productNo',title: '聚谷型号', minWidth: 141,fixed: 'left', sort: true}
                ,{field: 'status',title: '状态', width: 110, templet: '#proManaquo_status', sort: true}      // 1 ＝ 待报价
                ,{field: 'gmtModified',title: '出货时间', width: 110, templet:'<a>{{d.gmtModified.substring(0,11)}}</a>', sort: true}
                ,{field: 'invoiceNo',title: '合同号', minWidth: 165, sort: true}
                ,{field: 'deliveryDate',title: '交期', templet: '#outboundDDatePCB', sort: true}
                ,{field: 'quantityPcs',title: '订单PCS数', sort: true}
                ,{field: 'finishPcsNumber',title: '已交PCS数', templet: '<div>{{ d.finishPcsNumber || 0 }}</div>', sort: true}
                ,{field: 'courierName',title: '快递公司', sort: true}
                ,{field: 'courierNumber',title: '快递单号', sort: true}
                ,{field: 'pcbName',title: '客户型号', width: 132, sort: true}
                ,{fixed: 'right', title:'操作', toolbar: '#proMana_outBoundOD_tbar',width: 280}
            ]]
            ,done: function (res, curr, count) {
                $("a[data='isOk']").each(function (i, n) {
                    $(this).css({'color':'#00CC66','font-weight':'500'});;
                    console.log(i)
                });
            }
        });
    }
    table.on('toolbar(proMana_outBoundOD)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        if (obj.event == 'outLableDetail') {
            tools_printLable.PrintLable(data);
        }
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
            ,toolbar: "#proMana_outBoundOD_to"
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
                ,{field: 'productNo',title: '聚谷型号', minWidth: 141,fixed: 'left', sort: true}
                ,{field: 'status',title: '状态', width: 110, templet: '#proManaquo_status', sort: true}      // 1 ＝ 待报价
                ,{field: 'gmtModified',title: '出货时间', width: 110, templet:'<a>{{d.gmtModified.substring(0,11)}}</a>', sort: true}
                ,{field: 'invoiceNo',title: '合同号', minWidth: 165, sort: true}
                ,{field: 'deliveryDate',title: '交期', templet: '#outboundDDateStencil', sort: true}
                ,{field: 'quantity',title: '订单PCS数', sort: true}
                ,{field: 'finishNumber',title: '已交PCS数', templet: '<div>{{ d.finishNumber || 0 }}</div>', sort: true}
                ,{field: 'courierName',title: '快递公司', sort: true}
                ,{field: 'courierNumber',title: '快递单号', sort: true}
                ,{field: 'pcbName',title: '客户型号', width: 132, sort: true}
                ,{fixed: 'right', title:'操作', toolbar: '#proManaNgveiw_tabbar',width: 230}
            ]]
            ,done: function (res, curr, count) {
                $("a[data='isOk']").each(function (i, n) {
                    $(this).css({'color':'#00CC66','font-weight':'500'});;
                });
            }
        });
    }
    // 监听搜索
    form.on('submit(outbound_orderDetails_search)', function(data){
        var field = data.field;
        var reTab;
        if (_public_val.orderType === 1) {   // PCB
            reTab = 'proMana_outBoundOD_tb';
        } else if (_public_val.orderType === 2) {    //  Stencil
            reTab = 'proMana_outBoundODS';
        }
        table.reload(reTab, {
            where: field
        });
    });

    table.on('toolbar(proMana_outBoundODS)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        if (obj.event == 'outLableDetail') {
            tools_printLable.PrintLable(data);
        }
    })
    $(".outbound-orderDetails-search input").bind("input propertychange", function (even) {
        $("*[lay-filter='outbound_orderDetails_search']").click();
    })
    exports('proMana_outbound_orderDetails', {});
});