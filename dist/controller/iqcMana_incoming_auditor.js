/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate"],function(e){function t(){table.render({elem:"#iqcIncom_auditor",url:setter.baseUrl+"iqc/pcborder/incomingAuditor/list",toolbar:"#sqeMana_incoAuTb",cellMinWidth:80,id:"iqcIncom_auditor",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"status",title:"状态",width:110,templet:"#iqcMana_ia",sort:!0},{field:"id",title:"ID",hide:!0,sort:!0},{field:"supplierContractNo",title:"合同单号",minWidth:171,sort:!0},{field:"deliveryTime",title:"交期",width:110,templet:" <a>{{ d.deliveryTime.substring(0,10) }}</a> ",sort:!0},{field:"supplierId",title:"供应商编号",width:117,sort:!0},{field:"factoryMake",title:"供应商厂编",width:117,sort:!0},{field:"productNo",title:"聚谷型号",width:124,sort:!0},{field:"orderPcsNumber",title:"订单数量(PCS)",width:134,sort:!0},{field:"donePcsNumber",title:"已交数量(PCS)",width:134,sort:!0},{field:"surplusPcsNumber",title:"未交数量(PCS)",width:134,sort:!0},{field:"currPcsNumber",title:"送货数量",minWidth:133,sort:!0},{field:"courierCompany",title:"快递公司",width:124,sort:!0},{field:"courierOrderNo",title:"快递订单号",width:117,sort:!0},{field:"deliveryOrderNo",title:"送货单号",width:117,sort:!0},{field:"deliveryNo",title:"交货批次",width:144,sort:!0},{field:"gmtCreate",title:"gmtCreate",hide:!0},{field:"gmtModified",title:"gmtModified",hide:!0},{fixed:"right",title:"操作",toolbar:"#iqcManaIncau_tabbar",width:160}]],done:function(e,t,i){}})}function i(){table.render({elem:"#iqcIncom_auditorS",url:setter.baseUrl+"iqc/stencilorder/incomingAuditor/list",toolbar:"#sqeMana_incoAuTbS",cellMinWidth:80,id:"iqcIncom_auditorS",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"status",title:"状态",width:110,templet:"#iqcMana_ia",sort:!0},{field:"id",title:"ID",hide:!0,sort:!0},{field:"supplierContractNo",title:"合同单号",minWidth:171,sort:!0},{field:"deliveryTime",title:"交期",width:110,templet:" <a>{{ d.deliveryTime.substring(0,10) }}</a> ",sort:!0},{field:"supplierId",title:"供应商编号",width:117,sort:!0},{field:"factoryMake",title:"供应商厂编",width:117,sort:!0},{field:"productNo",title:"聚谷型号",width:124,sort:!0},{field:"orderPcsNumber",title:"订单数量(PCS)",width:134,sort:!0},{field:"donePcsNumber",title:"已交数量(PCS)",width:134,sort:!0},{field:"surplusPcsNumber",title:"未交数量(PCS)",width:134,sort:!0},{field:"currPcsNumber",title:"送货数量",minWidth:133,sort:!0},{field:"courierCompany",title:"快递公司",width:124,sort:!0},{field:"courierOrderNo",title:"快递订单号",width:117,sort:!0},{field:"deliveryOrderNo",title:"送货单号",width:117,sort:!0},{field:"deliveryNo",title:"交货批次",width:144,sort:!0},{field:"gmtCreate",title:"gmtCreate",hide:!0},{field:"gmtModified",title:"gmtModified",hide:!0},{fixed:"right",title:"操作",toolbar:"#iqcManaIncau_tabbarS",width:160}]],done:function(e,t,i){}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var r=layui.jquery;t(),element.on("tab(tab-planToger)",function(e){console.log(e.index),0===e.index?t():1===e.index?i():2===e.index}),table.on("toolbar(iqcIncom_auditor)",function(e){var t=table.checkStatus(e.config.id),i=t.data;if(i.length<1)return layer.msg("请选择一条数据"),!1;if("plrk"==e.event){for(var r=new Array,a=0;a<i.length;a++)r.push({id:i[a].id,orderId:i[a].orderId,orderPcsNumber:i[a].orderPcsNumber,currPcsNumber:i[a].currPcsNumber,orderType:i[a].orderType,isInternal:i[a].isInternal,onlineOid:i[a].onlineOid});layer.confirm("确定批量入库？",function(){admin.req({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},contentType:"application/json;charset=utf-8",data:JSON.stringify(r),url:setter.baseUrl+"iqc/pcborder/batchStatusOk",success:function(){layer.msg("批量入库成功"),table.reload("iqcIncom_auditor"),layer.closeAll()}})})}}),table.on("tool(iqcIncom_auditor)",function(e){var t=e.data;console.log(t),"edit"==e.event?admin.popup({title:"PCB此批来料检验",area:["624px","494px"],btn:["NG评审","NG批退","OK入库","保存"],btn1:function(e,i){t.pcsMantissa=r("input[name='pcsMantissa']").val(),t.failPcsNumber=r("input[name='failPcsNumber']").val(),layer.confirm("确定评审？",function(){admin.req({type:"post",data:t,url:setter.baseUrl+"iqc/pcborder/statusReview",success:function(e){table.reload("iqcIncom_auditor"),layer.closeAll()}})})},btn2:function(){return t.pcsMantissa=r("input[name='pcsMantissa']").val(),t.failPcsNumber=r("input[name='failPcsNumber']").val(),layer.confirm("确定批退？",function(){admin.req({type:"post",data:t,url:setter.baseUrl+"iqc/pcborder/statusBack",success:function(e){table.reload("iqcIncom_auditor"),layer.closeAll()}})}),!1},btn3:function(){return t.pcsMantissa=r("input[name='pcsMantissa']").val(),t.failPcsNumber=r("input[name='failPcsNumber']").val(),console.log(t),layer.confirm("确定入库？",function(){admin.req({type:"post",data:t,url:setter.baseUrl+"iqc/pcborder/statusOk",success:function(e){table.reload("iqcIncom_auditor"),layer.closeAll()}})}),!1},btn4:function(){t.pcsMantissa=r("input[name='pcsMantissa']").val(),t.failPcsNumber=r("input[name='failPcsNumber']").val(),layer.confirm("确定保存？",function(){admin.req({type:"post",data:t,url:setter.baseUrl+"iqc/pcborder/updateOrderShipment",success:function(){table.reload("iqcIncom_auditor"),layer.closeAll()}})})},success:function(e,i){var r=t.id,a=t.supplierId,n=t.orderId;view(this.id).render("iqcManagement/iframeWindow/incoming_auditor_edit",t).done(function(){form.on("submit(otEdit)",function(e){var t=e.field;return t.id=r,t.orderId=n,t.supplierId=a,console.log(t),admin.req({type:"post",data:t,url:setter.baseUrl+"scm/ordersupplier/update",success:function(e){layer.alert("订单协同修改成功"),table.reload("iqcIncom_auditor"),layer.close(i)}}),!1})})}}):"search"==e.event&&layer.msg("查看订单协同")}),table.on("toolbar(iqcIncom_auditorS)",function(e){var t=table.checkStatus(e.config.id),i=t.data;if(i.length<1)return layer.msg("请选择一条数据"),!1;if("plrk"===e.event){for(var r=new Array,a=0;a<i.length;a++)r.push({id:i[a].id,orderId:i[a].orderId,orderPcsNumber:i[a].orderPcsNumber,currPcsNumber:i[a].currPcsNumber,orderType:i[a].orderType,isInternal:i[a].isInternal,onlineOid:i[a].onlineOid});layer.confirm("确定批量入库？",function(){admin.req({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},contentType:"application/json;charset=utf-8",data:JSON.stringify(r),url:setter.baseUrl+"iqc/stencilorder/batchStatusOk",success:function(){layer.msg("批量入库成功"),table.reload("iqcIncom_auditorS"),layer.closeAll()}})})}}),table.on("tool(iqcIncom_auditorS)",function(e){var t=e.data;console.log(t),"edit"==e.event?admin.popup({title:"Stencil此批来料检验",area:["624px","494px"],btn:["NG评审","NG批退","OK入库","保存"],btn1:function(e,i){t.pcsMantissa=r("input[name='pcsMantissa']").val(),t.failPcsNumber=r("input[name='failPcsNumber']").val(),layer.confirm("确定评审？",function(){admin.req({type:"post",data:t,url:setter.baseUrl+"iqc/stencilorder/statusReview",success:function(e){table.reload("iqcIncom_auditorS"),layer.closeAll()}})})},btn2:function(){return t.pcsMantissa=r("input[name='pcsMantissa']").val(),t.failPcsNumber=r("input[name='failPcsNumber']").val(),layer.confirm("确定批退？",function(){admin.req({type:"post",data:t,url:setter.baseUrl+"iqc/stencilorder/statusBack",success:function(e){table.reload("iqcIncom_auditorS"),layer.closeAll()}})}),!1},btn3:function(){return t.pcsMantissa=r("input[name='pcsMantissa']").val(),t.failPcsNumber=r("input[name='failPcsNumber']").val(),layer.confirm("确定入库？",function(){admin.req({type:"post",data:t,url:setter.baseUrl+"iqc/stencilorder/statusOk",success:function(e){table.reload("iqcIncom_auditorS"),layer.closeAll()}})}),!1},btn4:function(){t.pcsMantissa=r("input[name='pcsMantissa']").val(),t.failPcsNumber=r("input[name='failPcsNumber']").val(),layer.confirm("确定保存？",function(){admin.req({type:"post",data:t,url:setter.baseUrl+"iqc/stencilorder/updateOrderShipment",success:function(){table.reload("iqcIncom_auditorS"),layer.closeAll()}})})},success:function(e,i){var r=t.id,a=t.supplierId,n=t.orderId;view(this.id).render("iqcManagement/iframeWindow/incoming_auditor_edit",t).done(function(){form.on("submit(otEdit)",function(e){var t=e.field;return t.id=r,t.orderId=n,t.supplierId=a,console.log(t),admin.req({type:"post",data:t,url:setter.baseUrl+"scm/ordersupplier/update",success:function(e){layer.alert("Stencil订单协同修改成功"),table.reload("iqcIncom_auditorS"),layer.close(i)}}),!1})})}}):"search"==e.event&&layer.msg("查看订单协同")}),e("iqcMana_incoming_auditor",{})});