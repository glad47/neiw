/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","form","element","laytpl","layer","upload","jsTools","formSelects"],function(e){function t(e){if(1===fe){r("1");var t=parseFloat(re*se*ce)/1e6;T("#areasq").val(t.toFixed(3))}else if(2===fe){r("2");var t=parseFloat(me*ve*de)/1e6;if(T("#areasq").val(t.toFixed(3)),""!=de&&""!=ue&&""!=pe){var n=Math.ceil(de*ue*pe);T("#quantityPCS").val(n)}}}function n(e){T("#areasq").val(""),0===e?(T(".itPanelway input").attr("disabled",R.isDis.itPanelway),T(".itPanelsize input").attr("disabled",R.isDis.itPanelsize)):1===e?(T(".mto-input").removeAttr("disabled","true"),T(".itPanelway input").attr("disabled","disabled"),T(".itPanelsize input").attr("disabled","disabled"),T(".itSinlgesize input").val(""),T(".itPanelway input").val(""),T(".itPanelsize input").val("")):2===e&&(T(".mto-input").removeAttr("disabled","true"),T(".itSinlgesize input").attr("disabled","disabled"),T(".itSinlgesize input").val(""))}function i(){T("#selHc").attr("disabled",oe.isDis.selHc),T("#selInlayercoopper").attr("disabled",oe.isDis.selInlayercoopper),T("#selInnerMintrack").attr("disabled",oe.isDis.selInnerMintrack),T("#selNofcore").attr("disabled",oe.isDis.selNofcore),T("#selMinspaccing").attr("disabled",oe.isDis.selMinspaccing),T("#selNofpp").attr("disabled",oe.isDis.selNofpp),T("#radioSinglePcb").attr("checked","true"),T("#ptfr4").attr("checked","true"),T("#routingOne").attr("checked","true"),T("#selLayer").val(oe.selLayer),T("#selFinishThickness").val(oe.selFinishThickness),T("#selMaterial").val(oe.selMaterial),T("#selkbsy").val(oe.selkbsy),T("#selTg").val(oe.selTg),T("#selHf").val(oe.selHf),T("#selHc").val(oe.selHc),T("#selInlayercoopper").val(oe.selInlayercoopper),T("#selInnerMintrack").val(oe.selInnerMintrack),T("#selNofcore").val(oe.selNofcore),T("#selMinspaccing").val(oe.selMinspaccing),T("#selNofpp").val(oe.selNofpp),T("#selOuterlayercopper").val(oe.selOuterlayercopper),T("#selOutMintrack").val(oe.selOutMintrack),T("#selBgasize").val(oe.selBgasize),T("#selMinspacing").val(oe.selMinspacing),T("#selMinholesize").val(oe.selMinholesize),T("#selPthcopper").val(oe.selPthcopper),T("#selSoldermc").val(oe.selSoldermc),T("#selViaprocess").val(oe.selViaprocess),T("#selSilksc").val(oe.selSilksc),T("#selPeelable").val(oe.selPeelable),T("#selSurfacefinish").val(oe.selSurfacefinish),T("#selTestcost").val(oe.selTestcost),C.render()}function a(e){if(T("#selLayer").children().remove(),"Aluminum"==e)for(var t=0;t<_.length;t++){var n=_[t].text,i=_[t].value;T("#selLayer").append("<option value="+i+">"+n+"</option>")}else if("FR4"==e)for(var t=0;t<z.length;t++){var n=z[t].text,i=z[t].value;T("#selLayer").append("<option value="+i+">"+n+"</option>"),s(1)}else if("FR4+Aluminum"==e)for(var t=0;t<w.length;t++){var n=w[t].text,i=w[t].value;T("#selLayer").append("<option value="+i+">"+n+"</option>")}}function l(e){if(T("#selMaterial").children().remove(),"Aluminum"==e){for(var t=0;t<O.length;t++){var n=O[t].text,i=O[t].value;T("#selMaterial").append("<option value="+i+">"+n+"</option>")}o("yg")}else{for(var t=0;t<Q.length;t++){var n=Q[t].text,i=Q[t].value;T("#selMaterial").append("<option value="+i+">"+n+"</option>")}o("kb")}C.render("select")}function o(e){if(T("#selkbsy").children().remove(),"kb"==e)for(var t=0;t<U.length;t++){var n=U[t].text,i=U[t].value;T("#selkbsy").append("<option value="+i+">"+n+"</option>")}else if("yg"==e)for(var t=0;t<L.length;t++){var n=L[t].text,i=L[t].value;T("#selkbsy").append("<option value="+i+">"+n+"</option>")}else if("sy"==e)for(var t=0;t<G.length;t++){var n=G[t].text,i=G[t].value;T("#selkbsy").append("<option value="+i+">"+n+"</option>")}C.render("select")}function r(e){var t=e;"1"==t?(re=T("#singleSizeX").val(),se=T("#singleSizeY").val(),ce=T("#quantityPCS").val()):"2"==t&&(ue=T("#panelWayX").val(),pe=T("#panelWayY").val(),de=T("#quantityPanel").val(),me=T("#panelSizeX").val(),ve=T("#panelSizeY").val())}function s(e){c(),2===ye?(oe.selLayer=1,oe.selMaterial="YG",oe.selkbsy="YG0001",oe.selHc="1W",oe.selMinholesize="1.5",oe.selPthcopper="none",oe.selSoldermc="white",oe.selViaprocess="none",oe.selSilksc="black",oe.isDis.selHc=!1):3===ye&&(oe.selLayer=4,oe.selHc="1W",oe.selInlayercoopper="1oz",oe.selMintrack="5mil",oe.selNofcore="1",oe.selMinspaccing="5mil",oe.selNofpp="2",oe.selInnerMintrack="5mil",oe.selMinholesize="1.5",oe.selPthcopper="none",oe.selSoldermc="white",oe.selSilksc="black",oe.selPeelable="none",oe.isDis.selInlayercoopper=!1,oe.isDis.selInnerMintrack=!1,oe.isDis.selNofcore=!1,oe.isDis.selMinspaccing=!1,oe.isDis.selNofpp=!1),i()}function c(){oe.selLayer=2,oe.selFinishThickness="1.6mm",oe.selMaterial="KB",oe.selkbsy="KB6160",oe.selTg="135",oe.selHf="NO",oe.selHc="none",oe.selInlayercoopper="none",oe.selMintrack="none",oe.selNofcore="none",oe.selMinspaccing="none",oe.selNofpp="none",oe.selOuterlayercopper="1oz",oe.selInnerMintrack="none",oe.selOutMintrack="5mil",oe.selBgasize="0.30",oe.selMinspacing="5mil",oe.selMinholesize="0.3",oe.selPthcopper="20um",oe.selSoldermc="green",oe.selViaprocess="Follow_gerber",oe.selSilksc="white",oe.selPeelable="none",oe.selSurfacefinish="HASL_with_lead",oe.selTestcost="1",oe.selCti="175≤CTI<250",oe.isDis={},oe.isDis.selHc=!0,oe.isDis.selInlayercoopper=!0,oe.isDis.selInnerMintrack=!0,oe.isDis.selNofcore=!0,oe.isDis.selMinspaccing=!0,oe.isDis.selNofpp=!0}function u(){var e=T("#areasq").val(),t=T("#selLayer").val();T("input[name='buildTime']").remove(),T(".build-time-item .layui-form-radio").remove(),q.req({type:"post",async:!1,url:M.imUrl+"quote/getBuildTime",data:{areaSq:e,layerNum:t},success:function(e){T(".build-time-item").css("display","");var t;T("#selBuildTime").children().remove();for(var n=0;n<e.data.length;n++)T("#selBuildTime").append("<option value="+e.data[n].price+">"+e.data[n].dayNumber+"</option>"),t=e.data[0].dayNumber;$.buildTime=t,T(".build-time-item input").each(function(){var e=T(this).attr("title");"none"==e&&this.remove()}),C.render()},error:function(){Y.msg("Get BuildTime Fail!!!")}})}function p(){var e=null;1===H.bordType?e="selCompany":2===H.bordType?e="selCompanyt":3===H.bordType&&(e="selCompany"),q.req({type:"post",url:M.imUrl+"quote/getCouriers",async:!1,success:function(t){T("select[id='"+e+"'] option").remove(),B.render(e),H.companyId=t.data[0].id;for(var n=0;n<t.data.length;n++)T("select[xm-select='"+e+"']").append("<option value="+t.data[n].id+">"+t.data[n].courierName+"</option>"),X.courierId=t.data[0].id,H.companyId=X.courierId;B.render(e),B.value(e,[t.data[0].id]),C.render("select")},error:function(){Y.msg("Get Couriers Fail!!!")}})}function d(){var e=null;1===H.bordType?e="selCountrys":2===H.bordType?e="selCountryst":3===H.bordType&&(e="selCountryss"),T("select[id='"+e+"'] option").remove(),B.render(e),C.render(),q.req({type:"post",async:!1,url:M.imUrl+"quote/getCountry",success:function(t){H.countrysId=t.data[0].id;for(var n=0;n<t.data.length;n++)T("select[xm-select='"+e+"']").append("<option value="+t.data[n].id+">"+t.data[n].name+"</option>"),X.countryId=t.data[0].id,H.countrysId=X.countryId;C.render(),B.render(e),B.value(e,[t.data[0].id])},error:function(){Y.msg("Get Countrys Fail!!!")}})}function m(e,t){var n;null!=e&&"undefined"!=typeof e&&""!=e||(e=1),null!=t&&"undefined"!=typeof t&&""!=t||(t=70),n=2===H.bordType?K.stencilWeight:H.totalWeight,q.req({type:"post",url:M.imUrl+"quote/getShippingCost",data:{courierId:e,countryId:t,totalWeight:n,exchangeId:$.exchangeId},success:function(e){null!=e.data&&1===H.bordType?($.postFee=e.data.shippingCost,j.postFee=e.data.shippingCost,V.shipping=e.data.shippingCost,T("#shippingPrice").val(V.shipping),g()):null!=e.data&&2===H.bordType?(K.stencil_shippingPrice=ie.postFee=e.data.shippingCost,console.log("stencil_shippingPrice:"+K.stencil_shippingPrice),T("#postFees").val(K.stencil_shippingPrice),b()):T("#shippingPrice").val("不支持该配送")},error:function(){Y.msg("Get ShippingCost Fail!!!")}})}function v(){q.req({type:"post",url:M.baseUrl+"sys/consumer/user/all",success:function(e){for(var t=0;t<e.data.length;t++)T("select[xm-select='selCustomer']").append("<option id="+e.data[t].id+" value="+e.data[t].id+">"+e.data[t].userSystemId+"</option>");B.render("selCustomer"),C.render("select")}})}function f(){q.req({type:"post",url:M.baseUrl+"market/exchangerate/all",success:function(e){for(var t,n=0;n<e.data.length;n++)t+="<option id="+e.data[n].id+" value="+e.data[n].id+">"+e.data[n].currency+"</option>";T("select[xm-select='exchangeId']").append(t),C.render("select"),B.render("exchangeId"),B.value("exchangeId",[e.data[0].id])}})}function y(e){var t=0;T.each(e,function(n,i){var a=parseFloat(i);(""==a||null==a||isNaN(a))&&(e[n]=0,a=0),t+=a}),ne.pcbCost=t.toFixed(2),T("#pcbCost").val(ne.pcbCost),g()}function g(){var e=T("#shippingPrice").val();ne.shippingPrice=parseFloat(e),T.each(ne,function(e,t){(""==t||null==t||isNaN(t))&&(ne[e]=0)});var t=parseFloat(ne.pcbCost),e=parseFloat(ne.shippingPrice),n=(t+e).toFixed(2);ne.totalPrice=n,$.subtotal=t,E.totalPriced=ne.totalPrice,T("#totalPrice").val(ne.totalPrice)}function b(){var e;e="Top And Bottom (On Single Stencil)"==ie.stencilSide||"Top"==ie.stencilSide||"Bottom"==ie.stencilSide?1:2,ie.inStencilCost=ie.sQuantity*K.stencilSize_price*e,T("#inStencilCost").val(ie.inStencilCost),h()}function h(){var e=ie,t=e.postFee+e.inStencilCost;le.totalStencilFee=t,E.totalPricedS=t,T("#stotalPrice").val(t),S()}function S(){var e=parseInt(T("#inStencilCost").val()),t=parseInt(T("#stencil_quantity").val()),n=(e/t).toFixed(2);ae.unitPrice=n,T("#sunitPrice").val(n)}function P(){var e=new Object;return e.enginnerFee=parseFloat(T("#enginnerFee").val()),e.boardFee=parseFloat(T("#boardFee").val()),e.testCostFee=parseFloat(T("#testFee").val()),e.toolingFee=parseFloat(T("#toolingFee").val()),e.overworkFee=parseFloat(T("#urgentFee").val()),e}function I(){T("#inStencilCost").val(""),T("#shippingPrice").val(""),T("#totalPrice").val(""),C.render()}function F(e){Z.importPCBInfo=e,T("#inside_quote_all input,#inside_quote_all select").each(function(){var t=T(this).attr("name"),n=T(this),i=T(this).attr("type");(isNaN(e[t])||""==e[t]||null==e[t])&&n.parents(".rig-price").length>0&&(e[t]=0),n.is("input")&&("text"==i||"number"==i?n.val(e[t]):"checkbox"==i?T("input[type=checkbox][name="+t+"][value='"+e[t]+"']").attr("checked","checked"):"radio"==i&&T("input[name="+t+"][value='"+e[t]+"']").prop("checked","checked")),n.is("select")&&(T("select[name='"+t+"'] option[value='"+e[t]+"']").attr("selected",!0),"nOfPp"!=t&&"countries"!=t||T("select[name='"+t+"'] option[value='"+e[t]+"']").attr("selected",!0)),T("*[name='remark']").val(e.remark),"userId"==t&&(T("select[name='userId']").find("option[id="+e.userId+"]").attr("selected",!0),T("input[name='customerId']").val(e.userId),$.userId=j.customerAid=e.userId)}),T("input[name='customerSysName']").val(T("#selCustomer").find("option:selected").text()),$.userId=e.userId,$.gerberName=e.gerberName,$.gerberPath=e.gerberPath,$.pcbName=le.pcbName=e.pcbName,$.productNo=e.productNo,$.countries=H.countrysId=e.countries;var t=parseFloat(T("input[name='subtotal']").val()),n=parseFloat(T("input[name='postFee']").val());(isNaN(t)||""==t)&&(t=0),(isNaN(n)||""==n)&&(n=0);var i=t+n;T("input[id='totalPrice']").val(i),C.render(),T(".bot-subbtn").click();var a=Object.assign(ee,$);console.log(a),Y.msg("导入PCB信息成功")}function k(e){var t,n,i,a,l=N();return e.A.customerSysName=e.B.customerSysName,T.each(e.A,function(o,r){if(n=""==r||null==r||"none"==r,T.each(e.B,function(e,s){i=""==s||null==s||"none"==s,o==e&&(r==s?t=2:n&&i?t=2:r!=s&&"-1"==l.fd.indexOf(o)&&l.fdyg.indexOf(o)&&(console.log("key值不同的q["+o+","+r+"],i["+e+","+s+"]"),l.fdyg.indexOf(o)>=0?(t=3,a=!0):t=2))}),1==a)return!1}),console.log("orderType:===>"+t),t}function N(){var e="",t="";T(".top-m-one input").each(function(){"undefined"!=typeof T(this).attr("name")&&(e+=","+T(this).attr("name"))}),T(".top-price-one input").each(function(){"undefined"!=typeof T(this).attr("name")&&(e+=","+T(this).attr("name"))}),T(".center-m-two input").each(function(){"undefined"!=typeof T(this).attr("name")&&(t+=","+T(this).attr("name"))}),T(".center-m-two select").each(function(){"undefined"!=typeof T(this).attr("name")&&(t+=","+T(this).attr("name"))});var n={fd:e,fdyg:t};return console.log(n),n}var T=layui.jquery,x=layui.view,C=layui.form,q=layui.admin,A=layui.element,M=layui.setter,D=layui.upload,B=layui.formSelects,W=layui.jsTools,Y=layui.layer;A.render();var z=[{text:0,value:0},{text:1,value:1},{text:2,value:2},{text:4,value:4},{text:6,value:6},{text:8,value:8}],_=[{text:0,value:0},{text:1,value:1},{text:2,value:2}],w=[{text:0,value:0},{text:4,value:4},{text:6,value:6},{text:8,value:8}],Q=[{text:"KB",value:"KB"},{text:"SY",value:"SY"}],O=[{text:"YG",value:"YG"}],U=[{text:"KB6160",value:"KB6160"},{text:"KB6150",value:"KB6150"},{text:"KB6165",value:"KB6165"},{text:"KB6167",value:"KB6167"}],G=[{text:"SY1130",value:"SY1130"},{text:"SY1141",value:"SY1141"},{text:"SY1150",value:"SY1150"},{text:"SY1170",value:"SY1170"},{text:"SY1180",value:"SY1180"},{text:"SY1000",value:"SY1000"},{text:"SY1000-2",value:"SY1000-2"},{text:"SY1600",value:"SY1600"}],L=[{text:"YG0001",value:"YG0001"},{text:"YG0002",value:"YG0002"},{text:"YG0003",value:"YG0003"},{text:"YG0004",value:"YG0004"}],R={isDis:{itPanelway:!0,itPanelsize:!0}},H={bordType:1,companyId:1,countrysId:70,totalWeight:0},K={stencilSize_price:"",stencilWeight:"",stencil_shippingPrice:""},j={postFee:"",customerAid:"",ids:"",orderNo:""},X={courierId:"",countryId:"",totalWeight:""},V={shipping:""},E={totalPric:null,totalPriced:null,isQuote:!1,totalPricS:null,totalPricedS:null,isQuoteS:!1},J=null,Z={importPCBInfo:null},$={engineeringFee:"",boardFee:"",testCostFee:"",toolingFee:"",overworkFee:0,buildTime:"",weight:"",postFee:0,subtotal:"",quoteConfigIds:"",productNo:"",userId:"",orderType:1,gerberName:"",gerberPath:"",pcbName:"",orderNo:"",countries:"Afghanistan",exchangeId:1},ee={},te={stencilWeight:"",inStencilCost:""},ne={pcbCost:0,totalPrice:0,shippingPrice:0},ie={postFee:K.stencil_shippingPrice,inStencilCost:null,sQuantity:1,stencilSide:"Top And Bottom (On Single Stencil)",sunitPrice:K.stencilSize_price,stotalPrice:null},ae=new Object,le={stencilSide:"Top And Bottom (On Single Stencil)",quantity:ie.sQuantity,thickness:.12,existingFiducials:.1,totalStencilFee:ie.stotalPrice,gerberPath:null,gerberName:null,orderId:null,orderType:1,pcbName:null,postFee:null,orderNo:null,companyId:H.companyId,countrysId:H.countrysId,customerSysName:null,userId:null,productNo:null},oe={};c(),i(),n(0),a("FR4"),l(),o("kb"),v(),f();var re,se,ce,ue,pe,de,me,ve,fe=1;T("#singleSizeX,#singleSizeY,#quantityPCS").bind("input propertychange",function(e){t()}),T("#panelSizeX,#panelSizeY,#quantityPanel").bind("input propertychange",function(e){null!=me&&null!=ve&&null!=de&&t()}),T("#panelWayX,#panelWayY,#quantityPanel").bind("input propertychange",function(e){t()}),T("input[name='testPoint']").bind("input propertychange",function(e){setTimeout(function(){T(".up-subbtn").click()},1800)}),T("input[name='panelRoutingPath']").bind("input propertychange",function(e){setTimeout(function(){T(".up-subbtn").click()},1800)}),T("input[name='punchingHoles']").bind("input propertychange",function(e){setTimeout(function(){T(".up-subbtn").click()},1800)}),T("input[name='punchingSlots']").bind("input propertychange",function(e){setTimeout(function(){T(".up-subbtn").click()},1800)}),T("input[name='surfaceArea']").bind("input propertychange",function(e){setTimeout(function(){T(".up-subbtn").click()},1800)}),T("#mPrice").bind("input propertychange",function(e){var t=T("#mPrice").val(),n=T("#areasq").val(),i=parseFloat(t*n).toFixed(2),a=T("#boardFee").val();T("#unitPrice").val(parseFloat(a/n).toFixed(2)),T("#boardFee").val(i),Y.msg(i)}),T("#rPcbForm").bind("input propertychange",function(){var e=P();y(e),$.postFee=parseFloat(T("#shippingPrice").val()),$.engineeringFee=parseFloat(T("#enginnerFee").val()),$=Object.assign($,e),console.log($)}),T("#stencil_quantity").bind("input propertychange",function(){var e=parseFloat(T(this).val());(""==e||null==e||"undefined"==typeof e||isNaN(e))&&(e=0),ie.sQuantity=le.quantity=e,b()}),C.on("radio(boardType)",function(e){var t=e.value;"1"==t?(fe=1,n(1)):"2"==t&&(fe=2,n(2))}),C.on("select(material)",function(e){var t=e.value;"KB"==t?o("kb"):"SY"==t?o("sy"):"YG"==t&&o("yg")}),C.on("select(selSurfacefinish)",function(e){var t=e.value;"HASL_with_lead"==t||"HASL_lead_free"==t?T("#selSurfacethickness").val("2.54-25.4um"):"Immersion_Gold"==t?T("#selSurfacethickness").val("2u"):"Immersion_tin"==t?T("#selSurfacethickness").val("0.5um-0.7um"):"Immersion_silver"==t?T("#selSurfacethickness").val("≥0.05um"):"OSP"==t&&T("#selSurfacethickness").val("0.25-0.5um"),"Immersion_Gold"==t?T("input[name='surfaceArea']").removeAttr("disabled"):T("input[name='surfaceArea']").attr("disabled",!0),C.render("select","quoteForm"),C.render(null,"quoteForm")}),C.on("select(testPointType)",function(e){var t=e.value;"1"==t?T("#testPointT").text("飞针费："):T("#testPointT").text("测试架："),T(".up-subbtn").click()}),C.on("select(stencilSide)",function(e){var t=e.value;console.log(t),ie.stencilSide=le.stencilSide=t,b()}),C.on("radio(existingFiducials)",function(e){var t=le.existingFiducials=e.value;Y.msg(t)}),C.on("radio(sthickness)",function(e){var t=le.thickness=e.value;Y.msg(t)}),C.on("radio(routingType)",function(e){var t=e.value;"1"==t?(T("input[name='panelRoutingPath']").removeAttr("disabled"),T("input[name='punchingHoles']").attr("disabled",!0),T("input[name='punchingSlots']").attr("disabled",!0)):(T("input[name='panelRoutingPath']").attr("disabled",!0),T("input[name='punchingHoles']").removeAttr("disabled"),T("input[name='punchingSlots']").removeAttr("disabled")),T(".up-subbtn").click(),C.render()}),A.on("collapse(orderTypeCol)",function(e){var t=e.title.context.innerText;t.indexOf("PCB Phototype")!=-1?(T(".rig-price-cardbody form").removeClass("quote-avtive"),T(".rig-price").addClass("quote-avtive"),T("*[data-type='addThisQuote']").show(),H.bordType=1):t.indexOf("SMT-Stencil")!=-1?(T(".rig-price-cardbody form").removeClass("quote-avtive"),T("#stencilForm").addClass("quote-avtive"),T("*[data-type='addThisQuote']").hide(),H.bordType=2):t.indexOf("Assembly Service")!=-1&&(T(".rig-price-cardbody form").removeClass("quote-avtive"),T("#assemblyForm").addClass("quote-avtive"),H.bordType=3),I()}),C.on("select(layer)",function(e){var t=e.value;oe.selLayer=t,"1"==ye&&("1"==t?(oe.selPthcopper="none",oe.selViaprocess="none"):"2"==t?(oe.selPthcopper="20um",oe.selViaprocess="Follow_gerber"):"4"==t?(c(),oe.selLayer=t,oe.selInlayercoopper="1oz",oe.isDis.selInlayercoopper=!1,oe.selInnerMintrack="5mil",oe.isDis.selInnerMintrack=!1,oe.selNofcore="1",oe.isDis.selNofcore=!1,oe.selNofpp="2",oe.isDis.selNofpp=!1):"6"==t?(c(),oe.selLayer=t,oe.selInlayercoopper="1oz",oe.isDis.selInlayercoopper=!1,oe.selInnerMintrack="5mil",oe.isDis.selInnerMintrack=!1,oe.selNofcore="2",oe.isDis.selNofcore=!1,oe.selNofpp="3",oe.isDis.selNofpp=!1,oe.selPthcopper="none"):"8"==t&&(c(),oe.selLayer=t,oe.selInlayercoopper="1oz",oe.isDis.selInlayercoopper=!1,oe.selInnerMintrack="5mil",oe.isDis.selInnerMintrack=!1,oe.selNofcore="3",oe.isDis.selNofcore=!1,oe.selNofpp="4",oe.isDis.selNofpp=!1,oe.selPthcopper="none"),i())});var ye=1;C.on("radio(pcbType)",function(e){var t=e.value;Y.msg(t),"FR4"==t?(ye=1,a("FR4"),s(),l("FR4")):"Aluminum"==t?(ye=2,a("Aluminum"),s(),l("Aluminum")):"FR4+Aluminum"==t&&(ye=3,a("FR4+Aluminum"),s(),l("FR4+Aluminum"))}),C.on("radio(buildTimeRadio)",function(e){var t=e.value;console.log(e),console.log(e),$.overworkFee=t,T("#urgentFee").val(t),y()}),C.on("select(selBuildTime)",function(e){var t=e.value,n=T("#selBuildTime").find("option[value="+e.value+"]").text();ne.shippingPrice=t,$.overworkFee=t,$.buildTime=n,T("#urgentFee").val(t);var i=P();y(i)}),layui.formSelects.on("selCompany",function(e,t,n,i,a){var l=(n.name,n.value);H.companyId=l;var o=H.companyId,r=H.countrysId;m(o,r),m()}),layui.formSelects.on("selCountrys",function(e,t,n,i,a){var l=(n.name,n.value);H.countrysId=l,$.countries=H.countrysId,2===H.bordType&&h();var o=H.companyId,r=H.countrysId;m(o,r)}),layui.formSelects.on("selCustomer",function(e,t,n,i,a){var l=n.name,o=n.value;j.customerAid=o,$.userId=le.userId=o,le.customerSysName=l,T("#customerId").val(o),T("input[name='customerSysName']").val(l)}),C.on("select(filterOrderType)",function(e){$.orderType=le.orderType=e.value}),T("#postFees").bind("input propertychange",function(e){ie.postFee=parseFloat(T(this).val()),b()}),T("#inStencilCost").bind("input propertychange",function(e){ie.inStencilCost=parseFloat(T(this).val()),h()}),C.on("submit(assemblyService)",function(e){var e=e.field;return q.req({type:"post",data:e,url:M.imUrl+"quote/getAssemblyQuote",success:function(e){var t=T("#pcbQuantity").val(),n=parseFloat(e.data.totalAssemblyQuote/t);T("#pricePCS").val(n.toFixed(2)),T("#assemblyCost").val(e.data.totalAssemblyQuote),null!=e.data.totalAssemblyWeight&&""!=e.data.totalAssemblyWeight&&T("#assemblyWeight").val(e.data.totalAssemblyWeight),console.log(e);e.data.totalAssemblyQuote,e.data.totalAssemblyWeight}}),!1}),T("#panelWayX,#panelWayY,#quantityPanel").keydown(function(e){var t=parseInt(e.keyCode);return 110!=t}),T("#panelWayX,#panelWayY,#quantityPanel").bind("cut copy paste",function(e){e.preventDefault()}),C.on("submit(quoteForm)",function(e){var e=e.field,t=e.cncAndPunch;return ee=e,e.isExistSmt=0,e.stackUp="none",e.innerMinTrack=e.innerMinSpacing,e.outerMinSpacing=e.outerMinTrack,e.silkScreenBotColor=e.solderMaskTopColor,e.solderMaskBotColor=e.solderMaskTopColor,e.surfaceArea=e.surfaceArea,e.orderNo=T("#orderNo").val(),$.orderNo=e.orderNo,e.pcbName=$.pcbName,e.exchangeId=$.exchangeId,2!==fe||null!=e.panelWayX&&""!=e.panelWayX&&null!=e.panelWayY&&""!=e.panelWayY?null==e.testPoint||""==e.testPoint?(T("html,body").animate({scrollTop:200},"slow"),Y.msg("请输入测试点数量 !"),!1):"Immersion_Gold"==e.surfaceFinish&&""==e.surfaceArea?(Y.msg("请输入沉金面积！"),!1):(q.req({type:"post",url:M.imUrl+"quote/countAdditionInfo",data:e,success:function(e){if(null!=e.data.pcbPriceDetail&&""!=e.data.pcbPriceDetail&&(null==e.data.pcbPriceDetail.qcidList&&""==e.data.pcbPriceDetail.qcidList||(j.ids=e.data.pcbPriceDetail.qcidList,$.quoteConfigIds=e.data.pcbPriceDetail.qcidList.join(","),j.ids=e.data.pcbPriceDetail.qcidList)),console.log(e),$.engineeringFee=e.data.projectQuoteToUSD,$.boardFee=e.data.totalBoardQuoteToUSD,$.testCostFee=e.data.totalTestPointToUSD,$.toolingFee=e.data.cncAndPunchingQuoteToUSD,$.weight=e.data.totalQuoteWeight,H.totalWeight=e.data.totalQuoteWeight,T("#boardFee").val(e.data.totalBoardQuoteToUSD),T("#enginnerFee").val(e.data.projectQuoteToUSD),T("#pcbWeight").val(e.data.totalQuoteWeight+" KG"),T("#testFee").val(e.data.totalTestPointToUSD),T("#flyingTest").val(e.data.totalTestPointToUSD),T("#routingCost").val(e.data.cncAndPunchingQuoteToUSD),T("#unitPrice").val(e.data.unitPrice),X.totalWeight=e.data.totalQuoteWeight,H.totalWeight=e.data.totalQuoteWeight,J=e.data.areaType,"1"==t?T("#toolingFee").val(0):T("#toolingFee").val(e.data.cncAndPunchingQuoteToUSD),"1"==J)T("#mPrice").val(""),T("#mPrice").attr("disabled",!0);else{var n=parseFloat(e.data.totalBoardQuoteToUSD/T("#areasq").val()).toFixed(2);T("#mPrice").val(n),T("#mPrice").removeAttr("disabled")}if(y(),u(),null!=X.courierId&&""!=X.courierId||p(),null!=X.countryId&&""!=X.countryId||d(),null!=H.companyId&&""!=H.companyId&&null!=H.countrysId&&""!=H.countrysId){var i=H.companyId,a=H.countrysId;m(i,a)}var l=P();y(l)},error:function(e){alert("Services Error!!!")}}),C.render(),!1):(Y.tips("请输入拼版方式 !","#panelWayX",{tips:[1,"#3595CC"],time:5e3}),!1)}),layui.formSelects.on("exchangeId",function(e,t,n,i,a){$.exchangeId=n.value}),T(".stencilSide").click(function(){q.popup({title:"Stencil Size",area:["60%","85%"],btn:["确定","取消"],yes:function(e,t){var n=layui.data("stencilList");ae=n.params,K.stencilSize_price=ae.unitPrice,K.stencilWeight=ae.weight,te.stencilWeight=K.stencilWeight,T("#stencilWeight").val(K.stencilWeight+" KG "),te.stencilWeight=K.stencilSize_price,T("#inStencilSize").val(T("#stenContainer").val()),p(),d(),m(),Y.closeAll()},success:function(e,t){x(this.id).render("marketManagement/iframeWindow/stencil_size_list",null).done(function(){})}})});var ge={resetQuoteTab:function(){T("a[title='刷新']").click(),Y.msg("重置报价表")},addCustomerFile:function(){Y.msg("添加客户资料")},addThisQuote:function(){var e;T(".up-subbtn").click();var t=Object.assign(ee,$);if(null==$.userId||""==$.userId)return Y.msg("请先选择客户"),!1;if(null==$.gerberName||""==$.gerberName)return Y.tips("请先上传Gerber资料再添加当前报价 !","#addFile",{tips:[1,"#3595CC"],time:2e3}),!1;if(Z.importPCBInfo){var n={A:null,B:null};n.A=t,n.B=Z.importPCBInfo,t.orderType=k(n),"2"==t.orderType?e="返单":"3"==t.orderType&&(e="返单有改")}else t.orderType=1,e="新单";E.totalPric==E.totalPriced&&1==E.isQuote?Y.confirm("你已经添加了相同参数的报价，是否再次添加？",function(){q.req({type:"post",data:t,url:M.baseUrl+"epc/pcborder/save",success:function(t){T("#orderPN").val(t.pn),$.productNo=t.pn,C.render(null,"checkCustomer"),"500"!=t.code&&Y.alert("添加报价成功["+e+"]")}})}):(q.req({type:"post",data:t,url:M.baseUrl+"epc/pcborder/save",success:function(t){T("#orderPN").val(t.pn),$.productNo=t.pn,C.render(null,"checkCustomer"),"500"!=t.code&&Y.alert("添加报价成功["+e+"]")}}),E.totalPric=E.totalPriced,E.isQuote=!0)},lookQuote:function(){var e=$.quoteConfigIds;null==j.customerAid||""==j.customerAid?Y.msg("请选择对应的客户"):q.popup({title:"产看报价详情",area:["70%","85%"],btn:["确定","取消"],yes:function(e,t){Y.closeAll()},success:function(t,n){var i={ids:""};i.ids=$.quoteConfigIds,x(this.id).render("marketManagement/iframeWindow/quote_detaily",i).done(function(){T("#sss").text(e),T("#sss").attr("name",e)})}})},upSubbtn:function(){if("1"==H.bordType)null==j.customerAid||""==j.customerAid?Y.tips("请先选择客户 !","#selCustomer_container",{tips:[1,"#3595CC"],time:2e3}):T(".bot-subbtn").click();else if(2===H.bordType){T(".rStencilSubmit").click();var e=Object.assign(le,ae);if(e.orderNo=T("#orderNo").val(),e.postFee=ie.postFee,null==e.userId||""==e.userId)return Y.msg("请先选择客户"),!1;if(null==e.gerberName||""==e.gerberName)return Y.tips("请先上传Gerber资料再添加当前报价 !","#addFile",{tips:[1,"#3595CC"],time:2e3}),!1;E.totalPricS==E.totalPricedS&&1==E.isQuoteS?Y.confirm("你已经添加了相同参数的报价，是否再次添加？",function(){q.req({type:"post",data:e,url:M.baseUrl+"epc/stencilorder/save",success:function(e){Y.alert("钢网报价成功！"),T("#orderPN").val(e.pn),le.productNo=e.pn}})}):(q.req({type:"post",data:e,url:M.baseUrl+"epc/stencilorder/save",success:function(e){Y.alert("钢网报价成功！"),T("#orderPN").val(e.pn),le.productNo=e.pn}}),E.totalPricS=E.totalPricedS,E.isQuoteS=!0)}else 3===H.bordType&&T(".rAssemblySubmit").click()}};D.render({elem:"#addFile",url:M.baseUrl+"sys/oss/upload/geber?access_token="+layui.data("layuiAdmin").access_token,field:"file",accept:"file",exts:"zip|rar|7z",before:function(e){e.preview(function(e,t,n){var i=t.name;$.gerberName=le.gerberName=i,$.pcbName=le.pcbName=W.CleanFileSuffix(i),console.log("显示的文件名为："+$.pcbName),null==T("#pcbName").val&&""==T("#pcbName").val||T("#pcbName").val($.pcbName),C.render(null,"")})},done:function(e,t,n){Y.msg("文件上传成功！");var i=e.url,a=/\[(.+?)\]/g,l=i.match(a);console.log("未处理的路径为："+l);var o=l[0].replace(/\[|]/g,"");$.gerberPath=le.gerberPath=o,console.log("处理完的路径为："+o)},error:function(){Y.msg("文件上传失败！")}});T(".layui-btn").on("click",function(){var e=T(this).data("type");ge[e]?ge[e].call(this):""}),T(".up-rsetbtn").on("click",function(){T(".bot-rsetbtn").click()}),T(".importPcbInfo>.importOrder").on("click",function(){q.popup({title:"导入pcb订单信息",area:["506px","288px"],btn:["导入","取消"],yes:function(e,t){T("#importPCBInfo").click(),Y.closeAll()},success:function(e,t){x(this.id).render("marketManagement/iframeWindow/import_pcbInfoForm").done(function(){B.render(),C.on("submit(importPCBInfo)",function(e){return q.req({type:"post",url:M.baseUrl+"pert/revieworder/reviewOrderInfo",data:e.field,success:function(e){var n=e.data;null!=n?(u(),p(),d(),F(n)):Y.alert("当前不存在PCB参数详情！"),Y.close(t)}}),!1})})}})}),T(".importPcbInfo>.importReOrder").on("click",function(){q.popup({title:"导入返单信息",area:["506px","288px"],btn:["导入","取消"],id:"popupImportReOrder",yes:function(e,t){T("#importRePCBInfo").click(),Y.closeAll()},success:function(e,t){x(this.id).render("marketManagement/iframeWindow/import_pcbInfoReOreder").done(function(){C.on("submit(importRePCBInfo)",function(e){e.field;return q.req({type:"post",url:M.baseUrl+"epc/pcborder/findOrderByUidAndProductNo",data:e.field,success:function(e){var n=e.data;null!=n?(u(),p(),d(),F(n)):Y.alert("当前不存在PCB参数详情！"),Y.close(t)}}),!1})})}})}),T(".importPcbInfo>.quotePostFee").on("click",function(){q.popup({title:"运费计算",area:["660px","322px"],btn:["清空","返回"],id:"popupQuotePostFee",yes:function(){Y.msg("清空数据"),T("#quotePostFeeRest").click()},btn1:function(){Y.closeAll()},success:function(e,t){x(this.id).render("marketManagement/iframeWindow/quote_postFee").done(function(){C.render()})}})}),e("quote",{})});