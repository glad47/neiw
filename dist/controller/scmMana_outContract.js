/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","convertCurrency","requestInterface","formSelects","laydate"],function(e){function t(){a.render({elem:"#scmManaOutSC_tabPcb",url:n.baseUrl+"/scm/pcborder/outsourcingContract/list",toolbar:"#scmManaOutSC_toolbar",cellMinWidth:80,id:"scmManaOutSC_tabPcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"聚谷型号",width:135,sort:!0},{field:"supplierNo",title:"供应商编号",width:124,sort:!0},{field:"status",title:"状态",templet:"#og_status",minWidth:104,sort:!0},{field:"gmtCreate",title:"创建时间",width:166,sort:!0},{field:"pcbName",title:"聚谷物料号",width:144,sort:!0},{field:"quantityPcs",title:"订单数量(PCS)",width:134,sort:!0},{field:"unitPrice",title:"单价",width:96,sort:!0},{field:"engineeringFee",title:"工程费",width:96,sort:!0},{field:"testCostFee",title:"飞针费",width:96,sort:!0},{field:"testCostFee",title:"测试架费",width:96,sort:!0},{field:"toolingFee",title:"模具",width:96,sort:!0},{field:"totalFee",title:"合计",width:96,sort:!0},{field:"remark",title:"订单备注",width:168,sort:!0},{field:"supplierContractNo",title:"合同编号",minWidth:171,sort:!0},{field:"factoryMake",title:"供应商厂编",minWidth:190,sort:!0},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"unitPriceCustomer",title:"unitPriceCustomer",hide:!0},{field:"engineeringFeeCustomer",title:"engineeringFeeCustomer",hide:!0},{field:"testCostFeeCustomer",title:"testCostFeeCustomer",hide:!0},{field:"toolingFeeCustomer",title:"toolingFeeCustomer",hide:!0},{field:"subtotal",title:"subtotal",hide:!0},{fixed:"right",title:"操作",toolbar:"#scmManaOutsource_tabbar",width:160}]],done:function(e,t,i){var a=e.data;p=a}})}function i(){a.render({elem:"#scmManaOutSC_tabStencil",url:n.baseUrl+"scm/stencilorder/outsourcingContract/list",toolbar:"#scmManaOutSC_toolbarS",cellMinWidth:80,id:"scmManaOutSC_tabStencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"聚谷型号",width:135,sort:!0},{field:"supplierNo",title:"供应商编号",width:124,sort:!0},{field:"status",title:"状态",templet:"#og_statusS",minWidth:104,sort:!0},{field:"gmtCreate",title:"创建时间",width:166,sort:!0},{field:"pcbName",title:"聚谷物料号",width:144,sort:!0},{field:"quantityPcs",title:"订单数量(PCS)",width:134,sort:!0},{field:"unitPrice",title:"单价",width:96,sort:!0},{field:"engineeringFee",title:"工程费",width:96,sort:!0},{field:"testCostFee",title:"飞针费",width:96,sort:!0},{field:"testCostFee",title:"测试架费",width:96,sort:!0},{field:"toolingFee",title:"模具",width:96,sort:!0},{field:"subtotal",title:"合计",width:96,sort:!0},{field:"remark",title:"订单备注",width:168,sort:!0},{field:"supplierContractNo",title:"合同编号",minWidth:171,sort:!0},{field:"factoryMake",title:"供应商厂编",minWidth:190,sort:!0},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"unitPriceCustomer",title:"unitPriceCustomer",hide:!0},{field:"engineeringFeeCustomer",title:"engineeringFeeCustomer",hide:!0},{field:"testCostFeeCustomer",title:"testCostFeeCustomer",hide:!0},{field:"toolingFeeCustomer",title:"toolingFeeCustomer",hide:!0},{field:"subtotal",title:"subtotal",hide:!0},{fixed:"right",title:"操作",toolbar:"#scmManaOutsource_tabbarS",width:160}]],done:function(e,t,i){var a=e.data;stenciltabObj=a}})}var a=layui.table,o=layui.view,l=layui.admin,r=layui.form,n=layui.setter,s=(layui.formSelects,layui.laydate,layui.element),c=layui.jquery,d=layui.convertCurrency,u=layui.requestInterface;r.render(null,"scm-outgoing-contract-formlist");var f={orderType:0};t();var p;s.on("tab(scm-outsourcing-contract-tabs-brief)",function(e){f.orderType=e.index;var a=e.index;0===a?t():1===a&&i()}),r.on("submit(LAY-scm-outsourcing-contract-search)",function(e){var t,i=e.field,o=f.orderType;0===o?t="scmManaOutSC_tabPcb":1===o&&(t="scmManaOutSC_tabStencil"),a.reload(t,{where:i})}),a.on("toolbar(scmManaOutSC_tabPcb)",function(e){var t=a.checkStatus(e.config.id),i=t.data;if("evScmSubmit"===e.event){var i=t.data;console.log(i);var o=null,r=null;if(i.length<1)return layer.msg("至少选择一条数据！"),!1;for(var s=0;s<i.length;s++)r+=null==r?+i[s].id:","+i[s].id,null==o?o=i[s].supplierContractNo:o+=","+i[s].supplierContractNo;layer.confirm("确认回签 ["+o+"] ?",function(e){l.req({type:"post",data:{supplierContractNo:o},url:n.baseUrl+"scm/pcborder/signBackByOc",done:function(t){layer.alert("提交成功！！"),a.reload("scmManaOutSC_tabPcb"),layer.close(e)}})})}else if("confirmDate"==e.event){for(var d=new Array,s=0;s<i.length;s++)d.push({orderId:i[s].orderId,supplierContractNo:i[s].supplierContractNo});layer.confirm("是否确认交期？",function(){c.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},data:JSON.stringify(d),contentType:"application/json;charset=utf-8",url:n.baseUrl+"scm/pcborder/confirmDeliveryByOc",done:function(){layer.alert("已确认"),a.reload("scmManaOutSC_tabPcb")},fail:function(e){layer.msg("供应商加失败")}}),layer.closeAll()})}}),a.on("tool(scmManaOutSC_tabPcb)",function(e){var t=e.data,i=t.supplierContractNo;if("eevScmedit"==e.event)layer.msg("编辑操作"),l.popup({title:"PCB报价协同编辑",area:["65%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,t){r.val("scm-quote-detail-form-list",{optionMark:"save"}),c("#scm-quote-detail-form-submit").click()},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,i){o(this.id).render("scmManagement/iframeWindow/quote_detail_pcb",t).done(function(){r.render(null,"scm-quote-detail-form-list"),r.on("submit(LAY-scm-quote-detail-form-submit)",function(e){var t=e.field;if("pricing"===t.optionMark){var o=(parseFloat(t.engineeringFee)+parseFloat(t.overworkFee)+parseFloat(t.testCostFee)+parseFloat(t.toolingFee)+parseFloat(t.otherFee)+parseFloat(t.unitPrice*t.quantityPcs)).toFixed(2),s=(parseFloat(t.pcbaToolFee)+parseFloat(t.pcbaTestFee)+parseFloat(t.pcbaPartsFee)+parseFloat(t.pcbaProcessFee)).toFixed(2),c=(parseFloat(o)+parseFloat(s)).toFixed(2);return r.val("scm-quote-detail-form-list",{allFee:c,totalFee:o,pcbaSubtotalFee:s}),!1}"save"===t.optionMark&&(l.req({type:"post",data:t,url:n.baseUrl+"scm/pcborder/updateQuoteBeOt",done:function(e){layer.msg("修改成功"),a.reload("scmManaOutSC_tabPcb")},fail:function(e){layer.msg("修改失败")}}),layer.close(i))})})}});else if("search"==e.event){for(var s,f={data:{}},m=e.data,i=m.supplierContractNo,b=0,y=0,h=0;h<p.length;h++)if(i==p[h].supplierContractNo){b+=1;var g=p[h];f.data[b]=g,y+=p[h].totalFee}for(var h=0;h<f.data.length;h++){var C=f.data[h].subtotal;y+=C,console.log("totalFee:"+y),console.log("sd_len:"+b)}s=d.conversion(y),console.log("convertSubtotal:"+s),f.totalFee=y,f.convertSubtotal=s,f.supplierInfo=u.GetSupplierInfo(n.baseUrl+"sys/supplier/info/"+t.supplierId),console.log(f),l.popup({title:"外协合同",area:["100%","100%"],btn:["打印","关闭"],yes:function(){var e="outsContract";document.body.innerHTML=document.getElementById(e).innerHTML,window.print(),window.location.reload()},success:function(){o(this.id).render("scmManagement/iframeWindow/outs_contract",f).done(function(){})}})}else"signBack"==e.event&&layer.confirm("确定退回？",function(e){l.req({type:"post",data:{supplierContractNo:i},url:n.baseUrl+"scm/pcborder/rollbackOrderByOc",success:function(){layer.alert("退回成功！"),a.reload("scmManaOutSC_tabPcb")}}),layer.close(e)})}),a.on("toolbar(scmManaOutSC_tabStencil)",function(e){var t=a.checkStatus(e.config.id),i=t.data;if("evScmSubmit"===e.event){var i=t.data;console.log(i);var o=null,r=null;if(i.length<1)return layer.msg("至少选择一条数据！"),!1;for(var s=0;s<i.length;s++)r+=null==r?+i[s].id:","+i[s].id,null==o?o=i[s].supplierContractNo:o+=","+i[s].supplierContractNo;layer.confirm("确认回签 ["+o+"] ?",function(e){l.req({type:"post",data:{supplierContractNo:o},url:n.baseUrl+"scm/stencilorder/signBackByOc",success:function(t){"0"==t.code&&(layer.alert("提交成功！！"),a.reload("scmManaOutSC_tabStencil"),layer.close(e))}})})}else if("confirmDate"==e.event){for(var c=new Array,s=0;s<i.length;s++)c.push({orderId:i[s].orderId,supplierContractNo:i[s].supplierContractNo});layer.confirm("是否确认交期？",function(){l.req({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},data:JSON.stringify(c),contentType:"application/json;charset=utf-8",url:n.baseUrl+"scm/stencilorder/confirmDeliveryByOc",success:function(){layer.alert("已确认"),a.reload("scmManaOutSC_tabStencil")}}),layer.closeAll()})}}),a.on("tool(scmManaOutSC_tabStencil)",function(e){var t=e.data,i=t.supplierContractNo;if("eevScmedit"==e.event)layer.msg("编辑操作"),l.popup({title:"Stencil 钢网报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,i){layer.msg("提交信息");var o=new Object;o.id=t.id,o.orderId=t.orderId,o.supplierId=t.supplierId,o.supplierQuoteNo=t.supplierQuoteNo,o.deliveryTime=c("#stencilDeliveryDate").val(),o.unitPrice=c("#qt_stencil_unitPrice").val(),o.remark=c("#sRemark").val(),o.status="",o.factoryMake=c("#stencilfactoryMake").val(),o.totalFee=c("#qt_stencil_totalFee").text(),console.log(o),l.req({type:"post",data:o,url:n.baseUrl+"scm/stencilorder/updateQuoteBeOt",success:function(t){layer.alert("供应商报价修改成功"),a.reload("scmMana_tabStencil"),layer.close(e)}})},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,i){o(this.id).render("scmManagement/iframeWindow/quote_detail_stencil",t).done(function(){})}});else if("search"==e.event){for(var r,s={data:{}},f=e.data,i=f.supplierContractNo,p=0,m=0,b=0;b<stenciltabObj.length;b++)if(i==stenciltabObj[b].supplierContractNo){p+=1;var y=stenciltabObj[b];s.data[p]=y,m+=stenciltabObj[b].totalStencilFee}for(var b=0;b<s.data.length;b++){console.log("开始循环");var h=s.data[b].totalStencilFee;m+=h,console.log("subtotal:"+m),console.log("sd_len:"+p)}r=d.conversion(m),console.log("convertSubtotal:"+r),s.subtotal=m,s.convertSubtotal=r,s.supplierInfo=u.GetSupplierInfo(n.baseUrl+"sys/supplier/info/"+t.supplierId),l.popup({title:"外协合同",area:["100%","100%"],btn:["打印","关闭"],yes:function(){var e="outsContract";document.body.innerHTML=document.getElementById(e).innerHTML,window.print(),window.location.reload()},success:function(){o(this.id).render("scmManagement/iframeWindow/outs_contractS",s).done(function(){})}})}else"signBack"==e.event&&layer.confirm("确定退回？",function(e){l.req({type:"post",data:{supplierContractNo:i},url:n.baseUrl+"scm/stencilorder/rollbackOrderByOc",success:function(){layer.alert("退回成功！"),a.reload("scmManaOutSC_tabStencil")}}),layer.close(e)})}),e("scmMana_outContract",{})});