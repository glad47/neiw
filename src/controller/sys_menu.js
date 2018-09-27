/**

 @Name：layuiAdmin 用户管理 管理员管理 角色管理
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：LPPL

 */


layui.define(['table', 'form'], function(exports){
    var $ = layui.$
        ,table = layui.table
        ,admin = layui.admin
        ,view = layui.view
        ,form = layui.form;
        table.render({
           elem: '#sys_menu'
            ,height: 521
            ,url: 'http://192.168.0.155:8080/renren-fast/sys/menu/erplist'
            ,where: {
                access_token: layui.data('layuiAdmin').access_token
            }
            ,cols:[[
                {field: 'menuId',title: 'ID',sort: true,minWidth:100,align:'center'}
                ,{field: 'title', title: '名称',minWidth:144,align:'center'}
                ,{field: 'menuup', title: '上级菜单',minWidth:106,align:'center'}
                ,{field: 'icon', title: '图标',minWidth:107,align:'center'}
                ,{field: 'type', title: '类型',minWidth:107,align:'center',id:'menu_type'}
                ,{field: 'orderNum', width: 80, title: '排序号',minWidth:105,align:'center'}
                ,{field: 'jump', title: '菜单URL',minWidth:106,align:'center'}
                ,{field: 'perms', title: '授权标识', sort: true,minWidth:154,align:'center'}
                ,{title: '操作', width: 165, align:'center', fixed: 'right', toolbar: '#menu_opreation'}
            ]]

        });

    //监听工具条
    table.on('tool(sys_menuTab)', function(obj){
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
                ,id: 'LAY-popup-menu-edit'
                ,success: function(layero, index){
                    view(this.id).render('infoManagement/iframeWindow/sys_menuAdd', data).done(function(){
                        form.render(null, 'user_menuAdd_form');

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

    //时间
    var active = {
        userInfo_add: function () {
            admin.popup({
                title:'添加菜单',
                area: ['717px','561px'],
                id:'LAY-popup-menu-add',
                success: function (layero,index) {
                    view(this.id).render('/infoManagement/iframeWindow/sys_menuAdd').done(function () {
                        form.render(null, 'user_menuAdd_form');

                        //监听提交
                        form.on('submit(LAY-menu-add-submit)', function (data) {
                            var field = data.field; //获取提交的字段

                            //提交 Ajax成功后，关闭房前弹层并重载表格
                            //$.ajax ({})
                            layui.table.reload('user_infoTab'); // 重载表格
                            layer.close(index); //执行关闭
                        });
                    });
                }
            })
        }
    }
    $('.layui-btn').on('click',function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });


    exports('sys_menu', {})
});