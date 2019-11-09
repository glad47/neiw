/**
 * 编辑客户信息
 */
layui.define(['admin', 'form'], function (exports) {
    var $ = layui.jquery,
        admin = layui.admin;
    var obj = {
        editInfo: function (data) {
            var _reTab = data.reTab;
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
                            console.log(field);
                            admin.req({
                                url:setter.baseUrl+'sys/consumer/user/update',
                                type:'POST',
                                data:field,
                                success:function(data){
                                    layui.table.reload(_reTab); //重载表格
                                    layer.close(index); //执行关闭
                                }
                            });
                        });
                    });
                }
            });
        }
    }
    exports('edit_customer_info', obj)
});