/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["table","form","r"],function(e){var t=(layui.$,layui.admin,layui.view,layui.table),i=layui.setter,o=layui.form,n=layui.r,a={};o.render(null,"market-invoice-list-search-form"),o.on("submit(market-invoice-list-search)",function(e){var i=e.field;t.reload("LAY-market-invoice-list-table",{where:i})}),t.render({elem:"#LAY-market-invoice-list-table",url:i.baseUrl+"epc/orderinvoice/list",toolbar:"#invoiceList_TopBar",cellMinWidth:80,id:"LAY-market-invoice-list-table",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNos",fixed:"left",title:"聚谷型号",align:"center",width:154,sort:!0},{field:"invoiceNo",title:"发票号",width:150},{field:"businessName",title:"跟单员"},{field:"totalFee",title:"发票金额"},{field:"gmtCreate",title:"创建时间",width:130},{field:"businessId",title:"跟单员id",hide:!0},{field:"consumerId",title:"客户id",hide:!0},{title:"操作",width:190,align:"center",fixed:"right",toolbar:"#invoiceList_Bar"}]]}),t.on("toolbar(LAY-market-invoice-list-table)",function(e){"generateInvoice"===e.event&&a.add()}),t.on("tool(LAY-market-invoice-list-table)",function(e){var t=e.data;"il-edit"===e.event?a.edit(t):"il-del"===e.event?a.del(t):"il-search"===e.event&&a.show(t)}),a.show=function(e){n.get("epc/custominvoice/queryCustomInvoiceById",{invoiceId:e.id},!1).then(function(t){return e.data=t,n.get("sys/consumer/user/info/"+e.consumerId)}).then(function(t){return e.userName=t.userName,e.companyName=t.companName,e.country=t.country,e.city=t.city,e.address=t.address,e.mobilePhone=t.mobilePhone,e.postcode=t.postcode,e.paymentType=t.paymentType,e.deliveryType=t.deliveryType,e.contact=t.contact,e.fiscalCode=t.fiscalCode,n.print("发票合同",["100%","100%"],["打印","关闭"],"marketManagement/iframeWindow/quote_contractInvo",e,"quoteContract_AllB")})},a.del=function(e){layer.confirm("确定删除吗？",function(i){n.get("epc/orderinvoice/delete",{ids:e.id}).then(function(){layer.msg("已删除"),t.reload("LAY-market-invoice-list-table"),layer.close(i)})})},a.edit=function(e){var i;n.get("epc/custominvoice/queryCustomInvoiceById",{invoiceId:e.id},!1).then(function(t){return e.customInvoiceList=t,n.popup("编辑发票",["100%","100%"],["更新","取消"],"/marketManagement/iframeWindow/market_invoicelList_add_edit_form",e,"market-invoiceList-add-edit-submit","LAY-market-custom-invoice-list-table",1)}).then(function(e){var t=e.formData.field;return i=e.index,t.customInvoiceEntityList=e.tableData,t.productNos=e.tableData.map(function(e){return e.productNo}).join(","),n.post("epc/orderinvoice/update",t)}).then(function(e){layer.msg("修改成功！！！"),t.reload("LAY-market-invoice-list-table"),layer.close(i)})},a.add=function(){var e;n.popup("添加发票",["100%","100%"],["保存","取消"],"/marketManagement/iframeWindow/market_invoicelList_add_edit_form",null,"market-invoiceList-add-edit-submit","LAY-market-custom-invoice-list-table",1).then(function(t){console.log(t);var i=t.formData.field;return e=t.index,i.customInvoiceEntityList=t.tableData,i.productNos=t.tableData.map(function(e){return e.productNo}).join(","),console.log(i),n.post("epc/orderinvoice/addOrderInvoice",i)}).then(function(i){layer.msg("添加成功！！！"),t.reload("LAY-market-invoice-list-table"),layer.close(e)})},e("market_invoiceList",{})});