/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate"],function(e){table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,laydate=layui.laydate,setter=layui.setter,element=layui.element;layui.jquery;form.on("submit(LAY-app-indicator-contlist-search)",function(e){var t=e.field;console.log(t),table.reload("indicator_listTab",{where:t})}),table.render({elem:"#indicator_listTab",url:setter.baseUrl+"epc/process/list",parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left",width:50},{field:"id",minWidth:80,title:"ID",align:"center"},{field:"processCname",minWidth:80,title:"工序名称（中）",align:"center"},{field:"processInfo",minWidth:140,title:"详细",align:"center",edit:"text"},{field:"orderNum",minWidth:80,title:"排序",align:"center",edit:"text"}]],page:!0,limit:30}),e("epc_indicatorCardForm",{})});