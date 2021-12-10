/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","convertCurrency","requestInterface"],function(e){function t(){table.render({elem:"#scmMana_tabPcb",url:setter.baseUrl+"/scm/pcborder/quoteDetail/list",toolbar:"#scmMana_toolbar",cellMinWidth:80,id:"scmMana_tabPcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"内部型号",align:"center",width:135,fixed:"left",sort:!0},{field:"supplierNo",title:"供应商编号",width:124,sort:!0},{field:"factoryMake",title:"供应商厂编",width:117,sort:!0},{field:"quantityPcs",title:"订单数量(PCS)",width:134,sort:!0},{field:"unitPrice",title:"单价",width:96,sort:!0},{field:"engineeringFee",title:"工程费",width:96,sort:!0},{field:"testCostFee",title:"飞针费",width:96,sort:!0},{field:"testCostFee",title:"测试架费",width:96,sort:!0},{field:"toolingFee",title:"模具",width:96,sort:!0},{field:"totalFee",title:"合计",width:96,sort:!0},{field:"supplierQuoteNo",title:"报价单号",width:172,sort:!0},{field:"pcbName",title:"聚谷物料号",width:144,sort:!0},{field:"gmtCreate",title:"报价时间",width:166,sort:!0},{field:"remark",title:"报价备注",width:168,sort:!0},{field:"status",title:"状态",templet:"#scmManaquo_status",width:115,hide:!0},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"existContractMark",title:"existContractMark",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"unitPriceCustomer",title:"unitPriceCustomer",hide:!0},{field:"engineeringFeeCustomer",title:"engineeringFeeCustomer",hide:!0},{field:"testCostFeeCustomer",title:"testCostFeeCustomer",hide:!0},{field:"toolingFeeCustomer",title:"toolingFeeCustomer",hide:!0},{field:"subtotal",title:"subtotal",hide:!0},{fixed:"right",title:"操作",toolbar:"#scmMana_tabbar",width:160}]],done:function(e,t,a){i("a[data='1']").each(function(){i(this).parents("tr").css("background-color","#c2c2c2"),i(this).parents("tr").find("input[type='checkbox']").prop("disabled",!0),form.render()})}})}function a(){table.render({elem:"#scmMana_tabStencil",url:setter.baseUrl+"scm/stencilorder/quoteDetail/list",toolbar:"#scmManaStencil_toolbar",cellMinWidth:80,id:"scmMana_tabStencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"内部型号",align:"center",width:135,fixed:"left",sort:!0},{field:"supplierNo",title:"供应商编号",width:124,sort:!0},{field:"factoryMake",title:"供应商厂编",width:117,sort:!0},{field:"quantity",title:"订单数量(PCS)",width:134,sort:!0},{field:"unitPrice",title:"单价",width:96,sort:!0},{field:"totalFee",title:"合计",width:96,sort:!0},{field:"remark",title:"报价备注",width:168,sort:!0},{field:"pcbName",title:"聚谷物料号",width:144,sort:!0},{field:"supplierQuoteNo",title:"报价单号",width:172,sort:!0},{field:"gmtCreate",title:"报价时间",width:166,sort:!0},{field:"status",title:"状态",templet:"#scmManaquo_status",width:115,hide:!0},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"unitPriceCustomer",title:"unitPriceCustomer",hide:!0},{field:"engineeringFeeCustomer",title:"engineeringFeeCustomer",hide:!0},{field:"testCostFeeCustomer",title:"testCostFeeCustomer",hide:!0},{field:"toolingFeeCustomer",title:"toolingFeeCustomer",hide:!0},{field:"subtotal",title:"subtotal",hide:!0},{fixed:"right",title:"操作",toolbar:"#scmManaStencil_tabbar",width:160}]],done:function(e,t,a){i("a[data='1']").each(function(){i(this).parents("tr").css("background-color","#c2c2c2"),i(this).parents("tr").find("input[type='checkbox']").prop("disabled",!0),form.render()})}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var i=layui.jquery,l=layui.convertCurrency,r=layui.requestInterface;form.render(null,"scm-quote-detail-formlist");var o={orderType:0};t(),element.on("tab(scm-quote-detail-tabs-brief)",function(e){o.orderType=e.index;var i=e.index;0===i?t():1===i&&a()}),form.on("submit(LAY-scm-quote-detail-serch)",function(e){var t,a=e.field,i=o.orderType;0===i?t="scmMana_tabPcb":1===i&&(t="scmMana_tabStencil"),table.reload(t,{where:a})}),table.on("toolbar(scmMana_tabPcb)",function(e){var t=table.checkStatus(e.config.id),a=t.data,o=0;if("evScmSubmit"===e.event){var n,s=new Array,c={data:{}};c.data=a;for(var d=0;d<a.length;d++){if(null==n)n=a[d].supplierNo;else if(null!=n&&a[d].supplierNo!=n)return layer.alert("请选择相同的供应商!"),console.log(111),!1;var u=a[d].totalFee;s.push({id:a[d].id,orderId:a[d].orderId,orderType:a[d].orderType,isInternal:a[d].isInternal,onlineOid:a[d].onlineOid}),o+=u}console.log("totalFee:"+o),convertSubtotal=l.conversion(o),c.totalFee=o,c.convertSubtotal=convertSubtotal,c.supplierInfo=r.GetSupplierInfo(setter.baseUrl+"sys/supplier/info/"+a[0].supplierId),console.log(c),admin.popup({title:"PCB合同",area:["100%","100%"],btn:["生成合同","取消"],yes:function(e,t){layer.confirm("是否生成合同?",function(e){i.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},data:JSON.stringify(s),contentType:"application/json;charset=utf-8",url:setter.baseUrl+"/scm/pcborder/createContractBeOt",success:function(e){"0"==e.code&&(layer.alert("提交成功！！"),table.reload("scmMana_tabPcb"),layer.closeAll())}})})},success:function(e,t){view(this.id).render("scmManagement/iframeWindow/outs_contract",c).done(function(){})}})}else if("directlySubmit"===e.event){var n,p=a.length,s=new Array;if(p<1)layer.msg("请至少选择一条数据");else{for(var d=0;d<p;d++){if(null==n)n=a[d].supplierNo;else if(null!=n&&a[d].supplierNo!=n)return layer.alert("请选择相同的供应商!"),console.log(111),!1;var u=a[d].totalFee;s.push({id:a[d].id,orderId:a[d].orderId,orderType:a[d].orderType,isInternal:a[d].isInternal,onlineOid:a[d].onlineOid})}layer.confirm("确定要直接提交？",function(){i.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},data:JSON.stringify(s),contentType:"application/json;charset=utf-8",url:setter.baseUrl+"/scm/pcborder/createContractBeOt",success:function(e){"0"==e.code&&(layer.alert("提交成功！！"),table.reload("scmMana_tabPcb"),layer.closeAll())}})})}}}),table.on("tool(scmMana_tabPcb)",function(e){var t=e.data;console.log(t),"eevScmedit"==e.event?admin.popup({title:"PCB报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,t){layer.msg("提交信息"),form.val("scm-quote-detail-form-list",{optionMark:"save"}),i("#scm-quote-detail-form-submit").click()},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,a){view(this.id).render("scmManagement/iframeWindow/quote_detail_pcb",t).done(function(){i(".layui-layer-btn1").prop("href",setter.baseUrl1+"v1/quote/gerberFileDownload?filePathName="+t.gerberPath+"&fileName="+t.gerberName),form.render(null,"scm-quote-detail-form-list"),form.on("submit(LAY-scm-quote-detail-form-submit)",function(e){var t=e.field;if("pricing"===t.optionMark){var i=(parseFloat(t.engineeringFee)+parseFloat(t.overworkFee)+parseFloat(t.testCostFee)+parseFloat(t.toolingFee)+parseFloat(t.otherFee)+parseFloat(t.unitPrice*t.quantityPcs)).toFixed(2),l=(parseFloat(t.pcbaToolFee)+parseFloat(t.pcbaTestFee)+parseFloat(t.pcbaPartsFee)+parseFloat(t.pcbaProcessFee)).toFixed(2),r=(parseFloat(i)+parseFloat(l)).toFixed(2);return form.val("scm-quote-detail-form-list",{allFee:r,totalFee:i,pcbaSubtotalFee:l}),!1}"save"===t.optionMark&&(admin.req({type:"post",data:t,url:setter.baseUrl+"scm/pcborder/updateQuoteBeOt",done:function(e){layer.msg("供应商报价修改成功"),table.reload("scmMana_tabPcb")},fail:function(e){layer.msg("供应商报价修改失败")}}),layer.close(a))})})}}):"rollback"==e.event?(layer.msg("回退操作"),layer.confirm("确定退回订单["+t.productNo+"]?",function(a){e.del(),admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"/scm/pcborder/rollbackQuoteBeOt",success:function(){layer.alert("已退回["+t.productNo+"]"),table.reload("scmMana_tabPcb")}})})):"eevScmdel"==e.event&&layer.confirm("真的删除行么",function(a){e.del(),admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"/scm/ordersupplier/delete",success:function(){layer.alert("删除成功！"),table.reload("scmMana_tabPcb")}}),layer.close(a)})}),table.on("toolbar(scmMana_tabStencil)",function(e){var t=table.checkStatus(e.config.id),a=t.data,o=0;if("evScmSubmit"===e.event){var n,s={data:{}};s.data=a;for(var c=new Array,d=0;d<a.length;d++){if(null==n)n=a[d].supplierNo;else if(null!=n&&a[d].supplierNo!=n)return layer.alert("请选择相同的供应商!"),console.log(111),!1;var u=a[d].totalFee;o+=u,c.push({id:a[d].id,orderId:a[d].orderId,orderType:a[d].orderType,isInternal:a[d].isInternal,onlineOid:a[d].onlineOid})}console.log("totalFee:"+o),convertSubtotal=l.conversion(o),s.totalFee=o,s.convertSubtotal=convertSubtotal,s.supplierInfo=r.GetSupplierInfo(setter.baseUrl+"sys/supplier/info/"+a[0].supplierId),console.log(s.supplierInfo),admin.popup({title:"Stencil合同",area:["100%","100%"],btn:["生成合同","取消"],yes:function(e,t){layer.confirm("是否生成合同?",function(e){i.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},data:JSON.stringify(c),contentType:"application/json;charset=utf-8",url:setter.baseUrl+"scm/stencilorder/createContractBeOt",success:function(e){"0"==e.code&&(layer.alert("提交成功！！"),table.reload("scmMana_tabStencil"),layer.closeAll())}})})},success:function(e,t){view(this.id).render("scmManagement/iframeWindow/outs_contractS",s).done(function(){})}})}else if("directlySubmit"===e.event){var n,p=a.length,c=new Array;if(p<1)layer.msg("请至少选择一条数据");else{for(var d=0;d<p;d++){if(null==n)n=a[d].supplierNo;else if(null!=n&&a[d].supplierNo!=n)return layer.alert("请选择相同的供应商!"),console.log(111),!1;var u=a[d].totalFee;c.push({id:a[d].id,orderId:a[d].orderId,orderType:a[d].orderType,isInternal:a[d].isInternal,onlineOid:a[d].onlineOid})}layer.confirm("确定要直接提交？",function(){i.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},data:JSON.stringify(c),contentType:"application/json;charset=utf-8",url:setter.baseUrl+"/scm/stencilorder/createContractBeOt",success:function(e){"0"==e.code&&(layer.alert("提交成功！！"),table.reload("scmMana_tabStencil"),layer.closeAll())}})})}}}),table.on("tool(scmMana_tabStencil)",function(e){var t=e.data;"eevScmedit"==e.event?(layer.msg("编辑操作"),admin.popup({title:"Stencil 钢网报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,a){layer.msg("提交信息");var l=new Object;l.id=t.id,l.orderId=t.orderId,l.supplierId=t.supplierId,l.supplierQuoteNo=t.supplierQuoteNo,l.deliveryTime=i("#stencilDeliveryDate").val(),l.unitPrice=i("#qt_stencil_unitPrice").val(),l.remark=i("#sRemark").val(),l.status="",l.factoryMake=i("#stencilfactoryMake").val(),l.totalFee=i("#qt_stencil_totalFee").text(),admin.req({type:"post",data:l,url:setter.baseUrl+"scm/stencilorder/updateQuoteBeOt",success:function(t){layer.alert("供应商报价修改成功"),table.reload("scmMana_tabStencil"),layer.close(e)}})},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,a){view(this.id).render("scmManagement/iframeWindow/quote_detail_stencil",t).done(function(){i(".layui-layer-btn1").prop("href",setter.baseUrl1+"v1/quote/gerberFileDownload?filePathName="+t.gerberPath+"&fileName="+t.gerberName)})}})):"rollback"==e.event?(layer.msg("回退操作"),layer.confirm("确定退回订单sss["+t.productNo+"]?",function(a){e.del(),admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"scm/stencilorder/rollbackQuoteBeOt",success:function(){layer.alert("已退回["+t.productNo+"]"),table.reload("scmMana_tabPcb")}})})):"eevScmdel"==e.event&&layer.confirm("真的删除行么",function(a){e.del(),admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"/scm/ordersupplier/delete",success:function(){layer.alert("删除成功！"),table.reload("scmMana_tabPcb")}}),layer.close(a)})}),e("scmMana_quoteDetail",{})});