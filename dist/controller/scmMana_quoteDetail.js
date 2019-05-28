/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","convertCurrency","requestInterface"],function(e){function t(){table.render({elem:"#scmMana_tabPcb",url:setter.baseUrl+"/scm/pcborder/quoteDetail/list",toolbar:"#scmMana_toolbar",cellMinWidth:80,id:"scmMana_tabPcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"内部型号",align:"center",width:114,fixed:"left"},{field:"status",title:"状态",templet:"#scmManaquo_status",width:115},{field:"supplierQuoteNo",title:"报价单号",width:172},{field:"gmtCreate",title:"报价时间",width:166},{field:"supplierNo",title:"供应商编号",width:124},{field:"factoryMake",title:"供应商厂编",width:117},{field:"pcbName",title:"聚谷物料号",width:144},{field:"quantityPcs",title:"订单数量(PCS)",width:134},{field:"unitPrice",title:"单价",width:96},{field:"engineeringFee",title:"工程费",width:96},{field:"testCostFee",title:"飞针费",width:96},{field:"testCostFee",title:"测试架费",width:96},{field:"toolingFee",title:"模具",width:96},{field:"totalFee",title:"合计",width:96},{field:"remark",title:"报价备注",width:168},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"existContractMark",title:"existContractMark",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"unitPriceCustomer",title:"unitPriceCustomer",hide:!0},{field:"engineeringFeeCustomer",title:"engineeringFeeCustomer",hide:!0},{field:"testCostFeeCustomer",title:"testCostFeeCustomer",hide:!0},{field:"toolingFeeCustomer",title:"toolingFeeCustomer",hide:!0},{field:"subtotal",title:"subtotal",hide:!0},{fixed:"right",title:"操作",toolbar:"#scmMana_tabbar",width:160}]],done:function(e,t,i){a("a[data='1']").each(function(){a(this).parents("tr").css("background-color","#c2c2c2"),a(this).parents("tr").find("input[type='checkbox']").prop("disabled",!0),form.render()})}})}function i(){table.render({elem:"#scmMana_tabStencil",url:setter.baseUrl+"scm/stencilorder/quoteDetail/list",toolbar:"#scmManaStencil_toolbar",cellMinWidth:80,id:"scmMana_tabStencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"内部型号",align:"center",width:114,fixed:"left"},{field:"status",title:"状态",templet:"#scmManaquo_status",width:115},{field:"supplierQuoteNo",title:"报价单号",width:172},{field:"gmtCreate",title:"报价时间",width:166},{field:"supplierNo",title:"供应商编号",width:124},{field:"factoryMake",title:"供应商厂编",width:117},{field:"pcbName",title:"聚谷物料号",width:144},{field:"quantity",title:"订单数量(PCS)",width:134},{field:"unitPrice",title:"单价",width:96},{field:"totalFee",title:"合计",width:96},{field:"remark",title:"报价备注",width:168},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"unitPriceCustomer",title:"unitPriceCustomer",hide:!0},{field:"engineeringFeeCustomer",title:"engineeringFeeCustomer",hide:!0},{field:"testCostFeeCustomer",title:"testCostFeeCustomer",hide:!0},{field:"toolingFeeCustomer",title:"toolingFeeCustomer",hide:!0},{field:"subtotal",title:"subtotal",hide:!0},{fixed:"right",title:"操作",toolbar:"#scmManaStencil_tabbar",width:160}]],done:function(e,t,i){a("a[data='1']").each(function(){a(this).parents("tr").css("background-color","#c2c2c2"),a(this).parents("tr").find("input[type='checkbox']").prop("disabled",!0),form.render()})}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var a=layui.jquery,l=layui.convertCurrency,r=layui.requestInterface,n={orderType:0};t(),element.on("tab(tab-scmManagement)",function(e){n.orderType=e.index,0===e.index?t():1===e.index?i():2===e.index}),table.on("toolbar(scmMana_tabPcb)",function(e){var t=table.checkStatus(e.config.id),i=t.data,n=0;if("evScmSubmit"===e.event){var o,s=new Array,d={data:{}};d.data=i;for(var c=0;c<i.length;c++){if(null==o)o=i[c].supplierNo;else if(null!=o&&i[c].supplierNo!=o)return layer.alert("请选择相同的供应商!"),console.log(111),!1;var u=i[c].totalFee;s.push({id:i[c].id,orderId:i[c].orderId,orderType:i[c].orderType,isInternal:i[c].isInternal,onlineOid:i[c].onlineOid}),n+=u}console.log("totalFee:"+n),convertSubtotal=l.conversion(n),d.totalFee=n,d.convertSubtotal=convertSubtotal,d.supplierInfo=r.GetSupplierInfo(setter.baseUrl+"sys/supplier/info/"+i[0].supplierId),console.log(d),admin.popup({title:"PCB合同",area:["100%","100%"],btn:["生成合同","取消"],yes:function(e,t){layer.confirm("是否生成合同?",function(e){a.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},data:JSON.stringify(s),contentType:"application/json;charset=utf-8",url:setter.baseUrl+"/scm/pcborder/createContractBeOt",success:function(e){"0"==e.code&&(layer.alert("提交成功！！"),table.reload("scmMana_tabPcb"),layer.closeAll())}})})},success:function(e,t){view(this.id).render("scmManagement/iframeWindow/outs_contract",d).done(function(){})}})}}),table.on("tool(scmMana_tabPcb)",function(e){var t=e.data;"eevScmedit"==e.event?(layer.msg("编辑操作"),admin.popup({title:"PCB报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,i){layer.msg("提交信息");var l=new Object;l.id=t.id,l.orderId=t.orderId,l.supplierId=t.supplierId,l.supplierQuoteNo=t.supplierQuoteNo,l.boardFee=t.boardFee,l.testCostFee=a("#qt_pcb_testCostFee").val(),l.engineeringFee=a("#qt_pcb_engineeringFee").val(),l.toolingFee=a("#qt_pcb_toolingFee").val(),l.overworkFee=t.overworkFee,l.deliveryTime=a("#pcbDeliveryDate").val(),l.unitPrice=a("#qt_pcb_unitPrice").val(),l.remark=a("#qRemark").val(),l.status="",l.factoryMake=a("#pcbfactoryMake").val(),l.testPointType=a("#hiddenTestPoint").val(),l.totalFee=a("#qt_pcb_totalFee").text(),admin.req({type:"post",data:l,url:setter.baseUrl+"scm/pcborder/updateQuoteBeOt",success:function(t){layer.alert("供应商报价修改成功"),table.reload("scmMana_tabPcb"),layer.close(e)}})},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,i){view(this.id).render("scmManagement/iframeWindow/quote_detail_pcb",t).done(function(){a(".layui-layer-btn1").prop("href",setter.baseUrl1+"quote/gerberFileDownload?filePathName="+t.gerberPath+"&fileName="+t.gerberName)})}})):"rollback"==e.event?(layer.msg("回退操作"),layer.confirm("确定退回订单["+t.productNo+"]?",function(i){e.del(),admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"/scm/pcborder/rollbackQuoteBeOt",success:function(){layer.alert("已退回["+t.productNo+"]"),table.reload("scmMana_tabPcb")}})})):"eevScmdel"==e.event&&layer.confirm("真的删除行么",function(i){e.del(),admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"/scm/ordersupplier/delete",success:function(){layer.alert("删除成功！"),table.reload("scmMana_tabPcb")}}),layer.close(i)})}),table.on("toolbar(scmMana_tabStencil)",function(e){var t=table.checkStatus(e.config.id),i=t.data,n=0;if("evScmSubmit"===e.event){var o,s={data:{}};s.data=i;for(var d=new Array,c=0;c<i.length;c++){if(null==o)o=i[c].supplierNo;else if(null!=o&&i[c].supplierNo!=o)return layer.alert("请选择相同的供应商!"),console.log(111),!1;var u=i[c].totalFee;n+=u,d.push({id:i[c].id,orderId:i[c].orderId,orderType:i[c].orderType,isInternal:i[c].isInternal,onlineOid:i[c].onlineOid})}console.log("totalFee:"+n),convertSubtotal=l.conversion(n),s.totalFee=n,s.convertSubtotal=convertSubtotal,s.supplierInfo=r.GetSupplierInfo(setter.baseUrl+"sys/supplier/info/"+i[0].supplierId),console.log(s.supplierInfo),admin.popup({title:"Stencil合同",area:["100%","100%"],btn:["生成合同","取消"],yes:function(e,t){layer.confirm("是否生成合同?",function(e){a.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},data:JSON.stringify(d),contentType:"application/json;charset=utf-8",url:setter.baseUrl+"scm/stencilorder/createContractBeOt",success:function(e){"0"==e.code&&(layer.alert("提交成功！！"),table.reload("scmMana_tabStencil"),layer.closeAll())}})})},success:function(e,t){view(this.id).render("scmManagement/iframeWindow/outs_contractS",s).done(function(){})}})}}),table.on("tool(scmMana_tabStencil)",function(e){var t=e.data;"eevScmedit"==e.event?(layer.msg("编辑操作"),admin.popup({title:"Stencil 钢网报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,i){layer.msg("提交信息");var l=new Object;l.id=t.id,l.orderId=t.orderId,l.supplierId=t.supplierId,l.supplierQuoteNo=t.supplierQuoteNo,l.deliveryTime=a("#stencilDeliveryDate").val(),l.unitPrice=a("#qt_stencil_unitPrice").val(),l.remark=a("#sRemark").val(),l.status="",l.factoryMake=a("#stencilfactoryMake").val(),l.totalFee=a("#qt_stencil_totalFee").text(),admin.req({type:"post",data:l,url:setter.baseUrl+"scm/stencilorder/updateQuoteBeOt",success:function(t){layer.alert("供应商报价修改成功"),table.reload("scmMana_tabStencil"),layer.close(e)}})},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,i){view(this.id).render("scmManagement/iframeWindow/quote_detail_stencil",t).done(function(){a(".layui-layer-btn1").prop("href",setter.baseUrl1+"quote/gerberFileDownload?filePathName="+t.gerberPath+"&fileName="+t.gerberName)})}})):"rollback"==e.event?(layer.msg("回退操作"),layer.confirm("确定退回订单sss["+t.productNo+"]?",function(i){e.del(),admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"scm/stencilorder/rollbackQuoteBeOt",success:function(){layer.alert("已退回["+t.productNo+"]"),table.reload("scmMana_tabPcb")}})})):"eevScmdel"==e.event&&layer.confirm("真的删除行么",function(i){e.del(),admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"/scm/ordersupplier/delete",success:function(){layer.alert("删除成功！"),table.reload("scmMana_tabPcb")}}),layer.close(i)})}),form.on("submit(quote_detail_serch)",function(e){var t,i=e.field;0===n.orderType?t="scmMana_tabPcb":1===n.orderType&&(t="scmMana_tabStencil"),table.reload(t,{where:i})}),a(".quote-detail-search input").bind("input propertychange",function(e){a("*[lay-filter='quote_detail_serch']").click()}),e("scmMana_quoteDetail",{})});