/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form"],function(e){table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element;var i=layui.jquery;element.on("form(demo)",function(e){console.log(e),alert("1")}),form.render(null,"supplierInfo_from"),form.on("submit(LAY-app-supplier-search)",function(e){var i=e.field;table.reload("supplier_infoTab",{where:i})}),table.render({elem:"#supplier_infoTab",url:setter.baseUrl+"sys/supplier/list",cellMinWidth:80,id:"supplier_infoTab",page:!0,toolbar:!0,cols:[[{field:"id",title:"ID",hide:!1},{field:"supplierId",title:"供应商编号",sort:!0,width:110},{field:"companyName",title:"公司名称",width:180},{field:"type",title:"类别",sort:!0,width:120,templet:"#type"},{field:"contact",title:"联系人",sort:!0,width:120},{field:"officePhone",title:"办公电话",sort:!0,width:120},{field:"phone",title:"手机",align:"center",sort:!0,width:120},{field:"email",title:"Email",sort:!0,width:200},{field:"paymentType",title:"付款方式",sort:!0,templet:"#paymentType",minWidth:104},{field:"taxe",title:"是否含税",sort:!0,templet:"#taxe",minWidth:110},{field:"invoiceType",title:"发票类型",sort:!0,templet:"#invoiceType"},{field:"strengths",title:"强项类型",sort:!0,templet:"#strengths",width:110},{field:"evaluateDdelivery",title:"交期",sort:!0,templet:"#evaluateDdelivery"},{field:"evaluateQuality",title:"品质",sort:!0,templet:"#evaluateQuality"},{field:"evaluateCompatibility",title:"配合度",sort:!0,templet:"#evaluateCompatibility"},{field:"evaluateRate",title:"评级",sort:!0,templet:"#evaluateRate"},{field:"createUserId",title:"创建人",sort:!0},{field:"createTime",title:"创建时间",sort:!0},{field:"updateUserId",title:"修改人",sort:!0},{field:"updateTime",title:"修改时间",sort:!0},{field:"remark",title:"备注",hide:!0},{title:"操作",width:160,align:"center",fixed:"right",toolbar:"#table-supplier"}]],done:function(){/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)&&i("#LAY_app_body").each(function(e){i("a[lay-event='edit']").html('<i class="layui-icon layui-icon-edit"></i>'),i("a[lay-event='search']").html('<i class="layui-icon layui-icon-search"></i>'),i("a[lay-event='del']").html('<i class="layui-icon layui-icon-delete"></i>'),i(".laytable-cell-1-0-22").css({width:"130px"})})}}),table.on("tool(supplier_infoTab)",function(e){var i=e.data,t=i.id,l=i.companyName;"edit"===e.event?admin.popup({title:"编辑供应商信息",shadeClose:!0,shade:!1,maxmin:!0,btn:["提交"]["取消"],id:"supplierAdd_form",area:["55%","75%"],success:function(e,l){view(this.id).render("/infoManagement/iframeWindow/supplier_edit",i).done(function(){console.log(i),form.render(null,"supplierAdd_form"),form.on("submit(LAY-supplier-add-submit)",function(e){var i=e.field;return i.id=t,console.log("修改供应商的信息为:"+JSON.stringify(i)),admin.req({type:"post",url:setter.baseUrl+"sys/supplier/update",data:i,done:function(e){layer.msg("供应商信息修改成功"),console.log("供应商信息修改成功"),layui.table.reload("supplier_infoTab")},fail:function(e){layer.msg("供应商信息修改失败！！"),console.log("供应商信息修改失败！！")}}),layer.close(l),!1})})}}):"search"===e.event?admin.popup({title:"供应商［"+l+"］信息",shadeClose:!0,shade:!1,maxmin:!0,area:["362px","399px"],success:function(e,t){view(this.id).render("/infoManagement/iframeWindow/supplier_search",i).done(function(){})}}):"del"===e.event&&layer.confirm("确定删除公司名为［"+l+"］的供应商？",function(i){admin.req({type:"post",url:setter.baseUrl+"sys/supplier/delete",data:{supplierIds:t},done:function(t){layer.msg("删除成功"),e.del(),layer.close(i),layui.table.reload("supplier_infoTab")},fail:function(e){layer.msg("服务器异常，稍后再试！")}})})});var t={supplier_add_but:function(e){i(this).attr("id");admin.popup({title:"添加供应商信息",shadeClose:!0,shade:!1,maxmin:!0,area:["55%","75%"],success:function(i,t){view(this.id).render("/infoManagement/iframeWindow/supplier_edit",e).done(function(){form.render(null,"supplierAdd_form"),form.on("submit(LAY-supplier-add-submit)",function(e){var i=e.field;return layer.alert(JSON.stringify(e.field)),admin.req({type:"post",url:setter.baseUrl+"sys/supplier/save",data:i,done:function(e){console.log(e),layer.msg("供应商添加成功"),layui.table.reload("supplier_infoTab")},fail:function(e){layer.msg("供应商加失败")}}),layer.close(t),!1})})}})}};i(".layui-btn").on("click",function(){var e=i(this).data("type");t[e]&&t[e].call(this)}),e("sys_supplier",{})});