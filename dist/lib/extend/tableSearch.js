/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","index","form"],function(t){var e=layui.jquery,a=layui.form;admin=layui.admin;var n,r,i;e(document).on("click",function(t){n=e(t.target).closest(".layui-form");var a=n.attr("data-type");"search-form"==a&&(i=n.attr("reload-table"),r=n.find(".layui-btn[lay-submit]").attr("lay-filter"),l.formOnSubmit())}),e(document).on("keypress",function(t){13==t.which&&(i=n.attr("reload-table"),r=n.find(".layui-btn[lay-submit]").attr("lay-filter"),e("button[lay-filter='"+r+"']").click())});var l={formOnSelect:function(t){if(formSelectsArr.length>0){console.log("监听select的表单提交");for(var n=0;n<formSelectsArr.length;n++)a.on("select("+formSelectsArr[n]+")",function(t){e("button[lay-filter='"+r+"']").click()})}},formOnSubmit:function(){a.on("submit("+r+")",function(t){var e=t.field;l.tabReload(i,e),table.reload(i,{where:e})})},initInputKeypress:function(){n.find("input").keypress(function(t){13==t.which&&console.log("aaaa")})},tabReload:function(t,e){table.reload(t,{where:e})}};t("tableSearch",l)});