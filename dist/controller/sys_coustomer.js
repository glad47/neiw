/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";function _defineProperty(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}layui.define(["admin","table","element","form","edit_customer_info"],function(e){var t,i=layui.table,r=layui.jquery,n=(layui.element,layui.admin),o=layui.form,d=(layui.edit_customer_info,layui.view),a=layui.setter;o.render(null,"app-content-comment"),i.render({elem:"#customer_listTab",url:a.baseUrl+"sys/consumer/user/list",cellMinWidth:80,cols:[[{field:"id",title:"id",sort:!0,width:130},{field:"status",title:"状态",width:130,templet:"#customerStatus"},{field:"userSystemId",title:"客户代码",sort:!0,width:130},{field:"userName",title:"用户名",width:130},{field:"country",title:"国家",sort:!0},{field:"email",title:"邮箱",sort:!0,minWidth:196},{field:"gmtCreate",title:"注册时间",sort:!0},{field:"gmtModified",title:"更新时间",sort:!0},{field:"userType",title:"内外",sort:!0,templet:"#userType",width:130,hide:!0},{field:"userIp",title:"注册IP",sort:!0,hide:!0},{field:"skypeId",title:"Skype",sort:!0,hide:!0},{field:"receiverTelephone",title:"收货电话",minWidth:120,sort:!0,hide:!0},{field:"googleId",title:"Google",sort:!0,align:"right",hide:!0},{field:"facebookId",title:"Facebook",sort:!0,align:"right",hide:!0},{field:"receiverCompany",title:"公司名",sort:!0,align:"right",hide:!0},{field:"receiverAddress",title:"收货地址",sort:!0,align:"right",hide:!0},{field:"receiverCity",title:"收货城市",sort:!0,hide:!0},{field:"jobrole",title:"工作角色",sort:!0,hide:!0},{field:"contact",title:"联系人",sort:!0,hide:!0},{field:"businessType",title:"业务类型",sort:!0,hide:!0},{field:"applications",title:"应用",sort:!0,hide:!0},(t={width:250,align:"center"},_defineProperty(t,"align","center"),_defineProperty(t,"fixed","right"),_defineProperty(t,"toolbar","#role-table-operate-barDemo"),_defineProperty(t,"title","操作"),t)]],done:function(e,t,i){r(".layui-table tr div").each(function(){r(this).text().indexOf("已审核")>0&&r(this).parents("tr").children("td:last").find("a[lay-event='customerInfosh']").remove()})},page:!0}),i.on("tool(customer_listTab)",function(e){var t=e.data;console.log(t),"edit"===e.event?n.req({type:"post",data:{userId:t.id},url:a.baseUrl+"sys/receiveradders/queryReceiverAddersByUid/",success:function(e){t.receiverAddersEntityList=e.data,n.popup({title:"编辑客户",area:["60%","100%"],id:"LAY-popup-customer-edit",btn:["提交","取消"],yes:function(e,t){r("#layuiadmin-app-form-submit").click()},end:function(){},success:function(e,i){d(this.id).render("/infoManagement/iframeWindow/customer_edit_info",t).then(function(e){}).done(function(){function e(e){var t=e.serializeArray(),i={},n=[],o={},d=[];r.map(t,function(e,t){return 0===e.name.indexOf("receiverAddersEntityList")?n.push(e.value):void(i[e.name]=e.value)}),n.forEach(function(e,t){(t+1)%6==0&&(o.id=n[t-5],o.receiverName=n[t-4],o.receiverTelephone=n[t-3],o.receiverCompany=n[t-2],o.receiverPostcode=n[t-1],o.receiverAddress=n[t],o.isDefault=0,d.push(o),o={})});var a=i.isDefault;return void 0!=a&&null!=a&&(d[a].isDefault=1),i.receiverAddersEntityList=d,i}function d(){r("#table_address tbody tr").each(function(e){r(this).find("td").eq(0).find("input[type=radio]").attr("value",e),r(this).find("td").eq(0).find("input[type='hidden']").attr("name","receiverAddersEntityList["+e+"].id"),r(this).find("td").eq(1).find("input[type='text']").attr("name","receiverAddersEntityList["+e+"].receiverName"),r(this).find("td").eq(2).find("input[type='text']").attr("name","receiverAddersEntityList["+e+"].receiverTelephone"),r(this).find("td").eq(3).find("input[type='text']").attr("name","receiverAddersEntityList["+e+"].receiverCompany"),r(this).find("td").eq(4).find("input[type='text']").attr("name","receiverAddersEntityList["+e+"].receiverPostcode"),r(this).find("td").eq(5).find("input[type='text']").attr("name","receiverAddersEntityList["+e+"].receiverAddress")})}o.render(null,"customer-add-edit-form-list");var s;o.on("switch(productionVerification)",function(e){1==e.elem.checked?(layer.msg("需要确定生产资料"),s=0):(layer.msg("不需要确定生产资料"),s=1)});var l;o.on("switch(optionUser)",function(e){1==e.elem.checked?(layer.msg("已启用"),l=0):(layer.msg("停用"),l=1)});var c;o.on("switch(isneibuUser)",function(e){1==e.elem.checked?(layer.msg("内部用户"),c=1):(layer.msg("客户系统用户"),c=0)});var u;o.on("switch(isAuditMark)",function(e){1==e.elem.checked?(layer.msg("需要审核"),u=0):(layer.msg("不需审核"),u=1)});var f=0;o.on("switch(deliveryReport)",function(e){1==e.elem.checked?(layer.msg("需要出货报告"),f=1):(layer.msg("不需要出货报告"),f=0)});var p=t.receiverAddersEntityList;if(0!=p.length){var m="",y="";p.forEach(function(e,t){y=0!=e.isDefault?"<input type='radio' name='isDefault' autocomplete='off' checked/>":"<input type='radio' name='isDefault' autocomplete='off' />",m+="<tr><td>"+y+"<input type='hidden' autocomplete='off' value='"+(null==e.id?"":e.id)+"'/></td><td><input type='text' autocomplete='off' value='"+(null==e.receiverName?"":e.receiverName)+"'/></td><td><input type='text' autocomplete='off' value='"+(null==e.receiverTelephone?"":e.receiverTelephone)+"' /></td><td><input type='text' autocomplete='off' value='"+(null==e.receiverCompany?"":e.receiverCompany)+"'/></td><td><input type='text' autocomplete='off' value='"+(null==e.receiverPostcode?"":e.receiverPostcode)+"'/></td><td><input type='text' autocomplete='off' value='"+(null==e.receiverAddress?"":e.receiverAddress)+"' /></td><td><input type='button' class='layui-btn layui-btn-xs layui-btn-danger' value='删除' addid='"+e.id+"'></td></tr>"}),r("#table_address").append(m),d(),o.render()}else d(),o.render();var v=[];r("#add_address").click(function(){var e="<tr><td><input type='radio' name='isDefault' autocomplete='off'/><input type='hidden' autocomplete='off'/></td><td><input type='text' autocomplete='off'/></td><td><input type='text' autocomplete='off'/></td><td><input type='text' autocomplete='off'/></td><td><input type='text' autocomplete='off'/></td><td><input type='text' autocomplete='off'/></td><td><input type='button' class='layui-btn layui-btn-xs layui-btn-danger' value='删除'></td></tr>";r("#table_address").append(e),d(),o.render(),r(":button").click(function(){r(this).parent().parent().remove();var e=r(this).attr("addid");void 0!=e&&""!=e&&v.push(e),d(),o.render()})}),r(":button").click(function(){r(this).parent().parent().remove();var e=r(this).attr("addid");void 0!=e&&""!=e&&v.push(e),d(),o.render()}),o.on("submit(customer-edit-info-form-submit)",function(o){var d=e(r("#customer-add-edit-form-list"));d.invalidMark=l,d.userType=c,d.auditMark=u,d.deliveryReport=f,d.productionVerification=s,d.id=t.id,d.addDelIdList=v,console.log(d),n.req({url:a.baseUrl+"sys/consumer/user/update",type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify(d),success:function(e){console.log(e),layui.table.reload("customer_listTab"),layer.close(i)}})})})}})}}):"del"===e.event?layer.confirm("确定删除此客户？",function(e){n.req({url:a.baseUrl+"sys/consumer/user/delete",type:"POST",data:{ids:t.id},success:function(e){layui.table.reload("customer_listTab"),layer.msg("已删除")}})}):"conversionCustomer"===e.event?n.popup({type:1,title:"选择跟单员",btn:["转换","取消"],area:["400px","400px"],yes:function(){r("*[lay-filter='conversionCustomer-submit']").click()},success:function(e,i){d(this.id).render("/infoManagement/iframeWindow/conversionCustomer",t).done(function(){o.render()})}}):"customerInfosh"===e.event&&n.popup({type:1,title:"审核",btn:["审核","取消"],area:["396px","299px"],id:"popupCustomerInfosh",yes:function(){layer.confirm("确定提交审核？",function(){r("input[lay-filter='customersh-submit']").click()})},success:function(){d(this.id).render("/infoManagement/iframeWindow/customer_sh",t).done(function(){o.render()})}})});var s={customerInfo_add:function(){n.popup({id:"layer-customer-info-add-form",type:1,title:"客户新增",shadeClose:!0,shade:!1,maxmin:!1,area:["60%","100%"],content:'<div class="layui-row" id="customer_edit_info"></div>',btn:["确定","取消"],yes:function(e,t){r("#layuiadmin-app-form-submit").click()},success:function(e,t){d("customer_edit_info").render("/infoManagement/iframeWindow/customer_edit_info").then(function(e){}).done(function(){function e(){r("#table_address tbody tr").each(function(e){r(this).find("td").eq(0).find("input[type=radio]").attr("value",e),r(this).find("td").eq(1).find("input[type='text']").attr("name","receiverAddersEntityList["+e+"].receiverName"),r(this).find("td").eq(2).find("input[type='text']").attr("name","receiverAddersEntityList["+e+"].receiverTelephone"),r(this).find("td").eq(3).find("input[type='text']").attr("name","receiverAddersEntityList["+e+"].receiverCompany"),r(this).find("td").eq(4).find("input[type='text']").attr("name","receiverAddersEntityList["+e+"].receiverPostcode"),r(this).find("td").eq(5).find("input[type='text']").attr("name","receiverAddersEntityList["+e+"].receiverAddress")})}function i(e){var t=e.serializeArray(),i={},n=[],o={},d=[];r.map(t,function(e,t){return 0===e.name.indexOf("receiverAddersEntityList")?n.push(e.value):void(i[e.name]=e.value)}),n.forEach(function(e,t){(t+1)%5==0&&(console.log(t),console.log(e),o.receiverName=n[t-4],o.receiverTelephone=n[t-3],o.receiverCompany=n[t-2],o.receiverPostcode=n[t-1],o.receiverAddress=n[t],o.isDefault=0,d.push(o),o={})}),console.log(t);var a=i.isDefault;return void 0!=a&&null!=a&&(console.log(a),d[a].isDefault=1),console.log(d),i.receiverAddersEntityList=d,i}o.render(null,"customer-add-edit-form-list");var d;o.on("switch(productionVerification)",function(e){1==e.elem.checked?(layer.msg("需要确定生产资料"),d=0):(layer.msg("不需要确定生产资料"),d=1)});var s;o.on("switch(optionUser)",function(e){1==e.elem.checked?(layer.msg("已启用"),s=0):(layer.msg("停用"),s=1)});var l;o.on("switch(isneibuUser)",function(e){1==e.elem.checked?(layer.msg("内部用户"),l=1):(layer.msg("客户系统用户"),l=0)});var c;o.on("switch(isAuditMark)",function(e){1==e.elem.checked?(layer.msg("需要审核"),c=0):(layer.msg("不需审核"),c=1)});var u=0;o.on("switch(deliveryReport)",function(e){1==e.elem.checked?(layer.msg("需要出货报告"),u=1):(layer.msg("不需要出货报告"),u=0)}),r("#add_address").click(function(){var t="<tr><td><input type='radio' name='isDefault' autocomplete='off'/></td><td><input type='text' autocomplete='off'/></td><td><input type='text' autocomplete='off'/></td><td><input type='text' autocomplete='off'/></td><td><input type='text' autocomplete='off'/></td><td><input type='text' autocomplete='off'/></td><td><input type='button' class='layui-btn layui-btn-xs layui-btn-danger' value='删除'></td></tr>";r("#table_address").append(t),e(),o.render(),r(":button").click(function(){r(this).parent().parent().remove();var t=r(document.body).height()+10;r(window.parent.document).find("#myiframe").attr("height",t),e(),o.render()})}),o.on("submit(customer-edit-info-form-submit)",function(e){var o=i(r("#customer-add-edit-form-list"));o.invalidMark=s,o.userType=l,o.auditMark=c,o.deliveryReport=u,o.productionVerification=d,console.log(o),n.req({url:a.baseUrl+"sys/consumer/user/save",type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify(o),success:function(e){console.log(e),layui.table.reload("customer_listTab"),layer.close(t)}})})})}})}};r(".layui-btn").on("click",function(){var e=r(this).data("type");s[e]&&s[e].call(this)}),e("sys_coustomer",{})});