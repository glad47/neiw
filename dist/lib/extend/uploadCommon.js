/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(function(e){var t=layui.jquery,a=(new Object,{uploadcommon:function(e,a,r,o,d,n){function l(){function l(e){a.width(e+"%"),a.find("a").text(e+"%")}function i(e){if(e.lengthComputable){var t=Math.round(e.loaded/e.total*100);l(t);var a=(new Date).getTime(),o=(a-b)/1e3;b=(new Date).getTime();var d=e.loaded-p;p=e.loaded;var n=d/o,i=n,u="bit/s";n/1024>1&&(n/=1024,u="Kb/s"),n/1024>1&&(n/=1024,u="Mb/s"),n=n.toFixed(1);var s=((e.total-e.loaded)/i).toFixed(1);r.html(n+u+"，For the rest of："+s+"s")}}function u(e){o.attr("disabled",!1);var a=e.currentTarget.status;if(401==a)return void alert("请登录后再上传");if(403==a)return void alert("无权限操作");if(200!=a)return void alert("上传异常，错误码"+a);var r=JSON.parse(e.currentTarget.response),d=r.url,l=/\[(.+?)\]/g,i=d.match(l),u=i[0].replace(/\[|]/g,"");return"0"==r.code&&null!=n&&"undefined"!=typeof n&&(n.data.gerberName=n.data.productionGerberName=n.data.quoteGerberName,n.data.gerberPath=n.data.productionGerberPath=n.data.quoteGerberPath=u,console.log(n.data),m=n.data,0===n.type?(delete n.data.quoteGerberName,delete n.data.quoteGerberPath,delete n.data.productionGerberName,delete n.data.productionGerberPath,m.isAddFile=!0):1===n.type?(delete n.data.gerberName,delete n.data.gerberPath,delete n.data.productionGerberName,delete n.data.productionGerberPath):2===n.type&&(delete n.data.quoteGerberName,delete n.data.quoteGerberPath,delete n.data.gerberName,delete n.data.gerberPath),localStorage.setItem("saveBackResult",JSON.stringify(m)),t.ajax({type:"post",url:n.url,data:n.data,success:function(e){setTimeout(function(){layer.msg("文件上传成功"),t(n.removeDom).css("display","none"),t(n.ffile).css({display:"",color:"green"}),"undefined"!=typeof n.data.quoteGerberName?t(n.ffile).text(n.data.quoteGerberName):"undefined"!=typeof n.data.gerberName?t(n.ffile).text(n.data.gerberName):"undefined"!=typeof n.data.productionGerberName&&t(n.ffile).text(n.data.productionGerberName),table.reload(n.retab)},1e3)}}),console.log(e.currentTarget.response),console.log(n)),console.log("上传成功"),m}function s(e){alert("上传处理失败"+e.target.responseText)}function c(){g.abort()}function f(e){alert("文件上传已终止:"+e.target.responseText)}var b=null,p=null,g=new XMLHttpRequest,m={},h={};console.log(a),d.click(function(){o.attr("disabled",!1),c()}),this.uploadFile=function(t){return o.attr("disabled",!0),l(0),g.open("post",e,!0),g.onloadstart=function(){console.log("开始上传"),b=(new Date).getTime(),p=0},g.upload.addEventListener("progress",i,!1),g.addEventListener("load",u,!1),g.addEventListener("error",s,!1),g.addEventListener("abort",f,!1),g.send(t),g},this.setProgressValue=function(e){a.width(e+"%"),a.find("a").text(e+"%")},this.getSaveBackData=function(){return h.aa="fuck",h}}return new l}});e("uploadCommon",a)});