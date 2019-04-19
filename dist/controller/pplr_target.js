/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";function _defineProperty(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}layui.define(["admin","table","setter","form","jquery"],function(e){var t,i=layui.jquery,a=layui.table,n=layui.admin,r=layui.setter,l=layui.view,s=layui.form;a.render({elem:"#pplr_targetListTab",url:r.baseUrl+"pplr/businesstarget/list",cols:[[{field:"id",minWidth:80,title:"ID",align:"center"},{field:"businessName",minWidth:80,title:"跟单员",align:"center",templet:"target_business_name_temple"},{field:"name",minWidth:80,title:"目标名称",align:"center"},{field:"dateType",minWidth:80,title:"时间类型",align:"center",templet:"#target_dataType_temple"},{field:"type",minWidth:80,title:"目标类型",align:"center",templet:"#target_type_temple"},{field:"value",minWidth:80,title:"目标指标",align:"center"},(t={width:200,align:"center"},_defineProperty(t,"align","center"),_defineProperty(t,"fixed","right"),_defineProperty(t,"toolbar","#target-table-operate-barDemo"),_defineProperty(t,"title","操作"),t)]],page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}}}),a.on("tool(pplr_targetListTab)",function(e){var t=e.data;console.log(t),"target_edit"===e.event?n.popup({title:"编辑目标",area:["550px","550px"],id:"LAY-pplr-target-edit",btn:["提交","取消"],yes:function(e,t){i("#layuiadmin-app-form-submit").click()},end:function(){},success:function(e,a){l(this.id).render("infoManagement/pplr_targetSet_form",t).done(function(){var e;s.on("select(rsf_business)",function(t){e=i(t.elem).find("option:selected").attr("data-name")}),s.on("submit(layuiadmin-app-form-submit)",function(t){var i=t.field;i.businessName=e,n.req({url:r.baseUrl+"pplr/businesstarget/update",type:"POST",data:i,success:function(e){layui.table.reload("pplr_targetListTab"),layer.close(a)}})})})}}):"target_del"===e.event&&layer.confirm("确定删除此目标？",function(e){n.req({url:r.baseUrl+"pplr/businesstarget/delete",type:"POST",data:{ids:t.id},success:function(e){layui.table.reload("pplr_targetListTab"),layer.msg("已删除")}})})});var i=layui.$,o={target_add:function(e){n.popup({title:"添加目标",area:["550px","550px"],btn:["提交","取消"],yes:function(e,t){i("#layuiadmin-app-form-submit").click()},btn2:function(e,t){},end:function(){clickTr={}},id:"LAY-pplr-target-add",success:function(e,t){l(this.id).render("infoManagement/pplr_targetSet_form").done(function(){s.render(null,"layuiadmin-app-form-list");var e;s.on("select(rsf_business)",function(t){e=i(t.elem).find("option:selected").attr("data-name")}),s.on("submit(layuiadmin-app-form-submit)",function(i){var a=i.field;a.businessName=e,n.req({url:r.baseUrl+"pplr/businesstarget/save",type:"post",data:a,success:function(e){console.log(e),layui.table.reload("pplr_targetListTab"),layer.close(t)}})})})}})}};i(".test-table-operate-btn .layui-btn").on("click",function(){var e=i(this).data("type");o[e]?o[e].call(this):""}),e("pplr_target",{})});