/**
 * 编辑客户信息
 */
layui.define(['admin', 'form', 'edit_customer_addAddr'], function (exports) {
    var $ = layui.jquery,
        admin = layui.admin;
    customerAddAddr = layui.edit_customer_addAddr;
    var obj = {
        editInfo: function (data) {
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
                    });
                }
            });
        }
    }
    exports('edit_customer_info', obj)
});