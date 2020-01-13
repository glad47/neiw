/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate"],function(e){function t(){table.render({elem:"#sqeManaShip_tabPcb",url:setter.baseUrl+"sqe/pcborder/shipmentTogether/list",toolbar:"#ord_sqpManaShip_tb",cellMinWidth:80,id:"sqeManaShip_tabPcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"聚谷型号",width:148,fixed:"left",sort:!0},{field:"status",title:"状态",width:110,templet:"#sqeMan_shipto",sort:!0},{field:"id",title:"ID",hide:!0,sort:!0},{field:"supplierId",title:"供应商编号",width:117,sort:!0},{field:"factoryMake",title:"供应商厂编",width:117,sort:!0},{field:"gmtModified",title:"修改时间",width:175,sort:!0},{field:"deliveryTime",title:"交期",width:110,templet:"#scmManaShip_deliver",sort:!0},{field:"orderPcsNumber",title:"订单PCS数",minWidth:117,sort:!0},{field:"donePcsNumber",title:"已提交PCS数",minWidth:117,sort:!0},{field:"surplusPcsNumber",title:"未交PCS数",minWidth:117,sort:!0},{field:"currPcsNumber",title:"当前提交PCS数",minWidth:133,sort:!0},{field:"totalPcsNumber",title:"总PCS数",minWidth:117,sort:!0},{field:"courierCompany",title:"快递公司",width:124,sort:!0},{field:"courierOrderNo",title:"快递订单号",width:117,sort:!0},{field:"deliveryNo",title:"交货批次",width:144,sort:!0},{field:"orderSupplierId",title:"供应商订单ID",minWidth:122,sort:!0},{field:"gmtCreate",title:"gmtCreate",hide:!0},{field:"gmtModified",title:"gmtModified",hide:!0},{fixed:"right",title:"操作",toolbar:"#scmManaShip_tabbar",width:150}]],done:function(e,t,i){}})}function i(){table.render({elem:"#sqeManaShip_tabStencil",url:setter.baseUrl+"sqe/stencilorder/shipmentTogether/list",toolbar:"#ord_sqpManaShip_tbS",cellMinWidth:80,id:"sqeManaShip_tabStencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"status",title:"状态",width:110,templet:"#iqcMana_ia",sort:!0},{field:"id",title:"ID",hide:!0,sort:!0},{field:"gmtModified",title:"修改时间",width:175,sort:!0},{field:"deliveryTime",title:"交期",width:110,templet:"#scmManaShip_deliverS",sort:!0},{field:"orderPcsNumber",title:"订单PCS数",minWidth:117,sort:!0},{field:"donePcsNumber",title:"已提交PCS数",minWidth:117,sort:!0},{field:"surplusPcsNumber",title:"未交PCS数",minWidth:117,sort:!0},{field:"currPcsNumber",title:"当前提交PCS数",minWidth:133,sort:!0},{field:"totalPcsNumber",title:"总PCS数",minWidth:117,sort:!0},{field:"courierCompany",title:"快递公司",width:124,sort:!0},{field:"courierOrderNo",title:"快递订单号",width:117,sort:!0},{field:"deliveryNo",title:"交货批次",width:144,sort:!0},{field:"orderSupplierId",title:"供应商订单ID",minWidth:122,sort:!0},{field:"gmtCreate",title:"gmtCreate",hide:!0,sort:!0},{field:"gmtModified",title:"gmtModified",hide:!0,sort:!0},{fixed:"right",title:"操作",toolbar:"#scmManaShip_tabbarS",width:150,sort:!0}]],done:function(e,t,i){}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var r=layui.jquery;t();var l={orderType:1};element.on("tab(tab-planToger)",function(e){console.log(e.index),0===e.index?(l.orderType=1,t()):1===e.index?(l.orderType=2,i()):2===e.index&&(l.orderType=3)}),table.on("toolbar(sqeManaShip_tabPcb)",function(e){var t=table.checkStatus(e.config.id),i=t.data;if(0==i.length)return layer.msg("请选择一条数据！"),!1;if("submit"===e.event){for(var r=null,l=null,a=0;a<i.length;a++)null==r?r=i[a].supplierContractNo:r+=","+i[a].supplierContractNo,null==l?l=i[a].orderId:l+=","+i[a].orderId;layer.confirm("确认提交 ["+r+"] ?",function(e){admin.req({type:"post",data:{supplierContractNo:r,orderId:l},url:setter.baseUrl+"sqe/pcborder/submitByOt",success:function(t){"0"==t.code&&(layer.alert("提交成功！！"),table.reload("sqeManaShip_tabPcb"),layer.close(e))}}),table.reload("sqeManaPlan_tabPcb")})}}),table.on("tool(sqeManaShip_tabPcb)",function(e){var t=e.data;"edit"==e.event?(layer.msg("编辑操作"),admin.popup({title:"订单协同编辑",area:["434px","448px"],btn:["保存","取消"],yes:function(e,t){layer.msg("提交信息"),r(".otEdit").click()},success:function(e,i){var r=t.id,l=t.supplierId,a=t.orderId;view(this.id).render("sqeManagement/iframeWindow/order_together_edit",t).done(function(){form.on("submit(otEdit)",function(e){var t=e.field;return t.id=r,t.orderId=a,t.supplierId=l,console.log(t),admin.req({type:"post",data:t,url:setter.baseUrl+"scm/ordersupplier/update",success:function(e){layer.alert("订单协同修改成功"),table.reload("sqeManaPlan_tabPcb"),layer.close(i)}}),!1})})}})):"search"==e.event&&layer.msg("查看订单协同")}),table.on("toolbar(sqeManaShip_tabStencil)",function(e){var t=table.checkStatus(e.config.id),i=t.data;if(i.length<1)layer.msg("请选择一条数据！");else if("submit"===e.event){for(var r=null,l=0;l<i.length;l++)null==r?r+=i[l].id:r=r+","+i[l].id;layer.confirm("确认提交 ["+r+"] ?",function(e){admin.req({type:"post",data:{ids:r},url:setter.baseUrl+"sqe/pcborder/batch/submit",success:function(t){"0"==t.code&&(layer.alert("提交成功！！"),table.reload("sqeMana_reconPcbTab"),layer.close(e))}})})}}),table.on("tool(sqeManaShip_tabStencil)",function(e){e.data;"edit"==e.event}),form.on("submit(shipmentTogether_search)",function(e){var t,i=e.field;1===l.orderType?t="sqeManaShip_tabPcb":2===l.orderType&&(t="sqeManaShip_tabStencil"),table.reload(t,{where:i})}),r(".shipment-together-search input").bind("input propertychange",function(e){r("*[lay-filter='shipmentTogether_search']").click()}),e("sqeMana_shipment_together",{})});