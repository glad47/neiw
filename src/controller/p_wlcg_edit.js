/**
 * 公共方法： 物料采购编辑
 * use: 1、供应链管理-物料采购
 *      2、供应链管理-采购合同
 */
layui.define(['admin', 'table','setter','form','jquery'], function(exports){
    var $ = layui.jquery
        ,table = layui.table
        ,admin = layui.admin
        ,setter = layui.setter
        ,view = layui.view
        ,form = layui.form;

    var obj = {
        wlcgEdit: function (data, reTab) {
            admin.popup({
                title: '物料采购编辑'
                ,area: ['733px','532px']
                ,btn: ['保存', '取消']
                ,yes: function (index, layero) {
                    $("button[lay-filter='scm_add_material_purchasing_submit']").click();
                    table.reload(reTab);
                }
                ,success: function (layero, index) {
                    view(this.id).render('scmManagement/iframeWindow/material_purchasing_edit_add', data).done(function () {

                    });
                }
            });
        }
    }

    exports('p_wlcg_edit', obj)
});