/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";function _defineProperty(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}layui.define(["admin","table","element","form","edit_customer_info"],function(e){var t,i=layui.table,r=layui.jquery,n=(layui.element,layui.admin),o=layui.form,l=layui.edit_customer_info,s=layui.view,a=layui.setter;o.render(null,"app-content-comment"),i.render({elem:"#customer_listTab",url:a.baseUrl+"sys/consumer/user/list",cellMinWidth:80,cols:[[{field:"id",title:"id",sort:!0,width:130},{field:"status",title:"状态",width:130,templet:"#customerStatus"},{field:"userSystemId",title:"客户代码",sort:!0,width:130},{field:"userName",title:"用户名",width:130},{field:"countryName",title:"国家",sort:!0},{field:"email",title:"邮箱",sort:!0,minWidth:196},{field:"gmtCreate",title:"注册时间",sort:!0},{field:"gmtModified",title:"更新时间",sort:!0},{field:"userType",title:"内外",sort:!0,templet:"#userType",width:130,hide:!0},{field:"userIp",title:"注册IP",sort:!0,hide:!0},{field:"skypeId",title:"Skype",sort:!0,hide:!0},{field:"receiverTelephone",title:"收货电话",minWidth:120,sort:!0,hide:!0},{field:"googleId",title:"Google",sort:!0,align:"right",hide:!0},{field:"facebookId",title:"Facebook",sort:!0,align:"right",hide:!0},{field:"receiverCompany",title:"公司名",sort:!0,align:"right",hide:!0},{field:"receiverAddress",title:"收货地址",sort:!0,align:"right",hide:!0},{field:"receiverCity",title:"收货城市",sort:!0,hide:!0},{field:"jobrole",title:"工作角色",sort:!0,hide:!0},{field:"contact",title:"联系人",sort:!0,hide:!0},{field:"businessType",title:"业务类型",sort:!0,hide:!0},{field:"applications",title:"应用",sort:!0,hide:!0},(t={width:250,align:"center"},_defineProperty(t,"align","center"),_defineProperty(t,"fixed","right"),_defineProperty(t,"toolbar","#role-table-operate-barDemo"),_defineProperty(t,"title","操作"),t)]],done:function(e,t,i){r(".layui-table tr div").each(function(){r(this).text().indexOf("已审核")>0&&r(this).parents("tr").children("td:last").find("a[lay-event='customerInfosh']").remove()})},page:!0}),i.on("tool(customer_listTab)",function(e){var t=e.data;console.log(t),"edit"===e.event?(t.reTab="customer_listTab",l.editInfo(t)):"del"===e.event?layer.confirm("确定删除此客户？",function(e){n.req({url:a.baseUrl+"sys/consumer/user/delete",type:"POST",data:{ids:t.id},success:function(e){layui.table.reload("customer_listTab"),layer.msg("已删除")}})}):"conversionCustomer"===e.event?n.popup({type:1,title:"选择跟单员",btn:["转换","取消"],area:["300px","233px"],yes:function(){r("*[lay-filter='conversionCustomer-submit']").click()},success:function(e,i){s(this.id).render("/infoManagement/iframeWindow/conversionCustomer",t).done(function(){o.render()})}}):"customerInfosh"===e.event&&n.popup({type:1,title:"审核",btn:["审核","取消"],area:["396px","299px"],id:"popupCustomerInfosh",yes:function(){layer.confirm("确定提交审核？",function(){r("input[lay-filter='customersh-submit']").click()})},success:function(){s(this.id).render("/infoManagement/iframeWindow/customer_sh",t).done(function(){o.render()})}})});var d={customerInfo_add:function(){n.popup({type:1,title:"客户新增",shadeClose:!0,shade:!1,maxmin:!1,area:["40%","100%"],content:'<div class="layui-row" id="customer_edit_info"></div>',btn:["确定","取消"],yes:function(e,t){r("#layuiadmin-app-form-submit").click()},success:function(e,t){s("customer_edit_info").render("/infoManagement/iframeWindow/customer_edit_info").then(function(e){}).done(function(){o.render(null,"customer-add-edit-form-list");var e;o.on("switch(productionVerification)",function(t){1==t.elem.checked?(layer.msg("需要确定生产资料"),e=0):(layer.msg("不需要确定生产资料"),e=1)});var i;o.on("switch(optionUser)",function(e){1==e.elem.checked?(layer.msg("已启用"),i=0):(layer.msg("停用"),i=1)});var r;o.on("switch(isneibuUser)",function(e){1==e.elem.checked?(layer.msg("内部用户"),r=1):(layer.msg("客户系统用户"),r=0)});var l;o.on("switch(isAuditMark)",function(e){1==e.elem.checked?(layer.msg("需要审核"),l=0):(layer.msg("不需审核"),l=1)});var s=0;o.on("switch(deliveryReport)",function(e){1==e.elem.checked?(layer.msg("需要出货报告"),s=1):(layer.msg("不需要出货报告"),s=0)}),o.on("submit(layuiadmin-app-form-submit)",function(o){var d=o.field;d.invalidMark=i,d.userType=r,d.auditMark=l,d.deliveryReport=s,d.productionVerification=e,n.req({url:a.baseUrl+"sys/consumer/user/save",type:"POST",data:d,success:function(e){console.log(e),layui.table.reload("customer_listTab"),layer.close(t)}})})})}})}};r(".layui-btn").on("click",function(){var e=r(this).data("type");d[e]&&d[e].call(this)}),e("sys_coustomer",{})});