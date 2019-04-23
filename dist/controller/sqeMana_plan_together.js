/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate","jsTools"],function(e){function t(){table.render({elem:"#sqeManaPlan_tabPcb",url:setter.baseUrl+"sqe/pcborder/planTogether/list",toolbar:"#ord_sqpManaPlan_tb",cellMinWidth:80,id:"sqeManaPlan_tabPcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"status",title:"状态",templet:"#planStatus",width:110},{field:"supplierContractNo",title:"合同单号",minWidth:171},{field:"deliveryTime",title:"交期",width:110,templet:"#sqeManaDt"},{field:"supplierNo",title:"供应商编号",width:117},{field:"factoryMake",title:"供应商厂编",width:117},{field:"productNo",title:"聚谷型号",width:124},{field:"currPcsNumber",title:"此次数量(PCS)",width:134},{field:"quantityPcs",title:"订单数量(PCS)",width:134},{field:"donePcsNumber",title:"已交数量(PCS)",width:134},{field:"surplusPcsNumber",title:"未交数量(PCS)",width:134},{field:"",title:"当前工序",width:110},{field:"",title:"进度",width:110},{field:"gmtCreate",title:"签约日期",minWidth:172},{fixed:"right",title:"操作",toolbar:"#scmManaPlan_tabbar",minWidth:160}]],done:function(e,t,r){a("a[data='ok']").each(function(){a(this).parents("tr").css("background-color","rgba(121, 228, 119, 0.43)"),a(this).parents("td").css({"border-right":"none !important","border-bottom":"none !important"})})}})}function r(){table.render({elem:"#sqeManaPlan_tabStencil",url:setter.baseUrl+"sqe/stencilorder/planTogether/list",toolbar:"#ord_sqpManaPlan_tbS",cellMinWidth:80,id:"sqeManaPlan_tabStencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"status",title:"状态",templet:"#planStatusS",width:110},{field:"supplierContractNo",title:"合同单号",minWidth:171},{field:"deliveryTime",title:"交期",width:110,templet:"#sqeManaDtS"},{field:"supplierNo",title:"供应商编号",width:117},{field:"factoryMake",title:"供应商厂编",width:117},{field:"productNo",title:"聚谷型号",width:124},{field:"quantity",title:"订单数量(PCS)",width:134},{field:"donePcsNumber",title:"已交数量(PCS)",width:134},{field:"surplusPcsNumber",title:"未交数量(PCS)",width:134},{field:"",title:"当前工序",width:110},{field:"",title:"进度",width:110},{field:"gmtCreate",title:"签约日期",minWidth:172},{fixed:"right",title:"操作",toolbar:"#scmManaPlan_tabbarS",minWidth:160}]],done:function(e,t,r){}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var a=layui.jquery;layui.jsTools;t();var i={orderType:1};element.on("tab(tab-planToger)",function(e){console.log(e.index),0===e.index?(i.orderType=1,t()):1===e.index?(i.orderType=2,r()):2===e.index&&(i.orderType=3)}),table.on("toolbar(sqeManaPlan_tabPcb)",function(e){var t=table.checkStatus(e.config.id),r=t.data;if(r.length>1)return layer.msg("最多只能选择一条数据！"),!1;var a=null;"submit"===e.event&&layer.confirm("确定通知出货？",function(){for(var e=0;e<r.length;e++){if(0==r.length)return layer.msg("请选择一条数据！"),!1;null!=a?a+=r[e].id:a=r[e].id}admin.req({type:"post",url:setter.baseUrl+"sqe/pcborder/saveShipmentOrderByPt",data:{supplierOrderId:a},success:function(){layer.alert("通知出货成功！",function(){table.reload("sqeManaPlan_tabPcb"),layer.closeAll()})},error:function(){}})})}),table.on("tool(sqeManaPlan_tabPcb)",function(e){var t=e.data;if("edit"==e.event){var r={data:{},result:{}};r.orderType="pcb",r.data=t,admin.req({type:"post",data:{oid:t.id},url:setter.baseUrl+"scm/ordershipment/infoByOid",success:function(e){r.result=e.data,console.log(r),admin.popup({title:"PCB交货明细",area:["702px","547px"],btn:["保存","取消"],yes:function(e,t){a("#subdetailsDelivery").click()},success:function(t,i){r.data.id;view(this.id).render("sqeManagement/iframeWindow/details_delivery",r).done(function(){form.render(),form.on("select(courierCompany)",function(e){"送货"==e.value?a("input[name='courierOrderNo']").attr("disabled",!0):a("input[name='courierOrderNo']").attr("disabled",!1),form.render()}),form.on("submit(detailsDelivery)",function(t){var t=t.field;return null!=e.data&&(t.id=e.data.id),t.orderSupplierId=r.data.id,t.supplierNo=r.data.supplierNo,t.deliveryTime=(new Date).toLocaleDateString(),t.orderPcsNumber=r.data.quantityPcs,t.orderId=r.data.orderId,t.donePcsNumber=parseInt(a("#donePcsNumber").text()),t.surplusPcsNumber=parseInt(a("#surplusPcsNumber").text()),""!=t.courierCompany&&null!=t.courierCompany||(t.courierCompany="送货"),null==t.deliveryOrderNo||""==t.deliveryOrderNo||"undefined"==typeof t.deliveryOrderNo?(layer.alert("送货单号不能为空"),!1):t.orderPcsNumber==t.donePcsNumber||null!=t.currPcsNumber&&""!=t.currPcsNumber&&"undefined"!=typeof t.currPcsNumber?(console.log(t),admin.req({type:"post",data:t,url:setter.baseUrl+"sqe/pcborder/saveSo",success:function(e){layer.alert("保存成功！",function(){layer.alert("提交成功！"),table.reload("sqeManaPlan_tabPcb"),layer.closeAll()})}}),!1):(layer.alert("此次数量不能为空"),!1)})})}})}})}else"search"==e.event&&layer.msg("查看订单协同")}),table.on("toolbar(sqeManaPlan_tabStencil)",function(e){table.checkStatus(e.config.id);"submit"===e.event&&layer.confirm("确定通知出货",function(){})}),table.on("tool(sqeManaPlan_tabStencil)",function(e){var t=e.data;if("edit"==e.event){var r={data:{},result:{}};r.orderType="stencil",r.data=t,admin.req({type:"post",data:{oid:t.id},url:setter.baseUrl+"scm/ordershipment/infoByOid",success:function(e){r.result=e.data,console.log(r),admin.popup({title:"Stencil交货明细",area:["702px","547px"],btn:["保存","取消"],yes:function(e,t){a("#subdetailsDelivery").click()},success:function(e,t){r.data.id;view(this.id).render("sqeManagement/iframeWindow/details_delivery",r).done(function(){form.render(),form.on("select(courierCompany)",function(e){"送货"==e.value?a("input[name='courierOrderNo']").attr("disabled",!0):a("input[name='courierOrderNo']").attr("disabled",!1),form.render()}),form.on("submit(detailsDelivery)",function(e){layer.msg("提交");var e=e.field;return e.orderSupplierId=r.data.id,e.supplierNo=r.data.supplierNo,e.deliveryTime=(new Date).toLocaleDateString(),e.orderPcsNumber=r.data.quantityPcs,e.orderId=r.data.orderId,e.donePcsNumber=parseInt(a("#donePcsNumber").text()),e.surplusPcsNumber=parseInt(a("#surplusPcsNumber").text()),""!=e.courierCompany&&null!=e.courierCompany||(e.courierCompany="送货"),null==e.deliveryOrderNo||""==e.deliveryOrderNo||"undefined"==typeof e.deliveryOrderNo?(layer.alert("送货单号不能为空"),!1):null==e.currPcsNumber||""==e.currPcsNumber||"undefined"==typeof e.currPcsNumber&&e.orderPcsNumber==e.donePcsNumber?(layer.alert("此次数量不能为空"),!1):(console.log(e),layer.confirm("确定要生成送货单？",function(){admin.req({type:"post",data:e,url:setter.baseUrl+"sqe/pcborder/saveShipmentOrderByPt",success:function(e){layer.alert("提交成功！"),table.reload("sqeManaPlan_tabStencil"),layer.closeAll()}})}),!1)})})}})}})}}),e("sqeMana_plan_together",{})});