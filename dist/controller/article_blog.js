/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";function _defineProperty(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}layui.define(["admin","table","index","element","form","laydate","layedit"],function(e){function t(){var e;r.set((e={uploadImage:{url:"your url",accept:"image",acceptMime:"image/*",exts:"jpg|png|gif|bmp|jpeg",size:10240,data:{name:"测试参数",age:99},done:function(e){console.log(e)}},uploadVideo:{url:"your url",accept:"video",acceptMime:"video/*",exts:"mp4|flv|avi|rm|rmvb",size:20480,done:function(e){console.log(e)}},uploadFiles:{url:"your url",accept:"file",acceptMime:"file/*",size:"20480",autoInsert:!0,done:function(e){console.log(e)}},calldel:{url:"your url",done:function(e){console.log(e)}},rightBtn:{type:"layBtn",customEvent:function(e,t){switch(e){case"img":alert("this is img");break;default:alert("hello world")}}},backDelImg:!0,devmode:!0,autoSync:!0,onchange:function(e){console.log(e)},codeConfig:{hide:!0,"default":"javascript",encode:!0,"class":"layui-code"},quote:{},customlink:{title:"插入layui官网",href:"https://www.layui.com",onmouseup:""},facePath:"http://knifez.gitee.io/kz.layedit/Content/Layui-KnifeZ/"},_defineProperty(e,"devmode",!0),_defineProperty(e,"videoAttr",' preload="none" '),_defineProperty(e,"tool",["html","undo","redo","code","strong","italic","underline","del","addhr","|","removeformat","fontFomatt","fontfamily","fontSize","fontBackColor","colorpicker","face","|","left","center","right","|","link","unlink","images","image_alt","video","attachment","anchors","|","table","customlink","fullScreen","preview"]),_defineProperty(e,"height","500px"),e))}var l=layui.table,i=layui.view,a=layui.admin,n=layui.form,o=(layui.laydate,layui.setter),r=(layui.element,layui.layedit),c=layui.jquery;n.render(null,"article-blog-formlist"),n.on("submit(LAY-article-blog-form-search)",function(e){var t=e.field;l.reload("article_Table_blog",{where:t})}),l.render({elem:"#article_Table_blog",url:o.baseUrl+"/article/list",toolbar:"#toolbarBlog",cellMinWidth:80,id:"article_Table_blog",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},where:{at:1},cols:[[{field:"id",title:"ID",hide:!1},{field:"articleName",title:"文章名称",hide:!1,align:"center",sort:!0},{field:"articleTime",title:"发布时间",align:"center",width:176,sort:!0},{field:"articleIp",title:"发布ip",align:"center",sort:!0},{field:"articleClick",title:"查看人数",align:"center",sort:!0},{field:"articleLike",title:"点赞数",align:"center",sort:!0},{field:"articleComment",title:"评论数",align:"center",sort:!0},{field:"articleClassify",title:"文章分类",align:"center",sort:!0},{field:"articleType",title:"文章类型",align:"center",templet:"#Tabtb-blog-type",sort:!0},{field:"articleUserName",title:"文章发布用户",align:"center",width:130,sort:!0},{field:"articleStatus",title:"文章状态",align:"center",templet:"#Tabtb-article-management-status",sort:!0},{title:"操作",width:120,align:"center",fixed:"right",toolbar:"#Tabtb-article-management-option",sort:!0}]],done:function(e,t,l){/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)&&c("#LAY_app_body").each(function(e){c("a[lay-event='edit']").html('<i class="layui-icon layui-icon-edit"></i>'),c("a[lay-event='search']").html('<i class="layui-icon layui-icon-search"></i>'),c("a[lay-event='del']").html('<i class="layui-icon layui-icon-delete"></i>'),c(".laytable-cell-1-0-22").css({width:"130px"})})}}),l.on("tool(article_Table_blog)",function(e){var l=e.data;console.log(l),"edit"===e.event?a.popup({title:"修改Blog",area:["100%","100%"],btn:["提交","取消"],yes:function(e,t){c("#layuiadmin-app-form-submit").click()},btn2:function(e,t){},end:function(){clickTr={}},id:"LAY-popup-role-add",success:function(e,c){i(this.id).render("articleManagement/blogformadd",l).done(function(){n.render(null,"article-manage-blog-add-edit-form"),t();var e=r.build("blogcontent",{uploadImage:{url:o.imUrl+"imgfile/fileupload"}}),l=r.build("blogInternalChain",{uploadImage:{url:o.imUrl+"imgfile/fileupload"}});n.on("submit(layuiadmin-app-form-submit)",function(t){var i=t.field;console.log(i);var n=r.getContent(e),d=r.getContent(l);i.articleContent=n,i.articleInternalChain=d,"on"==i.articleKing?i.articleKing=1:i.articleKing=0,a.req({url:o.baseUrl+"article/update",type:"POST",data:i,success:function(e){console.log(e),0==e.code?(layui.table.reload("article_Table_blog"),layer.close(c)):layer.msg("更新失败！！")}})})})}}):"del"===e.event&&layer.confirm("确定删除此博客？",function(e){a.req({url:o.baseUrl+"article/delete",type:"POST",data:{ids:l.id},success:function(e){layui.table.reload("article_Table_blog"),layer.msg("已删除")}})})}),l.on("toolbar(article_Table_blog)",function(e){switch(e.event){case"add":clickTr={},a.popup({title:"添加Blog",area:["100%","100%"],btn:["提交","取消"],yes:function(e,t){c("#layuiadmin-app-form-submit").click()},btn2:function(e,t){},end:function(){clickTr={}},id:"LAY-popup-role-add",success:function(e,l){i(this.id).render("articleManagement/blogformadd").done(function(){n.render(null,"article-manage-blog-add-edit-form"),t();var e=r.build("blogcontent",{uploadImage:{url:o.imUrl+"imgfile/fileupload"}}),i=r.build("blogInternalChain",{height:"150px"});n.on("submit(layuiadmin-app-form-submit)",function(t){var n=t.field,c=r.getContent(e);n.articleContent=c;var d=r.getContent(i);n.blogInternalChain=d,a.req({url:o.baseUrl+"article/save",type:"POST",data:n,success:function(e){console.log(e),0==e.code?(layui.table.reload("article_Table_blog"),layer.close(l)):layer.msg("添加失败！！")}})})})}})}}),e("article_blog",{})});