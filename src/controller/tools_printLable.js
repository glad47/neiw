/**
 * 用于【订单出货】【出货明细】
 * 打印标签
 */
layui.define(['admin', 'jsTools'], function (exports) {
   var $ = layui.jquery,
       admin = layui.admin;
        jsTools = layui.jsTools;
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
                       setInputWidth( $("input[id='outLableQTY']").val());
                       $("#outLableQTY").bind("input propertychange", function (even) {
                           var _val = $(this).val();
                           $("#outLableQTY").attr("value", $(this).val())
                           setInputWidth(_val)
                       });
                       function setInputWidth(Str) {
                           var _width = jsTools.getStrWidth(Str).width;
                           $("input[id='outLableQTY']").css("width",_width+'px');
                       }
                       // 来回切换PCS Panel
                       $(".outerLaberQTYNnit").on("click", function () {
                           if ($(this).text().indexOf("Panel") > 0) {
                               $(this).html("&nbsp;PCS");
                           } else {
                               $(this).html("&nbsp;Panel");
                           }
                       })
                   });
               }
           });
       }
   }
    exports('tools_printLable', obj)
});