/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate","convertCurrency"],function(e){function t(){table.render({elem:"#sqeMana_reconPcbTab",url:setter.baseUrl+"sqe/pcborder/reconciliation/list",toolbar:"#sqeMana_reconPcbTb",cellMinWidth:80,id:"sqeMana_reconPcbTab",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"status",title:"状态",templet:"#pcb"},{field:"supplierQuoteNo",title:"报价单号",width:125},{field:"gmtCreate",title:"报价时间",width:166},{field:"supplierNo",title:"供应商编号",width:124},{field:"factoryMake",title:"供应商厂编",width:117},{field:"productNo",title:"聚谷型号",width:124},{field:"pcbName",title:"聚谷物料号",width:144},{field:"quantityPcs",title:"订单数量(PCS)",width:134},{field:"unitPrice",title:"单价",width:96},{field:"engineeringFee",title:"工程费",width:96},{field:"testCostFee",title:"飞针费",width:96},{field:"testCostFee",title:"测试架费",width:96},{field:"toolingFee",title:"模具",width:96},{field:"subtotal",title:"合计",width:96},{field:"remark",title:"订单备注",width:168},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"gerberName",title:"gerberName",hide:!0},{field:"gerberPath",title:"gerberPath",hide:!0},{fixed:"right",title:"操作",toolbar:"#sqeMana_reconPcbTabbar",width:130}]],done:function(e,t,i){}})}function i(){table.render({elem:"#sqeMana_reconStencilTab",url:setter.baseUrl+"sqe/stencilorder/reconciliation/list",toolbar:"#sqeMana_reconStencilTb",cellMinWidth:80,id:"sqeMana_reconStencilTab",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"status",title:"状态",templet:"#pcb"},{field:"supplierQuoteNo",title:"报价单号",width:125},{field:"gmtCreate",title:"报价时间",width:166},{field:"supplierNo",title:"供应商编号",width:124},{field:"factoryMake",title:"供应商厂编",width:117},{field:"productNo",title:"聚谷型号",width:124},{field:"pcbName",title:"聚谷物料号",width:144},{field:"quantityPcs",title:"订单数量(PCS)",width:134},{field:"unitPrice",title:"单价",width:96},{field:"engineeringFee",title:"工程费",width:96},{field:"testCostFee",title:"飞针费",width:96},{field:"testCostFee",title:"测试架费",width:96},{field:"toolingFee",title:"模具",width:96},{field:"subtotal",title:"合计",width:96},{field:"remark",title:"订单备注",width:168},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"gerberName",title:"gerberName",hide:!0},{field:"gerberPath",title:"gerberPath",hide:!0},{fixed:"right",title:"操作",toolbar:"#sqeMana_reconStencilTabbar",width:130}]],done:function(e,t,i){}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,laydate=layui.laydate,element=layui.element;var a=layui.jquery,l=layui.convertCurrency;t();var n={orderType:1};element.on("tab(tab-quotationToger)",function(e){console.log(e.index),0===e.index?(n.orderType=1,t()):1===e.index?(n.orderType=2,i()):2===e.index&&(n.orderType=3)}),laydate.render({elem:"#todzDate"}),laydate.render({elem:"#fromdzDate"}),form.on("submit(generateStatement)",function(e){var t=e.field,i=t.startTime.replace(/-/g,""),n=t.endTime.replace(/-/g,""),r="BJDH"+i+"-"+n;return admin.req({type:"post",data:t,url:setter.baseUrl+"sqe/pcborder/createReconciliation",success:function(e){var i={data:{}};if(i.data=e.data,null!=e.data&&e.data.length>0){var n=0;a.each(i.data,function(e,t){n+=t.totalFee}),i.subtotal=n,i.convertSubtotal=l.conversion(n),i.reconciliationNo=r,admin.popup({title:"对账协同",area:["100%","100%"],btn:["保存","打印","取消"],yes:function(){var e=i.data.map(function(e){return e.id}).join(","),t=i.data[0].supplierId,a={supplierId:t,reconciliationNo:r,orderSupplierIds:e};layer.confirm("确定保存信息？",function(){admin.req({type:"post",data:a,url:setter.baseUrl+"fms/reconciliation/save",success:function(e){if("500"!=e.code){layer.alert("对账协同保存成功");setTimeout(function(){table.reload("sqeMana_reconPcbTab"),layer.closeAll()},1500)}else layer.alert("服务器异常！")}})})},btn2:function(){layer.msg("打印");var e="statements_detail";window.location.reload(),document.body.innerHTML=document.getElementById(e).innerHTML,window.print()},btn3:function(){layer.msg("取消操作！"),layer.closeAll()},success:function(e,t){view(this.id).render("sqeManagement/iframeWindow/statements",i).done(function(){})}})}else layer.alert(t.startTime+"到"+t.endTime+"没有数据！")}}),!1}),table.on("toolbar(sqeMana_reconPcbTab)",function(e){var t=table.checkStatus(e.config.id);if(t.data.length<1)layer.msg("请选择一条数据！");else if("submitPcb"===e.event){for(var i=t.data,a=null,l=0;l<i.length;l++)null==a?a+=i[l].id:a=a+","+i[l].id;layer.confirm("确认提交 ["+a+"] ?",function(e){admin.req({type:"post",data:{ids:a},url:setter.baseUrl+"sqe/pcborder/batch/submit",success:function(t){"0"==t.code&&(layer.alert("提交成功！！"),table.reload("sqeMana_reconPcbTab"),layer.close(e))}})})}}),table.on("tool(sqeMana_reconPcbTab)",function(e){var t=e.data;"edit"==e.event?(layer.msg("编辑操作"),admin.popup({title:"PCB报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,i){layer.msg("提交信息");var l=new Object;return l.id=t.id,l.orderId=t.orderId,l.orderType=n.orderType,l.supplierId=t.supplierId,l.supplierQuoteNo=t.supplierQuoteNo,l.boardFee=t.boardFee,l.testCostFee=a("#qt_pcb_testCostFee").val(),l.engineeringFee=a("#qt_pcb_engineeringFee").val(),l.toolingFee=a("#qt_pcb_toolingFee").val(),l.overworkFee=t.overworkFee,l.deliveryTime=a("#pcbDeliveryDate").val(),l.unitPrice=a("#qt_pcb_unitPrice").val(),l.remark=a("#qRemark").val(),l.status="",l.factoryMake=a("#pcbfactoryMake").val(),l.testPointType=a("#hiddenTestPoint").val(),l.totalFee=a("#qt_pcb_totalFee").text(),console.log(l),null==l.deliveryTime||""==l.deliveryTime?(layer.msg("交期不能为空！！！"),!1):void admin.req({type:"post",data:l,url:setter.baseUrl+"sqe/pcborder/quotationTogether/update",success:function(t){layer.alert("供应商报价修改成功"),table.reload("sqeMana_reconPcbTab"),layer.close(e)}})},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,i){view(this.id).render("sqeManagement/iframeWindow/quotation_together_pcb",t).done(function(){a(".layui-layer-btn1").attr("href",setter.baseUrl+"sys/oss/download/geber?access_token="+layui.data("layuiAdmin").access_token+"&fileName="+t.quoteGerberPath+"&filePathName="+t.quoteGerberName)})}})):"search"==e.event&&layer.msg("查看订单协同")}),table.on("toolbar(sqeMana_reconStencilTab)",function(e){var t=table.checkStatus(e.config.id);if("submitStencil"===e.event){for(var i=t.data,a=null,l=0;l<i.length;l++)null==a?a+=i[l].id:a=a+","+i[l].id;layer.confirm("确认提交 ["+a+"] ?",function(e){admin.req({type:"post",data:{ids:a},url:setter.baseUrl+"sqe/stencilorder/createReconciliation",success:function(t){"0"==t.code&&(layer.alert("提交成功！！"),table.reload("sqeMana_reconStencilTab"),layer.close(e))}})})}}),e("sqeMana_reconciliation",{})});