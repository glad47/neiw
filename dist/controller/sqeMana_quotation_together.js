/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate"],function(e){function t(){table.render({elem:"#quotatgt_tabPcb",url:setter.baseUrl+"sqe/pcborder/quotationTogether/list",toolbar:"#quo_tother_tb",cellMinWidth:80,id:"quotatgt_tabPcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"status",title:"状态",templet:"#sqlManaqt_status"},{field:"supplierQuoteNo",title:"报价单号",width:125},{field:"gmtCreate",title:"报价时间",width:166},{field:"supplierNo",title:"供应商编号",width:124},{field:"factoryMake",title:"供应商厂编",width:117},{field:"productNo",title:"聚谷型号",width:124},{field:"pcbName",title:"聚谷物料号",width:144},{field:"quantityPcs",title:"订单数量(PCS)",width:134},{field:"unitPrice",title:"单价",width:96},{field:"engineeringFee",title:"工程费",width:96},{field:"testCostFee",title:"飞针费",width:96},{field:"testCostFee",title:"测试架费",width:96},{field:"toolingFee",title:"模具",width:96},{field:"totalFee",title:"合计",width:96},{field:"remark",title:"订单备注",width:168},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"gerberName",title:"gerberName",hide:!0},{field:"gerberPath",title:"gerberPath",hide:!0},{field:"deliveryTime",title:"deliveryTime",hide:!0},{fixed:"right",title:"操作",toolbar:"#quotatgt_tabbar",width:130}]],done:function(e,t,i){a("a[data='isOk']").each(function(e,t){a(this).parents("tr").css("background-color","#daf7da")})}})}function i(){table.render({elem:"#quotatgt_tabStencil",url:setter.baseUrl+"sqe/stencilorder/sqeStencilOrderList",toolbar:"#quo_tother_tbS",cellMinWidth:80,id:"quotatgt_tabStencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"status",title:"状态",templet:"#pcb"},{field:"supplierQuoteNo",title:"报价单号",width:125},{field:"gmtCreate",title:"报价时间",width:166},{field:"supplierNo",title:"供应商编号",width:124},{field:"factoryMake",title:"供应商厂编",width:117},{field:"productNo",title:"聚谷型号",width:124},{field:"pcbName",title:"聚谷物料号",width:144},{field:"quantityPcs",title:"订单数量(PCS)",width:134},{field:"unitPrice",title:"单价",width:96},{field:"engineeringFee",title:"工程费",width:96},{field:"testCostFee",title:"飞针费",width:96},{field:"testCostFee",title:"测试架费",width:96},{field:"toolingFee",title:"模具",width:96},{field:"totalFee",title:"合计",width:96},{field:"remark",title:"订单备注",width:168},{field:"dimensionsX",title:"dimensionsX",hide:!0},{field:"dimensionsY",title:"dimensionsY",hide:!0},{field:"panelSizeX",title:"panelSizeX",hide:!0},{field:"panelSizeY",title:"panelSizeY",hide:!0},{field:"panelWayX",title:"panelWayX",hide:!0},{field:"panelWayY",title:"panelWayY",hide:!0},{field:"gerberName",title:"gerberName",hide:!0},{field:"gerberPath",title:"gerberPath",hide:!0},{fixed:"right",title:"操作",toolbar:"#quotatgt_tabbarS",width:130}]],done:function(e,t,i){a("a[data='isOk']").each(function(e,t){a(this).parents("tr").css("background-color","#daf7da")})}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var a=layui.jquery;t();var l={orderType:1};element.on("tab(tab-quotationToger)",function(e){console.log(e.index),0===e.index?(l.orderType=1,t()):1===e.index?(l.orderType=2,i()):2===e.index&&(l.orderType=3)}),table.on("toolbar(quotatgt_tabPcb)",function(e){var t=table.checkStatus(e.config.id);if("submitPcb"===e.event){for(var i=t.data,a=null,l=0;l<i.length;l++)null==a?a+=i[l].id:a=a+","+i[l].id;if(console.log(a),t.data.length<1)return layer.msg("请选择一条数据"),!1;layer.confirm("确认提交 ["+a+"] ?",function(e){admin.req({type:"post",data:{ids:a},url:setter.baseUrl+"sqe/pcborder/batch/submit",success:function(t){"0"==t.code&&(layer.alert("提交成功！！"),table.reload("quotatgt_tabPcb"),layer.close(e))}})})}}),table.on("tool(quotatgt_tabPcb)",function(e){var t=e.data;"edit"==e.event?(layer.msg("编辑操作"),admin.popup({title:"PCB报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,i){layer.msg("提交信息");var r=new Object;return r.id=t.id,r.orderId=t.orderId,r.orderType=l.orderType,r.supplierId=t.supplierId,r.supplierQuoteNo=t.supplierQuoteNo,r.boardFee=t.boardFee,r.testCostFee=a("#qt_pcb_testCostFee").val(),r.engineeringFee=a("#qt_pcb_engineeringFee").val(),r.toolingFee=a("#qt_pcb_toolingFee").val(),r.overworkFee=t.overworkFee,r.deliveryTime=a("#pcbDeliveryDate").val(),r.unitPrice=a("#qt_pcb_unitPrice").val(),r.remark=a("#qRemark").val(),r.status="",r.factoryMake=a("#pcbfactoryMake").val(),r.testPointType=a("#hiddenTestPoint").val(),r.totalFee=a("#qt_pcb_totalFee").text(),console.log(r),null==r.deliveryTime||""==r.deliveryTime?(layer.msg("交期不能为空！！！"),!1):void admin.req({type:"post",data:r,url:setter.baseUrl+"sqe/pcborder/quotationTogether/update",success:function(t){layer.alert("供应商报价修改成功"),table.reload("quotatgt_tabPcb"),layer.close(e)}})},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,i){view(this.id).render("sqeManagement/iframeWindow/quotation_together_pcb",t).done(function(){a(".layui-layer-btn1").attr("href",setter.baseUrl+"sys/oss/download/geber?access_token="+layui.data("layuiAdmin").access_token+"&fileName="+t.quoteGerberPath+"&filePathName="+t.quoteGerberName)})}})):"search"==e.event&&layer.msg("查看订单协同")}),table.on("tool(quotatgt_tabStencil)",function(e){var t=e.data;"edit"==e.event?(layer.msg("编辑操作"),admin.popup({title:"Stencil报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,i){layer.msg("提交信息");var r=new Object;return r.id=t.id,r.orderId=t.orderId,r.orderType=l.orderType,r.supplierId=t.supplierId,r.supplierQuoteNo=t.supplierQuoteNo,r.deliveryTime=a("#stencilDeliveryDate").val(),r.unitPrice=a("#qt_stencil_unitPrice").val(),r.remark=a("#sRemark").val(),r.status="",r.factoryMake=a("#stencilfactoryMake").val(),r.totalFee=a("#qt_stencil_totalFee").text(),console.log(r),null==r.deliveryTime||""==r.deliveryTime?(layer.msg("交期不能为空！！！"),!1):void admin.req({type:"post",data:r,url:setter.baseUrl+"sqe/stencilorder/quotationTogether/update",success:function(t){layer.alert("Stencil 供应商报价修改成功"),table.reload("quotatgt_tabStencil"),layer.close(e)}})},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,i){view(this.id).render("sqeManagement/iframeWindow/quotation_together_stencil",t).done(function(){a(".layui-layer-btn1").attr("href",setter.baseUrl+"sys/oss/download/geber?access_token="+layui.data("layuiAdmin").access_token+"&fileName="+t.quoteGerberPath+"&filePathName="+t.quoteGerberName)})}})):"search"==e.event&&layer.msg("查看订单协同")}),table.on("toolbar(quotatgt_tabStencil)",function(e){var t=table.checkStatus(e.config.id);if("submitPcb"===e.event){var i=t.data,a=i.map(function(e){return e.id}).join(",");if(t.data.length<1)return layer.msg("请选择一条数据"),!1;layer.confirm("确认提交 ["+a+"] ?",function(e){admin.req({type:"post",data:{ids:a},url:setter.baseUrl+"sqe/stencilorder/batch/submit",success:function(t){"0"==t.code&&(layer.alert("提交成功！！"),table.reload("quotatgt_tabStencil"),layer.close(e))}})})}}),e("sqeMana_quotation_together",{})});