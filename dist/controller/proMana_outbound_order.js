/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate"],function(e){function t(){table.render({elem:"#iqcMana_outBound",url:setter.baseUrl+"iqc/pcborder/outboundOrder/list",toolbar:"#ord_sqpManaPlan_tb",cellMinWidth:80,id:"iqcMana_outBound",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"聚谷型号",minWidth:141,fixed:"left"},{field:"status",title:"状态",width:110,templet:"#proManaquo_status"},{field:"invoiceNo",title:"合同号",minWidth:165},{field:"pcbName",title:"客户型号",width:132},{field:"quantityPcs",title:"订单PCS数"},{field:"finishPcsNumber",title:"已交PCS数",templet:"<div>{{ d.finishPcsNumber || 0 }}</div>"},{field:"deliveryDate",title:"交期",templet:"#outboundDDatePCB"},{field:"courierName",title:"快递公司"},{field:"courierNumber",title:"快递单号"},{fixed:"right",title:"操作",toolbar:"#proManaNgveiw_tabbar",width:230}]],done:function(e,t,i){n("a[data='notOutbound']").each(function(e,t){n(this).parents("tr").css("background-color","#d2d2d2"),n(this).parents("tr").find("input[type='checkbox']").prop("disabled",!0),n(this).parents("td").css({"border-right":"none !important","border-bottom":"none !important"}),e>0&&n(this).parents(".layui-table-box").children(".layui-table-header").find("input[type='checkbox']").prop("disabled",!0)}),form.render()}})}function i(){table.render({elem:"#iqcMana_outBoundS",url:setter.baseUrl+"iqc/stencilorder/outboundOrder/list",toolbar:"#ord_sqpManaPlan_tb",cellMinWidth:80,id:"iqcMana_outBoundS",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"聚谷型号",minWidth:141,fixed:"left"},{field:"status",title:"状态",width:110,templet:"#proManaquo_status"},{field:"invoiceNo",title:"合同号",minWidth:165},{field:"pcbName",title:"客户型号",width:132},{field:"quantity",title:"订单PCS数"},{field:"finishNumber",title:"已交PCS数",templet:"<div>{{ d.finishNumber || 0 }}</div>"},{field:"deliveryDate",title:"交期",templet:"#outboundDDateStencil"},{field:"courierName",title:"快递公司"},{field:"courierNumber",title:"快递单号"},{fixed:"right",title:"操作",toolbar:"#proManaNgveiw_tabbar",width:230}]],done:function(e,t,i){n("a[data='notOutbound']").each(function(e,t){n(this).parents("tr").css("background-color","#d2d2d2"),n(this).parents("tr").find("input[type='checkbox']").prop("disabled",!0),n(this).parents("td").css({"border-right":"none !important","border-bottom":"none !important"}),e>0&&n(this).parents(".layui-table-box").children(".layui-table-header").find("input[type='checkbox']").prop("disabled",!0)}),form.render()}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var n=layui.jquery;t();var o={orderType:1};element.on("tab(tab-planToger)",function(e){console.log(e.index),0===e.index?(t(),o.orderType=1):1===e.index?(i(),o.orderType=2):2===e.index&&(o.orderType=3)}),table.on("toolbar(iqcMana_outBound)",function(e){var t=table.checkStatus(e.config.id),i=t.data,o=new Array;if("submit"===e.event){if(t.data.length<1)return layer.msg("请选择一条数据"),!1;for(var a=0;a<i.length;a++)o[a]={id:i[a].id,uuid:i[a].uuid,courierNumber:i[a].courierNumber,courierName:i[a].courierName,isInternal:i[a].isInternal,onlineOid:i[a].onlineOid,orderId:i[a].id,orderType:i[a].orderType};var r=new Object;r.shipmentVoList=o,console.log(r),console.log(o),layer.confirm("确定出货？",function(){n.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},contentType:"application/json;charset=utf-8",data:JSON.stringify(r),url:setter.baseUrl+"iqc/pcborder/shipment",success:function(){layer.alert("出货成功!"),table.reload("iqcMana_outBound"),layer.closeAll()}})})}}),table.on("tool(iqcMana_outBound)",function(e){var t=e.data;"edit"==e.event?(layer.msg("编辑操作"),admin.popup({title:"订单协同编辑",area:["434px","448px"],btn:["保存","取消"],yes:function(e,t){layer.msg("提交信息"),n(".otEdit").click()},success:function(e,i){var n=t.id,o=t.supplierId,a=t.orderId;view(this.id).render("sqeManagement/iframeWindow/order_together_edit",t).done(function(){form.on("submit(otEdit)",function(e){var t=e.field;return t.id=n,t.orderId=a,t.supplierId=o,console.log(t),admin.req({type:"post",data:t,url:setter.baseUrl+"scm/ordersupplier/update",success:function(e){layer.alert("订单协同修改成功"),table.reload("iqcMana_outBound"),layer.close(i)}}),!1})})}})):"search"==e.event?admin.popup({title:"订单id:［"+t.id+"］-----------订单时间：［"+t.gmtCreate+"］",area:["45%","70%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_pcb_detail",t).done(function(){})}}):"chxx"==e.event&&(admin.req({type:"post",url:setter.baseUrl+"iqc/shippinginfo/info/"+t.id,success:function(e){t.shippingInfo=e.shippingInfo,admin.popup({title:"PCB出货信息",area:["734px","468px"],btn:["保存","提交","返回"],btn1:function(e,t){return layer.msg("保存"),n(".outbound-submit").attr("data","save"),n(".outbound-submit").click(),!1},btn2:function(){return n(".outbound-submit").attr("data","submit"),n(".outbound-submit").click(),!1},btn3:function(){layer.msg("取消")},success:function(e,i){view(this.id).render("productManagement/iframeWindow/outbound_info",t).done(function(){form.on("submit(fomrOutboundInfo)",function(e){var t=e.field;return console.log(t),admin.req({url:setter.baseUrl+"iqc/pcborder/saveShippingInfo",type:"POST",data:t,success:function(e){0==e.code?layer.msg(e.msg):layer.msg(e.msg,{icon:5}),layui.table.reload("iqcMana_outBound"),layer.close(i)}}),!1})})}})}}),t.finishPcsNumber!==t.quantityPcs?layer.msg("PCS数未全部交清，操作失败！"):layer.msg("PCS数全交期，操作成功！"))}),table.on("toolbar(iqcMana_outBoundS)",function(e){var t=table.checkStatus(e.config.id),i=t.data,o=new Array;if("submit"==e.event){if(t.data.length<1)return layer.msg("请选择一条数据"),!1;for(var a=0;a<i.length;a++)o[a]={id:i[a].id,uuid:i[a].uuid,courierNumber:i[a].courierNumber,courierName:i[a].courierName,isInternal:i[a].isInternal,onlineOid:i[a].onlineOid,orderId:i[a].id,orderType:i[a].orderType};var r=new Object;r.shipmentVoList=o,console.log(r),console.log(o),layer.confirm("确定出货？",function(){n.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},contentType:"application/json;charset=utf-8",data:JSON.stringify(r),url:setter.baseUrl+"iqc/stencilorder/shipment",success:function(){layer.alert("出货成功!"),table.reload("iqcMana_outBoundS"),layer.closeAll()}})})}}),table.on("tool()",function(e){var t=e.data;"search"==e.event?admin.popup({title:"订单号［"+t.productNo+"]---订单时间［"+t.gmtCreate+"］",area:["45%","70%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_stencil_detail",t).done(function(){})}}):"chxx"==e.event&&admin.req({type:"post",url:setter.baseUrl+"iqc/shippinginfo/infoSml/"+t.id,success:function(e){t.shippingInfo=e.shippingInfo,admin.popup({title:"Stencil出货信息",area:["734px","468px"],btn:["保存","提交","返回"],btn1:function(e,t){return layer.msg("保存"),n(".outbound-submit").attr("data","save"),n(".outbound-submit").click(),!1},btn2:function(){return n(".outbound-submit").attr("data","submit"),n(".outbound-submit").click(),!1},btn3:function(){layer.msg("取消")},success:function(e,i){view(this.id).render("productManagement/iframeWindow/outbound_info",t).done(function(){form.on("submit(fomrOutboundInfo)",function(e){var t=e.field;return console.log(t),admin.req({url:setter.baseUrl+"iqc/stencilorder/saveShippingInfo",type:"POST",data:t,success:function(e){0==e.code?layer.msg(e.msg):layer.msg(e.msg,{icon:5}),layui.table.reload("iqcMana_outBoundS"),layer.close(i)}}),!1})})}})}})}),e("proMana_outbound_order",{})});