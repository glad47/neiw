/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";!function(e){var t="optimizeSelectOption";window.top.layui?window.top.layui.use("layer",function(){layui.define(["form"],function(n){n(t,e(t))})}):(console.warn("使用插件："+t+"页面顶层窗口必须引入layui"),layui.define(["form"],function(e){e(t,{msg:"使用插件："+t+"页面顶层窗口必须引入layui"})}))}(function(e){function t(e,n,o){n=n||window,e=e.length?e.get(0):e;var i={};if(o&&n.top!==n.self){var l=n.frames.frameElement;i=t(l,n.parent,o)}var a=e.getBoundingClientRect();return{top:a.top+(i.top||0),left:a.left+(i.left||0)}}var n="0.1.8",o=layui.$,i=layui.form,l=(layui.layer,[".layui-table-view",".layui-layer-content",".select_option_to_layer"]);if(window.top.layer._indexTemp=window.top.layer._indexTemp||{},!i.render.plugFlag){var a=i.render;i.render=function(e,t,n){var i,l=this;return n?layui.each(n,function(t,n){n=o(n);var r=n.parent(),u=r.hasClass("layui-form"),s=r.attr("lay-filter");u?"":r.addClass("layui-form"),s?"":r.attr("lay-filter","tablePlug_form_filter_temp_"+(new Date).getTime()+"_"+Math.floor(1e5*Math.random())),i=a.call(l,e,r.attr("lay-filter")),u?"":r.removeClass("layui-form"),s?"":r.attr("lay-filter",null)}):i=a.call(l,e,t),i},i.render.plugFlag=!0}var r=function(){window.top.layer.close(window.top.layer._indexTemp[e])},u={},s=function(n,i){var a=this;return u.name?(console.warn("针对",n,"的显示优化已经存在，请不要重复渲染！"),a):void o(document).on("click",l.map(function(e){return e+" "+i.triggerElem}).join(","),function(n){function a(){var e=t(s,window,!0),n=e.top,o=e.left;return p?n=n-c.outerHeight()+s.outerHeight()-parseFloat(c.css("bottom")):n+=parseFloat(c.css("top")),{top:n,left:o}}layui.stope(n),r();var u=o(this),s=u,c="function"==typeof i.dlElem?i.dlElem(u):s.next(),f=s.parent().prev(),p=s.parent().hasClass("layui-form-selectup"),d=a();s.css({backgroundColor:"transparent"}),window.top.layer._indexTemp[e]=window.top.layer.open({type:1,title:!1,closeBtn:0,shade:0,anim:-1,fixed:s.closest(".layui-layer-content").length||window.top!==window.self,isOutAnim:!1,offset:[d.top+"px",d.left+"px"],area:c.outerWidth()+"px",content:'<div class="layui-unselect layui-form-select layui-form-selected"></div>',skin:"layui-option-layer",success:function(e,t){c.css({top:0,position:"relative"}).appendTo(e.find(".layui-layer-content").css({overflow:"hidden"}).find(".layui-form-selected")),e.width(s.width());var n=window.top.innerHeight-e.outerHeight()-parseFloat(e.css("top"));p&&e.css({top:"auto",bottom:n+"px"}),"function"==typeof i.success&&i.success.call(this,t,e),e.on("mousedown",function(e){layui.stope(e)}),setTimeout(function(){s.parentsUntil(l.join(",")).one("scroll",function(e){r()}),s.parents(l.join(",")).one("scroll",function(e){r()});var e=window;do{var t=e.$||e.layui.$;t&&(t(e.document).one("click",function(e){r()}),t(e.document).one("mousedown",function(e){r()}),t(e).one("resize",function(e){r()}),t(e.document).one("scroll",function(){top!==self&&parent.parent&&r()}))}while(e.self!==e.top&&(e=e.parent))},500)},end:function(){"function"==typeof i.end&&i.end.call(this,f)}})})};return s("layuiSelect",{triggerElem:".layui-select-title",success:function(e,t){t.find("dl dd").click(function(){r()})},end:function(e){i.render("select",null,e)}}),{version:n,getPosition:t,close:r}});