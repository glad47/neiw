/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate","tools_printLable"],function(t){function e(){table.render({elem:"#proMana_outBoundOD",url:setter.baseUrl+"iqc/pcborder/outboundOrderDetails",toolbar:"#proMana_outBoundOD_to",cellMinWidth:80,id:"proMana_outBoundOD_tb",page:!0,parseData:function(t){return{code:0,data:t.page.list,count:t.page.totalCount}},where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"聚谷型号",minWidth:141,fixed:"left",sort:!0},{field:"status",title:"状态",width:110,templet:"#proManaquo_status",sort:!0},{field:"gmtModified",title:"出货时间",width:110,templet:"<a>{{d.gmtModified.substring(0,11)}}</a>",sort:!0},{field:"invoiceNo",title:"合同号",minWidth:165,sort:!0},{field:"deliveryDate",title:"交期",templet:"#outboundDDatePCB",sort:!0},{field:"quantityPcs",title:"订单PCS数",sort:!0},{field:"finishPcsNumber",title:"已交PCS数",templet:"<div>{{ d.finishPcsNumber || 0 }}</div>",sort:!0},{field:"courierName",title:"快递公司",sort:!0},{field:"courierNumber",title:"快递单号",sort:!0},{field:"pcbName",title:"客户型号",width:132,sort:!0},{fixed:"right",title:"操作",toolbar:"#proMana_outBoundOD_tbar",width:280}]],done:function(t,e,o){i("a[data='isOk']").each(function(t,e){i(this).css({color:"#00CC66","font-weight":"500"}),console.log(t)})}})}function o(){table.render({elem:"#proMana_outBoundODS",url:setter.baseUrl+"iqc/stencilorder/outboundOrderDetails",toolbar:"#proMana_outBoundOD_to",cellMinWidth:80,id:"proMana_outBoundODS",page:!0,parseData:function(t){return{code:0,data:t.page.list,count:t.page.totalCount}},where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"聚谷型号",minWidth:141,fixed:"left",sort:!0},{field:"status",title:"状态",width:110,templet:"#proManaquo_status",sort:!0},{field:"gmtModified",title:"出货时间",width:110,templet:"<a>{{d.gmtModified.substring(0,11)}}</a>",sort:!0},{field:"invoiceNo",title:"合同号",minWidth:165,sort:!0},{field:"deliveryDate",title:"交期",templet:"#outboundDDateStencil",sort:!0},{field:"quantity",title:"订单PCS数",sort:!0},{field:"finishNumber",title:"已交PCS数",templet:"<div>{{ d.finishNumber || 0 }}</div>",sort:!0},{field:"courierName",title:"快递公司",sort:!0},{field:"courierNumber",title:"快递单号",sort:!0},{field:"pcbName",title:"客户型号",width:132,sort:!0},{fixed:"right",title:"操作",toolbar:"#proManaNgveiw_tabbar",width:230}]],done:function(t,e,o){i("a[data='isOk']").each(function(t,e){i(this).css({color:"#00CC66","font-weight":"500"})})}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,tools_printLable=layui.tools_printLable,element=layui.element;var i=layui.jquery;e();var a={orderType:1};element.on("tab(tab-otOrderDetail)",function(t){0===t.index?(e(),a.orderType=1):1===t.index?(o(),a.orderType=2):2===t.index&&(a.orderType=3)}),table.on("toolbar(proMana_outBoundOD)",function(t){var e=table.checkStatus(t.config.id),o=e.data;"outLableDetail"==t.event&&tools_printLable.PrintLable(o)}),table.on("tool(proMana_outBoundOD)",function(t){t.data;"edit"==t.event||("search"==t.event?layer.msg("查看订单协同"):"chxx"==t.event)}),form.on("submit(outbound_orderDetails_search)",function(t){var e,o=t.field;1===a.orderType?e="proMana_outBoundOD_tb":2===a.orderType&&(e="proMana_outBoundODS"),table.reload(e,{where:o})}),table.on("toolbar(proMana_outBoundODS)",function(t){var e=table.checkStatus(t.config.id),o=e.data;"outLableDetail"==t.event&&tools_printLable.PrintLable(o)}),i(".outbound-orderDetails-search input").bind("input propertychange",function(t){i("*[lay-filter='outbound_orderDetails_search']").click()}),t("proMana_outbound_orderDetails",{})});