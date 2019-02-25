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
            ,{field: 'orderType',title: '订单类型',edit: 'text'}    //1=新单  2=返单    3=返单有改
            ,{field: 'productNo', title: '供应商编码'}
            ,{field: 'gerberName',title: '文件名',edit: 'text'}
            ,{field: 'pcbType',title: 'PCB类型',edit: 'text'}
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
               title: '编辑订单协同'
                ,area: ['60%','40%']
                ,btn: ['提交', '取消']
                ,yes: function (index, layero) {

                }
                ,success: function (layero, index) {
                    // view(this.id).render()
                }
            });
        } else if (obj.event == 'search'){
            layer.msg('查看订单协同');
        }
    })
    exports('sqeManagement_quotation_together', {});
});