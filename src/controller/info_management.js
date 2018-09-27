/**

 @Name：layuiAdmin 用户管理 管理员管理 角色管理
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：LPPL

 */


layui.define(['table', 'form'], function(exports){
    var $ = layui.$
        ,admin = layui.admin
        ,view = layui.view
        ,table = layui.table
        ,form = layui.form;

    //监听form表单checkbox,管理复选框，全选/取消全选操作
    //监听权限管理checkbox
    form.on('checkbox(usereditQxgl)',function(data){
        var this_checkboxValue = data.elem.value;
        var  a = data.elem.checked;
        if (this_checkboxValue == 'usereditQxgl' && a == true) {
            layer.msg("全选");
            $("#user_qxgl input[type='checkbox']").prop("checked",true);
            form.render('checkbox');
        } else {
            $("#user_qxgl input[type='checkbox']").prop("checked",false);
            form.render('checkbox');
        }
        console.log("得到checkbox原始DOM对象:"+data.elem); //得到checkbox原始DOM对象
        console.log("是否被选中:"+data.elem.checked); //是否被选中，true或者false
        console.log("复选框value值:"+data.value); //复选框value值
        console.log("得到美化后的DOM对象"+data.othis); //得到美化后的DOM对象
    });
    //监听栏目管理checkbox
    form.on('checkbox(usereditLmgl)',function (data) {
        var a = data.elem.checked;
        var this_checkboxValue = data.elem.value;
        if (this_checkboxValue == 'usereditLmgl' && a == true) {
            layer.msg("全选");
            $("#user_lmgl input[type='checkbox']").prop("checked",true);
            form.render('checkbox');
        } else {
            $("#user_lmgl input[type='checkbox']").prop("checked",false);
            form.render('checkbox');
        }
    });
    //监听文档管理checkbox
    form.on('checkbox(usereditWdgl)',function (data) {
        var a = data.elem.checked;
        var this_checkboxValue = data.elem.value;
        if (this_checkboxValue == 'usereditWdgl' && a == true) {
            layer.msg("全选");
            $("#user_wdgl input[type='checkbox']").prop("checked",true);
            form.render('checkbox');
        } else {
            $("#user_wdgl input[type='checkbox']").prop("checked",false);
            form.render('checkbox');
        }
    });

    //用户管理
    table.render({
        elem: '#user_infoTab'
        ,url: './json/infoManagement/customer_info.js' //模拟接口
        ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field: 'id', width: 100, title: '用户ID', sort: true,minWidth:100,align:'center'}
            ,{field: 'username', title: '用户名',minWidth:144,align:'center'}
            ,{field: 'name', title: '姓名',minWidth:106,align:'center'}
            ,{field: 'department', title: '部门',minWidth:107,align:'center'}
            ,{field: 'position', title: '职称',minWidth:107,align:'center'}
            ,{field: 'worknumber', width: 80, title: '工号',minWidth:105,align:'center'}
            ,{field: 'officephone', title: '办公电话',minWidth:106,align:'center'}
            ,{field: 'skype', title: 'Skype', sort: true,minWidth:154,align:'center'}
            ,{field: 'email', title: 'Email', sort: true,minWidth:171,align:'center'}
            ,{field: 'bankcode', title: '银码', sort: true,minWidth:108,align:'center'}
            ,{field: 'status', title: '状态', sort: true,minWidth:162,align:'center'}
            ,{field: 'founder', title: '创建人', sort: true,minWidth:106,align:'center'}
            ,{field: 'creattime', title: '创建时间', sort: true,minWidth:152,align:'center'}
            ,{field: 'modifier', title: '修改人', sort: true,minWidth:109,align:'center'}
            ,{field: 'edittime', title: '修改时间', sort: true,minWidth:152,align:'center'}
            ,{title: '操作', width: 90, align:'center', fixed: 'right', toolbar: '#table-userinfo'}
        ]]
        ,page: true
        ,limit: 30
        ,height: 'full-320'
        ,text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(user_infoTab)', function(obj){
        var data = obj.data;
        if(obj.event === 'del'){
            layer.prompt({
                formType: 1
                ,title: '敏感操作，请验证口令'
            }, function(value, index){
                layer.close(index);

                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    layer.close(index);
                });
            });
        } else if(obj.event === 'edit'){
            admin.popup({
                title: '编辑用户'
                ,area: ['717px', '561px']
                ,id: 'LAY-popup-user-add'
                ,success: function(layero, index){
                    view(this.id).render('infoManagement/iframeWindow/user_edit_info', data).done(function(){
                        form.render(null, 'user_editInfo_form');

                        //监听提交
                        form.on('submit(LAY-user-front-submit)', function(data){
                            var field = data.field; //获取提交的字段

                            //提交 Ajax 成功后，关闭当前弹层并重载表格
                            //$.ajax({});
                            layui.table.reload('LAY-user-manage'); //重载表格
                            layer.close(index); //执行关闭
                        });
                    });
                }
            });
        }
    });

    //管理员管理
    table.render({
        elem: '#LAY-user-back-manage'
        ,url: './json/useradmin/mangadmin.js' //模拟接口
        ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field: 'id', width: 80, title: 'ID', sort: true}
            ,{field: 'loginname', title: '登录名'}
            ,{field: 'telphone', title: '手机'}
            ,{field: 'email', title: '邮箱'}
            ,{field: 'role', title: '角色'}
            ,{field: 'jointime', title: '加入时间', sort: true}
            ,{field: 'check', title:'审核状态', templet: '#buttonTpl', minWidth: 80, align: 'center'}
            ,{title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin'}
        ]]
        ,text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-user-back-manage)', function(obj){
        var data = obj.data;
        if(obj.event === 'del'){
            layer.prompt({
                formType: 1
                ,title: '敏感操作，请验证口令'
            }, function(value, index){
                layer.close(index);
                layer.confirm('确定删除此管理员？', function(index){
                    console.log(obj)
                    obj.del();
                    layer.close(index);
                });
            });
        }else if(obj.event === 'edit'){
            admin.popup({
                title: '编辑管理员'
                ,area: ['420px', '450px']
                ,id: 'LAY-popup-user-add'
                ,success: function(layero, index){
                    view(this.id).render('user/administrators/adminform', data).done(function(){
                        form.render(null, 'layuiadmin-form-admin');

                        //监听提交
                        form.on('submit(LAY-user-back-submit)', function(data){
                            var field = data.field; //获取提交的字段

                            //提交 Ajax 成功后，关闭当前弹层并重载表格
                            //$.ajax({});
                            layui.table.reload('LAY-user-back-manage'); //重载表格
                            layer.close(index); //执行关闭
                        });
                    });
                }
            });
        }
    });

    //角色管理
    table.render({
        elem: '#LAY-user-back-role'
        ,url: './json/useradmin/role.js' //模拟接口
        ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field: 'id', width: 80, title: 'ID', sort: true}
            ,{field: 'rolename', title: '角色名'}
            ,{field: 'limits', title: '拥有权限'}
            ,{field: 'descr', title: '具体描述'}
            ,{title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin'}
        ]]
        ,text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-user-back-role)', function(obj){
        var data = obj.data;
        if(obj.event === 'del'){
            layer.confirm('确定删除此角色s？', function(index){
                obj.del();
                layer.close(index);
            });
        }else if(obj.event === 'edit'){
            admin.popup({
                title: '添加新角色'
                ,area: ['500px', '480px']
                ,id: 'LAY-popup-user-add'
                ,success: function(layero, index){
                    view(this.id).render('user/administrators/roleform', data).done(function(){
                        form.render(null, 'layuiadmin-form-role');

                        //监听提交
                        form.on('submit(LAY-user-role-submit)', function(data){
                            var field = data.field; //获取提交的字段

                            //提交 Ajax 成功后，关闭当前弹层并重载表格
                            //$.ajax({});
                            layui.table.reload('LAY-user-back-role'); //重载表格
                            layer.close(index); //执行关闭
                        });
                    });
                }
            });
        }
    });

    exports('info_management', {})
});