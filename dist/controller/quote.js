/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","form","element","laytpl","layer","upload","jsTools","formSelects"],function(e){function t(e){var t=parseFloat(q("#quantityPCS").val()),n=parseFloat(q("#areasq").val()),i=parseFloat(q("#boardFee").val()),a=parseFloat(i/t).toFixed(3),l=parseFloat(i/n).toFixed(3);0===e?q("#mPrice").val(l):1===e&&q("#unitPrice").val(a),ie.unitPrice=a,console.log("板费/PCS="+i+"/"+t+"="+a),console.log("mPrice="+n+"/"+i+"="+l)}function n(e){var n=parseFloat(q("#areasq").val()),i=parseFloat(n*e).toFixed(2);q("#boardFee").val(i),t(1)}function i(e){if(1===he){c("1");var t=parseFloat(pe*de*ve)/1e6;q("#areasq").val(t.toFixed(3))}else if(2===he){c("2");var t=parseFloat(ge*be*ye)/1e6;if(q("#areasq").val(t.toFixed(3)),""!=ye&&""!=me&&""!=fe){var n=Math.ceil(ye*me*fe);q("#quantityPCS").val(n)}}}function a(e){q("#areasq").val(""),0===e?(q(".itPanelway input").attr("disabled",X.isDis.itPanelway),q(".itPanelsize input").attr("disabled",X.isDis.itPanelsize)):1===e?(q(".mto-input").removeAttr("disabled","true"),q(".itPanelway input").attr("disabled","disabled"),q(".itPanelsize input").attr("disabled","disabled"),q(".itSinlgesize input").val(""),q(".itPanelway input").val(""),q(".itPanelsize input").val("")):2===e&&(q(".mto-input").removeAttr("disabled","true"),q(".itSinlgesize input").attr("disabled","disabled"),q(".itSinlgesize input").val(""))}function l(){q("#selHc").attr("disabled",ue.isDis.selHc),q("#selInlayercoopper").attr("disabled",ue.isDis.selInlayercoopper),q("#selInnerMintrack").attr("disabled",ue.isDis.selInnerMintrack),q("#selNofcore").attr("disabled",ue.isDis.selNofcore),q("#selMinspaccing").attr("disabled",ue.isDis.selMinspaccing),q("#selNofpp").attr("disabled",ue.isDis.selNofpp),q("#radioSinglePcb").attr("checked","true"),q("#ptfr4").attr("checked","true"),q("#routingOne").attr("checked","true"),q("#selLayer").val(ue.selLayer),q("#selFinishThickness").val(ue.selFinishThickness),q("#selMaterial").val(ue.selMaterial),q("#selkbsy").val(ue.selkbsy),q("#selTg").val(ue.selTg),q("#selHf").val(ue.selHf),q("#selHc").val(ue.selHc),q("#selInlayercoopper").val(ue.selInlayercoopper),q("#selInnerMintrack").val(ue.selInnerMintrack),q("#selNofcore").val(ue.selNofcore),q("#selMinspaccing").val(ue.selMinspaccing),q("#selNofpp").val(ue.selNofpp),q("#selOuterlayercopper").val(ue.selOuterlayercopper),q("#selOutMintrack").val(ue.selOutMintrack),q("#selBgasize").val(ue.selBgasize),q("#selMinspacing").val(ue.selMinspacing),q("#selMinholesize").val(ue.selMinholesize),q("#selPthcopper").val(ue.selPthcopper),q("#selSoldermc").val(ue.selSoldermc),q("#selViaprocess").val(ue.selViaprocess),q("#selSilksc").val(ue.selSilksc),q("#selPeelable").val(ue.selPeelable),q("#selSurfacefinish").val(ue.selSurfacefinish),q("#selTestcost").val(ue.selTestcost),M.render()}function o(e){if(q("#selLayer").children().remove(),"Aluminum"==e)for(var t=0;t<Q.length;t++){var n=Q[t].text,i=Q[t].value;q("#selLayer").append("<option value="+i+">"+n+"</option>")}else if("FR4"==e)for(var t=0;t<O.length;t++){var n=O[t].text,i=O[t].value;q("#selLayer").append("<option value="+i+">"+n+"</option>"),u(1)}else if("FR4+Aluminum"==e)for(var t=0;t<U.length;t++){var n=U[t].text,i=U[t].value;q("#selLayer").append("<option value="+i+">"+n+"</option>")}}function r(e){if(q("#selMaterial").children().remove(),"Aluminum"==e){for(var t=0;t<L.length;t++){var n=L[t].text,i=L[t].value;q("#selMaterial").append("<option value="+i+">"+n+"</option>")}s("yg")}else{for(var t=0;t<G.length;t++){var n=G[t].text,i=G[t].value;q("#selMaterial").append("<option value="+i+">"+n+"</option>")}s("kb")}M.render("select")}function s(e,t){if(q("#selkbsy").children().remove(),"KB"==e)for(var n=0;n<R.length;n++){var i=R[n].text,a=R[n].value;q("#selkbsy").append("<option value="+a+">"+i+"</option>")}else if("YG"==e)for(var n=0;n<K.length;n++){var i=K[n].text,a=K[n].value;q("#selkbsy").append("<option value="+a+">"+i+"</option>")}else if("SY"==e)for(var n=0;n<H.length;n++){var i=H[n].text,a=H[n].value;q("#selkbsy").append("<option value="+a+">"+i+"</option>")}null==t&&""==t||q("#selkbsy").find("option[value='"+t+"']").prop("selected",!0),M.render("select")}function c(e){var t=e;"1"==t?(pe=q("#singleSizeX").val(),de=q("#singleSizeY").val(),ve=q("#quantityPCS").val()):"2"==t&&(me=q("#panelWayX").val(),fe=q("#panelWayY").val(),ye=q("#quantityPanel").val(),ge=q("#panelSizeX").val(),be=q("#panelSizeY").val())}function u(e){p(),2===Pe?(ue.selLayer=1,ue.selMaterial="YG",ue.selkbsy="YG0001",ue.selHc="1W",ue.selMinholesize="1.5",ue.selPthcopper="none",ue.selSoldermc="white",ue.selViaprocess="none",ue.selSilksc="black",ue.isDis.selHc=!1):3===Pe&&(ue.selLayer=4,ue.selHc="1W",ue.selInlayercoopper="1oz",ue.selMintrack="5mil",ue.selNofcore="1",ue.selMinspaccing="5mil",ue.selNofpp="2",ue.selInnerMintrack="5mil",ue.selMinholesize="1.5",ue.selPthcopper="none",ue.selSoldermc="white",ue.selSilksc="black",ue.selPeelable="none",ue.isDis.selInlayercoopper=!1,ue.isDis.selInnerMintrack=!1,ue.isDis.selNofcore=!1,ue.isDis.selMinspaccing=!1,ue.isDis.selNofpp=!1),l()}function p(){ue.selLayer=2,ue.selFinishThickness="1.6mm",ue.selMaterial="KB",ue.selkbsy="KB6160",ue.selTg="135",ue.selHf="NO",ue.selHc="none",ue.selInlayercoopper="none",ue.selMintrack="none",ue.selNofcore="none",ue.selMinspaccing="none",ue.selNofpp="none",ue.selOuterlayercopper="1oz",ue.selInnerMintrack="none",ue.selOutMintrack="5mil",ue.selBgasize="0.30",ue.selMinspacing="5mil",ue.selMinholesize="0.3",ue.selPthcopper="20um",ue.selSoldermc="green",ue.selViaprocess="Follow_gerber",ue.selSilksc="white",ue.selPeelable="none",ue.selSurfacefinish="HASL_with_lead",ue.selTestcost="1",ue.selCti="175≤CTI<250",ue.isDis={},ue.isDis.selHc=!0,ue.isDis.selInlayercoopper=!0,ue.isDis.selInnerMintrack=!0,ue.isDis.selNofcore=!0,ue.isDis.selMinspaccing=!0,ue.isDis.selNofpp=!0}function d(){var e=q("#areasq").val(),t=q("#selLayer").val();q("input[name='buildTime']").remove(),q(".build-time-item .layui-form-radio").remove(),D.req({type:"post",async:!1,url:W.imUrl+"quote/getBuildTime",data:{areaSq:e,layerNum:t,exchangeId:ie.exchangeId},success:function(e){q(".build-time-item").css("display","");var t;q("#selBuildTime").children().remove();for(var n=0;n<e.data.length;n++)q("#selBuildTime").append("<option value="+e.data[n].price+">"+e.data[n].dayNumber+"</option>"),t=e.data[0].dayNumber;ie.buildTime=t,q(".build-time-item input").each(function(){var e=q(this).attr("title");"none"==e&&this.remove()}),M.render()},error:function(){w.msg("Get BuildTime Fail!!!")}})}function v(){var e=null;1===V.bordType?e="selCompany":2===V.bordType?e="selCompanyt":3===V.bordType&&(e="selCompany"),D.req({type:"post",url:W.imUrl+"quote/getCouriers",async:!1,success:function(t){q("select[id='"+e+"'] option").remove(),z.render(e),V.companyId=t.data[0].id;for(var n=0;n<t.data.length;n++)q("select[xm-select='"+e+"']").append("<option value="+t.data[n].id+">"+t.data[n].courierName+"</option>"),Z.courierId=t.data[0].id,V.companyId=Z.courierId;z.render(e),z.value(e,[t.data[0].id]),M.render("select")},error:function(){w.msg("Get Couriers Fail!!!")}})}function m(){var e=null;1===V.bordType?e="selCountrys":2===V.bordType?e="selCountryst":3===V.bordType&&(e="selCountryss"),q("select[id='"+e+"'] option").remove(),z.render(e),M.render(),D.req({type:"post",async:!1,url:W.imUrl+"quote/getCountry",success:function(t){V.countrysId=t.data[0].id;for(var n=0;n<t.data.length;n++)q("select[xm-select='"+e+"']").append("<option value="+t.data[n].id+">"+t.data[n].name+"</option>"),Z.countryId=t.data[0].id,V.countrysId=Z.countryId;M.render(),z.render(e),z.value(e,[t.data[0].id])},error:function(){w.msg("Get Countrys Fail!!!")}})}function f(e,t){var n;null!=e&&"undefined"!=typeof e&&""!=e||(e=1),null!=t&&"undefined"!=typeof t&&""!=t||(t=70),n=2===V.bordType?E.stencilWeight:V.totalWeight,D.req({type:"post",url:W.imUrl+"quote/getShippingCost",data:{courierId:e,countryId:t,totalWeight:n,exchangeId:ie.exchangeId},success:function(e){null!=e.data&&1===V.bordType?(ie.postFee=e.data.shippingCost,J.postFee=e.data.shippingCost,$.shipping=e.data.shippingCost,q("#shippingPrice").val($.shipping),h()):null!=e.data&&2===V.bordType?(E.stencil_shippingPrice=re.postFee=e.data.shippingCost,console.log("stencil_shippingPrice:"+E.stencil_shippingPrice),q("#postFees").val(E.stencil_shippingPrice),P()):q("#shippingPrice").val("不支持该配送")},error:function(){w.msg("Get ShippingCost Fail!!!")}})}function y(){D.req({type:"post",url:W.baseUrl+"sys/consumer/user/all",success:function(e){for(var t=0;t<e.data.length;t++)q("select[xm-select='selCustomer']").append("<option id="+e.data[t].id+" value="+e.data[t].id+">"+e.data[t].userSystemId+"</option>");z.render("selCustomer"),M.render("select")}})}function g(){D.req({type:"post",url:W.baseUrl+"market/exchangerate/all",success:function(e){for(var t,n=0;n<e.data.length;n++)t+="<option id="+e.data[n].id+" value="+e.data[n].id+">"+e.data[n].currency+"</option>";q("select[xm-select='exchangeId']").append(t),M.render("select"),z.render("exchangeId"),z.value("exchangeId",[e.data[0].id])}})}function b(e){var t=0;q.each(e,function(n,i){var a=parseFloat(i);(""==a||null==a||isNaN(a))&&(e[n]=0,a=0),t+=a}),oe.pcbCost=t.toFixed(2),q("#pcbCost").val(oe.pcbCost),h()}function h(){var e=q("#shippingPrice").val();oe.shippingPrice=parseFloat(e),q.each(oe,function(e,t){(""==t||null==t||isNaN(t))&&(oe[e]=0)});var t=parseFloat(oe.pcbCost),e=parseFloat(oe.shippingPrice),n=(t+e).toFixed(2);oe.totalPrice=n,ie.subtotal=t,ee.totalPriced=oe.totalPrice,q("#totalPrice").val(oe.totalPrice)}function P(){var e;e="Top And Bottom (On Single Stencil)"==re.stencilSide||"Top"==re.stencilSide||"Bottom"==re.stencilSide?1:2,re.inStencilCost=re.sQuantity*E.stencilSize_price*e,q("#inStencilCost").val(re.inStencilCost),S()}function S(){var e=re,t=e.postFee+e.inStencilCost;ce.totalStencilFee=t,ee.totalPricedS=t,q("#stotalPrice").val(t),I()}function I(){var e=parseInt(q("#inStencilCost").val()),t=parseInt(q("#stencil_quantity").val()),n=(e/t).toFixed(3);se.unitPrice=n,q("#sunitPrice").val(n)}function F(){var e=new Object;return e.enginnerFee=parseFloat(q("#enginnerFee").val()),e.boardFee=parseFloat(q("#boardFee").val()),e.testCostFee=parseFloat(q("#testFee").val()),e.toolingFee=parseFloat(q("#toolingFee").val()),e.overworkFee=parseFloat(q("#urgentFee").val()),e}function k(){q("#inStencilCost").val(""),q("#shippingPrice").val(""),q("#totalPrice").val(""),M.render()}function N(e){ne.importPCBInfo=e,q("#inside_quote_all input,#inside_quote_all select").each(function(){var t=q(this).attr("name"),n=q(this),i=q(this).attr("type");(isNaN(e[t])||""==e[t]||null==e[t])&&n.parents(".rig-price").length>0&&(e[t]=0),n.is("input")&&("text"==i||"number"==i?n.val(e[t]):"checkbox"==i?q("input[type=checkbox][name="+t+"][value='"+e[t]+"']").attr("checked","checked"):"radio"==i&&(q("input[name="+t+"][value='"+e[t]+"']").prop("checked","checked"),"boardType"==t&&a(e.boardType))),n.is("select")&&(q("select[name='"+t+"'] option[value='"+e[t]+"']").attr("selected",!0),"nOfPp"!=t&&"countries"!=t||q("select[name='"+t+"'] option[value='"+e[t]+"']").attr("selected",!0)),q("*[name='remark']").val(e.remark),"userId"==t&&(q("select[name='userId']").find("option[id="+e.userId+"]").attr("selected",!0),q("input[name='customerId']").val(e.userId),ie.userId=J.customerAid=e.userId)}),s(e.material,e.productCode),q("input[name='customerSysName']").val(q("#selCustomer").find("option:selected").text()),ie.userId=J.customerAid=e.userId,ie.gerberName=e.gerberName,ie.gerberPath=e.gerberPath,ie.pcbName=ce.pcbName=e.pcbName,ie.productNo=e.productNo,ie.countries=V.countrysId=e.countries,ie.postFee=e.postFee;var t=q("dl[xid='selCustomer']").children(".xm-select-this").attr("lay-value");q("#customerId").val(t),q("input[name='customerSysName']").val(t);var n=parseFloat(q("input[name='subtotal']").val()),i=parseFloat(q("input[name='postFee']").val());(isNaN(n)||""==n)&&(n=0),(isNaN(i)||""==i)&&(i=0);var l=n+i;q("input[id='totalPrice']").val(l),M.render(),q(".bot-subbtn").click();var o,r;Object.assign(ae,ie);o=e.countries,r=e.courierId,z.value("selCompany",[1]),z.value("selCountrys",[o]),w.msg("导入PCB信息成功")}function x(e){var t,n,i,a,l=C();return e.A.customerSysName=e.B.customerSysName,q.each(e.A,function(o,r){if(n=""==r||null==r||"none"==r,q.each(e.B,function(e,s){if(i=""==s||null==s||"none"==s,o==e){l.fd.indexOf(o),l.fdyg.indexOf(o);r==s?t=2:n&&i?t=2:(r!=s&&"-1"==l.fd.indexOf(o)||"-1"==l.fdyg.indexOf(o))&&(console.log("key值不同的q["+o+","+r+"],i["+e+","+s+"]"),l.fdyg.indexOf(o)>=0?(t=3,a=!0):t=2)}}),1==a)return!1}),console.log("orderType:===>"+t),t}function C(){var e="",t="";q(".top-m-one input").each(function(){"undefined"!=typeof q(this).attr("name")&&(e+=","+q(this).attr("name"))}),q(".top-price-one input").each(function(){"undefined"!=typeof q(this).attr("name")&&(e+=","+q(this).attr("name"))}),q(".center-m-two input").each(function(){"undefined"!=typeof q(this).attr("name")&&(t+=","+q(this).attr("name"))}),q(".center-m-two select").each(function(){"undefined"!=typeof q(this).attr("name")&&(t+=","+q(this).attr("name"))});var n={fd:e,fdyg:t};return n}function T(e){var e=e;if(0===e)for(var t=0;t<j.length;t++)q("."+j[t]).hide();else if(1===e)for(var t=0;t<j.length;t++)q("."+j[t]).show()}var q=layui.jquery,A=layui.view,M=layui.form,D=layui.admin,B=layui.element,W=layui.setter,Y=layui.upload,z=layui.formSelects,_=layui.jsTools,w=layui.layer;B.render();var O=[{text:0,value:0},{text:1,value:1},{text:2,value:2},{text:4,value:4},{text:6,value:6},{text:8,value:8}],Q=[{text:0,value:0},{text:1,value:1},{text:2,value:2}],U=[{text:0,value:0},{text:4,value:4},{text:6,value:6},{text:8,value:8}],G=[{text:"none",value:"none"},{text:"KB",value:"KB"},{text:"SY",value:"SY"}],L=[{text:"YG",value:"YG"}],R=[{text:"KB6160",value:"KB6160"},{text:"KB6150",value:"KB6150"},{text:"KB6165",value:"KB6165"},{text:"KB6167",value:"KB6167"}],H=[{text:"SY1130",value:"SY1130"},{text:"SY1141",value:"SY1141"},{text:"SY1150",value:"SY1150"},{text:"SY1170",value:"SY1170"},{text:"SY1180",value:"SY1180"},{text:"SY1000",value:"SY1000"},{text:"SY1000-2",value:"SY1000-2"},{text:"SY1600",value:"SY1600"}],K=[{text:"YG0001",value:"YG0001"},{text:"YG0002",value:"YG0002"},{text:"YG0003",value:"YG0003"},{text:"YG0004",value:"YG0004"}],j=["totalForm","addQuote"],X={isDis:{itPanelway:!0,itPanelsize:!0}},V={bordType:1,companyId:1,countrysId:70,totalWeight:0},E={stencilSize_price:"",stencilWeight:"",stencil_shippingPrice:""},J={postFee:"",customerAid:"",ids:"",orderNo:""},Z={courierId:1,countryId:"",totalWeight:""},$={shipping:""},ee={totalPric:null,totalPriced:null,isQuote:!1,totalPricS:null,totalPricedS:null,isQuoteS:!1},te=null,ne={importPCBInfo:null},ie={engineeringFee:"",boardFee:"",testCostFee:"",toolingFee:"",overworkFee:0,buildTime:"",weight:"",postFee:0,subtotal:"",quoteConfigIds:"",productNo:"",userId:"",orderType:1,gerberName:"",gerberPath:"",pcbName:"",orderNo:"",countries:"Afghanistan",courierName:Z.courierId,exchangeId:1,unitPrice:""},ae={},le={stencilWeight:"",inStencilCost:""},oe={pcbCost:0,totalPrice:0,shippingPrice:0},re={postFee:E.stencil_shippingPrice,inStencilCost:null,sQuantity:1,stencilSide:"Top And Bottom (On Single Stencil)",sunitPrice:E.stencilSize_price,stotalPrice:null},se=new Object,ce={stencilSide:"Top And Bottom (On Single Stencil)",quantity:re.sQuantity,thickness:.12,existingFiducials:.1,totalStencilFee:re.stotalPrice,gerberPath:null,gerberName:null,orderId:null,orderType:1,pcbName:null,postFee:null,orderNo:null,companyId:V.companyId,countrysId:V.countrysId,customerSysName:null,userId:null,productNo:null},ue={};p(),l(),a(0),o("FR4"),r(),s("kb"),y(),g();var pe,de,ve,me,fe,ye,ge,be,he=1;q("#singleSizeX,#singleSizeY,#quantityPCS").bind("input propertychange",function(e){i()}),q("#panelSizeX,#panelSizeY,#quantityPanel").bind("input propertychange",function(e){null!=ge&&null!=be&&null!=ye&&i()}),q("#panelWayX,#panelWayY,#quantityPanel").bind("input propertychange",function(e){i()}),q("input[name='testPoint']").bind("input propertychange",function(e){setTimeout(function(){q(".up-subbtn").click()},1800)}),q("input[name='panelRoutingPath']").bind("input propertychange",function(e){setTimeout(function(){q(".up-subbtn").click()},1800)}),q("input[name='punchingHoles']").bind("input propertychange",function(e){setTimeout(function(){q(".up-subbtn").click()},1800)}),q("input[name='punchingSlots']").bind("input propertychange",function(e){setTimeout(function(){q(".up-subbtn").click()},1800)}),q("input[name='surfaceArea']").bind("input propertychange",function(e){setTimeout(function(){q(".up-subbtn").click()},1800)}),q("#boardFee").bind("input propertychange",function(e){t(0)}),q("#quantityPCS").bind("input propertychange",function(e){t(0)}),q("#mPrice").bind("input propertychange",function(e){n(parseFloat(q(this).val()))}),q("#rPcbForm").bind("input propertychange",function(){var e=F();b(e),ie.postFee=parseFloat(q("#shippingPrice").val()),ie.engineeringFee=parseFloat(q("#enginnerFee").val()),ie=Object.assign(ie,e),console.log(ie)}),q("#stencil_quantity").bind("input propertychange",function(){var e=parseFloat(q(this).val());(""==e||null==e||"undefined"==typeof e||isNaN(e))&&(e=0),re.sQuantity=ce.quantity=e,P()}),M.on("radio(boardType)",function(e){var t=e.value;"1"==t?(he=1,a(1)):"2"==t&&(he=2,a(2))}),M.on("select(material)",function(e){var t=e.value;s(t)}),M.on("select(selSurfacefinish)",function(e){var t=e.value;"HASL_with_lead"==t||"HASL_lead_free"==t?q("#selSurfacethickness").val("2.54-25.4um"):"Immersion_Gold"==t?q("#selSurfacethickness").val("2u"):"Immersion_tin"==t?q("#selSurfacethickness").val("0.5um-0.7um"):"Immersion_silver"==t?q("#selSurfacethickness").val("≥0.05um"):"OSP"==t&&q("#selSurfacethickness").val("0.25-0.5um"),"Immersion_Gold"==t?q("input[name='surfaceArea']").removeAttr("disabled"):q("input[name='surfaceArea']").attr("disabled",!0),M.render("select","quoteForm"),M.render(null,"quoteForm")}),M.on("select(testPointType)",function(e){var t=e.value;"1"==t?q("#testPointT").text("飞针费："):q("#testPointT").text("测试架："),q(".up-subbtn").click()}),M.on("select(stencilSide)",function(e){var t=e.value;console.log(t),re.stencilSide=ce.stencilSide=t,P()}),M.on("radio(existingFiducials)",function(e){var t=ce.existingFiducials=e.value;w.msg(t)}),M.on("radio(sthickness)",function(e){var t=ce.thickness=e.value;w.msg(t)}),M.on("radio(routingType)",function(e){var t=e.value;"1"==t?(q("input[name='panelRoutingPath']").removeAttr("disabled"),q("input[name='punchingHoles']").attr("disabled",!0),q("input[name='punchingSlots']").attr("disabled",!0)):(q("input[name='panelRoutingPath']").attr("disabled",!0),q("input[name='punchingHoles']").removeAttr("disabled"),q("input[name='punchingSlots']").removeAttr("disabled")),q(".up-subbtn").click(),M.render()}),B.on("collapse(orderTypeCol)",function(e){var t=e.title.context.innerText;t.indexOf("PCB Phototype")!=-1?(q(".rig-price-cardbody form").removeClass("quote-avtive"),q(".rig-price").addClass("quote-avtive"),T(1),V.bordType=1):t.indexOf("SMT-Stencil")!=-1?(q(".rig-price-cardbody form").removeClass("quote-avtive"),q("#stencilForm").addClass("quote-avtive"),T(0),V.bordType=2):t.indexOf("Assembly Service")!=-1&&(q(".rig-price-cardbody form").removeClass("quote-avtive"),q("#assemblyForm").addClass("quote-avtive"),V.bordType=3),k()}),M.on("select(layer)",function(e){var t=e.value;ue.selLayer=t,"1"==Pe&&("1"==t?(ue.selPthcopper="none",ue.selViaprocess="none"):"2"==t?(ue.selPthcopper="20um",ue.selViaprocess="Follow_gerber"):"4"==t?(p(),ue.selLayer=t,ue.selInlayercoopper="1oz",ue.isDis.selInlayercoopper=!1,ue.selInnerMintrack="5mil",ue.isDis.selInnerMintrack=!1,ue.selNofcore="1",ue.isDis.selNofcore=!1,ue.selNofpp="2",ue.isDis.selNofpp=!1):"6"==t?(p(),ue.selLayer=t,ue.selInlayercoopper="1oz",ue.isDis.selInlayercoopper=!1,ue.selInnerMintrack="5mil",ue.isDis.selInnerMintrack=!1,ue.selNofcore="2",ue.isDis.selNofcore=!1,ue.selNofpp="3",ue.isDis.selNofpp=!1,ue.selPthcopper="none"):"8"==t&&(p(),ue.selLayer=t,ue.selInlayercoopper="1oz",ue.isDis.selInlayercoopper=!1,ue.selInnerMintrack="5mil",ue.isDis.selInnerMintrack=!1,ue.selNofcore="3",ue.isDis.selNofcore=!1,ue.selNofpp="4",ue.isDis.selNofpp=!1,ue.selPthcopper="none"),l())});var Pe=1;M.on("radio(pcbType)",function(e){var t=e.value;w.msg(t),"FR4"==t?(Pe=1,o("FR4"),u(),r("FR4")):"Aluminum"==t?(Pe=2,o("Aluminum"),u(),r("Aluminum")):"FR4+Aluminum"==t&&(Pe=3,o("FR4+Aluminum"),u(),r("FR4+Aluminum"))}),M.on("radio(buildTimeRadio)",function(e){var t=e.value;console.log(e),console.log(e),ie.overworkFee=t,q("#urgentFee").val(t),b()}),M.on("select(selBuildTime)",function(e){var t=e.value,n=q("#selBuildTime").find("option[value="+e.value+"]").text();oe.shippingPrice=t,ie.overworkFee=t,ie.buildTime=n,q("#urgentFee").val(t);var i=F();b(i)}),layui.formSelects.on("selCompany",function(e,t,n,i,a){var l=(n.name,n.value);V.companyId=l;var o=V.companyId,r=V.countrysId;f(o,r)}),layui.formSelects.on("selCountrys",function(e,t,n,i,a){var l=(n.name,n.value);V.countrysId=l,ie.countries=V.countrysId,2===V.bordType&&S();var o=V.companyId,r=V.countrysId;f(o,r)}),layui.formSelects.on("selCustomer",function(e,t,n,i,a){var l=n.name,o=n.value;J.customerAid=o,ie.userId=ce.userId=o,ce.customerSysName=l,q("#customerId").val(o),q("input[name='customerSysName']").val(l)}),M.on("select(filterOrderType)",function(e){ie.orderType=ce.orderType=e.value}),layui.formSelects.on("selCompanyt",function(e,t,n,i,a){V.companyId=n.value;var l=V.companyId,o=V.countrysId;f(l,o)}),layui.formSelects.on("selCountryst",function(e,t,n,i,a){V.countrysId=n.value;var l=V.companyId,o=V.countrysId;f(l,o)}),q("#postFees").bind("input propertychange",function(e){re.postFee=parseFloat(q(this).val()),P()}),q("#inStencilCost").bind("input propertychange",function(e){re.inStencilCost=parseFloat(q(this).val()),S()}),M.on("submit(assemblyService)",function(e){var e=e.field;return D.req({type:"post",data:e,url:W.imUrl+"quote/getAssemblyQuote",success:function(e){var t=q("#pcbQuantity").val(),n=parseFloat(e.data.totalAssemblyQuote/t);q("#pricePCS").val(n.toFixed(2)),q("#assemblyCost").val(e.data.totalAssemblyQuote),null!=e.data.totalAssemblyWeight&&""!=e.data.totalAssemblyWeight&&q("#assemblyWeight").val(e.data.totalAssemblyWeight),console.log(e);e.data.totalAssemblyQuote,e.data.totalAssemblyWeight}}),!1}),q("#panelWayX,#panelWayY,#quantityPanel").keydown(function(e){var t=parseInt(e.keyCode);return 110!=t}),q("#panelWayX,#panelWayY,#quantityPanel").bind("cut copy paste",function(e){e.preventDefault()}),M.on("submit(quoteForm)",function(e){var e=e.field,t=e.cncAndPunch;return console.log(e),console.log("提价表单"),ae=e,e.isExistSmt=0,e.stackUp="none",e.innerMinTrack=e.innerMinSpacing,e.outerMinSpacing=e.outerMinTrack,e.silkScreenBotColor=e.solderMaskTopColor,e.solderMaskBotColor=e.solderMaskTopColor,e.surfaceArea=e.surfaceArea,e.orderNo=q("#orderNo").val(),ie.orderNo=e.orderNo,e.pcbName=ie.pcbName,e.exchangeId=ie.exchangeId,2!==he||null!=e.panelWayX&&""!=e.panelWayX&&null!=e.panelWayY&&""!=e.panelWayY?null==e.testPoint||""==e.testPoint?(q("html,body").animate({scrollTop:200},"slow"),w.msg("请输入测试点数量 !"),!1):"Immersion_Gold"==e.surfaceFinish&&""==e.surfaceArea?(w.msg("请输入沉金面积！"),!1):(D.req({type:"post",url:W.imUrl+"quote/countAdditionInfo",data:e,success:function(e){if(null!=e.data.pcbPriceDetail&&""!=e.data.pcbPriceDetail&&(null==e.data.pcbPriceDetail.qcidList&&""==e.data.pcbPriceDetail.qcidList||(J.ids=e.data.pcbPriceDetail.qcidList,ie.quoteConfigIds=e.data.pcbPriceDetail.qcidList.join(","),J.ids=e.data.pcbPriceDetail.qcidList)),ie.engineeringFee=e.data.projectQuoteToUSD,ie.boardFee=e.data.totalBoardQuoteToUSD,ie.testCostFee=e.data.totalTestPointToUSD,ie.toolingFee=e.data.cncAndPunchingQuoteToUSD,ie.weight=e.data.totalQuoteWeight,ie.unitPrice=e.data.unitPrice,V.totalWeight=e.data.totalQuoteWeight,q("#boardFee").val(e.data.totalBoardQuoteToUSD),q("#enginnerFee").val(e.data.projectQuoteToUSD),q("#pcbWeight").val(e.data.totalQuoteWeight+" KG"),q("#testFee").val(e.data.totalTestPointToUSD),q("#flyingTest").val(e.data.totalTestPointToUSD),q("#routingCost").val(e.data.cncAndPunchingQuoteToUSD),q("#unitPrice").val(e.data.unitPrice),Z.totalWeight=e.data.totalQuoteWeight,V.totalWeight=e.data.totalQuoteWeight,te=e.data.areaType,"1"==t?q("#toolingFee").val(0):q("#toolingFee").val(e.data.cncAndPunchingQuoteToUSD),"1"==te)q("#mPrice").val(""),q("#mPrice").attr("disabled",!0);else{var n=parseFloat(e.data.totalBoardQuoteToUSD/q("#areasq").val()).toFixed(2);q("#mPrice").val(n),q("#mPrice").removeAttr("disabled")}if(b(),d(),null!=Z.courierId&&""!=Z.courierId||v(),null!=Z.countryId&&""!=Z.countryId||m(),null!=V.companyId&&""!=V.companyId&&null!=V.countrysId&&""!=V.countrysId){var i=V.companyId,a=V.countrysId;f(i,a)}var l=F();b(l)},error:function(e){alert("Services Error!!!")}}),M.render(),!1):(w.tips("请输入拼版方式 !","#panelWayX",{tips:[1,"#3595CC"],time:5e3}),!1)}),layui.formSelects.on("exchangeId",function(e,t,n,i,a){ie.exchangeId=n.value;var l=V.companyId,o=V.countrysId;f(l,o)}),q(".stencilSide").click(function(){D.popup({title:"Stencil Size",area:["60%","85%"],btn:["确定","取消"],yes:function(e,t){var n=layui.data("stencilList");se=n.params,E.stencilSize_price=se.unitPrice,E.stencilWeight=se.weight,le.stencilWeight=E.stencilWeight,q("#stencilWeight").val(E.stencilWeight+" KG "),le.stencilWeight=E.stencilSize_price,q("#inStencilSize").val(q("#stenContainer").val()),v(),m(),f(),w.closeAll()},success:function(e,t){A(this.id).render("marketManagement/iframeWindow/stencil_size_list",{exchangeId:ie.exchangeId}).done(function(){})}})});var Se={resetQuoteTab:function(){q("a[title='刷新']").click(),w.msg("重置报价表")},addCustomerFile:function(){w.msg("添加客户资料")},addThisQuote:function(){var e;q(".up-subbtn").click(),q("*[lay-filter='quoteForm']").click();var t=Object.assign(ae,ie);if(null==ie.userId||""==ie.userId)return w.msg("请先选择客户"),!1;if(null==ie.gerberName||""==ie.gerberName)return w.tips("请先上传Gerber资料再添加当前报价 !","#addFile",{tips:[1,"#3595CC"],time:2e3}),!1;if(ne.importPCBInfo){var n={A:null,B:null};n.A=t,n.B=ne.importPCBInfo,t.orderType=x(n),"2"==t.orderType?e="返单":"3"==t.orderType&&(e="返单有改")}else t.orderType=1,e="新单";ee.totalPric==ee.totalPriced&&1==ee.isQuote?w.confirm("你已经添加了相同参数的报价，是否再次添加？",function(){D.req({type:"post",data:t,url:W.baseUrl+"epc/pcborder/save",success:function(t){null==q("#orderPN").val()||""==q("#orderPN").val?(q("#orderPN").val(t.pn),ie.productNo=t.pn,console.log("型号赋值："+t.pn)):console.log("型号不为空:"+q("#orderPN").val()),M.render(null,"checkCustomer"),"500"!=t.code&&w.alert("添加报价成功["+e+"]")}})}):(D.req({type:"post",data:t,url:W.baseUrl+"epc/pcborder/save",success:function(t){null==q("#orderPN").val()||""==q("#orderPN").val?(q("#orderPN").val(t.pn),ie.productNo=t.pn,console.log("型号赋值："+t.pn)):console.log("型号不为空:"+q("#orderPN").val()),M.render(null,"checkCustomer"),"500"!=t.code&&w.alert("添加报价成功["+e+"]")}}),ee.totalPric=ee.totalPriced,ee.isQuote=!0)},lookQuote:function(){var e=ie.quoteConfigIds;null==J.customerAid||""==J.customerAid?w.msg("请选择对应的客户"):D.popup({title:"产看报价详情",area:["70%","85%"],btn:["确定","取消"],yes:function(e,t){w.closeAll()},success:function(t,n){var i={ids:""};i.ids=ie.quoteConfigIds,A(this.id).render("marketManagement/iframeWindow/quote_detaily",i).done(function(){q("#sss").text(e),q("#sss").attr("name",e)})}})},upSubbtn:function(){if(console.log("开始进入报价...."),"1"==V.bordType)null==J.customerAid||""==J.customerAid?w.tips("请先选择客户 !","#selCustomer_container",{tips:[1,"#3595CC"],time:2e3}):q(".bot-subbtn").click();else if(2===V.bordType){q(".rStencilSubmit").click();var e=Object.assign(ce,se);if(e.orderNo=q("#orderNo").val(),e.postFee=re.postFee,null==e.userId||""==e.userId)return w.msg("请先选择客户"),!1;if(null==e.gerberName||""==e.gerberName)return w.tips("请先上传Gerber资料再添加当前报价 !","#addFile",{tips:[1,"#3595CC"],time:2e3}),!1;ee.totalPricS==ee.totalPricedS&&1==ee.isQuoteS?w.confirm("你已经添加了相同参数的报价，是否再次添加？",function(){D.req({type:"post",data:e,url:W.baseUrl+"epc/stencilorder/save",success:function(e){w.alert("钢网报价成功！"),q("#orderPN").val(e.pn),ce.productNo=e.pn}})}):(D.req({type:"post",data:e,url:W.baseUrl+"epc/stencilorder/save",success:function(e){w.alert("钢网报价成功！"),q("#orderPN").val(e.pn),ce.productNo=e.pn}}),ee.totalPricS=ee.totalPricedS,ee.isQuoteS=!0)}else 3===V.bordType&&q(".rAssemblySubmit").click()}};Y.render({elem:"#addFile",url:W.baseUrl+"sys/oss/upload/geber?access_token="+layui.data("layuiAdmin").access_token,field:"file",accept:"file",exts:"zip|rar|7z",before:function(e){e.preview(function(e,t,n){var i=t.name;ie.gerberName=ce.gerberName=i,ie.pcbName=ce.pcbName=_.CleanFileSuffix(i),console.log("显示的文件名为："+ie.pcbName),null==q("#pcbName").val&&""==q("#pcbName").val||q("#pcbName").val(ie.pcbName),M.render(null,"")})},done:function(e,t,n){w.msg("文件上传成功！");var i=e.url,a=/\[(.+?)\]/g,l=i.match(a);console.log("未处理的路径为："+l);var o=l[0].replace(/\[|]/g,"");ie.gerberPath=ce.gerberPath=o,console.log("处理完的路径为："+o)},error:function(){w.msg("文件上传失败！")}});q(".layui-btn").on("click",function(){var e=q(this).data("type");Se[e]?Se[e].call(this):""}),q(".up-rsetbtn").on("click",function(){q(".bot-rsetbtn").click()}),q(".importPcbInfo>.importOrder").on("click",function(){D.popup({title:"导入pcb订单信息",area:["506px","506px"],btn:["导入","取消"],yes:function(e,t){q("#importPCBInfo").click(),w.closeAll()},success:function(e,t){A(this.id).render("marketManagement/iframeWindow/import_pcbInfoForm").done(function(){z.render(),M.on("submit(importPCBInfo)",function(e){return D.req({type:"post",url:W.baseUrl+"pert/revieworder/reviewOrderInfo",data:e.field,success:function(e){var n=e.data;null!=n?(d(),v(),m(),N(n)):w.alert("当前不存在PCB参数详情！"),w.close(t)}}),!1})})}})}),q(".importPcbInfo>.importReOrder").on("click",function(){D.popup({title:"导入返单信息",area:["506px","506px"],btn:["导入","取消"],id:"popupImportReOrder",yes:function(e,t){q("#importRePCBInfo").click(),w.closeAll()},success:function(e,t){A(this.id).render("marketManagement/iframeWindow/import_pcbInfoReOreder").done(function(){M.on("submit(importRePCBInfo)",function(e){e.field;return D.req({type:"post",url:W.baseUrl+"epc/pcborder/findOrderByUidAndProductNo",data:e.field,success:function(e){var n=e.data;null!=n?(d(),v(),m(),N(n)):w.alert("当前不存在PCB参数详情！"),w.close(t)}}),!1})})}})}),q(".importPcbInfo>.quotePostFee").on("click",function(){D.popup({title:"运费计算",area:["660px","322px"],btn:["清空","返回"],id:"popupQuotePostFee",yes:function(){w.msg("清空数据"),q("#quotePostFeeRest").click()},btn1:function(){w.closeAll()},success:function(e,t){A(this.id).render("marketManagement/iframeWindow/quote_postFee").done(function(){M.render()})}})}),e("quote",{})});