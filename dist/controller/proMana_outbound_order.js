/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate","requestInterface","tools_printLable","proMana_global"],function(e){function t(){table.render({elem:"#iqcMana_outBound",url:setter.baseUrl+"iqc/pcborder/outboundOrder/list",toolbar:"#ord_sqpManaPlan_tb",cellMinWidth:80,id:"iqcMana_outBound",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"聚谷型号",minWidth:141,fixed:"left",sort:!0},{field:"status",title:"状态",width:110,templet:"#proManaquo_status",sort:!0},{field:"invoiceNo",title:"合同号",minWidth:165,sort:!0},{field:"pcbName",title:"客户型号",width:132,sort:!0},{field:"quantityPcs",title:"订单PCS数",sort:!0},{field:"finishPcsNumber",title:"已交PCS数",templet:"<div>{{ d.finishPcsNumber || 0 }}</div>",sort:!0},{field:"deliveryDate",title:"交期",templet:"#outboundDDatePCB",sort:!0},{field:"courierName",title:"快递公司",sort:!0},{field:"courierNumber",title:"快递单号",sort:!0},{fixed:"right",title:"操作",toolbar:"#proManaNgveiw_tabbar",width:230}]],done:function(e,t,n){i("a[data='isOk']").each(function(e,t){i(this).css({color:"#00CC66","font-weight":"500"})}),i("a[data='notOutbound']").each(function(e,t){i(this).parents("tr").css("background-color","#d2d2d2"),i(this).parents("tr").find("input[type='checkbox']").prop("disabled",!0),i(this).parents("td").css({"border-right":"none !important","border-bottom":"none !important"}),e>0&&i(this).parents(".layui-table-box").children(".layui-table-header").find("input[type='checkbox']").prop("disabled",!0)}),form.render()}})}function n(){table.render({elem:"#iqcMana_outBoundS",url:setter.baseUrl+"iqc/stencilorder/outboundOrder/list",toolbar:"#ord_sqpManaPlan_tb",cellMinWidth:80,id:"iqcMana_outBoundS",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"聚谷型号",minWidth:141,fixed:"left",sort:!0},{field:"status",title:"状态",width:110,templet:"#proManaquo_status",sort:!0},{field:"invoiceNo",title:"合同号",minWidth:165,sort:!0},{field:"pcbName",title:"客户型号",width:132,sort:!0},{field:"quantity",title:"订单PCS数",sort:!0},{field:"finishNumber",title:"已交PCS数",templet:"<div>{{ d.finishNumber || 0 }}</div>",sort:!0},{field:"deliveryDate",title:"交期",templet:"#outboundDDateStencil",sort:!0},{field:"courierName",title:"快递公司",sort:!0},{field:"courierNumber",title:"快递单号",sort:!0},{fixed:"right",title:"操作",toolbar:"#proManaNgveiw_tabbar",width:230}]],done:function(e,t,n){i("a[data='isOk']").each(function(e,t){i(this).css({color:"#00CC66","font-weight":"500"})}),i("a[data='notOutbound']").each(function(e,t){i(this).parents("tr").css("background-color","#d2d2d2"),i(this).parents("tr").find("input[type='checkbox']").prop("disabled",!0),i(this).parents("td").css({"border-right":"none !important","border-bottom":"none !important"}),e>0&&i(this).parents(".layui-table-box").children(".layui-table-header").find("input[type='checkbox']").prop("disabled",!0)}),form.render()}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,requestInterface=layui.requestInterface,tools_printLable=layui.tools_printLable,proMana_global=layui.proMana_global,element=layui.element;var i=layui.jquery;t();var a={orderType:1};element.on("tab(tab-planToger)",function(e){console.log(e.index),0===e.index?(t(),a.orderType=1):1===e.index?(n(),a.orderType=2):2===e.index&&(a.orderType=3)}),table.on("toolbar(iqcMana_outBound)",function(e){var t=table.checkStatus(e.config.id),n=t.data,a=new Array;if("submit"===e.event){if(t.data.length<1)return layer.msg("请选择一条数据"),!1;for(var o=0;o<n.length;o++)a[o]={id:n[o].id,uuid:n[o].uuid,courierNumber:n[o].courierNumber,courierName:n[o].courierName,isInternal:n[o].isInternal,onlineOid:n[o].onlineOid,orderId:n[o].id,orderType:n[o].orderType};var r=new Object;r.shipmentVoList=a,layer.confirm("确定出货？",function(){i.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},contentType:"application/json;charset=utf-8",data:JSON.stringify(r),url:setter.baseUrl+"iqc/pcborder/shipment",success:function(){layer.alert("出货成功!"),table.reload("iqcMana_outBound"),layer.closeAll()}}),i.ajax({type:"post",contentType:"application/json;charset=utf-8",data:JSON.stringify(n),url:setter.imUrl+"sendShippingEmail",success:function(){}})})}else(e.event="outerLable")&&tools_printLable.PrintLable(n)}),table.on("tool(iqcMana_outBound)",function(e){var t=e.data;if("packReq"==e.event){var n=setter.baseUrl+"/sys/consumer/user/info/"+t.userId,i=requestInterface.GetCustomerInfo(n);admin.popup({title:"PCB包装要求",id:"packReq",area:["734px","468px"],btn:["打印","返回"],btn1:function(){layer.msg("打印"),document.body.innerHTML=document.getElementById("packReqAll").innerHTML,window.print(),window.location.reload()},success:function(e,t){view(this.id).render("productManagement/iframeWindow/packaging _requirements",i).done(function(){form.render()})}}),console.log(i)}else"search"==e.event?admin.popup({title:"订单id:［"+t.id+"］-----------订单时间：［"+t.gmtCreate+"］",area:["100%","100%"],success:function(e,n){view(this.id).render("marketManagement/iframeWindow/order_pcb_detail",t).done(function(){})}}):"chxx"==e.event&&(t.table="iqcMana_outBound",proMana_global.chxx(t))}),table.on("toolbar(iqcMana_outBoundS)",function(e){var t=table.checkStatus(e.config.id),n=t.data,a=new Array;if("submit"==e.event){if(t.data.length<1)return layer.msg("请选择一条数据"),!1;for(var o=0;o<n.length;o++)a[o]={id:n[o].id,uuid:n[o].uuid,courierNumber:n[o].courierNumber,courierName:n[o].courierName,isInternal:n[o].isInternal,onlineOid:n[o].onlineOid,orderId:n[o].id,orderType:n[o].orderType};var r=new Object;r.shipmentVoList=a,console.log(r),console.log(a),layer.confirm("确定出货？",function(){i.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},contentType:"application/json;charset=utf-8",data:JSON.stringify(r),url:setter.baseUrl+"iqc/stencilorder/shipment",success:function(){layer.alert("出货成功!"),table.reload("iqcMana_outBoundS"),layer.closeAll()}}),i.ajax({type:"post",contentType:"application/json;charset=utf-8",data:JSON.stringify(n),url:setter.imUrl+"sendShippingEmail",success:function(){}})})}else"outerLable"==e.event&&(n.table="iqcMana_outBound",tools_printLable.PrintLable(n))}),table.on("tool(iqcMana_outBoundS)",function(e){var t=e.data;if("search"==e.event)admin.popup({title:"订单号［"+t.productNo+"]---订单时间［"+t.gmtCreate+"］",area:["45%","70%"],success:function(e,n){view(this.id).render("marketManagement/iframeWindow/order_stencil_detail",t).done(function(){})}});else if("chxx"==e.event)admin.req({type:"post",url:setter.baseUrl+"iqc/shippinginfo/infoSml/"+t.id,success:function(e){t.shippingInfo=e.shippingInfo,admin.popup({title:"Stencil出货信息",area:["734px","468px"],btn:["保存","提交","返回"],btn1:function(e,t){return layer.msg("保存"),i(".outbound-submit").attr("data","save"),i(".outbound-submit").click(),!1},btn2:function(){return i(".outbound-submit").attr("data","submit"),i(".outbound-submit").click(),!1},btn3:function(){layer.msg("取消")},success:function(e,n){view(this.id).render("productManagement/iframeWindow/outbound_info",t).done(function(){form.on("submit(fomrOutboundInfo)",function(e){var t=e.field;return t.orderType=2,console.log(t),admin.req({url:setter.baseUrl+"iqc/stencilorder/saveShippingInfo",type:"POST",data:t,success:function(e){0==e.code?layer.msg(e.msg):layer.msg(e.msg,{icon:5}),layui.table.reload("iqcMana_outBoundS"),layer.close(n)}}),!1})})}})}});else if("packReq"==e.event){layer.msg("包装要求");var n=setter.baseUrl+"/sys/consumer/user/info/"+t.userId,a=requestInterface.GetCustomerInfo(n);admin.popup({title:"钢网包装要求",id:"packReq",area:["734px","468px"],btn:["打印","返回"],btn1:function(){layer.msg("打印"),document.body.innerHTML=document.getElementById("packReqAll").innerHTML,window.print(),window.location.reload()},success:function(e,t){view(this.id).render("productManagement/iframeWindow/packaging _requirements",a).done(function(){})}}),console.log(a)}}),e("proMana_outbound_order",{})});