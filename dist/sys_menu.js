/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["table","form"],function(e){var n=layui.$,t=layui.table,i=layui.admin,l=layui.view,r=layui.form;t.render({elem:"#sys_menu",height:521,url:setter.baseUrl+"sys/menu/erplist",id:"sys_menu",page:!0,limit:10,cols:[[{field:"menuId",title:"ID",sort:!0,minWidth:100,align:"center"},{field:"title",title:"名称",minWidth:144,align:"center"},{field:"menuup",title:"上级菜单",minWidth:106,align:"center"},{field:"icon",title:"图标",minWidth:107,align:"center"},{field:"type",title:"类型",minWidth:107,align:"center",id:"menu_type"},{field:"orderNum",width:80,title:"排序号",minWidth:105,align:"center"},{field:"jump",title:"菜单URL",minWidth:106,align:"center"},{field:"perms",title:"授权标识",sort:!0,minWidth:154,align:"center"},{title:"操作",width:165,align:"center",fixed:"right",toolbar:"#menu_opreation"}]]}),t.on("tool(sys_menuTab)",function(e){var n=e.data;"del"===e.event?layer.prompt({formType:1,title:"敏感操作，请验证口令"},function(n,t){layer.close(t),layer.confirm("真的删除行么",function(n){e.del(),layer.close(n)})}):"edit"===e.event&&i.popup({title:"编辑用户",area:["717px","561px"],success:function(e,t){l(this.id).render("infoManagement/iframeWindow/sys_menuAdd",n).done(function(){r.render(null,"user_menuAdd_form"),r.render(null,"user_menuMe_form"),r.on("submit(LAY-user-front-submit)",function(e){e.field;layui.table.reload("sys_menu"),layer.close(t)})})}})});var u={userInfo_add:function(){i.popup({title:"添加菜单",area:["717px","561px"],id:"LAY-popup-menu-add",success:function(e,t){l(this.id).render("/infoManagement/iframeWindow/sys_menuAdd").done(function(){r.render(null,"user_menuAdd_form"),r.render(null,"user_menuMe_form");var e;r.on("select(LAY-menu-dir-submit)",function(t){var i=t.value;console.log("selValue==>"+i),n("#menuAdd_menuup").find("option[text=selValue]").attr("selected",!0);var l=n("#menuAdd_menuup  option:selected").attr("name");e=l}),r.on("submit(LAY-menu-add-submit)",function(n){var l=n.field;l.parentId=e,l.type="0",i.req({type:"post",url:setter.baseUrl+"sys/menu/erpsave",data:l,done:function(e){console.log(e),layer.msg("菜单添加成功")},fail:function(e){layer.msg("菜单添加失败")}}),layui.table.reload("sys_menu"),layer.close(t)})})}})}};n(".layui-btn").on("click",function(){var e=n(this).data("type");u[e]?u[e].call(this):""}),e("sys_menu",{})});