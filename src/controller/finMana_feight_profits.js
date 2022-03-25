/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: 
 * @Date: 2021-07-16 20:29:01
 * @LastEditors: ho huang
 * @LastEditTime: 2021-09-04 11:02:08
 */
/**

 @Name:    财务管理  - 运费利润列表

 */
layui.define(['admin','table','index','form'], function (exports) {
    var table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,$ = layui.jquery;


    table.render({
        elem: '#fsm_feight_profits_tabPcb'
        ,url: setter.baseUrl+'fms/freightprofit/list'
        ,toolbar: "true"
        ,cellMinWidth: 80
        ,id: "fsm_feight_profits_tabPcb"
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {field: 'courierNumber', title: '运单号', width: 150, sort: true}
            // ,{field: 'invoiceNumber', title: '发票号', width: 130, sort: true}  2021-0904暂时取消
            ,{field: 'courierName',title: '快递公司', width: 180, sort: true}
            ,{field: 'totalPostFee',title: '运费(收)', width: 100, sort: true}
            ,{field: 'postalFee',title: '运费(支)', width: 100, sort: true}
            ,{field: '', title: '盈利', width: 100, sort: true, templet: '#feight-profits-ffff'}
            ,{field: 'productNos', title: '内部型号', sort: true, width: 900}
            ,{field: 'shippingInfoId', title:'tid' , hide: true}
            ,{title: '操作', width: 100, align:'center', fixed: 'right', toolbar: '#fsm_feight_tabbar'}
        ]]
    });

    // 监听stencil表格工具条
    // table.on('tool(finManaPaypalLog_tabPcb)',function (obj) {
    //     var d = obj.data;
    //     console.log(d);
    // });

    table.on('tool(fsm_feight_profits_tabPcb)', function (obj) {
        var data = obj.data;
        if (obj.event === 'feight_profits_edit') {
            admin.popup({
                title: '编辑运费及发票号'
                ,id: 'LAY-popup-feight-profits-edit'
                ,area: ['456px', '452px']
                // ,btn: ['保存', '取消']
                // ,yes: function (index, layero) {
                //     $("#submitFpSave").click();
                // }
                ,success: function (layero, index) {
                    view(this.id).render('/finManagement/iframeWindow/feight_profits_add',data).done(function () {
                        console.log(data);
                        form.render(null, 'feight_profits_edit_form');
                        //监听提交
                        form.on('submit(LAY-feight-profits-submit)',function(r){
                            var field = r.field;
                            field.shippingInfoId = data.shippingInfoId;
                            console.log(field);
                            admin.req({
                                type: 'post',
                                url: setter.baseUrl + 'fms/freightprofit/updateFreightInfo',
                                data: field,
                                success: function (result) {
                                    if(result.code === 0){
                                        layer.msg(result.msg);
                                        table.reload('fsm_feight_profits_tabPcb');
                                        layer.close(index);
                                    }else{
                                        layer.msg(result.msg);
                                        layer.close(index);
                                    }
                                }
                            })
                        })
                        
                    });
                }
            });
        }
    });

    form.on('submit(LAY-feight-profits-search)',function(data){
        var field = data.field;
        table.reload('fsm_feight_profits_tabPcb',{
            where: field
        });
    });
    exports('finMana_feight_profits', {});
});
