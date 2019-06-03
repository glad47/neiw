/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";function _defineProperty(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}layui.define(["admin","table","index","element","form","laydate"],function(e){var t;table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,laydate=layui.laydate,setter=layui.setter,element=layui.element;var i=layui.jquery;laydate.render({elem:"#gmtCreate"});var l={orderType:0};element.on("tab(ok_payment_tab)",function(e){l.orderType=e.index,layer.msg(e.index)}),table.render({elem:"#or_Tabpcb_ok_payment",url:setter.baseUrl+"/market/quote/okPaymentList",toolbar:!0,cellMinWidth:80,id:"or_Tabpcb_ok_payment",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{field:"id",title:"ID",hide:!0},{field:"productNo",fixed:"left",title:"内部型号",align:"center",width:114},{field:"status",title:"状态",hide:!1,align:"center",templet:"#Tabtb-pcb-market-okPayment-status",width:110},{field:"orderType",title:"订单类型",align:"center",width:109,templet:"#orderOkPaymentOrdertype"},{field:"",title:"文件",toolbar:"#pcb-file",align:"center"},{field:"gerberName",title:"文件名",align:"center",width:254},{field:"courierCompany",title:"快递公司",align:"center",width:154},{field:"courierNumber",title:"快递单号",align:"center",width:154},{field:"pcbType",title:"PCB 类型",align:"center",width:114},{field:"gmtCreate",title:"创建时间",align:"center",width:165},{field:"layerNum",title:"层数",align:"center",width:114},{field:"finishThickness",title:"完成板厚",align:"center",width:134},{field:"quantityPcs",title:"订单数量",align:"center",width:114},{field:"areaSq",title:"面积",align:"center",width:110},{field:"boardFee",title:"板费",align:"center",width:114},{field:"userId",title:"User ID",width:80,hide:!0},{field:"orderId",title:"Order ID",align:"center",width:96,hide:!0},{field:"dimensionsX",title:"DimensionsX",templet:"#type",align:"center",width:114,hide:!0},{field:"dimensionsY",title:"DimensionsY",align:"center",width:114,hide:!0},{field:"panelSizeX",title:"PanelSizeX",align:"center",width:114,hide:!0},(t={field:"panelSizeX",title:"PanelSizeY",align:"center"},_defineProperty(t,"align","center"),_defineProperty(t,"width",114),_defineProperty(t,"hide",!0),t),{field:"panelWayX",title:"PanelWayX",align:"center",width:114,hide:!0},{field:"panelWayY",title:"PanelWayY",align:"center",width:114,hide:!0},{field:"quantityPanel",title:"Quantity Panel",align:"center",width:124,hide:!0},{field:"tg",title:"TG",align:"center",width:80,hide:!0},{field:"material",title:"Material",align:"center",width:110,hide:!0},{field:"cti",title:"CTI",align:"center",width:114,hide:!0},{field:"productCode",title:"Product Code",align:"center",width:124,hide:!0},{field:"halogenFree",title:"Halogen Free",align:"center",width:114,hide:!0},{field:"heatConductivity",title:"Heat Conductivity",align:"center",width:150,hide:!0},{field:"innerLayerCopper",title:"InnerLayer Copper",align:"center",width:150,hide:!0},{field:"stackUp",title:"Stack Up",align:"center",width:95,hide:!0},{field:"innerMinTrack",title:"InnerMin Track",align:"center",width:134,hide:!0},{field:"innerMinSpacing",title:"InnerMin Spacing",align:"center",width:134,hide:!0},{field:"outerLayerCopper",title:"Outer Layer Copper",align:"center",width:134,hide:!0},{field:"outerMinTrack",title:"outerMinTrack",align:"center",width:124,hide:!0},{field:"bgaSize",title:"bgaSize",align:"center",width:90,hide:!0},{field:"outerMinSpacing",title:"outerMinSpacing",align:"center",width:134,hide:!0},{field:"minHoleSize",title:"minHoleSize",align:"center",width:124,hide:!0},{field:"pthCopper",title:"pthCopper",align:"center",width:114,hide:!0},{field:"solderMaskTopColor",title:"solderMaskTopColor",align:"center",width:134,hide:!0},{field:"viaProcess",title:"viaProcess",align:"center",width:124,hide:!0},{field:"solderMaskBotColor",title:"SolderMaskBotColor",align:"center",width:134,hide:!0},{field:"silkScreenTopColor",title:"SilkScreenTopColor",align:"center",width:134,hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",align:"center",width:134,hide:!0},{field:"peelable",title:"Peelable",align:"center",width:85,hide:!0},{field:"peelableBrand",title:"PeelableBrand",align:"center",width:118,hide:!0},{field:"surfaceFinish",title:"SurfaceFinish",align:"center",width:114,hide:!0},{field:"thickness",title:"Thickness",align:"center",width:96,hide:!0},{field:"surfaceArea",title:"SurfaceArea",align:"center",width:114,hide:!0},{field:"panelRoutingPath",title:"PanelRoutingPath",align:"center",width:124,hide:!0},{field:"punchingHoles",title:"PunchingHoles",align:"center",width:124,hide:!0},{field:"punchingSlots",title:"PunchingSlots",align:"center",width:124,hide:!0},{field:"testPoint",title:"TestPoint",align:"center",width:114,hide:!0},{field:"testPointType",title:"TestPointType",align:"center",width:124,hide:!0},{field:"testPoinType",title:"TestPoinType",align:"center",width:114,hide:!0},{field:"testCost",title:"TestCost",align:"center",width:90,hide:!0},{field:"blindHoles",title:"BlindHoles",align:"center",width:92,hide:!0},{field:"edgePlated",title:"EdgePlated",align:"center",width:100,hide:!0},{field:"halfHoleLated",title:"HalfHoleLated",align:"center",width:114,hide:!0},{field:"contrlImpeance",title:"ContrlImpeance",align:"center",width:114,hide:!0},{field:"buriedHoles",title:"BuriedHoles",align:"center",width:114,hide:!0},{field:"carbon",title:"Carbon",align:"center",width:80,hide:!0},{field:"bevellingCamfer",title:"BevellingCamfer",align:"center",width:134,hide:!0},{field:"deepMillRouting",title:"deepMillRouting",align:"center",width:134,hide:!0},_defineProperty({field:"gerberPath",title:"gerberPath",align:"center",hide:!0,width:114},"hide",!0),{field:"remark",title:"Remark",align:"center",width:80,hide:!0},{field:"differentDesign",title:"DifferentDesign",align:"center",width:134,hide:!0},{field:"gmtModified",title:"gmtModified",align:"center",width:114,hide:!0},{field:"uuid",title:"UuId",align:"center",width:80,hide:!0},{field:"stencilFee",title:"StencilFee",align:"center",width:114,hide:!0},{field:"overworkFee",title:"OverworkFee",align:"center",width:114,hide:!0},{field:"buildTime",title:"BuildTime",align:"center",width:114,hide:!0},{field:"isExistSmt",title:"IsExistSmt",align:"center",width:114,hide:!0},{field:"weight",title:"Weight",align:"center",width:80,hide:!0},{field:"nofCore",title:"NofCore",align:"center",width:80,hide:!0},{field:"nofPp",title:"NofPp",align:"center",width:80,hide:!0},{field:"nofHoles",title:"NofHoles",align:"center",width:90,hide:!0},{title:"操作",width:260,align:"center",fixed:"right",toolbar:"#Tabtb-pcb-market-okPayment-option"}]],done:function(e,t,l){/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)&&i("#LAY_app_body").each(function(e){i("a[lay-event='edit']").html('<i class="layui-icon layui-icon-edit"></i>'),i("a[lay-event='search']").html('<i class="layui-icon layui-icon-search"></i>'),i("a[lay-event='del']").html('<i class="layui-icon layui-icon-delete"></i>'),i(".laytable-cell-1-0-22").css({width:"130px"})})}}),table.on("tool(or_Tabpcb_ok_payment)",function(e){var t=e.data;if("detail"===e.event)console.log(t),admin.popup({title:"订单id:［"+t.id+"］-----------订单时间：［"+t.gmtCreate+"］",area:["100%","100%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_pcb_detail",t).done(function(){})}});else if("del"===e.event)layer.confirm("真的删除订单号为［"+t.productNo+"］吗",function(i){admin.req({type:"post",url:setter.baseUrl+"market/quote/audit/delete",data:{ids:t.id},done:function(t){layer.msg("删除成功"),e.del()},fail:function(e){layer.msg("服务器异常，稍后再试！")}}),layer.close(i)});else if("edit"===e.event)admin.popup({title:"编辑PCB订单信息",area:["45%","561px"],btn:["立即提交","取消"],yes:function(){i(".submit-ok").click(),layer.msg("yes")},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderPCB_update",t).done(function(){form.render(null,""),form.on("submit(LAY-pcborder-update-submit)",function(e){var t=e.field;return""!=t.remark&&"null"!=t.remark||(t.remark=" "),console.log("提交的字段信息："+JSON.stringify(t)),admin.req({type:"post",url:setter.baseUrl+"market/quote/audit/update",data:t,done:function(e){layer.msg("订单信息修改成功"),layui.table.reload("or_Tabpcb_ok_payment")},fail:function(e){layer.msg("订单信息修改失败，请稍后再试！")}}),layer.close(i),!1})})}});else if("pcb-submit"===e.event)layer.confirm("确定提交订单［"+t.productNo+"］?",function(e){admin.req({type:"post",url:setter.baseUrl+"market/quote/okPaymentList/submit",data:{id:t.id,contractNos:t.productNo,isLock:t.isLock,bid:t.businessId,onlineSales:t.subtotal},done:function(){layer.msg("订单［"+t.productNo+"］提交成功！"),table.reload("or_Tabpcb_ok_payment")},fail:function(){layer.msg("订单［"+t.productNo+"］提交失败，请重试！！！")}}),layui.table.reload("or_Tabpcb_ok_payment"),layer.close(e)});else if("pcb-sendback"===e.event)layer.confirm("确定退回订单［"+t.productNo+"］?",function(e){layer.msg("退回"+t.productNo),layui.table.reload("or_Tabpcb_no_payment"),layer.close(e)});else if("info_pact"===e.event)layer.open({type:2,title:"Look Invoice",content:setter.imUrl+"order/invoicePage?orderId="+t.orderId,maxmin:!0,area:["75%","70%"],btn:["确定","取消"],yes:function(e,t){}});else if("showProcess"==e.event){var l={orderId:t.id,isInternal:2,orderType:1};admin.req({type:"post",data:l,async:!1,url:setter.baseUrl+"sys/processlog/showProcess",success:function(e){console.log(e),admin.popup({title:"内部订单流程",area:["837px","373px"],success:function(t,i){view(this.id).render("marketManagement/iframeWindow/order_process",e.data).done(function(){})}})}})}}),table.render({elem:"#stencil_orderTab_ok_payment",id:"stencil_orderTab_ok_payment",url:setter.baseUrl+"market/stencil/okPayment/list",page:!0,toolbar:!0,done:function(){i(window).resize(),i(".layui-table-fixed-r").removeClass("layui-hide")},parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{field:"id",title:"ID",hide:!0},{field:"productNo",fixed:"left",title:"内部型号",align:"center",width:134},{field:"status",title:"状态",align:"center",width:100,templet:"#Tabtb-stencil-market-okPayment-status"},{field:"",title:"文件",templet:"#stencil-file",align:"center"},{field:"gerberName",title:"文件名",align:"center",width:224},{field:"courierCompany",title:"快递公司",align:"center",width:154},{field:"courierNumber",title:"快递单号",align:"center",width:154},{field:"totalStencilFee",title:"TotalStencilFee($)",align:"center",width:144},{field:"gmtCreate",title:"创建时间",align:"center",width:165},{field:"stencilType",title:"钢网类型",align:"center",width:124},{field:"stencilSide",title:"钢网大小",align:"center",width:124},{field:"quantity",title:"数量",align:"center",width:114},{field:"size",title:"厚度",align:"center",width:80},{field:"quoteId",title:"Quote ID",align:"center",width:114,hide:!0},{field:"thickness",title:"Thickness",align:"center",width:114,hide:!0},{field:"existingFiducials",title:"Existing Fiducials",align:"center",width:145,hide:!0},{field:"stencilSizeX",title:"stencilSizeX",align:"center",width:124,hide:!0},{field:"stencilSizeY",title:"stencilSizeY",align:"center",width:124,hide:!0},{field:"stencilAreaX",title:"stencilSizeY",align:"center",width:124,hide:!0},{field:"stencilAreaY",title:"stencilSizeY",align:"center",width:124,hide:!0},{field:"userId",title:"User ID",align:"center",width:100,hide:!0},{field:"gmtModified",title:"gmtModified",hide:!0,width:124},{field:"weight",title:"Weight",align:"center",width:85},{field:"gerberPath",title:"gerberPath",hide:!0,width:124},{field:"note",title:"Note",align:"center",width:80,hide:!0},{title:"操作",fixed:"right",align:"center",toolbar:"#Tabtb-stencil-market-okPayment-option",width:260}]]}),table.on("tool(stencil_orderTab_ok_payment)",function(e){var t=e.data;if("detail"===e.event)admin.popup({title:"订单号［"+t.productNo+"]---订单时间［"+t.gmtCreate+"］",area:["45%","70%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_stencil_detail",t).done(function(){})}});else if("info_pact"===e.event)console.log(t),layer.open({type:2,title:"Look Invoice",content:setter.imUrl+"order/invoicePage?orderId="+t.orderId,maxmin:!0,area:["75%","70%"],btn:["确定","取消"],yes:function(e,t){}});else if("stencil-submit"===e.event)layer.confirm("确定提交订单［"+t.productNo+"］?",function(e){admin.req({type:"post",url:setter.baseUrl+"market/stencil/okPayment/submit",data:{id:t.id,isLock:t.isLock,productNo:t.productNo,bid:t.businessId,onlineSales:t.totalStencilFee},done:function(){layer.msg("订单［"+t.productNo+"］提交成功！"),table.reload("stencil_orderTab_ok_payment")},fail:function(){layer.msg("订单［"+t.productNo+"］提交失败，请重试！！！")}}),layui.table.reload("stencil_orderTab_ok_payment"),layer.close(e)});else if("stencil-sendback"===e.event)layer.confirm("确定退回订单［"+t.productNo+"］?",function(e){layer.msg("退回"+t.productNo),layui.table.reload("stencil_orderTab_ok_payment"),layer.close(e)});else if("stencil-del"===e.event)layer.confirm("还没接网上钢网订单的删除接口！！",function(){});else if("showProcess"==e.event){var i={orderId:t.id,isInternal:2,orderType:2};admin.req({type:"post",data:i,async:!1,url:setter.baseUrl+"sys/processlog/showProcess",success:function(e){console.log(e),admin.popup({title:"内部订单流程",area:["837px","373px"],success:function(t,i){view(this.id).render("marketManagement/iframeWindow/order_process",e.data).done(function(){})}})}})}}),form.on("submit(ok_payment_search)",function(e){var t,i=e.field;delete i.quiz,0===l.orderType?t="or_Tabpcb_ok_payment":1===l.orderType&&(t="stencil_orderTab_ok_payment"),table.reload(t,{where:i})}),form.on("select(ok-payment-search-sel)",function(e){i("*[lay-filter='ok_payment_search']").click()}),i(".ok-payment-search input").bind("input propertychange",function(e){i("*[lay-filter='ok_payment_search']").click()}),element.on("tab(pcdorstencil_tab)",function(e){var t=e.index;form.on("submit(LAY-app-orderReview-search)",function(e){var i=e.field;delete i.quiz,0===t?(layer.msg("PCBOrders"),table.reload("or_Tabpcb",{where:i})):1===t&&(layer.msg("StencilOrders"),table.reload("stencil_orderTab_ok_payment",{where:i}))})}),table.render({elem:"#smt_orderTab_ok_payment",id:"smt_orderTab_ok_payment",url:setter.baseUrl+"market/assembly/listByStatus",page:!0,toolbar:!0,done:function(){i(window).resize(),i(".layui-table-fixed-r").removeClass("layui-hide")},parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{statusMark:3},cols:[[{field:"id",title:"ID",hide:!0},{field:"quoteId",title:"ID",hide:!0},{field:"productNo",title:"内部型号",align:"center",width:134},{field:"status",fixed:"left",title:"状态",align:"center",width:100,templet:"#Tabtb-smt-market-okPayment-status"},{field:"",title:"文件",templet:"#stencil-file",align:"center"},{field:"gerberName",title:"文件名",align:"center",width:224},{field:"smtPartNum",title:"SMT PartNum",align:"center",width:124},{field:"throughHolePartNum",title:"Through Hole PartNum",align:"center",width:224},{field:"gmtCreate",title:"gmtCreate",align:"center",width:165},{field:"assemblySide",title:"Assembly Side",align:"center",width:165},{field:"invoiceNo",title:"Invoice No",align:"center",width:134},{field:"totalAssemblyFee",title:"TotalAssemblyFee($)",align:"center",width:144},{field:"assemblyType",title:"Stencil Type",align:"center",width:124},{field:"uniquePartNum",title:"Unique PartNum",align:"center",width:124},{field:"quantity",title:"Quantity",align:"center",width:114},{field:"orderId",title:"Order ID",align:"center",width:114,hide:!0},{field:"orderNo",title:"Order No",align:"center",width:114,hide:!0},{field:"isLock",title:"Is Lock",align:"center",width:114,hide:!0},{field:"userId",title:"User ID",align:"center",width:100,hide:!0},{field:"gmtModified",title:"gmtModified",width:124},{field:"gerberPath",title:"gerberPath",hide:!0,width:124},{field:"ordertime",title:"Order Time",width:124},{field:"remark",title:"Remark",align:"center",width:80,hide:!0},{title:"操作",fixed:"right",align:"center",width:260,toolbar:"#Tabtb-smt-market-okPayment-option"}]]}),table.on("tool(smt_orderTab_ok_payment)",function(e){var t=e.data;if("detail"===e.event)admin.popup({title:"订单号［"+t.productNo+"]---订单时间［"+t.gmtCreate+"］",area:["45%","70%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_smt_detail",t).done(function(){})}});else if("info_pact"===e.event)console.log(t),layer.open({type:2,title:"Look Invoice",content:setter.imUrl+"order/invoicePage?orderId="+t.orderId,maxmin:!0,area:["75%","70%"],btn:["确定","取消"],yes:function(e,t){}});else if("stencil-submit"===e.event)layer.confirm("确定提交订单［"+t.productNo+"］?",function(e){t.isLock=3,admin.req({type:"post",url:setter.baseUrl+"market/assembly/okPaymentList/submit",data:{id:t.id,isLock:t.isLock},done:function(){layer.msg("订单［"+t.productNo+"］提交成功！"),console.log("提交的信息为"+JSON.stringify(t))},fail:function(){layer.msg("订单［"+t.productNo+"］提交失败，请重试！！！")}}),layui.table.reload("smt_orderTab_ok_payment"),layer.close(e)});else if("smt-sendback"===e.event)layer.confirm("确定退回订单［"+t.productNo+"］?",function(e){layer.msg("退回"+t.productNo),layui.table.reload("smt_orderTab_ok_payment"),layer.close(e)});else if("showProcess"==e.event){var i={orderId:t.id,isInternal:2,orderType:2};admin.req({type:"post",data:i,async:!1,url:setter.baseUrl+"sys/processlog/showProcess",success:function(e){console.log(e),admin.popup({title:"内部订单流程",area:["837px","373px"],success:function(t,i){view(this.id).render("marketManagement/iframeWindow/order_process",e.data).done(function(){})}})}})}}),form.on("submit(ok_payment_search)",function(e){var t=e.field;delete t.quiz;var i;console.log(1),0===l.orderType?i="or_Tabpcb_ok_payment":1===l.orderType&&(i="stencil_orderTab_ok_payment"),table.reload(i,{where:t})}),document.onkeydown=function(e){var t=document.all?window.event:e;13==t.keyCode&&i("*[lay-filter='ok_payment_search']").click()},i("#okPayment-operation").on("click",function(){i(this).text("隐藏操作"==i(this).text()?"显示操作":"隐藏操作"),i(".layui-table-fixed-r").toggle("slow")}),/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)&&(i("#orderReview_searll").css({display:""}),i("#orderReview_pcsear").css({display:"none"}),form.on("select(orderReview-search-select)",function(e){var t=e.value,l=e.elem.selectedIndex,n=e.elem.options[l].text,r=i("#orderReview_sinp");null!=t||""!=t?(r.attr({placeholder:n}),i("input[id='orderReview_sinp']").attr("name",t)):r.attr("placeholder","请选取搜索条件")})),e("market_orderOkPayment",{})});