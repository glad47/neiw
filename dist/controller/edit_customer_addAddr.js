/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin"],function(e){var d=layui.jquery,i=layui.form,t=layui.admin,r={addAddr:function(e){t.popup({title:e.title+"地址",area:["409px","589px"],id:"popAddAddr",btn:[e.title,"取消"],yes:function(){d("#customer-add-addr-submit").click()},success:function(t,r){view(this.id).render("/infoManagement/iframeWindow/customer_addAddr",e.data).done(function(){i.render(null,"customer-add-addr-form"),i.on("submit(customer-add-addr-submit)",function(e){e.field.id=Date.parse(new Date);var t=[],a=localStorage.getItem("receiverAddersEntityList");a&&(t=JSON.parse(a)),t.push(e.field),localStorage.setItem("receiverAddersEntityList",JSON.stringify(t)),d("select[name='ssdz']").append("<option value="+e.field.id+">联系人："+e.field.receiverName+"联系电话："+e.field.receiverTelephone+"</option>"),layer.msg("添加成功！"),setTimeout(function(){layer.close(r)},800),i.render()})})}})}};e("edit_customer_addAddr",r)});