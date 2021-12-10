/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate","convertCurrency"],function(e){function t(){table.render({elem:"#sqeMana_reconPcbTab",url:setter.baseUrl+"sqe/pcborder/reconciliation/list",toolbar:"#sqeMana_reconPcbTb",cellMinWidth:80,id:"sqeMana_reconPcbTab",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"orderTime",title:"下单时间",width:165,sort:!0},{field:"productNo",title:"内部型号",width:135,sort:!0},{field:"totalFee",title:"采购金额",width:115,sort:!0},{field:"contractTime",title:"采购时间",width:165,sort:!0},{field:"deliveryOrderNo",title:"送货单编号",width:120,sort:!0},{field:"supplierNO",title:"供应商编号",width:120,sort:!0},{field:"supplierNickname",title:"供应商昵称",width:124,sort:!0},{field:"payTime",title:"付款时间",width:165,sort:!0},{field:"payUserName",title:"付款人",width:134,sort:!0},{field:"payStatus",title:"付款状态",width:115,sort:!0,templet:'<div>{{ d.payStatus == 9 ? "已支付" : "未支付" }}</div>'}]],done:function(e,t,a){}})}function a(){table.render({elem:"#sqeMana_reconStencilTab",url:setter.baseUrl+"sqe/stencilorder/reconciliation/list",toolbar:"#sqeMana_reconStencilTb",cellMinWidth:80,id:"sqeMana_reconStencilTab",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"orderTime",title:"下单时间",width:165,sort:!0},{field:"productNo",title:"内部型号",width:135,sort:!0},{field:"totalFee",title:"采购金额",width:115,sort:!0},{field:"contractTime",title:"采购时间",width:165,sort:!0},{field:"deliveryOrderNo",title:"送货单编号",width:120,sort:!0},{field:"supplierNO",title:"供应商编号",width:120,sort:!0},{field:"supplierNickname",title:"供应商昵称",width:124,sort:!0},{field:"payTime",title:"付款时间",width:165,sort:!0},{field:"payUserName",title:"付款人",width:134,sort:!0},{field:"payStatus",title:"付款状态",width:115,sort:!0,templet:'<div>{{ d.payStatus == 9 ? "已支付" : "未支付" }}</div>'}]],done:function(e,t,a){}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,laydate=layui.laydate,element=layui.element;var r=layui.jquery;layui.convertCurrency;t();var i={orderType:1};element.on("tab(tab-quotationToger)",function(e){console.log(e.index),0===e.index?(i.orderType=1,t()):1===e.index?(i.orderType=2,a()):2===e.index&&(i.orderType=3)}),laydate.render({elem:"#todzDate",range:"~"}),laydate.render({elem:"#todzDate2",range:"~"}),form.on("submit(LAY-reconciliation-back-search)",function(e){var t=e.field;console.log(t),1===i.orderType?table.reload("sqeMana_reconPcbTab",{where:t}):2===i.orderType?table.reload("sqeMana_reconStencilTab",{where:t}):3===i.orderType}),table.on("toolbar(sqeMana_reconPcbTab)",function(e){var t=table.checkStatus(e.config.id);if(t.data.length<1)layer.msg("请选择一条数据！");else if("submitPcb"===e.event){var a=t.data;layer.confirm("确认付款?",function(e){admin.req({type:"post",data:JSON.stringify(a),contentType:"application/json;charset=utf-8",url:setter.baseUrl+"sqe/pcborder/markSupplierOrderToPay",success:function(t){"0"==t.code?(layer.alert("提交成功！！"),table.reload("sqeMana_reconPcbTab"),layer.close(e)):layer.alert(t.msg)}})})}}),table.on("tool(sqeMana_reconPcbTab)",function(e){var t=e.data;"edit"==e.event?(layer.msg("编辑操作"),admin.popup({title:"PCB报价协同编辑",area:["50%","80%"],btn:["保存","下载客户资料","取消"],yes:function(e,a){layer.msg("提交信息");var o=new Object;return o.id=t.id,o.orderId=t.orderId,o.orderType=i.orderType,o.supplierId=t.supplierId,o.supplierQuoteNo=t.supplierQuoteNo,o.boardFee=t.boardFee,o.testCostFee=r("#qt_pcb_testCostFee").val(),o.engineeringFee=r("#qt_pcb_engineeringFee").val(),o.toolingFee=r("#qt_pcb_toolingFee").val(),o.overworkFee=t.overworkFee,o.deliveryTime=r("#pcbDeliveryDate").val(),o.unitPrice=r("#qt_pcb_unitPrice").val(),o.remark=r("#qRemark").val(),o.status="",o.factoryMake=r("#pcbfactoryMake").val(),o.testPointType=r("#hiddenTestPoint").val(),o.totalFee=r("#qt_pcb_totalFee").text(),console.log(o),null==o.deliveryTime||""==o.deliveryTime?(layer.msg("交期不能为空！！！"),!1):void admin.req({type:"post",data:o,url:setter.baseUrl+"sqe/pcborder/quotationTogether/update",success:function(t){layer.alert("供应商报价修改成功"),table.reload("sqeMana_reconPcbTab"),layer.close(e)}})},btn2:function(e,t){return layer.msg("下载资料"),!1},success:function(e,a){view(this.id).render("sqeManagement/iframeWindow/quotation_together_pcb",t).done(function(){r(".layui-layer-btn1").attr("href",setter.baseUrl+"sys/oss/download/geber?access_token="+layui.data("layuiAdmin").access_token+"&fileName="+t.quoteGerberPath+"&filePathName="+t.quoteGerberName)})}})):"search"==e.event&&layer.msg("查看订单协同")}),table.on("toolbar(sqeMana_reconStencilTab)",function(e){var t=table.checkStatus(e.config.id);if("submitStencil"===e.event){var a=t.data;layer.confirm("确认付款?",function(e){admin.req({type:"post",data:JSON.stringify(a),contentType:"application/json;charset=utf-8",url:setter.baseUrl+"sqe/pcborder/markSupplierOrderToPay",success:function(t){"0"==t.code?(layer.alert(t.msg),table.reload("sqeMana_reconStencilTab"),layer.close(e)):layer.alert(t.msg)}})})}}),e("sqeMana_reconciliation",{})});