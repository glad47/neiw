/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate","jsTools"],function(e){function t(){table.render({elem:"#interior_order_Tabpcb",url:setter.baseUrl+"/epc/pcborder/internalOkPay",toolbar:"#interior_order_option",cellMinWidth:80,id:"interior_order_Tabpcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"内部型号",width:130,fixed:"left"},{field:"businessName",title:"跟单员名字",width:100},{field:"status",title:"状态",align:"center",templet:"#interiorOrderStatus",width:117},{field:"payLogId",title:"支付情况",align:"center",templet:"#interiorPayLog",width:117},{field:"orderType",title:"订单类型",templet:"#order_type"},{field:"",title:"资料下载",templet:"#interiorOrder_downP",align:"center",width:107},{field:"pcbName",title:"客户型号",width:131},{field:"invoiceNo",title:"合同号",width:172},{field:"orderNo",title:"客户PO"},{field:"courierName",title:"快递公司",width:100},{field:"courierNo",title:"快递单号",width:150,templet:"#market_interior_courierNo"},{field:"gmtCreate",title:"创建时间",width:230},{field:"gmtModified",title:"修改时间",width:230},{field:"gerberName",title:"文件名",width:160,hide:!0},{field:"pcbType",title:"PCB类型",width:130,hide:!0},{field:"dimensionsX",title:"单只(X)",hide:!0},{field:"dimensionsY",title:"单只(Y)",hide:!0},{field:"panelSizeX",title:"Panel(X)",width:90,hide:!0},{field:"panelSizeY",title:"Panel(Y)",width:90,hide:!0},{field:"panelWayX",title:"PanelWay(X)",width:110,hide:!0},{field:"panelWayY",title:"PanelWay(Y)",width:110,hide:!0},{field:"finishThickness",title:"板厚",hide:!0},{field:"layerNum",title:"层数",width:80,hide:!0},{field:"surfaceFinish",title:"表面处理",hide:!0},{field:"quantityPcs",title:"PCS数量",hide:!0},{field:"quantityPanel",title:"Panel数量",hide:!0},{field:"engineeringFee",title:"工程费",hide:!0},{field:"boardFee",title:"板费",hide:!0},{field:"testCostFee",title:"测试费",hide:!0},{field:"toolingFee",title:"工具费",hide:!0},{field:"overworkFee",title:"加急费",hide:!0},{field:"postFee",title:"运费",hide:!0},{field:"subtotal",title:"总价",hide:!0},{field:"exchangeId",title:"币别",hide:!0,templet:"#exchangeId_flag"},{field:"boardType",title:"出货方式",hide:!0},{field:"areaSq",title:"面积",hide:!0},{field:"material",title:"材料",hide:!0},{field:"productCode",title:"材料型号",hide:!0},{field:"productNo",title:"材料商",hide:!0},{field:"tg",title:"TG",hide:!0},{field:"cti",title:"CTI",hide:!0},{field:"halogenFree",title:"无卤素",hide:!0},{field:"outerLayerCopper",title:"外层铜厚",hide:!0},{field:"innerLayerCopper",title:"内层铜厚",hide:!0},{field:"heatConductivity",title:"导热系数",hide:!0},{field:"silkScreenTopColor",title:"字符颜色",hide:!0},{field:"solderMaskTopColor",title:"阻焊颜色",hide:!0},{field:"pthCopper",title:"孔铜",hide:!0},{field:"remark",title:"备注",hide:!0},{field:"buildTime",title:"交期",hide:!0},{field:"weight",title:"重量",hide:!0},{field:"thickness",title:"表面处理厚度",hide:!0},{field:"surfaceArea",title:"沉金面积",hide:!0},{field:"minHoleSize",title:"最小孔",hide:!0},{field:"nofHoles",title:"孔数",hide:!0},{field:"viaProcess",title:"过孔方式",hide:!0},{field:"stackUp",title:"压合",hide:!0},{field:"nofCore",title:"芯板数量",hide:!0},{field:"nofPp",title:"PP数量",hide:!0},{field:"innerMinSpacing",title:"内层(线宽/线距)",hide:!0},{field:"outerMinSpacing",title:"外层最小(线宽/线距)",hide:!0},{field:"bgaSize",title:"BGA大小",hide:!0},{field:"testPoinType",title:"测试类型",hide:!0},{field:"testPoint",title:"测试点",hide:!0},{field:"testPointType",title:"测试方式",hide:!0},{field:"userId",title:"用户ID",hide:!0},{field:"uuid",title:"uuid",hide:!0},{field:"panelRoutingPath",title:"锣程",hide:!0},{field:"bevellingCamfer",title:"斜边",hide:!0},{field:"blindHoles",title:"盲孔",hide:!0},{field:"buriedHoles",title:"埋孔",hide:!0},{field:"carbon",title:"碳油",hide:!0},{field:"contrlImpeance",title:"阻抗",hide:!0},{field:"deepMillRouting",title:"控深锣",hide:!0},{field:"punchingHoles",title:"冲孔数",hide:!0},{field:"punchingSlots",title:"冲槽数",hide:!0},{field:"peelable",title:"兰胶",hide:!0},{field:"peelableBrand",title:"兰胶型号",hide:!0},{field:"edgePlated",title:"金属边",hide:!0},{field:"halfHoleLated",title:"半孔板",hide:!0},{field:"orderId",title:"订单ID",hide:!0},{field:"orderNo",title:"订单号",hide:!0},{field:"invoiceNo",title:"合同号",hide:!0},{field:"id",title:"ID",hide:!0},{field:"userId",title:"User ID",hide:!0},{field:"gerberPath",title:"gerberPath",hide:!0},{field:"isExistIndicator",title:"isExistIndicator",hide:!0},{field:"isExistSmt",title:"isExistSmt",hide:!0},{field:"quoteConfigIdList",title:"quoteConfigIdList",hide:!0},{field:"quoteConfigIds",title:"quoteConfigIds",hide:!0},{field:"quoteGerberName",title:"quoteGerberName",hide:!0},{field:"quoteGerberPath",title:"quoteGerberPath",hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",hide:!0},{field:"solderMaskBotColor",title:"solderMaskBotColor",hide:!0},{fixed:"right",title:"操作",toolbar:"#interior_order_Bar",width:256}]],done:function(e,t,i){var r=e.data;o=r,d(".layui-table-fixed-r").removeClass("layui-hide"),d("a[data='isOk']").each(function(e,t){d(this).css({color:"#00CC66","font-weight":"500"})}),l(0)}})}function i(){table.render({elem:"#interior_order_Tabstencil",url:setter.baseUrl+"epc/stencilorder/internalOkPay",toolbar:"#interior_order_optionS",cellMinWidth:80,id:"interior_order_Tabstencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"内部型号",width:130,fixed:"left"},{field:"status",title:"状态",templet:"#interiorOrderStatus",width:117},{field:"payLogId",title:"支付情况",align:"center",templet:"#interiorPayLogS",width:117},{field:"orderType",title:"订单类型",templet:"#order_type",width:117},{field:"",title:"资料下载",templet:"#interiorOrder_downS",width:107,align:"center"},{field:"gerberName",title:"客户型号",width:131},{field:"invoiceNo",title:"合同号",width:172},{field:"pcbName",title:"F/N"},{field:"orderNo",title:"客户PO"},{field:"gmtCreate",title:"创建时间",minWidth:230},{field:"gmtModified",title:"修改时间",minWidth:230},{field:"quoteOrderNo",title:"报价单号",minWidth:130,hide:!0},{field:"pcbType",title:"PCB类型",minWidth:130,hide:!0},{field:"dimensionsX",title:"单只(X)",hide:!0},{field:"dimensionsY",title:"单只(Y)",hide:!0},{field:"panelSizeX",title:"Panel(X)",width:90,hide:!0},{field:"panelSizeY",title:"Panel(Y)",width:90,hide:!0},{field:"panelWayX",title:"PanelWay(X)",width:110,hide:!0},{field:"panelWayY",title:"PanelWay(Y)",width:110,hide:!0},{field:"finishThickness",title:"板厚",hide:!0},{field:"layerNum",title:"层数",width:80,hide:!0},{field:"surfaceFinish",title:"表面处理",hide:!0},{field:"quantityPcs",title:"PCS数量",hide:!0},{field:"quantityPanel",title:"Panel数量",hide:!0},{field:"engineeringFee",title:"工程费",hide:!0},{field:"boardFee",title:"板费",hide:!0},{field:"testCostFee",title:"测试费",hide:!0},{field:"toolingFee",title:"工具费",hide:!0},{field:"overworkFee",title:"加急费",hide:!0},{field:"postFee",title:"运费",hide:!0},{field:"exchangeId",title:"币别",hide:!0,templet:"#exchangeId_flag"},{field:"subtotal",title:"总价",hide:!0},{field:"exchangeId",title:"币别",hide:!0,templet:"#exchangeId_flag"},{field:"boardType",title:"出货方式",hide:!0},{field:"areaSq",title:"面积",hide:!0},{field:"material",title:"材料",hide:!0},{field:"productCode",title:"材料型号",hide:!0},{field:"productNo",title:"材料商",hide:!0},{field:"tg",title:"TG",hide:!0},{field:"cti",title:"CTI",hide:!0},{field:"halogenFree",title:"无卤素",hide:!0},{field:"outerLayerCopper",title:"外层铜厚",hide:!0},{field:"innerLayerCopper",title:"内层铜厚",hide:!0},{field:"heatConductivity",title:"导热系数",hide:!0},{field:"silkScreenTopColor",title:"字符颜色",hide:!0},{field:"solderMaskTopColor",title:"阻焊颜色",hide:!0},{field:"pthCopper",title:"孔铜",hide:!0},{field:"remark",title:"备注",hide:!0},{field:"buildTime",title:"交期",hide:!0},{field:"weight",title:"重量",hide:!0},{field:"thickness",title:"表面处理厚度",hide:!0},{field:"surfaceArea",title:"沉金面积",hide:!0},{field:"minHoleSize",title:"最小孔",hide:!0},{field:"nofHoles",title:"孔数",hide:!0},{field:"viaProcess",title:"过孔方式",hide:!0},{field:"stackUp",title:"压合",hide:!0},{field:"nofCore",title:"芯板数量",hide:!0},{field:"nofPp",title:"PP数量",hide:!0},{field:"innerMinSpacing",title:"内层(线宽/线距)",hide:!0},{field:"outerMinSpacing",title:"外层最小(线宽/线距)",hide:!0},{field:"bgaSize",title:"BGA大小",hide:!0},{field:"testPoinType",title:"测试类型",hide:!0},{field:"testPoint",title:"测试点",hide:!0},{field:"testPointType",title:"测试方式",hide:!0},{field:"userId",title:"用户ID",hide:!0},{field:"uuid",title:"uuid",hide:!0},{field:"panelRoutingPath",title:"锣程",hide:!0},{field:"bevellingCamfer",title:"斜边",hide:!0},{field:"blindHoles",title:"盲孔",hide:!0},{field:"buriedHoles",title:"埋孔",hide:!0},{field:"carbon",title:"碳油",hide:!0},{field:"contrlImpeance",title:"阻抗",hide:!0},{field:"deepMillRouting",title:"控深锣",hide:!0},{field:"punchingHoles",title:"冲孔数",hide:!0},{field:"punchingSlots",title:"冲槽数",hide:!0},{field:"peelable",title:"兰胶",hide:!0},{field:"peelableBrand",title:"兰胶型号",hide:!0},{field:"edgePlated",title:"金属边",hide:!0},{field:"halfHoleLated",title:"半孔板",hide:!0},{field:"orderId",title:"订单ID",hide:!0},{field:"orderNo",title:"订单号",hide:!0},{field:"invoiceNo",title:"合同号",hide:!0},{field:"id",title:"ID",hide:!0},{field:"userId",title:"User ID",hide:!0},{field:"gerberPath",title:"gerberPath",hide:!0},{field:"isExistIndicator",title:"isExistIndicator",hide:!0},{field:"isExistSmt",title:"isExistSmt",hide:!0},{field:"quoteConfigIdList",title:"quoteConfigIdList",hide:!0},{field:"quoteConfigIds",title:"quoteConfigIds",hide:!0},{field:"quoteGerberName",title:"quoteGerberName",hide:!0},{field:"quoteGerberPath",title:"quoteGerberPath",hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",hide:!0},{field:"solderMaskBotColor",title:"solderMaskBotColor",hide:!0},{fixed:"right",title:"操作",toolbar:"#interior_order_BarS",width:256}]],done:function(e,t,i){var r=e.data;n=r,d("a[data='isOk']").each(function(e,t){d(this).css({color:"#00CC66","font-weight":"500"})}),l(1)}})}function l(e){var t;console.log("data:"+e),0===e?t=".isPcbDonePay":1===e&&(t=".isStencilDonePay"),d("table "+t).on("mouseover",function(){var e,t=d(this).attr("data");admin.req({type:"post",async:!1,url:setter.baseUrl+"paypal/paylog/info/"+t,success:function(t){e=t.payLog}}),layer.tips("付款Email："+e.payerEmail+"</br>交易金额："+e.mcGross+"</br>PayPal手续费："+e.paymentFee+"</br>总净额："+e.totalNet+"</br>付款时间："+e.paymentDate,"#"+d(this).attr("id"),{tips:[1,"#0c0c0cab"]})})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var d=layui.jquery,r=layui.jsTools,a={orderType:0,customerSn:null,tabRowId:null,tipsId:null};t();var o,n;element.on("tab(tab-internalQuote)",function(e){a.orderType=e.index,1===a.orderType?i():2===a.orderType?console.log("SMT订单选项卡"):t()}),table.on("toolbar(interior_order_Tabpcb)",function(e){var t=table.checkStatus(e.config.id);switch(e.event){case"okquote":var i=new Array,l=!1;if(l)layer.msg("请不要重复提交！！");else{l=!0;for(var d=0;d<t.data.length;d++)i[d]={id:t.data[d].id,isInternal:t.data[d].isInternal,businessId:t.data[d].businessId,totalFee:t.data[d].totalFee,orderTime:t.data[d].orderTime,exchangeId:t.data[d].exchangeId,firstStatus:t.data[d].firstStatus};console.log(i),layer.confirm("确定提交？",function(){admin.req({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},url:setter.baseUrl+"epc/pcborder/submitInternalOrder",contentType:"application/json;charset=utf-8",data:JSON.stringify(i),success:function(e){layer.msg("订单信息修改成功"),layui.table.reload("interior_order_Tabpcb"),l=!1},error:function(e){layer.msg("订单信息修改失败，请稍后再试！"),l=!1}})})}break;case"getCheckLength":var r=t.data;layer.msg("选中了："+r.length+" 个");break;case"isAll":layer.msg(t.isAll?"全选":"未全选")}}),form.on("submit(interior-order-search)",function(e){var t,i=e.field;0===a.orderType?t="interior_order_Tabpcb":1===a.orderType&&(t="interior_order_Tabstencil"),table.reload(t,{where:i})}),form.on("select(interior-order-search1)",function(e){d("*[lay-filter='interior-order-search']").click()}),form.on("select(interior-order-search2)",function(e){d("*[lay-filter='interior-order-search']").click()}),form.on("select(interior-order-payLogId)",function(e){d("*[lay-filter='interior-order-search']").click()}),d(".interior-order-search input").bind("input propertychange",function(e){d("*[lay-filter='interior-order-search']").click()}),table.on("tool(interior_order_Tabpcb)",function(e){var t=e.data;if("edit"==e.event)t.tabId="interior_order_Tabpcb",admin.popup({title:"编辑PCB订单信息",btn:["立即提交","取消订单","取消"],area:["820px","90%"],yes:function(){d(".submit-ok").click()},btn2:function(e,i){layer.confirm("确定取消订单["+t.productNo+"]?",function(e){admin.req({type:"post",data:{id:t.id,status:10},url:setter.baseUrl+"epc/pcborder/update",success:function(){layer.msg("已取消"),layui.table.reload("interior_order_Tabpcb")}})})},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderPCB_update",t).done(function(){console.log(t),form.render(null,"")})}});else if("search"==e.event){layer.msg("PCB订单合同");for(var i=t.invoiceNo,l=t.userId,a=t.invoiceNo,n=new Object,s=0,c=0;c<o.length;c++)a==o[c].invoiceNo&&(n[s]=o[c],s+=1);var f={data:{}};admin.req({type:"post",data:{contractNo:i},url:setter.baseUrl+"epc/pcborder/infoByContractNo",success:function(e){var t,i="marketManagement/iframeWindow/quote_contractB",a=null,o=0;f.data=n;for(var c=0;c<e.data.length;c++)o+=parseFloat(e.data[c].totalFee);f.total=o,d.each(e,function(e,i){null==a||""==a?t=1:null!=a&&a!=i.productNo&&(t=2,layer.msg("选择了不同型号"))}),admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+l,success:function(e){f.userName=e.user.userName,f.companyName=e.user.companName,f.country=e.user.country,f.city=e.user.city,f.address=e.user.address,f.mobilePhone=e.user.mobilePhone,f.postcode=e.user.postcode,f.paymentType=e.user.paymentType,f.deliveryType=e.user.deliveryType,f.contact=e.user.contact,admin.popup({title:"内部合同",area:["100%","100%"],btn:["打印","关闭"],maxmin:!0,yes:function(e,i){var l;"1"==t?l="quoteContract_AllB":"2"==t&&(l="quoteContract_AllA"),document.body.innerHTML=document.getElementById(l).innerHTML,window.print(),window.location.reload()},success:function(e,l){f.htmlType=2,view(this.id).render(i,f).done(function(){if(console.log(f),a=null,1===t){var e,i=d(".contract-module-three-tab tbody tr").eq(0).find("td").size(),l=f.data.length;s<4?e=4:l>4&&(e=7);for(var o=i;o<e;o++)d(".contract-module-three-tab tbody").find("tr").append("<td></td>");if(4==e)for(var o=1;o<e;o++)d(".contract-module-three-tab tbody tr").find("td").eq(o).css({width:"27.3%"});else for(var o=1;o<e;o++)d(".contract-module-three-tab tbody tr").find("td").eq(o).css({width:"13.6%"})}var c,u=[],h=[];if(null!=n){for(var p=0,o=0;o<s;o++)u[o]=n[o].gmtModified,h[o]=n[o].gmtCreate,null==u[o]&&p++;p==s?(c=r.TimeContrast(h),console.log(h)):c=r.TimeContrast(u),d("#contractBotDate").text(c.substring(0,10)),d("#topDate").text(c.substring(0,10))}})}})}})}})}else if("submit"==e.event){var u=!1;layer.confirm("确定要提交此订单？",function(){u?layer.msg("请不要重复提交！！"):(u=!0,d.ajax({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},contentType:"application/json;charset=utf-8",data:JSON.stringify([{id:t.id,isInternal:t.isInternal,businessId:t.businessId,totalFee:t.totalFee,orderTime:t.orderTime,exchangeId:t.exchangeId,firstStatus:t.firstStatus}]),url:setter.baseUrl+"epc/pcborder/submitInternalOrder",success:function(e){layer.alert("订单提交成功"),table.reload("interior_order_Tabpcb"),layer.closeAll(),u=!1},error:function(e){u=!1}}))})}else if("del"==e.event)layer.confirm("真的删除行么",function(i){admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"epc/pcborder/delete",success:function(){layer.alert("删除成功！"),e.del(),table.reload("interior_order_Tabpcb")}}),layer.close(i)});else if("detail"==e.event)console.log(t),admin.popup({title:"订单id:［"+t.id+"］-----------订单时间：［"+t.gmtCreate+"］",area:["100%","100%"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_pcb_detail",t).done(function(){})}});else if("showProcess"==e.event){var h={orderId:t.id,isInternal:1,orderType:1};admin.req({type:"post",data:h,async:!1,url:setter.baseUrl+"sys/processlog/showProcess",success:function(e){console.log(e),admin.popup({title:"内部订单流程",area:["837px","373px"],success:function(t,i){view(this.id).render("marketManagement/iframeWindow/order_process",e.data).done(function(){})}})}})}}),table.on("toolbar(interior_order_Tabstencil)",function(e){var t=table.checkStatus(e.config.id);switch(e.event){case"okquote":var i=new Array,l=!1;if(l)layer.msg("请不要重复提交！！");else{l=!0;for(var d=0;d<t.data.length;d++)i[d]={id:t.data[d].id,isInternal:t.data[d].isInternal,businessId:t.data[d].businessId,totalStencilFee:t.data[d].totalStencilFee,orderTime:t.data[d].orderTime,exchangeId:t.data[d].exchangeId,firstStatus:t.data[d].firstStatus};console.log(i),layer.confirm("确定提交？",function(){admin.req({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},url:setter.baseUrl+"epc/stencilorder/submitInternalOrder",contentType:"application/json;charset=utf-8",data:JSON.stringify(i),success:function(e){layer.msg("订单信息修改成功"),layui.table.reload("interior_order_Tabstencil"),l=!1},error:function(e){layer.msg("订单信息修改失败，请稍后再试！"),l=!1}})})}}}),table.on("tool(interior_order_Tabstencil)",function(e){var t=e.data;if("edit"==e.event)admin.popup({title:"编辑Stencil 钢网订单信息",area:["885px","550px"],btn:["立即提交","取消订单","取消"],yes:function(){d(".submitStencilUpB").click(),table.reload("interior_order_Tabstencil")},btn2:function(e,i){layer.confirm("确定取消订单["+t.productNo+"]?",function(e){admin.req({type:"post",data:{id:t.id,status:10},url:setter.baseUrl+"epc/stencilorder/update",success:function(){layer.msg("已取消"),layui.table.reload("interior_order_Tabstencil")}})})},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderStencil_updateB",t).done(function(){})}});else if("search"==e.event){layer.msg("钢网合同查看");for(var i=t.invoiceNo,l=t.invoiceNo,a=t.userId,o=new Object,s=0,c=0;c<n.length;c++)l==n[c].invoiceNo&&(o[s]=n[c],s+=1);var f={data:{}};admin.req({type:"post",data:{contractNo:i},url:setter.baseUrl+"epc/stencilorder/infoByContractNo",success:function(e){var t,i="marketManagement/iframeWindow/quote_contractS",l=null,n=0;f.data=o;for(var c=0;c<e.data.length;c++)n+=parseFloat(e.data[c].totalStencilFee);f.total=n,d.each(e,function(e,i){null==l||""==l?t=1:null!=l&&l!=i.productNo&&(t=2)}),admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+a,success:function(e){f.userName=e.user.userName,f.companyName=e.user.companName,f.country=e.user.country,f.city=e.user.city,f.address=e.user.address,f.mobilePhone=e.user.mobilePhone,f.postcode=e.user.postcode,f.paymentType=e.user.paymentType,f.deliveryType=e.user.deliveryType,f.contact=e.user.contact,admin.popup({title:"内部合同",area:["100%","100%"],btn:["打印","关闭"],maxmin:!0,yes:function(e,t){var i="quoteContract_AllS";document.body.innerHTML=document.getElementById(i).innerHTML,window.print(),window.location.reload()},success:function(e,t){f.htmlType=2,console.log(f),view(this.id).render(i,f).done(function(){l=null;var e,t=[],i=[];if(null!=o){for(var a=0,n=0;n<s;n++)t[n]=o[n].gmtModified,i[n]=o[n].gmtCreate,null==t[n]&&a++;a==s?(e=r.TimeContrast(i),console.log(i)):e=r.TimeContrast(t),d("#contractBotDateS").text(e.substring(0,10)),d("#topDate").text(e.substring(0,10))}})}})}})}})}else if("submit"==e.event)layer.confirm("确定要提交此订单？",function(){var e=!1;e?layer.msg("请不要重复提交！！"):(e=!0,admin.req({type:"post",headers:{access_token:layui.data("layuiAdmin").access_token},contentType:"application/json;charset=utf-8",data:JSON.stringify([{id:t.id,isInternal:t.isInternal,businessId:t.businessId,totalStencilFee:t.totalStencilFee,orderTime:t.orderTime,exchangeId:t.exchangeId,firstStatus:t.firstStatus}]),url:setter.baseUrl+"epc/stencilorder/submitInternalOrder",success:function(t){layer.alert("订单提交成功"),table.reload("interior_order_Tabstencil"),layer.closeAll(),e=!1},error:function(t){e=!1}}))});else if("del"==e.event)layer.confirm("真的删除行么",function(i){admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"epc/stencilorder/delete",success:function(){layer.alert("删除成功！"),e.del(),table.reload("interior_order_Tabstencil")}}),layer.close(i)});else if("detail"==e.event)admin.popup({title:"订单号［"+t.productNo+"]---订单时间［"+t.gmtCreate+"］",area:["837px","373px"],success:function(e,i){view(this.id).render("marketManagement/iframeWindow/order_stencil_detail",t).done(function(){})}});else if("showProcess"==e.event){var u={orderId:t.id,isInternal:1,orderType:2};admin.req({type:"post",data:u,async:!1,url:setter.baseUrl+"sys/processlog/showProcess",success:function(e){console.log(e),admin.popup({title:"内部订单流程",area:["837px","373px"],success:function(t,i){view(this.id).render("marketManagement/iframeWindow/order_process",e.data).done(function(){})}})}})}}),e("market_interiorOrder",{})});