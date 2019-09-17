/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","uploadCommon","filePathProcess"],function(e){table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,setter=layui.setter,element=layui.element,$=layui.jquery,uploadCommon=layui.uploadCommon,filePathProcess=layui.filePathProcess,table.render({elem:"#epcToolMana_tab",url:setter.baseUrl+"epc/tool/list",toolbar:"#epcToolMana_tb",cellMinWidth:80,id:"epcToolMana_tab",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"productNo",title:"内部型号",width:130,fixed:"left",sort:!0},{field:"makeWay",title:"制作方式",width:89,sort:!0},{field:"type",title:"类型",width:110,sort:!0},{field:"cost",title:"费用",width:110,sort:!0},{field:"manufacturers",title:"制造商",width:200,sort:!0},{field:"productionTime",title:"制作时间",width:110,sort:!0},{field:"supplier",title:"供应商存放",width:200,sort:!0},{field:"supplierNo",title:"供应商编号",width:183,sort:!0},{field:"gmtCreate",title:"创建时间",width:177,sort:!0},{field:"gmtModified",title:"修改时间",width:177,sort:!0},{field:"storageTime",title:"存放时间",width:177,sort:!0},{field:"remark",title:"备注",width:130,sort:!0},{field:"id",title:"ID",hide:!0},{fixed:"right",title:"操作",toolbar:"#epcToolMana_tabbar",width:230}]],done:function(e,t,o){}}),table.on("toolbar(epcToolMana_tab)",function(e){table.checkStatus(e.config.id),new Object;switch(e.event){case"add":admin.popup({title:"添加工具",area:["733px","532px"],btn:["保存","取消"],yes:function(e,t){$("button[lay-filter='add_tool_submit']").click(),table.reload("epcToolMana_tab")},success:function(e,t){view(this.id).render("epcManagement/iframeWindow/add_tool").done(function(){})}})}}),table.on("tool(epcToolMana_tab)",function(e){var t=e.data,o=t.id;console.log("_this_id"+o),"edit"==e.event?admin.popup({title:"工具编辑",area:["733px","532px"],btn:["保存","取消"],yes:function(e,t){$("button[lay-filter='add_tool_submit']").click()},success:function(e,o){view(this.id).render("epcManagement/iframeWindow/add_tool",t).done(function(){})}}):"del"==e.event?layer.confirm("确定删除？",{btn:["删除","取消"],btn1:function(t,i){admin.req({type:"post",data:{ids:o},url:setter.baseUrl+"/epc/tool/delete",success:function(){e.del(),layer.close(t),layer.msg("删除成功")}})}}):"zrs"==e.event?admin.popup({title:"资产保管责任书",area:["56%","80%"],id:"popup_zrs",btn:["打印","取消"],yes:function(e,t){document.body.innerHTML=document.getElementById("print_toolZrs").innerHTML,window.print(),window.location.reload()},success:function(e,o){view(this.id).render("epcManagement/iframeWindow/tool_zrs",t).done(function(){console.log(t)})}}):"tool-fileMang"==e.event&&(console.log(t),admin.popup({title:"测试架资料管理",area:["870px","303px"],success:function(e,o){view(this.id).render("epcManagement/iframeWindow/tool_file_management",t).done(function(){})},end:function(){localStorage.removeItem("saveBackResult")}}))}),form.on("submit(tool-mangement-search)",function(e){var t=e.field;table.reload("epcToolMana_tab",{where:t})}),form.on("select(search-toolMana)",function(e){$("*[lay-filter='tool-mangement-search']").click()}),$(".tool-mana-form-search input").bind("input propertychange",function(e){$("*[lay-filter='tool-mangement-search']").click()}),e("epc_toolMangement",{})});