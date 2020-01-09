/**
 * 编辑客户信息
 */
layui.define(['admin', 'form', 'edit_customer_addAddr'], function (exports) {
    var $ = layui.jquery,
        admin = layui.admin;
    customerAddAddr = layui.edit_customer_addAddr;
    var obj = {
        editInfo: function (data) {
            var _reTab = data.reTab;
            admin.popup({
                title:'编辑客户',
                area:['60%', '100%'],
                id:'LAY-popup-customer-edit',
                btn:['提交','取消'],
                yes:function(index, layero){
                    $("#layuiadmin-app-form-submit").click();
                },
                btn2: function () {
                    if (localStorage.getItem("receiverAddersEntityList")) {
                        layer.confirm("地址尚未更新保存，确定返回?", () => {
                            console.log('清除地址缓存');
                            localStorage.removeItem("receiverAddersEntityList");
                            layer.closeAll();
                        }, () => {
                            return false;
                        })
                    }
                },
                btn3: function () {
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
                            var receiverAddersEntityList = localStorage.getItem("receiverAddersEntityList");
                            if (receiverAddersEntityList) {
                                receiverAddersEntityList = JSON.parse(receiverAddersEntityList)
                                receiverAddersEntityList.reduce((prev, cur) => {    // 删除id
                                    delete cur.id;
                                    if (cur.isDefault == 'on') {
                                        cur.isDefault = 1;
                                    }
                                    return prev;
                                }, 0)
                                field.receiverAddersEntityList = receiverAddersEntityList;
                            }
                            console.log(field);
                            admin.req({
                                url:setter.baseUrl+'sys/consumer/user/update',
                                type:'POST',
                                contentType: "application/json;charset=utf-8",
                                data: JSON.stringify(field),
                                success: function (data) {
                                    layui.table.reload(_reTab); //重载表格
                                    layer.close(index); //执行关闭
                                }
                            });
                        });

                        // 监听添加地址
                        form.on('select(ssdz)', function (data) {
                            var _val = data.value;
                            if (_val === 'addAddr') {
                                customerAddAddr.addAddr({title: '添加', data: {}});
                            }
                            // 给 localStorage 数据设置一个默认地址
                            var _ls = localStorage.getItem("receiverAddersEntityList");
                            layer.msg(_val);
                            console.log(_val);
                            if (_ls) {
                                _ls = JSON.parse(_ls);
                                _ls.reduce((prev, cur) => {
                                    if (cur.id == _val) {
                                        console.log(cur)
                                        cur.isDefault = 1;   // 默认地址
                                    }
                                    return prev;
                                },[]);
                                localStorage.setItem("receiverAddersEntityList", JSON.stringify(_ls));
                            }
                        })
                    });
                }
            });
        }
    }
    exports('edit_customer_info', obj)
});