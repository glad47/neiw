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

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    table.render({
        elem: '#quotatgt_tabPcb'
        ,url: setter.baseUrl+'/sqe/pcborder/quotationTogether/list'
        ,toolbar: "#interior_order_option"
        ,cellMinWidth: 80
        ,id: "quotatgt_tabPcb"
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
            ,{field: 'status',title: '状态',templet: '#pcb'}      // 1 ＝ 待报价
            ,{field: '',title: '报价单号', width: 125}
            ,{field: 'gmtCreate',title: '报价时间', width: 166}
            ,{field: 'supplierNo', title: '供应商编号', width: 124}
            ,{field: 'supplierQuoteNo', title: '供应商厂编', width: 117}
            ,{field: 'productNo', title: '聚谷P/N', width: 124}
            ,{field: 'pcbName', title: '聚谷产品型号', width: 144}
            ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134}
            ,{field: 'unitPrice', title: '单价', width: 96}
            ,{field: 'engineeringFee', title: '工程费', width: 96}
            ,{field: 'testCostFee', title: '飞针费', width: 96}
            ,{field: 'testCostFee', title: '测试架费', width: 96}
            ,{field: 'toolingFee', title: '模具', width: 96}
            ,{field: 'subtotal', title: '合计', width: 96}
            ,{field: 'remark', title: '订单备注', width: 168}
            // ,{field: 'gerberName',title: '文件名'}
            // ,{field: 'pcbType',title: 'PCB类型'}
            ,{fixed: 'right', title:'操作', toolbar: '#quotatgt_tabbar',width: 130}
        ]]
        ,done: function (res, curr, count) {

        }
    });

    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(quotatgt_tabPcb)', function (obj) {
        var data = obj.data;
        if (obj.event == 'edit'){
            layer.msg('编辑操作');
            admin.popup({
               title: 'PCB报价协同编辑'
                ,area: ['50%','80%']
                ,btn: ['提交', '下载客户资料', '取消']
                ,yes: function (index, layero) {
                   layer.msg('提交信息');
                }
                ,btn2: function (index, layero) {
                    layer.msg('下载资料');
                    return false;
                }
                ,success: function (layero, index) {
                    view(this.id).render('sqeManagement/iframeWindow/quotation_together_pcb',data).done(function () {

                    });
                }
            });
        } else if (obj.event == 'search'){
            layer.msg('查看订单协同');
        }
    })
    exports('sqeManagement_quotation_together', {});
});