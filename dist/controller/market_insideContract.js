/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate","jsTools"],function(e){function t(){table.render({elem:"#inside_cotract_Tabpcb",url:setter.baseUrl+"epc/pcborder/internalContract",toolbar:"#inside_cotract_option",cellMinWidth:80,id:"inside_cotract_Tabpcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"orderType",title:"订单类型",edit:"text",Width:110,templet:"#order_type"},{field:"productNo",title:"内部编码",minWidth:130},{field:"gerberName",title:"文件名",edit:"text",minWidth:160},{field:"pcbName",title:"F/N",edit:"text",minWidth:130},{field:"orderNo",title:"客户PO",edit:"text"},{field:"quoteOrderNo",title:"报价单号",edit:"text",minWidth:130},{field:"gmtCreate",title:"创建时间",edit:"text"},{field:"gmtModified",title:"修改时间",edit:"text"},{field:"pcbType",title:"PCB类型",edit:"text",minWidth:130,hide:!0},{field:"dimensionsX",title:"单只(X)",edit:"text",hide:!0},{field:"dimensionsY",title:"单只(Y)",edit:"text",hide:!0},{field:"panelSizeX",title:"Panel(X)",edit:"text",width:90,hide:!0},{field:"panelSizeY",title:"Panel(Y)",edit:"text",width:90,hide:!0},{field:"panelWayX",title:"PanelWay(X)",edit:"text",width:110,hide:!0},{field:"panelWayY",title:"PanelWay(Y)",edit:"text",width:110,hide:!0},{field:"finishThickness",title:"板厚",edit:"text",hide:!0},{field:"layerNum",title:"层数",edit:"text",width:80,hide:!0},{field:"surfaceFinish",title:"表面处理",edit:"text",hide:!0},{field:"quantityPcs",title:"PCS数量",edit:"text",hide:!0},{field:"quantityPanel",title:"Panel数量",edit:"text",hide:!0},{field:"engineeringFee",title:"工程费",edit:"text",hide:!0},{field:"boardFee",title:"板费",edit:"text",hide:!0},{field:"testCostFee",title:"测试费",edit:"text",hide:!0},{field:"toolingFee",title:"工具费",edit:"text",hide:!0},{field:"overworkFee",title:"加急费",edit:"text",hide:!0},{field:"postFee",title:"运费",edit:"text",hide:!0},{field:"subtotal",title:"总价",edit:"text",hide:!0},{field:"boardType",title:"出货方式",edit:"text",hide:!0},{field:"status",title:"状态",align:"center",templet:"#Tabtb-pcb-market-iQuote-status",width:110,hide:!0},{field:"areaSq",title:"面积",edit:"text",hide:!0},{field:"material",title:"材料",edit:"text",hide:!0},{field:"productCode",title:"材料型号",edit:"text",hide:!0},{field:"productNo",title:"材料商",edit:"text",hide:!0},{field:"tg",title:"TG",edit:"text",hide:!0},{field:"cti",title:"CTI",edit:"text",hide:!0},{field:"halogenFree",title:"无卤素",edit:"text",hide:!0},{field:"outerLayerCopper",title:"外层铜厚",edit:"text",hide:!0},{field:"innerLayerCopper",title:"内层铜厚",edit:"text",hide:!0},{field:"heatConductivity",title:"导热系数",edit:"text",hide:!0},{field:"silkScreenTopColor",title:"字符颜色",edit:"text",hide:!0},{field:"solderMaskTopColor",title:"阻焊颜色",edit:"text",hide:!0},{field:"pthCopper",title:"孔铜",edit:"text",hide:!0},{field:"remark",title:"备注",edit:"text",hide:!0},{field:"buildTime",title:"交期",edit:"text",hide:!0},{field:"weight",title:"重量",edit:"text",hide:!0},{field:"thickness",title:"表面处理厚度",edit:"text",hide:!0},{field:"surfaceArea",title:"沉金面积",edit:"text",hide:!0},{field:"minHoleSize",title:"最小孔",edit:"text",hide:!0},{field:"nofHoles",title:"孔数",edit:"text",hide:!0},{field:"viaProcess",title:"过孔方式",edit:"text",hide:!0},{field:"stackUp",title:"压合",edit:"text",hide:!0},{field:"status",title:"状态",edit:"text",hide:!0},{field:"nofCore",title:"芯板数量",edit:"text",hide:!0},{field:"nofPp",title:"PP数量",edit:"text",hide:!0},{field:"innerMinSpacing",title:"内层(线宽/线距)",edit:"text",hide:!0},{field:"outerMinSpacing",title:"外层最小(线宽/线距)",edit:"text",hide:!0},{field:"bgaSize",title:"BGA大小",edit:"text",hide:!0},{field:"testPoinType",title:"测试类型",edit:"text",hide:!0},{field:"testPoint",title:"测试点",edit:"text",hide:!0},{field:"testPointType",title:"测试方式",edit:"text",hide:!0},{field:"userId",title:"用户ID",edit:"text",hide:!0},{field:"uuid",title:"uuid",edit:"text",hide:!0},{field:"panelRoutingPath",title:"锣程",edit:"text",hide:!0},{field:"bevellingCamfer",title:"斜边",edit:"text",hide:!0},{field:"blindHoles",title:"盲孔",edit:"text",hide:!0},{field:"buriedHoles",title:"埋孔",edit:"text",hide:!0},{field:"carbon",title:"碳油",edit:"text",hide:!0},{field:"contrlImpeance",title:"阻抗",edit:"text",hide:!0},{field:"deepMillRouting",title:"控深锣",edit:"text",hide:!0},{field:"punchingHoles",title:"冲孔数",edit:"text",hide:!0},{field:"punchingSlots",title:"冲槽数",edit:"text",hide:!0},{field:"peelable",title:"兰胶",edit:"text",hide:!0},{field:"peelableBrand",title:"兰胶型号",edit:"text",hide:!0},{field:"edgePlated",title:"金属边",edit:"text",hide:!0},{field:"halfHoleLated",title:"半孔板",edit:"text",hide:!0},{field:"orderId",title:"订单ID",edit:"text",hide:!0},{field:"orderNo",title:"订单号",edit:"text",hide:!0},{field:"invoiceNo",title:"合同号",edit:"text",hide:!0},{field:"id",title:"ID",hide:!0},{field:"userId",title:"User ID",hide:!0},{field:"gerberPath",title:"gerberPath",edit:"text",hide:!0},{field:"isExistIndicator",title:"isExistIndicator",edit:"text",hide:!0},{field:"isExistSmt",title:"isExistSmt",edit:"text",hide:!0},{field:"quoteConfigIdList",title:"quoteConfigIdList",edit:"text",hide:!0},{field:"quoteConfigIds",title:"quoteConfigIds",edit:"text",hide:!0},{field:"quoteGerberName",title:"quoteGerberName",edit:"text",hide:!0},{field:"quoteGerberPath",title:"quoteGerberPath",edit:"text",hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",edit:"text",hide:!0},{field:"solderMaskBotColor",title:"solderMaskBotColor",edit:"text",hide:!0},{fixed:"right",title:"操作",toolbar:"#inside_cotract_Bar",width:192}]],done:function(e,t,i){var d=e.data;o=d}})}function i(){table.render({elem:"#icontract_Tabstencil",url:setter.baseUrl+"epc/stencilorder/internalContract",toolbar:"#inside_cotract_option",cellMinWidth:80,id:"icontract_Tabstencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"orderType",title:"订单类型",edit:"text",Width:110,templet:"#order_type"},{field:"productNo",title:"内部编码",minWidth:130},{field:"gerberName",title:"文件名",edit:"text",minWidth:160},{field:"pcbName",title:"F/N",edit:"text",minWidth:130},{field:"orderNo",title:"客户PO",edit:"text"},{field:"quoteOrderNo",title:"报价单号",edit:"text",minWidth:130},{field:"gmtCreate",title:"创建时间",edit:"text"},{field:"gmtModified",title:"修改时间",edit:"text"},{field:"pcbType",title:"PCB类型",edit:"text",minWidth:130,hide:!0},{field:"dimensionsX",title:"单只(X)",edit:"text",hide:!0},{field:"dimensionsY",title:"单只(Y)",edit:"text",hide:!0},{field:"panelSizeX",title:"Panel(X)",edit:"text",width:90,hide:!0},{field:"panelSizeY",title:"Panel(Y)",edit:"text",width:90,hide:!0},{field:"panelWayX",title:"PanelWay(X)",edit:"text",width:110,hide:!0},{field:"panelWayY",title:"PanelWay(Y)",edit:"text",width:110,hide:!0},{field:"finishThickness",title:"板厚",edit:"text",hide:!0},{field:"layerNum",title:"层数",edit:"text",width:80,hide:!0},{field:"surfaceFinish",title:"表面处理",edit:"text",hide:!0},{field:"quantityPcs",title:"PCS数量",edit:"text",hide:!0},{field:"quantityPanel",title:"Panel数量",edit:"text",hide:!0},{field:"engineeringFee",title:"工程费",edit:"text",hide:!0},{field:"boardFee",title:"板费",edit:"text",hide:!0},{field:"testCostFee",title:"测试费",edit:"text",hide:!0},{field:"toolingFee",title:"工具费",edit:"text",hide:!0},{field:"overworkFee",title:"加急费",edit:"text",hide:!0},{field:"postFee",title:"运费",edit:"text",hide:!0},{field:"subtotal",title:"总价",edit:"text",hide:!0},{field:"boardType",title:"出货方式",edit:"text",hide:!0},{field:"status",title:"状态",align:"center",templet:"#Tabtb-pcb-market-iQuote-status",width:110,hide:!0},{field:"areaSq",title:"面积",edit:"text",hide:!0},{field:"material",title:"材料",edit:"text",hide:!0},{field:"productCode",title:"材料型号",edit:"text",hide:!0},{field:"productNo",title:"材料商",edit:"text",hide:!0},{field:"tg",title:"TG",edit:"text",hide:!0},{field:"cti",title:"CTI",edit:"text",hide:!0},{field:"halogenFree",title:"无卤素",edit:"text",hide:!0},{field:"outerLayerCopper",title:"外层铜厚",edit:"text",hide:!0},{field:"innerLayerCopper",title:"内层铜厚",edit:"text",hide:!0},{field:"heatConductivity",title:"导热系数",edit:"text",hide:!0},{field:"silkScreenTopColor",title:"字符颜色",edit:"text",hide:!0},{field:"solderMaskTopColor",title:"阻焊颜色",edit:"text",hide:!0},{field:"pthCopper",title:"孔铜",edit:"text",hide:!0},{field:"remark",title:"备注",edit:"text",hide:!0},{field:"buildTime",title:"交期",edit:"text",hide:!0},{field:"weight",title:"重量",edit:"text",hide:!0},{field:"thickness",title:"表面处理厚度",edit:"text",hide:!0},{field:"surfaceArea",title:"沉金面积",edit:"text",hide:!0},{field:"minHoleSize",title:"最小孔",edit:"text",hide:!0},{field:"nofHoles",title:"孔数",edit:"text",hide:!0},{field:"viaProcess",title:"过孔方式",edit:"text",hide:!0},{field:"stackUp",title:"压合",edit:"text",hide:!0},{field:"status",title:"状态",edit:"text",hide:!0},{field:"nofCore",title:"芯板数量",edit:"text",hide:!0},{field:"nofPp",title:"PP数量",edit:"text",hide:!0},{field:"innerMinSpacing",title:"内层(线宽/线距)",edit:"text",hide:!0},{field:"outerMinSpacing",title:"外层最小(线宽/线距)",edit:"text",hide:!0},{field:"bgaSize",title:"BGA大小",edit:"text",hide:!0},{field:"testPoinType",title:"测试类型",edit:"text",hide:!0},{field:"testPoint",title:"测试点",edit:"text",hide:!0},{field:"testPointType",title:"测试方式",edit:"text",hide:!0},{field:"userId",title:"用户ID",edit:"text",hide:!0},{field:"uuid",title:"uuid",edit:"text",hide:!0},{field:"panelRoutingPath",title:"锣程",edit:"text",hide:!0},{field:"bevellingCamfer",title:"斜边",edit:"text",hide:!0},{field:"blindHoles",title:"盲孔",edit:"text",hide:!0},{field:"buriedHoles",title:"埋孔",edit:"text",hide:!0},{field:"carbon",title:"碳油",edit:"text",hide:!0},{field:"contrlImpeance",title:"阻抗",edit:"text",hide:!0},{field:"deepMillRouting",title:"控深锣",edit:"text",hide:!0},{field:"punchingHoles",title:"冲孔数",edit:"text",hide:!0},{field:"punchingSlots",title:"冲槽数",edit:"text",hide:!0},{field:"peelable",title:"兰胶",edit:"text",hide:!0},{field:"peelableBrand",title:"兰胶型号",edit:"text",hide:!0},{field:"edgePlated",title:"金属边",edit:"text",hide:!0},{field:"halfHoleLated",title:"半孔板",edit:"text",hide:!0},{field:"orderId",title:"订单ID",edit:"text",hide:!0},{field:"orderNo",title:"订单号",edit:"text",hide:!0},{field:"invoiceNo",title:"合同号",edit:"text",hide:!0},{field:"id",title:"ID",hide:!0},{field:"userId",title:"User ID",hide:!0},{field:"gerberPath",title:"gerberPath",edit:"text",hide:!0},{field:"isExistIndicator",title:"isExistIndicator",edit:"text",hide:!0},{field:"isExistSmt",title:"isExistSmt",edit:"text",hide:!0},{field:"quoteConfigIdList",title:"quoteConfigIdList",edit:"text",hide:!0},{field:"quoteConfigIds",title:"quoteConfigIds",edit:"text",hide:!0},{field:"quoteGerberName",title:"quoteGerberName",edit:"text",hide:!0},{field:"quoteGerberPath",title:"quoteGerberPath",edit:"text",hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",edit:"text",hide:!0},{field:"solderMaskBotColor",title:"solderMaskBotColor",edit:"text",hide:!0},{fixed:"right",title:"操作",toolbar:"#inside_cotract_BarS",width:192}]],done:function(e,t,i){var d=e.data;r=d}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var d=layui.jquery,l=layui.jsTools;t();var o,r,n={orderType:0,customerSn:null},a={userName:"",companyName:"",country:"",city:"",address:""};element.on("tab(tab-internalQuote)",function(e){n.orderType=e.index,1===n.orderType?i():2===n.orderType?console.log("SMT订单选项卡"):t()}),table.on("toolbar(inside_cotract_Tabpcb)",function(e){var t=table.checkStatus(e.config.id),i=t.data,o={data:{}};o.data=t.data;var r=0;if(i.length>=7)return layer.alert("最多只能选择6条数据！！"),!1;for(var n=0;n<i.length;n++)r+=parseFloat(i[n].totalFee);switch(o.total=r,e.event){case"submit":for(var a=null,s=null,c=null,n=0;n<i.length;n++){var u=i[n].productNo.substring(0,3);if(null==a?a=i[n].invoiceNo:null!=a&&"-1"==a.indexOf(i[n].invoiceNo)&&(a+=","+i[n].invoiceNo),null!=s&&s!=u)return layer.alert("请选择同一个客户下单"),!1;s=u,null==c?c=i[n].id:c+=","+i[n].id}console.log("qids:"+c);var f,h="marketManagement/iframeWindow/quote_contractB",p=null;admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+i[0].userId,success:function(e){o.userName=e.user.userName,o.companyName=e.user.companName,o.country=e.user.country,o.city=e.user.city,o.address=e.user.address,o.mobilePhone=e.user.mobilePhone,o.postcode=e.user.postcode,o.paymentType=e.user.paymentType,o.deliveryType=e.user.deliveryType,o.contact=e.user.contact,admin.popup({title:"内部合同",area:["100%","100%"],btn:["生成合同","打印","关闭"],maxmin:!0,yes:function(e,t){layer.confirm("确定生成合同编号吗？",function(){admin.req({type:"post",data:{qids:c},url:setter.baseUrl+"epc/pcborder/createContractNo",success:function(){layer.alert("提交成功！"),layui.table.reload("inside_cotract_Tabpcb"),layer.close(e)}})})},btn2:function(e,t){document.body.innerHTML=document.getElementById("quoteContract_AllB").innerHTML,window.print(),window.location.reload()},success:function(e,i){o.htmlType=1,console.log(o),view(this.id).render(h,o).done(function(){if(p=null,1===f){var e,i=d(".contract-module-three-tab tbody tr").eq(0).find("td").size(),o=t.data.length;o<4?e=4:o>4&&(e=7);for(var r=i;r<e;r++)d(".contract-module-three-tab tbody").find("tr").append("<td></td>");if(4==e)for(var r=1;r<e;r++)d(".contract-module-three-tab tbody tr").find("td").eq(r).css({width:"27.3%"});else for(var r=1;r<e;r++)d(".contract-module-three-tab tbody tr").find("td").eq(r).css({width:"13.6%"})}var n,a=[],s=[];if(null!=t.data){for(var c=0,r=0;r<t.data.length;r++)a[r]=t.data[r].gmtModified,s[r]=t.data[r].gmtCreate,null==a[r]&&c++;c==t.data.length?(n=l.TimeContrast(s),console.log(s)):n=l.TimeContrast(a),d("#contractBotDate").text(n),d("#topDate").text(n)}})}})}})}}),table.on("tool(inside_cotract_Tabpcb)",function(e){var t=e.data;console.log(t);for(var i=t.quoteOrderNo,r=new Object,n=0,a=0,s=0;s<o.length;s++)i==o[s].quoteOrderNo&&(console.log("sd_len:"+n),r[n]=o[s],n+=1,a+=o[s].totalFee),console.log("pcbtabObj[i].invoiceNo:"+o[s].quoteOrderNo);var c=t.quoteOrderNo;if("del"===e.event)layer.confirm("确定退回报价单号为［"+c+"］",function(t){admin.req({type:"post",data:{quoteOrderNo:c},url:setter.baseUrl+"epc/pcborder/backInternalContract",success:function(){layer.alert("已退回报价单号为［"+c+"］"),e.del(),layui.table.reload("inside_cotract_Tabpcb"),layer.close(t)}})});else if("search-contract"===e.event){var u={data:{}};admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+t.userId,success:function(e){u.userName=e.user.userName,u.companyName=e.user.companName,u.country=e.user.country,u.city=e.user.city,u.address=e.user.address,u.mobilePhone=e.user.mobilePhone,u.postcode=e.user.postcode,u.paymentType=e.user.paymentType,u.deliveryType=e.user.deliveryType,u.contact=e.user.contact,admin.req({type:"post",data:{quoteOrderNo:c},url:setter.baseUrl+"epc/pcborder/infoByQuoteOrderNo",success:function(e){var t,i,o=null;u.data=r,u.total=a,console.log(u),d.each(e.data,function(e,d){null==o||""==o?(i=1,o=d.productNo,t="marketManagement/iframeWindow/quote_contractA"):null!=o&&o!=d.productNo&&(i=2,t="marketManagement/iframeWindow/quote_contractB",layer.msg("选择了不同型号"))}),admin.popup({title:"内部合同",area:["100%","100%"],btn:["打印","关闭"],maxmin:!0,yes:function(e,t){var d;"1"==i?d="quoteContract_AllA":"2"==i&&(d="quoteContract_AllB"),layer.alert(d),document.body.innerHTML=document.getElementById(d).innerHTML,window.print(),window.location.reload()},success:function(e,a){u.htmlType=1,console.log(u),view(this.id).render(t,u).done(function(){if(o=null,1===i){var e,t=d(".contract-module-three-tab tbody tr").eq(0).find("td").size();u.data.length;n<4?e=4:n>4&&(e=7);for(var a=t;a<e;a++)d(".contract-module-three-tab tbody").find("tr").append("<td></td>");if(4==e)for(var a=1;a<e;a++)d(".contract-module-three-tab tbody tr").find("td").eq(a).css({width:"27.3%"});else for(var a=1;a<e;a++)d(".contract-module-three-tab tbody tr").find("td").eq(a).css({width:"13.6%"})}var s,c=[],f=[];if(null!=r){for(var h=0,a=0;a<n;a++)c[a]=r[a].gmtModified,f[a]=r[a].gmtCreate,null==c[a]&&h++;h==n?(s=l.TimeContrast(f),console.log(f)):s=l.TimeContrast(c),d("#contractBotDate").text(s),d("#topDate").text(s)}})}})}})}})}else"search-list"===e.event&&(layer.msg("查看数据明细"),admin.popup({title:"编辑PCB订单信息",area:["76%","90%"],btn:["立即提交","取消"],yes:function(){d(".submit-ok").click(),layer.msg("yes")},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderPCB_update",t).done(function(){form.render(null,""),form.on("submit(LAY-pcborder-update-submit)",function(e){var t=e.field;return console.log("提交的字段信息："+JSON.stringify(t)),admin.req({type:"post",url:setter.baseUrl+"epc/pcborder/update",data:t,done:function(e){layer.msg("订单信息修改成功"),layui.table.reload("inside_cotract_Tabpcb")},fail:function(e){layer.msg("订单信息修改失败，请稍后再试！")}}),layer.close(i),!1})})}}))}),table.on("row(inside_cotract_Tabpcb)",function(e){var t=e.data;admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+t.userId,success:function(e){a.userName=e.user.userName,a.companyName=e.user.companName,a.country=e.user.country,a.city=e.user.city,a.address=e.user.address}})}),table.on("tool(icontract_Tabstencil)",function(e){for(var t=e.data,i=t.quoteOrderNo,l=new Object,o=0,n=0,a=0;a<r.length;a++)i==r[a].quoteOrderNo&&(l[o]=r[a],o+=1,n+=r[a].totalStencilFee);var s=t.quoteOrderNo;if("del"===e.event)layer.confirm("确定退回报价单号为［"+s+"］",function(t){admin.req({type:"post",data:{quoteOrderNo:s},url:setter.baseUrl+"epc/stencilorder/backInternalContract",success:function(){layer.alert("已退回报价单号为［"+s+"］"),e.del(),layui.table.reload("icontract_Tabstencil"),layer.close(t)}})});else if("search-contract"===e.event){var c={data:{}};admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+t.userId,success:function(e){c.userName=e.user.userName,c.companyName=e.user.companName,c.country=e.user.country,c.city=e.user.city,c.address=e.user.address,c.mobilePhone=e.user.mobilePhone,c.postcode=e.user.postcode,admin.req({type:"post",data:{quoteOrderNo:s},url:setter.baseUrl+"epc/pcborder/infoByQuoteOrderNo",success:function(e){var t,i="marketManagement/iframeWindow/quote_contractS",o=null;c.data=l,c.total=n,d.each(e.data,function(e,i){null==o||""==o?(t=1,o=i.productNo):null!=o&&o!=i.productNo&&(t=2)}),admin.popup({title:"内部合同",area:["100%","100%"],btn:["打印","关闭"],maxmin:!0,yes:function(e,t){var i="quoteContract_AllS";document.body.innerHTML=document.getElementById(i).innerHTML,window.print(),window.location.reload()},success:function(e,t){c.htmlType=1,view(this.id).render(i,c).done(function(){console.log(c),o=null})}})}})}})}else"search-list"===e.event&&(layer.msg("查看数据明细"),admin.popup({title:"编辑 Stencil钢网 订单信息",area:["885px","550px"],btn:["立即提交","取消"],yes:function(){d(".submitStencilUpB").click(),table.reload("icontract_Tabstencil")},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderStencil_updateB",t).done(function(){})}}))}),table.on("toolbar(icontract_Tabstencil)",function(e){var t=table.checkStatus(e.config.id),i=t.data,d={data:{}};d.data=t.data;var l=0;if(i.length>=7)return layer.alert("最多只能选择6条数据！！"),!1;for(var o=0;o<i.length;o++)l+=parseFloat(i[o].totalStencilFee);switch(d.total=l,d.userName=a.userName,d.companyName=a.companName,d.country=a.country,d.city=a.city,d.address=a.address,d.mobilePhone=i.user.mobilePhone,d.postcode=i.user.postcode,e.event){case"submit":for(var r=null,n=null,s=i.map(function(e){return e.id}).join(","),o=0;o<i.length;o++){var c=i[o].productNo.substring(0,3);if(null==r?r=i[o].invoiceNo:null!=r&&"-1"==r.indexOf(i[o].invoiceNo)&&(r+=","+i[o].invoiceNo),null!=n&&n!=c)return layer.alert("请选择同一个客户下单"),!1;n=c}var u="marketManagement/iframeWindow/quote_contractS",f=null;admin.popup({title:"内部合同",area:["100%","100%"],btn:["生成合同","打印","关闭"],maxmin:!0,yes:function(e,t){layer.confirm("确定生成合同编号吗？",function(){admin.req({type:"post",data:{sids:s},url:setter.baseUrl+"epc/stencilorder/createContractNo",success:function(){layer.alert("提交成功！"),table.reload("icontract_Tabstencil"),layer.close(e)}})})},btn2:function(e,t){document.body.innerHTML=document.getElementById("quoteContract_AllB").innerHTML,window.print(),window.location.reload()},success:function(e,t){d.htmlType=1,view(this.id).render(u,d).done(function(){f=null})}})}}),form.on("submit(inside-contract-search)",function(e){var t=e.field;console.log(t),table.reload("inside_cotract_Tabpcb",{where:t})}),e("market_insideContract",{})});