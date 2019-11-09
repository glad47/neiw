layui.define(['admin', 'table','element','form'], function(exports){
    var table = layui.table,
    $ = layui.jquery,
    element = layui.element,
    admin = layui.admin,
    form = layui.form,
    view = layui.view,
    setter = layui.setter;
    
    form.render(null,'app-content-comment');
    //监听搜索
    form.on('submit(LAY-app-contlist-search)', function(data){
        var field = data.field;
        console.log(field);
        //执行重载
        table.reload('customer_listTab', {
            where: field
        });
    });
    $(".customer-info-form-search input").bind("input propertychange", function (even) {
        $("*[lay-filter='LAY-app-contlist-search']").click();
    });
    table.render({
        elem: '#customer_listTab'
        ,url: setter.baseUrl+'sys/consumer/user/list'

        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
             {field:'id', title: 'id', sort: true, width: 130}
            ,{field:'status', title: '状态', width: 130, templet:'#customerStatus'}
            ,{field:'userSystemId', title: '客户ID', sort: true, width: 130}
            ,{field:'userName', title: '用户名', width: 130}
            ,{field:'email', title: '邮箱', sort: true, minWidth: 196}
            ,{field:'countryName', title: '收货国家', sort: true}
            ,{field:'gmtCreate', title: '注册时间', sort: true}
            ,{field:'gmtModified', title: '更新时间', sort: true}

            ,{field:'userType',title:'内外',sort:true, templet:'#userType', width: 130, hide: true}
            ,{field:'userIp',title:'注册IP',sort:true, hide: true}
            ,{field:'skypeId', title: 'Skype', sort: true, hide: true}
            ,{field:'receiverTelephone', title: '收货电话',minWidth: 120, sort: true, hide: true}
            ,{field:'googleId', title: 'Google', sort: true, align: 'right', hide: true} //单元格内容水平居中
            ,{field:'facebookId', title: 'Facebook', sort: true, align: 'right', hide: true}
            ,{field:'receiverCompany',title:'公司名',sort:true, align:'right', hide: true}
            ,{field:'receiverAddress', title: '收货地址', sort: true, align: 'right', hide: true}
            ,{field:'receiverCity', title: '收货城市', sort: true, hide: true}
            ,{field:'jobrole', title: '工作角色', sort: true, hide: true}
            ,{field:'contact', title: '联系人', sort: true, hide: true}
            ,{field:'businessType', title: '业务类型', sort: true, hide: true}
            ,{field:'applications', title: '应用', sort: true, hide: true}
            ,{width:250, align:'center',align:'center',fixed: 'right',toolbar:'#role-table-operate-barDemo',title:'操作'}
        ]]
        ,done: function (res, curr, count) {
            $(".layui-table tr div").each(function () { //  已经审核  移除 审核按钮
               if ($(this).text().indexOf('已审核') > 0) {
                   $(this).parents("tr").children("td:last").find("a[lay-event='customerInfosh']").remove();
               }
            });
        }
        ,page: true
    });

    //监听 工具条
    table.on('tool(customer_listTab)',function(obj){
        var data = obj.data;
        console.log(data);
        if (obj.event === 'edit') {
            admin.popup({
                title:'编辑客户',
                area:['40%', '100%'],
                id:'LAY-popup-customer-edit',
                btn:['提交','取消'],
                yes:function(index, layero){
                    $("#layuiadmin-app-form-submit").click();
                },
                btn3: function() {
                    $(".edit-cusInfo input").each(function (index) {
                       $(this).removeAttr("lay-verify");
                        // $("#layuiadmin-app-form-submit").click();
                    });
                },
                end:function(){},
                success:function(layero,index){
                    view(this.id).render('/infoManagement/iframeWindow/customer_edit_info',data).done(function(){
                        form.render(null,'customer-add-edit-form-list');
                        var invalidMark;
                        form.on('switch(optionUser)',function (data) {
                            console.log(data.field);
                            if (data.elem.checked == true){
                                layer.msg('已启用');
                                invalidMark =0;
                            } else {
                                layer.msg('停用');
                                invalidMark =1;
                            }
                        });

                        var userType;
                        form.on('switch(isneibuUser)',function (data) {
                            if (data.elem.checked == true){
                                layer.msg('内部用户');
                                userType =1;
                            } else {
                                layer.msg('客户系统用户');
                                userType =0;
                            }
                        });
                        var deliveryReport = 0;
                        form.on('switch(deliveryReport)',function (data) {
                            if (data.elem.checked == true){
                                layer.msg('需要出货报告');
                                deliveryReport =1;
                            } else {
                                layer.msg('不需要出货报告');
                                deliveryReport =0;
                            }
                        });
                        var auditMark;
                        form.on('switch(isAuditMark)',function(data){
                            if (data.elem.checked == true) {
                                layer.msg('需要审核');
                                auditMark = 0;
                            }else{
                                layer.msg('不需审核');
                                auditMark = 1;
                            }
                        });

                        var productionVerification;
                        form.on('switch(productionVerification)', function (data) {
                            if (data.elem.checked == true) {
                                layer.msg('需要确定生产资料');
                                productionVerification = 1;
                            }  else {
                                layer.msg('不需要确定生产资料');
                                productionVerification = 0;
                            }
                        });

                        //监听提交
                        form.on('submit(layuiadmin-app-form-submit)',function(data){
                            var field = data.field;
                            field.invalidMark = invalidMark;   
                            field.userType = userType;
                            field.auditMark = auditMark;
                            field.deliveryReport = deliveryReport;
                            field.productionVerification = productionVerification;
                            admin.req({
                                url:setter.baseUrl+'sys/consumer/user/update',
                                type:'POST',
                                data:field,
                                success:function(data){
                                    layui.table.reload('customer_listTab'); //重载表格
                                    layer.close(index); //执行关闭 
                                }
                            });
                        });
                    });
                }
            });
        } else if (obj.event === 'del') {
            layer.confirm('确定删除此客户？', function(index){
                admin.req({
                    url:setter.baseUrl+'sys/consumer/user/delete',
                    type:'POST',
                    data:{ids:data.id},
                    success:function(data){
                        layui.table.reload('customer_listTab'); //重载表格
                        layer.msg('已删除');
                    }
                });
            });
        } else if (obj.event === 'conversionCustomer') {    // 转客户
            admin.popup({
                type: 1,
                title: '选择跟单员',
                btn: ['转换', '取消'],
                area: ["300px","233px"],
                yes: function() {
                    $("*[lay-filter='conversionCustomer-submit']").click();
                },
                success: function (layero, index) {
                    view(this.id).render('/infoManagement/iframeWindow/conversionCustomer', data).done(function () {
                        form.render();
                    });
                }
            })
        } else if (obj.event === 'customerInfosh') {
            admin.popup({
                type: 1,
                title: '审核',
                btn: ['审核', '取消'],
                area: ["396px","299px"],
                id: "popupCustomerInfosh",
                yes: function () {
                    layer.confirm("确定提交审核？", function () {
                        $("input[lay-filter='customersh-submit']").click();
                    });
                },
                success: function () {
                    view(this.id).render('/infoManagement/iframeWindow/customer_sh', data).done(function () {
                        form.render();
                    });
                }
            })
        }
    });


    var active = {
        customerInfo_add:function(){
            var that = this;
            admin.popup({
                type: 1,
                title: '客户新增',
                shadeClose: true,
                shade: false,
                maxmin: false, //开启最大化最小化按钮
                area: ['40%', '100%'],
                content:'<div class="layui-row" id="customer_edit_info"></div>',
                btn:['确定','取消'],
                yes: function(index, layero) {
                    $('#layuiadmin-app-form-submit').click();
                },
                success: function (layero,index) {
                    view('customer_edit_info').render('/infoManagement/iframeWindow/customer_edit_info')
                    .then(function (value) {
                        //视图文件请求完毕，视图内容渲染前的回调
                    }).done(function(){
                        form.render(null,'customer-add-edit-form-list');
                        //监听提交
                        var productionVerification;
                        form.on('switch(productionVerification)', function (data) {
                           if (data.elem.checked == true) {
                               layer.msg('需要确定生产资料');
                               productionVerification = 0;
                           }  else {
                               layer.msg('不需要确定生产资料');
                               productionVerification = 1;
                           }
                        });
                        var invalidMark;
                        form.on('switch(optionUser)',function (data) {
                            if (data.elem.checked == true){
                                layer.msg('已启用');
                                invalidMark =0;
                            } else {
                                layer.msg('停用');
                                invalidMark =1;
                            }
                        });

                        var userType;
                        form.on('switch(isneibuUser)',function (data) {
                            if (data.elem.checked == true){
                                layer.msg('内部用户');
                                userType =1;
                            } else {
                                layer.msg('客户系统用户');
                                userType =0;
                            }
                        });

                        var auditMark;
                        form.on('switch(isAuditMark)',function(data){
                            if (data.elem.checked == true) {
                                layer.msg('需要审核');
                                auditMark = 0;
                            }else{
                                layer.msg('不需审核');
                                auditMark = 1;
                            }
                        });

                        var deliveryReport = 0;
                        form.on('switch(deliveryReport)',function (data) {
                            if (data.elem.checked == true){
                                layer.msg('需要出货报告');
                                deliveryReport =1;
                            } else {
                                layer.msg('不需要出货报告');
                                deliveryReport =0;
                            }
                        });

                        form.on('submit(layuiadmin-app-form-submit)',function(data){
                            var field = data.field;
                            field.invalidMark = invalidMark;
                            field.userType = userType;
                            field.auditMark = auditMark;
                            field.deliveryReport = deliveryReport;
                            field.productionVerification = productionVerification;
                            // console.log(field);
                            admin.req({
                                url: setter.baseUrl+'sys/consumer/user/save',
                                type:'POST',
                                //dataType:'json',
                                //contentType:'application/json',
                                data: field,
                                success:function(data){
                                    console.log(data);
                                    layui.table.reload('customer_listTab'); //重载表格
                                    layer.close(index); //执行关闭 
                                }
                            })

                        });

                    });


                }
            });
        },

    };

    $('.layui-btn').on('click',function () {
        var type = $(this).data('type');
        active[type] && active[type].call(this);
    })


    exports('sys_coustomer', {})
});