/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate","jsTools","requestInterface","uploadCommon","filePathProcess"],function(e){function t(){table.render({elem:"#inside_cotract_Tabpcb",url:setter.baseUrl+"epc/pcborder/internalContract",toolbar:"#inside_cotract_option",cellMinWidth:80,id:"inside_cotract_Tabpcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"内部编码",minWidth:130,fixed:"left"},{field:"orderType",title:"订单类型",edit:"text",Width:110,templet:"#order_type"},{field:"gerberName",title:"文件名",edit:"text",minWidth:160},{field:"pcbName",title:"F/N",edit:"text",minWidth:130},{field:"orderNo",title:"客户PO",edit:"text"},{field:"quoteOrderNo",title:"报价单号",edit:"text",minWidth:130},{field:"gmtCreate",title:"创建时间",edit:"text"},{field:"gmtModified",title:"修改时间",edit:"text"},{field:"pcbType",title:"PCB类型",edit:"text",minWidth:130,hide:!0},{field:"dimensionsX",title:"单只(X)",edit:"text",hide:!0},{field:"dimensionsY",title:"单只(Y)",edit:"text",hide:!0},{field:"panelSizeX",title:"Panel(X)",edit:"text",width:90,hide:!0},{field:"panelSizeY",title:"Panel(Y)",edit:"text",width:90,hide:!0},{field:"panelWayX",title:"PanelWay(X)",edit:"text",width:110,hide:!0},{field:"panelWayY",title:"PanelWay(Y)",edit:"text",width:110,hide:!0},{field:"finishThickness",title:"板厚",edit:"text",hide:!0},{field:"layerNum",title:"层数",edit:"text",width:80,hide:!0},{field:"surfaceFinish",title:"表面处理",edit:"text",hide:!0},{field:"quantityPcs",title:"PCS数量",edit:"text",hide:!0},{field:"quantityPanel",title:"Panel数量",edit:"text",hide:!0},{field:"engineeringFee",title:"工程费",edit:"text",hide:!0},{field:"boardFee",title:"板费",edit:"text",hide:!0},{field:"testCostFee",title:"测试费",edit:"text",hide:!0},{field:"toolingFee",title:"工具费",edit:"text",hide:!0},{field:"overworkFee",title:"加急费",edit:"text",hide:!0},{field:"postFee",title:"运费",edit:"text",hide:!0},{field:"subtotal",title:"总价",edit:"text",hide:!0},{field:"boardType",title:"出货方式",edit:"text",hide:!0},{field:"status",title:"状态",align:"center",templet:"#Tabtb-pcb-market-iQuote-status",width:110,hide:!0},{field:"areaSq",title:"面积",edit:"text",hide:!0},{field:"material",title:"材料",edit:"text",hide:!0},{field:"productCode",title:"材料型号",edit:"text",hide:!0},{field:"productNo",title:"材料商",edit:"text",hide:!0},{field:"tg",title:"TG",edit:"text",hide:!0},{field:"cti",title:"CTI",edit:"text",hide:!0},{field:"halogenFree",title:"无卤素",edit:"text",hide:!0},{field:"outerLayerCopper",title:"外层铜厚",edit:"text",hide:!0},{field:"innerLayerCopper",title:"内层铜厚",edit:"text",hide:!0},{field:"heatConductivity",title:"导热系数",edit:"text",hide:!0},{field:"silkScreenTopColor",title:"字符颜色",edit:"text",hide:!0},{field:"solderMaskTopColor",title:"阻焊颜色",edit:"text",hide:!0},{field:"pthCopper",title:"孔铜",edit:"text",hide:!0},{field:"remark",title:"备注",edit:"text",hide:!0},{field:"buildTime",title:"交期",edit:"text",hide:!0},{field:"weight",title:"重量",edit:"text",hide:!0},{field:"thickness",title:"表面处理厚度",edit:"text",hide:!0},{field:"surfaceArea",title:"沉金面积",edit:"text",hide:!0},{field:"minHoleSize",title:"最小孔",edit:"text",hide:!0},{field:"nofHoles",title:"孔数",edit:"text",hide:!0},{field:"viaProcess",title:"过孔方式",edit:"text",hide:!0},{field:"stackUp",title:"压合",edit:"text",hide:!0},{field:"status",title:"状态",edit:"text",hide:!0},{field:"nofCore",title:"芯板数量",edit:"text",hide:!0},{field:"nofPp",title:"PP数量",edit:"text",hide:!0},{field:"innerMinSpacing",title:"内层(线宽/线距)",edit:"text",hide:!0},{field:"outerMinSpacing",title:"外层最小(线宽/线距)",edit:"text",hide:!0},{field:"bgaSize",title:"BGA大小",edit:"text",hide:!0},{field:"testPoinType",title:"测试类型",edit:"text",hide:!0},{field:"testPoint",title:"测试点",edit:"text",hide:!0},{field:"testPointType",title:"测试方式",edit:"text",hide:!0},{field:"userId",title:"用户ID",edit:"text",hide:!0},{field:"uuid",title:"uuid",edit:"text",hide:!0},{field:"panelRoutingPath",title:"锣程",edit:"text",hide:!0},{field:"bevellingCamfer",title:"斜边",edit:"text",hide:!0},{field:"blindHoles",title:"盲孔",edit:"text",hide:!0},{field:"buriedHoles",title:"埋孔",edit:"text",hide:!0},{field:"carbon",title:"碳油",edit:"text",hide:!0},{field:"contrlImpeance",title:"阻抗",edit:"text",hide:!0},{field:"deepMillRouting",title:"控深锣",edit:"text",hide:!0},{field:"punchingHoles",title:"冲孔数",edit:"text",hide:!0},{field:"punchingSlots",title:"冲槽数",edit:"text",hide:!0},{field:"peelable",title:"兰胶",edit:"text",hide:!0},{field:"peelableBrand",title:"兰胶型号",edit:"text",hide:!0},{field:"edgePlated",title:"金属边",edit:"text",hide:!0},{field:"halfHoleLated",title:"半孔板",edit:"text",hide:!0},{field:"orderId",title:"订单ID",edit:"text",hide:!0},{field:"orderNo",title:"订单号",edit:"text",hide:!0},{field:"invoiceNo",title:"合同号",edit:"text",hide:!0},{field:"id",title:"ID",hide:!0},{field:"userId",title:"User ID",hide:!0},{field:"gerberPath",title:"gerberPath",edit:"text",hide:!0},{field:"isExistIndicator",title:"isExistIndicator",edit:"text",hide:!0},{field:"isExistSmt",title:"isExistSmt",edit:"text",hide:!0},{field:"quoteConfigIdList",title:"quoteConfigIdList",edit:"text",hide:!0},{field:"quoteConfigIds",title:"quoteConfigIds",edit:"text",hide:!0},{field:"quoteGerberName",title:"quoteGerberName",edit:"text",hide:!0},{field:"quoteGerberPath",title:"quoteGerberPath",edit:"text",hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",edit:"text",hide:!0},{field:"solderMaskBotColor",title:"solderMaskBotColor",edit:"text",hide:!0},{fixed:"right",title:"操作",toolbar:"#inside_cotract_Bar",width:220}]],done:function(e,t,i){var d=e.data;r=d}})}function i(){table.render({elem:"#icontract_Tabstencil",url:setter.baseUrl+"epc/stencilorder/internalContract",toolbar:"#inside_cotract_option",cellMinWidth:80,id:"icontract_Tabstencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"内部编码",minWidth:130,fixed:"left"},{field:"orderType",title:"订单类型",edit:"text",Width:110,templet:"#order_type"},{field:"gerberName",title:"文件名",edit:"text",minWidth:160},{field:"pcbName",title:"F/N",edit:"text",minWidth:130},{field:"orderNo",title:"客户PO",edit:"text"},{field:"quoteOrderNo",title:"报价单号",edit:"text",minWidth:130},{field:"gmtCreate",title:"创建时间",edit:"text"},{field:"gmtModified",title:"修改时间",edit:"text"},{field:"pcbType",title:"PCB类型",edit:"text",minWidth:130,hide:!0},{field:"dimensionsX",title:"单只(X)",edit:"text",hide:!0},{field:"dimensionsY",title:"单只(Y)",edit:"text",hide:!0},{field:"panelSizeX",title:"Panel(X)",edit:"text",width:90,hide:!0},{field:"panelSizeY",title:"Panel(Y)",edit:"text",width:90,hide:!0},{field:"panelWayX",title:"PanelWay(X)",edit:"text",width:110,hide:!0},{field:"panelWayY",title:"PanelWay(Y)",edit:"text",width:110,hide:!0},{field:"finishThickness",title:"板厚",edit:"text",hide:!0},{field:"layerNum",title:"层数",edit:"text",width:80,hide:!0},{field:"surfaceFinish",title:"表面处理",edit:"text",hide:!0},{field:"quantityPcs",title:"PCS数量",edit:"text",hide:!0},{field:"quantityPanel",title:"Panel数量",edit:"text",hide:!0},{field:"engineeringFee",title:"工程费",edit:"text",hide:!0},{field:"boardFee",title:"板费",edit:"text",hide:!0},{field:"testCostFee",title:"测试费",edit:"text",hide:!0},{field:"toolingFee",title:"工具费",edit:"text",hide:!0},{field:"overworkFee",title:"加急费",edit:"text",hide:!0},{field:"postFee",title:"运费",edit:"text",hide:!0},{field:"subtotal",title:"总价",edit:"text",hide:!0},{field:"boardType",title:"出货方式",edit:"text",hide:!0},{field:"status",title:"状态",align:"center",templet:"#Tabtb-pcb-market-iQuote-status",width:110,hide:!0},{field:"areaSq",title:"面积",edit:"text",hide:!0},{field:"material",title:"材料",edit:"text",hide:!0},{field:"productCode",title:"材料型号",edit:"text",hide:!0},{field:"productNo",title:"材料商",edit:"text",hide:!0},{field:"tg",title:"TG",edit:"text",hide:!0},{field:"cti",title:"CTI",edit:"text",hide:!0},{field:"halogenFree",title:"无卤素",edit:"text",hide:!0},{field:"outerLayerCopper",title:"外层铜厚",edit:"text",hide:!0},{field:"innerLayerCopper",title:"内层铜厚",edit:"text",hide:!0},{field:"heatConductivity",title:"导热系数",edit:"text",hide:!0},{field:"silkScreenTopColor",title:"字符颜色",edit:"text",hide:!0},{field:"solderMaskTopColor",title:"阻焊颜色",edit:"text",hide:!0},{field:"pthCopper",title:"孔铜",edit:"text",hide:!0},{field:"remark",title:"备注",edit:"text",hide:!0},{field:"buildTime",title:"交期",edit:"text",hide:!0},{field:"weight",title:"重量",edit:"text",hide:!0},{field:"thickness",title:"表面处理厚度",edit:"text",hide:!0},{field:"surfaceArea",title:"沉金面积",edit:"text",hide:!0},{field:"minHoleSize",title:"最小孔",edit:"text",hide:!0},{field:"nofHoles",title:"孔数",edit:"text",hide:!0},{field:"viaProcess",title:"过孔方式",edit:"text",hide:!0},{field:"stackUp",title:"压合",edit:"text",hide:!0},{field:"status",title:"状态",edit:"text",hide:!0},{field:"nofCore",title:"芯板数量",edit:"text",hide:!0},{field:"nofPp",title:"PP数量",edit:"text",hide:!0},{field:"innerMinSpacing",title:"内层(线宽/线距)",edit:"text",hide:!0},{field:"outerMinSpacing",title:"外层最小(线宽/线距)",edit:"text",hide:!0},{field:"bgaSize",title:"BGA大小",edit:"text",hide:!0},{field:"testPoinType",title:"测试类型",edit:"text",hide:!0},{field:"testPoint",title:"测试点",edit:"text",hide:!0},{field:"testPointType",title:"测试方式",edit:"text",hide:!0},{field:"userId",title:"用户ID",edit:"text",hide:!0},{field:"uuid",title:"uuid",edit:"text",hide:!0},{field:"panelRoutingPath",title:"锣程",edit:"text",hide:!0},{field:"bevellingCamfer",title:"斜边",edit:"text",hide:!0},{field:"blindHoles",title:"盲孔",edit:"text",hide:!0},{field:"buriedHoles",title:"埋孔",edit:"text",hide:!0},{field:"carbon",title:"碳油",edit:"text",hide:!0},{field:"contrlImpeance",title:"阻抗",edit:"text",hide:!0},{field:"deepMillRouting",title:"控深锣",edit:"text",hide:!0},{field:"punchingHoles",title:"冲孔数",edit:"text",hide:!0},{field:"punchingSlots",title:"冲槽数",edit:"text",hide:!0},{field:"peelable",title:"兰胶",edit:"text",hide:!0},{field:"peelableBrand",title:"兰胶型号",edit:"text",hide:!0},{field:"edgePlated",title:"金属边",edit:"text",hide:!0},{field:"halfHoleLated",title:"半孔板",edit:"text",hide:!0},{field:"orderId",title:"订单ID",edit:"text",hide:!0},{field:"orderNo",title:"订单号",edit:"text",hide:!0},{field:"invoiceNo",title:"合同号",edit:"text",hide:!0},{field:"id",title:"ID",hide:!0},{field:"userId",title:"User ID",hide:!0},{field:"gerberPath",title:"gerberPath",edit:"text",hide:!0},{field:"isExistIndicator",title:"isExistIndicator",edit:"text",hide:!0},{field:"isExistSmt",title:"isExistSmt",edit:"text",hide:!0},{field:"quoteConfigIdList",title:"quoteConfigIdList",edit:"text",hide:!0},{field:"quoteConfigIds",title:"quoteConfigIds",edit:"text",hide:!0},{field:"quoteGerberName",title:"quoteGerberName",edit:"text",hide:!0},{field:"quoteGerberPath",title:"quoteGerberPath",edit:"text",hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",edit:"text",hide:!0},{field:"solderMaskBotColor",title:"solderMaskBotColor",edit:"text",hide:!0},{fixed:"right",title:"操作",toolbar:"#inside_cotract_BarS",width:220}]],done:function(e,t,i){var d=e.data;a=d}})}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var d=layui.jquery,l=layui.jsTools,o=layui.requestInterface,n=(layui.uploadCommon,layui.filePathProcess);t();var r,a,c={orderType:0,customerSn:null},s={userName:"",companyName:"",country:"",city:"",address:"",mobilePhone:"",postcode:""};element.on("tab(tab-internalQuote)",function(e){c.orderType=e.index,1===c.orderType?i():2===c.orderType?console.log("SMT订单选项卡"):t()}),table.on("toolbar(inside_cotract_Tabpcb)",function(e){var t=table.checkStatus(e.config.id),i=t.data,o={data:{}};o.data=t.data;for(var n=0,r=0;r<i.length;r++)n+=parseFloat(i[r].totalFee);switch(o.total=n,e.event){case"submit":for(var a=null,c=null,s=null,r=0;r<i.length;r++){var u=i[r].productNo.substring(0,3);if(null==a?a=i[r].invoiceNo:null!=a&&"-1"==a.indexOf(i[r].invoiceNo)&&(a+=","+i[r].invoiceNo),null!=c&&c!=u)return layer.alert("请选择同一个客户下单"),!1;c=u,null==s?s=i[r].id:s+=","+i[r].id}console.log("qids:"+s);var f,h="marketManagement/iframeWindow/quote_contractB",p=null;admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+i[0].userId,success:function(e){o.userName=e.user.userName,o.companyName=e.user.companName,o.country=e.user.country,o.city=e.user.city,o.address=e.user.address,o.mobilePhone=e.user.mobilePhone,o.postcode=e.user.postcode,o.paymentType=e.user.paymentType,o.deliveryType=e.user.deliveryType,o.contact=e.user.contact,admin.popup({title:"内部合同",area:["100%","100%"],btn:["生成合同","打印","关闭"],maxmin:!0,yes:function(e,t){layer.confirm("确定生成合同编号吗？",function(){admin.req({type:"post",data:{qids:s},url:setter.baseUrl+"epc/pcborder/createContractNo",success:function(){layer.alert("提交成功！"),layui.table.reload("inside_cotract_Tabpcb"),layer.close(e)}})})},btn2:function(e,t){document.body.innerHTML=document.getElementById("quoteContract_AllB").innerHTML,window.print(),window.location.reload()},success:function(e,i){o.htmlType=1,console.log(o),view(this.id).render(h,o).done(function(){if(p=null,1===f){var e,i=d(".contract-module-three-tab tbody tr").eq(0).find("td").size(),o=t.data.length;o<4?e=4:o>4&&(e=7);for(var n=i;n<e;n++)d(".contract-module-three-tab tbody").find("tr").append("<td></td>");if(4==e)for(var n=1;n<e;n++)d(".contract-module-three-tab tbody tr").find("td").eq(n).css({width:"27.3%"});else for(var n=1;n<e;n++)d(".contract-module-three-tab tbody tr").find("td").eq(n).css({width:"13.6%"})}var r,a=[],c=[];if(null!=t.data){for(var s=0,n=0;n<t.data.length;n++)a[n]=t.data[n].gmtModified,c[n]=t.data[n].gmtCreate,null==a[n]&&s++;s==t.data.length?(r=l.TimeContrast(c),console.log(c)):r=l.TimeContrast(a),d("#contractBotDate").text(r.substring(0,10)),d("#topDate").text(r.substring(0,10))}})}})}})}}),table.on("tool(inside_cotract_Tabpcb)",function(e){var t=e.data;console.log(t);for(var i=t.quoteOrderNo,o=new Object,a=0,c=0,s=0;s<r.length;s++)i==r[s].quoteOrderNo&&(console.log("sd_len:"+a),o[a]=r[s],a+=1,c+=r[s].totalFee),console.log("pcbtabObj[i].invoiceNo:"+r[s].quoteOrderNo);var u=t.quoteOrderNo;if("del"===e.event)layer.confirm("确定退回报价单号为［"+u+"］",function(t){admin.req({type:"post",data:{quoteOrderNo:u},url:setter.baseUrl+"epc/pcborder/backInternalContract",success:function(){layer.alert("已退回报价单号为［"+u+"］"),e.del(),layui.table.reload("inside_cotract_Tabpcb"),layer.close(t)}})});else if("search-contract"===e.event){var f={data:{}};admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+t.userId,success:function(e){f.userName=e.user.userName,f.companyName=e.user.companName,f.country=e.user.country,f.city=e.user.city,f.address=e.user.address,f.mobilePhone=e.user.mobilePhone,f.postcode=e.user.postcode,f.paymentType=e.user.paymentType,f.deliveryType=e.user.deliveryType,f.contact=e.user.contact,admin.req({type:"post",data:{quoteOrderNo:u},url:setter.baseUrl+"epc/pcborder/infoByQuoteOrderNo",success:function(e){var t,i,n=null;f.data=o,f.total=c,console.log(f),d.each(e.data,function(e,d){null==n||""==n?(i=1,n=d.productNo,t="marketManagement/iframeWindow/quote_contractA"):null!=n&&n!=d.productNo&&(i=2,t="marketManagement/iframeWindow/quote_contractB",layer.msg("选择了不同型号"))}),admin.popup({title:"内部合同",area:["100%","100%"],btn:["打印","关闭"],maxmin:!0,yes:function(e,t){var d;"1"==i?d="quoteContract_AllA":"2"==i&&(d="quoteContract_AllB"),layer.alert(d),document.body.innerHTML=document.getElementById(d).innerHTML,window.print(),window.location.reload()},success:function(e,r){f.htmlType=1,console.log(f),view(this.id).render(t,f).done(function(){if(n=null,1===i){var e,t=d(".contract-module-three-tab tbody tr").eq(0).find("td").size();f.data.length;a<4?e=4:a>4&&(e=7);for(var r=t;r<e;r++)d(".contract-module-three-tab tbody").find("tr").append("<td></td>");if(4==e)for(var r=1;r<e;r++)d(".contract-module-three-tab tbody tr").find("td").eq(r).css({width:"27.3%"});else for(var r=1;r<e;r++)d(".contract-module-three-tab tbody tr").find("td").eq(r).css({width:"13.6%"})}var c,s=[],u=[];if(null!=o){for(var h=0,r=0;r<a;r++)s[r]=o[r].gmtModified,u[r]=o[r].gmtCreate,null==s[r]&&h++;h==a?(c=l.TimeContrast(u),console.log(u)):c=l.TimeContrast(s),d("#contractBotDate").text(c.substring(0,10)),d("#topDate").text(c.substring(0,10))}})}})}})}})}else"search-list"===e.event?(layer.msg("查看数据明细"),t.tabId="inside_cotract_Tabpcb",admin.popup({title:"编辑PCB订单信息",area:["820px","90%"],btn:["立即提交","取消"],yes:function(){d(".submit-ok").click(),layer.msg("yes")},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderPCB_update",t).done(function(){form.render(null,"")})}})):"inside_contract_fileMana"==e.event&&(t.orderType="pcbOrder",t.retab="inside_cotract_Tabpcb",t=n.isInternal(t),console.log(t),admin.popup({title:"PCB订单资料管理",area:["870px","303px"],success:function(e,i){view(this.id).render("epcManagement/iframeWindow/file_management",t).done(function(){})},end:function(){localStorage.removeItem("saveBackResult")}}))}),table.on("row(inside_cotract_Tabpcb)",function(e){var t=e.data;admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+t.userId,success:function(e){s.userName=e.user.userName,s.companyName=e.user.companName,s.country=e.user.country,s.city=e.user.city,s.address=e.user.address}})}),table.on("tool(icontract_Tabstencil)",function(e){for(var t=e.data,i=t.quoteOrderNo,l=new Object,o=0,r=0,c=0;c<a.length;c++)i==a[c].quoteOrderNo&&(l[o]=a[c],o+=1,r+=a[c].totalStencilFee);var s=t.quoteOrderNo;if("del"===e.event)layer.confirm("确定退回报价单号为［"+s+"］",function(t){admin.req({type:"post",data:{quoteOrderNo:s},url:setter.baseUrl+"epc/stencilorder/backInternalContract",success:function(){layer.alert("已退回报价单号为［"+s+"］"),e.del(),layui.table.reload("icontract_Tabstencil"),layer.close(t)}})});else if("search-contract"===e.event){var u={data:{}};admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+t.userId,success:function(e){u.userName=e.user.userName,u.companyName=e.user.companName,u.country=e.user.country,u.city=e.user.city,u.address=e.user.address,u.mobilePhone=e.user.mobilePhone,u.postcode=e.user.postcode,u.contact=e.user.contact,admin.req({type:"post",data:{quoteOrderNo:s},url:setter.baseUrl+"epc/pcborder/infoByQuoteOrderNo",success:function(e){var t,i="marketManagement/iframeWindow/quote_contractS",o=null;u.data=l,u.total=r,d.each(e.data,function(e,i){null==o||""==o?(t=1,o=i.productNo):null!=o&&o!=i.productNo&&(t=2)}),admin.popup({title:"内部合同",area:["100%","100%"],btn:["打印","关闭"],maxmin:!0,yes:function(e,t){var i="quoteContract_AllS";document.body.innerHTML=document.getElementById(i).innerHTML,window.print(),window.location.reload()},success:function(e,t){u.htmlType=1,view(this.id).render(i,u).done(function(){console.log(u),o=null})}})}})}})}else"search-list"===e.event?(layer.msg("查看数据明细"),admin.popup({title:"编辑 Stencil钢网 订单信息",area:["885px","550px"],btn:["立即提交","取消"],yes:function(){d(".submitStencilUpB").click(),table.reload("icontract_Tabstencil")},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderStencil_updateB",t).done(function(){})}})):"inside_contract_fileMana"==e.event&&(t.orderType="stencilOrder",t.retab="icontract_Tabstencil",t=n.isInternal(t),console.log(t),admin.popup({title:"PCB订单资料管理",area:["45%","40%"],success:function(e,i){view(this.id).render("epcManagement/iframeWindow/file_management",t).done(function(){})},end:function(){localStorage.removeItem("saveBackResult")}}))}),table.on("toolbar(icontract_Tabstencil)",function(e){var t=table.checkStatus(e.config.id),i=t.data,n={data:{}};n.data=t.data;for(var r=0,a=0;a<i.length;a++)r+=parseFloat(i[a].totalStencilFee);n.total=r;var c=o.ContractGetUserInfo(setter.baseUrl+"sys/consumer/user/info/"+i[0].userId);switch(n.userName=c.userName,n.companyName=c.companName,n.country=c.country,n.city=c.city,n.address=c.address,n.mobilePhone=c.mobilePhone,n.postcode=c.postcode,n.contact=c.contact,n.paymentType=c.paymentType,n.deliveryType=c.deliveryType,e.event){case"submit":for(var s=null,u=null,f=i.map(function(e){return e.id}).join(","),a=0;a<i.length;a++){var h=i[a].productNo.substring(0,3);if(null==s?s=i[a].invoiceNo:null!=s&&"-1"==s.indexOf(i[a].invoiceNo)&&(s+=","+i[a].invoiceNo),null!=u&&u!=h)return layer.alert("请选择同一个客户下单"),!1;u=h}var p="marketManagement/iframeWindow/quote_contractS",m=null;admin.popup({title:"内部合同",area:["100%","100%"],btn:["生成合同","打印","关闭"],maxmin:!0,yes:function(e,t){layer.confirm("确定生成合同编号吗？",function(){admin.req({type:"post",data:{sids:f},url:setter.baseUrl+"epc/stencilorder/createContractNo",success:function(){layer.alert("提交成功！"),table.reload("icontract_Tabstencil"),layer.close(e)}})})},btn2:function(e,t){document.body.innerHTML=document.getElementById("quoteContract_AllB").innerHTML,window.print(),window.location.reload()},success:function(e,i){n.htmlType=1,view(this.id).render(p,n).done(function(){m=null;var e,i=[],o=[];if(null!=t.data){for(var n=0,r=0;r<t.data.length;r++)i[r]=t.data[r].gmtModified,o[r]=t.data[r].gmtCreate,null==i[r]&&n++;n==t.data.length?(e=l.TimeContrast(o),console.log(o)):e=l.TimeContrast(i),d("#contractBotDateS").text(e.substring(0,10)),d("#topDate").text(e.substring(0,10))}})}})}}),form.on("submit(inside-contract-search)",function(e){var t,i=e.field;0===c.orderType?t="inside_cotract_Tabpcb":1===c.orderType&&(t="icontract_Tabstencil"),table.reload(t,{where:i})}),form.on("select(inside-contract-sel)",function(e){d("*[lay-filter='inside-contract-search']").click()}),d(".inside-contract-search input").bind("input propertychange",function(e){d("*[lay-filter='inside-contract-search']").click()}),e("market_insideContract",{})});