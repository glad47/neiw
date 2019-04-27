/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","convertCurrency","requestInterface"],function(e){function t(){table.render({elem:"#scmManaOutSC_tabPcb",url:setter.baseUrl+"/scm/pcborder/outsourcingContract/list",toolbar:"#scmManaOutSC_toolbar",cellMinWidth:80,id:"scmManaOutSC_tabPcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"status",title:"状态",templet:"#og_status",minWidth:104},{field:"supplierContractNo",title:"合同编号",minWidth:171},{field:"gmtCreate",title:"创建时间",width:166},{field:"supplierNo",title:"供应商编号",width:124},{field:"factoryMake",title:"供应商厂编",minWidth:190},{field:"productNo",title:"聚谷型号",width:124},{field:"pcbName",title:"聚谷物料号",width:144},{field:"quantityPcs",title:"订单数量(PCS)",width:134},{field:"unitPrice",title:"单价",width:96},{field:"engineeringFee",title:"工程费",width:96},{field:"testCostFee",title:"飞针费",width:96},{field:"testCostFee",title:"测试架费",width:96},{field:"toolingFee",title:"模具",width:96},{field:"subtotal",title:"合计",width:96},{field:"remark",title:"订单备注",width:168},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"unitPriceCustomer",title:"unitPriceCustomer",hide:!0},{field:"engineeringFeeCustomer",title:"engineeringFeeCustomer",hide:!0},{field:"testCostFeeCustomer",title:"testCostFeeCustomer",hide:!0},{field:"toolingFeeCustomer",title:"toolingFeeCustomer",hide:!0},{field:"subtotal",title:"subtotal",hide:!0},{fixed:"right",title:"操作",toolbar:"#scmManaOutsource_tabbar",width:160}]],done:function(e,t,i){var a=e.data;r=a}})}function i(){table.render({elem:"#scmManaOutSC_tabStencil",url:setter.baseUrl+"scm/stencilorder/outsourcingContract/list",toolbar:"#scmManaOutSC_toolbarS",cellMinWidth:80,id:"scmManaOutSC_tabStencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"status",title:"状态",templet:"#og_statusS",minWidth:104},{field:"supplierContractNo",title:"合同编号",minWidth:171},{field:"gmtCreate",title:"创建时间",width:166},{field:"supplierNo",title:"供应商编号",width:124},{field:"factoryMake",title:"供应商厂编",minWidth:190},{field:"productNo",title:"聚谷型号",width:124},{field:"pcbName",title:"聚谷物料号",width:144},{field:"quantityPcs",title:"订单数量(PCS)",width:134},{field:"unitPrice",title:"单价",width:96},{field:"engineeringFee",title:"工程费",width:96},{field:"testCostFee",title:"飞针费",width:96},{field:"testCostFee",title:"测试架费",width:96},{field:"toolingFee",title:"模具",width:96},{field:"subtotal",title:"合计",width:96},{field:"remark",title:"订单备注",width:168},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"unitPriceCustomer",title:"unitPriceCustomer",hide:!0},{field:"engineeringFeeCustomer",title:"engineeringFeeCustomer",hide:!0},{field:"testCostFeeCustomer",title:"testCostFeeCustomer",hide:!0},{field:"toolingFeeCustomer",title:"toolingFeeCustomer",hide:!0},{field:"subtotal",title:"subtotal",hide:!0},{fixed:"right",title:"操作",toolbar:"#scmManaOutsource_tabbarS",width:160}]],done:function(e,t,i){var a=e.data;stenciltabObj=a}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var a=layui.jquery,l=layui.convertCurrency,n=layui.requestInterface;t();var r,o={orderType:1};element.on("tab(tab-scmManagement)",function(e){console.log(e.index),0===e.index?(o.orderType=1,t()):1===e.index?(o.orderType=2,i()):2===e.index&&(o.orderType=3)}),table.on("toolbar(scmManaOutSC_tabPcb)",function(e){var t=table.checkStatus(e.config.id),i=t.data;if("evScmSubmit"===e.event){var i=t.data;console.log(i);var l=null,n=null;if(i.length<1)return layer.msg("至少选择一条数据！"),!1;for(var r=0;r<i.length;r++)n+=null==n?+i[r].id:","+i[r].id,null==l?l=i[r].supplierContractNo:l+=","+i[r].supplierContractNo;layer.confirm("确认回签 ["+l+"] ?",function(e){admin.req({type:"post",data:{supplierContractNo:l},url:setter.baseUrl+"scm/pcborder/signBackByOc",success:function(t){"0"==t.code&&(layer.alert("提交成功！！"),table.reload("scmManaOutSC_tabPcb"),layer.close(e))}})})}else if("confirmDate"==e.event){for(var o=new Array,r=0;r<i.length;r++)o.push({orderId:i[r].orderId,supplierContractNo:i[r].supplierContractNo});layer.confirm("是否确认交期？",function(){a.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},data:JSON.stringify(o),contentType:"application/json;charset=utf-8",url:setter.baseUrl+"scm/pcborder/confirmDeliveryByOc",success:function(){layer.alert("已确认"),table.reload("scmManaOutSC_tabPcb")}}),layer.closeAll()})}}),table.on("tool(scmManaOutSC_tabPcb)",function(e){var t=e.data,i=t.supplierContractNo;if("eevScmedit"==e.event)layer.msg("编辑操作"),admin.popup({title:"PCB报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,i){layer.msg("提交信息");var l=new Object;l.id=t.id,l.orderId=t.orderId,l.orderType=o.orderType,l.supplierId=t.supplierId,l.supplierQuoteNo=t.supplierQuoteNo,l.boardFee=t.boardFee,l.testCostFee=a("#qt_pcb_testCostFee").val(),l.engineeringFee=a("#qt_pcb_engineeringFee").val(),l.toolingFee=a("#qt_pcb_toolingFee").val(),l.overworkFee=t.overworkFee,l.deliveryTime=a("#pcbDeliveryDate").val(),l.unitPrice=a("#qt_pcb_unitPrice").val(),l.remark=a("#qRemark").val(),l.status="",l.factoryMake=a("#pcbfactoryMake").val(),l.testPointType=a("#hiddenTestPoint").val(),l.totalFee=a("#qt_pcb_totalFee").text(),console.log(l),admin.req({type:"post",data:l,url:setter.baseUrl+"scm/pcborder/updateQuoteBeOt",success:function(t){layer.alert("供应商报价修改成功"),table.reload("scmManaOutSC_tabPcb"),layer.close(e)}})},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,i){view(this.id).render("scmManagement/iframeWindow/quote_detail_pcb",t).done(function(){})}});else if("search"==e.event){for(var s,c={data:{}},d=e.data,i=d.supplierContractNo,u=0,p=0,f=0;f<r.length;f++)if(i==r[f].supplierContractNo){u+=1;var m=r[f];c.data[u]=m,p+=r[f].totalFee}for(var f=0;f<c.data.length;f++){var b=c.data[f].subtotal;p+=b,console.log("subtotal:"+p),console.log("sd_len:"+u)}s=l.conversion(p),console.log("convertSubtotal:"+s),c.subtotal=p,c.convertSubtotal=s,c.supplierInfo=n.GetSupplierInfo(setter.baseUrl+"sys/supplier/info/"+t.supplierId),admin.popup({title:"外协合同",area:["100%","100%"],btn:["打印","关闭"],yes:function(){var e="outsContract";document.body.innerHTML=document.getElementById(e).innerHTML,window.print(),window.location.reload()},success:function(){view(this.id).render("scmManagement/iframeWindow/outs_contract",c).done(function(){})}})}else"signBack"==e.event&&layer.confirm("确定退回？",function(e){admin.req({type:"post",data:{supplierContractNo:i},url:setter.baseUrl+"scm/pcborder/rollbackOrderByOc",success:function(){layer.alert("退回成功！"),table.reload("scmManaOutSC_tabPcb")}}),layer.close(e)})}),table.on("toolbar(scmManaOutSC_tabStencil)",function(e){var t=table.checkStatus(e.config.id),i=t.data;if("evScmSubmit"===e.event){var i=t.data;console.log(i);var a=null,l=null;if(i.length<1)return layer.msg("至少选择一条数据！"),!1;for(var n=0;n<i.length;n++)l+=null==l?+i[n].id:","+i[n].id,null==a?a=i[n].supplierContractNo:a+=","+i[n].supplierContractNo;layer.confirm("确认回签 ["+a+"] ?",function(e){admin.req({type:"post",data:{supplierContractNo:a},url:setter.baseUrl+"scm/stencilorder/signBackByOc",success:function(t){"0"==t.code&&(layer.alert("提交成功！！"),table.reload("scmManaOutSC_tabStencil"),layer.close(e))}})})}else if("confirmDate"==e.event){for(var r=new Array,n=0;n<i.length;n++)r.push({orderId:i[n].orderId,supplierContractNo:i[n].supplierContractNo});layer.confirm("是否确认交期？",function(){admin.req({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},data:JSON.stringify(r),contentType:"application/json;charset=utf-8",url:setter.baseUrl+"scm/stencilorder/confirmDeliveryByOc",success:function(){layer.alert("已确认"),table.reload("scmManaOutSC_tabStencil")}}),layer.closeAll()})}}),table.on("tool(scmManaOutSC_tabStencil)",function(e){var t=e.data,i=t.supplierContractNo;if("eevScmedit"==e.event)layer.msg("编辑操作"),admin.popup({title:"Stencil 钢网报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,i){layer.msg("提交信息");var l=new Object;l.id=t.id,l.orderId=t.orderId,l.orderType=o.orderType,l.supplierId=t.supplierId,l.supplierQuoteNo=t.supplierQuoteNo,l.deliveryTime=a("#stencilDeliveryDate").val(),l.unitPrice=a("#qt_stencil_unitPrice").val(),l.remark=a("#sRemark").val(),l.status="",l.factoryMake=a("#stencilfactoryMake").val(),l.totalFee=a("#qt_stencil_totalFee").text(),console.log(l),admin.req({type:"post",data:l,url:setter.baseUrl+"scm/stencilorder/updateQuoteBeOt",success:function(t){layer.alert("供应商报价修改成功"),table.reload("scmMana_tabStencil"),layer.close(e)}})},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,i){view(this.id).render("scmManagement/iframeWindow/quote_detail_stencil",t).done(function(){})}});else if("search"==e.event){for(var r,s={data:{}},c=e.data,i=c.supplierContractNo,d=0,u=0,p=0;p<stenciltabObj.length;p++)if(i==stenciltabObj[p].supplierContractNo){d+=1;var f=stenciltabObj[p];s.data[d]=f,u+=stenciltabObj[p].totalStencilFee}for(var p=0;p<s.data.length;p++){console.log("开始循环");var m=s.data[p].totalStencilFee;u+=m,console.log("subtotal:"+u),console.log("sd_len:"+d)}r=l.conversion(u),console.log("convertSubtotal:"+r),s.subtotal=u,s.convertSubtotal=r,s.supplierInfo=n.GetSupplierInfo(setter.baseUrl+"sys/supplier/info/"+t.supplierId),admin.popup({title:"外协合同",area:["100%","100%"],btn:["打印","关闭"],yes:function(){var e="outsContract";document.body.innerHTML=document.getElementById(e).innerHTML,window.print(),window.location.reload()},success:function(){view(this.id).render("scmManagement/iframeWindow/outs_contractS",s).done(function(){})}})}else"signBack"==e.event&&layer.confirm("确定退回？",function(e){admin.req({type:"post",data:{supplierContractNo:i},url:setter.baseUrl+"scm/stencilorder/rollbackOrderByOc",success:function(){layer.alert("退回成功！"),table.reload("scmManaOutSC_tabStencil")}}),layer.close(e)})}),e("scmMana_outContract",{})});