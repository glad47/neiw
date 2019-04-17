/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";function _defineProperty(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}layui.define(["admin","table","index","element","form","laydate"],function(e){var t;table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,laydate=layui.laydate,setter=layui.setter,element=layui.element;var i=layui.jquery;laydate.render({elem:"#gmtCreate"}),table.render({elem:"#or_Tabpcb",url:setter.baseUrl+"/market/quote/audit/list",toolbar:!0,cellMinWidth:80,id:"or_Tabpcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{field:"id",title:"ID",hide:!0},{field:"status",fixed:"left",title:"状态",hide:!1,align:"center",templet:"#Tabtb-pcb-market-orderReview-status",width:110},{field:"",title:"File",toolbar:"#pcb-file",align:"center"},{field:"gerberName",title:"Gerber Name",align:"center",width:254},{field:"productNo",title:"ProductNo",align:"center",width:114},{field:"pcbType",title:"PCB Type",align:"center",width:114},{field:"layerNum",title:"Layer",align:"center",width:114},{field:"finishThickness",title:"Finish Thickness",align:"center",width:134},{field:"quantityPcs",title:"Quantity Pcs",align:"center",width:114},{field:"areaSq",title:"Area Sq",align:"center",width:110},{field:"boardFee",title:"BoardFee",align:"center",width:114},{field:"gmtCreate",title:"Create Time",align:"center",width:165},{field:"userId",title:"User ID",width:80,hide:!0},{field:"isLock",title:"Is Lock",width:80,hide:!0},{field:"orderId",title:"Order ID",align:"center",width:96,hide:!0},{field:"orderType",title:"Order Type",align:"center",width:109,hide:!0},{field:"dimensionsX",title:"DimensionsX",templet:"#type",align:"center",width:114,hide:!0},{field:"dimensionsY",title:"DimensionsY",align:"center",width:114,hide:!0},{field:"panelSizeX",title:"PanelSizeX",align:"center",width:114,hide:!0},(t={field:"panelSizeX",title:"PanelSizeY",align:"center"},_defineProperty(t,"align","center"),_defineProperty(t,"width",114),_defineProperty(t,"hide",!0),t),{field:"panelWayX",title:"PanelWayX",align:"center",width:114,hide:!0},{field:"panelWayY",title:"PanelWayY",align:"center",width:114,hide:!0},{field:"quantityPanel",title:"Quantity Panel",align:"center",width:124,hide:!0},{field:"tg",title:"TG",align:"center",width:80,hide:!0},{field:"material",title:"Material",align:"center",width:110,hide:!0},{field:"cti",title:"CTI",align:"center",width:114,hide:!0},{field:"productCode",title:"Product Code",align:"center",width:124,hide:!0},{field:"halogenFree",title:"Halogen Free",align:"center",width:114,hide:!0},{field:"heatConductivity",title:"Heat Conductivity",align:"center",width:150,hide:!0},{field:"innerLayerCopper",title:"InnerLayer Copper",align:"center",width:150,hide:!0},{field:"stackUp",title:"Stack Up",align:"center",width:95,hide:!0},{field:"innerMinTrack",title:"InnerMin Track",align:"center",width:134,hide:!0},{field:"innerMinSpacing",title:"InnerMin Spacing",align:"center",width:134,hide:!0},{field:"outerLayerCopper",title:"Outer Layer Copper",align:"center",width:134,hide:!0},{field:"outerMinTrack",title:"outerMinTrack",align:"center",width:124,hide:!0},{field:"bgaSize",title:"bgaSize",align:"center",width:90,hide:!0},{field:"outerMinSpacing",title:"outerMinSpacing",align:"center",width:134,hide:!0},{field:"minHoleSize",title:"minHoleSize",align:"center",width:124,hide:!0},{field:"pthCopper",title:"pthCopper",align:"center",width:114,hide:!0},{field:"solderMaskTopColor",title:"solderMaskTopColor",align:"center",width:134,hide:!0},{field:"viaProcess",title:"viaProcess",align:"center",width:124,hide:!0},{field:"solderMaskBotColor",title:"SolderMaskBotColor",align:"center",width:134,hide:!0},{field:"silkScreenTopColor",title:"SilkScreenTopColor",align:"center",width:134,hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",align:"center",width:134,hide:!0},{field:"peelable",title:"Peelable",align:"center",width:85,hide:!0},{field:"peelableBrand",title:"PeelableBrand",align:"center",width:118,hide:!0},{field:"surfaceFinish",title:"SurfaceFinish",align:"center",width:114,hide:!0},{field:"thickness",title:"Thickness",align:"center",width:96,hide:!0},{field:"surfaceArea",title:"SurfaceArea",align:"center",width:114,hide:!0},{field:"panelRoutingPath",title:"PanelRoutingPath",align:"center",width:124,hide:!0},{field:"punchingHoles",title:"PunchingHoles",align:"center",width:124,hide:!0},{field:"punchingSlots",title:"PunchingSlots",align:"center",width:124,hide:!0},{field:"testPoint",title:"TestPoint",align:"center",width:114,hide:!0},{field:"testPointType",title:"TestPointType",align:"center",width:124,hide:!0},{field:"testPoinType",title:"TestPoinType",align:"center",width:114,hide:!0},{field:"testCost",title:"TestCost",align:"center",width:90,hide:!0},{field:"blindHoles",title:"BlindHoles",align:"center",width:92,hide:!0},{field:"edgePlated",title:"EdgePlated",align:"center",width:100,hide:!0},{field:"halfHoleLated",title:"HalfHoleLated",align:"center",width:114,hide:!0},{field:"contrlImpeance",title:"ContrlImpeance",align:"center",width:114,hide:!0},{field:"buriedHoles",title:"BuriedHoles",align:"center",width:114,hide:!0},{field:"carbon",title:"Carbon",align:"center",width:80,hide:!0},{field:"bevellingCamfer",title:"BevellingCamfer",align:"center",width:134,hide:!0},{field:"deepMillRouting",title:"deepMillRouting",align:"center",width:134,hide:!0},_defineProperty({field:"gerberPath",title:"gerberPath",align:"center",hide:!0,width:114},"hide",!0),{field:"remark",title:"Remark",align:"center",width:80,hide:!0},{field:"differentDesign",title:"DifferentDesign",align:"center",width:134,hide:!0},{field:"gmtModified",title:"gmtModified",align:"center",width:114,hide:!0},{field:"uuid",title:"UuId",align:"center",width:80,hide:!0},{field:"stencilFee",title:"StencilFee",align:"center",width:114,hide:!0},{field:"overworkFee",title:"OverworkFee",align:"center",width:114,hide:!0},{field:"buildTime",title:"BuildTime",align:"center",width:114,hide:!0},{field:"isExistSmt",title:"IsExistSmt",align:"center",width:114,hide:!0},{field:"weight",title:"Weight",align:"center",width:80,hide:!0},{field:"nofCore",title:"NofCore",align:"center",width:80,hide:!0},{field:"nofPp",title:"NofPp",align:"center",width:80,hide:!0},{field:"nofHoles",title:"NofHoles",align:"center",width:90,hide:!0},{title:"操作",width:260,align:"center",fixed:"right",toolbar:"#Tabtb-pcb-market-orderReview-option"}]],done:function(e,t,l){/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)&&i("#LAY_app_body").each(function(e){i("a[lay-event='edit']").html('<i class="layui-icon layui-icon-edit"></i>'),i("a[lay-event='search']").html('<i class="layui-icon layui-icon-search"></i>'),i("a[lay-event='del']").html('<i class="layui-icon layui-icon-delete"></i>'),i(".laytable-cell-1-0-22").css({width:"130px"})})}}),table.on("tool(or_Tabpcb)",function(e){var t=e.data;"detail"===e.event?admin.popup({title:"订单id:［"+t.id+"］-----------订单时间：［"+t.gmtCreate+"］",area:["60%","90%"],success:function(e,i){console.log(t),view(this.id).render("marketManagement/iframeWindow/order_pcb_detail",t).done(function(){})}}):"del"===e.event?layer.confirm("真的删除订单号为［"+t.productNo+"］吗",function(i){admin.req({type:"post",url:setter.baseUrl+"market/quote/audit/delete",data:{ids:t.id},done:function(t){layer.msg("删除成功"),e.del()},fail:function(e){layer.msg("服务器异常，稍后再试！")}}),layer.close(i)}):"edit"===e.event?admin.popup({title:"编辑PCB订单信息",area:["76%","90%"],btn:["立即提交","取消"],yes:function(){i(".submit-ok").click(),layer.msg("yes")},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderPCB_update",t).done(function(){form.render(null,""),form.on("submit(LAY-pcborder-update-submit)",function(e){var t=e.field;return console.log("提交的字段信息："+JSON.stringify(t)),admin.req({type:"post",url:setter.baseUrl+"/market/quote/audit/update",data:t,done:function(e){layer.msg("订单信息修改成功"),layui.table.reload("or_Tabpcb")},fail:function(e){layer.msg("订单信息修改失败，请稍后再试！")}}),layer.close(i),!1})})}}):"pcb-submit"===e.event?layer.confirm("确定提交订单［"+t.productNo+"］?",function(e){t.status=2,admin.req({type:"post",url:setter.baseUrl+"market/quote/audit/update",data:{id:t.id,status:t.status},done:function(){layer.msg("订单［"+t.productNo+"］提交成功！")},fail:function(){layer.msg("订单［"+t.productNo+"］提交失败，请重试！！！")}}),layui.table.reload("or_Tabpcb"),layer.close(e)}):"pcb-lock"===e.event?layer.confirm("确定锁定订单［"+t.productNo+"］?",function(e){admin.req({type:"post",url:setter.baseUrl+"market/quote/audit/update",data:{id:t.id,isLock:2},done:function(){layer.msg("订单［"+t.productNo+"］已锁定！"),table.reload("or_Tabpcb")},fail:function(){layer.msg("订单［"+t.productNo+"］锁定失败，稍后再试！")}}),layer.close(e)}):"pcb-beenLocked"===e.event&&(layer.msg("订单［"+t.productNo+"］已锁定!!!"),layer.confirm("确定解锁锁定订单［"+t.productNo+"］?",function(e){admin.req({type:"post",url:setter.baseUrl+"market/quote/audit/update",data:{id:t.id,isLock:1},done:function(){layer.msg("订单［"+t.productNo+"］已解锁！"),table.reload("or_Tabpcb")},fail:function(){layer.msg("订单［"+t.productNo+"］解锁失败，稍后再试！")}}),table.reload("or_Tabpcb"),layer.close(e)}))}),table.render({elem:"#stencil_orderTab",id:"stencil_orderTab",url:setter.baseUrl+"market/stencil/audit/list",page:!0,toolbar:!0,done:function(){i(window).resize(),i(".layui-table-fixed-r").removeClass("layui-hide")},parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{field:"id",title:"ID",hide:!0},{field:"status",fixed:"left",title:"状态",align:"center",width:100,templet:"#Tabtb-stencil-market-orderReview-status"},{field:"",title:"File",templet:"#stencil-file",align:"center"},{field:"gerberName",title:"gerberName",align:"center",width:224},{field:"gmtCreate",title:"gmtCreate",align:"center",width:165},{field:"productNo",title:"Product No",align:"center",width:134},{field:"totalStencilFee",title:"TotalStencilFee($)",align:"center",width:144},{field:"stencilType",title:"Stencil Type",align:"center",width:124},{field:"stencilSide",title:"Stencil Side",align:"center",width:124},{field:"quantity",title:"Quantity",align:"center",width:114},{field:"size",title:"Size",align:"center",width:80},{field:"quoteId",title:"Quote ID",align:"center",width:114,hide:!0},{field:"isLock",title:"Is Lock",align:"center",width:114,hide:!0},{field:"thickness",title:"Thickness",align:"center",width:114,hide:!0},{field:"existingFiducials",title:"Existing Fiducials",align:"center",width:145,hide:!0},{field:"stencilSizeX",title:"stencilSizeX",align:"center",width:124,hide:!0},{field:"stencilSizeY",title:"stencilSizeY",align:"center",width:124,hide:!0},{field:"stencilAreaX",title:"stencilSizeY",align:"center",width:124,hide:!0},{field:"stencilAreaY",title:"stencilSizeY",align:"center",width:124,hide:!0},{field:"userId",title:"User ID",align:"center",width:100,hide:!0},{field:"gmtModified",title:"gmtModified",hide:!0,width:124},{field:"weight",title:"Weight",align:"center",width:85},{field:"gerberPath",title:"gerberPath",hide:!0,width:124},{field:"note",title:"Note",align:"center",width:80,hide:!0},{title:"操作",fixed:"right",align:"center",toolbar:"#Tabtb-stencil-market-orderReview-option",width:260}]]}),table.on("tool(stencil_orderTab)",function(e){var t=e.data;"detail"===e.event?admin.popup({title:"订单号［"+t.productNo+"]---订单时间［"+t.gmtCreate+"］",area:["45%","90%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_stencil_detail",t).done(function(){})}}):"edit"===e.event?admin.popup({title:"编辑：订单号［"+t.productNo+"]",area:["66%","90%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderStencil_update",t).done(function(){form.render(null,"")})}}):"del"===e.event?layer.confirm("真的删除订单号为［"+t.productNo+"］吗",function(i){admin.req({type:"post",url:setter.baseUrl+"market/stencil/audit/delete",data:{ids:t.id},done:function(t){layer.msg("删除成功"),e.del()},fail:function(e){layer.msg("服务器异常，稍后重试！")}}),layer.close(i)}):"stencil-submit"===e.event?layer.confirm("确定提交订单［"+t.productNo+"］?",function(e){t.status=2,admin.req({type:"post",url:setter.baseUrl+"market/stencil/audit/update",data:{id:t.id,status:t.status},done:function(){layer.msg("订单［"+t.productNo+"］提交成功！"),console.log("提交的信息为"+JSON.stringify(t)),layui.table.reload("stencil_orderTab")},fail:function(){layer.msg("订单［"+t.productNo+"］提交失败，请重试！！！")}}),layui.table.reload("stencil_orderTab"),layer.close(e)}):"stencil-lock"===e.event?layer.confirm("确定锁定订单［"+t.productNo+"］?",function(e){admin.req({type:"post",url:setter.baseUrl+"market/stencil/audit/update",data:{id:t.id,isLock:2},done:function(){layer.msg("订单［"+t.productNo+"］已锁定！"),table.reload("stencil_orderTab")},fail:function(){layer.msg("订单［"+t.productNo+"］锁定失败，稍后再试！")}}),i("a[title='刷新']").click(),layer.close(e)}):"stencil-beenLocked"===e.event&&layer.msg("订单［"+t.productNo+"］已锁定!!!")}),form.on("submit(LAY-app-orderReview-search)",function(e){var t=e.field;delete t.quiz,table.reload("or_Tabpcb",{where:t})}),element.on("tab(pcdorstencil_tab)",function(e){var t=e.index;form.on("submit(LAY-app-orderReview-search)",function(e){var i=e.field;delete i.quiz,0===t?(layer.msg("PCBOrders"),table.reload("or_Tabpcb",{where:i})):1===t&&(layer.msg("StencilOrders"),table.reload("stencil_orderTab",{where:i}))})}),table.render({elem:"#smt_orderTab",id:"smt_orderTab",url:setter.baseUrl+"market/assembly/listByStatus",page:!0,toolbar:!0,done:function(){i(window).resize(),i(".layui-table-fixed-r").removeClass("layui-hide")},parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{status:1},cols:[[{field:"id",title:"ID",hide:!0},{field:"quoteId",title:"ID",hide:!0},{field:"status",fixed:"left",title:"状态",align:"center",width:100,templet:"#Tabtb-stencil-market-orderReview-status"},{field:"",title:"File",templet:"#stencil-file",align:"center"},{field:"gerberName",title:"gerberName",align:"center",width:224},{field:"smtPartNum",title:"SMT PartNum",align:"center",width:124},{field:"throughHolePartNum",title:"Through Hole PartNum",align:"center",width:224},{field:"assemblySide",title:"Assembly Side",align:"center",width:165},{field:"productNo",title:"Product No",align:"center",width:134},{field:"invoiceNo",title:"Invoice No",align:"center",width:134},{field:"totalAssemblyFee",title:"TotalAssemblyFee($)",align:"center",width:144},{field:"assemblyType",title:"Assembly Type",align:"center",width:124},{field:"uniquePartNum",title:"Unique PartNum",align:"center",width:124},{field:"quantity",title:"Quantity",align:"center",width:114},{field:"orderId",title:"Order ID",align:"center",width:114,hide:!0},{field:"orderNo",title:"Order No",align:"center",width:114,hide:!0},{field:"isLock",title:"Is Lock",align:"center",width:114,hide:!0},{field:"userId",title:"User ID",align:"center",width:100,hide:!0},{field:"gmtModified",title:"gmtModified",width:124},{field:"gerberPath",title:"gerberPath",hide:!0,width:124},{field:"ordertime",title:"Order Time",width:124},{field:"remark",title:"Remark",align:"center",width:80,hide:!0},{title:"操作",fixed:"right",align:"center",toolbar:"#Tabtb-smt-market-orderReview-option",width:260}]]}),table.on("tool(smt_orderTab)",function(e){var t=e.data;"detail"===e.event?admin.popup({title:"订单id:［"+t.id+"］-----------订单时间：［"+t.gmtCreate+"］",area:["45%","90%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_smt_detail",t).done(function(){})}}):"del"===e.event?layer.confirm("真的删除(SMT)订单号为［"+t.id+"］吗",function(i){admin.req({type:"post",url:setter.baseUrl+"market/assembly/delete",data:{ids:t.id},done:function(t){layer.msg("删除成功"),e.del()},fail:function(e){layer.msg("服务器异常，稍后再试！")}}),layer.close(i)}):"edit"===e.event?admin.popup({title:"编辑SMT订单信息",area:["66%","90%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderSMT_update",t).done(function(){form.render(null,""),form.on("submit(LAY-smtorder-update-submit)",function(e){var t=e.field;return console.log("提交的字段信息："+JSON.stringify(t)),admin.req({type:"post",url:setter.baseUrl+"market/assembly/update",data:t,done:function(e){layer.msg("SMT订单信息修改成功"),table.reload("smt_orderTab")},fail:function(e){layer.msg("订单信息修改失败，请稍后再试！")}}),layer.close(i),!1})})}}):"smt-submit"===e.event?layer.confirm("确定提交订单［"+t.productNo+"］?",function(e){t.status=2,admin.req({type:"post",url:setter.baseUrl+"market/assembly/okPaymentList/submit",data:{id:t.id,status:t.status},done:function(){layer.msg("订单［"+t.productNo+"］提交成功！"),layui.table.reload("smt_orderTab")},fail:function(){layer.msg("订单［"+t.productNo+"］提交失败，请重试！！！")}}),layui.table.reload("smt_orderTab"),layer.close(e)}):"smt-lock"===e.event?layer.confirm("确定锁定订单［"+t.productNo+"］?",function(e){admin.req({type:"post",url:setter.baseUrl+"market/assembly/update",data:{id:t.id,isLock:2},done:function(){layer.msg("订单［"+t.productNo+"］已锁定！"),table.reload("smt_orderTab")},fail:function(){layer.msg("订单［"+t.productNo+"］锁定失败，稍后再试！")}}),layui.table.reload("smt_orderTab"),layer.close(e)}):"smt-beenLocked"===e.event&&layer.msg("订单［"+t.productNo+"］已锁定!!!")}),i("#orderReview-operation").on("click",function(){i(this).text("隐藏操作"==i(this).text()?"显示操作":"隐藏操作"),i(".layui-table-fixed-r").toggle("slow")}),e("market_orderReview",{})});