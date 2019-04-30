/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";function _defineProperty(e,i,t){return i in e?Object.defineProperty(e,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[i]=t,e}layui.define(["admin","table","index","element","form","laydate","jsTools"],function(e){var i;table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,laydate=layui.laydate,setter=layui.setter,element=layui.element;var t=layui.jquery,l=layui.jsTools;laydate.render({elem:"#gmtCreate"}),table.render({elem:"#scm_Tabpcb_outgoing_quote",url:setter.baseUrl+"scm/pcborder/outgoing/list",toolbar:!0,cellMinWidth:80,id:"scm_Tabpcb_outgoing_quote",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{field:"id",title:"ID",hide:!0},{field:"productNo",fixed:"left",title:"聚谷编号",align:"center",minWidth:114},{field:"status",title:"状态",hide:!1,align:"center",templet:"#Tabtb-pcb-scm-outgoingQuote-status",minWidth:130},{field:"",title:"下载",toolbar:"#pcb-file",align:"center"},{field:"difficultyLevel",title:"难易度",align:"center",templet:"#Tabtb-pcb-scm-outgoingQuote-difficultyLevel"},{field:"id",title:"ID",align:"center"},{field:"quoteGerberName",title:"正式资料",align:"center",minWidth:254,hide:!0},{field:"gmtCreate",title:"创建时间",align:"center",minWidth:165},{field:"pcbType",title:"PCB Type",align:"center",width:114,hide:!0},{field:"layerNum",title:"Layer",align:"center",width:114,hide:!0},{field:"finishThickness",title:"Finish Thickness",align:"center",width:134,hide:!0},{field:"quantityPcs",title:"Quantity Pcs",align:"center",width:114,hide:!0},{field:"areaSq",title:"Area Sq",align:"center",width:110,hide:!0},{field:"boardFee",title:"BoardFee",align:"center",width:114,hide:!0},{field:"userId",title:"User ID",width:80,hide:!0},{field:"engineeringRemark",title:"工程备注",width:80,hide:!0},{field:"orderId",title:"Order ID",align:"center",width:96,hide:!0},{field:"orderType",title:"Order Type",align:"center",width:109,hide:!0},{field:"dimensionsX",title:"DimensionsX",templet:"#type",align:"center",width:114,hide:!0},{field:"dimensionsY",title:"DimensionsY",align:"center",width:114,hide:!0},{field:"panelSizeX",title:"PanelSizeX",align:"center",width:114,hide:!0},(i={field:"panelSizeX",title:"PanelSizeY",align:"center"},_defineProperty(i,"align","center"),_defineProperty(i,"width",114),_defineProperty(i,"hide",!0),i),{field:"panelWayX",title:"PanelWayX",align:"center",width:114,hide:!0},{field:"panelWayY",title:"PanelWayY",align:"center",width:114,hide:!0},{field:"quantityPanel",title:"Quantity Panel",align:"center",width:124,hide:!0},{field:"tg",title:"TG",align:"center",width:80,hide:!0},{field:"material",title:"Material",align:"center",width:110,hide:!0},{field:"cti",title:"CTI",align:"center",width:114,hide:!0},{field:"productCode",title:"Product Code",align:"center",width:124,hide:!0},{field:"halogenFree",title:"Halogen Free",align:"center",width:114,hide:!0},{field:"heatConductivity",title:"Heat Conductivity",align:"center",width:150,hide:!0},{field:"innerLayerCopper",title:"InnerLayer Copper",align:"center",width:150,hide:!0},{field:"stackUp",title:"Stack Up",align:"center",width:95,hide:!0},{field:"innerMinTrack",title:"InnerMin Track",align:"center",width:134,hide:!0},{field:"innerMinSpacing",title:"InnerMin Spacing",align:"center",width:134,hide:!0},{field:"outerLayerCopper",title:"Outer Layer Copper",align:"center",width:134,hide:!0},{field:"outerMinTrack",title:"outerMinTrack",align:"center",width:124,hide:!0},{field:"bgaSize",title:"bgaSize",align:"center",width:90,hide:!0},{field:"outerMinSpacing",title:"outerMinSpacing",align:"center",width:134,hide:!0},{field:"minHoleSize",title:"minHoleSize",align:"center",width:124,hide:!0},{field:"pthCopper",title:"pthCopper",align:"center",width:114,hide:!0},{field:"solderMaskTopColor",title:"solderMaskTopColor",align:"center",width:134,hide:!0},{field:"viaProcess",title:"viaProcess",align:"center",width:124,hide:!0},{field:"solderMaskBotColor",title:"SolderMaskBotColor",align:"center",width:134,hide:!0},{field:"silkScreenTopColor",title:"SilkScreenTopColor",align:"center",width:134,hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",align:"center",width:134,hide:!0},{field:"peelable",title:"Peelable",align:"center",width:85,hide:!0},{field:"peelableBrand",title:"PeelableBrand",align:"center",width:118,hide:!0},{field:"surfaceFinish",title:"SurfaceFinish",align:"center",width:114,hide:!0},{field:"thickness",title:"Thickness",align:"center",width:96,hide:!0},{field:"surfaceArea",title:"SurfaceArea",align:"center",width:114,hide:!0},{field:"panelRoutingPath",title:"PanelRoutingPath",align:"center",width:124,hide:!0},{field:"punchingHoles",title:"PunchingHoles",align:"center",width:124,hide:!0},{field:"punchingSlots",title:"PunchingSlots",align:"center",width:124,hide:!0},{field:"testPoint",title:"TestPoint",align:"center",width:114,hide:!0},{field:"testPointType",title:"TestPointType",align:"center",width:124,hide:!0},{field:"testPoinType",title:"TestPoinType",align:"center",width:114,hide:!0},{field:"testCost",title:"TestCost",align:"center",width:90,hide:!0},{field:"blindHoles",title:"BlindHoles",align:"center",width:92,hide:!0},{field:"edgePlated",title:"EdgePlated",align:"center",width:100,hide:!0},{field:"halfHoleLated",title:"HalfHoleLated",align:"center",width:114,hide:!0},{field:"contrlImpeance",title:"ContrlImpeance",align:"center",width:114,hide:!0},{field:"buriedHoles",title:"BuriedHoles",align:"center",width:114,hide:!0},{field:"carbon",title:"Carbon",align:"center",width:80,hide:!0},{field:"bevellingCamfer",title:"BevellingCamfer",align:"center",width:134,hide:!0},{field:"deepMillRouting",title:"deepMillRouting",align:"center",width:134,hide:!0},_defineProperty({field:"gerberPath",title:"gerberPath",align:"center",hide:!0,width:114},"hide",!0),{field:"remark",title:"Remark",align:"center",width:80,hide:!0},{field:"differentDesign",title:"DifferentDesign",align:"center",width:134,hide:!0},{field:"gmtModified",title:"gmtModified",align:"center",width:114,hide:!0},{field:"uuid",title:"UuId",align:"center",width:80,hide:!0},{field:"stencilFee",title:"StencilFee",align:"center",width:114,hide:!0},{field:"overworkFee",title:"OverworkFee",align:"center",width:114,hide:!0},{field:"buildTime",title:"BuildTime",align:"center",width:114,hide:!0},{field:"isExistSmt",title:"IsExistSmt",align:"center",width:114,hide:!0},{field:"weight",title:"Weight",align:"center",width:80,hide:!0},{field:"nofCore",title:"NofCore",align:"center",width:80,hide:!0},{field:"nofPp",title:"NofPp",align:"center",width:80,hide:!0},{field:"nofHoles",title:"NofHoles",align:"center",width:90,hide:!0},{title:"操作",width:260,align:"center",fixed:"right",toolbar:"#Tabtb-pcb-scm-outgoingQuote-option"}]],done:function(e,i,l){/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)&&t("#LAY_app_body").each(function(e){t("a[lay-event='edit']").html('<i class="layui-icon layui-icon-edit"></i>'),t("a[lay-event='search']").html('<i class="layui-icon layui-icon-search"></i>'),t("a[lay-event='del']").html('<i class="layui-icon layui-icon-delete"></i>'),t(".laytable-cell-1-0-22").css({width:"130px"})})}}),table.on("tool(scm_Tabpcb_outgoing_quote)",function(e){var i,n,a=e.data,d=null;"assign"===e.event?admin.popup({title:"指定供应商",area:["912px","545px"],btn:["提交","跳过提交","取消"],yes:function(e,t){var l=table.checkStatus("scm_assign_supplier_table"),n=l.data,d=n.map(function(e){return e.id}).join(",");console.log("ids:"+d);for(var r=[d.split(",")],o=new Array,c=i.toString(),s=0;s<r[0].length;s++){if(c.indexOf(r[0][s].toString())>-1)for(var h=0;h<i.length;h++)if(r[0][s]==parseInt(i[h])){o.push(parseInt(r[0][s]));break}for(var g=0;g<o.length;g++)parseInt(r[0][s])==o[g]&&r[0].splice(s,1)}admin.req({url:setter.baseUrl+"scm/pcborder/assignOrderToSupplier",type:"POST",data:{id:a.id,supplierIds:r[0].toString(),isInternal:a.isInternal,onlineOid:a.onlineOid},success:function(i){0==i.code?(layer.msg("指派成功！"),layer.close(e)):layer.msg(i.msg)}})},btn2:function(e,i){t("#assignSupplierTbData").click(),layer.confirm("确定跳过提交？",function(){for(var e=d.map(function(e){return e.id}).join(","),i=e.split(","),r=0;r<n.length;r++)i=t.grep(i,function(e){return e!=n[r]});if(console.log(i),i.length<1)return layer.msg("请选择一条要跳过提交的数据！"),!1;i=l.ArrayClearRepeat(i),console.log("supplierArr:"+i);var o={id:a.id,supplierIds:i.toString(),isInternal:a.isInternal,onlineOid:a.onlineOid};console.log(o),admin.req({url:setter.baseUrl+"scm/pcborder/skipSubmit",data:o,success:function(e){layer.alert("成功跳过提交!",function(){d=null,layer.closeAll()})}})})},end:function(){},success:function(e,l){view(this.id).render("scmManagement/assign_supplier",a).done(function(){var e;admin.req({type:"post",url:setter.baseUrl+"scm/pcborder/assignedSupplierIds",data:{oid:a.id},async:!1,success:function(t){e=n=t.data,i=t.data}}),table.render({elem:"#scm_assign_supplier_table",url:setter.baseUrl+"scm/pcborder/allSupplier",toolbar:"#supplierTableToolbar",cellMinWidth:80,page:!1,id:"scm_assign_supplier_table",where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{type:"checkbox"},{field:"id",title:"ID",hide:!0},{field:"supplierId",title:"供应商编号",hide:!1,align:"center",width:130},{field:"strengths",title:"类别",align:"center",width:130,templet:"#scm_ogstrengths"},{field:"companyName",title:"公司名",align:"center",hide:!1}]],done:function(i,l,n){var a=this.id,d=this.elem,r=d.next(),o=table.cache[a];layui.each(r.find(".layui-table-main").find("tr"),function(i,l){l=t(l);for(var n=l.data("index"),a=o[n],d=0;d<e.length;d++)a.id==e[d]&&(t(".layui-table-header thead").find("input[name = 'layTableCheckbox'][lay-filter='layTableAllChoose']").remove(),t(".layui-table-header thead").find(".layui-form-checkbox").remove(),r.find('tr[data-index="'+n+'"] [name="layTableCheckbox"]').attr("checked","checked"),r.find('tr[data-index="'+n+'"] [name="layTableCheckbox"]').attr("value",""),r.find('tr[data-index="'+n+'"] [name="layTableCheckbox"]').attr("disabled","disabled"),a[table.config.checkName]=!0)}),form.render(null,r.attr("lay-filter"))}}),table.on("toolbar(scm_assign_supplier_table)",function(e){var i=table.checkStatus(e.config.id);switch(e.event){case"getCheckData":var t=i.data;d=t}})})}}):"look"==e.event?admin.popup({title:"订单id:［"+a.id+"］-----------订单时间：［"+a.gmtCreate+"］",area:["45%","70%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_pcb_detail",a).done(function(){})}}):"submit"==e.event&&layer.confirm("确定提交？",function(){admin.req({type:"post",data:{orderId:a.id},url:setter.baseUrl+"scm/pcborder/skipSubmit",success:function(){layer.alert("供应商信息提交成功！",function(){table.reload("scm_Tabpcb_outgoing_quote"),layer.closeAll()})}})})}),table.render({elem:"#scm_Tabstencil_outgoing_quote",id:"scm_Tabstencil_outgoing_quote",url:setter.baseUrl+"scm/stencilorder/list",page:!0,toolbar:!0,done:function(){t(window).resize(),t(".layui-table-fixed-r").removeClass("layui-hide")},parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{field:"id",title:"ID",hide:!0},{field:"productNo",title:"Product No",align:"center",width:134},{field:"status",title:"状态",align:"center",width:100,templet:"#Tabtb-stencil-scm-outgoingQuote-status",minWidth:130},{field:"",title:"File",templet:"#stencil-file",align:"center"},{field:"gerberName",title:"gerberName",align:"center",width:224},{field:"gmtCreate",title:"gmtCreate",align:"center",width:165},{field:"totalStencilFee",title:"TotalStencilFee($)",align:"center",width:144},{field:"stencilType",title:"Stencil Type",align:"center",width:124},{field:"stencilSide",title:"Stencil Side",align:"center",width:124},{field:"quantity",title:"Quantity",align:"center",width:114},{field:"size",title:"Size",align:"center",width:80},{field:"quoteId",title:"Quote ID",align:"center",width:114,hide:!0},{field:"thickness",title:"Thickness",align:"center",width:114,hide:!0},{field:"existingFiducials",title:"Existing Fiducials",align:"center",width:145,hide:!0},{field:"stencilSizeX",title:"stencilSizeX",align:"center",width:124,hide:!0},{field:"stencilSizeY",title:"stencilSizeY",align:"center",width:124,hide:!0},{field:"stencilAreaX",title:"stencilSizeY",align:"center",width:124,hide:!0},{field:"stencilAreaY",title:"stencilSizeY",align:"center",width:124,hide:!0},{field:"userId",title:"User ID",align:"center",width:100,hide:!0},{field:"gmtModified",title:"gmtModified",hide:!0,width:124},{field:"weight",title:"Weight",align:"center",width:85},{field:"gerberPath",title:"gerberPath",hide:!0,width:124},{field:"note",title:"Note",align:"center",width:80,hide:!0},{title:"操作",fixed:"right",align:"center",toolbar:"#Tabtb-stencil-scm-outgoingQuote-option",width:260}]]}),table.on("tool(scm_Tabstencil_outgoing_quote)",function(e){var i,n,a=e.data,d=null;"assign"===e.event?admin.popup({title:"指定供应商",area:["912px","545px"],btn:["提交","跳过提交","取消"],yes:function(e,t){var l=table.checkStatus("scm_assign_supplier_table",a),n=l.data,d=n.map(function(e){return e.id}).join(",");console.log("ids:"+d);for(var r=[d.split(",")],o=new Array,c=i.toString(),s=0;s<r[0].length;s++){if(c.indexOf(r[0][s].toString())>-1)for(var h=0;h<i.length;h++)if(r[0][s]==parseInt(i[h])){o.push(parseInt(r[0][s]));break}for(var g=0;g<o.length;g++)parseInt(r[0][s])==o[g]&&r[0].splice(s,1)}admin.req({url:setter.baseUrl+"scm/stencilorder/assignStencilOrderToSupplier",type:"POST",data:{orderId:a.id,supplierIds:r[0].toString(),isInternal:a.isInternal,onlineOid:a.onlineOid},success:function(i){0==i.code?(layer.msg("指派成功！"),layer.close(e)):layer.msg(i.msg)}})},btn2:function(e,i){t("#assignSupplierTbData").click(),layer.confirm("确定跳过提交？",function(){var e=d.map(function(e){return e.id}).join(","),i=e.split(",");console.log(i);for(var r=0;r<n.length;r++)i=t.grep(i,function(e){return e!=n[r]});if(i.length<1)return layer.msg("请选择一条要跳过提交的数据！"),console.log("supplierArr:"+i),!1;i=l.ArrayClearRepeat(i),console.log("supplierArr:"+i);var o={id:a.id,supplierIds:i.toString(),isInternal:a.isInternal,onlineOid:a.onlineOid};console.log(o),admin.req({url:setter.baseUrl+"scm/stencilorder/skipStencilSubmit",data:o,success:function(e){layer.alert("成功跳过提交!",function(){d=null,layer.closeAll()})}})})},end:function(){},success:function(e,l){view(this.id).render("scmManagement/assign_supplier",a).done(function(){var e;admin.req({type:"post",url:setter.baseUrl+"scm/stencilorder/assignedStencilSupplierIds",data:{oid:a.id},async:!1,success:function(t){e=n=t.data,i=t.data}}),console.log(e),table.render({elem:"#scm_assign_supplier_table",url:setter.baseUrl+"scm/pcborder/allSupplier",toolbar:"#supplierTableToolbar",cellMinWidth:80,page:!1,id:"scm_assign_supplier_table",where:{access_token:layui.data("layuiAdmin").access_token},cols:[[{type:"checkbox"},{field:"id",title:"ID",hide:!0},{field:"supplierId",title:"供应商编号",hide:!1,align:"center",width:130},{field:"strengths",title:"类别",align:"center",width:130,templet:"#scm_ogstrengths"},{field:"companyName",title:"公司名",align:"center",hide:!1}]],done:function(i,l,n){var a=this.id,d=this.elem,r=d.next(),o=table.cache[a];layui.each(r.find(".layui-table-main").find("tr"),function(i,l){l=t(l);for(var n=l.data("index"),a=o[n],d=0;d<e.length;d++)a.id==e[d]&&(t(".layui-table-header thead").find("input[name = 'layTableCheckbox'][lay-filter='layTableAllChoose']").remove(),t(".layui-table-header thead").find(".layui-form-checkbox").remove(),r.find('tr[data-index="'+n+'"] [name="layTableCheckbox"]').attr("checked","checked"),r.find('tr[data-index="'+n+'"] [name="layTableCheckbox"]').attr("value",""),r.find('tr[data-index="'+n+'"] [name="layTableCheckbox"]').attr("disabled","disabled"),console.log(r.find('tr[data-index="'+n+'"] [name="layTableCheckbox"]').text()),a[table.config.checkName]=!0)}),form.render(null,r.attr("lay-filter"))}}),table.on("toolbar(scm_assign_supplier_table)",function(e){var i=table.checkStatus(e.config.id);switch(e.event){case"getCheckData":var t=i.data;d=t}})})}}):"look"==e.event&&admin.popup({title:"订单号［"+a.productNo+"]---订单时间［"+a.gmtCreate+"］",area:["45%","70%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_stencil_detail",a).done(function(){})}})}),form.on("submit(LAY-app-orderReview-search)",function(e){var i=e.field;delete i.quiz,table.reload("or_Tabpcb",{where:i})}),element.on("tab(pcdorstencil_tab)",function(e){var i=e.index;form.on("submit(LAY-app-orderReview-search)",function(e){var t=e.field;delete t.quiz,0===i?(layer.msg("PCBOrders"),table.reload("or_Tabpcb",{where:t})):1===i&&(layer.msg("StencilOrders"),table.reload("scm_Tabstencil_outgoing_quote",{where:t}))})}),t("#outgoingQuote-operation").on("click",function(){t(this).text("隐藏操作"==t(this).text()?"显示操作":"隐藏操作"),t(".layui-table-fixed-r").toggle("slow")}),/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)&&(t("#orderReview_searll").css({display:""}),t("#orderReview_pcsear").css({display:"none"}),form.on("select(orderReview-search-select)",function(e){var i=e.value,l=e.elem.selectedIndex,n=e.elem.options[l].text,a=t("#orderReview_sinp");null!=i||""!=i?(a.attr({placeholder:n}),t("input[id='orderReview_sinp']").attr("name",i)):a.attr("placeholder","请选取搜索条件")})),e("scm_outgoingQuote",{})});