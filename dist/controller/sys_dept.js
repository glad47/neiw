/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";function _defineProperty(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}layui.define(["admin","table","setter","form","jquery"],function(e){var t,i=layui.jquery,n=layui.table,a=layui.admin,l=layui.setter,r=layui.view,d=layui.form;d.render(null,"app-content-comment"),d.on("submit(LAY-dept-search)",function(e){var t=e.field;console.log(t),n.reload("dept_listTab",{where:t})}),i(".dept-form-search input").bind("input propertychange",function(e){i("*[lay-filter='LAY-dept-search']").click()}),n.render({elem:"#dept_listTab",url:l.baseUrl+"sys/dept/list",cols:[[{type:"checkbox",fixed:"left",width:50},{field:"deptId",minWidth:80,title:"ID",align:"center"},{field:"deptName",minWidth:80,title:"部门名称",align:"center"},(t={width:200,align:"center"},_defineProperty(t,"align","center"),_defineProperty(t,"fixed","right"),_defineProperty(t,"toolbar","#dept-table-operate-barDemo"),_defineProperty(t,"title","操作"),t)]],page:!0}),n.on("tool(dept_listTab)",function(e){var t=e.data;console.log(t),"edit"===e.event?a.popup({title:"编辑部门",area:["550px","550px"],id:"LAY-popup-dept-edit",btn:["提交","取消"],yes:function(e,t){i("#layuiadmin-app-form-submit").click()},end:function(){},success:function(e,i){r(this.id).render("infoManagement/deptform",t).done(function(){d.on("submit(layuiadmin-app-form-submit)",function(e){var t=e.field;a.req({url:l.baseUrl+"sys/dept/update",type:"POST",data:t,success:function(e){layui.table.reload("dept_listTab"),layer.close(i)}})})})}}):"del"===e.event&&layer.confirm("确定删除此部门？",function(e){a.req({url:l.baseUrl+"sys/dept/delete",type:"POST",data:{deptIds:t.deptId},success:function(e){layui.table.reload("dept_listTab"),layer.msg("已删除")}})})});var i=layui.$,o={dept_add:function(e){a.popup({title:"添加部门",area:["550px","550px"],btn:["提交","取消"],yes:function(e,t){i("#layuiadmin-app-form-submit").click()},btn2:function(e,t){},end:function(){clickTr={}},id:"LAY-popup-dept-add",success:function(e,t){r(this.id).render("infoManagement/deptform").done(function(){d.render(null,"layuiadmin-app-form-list"),d.on("submit(layuiadmin-app-form-submit)",function(e){var i=e.field;a.req({url:l.baseUrl+"sys/dept/save",type:"POST",data:i,success:function(e){console.log(e),layui.table.reload("dept_listTab"),layer.close(t)}})})})}})}};i(".test-table-operate-btn .layui-btn").on("click",function(){var e=i(this).data("type");o[e]?o[e].call(this):""}),e("sys_dept",{})});