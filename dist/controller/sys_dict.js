/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";function _defineProperty(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}layui.define(["admin","table","element","form"],function(e){var t,i=layui.table,n=layui.jquery,s=(layui.element,layui.admin),a=layui.form,l=layui.view,r=layui.setter;a.render(null,"app-content-comment"),a.on("submit(sys-dict-but-search)",function(e){var t=e.field;i.reload("sys_dict_listTab",{where:t})}),i.render({elem:"#sys_dict_listTab",url:r.baseUrl+"sys/dict/list",cellMinWidth:80,cols:[[{field:"dictId",title:"id",sort:!1},{field:"tableName",title:"菜单名"},{field:"fileName",title:"字段名",sort:!1},{field:"dictKey",title:"键",sort:!1},{field:"dictValue",title:"值",sort:!1},(t={width:150,align:"center"},_defineProperty(t,"align","center"),_defineProperty(t,"fixed","right"),_defineProperty(t,"toolbar","#sys-dict-operate"),_defineProperty(t,"title","操作"),t)]],page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}}}),i.on("tool(sys_dict_listTab)",function(e){var t=e.data;console.log(t),"edit"===e.event?s.popup({title:"编辑客户报价配置",area:["850px","440px"],id:"LAY-popup-sys-dict-edit",btn:["提交","取消"],yes:function(e,t){n("#sys-dict-form-submit").click()},end:function(){},success:function(e,i){l(this.id).render("/infoManagement/iframeWindow/dict_form",t).done(function(){a.render(null,"layuiadmin-app-form-list"),a.on("submit(sys-dict-form-submit)",function(e){var t=e.field;s.req({url:r.baseUrl+"sys/dict/update",type:"POST",data:t,success:function(e){layui.table.reload("sys_dict_listTab"),layer.close(i)}})})})}}):"del"===e.event&&layer.confirm("确定删除此报价？",function(e){s.req({url:r.baseUrl+"sys/dict/delete",type:"POST",data:{ids:t.consumerAdjustQuoteId},success:function(e){layui.table.reload("sys_dict_listTab"),layer.msg("已删除")}})})});var d={sys_dict_add:function(){s.popup({type:1,title:"数据字典新增",shadeClose:!0,shade:!1,maxmin:!1,area:["850px","700px"],content:'<div class="layui-row" id="sys_dict_info"></div>',btn:["添加","取消"],yes:function(e,t){n("#sys-dict-form-submit").click()},success:function(e,t){l("sys_dict_info").render("/infoManagement/iframeWindow/dict_form").then(function(e){}).done(function(){a.render(null,"layuiadmin-app-form-list"),a.on("submit(sys-dict-form-submit)",function(e){var n=e.field;s.req({url:r.baseUrl+"sys/dict/save",type:"POST",data:n,success:function(e){layer.alert("订单协同修改成功"),i.reload("sys_dict_listTab"),layer.close(t)}})})})}})}};n(".layui-btn").on("click",function(){var e=n(this).data("type");d[e]&&d[e].call(this)}),n(".sys-dict-form-search input").bind("input propertychange",function(e){n("*[lay-filter='sys-dict-but-search']").click()}),e("sys_dict",{})});