/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","index"],function(e){var t=layui.jquery,n=layui.admin,r={TimeWeekage:function(e,t){var n=new Date(e).getTime()-7*t*24*60*60*1e3;return new Date(n).toLocaleDateString().replace(/\//g,"/")},TimeContrast:function(e){var n;return null!=e?(t.each(e,function(t,r){if("undefined"!=typeof r&&null!=r)var a=new Date(r.replace("-","/").replace("-","/"));if(null==n||"undefined"==typeof n)n=e[t];else{var i=new Date(n.replace("-","/").replace("-","/"));a>i&&(n=e[t])}}),n):null},ArrayClearRepeat:function(e){var n=[];if(null!=e)for(var r=0;r<e.length;r++){var a=e[r];t.inArray(a,n)==-1&&n.push(a)}return n},CleanFileSuffix:function(e){var t=e.substr((~-e.lastIndexOf(".")>>>0)+1);return e.replace(t,"")},RandomNum:function(e){for(var t="",n=0;n<e;n++)t+=Math.floor(10*Math.random());return t},CurrenCyConversion:function(e,t){var r,a;return"2"==t?(console.log("初始币种为人民币，无需转换！"),r=e):"2"!=t&&null!=t&&n.req({type:"post",async:!1,url:setter.baseUrl+"market/exchangerate/info/"+t,success:function(t){console.log(t),a=t.exchangeRate.exchangeRate,r=parseFloat(e*a).toFixed(2),console.log("转换币种为："+t.exchangeRate.currency+"\n转换率为："+t.exchangeRate.exchangeRate),console.log("初始价格为："+e+"\n转化后的价格为："+r)},error:function(e){r="请求异常， 没有获取到任何有用的信息！"}}),r},GetRequertParams:function(e){try{for(var t=e.split("?")[1],n=t.split("&"),r={},a=0;a<n.length;a++){var i=n[a].split("=");r[i[0]]=i[1]}return r}catch(o){console.log(o)}},contrastObj:function(e){var n,r,a,i,o=flagStr();return e.A.customerSysName=e.B.customerSysName,t.each(e.A,function(l,c){if(r=""==c||null==c||"none"==c,t.each(e.B,function(e,t){if(a=""==t||null==t||"none"==t,l==e){o.fd.indexOf(l),o.fdyg.indexOf(l);c==t?n=2:r&&a?n=2:(c!=t&&"-1"==o.fd.indexOf(l)||"-1"==o.fdyg.indexOf(l))&&(console.log("key值不同的q["+l+","+c+"],i["+e+","+t+"]"),o.fdyg.indexOf(l)>=0?(n=3,i=!0):n=2)}}),1==i)return!1}),console.log("orderType:===>"+n),n},getStrWidth:function(){var e=arguments[0]?arguments[0]:"",n=arguments[1]?arguments[1]:"",r=arguments[2]?arguments[2]:"",a=arguments[3]?arguments[3]:"labelText",i=arguments[4]||"body";t(i).append("<div id='"+a+"' style='color:black;line-height:1.2;white-space:nowrap;top:0px;left:0px;position:fixed;display:block;visibility:visible;'>");var o=t("#"+a);o.css({"font-size":r,"font-family":n}).html(e);var l={width:o.width(),height:o.height()};return o.remove(),l},getBracketStr:function(e){var t=/\[(.+?)\]/g,n=t.exec(e);return n?n:["当前不存在id"]},checkArrayObjRepeat:function(e,t){for(var n=0;n<e.length;n++)if(delete e[n].LAY_TABLE_INDEX,delete t[n].LAY_TABLE_INDEX,this.isObjectValueEqual(e[n],t))return!1},isObjectValueEqual:function(e,t){var n=Object.getOwnPropertyNames(e),r=Object.getOwnPropertyNames(t);if(n.length!=r.length)return!1;for(var a=0;a<n.length;a++){var i=n[a];if(e[i]!==t[i])return!1}return!0},throttle:function(e,t,n,r,a){clearTimeout(e.timer),e._cur=Date.now(),e._start||(e._start=e._cur),e._cur-e._start>a?(e.call(t,r),e._start=e._cur):e.timer=setTimeout(function(){e.call(t,r)},n)}};e("jsTools",r)});