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

    table.render({
        elem: '#customer_listTab'
        ,url: setter.baseUrl+'sys/consumer/user/list'
        ,where: {
            access_token: layui.data('layuiAdmin').access_token
        }
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
             {field:'id', title: 'id', sort: true}
            ,{field:'username', title: '用户名'}
            ,{field:'email', title: '邮箱', sort: true}
            ,{field:'skypeId', title: 'Skype', sort: true}
            ,{field:'mobilePhone', title: '电话', sort: true}
            ,{field:'googleId', title: 'Google', sort: true, align: 'right'} //单元格内容水平居中
            ,{field:'facebookId', title: 'Facebook', sort: true, align: 'right'}
            ,{field:'address', title: '地址', sort: true, align: 'right'}
            ,{field:'country', title: '国家', sort: true}
            ,{field:'city', title: '城市', sort: true}
            ,{field:'jobrole', title: '工作角色', sort: true}
            ,{field:'businessType', title: '业务类型', sort: true}
            ,{field:'applications', title: '应用', sort: true}
            ,{field:'gmtCreate', title: '注册时间', sort: true}
            ,{field:'gmtModified', title: '更新时间', sort: true}
            ,{field:'userSystemId', title: '用户系统id', sort: true}
            ,{width:150, align:'center',align:'center',fixed: 'right',toolbar:'#role-table-operate-barDemo',title:'操作'}
        ]]
        ,page: true
    });

    //监听 工具条
    table.on('tool(customer_listTab)',function(obj){
        var data = obj.data;
        console.log(data);
        if (obj.event === 'edit') {
            admin.popup({
                title:'编辑客户',
                area:['720px', '780px'],
                id:'LAY-popup-customer-edit',
                btn:['提交','取消'],
                yes:function(index, layero){
                    $("#layuiadmin-app-form-submit").click();
                },
                end:function(){},
                success:function(layero,index){
                    view(this.id).render('/infoManagement/iframeWindow/customer_edit_info',data).done(function(){
                        form.render(null,'layuiadmin-app-form-list');

                        //监听提交
                        form.on('submit(layuiadmin-app-form-submit)',function(data){
                            var field = data.field;
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
        }
    });


    var active = {
        customerInfo_add:function(){
            var that = this;
            admin.popup({
                type: 1,
                title: '客户用户新增',
                shadeClose: true,
                shade: false,
                maxmin: false, //开启最大化最小化按钮
                area: ['720px', '780px'],
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
                        form.render(null,'layuiadmin-app-form-list');
                        //监听提交
                        form.on('submit(layuiadmin-app-form-submit)',function(data){
                            var field = data.field;
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