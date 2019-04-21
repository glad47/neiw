/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate","jsTools"],function(e){function t(){table.render({elem:"#iquote_Tabpcb",url:setter.baseUrl+"/epc/pcborder/internalQuoteList",toolbar:"#tbiquotePcb",cellMinWidth:80,id:"iquote_Tabpcb",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"orderType",title:"订单类型",Width:110,templet:"#order_type"},{field:"productNo",title:"内部编码",minWidth:130},{field:"gerberName",title:"文件名",minWidth:160},{field:"pcbName",title:"F/N",minWidth:130},{field:"orderNo",title:"客户PO"},{field:"quoteOrderNo",title:"报价单号",minWidth:130},{field:"gmtCreate",title:"创建时间"},{field:"gmtModified",title:"修改时间"},{field:"pcbType",title:"PCB类型",minWidth:130,hide:!0},{field:"dimensionsX",title:"单只(X)",hide:!0},{field:"dimensionsY",title:"单只(Y)",hide:!0},{field:"panelSizeX",title:"Panel(X)",width:90,hide:!0},{field:"panelSizeY",title:"Panel(Y)",width:90,hide:!0},{field:"panelWayX",title:"PanelWay(X)",width:110,hide:!0},{field:"panelWayY",title:"PanelWay(Y)",width:110,hide:!0},{field:"finishThickness",title:"板厚",hide:!0},{field:"layerNum",title:"层数",width:80,hide:!0},{field:"surfaceFinish",title:"表面处理",hide:!0},{field:"quantityPcs",title:"PCS数量",hide:!0},{field:"quantityPanel",title:"Panel数量",hide:!0},{field:"engineeringFee",title:"工程费",hide:!0},{field:"boardFee",title:"板费",hide:!0},{field:"testCostFee",title:"测试费",hide:!0},{field:"toolingFee",title:"工具费",hide:!0},{field:"overworkFee",title:"加急费",hide:!0},{field:"postFee",title:"运费",hide:!0},{field:"subtotal",title:"总价",hide:!0},{field:"boardType",title:"出货方式",hide:!0},{field:"status",title:"状态",align:"center",templet:"#Tabtb-pcb-market-iQuote-status",width:110,hide:!0},{field:"areaSq",title:"面积",hide:!0},{field:"material",title:"材料",hide:!0},{field:"productCode",title:"材料型号",hide:!0},{field:"productNo",title:"材料商",hide:!0},{field:"tg",title:"TG",hide:!0},{field:"cti",title:"CTI",hide:!0},{field:"halogenFree",title:"无卤素",hide:!0},{field:"outerLayerCopper",title:"外层铜厚",hide:!0},{field:"innerLayerCopper",title:"内层铜厚",hide:!0},{field:"heatConductivity",title:"导热系数",hide:!0},{field:"silkScreenTopColor",title:"字符颜色",hide:!0},{field:"solderMaskTopColor",title:"阻焊颜色",hide:!0},{field:"pthCopper",title:"孔铜",hide:!0},{field:"remark",title:"备注",hide:!0},{field:"buildTime",title:"交期",hide:!0},{field:"weight",title:"重量",hide:!0},{field:"thickness",title:"表面处理厚度",hide:!0},{field:"surfaceArea",title:"沉金面积",hide:!0},{field:"minHoleSize",title:"最小孔",hide:!0},{field:"nofHoles",title:"孔数",hide:!0},{field:"viaProcess",title:"过孔方式",hide:!0},{field:"stackUp",title:"压合",hide:!0},{field:"status",title:"状态",hide:!0},{field:"nofCore",title:"芯板数量",hide:!0},{field:"nofPp",title:"PP数量",hide:!0},{field:"innerMinSpacing",title:"内层(线宽/线距)",hide:!0},{field:"outerMinSpacing",title:"外层最小(线宽/线距)",hide:!0},{field:"bgaSize",title:"BGA大小",hide:!0},{field:"testPoinType",title:"测试类型",hide:!0},{field:"testPoint",title:"测试点",hide:!0},{field:"testPointType",title:"测试方式",hide:!0},{field:"userId",title:"用户ID",hide:!0},{field:"uuid",title:"uuid",hide:!0},{field:"panelRoutingPath",title:"锣程",hide:!0},{field:"bevellingCamfer",title:"斜边",hide:!0},{field:"blindHoles",title:"盲孔",hide:!0},{field:"buriedHoles",title:"埋孔",hide:!0},{field:"carbon",title:"碳油",hide:!0},{field:"contrlImpeance",title:"阻抗",hide:!0},{field:"deepMillRouting",title:"控深锣",hide:!0},{field:"punchingHoles",title:"冲孔数",hide:!0},{field:"punchingSlots",title:"冲槽数",hide:!0},{field:"peelable",title:"兰胶",hide:!0},{field:"peelableBrand",title:"兰胶型号",hide:!0},{field:"edgePlated",title:"金属边",hide:!0},{field:"halfHoleLated",title:"半孔板",hide:!0},{field:"orderId",title:"订单ID",hide:!0},{field:"orderNo",title:"订单号",hide:!0},{field:"invoiceNo",title:"合同号",hide:!0},{field:"id",title:"ID",hide:!0},{field:"userId",title:"User ID",hide:!0},{field:"gerberPath",title:"gerberPath",hide:!0},{field:"isExistIndicator",title:"isExistIndicator",hide:!0},{field:"isExistSmt",title:"isExistSmt",hide:!0},{field:"quoteConfigIdList",title:"quoteConfigIdList",hide:!0},{field:"quoteConfigIds",title:"quoteConfigIds",hide:!0},{field:"quoteGerberName",title:"quoteGerberName",hide:!0},{field:"quoteGerberPath",title:"quoteGerberPath",hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",hide:!0},{field:"solderMaskBotColor",title:"solderMaskBotColor",hide:!0},{fixed:"right",title:"操作",toolbar:"#iqpcbBar",width:120}]],done:function(e,t,i){}})}function i(){table.render({elem:"#iquote_Tabstencil",url:setter.baseUrl+"epc/stencilorder/internalQuoteList",toolbar:"#tbiquoteStencil",cellMinWidth:80,id:"iquote_Tabstencil",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox"},{field:"orderType",title:"订单类型",Width:110,templet:"#order_type"},{field:"productNo",title:"内部编码",minWidth:130},{field:"gerberName",title:"文件名",minWidth:160},{field:"pcbName",title:"F/N",minWidth:130},{field:"orderNo",title:"客户PO"},{field:"quoteOrderNo",title:"报价单号",minWidth:130},{field:"gmtCreate",title:"创建时间"},{field:"gmtModified",title:"修改时间"},{field:"pcbType",title:"PCB类型",minWidth:130,hide:!0},{field:"dimensionsX",title:"单只(X)",hide:!0},{field:"dimensionsY",title:"单只(Y)",hide:!0},{field:"panelSizeX",title:"Panel(X)",width:90,hide:!0},{field:"panelSizeY",title:"Panel(Y)",width:90,hide:!0},{field:"panelWayX",title:"PanelWay(X)",width:110,hide:!0},{field:"panelWayY",title:"PanelWay(Y)",width:110,hide:!0},{field:"finishThickness",title:"板厚",hide:!0},{field:"layerNum",title:"层数",width:80,hide:!0},{field:"surfaceFinish",title:"表面处理",hide:!0},{field:"quantityPcs",title:"PCS数量",hide:!0},{field:"quantityPanel",title:"Panel数量",hide:!0},{field:"engineeringFee",title:"工程费",hide:!0},{field:"boardFee",title:"板费",hide:!0},{field:"testCostFee",title:"测试费",hide:!0},{field:"toolingFee",title:"工具费",hide:!0},{field:"overworkFee",title:"加急费",hide:!0},{field:"postFee",title:"运费",hide:!0},{field:"subtotal",title:"总价",hide:!0},{field:"boardType",title:"出货方式",hide:!0},{field:"status",title:"状态",align:"center",templet:"#Tabtb-pcb-market-iQuote-status",width:110,hide:!0},{field:"areaSq",title:"面积",hide:!0},{field:"material",title:"材料",hide:!0},{field:"productCode",title:"材料型号",hide:!0},{field:"productNo",title:"材料商",hide:!0},{field:"tg",title:"TG",hide:!0},{field:"cti",title:"CTI",hide:!0},{field:"halogenFree",title:"无卤素",hide:!0},{field:"outerLayerCopper",title:"外层铜厚",hide:!0},{field:"innerLayerCopper",title:"内层铜厚",hide:!0},{field:"heatConductivity",title:"导热系数",hide:!0},{field:"silkScreenTopColor",title:"字符颜色",hide:!0},{field:"solderMaskTopColor",title:"阻焊颜色",hide:!0},{field:"pthCopper",title:"孔铜",hide:!0},{field:"remark",title:"备注",hide:!0},{field:"buildTime",title:"交期",hide:!0},{field:"weight",title:"重量",hide:!0},{field:"thickness",title:"表面处理厚度",hide:!0},{field:"surfaceArea",title:"沉金面积",hide:!0},{field:"minHoleSize",title:"最小孔",hide:!0},{field:"nofHoles",title:"孔数",hide:!0},{field:"viaProcess",title:"过孔方式",hide:!0},{field:"stackUp",title:"压合",hide:!0},{field:"status",title:"状态",hide:!0},{field:"nofCore",title:"芯板数量",hide:!0},{field:"nofPp",title:"PP数量",hide:!0},{field:"innerMinSpacing",title:"内层(线宽/线距)",hide:!0},{field:"outerMinSpacing",title:"外层最小(线宽/线距)",hide:!0},{field:"bgaSize",title:"BGA大小",hide:!0},{field:"testPoinType",title:"测试类型",hide:!0},{field:"testPoint",title:"测试点",hide:!0},{field:"testPointType",title:"测试方式",hide:!0},{field:"userId",title:"用户ID",hide:!0},{field:"uuid",title:"uuid",hide:!0},{field:"panelRoutingPath",title:"锣程",hide:!0},{field:"bevellingCamfer",title:"斜边",hide:!0},{field:"blindHoles",title:"盲孔",hide:!0},{field:"buriedHoles",title:"埋孔",hide:!0},{field:"carbon",title:"碳油",hide:!0},{field:"contrlImpeance",title:"阻抗",hide:!0},{field:"deepMillRouting",title:"控深锣",hide:!0},{field:"punchingHoles",title:"冲孔数",hide:!0},{field:"punchingSlots",title:"冲槽数",hide:!0},{field:"peelable",title:"兰胶",hide:!0},{field:"peelableBrand",title:"兰胶型号",hide:!0},{field:"edgePlated",title:"金属边",hide:!0},{field:"halfHoleLated",title:"半孔板",hide:!0},{field:"orderId",title:"订单ID",hide:!0},{field:"orderNo",title:"订单号",hide:!0},{field:"invoiceNo",title:"合同号",hide:!0},{field:"id",title:"ID",hide:!0},{field:"userId",title:"User ID",hide:!0},{field:"gerberPath",title:"gerberPath",hide:!0},{field:"isExistIndicator",title:"isExistIndicator",hide:!0},{field:"isExistSmt",title:"isExistSmt",hide:!0},{field:"quoteConfigIdList",title:"quoteConfigIdList",hide:!0},{field:"quoteConfigIds",title:"quoteConfigIds",hide:!0},{field:"quoteGerberName",title:"quoteGerberName",hide:!0},{field:"quoteGerberPath",title:"quoteGerberPath",hide:!0},{field:"silkScreenBotColor",title:"silkScreenBotColor",hide:!0},{field:"solderMaskBotColor",title:"solderMaskBotColor",hide:!0},{fixed:"right",title:"操作",toolbar:"#iqpcbBar",width:120}]],done:function(e,t,i){}})}function l(e){return function(t,i){var l=t[e],d=i[e];return l-d}}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var d=layui.jquery,a=layui.jsTools;t();var o={orderType:0,customerSn:null,canOpenView:!1};element.on("tab(tab-internalQuote)",function(e){o.orderType=e.index,1===o.orderType?i():2===o.orderType?console.log("SMT订单选项卡"):t()}),table.on("toolbar(iquote_Tabpcb)",function(e){var t=table.checkStatus(e.config.id);switch(e.event){case"getCheckData":var i={data:{}};i.data=t.data,i.data=i.data.sort(l("quantityPcs")),o.customerSn=i.data[0].productNo.substring(0,3);i.tabType=o.orderType;var n,r,s,f=i.data.length,c=2,u=0;d.each(i.data,function(e,t){if(u=parseFloat(u+t.totalFee),i.total=u,null==s?s=t.id:s+=","+t.id,null==n||""==n?(n=t.productNo,r="marketManagement/iframeWindow/quote_contractA",c=1,o.canOpenView=!0):null!=n&&n!=t.productNo&&(c=2,r="marketManagement/iframeWindow/quote_contractB",layer.msg("选择了不同型号"),o.canOpenView=!0),null!=o.customerSn&&o.customerSn!=t.productNo.substring(0,3))return layer.alert("请选择同一个客户的订单！"),o.customerSn=null,o.canOpenView=!1,!1}),1==o.canOpenView&&admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+i.data[0].userId,success:function(e){return i.userName=e.user.userName,i.companyName=e.user.companName,i.country=e.user.country,i.city=e.user.city,i.address=e.user.address,f>6?(layer.msg("最多只能选中6条数据"),!1):void admin.popup({title:"报价合同",area:["100%","100%"],maxmin:!0,btn:["提交","打印","取消"],yes:function(e,t){layer.confirm("确定提交此订单合同？",function(e){admin.req({type:"post",data:{qids:s,cid:i.data[0].userId},url:setter.baseUrl+"epc/pcborder/createQuoteOrderNo",success:function(e){"444"!=e.code&&(layer.alert("合同提交成功！"),layui.table.reload("iquote_Tabpcb"),layer.closeAll())}})})},btn2:function(e,t){var i;"1"==c?i="quoteContract_AllA":"2"==c&&(i="quoteContract_AllB"),document.body.innerHTML=document.getElementById(i).innerHTML,window.print(),window.location.reload()},success:function(e,l){i.htmlType=1,view(this.id).render(r,i).done(function(){if(n=null,o.customerSn=null,console.log(i),1===c){var e,l=d(".contract-module-three-tab tbody tr").eq(0).find("td").size(),r=i.data.length;r<3?e=4:r>=4&&(e=7);for(var s=l;s<e;s++)d(".contract-module-three-tab tbody").find("tr").append("<td></td>");if(4==e)for(var s=1;s<e;s++)d(".contract-module-three-tab tbody tr").find("td").eq(s).css({width:"27.3%"});else for(var s=1;s<e;s++)d(".contract-module-three-tab tbody tr").find("td").eq(s).css({width:"13.6%"})}var f=[];if(null!=t.data){for(var s=0;s<t.data.length;s++)f[s]=t.data[s].gmtModified;var u=a.TimeContrast(f);d("#contractBotDate").text(u),d("#topDate").text(u)}})}})}});break;case"getCheckLength":var h=t.data;layer.msg("选中了："+h.length+" 个");break;case"isAll":layer.msg(t.isAll?"全选":"未全选")}}),table.on("tool(iquote_Tabpcb)",function(e){var t=e.data;"del"===e.event?layer.confirm("真的删除行么",function(i){e.del(),admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"/epc/pcborder/delete",success:function(){layer.alert("删除成功！")}}),layer.close(i)}):"edit"===e.event&&admin.popup({title:"编辑PCB订单信息",area:["76%","90%"],btn:["立即提交","取消"],yes:function(){d(".submit-ok").click(),layer.msg("yes")},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderPCB_update",t).done(function(){form.render(null,""),form.on("submit(LAY-pcborder-update-submit)",function(e){var t=e.field;return console.log("提交的字段信息："+JSON.stringify(t)),admin.req({type:"post",url:setter.baseUrl+"epc/pcborder/update",data:t,done:function(e){layer.msg("订单信息修改成功"),layui.table.reload("iquote_Tabpcb")},fail:function(e){layer.msg("订单信息修改失败，请稍后再试！")}}),layer.close(i),!1})})}})}),form.on("submit(internal-quote-search)",function(e){var t=e.field;console.log(t),table.reload("iquote_Tabpcb",{where:t})}),table.on("tool(iquote_Tabstencil)",function(e){var t=e.data;console.log(t),"del"===e.event?layer.confirm("真的删除行么",function(i){e.del(),admin.req({type:"post",data:{ids:t.id},url:setter.baseUrl+"epc/stencilorder/delete",success:function(){layer.alert("删除成功！")}}),layer.close(i)}):"edit"===e.event&&admin.popup({title:"编辑Stencil订单信息",area:["885px","550px"],btn:["立即提交","取消"],yes:function(){d(".submitStencilUpB").click()},success:function(e,i){view(this.id).render("marketManagement/iframeWindow/orderStencil_updateB",t).done(function(){})}})}),table.on("toolbar(iquote_Tabstencil)",function(e){var t=table.checkStatus(e.config.id);switch(e.event){case"getCheckData":var i={data:{}};i.data=t.data,i.data=i.data.sort(l("quantityPcs")),o.customerSn=i.data[0].productNo.substring(0,3);i.tabType=o.orderType;var a,n,r=i.data.length,s="marketManagement/iframeWindow/quote_contractS",f=0;d.each(i.data,function(e,t){return f=parseFloat(f+t.totalStencilFee),i.total=f,null==n?n=t.id:n+=","+t.id,null!=o.customerSn&&o.customerSn!=t.productNo.substring(0,3)?(layer.alert("请选择同一个客户的订单！"),o.customerSn=null,o.canOpenView=!1,!1):void(o.canOpenView=!0)}),1==o.canOpenView&&admin.req({type:"get",data:"",url:setter.baseUrl+"sys/consumer/user/info/"+i.data[0].userId,success:function(e){return i.userName=e.user.userName,i.companyName=e.user.companName,i.country=e.user.country,i.city=e.user.city,i.address=e.user.address,r>6?(layer.msg("最多只能选中6条数据"),!1):void admin.popup({title:"报价合同",area:["100%","100%"],maxmin:!0,btn:["提交","打印","取消"],yes:function(e,t){layer.confirm("确定提交此订单合同？",function(e){admin.req({type:"post",data:{sids:n,cid:i.data[0].userId},url:setter.baseUrl+"epc/stencilorder/createQuoteOrderNo",success:function(e){if("444"!=e.code){layer.alert("合同提交成功！");setTimeout(function(){layui.table.reload("iquote_Tabstencil"),layer.closeAll()},1500)}}})})},btn2:function(e,t){var i="quoteContract_AllS";document.body.innerHTML=document.getElementById(i).innerHTML,window.print(),window.location.reload()},success:function(e,t){i.htmlType=1,view(this.id).render(s,i).done(function(){console.log(i),a=null,o.customerSn=null})}})}});break;case"getCheckLength":var c=t.data;layer.msg("选中了："+c.length+" 个");break;case"isAll":layer.msg(t.isAll?"全选":"未全选")}}),e("market_internalQuote",{})});