/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","form","element","laytpl","layer","upload","jsTools","formSelects"],function(e){function t(e){console.log("data："+e);var t=parseFloat(N("#quantityPCS").val()),n=parseFloat(N("#areasq").val()),a=parseFloat(N("#boardFee").val()),i=parseFloat(a/t).toFixed(3),l=parseFloat(a/n).toFixed(3);console.log("计算单价"),"0"==e?N("#mPrice").val(l):"1"==e&&N("#unitPrice").val(i),ie.unitPrice=i,console.log("板费/PCS="+a+"/"+t+"="+i),console.log("mPrice="+n+"/"+a+"="+l)}function n(e){var n=parseFloat(N("#areasq").val()),a=parseFloat(n*e).toFixed(2);N("#boardFee").val(a),t(1)}function a(e){if(1===Se){c("1");var t=parseFloat(de*ve*me)/1e6;N("#areasq").val(t.toFixed(3))}else if(2===Se){c("2");var t=parseFloat(be*he*ge)/1e6;if(N("#areasq").val(t.toFixed(3)),""!=ge&&""!=fe&&""!=ye){var n=Math.ceil(ge*fe*ye);N("#quantityPCS").val(n)}}}function i(e){N("#areasq").val(""),0===e?(N(".itPanelway input").attr("disabled",j.isDis.itPanelway),N(".itPanelsize input").attr("disabled",j.isDis.itPanelsize)):1===e?(N(".mto-input").removeAttr("disabled","true"),N(".itPanelway input").attr("disabled","disabled"),N(".itPanelsize input").attr("disabled","disabled"),N(".itSinlgesize input").val(""),N(".itPanelway input").val(""),N(".itPanelsize input").val("")):2===e&&(N(".mto-input").removeAttr("disabled","true"),N(".itSinlgesize input").attr("disabled","disabled"),N(".itSinlgesize input").val(""))}function l(){N("#selHc").attr("disabled",pe.isDis.selHc),N("#selInlayercoopper").attr("disabled",pe.isDis.selInlayercoopper),N("#selInnerMintrack").attr("disabled",pe.isDis.selInnerMintrack),N("#selNofcore").attr("disabled",pe.isDis.selNofcore),N("#selMinspaccing").attr("disabled",pe.isDis.selMinspaccing),N("#selNofpp").attr("disabled",pe.isDis.selNofpp),N("#radioSinglePcb").attr("checked","true"),N("#ptfr4").attr("checked","true"),N("#routingOne").attr("checked","true"),N("#selLayer").val(pe.selLayer),N("#selFinishThickness").val(pe.selFinishThickness),N("#selMaterial").val(pe.selMaterial),N("#selkbsy").val(pe.selkbsy),N("#selTg").val(pe.selTg),N("#selHf").val(pe.selHf),N("#selHc").val(pe.selHc),N("#selInlayercoopper").val(pe.selInlayercoopper),N("#selInnerMintrack").val(pe.selInnerMintrack),N("#selNofcore").val(pe.selNofcore),N("#selMinspaccing").val(pe.selMinspaccing),N("#selNofpp").val(pe.selNofpp),N("#selOuterlayercopper").val(pe.selOuterlayercopper),N("#selOutMintrack").val(pe.selOutMintrack),N("#selBgasize").val(pe.selBgasize),N("#selMinspacing").val(pe.selMinspacing),N("#selMinholesize").val(pe.selMinholesize),N("#selPthcopper").val(pe.selPthcopper),N("#selSoldermc").val(pe.selSoldermc),N("#selViaprocess").val(pe.selViaprocess),N("#selSilksc").val(pe.selSilksc),N("#selPeelable").val(pe.selPeelable),N("#selSurfacefinish").val(pe.selSurfacefinish),N("#selTestcost").val(pe.selTestcost),q.render()}function o(e){if(N("#selLayer").children().remove(),"Aluminum"==e)for(var t=0;t<w.length;t++){var n=w[t].text,a=w[t].value;N("#selLayer").append("<option value="+a+">"+n+"</option>")}else if("FR4"==e)for(var t=0;t<_.length;t++){var n=_[t].text,a=_[t].value;N("#selLayer").append("<option value="+a+">"+n+"</option>"),u(1)}else if("FR4+Aluminum"==e)for(var t=0;t<Q.length;t++){var n=Q[t].text,a=Q[t].value;N("#selLayer").append("<option value="+a+">"+n+"</option>")}}function r(e){if(N("#selMaterial").children().remove(),"Aluminum"==e){for(var t=0;t<O.length;t++){var n=O[t].text,a=O[t].value;N("#selMaterial").append("<option value="+a+">"+n+"</option>")}s("yg")}else{for(var t=0;t<G.length;t++){var n=G[t].text,a=G[t].value;N("#selMaterial").append("<option value="+a+">"+n+"</option>")}s("kb")}q.render("select")}function s(e,t){if(N("#selkbsy").children().remove(),"KB"==e)for(var n=0;n<U.length;n++){var a=U[n].text,i=U[n].value;N("#selkbsy").append("<option value="+i+">"+a+"</option>")}else if("YG"==e)for(var n=0;n<R.length;n++){var a=R[n].text,i=R[n].value;N("#selkbsy").append("<option value="+i+">"+a+"</option>")}else if("SY"==e)for(var n=0;n<L.length;n++){var a=L[n].text,i=L[n].value;N("#selkbsy").append("<option value="+i+">"+a+"</option>")}null==t&&""==t||N("#selkbsy").find("option[value='"+t+"']").prop("selected",!0),q.render("select")}function c(e){var t=e;"1"==t?(de=N("#singleSizeX").val(),ve=N("#singleSizeY").val(),me=N("#quantityPCS").val()):"2"==t&&(fe=N("#panelWayX").val(),ye=N("#panelWayY").val(),ge=N("#quantityPanel").val(),be=N("#panelSizeX").val(),he=N("#panelSizeY").val())}function u(e){p(),2===Pe?(pe.selLayer=1,pe.selMaterial="YG",pe.selkbsy="YG0001",pe.selHc="1W",pe.selMinholesize="1.5",pe.selPthcopper="none",pe.selSoldermc="white",pe.selViaprocess="none",pe.selSilksc="black",pe.isDis.selHc=!1):3===Pe&&(pe.selLayer=4,pe.selHc="1W",pe.selInlayercoopper="1oz",pe.selMintrack="5mil",pe.selNofcore="1",pe.selMinspaccing="5mil",pe.selNofpp="2",pe.selInnerMintrack="5mil",pe.selMinholesize="1.5",pe.selPthcopper="none",pe.selSoldermc="white",pe.selSilksc="black",pe.selPeelable="none",pe.isDis.selInlayercoopper=!1,pe.isDis.selInnerMintrack=!1,pe.isDis.selNofcore=!1,pe.isDis.selMinspaccing=!1,pe.isDis.selNofpp=!1),l()}function p(){pe.selLayer=2,pe.selFinishThickness="1.6mm",pe.selMaterial="KB",pe.selkbsy="KB6160",pe.selTg="135",pe.selHf="NO",pe.selHc="none",pe.selInlayercoopper="none",pe.selMintrack="none",pe.selNofcore="none",pe.selMinspaccing="none",pe.selNofpp="none",pe.selOuterlayercopper="1oz",pe.selInnerMintrack="none",pe.selOutMintrack="5mil",pe.selBgasize="0.30",pe.selMinspacing="5mil",pe.selMinholesize="0.3",pe.selPthcopper="20um",pe.selSoldermc="green",pe.selViaprocess="Follow_gerber",pe.selSilksc="white",pe.selPeelable="none",pe.selSurfacefinish="HASL_with_lead",pe.selTestcost="1",pe.selCti="175≤CTI<250",pe.isDis={},pe.isDis.selHc=!0,pe.isDis.selInlayercoopper=!0,pe.isDis.selInnerMintrack=!0,pe.isDis.selNofcore=!0,pe.isDis.selMinspaccing=!0,pe.isDis.selNofpp=!0}function d(){var e=N("#areasq").val(),t=N("#selLayer").val();N("input[name='buildTime']").remove(),N(".build-time-item .layui-form-radio").remove(),A.req({type:"post",async:!1,url:D.imUrl+"quote/getBuildTime",data:{areaSq:e,layerNum:t,exchangeId:ie.exchangeId},success:function(e){N(".build-time-item").css("display","");var t;N("#selBuildTime").children().remove();for(var n=0;n<e.data.length;n++)N("#selBuildTime").append("<option value="+e.data[n].price+">"+e.data[n].dayNumber+"</option>"),t=e.data[0].dayNumber;ie.buildTime=t,N(".build-time-item input").each(function(){var e=N(this).attr("title");"none"==e&&this.remove()}),q.render()},error:function(){z.msg("Get BuildTime Fail!!!")}})}function v(){var e=null;1===X.bordType?e="selCompany":2===X.bordType?e="selCompanyt":3===X.bordType&&(e="selCompany"),A.req({type:"post",url:D.imUrl+"quote/getCouriers",async:!1,success:function(t){N("select[id='"+e+"'] option").remove(),Y.render(e),X.companyId=t.data[0].id;for(var n=0;n<t.data.length;n++)N("select[xm-select='"+e+"']").append("<option value="+t.data[n].id+">"+t.data[n].courierName+"</option>"),J.courierId=t.data[0].id,X.companyId=J.courierId;Y.render(e),Y.value(e,[t.data[0].id]),q.render("select")},error:function(){z.msg("Get Couriers Fail!!!")}})}function m(){var e=null;1===X.bordType?e="selCountrys":2===X.bordType?e="selCountryst":3===X.bordType&&(e="selCountryss"),N("select[id='"+e+"'] option").remove(),Y.render(e),q.render(),A.req({type:"post",async:!1,url:D.imUrl+"quote/getCountry",success:function(t){X.countrysId=t.data[0].id;for(var n=0;n<t.data.length;n++)N("select[xm-select='"+e+"']").append("<option value="+t.data[n].id+">"+t.data[n].name+"</option>"),J.countryId=t.data[0].id,X.countrysId=J.countryId;q.render(),Y.render(e),Y.value(e,[t.data[0].id])},error:function(){z.msg("Get Countrys Fail!!!")}})}function f(e,t){var n;null!=e&&"undefined"!=typeof e&&""!=e||(e=1),null!=t&&"undefined"!=typeof t&&""!=t||(t=70),n=2===X.bordType?V.stencilWeight:X.totalWeight,A.req({type:"post",url:D.imUrl+"quote/getShippingCost",data:{courierId:e,countryId:t,totalWeight:n,exchangeId:ie.exchangeId},success:function(e){null!=e.data&&1===X.bordType?(ie.postFee=e.data.shippingCost,E.postFee=e.data.shippingCost,Z.shipping=e.data.shippingCost,N("#shippingPrice").val(Z.shipping),h()):null!=e.data&&2===X.bordType?(V.stencil_shippingPrice=se.postFee=e.data.shippingCost,console.log("stencil_shippingPrice:"+V.stencil_shippingPrice),N("#postFees").val(V.stencil_shippingPrice),S()):N("#shippingPrice").val("不支持该配送")},error:function(){z.msg("Get ShippingCost Fail!!!")}})}function y(){A.req({type:"post",url:D.baseUrl+"sys/consumer/user/all",success:function(e){for(var t=0;t<e.data.length;t++)N("select[xm-select='selCustomer']").append("<option id="+e.data[t].id+" value="+e.data[t].id+">"+e.data[t].userSystemId+"</option>");Y.render("selCustomer"),q.render("select")}})}function g(){A.req({type:"post",url:D.baseUrl+"market/exchangerate/all",success:function(e){for(var t,n=0;n<e.data.length;n++)t+="<option id="+e.data[n].id+" value="+e.data[n].id+">"+e.data[n].currency+"</option>",ne.push(e.data[n]);N("select[xm-select='exchangeId']").append(t),q.render("select"),Y.render("exchangeId"),Y.value("exchangeId",[e.data[0].id])}})}function b(e){var t=0;N.each(e,function(n,a){var i=parseFloat(a);(""==i||null==i||isNaN(i))&&(e[n]=0,i=0),t+=i}),re.pcbCost=t.toFixed(2),N("#pcbCost").val(re.pcbCost),h()}function h(){var e=N("#shippingPrice").val();re.shippingPrice=parseFloat(e),N.each(re,function(e,t){(""==t||null==t||isNaN(t))&&(re[e]=0)});var t=parseFloat(re.pcbCost),e=parseFloat(re.shippingPrice),n=(t+e).toFixed(2);re.totalPrice=n,ie.subtotal=t,$.totalPriced=re.totalPrice,N("#totalPrice").val(re.totalPrice)}function S(){var e;e="Top And Bottom (On Single Stencil)"==se.stencilSide||"Top"==se.stencilSide||"Bottom"==se.stencilSide?1:2,se.inStencilCost=se.sQuantity*V.stencilSize_price*e*ae,N("#inStencilCost").val(se.inStencilCost),P()}function P(){var e=se,t=e.postFee+e.inStencilCost;ue.totalStencilFee=t,$.totalPricedS=t,N("#stotalPrice").val(t),I()}function I(){var e=parseInt(N("#inStencilCost").val()),t=parseInt(N("#stencil_quantity").val()),n=(e/t).toFixed(3);ce.unitPrice=n,N("#sunitPrice").val(n)}function F(){var e=new Object;return e.enginnerFee=parseFloat(N("#enginnerFee").val()),e.boardFee=parseFloat(N("#boardFee").val()),e.testCostFee=parseFloat(N("#testFee").val()),e.toolingFee=parseFloat(N("#toolingFee").val()),e.overworkFee=parseFloat(N("#urgentFee").val()),e}function k(){N("#inStencilCost").val(""),N("#shippingPrice").val(""),N("#totalPrice").val(""),q.render()}function x(e){te.importPCBInfo=e,N("#inside_quote_all input,#inside_quote_all select").each(function(){var t=N(this).attr("name"),n=N(this),a=N(this).attr("type");(isNaN(e[t])||""==e[t]||null==e[t])&&n.parents(".rig-price").length>0&&(e[t]=0),n.is("input")&&("text"==a||"number"==a?n.val(e[t]):"checkbox"==a?N("input[type=checkbox][name="+t+"][value='"+e[t]+"']").attr("checked","checked"):"radio"==a&&(N("input[name="+t+"][value='"+e[t]+"']").prop("checked","checked"),"boardType"==t&&(i(e.boardType),Se=e.boardType))),n.is("select")&&(N("select[name='"+t+"'] option[value='"+e[t]+"']").attr("selected",!0),"nOfPp"!=t&&"countries"!=t||N("select[name='"+t+"'] option[value='"+e[t]+"']").attr("selected",!0)),N("*[name='remark']").val(e.remark),"userId"==t&&(N("select[name='userId']").find("option[id="+e.userId+"]").attr("selected",!0),N("input[name='customerId']").val(e.userId),ie.userId=E.customerAid=e.userId)}),s(e.material,e.productCode),N("input[name='customerSysName']").val(N("#selCustomer").find("option:selected").text()),ie.userId=E.customerAid=e.userId,ie.gerberName=e.gerberName,ie.gerberPath=e.gerberPath,ie.pcbName=ue.pcbName=e.pcbName,ie.productNo=e.productNo,ie.countries=X.countrysId=e.countries,ie.postFee=e.postFee,ie.quoteGerberName=e.quoteGerberName,ie.quoteGerberPath=e.quoteGerberPath;var t=N("dl[xid='selCustomer']").children(".xm-select-this").attr("lay-value"),n=N("dl[xid='selCustomer'] .xm-select-this").find("span").attr("name");N("#customerId").val(t),N("input[name='customerSysName']").val(n);var a=parseFloat(N("input[name='subtotal']").val()),l=parseFloat(N("input[name='postFee']").val());(isNaN(a)||""==a)&&(a=0),(isNaN(l)||""==l)&&(l=0);var o=a+l;N("input[id='totalPrice']").val(o),q.render(),N(".bot-subbtn").click();var r,c;Object.assign(le,ie);r=e.countries,c=e.courierId,Y.value("selCompany",[1]),Y.value("selCountrys",[r]),z.msg("导入PCB信息成功")}function C(e){var e=e;if(0===e)for(var t=0;t<H.length;t++)N("."+H[t]).hide();else if(1===e)for(var t=0;t<H.length;t++)N("."+H[t]).show()}var N=layui.jquery,T=layui.view,q=layui.form,A=layui.admin,M=layui.element,D=layui.setter,W=layui.upload,Y=layui.formSelects,B=layui.jsTools,z=layui.layer;M.render();var _=[{text:0,value:0},{text:1,value:1},{text:2,value:2},{text:4,value:4},{text:6,value:6},{text:8,value:8}],w=[{text:0,value:0},{text:1,value:1},{text:2,value:2}],Q=[{text:0,value:0},{text:4,value:4},{text:6,value:6},{text:8,value:8}],G=[{text:"none",value:"none"},{text:"KB",value:"KB"},{text:"SY",value:"SY"}],O=[{text:"YG",value:"YG"}],U=[{text:"KB6160",value:"KB6160"},{text:"KB6150",value:"KB6150"},{text:"KB6165",value:"KB6165"},{text:"KB6167",value:"KB6167"}],L=[{text:"SY1130",value:"SY1130"},{text:"SY1141",value:"SY1141"},{text:"SY1150",value:"SY1150"},{text:"SY1170",value:"SY1170"},{text:"SY1180",value:"SY1180"},{text:"SY1000",value:"SY1000"},{text:"SY1000-2",value:"SY1000-2"},{text:"SY1600",value:"SY1600"}],R=[{text:"YG0001",value:"YG0001"},{text:"YG0002",value:"YG0002"},{text:"YG0003",value:"YG0003"},{text:"YG0004",value:"YG0004"}],H=["totalForm","addQuote"],K={1:"新单",2:"返单",3:"返单有改"},j={isDis:{itPanelway:!0,itPanelsize:!0}},X={bordType:1,companyId:1,countrysId:70,totalWeight:0},V={stencilSize_price:"",stencilWeight:"",stencil_shippingPrice:""},E={postFee:"",customerAid:"",ids:"",orderNo:""},J={courierId:1,countryId:"",totalWeight:""},Z={shipping:""},$={totalPric:null,totalPriced:null,isQuote:!1,totalPricS:null,totalPricedS:null,isQuoteS:!1},ee=null,te={importPCBInfo:null},ne=[],ae=1,ie={engineeringFee:"",boardFee:"",testCostFee:"",toolingFee:"",overworkFee:0,buildTime:"",weight:"",postFee:0,subtotal:"",quoteConfigIds:"",productNo:"",userId:"",orderType:1,gerberName:"",gerberPath:"",quoteGerberName:"",quoteGerberPath:"",pcbName:"",orderNo:"",countries:"Afghanistan",courierName:J.courierId,exchangeId:1,unitPrice:""},le={},oe={stencilWeight:"",inStencilCost:""},re={pcbCost:0,totalPrice:0,shippingPrice:0},se={postFee:V.stencil_shippingPrice,inStencilCost:null,sQuantity:1,stencilSide:"Top And Bottom (On Single Stencil)",sunitPrice:V.stencilSize_price,stotalPrice:null},ce=new Object,ue={stencilSide:"Top And Bottom (On Single Stencil)",quantity:se.sQuantity,thickness:.12,existingFiducials:.1,totalStencilFee:se.stotalPrice,gerberPath:null,gerberName:null,orderId:null,orderType:1,pcbName:null,postFee:null,orderNo:null,companyId:X.companyId,countrysId:X.countrysId,customerSysName:null,userId:null,productNo:null},pe={};p(),l(),i(0),o("FR4"),r(),s("kb"),y(),g();var de,ve,me,fe,ye,ge,be,he,Se=1;N("#singleSizeX,#singleSizeY,#quantityPCS").bind("input propertychange",function(e){a()}),N("#panelSizeX,#panelSizeY,#quantityPanel").bind("input propertychange",function(e){null!=be&&null!=he&&null!=ge&&a()}),N("#panelWayX,#panelWayY,#quantityPanel").bind("input propertychange",function(e){a()}),N("input[name='testPoint']").bind("input propertychange",function(e){setTimeout(function(){N(".up-subbtn").click()},1800)}),N("input[name='panelRoutingPath']").bind("input propertychange",function(e){setTimeout(function(){N(".up-subbtn").click()},1800)}),N("input[name='punchingHoles']").bind("input propertychange",function(e){setTimeout(function(){N(".up-subbtn").click()},1800)}),N("input[name='punchingSlots']").bind("input propertychange",function(e){setTimeout(function(){N(".up-subbtn").click()},1800)}),N("input[name='surfaceArea']").bind("input propertychange",function(e){setTimeout(function(){N(".up-subbtn").click()},1800)}),N("#boardFee").bind("input propertychange",function(e){t(0)}),N("#quantityPCS").bind("input propertychange",function(e){t(0)}),N("#mPrice").bind("input propertychange",function(e){n(parseFloat(N(this).val()))}),N("#rPcbForm").bind("input propertychange",function(){var e=F();b(e),ie.postFee=parseFloat(N("#shippingPrice").val()),ie.engineeringFee=parseFloat(N("#enginnerFee").val()),ie=Object.assign(ie,e),console.log(ie)}),N("#stencil_quantity").bind("input propertychange",function(){var e=parseFloat(N(this).val());(""==e||null==e||"undefined"==typeof e||isNaN(e))&&(e=0),se.sQuantity=ue.quantity=e,S()}),q.on("radio(boardType)",function(e){var t=e.value;"1"==t?(Se=1,i(1)):"2"==t&&(Se=2,i(2))}),q.on("select(material)",function(e){var t=e.value;s(t)}),q.on("select(selSurfacefinish)",function(e){var t=e.value;"HASL_with_lead"==t||"HASL_lead_free"==t?N("#selSurfacethickness").val("2.54-25.4um"):"Immersion_Gold"==t?N("#selSurfacethickness").val("2u"):"Immersion_tin"==t?N("#selSurfacethickness").val("0.5um-0.7um"):"Immersion_silver"==t?N("#selSurfacethickness").val("≥0.05um"):"OSP"==t&&N("#selSurfacethickness").val("0.25-0.5um"),"Immersion_Gold"==t?N("input[name='surfaceArea']").removeAttr("disabled"):N("input[name='surfaceArea']").attr("disabled",!0),q.render("select","quoteForm"),q.render(null,"quoteForm")}),q.on("select(testPointType)",function(e){var t=e.value;"1"==t?N("#testPointT").text("飞针费："):N("#testPointT").text("测试架："),N(".up-subbtn").click()}),q.on("select(stencilSide)",function(e){var t=e.value;console.log(t),se.stencilSide=ue.stencilSide=t,S()}),q.on("radio(existingFiducials)",function(e){var t=ue.existingFiducials=e.value;z.msg(t)}),q.on("radio(sthickness)",function(e){var t=ue.thickness=e.value;z.msg(t)}),q.on("radio(routingType)",function(e){var t=e.value;"1"==t?(N("input[name='panelRoutingPath']").removeAttr("disabled"),N("input[name='punchingHoles']").attr("disabled",!0),N("input[name='punchingSlots']").attr("disabled",!0)):(N("input[name='panelRoutingPath']").attr("disabled",!0),N("input[name='punchingHoles']").removeAttr("disabled"),N("input[name='punchingSlots']").removeAttr("disabled")),N(".up-subbtn").click(),q.render()}),M.on("collapse(orderTypeCol)",function(e){var t=e.title.context.innerText;t.indexOf("PCB Phototype")!=-1?(N(".rig-price-cardbody form").removeClass("quote-avtive"),N(".rig-price").addClass("quote-avtive"),C(1),X.bordType=1):t.indexOf("SMT-Stencil")!=-1?(N(".rig-price-cardbody form").removeClass("quote-avtive"),N("#stencilForm").addClass("quote-avtive"),C(0),X.bordType=2):t.indexOf("Assembly Service")!=-1&&(N(".rig-price-cardbody form").removeClass("quote-avtive"),N("#assemblyForm").addClass("quote-avtive"),X.bordType=3),k()}),q.on("select(layer)",function(e){var t=e.value;pe.selLayer=t,"1"==Pe&&("1"==t?(pe.selPthcopper="none",pe.selViaprocess="none"):"2"==t?(pe.selPthcopper="20um",pe.selViaprocess="Follow_gerber"):"4"==t?(p(),pe.selLayer=t,pe.selInlayercoopper="1oz",pe.isDis.selInlayercoopper=!1,pe.selInnerMintrack="5mil",pe.isDis.selInnerMintrack=!1,pe.selNofcore="1",pe.isDis.selNofcore=!1,pe.selNofpp="2",pe.isDis.selNofpp=!1):"6"==t?(p(),pe.selLayer=t,pe.selInlayercoopper="1oz",pe.isDis.selInlayercoopper=!1,pe.selInnerMintrack="5mil",pe.isDis.selInnerMintrack=!1,pe.selNofcore="2",pe.isDis.selNofcore=!1,pe.selNofpp="3",pe.isDis.selNofpp=!1,pe.selPthcopper="none"):"8"==t&&(p(),pe.selLayer=t,pe.selInlayercoopper="1oz",pe.isDis.selInlayercoopper=!1,pe.selInnerMintrack="5mil",pe.isDis.selInnerMintrack=!1,pe.selNofcore="3",pe.isDis.selNofcore=!1,pe.selNofpp="4",pe.isDis.selNofpp=!1,pe.selPthcopper="none"),l())});var Pe=1;q.on("radio(pcbType)",function(e){var t=e.value;z.msg(t),"FR4"==t?(Pe=1,o("FR4"),u(),r("FR4")):"Aluminum"==t?(Pe=2,o("Aluminum"),u(),r("Aluminum")):"FR4+Aluminum"==t&&(Pe=3,o("FR4+Aluminum"),u(),r("FR4+Aluminum"))}),q.on("radio(buildTimeRadio)",function(e){var t=e.value;console.log(e),console.log(e),ie.overworkFee=t,N("#urgentFee").val(t),b()}),q.on("select(selBuildTime)",function(e){var t=e.value,n=N("#selBuildTime").find("option[value="+e.value+"]").text();re.shippingPrice=t,ie.overworkFee=t,ie.buildTime=n,N("#urgentFee").val(t);var a=F();b(a)}),layui.formSelects.on("selCompany",function(e,t,n,a,i){var l=(n.name,n.value);X.companyId=l;var o=X.companyId,r=X.countrysId;f(o,r)}),layui.formSelects.on("selCountrys",function(e,t,n,a,i){var l=n.name,o=n.value;X.countrysId=o,ie.countries=l,2===X.bordType&&P();var r=X.companyId,s=X.countrysId;f(r,s)}),layui.formSelects.on("selCustomer",function(e,t,n,a,i){var l=n.name,o=n.value;E.customerAid=o,ie.userId=ue.userId=o,ue.customerSysName=l,N("#customerId").val(o),N("input[name='customerSysName']").val(l)}),q.on("select(filterOrderType)",function(e){ie.orderType=ue.orderType=e.value}),layui.formSelects.on("selCompanyt",function(e,t,n,a,i){X.companyId=n.value;var l=X.companyId,o=X.countrysId;f(l,o)}),layui.formSelects.on("selCountryst",function(e,t,n,a,i){X.countrysId=n.value;var l=X.companyId,o=X.countrysId;f(l,o)}),N("#postFees").bind("input propertychange",function(e){se.postFee=parseFloat(N(this).val()),S()}),N("#inStencilCost").bind("input propertychange",function(e){se.inStencilCost=parseFloat(N(this).val()),P()}),q.on("submit(assemblyService)",function(e){var e=e.field;return A.req({type:"post",data:e,url:D.imUrl+"quote/getAssemblyQuote",success:function(e){var t=N("#pcbQuantity").val(),n=parseFloat(e.data.totalAssemblyQuote/t);N("#pricePCS").val(n.toFixed(2)),N("#assemblyCost").val(e.data.totalAssemblyQuote),null!=e.data.totalAssemblyWeight&&""!=e.data.totalAssemblyWeight&&N("#assemblyWeight").val(e.data.totalAssemblyWeight),console.log(e);e.data.totalAssemblyQuote,e.data.totalAssemblyWeight}}),!1}),N("#panelWayX,#panelWayY,#quantityPanel").keydown(function(e){var t=parseInt(e.keyCode);return 110!=t}),N("#panelWayX,#panelWayY,#quantityPanel").bind("cut copy paste",function(e){e.preventDefault()}),q.on("submit(quoteForm)",function(e){var e=e.field,t=e.cncAndPunch;return console.log(e),console.log("提价表单"),le=e,e.isExistSmt=0,e.stackUp="none",e.innerMinTrack=e.innerMinSpacing,e.outerMinSpacing=e.outerMinTrack,e.silkScreenBotColor=e.solderMaskTopColor,e.solderMaskBotColor=e.solderMaskTopColor,e.surfaceArea=e.surfaceArea,e.orderNo=N("#orderNo").val(),ie.orderNo=e.orderNo,e.pcbName=ie.pcbName,e.exchangeId=ie.exchangeId,2!==Se||null!=e.panelWayX&&""!=e.panelWayX&&null!=e.panelWayY&&""!=e.panelWayY?null==e.testPoint||""==e.testPoint?(N("html,body").animate({scrollTop:200},"slow"),z.msg("请输入测试点数量 !"),!1):"Immersion_Gold"==e.surfaceFinish&&""==e.surfaceArea?(z.msg("请输入沉金面积！"),!1):(A.req({type:"post",url:D.imUrl+"quote/countAdditionInfo",data:e,success:function(e){if(null!=e.data.pcbPriceDetail&&""!=e.data.pcbPriceDetail&&(null==e.data.pcbPriceDetail.qcidList&&""==e.data.pcbPriceDetail.qcidList||(E.ids=e.data.pcbPriceDetail.qcidList,ie.quoteConfigIds=e.data.pcbPriceDetail.qcidList.join(","),E.ids=e.data.pcbPriceDetail.qcidList)),ie.engineeringFee=e.data.projectQuoteToUSD,ie.boardFee=e.data.totalBoardQuoteToUSD,ie.testCostFee=e.data.totalTestPointToUSD,ie.toolingFee=e.data.cncAndPunchingQuoteToUSD,ie.weight=e.data.totalQuoteWeight,ie.unitPrice=e.data.unitPrice,X.totalWeight=e.data.totalQuoteWeight,N("#boardFee").val(e.data.totalBoardQuoteToUSD),N("#enginnerFee").val(e.data.projectQuoteToUSD),N("#pcbWeight").val(e.data.totalQuoteWeight+" KG"),N("#testFee").val(e.data.totalTestPointToUSD),N("#flyingTest").val(e.data.totalTestPointToUSD),N("#routingCost").val(e.data.cncAndPunchingQuoteToUSD),N("#unitPrice").val(e.data.unitPrice),J.totalWeight=e.data.totalQuoteWeight,X.totalWeight=e.data.totalQuoteWeight,ee=e.data.areaType,"1"==t?N("#toolingFee").val(0):N("#toolingFee").val(e.data.cncAndPunchingQuoteToUSD),"1"==ee)N("#mPrice").val(""),N("#mPrice").attr("disabled",!0);else{var n=parseFloat(e.data.totalBoardQuoteToUSD/N("#areasq").val()).toFixed(2);N("#mPrice").val(n),N("#mPrice").removeAttr("disabled")}if(b(),d(),null!=J.courierId&&""!=J.courierId||v(),null!=J.countryId&&""!=J.countryId||m(),null!=X.companyId&&""!=X.companyId&&null!=X.countrysId&&""!=X.countrysId){var a=X.companyId,i=X.countrysId;f(a,i)}var l=F();b(l)},error:function(e){alert("Services Error!!!")}}),q.render(),!1):(z.tips("请输入拼版方式 !","#panelWayX",{tips:[1,"#3595CC"],time:5e3}),!1)}),layui.formSelects.on("exchangeId",function(e,t,n,a,i){ie.exchangeId=n.value;var l=X.companyId,o=X.countrysId,r=ne.find(function(e){return e.id==n.value}).currency;ae="USD"==r?1:"CNY"==r?ne.find(function(e){return"USD"==e.currency}).exchangeRate:ne.find(function(e){return e.currency==r}).exchangeRate,f(l,o)}),N(".stencilSide").click(function(){A.popup({title:"Stencil Size",area:["60%","85%"],btn:["确定","取消"],yes:function(e,t){var n=layui.data("stencilList");ce=n.params,V.stencilSize_price=ce.unitPrice,V.stencilWeight=ce.weight,oe.stencilWeight=V.stencilWeight,N("#stencilWeight").val(V.stencilWeight+" KG "),oe.stencilWeight=V.stencilSize_price,N("#sunitPrice").val(V.stencilSize_price),N("#inStencilSize").val(N("#stenContainer").val()),v(),m(),f(),z.closeAll()},success:function(e,t){T(this.id).render("marketManagement/iframeWindow/stencil_size_list",{exchangeId:ie.exchangeId}).done(function(){})}})});var Ie={resetQuoteTab:function(){N("a[title='刷新']").click(),z.msg("重置报价表")},addCustomerFile:function(){z.msg("添加客户资料")},addThisQuote:function(){N(".up-subbtn").click(),N("*[lay-filter='quoteForm']").click();var e=Object.assign(le,ie);if(null==ie.userId||""==ie.userId)return z.msg("请先选择客户"),!1;if(null==ie.gerberName||""==ie.gerberName)return z.tips("请先上传Gerber资料再添加当前报价 !","#addFile",{tips:[1,"#3595CC"],time:2e3}),!1;var t=N("button[data-type='addCustomerFile']").attr("data");return"100%"!=t?(z.msg("等待文件上传完毕，当前进度："+t),!1):void("100%"==t&&($.totalPric==$.totalPriced&&1==$.isQuote?z.confirm("你已经添加了相同参数的报价，是否再次添加？",function(){A.req({type:"post",data:e,url:D.baseUrl+"epc/pcborder/save",success:function(t){N("#orderPN").val(t.pn),ie.productNo=t.pn,q.render(null,"checkCustomer"),"500"!=t.code&&z.alert("添加报价成功["+K[e.orderType]+"]")}})}):(A.req({type:"post",data:e,url:D.baseUrl+"epc/pcborder/save",success:function(t){N("#orderPN").val(t.pn),ie.productNo=t.pn,q.render(null,"checkCustomer"),"500"!=t.code&&z.alert("添加报价成功["+K[e.orderType]+"]")}}),$.totalPric=$.totalPriced,$.isQuote=!0)))},lookQuote:function(){var e=ie.quoteConfigIds;null==E.customerAid||""==E.customerAid?z.msg("请选择对应的客户"):A.popup({title:"产看报价详情",area:["70%","85%"],btn:["确定","取消"],yes:function(e,t){z.closeAll()},success:function(t,n){var a={ids:""};a.ids=ie.quoteConfigIds,T(this.id).render("marketManagement/iframeWindow/quote_detaily",a).done(function(){N("#sss").text(e),N("#sss").attr("name",e)})}})},upSubbtn:function(){if("1"==X.bordType)null==E.customerAid||""==E.customerAid?z.tips("请先选择客户 !","#selCustomer_container",{tips:[1,"#3595CC"],time:2e3}):N(".bot-subbtn").click();else if(2===X.bordType){N(".rStencilSubmit").click();var e=Object.assign(ue,ce);if(e.orderNo=N("#orderNo").val(),e.postFee=se.postFee,null==e.userId||""==e.userId)return z.msg("请先选择客户"),!1;if(null==e.gerberName||""==e.gerberName)return z.tips("请先上传Gerber资料再添加当前报价 !","#addFile",{tips:[1,"#3595CC"],time:2e3}),!1;$.totalPricS==$.totalPricedS&&1==$.isQuoteS?z.confirm("你已经添加了相同参数的报价，是否再次添加？",function(){A.req({type:"post",data:e,url:D.baseUrl+"epc/stencilorder/save",success:function(e){z.alert("钢网报价成功！"),N("#orderPN").val(e.pn),ue.productNo=e.pn}})}):(A.req({type:"post",data:e,url:D.baseUrl+"epc/stencilorder/save",success:function(e){z.alert("钢网报价成功！"),N("#orderPN").val(e.pn),ue.productNo=e.pn}}),$.totalPricS=$.totalPricedS,$.isQuoteS=!0)}else 3===X.bordType&&N(".rAssemblySubmit").click()}},Fe=N(".customerProgress"),ke=N("button[data-type='lookQuote']");W.render({elem:"#addFile",url:D.baseUrl+"sys/oss/upload/geber?access_token="+layui.data("layuiAdmin").access_token,field:"file",accept:"file",exts:"zip|rar|7z",progress:function(e){Fe.fadeIn(),Fe.css({width:e+"%"}),ke.text(e+"%"),N("button[data-type='addCustomerFile']").attr("data",e+"%")},before:function(e){e.preview(function(e,t,n){var a=t.name;ie.gerberName=ue.gerberName=a,ie.pcbName=ue.pcbName=B.CleanFileSuffix(a),null==N("#pcbName").val&&""==N("#pcbName").val||N("#pcbName").val(ie.pcbName),q.render(null,"")})},done:function(e,t,n){z.msg("文件上传成功！"),Fe.fadeOut(),ke.text("详情");var a=e.url,i=/\[(.+?)\]/g,l=a.match(i);console.log("未处理的路径为："+l);var o=l[0].replace(/\[|]/g,"");ie.gerberPath=ue.gerberPath=o,console.log("处理完的路径为："+o),z.closeAll()},error:function(){z.msg("文件上传失败！")}});N(".layui-btn").on("click",function(){var e=N(this).data("type");Ie[e]?Ie[e].call(this):""}),N(".up-rsetbtn").on("click",function(){N(".bot-rsetbtn").click()}),N(".importPcbInfo>.importOrder").on("click",function(){A.popup({title:"导入pcb订单信息",area:["506px","506px"],btn:["导入","取消"],yes:function(e,t){N("#importPCBInfo").click(),z.closeAll()},success:function(e,t){T(this.id).render("marketManagement/iframeWindow/import_pcbInfoForm").done(function(){Y.render(),q.on("submit(importPCBInfo)",function(e){return A.req({type:"post",url:D.baseUrl+"pert/revieworder/reviewOrderInfo",data:e.field,success:function(e){var n=e.data;null!=n?(d(),v(),m(),x(n)):z.alert("当前不存在PCB参数详情！"),z.close(t)}}),!1})})}})}),N(".importPcbInfo>.importReOrder").on("click",function(){A.popup({title:"导入返单信息",area:["506px","506px"],btn:["导入","取消"],id:"popupImportReOrder",yes:function(e,t){N("#importRePCBInfo").click(),z.closeAll()},success:function(e,t){T(this.id).render("marketManagement/iframeWindow/import_pcbInfoReOreder").done(function(){q.on("submit(importRePCBInfo)",function(e){e.field;return A.req({type:"post",url:D.baseUrl+"epc/pcborder/findOrderByUidAndProductNo",data:e.field,success:function(e){var n=e.data;null!=n?(d(),v(),m(),x(n)):z.alert("当前不存在PCB参数详情！"),z.close(t)}}),!1})})}})}),N(".importPcbInfo>.quotePostFee").on("click",function(){A.popup({title:"运费计算",area:["660px","322px"],btn:["清空","返回"],id:"popupQuotePostFee",yes:function(){z.msg("清空数据"),N("#quotePostFeeRest").click()},btn1:function(){z.closeAll()},success:function(e,t){T(this.id).render("marketManagement/iframeWindow/quote_postFee").done(function(){q.render()})}})}),e("quote",{})});