/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.define(["admin","table","index","element","form","laydate"],function(e){function t(){if(null!=i.startOrderTime&&i.endOrderTime){var e=i.startOrderTime,t=i.endOrderTime;return console.log(12112),!(t<e)||(layer.msg("结束时间不能小于开始时间, 请重新选择！！！"),!1)}}table=layui.table,view=layui.view,admin=layui.admin,form=layui.form,laydate=layui.laydate,setter=layui.setter,element=layui.element;var r=layui.jquery,i={startOrderTime:null,endOrderTime:null,orderField:null,monthMark:null,businessName:null};laydate.render({elem:"#pdlStartOrderTime",done:function(e,l,a){i.startOrderTime=e,i.monthMark=null,r("select[name='monthMark']").val(""),form.render(),null!=i.endOrderTime&&t()&&tabReloadOPL()}}),laydate.render({elem:"#pdlEndOrderTime",done:function(e,l,a){i.endOrderTime=e,i.monthMark=null,r("select[name='monthMark']").val(""),form.render(),null!=i.startOrderTime&&t()&&tabReloadOPL()}}),table.render({elem:"#tabOrderPdList",url:setter.baseUrl+"/sys/pa/orderPaList",toolbar:"#tabOrderPdListTb",cellMinWidth:80,id:"tabOrderPdList",page:!0,parseData:function(e){return{code:0,data:e.page.list,count:e.page.totalCount}},cols:[[{type:"checkbox",fixed:"left"},{field:"orderTime",title:"下单日期",width:210,sort:!0},{field:"pcbName",title:"型号",width:210,sort:!0},{field:"businessName",title:"业务员",width:160,sort:!0},{field:"customerUserPaVO",title:"客户名称",Width:110,sort:!0,templet:"<a>{{ d.customerUserPaVO.userName || 0 }}</a>"},{field:"customerUserPaVO",title:"国家",minWidth:219,sort:!0,templet:"<a>{{ d.customerUserPaVO.cname || '' }}</a>"},{field:"customerUserPaVO",title:"网站",minWidth:219,sort:!0,templet:"<a>{{ d.customerUserPaVO.siteUrl || 0 }}</a>"},{field:"customerUserPaVO",title:"客户邮箱",minWidth:219,sort:!0,templet:"<a>{{ d.customerUserPaVO.email || 0 }}</a>"},{field:"payLogId",title:"是否支付",minWidth:219,sort:!0,templet:"#oplPayLogId"},{field:"payTime",title:"支付日期",width:210,sort:!0},{field:"totalFee",title:"订单金额",width:180,sort:!0},{field:"commission",title:"提成",width:150,sort:!0,edit:"text"},{field:"customerUserPaVO",title:"渠道",minWidth:219,sort:!0,templet:"<a>{{ d.customerUserPaVO.channel || 0 }}</a>"},{field:"unitPrice",title:"新客户",width:110,sort:!0},{field:"orderNumNo",title:"订单编号",width:110,hide:!0,sort:!0}]],done:function(e,t,r){}}),e("order_pd_List",{})});