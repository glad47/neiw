/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","form","element","laytpl","layer","upload","jsTools"],function(e){function t(e){if(1===ve){s("1");var t=parseFloat(le*oe*se)/1e6;N("#areasq").val(t.toFixed(3))}else if(2===ve){s("2");var t=parseFloat(pe*de*ue)/1e6;if(N("#areasq").val(t.toFixed(3)),""!=ue&&""!=re&&""!=ce){var i=Math.ceil(ue*re*ce);N("#quantityPCS").val(i)}}}function i(e){N("#areasq").val(""),0===e?(N(".itPanelway input").attr("disabled",G.isDis.itPanelway),N(".itPanelsize input").attr("disabled",G.isDis.itPanelsize)):1===e?(N(".mto-input").removeAttr("disabled","true"),N(".itPanelway input").attr("disabled","disabled"),N(".itPanelsize input").attr("disabled","disabled"),N(".itSinlgesize input").val(""),N(".itPanelway input").val(""),N(".itPanelsize input").val("")):2===e&&(N(".mto-input").removeAttr("disabled","true"),N(".itSinlgesize input").attr("disabled","disabled"),N(".itSinlgesize input").val(""))}function n(){N("#selHc").attr("disabled",ae.isDis.selHc),N("#selInlayercoopper").attr("disabled",ae.isDis.selInlayercoopper),N("#selInnerMintrack").attr("disabled",ae.isDis.selInnerMintrack),N("#selNofcore").attr("disabled",ae.isDis.selNofcore),N("#selMinspaccing").attr("disabled",ae.isDis.selMinspaccing),N("#selNofpp").attr("disabled",ae.isDis.selNofpp),N("#radioSinglePcb").attr("checked","true"),N("#ptfr4").attr("checked","true"),N("#routingOne").attr("checked","true"),N("#selLayer").val(ae.selLayer),N("#selFinishThickness").val(ae.selFinishThickness),N("#selMaterial").val(ae.selMaterial),N("#selkbsy").val(ae.selkbsy),N("#selTg").val(ae.selTg),N("#selHf").val(ae.selHf),N("#selHc").val(ae.selHc),N("#selInlayercoopper").val(ae.selInlayercoopper),N("#selInnerMintrack").val(ae.selInnerMintrack),N("#selNofcore").val(ae.selNofcore),N("#selMinspaccing").val(ae.selMinspaccing),N("#selNofpp").val(ae.selNofpp),N("#selOuterlayercopper").val(ae.selOuterlayercopper),N("#selOutMintrack").val(ae.selOutMintrack),N("#selBgasize").val(ae.selBgasize),N("#selMinspacing").val(ae.selMinspacing),N("#selMinholesize").val(ae.selMinholesize),N("#selPthcopper").val(ae.selPthcopper),N("#selSoldermc").val(ae.selSoldermc),N("#selViaprocess").val(ae.selViaprocess),N("#selSilksc").val(ae.selSilksc),N("#selPeelable").val(ae.selPeelable),N("#selSurfacefinish").val(ae.selSurfacefinish),N("#selTestcost").val(ae.selTestcost),C.render()}function a(e){if(N("#selLayer").children().remove(),"Aluminum"==e)for(var t=0;t<Y.length;t++){var i=Y[t].text,n=Y[t].value;N("#selLayer").append("<option value="+n+">"+i+"</option>")}else if("FR4"==e)for(var t=0;t<W.length;t++){var i=W[t].text,n=W[t].value;N("#selLayer").append("<option value="+n+">"+i+"</option>"),r(1)}else if("FR4+Aluminum"==e)for(var t=0;t<z.length;t++){var i=z[t].text,n=z[t].value;N("#selLayer").append("<option value="+n+">"+i+"</option>")}}function l(e){if(N("#selMaterial").children().remove(),"Aluminum"==e){for(var t=0;t<O.length;t++){var i=O[t].text,n=O[t].value;N("#selMaterial").append("<option value="+n+">"+i+"</option>")}o("yg")}else{for(var t=0;t<_.length;t++){var i=_[t].text,n=_[t].value;N("#selMaterial").append("<option value="+n+">"+i+"</option>")}o("kb")}C.render("select")}function o(e){if(N("#selkbsy").children().remove(),"kb"==e)for(var t=0;t<w.length;t++){var i=w[t].text,n=w[t].value;N("#selkbsy").append("<option value="+n+">"+i+"</option>")}else if("yg"==e)for(var t=0;t<U.length;t++){var i=U[t].text,n=U[t].value;N("#selkbsy").append("<option value="+n+">"+i+"</option>")}else if("sy"==e)for(var t=0;t<Q.length;t++){var i=Q[t].text,n=Q[t].value;N("#selkbsy").append("<option value="+n+">"+i+"</option>")}C.render("select")}function s(e){var t=e;"1"==t?(le=N("#singleSizeX").val(),oe=N("#singleSizeY").val(),se=N("#quantityPCS").val()):"2"==t&&(re=N("#panelWayX").val(),ce=N("#panelWayY").val(),ue=N("#quantityPanel").val(),pe=N("#panelSizeX").val(),de=N("#panelSizeY").val())}function r(e){c(),2===me?(ae.selLayer=1,ae.selMaterial="YG",ae.selkbsy="YG0001",ae.selHc="1W",ae.selMinholesize="1.5",ae.selPthcopper="none",ae.selSoldermc="white",ae.selViaprocess="none",ae.selSilksc="black",ae.isDis.selHc=!1):3===me&&(ae.selLayer=4,ae.selHc="1W",ae.selInlayercoopper="1oz",ae.selMintrack="5mil",ae.selNofcore="1",ae.selMinspaccing="5mil",ae.selNofpp="2",ae.selInnerMintrack="5mil",ae.selMinholesize="1.5",ae.selPthcopper="none",ae.selSoldermc="white",ae.selSilksc="black",ae.selPeelable="none",ae.isDis.selInlayercoopper=!1,ae.isDis.selInnerMintrack=!1,ae.isDis.selNofcore=!1,ae.isDis.selMinspaccing=!1,ae.isDis.selNofpp=!1),n()}function c(){ae.selLayer=2,ae.selFinishThickness="1.6mm",ae.selMaterial="KB",ae.selkbsy="KB6160",ae.selTg="135",ae.selHf="NO",ae.selHc="none",ae.selInlayercoopper="none",ae.selMintrack="none",ae.selNofcore="none",ae.selMinspaccing="none",ae.selNofpp="none",ae.selOuterlayercopper="1oz",ae.selInnerMintrack="none",ae.selOutMintrack="5mil",ae.selBgasize="0.30",ae.selMinspacing="5mil",ae.selMinholesize="0.3",ae.selPthcopper="20um",ae.selSoldermc="green",ae.selViaprocess="Follow_gerber",ae.selSilksc="white",ae.selPeelable="none",ae.selSurfacefinish="HASL_with_lead",ae.selTestcost="1",ae.selCti="175≤CTI<250",ae.isDis={},ae.isDis.selHc=!0,ae.isDis.selInlayercoopper=!0,ae.isDis.selInnerMintrack=!0,ae.isDis.selNofcore=!0,ae.isDis.selMinspaccing=!0,ae.isDis.selNofpp=!0}function u(){var e=N("#areasq").val(),t=N("#selLayer").val();N("input[name='buildTime']").remove(),N(".build-time-item .layui-form-radio").remove(),x.req({type:"post",url:A.imUrl+"quote/getBuildTime",data:{areaSq:e,layerNum:t},success:function(e){N(".build-time-item").css("display","");var t;N("#selBuildTime").children().remove();for(var i=0;i<e.data.length;i++)N("#selBuildTime").append("<option value="+e.data[i].price+">"+e.data[i].dayNumber+"</option>"),t=e.data[0].dayNumber;J.buildTime=t,N(".build-time-item input").each(function(){var e=N(this).attr("title");"none"==e&&this.remove()}),C.render()},error:function(){B.msg("Get BuildTime Fail!!!")}})}function p(){var e=null;1===L.bordType?e="selCompany":2===L.bordType?e="selCompanyt":3===L.bordType&&(e="selCompany"),console.log("SelectId:"+e),x.req({type:"post",url:A.imUrl+"quote/getCouriers",success:function(t){N("select[id='"+e+"'] option").remove(),L.companyId=t.data[0].id;for(var i=0;i<t.data.length;i++)N("#"+e).append("<option value="+t.data[i].id+">"+t.data[i].courierName+"</option>"),K.courierId=t.data[0].id,L.companyId=K.courierId;C.render("select")},error:function(){B.msg("Get Couriers Fail!!!")}})}function d(){var e=null;1===L.bordType?e="selCountrys":2===L.bordType?e="selCountryst":3===L.bordType&&(e="selCountryss"),N("select[id='"+e+"'] option").remove(),C.render(),x.req({type:"post",url:A.imUrl+"quote/getCountry",success:function(t){L.countrysId=t.data[0].id;for(var i=0;i<t.data.length;i++)N("#"+e).append("<option value="+t.data[i].id+">"+t.data[i].name+"</option>"),K.countryId=t.data[0].id,L.countrysId=K.countryId;C.render()},error:function(){B.msg("Get Countrys Fail!!!")}})}function v(e,t){var i;null!=e&&"undefined"!=typeof e&&""!=e||(e=1),null!=t&&"undefined"!=typeof t&&""!=t||(t=70),i=2===L.bordType?H.stencilWeight:L.totalWeight,x.req({type:"post",url:A.imUrl+"quote/getShippingCost",data:{courierId:e,countryId:t,totalWeight:i},success:function(e){null!=e.data&&1===L.bordType?(J.postFee=e.data.shippingCost,R.postFee=e.data.shippingCost,j.shipping=e.data.shippingCost,N("#shippingPrice").val(j.shipping),y()):null!=e.data&&2===L.bordType?(H.stencil_shippingPrice=te.postFee=e.data.shippingCost,console.log("stencil_shippingPrice:"+H.stencil_shippingPrice),N("#postFees").val(H.stencil_shippingPrice),g()):N("#shippingPrice").val("不支持该配送")},error:function(){B.msg("Get ShippingCost Fail!!!")}})}function m(){x.req({type:"post",url:A.baseUrl+"sys/consumer/user/all",success:function(e){for(var t=0;t<e.data.length;t++)N("#selCustomer").append("<option id="+e.data[t].id+" value="+e.data[t].id+">"+e.data[t].userSystemId+"</option>");C.render("select")}})}function f(e){var t=0;N.each(e,function(i,n){var a=parseFloat(n);(""==a||null==a||isNaN(a))&&(e[i]=0,a=0),t+=a}),ee.pcbCost=t.toFixed(2),N("#pcbCost").val(ee.pcbCost),y()}function y(){var e=N("#shippingPrice").val();ee.shippingPrice=parseFloat(e),N.each(ee,function(e,t){(""==t||null==t||isNaN(t))&&(ee[e]=0)});var t=parseFloat(ee.pcbCost),e=parseFloat(ee.shippingPrice),i=(t+e).toFixed(2);ee.totalPrice=i,J.subtotal=t,X.totalPriced=ee.totalPrice,N("#totalPrice").val(ee.totalPrice)}function g(){var e;e="Top And Bottom (On Single Stencil)"==te.stencilSide||"Top"==te.stencilSide||"Bottom"==te.stencilSide?1:2,te.inStencilCost=te.sQuantity*H.stencilSize_price*e,N("#inStencilCost").val(te.inStencilCost),b()}function b(){var e=te,t=e.postFee+e.inStencilCost;ne.totalStencilFee=t,X.totalPricedS=t,N("#stotalPrice").val(t),h()}function h(){var e=parseInt(N("#inStencilCost").val()),t=parseInt(N("#stencil_quantity").val()),i=(e/t).toFixed(2);ie.unitPrice=i,N("#sunitPrice").val(i)}function S(){var e=new Object;return e.enginnerFee=parseFloat(N("#enginnerFee").val()),e.boardFee=parseFloat(N("#boardFee").val()),e.testCostFee=parseFloat(N("#testFee").val()),e.toolingFee=parseFloat(N("#toolingFee").val()),e.overworkFee=parseFloat(N("#urgentFee").val()),e}function P(){N("#inStencilCost").val(""),N("#shippingPrice").val(""),N("#totalPrice").val(""),C.render()}function F(e){E.importPCBInfo=e,N("#inside_quote_all input,#inside_quote_all select").each(function(){var t=N(this).attr("name"),i=N(this),n=N(this).attr("type");(isNaN(e[t])||""==e[t]||null==e[t])&&i.parents(".rig-price").length>0&&(e[t]=0),i.is("input")&&("text"==n||"number"==n?i.val(e[t]):"checkbox"==n?N("input[type=checkbox][name="+t+"][value='"+e[t]+"']").attr("checked","checked"):"radio"==n&&N("input[name="+t+"][value='"+e[t]+"']").prop("checked","checked")),i.is("select")&&(N("select[name='"+t+"'] option[value='"+e[t]+"']").attr("selected",!0),"nOfPp"==t&&(console.log(),N("select[name='nOfPp'] option[value='"+e.nOfPp+"']").attr("selected",!0))),N("*[name='remark']").val(e.remark),"userId"==t&&(N("select[name='userId']").find("option[id="+e.userId+"]").attr("selected",!0),N("input[name='customerId']").val(e.userId),J.userId=R.customerAid=e.userId)}),N("input[name='customerSysName']").val(N("#selCustomer").find("option:selected").text()),J.userId=e.userId,J.gerberName=e.gerberName,J.gerberPath=e.gerberPath,J.pcbName=ne.pcbName=e.pcbName,J.productNo=e.productNo;var t=parseFloat(N("input[name='subtotal']").val()),i=parseFloat(N("input[name='postFee']").val());(isNaN(t)||""==t)&&(t=0),(isNaN(i)||""==i)&&(i=0);var n=t+i;N("input[id='totalPrice']").val(n),C.render(),N(".bot-subbtn").click();var a=Object.assign(Z,J);console.log(a),B.msg("导入PCB信息成功")}function I(e){var t,i,n,a,l=k();return e.A.customerSysName=e.B.customerSysName,N.each(e.A,function(o,s){if(i=""==s||null==s||"none"==s,N.each(e.B,function(e,r){n=""==r||null==r||"none"==r,o==e&&(s==r?t=2:i&&n?t=2:s!=r&&"-1"==l.fd.indexOf(o)&&l.fdyg.indexOf(o)&&(console.log("key值不同的q["+o+","+s+"],i["+e+","+r+"]"),l.fdyg.indexOf(o)>=0?(t=3,a=!0):t=2))}),1==a)return!1}),console.log("orderType:===>"+t),t}function k(){var e="",t="";N(".top-m-one input").each(function(){"undefined"!=typeof N(this).attr("name")&&(e+=","+N(this).attr("name"))}),N(".top-price-one input").each(function(){"undefined"!=typeof N(this).attr("name")&&(e+=","+N(this).attr("name"))}),N(".center-m-two input").each(function(){"undefined"!=typeof N(this).attr("name")&&(t+=","+N(this).attr("name"))}),N(".center-m-two select").each(function(){"undefined"!=typeof N(this).attr("name")&&(t+=","+N(this).attr("name"))});var i={fd:e,fdyg:t};return console.log(i),i}var N=layui.jquery,T=layui.view,C=layui.form,x=layui.admin,q=layui.element,A=layui.setter,M=layui.upload,D=layui.jsTools,B=layui.layer;q.render();var W=[{text:0,value:0},{text:1,value:1},{text:2,value:2},{text:4,value:4},{text:6,value:6},{text:8,value:8}],Y=[{text:0,value:0},{text:1,value:1},{text:2,value:2}],z=[{text:0,value:0},{text:4,value:4},{text:6,value:6},{text:8,value:8}],_=[{text:"KB",value:"KB"},{text:"SY",value:"SY"}],O=[{text:"YG",value:"YG"}],w=[{text:"KB6160",value:"KB6160"},{text:"KB6150",value:"KB6150"},{text:"KB6165",value:"KB6165"},{text:"KB6167",value:"KB6167"}],Q=[{text:"SY1130",value:"SY1130"},{text:"SY1141",value:"SY1141"},{text:"SY1150",value:"SY1150"},{text:"SY1170",value:"SY1170"},{text:"SY1180",value:"SY1180"},{text:"SY1000",value:"SY1000"},{text:"SY1000-2",value:"SY1000-2"},{text:"SY1600",value:"SY1600"}],U=[{text:"YG0001",value:"YG0001"},{text:"YG0002",value:"YG0002"},{text:"YG0003",value:"YG0003"},{text:"YG0004",value:"YG0004"}],G={isDis:{itPanelway:!0,itPanelsize:!0}},L={bordType:1,companyId:1,countrysId:70,totalWeight:0},H={stencilSize_price:"",stencilWeight:"",stencil_shippingPrice:""},R={postFee:"",customerAid:"",ids:"",orderNo:""},K={courierId:"",countryId:"",totalWeight:""},j={shipping:""},X={totalPric:null,totalPriced:null,isQuote:!1,totalPricS:null,totalPricedS:null,isQuoteS:!1},V=null,E={importPCBInfo:null},J={engineeringFee:"",boardFee:"",testCostFee:"",toolingFee:"",overworkFee:0,buildTime:"",weight:"",postFee:0,subtotal:"",quoteConfigIds:"",productNo:"",userId:"",orderType:1,gerberName:"",gerberPath:"",pcbName:"",orderNo:"",countries:"Afghanistan"},Z={},$={stencilWeight:"",inStencilCost:""},ee={pcbCost:0,totalPrice:0,shippingPrice:0},te={postFee:H.stencil_shippingPrice,inStencilCost:null,sQuantity:1,stencilSide:"Top And Bottom (On Single Stencil)",sunitPrice:H.stencilSize_price,stotalPrice:null},ie=new Object,ne={stencilSide:"Top And Bottom (On Single Stencil)",quantity:te.sQuantity,thickness:.12,existingFiducials:.1,totalStencilFee:te.stotalPrice,gerberPath:null,gerberName:null,orderId:null,orderType:1,pcbName:null,postFee:null,orderNo:null,companyId:L.companyId,countrysId:L.countrysId,customerSysName:null,userId:null,productNo:null},ae={};c(),n(),i(0),a("FR4"),l(),o("kb"),m();var le,oe,se,re,ce,ue,pe,de,ve=1;N("#singleSizeX,#singleSizeY,#quantityPCS").bind("input propertychange",function(e){t()}),N("#panelSizeX,#panelSizeY,#quantityPanel").bind("input propertychange",function(e){null!=pe&&null!=de&&null!=ue&&t()}),N("#panelWayX,#panelWayY,#quantityPanel").bind("input propertychange",function(e){t()}),N("input[name='testPoint']").bind("input propertychange",function(e){setTimeout(function(){N(".up-subbtn").click()},1800)}),N("input[name='panelRoutingPath']").bind("input propertychange",function(e){setTimeout(function(){N(".up-subbtn").click()},1800)}),N("input[name='punchingHoles']").bind("input propertychange",function(e){setTimeout(function(){N(".up-subbtn").click()},1800)}),N("input[name='punchingSlots']").bind("input propertychange",function(e){setTimeout(function(){N(".up-subbtn").click()},1800)}),N("input[name='surfaceArea']").bind("input propertychange",function(e){setTimeout(function(){N(".up-subbtn").click()},1800)}),N("#mPrice").bind("input propertychange",function(e){var t=N("#mPrice").val(),i=N("#areasq").val(),n=parseFloat(t*i).toFixed(2),a=N("#boardFee").val();N("#unitPrice").val(parseFloat(a/i).toFixed(2)),N("#boardFee").val(n),B.msg(n)}),N("#rPcbForm").bind("input propertychange",function(){var e=S();f(e),J.postFee=parseFloat(N("#shippingPrice").val()),J.engineeringFee=parseFloat(N("#enginnerFee").val()),J=Object.assign(J,e),console.log(J)}),N("#stencil_quantity").bind("input propertychange",function(){var e=parseFloat(N(this).val());(""==e||null==e||"undefined"==typeof e||isNaN(e))&&(e=0),te.sQuantity=ne.quantity=e,g()}),C.on("radio(boardType)",function(e){var t=e.value;"1"==t?(ve=1,i(1)):"2"==t&&(ve=2,i(2))}),C.on("select(material)",function(e){var t=e.value;"KB"==t?o("kb"):"SY"==t?o("sy"):"YG"==t&&o("yg")}),C.on("select(selSurfacefinish)",function(e){var t=e.value;"HASL_with_lead"==t||"HASL_lead_free"==t?N("#selSurfacethickness").val("2.54-25.4um"):"Immersion_Gold"==t?N("#selSurfacethickness").val("2u"):"Immersion_tin"==t?N("#selSurfacethickness").val("0.5um-0.7um"):"Immersion_silver"==t?N("#selSurfacethickness").val("≥0.05um"):"OSP"==t&&N("#selSurfacethickness").val("0.25-0.5um"),"Immersion_Gold"==t?N("input[name='surfaceArea']").removeAttr("disabled"):N("input[name='surfaceArea']").attr("disabled",!0),C.render("select","quoteForm"),C.render(null,"quoteForm")}),C.on("select(testPointType)",function(e){var t=e.value;"1"==t?N("#testPointT").text("飞针费："):N("#testPointT").text("测试架："),N(".up-subbtn").click()}),C.on("select(stencilSide)",function(e){var t=e.value;console.log(t),te.stencilSide=ne.stencilSide=t,g()}),C.on("radio(existingFiducials)",function(e){var t=ne.existingFiducials=e.value;B.msg(t)}),C.on("radio(sthickness)",function(e){var t=ne.thickness=e.value;B.msg(t)}),C.on("radio(routingType)",function(e){var t=e.value;"1"==t?(N("input[name='panelRoutingPath']").removeAttr("disabled"),N("input[name='punchingHoles']").attr("disabled",!0),N("input[name='punchingSlots']").attr("disabled",!0)):(N("input[name='panelRoutingPath']").attr("disabled",!0),N("input[name='punchingHoles']").removeAttr("disabled"),N("input[name='punchingSlots']").removeAttr("disabled")),N(".up-subbtn").click(),C.render()}),q.on("collapse(orderTypeCol)",function(e){var t=e.title.context.innerText;t.indexOf("PCB Phototype")!=-1?(N(".rig-price-cardbody form").removeClass("quote-avtive"),N(".rig-price").addClass("quote-avtive"),L.bordType=1):t.indexOf("SMT-Stencil")!=-1?(N(".rig-price-cardbody form").removeClass("quote-avtive"),N("#stencilForm").addClass("quote-avtive"),L.bordType=2):t.indexOf("Assembly Service")!=-1&&(N(".rig-price-cardbody form").removeClass("quote-avtive"),N("#assemblyForm").addClass("quote-avtive"),L.bordType=3),P()}),C.on("select(layer)",function(e){var t=e.value;ae.selLayer=t,"1"==me&&("1"==t?(ae.selPthcopper="none",ae.selViaprocess="none"):"2"==t?(ae.selPthcopper="20um",ae.selViaprocess="Follow_gerber"):"4"==t?(c(),ae.selLayer=t,ae.selInlayercoopper="1oz",ae.isDis.selInlayercoopper=!1,ae.selInnerMintrack="5mil",ae.isDis.selInnerMintrack=!1,ae.selNofcore="1",ae.isDis.selNofcore=!1,ae.selNofpp="2",ae.isDis.selNofpp=!1):"6"==t?(c(),ae.selLayer=t,ae.selInlayercoopper="1oz",ae.isDis.selInlayercoopper=!1,ae.selInnerMintrack="5mil",ae.isDis.selInnerMintrack=!1,ae.selNofcore="2",ae.isDis.selNofcore=!1,ae.selNofpp="3",ae.isDis.selNofpp=!1,ae.selPthcopper="none"):"8"==t&&(c(),ae.selLayer=t,ae.selInlayercoopper="1oz",ae.isDis.selInlayercoopper=!1,ae.selInnerMintrack="5mil",ae.isDis.selInnerMintrack=!1,ae.selNofcore="3",ae.isDis.selNofcore=!1,ae.selNofpp="4",ae.isDis.selNofpp=!1,ae.selPthcopper="none"),n())});var me=1;C.on("radio(pcbType)",function(e){var t=e.value;B.msg(t),"FR4"==t?(me=1,a("FR4"),r(),l("FR4")):"Aluminum"==t?(me=2,a("Aluminum"),r(),l("Aluminum")):"FR4+Aluminum"==t&&(me=3,a("FR4+Aluminum"),r(),l("FR4+Aluminum"))}),C.on("radio(buildTimeRadio)",function(e){var t=e.value;console.log(e),console.log(e),J.overworkFee=t,N("#urgentFee").val(t),f()}),C.on("select(selBuildTime)",function(e){var t=e.value,i=N("#selBuildTime").find("option[value="+e.value+"]").text();ee.shippingPrice=t,J.overworkFee=t,J.buildTime=i,N("#urgentFee").val(t);var n=S();f(n)}),C.on("select(company)",function(e){L.companyId=N(e.elem).find("option:selected").attr("value");var t=L.companyId,i=L.countrysId;v(t,i),v()}),C.on("select(countrys)",function(e){L.countrysId=N(e.elem).find("option:selected").attr("value"),J.countries=L.countrysId,2===L.bordType&&b();var t=L.companyId,i=L.countrysId;v(t,i)}),C.on("select(filterCustomer)",function(e){var t=N(e.elem).find("option:selected").text();N("#orderPN").val(""),R.customerAid=e.value,J.userId=ne.userId=e.value,ne.customerSysName=t,N("#customerId").val(e.value),N("input[name='customerSysName']").val(N(e.elem).find("option:selected").text()),C.render("")}),C.on("select(filterOrderType)",function(e){J.orderType=ne.orderType=e.value}),N("#postFees").bind("input propertychange",function(e){te.postFee=parseFloat(N(this).val()),g()}),N("#inStencilCost").bind("input propertychange",function(e){te.inStencilCost=parseFloat(N(this).val()),b()}),C.on("submit(assemblyService)",function(e){var e=e.field;return x.req({type:"post",data:e,url:A.imUrl+"quote/getAssemblyQuote",success:function(e){var t=N("#pcbQuantity").val(),i=parseFloat(e.data.totalAssemblyQuote/t);N("#pricePCS").val(i.toFixed(2)),N("#assemblyCost").val(e.data.totalAssemblyQuote),null!=e.data.totalAssemblyWeight&&""!=e.data.totalAssemblyWeight&&N("#assemblyWeight").val(e.data.totalAssemblyWeight),console.log(e);e.data.totalAssemblyQuote,e.data.totalAssemblyWeight}}),!1}),N("#panelWayX,#panelWayY,#quantityPanel").keydown(function(e){var t=parseInt(e.keyCode);return 110!=t}),N("#panelWayX,#panelWayY,#quantityPanel").bind("cut copy paste",function(e){e.preventDefault()}),C.on("submit(quoteForm)",function(e){var e=e.field,t=e.cncAndPunch;return Z=e,e.isExistSmt=0,e.stackUp="none",e.innerMinTrack=e.innerMinSpacing,e.outerMinSpacing=e.outerMinTrack,e.silkScreenBotColor=e.solderMaskTopColor,e.solderMaskBotColor=e.solderMaskTopColor,e.surfaceArea=e.surfaceArea,e.orderNo=N("#orderNo").val(),J.orderNo=e.orderNo,e.pcbName=J.pcbName,2!==ve||null!=e.panelWayX&&""!=e.panelWayX&&null!=e.panelWayY&&""!=e.panelWayY?null==e.testPoint||""==e.testPoint?(N("html,body").animate({scrollTop:200},"slow"),B.msg("请输入测试点数量 !"),!1):"Immersion_Gold"==e.surfaceFinish&&""==e.surfaceArea?(B.msg("请输入沉金面积！"),!1):(x.req({type:"post",url:A.imUrl+"quote/countAdditionInfo",data:e,success:function(e){if(null!=e.data.pcbPriceDetail&&""!=e.data.pcbPriceDetail&&(null==e.data.pcbPriceDetail.qcidList&&""==e.data.pcbPriceDetail.qcidList||(R.ids=e.data.pcbPriceDetail.qcidList,J.quoteConfigIds=e.data.pcbPriceDetail.qcidList.join(","),R.ids=e.data.pcbPriceDetail.qcidList)),console.log(e),J.engineeringFee=e.data.projectQuoteToUSD,J.boardFee=e.data.totalBoardQuoteToUSD,J.testCostFee=e.data.totalTestPointToUSD,J.toolingFee=e.data.cncAndPunchingQuoteToUSD,J.weight=e.data.totalQuoteWeight,L.totalWeight=e.data.totalQuoteWeight,N("#boardFee").val(e.data.totalBoardQuoteToUSD),N("#enginnerFee").val(e.data.projectQuoteToUSD),N("#pcbWeight").val(e.data.totalQuoteWeight+" KG"),N("#testFee").val(e.data.totalTestPointToUSD),N("#flyingTest").val(e.data.totalTestPointToUSD),N("#routingCost").val(e.data.cncAndPunchingQuoteToUSD),N("#unitPrice").val(e.data.unitPrice),K.totalWeight=e.data.totalQuoteWeight,L.totalWeight=e.data.totalQuoteWeight,V=e.data.areaType,"1"==t?N("#toolingFee").val(0):N("#toolingFee").val(e.data.cncAndPunchingQuoteToUSD),"1"==V)N("#mPrice").val(""),N("#mPrice").attr("disabled",!0);else{var i=parseFloat(e.data.totalBoardQuoteToUSD/N("#areasq").val()).toFixed(2);N("#mPrice").val(i),N("#mPrice").removeAttr("disabled")}if(f(),u(),null!=K.courierId&&""!=K.courierId||p(),null!=K.countryId&&""!=K.countryId||d(),null!=L.companyId&&""!=L.companyId&&null!=L.countrysId&&""!=L.countrysId){var n=L.companyId,a=L.countrysId;v(n,a)}var l=S();f(l)},error:function(e){alert("Services Error!!!")}}),C.render(),!1):(B.tips("请输入拼版方式 !","#panelWayX",{tips:[1,"#3595CC"],time:5e3}),!1)}),N(".stencilSide").click(function(){x.popup({title:"Stencil Size",area:["60%","85%"],btn:["确定","取消"],yes:function(e,t){var i=layui.data("stencilList");ie=i.params,H.stencilSize_price=ie.unitPrice,H.stencilWeight=ie.weight,$.stencilWeight=H.stencilWeight,N("#stencilWeight").val(H.stencilWeight+" KG "),$.stencilWeight=H.stencilSize_price,N("#inStencilSize").val(N("#stenContainer").val()),p(),d(),v(),B.closeAll()},success:function(e,t){T(this.id).render("marketManagement/iframeWindow/stencil_size_list",null).done(function(){})}})});var fe={resetQuoteTab:function(){N("a[title='刷新']").click(),B.msg("重置报价表")},addCustomerFile:function(){B.msg("添加客户资料")},addThisQuote:function(){N(".up-subbtn").click();var e=Object.assign(Z,J);if(null==J.userId||""==J.userId)return B.msg("请先选择客户"),!1;if(null==J.gerberName||""==J.gerberName)return B.tips("请先上传Gerber资料再添加当前报价 !","#addFile",{tips:[1,"#3595CC"],time:2e3}),!1;var t=new Object;t.A=e,t.B=E.importPCBInfo,I(t),X.totalPric==X.totalPriced&&1==X.isQuote},lookQuote:function(){var e=J.quoteConfigIds;null==R.customerAid||""==R.customerAid?B.msg("请选择对应的客户"):x.popup({title:"产看报价详情",area:["70%","85%"],btn:["确定","取消"],yes:function(e,t){B.closeAll()},success:function(t,i){var n={ids:""};n.ids=J.quoteConfigIds,T(this.id).render("marketManagement/iframeWindow/quote_detaily",n).done(function(){N("#sss").text(e),N("#sss").attr("name",e)})}})},upSubbtn:function(){if("1"==L.bordType)null==R.customerAid||""==R.customerAid?B.tips("请先选择客户 !","#selCustomer_container",{tips:[1,"#3595CC"],time:2e3}):N(".bot-subbtn").click();else if(2===L.bordType){N(".rStencilSubmit").click();var e=Object.assign(ne,ie);if(e.orderNo=N("#orderNo").val(),e.postFee=te.postFee,console.log(e),console.log("saveSMTStencil.gerberPath:"+ne.gerberPath),null==e.userId||""==e.userId)return B.msg("请先选择客户"),!1;if(null==e.gerberName||""==e.gerberName)return B.tips("请先上传Gerber资料再添加当前报价 !","#addFile",{tips:[1,"#3595CC"],time:2e3}),!1;X.totalPricS==X.totalPricedS&&1==X.isQuoteS?B.confirm("你已经添加了相同参数的报价，是否再次添加？",function(){x.req({type:"post",data:e,url:A.baseUrl+"epc/stencilorder/save",success:function(e){B.alert("钢网报价成功！"),N("#orderPN").val(e.pn),ne.productNo=e.pn}})}):(x.req({type:"post",data:e,url:A.baseUrl+"epc/stencilorder/save",success:function(e){B.alert("钢网报价成功！"),N("#orderPN").val(e.pn),ne.productNo=e.pn}}),X.totalPricS=X.totalPricedS,X.isQuoteS=!0)}else 3===L.bordType&&N(".rAssemblySubmit").click()}};M.render({elem:"#addFile",url:A.baseUrl+"sys/oss/upload/geber?access_token="+layui.data("layuiAdmin").access_token,field:"file",accept:"file",exts:"zip|rar|7z",before:function(e){e.preview(function(e,t,i){var n=t.name;J.gerberName=ne.gerberName=n,J.pcbName=ne.pcbName=D.CleanFileSuffix(n),console.log("显示的文件名为："+J.pcbName),null==N("#pcbName").val&&""==N("#pcbName").val||N("#pcbName").val(J.pcbName),C.render(null,"")})},done:function(e,t,i){B.msg("文件上传成功！");var n=e.url,a=/\[(.+?)\]/g,l=n.match(a);console.log("未处理的路径为："+l);var o=l[0].replace(/\[|]/g,"");J.gerberPath=ne.gerberPath=o,console.log("处理完的路径为："+o)},error:function(){B.msg("文件上传失败！")}});N(".layui-btn").on("click",function(){var e=N(this).data("type");fe[e]?fe[e].call(this):""}),N(".up-rsetbtn").on("click",function(){N(".bot-rsetbtn").click()}),N(".importPcbInfo>.importOrder").on("click",function(){x.popup({title:"导入pcb订单信息",area:["506px","288px"],btn:["导入","取消"],yes:function(e,t){N("#importPCBInfo").click(),B.closeAll()},success:function(e,t){T(this.id).render("marketManagement/iframeWindow/import_pcbInfoForm").done(function(){C.on("submit(importPCBInfo)",function(e){return x.req({type:"post",url:A.baseUrl+"pert/revieworder/reviewOrderInfo",data:e.field,success:function(e){var i=e.data;null!=i?(u(),p(),d(),F(i)):B.alert("当前不存在PCB参数详情！"),B.close(t)}}),!1})})}})}),N(".importPcbInfo>.importReOrder").on("click",function(){x.popup({title:"导入返单信息",area:["506px","288px"],btn:["导入","取消"],id:"popupImportReOrder",yes:function(e,t){N("#importRePCBInfo").click(),B.closeAll()},success:function(e,t){T(this.id).render("marketManagement/iframeWindow/import_pcbInfoReOreder").done(function(){C.on("submit(importRePCBInfo)",function(e){e.field;return x.req({type:"post",url:A.baseUrl+"epc/pcborder/findOrderByUidAndProductNo",data:e.field,success:function(e){var i=e.data;null!=i?F(i):B.alert("当前不存在PCB参数详情！"),B.close(t)}}),!1})})}})}),e("quote",{})});