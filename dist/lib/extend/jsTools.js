/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","index"],function(e){var n=layui.jquery,r=layui.admin,a={TimeContrast:function(e){var r;return null!=e?(n.each(e,function(n,a){if("undefined"!=typeof a&&null!=a)var t=new Date(a.replace("-","/").replace("-","/"));if(null==r||"undefined"==typeof r)r=e[n];else{var l=new Date(r.replace("-","/").replace("-","/"));t>l&&(r=e[n])}}),r):null},ArrayClearRepeat:function(e){var r=[];if(null!=e)for(var a=0;a<e.length;a++){var t=e[a];n.inArray(t,r)==-1&&r.push(t)}return r},CleanFileSuffix:function(e){var n=e.substr((~-e.lastIndexOf(".")>>>0)+1);return e.replace(n,"")},RandomNum:function(e){for(var n="",r=0;r<e;r++)n+=Math.floor(10*Math.random());return n},CurrenCyConversion:function(e,n){var a,t;return"2"==n?(console.log("初始币种为人民币，无需转换！"),a=e):"2"!=n&&null!=n&&r.req({type:"post",async:!1,url:setter.baseUrl+"market/exchangerate/info/"+n,success:function(n){console.log(n),t=n.exchangeRate.exchangeRate,a=parseFloat(e*t).toFixed(2),console.log("转换币种为："+n.exchangeRate.currency+"\n转换率为："+n.exchangeRate.exchangeRate),console.log("初始价格为："+e+"\n转化后的价格为："+a)},error:function(e){a="请求异常， 没有获取到任何有用的信息！"}}),a}};e("jsTools",a)});