/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate","jsTools"],function(e){function t(){table.render({elem:"#interior_order_Tabpcb",url:setter.baseUrl+"/epc/pcborder/internalOkPay",toolbar:"#interior_order_option",cellMinWidth:80,id:"interior_order_Tabpcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"productNo",title:"内部型号",minWidth:130},{field:"status",title:"状态",align:"center",templet:"#interiorOrderStatus",width:110},{field:"orderType",title:"订单类型",width:110,templet:"#order_type"},{field:"pcbName",title:"客户型号",width:130},{field:"invoiceNo",title:"合同号",width:152},{field:"orderNo",title:"客户PO"},{field:"courierName",title:"快递公司"},{field:"courierNumber",title:"快递单号"},{field:"gmtCreate",title:"创建时间"},{field:"gmtModified",title:"修改时间"},{field:"gerberName",title:"文件名",minWidth:160,hide:!0},{field:"pcbType",title:"PCB类型",minWidth:130,hide:!0},{field:"dimensionsX",title:"单只(X)",hide:!0},{field:"dimensionsY",title:"单只(Y)",hide:!0},{field:"panelSizeX",title:"Panel(X)",width:90,hide:!0},{field:"panelSizeY",title:"Panel(Y)",width:90,hide:!0},{field:"panelWayX",title:"PanelWay(X)",width:110,hide:!0},{field:"panelWayY",title:"PanelWay(Y)",width:110,hide:!0},{field:"finishThickness",title:"板厚",hide:!0},{field:"layerNum",title:"层数",width:80,hide:!0},{field:"surfaceFinish",title:"表面处理",hide:!0},{field:"quantityPcs",title:"PCS数量",hide:!0},{field:"quantityPanel",title:"Panel数量",hide:!0},{field:"engineeringFee",title:"工程费",hide:!0},{field:"boardFee",title:"板费",hide:!0},{field:"testCostFee",title:"测试费",hide:!0},{field:"toolingFee",title:"工具费",hide:!0},{field:"overworkFee",title:"加急费",hide:!0},{field:"postFee",title:"运费",hide:!0},{field:"subtotal",title:"总价",hide:!0},{field:"boardType",title:"出货方式",hide:!0},{field:"areaSq",title:"面积",hide:!0},{field:"material",title:"材料",hide:!0},{field:"productCode",title:"材料型号",hide:!0},{field:"productNo",title:"材料商",hide:!0},{field:"tg",title:"TG",hide:!0},{field:"cti",title:"CTI",hide:!0},{field:"halogenFree",title:"无卤素",hide:!0},{field:"outerLayerCopper",title:"外层铜厚",hide:!0},{field:"innerLayerCopper",title:"内层铜厚",hide:!0},{field:"heatConductivity",title:"导热系数",hide:!0},{field:"silkScreenTopColor",title:"字符颜色",hide:!0},{field:"solderMaskTopColor",title:"阻焊颜色",hide:!0},{field:"pthCopper",title:"孔铜",hide:!0},{field:"remark",title:"备注",hide:!0},{field:"buildTime",title:"交期",hide:!0},{field:"weight",title:"重量",hide:!0},{field:"thickness",title:"表面处理厚度",hide:!0},{field:"surfaceArea",title:"沉金面积",hide:!0},{field:"minHoleSize",title:"最小孔",hide:!0},{field:"nofHoles",title:"孔数",hide:!0},{field:"viaProcess",title:"过孔方式",hide:!0},{field:"stackUp",title:"压合",hide:!0},{field:"nofCore",title:"芯板数量",hide:!0},{field:"nofPp",title:"PP数量",hide:!0},{field:"innerMinSpacing",title:"内层(线宽/线距)",hide:!0},{field:"outerMinSpacing",title:"外层最小(线宽/线距)",hide:!0},{field:"bgaSize",title:"BGA大小",hide:!0},{field:"testPoinType",title:"测试类型",hide:!0},{field:"testPoint",title:"测试点",hide:!0},{field:"testPointType",title:"测试方式",hide:!0},{field:"userId",title:"用户ID",hide:!0},{field:"uuid",title:"uuid",hide:!0},{field:"panelRoutingPath",title:"锣程",hide:!0},{field:"bevellingCamfer",title:"斜边",hide:!0},{field:"blindHoles",title:"盲孔",hide:!0},{field:"buriedHoles",title:"埋孔",hide:!0},{field:"carbon",title:"碳油",hide:!0},{field:"contrlImpeance",title:"阻抗",hide:!0},{field:"deepMillRouting",title:"控深锣",hide:!0},{field:"punchingHoles",title:"冲孔数",hide:!0},{field:"punchingSlots",title:"冲槽数",hide:!0},{field:"peelable",title:"兰胶",hide:!0},{field:"peelableBrand",title:"兰胶型号",hide:!0},{field:"edgePlated",title:"金属边",hide:!0},{field:"halfHoleLated",title:"半孔板",hide:!0},{field:"orderId",title:"订单ID",hide:!0},{field:"orderNo",title:"订单号",hide:!0},{field:"invoiceNo",title:"合同号",hide:!0},{field:"id",title:"ID",hide:!0},{field:"userId",title:"User ID",hide:!0},{field:"gerberPath",title:"gerberPath",hide:!0},{field:"isExistIndicator",title:"isExistIndicator",hide:!0},{field:"isExistSmt",title:"isExistSmt",hide:!0},{field:"quoteConfigIdList",title:"quoteConfigIdList",hide:!0},{field:"quoteConfigIds",title:"quoteConfigIds",hide:!0},{field:"quoteGerberName",title:"quoteGerberName",hide:!0},{field:"quoteGerberPath",title:"quoteGerberPath",hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",hide:!0},{field:"solderMaskBotColor",title:"solderMaskBotColor",hide:!0},{fixed:"right",title:"操作",toolbar:"#interior_order_Bar",width:256}]],done:function(e,t,i){var l=e.data;o=l}})}function i(){table.render({elem:"#interior_order_Tabstencil",url:setter.baseUrl+"epc/stencilorder/internalOkPay",toolbar:"#interior_order_optionS",cellMinWidth:80,id:"interior_order_Tabstencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"productNo",title:"内部型号",minWidth:130},{field:"status",title:"状态",templet:"#interiorOrderStatus",width:110},{field:"orderType",title:"订单类型",Width:110,templet:"#order_type"},{field:"gerberName",title:"文件名",minWidth:160},{field:"pcbName",title:"F/N",minWidth:130},{field:"orderNo",title:"客户PO"},{field:"invoiceNo",title:"合同单号",minWidth:130},{field:"gmtCreate",title:"创建时间"},{field:"gmtModified",title:"修改时间"},{field:"quoteOrderNo",title:"报价单号",minWidth:130,hide:!0},{field:"pcbType",title:"PCB类型",minWidth:130,hide:!0},{field:"dimensionsX",title:"单只(X)",hide:!0},{field:"dimensionsY",title:"单只(Y)",hide:!0},{field:"panelSizeX",title:"Panel(X)",width:90,hide:!0},{field:"panelSizeY",title:"Panel(Y)",width:90,hide:!0},{field:"panelWayX",title:"PanelWay(X)",width:110,hide:!0},{field:"panelWayY",title:"PanelWay(Y)",width:110,hide:!0},{field:"finishThickness",title:"板厚",hide:!0},{field:"layerNum",title:"层数",width:80,hide:!0},{field:"surfaceFinish",title:"表面处理",hide:!0},{field:"quantityPcs",title:"PCS数量",hide:!0},{field:"quantityPanel",title:"Panel数量",hide:!0},{field:"engineeringFee",title:"工程费",hide:!0},{field:"boardFee",title:"板费",hide:!0},{field:"testCostFee",title:"测试费",hide:!0},{field:"toolingFee",title:"工具费",hide:!0},{field:"overworkFee",title:"加急费",hide:!0},{field:"postFee",title:"运费",hide:!0},{field:"subtotal",title:"总价",hide:!0},{field:"boardType",title:"出货方式",hide:!0},{field:"areaSq",title:"面积",hide:!0},{field:"material",title:"材料",hide:!0},{field:"productCode",title:"材料型号",hide:!0},{field:"productNo",title:"材料商",hide:!0},{field:"tg",title:"TG",hide:!0},{field:"cti",title:"CTI",hide:!0},{field:"halogenFree",title:"无卤素",hide:!0},{field:"outerLayerCopper",title:"外层铜厚",hide:!0},{field:"innerLayerCopper",title:"内层铜厚",hide:!0},{field:"heatConductivity",title:"导热系数",hide:!0},{field:"silkScreenTopColor",title:"字符颜色",hide:!0},{field:"solderMaskTopColor",title:"阻焊颜色",hide:!0},{field:"pthCopper",title:"孔铜",hide:!0},{field:"remark",title:"备注",hide:!0},{field:"buildTime",title:"交期",hide:!0},{field:"weight",title:"重量",hide:!0},{field:"thickness",title:"表面处理厚度",hide:!0},{field:"surfaceArea",title:"沉金面积",hide:!0},{field:"minHoleSize",title:"最小孔",hide:!0},{field:"nofHoles",title:"孔数",hide:!0},{field:"viaProcess",title:"过孔方式",hide:!0},{field:"stackUp",title:"压合",hide:!0},{field:"nofCore",title:"芯板数量",hide:!0},{field:"nofPp",title:"PP数量",hide:!0},{field:"innerMinSpacing",title:"内层(线宽/线距)",hide:!0},{field:"outerMinSpacing",title:"外层最小(线宽/线距)",hide:!0},{field:"bgaSize",title:"BGA大小",hide:!0},{field:"testPoinType",title:"测试类型",hide:!0},{field:"testPoint",title:"测试点",hide:!0},{field:"testPointType",title:"测试方式",hide:!0},{field:"userId",title:"用户ID",hide:!0},{field:"uuid",title:"uuid",hide:!0},{field:"panelRoutingPath",title:"锣程",hide:!0},{field:"bevellingCamfer",title:"斜边",hide:!0},{field:"blindHoles",title:"盲孔",hide:!0},{field:"buriedHoles",title:"埋孔",hide:!0},{field:"carbon",title:"碳油",hide:!0},{field:"contrlImpeance",title:"阻抗",hide:!0},{field:"deepMillRouting",title:"控深锣",hide:!0},{field:"punchingHoles",title:"冲孔数",hide:!0},{field:"punchingSlots",title:"冲槽数",hide:!0},{field:"peelable",title:"兰胶",hide:!0},{field:"peelableBrand",title:"兰胶型号",hide:!0},{field:"edgePlated",title:"金属边",hide:!0},{field:"halfHoleLated",title:"半孔板",hide:!0},{field:"orderId",title:"订单ID",hide:!0},{field:"orderNo",title:"订单号",hide:!0},{field:"invoiceNo",title:"合同号",hide:!0},{field:"id",title:"ID",hide:!0},{field:"userId",title:"User ID",hide:!0},{field:"gerberPath",title:"gerberPath",hide:!0},{field:"isExistIndicator",title:"isExistIndicator",hide:!0},{field:"isExistSmt",title:"isExistSmt",hide:!0},{field:"quoteConfigIdList",title:"quoteConfigIdList",hide:!0},{field:"quoteConfigIds",title:"quoteConfigIds",hide:!0},{field:"quoteGerberName",title:"quoteGerberName",hide:!0},{field:"quoteGerberPath",title:"quoteGerberPath",hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",hide:!0},{field:"solderMaskBotColor",title:"solderMaskBotColor",hide:!0},{fixed:"right",title:"操作",toolbar:"#interior_order_BarS",minWidth:256,width:256}]],done:function(e,t,i){var l=e.data;n=l}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var l=layui.jquery,d=layui.jsTools,r={orderType:0,customerSn:null};t();var o,n;element.on("tab(tab-internalQuote)",function(e){r.orderType=e.index,1===r.orderType?i():2===r.orderType?console.log("SMT订单选项卡"):t()}),table.on("toolbar(interior_order_Tabpcb)",function(e){var t=table.checkStatus(e.config.id);switch(e.event){case"okquote":var i=t.data.map(function(e){return e.invoiceNo}).join(",");layer.confirm("确定提交？",function(){admin.req({type:"post",url:setter.baseUrl+"epc/pcborder/submitInternalOrder",data:{contractNos:i},success:function(e){layer.msg("订单信息修改成功"),layui.table.reload("interior_order_Tabpcb")},error:function(e){layer.msg("订单信息修改失败，请稍后再试！")}})});break;case"getCheckLength":var l=t.data;layer.msg("选中了："+l.length+" 个");break;case"isAll":layer.msg(t.isAll?"全选":"未全选")}}),form.on("submit(interior-order-search)",function(e){var t=e.field;console.log(t),table.reload("interior_order_Tabpcb",{where:t})}),table.on("tool(interior_order_Tabpcb)",function(e){var t=e.data;if("edit"==e.event)admin.popup({title:"编辑PCB订单信息",btn:["立即提交","取消"],area:["76%","90%"],yes:function(){l(".submit-ok").click()},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderPCB_update",t).done(function(){console.log(t),form.render(null,""),form.on("submit(LAY-pcborder-update-submit)",function(e){var t=e.field;return console.log("提交的字段信息："+JSON.stringify(t)),admin.req({type:"post",url:setter.baseUrl+"epc/pcborder/update",data:t,done:function(e){layer.msg("订单信息修改成功"),layui.table.reload("interior_order_Tabpcb")},fail:function(e){layer.msg("订单信息修改失败，请稍后再试！")}}),layer.close(i),!1})})}});else if("search"==e.event){layer.msg("PCB订单合同");for(var i=t.invoiceNo,r=t.userId,n=t.invoiceNo,a=new Object,s=0,c=0;c<o.length;c++)n==o[c].invoiceNo&&(a[s]=o[c],s+=1);var f={data:{}};admin.req({type:"post",data:{contractNo:i},url:setter.baseUrl+"epc/pcborder/infoByContractNo",success:function(e){var t,i="marketManagement/iframeWindow/quote_contractB",o=null,n=0;f.data=a;for(var c=0;c<e.data.length;c++)n+=parseFloat(e.data[c].totalFee);f.total=n,l.each(e,function(e,i){null==o||""==o?t=1:null!=o&&o!=i.productNo&&(t=2,layer.msg("选择了不同型号"))}),admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+r,success:function(e){f.userName=e.user.userName,f.companyName=e.user.companName,f.country=e.user.country,f.city=e.user.city,f.address=e.user.address,f.mobilePhone=e.user.mobilePhone,f.postcode=e.user.postcode,f.paymentType=e.user.paymentType,f.deliveryType=e.user.deliveryType,f.contact=e.user.contact,admin.popup({title:"内部合同",area:["100%","100%"],btn:["打印","关闭"],maxmin:!0,yes:function(e,i){var l;"1"==t?l="quoteContract_AllB":"2"==t&&(l="quoteContract_AllA"),document.body.innerHTML=document.getElementById(l).innerHTML,window.print(),window.location.reload()},success:function(e,r){f.htmlType=2,view(this.id).render(i,f).done(function(){if(console.log(f),o=null,1===t){var e,i=l(".contract-module-three-tab tbody tr").eq(0).find("td").size(),r=f.data.length;s<4?e=4:r>4&&(e=7);for(var n=i;n<e;n++)l(".contract-module-three-tab tbody").find("tr").append("<td></td>");if(4==e)for(var n=1;n<e;n++)l(".contract-module-three-tab tbody tr").find("td").eq(n).css({width:"27.3%"});else for(var n=1;n<e;n++)l(".contract-module-three-tab tbody tr").find("td").eq(n).css({width:"13.6%"})}var c,u=[],h=[];if(null!=a){for(var p=0,n=0;n<s;n++)u[n]=a[n].gmtModified,h[n]=a[n].gmtCreate,null==u[n]&&p++;p==s?(c=d.TimeContrast(h),console.log(h)):c=d.TimeContrast(u),l("#contractBotDate").text(c.substring(0,10)),l("#topDate").text(c.substring(0,10))}})}})}})}})}else"submit"==e.event?layer.confirm("确定要提交此订单？",function(){admin.req({type:"post",data:{contractNos:t.productNo},url:setter.baseUrl+"epc/pcborder/submitInternalOrder",success:function(e){layer.alert("订单提交成功"),table.reload("interior_order_Tabpcb"),layer.closeAll()}})}):"del"==e.event?layer.confirm("真的删除行么",function(i){admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"epc/pcborder/delete",success:function(){layer.alert("删除成功！"),e.del(),table.reload("interior_order_Tabpcb")}}),layer.close(i)}):"detail"==e.event&&admin.popup({title:"订单id:［"+t.id+"］-----------订单时间：［"+t.gmtCreate+"］",area:["45%","70%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_pcb_detail",t).done(function(){})}})}),table.on("toolbar(interior_order_Tabstencil)",function(e){var t=table.checkStatus(e.config.id);switch(e.event){case"okquote":var i=t.data.map(function(e){return e.invoiceNo}).join(",");layer.confirm("确定提交？",function(){admin.req({type:"post",url:setter.baseUrl+"epc/stencilorder/submitInternalOrder",data:{contractNos:i},success:function(e){layer.msg("订单信息修改成功"),layui.table.reload("interior_order_Tabstencil")},error:function(e){layer.msg("订单信息修改失败，请稍后再试！")}})})}}),table.on("tool(interior_order_Tabstencil)",function(e){var t=e.data;if("edit"==e.event)admin.popup({title:"编辑Stencil 钢网订单信息",area:["885px","550px"],btn:["立即提交","取消"],yes:function(){l(".submitStencilUpB").click(),table.reload("interior_order_Tabstencil")},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderStencil_updateB",t).done(function(){})}});else if("search"==e.event){layer.msg("钢网合同查看");for(var i=t.invoiceNo,r=t.invoiceNo,o=t.userId,a=new Object,s=0,c=0;c<n.length;c++)r==n[c].invoiceNo&&(a[s]=n[c],s+=1);var f={data:{}};admin.req({type:"post",data:{contractNo:i},url:setter.baseUrl+"epc/stencilorder/infoByContractNo",success:function(e){var t,i="marketManagement/iframeWindow/quote_contractS",r=null,n=0;f.data=a;for(var c=0;c<e.data.length;c++)n+=parseFloat(e.data[c].totalStencilFee);f.total=n,l.each(e,function(e,i){null==r||""==r?t=1:null!=r&&r!=i.productNo&&(t=2)}),admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+o,success:function(e){f.userName=e.user.userName,f.companyName=e.user.companName,f.country=e.user.country,f.city=e.user.city,f.address=e.user.address,f.mobilePhone=e.user.mobilePhone,f.postcode=e.user.postcode,f.paymentType=e.user.paymentType,f.deliveryType=e.user.deliveryType,f.contact=e.user.contact,admin.popup({title:"内部合同",area:["100%","100%"],btn:["打印","关闭"],maxmin:!0,yes:function(e,t){var i;document.body.innerHTML=document.getElementById(i).innerHTML,window.print(),window.location.reload()},success:function(e,t){f.htmlType=2,console.log(f),view(this.id).render(i,f).done(function(){r=null;var e,t=[],i=[];if(null!=a){for(var o=0,n=0;n<s;n++)t[n]=a[n].gmtModified,i[n]=a[n].gmtCreate,null==t[n]&&o++;o==s?(e=d.TimeContrast(i),console.log(i)):e=d.TimeContrast(t),l("#contractBotDateS").text(e.substring(0,10)),l("#topDate").text(e.substring(0,10))}})}})}})}})}else"submit"==e.event?layer.confirm("确定要提交此订单？",function(){admin.req({type:"post",data:{contractNos:t.invoiceNo},url:setter.baseUrl+"epc/stencilorder/submitInternalOrder",success:function(e){layer.alert("订单提交成功"),table.reload("interior_order_Tabstencil"),layer.closeAll()}})}):"del"==e.event?layer.confirm("真的删除行么",function(i){admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"epc/stencilorder/delete",success:function(){layer.alert("删除成功！"),e.del(),table.reload("interior_order_Tabstencil")}}),layer.close(i)}):"detail"==e.event&&admin.popup({title:"订单号［"+t.productNo+"]---订单时间［"+t.gmtCreate+"］",area:["837px","373px"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_stencil_detail",t).done(function(){})}})}),e("market_interiorOrder",{})});