/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate"],function(e){function t(){table.render({elem:"#iqcMana_outBound",url:setter.baseUrl+"iqc/pcborder/outboundOrder/list",toolbar:"#ord_sqpManaPlan_tb",cellMinWidth:80,id:"iqcMana_outBound",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{type:"checkbox"},{field:"status",title:"状态",width:110,templet:"#proManaquo_status"},{field:"invoiceNo",title:"合同号",minWidth:165},{field:"productNo",title:"聚谷型号",minWidth:141},{field:"deliveryDate",title:"交期",templet:"#outboundDDatePCB"},{field:"quantityPcs",title:"订单PCS数"},{field:"finishPcsNumber",title:"已交PCS数",templet:"<div>{{ d.finishPcsNumber || 0 }}</div>"},{field:"courierName",title:"快递公司"},{field:"courierNumber",title:"快递单号"},{field:"pcbName",title:"客户型号",width:132},{fixed:"right",title:"操作",toolbar:"#proManaNgveiw_tabbar",width:230}]],done:function(e,t,i){a("a[data='notOutbound']").each(function(e,t){a(this).parents("tr").css("background-color","#d2d2d2"),a(this).parents("tr").find("input[type='checkbox']").prop("disabled",!0),a(this).parents("td").css({"border-right":"none !important","border-bottom":"none !important"}),e>0&&a(this).parents(".layui-table-box").children(".layui-table-header").find("input[type='checkbox']").prop("disabled",!0)}),form.render()}})}function i(){table.render({elem:"#iqcMana_outBoundS",url:setter.baseUrl+"iqc/stencilorder/outboundOrder/list",toolbar:"#ord_sqpManaPlan_tb",cellMinWidth:80,id:"iqcMana_outBoundS",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{type:"checkbox"},{field:"status",title:"状态",width:110,templet:"#proManaquo_status"},{field:"invoiceNo",title:"合同号",minWidth:165},{field:"productNo",title:"聚谷型号",minWidth:141},{field:"deliveryDate",title:"交期",templet:"#outboundDDateStencil"},{field:"quantityPcs",title:"订单PCS数"},{field:"finishPcsNumber",title:"已交PCS数",templet:"<div>{{ d.finishPcsNumber || 0 }}</div>"},{field:"courierName",title:"快递公司"},{field:"courierNumber",title:"快递单号"},{field:"pcbName",title:"客户型号",width:132},{fixed:"right",title:"操作",toolbar:"#proManaNgveiw_tabbar",width:230}]],done:function(e,t,i){a("a[data='notOutbound']").each(function(e,t){a(this).parents("tr").css("background-color","#d2d2d2"),a(this).parents("tr").find("input[type='checkbox']").prop("disabled",!0),a(this).parents("td").css({"border-right":"none !important","border-bottom":"none !important"}),e>0&&a(this).parents(".layui-table-box").children(".layui-table-header").find("input[type='checkbox']").prop("disabled",!0)}),form.render()}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var a=layui.jquery;t();var n={orderType:1};element.on("tab(tab-planToger)",function(e){console.log(e.index),0===e.index?(t(),n.orderType=1):1===e.index?(i(),n.orderType=2):2===e.index&&(n.orderType=3)}),table.on("toolbar(iqcMana_outBound)",function(e){var t=table.checkStatus(e.config.id),i=t.data,n=new Array;if("submit"===e.event){for(var o=0;o<i.length;o++)n[o]={id:i[o].id,uuid:i[o].uuid,courierNumber:i[o].courierNumber,courierName:i[o].courierName};var r=new Object;r.shipmentVoList=n,console.log(r),console.log(n),layer.confirm("确定出货？",function(){a.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},contentType:"application/json;charset=utf-8",data:JSON.stringify(r),url:setter.baseUrl+"iqc/pcborder/shipment",success:function(){layer.alert("出货成功!"),table.reload("iqcMana_outBound"),layer.closeAll()}})})}}),table.on("tool(iqcMana_outBound)",function(e){var t=e.data;"edit"==e.event?(layer.msg("编辑操作"),admin.popup({title:"订单协同编辑",area:["434px","448px"],btn:["保存","取消"],yes:function(e,t){layer.msg("提交信息"),a(".otEdit").click()},success:function(e,i){var a=t.id,n=t.supplierId,o=t.orderId;view(this.id).render("sqeManagement/iframeWindow/order_together_edit",t).done(function(){form.on("submit(otEdit)",function(e){var t=e.field;return t.id=a,t.orderId=o,t.supplierId=n,console.log(t),admin.req({type:"post",data:t,url:setter.baseUrl+"scm/ordersupplier/update",success:function(e){layer.alert("订单协同修改成功"),table.reload("iqcMana_outBound"),layer.close(i)}}),!1})})}})):"search"==e.event?admin.popup({title:"订单id:［"+t.id+"］-----------订单时间：［"+t.gmtCreate+"］",area:["45%","70%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_pcb_detail",t).done(function(){})}}):"chxx"==e.event&&(admin.req({type:"post",url:setter.baseUrl+"iqc/shippinginfo/info/"+t.id,success:function(e){t.shippingInfo=e.shippingInfo,admin.popup({title:"出货信息",area:["734px","468px"],btn:["保存","提交","返回"],btn1:function(e,t){return layer.msg("保存"),a(".outbound-submit").attr("data","save"),a(".outbound-submit").click(),!1},btn2:function(){return a(".outbound-submit").attr("data","submit"),a(".outbound-submit").click(),!1},btn3:function(){layer.msg("取消")},success:function(e,i){view(this.id).render("productManagement/iframeWindow/outbound_info",t).done(function(){form.on("submit(fomrOutboundInfo)",function(e){var t=e.field;return console.log(t),admin.req({url:setter.baseUrl+"iqc/pcborder/saveShippingInfo",type:"POST",data:t,success:function(e){0==e.code?layer.msg(e.msg):layer.msg(e.msg,{icon:5}),layui.table.reload("iqcMana_outBound"),layer.close(i)}}),!1})})}})}}),t.finishPcsNumber!==t.quantityPcs?layer.msg("PCS数未全部交清，操作失败！"):layer.msg("PCS数全交期，操作成功！"))}),table.on("toolbar(iqcMana_outBoundS)",function(e){var t=table.checkStatus(e.config.id),i=t.data,n=new Array;if("submit"==e.event){layer.msg("通知出货");for(var o=0;o<i.length;o++)n[o]={id:i[o].id,uuid:i[o].uuid,courierNumber:i[o].courierNumber,courierName:i[o].courierName};var r=new Object;r.shipmentVoList=n,console.log(r),console.log(n),layer.confirm("确定出货？",function(){a.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},contentType:"application/json;charset=utf-8",data:JSON.stringify(r),url:setter.baseUrl+"iqc/stencilorder/shipment",success:function(){layer.alert("出货成功!"),table.reload("iqcMana_outBoundS"),layer.closeAll()}})})}}),table.on("tool()",function(e){var t=e.data;"search"==e.event&&admin.popup({title:"订单号［"+t.productNo+"]---订单时间［"+t.gmtCreate+"］",area:["45%","70%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_stencil_detail",t).done(function(){})}})}),e("proMana_outbound_order",{})});