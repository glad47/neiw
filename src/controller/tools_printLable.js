/**
 * 用于【订单出货】【出货明细】
 * 打印标签
 */
layui.define('admin', function (exports) {
   var $ = layui.jquery,
       admin = layui.admin;
   var obj = {
       PrintLable: function (data) {
           if (data.length<1) {
               layer.msg('请选择一条数据');
               return false;
           } else if (data.length > 1) {
               layer.msg('最多选择一条数据打印！');
               return false;
           }
           admin.popup({
               title: '标签打印'
               ,area: ['292px', '277px']
               ,id: 'popOuterLable'
               ,btn: ['打印', '取消']
               ,yes: function () {
                   document.body.innerHTML=document.getElementById("outerLableContainer").innerHTML;
                   window.print();
                   window.location.reload();
               }
               ,toolbar: true
               ,page: true
               ,success: function (layero, index) {
                   view(this.id).render('productManagement/iframeWindow/outer_lable', data).done(function () {

                   });
               }
           });
       }
   }
    exports('tools_printLable', obj)
});