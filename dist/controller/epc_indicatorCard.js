/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";function _defineProperty(e,i,t){return i in e?Object.defineProperty(e,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[i]=t,e}layui.define(["admin","table","index","element","form","laydate","upload","uploadCommon"],function(e){function i(){var e;table.render({elem:"#epc_Tabpcb_ok_payment_order",url:setter.baseUrl+"epc/pcborder/list",toolbar:"#tbarIndcard",cellMinWidth:80,id:"epc_Tabpcb_ok_payment_order",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"id",title:"ID",hide:!0},{field:"productNo",fixed:"left",title:"Product No",align:"center",width:114},{field:"status",title:"状态",hide:!1,align:"center",templet:"#Tabtb-pcb-epc-indicatorCard-status",width:130},{field:"gerberName",title:"原始资料",align:"center",width:254},{field:"quoteGerberName",title:"正式资料",align:"center",width:254,templet:"#quote_gerber_file"},{field:"productionGerberName",title:"生产资料",align:"center",width:254,templet:"#quote_gerber_file"},{field:"gmtCreate",title:"Create Time",align:"center",width:165},{field:"pcbType",title:"PCB Type",align:"center",width:114},{field:"layerNum",title:"Layer",align:"center",width:114},{field:"finishThickness",title:"Finish Thickness",align:"center",width:134},{field:"quantityPcs",title:"Quantity Pcs",align:"center",width:114},{field:"areaSq",title:"Area Sq",align:"center",width:110},{field:"userId",title:"User ID",width:80,hide:!0},{field:"engineeringRemark",title:"工程备注",width:80,hide:!0},{field:"orderId",title:"Order ID",align:"center",width:96,hide:!0},{field:"orderType",title:"Order Type",align:"center",width:109,hide:!0},{field:"dimensionsX",title:"DimensionsX",templet:"#type",align:"center",width:114,hide:!0},{field:"dimensionsY",title:"DimensionsY",align:"center",width:114,hide:!0},{field:"panelSizeX",title:"PanelSizeX",align:"center",width:114,hide:!0},(e={field:"panelSizeX",title:"PanelSizeY",align:"center"},_defineProperty(e,"align","center"),_defineProperty(e,"width",114),_defineProperty(e,"hide",!0),e),{field:"panelWayX",title:"PanelWayX",align:"center",width:114,hide:!0},{field:"panelWayY",title:"PanelWayY",align:"center",width:114,hide:!0},{field:"quantityPanel",title:"Quantity Panel",align:"center",width:124,hide:!0},{field:"tg",title:"TG",align:"center",width:80,hide:!0},{field:"material",title:"Material",align:"center",width:110,hide:!0},{field:"cti",title:"CTI",align:"center",width:114,hide:!0},{field:"productCode",title:"Product Code",align:"center",width:124,hide:!0},{field:"halogenFree",title:"Halogen Free",align:"center",width:114,hide:!0},{field:"heatConductivity",title:"Heat Conductivity",align:"center",width:150,hide:!0},{field:"innerLayerCopper",title:"InnerLayer Copper",align:"center",width:150,hide:!0},{field:"stackUp",title:"Stack Up",align:"center",width:95,hide:!0},{field:"innerMinTrack",title:"InnerMin Track",align:"center",width:134,hide:!0},{field:"innerMinSpacing",title:"InnerMin Spacing",align:"center",width:134,hide:!0},{field:"outerLayerCopper",title:"Outer Layer Copper",align:"center",width:134,hide:!0},{field:"outerMinTrack",title:"outerMinTrack",align:"center",width:124,hide:!0},{field:"bgaSize",title:"bgaSize",align:"center",width:90,hide:!0},{field:"outerMinSpacing",title:"outerMinSpacing",align:"center",width:134,hide:!0},{field:"minHoleSize",title:"minHoleSize",align:"center",width:124,hide:!0},{field:"pthCopper",title:"pthCopper",align:"center",width:114,hide:!0},{field:"solderMaskTopColor",title:"solderMaskTopColor",align:"center",width:134,hide:!0},{field:"viaProcess",title:"viaProcess",align:"center",width:124,hide:!0},{field:"solderMaskBotColor",title:"SolderMaskBotColor",align:"center",width:134,hide:!0},{field:"silkScreenTopColor",title:"SilkScreenTopColor",align:"center",width:134,hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",align:"center",width:134,hide:!0},{field:"peelable",title:"Peelable",align:"center",width:85,hide:!0},{field:"peelableBrand",title:"PeelableBrand",align:"center",width:118,hide:!0},{field:"surfaceFinish",title:"SurfaceFinish",align:"center",width:114,hide:!0},{field:"thickness",title:"Thickness",align:"center",width:96,hide:!0},{field:"surfaceArea",title:"SurfaceArea",align:"center",width:114,hide:!0},{field:"panelRoutingPath",title:"PanelRoutingPath",align:"center",width:124,hide:!0},{field:"punchingHoles",title:"PunchingHoles",align:"center",width:124,hide:!0},{field:"punchingSlots",title:"PunchingSlots",align:"center",width:124,hide:!0},{field:"testPoint",title:"TestPoint",align:"center",width:114,hide:!0},{field:"testPointType",title:"TestPointType",align:"center",width:124,hide:!0},{field:"testPoinType",title:"TestPoinType",align:"center",width:114,hide:!0},{field:"testCost",title:"TestCost",align:"center",width:90,hide:!0},{field:"blindHoles",title:"BlindHoles",align:"center",width:92,hide:!0},{field:"edgePlated",title:"EdgePlated",align:"center",width:100,hide:!0},{field:"halfHoleLated",title:"HalfHoleLated",align:"center",width:114,hide:!0},{field:"contrlImpeance",title:"ContrlImpeance",align:"center",width:114,hide:!0},{field:"buriedHoles",title:"BuriedHoles",align:"center",width:114,hide:!0},{field:"carbon",title:"Carbon",align:"center",width:80,hide:!0},{field:"bevellingCamfer",title:"BevellingCamfer",align:"center",width:134,hide:!0},{field:"deepMillRouting",title:"deepMillRouting",align:"center",width:134,hide:!0},_defineProperty({field:"gerberPath",title:"gerberPath",align:"center",hide:!0,width:114},"hide",!0),_defineProperty({field:"productionGerberPath",title:"生产资料路径",align:"center",hide:!0,width:114},"hide",!0),{field:"remark",title:"Remark",align:"center",width:80,hide:!0},{field:"differentDesign",title:"DifferentDesign",align:"center",width:134,hide:!0},{field:"gmtModified",title:"gmtModified",align:"center",width:114,hide:!0},{field:"uuid",title:"UuId",align:"center",width:80,hide:!0},{field:"buildTime",title:"BuildTime",align:"center",width:114,hide:!0},{field:"isExistSmt",title:"IsExistSmt",align:"center",width:114,hide:!0},{field:"weight",title:"Weight",align:"center",width:80,hide:!0},{field:"nofCore",title:"NofCore",align:"center",width:80,hide:!0},{field:"nofPp",title:"NofPp",align:"center",width:80,hide:!0},{field:"nofHoles",title:"NofHoles",align:"center",width:90,hide:!0},{title:"操作",width:290,align:"center",fixed:"right",toolbar:"#Tabtb-pcb-epc-indicatorCard-option"}]],done:function(e,i,t){/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)&&d("#LAY_app_body").each(function(e){d("a[lay-event='edit']").html('<i class="layui-icon layui-icon-edit"></i>'),d("a[lay-event='search']").html('<i class="layui-icon layui-icon-search"></i>'),d("a[lay-event='del']").html('<i class="layui-icon layui-icon-delete"></i>'),d(".laytable-cell-1-0-22").css({width:"130px"})}),a=e.data,layui.each(d(".pcbReupload"),function(e,i){var t,n=i.id.substring(11);upload.render({elem:i,url:setter.baseUrl+"sys/oss/upload/geber?access_token="+layui.data("layuiAdmin").access_token,field:"file",data:{id:n},accept:"file",exts:"zip|rar|7z",before:function(e){e.preview(function(e,i,n){t=i.name})},done:function(e){var i=e.url,l=/\[(.+?)\]/g,a=i.match(l),r=a[0].replace(/\[|]/g,""),d={data:{quoteGerberName:t,quoteGerberPath:r,id:n,access_token:layui.data("layuiAdmin").access_token},url:setter.baseUrl+"epc/pcborder/update",retab:"epc_Tabpcb_ok_payment_order"};admin.req({type:"post",url:d.url,data:d.data,success:function(){layer.alert("更改正式资料成功"),table.reload("epc_Tabpcb_ok_payment_order")}})},error:function(){layer.msg("文件上传失败！")}})})}})}function t(){var e;table.render({elem:"#epc_Tabstencil_ok_payment_order",url:setter.baseUrl+"epc/stencilorder/epcStencilOrderList",toolbar:"#tbarIndcardS",cellMinWidth:80,id:"epc_Tabstencil_ok_payment_order",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"id",title:"ID",hide:!0},{field:"productNo",fixed:"left",title:"Product No",align:"center",width:114},{field:"status",title:"状态",hide:!1,align:"center",templet:"#Tabtb-pcb-epc-indicatorCard-status",width:130},{field:"gerberName",title:"原始资料",align:"center",width:254},{field:"quoteGerberName",title:"正式资料",align:"center",width:254,templet:"#quote_gerber_fileS"},{field:"gmtCreate",title:"Create Time",align:"center",width:165},{field:"pcbType",title:"PCB Type",align:"center",width:114},{field:"layerNum",title:"Layer",align:"center",width:114},{field:"finishThickness",title:"Finish Thickness",align:"center",width:134},{field:"quantityPcs",title:"Quantity Pcs",align:"center",width:114},{field:"areaSq",title:"Area Sq",align:"center",width:110},{field:"userId",title:"User ID",width:80,hide:!0},{field:"orderId",title:"Order ID",align:"center",width:96,hide:!0},{field:"orderType",title:"Order Type",align:"center",width:109,hide:!0},{field:"dimensionsX",title:"DimensionsX",templet:"#type",align:"center",width:114,hide:!0},{field:"dimensionsY",title:"DimensionsY",align:"center",width:114,hide:!0},{field:"panelSizeX",title:"PanelSizeX",align:"center",width:114,hide:!0},(e={field:"panelSizeX",title:"PanelSizeY",align:"center"},_defineProperty(e,"align","center"),_defineProperty(e,"width",114),_defineProperty(e,"hide",!0),e),{field:"panelWayX",title:"PanelWayX",align:"center",width:114,hide:!0},{field:"panelWayY",title:"PanelWayY",align:"center",width:114,hide:!0},{field:"quantityPanel",title:"Quantity Panel",align:"center",width:124,hide:!0},{field:"tg",title:"TG",align:"center",width:80,hide:!0},{field:"material",title:"Material",align:"center",width:110,hide:!0},{field:"cti",title:"CTI",align:"center",width:114,hide:!0},{field:"productCode",title:"Product Code",align:"center",width:124,hide:!0},{field:"halogenFree",title:"Halogen Free",align:"center",width:114,hide:!0},{field:"heatConductivity",title:"Heat Conductivity",align:"center",width:150,hide:!0},{field:"innerLayerCopper",title:"InnerLayer Copper",align:"center",width:150,hide:!0},{field:"stackUp",title:"Stack Up",align:"center",width:95,hide:!0},{field:"innerMinTrack",title:"InnerMin Track",align:"center",width:134,hide:!0},{field:"innerMinSpacing",title:"InnerMin Spacing",align:"center",width:134,hide:!0},{field:"outerLayerCopper",title:"Outer Layer Copper",align:"center",width:134,hide:!0},{field:"outerMinTrack",title:"outerMinTrack",align:"center",width:124,hide:!0},{field:"bgaSize",title:"bgaSize",align:"center",width:90,hide:!0},{field:"outerMinSpacing",title:"outerMinSpacing",align:"center",width:134,hide:!0},{field:"minHoleSize",title:"minHoleSize",align:"center",width:124,hide:!0},{field:"pthCopper",title:"pthCopper",align:"center",width:114,hide:!0},{field:"solderMaskTopColor",title:"solderMaskTopColor",align:"center",width:134,hide:!0},{field:"viaProcess",title:"viaProcess",align:"center",width:124,hide:!0},{field:"solderMaskBotColor",title:"SolderMaskBotColor",align:"center",width:134,hide:!0},{field:"silkScreenTopColor",title:"SilkScreenTopColor",align:"center",width:134,hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",align:"center",width:134,hide:!0},{field:"peelable",title:"Peelable",align:"center",width:85,hide:!0},{field:"peelableBrand",title:"PeelableBrand",align:"center",width:118,hide:!0},{field:"surfaceFinish",title:"SurfaceFinish",align:"center",width:114,hide:!0},{field:"thickness",title:"Thickness",align:"center",width:96,hide:!0},{field:"surfaceArea",title:"SurfaceArea",align:"center",width:114,hide:!0},{field:"panelRoutingPath",title:"PanelRoutingPath",align:"center",width:124,hide:!0},{field:"punchingHoles",title:"PunchingHoles",align:"center",width:124,hide:!0},{field:"punchingSlots",title:"PunchingSlots",align:"center",width:124,hide:!0},{field:"testPoint",title:"TestPoint",align:"center",width:114,hide:!0},{field:"testPointType",title:"TestPointType",align:"center",width:124,hide:!0},{field:"testPoinType",title:"TestPoinType",align:"center",width:114,hide:!0},{field:"testCost",title:"TestCost",align:"center",width:90,hide:!0},{field:"blindHoles",title:"BlindHoles",align:"center",width:92,hide:!0},{field:"edgePlated",title:"EdgePlated",align:"center",width:100,hide:!0},{field:"halfHoleLated",title:"HalfHoleLated",align:"center",width:114,hide:!0},{field:"contrlImpeance",title:"ContrlImpeance",align:"center",width:114,hide:!0},{field:"buriedHoles",title:"BuriedHoles",align:"center",width:114,hide:!0},{field:"carbon",title:"Carbon",align:"center",width:80,hide:!0},{field:"bevellingCamfer",title:"BevellingCamfer",align:"center",width:134,hide:!0},{field:"deepMillRouting",title:"deepMillRouting",align:"center",width:134,hide:!0},_defineProperty({field:"gerberPath",title:"gerberPath",align:"center",hide:!0,width:114},"hide",!0),{field:"remark",title:"Remark",align:"center",width:80,hide:!0},{field:"differentDesign",title:"DifferentDesign",align:"center",width:134,hide:!0},{field:"gmtModified",title:"gmtModified",align:"center",width:114,hide:!0},{field:"uuid",title:"UuId",align:"center",width:80,hide:!0},{field:"buildTime",title:"BuildTime",align:"center",width:114,hide:!0},{field:"isExistSmt",title:"IsExistSmt",align:"center",width:114,hide:!0},{field:"weight",title:"Weight",align:"center",width:80,hide:!0},{field:"nofCore",title:"NofCore",align:"center",width:80,hide:!0},{field:"nofPp",title:"NofPp",align:"center",width:80,hide:!0},{field:"nofHoles",title:"NofHoles",align:"center",width:90,hide:!0},{title:"操作",width:310,align:"center",fixed:"right",toolbar:"#Tabtb-stencil-epc-indicatorCard-option"}]],done:function(e,i,t){/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)&&d("#LAY_app_body").each(function(e){d("a[lay-event='edit']").html('<i class="layui-icon layui-icon-edit"></i>'),d("a[lay-event='search']").html('<i class="layui-icon layui-icon-search"></i>'),d("a[lay-event='del']").html('<i class="layui-icon layui-icon-delete"></i>'),d(".laytable-cell-1-0-22").css({width:"130px"})}),n(),r=e.data,layui.each(d(".stencilReupload"),function(e,i){var t,n=i.id.substring(15);upload.render({elem:i,url:setter.baseUrl+"sys/oss/upload/geber?access_token="+layui.data("layuiAdmin").access_token,field:"file",data:{id:n},accept:"file",exts:"zip|rar|7z",before:function(e){e.preview(function(e,i,n){t=i.name})},done:function(e){var i=e.url,l=/\[(.+?)\]/g,a=i.match(l),r=a[0].replace(/\[|]/g,""),d={data:{quoteGerberName:t,quoteGerberPath:r,id:n,access_token:layui.data("layuiAdmin").access_token},url:setter.baseUrl+"epc/stencilorder/update",retab:"epc_Tabstencil_ok_payment_order"};admin.req({type:"post",url:d.url,data:d.data,success:function(){layer.alert("更改正式资料成功"),table.reload(d.retab)}})},error:function(){layer.msg("文件上传失败！")}})})}})}function n(e){var i=d(".filewareFileS"),t=d("#addVersionBtn"),n=d("#cancelUploadBtn"),l=d("#showSpeed"),a=setter.baseUrl+"sys/oss/upload/geber?access_token="+layui.data("layuiAdmin").access_token;i.change(function(){var e=".filewareFileS"+p;e=d(e);var r,c,s=e.get(0).files[0],f={data:{quoteGerberName:s.name,quoteGerberPath:"",id:p,access_token:layui.data("layuiAdmin").access_token},url:setter.baseUrl+"epc/stencilorder/update",retab:"epc_Tabpcb_ok_payment_order"};r=".uploadPercentageS"+p,c=".btn-fileuploadS"+p;var h=d(r),u=o.uploadcommon(a,h,l,t,n,f);if(console.log(s),s){d(".file-tips").text("Gerber Name："+s.name),d(c).css("display","none"),d(r).css("display","block"),d(".upload-container").css("display","block"),t.attr("disabled",!1);var g=i.get(0).files[0];if(null==g)return void alert("固件文件不能为空");var y=new FormData;y.append("file",i.get(0).files[0]),u.uploadFile(y,function(e){alert(1),console.log(e)})}})}function l(e,i){var t=[],n=[];if(0==e.length)return e;if(i){for(var l=0;l<e.length;l++)n[e[l][i]]||(t.push(e[l]),n[e[l][i]]=!0);return t}for(var l=0;l<e.length;l++)n[e[l]]||(t.push(e[l]),n[e[l]]=!0);return t}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,laydate=layui.laydate,setter=layui.setter,element=layui.element,upload=layui.upload;var a,r,d=layui.jquery,o=layui.uploadCommon,c=[];({id:null,access_token:layui.data("layuiAdmin").access_token});i();var s={orderType:0};element.on("tab(indicator_card_tab)",function(e){s.orderType=e.index,1===s.orderType?t():2===s.orderType?console.log("SMT订单选项卡"):i()});var p;laydate.render({elem:"#gmtCreate"}),table.on("row(epc_Tabpcb_ok_payment_order)",function(e){var i=e.data;console.log(e.index),p=i.id,console.log("行id为："+p)}),table.on("row(epc_Tabstencil_ok_payment_order)",function(e){var i=e.data;p=i.id,console.log("行id为："+p)}),table.on("tool(epc_Tabpcb_ok_payment_order)",function(e){var i=e.data;if(console.log(i),"detail"===e.event)2===i.isExistIndicator?admin.req({type:"GET",url:setter.baseUrl+"epc/pcborderprocess/infos/"+i.id,done:function(e){i.pop=e.pop,admin.popup({title:"订单id:［"+i.id+"］-----------订单时间：［"+i.gmtCreate+"］",area:["45%","70%"],success:function(e,t){view(this.id).render("marketManagement/iframeWindow/order_pcb_detail",i).done(function(){})}})},fail:function(e){layer.msg("服务器异常，稍后再试！")}}):admin.popup({title:"订单id:［"+i.id+"］-----------订单时间：［"+i.gmtCreate+"］",area:["45%","70%"],success:function(e,t){view(this.id).render("marketManagement/iframeWindow/order_pcb_detail",i).done(function(){})}});else if("back"===e.event)layer.confirm("真的退回合同号为［"+i.productNo+"］吗",function(e){var t=(i.productNo,i.isInternal);admin.req({type:"post",url:setter.baseUrl+"epc/pcborder/backByIo",data:{id:i.id,isInternal:t,onlineOid:i.onlineOid,bid:i.businessId,sales:i.totalFee,onlineSales:i.subtotal},done:function(i){layer.msg("成功退回"),table.reload("epc_Tabpcb_ok_payment_order"),layer.close(e)},fail:function(e){layer.msg("服务器异常，稍后再试！")}})});else if("epc-write-indicator"===e.event)admin.popup({title:"编写指示卡",area:["45%","561px"],btn:["提交","取消"],yes:function(e,i){d("#LAY-pcborder-update-submit").click()},end:function(){localStorage.removeItem("saveBackResult")},success:function(e,t){view(this.id).render("epcManagement/Indicator_cardform",i).done(function(){form.render(null,""),form.on("submit(LAY-pcborder-update-submit)",function(e){var i=e.field;console.log(i),table.on("edit(indicator_listTab)",function(e){var t=e.data;t.pcbOrderId=i.id,t.provessId=e.data.id,c.unshift(t),console.log(c)}),c=l(c,"id"),i.processEntityList=c;var n=layui.data("layuiAdmin").access_token;return 0!=c.length?(d.ajax({type:"post",url:setter.baseUrl+"epc/pcborderprocess/saves",headers:{access_token:n},data:JSON.stringify(c),dataType:"json",contentType:"application/json;charset=utf-8",done:function(e){layer.msg("指示卡提交成功"),table.reload("epc_Tabpcb_ok_payment_order")},fail:function(e){layer.msg("订单信息修改失败，请稍后再试！")}}),c=[],layer.close(t),table.reload("epc_Tabpcb_ok_payment_order"),!1):void layer.msg("请至少写入一条工序！")})})}});else if("edit"===e.event)if(""!=i.quoteGerberName&&null!=i.quoteGerberName&&"undefined"!=typeof i.quoteGerberName){var t=i.id,n=i.isInternal,a=i.onlineOid;admin.popup({title:"审核订单[PCB]",area:["867px","325px"],id:"epc_incSH",btn:["审核","取消"],yes:function(){d("#epc_auditOrders").click()},success:function(e,l){view(this.id).render("epcManagement/iframeWindow/audit_orders",i).done(function(){form.render(),form.on("submit(epc_auditOrders)",function(e){var i=e.field;return i.id=t,i.isInternal=n,i.onlineOid=a,admin.req({type:"post",url:setter.baseUrl+"epc/pcborder/auditPcbOrder",data:i,done:function(){layer.alert("审核成功",function(){layui.table.reload("epc_Tabpcb_ok_payment_order"),layer.closeAll()})}}),!1})})}})}else{var r=d(this).parents("tr").attr("data-index");console.log("$dataIndex:"+r),layer.alert("请先上传正式资料！！！",function(e,i){layer.closeAll(),d(".layui-table-click[data-index="+r+"]").find("*[lay-event='fileMana']").click()})}else"fileMana"==e.event&&(i.orderType="pcbOrder",admin.popup({title:"PCB订单资料管理",area:["870px","303px"],success:function(e,t){view(this.id).render("epcManagement/iframeWindow/file_management",i).done(function(){})},end:function(){localStorage.removeItem("saveBackResult")}}))}),table.on("tool(epc_Tabstencil_ok_payment_order)",function(e){var i=e.data;if("detail"===e.event)2===i.isExistIndicator?admin.req({type:"GET",url:setter.baseUrl+"epc/pcborderprocess/infos/"+i.id,done:function(e){i.pop=e.pop,admin.popup({title:"订单id:［"+i.id+"］-----------订单时间：［"+i.gmtCreate+"］",area:["45%","70%"],success:function(e,t){view(this.id).render("marketManagement/iframeWindow/order_pcb_detail",i).done(function(){})}})},fail:function(e){layer.msg("服务器异常，稍后再试！")}}):admin.popup({title:"订单id:［"+i.id+"］-----------订单时间：［"+i.gmtCreate+"］",area:["45%","70%"],success:function(e,t){view(this.id).render("marketManagement/iframeWindow/order_stencil_detail",i).done(function(){})}});else if("back"===e.event)layer.confirm("真的退回钢网订单号为［"+i.invoiceNo+"］吗",function(e){admin.req({type:"post",url:setter.baseUrl+"epc/stencilorder/backByAo",data:{id:i.id,isInternal:i.isInternal,onlineOid:i.onlineOid,bid:i.businessId,sales:i.totalStencilFee,onlineSales:i.totalStencilFee},done:function(e){layer.msg("成功退回"),table.reload("epc_Tabstencil_ok_payment_order")},fail:function(e){layer.msg("服务器异常，稍后再试！")}}),layer.close(e)});else if("epc-write-indicator"===e.event)admin.popup({title:"编写指示卡",area:["45%","561px"],btn:["提交","取消"],yes:function(e,i){d("#LAY-pcborder-update-submit").click()},end:function(){localStorage.removeItem("saveBackResult")},success:function(e,t){view(this.id).render("epcManagement/Indicator_cardform",i).done(function(){form.render(null,""),form.on("submit(LAY-pcborder-update-submit)",function(e){var i=e.field;console.log(i),table.on("edit(indicator_listTab)",function(e){var t=e.data;t.pcbOrderId=i.id,t.provessId=e.data.id,c.unshift(t),console.log(c)}),c=l(c,"id"),i.processEntityList=c;var n=layui.data("layuiAdmin").access_token;return 0!=c.length?(d.ajax({type:"post",url:setter.baseUrl+"epc/pcborderprocess/saves",headers:{access_token:n},data:JSON.stringify(c),dataType:"json",contentType:"application/json;charset=utf-8",done:function(e){layer.msg("指示卡提交成功"),layui.table.reload("epc_Tabpcb_ok_payment_order")},fail:function(e){layer.msg("订单信息修改失败，请稍后再试！")}}),c=[],layer.close(t),!1):void layer.msg("请至少写入一条工序！")})})}});else if("edit"===e.event)if(""!=i.quoteGerberName&&null!=i.quoteGerberName&&"undefined"!=typeof i.quoteGerberName){var t=i.id,n=i.isInternal,a=i.onlineOid;admin.popup({title:"审核订单[钢网]",area:["867px","325px"],id:"epc_incSH",btn:["审核","取消"],yes:function(){d("#epc_auditOrders").click()},success:function(e,l){view(this.id).render("epcManagement/iframeWindow/audit_orders",i).done(function(){console.log(i),form.render(),form.on("submit(epc_auditOrders)",function(e){var i=e.field;return i.id=t,i.isInternal=n,i.onlineOid=a,admin.req({type:"post",url:setter.baseUrl+"epc/stencilorder/epcAuditStencilOrder",data:i,done:function(){layer.alert("钢网订单审核成功",function(){layui.table.reload("epc_Tabstencil_ok_payment_order"),layer.closeAll()})}}),!1})})}})}else{var r=d(this).parents("tr").attr("data-index");console.log("$dataIndex:"+r),layer.alert("请先上传正式资料！！！",function(e,i){layer.closeAll(),d(".layui-table-click[data-index="+r+"]").find("*[lay-event='fileMana']").click()})}else"pcb-sendback"===e.event?layer.confirm("确定退回订单［"+i.productNo+"］?",function(e){layer.msg("退回"+i.productNo),layui.table.reload("epc_Tabstencil_ok_payment_order"),layer.close(e)}):"fileMana"==e.event?(i.orderType="stencilOrder",admin.popup({title:"PCB订单资料管理",area:["45%","40%"],success:function(e,t){view(this.id).render("epcManagement/iframeWindow/file_management",i).done(function(){})},end:function(){localStorage.removeItem("saveBackResult")}})):"supplier_update"===e.event&&layer.msg("上传文件可能需要一定的时间，请稍后....")}),table.on("toolbar(epc_Tabstencil_ok_payment_order)",function(e){var i=table.checkStatus(e.config.id),t=i.data;switch(e.event){case"fileyzz":if(console.log("选择了"+t.length+"条数据！"),1==t.length){var n=t[0].id,l=t[0].gerberName,a=t[0].gerberPath;layer.confirm("确定要把原始资料转为正式资料？",function(){admin.req({type:"post",data:{quoteGerberName:l,quoteGerberPath:a,id:n},url:setter.baseUrl+"epc/stencilorder/update",success:function(e){layer.alert("原始资料已成功转为正式资料！"),table.reload("epc_Tabstencil_ok_payment_order")}})})}else 0==t.length?layer.msg("请选择！"):t.length>1&&layer.msg("最多只能选择一条数据！！！")}});var f={indicatorAddFile:function(){layer.msg("文件上传！")}};d(".layui-btn").on("click",function(){var e=d(this).data("type");f[e]?f[e].call(this):""}),form.on("submit(Indicator_card_search)",function(e){var i,t=e.field;0===s.orderType?i="epc_Tabpcb_ok_payment_order":1===s.orderType&&(i="epc_Tabstencil_ok_payment_order"),table.reload(i,{where:t})}),form.on("select(epcindicatorCard-sel-search)",function(e){d("*[lay-filter='Indicator_card_search']").click()}),d(".indicator-card-search input").bind("input propertychange",function(e){d("*[lay-filter='Indicator_card_search']").click()}),d("#indicatorCard-operation").on("click",function(){d(this).text("隐藏操作"==d(this).text()?"显示操作":"隐藏操作"),d(".layui-table-fixed-r").toggle("slow")}),e("epc_indicatorCard",{})});