/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate"],function(t){function e(){table.render({elem:"#finManaOrderProfit_tabPcb",url:setter.baseUrl+"fms/reconciliation/orderProfit",toolbar:"#finManaOrderProfit_tb",cellMinWidth:80,id:"finManaOrderProfit_tabPcb",page:!0,parseData:function(t){return{code:0,data:t.page.list,count:t.page.totalCount}},cols:[[{field:"productNo",title:"内部型号",width:135,sort:!0},{field:"gmtCreate",title:"报价时间",width:166,sort:!0},{field:"invoiceNo",title:"合同编号",width:210,sort:!0},{field:"subtotal",title:"客户报价",width:124,sort:!0,templet:"<div>{{ (d.subtotal + d.pcbaSubtotalFee).toFixed(2) }}</div>"},{field:"testCost",title:"测试架",width:117,sort:!0,hide:!0},{field:"modelCost",title:"模具",width:117,sort:!0,hide:!0},{field:"materialCost",title:"物料费   ",width:117,sort:!0,hide:!0},{field:"totalFee",title:"供应商报价",width:450,sort:!0,templet:"<div>总计:{{ (d.totalFee+d.testCost+d.modelCost+d.modelCost).toFixed(2) }}（测试架or飞针费:{{ d.testCost }} 模具费:{{ d.modelCost }} 物料费:{{ d.materialCost }} pcba:{{ d.supplierPacaSubtotal }})</div>"},{field:"profits",title:"利润",width:144,templet:"<div>{{ (d.subtotal + d.pcbaSubtotalFee - d.totalFee - d.modelCost - d.testCost - d.materialCost).toFixed(2) }}</div>",sort:!0},{field:"profitsThan",title:"利润比",width:144,templet:"<div>{{ (((d.subtotal + d.pcbaSubtotalFee - d.totalFee - d.modelCost - d.testCost - d.materialCost)/(d.subtotal+d.pcbaSubtotalFee))*100).toFixed(2) }}%</div>",sort:!0}]],done:function(t,e,i){}})}function i(){table.render({elem:"#finManaOrderProfit_tabSmt",url:setter.baseUrl+"fms/reconciliation/orderProfitSml",toolbar:"#finManaOrderProfit_tb",cellMinWidth:80,id:"finManaOrderProfit_tabSmt",page:!0,parseData:function(t){return{code:0,data:t.page.list,count:t.page.totalCount}},cols:[[{field:"productNo",title:"内部型号",width:135,sort:!0},{field:"gmtCreate",title:"报价时间",width:166,sort:!0},{field:"invoiceNo",title:"合同编号",width:210,sort:!0},{field:"subtotal",title:"客户报价",width:124,sort:!0},{field:"totalFee",title:"供应商报价",width:117,sort:!0},{field:"profits",title:"利润",width:144,templet:"<div>{{ (d.subtotal - d.totalFee).toFixed(2) }}</div>",sort:!0},{field:"profitsThan",title:"利润比",width:144,templet:"<div>{{ (((d.subtotal - d.totalFee)/d.subtotal)*100).toFixed(2) }}%</div>",sort:!0}]],done:function(t,e,i){}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;layui.jquery;form.render(null,"fin-order-profits-formlist");var o={orderType:0};e(),element.on("tab(fin-order-profits-tabs-brief)",function(t){o.orderType=t.index,0===o.orderType?e():1===o.orderType?i():2===o.orderType&&console.log("贴片订单选项卡")}),form.on("submit(LAY-fin-order-profits-search)",function(t){var e,i=t.field;0===o.orderType?e="finManaOrderProfit_tabPcb":1===o.orderType&&(e="finManaOrderProfit_tabSmt"),table.reload(e,{where:i})}),t("finMana_order_profits",{})});