/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin"],function(n){var i=layui.jquery,t=layui.setter,e=layui.admin,o={chxx:function(n){var o=n.table;e.req({type:"post",url:t.baseUrl+"iqc/shippinginfo/info/"+n.id,success:function(u){n.shippingInfo=u.shippingInfo,e.popup({title:"出货信息",area:["734px","468px"],btn:["保存","提交","返回"],btn1:function(n,t){return layer.msg("保存"),i(".outbound-submit").attr("data","save"),i(".outbound-submit").click(),!1},btn2:function(){return i(".outbound-submit").attr("data","submit"),i(".outbound-submit").click(),!1},btn3:function(){layer.msg("取消")},success:function(i,u){view(this.id).render("productManagement/iframeWindow/outbound_info",n).done(function(){form.on("submit(fomrOutboundInfo)",function(n){var i=n.field;return i.orderType=1,console.log(i),e.req({url:t.baseUrl+"iqc/pcborder/saveShippingInfo",type:"POST",data:i,success:function(n){0==n.code?layer.msg(n.msg):layer.msg(n.msg,{icon:5}),layui.table.reload(o),layer.close(u)}}),!1})})}})}}),n.finishPcsNumber!==n.quantityPcs?layer.msg("PCS数未全部交清，操作失败！"):layer.msg("PCS数全交期，操作成功！")}};n("proMana_global",o)});