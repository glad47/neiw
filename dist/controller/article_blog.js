/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";function _defineProperty(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}layui.define(["admin","table","index","element","form","laydate","layedit"],function(e){function t(){var e;c.set((e={uploadImage:{url:"your url",accept:"image",acceptMime:"image/*",exts:"jpg|png|gif|bmp|jpeg",size:10240,data:{name:"测试参数",age:99},done:function(e){console.log(e)}},uploadVideo:{url:"your url",accept:"video",acceptMime:"video/*",exts:"mp4|flv|avi|rm|rmvb",size:20480,done:function(e){console.log(e)}},uploadFiles:{url:"your url",accept:"file",acceptMime:"file/*",size:"20480",autoInsert:!0,done:function(e){console.log(e)}},calldel:{url:"your url",done:function(e){console.log(e)}},rightBtn:{type:"layBtn",customEvent:function(e,t){switch(e){case"img":alert("this is img");break;default:alert("hello world")}}},backDelImg:!0,devmode:!0,autoSync:!0,onchange:function(e){console.log(e)},codeConfig:{hide:!0,"default":"javascript",encode:!0,"class":"layui-code"},quote:{style:["Content/css.css"]},customlink:{title:"插入layui官网",href:"https://www.layui.com",onmouseup:""},facePath:"http://knifez.gitee.io/kz.layedit/Content/Layui-KnifeZ/"},_defineProperty(e,"devmode",!0),_defineProperty(e,"videoAttr",' preload="none" '),_defineProperty(e,"tool",["html","undo","redo","code","strong","italic","underline","del","addhr","|","removeformat","fontFomatt","fontfamily","fontSize","fontBackColor","colorpicker","face","|","left","center","right","|","link","unlink","images","image_alt","video","attachment","anchors","|","table","customlink","fullScreen","preview"]),_defineProperty(e,"height","500px"),e))}var l=layui.table,i=layui.view,a=layui.admin,n=layui.form,o=layui.laydate,r=layui.setter,c=(layui.element,layui.layedit),d=layui.jquery;o.render({elem:"#gmtCreate"}),l.render({elem:"#article_Table_blog",url:r.baseUrl+"/article/list",toolbar:"#toolbarBlog",cellMinWidth:80,id:"article_Table_blog",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{at:1},cols:[[{field:"id",title:"ID",hide:!0},{field:"articleName",title:"文章名称",hide:!1,align:"center"},{field:"articleTime",title:"发布时间",align:"center",width:176},{field:"articleIp",title:"发布ip",align:"center"},{field:"articleClick",title:"查看人数",align:"center"},{field:"articleLike",title:"点赞数",align:"center"},{field:"articleComment",title:"评论数",align:"center"},{field:"articleClassify",title:"文章分类",align:"center"},{field:"articleType",title:"文章类型",align:"center",templet:"#Tabtb-blog-type"},{field:"articleUserName",title:"文章发布用户",align:"center",width:130},{field:"articleStatus",title:"文章状态",align:"center",templet:"#Tabtb-article-management-status"},{title:"操作",width:120,align:"center",fixed:"right",toolbar:"#Tabtb-article-management-option"}]],done:function(e,t,l){/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)&&d("#LAY_app_body").each(function(e){d("a[lay-event='edit']").html('<i class="layui-icon layui-icon-edit"></i>'),d("a[lay-event='search']").html('<i class="layui-icon layui-icon-search"></i>'),d("a[lay-event='del']").html('<i class="layui-icon layui-icon-delete"></i>'),d(".laytable-cell-1-0-22").css({width:"130px"})})}}),l.on("tool(article_Table_blog)",function(e){var l=e.data;console.log(l),"edit"===e.event?a.popup({title:"修改Blog",area:["750px","750px"],btn:["提交","取消"],yes:function(e,t){d("#layuiadmin-app-form-submit").click()},btn2:function(e,t){},end:function(){clickTr={}},id:"LAY-popup-role-add",success:function(e,o){i(this.id).render("articleManagement/blogformadd",l).done(function(){n.render(null,"layuiadmin-app-form-list"),t();var e=c.build("blogcontent",{uploadImage:{url:r.imUrl+"file/fileupload"}});n.on("submit(layuiadmin-app-form-submit)",function(t){var l=t.field,i=c.getContent(e);l.articleContent=i,"on"==l.articleKing?l.articleKing=1:l.articleKing=0,a.req({url:r.baseUrl+"article/update",type:"POST",data:l,success:function(e){console.log(e),layui.table.reload("article_Table_blog"),layer.close(o)}})})})}}):"del"===e.event&&layer.confirm("确定删除此博客？",function(e){a.req({url:r.baseUrl+"article/delete",type:"POST",data:{ids:l.id},success:function(e){layui.table.reload("article_Table_blog"),layer.msg("已删除")}})})});var u={blog_add:function(e){}};l.on("toolbar(article_Table_blog)",function(e){switch(e.event){case"add":clickTr={},a.popup({title:"添加Blog",area:["750px","750px"],btn:["提交","取消"],yes:function(e,t){d("#layuiadmin-app-form-submit").click()},btn2:function(e,t){},end:function(){clickTr={}},id:"LAY-popup-role-add",success:function(e,l){i(this.id).render("articleManagement/blogformadd").done(function(){n.render(null,"layuiadmin-app-form-list"),t();var e=c.build("blogcontent",{uploadImage:{url:r.imUrl+"file/fileupload"}});n.on("submit(layuiadmin-app-form-submit)",function(t){var i=t.field;console.log(i);var n=c.getContent(e);console.log(n),i.articleContent=n,a.req({url:r.baseUrl+"article/save",type:"POST",data:i,success:function(e){console.log(e),layui.table.reload("article_Table_blog"),layer.close(l)}})})})}})}}),d(".test-table-operate-btn .layui-btn").on("click",function(){var e=d(this).data("type");u[e]?u[e].call(this):""}),e("article_blog",{})});