/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","convertCurrency","requestInterface","formSelects"],function(e){function t(){table.render({elem:"#scmManaOutSC_tabPcb",url:setter.baseUrl+"/scm/pcborder/outsourcingContract/list",toolbar:"#scmManaOutSC_toolbar",cellMinWidth:80,id:"scmManaOutSC_tabPcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"status",title:"状态",templet:"#og_status",minWidth:104,sort:!0},{field:"supplierContractNo",title:"合同编号",minWidth:171,sort:!0},{field:"gmtCreate",title:"创建时间",width:166,sort:!0},{field:"supplierNo",title:"供应商编号",width:124,sort:!0},{field:"factoryMake",title:"供应商厂编",minWidth:190,sort:!0},{field:"productNo",title:"聚谷型号",width:124,sort:!0},{field:"pcbName",title:"聚谷物料号",width:144,sort:!0},{field:"quantityPcs",title:"订单数量(PCS)",width:134,sort:!0},{field:"unitPrice",title:"单价",width:96,sort:!0},{field:"engineeringFee",title:"工程费",width:96,sort:!0},{field:"testCostFee",title:"飞针费",width:96,sort:!0},{field:"testCostFee",title:"测试架费",width:96,sort:!0},{field:"toolingFee",title:"模具",width:96,sort:!0},{field:"totalFee",title:"合计",width:96,sort:!0},{field:"remark",title:"订单备注",width:168,sort:!0},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"unitPriceCustomer",title:"unitPriceCustomer",hide:!0},{field:"engineeringFeeCustomer",title:"engineeringFeeCustomer",hide:!0},{field:"testCostFeeCustomer",title:"testCostFeeCustomer",hide:!0},{field:"toolingFeeCustomer",title:"toolingFeeCustomer",hide:!0},{field:"subtotal",title:"subtotal",hide:!0},{fixed:"right",title:"操作",toolbar:"#scmManaOutsource_tabbar",width:160}]],done:function(e,t,a){var i=e.data;n=i}})}function a(){table.render({elem:"#scmManaOutSC_tabStencil",url:setter.baseUrl+"scm/stencilorder/outsourcingContract/list",toolbar:"#scmManaOutSC_toolbarS",cellMinWidth:80,id:"scmManaOutSC_tabStencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"status",title:"状态",templet:"#og_statusS",minWidth:104,sort:!0},{field:"supplierContractNo",title:"合同编号",minWidth:171,sort:!0},{field:"gmtCreate",title:"创建时间",width:166,sort:!0},{field:"supplierNo",title:"供应商编号",width:124,sort:!0},{field:"factoryMake",title:"供应商厂编",minWidth:190,sort:!0},{field:"productNo",title:"聚谷型号",width:124,sort:!0},{field:"pcbName",title:"聚谷物料号",width:144,sort:!0},{field:"quantityPcs",title:"订单数量(PCS)",width:134,sort:!0},{field:"unitPrice",title:"单价",width:96,sort:!0},{field:"engineeringFee",title:"工程费",width:96,sort:!0},{field:"testCostFee",title:"飞针费",width:96,sort:!0},{field:"testCostFee",title:"测试架费",width:96,sort:!0},{field:"toolingFee",title:"模具",width:96,sort:!0},{field:"subtotal",title:"合计",width:96,sort:!0},{field:"remark",title:"订单备注",width:168,sort:!0},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"unitPriceCustomer",title:"unitPriceCustomer",hide:!0},{field:"engineeringFeeCustomer",title:"engineeringFeeCustomer",hide:!0},{field:"testCostFeeCustomer",title:"testCostFeeCustomer",hide:!0},{field:"toolingFeeCustomer",title:"toolingFeeCustomer",hide:!0},{field:"subtotal",title:"subtotal",hide:!0},{fixed:"right",title:"操作",toolbar:"#scmManaOutsource_tabbarS",width:160}]],done:function(e,t,a){var i=e.data;stenciltabObj=i}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,formSelects=layui.formSelects,element=layui.element;var i=layui.jquery,l=layui.convertCurrency,o=layui.requestInterface,r={orderType:0};t();var n;element.on("tab(tab-scmManagement)",function(e){r.orderType=e.index,1===e.index?(a(),i(".outsourcing-contract-search").attr("reload-table","scmManaOutSC_tabStencil")):2===e.index?i(".outsourcing-contract-search").attr("reload-table",""):(t(),i(".outsourcing-contract-search").attr("reload-table","scmManaOutSC_tabPcb"))}),table.on("toolbar(scmManaOutSC_tabPcb)",function(e){var t=table.checkStatus(e.config.id),a=t.data;if("evScmSubmit"===e.event){var a=t.data;console.log(a);var l=null,o=null;if(a.length<1)return layer.msg("至少选择一条数据！"),!1;for(var r=0;r<a.length;r++)o+=null==o?+a[r].id:","+a[r].id,null==l?l=a[r].supplierContractNo:l+=","+a[r].supplierContractNo;layer.confirm("确认回签 ["+l+"] ?",function(e){admin.req({type:"post",data:{supplierContractNo:l},url:setter.baseUrl+"scm/pcborder/signBackByOc",success:function(t){"0"==t.code&&(layer.alert("提交成功！！"),table.reload("scmManaOutSC_tabPcb"),layer.close(e))}})})}else if("confirmDate"==e.event){for(var n=new Array,r=0;r<a.length;r++)n.push({orderId:a[r].orderId,supplierContractNo:a[r].supplierContractNo});layer.confirm("是否确认交期？",function(){i.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},data:JSON.stringify(n),contentType:"application/json;charset=utf-8",url:setter.baseUrl+"scm/pcborder/confirmDeliveryByOc",success:function(){layer.alert("已确认"),table.reload("scmManaOutSC_tabPcb")}}),layer.closeAll()})}}),table.on("tool(scmManaOutSC_tabPcb)",function(e){var t=e.data,a=t.supplierContractNo;if("eevScmedit"==e.event)layer.msg("编辑操作"),admin.popup({title:"PCB报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,a){layer.msg("提交信息");var l=new Object;l.id=t.id,l.orderId=t.orderId,l.supplierId=t.supplierId,l.supplierQuoteNo=t.supplierQuoteNo,l.boardFee=t.boardFee,l.testCostFee=i("#qt_pcb_testCostFee").val(),l.engineeringFee=i("#qt_pcb_engineeringFee").val(),l.toolingFee=i("#qt_pcb_toolingFee").val(),l.overworkFee=i("#qt_pcb_overworkFee").val(),l.deliveryTime=i("#pcbDeliveryDate").val(),l.unitPrice=i("#qt_pcb_unitPrice").val(),l.remark=i("#qRemark").val(),l.status="",l.factoryMake=i("#pcbfactoryMake").val(),l.testPointType=i("#hiddenTestPoint").val(),l.totalFee=i("#qt_pcb_totalFee").text(),l.pcbaProcessFee=i("#qt_pcbaProcessFee").val(),l.pcbaPartsFee=i("#qt_pcbaPartsFee").val(),l.pcbaTestFee=i("#qt_pcbaTestFee").val(),l.pcbaToolFee=i("#qt_pcbaToolFee").val(),l.pcbaSubtotalFee=i("#qt_pcbaSubtotalFee").text(),console.log(l),admin.req({type:"post",data:l,url:setter.baseUrl+"scm/pcborder/updateQuoteBeOt",success:function(t){layer.alert("供应商报价修改成功"),table.reload("scmManaOutSC_tabPcb"),layer.close(e)}})},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,a){view(this.id).render("scmManagement/iframeWindow/quote_detail_pcb",t).done(function(){})}});else if("search"==e.event){for(var r,s={data:{}},c=e.data,a=c.supplierContractNo,d=0,u=0,p=0;p<n.length;p++)if(a==n[p].supplierContractNo){d+=1;var f=n[p];s.data[d]=f,u+=n[p].totalFee}for(var p=0;p<s.data.length;p++){var m=s.data[p].subtotal;u+=m,console.log("totalFee:"+u),console.log("sd_len:"+d)}r=l.conversion(u),console.log("convertSubtotal:"+r),s.totalFee=u,s.convertSubtotal=r,s.supplierInfo=o.GetSupplierInfo(setter.baseUrl+"sys/supplier/info/"+t.supplierId),console.log(s),admin.popup({title:"外协合同",area:["100%","100%"],btn:["打印","关闭"],yes:function(){var e="outsContract";document.body.innerHTML=document.getElementById(e).innerHTML,window.print(),window.location.reload()},success:function(){view(this.id).render("scmManagement/iframeWindow/outs_contract",s).done(function(){})}})}else"signBack"==e.event&&layer.confirm("确定退回？",function(e){admin.req({type:"post",data:{supplierContractNo:a},url:setter.baseUrl+"scm/pcborder/rollbackOrderByOc",success:function(){layer.alert("退回成功！"),table.reload("scmManaOutSC_tabPcb")}}),layer.close(e)})}),table.on("toolbar(scmManaOutSC_tabStencil)",function(e){var t=table.checkStatus(e.config.id),a=t.data;if("evScmSubmit"===e.event){var a=t.data;console.log(a);var i=null,l=null;if(a.length<1)return layer.msg("至少选择一条数据！"),!1;for(var o=0;o<a.length;o++)l+=null==l?+a[o].id:","+a[o].id,null==i?i=a[o].supplierContractNo:i+=","+a[o].supplierContractNo;layer.confirm("确认回签 ["+i+"] ?",function(e){admin.req({type:"post",data:{supplierContractNo:i},url:setter.baseUrl+"scm/stencilorder/signBackByOc",success:function(t){"0"==t.code&&(layer.alert("提交成功！！"),table.reload("scmManaOutSC_tabStencil"),layer.close(e))}})})}else if("confirmDate"==e.event){for(var r=new Array,o=0;o<a.length;o++)r.push({orderId:a[o].orderId,supplierContractNo:a[o].supplierContractNo});layer.confirm("是否确认交期？",function(){admin.req({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},data:JSON.stringify(r),contentType:"application/json;charset=utf-8",url:setter.baseUrl+"scm/stencilorder/confirmDeliveryByOc",success:function(){layer.alert("已确认"),table.reload("scmManaOutSC_tabStencil")}}),layer.closeAll()})}}),table.on("tool(scmManaOutSC_tabStencil)",function(e){var t=e.data,a=t.supplierContractNo;if("eevScmedit"==e.event)layer.msg("编辑操作"),admin.popup({title:"Stencil 钢网报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,a){layer.msg("提交信息");var l=new Object;l.id=t.id,l.orderId=t.orderId,l.supplierId=t.supplierId,l.supplierQuoteNo=t.supplierQuoteNo,l.deliveryTime=i("#stencilDeliveryDate").val(),l.unitPrice=i("#qt_stencil_unitPrice").val(),l.remark=i("#sRemark").val(),l.status="",l.factoryMake=i("#stencilfactoryMake").val(),l.totalFee=i("#qt_stencil_totalFee").text(),console.log(l),admin.req({type:"post",data:l,url:setter.baseUrl+"scm/stencilorder/updateQuoteBeOt",success:function(t){layer.alert("供应商报价修改成功"),table.reload("scmMana_tabStencil"),layer.close(e)}})},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,a){view(this.id).render("scmManagement/iframeWindow/quote_detail_stencil",t).done(function(){})}});else if("search"==e.event){for(var r,n={data:{}},s=e.data,a=s.supplierContractNo,c=0,d=0,u=0;u<stenciltabObj.length;u++)if(a==stenciltabObj[u].supplierContractNo){c+=1;var p=stenciltabObj[u];n.data[c]=p,d+=stenciltabObj[u].totalStencilFee}for(var u=0;u<n.data.length;u++){console.log("开始循环");var f=n.data[u].totalStencilFee;d+=f,console.log("subtotal:"+d),console.log("sd_len:"+c)}r=l.conversion(d),console.log("convertSubtotal:"+r),n.subtotal=d,n.convertSubtotal=r,n.supplierInfo=o.GetSupplierInfo(setter.baseUrl+"sys/supplier/info/"+t.supplierId),admin.popup({title:"外协合同",area:["100%","100%"],btn:["打印","关闭"],yes:function(){var e="outsContract";document.body.innerHTML=document.getElementById(e).innerHTML,window.print(),window.location.reload()},success:function(){view(this.id).render("scmManagement/iframeWindow/outs_contractS",n).done(function(){})}})}else"signBack"==e.event&&layer.confirm("确定退回？",function(e){admin.req({type:"post",data:{supplierContractNo:a},url:setter.baseUrl+"scm/stencilorder/rollbackOrderByOc",success:function(){layer.alert("退回成功！"),table.reload("scmManaOutSC_tabStencil")}}),layer.close(e)})}),e("scmMana_outContract",{})});