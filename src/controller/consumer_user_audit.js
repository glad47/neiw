/**

 @Name:    市场管理－－［订单评审］

 */


layui.define(['admin','table','index','element','form','laydate', 'edit_customer_info'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        // ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element
        ,edit_customer_info = layui.edit_customer_info;
    var $ = layui.jquery;

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    table.render({
        elem: '#tabConsumerUserAudit'
        ,url: setter.baseUrl+'/sys/pa/consumerUserList'
        ,toolbar: "#consumerUserAuditTb"
        ,cellMinWidth: 80
        ,id: "tabConsumerUserAudit"
        ,page: true
        ,parseData: function (res) {
            return {
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {type:'checkbox',fixed: 'left'}
            ,{field: 'status',title: '状态', Width: 110, sort: true, templet: '#customerUserAuditStatus'}
            ,{field: 'userSystemId',title: '客户代码', Width: 130, sort: true}
            ,{field: 'userName',title: '客户名称', Width: 150, sort: true}
            ,{field: 'businessName',title: '业务员', width: 110, sort: true}      // 1 ＝ 待报价
            ,{field: 'commission',title: '提成', Width: 110, sort: true, edit: 'text'}
            ,{field: 'country',title: '国家', minWidth: 219, sort: true}
            ,{field: 'siteUrl',title: '网站', Width: 110, sort: true}
            ,{field: 'email',title: '客户邮箱', Width: 170, sort: true}
            ,{field: 'channel',title: '渠道', Width: 110, sort: true}
            ,{field: 'orderNumNo',title: '订单编号', Width: 110, hide: true, sort: true}
            ,{fixed: 'right', title:'操作', toolbar: '#consumerUserAuditRTb',width: 150, sort: true}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(tabConsumerUserAudit)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        if (data.length < 1) {
            layer.msg('请选择一条数据！');
            return false;
        }
        if (obj.event == 'customerUserAuditsh') {
            var postData = [];
            for (var i=0;i<data.length;i++) {
                var obj = {};
                obj.id = data[i].id;
                obj.status = 2;
                postData.push(obj)
            }
            layer.confirm("审核", {
                btn: ['审核','取消']
            }, function () {
                admin.req({
                    url:setter.baseUrl+'sys/pa/consumerUserUpdate',
                    type:'POST',
                    data: JSON.stringify(postData),
                    contentType: "application/json;charset=utf-8",
                    success: function () {
                        layer.msg('审核成功');
                        layui.table.reload('tabConsumerUserAudit');
                        layer.closeAll();
                    }
                });
            });
        }
    });
    // 监听修改提成点
    table.on('edit(tabConsumerUserAudit)', function(obj){
        layer.msg(obj.value)
       admin.req({
           type: 'post',
           data: JSON.stringify([obj.data]),
           contentType: "application/json;charset=utf-8",
           url: setter.baseUrl + 'sys/pa/consumerUserUpdate',
           success: function (res) {
               layer.msg('修改成功！');
           }
       })
    });

    table.on('tool(tabConsumerUserAudit)',function(obj){
        var data = obj.data;
        if (obj.event == 'cuartb-edit') {
            data.reTab = "tabConsumerUserAudit";
            edit_customer_info.editInfo(data);
        }
    });
    // 监听搜索
    form.on('submit(consumer-user-audit-search)', function(data){
        var field = data.field;
        //执行重载
        table.reload('tabConsumerUserAudit', {
            where: field
        });
    });
    // 业务员
    form.on('select(sel-consumer-user-audit-businessName)', function (data) {
        $("*[lay-filter='consumer-user-audit-search']").click();
    });
    $(".consumer-user-audit-form-search input").keypress(function (e) {
        if (e.which == 13) {
            $("*[lay-filter='consumer-user-audit-search']").click();
        }
    });
    exports('consumer_user_audit', {});
});