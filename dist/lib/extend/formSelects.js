/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";function _typeof2(e){"@babel/helpers - typeof";return(_typeof2="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var _typeof="function"==typeof Symbol&&"symbol"===_typeof2(Symbol.iterator)?function(e){return _typeof2(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":_typeof2(e)};!function(e,t,n){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=n():"function"==typeof define&&define.amd?define(n):t.layui&&e.define?e.define(["jquery"],function(e){e("formSelects",n())}):t.formSelects=n()}("undefined"==typeof layui?null:layui,window,function(){var e="4.0.0.0910",t="xm-select",n="xm-select-parent",i="xm-select-input",a="xm-select--suffix",r="xm-select-this",o="xm-select-label",l="xm-select-search",s="xm-select-search-type",d="xm-select-show-count",c="xm-select-create",f="xm-select-create-long",u="xm-select-max",p="xm-select-skin",h="xm-select-direction",v="xm-select-height",m="xm-dis-disabled",y="xm-select-dis",g="xm-select-temp",x="xm-select-radio",k="xm-select-linkage",b="xm-select-dl",C="xm-select-hide",w="xm-hide-input",S="xm-select-sj",T="xm-select-title",L="xm-form-select",j="xm-form-selected",A="xm-select-none",E="xm-select-empty",N="xm-input",D="xm-dl-input",H="xm-select-tips",_="xm-iconfont",F="XM_PID_VALUE",O="xm-cz",I="xm-cz-group",P="请选择",V={},U={on:{},endOn:{},filter:{},maxTips:{},opened:{},closed:{}},M={type:"get",header:{},first:!0,data:{},searchUrl:"",searchName:"keyword",searchVal:null,keyName:"name",keyVal:"value",keySel:"selected",keyDis:"disabled",keyChildren:"children",dataType:"",delay:500,beforeSuccess:null,success:null,error:null,beforeSearch:null,response:{statusCode:0,statusName:"code",msgName:"msg",dataName:"data"},tree:{nextClick:function(e,t,n){n([])},folderChoose:!0,lazy:!0}},W=[{icon:"xm-iconfont icon-quanxuan",name:"全选",click:function(e,t){t.selectAll(e,!0,!0)}},{icon:"xm-iconfont icon-qingkong",name:"清空",click:function(e,t){t.removeAll(e,!0,!0)}},{icon:"xm-iconfont icon-fanxuan",name:"反选",click:function(e,t){t.reverse(e,!0,!0)}},{icon:"xm-iconfont icon-pifu",name:"换肤",click:function(e,t){t.skin(e)}}],J=window.$||window.layui&&window.layui.jquery,B=J(window),R={},q={},z={},X=function(e){var n=this;this.config={name:null,max:null,maxTips:function(e,i,a,r){var o=J('[xid="'+n.config.name+'"]').prev().find("."+t);o.parents(".layui-form-item[pane]").length&&(o=o.parents(".layui-form-item[pane]")),o.attr("style","border-color: red !important"),setTimeout(function(){o.removeAttr("style")},300)},init:null,on:null,opened:null,closed:null,filter:function(e,t,n,i){return n.name.toLowerCase().indexOf(t.toLowerCase())==-1},clearid:-1,direction:"auto",height:null,isEmpty:!1,btns:[W[0],W[1],W[2]],searchType:0,create:function(e,t){return Date.now()},template:function(e,t){return t.name},showCount:0,isCreate:!1,placeholder:P,clearInput:!1},this.select=null,this.values=[],J.extend(this.config,e,{searchUrl:e.isSearch?e.searchUrl:null,placeholder:e.optionsFirst?e.optionsFirst.value?P:e.optionsFirst.innerHTML||P:P,btns:e.radio?[W[1]]:[W[0],W[1],W[2]]},z[e.name]||q),(isNaN(this.config.showCount)||this.config.showCount<=0)&&(this.config.showCount=19921012)},Q=function(){this.appender(),this.on(),this.onreset()};Q.prototype.appender=function(){Array.prototype.map||(Array.prototype.map=function(e,t){var n,i,a,r=Object(this),o=r.length>>>0;for(t&&(n=t),i=new Array(o),a=0;a<o;){var l,s;a in r&&(l=r[a],s=e.call(n,l,a,r),i[a]=s),a++}return i}),Array.prototype.forEach||(Array.prototype.forEach=function(e,t){var n,i;if(null==this)throw new TypeError("this is null or not defined");var a=Object(this),r=a.length>>>0;if("function"!=typeof e)throw new TypeError(e+" is not a function");for(arguments.length>1&&(n=t),i=0;i<r;){var o;i in a&&(o=a[i],e.call(n,o,i,a)),i++}}),Array.prototype.filter||(Array.prototype.filter=function(e){if(void 0===this||null===this)throw new TypeError;var t=Object(this),n=t.length>>>0;if("function"!=typeof e)throw new TypeError;for(var i=[],a=arguments[1],r=0;r<n;r++)if(r in t){var o=t[r];e.call(a,o,r,t)&&i.push(o)}return i})},Q.prototype.init=function(e){var r=this;J(e?e:"select["+t+"]").each(function(e,f){var m=J(f),g=m.attr(t),k=m.next(".layui-form-select"),C=m.next("."+n),j={name:g,disabled:f.disabled,max:m.attr(u)-0,isSearch:void 0!=m.attr(l),searchUrl:m.attr(l),isCreate:void 0!=m.attr(c),radio:void 0!=m.attr(x),skin:m.attr(p),direction:m.attr(h),optionsFirst:f.options[0],height:m.attr(v),formname:m.attr("name")||m.attr("_name"),layverify:m.attr("lay-verify")||m.attr("_lay-verify"),layverType:m.attr("lay-verType"),searchType:"dl"==m.attr(s)?1:0,showCount:m.attr(d)-0},A=m.find("option[selected]").toArray().map(function(e){return{name:e.innerHTML,value:e.value}}),E=new X(j);E.values=A,E.config.init?(E.values=E.config.init.map(function(e){return"object"==("undefined"==typeof e?"undefined":_typeof(e))?e:{name:m.find('option[value="'+e+'"]').text(),value:e}}).filter(function(e){return e.name}),E.config.init=E.values.concat([])):E.config.init=A.concat([]),!E.values&&(E.values=[]),V[g]=E,k[0]&&k.remove(),C[0]&&C.remove();var H=r.renderSelect(g,E.config.placeholder,f),_=E.config.height&&"auto"!=E.config.height?'xm-hg style="height: 34px;"':"",F=['<div class="'+o+'">','<input type="text" fsw class="'+N+" "+i+'" '+(E.config.isSearch?"":'style="display: none;"')+' autocomplete="off" debounce="0" />',"</div>"],O=J('<div class="'+L+'" '+p+'="'+E.config.skin+'">\n\t\t\t\t\t<input class="'+w+'" value="" name="'+E.config.formname+'" lay-verify="'+E.config.layverify+'" lay-verType="'+E.config.layverType+'" type="text" style="position: absolute;bottom: 0; z-index: -1;width: 100%; height: 100%; border: none; opacity: 0;"/>\n\t\t\t\t\t<div class="'+T+" "+(E.config.disabled?y:"")+'">\n\t\t\t\t\t\t<div class="'+N+" "+t+'" '+_+">\n\t\t\t\t\t\t\t"+F.join("")+'\n\t\t\t\t\t\t\t<i class="'+S+'"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="'+a+'">\n\t\t\t\t\t\t\t<input type="text" autocomplete="off" placeholder="'+E.config.placeholder+'" readonly="readonly" unselectable="on" class="'+N+'">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<dl xid="'+g+'" class="'+b+" "+(E.config.radio?x:"")+'">'+H+"</dl>\n\t\t\t\t</div>"),I=J('<div class="'+n+'" FS_ID="'+g+'"></div>');I.append(O),m.after(I),m.attr("lay-ignore",""),m.removeAttr("name")&&m.attr("_name",E.config.formname),m.removeAttr("lay-verify")&&m.attr("_lay-verify",E.config.layverify),E.config.isSearch?(R[g]=J.extend({},M,{searchUrl:E.config.searchUrl},R[g]),J(document).on("input","div."+n+'[FS_ID="'+g+'"] .'+i,function(e){r.search(g,e,E.config.searchUrl)}),E.config.searchUrl&&r.triggerSearch(O,!0)):O.find("dl dd."+D).css("display","none")})},Q.prototype.search=function(e,t,n,i){var a=this,r=void 0;if(i)r=i;else{r=t.target;var o=t.keyCode;if(9===o||13===o||37===o||38===o||39===o||40===o)return!1}var l=J.trim(r.value);this.changePlaceHolder(J(r));var s=R[e]?R[e]:M;n=s.searchUrl||n;var d=V[e],c=d.config.isCreate,f=J('dl[xid="'+e+'"]').parents("."+L);if(n){if(s.searchVal&&(l=s.searchVal,s.searchVal=""),!s.beforeSearch||s.beforeSearch&&s.beforeSearch instanceof Function&&s.beforeSearch(e,n,l)){var u=s.delay;s.first&&(s.first=!1,u=10),clearTimeout(d.clearid),d.clearid=setTimeout(function(){f.find("dl > *:not(."+H+")").remove(),f.find("dd."+A).addClass(E).text("请求中"),a.ajax(e,n,l,!1,null,!0)},u)}}else{f.find("dl ."+C).removeClass(C),f.find("dl dd:not(."+H+")").each(function(t,n){var i=J(n),r=U.filter[e]||V[e].config.filter;r&&1==r(e,l,a.getItem(e,i),i.hasClass(m))&&i.addClass(C)}),f.find("dl dt").each(function(e,t){J(t).nextUntil("dt",":not(."+C+")").length||J(t).addClass(C)}),this.create(e,c,l);var p=f.find("dl dd:not(."+H+"):not(."+C+")");p.length?f.find("dd."+A).removeClass(E):f.find("dd."+A).addClass(E).text("无匹配项")}},Q.prototype.isArray=function(e){return"[object Array]"==Object.prototype.toString.call(e)},Q.prototype.triggerSearch=function(e,t){var n=this;(e?[e]:J("."+L).toArray()).forEach(function(e,a){e=J(e);var r=e.find("dl").attr("xid");(r&&V[r]&&V[r].config.isEmpty||t)&&n.search(r,null,null,0==V[r].config.searchType?e.find("."+o+" ."+i):e.find("dl ."+D+" ."+i))})},Q.prototype.clearInput=function(e){var t=J("."+n+'[fs_id="'+e+'"]'),a=0==V[e].config.searchType?t.find("."+o+" ."+i):t.find("dl ."+D+" ."+i);a.val("")},Q.prototype.ajax=function(e,t,i,a,r,o,l,s){var d=this,c=J("."+n+' dl[xid="'+e+'"]').parents("."+L);if(c[0]&&t){var f=R[e]?R[e]:M,u=J.extend(!0,{},f.data);u[f.searchName]=i,J.ajax({type:f.type,headers:f.header,url:t,data:"json"==f.dataType?JSON.stringify(u):u,success:function(n){if("string"==typeof n&&(n=JSON.parse(n)),f.beforeSuccess&&f.beforeSuccess instanceof Function&&(n=f.beforeSuccess(e,t,i,n)),d.isArray(n)){var u={};u[f.response.statusName]=f.response.statusCode,u[f.response.msgName]="",u[f.response.dataName]=n,n=u}n[f.response.statusName]!=f.response.statusCode?c.find("dd."+A).addClass(E).text(n[f.response.msgName]):(c.find("dd."+A).removeClass(E),d.renderData(e,n[f.response.dataName],a,r,o,s),V[e].config.isEmpty=0==n[f.response.dataName].length),l&&l(e),f.success&&f.success instanceof Function&&f.success(e,t,i,n)},error:function(n){c.find("dd[lay-value]:not(."+H+")").remove(),c.find("dd."+A).addClass(E).text("服务异常"),f.error&&f.error instanceof Function&&f.error(e,t,i,n)}})}},Q.prototype.renderData=function(e,t,i,l,s,d){var c=this;if(i)return void this.renderLinkage(e,t,l);if(d)return void this.renderReplace(e,t);var f=J("."+n+' dl[xid="'+e+'"]').parents("."+L),u=R[e]?R[e]:M,p=f.find("."+a+" input");t=this.exchangeData(e,t);var h=[];f.find("dl").html(this.renderSelect(e,p.attr("placeholder")||p.attr("back"),t.map(function(e){var t=J.extend({},e,{innerHTML:e[u.keyName],value:e[u.keyVal],sel:e[u.keySel],disabled:e[u.keyDis],type:e.type,name:e[u.keyName]});return t.sel&&h.push(t),t})));var v=f.find("."+o),m=f.find("dl[xid]");if(s){var y=V[e].values;y.forEach(function(e,t){m.find('dd[lay-value="'+e.value+'"]').addClass(r)}),h.forEach(function(t,n){c.indexOf(y,t)==-1&&(c.addLabel(e,v,t),m.find('dd[lay-value="'+t.value+'"]').addClass(r),y.push(t))})}else h.forEach(function(t,n){c.addLabel(e,v,t),m.find('dd[lay-value="'+t.value+'"]').addClass(r)}),V[e].values=h;this.commonHandler(e,v)},Q.prototype.renderLinkage=function(e,t,a){var r=[],o=0,l={0:t},s=R[e]?R[e]:M;Y[e]={};var d=function(){var t=r[o++]=[],n=l;l={},J.each(n,function(n,i){J.each(i,function(i,a){var r={pid:n,name:a[s.keyName],value:a[s.keyVal]};Y[e][r.value]=J.extend(a,r),t.push(r);var o=a[s.keyChildren];o&&o.length&&(l[r.value]=o)})})};do d();while(Object.getOwnPropertyNames(l).length);var c=J("."+n+' dl[xid="'+e+'"]').parents("."+L),f=['<div class="xm-select-linkage">'];J.each(r,function(e,t){var n=['<div style="left: '+(a-0)*e+'px;" class="xm-select-linkage-group xm-select-linkage-group'+(e+1)+" "+(0!=e?"xm-select-linkage-hide":"")+'">'];J.each(t,function(e,t){var i='<li title="'+t.name+'" pid="'+t.pid+'" xm-value="'+t.value+'"><span>'+t.name+"</span></li>";n.push(i)}),n.push("</div>"),f=f.concat(n)}),f.push('<div style="clear: both; height: 288px;"></div>'),f.push("</div>"),c.find("dl").html(f.join("")),c.find("."+i).css("display","none")},Q.prototype.renderReplace=function(e,t){var i=this,a=J("."+n+' dl[xid="'+e+'"]'),r=R[e]?R[e]:M;t=this.exchangeData(e,t),Y[e]=t;var o=t.map(function(t){var n=J.extend({},t,{innerHTML:t[r.keyName],value:t[r.keyVal],sel:t[r.keySel],disabled:t[r.keyDis],type:t.type,name:t[r.keyName]});return i.createDD(e,n)}).join("");a.find("dd:not(."+H+"),dt:not([style])").remove(),a.find("dt[style]").after(J(o))},Q.prototype.exchangeData=function(e,t){var n=R[e]?R[e]:M,i=n.keyChildren,a=n.keyDis;Y[e]={};var r=this.getChildrenList(t,i,a,[],!1);return r},Q.prototype.getChildrenList=function(e,t,n,i,a){for(var r=[],o=0,l=0;l<e.length;l++){var s=e[l];if(s.type&&"optgroup"==s.type)r.push(s);else{o++;var d=i.concat([]);d.push(o-1+"_E"),s[F]=JSON.stringify(d),s[n]=s[n]||a,r.push(s);var c=s[t];if(c&&G.isArray(c)&&c.length){s.XM_TREE_FOLDER=!0;var f=d.concat([]),u=this.getChildrenList(c,t,n,f,s[n]);r=r.concat(u)}}}return r},Q.prototype.create=function(e,t,n){if(t&&n){var i=V[e],a=J('[xid="'+e+'"]'),r=a.find("dd."+H+"."+D),o=null,l=a.find("dd."+g);if(a.find("dd:not(."+H+"):not(."+g+")").each(function(e,t){n==J(t).find("span").attr("name")&&(o=t)}),!o){var s=i.config.create(e,n);l[0]?(l.attr("lay-value",s),l.find("span").text(n),l.find("span").attr("name",n),l.removeClass(C)):r.after(J(this.createDD(e,{name:n,innerHTML:n,value:s},g+" "+f)))}}else J("[xid="+e+"] dd."+g).remove()},Q.prototype.createDD=function(e,t,n){var i=R[e]?R[e]:M,a=J.trim(t.innerHTML);Y[e][t.value]=J(t).is("option")?t=function(){var e={};return e[i.keyName]=a,e[i.keyVal]=t.value,e[i.keyDis]=t.disabled,e}():t;var r=V[e].config.template(e,t),o=t[F];o=o?JSON.parse(o):[-1];var l=o[0]==-1?"":'tree-id="'+o.join("-")+'" tree-folder="'+!!t.XM_TREE_FOLDER+'"';return'<dd lay-value="'+t.value+'" class="'+(t.disabled?m:"")+" "+(n?n:"")+'" '+l+'>\n\t\t\t\t\t<div class="xm-unselect xm-form-checkbox '+(t.disabled?m:"")+'"  style="margin-left: '+30*(o.length-1)+'px">\n\t\t\t\t\t\t<i class="'+_+'"></i>\n\t\t\t\t\t\t<span name="'+a+'">'+r+"</span>\n\t\t\t\t\t</div>\n\t\t\t\t</dd>"},Q.prototype.createQuickBtn=function(e,t){return'<div class="'+O+'" method="'+e.name+'" title="'+e.name+'" '+(t?'style="margin-right: '+t+'"':"")+'><i class="'+e.icon+'"></i><span>'+e.name+"</span></div>"},Q.prototype.renderBtns=function(e,t,n){var i=this,a=[],r=J('dl[xid="'+e+'"]');return a.push('<div class="'+I+'" show="'+t+'" style="max-width: '+(r.prev().width()-54)+'px;">'),J.each(V[e].config.btns,function(e,t){a.push(i.createQuickBtn(t,n))}),a.push("</div>"),a.push(this.createQuickBtn({icon:"xm-iconfont icon-caidan",name:""})),a.join("")},Q.prototype.renderSelect=function(e,t,n){var a=this;Y[e]={};var r=[];return V[e].config.btns.length?(setTimeout(function(){var t=J('dl[xid="'+e+'"]');t.parents("."+L).attr(s,V[e].config.searchType),t.find("."+I).css("max-width",t.prev().width()-54+"px")},10),r.push(['<dd lay-value="" class="'+H+'" style="background-color: #FFF!important;">',this.renderBtns(e,null,"30px"),"</dd>",'<dd lay-value="" class="'+H+" "+D+'" style="background-color: #FFF!important;">','<i class="xm-iconfont icon-sousuo"></i>','<input type="text" class="'+N+" "+i+'" placeholder="请搜索"/>',"</dd>"].join(""))):r.push('<dd lay-value="" class="'+H+'">'+t+"</dd>"),this.isArray(n)?J(n).each(function(t,n){n&&(n.type&&"optgroup"===n.type?r.push("<dt>"+n.name+"</dt>"):r.push(a.createDD(e,n)))}):J(n).find("*").each(function(t,n){("option"!=n.tagName.toLowerCase()||0!=t||n.value)&&("optgroup"===n.tagName.toLowerCase()?r.push("<dt>"+n.label+"</dt>"):r.push(a.createDD(e,n)))}),r.push('<dt style="display:none;"> </dt>'),r.push('<dd class="'+H+" "+A+" "+(2===r.length?E:"")+'">没有选项</dd>'),r.join("")},Q.prototype.on=function(){var e=this;this.one(),J(document).on("click",function(t){J(t.target).parents("."+T)[0]||(J("."+n+" dl ."+C).removeClass(C),J("."+n+" dl dd."+E).removeClass(E),J("."+n+" dl dd."+g).remove(),J.each(V,function(t,n){e.clearInput(t),n.values.length||e.changePlaceHolder(J('div[FS_ID="'+t+'"] .'+o))})),J("."+n+" ."+j).each(function(t,n){e.changeShow(J(n).find("."+T),!1)})})},Q.prototype.calcLabelLeft=function(e,t,n){var i=this.getPosition(e[0]);i.y=i.x+e[0].clientWidth;var a=e[0].offsetLeft;if(e.find("span").length)if(n){var r=e.find("span:last");r="none"==r.css("display")?r.prev()[0]:r[0];var o=this.getPosition(r);o.y=o.x+r.clientWidth,a=o.y>i.y?a-(o.y-i.y)-5:0}else if(t<0){var l=e.find(":last");l="none"==l.css("display")?l.prev()[0]:l[0];var s=this.getPosition(l);s.y=s.x+l.clientWidth,s.y>i.y&&(a-=10)}else a<0&&(a+=10),a>0&&(a=0);else a=0;e.css("left",a+"px")},Q.prototype.one=function(e){var n=this;J(e?e:document).off("click","."+T).on("click","."+T,function(e){var a=J(e.target),r=a.is(T)?a:a.parents("."+T),o=r.next(),l=o.attr("xid");if(J("dl[xid]").not(o).each(function(e,t){n.clearInput(J(t).attr("xid"))}),J("dl[xid]").not(o).find("dd."+C).removeClass(C),r.hasClass(y))return!1;if(a.is("."+S)||a.is("."+i+"[readonly]"))return n.changeShow(r,!r.parents("."+L).hasClass(j)),!1;if(r.find("."+i+":not(readonly)")[0]){var s=r.find("."+i),d={x:e.pageX,y:e.pageY},c=n.getPosition(r[0]);for(r.width();d.x>c.x;){if(J(document.elementFromPoint(d.x,d.y)).is(s))return s.focus(),n.changeShow(r,!0),!1;d.x-=50}}if(a.is("."+i))return n.changeShow(r,!0),!1;if(a.is('i[fsw="'+t+'"]')){var f=n.getItem(l,a),u=o.find("dd[lay-value='"+f.value+"']");return!u.hasClass(m)&&(n.handlerLabel(l,u,!1,f),!1)}return n.changeShow(r,!r.parents("."+L).hasClass(j)),!1}),J(e?e:document).off("click","dl."+b).on("click","dl."+b,function(e){var t=J(e.target);if(t.is("."+k)||t.parents("."+k)[0]){t=t.is("li")?t:t.parents("li[xm-value]");var i=t.parents(".xm-select-linkage-group"),a=t.parents("dl").attr("xid");if(!a)return!1;i.find(".xm-select-active").removeClass("xm-select-active"),t.addClass("xm-select-active"),i.nextAll(".xm-select-linkage-group").addClass("xm-select-linkage-hide");var o=i.next(".xm-select-linkage-group");if(o.find("li").addClass("xm-select-linkage-hide"),o.find('li[pid="'+t.attr("xm-value")+'"]').removeClass("xm-select-linkage-hide"),o[0]&&0!=o.find("li:not(.xm-select-linkage-hide)").length)o.removeClass("xm-select-linkage-hide");else{var l=[],s=0,d=!t.hasClass("xm-select-this");V[a].config.radio&&t.parents(".xm-select-linkage").find(".xm-select-this").removeClass("xm-select-this");do l[s++]={name:t.find("span").text(),value:t.attr("xm-value")},t=t.parents(".xm-select-linkage-group").prev().find('li[xm-value="'+t.attr("pid")+'"]');while(t.length);l.reverse();var c={name:l.map(function(e){return e.name}).join("/"),value:l.map(function(e){return e.value}).join("/")};n.handlerLabel(a,null,d,c)}return!1}if(t.is("dl"))return!1;if(t.is("dt"))return t.nextUntil("dt").each(function(e,t){t=J(t),t.hasClass(m)||t.hasClass(r)||t.find("i:not(.icon-expand)").click()}),!1;var f=t.is("dd")?t:t.parents("dd"),u=f.parent("dl").attr("xid");if(f.hasClass(m))return!1;if(t.is("i.icon-caidan")){var p=[],h=[];t.parents("dl").find('dd[tree-folder="true"]').each(function(e,t){void 0==J(t).attr("xm-tree-hidn")?p.push(t):h.push(t)});var v=h.length?h:p;return v.forEach(function(e){return e.click()}),!1}var y=f.attr("tree-id");if(y){if(t.is("i:not(.icon-expand)"))return n.handlerLabel(u,f,!f.hasClass(r)),!1;var g=R[u]||M,x=g.tree,b=f.nextAll('dd[tree-id^="'+y+'"]');if(b&&b.length){var C=b[0].clientHeight;return C?(n.addTreeHeight(f,C),C=0):(C=f.attr("xm-tree-hidn")||36,f.removeAttr("xm-tree-hidn"),f.find(">i").remove(),b=b.filter(function(e,t){return J(t).attr("tree-id").split("-").length-1==y.split("-").length})),b.animate({height:C},150),!1}if(x.nextClick&&x.nextClick instanceof Function)return x.nextClick(u,n.getItem(u,f),function(e){if(e&&e.length){f.attr("tree-folder","true");var t=[];e.forEach(function(e,i){e.innerHTML=e[g.keyName],e[F]=JSON.stringify(y.split("-").concat([i])),t.push(n.createDD(u,e)),Y[u][e[g.keyVal]]=e}),f.after(t.join(""))}else n.handlerLabel(u,f,!f.hasClass(r))}),!1}if(f.hasClass(H)){var w=t.is("."+O)?t:t.parents("."+O);if(!w[0])return!1;var S=w.attr("method"),T=V[u].config.btns.filter(function(e){return e.name==S})[0];return T&&T.click&&T.click instanceof Function&&T.click(u,n),!1}return n.handlerLabel(u,f,!f.hasClass(r)),!1})},Q.prototype.addTreeHeight=function(e,t){var n=this,i=e.attr("tree-id"),a=e.nextAll('dd[tree-id^="'+i+'"]');a.length&&(e.append('<i class="xm-iconfont icon-expand"></i>'),e.attr("xm-tree-hidn",t),a.each(function(e,i){var a=J(i);n.addTreeHeight(a,t)}))};var Y={};Q.prototype.getItem=function(e,n){if(n instanceof J){if(n.is('i[fsw="'+t+'"]')){var i=n.parent();return Y[e][n]||{name:i.find("font").text(),value:i.attr("value")}}var a=n.attr("lay-value");return Y[e][a]?Y[e][a]:Y[e][a]={name:n.find("span[name]").attr("name"),value:a}}return"string"==typeof n&&n.indexOf("/")!=-1?Y[e][n]||{name:this.valToName(e,n),value:n}:Y[e][n]},Q.prototype.linkageAdd=function(e,t){var n=J('dl[xid="'+e+'"]');n.find(".xm-select-active").removeClass("xm-select-active");var i=t.value.split("/"),a=void 0,r=void 0,o=0,l=[];do a=i[o],r=n.find(".xm-select-linkage-group"+(o+1)+' li[xm-value="'+a+'"]'),r[0]&&l.push(r),o++;while(r.length&&void 0!=a);l.length==i.length&&J.each(l,function(e,t){t.addClass("xm-select-this")})},Q.prototype.linkageDel=function(e,t){var n=J('dl[xid="'+e+'"]'),i=t.value.split("/"),a=void 0,r=void 0,o=i.length-1;do a=i[o],r=n.find(".xm-select-linkage-group"+(o+1)+' li[xm-value="'+a+'"]'),r.parent().next().find("li[pid="+a+"].xm-select-this").length||r.removeClass("xm-select-this"),o--;while(r.length&&void 0!=a)},Q.prototype.valToName=function(e,t){var n=J('dl[xid="'+e+'"]'),i=(t+"").split("/");if(!i.length)return null;var a=[];return J.each(i,function(e,t){var i=n.find(".xm-select-linkage-group"+(e+1)+' li[xm-value="'+t+'"] span').text();a.push(i)}),a.length==i.length?a.join("/"):null},Q.prototype.commonHandler=function(e,n){n&&n[0]&&(this.checkHideSpan(e,n),this.changePlaceHolder(n),this.retop(n.parents("."+L)),this.calcLabelLeft(n,0,!0),this.setHidnVal(e,n),n.parents("."+T+" ."+t).attr("title",V[e].values.map(function(e){return e.name}).join(",")))},Q.prototype.initVal=function(e){var t=this,n={};e?n[e]=V[e]:n=V,J.each(n,function(e,n){var i=n.values,a=J('dl[xid="'+e+'"]').parent(),l=a.find("."+o),s=a.find("dl");s.find("dd."+r).removeClass(r);var d=i.concat([]);d.concat([]).forEach(function(n,i){t.addLabel(e,l,n),s.find('dd[lay-value="'+n.value+'"]').addClass(r)}),n.config.radio&&d.length&&i.push(d[d.length-1]),t.commonHandler(e,l)})},Q.prototype.setHidnVal=function(e,t){t&&t[0]&&t.parents("."+n).find("."+w).val(V[e].values.map(function(e){return e.value}).join(","))},Q.prototype.handlerLabel=function(e,t,n,i,a){var l=J('[xid="'+e+'"]').prev().find("."+o),s=t&&this.getItem(e,t),d=V[e].values,c=V[e].config.on||U.on[e],f=V[e].config.endOn||U.endOn[e];i&&(s=i);var u=V[e];if(n&&u.config.max&&u.values.length>=u.config.max){var p=U.maxTips[e]||V[e].config.maxTips;return void(p&&p(e,d.concat([]),s,u.config.max))}if(!(!a&&c&&c instanceof Function&&0==c(e,d.concat([]),s,n,t&&t.hasClass(m)))){var h=J('dl[xid="'+e+'"]');n?(t&&t[0]?(t.addClass(r),t.removeClass(g)):h.find(".xm-select-linkage")[0]&&this.linkageAdd(e,s),this.addLabel(e,l,s),d.push(s)):(t&&t[0]?t.removeClass(r):h.find(".xm-select-linkage")[0]&&this.linkageDel(e,s),this.delLabel(e,l,s),this.remove(d,s)),l[0]&&(u.config.radio&&this.changeShow(l,!1),l.parents("."+T).prev().removeClass("layui-form-danger"),u.config.clearInput&&this.clearInput(e),this.commonHandler(e,l),!a&&f&&f instanceof Function&&f(e,d.concat([]),s,n,t&&t.hasClass(m)))}},Q.prototype.addLabel=function(e,n,i){if(i){var a='fsw="'+t+'"',o=[J("<span "+a+' value="'+i.value+'"><font '+a+">"+i.name+"</font></span>"),J("<i "+a+' class="xm-iconfont icon-close"></i>')],l=o[0],s=o[1];l.append(s);var d=V[e];d.config.radio&&(d.values.length=0,J('dl[xid="'+e+'"]').find("dd."+r+':not([lay-value="'+i.value+'"])').removeClass(r),n.find("span").remove()),n.find("input").css("width","50px"),n.find("input").before(l)}},Q.prototype.delLabel=function(e,t,n){n&&t.find('span[value="'+n.value+'"]:first').remove()},Q.prototype.checkHideSpan=function(e,n){n.parents("."+t)[0].offsetHeight+5;n.find("span.xm-span-hide").removeClass("xm-span-hide"),n.find("span[style]").remove();var i=V[e].config.showCount;n.find("span").each(function(e,t){e>=i&&J(t).addClass("xm-span-hide")});var a=n.find("span:eq("+i+")");a[0]&&a.before(J('<span style="padding-right: 6px;" fsw="'+t+'"> + '+(n.find("span").length-i)+"</span>"))},Q.prototype.retop=function(e){var n=e.find("dl"),i=e.offset().top+e.outerHeight()+5-B.scrollTop(),a=n.outerHeight(),r=e.hasClass("layui-form-selectup")||n.css("top").indexOf("-")!=-1||i+a>B.height()&&i>=a;e=e.find("."+t);var o=V[n.attr("xid")],l=n.parents(".layui-form-pane")[0]&&n.prev()[0].clientHeight>38?14:10;(o&&"up"==o.config.direction||r)&&(r=!0,o&&"down"==o.config.direction&&(r=!1));var s=e[0].offsetTop+e.height()+l;r?n.css({top:"auto",bottom:s+3+"px"}):n.css({top:s+"px",bottom:"auto"})},Q.prototype.changeShow=function(e,t){J(".layui-form-selected").removeClass("layui-form-selected");var a=e.parents("."+L),r=a.hasClass(j),l=a.find("dl").attr("xid");if(J("."+n+" ."+L).not(a).removeClass(j),t?(this.retop(a),a.addClass(j),a.find("."+i).focus(),a.find("dl dd[lay-value]:not(."+H+")").length||a.find("dl ."+A).addClass(E)):(a.removeClass(j),this.clearInput(l),a.find("dl ."+E).removeClass(E),a.find("dl dd."+C).removeClass(C),a.find("dl dd."+g).remove(),l&&V[l]&&V[l].config.isEmpty&&this.triggerSearch(a),this.changePlaceHolder(a.find("."+o))),t!=r){var s=V[l].config.opened||U.opened[l];t&&s&&s instanceof Function&&s(l);var d=V[l].config.closed||U.closed[l];!t&&d&&d instanceof Function&&d(l)}},Q.prototype.changePlaceHolder=function(e){var r=e.parents("."+T);if(r[0]||(r=e.parents("dl").prev()),r[0]){var o=e.parents("."+n).find("dl[xid]").attr("xid");if(V[o]&&V[o].config.height);else{var l=r.find("."+t)[0].clientHeight;r.css("height",(l>36?l+4:l)+"px");var s=r.parents("."+n).parent().prev();s.is(".layui-form-label")&&r.parents(".layui-form-pane")[0]&&(l=l>36?l+4:l,r.css("height",l+"px"),s.css({height:l+2+"px",lineHeight:l-18+"px"}))}var d=r.find("."+a+" input"),c=!e.find("span:last")[0]&&!r.find("."+i).val();if(c){var f=d.attr("back");d.removeAttr("back"),d.attr("placeholder",f)}else{var u=d.attr("placeholder");d.removeAttr("placeholder"),d.attr("back",u)}}},Q.prototype.indexOf=function(e,t){for(var n=0;n<e.length;n++)if(e[n].value==t||e[n].value==(t?t.value:t)||e[n]==t||JSON.stringify(e[n])==JSON.stringify(t))return n;return-1},Q.prototype.remove=function(e,t){var n=this.indexOf(e,t?t.value:t);return n>-1&&(e.splice(n,1),!0)},Q.prototype.selectAll=function(e,t,n){var i=this,a=J('[xid="'+e+'"]');a[0]&&(a.find(".xm-select-linkage")[0]||a.find("dd[lay-value]:not(."+H+"):not(."+r+")"+(n?":not(."+m+")":"")).each(function(n,r){r=J(r);var o=i.getItem(e,r);i.handlerLabel(e,a.find('dd[lay-value="'+o.value+'"]'),!0,o,!t)}))},Q.prototype.removeAll=function(e,t,n){var i=this,a=J('[xid="'+e+'"]');if(a[0])return a.find(".xm-select-linkage")[0]?void V[e].values.concat([]).forEach(function(e,t){var n=e.value.split("/"),i=void 0,r=void 0,o=0;do i=n[o++],r=a.find(".xm-select-linkage-group"+o+':not(.xm-select-linkage-hide) li[xm-value="'+i+'"]'),r.click();while(r.length&&void 0!=i)}):void V[e].values.concat([]).forEach(function(r,o){n&&a.find('dd[lay-value="'+r.value+'"]').hasClass(m)||i.handlerLabel(e,a.find('dd[lay-value="'+r.value+'"]'),!1,r,!t)})},Q.prototype.reverse=function(e,t,n){var i=this,a=J('[xid="'+e+'"]');a[0]&&(a.find(".xm-select-linkage")[0]||a.find("dd[lay-value]:not(."+H+")"+(n?":not(."+m+")":"")).each(function(n,o){o=J(o);var l=i.getItem(e,o);i.handlerLabel(e,a.find('dd[lay-value="'+l.value+'"]'),!o.hasClass(r),l,!t)}))},Q.prototype.skin=function(e){var t=["default","primary","normal","warm","danger"],i=t[Math.floor(Math.random()*t.length)];J('dl[xid="'+e+'"]').parents("."+n).find("."+L).attr("xm-select-skin",i),this.check(e)&&this.commonHandler(e,J('dl[xid="'+e+'"]').parents("."+n).find("."+o))},Q.prototype.getPosition=function(e){for(var t=0,n=0;null!=e;)t+=e.offsetLeft,n+=e.offsetTop,e=e.offsetParent;return{x:t,y:n}},Q.prototype.onreset=function(){J(document).on("click","[type=reset]",function(e){J(e.target).parents("form").find("."+n+" dl[xid]").each(function(e,t){var n=t.getAttribute("xid"),i=J(t),a=void 0,r={};G.removeAll(n),V[n].config.init.forEach(function(e,t){e&&(!r[e]||V[n].config.repeat)&&(a=i.find('dd[lay-value="'+e.value+'"]'))[0]&&(G.handlerLabel(n,a,!0),r[e]=1)})})})},Q.prototype.bindEvent=function(e,t,n){t&&t instanceof Function&&(n=t,t=null),n&&n instanceof Function&&(t?V[t]?(V[t].config[e]=n,delete U[e][t]):U[e][t]=n:J.each(V,function(t,i){V[t]?V[t].config[e]=n:U[e][t]=n}))},Q.prototype.check=function(e,t){return!!J('dl[xid="'+e+'"]').length||(J('select[xm-select="'+e+'"]').length?t?void 0:(this.render(e,J('select[xm-select="'+e+'"]')),!0):(delete V[e],!1))},Q.prototype.render=function(e,t){G.init(t),G.one(J('dl[xid="'+e+'"]').parents("."+n)),G.initVal(e)},Q.prototype.log=function(e){console.log(e)};var $=function(){this.v=e,this.render()},G=new Q;return $.prototype.value=function(e,t,n){if("string"!=typeof e)return[];var i=V[e];if(!G.check(e))return[];if("string"==typeof t||void 0==t){var a=i.values.concat([])||[];return"val"==t?a.map(function(e){return e.value}):"valStr"==t?a.map(function(e){return e.value}).join(","):"name"==t?a.map(function(e){return e.name}):"nameStr"==t?a.map(function(e){return e.name}).join(","):a}if(G.isArray(t)){var r=J('[xid="'+e+'"]'),o={},l=void 0,s=!0;0==n?s=!1:1==n?s=!0:G.removeAll(e),s&&i.values.forEach(function(e,t){o[e.value]=1}),t.forEach(function(t,n){if(t&&(!o[t]||i.config.repeat))if((l=r.find('dd[lay-value="'+t+'"]'))[0])G.handlerLabel(e,l,s,null,!0),o[t]=1;else{var a=G.valToName(e,t);a&&(G.handlerLabel(e,l,s,G.getItem(e,t),!0),o[t]=1)}})}},$.prototype.on=function(e,t,n){return G.bindEvent(n?"endOn":"on",e,t),this},$.prototype.filter=function(e,t){return G.bindEvent("filter",e,t),this},$.prototype.maxTips=function(e,t){return G.bindEvent("maxTips",e,t),this},$.prototype.opened=function(e,t){return G.bindEvent("opened",e,t),this},$.prototype.closed=function(e,t){return G.bindEvent("closed",e,t),this},$.prototype.config=function(e,t,i){return e&&"object"==("undefined"==typeof e?"undefined":_typeof(e))&&(i=1==t,t=e,e=null),t&&"object"==("undefined"==typeof t?"undefined":_typeof(t))&&(i&&(t.header||(t.header={}),t.header["Content-Type"]="application/json; charset=UTF-8",t.dataType="json"),e?(R[e]=J.extend(!0,{},R[e]||M,t),!G.check(e)&&this.render(e),V[e]&&t.direction&&(V[e].config.direction=t.direction),V[e]&&t.clearInput&&(V[e].config.clearInput=!0),t.searchUrl&&V[e]&&G.triggerSearch(J("."+n+' dl[xid="'+e+'"]').parents("."+L),!0)):(J.extend(!0,M,t),J.each(R,function(e,n){J.extend(!0,n,t)}))),this},$.prototype.render=function(e,i){var a;e&&"object"==("undefined"==typeof e?"undefined":_typeof(e))&&(i=e,e=null);var r=i?(a={init:i.init,disabled:i.disabled,max:i.max,isSearch:i.isSearch,searchUrl:i.searchUrl,isCreate:i.isCreate,radio:i.radio,skin:i.skin,direction:i.direction,height:i.height,formname:i.formname,layverify:i.layverify,layverType:i.layverType,showCount:i.showCount,placeholder:i.placeholder,create:i.create,filter:i.filter,maxTips:i.maxTips,on:i.on},_defineProperty(a,"on",i.on),_defineProperty(a,"opened",i.opened),_defineProperty(a,"closed",i.closed),_defineProperty(a,"template",i.template),_defineProperty(a,"clearInput",i.clearInput),a):{};return i&&void 0!=i.searchType&&(r.searchType="dl"==i.searchType?1:0),e?(z[e]={},J.extend(z[e],V[e]?V[e].config:{},r)):J.extend(q,r),J(J("select["+t+'="'+e+'"]')[0]?"select["+t+'="'+e+'"]':"select["+t+"]").each(function(e,i){var a=i.getAttribute(t);G.render(a,i),setTimeout(function(){return G.setHidnVal(a,J('select[xm-select="'+a+'"] + div.'+n+" ."+o))},10)}),this},$.prototype.disabled=function(e){var t={};return e?G.check(e)&&(t[e]=V[e]):t=V,J.each(t,function(e,t){J('dl[xid="'+e+'"]').prev().addClass(y)}),this},$.prototype.undisabled=function(e){var t={};return e?G.check(e)&&(t[e]=V[e]):t=V,J.each(t,function(e,t){J('dl[xid="'+e+'"]').prev().removeClass(y)}),this},$.prototype.data=function(e,t,n){return e&&t&&n?G.check(e)?(this.value(e,[]),this.config(e,n),"local"==t?G.renderData(e,n.arr,1==n.linkage,n.linkageWidth?n.linkageWidth:"100"):"server"==t&&G.ajax(e,n.url,n.keyword,1==n.linkage,n.linkageWidth?n.linkageWidth:"100"),this):(G.log("id: "+e+" not render !!!"),this):(G.log("id: "+e+" param error !!!"),this)},$.prototype.btns=function(e,t,n){
if(e&&G.isArray(e)&&(t=e,e=null),!t||!G.isArray(t))return this;var i={};return e?G.check(e)&&(i[e]=V[e]):i=V,t=t.map(function(e){if("string"==typeof e){if("select"==e)return W[0];if("remove"==e)return W[1];if("reverse"==e)return W[2];if("skin"==e)return W[3]}return e}),J.each(i,function(e,i){i.config.btns=t;var r=J('dl[xid="'+e+'"]').find("."+H+":first");if(t.length){var o=n&&n.show&&("name"==n.show||"icon"==n.show)?n.show:"",l=G.renderBtns(e,o,n&&n.space?n.space:"30px");r.html(l)}else{var s=r.parents("."+L).find("."+a+" input"),d=s.attr("placeholder")||s.attr("back");r.html(d),r.removeAttr("style")}}),this},$.prototype.search=function(e,t){return e&&G.check(e)&&(R[e]=J.extend(!0,{},R[e]||M,{first:!0,searchVal:t}),G.triggerSearch(J('dl[xid="'+e+'"]').parents("."+L),!0)),this},$.prototype.replace=function(e,t,n){var i=this;if(!e||!t||!n)return G.log("id: "+e+" param error !!!"),this;if(!G.check(e,!0))return G.log("id: "+e+" not render !!!"),this;var a=this.value(e,"val");this.value(e,[]),this.config(e,n),"local"==t?(G.renderData(e,n.arr,1==n.linkage,n.linkageWidth?n.linkageWidth:"100",!1,!0),this.value(e,a,!0)):"server"==t&&G.ajax(e,n.url,n.keyword,1==n.linkage,n.linkageWidth?n.linkageWidth:"100",!1,function(e){i.value(e,a,!0)},!0)},new $});