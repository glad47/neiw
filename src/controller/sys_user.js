/**

 @Name： 用户信息信息管理

 */


layui.define(['admin', 'table', 'index','element','form'], function(exports){
    var $ = layui.jquery
        ,table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,element = layui.element
        var operationType;  //操作类型(新增&修改)

    function bouncer(arr) {
      // Don't show a false ID to this bouncer.
      return arr.filter(function(val){
        return !(!val || val === "");
      });
    }


    form.render(null, 'user-info-formlist')

    form.on('submit(LAY-user-info-search)',function(data){
        var field = data.field;
        table.reload('user_infoTab',{
           where: field 
        });
    });

    table.render({
        elem: '#user_infoTab'
        ,url: setter.baseUrl+'sys/user/list'
        ,cellMinWidth: 80
        ,id:"user_infoTab"
        ,toolbar: true
        ,page: true
        ,cols: [[
             {field:'userId', title: '用户ID', sort: true,width: 90,align: 'center'}
            ,{field:'username', title: '用户名',width: 180,align: 'center'}
            ,{field: 'mobile', title: '办公电话',minWidth:106,align:'center'}
            ,{field:'deptId', title: '部门id', sort: true,width: 150,align: 'center',hide: true}
            ,{field:'deptName', title: '部门', sort: true,width: 150,align: 'center'}
            ,{field:'jobNumber', title: '工号', align: 'center', sort: true,width: 120} //单元格内容水平居中
            ,{field:'skype', title: 'Skype', sort: true,width:120,align: 'center'} //单元格内容水平居中
            ,{field:'email', title: 'Email', sort: true,align: 'center'}
            ,{field:'status', title: '状态', sort: true,align: 'center',templet: '#user_status'}
            ,{field:'createUserId', title: '创建人',align: 'center'}
            ,{field:'createTime', title: '创建时间',width: 200,align: 'center'}
            ,{title: '操作', width: 115, align:'center',fixed: 'right', toolbar: '#user_info_Toolbar'}
        ]]
        ,done : function () {
            //手机端
            if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
                $("#LAY_app_body").each(function (e) {
                    $("a[lay-event='edit']").html("<i class=\"layui-icon layui-icon-edit\"></i>")
                    $("a[lay-event='search']").html("<i class=\"layui-icon layui-icon-search\"></i>")
                    $("a[lay-event='del']").html("<i class=\"layui-icon layui-icon-delete\"></i>")
                    $(".laytable-cell-1-0-22").css({"width":"130px"});
                })
            }
        }
    });

    //监听右侧工具条事件
    table.on('tool(user_infoTab)',function (obj) {
        var data = obj.data;
        var userId = data.userId;
        var username = data.username;
        var deptName = data.deptName;
        if (obj.event === 'edit'){
            operationType = "useredit";
            admin.req({
                type: 'get'
                ,url: setter.baseUrl+'sys/user/info/'+userId
                ,success : function (res) {
                    var datainfo = res.user;
                    datainfo.deptName = deptName;
                    console.log(datainfo);
                    admin.popup({
                        id: 'LAY-popup-sys-user-add'
                        ,title: '修改用户信息'
                        // ,shadeClose: true
                        // ,shade: false
                        // ,maxmin: true
                        ,btn:['提交','取消'] 
                        ,yes: function(index, layero) {
                            $('#layuiadmin-user-editInfo-form-submit').click();
                        }
                        ,area: ['766px', '510px']
                        ,success: function (layero, index) {
                            view(this.id).render('/infoManagement/iframeWindow/user_edit_info',datainfo).done(function () {
                                var status ;
                                form.render(null,'user_editInfo_form');
                                // form.on('switch(switchUser)',function (data) {
                                //     if (data.elem.checked == true){
                                //         layer.msg('已启用');
                                //         status =1;
                                //     } else {
                                //         layer.msg('停用');
                                //         status =0;
                                //     }
                                // });
                                form.on('submit(LAY-user-editInfo-submit)',function (data) {
                                    var field = data.field;
                                    console.log(data);
                                    field.userId = userId;
                                    // field.status = status;
                                    // var s = field.roleIdList;
                                    // console.log(bouncer(s));
                                    console.log("用户修改表单提交的信息为："+JSON.stringify(field));
                                    admin.req({
                                        type: 'post'
                                        ,url: setter.baseUrl+'sys/user/update'
                                        ,data: field
                                        ,done: function (res) {
                                            console.log(res);
                                            layer.msg('用户信息修改成功');
                                            layui.table.reload('user_infoTab'); //重载表格
                                        }
                                        ,fail: function (res) {
                                            layer.msg("用户信息修改失败，请稍后再试！");
                                        },
                                    });
                                    layer.close(index); //执行关闭
                                    return false;
                                })
                            })
                        }
                    });
                }
            });
            //console.log("获取到的用户的信息为："+result);
            
        } else if (obj.event === 'del'){
            layer.confirm('确定删除用户名名为［'+username+"］吗？", function(index){
                admin.req({
                    type:'post',
                    url: setter.baseUrl+'sys/user/delete'
                    ,data: {"userIds":userId}
                    ,done : function (res) {
                        layer.msg('用户删除成功');
                        obj.del();
                        layer.close(index);
                        table.reload('supplier_infoTab');
                    }
                    ,fail: function (res) {
                        layer.msg('服务器异常，稍后再试！');
                    }
                })
            });
        }
    })

    var active ={
        userInfo_add:function (data) {
            operationType = "useradd";
            var status ;
            admin.popup({
                title: '添加用户信息'
                // ,shadeClose: true
                // ,shade: false
                // ,maxmin: true
                ,area: ['766px', '510px']
                ,btn:['提交','取消'] 
                ,yes: function(index, layero) {
                    $('#layuiadmin-user-editInfo-form-submit').click();
                }
                ,success: function (layero,index) {
                    view(this.id).render('/infoManagement/iframeWindow/user_edit_info',data).done(function () {
                        form.render(null,'user_editInfo_form');
                        // form.on('switch(switchUser)',function (data) {
                        //     if (data.elem.checked == true){
                        //         layer.msg('已启用');
                        //         status =1;
                        //     } else {
                        //         layer.msg('停用');
                        //         status =0;
                        //     }
                        // });
                        form.on('submit(LAY-user-editInfo-submit)',function (data) {
                            var field = data.field;
                            // if (field.status == "" || field.status == null || field.status == 'off'){
                            //     field.status = 0;
                            // } else if (field.status == 'on'){
                            //     field.status = 1;
                            // }
                            console.log("新增用户提交的表单值为："+JSON.stringify(field));
                            admin.req({
                                type: 'post'
                                ,url: setter.baseUrl+'sys/user/save'
                                ,data: field
                                ,done: function (res) {
                                    console.log(res);
                                    layer.msg('用户信息添加成功');
                                    layui.table.reload('user_infoTab'); //重载表格
                                }
                                ,fail: function (res) {
                                    layer.msg("用户信息添加失败，请稍后再试！");
                                },
                            });
                            layer.close(index); //执行关闭
                            return false;
                        })
                    })
                }
            })
        }
    };

    $('.layui-btn.per_userAdd').on('click',function () {
        var type = $(this).data('type');
        active[type] && active[type].call(this);
    })

    // 表单验证
    form.verify({
        username: function (value,item) {
            if (value == null || value == ""){
                return '用户名不能为空！！！';
            }
        },
        password: function (value,item) {
            if (operationType == "useredit" ){
                return;
            } else if (value == null || value == "" ) {
                return '密码不能为空！！！';
            }
        },
        jobNumber: function (value,item) {
            if (value == null || value == ""){
                return '工号不能为空！！！';
            }
        },
    });

    // 搜索  部门下拉
    admin.req({
        type: 'get',
        url:  layui.setter.baseUrl + 'sys/dept/list',
        success: function (res) {
            var $html = "";
            var _data = res.data;
            for (var i=0;i<_data.length;i++) {
                $html += "<option value='"+_data[i].deptName+"'>"+_data[i].deptName+"</option>"
            }
            $("select[name='deptName']").append($html);
            form.render();
        }
    });


    exports('sys_user', {})
});
