/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","form","element","laytpl","layer","upload","jsTools","formSelects"],function(e){function t(e){console.log("data："+e);var t=parseFloat(C("#quantityPCS").val()),n=parseFloat(C("#areasq").val()),i=parseFloat(C("#boardFee").val()),a=parseFloat(i/t).toFixed(3),l=parseFloat(i/n).toFixed(3);"0"==e?C("#mPrice").val(l):"1"==e&&C("#unitPrice").val(a),ae.unitPrice=a,console.log("板费/PCS="+i+"/"+t+"="+a),console.log("mPrice="+n+"/"+i+"="+l)}function n(e){var n=parseFloat(C("#areasq").val()),i=parseFloat(n*e).toFixed(2);C("#boardFee").val(i),t(1)}function i(e){if(1===Se){c("1");var t=parseFloat(de*ve*me)/1e6;C("#areasq").val(t.toFixed(3))}else if(2===Se){c("2");var t=parseFloat(be*he*ge)/1e6;if(C("#areasq").val(t.toFixed(3)),""!=ge&&""!=fe&&""!=ye){var n=Math.ceil(ge*fe*ye);C("#quantityPCS").val(n)}}}function a(e){C("#areasq").val(""),0===e?(C(".itPanelway input").attr("disabled",j.isDis.itPanelway),C(".itPanelsize input").attr("disabled",j.isDis.itPanelsize)):1===e?(C(".mto-input").removeAttr("disabled","true"),C(".itPanelway input").attr("disabled","disabled"),C(".itPanelsize input").attr("disabled","disabled"),C(".itSinlgesize input").val(""),C(".itPanelway input").val(""),C(".itPanelsize input").val("")):2===e&&(C(".mto-input").removeAttr("disabled","true"),C(".itSinlgesize input").attr("disabled","disabled"),C(".itSinlgesize input").val(""))}function l(){C("#selHc").attr("disabled",pe.isDis.selHc),C("#selInlayercoopper").attr("disabled",pe.isDis.selInlayercoopper),C("#selInnerMintrack").attr("disabled",pe.isDis.selInnerMintrack),C("#selNofcore").attr("disabled",pe.isDis.selNofcore),C("#selMinspaccing").attr("disabled",pe.isDis.selMinspaccing),C("#selNofpp").attr("disabled",pe.isDis.selNofpp),C("#radioSinglePcb").attr("checked","true"),C("#ptfr4").attr("checked","true"),C("#routingOne").attr("checked","true"),C("#selLayer").val(pe.selLayer),C("#selFinishThickness").val(pe.selFinishThickness),C("#selMaterial").val(pe.selMaterial),C("#selkbsy").val(pe.selkbsy),C("#selTg").val(pe.selTg),C("#selHf").val(pe.selHf),C("#selHc").val(pe.selHc),C("#selInlayercoopper").val(pe.selInlayercoopper),C("#selInnerMintrack").val(pe.selInnerMintrack),C("#selNofcore").val(pe.selNofcore),C("#selMinspaccing").val(pe.selMinspaccing),C("#selNofpp").val(pe.selNofpp),C("#selOuterlayercopper").val(pe.selOuterlayercopper),C("#selOutMintrack").val(pe.selOutMintrack),C("#selBgasize").val(pe.selBgasize),C("#selMinspacing").val(pe.selMinspacing),C("#selMinholesize").val(pe.selMinholesize),C("#selPthcopper").val(pe.selPthcopper),C("#selSoldermc").val(pe.selSoldermc),C("#selViaprocess").val(pe.selViaprocess),C("#selSilksc").val(pe.selSilksc),C("#selPeelable").val(pe.selPeelable),C("#selSurfacefinish").val(pe.selSurfacefinish),C("#selTestcost").val(pe.selTestcost),q.render()}function o(e){if(C("#selLayer").children().remove(),"Aluminum"==e)for(var t=0;t<w.length;t++){var n=w[t].text,i=w[t].value;C("#selLayer").append("<option value="+i+">"+n+"</option>")}else if("FR4"==e)for(var t=0;t<_.length;t++){var n=_[t].text,i=_[t].value;C("#selLayer").append("<option value="+i+">"+n+"</option>"),u(1)}else if("FR4+Aluminum"==e)for(var t=0;t<Q.length;t++){var n=Q[t].text,i=Q[t].value;C("#selLayer").append("<option value="+i+">"+n+"</option>")}}function r(e){if(C("#selMaterial").children().remove(),"Aluminum"==e){for(var t=0;t<U.length;t++){var n=U[t].text,i=U[t].value;C("#selMaterial").append("<option value="+i+">"+n+"</option>")}s("yg")}else{for(var t=0;t<G.length;t++){var n=G[t].text,i=G[t].value;C("#selMaterial").append("<option value="+i+">"+n+"</option>")}s("kb")}q.render("select")}function s(e,t){if(C("#selkbsy").children().remove(),"KB"==e)for(var n=0;n<O.length;n++){var i=O[n].text,a=O[n].value;C("#selkbsy").append("<option value="+a+">"+i+"</option>")}else if("YG"==e)for(var n=0;n<R.length;n++){var i=R[n].text,a=R[n].value;C("#selkbsy").append("<option value="+a+">"+i+"</option>")}else if("SY"==e)for(var n=0;n<L.length;n++){var i=L[n].text,a=L[n].value;C("#selkbsy").append("<option value="+a+">"+i+"</option>")}null==t&&""==t||C("#selkbsy").find("option[value='"+t+"']").prop("selected",!0),q.render("select")}function c(e){var t=e;"1"==t?(de=C("#singleSizeX").val(),ve=C("#singleSizeY").val(),me=C("#quantityPCS").val()):"2"==t&&(fe=C("#panelWayX").val(),ye=C("#panelWayY").val(),ge=C("#quantityPanel").val(),be=C("#panelSizeX").val(),he=C("#panelSizeY").val())}function u(e){p(),2===Pe?(pe.selLayer=1,pe.selMaterial="YG",pe.selkbsy="YG0001",pe.selHc="1W",pe.selMinholesize="1.5",pe.selPthcopper="none",pe.selSoldermc="white",pe.selViaprocess="none",pe.selSilksc="black",pe.isDis.selHc=!1):3===Pe&&(pe.selLayer=4,pe.selHc="1W",pe.selInlayercoopper="1oz",pe.selMintrack="5mil",pe.selNofcore="1",pe.selMinspaccing="5mil",pe.selNofpp="2",pe.selInnerMintrack="5mil",pe.selMinholesize="1.5",pe.selPthcopper="none",pe.selSoldermc="white",pe.selSilksc="black",pe.selPeelable="none",pe.isDis.selInlayercoopper=!1,pe.isDis.selInnerMintrack=!1,pe.isDis.selNofcore=!1,pe.isDis.selMinspaccing=!1,pe.isDis.selNofpp=!1),l()}function p(){pe.selLayer=2,pe.selFinishThickness="1.6mm",pe.selMaterial="KB",pe.selkbsy="KB6160",pe.selTg="135",pe.selHf="NO",pe.selHc="none",pe.selInlayercoopper="none",pe.selMintrack="none",pe.selNofcore="none",pe.selMinspaccing="none",pe.selNofpp="none",pe.selOuterlayercopper="1oz",pe.selInnerMintrack="none",pe.selOutMintrack="5mil",pe.selBgasize="0.30",pe.selMinspacing="5mil",pe.selMinholesize="0.3",pe.selPthcopper="20um",pe.selSoldermc="green",pe.selViaprocess="Follow_gerber",pe.selSilksc="white",pe.selPeelable="none",pe.selSurfacefinish="HASL_with_lead",pe.selTestcost="1",pe.selCti="175≤CTI<250",pe.isDis={},pe.isDis.selHc=!0,pe.isDis.selInlayercoopper=!0,pe.isDis.selInnerMintrack=!0,pe.isDis.selNofcore=!0,pe.isDis.selMinspaccing=!0,pe.isDis.selNofpp=!0}function d(){var e=C("#areasq").val(),t=C("#selLayer").val();C("input[name='buildTime']").remove(),C(".build-time-item .layui-form-radio").remove(),A.req({type:"post",async:!1,url:D.imUrl+"quote/getBuildTime",data:{areaSq:e,layerNum:t,exchangeId:ae.exchangeId},success:function(e){C(".build-time-item").css("display","");var t;C("#selBuildTime").children().remove();for(var n=0;n<e.data.length;n++)C("#selBuildTime").append("<option value="+e.data[n].price+">"+e.data[n].dayNumber+"</option>"),t=e.data[0].dayNumber;ae.buildTime=t,C(".build-time-item input").each(function(){var e=C(this).attr("title");"none"==e&&this.remove()}),q.render()},error:function(){z.msg("Get BuildTime Fail!!!")}})}function v(){var e=null;1===X.bordType?e="selCompany":2===X.bordType?e="selCompanyt":3===X.bordType&&(e="selCompany"),A.req({type:"post",url:D.imUrl+"quote/getCouriers",async:!1,success:function(t){C("select[id='"+e+"'] option").remove(),Y.render(e),X.companyId=t.data[0].id;for(var n=0;n<t.data.length;n++)C("select[xm-select='"+e+"']").append("<option value="+t.data[n].id+">"+t.data[n].courierName+"</option>"),J.courierId=t.data[0].id,X.companyId=J.courierId;Y.render(e),Y.value(e,[t.data[0].id]),q.render("select")},error:function(){z.msg("Get Couriers Fail!!!")}})}function m(){var e=null;1===X.bordType?e="selCountrys":2===X.bordType?e="selCountryst":3===X.bordType&&(e="selCountryss"),C("select[id='"+e+"'] option").remove(),Y.render(e),q.render(),A.req({type:"post",async:!1,url:D.imUrl+"quote/getCountry",success:function(t){X.countrysId=t.data[0].id;for(var n=0;n<t.data.length;n++)C("select[xm-select='"+e+"']").append("<option value="+t.data[n].id+">"+t.data[n].name+"</option>"),J.countryId=t.data[0].id,X.countrysId=J.countryId;q.render(),Y.render(e),Y.value(e,[t.data[0].id])},error:function(){z.msg("Get Countrys Fail!!!")}})}function f(e,t){var n;null!=e&&"undefined"!=typeof e&&""!=e||(e=1),null!=t&&"undefined"!=typeof t&&""!=t||(t=70),n=2===X.bordType?V.stencilWeight:X.totalWeight,A.req({type:"post",url:D.imUrl+"quote/getShippingCost",data:{courierId:e,countryId:t,totalWeight:n,exchangeId:ae.exchangeId},success:function(e){null!=e.data&&1===X.bordType?(ae.postFee=e.data.shippingCost,E.postFee=e.data.shippingCost,Z.shipping=e.data.shippingCost,C("#shippingPrice").val(Z.shipping),h()):null!=e.data&&2===X.bordType?(V.stencil_shippingPrice=se.postFee=e.data.shippingCost,console.log("stencil_shippingPrice:"+V.stencil_shippingPrice),C("#postFees").val(V.stencil_shippingPrice),S()):C("#shippingPrice").val("不支持该配送")},error:function(){z.msg("Get ShippingCost Fail!!!")}})}function y(){A.req({type:"post",url:D.baseUrl+"sys/consumer/user/all",success:function(e){for(var t=0;t<e.data.length;t++)C("select[xm-select='selCustomer']").append("<option id="+e.data[t].id+" value="+e.data[t].id+">"+e.data[t].userSystemId+"</option>");Y.render("selCustomer"),q.render("select")}})}function g(){A.req({type:"post",url:D.baseUrl+"market/exchangerate/all",success:function(e){for(var t,n=0;n<e.data.length;n++)t+="<option id="+e.data[n].id+" value="+e.data[n].id+">"+e.data[n].currency+"</option>",ne.push(e.data[n]);C("select[xm-select='exchangeId']").append(t),q.render("select"),Y.render("exchangeId"),Y.value("exchangeId",[e.data[0].id])}})}function b(e){var t=0;C.each(e,function(n,i){var a=parseFloat(i);(""==a||null==a||isNaN(a))&&(e[n]=0,a=0),t+=a}),re.pcbCost=t.toFixed(2),C("#pcbCost").val(re.pcbCost),h()}function h(){var e=C("#shippingPrice").val();re.shippingPrice=parseFloat(e),C.each(re,function(e,t){(""==t||null==t||isNaN(t))&&(re[e]=0)});var t=parseFloat(re.pcbCost),e=parseFloat(re.shippingPrice),n=(t+e).toFixed(2);re.totalPrice=n,ae.subtotal=t,$.totalPriced=re.totalPrice,C("#totalPrice").val(re.totalPrice)}function S(){var e;e="Top And Bottom (On Single Stencil)"==se.stencilSide||"Top"==se.stencilSide||"Bottom"==se.stencilSide?1:2,se.inStencilCost=se.sQuantity*V.stencilSize_price*e*ie,C("#inStencilCost").val(se.inStencilCost),P()}function P(){var e=se,t=e.postFee+e.inStencilCost;ue.totalStencilFee=t,$.totalPricedS=t,C("#stotalPrice").val(t),I()}function I(){var e=parseInt(C("#inStencilCost").val()),t=parseInt(C("#stencil_quantity").val()),n=(e/t).toFixed(3);ce.unitPrice=n,C("#sunitPrice").val(n)}function F(){var e=new Object;return e.enginnerFee=parseFloat(C("#enginnerFee").val()),e.boardFee=parseFloat(C("#boardFee").val()),e.testCostFee=parseFloat(C("#testFee").val()),e.toolingFee=parseFloat(C("#toolingFee").val()),e.overworkFee=parseFloat(C("#urgentFee").val()),e}function k(){C("#inStencilCost").val(""),C("#shippingPrice").val(""),C("#totalPrice").val(""),q.render()}function x(e){te.importPCBInfo=e,C("#inside_quote_all input,#inside_quote_all select").each(function(){var t=C(this).attr("name"),n=C(this),i=C(this).attr("type");(isNaN(e[t])||""==e[t]||null==e[t])&&n.parents(".rig-price").length>0&&(e[t]=0),n.is("input")&&("text"==i||"number"==i?n.val(e[t]):"checkbox"==i?C("input[type=checkbox][name="+t+"][value='"+e[t]+"']").attr("checked","checked"):"radio"==i&&(C("input[name="+t+"][value='"+e[t]+"']").prop("checked","checked"),"boardType"==t&&(a(e.boardType),Se=e.boardType))),n.is("select")&&(C("select[name='"+t+"'] option[value='"+e[t]+"']").attr("selected",!0),"nOfPp"!=t&&"countries"!=t||C("select[name='"+t+"'] option[value='"+e[t]+"']").attr("selected",!0)),C("*[name='remark']").val(e.remark),"userId"==t&&(C("select[name='userId']").find("option[id="+e.userId+"]").attr("selected",!0),C("input[name='customerId']").val(e.userId),ae.userId=E.customerAid=e.userId)}),s(e.material,e.productCode),C("input[name='customerSysName']").val(C("#selCustomer").find("option:selected").text()),ae.userId=E.customerAid=e.userId,ae.gerberName=e.gerberName,ae.gerberPath=e.gerberPath,ae.pcbName=ue.pcbName=e.pcbName,ae.productNo=e.productNo,ae.countries=X.countrysId=e.countries,ae.postFee=e.postFee,ae.quoteGerberName=e.quoteGerberName,ae.quoteGerberPath=e.quoteGerberPath;var t=C("dl[xid='selCustomer']").children(".xm-select-this").attr("lay-value"),n=C("dl[xid='selCustomer'] .xm-select-this").find("span").attr("name");C("#customerId").val(t),C("input[name='customerSysName']").val(n);var i=parseFloat(C("input[name='subtotal']").val()),l=parseFloat(C("input[name='postFee']").val());(isNaN(i)||""==i)&&(i=0),(isNaN(l)||""==l)&&(l=0);var o=i+l;C("input[id='totalPrice']").val(o),q.render(),C(".bot-subbtn").click();var r,c;Object.assign(le,ae);r=e.countries,c=e.courierId,Y.value("selCompany",[1]),Y.value("selCountrys",[r]),z.msg("导入PCB信息成功")}function N(e){var e=e;if(0===e)for(var t=0;t<H.length;t++)C("."+H[t]).hide();else if(1===e)for(var t=0;t<H.length;t++)C("."+H[t]).show()}var C=layui.jquery,T=layui.view,q=layui.form,A=layui.admin,M=layui.element,D=layui.setter,W=layui.upload,Y=layui.formSelects,B=layui.jsTools,z=layui.layer;M.render();var _=[{text:0,value:0},{text:1,value:1},{text:2,value:2},{text:4,value:4},{text:6,value:6},{text:8,value:8}],w=[{text:0,value:0},{text:1,value:1},{text:2,value:2}],Q=[{text:0,value:0},{text:4,value:4},{text:6,value:6},{text:8,value:8}],G=[{text:"none",value:"none"},{text:"KB",value:"KB"},{text:"SY",value:"SY"}],U=[{text:"YG",value:"YG"}],O=[{text:"KB6160",value:"KB6160"},{text:"KB6150",value:"KB6150"},{text:"KB6165",value:"KB6165"},{text:"KB6167",value:"KB6167"}],L=[{text:"SY1130",value:"SY1130"},{text:"SY1141",value:"SY1141"},{text:"SY1150",value:"SY1150"},{text:"SY1170",value:"SY1170"},{text:"SY1180",value:"SY1180"},{text:"SY1000",value:"SY1000"},{text:"SY1000-2",value:"SY1000-2"},{text:"SY1600",value:"SY1600"}],R=[{text:"YG0001",value:"YG0001"},{text:"YG0002",value:"YG0002"},{text:"YG0003",value:"YG0003"},{text:"YG0004",value:"YG0004"}],H=["totalForm","addQuote"],K={1:"新单",2:"返单",3:"返单有改"},j={isDis:{itPanelway:!0,itPanelsize:!0}},X={bordType:1,companyId:1,countrysId:70,totalWeight:0},V={stencilSize_price:"",stencilWeight:"",stencil_shippingPrice:""},E={postFee:"",customerAid:"",ids:"",orderNo:""},J={courierId:1,countryId:"",totalWeight:""},Z={shipping:""},$={totalPric:null,totalPriced:null,isQuote:!1,totalPricS:null,totalPricedS:null,isQuoteS:!1},ee=null,te={importPCBInfo:null},ne=[],ie=1,ae={engineeringFee:"",boardFee:"",testCostFee:"",toolingFee:"",overworkFee:0,buildTime:"",weight:"",postFee:0,subtotal:"",quoteConfigIds:"",productNo:"",userId:"",orderType:1,gerberName:"",gerberPath:"",quoteGerberName:"",quoteGerberPath:"",pcbName:"",orderNo:"",countries:"Afghanistan",courierName:J.courierId,exchangeId:1,unitPrice:""},le={},oe={stencilWeight:"",inStencilCost:""},re={pcbCost:0,totalPrice:0,shippingPrice:0},se={postFee:V.stencil_shippingPrice,inStencilCost:null,sQuantity:1,stencilSide:"Top And Bottom (On Single Stencil)",sunitPrice:V.stencilSize_price,stotalPrice:null},ce=new Object,ue={stencilSide:"Top And Bottom (On Single Stencil)",quantity:se.sQuantity,thickness:.12,existingFiducials:.1,totalStencilFee:se.stotalPrice,gerberPath:null,gerberName:null,orderId:null,orderType:1,pcbName:null,postFee:null,orderNo:null,companyId:X.companyId,countrysId:X.countrysId,customerSysName:null,userId:null,productNo:null},pe={};p(),l(),a(0),o("FR4"),r(),s("kb"),y(),g();var de,ve,me,fe,ye,ge,be,he,Se=1;C("#singleSizeX,#singleSizeY,#quantityPCS").bind("input propertychange",function(e){i()}),C("#panelSizeX,#panelSizeY,#quantityPanel").bind("input propertychange",function(e){null!=be&&null!=he&&null!=ge&&i()}),C("#panelWayX,#panelWayY,#quantityPanel").bind("input propertychange",function(e){i()}),C("input[name='testPoint']").bind("input propertychange",function(e){setTimeout(function(){C(".up-subbtn").click()},1800)}),C("input[name='panelRoutingPath']").bind("input propertychange",function(e){setTimeout(function(){C(".up-subbtn").click()},1800)}),C("input[name='punchingHoles']").bind("input propertychange",function(e){setTimeout(function(){C(".up-subbtn").click()},1800)}),C("input[name='punchingSlots']").bind("input propertychange",function(e){setTimeout(function(){C(".up-subbtn").click()},1800)}),C("input[name='surfaceArea']").bind("input propertychange",function(e){setTimeout(function(){C(".up-subbtn").click()},1800)}),C("#boardFee").bind("input propertychange",function(e){t(0)}),C("#quantityPCS").bind("input propertychange",function(e){t(0)}),C("#mPrice").bind("input propertychange",function(e){n(parseFloat(C(this).val()))}),C("#rPcbForm").bind("input propertychange",function(){var e=F();b(e),ae.postFee=parseFloat(C("#shippingPrice").val()),ae.engineeringFee=parseFloat(C("#enginnerFee").val()),ae=Object.assign(ae,e),console.log(ae)}),C("#stencil_quantity").bind("input propertychange",function(){var e=parseFloat(C(this).val());(""==e||null==e||"undefined"==typeof e||isNaN(e))&&(e=0),se.sQuantity=ue.quantity=e,S()}),q.on("radio(boardType)",function(e){var t=e.value;"1"==t?(Se=1,a(1)):"2"==t&&(Se=2,a(2))}),q.on("select(material)",function(e){var t=e.value;s(t)}),q.on("select(selSurfacefinish)",function(e){var t=e.value;"HASL_with_lead"==t||"HASL_lead_free"==t?C("#selSurfacethickness").val("2.54-25.4um"):"Immersion_Gold"==t?C("#selSurfacethickness").val("2u"):"Immersion_tin"==t?C("#selSurfacethickness").val("0.5um-0.7um"):"Immersion_silver"==t?C("#selSurfacethickness").val("≥0.05um"):"OSP"==t&&C("#selSurfacethickness").val("0.25-0.5um"),"Immersion_Gold"==t?C("input[name='surfaceArea']").removeAttr("disabled"):C("input[name='surfaceArea']").attr("disabled",!0),q.render("select","quoteForm"),q.render(null,"quoteForm")}),q.on("select(testPointType)",function(e){var t=e.value;"1"==t?C("#testPointT").text("飞针费："):C("#testPointT").text("测试架："),C(".up-subbtn").click()}),q.on("select(stencilSide)",function(e){var t=e.value;console.log(t),se.stencilSide=ue.stencilSide=t,S()}),q.on("radio(existingFiducials)",function(e){var t=ue.existingFiducials=e.value;z.msg(t)}),q.on("radio(sthickness)",function(e){var t=ue.thickness=e.value;z.msg(t)}),q.on("radio(routingType)",function(e){var t=e.value;"1"==t?(C("input[name='panelRoutingPath']").removeAttr("disabled"),C("input[name='punchingHoles']").attr("disabled",!0),C("input[name='punchingSlots']").attr("disabled",!0)):(C("input[name='panelRoutingPath']").attr("disabled",!0),C("input[name='punchingHoles']").removeAttr("disabled"),C("input[name='punchingSlots']").removeAttr("disabled")),C(".up-subbtn").click(),q.render()}),M.on("collapse(orderTypeCol)",function(e){var t=e.title.context.innerText;t.indexOf("PCB Phototype")!=-1?(C(".rig-price-cardbody form").removeClass("quote-avtive"),C(".rig-price").addClass("quote-avtive"),N(1),X.bordType=1):t.indexOf("SMT-Stencil")!=-1?(C(".rig-price-cardbody form").removeClass("quote-avtive"),C("#stencilForm").addClass("quote-avtive"),N(0),X.bordType=2):t.indexOf("Assembly Service")!=-1&&(C(".rig-price-cardbody form").removeClass("quote-avtive"),C("#assemblyForm").addClass("quote-avtive"),X.bordType=3),k()}),q.on("select(layer)",function(e){var t=e.value;pe.selLayer=t,"1"==Pe&&("1"==t?(pe.selPthcopper="none",pe.selViaprocess="none"):"2"==t?(pe.selPthcopper="20um",pe.selViaprocess="Follow_gerber"):"4"==t?(p(),pe.selLayer=t,pe.selInlayercoopper="1oz",pe.isDis.selInlayercoopper=!1,pe.selInnerMintrack="5mil",pe.isDis.selInnerMintrack=!1,pe.selNofcore="1",pe.isDis.selNofcore=!1,pe.selNofpp="2",pe.isDis.selNofpp=!1):"6"==t?(p(),pe.selLayer=t,pe.selInlayercoopper="1oz",pe.isDis.selInlayercoopper=!1,pe.selInnerMintrack="5mil",pe.isDis.selInnerMintrack=!1,pe.selNofcore="2",pe.isDis.selNofcore=!1,pe.selNofpp="3",pe.isDis.selNofpp=!1,pe.selPthcopper="none"):"8"==t&&(p(),pe.selLayer=t,pe.selInlayercoopper="1oz",pe.isDis.selInlayercoopper=!1,pe.selInnerMintrack="5mil",pe.isDis.selInnerMintrack=!1,pe.selNofcore="3",pe.isDis.selNofcore=!1,pe.selNofpp="4",pe.isDis.selNofpp=!1,pe.selPthcopper="none"),l())});var Pe=1;q.on("radio(pcbType)",function(e){var t=e.value;z.msg(t),"FR4"==t?(Pe=1,o("FR4"),u(),r("FR4")):"Aluminum"==t?(Pe=2,o("Aluminum"),u(),r("Aluminum")):"FR4+Aluminum"==t&&(Pe=3,o("FR4+Aluminum"),u(),r("FR4+Aluminum"))}),q.on("radio(buildTimeRadio)",function(e){var t=e.value;console.log(e),console.log(e),ae.overworkFee=t,C("#urgentFee").val(t),b()}),q.on("select(selBuildTime)",function(e){var t=e.value,n=C("#selBuildTime").find("option[value="+e.value+"]").text();re.shippingPrice=t,ae.overworkFee=t,ae.buildTime=n,C("#urgentFee").val(t);var i=F();b(i)}),layui.formSelects.on("selCompany",function(e,t,n,i,a){var l=(n.name,n.value);X.companyId=l;var o=X.companyId,r=X.countrysId;f(o,r)}),layui.formSelects.on("selCountrys",function(e,t,n,i,a){var l=(n.name,n.value);X.countrysId=l,ae.countries=X.countrysId,2===X.bordType&&P();var o=X.companyId,r=X.countrysId;f(o,r)}),layui.formSelects.on("selCustomer",function(e,t,n,i,a){var l=n.name,o=n.value;E.customerAid=o,ae.userId=ue.userId=o,ue.customerSysName=l,C("#customerId").val(o),C("input[name='customerSysName']").val(l)}),q.on("select(filterOrderType)",function(e){ae.orderType=ue.orderType=e.value}),layui.formSelects.on("selCompanyt",function(e,t,n,i,a){X.companyId=n.value;var l=X.companyId,o=X.countrysId;f(l,o)}),layui.formSelects.on("selCountryst",function(e,t,n,i,a){X.countrysId=n.value;var l=X.companyId,o=X.countrysId;f(l,o)}),C("#postFees").bind("input propertychange",function(e){se.postFee=parseFloat(C(this).val()),S()}),C("#inStencilCost").bind("input propertychange",function(e){se.inStencilCost=parseFloat(C(this).val()),P()}),q.on("submit(assemblyService)",function(e){var e=e.field;return A.req({type:"post",data:e,url:D.imUrl+"quote/getAssemblyQuote",success:function(e){var t=C("#pcbQuantity").val(),n=parseFloat(e.data.totalAssemblyQuote/t);C("#pricePCS").val(n.toFixed(2)),C("#assemblyCost").val(e.data.totalAssemblyQuote),null!=e.data.totalAssemblyWeight&&""!=e.data.totalAssemblyWeight&&C("#assemblyWeight").val(e.data.totalAssemblyWeight),console.log(e);e.data.totalAssemblyQuote,e.data.totalAssemblyWeight}}),!1}),C("#panelWayX,#panelWayY,#quantityPanel").keydown(function(e){var t=parseInt(e.keyCode);return 110!=t}),C("#panelWayX,#panelWayY,#quantityPanel").bind("cut copy paste",function(e){e.preventDefault()}),q.on("submit(quoteForm)",function(e){var e=e.field,t=e.cncAndPunch;return console.log(e),console.log("提价表单"),le=e,e.isExistSmt=0,e.stackUp="none",e.innerMinTrack=e.innerMinSpacing,e.outerMinSpacing=e.outerMinTrack,e.silkScreenBotColor=e.solderMaskTopColor,e.solderMaskBotColor=e.solderMaskTopColor,e.surfaceArea=e.surfaceArea,e.orderNo=C("#orderNo").val(),ae.orderNo=e.orderNo,e.pcbName=ae.pcbName,e.exchangeId=ae.exchangeId,2!==Se||null!=e.panelWayX&&""!=e.panelWayX&&null!=e.panelWayY&&""!=e.panelWayY?null==e.testPoint||""==e.testPoint?(C("html,body").animate({scrollTop:200},"slow"),z.msg("请输入测试点数量 !"),!1):"Immersion_Gold"==e.surfaceFinish&&""==e.surfaceArea?(z.msg("请输入沉金面积！"),!1):(A.req({type:"post",url:D.imUrl+"quote/countAdditionInfo",data:e,success:function(e){if(null!=e.data.pcbPriceDetail&&""!=e.data.pcbPriceDetail&&(null==e.data.pcbPriceDetail.qcidList&&""==e.data.pcbPriceDetail.qcidList||(E.ids=e.data.pcbPriceDetail.qcidList,ae.quoteConfigIds=e.data.pcbPriceDetail.qcidList.join(","),E.ids=e.data.pcbPriceDetail.qcidList)),ae.engineeringFee=e.data.projectQuoteToUSD,ae.boardFee=e.data.totalBoardQuoteToUSD,ae.testCostFee=e.data.totalTestPointToUSD,ae.toolingFee=e.data.cncAndPunchingQuoteToUSD,ae.weight=e.data.totalQuoteWeight,ae.unitPrice=e.data.unitPrice,X.totalWeight=e.data.totalQuoteWeight,C("#boardFee").val(e.data.totalBoardQuoteToUSD),C("#enginnerFee").val(e.data.projectQuoteToUSD),C("#pcbWeight").val(e.data.totalQuoteWeight+" KG"),C("#testFee").val(e.data.totalTestPointToUSD),C("#flyingTest").val(e.data.totalTestPointToUSD),C("#routingCost").val(e.data.cncAndPunchingQuoteToUSD),C("#unitPrice").val(e.data.unitPrice),J.totalWeight=e.data.totalQuoteWeight,X.totalWeight=e.data.totalQuoteWeight,ee=e.data.areaType,"1"==t?C("#toolingFee").val(0):C("#toolingFee").val(e.data.cncAndPunchingQuoteToUSD),"1"==ee)C("#mPrice").val(""),C("#mPrice").attr("disabled",!0);else{var n=parseFloat(e.data.totalBoardQuoteToUSD/C("#areasq").val()).toFixed(2);C("#mPrice").val(n),C("#mPrice").removeAttr("disabled")}if(b(),d(),null!=J.courierId&&""!=J.courierId||v(),null!=J.countryId&&""!=J.countryId||m(),null!=X.companyId&&""!=X.companyId&&null!=X.countrysId&&""!=X.countrysId){var i=X.companyId,a=X.countrysId;f(i,a)}var l=F();b(l)},error:function(e){alert("Services Error!!!")}}),q.render(),!1):(z.tips("请输入拼版方式 !","#panelWayX",{tips:[1,"#3595CC"],time:5e3}),!1)}),layui.formSelects.on("exchangeId",function(e,t,n,i,a){ae.exchangeId=n.value;var l=X.companyId,o=X.countrysId,r=ne.find(function(e){return e.id==n.value}).currency;ie="USD"==r?1:"CNY"==r?ne.find(function(e){return"USD"==e.currency}).exchangeRate:ne.find(function(e){return e.currency==r}).exchangeRate,f(l,o)}),C(".stencilSide").click(function(){A.popup({title:"Stencil Size",area:["60%","85%"],btn:["确定","取消"],yes:function(e,t){var n=layui.data("stencilList");ce=n.params,V.stencilSize_price=ce.unitPrice,V.stencilWeight=ce.weight,oe.stencilWeight=V.stencilWeight,C("#stencilWeight").val(V.stencilWeight+" KG "),oe.stencilWeight=V.stencilSize_price,C("#sunitPrice").val(V.stencilSize_price),C("#inStencilSize").val(C("#stenContainer").val()),v(),m(),f(),z.closeAll()},success:function(e,t){T(this.id).render("marketManagement/iframeWindow/stencil_size_list",{exchangeId:ae.exchangeId}).done(function(){})}})});var Ie={resetQuoteTab:function(){C("a[title='刷新']").click(),z.msg("重置报价表")},addCustomerFile:function(){z.msg("添加客户资料")},addThisQuote:function(){C(".up-subbtn").click(),C("*[lay-filter='quoteForm']").click();var e=Object.assign(le,ae);return null==ae.userId||""==ae.userId?(z.msg("请先选择客户"),!1):null==ae.gerberName||""==ae.gerberName?(z.tips("请先上传Gerber资料再添加当前报价 !","#addFile",{tips:[1,"#3595CC"],time:2e3}),!1):void($.totalPric==$.totalPriced&&1==$.isQuote?z.confirm("你已经添加了相同参数的报价，是否再次添加？",function(){A.req({type:"post",data:e,url:D.baseUrl+"epc/pcborder/save",success:function(t){C("#orderPN").val(t.pn),ae.productNo=t.pn,q.render(null,"checkCustomer"),"500"!=t.code&&z.alert("添加报价成功["+K[e.orderType]+"]")}})}):(A.req({type:"post",data:e,url:D.baseUrl+"epc/pcborder/save",success:function(t){C("#orderPN").val(t.pn),ae.productNo=t.pn,q.render(null,"checkCustomer"),"500"!=t.code&&z.alert("添加报价成功["+K[e.orderType]+"]")}}),$.totalPric=$.totalPriced,$.isQuote=!0))},lookQuote:function(){var e=ae.quoteConfigIds;null==E.customerAid||""==E.customerAid?z.msg("请选择对应的客户"):A.popup({title:"产看报价详情",area:["70%","85%"],btn:["确定","取消"],yes:function(e,t){z.closeAll()},success:function(t,n){var i={ids:""};i.ids=ae.quoteConfigIds,T(this.id).render("marketManagement/iframeWindow/quote_detaily",i).done(function(){C("#sss").text(e),C("#sss").attr("name",e)})}})},upSubbtn:function(){if("1"==X.bordType)null==E.customerAid||""==E.customerAid?z.tips("请先选择客户 !","#selCustomer_container",{tips:[1,"#3595CC"],time:2e3}):C(".bot-subbtn").click();else if(2===X.bordType){C(".rStencilSubmit").click();var e=Object.assign(ue,ce);if(e.orderNo=C("#orderNo").val(),e.postFee=se.postFee,null==e.userId||""==e.userId)return z.msg("请先选择客户"),!1;if(null==e.gerberName||""==e.gerberName)return z.tips("请先上传Gerber资料再添加当前报价 !","#addFile",{tips:[1,"#3595CC"],time:2e3}),!1;$.totalPricS==$.totalPricedS&&1==$.isQuoteS?z.confirm("你已经添加了相同参数的报价，是否再次添加？",function(){A.req({type:"post",data:e,url:D.baseUrl+"epc/stencilorder/save",success:function(e){z.alert("钢网报价成功！"),C("#orderPN").val(e.pn),ue.productNo=e.pn}})}):(A.req({type:"post",data:e,url:D.baseUrl+"epc/stencilorder/save",success:function(e){z.alert("钢网报价成功！"),C("#orderPN").val(e.pn),ue.productNo=e.pn}}),$.totalPricS=$.totalPricedS,$.isQuoteS=!0)}else 3===X.bordType&&C(".rAssemblySubmit").click()}};W.render({elem:"#addFile",url:D.baseUrl+"sys/oss/upload/geber?access_token="+layui.data("layuiAdmin").access_token,field:"file",accept:"file",exts:"zip|rar|7z",before:function(e){e.preview(function(e,t,n){var i=t.name;ae.gerberName=ue.gerberName=i,ae.pcbName=ue.pcbName=B.CleanFileSuffix(i),console.log("显示的文件名为："+ae.pcbName),null==C("#pcbName").val&&""==C("#pcbName").val||C("#pcbName").val(ae.pcbName),q.render(null,"")})},done:function(e,t,n){z.msg("文件上传成功！");var i=e.url,a=/\[(.+?)\]/g,l=i.match(a);console.log("未处理的路径为："+l);var o=l[0].replace(/\[|]/g,"");ae.gerberPath=ue.gerberPath=o,console.log("处理完的路径为："+o)},error:function(){z.msg("文件上传失败！")}});C(".layui-btn").on("click",function(){var e=C(this).data("type");Ie[e]?Ie[e].call(this):""}),C(".up-rsetbtn").on("click",function(){C(".bot-rsetbtn").click()}),C(".importPcbInfo>.importOrder").on("click",function(){A.popup({title:"导入pcb订单信息",area:["506px","506px"],btn:["导入","取消"],yes:function(e,t){C("#importPCBInfo").click(),z.closeAll()},success:function(e,t){T(this.id).render("marketManagement/iframeWindow/import_pcbInfoForm").done(function(){Y.render(),q.on("submit(importPCBInfo)",function(e){return A.req({type:"post",url:D.baseUrl+"pert/revieworder/reviewOrderInfo",data:e.field,success:function(e){var n=e.data;null!=n?(d(),v(),m(),x(n)):z.alert("当前不存在PCB参数详情！"),z.close(t)}}),!1})})}})}),C(".importPcbInfo>.importReOrder").on("click",function(){A.popup({title:"导入返单信息",area:["506px","506px"],btn:["导入","取消"],id:"popupImportReOrder",yes:function(e,t){C("#importRePCBInfo").click(),z.closeAll()},success:function(e,t){T(this.id).render("marketManagement/iframeWindow/import_pcbInfoReOreder").done(function(){q.on("submit(importRePCBInfo)",function(e){e.field;return A.req({type:"post",url:D.baseUrl+"epc/pcborder/findOrderByUidAndProductNo",data:e.field,success:function(e){var n=e.data;null!=n?(d(),v(),m(),x(n)):z.alert("当前不存在PCB参数详情！"),z.close(t)}}),!1})})}})}),C(".importPcbInfo>.quotePostFee").on("click",function(){A.popup({title:"运费计算",area:["660px","322px"],btn:["清空","返回"],id:"popupQuotePostFee",yes:function(){z.msg("清空数据"),C("#quotePostFeeRest").click()},btn1:function(){z.closeAll()},success:function(e,t){T(this.id).render("marketManagement/iframeWindow/quote_postFee").done(function(){q.render()})}})}),e("quote",{})});