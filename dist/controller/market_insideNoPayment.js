/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate","jsTools","uploadCommon","filePathProcess"],function(e){function t(){table.render({elem:"#inside_no_payment_Tabpcb",url:setter.baseUrl+"/epc/pcborder/internalNoPay",toolbar:"#inside_no_payment_option",cellMinWidth:80,id:"inside_no_payment_Tabpcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"内部编码",minWidth:130,fixed:"left",sort:!0},{field:"orderType",title:"订单类型",edit:"text",Width:110,templet:"#order_type",sort:!0},{field:"gerberName",title:"文件名",edit:"text",minWidth:160,sort:!0},{field:"pcbName",title:"F/N",edit:"text",minWidth:130,sort:!0},{field:"orderNo",title:"客户PO",edit:"text",sort:!0},{field:"invoiceNo",title:"合同单号",edit:"text",minWidth:130,sort:!0},{field:"gmtCreate",title:"创建时间",edit:"text",sort:!0},{field:"gmtModified",title:"修改时间",edit:"text",sort:!0},{field:"quoteOrderNo",title:"报价单号",edit:"text",minWidth:130,hide:!0},{field:"pcbType",title:"PCB类型",edit:"text",minWidth:130,hide:!0},{field:"dimensionsX",title:"单只(X)",edit:"text",hide:!0},{field:"dimensionsY",title:"单只(Y)",edit:"text",hide:!0},{field:"panelSizeX",title:"Panel(X)",edit:"text",width:90,hide:!0},{field:"panelSizeY",title:"Panel(Y)",edit:"text",width:90,hide:!0},{field:"panelWayX",title:"PanelWay(X)",edit:"text",width:110,hide:!0},{field:"panelWayY",title:"PanelWay(Y)",edit:"text",width:110,hide:!0},{field:"finishThickness",title:"板厚",edit:"text",hide:!0},{field:"layerNum",title:"层数",edit:"text",width:80,hide:!0},{field:"surfaceFinish",title:"表面处理",edit:"text",hide:!0},{field:"quantityPcs",title:"PCS数量",edit:"text",hide:!0},{field:"quantityPanel",title:"Panel数量",edit:"text",hide:!0},{field:"engineeringFee",title:"工程费",edit:"text",hide:!0},{field:"boardFee",title:"板费",edit:"text",hide:!0},{field:"testCostFee",title:"测试费",edit:"text",hide:!0},{field:"toolingFee",title:"工具费",edit:"text",hide:!0},{field:"overworkFee",title:"加急费",edit:"text",hide:!0},{field:"postFee",title:"运费",edit:"text",hide:!0},{field:"subtotal",title:"总价",edit:"text",hide:!0},{field:"boardType",title:"出货方式",edit:"text",hide:!0},{field:"status",title:"状态",align:"center",templet:"#Tabtb-pcb-market-iQuote-status",width:110,hide:!0},{field:"areaSq",title:"面积",edit:"text",hide:!0},{field:"material",title:"材料",edit:"text",hide:!0},{field:"productCode",title:"材料型号",edit:"text",hide:!0},{field:"productNo",title:"材料商",edit:"text",hide:!0},{field:"tg",title:"TG",edit:"text",hide:!0},{field:"cti",title:"CTI",edit:"text",hide:!0},{field:"halogenFree",title:"无卤素",edit:"text",hide:!0},{field:"outerLayerCopper",title:"外层铜厚",edit:"text",hide:!0},{field:"innerLayerCopper",title:"内层铜厚",edit:"text",hide:!0},{field:"heatConductivity",title:"导热系数",edit:"text",hide:!0},{field:"silkScreenTopColor",title:"字符颜色",edit:"text",hide:!0},{field:"solderMaskTopColor",title:"阻焊颜色",edit:"text",hide:!0},{field:"pthCopper",title:"孔铜",edit:"text",hide:!0},{field:"remark",title:"备注",edit:"text",hide:!0},{field:"buildTime",title:"交期",edit:"text",hide:!0},{field:"weight",title:"重量",edit:"text",hide:!0},{field:"thickness",title:"表面处理厚度",edit:"text",hide:!0},{field:"surfaceArea",title:"沉金面积",edit:"text",hide:!0},{field:"minHoleSize",title:"最小孔",edit:"text",hide:!0},{field:"nofHoles",title:"孔数",edit:"text",hide:!0},{field:"viaProcess",title:"过孔方式",edit:"text",hide:!0},{field:"stackUp",title:"压合",edit:"text",hide:!0},{field:"status",title:"状态",edit:"text",hide:!0},{field:"nofCore",title:"芯板数量",edit:"text",hide:!0},{field:"nofPp",title:"PP数量",edit:"text",hide:!0},{field:"innerMinSpacing",title:"内层(线宽/线距)",edit:"text",hide:!0},{field:"outerMinSpacing",title:"外层最小(线宽/线距)",edit:"text",hide:!0},{field:"bgaSize",title:"BGA大小",edit:"text",hide:!0},{field:"testPoinType",title:"测试类型",edit:"text",hide:!0},{field:"testPoint",title:"测试点",edit:"text",hide:!0},{field:"testPointType",title:"测试方式",edit:"text",hide:!0},{field:"userId",title:"用户ID",edit:"text",hide:!0},{field:"uuid",title:"uuid",edit:"text",hide:!0},{field:"panelRoutingPath",title:"锣程",edit:"text",hide:!0},{field:"bevellingCamfer",title:"斜边",edit:"text",hide:!0},{field:"blindHoles",title:"盲孔",edit:"text",hide:!0},{field:"buriedHoles",title:"埋孔",edit:"text",hide:!0},{field:"carbon",title:"碳油",edit:"text",hide:!0},{field:"contrlImpeance",title:"阻抗",edit:"text",hide:!0},{field:"deepMillRouting",title:"控深锣",edit:"text",hide:!0},{field:"punchingHoles",title:"冲孔数",edit:"text",hide:!0},{field:"punchingSlots",title:"冲槽数",edit:"text",hide:!0},{field:"peelable",title:"兰胶",edit:"text",hide:!0},{field:"peelableBrand",title:"兰胶型号",edit:"text",hide:!0},{field:"edgePlated",title:"金属边",edit:"text",hide:!0},{field:"halfHoleLated",title:"半孔板",edit:"text",hide:!0},{field:"orderId",title:"订单ID",edit:"text",hide:!0},{field:"orderNo",title:"订单号",edit:"text",hide:!0},{field:"invoiceNo",title:"合同号",edit:"text",hide:!0},{field:"id",title:"ID",hide:!0},{field:"userId",title:"User ID",hide:!0},{field:"gerberPath",title:"gerberPath",edit:"text",hide:!0},{field:"isExistIndicator",title:"isExistIndicator",edit:"text",hide:!0},{field:"isExistSmt",title:"isExistSmt",edit:"text",hide:!0},{field:"quoteConfigIdList",title:"quoteConfigIdList",edit:"text",hide:!0},{field:"quoteConfigIds",title:"quoteConfigIds",edit:"text",hide:!0},{field:"quoteGerberName",title:"quoteGerberName",edit:"text",hide:!0},{field:"quoteGerberPath",title:"quoteGerberPath",edit:"text",hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",edit:"text",hide:!0},{field:"solderMaskBotColor",title:"solderMaskBotColor",edit:"text",hide:!0},{fixed:"right",title:"操作",toolbar:"#inside_no_payment_Bar",width:220}]],done:function(e,t,i){var d=e.data;o=d}})}function i(){table.render({elem:"#inside_no_payment_Tabstencil",url:setter.baseUrl+"epc/stencilorder/internalNoPay",toolbar:"#inside_no_payment_optionS",cellMinWidth:80,id:"inside_no_payment_Tabstencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"内部编码",minWidth:130,fixed:"left",sort:!0},{field:"orderType",title:"订单类型",edit:"text",Width:110,templet:"#order_type",sort:!0},{field:"gerberName",title:"文件名",edit:"text",minWidth:160,sort:!0},{field:"pcbName",title:"F/N",edit:"text",minWidth:130,sort:!0},{field:"orderNo",title:"客户PO",edit:"text",sort:!0},{field:"invoiceNo",title:"合同单号",edit:"text",minWidth:130,sort:!0},{field:"gmtCreate",title:"创建时间",edit:"text",sort:!0},{field:"gmtModified",title:"修改时间",edit:"text",sort:!0},{field:"quoteOrderNo",title:"报价单号",edit:"text",minWidth:130,hide:!0},{field:"pcbType",title:"PCB类型",edit:"text",minWidth:130,hide:!0},{field:"dimensionsX",title:"单只(X)",edit:"text",hide:!0},{field:"dimensionsY",title:"单只(Y)",edit:"text",hide:!0},{field:"panelSizeX",title:"Panel(X)",edit:"text",width:90,hide:!0},{field:"panelSizeY",title:"Panel(Y)",edit:"text",width:90,hide:!0},{field:"panelWayX",title:"PanelWay(X)",edit:"text",width:110,hide:!0},{field:"panelWayY",title:"PanelWay(Y)",edit:"text",width:110,hide:!0},{field:"finishThickness",title:"板厚",edit:"text",hide:!0},{field:"layerNum",title:"层数",edit:"text",width:80,hide:!0},{field:"surfaceFinish",title:"表面处理",edit:"text",hide:!0},{field:"quantityPcs",title:"PCS数量",edit:"text",hide:!0},{field:"quantityPanel",title:"Panel数量",edit:"text",hide:!0},{field:"engineeringFee",title:"工程费",edit:"text",hide:!0},{field:"boardFee",title:"板费",edit:"text",hide:!0},{field:"testCostFee",title:"测试费",edit:"text",hide:!0},{field:"toolingFee",title:"工具费",edit:"text",hide:!0},{field:"overworkFee",title:"加急费",edit:"text",hide:!0},{field:"postFee",title:"运费",edit:"text",hide:!0},{field:"subtotal",title:"总价",edit:"text",hide:!0},{field:"boardType",title:"出货方式",edit:"text",hide:!0},{field:"status",title:"状态",align:"center",templet:"#Tabtb-pcb-market-iQuote-status",width:110,hide:!0},{field:"areaSq",title:"面积",edit:"text",hide:!0},{field:"material",title:"材料",edit:"text",hide:!0},{field:"productCode",title:"材料型号",edit:"text",hide:!0},{field:"productNo",title:"材料商",edit:"text",hide:!0},{field:"tg",title:"TG",edit:"text",hide:!0},{field:"cti",title:"CTI",edit:"text",hide:!0},{field:"halogenFree",title:"无卤素",edit:"text",hide:!0},{field:"outerLayerCopper",title:"外层铜厚",edit:"text",hide:!0},{field:"innerLayerCopper",title:"内层铜厚",edit:"text",hide:!0},{field:"heatConductivity",title:"导热系数",edit:"text",hide:!0},{field:"silkScreenTopColor",title:"字符颜色",edit:"text",hide:!0},{field:"solderMaskTopColor",title:"阻焊颜色",edit:"text",hide:!0},{field:"pthCopper",title:"孔铜",edit:"text",hide:!0},{field:"remark",title:"备注",edit:"text",hide:!0},{field:"buildTime",title:"交期",edit:"text",hide:!0},{field:"weight",title:"重量",edit:"text",hide:!0},{field:"thickness",title:"表面处理厚度",edit:"text",hide:!0},{field:"surfaceArea",title:"沉金面积",edit:"text",hide:!0},{field:"minHoleSize",title:"最小孔",edit:"text",hide:!0},{field:"nofHoles",title:"孔数",edit:"text",hide:!0},{field:"viaProcess",title:"过孔方式",edit:"text",hide:!0},{field:"stackUp",title:"压合",edit:"text",hide:!0},{field:"status",title:"状态",edit:"text",hide:!0},{field:"nofCore",title:"芯板数量",edit:"text",hide:!0},{field:"nofPp",title:"PP数量",edit:"text",hide:!0},{field:"innerMinSpacing",title:"内层(线宽/线距)",edit:"text",hide:!0},{field:"outerMinSpacing",title:"外层最小(线宽/线距)",edit:"text",hide:!0},{field:"bgaSize",title:"BGA大小",edit:"text",hide:!0},{field:"testPoinType",title:"测试类型",edit:"text",hide:!0},{field:"testPoint",title:"测试点",edit:"text",hide:!0},{field:"testPointType",title:"测试方式",edit:"text",hide:!0},{field:"userId",title:"用户ID",edit:"text",hide:!0},{field:"uuid",title:"uuid",edit:"text",hide:!0},{field:"panelRoutingPath",title:"锣程",edit:"text",hide:!0},{field:"bevellingCamfer",title:"斜边",edit:"text",hide:!0},{field:"blindHoles",title:"盲孔",edit:"text",hide:!0},{field:"buriedHoles",title:"埋孔",edit:"text",hide:!0},{field:"carbon",title:"碳油",edit:"text",hide:!0},{field:"contrlImpeance",title:"阻抗",edit:"text",hide:!0},{field:"deepMillRouting",title:"控深锣",edit:"text",hide:!0},{field:"punchingHoles",title:"冲孔数",edit:"text",hide:!0},{field:"punchingSlots",title:"冲槽数",edit:"text",hide:!0},{field:"peelable",title:"兰胶",edit:"text",hide:!0},{field:"peelableBrand",title:"兰胶型号",edit:"text",hide:!0},{field:"edgePlated",title:"金属边",edit:"text",hide:!0},{field:"halfHoleLated",title:"半孔板",edit:"text",hide:!0},{field:"orderId",title:"订单ID",edit:"text",hide:!0},{field:"orderNo",title:"订单号",edit:"text",hide:!0},{field:"invoiceNo",title:"合同号",edit:"text",hide:!0},{field:"id",title:"ID",hide:!0},{field:"userId",title:"User ID",hide:!0},{field:"gerberPath",title:"gerberPath",edit:"text",hide:!0},{field:"isExistIndicator",title:"isExistIndicator",edit:"text",hide:!0},{field:"isExistSmt",title:"isExistSmt",edit:"text",hide:!0},{field:"quoteConfigIdList",title:"quoteConfigIdList",edit:"text",hide:!0},{field:"quoteConfigIds",title:"quoteConfigIds",edit:"text",hide:!0},{field:"quoteGerberName",title:"quoteGerberName",edit:"text",hide:!0},{field:"quoteGerberPath",title:"quoteGerberPath",edit:"text",hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",edit:"text",hide:!0},{field:"solderMaskBotColor",title:"solderMaskBotColor",edit:"text",hide:!0},{fixed:"right",title:"操作",toolbar:"#inside_no_payment_Bar",width:220}]],done:function(e,t,i){var d=e.data;a=d}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var d=layui.jquery,l=layui.jsTools,n=(layui.uploadCommon,layui.filePathProcess);t();var o,a,r={orderType:0,customerSn:null};element.on("tab(tab-internalQuote)",function(e){r.orderType=e.index,1===r.orderType?i():2===r.orderType?console.log("SMT订单选项卡"):t()}),table.on("toolbar(inside_no_payment_Tabpcb)",function(e){var t=table.checkStatus(e.config.id);switch(e.event){case"confirmCheckData":for(var i=null,d=0;d<t.data.length;d++)null==i?i=t.data[d].invoiceNo:null!=i&&"-1"==i.indexOf(t.data[d].invoiceNo)&&(i+=","+t.data[d].invoiceNo);layer.confirm("确定提交["+i+"]",function(){admin.req({type:"post",data:{contractNos:i},url:setter.baseUrl+"epc/pcborder/confirmQuoteInInternalNoPay",success:function(){layer.alert("提交成功！"),table.reload("inside_no_payment_Tabpcb")}}),layer.closeAll()});break;case"getCheckLength":var l=t.data;layer.msg("选中了："+l.length+" 个");break;case"isAll":layer.msg(t.isAll?"全选":"未全选")}}),form.on("submit(nopayment-search)",function(e){var t,i=e.field;0===r.orderType?t="inside_no_payment_Tabpcb":1===r.orderType&&(t="inside_no_payment_Tabstencil"),table.reload(t,{where:i})}),form.on("select(inside-no-payment-search-sel)",function(e){d("*[lay-filter='nopayment-search']").click()}),d(".inside-no-payment-search input").bind("input propertychange",function(e){d("*[lay-filter='nopayment-search']").click()}),table.on("tool(inside_no_payment_Tabpcb)",function(e){for(var t=e.data,i=t.quoteOrderNo,a=new Object,r=0,s=0,c=0;c<o.length;c++)i==o[c].quoteOrderNo&&(console.log("sd_len:"+r),a[r]=o[c],r+=1,s+=o[c].totalFee),console.log("pcbtabObj[i].invoiceNo:"+o[c].quoteOrderNo);var f=t.quoteOrderNo;if("del"===e.event)layer.confirm("真的删除行么",function(i){admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"epc/pcborder/delete",success:function(){layer.alert("删除成功！"),e.del(),table.reload("inside_no_payment_Tabpcb")}}),layer.close(i)});else if("edit"==e.event)t.tabId="inside_no_payment_Tabpcb",admin.popup({title:"编辑PCB订单信息",area:["820px","90%"],btn:["立即提交","取消"],yes:function(){d(".submit-ok").click(),layer.msg("yes")},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderPCB_update",t).done(function(){form.render(null,"")})}});else if("search"==e.event){var h={data:{}};admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+t.userId,success:function(e){h.userName=e.user.userName,h.companyName=e.user.companName,h.country=e.user.country,h.city=e.user.city,h.address=e.user.address,h.mobilePhone=e.user.mobilePhone,h.postcode=e.user.postcode,h.paymentType=e.user.paymentType,h.deliveryType=e.user.deliveryType,h.contact=e.user.contact,admin.req({type:"post",data:{quoteOrderNo:f},url:setter.baseUrl+"epc/pcborder/infoByQuoteOrderNo",success:function(e){var t,i="marketManagement/iframeWindow/quote_contractB",n=null;h.data=a,h.total=s,console.log(h),d.each(e.data,function(e,i){null==n||""==n?(t=1,n=i.productNo):null!=n&&n!=i.productNo&&(t=2,layer.msg("选择了不同型号"))}),admin.popup({title:"内部合同",area:["100%","100%"],btn:["打印","关闭"],maxmin:!0,yes:function(e,i){var d;"1"==t?d="quoteContract_AllB":"2"==t&&(d="quoteContract_AllA"),layer.alert(d),document.body.innerHTML=document.getElementById(d).innerHTML,window.print(),window.location.reload()},success:function(e,o){h.htmlType=2,console.log(h),view(this.id).render(i,h).done(function(){if(console.log(h),n=null,1===t){var e,i=d(".contract-module-three-tab tbody tr").eq(0).find("td").size();h.data.length;r<4?e=4:r>4&&(e=7);for(var o=i;o<e;o++)d(".contract-module-three-tab tbody").find("tr").append("<td></td>");if(4==e)for(var o=1;o<e;o++)d(".contract-module-three-tab tbody tr").find("td").eq(o).css({width:"27.3%"});else for(var o=1;o<e;o++)d(".contract-module-three-tab tbody tr").find("td").eq(o).css({width:"13.6%"})}console.log("time设置");var s,c=[],f=[];if(null!=a){for(var u=0,o=0;o<r;o++)c[o]=a[o].gmtModified,f[o]=a[o].gmtCreate,null==c[o]&&u++;u==r?(s=l.TimeContrast(f),console.log(f)):s=l.TimeContrast(c),d("#contractBotDate").text(s.substring(0,10)),d("#topDate").text(s.substring(0,10))}})}})}})}})}else"inside_no_payment_fileMana"==e.event&&(t.orderType="pcbOrder",t.retab="inside_no_payment_Tabpcb",t=n.isInternal(t),console.log(t),admin.popup({title:"PCB订单资料管理",area:["870px","303px"],success:function(e,i){view(this.id).render("epcManagement/iframeWindow/file_management",t).done(function(){})},end:function(){localStorage.removeItem("saveBackResult")}}))}),table.on("toolbar(inside_no_payment_Tabstencil)",function(e){var t=table.checkStatus(e.config.id);switch(console.log(t.data),e.event){case"confirmCheckData":for(var i=null,d=0;d<t.data.length;d++)null==i?i=t.data[d].invoiceNo:null!=i&&"-1"==i.indexOf(t.data[d].invoiceNo)&&(i+=","+t.data[d].invoiceNo);layer.confirm("确定提交["+i+"]",function(){admin.req({type:"post",data:{contractNos:i},url:setter.baseUrl+"epc/stencilorder/submitInternalContractNo",success:function(){layer.alert("提交成功！"),table.reload("inside_no_payment_Tabstencil")}}),layer.closeAll()});break;case"getCheckLength":var l=t.data;layer.msg("选中了："+l.length+" 个");break;case"isAll":layer.msg(t.isAll?"全选":"未全选")}}),table.on("tool(inside_no_payment_Tabstencil)",function(e){for(var t=e.data,i=t.quoteOrderNo,o=new Object,r=0,s=0,c=0;c<a.length;c++)i==a[c].quoteOrderNo&&(console.log("sd_len:"+r),o[r]=a[c],r+=1,s+=a[c].totalStencilFee),console.log("stenciltabObj[i].invoiceNo:"+a[c].quoteOrderNo);var f=t.invoiceNo;if("del"===e.event)layer.confirm("真的删除行么",function(i){admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"epc/stencilorder/delete",success:function(){layer.alert("删除成功！"),e.del(),table.reload("inside_no_payment_Tabstencil")}}),layer.close(i)});else if("edit"==e.event)admin.popup({title:"编辑Stencil 钢网订单信息",area:["885px","550px"],btn:["立即提交","取消"],yes:function(){d(".submitStencilUpB").click(),table.reload("inside_no_payment_Tabstencil")},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderStencil_updateB",t).done(function(){})}});else if("search"==e.event){var h={data:{}};admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+t.userId,success:function(e){h.userName=e.user.userName,h.companyName=e.user.companName,h.country=e.user.country,h.city=e.user.city,h.address=e.user.address,h.contact=e.user.contact,admin.req({type:"post",data:{contractNo:f},url:setter.baseUrl+"epc/stencilorder/infoByContractNo",success:function(e){var t,i="marketManagement/iframeWindow/quote_contractS",n=null;h.data=o,h.total=s,console.log(h),d.each(e.data,function(e,i){null==n||""==n?(t=1,n=i.productNo):null!=n&&n!=i.productNo&&(t=2,layer.msg("选择了不同型号"))}),admin.popup({title:"内部合同",area:["100%","100%"],btn:["打印","关闭"],maxmin:!0,yes:function(e,t){var i="quoteContract_AllS";document.body.innerHTML=document.getElementById(i).innerHTML,window.print(),window.location.reload()},success:function(e,t){h.htmlType=2,console.log(h),view(this.id).render(i,h).done(function(){n=null;var e,t=[],i=[];if(console.log(11111),null!=o){for(var a=0,s=0;s<r;s++)t[s]=o[s].gmtModified,i[s]=o[s].gmtCreate,null==t[s]&&a++;a==r?(e=l.TimeContrast(i),console.log(i)):e=l.TimeContrast(t),d("#contractBotDateS").text(e.substring(0,10)),d("#topDate").text(e.substring(0,10))}})}})}})}})}else"inside_no_payment_fileMana"==e.event&&(t.orderType="stencilOrder",t.retab="inside_no_payment_Tabstencil",t=n.isInternal(t),console.log(t),admin.popup({title:"PCB订单资料管理",area:["45%","40%"],success:function(e,i){view(this.id).render("epcManagement/iframeWindow/file_management",t).done(function(){})},end:function(){localStorage.removeItem("saveBackResult")}}))}),e("market_insideNoPayment",{})});