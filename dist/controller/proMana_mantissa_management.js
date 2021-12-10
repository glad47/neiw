/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate"],function(e){function t(){table.render({elem:"#proMana_MantissaMana",url:setter.baseUrl+"iqc/pcborder/mantissaManagement/list",toolbar:"#ord_sqpManaPlan_tb",cellMinWidth:80,id:"proMana_MantissaMana",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"聚谷型号",width:135,fixed:"left",sort:!0},{field:"status",title:"状态",width:110,templet:"#iqcMana_ia",sort:!0},{field:"",title:"周期",width:124,sort:!0},{field:"",title:"摆放位置",width:124,sort:!0},{field:"id",title:"ID",hide:!0,sort:!0},{field:"supplierContractNo",title:"合同单号",minWidth:171,sort:!0},{field:"deliveryTime",title:"交期",width:110,templet:" <a>{{ d.deliveryTime.substring(0,10) }}</a> ",sort:!0},{field:"supplierId",title:"供应商编号",width:117,sort:!0},{field:"factoryMake",title:"供应商厂编",width:117,sort:!0},{field:"orderPcsNumber",title:"订单数量(PCS)",width:134,sort:!0},{field:"donePcsNumber",title:"已交数量(PCS)",width:134,sort:!0},{field:"surplusPcsNumber",title:"未交数量(PCS)",width:134,sort:!0},{field:"currPcsNumber",title:"送货数量",minWidth:133,sort:!0},{field:"courierCompany",title:"快递公司",width:124,sort:!0},{field:"courierOrderNo",title:"快递订单号",width:117,sort:!0},{field:"deliveryOrderNo",title:"送货单号",width:117,sort:!0},{field:"deliveryNo",title:"交货批次",width:144,sort:!0},{field:"gmtModified",title:"修改时间",sort:!0},{field:"gmtCreate",title:"gmtCreate",hide:!0},{fixed:"right",title:"操作",toolbar:"#proManaMantissaMana_tabbar",width:160}]],done:function(e,t,i){}})}function i(){table.render({elem:"#proMana_MantissaManaS",url:setter.baseUrl+"iqc/stencilorder/mantissaManagement/list",toolbar:"#ord_sqpManaPlan_tbS",cellMinWidth:80,id:"proMana_MantissaManaS",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"聚谷型号",width:135,fixed:"left",sort:!0},{field:"status",title:"状态",width:110,templet:"#iqcMana_ia",sort:!0},{field:"",title:"周期",width:124,sort:!0},{field:"",title:"摆放位置",width:124,sort:!0},{field:"id",title:"ID",hide:!0,sort:!0},{field:"supplierContractNo",title:"合同单号",minWidth:171,sort:!0},{field:"deliveryTime",title:"交期",width:110,templet:" <a>{{ d.deliveryTime.substring(0,10) }}</a> ",sort:!0},{field:"supplierId",title:"供应商编号",width:117,sort:!0},{field:"factoryMake",title:"供应商厂编",width:117,sort:!0},{field:"orderPcsNumber",title:"订单数量(PCS)",width:134,sort:!0},{field:"donePcsNumber",title:"已交数量(PCS)",width:134,sort:!0},{field:"surplusPcsNumber",title:"未交数量(PCS)",width:134,sort:!0},{field:"currPcsNumber",title:"送货数量",minWidth:133,sort:!0},{field:"courierCompany",title:"快递公司",width:124,sort:!0},{field:"courierOrderNo",title:"快递订单号",width:117,sort:!0},{field:"deliveryOrderNo",title:"送货单号",width:117,sort:!0},{field:"deliveryNo",title:"交货批次",width:144,sort:!0},{field:"gmtModified",title:"修改时间",sort:!0},{field:"gmtCreate",title:"gmtCreate",hide:!0,sort:!0},{fixed:"right",title:"操作",toolbar:"#scmManaPlan_tabbarS",width:160}]],done:function(e,t,i){}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var r=layui.jquery;t();var a={orderType:1};element.on("tab(tab-planToger)",function(e){console.log(e.index),0===e.index?(t(),a.orderType=1):1===e.index?(a.orderType=2,i()):2===e.index&&(a.orderType=3)}),table.on("toolbar(proMana_MantissaMana)",function(e){var t=table.checkStatus(e.config.id),i={data:{},result:{}};if(i.data=t.data[0],"submit"===e.event){if(t.data.length<1)return layer.msg("请选择一条数据"),!1;if(t.data.length>=2)return layer.msg("最多只能选择一条数据！"),!1;admin.req({type:"post",data:{oid:t.data[0].id},url:setter.baseUrl+"scm/ordershipment/infoByOid",success:function(e){i.result=e.data,console.log(i),admin.popup({title:"交货明细",area:["702px","547px"],btn:["出货","取消"],yes:function(e,t){layer.confirm("确定要生产送货单？",function(){r("#subdetailsDelivery").click()})},success:function(e,t){i.data.id;view(this.id).render("sqeManagement/iframeWindow/details_delivery",i).done(function(){form.render(),form.on("submit(detailsDelivery)",function(e){layer.msg("提交");var e=e.field;return e.orderSupplierId=i.data.id,e.supplierNo=i.data.supplierNo,e.deliveryTime=(new Date).toLocaleDateString(),e.orderPcsNumber=i.data.quantityPcs,e.orderId=i.data.orderId,e.donePcsNumber=parseInt(r("#donePcsNumber").text()),e.surplusPcsNumber=parseInt(r("#surplusPcsNumber").text()),console.log(e),admin.req({type:"post",data:e,url:setter.baseUrl+"sqe/pcborder/saveShipmentOrderByPt",success:function(e){layer.alert("提交成功！"),table.reload("proMana_MantissaMana"),layer.closeAll()}}),!1})})}})}})}}),table.on("tool(proMana_MantissaMana)",function(e){var t=e.data;"edit"==e.event?admin.popup({title:"订单协同编辑",area:["434px","448px"],btn:["保存","取消"],yes:function(e,t){layer.msg("提交信息"),r(".otEdit").click()},success:function(e,i){var r=t.id,a=t.supplierId,d=t.orderId;view(this.id).render("sqeManagement/iframeWindow/order_together_edit",t).done(function(){form.on("submit(otEdit)",function(e){var t=e.field;return t.id=r,t.orderId=d,t.supplierId=a,console.log(t),admin.req({type:"post",data:t,url:setter.baseUrl+"scm/ordersupplier/update",success:function(e){layer.alert("订单协同修改成功"),table.reload("proMana_MantissaMana"),layer.close(i)}}),!1})})}}):"search"==e.event&&layer.msg("查看订单协同")}),e("proMana_mantissa_management",{})});