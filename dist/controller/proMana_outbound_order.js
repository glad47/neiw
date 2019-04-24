/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate"],function(e){function t(){table.render({elem:"#iqcMana_outBound",url:setter.baseUrl+"iqc/pcborder/outboundOrder/list",toolbar:"#ord_sqpManaPlan_tb",cellMinWidth:80,id:"iqcMana_outBound",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{type:"checkbox"},{field:"status",title:"状态",width:110,templet:"#proManaquo_status"},{field:"invoiceNo",title:"合同号",minWidth:165},{field:"productNo",title:"聚谷型号",minWidth:141},{field:"deliveryTime",title:"交期"},{field:"quantityPcs",title:"订单PCS数"},{field:"finishPcsNumber",title:"已交PCS数",templet:"<div>{{ d.finishPcsNumber || 0 }}</div>"},{field:"courierCompany",title:"快递公司"},{field:"courierOrderNo",title:"快递单号"},{field:"pcbName",title:"256",width:132},{fixed:"right",title:"操作",toolbar:"#proManaNgveiw_tabbar",width:230}]],done:function(e,t,i){}})}function i(){table.render({elem:"#iqcMana_outBoundS",url:setter.baseUrl+"iqc/stencilorder/outboundOrder/list",toolbar:"#ord_sqpManaPlan_tb",cellMinWidth:80,id:"iqcMana_outBoundS",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{type:"checkbox"},{field:"status",title:"状态",width:110,templet:"#proManaquo_status"},{field:"invoiceNo",title:"合同号",minWidth:165},{field:"productNo",title:"聚谷型号",minWidth:141},{field:"deliveryTime",title:"交期"},{field:"quantityPcs",title:"订单PCS数"},{field:"finishPcsNumber",title:"已交PCS数",templet:"<div>{{ d.finishPcsNumber || 0 }}</div>"},{field:"courierCompany",title:"快递公司"},{field:"courierOrderNo",title:"快递单号"},{field:"pcbName",title:"256",width:132},{fixed:"right",title:"操作",toolbar:"#proManaNgveiw_tabbar",width:230}]],done:function(e,t,i){}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var n=layui.jquery;t();var a={orderType:1};element.on("tab(tab-planToger)",function(e){console.log(e.index),0===e.index?(t(),a.orderType=1):1===e.index?(i(),a.orderType=2):2===e.index&&(a.orderType=3)}),table.on("toolbar(iqcMana_outBound)",function(e){var t=table.checkStatus(e.config.id),i=t.data,a=new Array;if("submit"===e.event){for(var o=0;o<i.length;o++)a[o]={id:i[o].id,uuid:i[o].uuid};var r=new Object;r.shipmentVoList=a,console.log(r),console.log(a),layer.confirm("确定出货？",function(){n.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},contentType:"application/json;charset=utf-8",data:JSON.stringify(r),url:setter.baseUrl+"iqc/pcborder/shipment",success:function(){layer.alert("出货成功!"),table.reload("iqcMana_outBound"),layer.closeAll()}})})}}),table.on("tool(iqcMana_outBound)",function(e){var t=e.data;if("edit"==e.event)layer.msg("编辑操作"),admin.popup({title:"订单协同编辑",area:["434px","448px"],btn:["保存","取消"],yes:function(e,t){layer.msg("提交信息"),n(".otEdit").click()},success:function(e,i){var n=t.id,a=t.supplierId,o=t.orderId;view(this.id).render("sqeManagement/iframeWindow/order_together_edit",t).done(function(){form.on("submit(otEdit)",function(e){var t=e.field;return t.id=n,t.orderId=o,t.supplierId=a,console.log(t),admin.req({type:"post",data:t,url:setter.baseUrl+"scm/ordersupplier/update",success:function(e){layer.alert("订单协同修改成功"),table.reload("iqcMana_outBound"),layer.close(i)}}),!1})})}});else if("search"==e.event)layer.msg("查看订单协同");else if("chxx"==e.event){var i;admin.req({type:"post",url:setter.baseUrl+"iqc/shippinginfo/info/"+t.id,success:function(e){var a;t.shippingInfo=e.shippingInfo,null!=e.shippingInfo?(a=e.shippingInfo,i=!1):(layer.msg("当前没有数据"),i=!0),admin.popup({title:"出货信息",area:["734px","468px"],btn:["保存","提交","返回"],btn1:function(e,t){return layer.msg("保存"),n(".outbound-submit").attr("data","save"),n(".outbound-submit").click(),!1},btn2:function(){return n(".outbound-submit").attr("data","submit"),n(".outbound-submit").click(),!1},btn3:function(){layer.msg("取消")},success:function(e,o){view(this.id).render("productManagement/iframeWindow/outbound_info",t).done(function(){console.log(a),form.on("submit(fomrOutboundInfo)",function(e){var t,a=n(".outbound-submit").attr("data");"save"==a?t="iqc/pcborder/saveShippingInfo":"submit"==a&&(t="");var r=e.field;return i||(r.orderId=0),console.log(r),admin.req({url:setter.baseUrl+t,type:"POST",data:r,success:function(e){0==e.code?layer.msg(e.msg):layer.msg(e.msg,{icon:5}),layui.table.reload("iqcMana_outBound"),layer.close(o)}}),!1})})}})}}),t.finishPcsNumber!==t.quantityPcs?layer.msg("PCS数未全部交清，操作失败！"):layer.msg("PCS数全交期，操作成功！")}}),e("proMana_outbound_order",{})});