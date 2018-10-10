/**

 @Name：layuiAdmin 用户管理 管理员管理 角色管理
 @License：LPPL

 */


layui.define(['table', 'form','element'], function(exports){
    var $ = layui.$
        ,table = layui.table
        ,admin = layui.admin
        ,view = layui.view
        ,setter = layui.setter
        ,element = layui.element
        ,form = layui.form;
    table.render({
        elem: '#sys_menu'
        ,height: 780
        ,url: setter.baseUrl+'sys/menu/erplist'
        ,id: 'sys_menu'
        ,page: true
        ,toolbar: true
        ,limit: 10
        ,where: {
            access_token: layui.data('layuiAdmin').access_token
        }
        ,cols:[[
            {field: 'menuId',title: 'ID',sort: true,minWidth:100,align:'center'}
            ,{field: 'title', title: '名称',minWidth:144,align:'center'}
            ,{field: 'parentName', title: '上级菜单',minWidth:106,align:'center'}
            ,{field: 'icon', title: '图标',minWidth:107,align:'center'}
            ,{field: 'type', title: '类型',minWidth:107,align:'center',templet:'#menu_type'}
            ,{field: 'orderNum', width: 80, title: '排序号',minWidth:105,align:'center'}
            ,{field: 'jump', title: '菜单URL',minWidth:106,align:'center'}
            ,{field: 'perms', title: '授权标识', sort: true,minWidth:154,align:'center'}
            ,{title: '操作', width: 165, align:'center', fixed: 'right', toolbar: '#menu_opreation'}
        ]]
        //废弃的（可用做：遍历某个div下面指定的元素，并且添加事件）
        // ,done (){
        //     $("#LAY_app").each(function (e) {
        //         var str = $("td[data-field='type']").text(), result = "";
        //         for(var i=0,len=str.length;i<len;i++){
        //             result += str[i];
        //             if(i % 1 == 0) result += ',';
        //         }
        //         var endArr = result.substring(0,result.length-1);
        //         for (var x=0;x < endArr.length;x++) {
        //             var element = $("tbody td[data-field='type']").eq(x);
        //             var type_value = element.text();
        //             if (type_value =="0"){
        //                 element.html("<div class=\"layui-table-cell laytable-cell-1-type\">一级菜单</div>");
        //             }
        //             if (type_value == "1") {
        //                 element.html("<div class=\"layui-table-cell laytable-cell-1-type\">二级菜单</div>");
        //             }
        //             if (type_ value == "2") {
        //                 element.html("<div class=\"layui-table-cell laytable-cell-1-type\">按钮</div>");
        //             }
        //         }
        //     })
        // }

    });




    /**
     * @author tzh  修改菜单
     * @type {{menu_add: menu_add}}
     */


    //监听工具条
    table.on('tool(sys_menuTab)', function(obj){
        var data = obj.data;
        var menuId = data.menuId;
        if(obj.event === 'del'){
            layer.confirm('确定删除此菜单？', function(index){
                admin.req({
                    type:'post',
                    url: 'http://192.168.0.155:8080/renren-fast/sys/menu/erpdelete/'+menuId
                    // ,data: obj.menuId
                    ,done : function (res) {
                        layer.msg('删除成功');
                        obj.del();
                        layer.close(index);
                    }
                    ,fail: function (res) {
                        layer.msg('服务器异常，稍后再试！');
                    }
                })
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            admin.popup({
                title: '编辑用户'
                ,area: ['717px', '561px']
                // ,id: 'sys_menu'
                ,success: function(layero, index){
                    view(this.id).render('infoManagement/iframeWindow/sys_menuAdd', data).done(function(){
                        form.render(null, 'user_menuAdd_form');
                        form.render(null, 'user_menuMe_form');
                        //监听tab，判断提交表单 －－－－－编辑菜单
                        element.on('tab(menu_tab)',function (data) {
                            var firSel = "0";
                            var tabNum = data.index;
                            if (tabNum == "0") {
                                //监听select
                                form.on('select(LAY-menu-dir-submit)',function (data) {
                                    var selValue = data.value;
                                    $("#menuAdd_menuup").find("option[text=selValue]").attr("selected",true);
                                    var firstSel =  $("#menuAdd_menuup  option:selected").attr('name');
                                    firSel = firstSel;
                                });
//＝＝＝目录编辑＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝监听目录编辑
                                form.on('submit(LAY-menu-add-submit)', function (data) {
                                    var field = data.field;
                                    field.parentId = firSel;
                                    field.type = "0";
                                    field.menuId= menuId;
                                    console.log(field);
                                    admin.req({
                                        type:'post',
                                        url: 'http://192.168.0.155:8080/renren-fast/sys/menu/erpupdate'
                                        ,data: field
                                        ,done: function(res){
                                            console.log(res);
                                            layer.msg('菜单修改成功');
                                            layui.table.reload('sys_menu'); // 重载表格
                                        }
                                        ,fail: function (res) {
                                            layer.msg('菜单修改失败');
                                        },
                                    });
                                    layer.close(index); //执行关闭
                                    return false;
                                })
                            } else if (tabNum == "1") {
                                //监听select
                                form.on('select(LAY-menu-men-submit)',function (data) {
                                    var selValue = data.value;
                                    $("#menuAdd_menuTs").find("option[text=selValue]").attr("selected",true);
                                    var firstSel =  $("#menuAdd_menuTs  option:selected").attr('name');
                                    firSel = firstSel;
                                });
//＝＝＝菜单编辑＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝监听菜单编辑
                                form.on('submit(LAY-menu-me-submit)', function (data) {
                                    var field = data.field; //获取提交的字段
                                    field.parentId = firSel;
                                    field.type = "1";
                                    field.menuId= menuId;
                                    console.log(field);
                                    console.log("field.type==>"+field.type)
                                    admin.req({
                                        type:'post',
                                        url: 'http://192.168.0.155:8080/renren-fast/sys/menu/erpupdate'
                                        ,data: field
                                        ,done: function(res){
                                            console.log(res);
                                            layer.msg('菜单添加成功');
                                            layui.table.reload('sys_menu'); // 重载表格
                                        }
                                        ,fail: function (res) {
                                            layer.msg('菜单添加失败');
                                        },
                                    });
                                    layer.close(index); //执行关闭
                                    return false;
                                });
                            } else if (tabNum == "2") {
                                //监听select
                                form.on('select(LAY-menu-btn-submit)',function (data) {
                                    var selValue = data.value;
                                    $("#menuAdd_tabsbtn").find("option[text=selValue]").attr("selected",true);
                                    var firstSel =  $("#menuAdd_tabsbtn  option:selected").attr('name');
                                    firSel = firstSel;
                                });
//＝＝＝按钮编辑＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝按钮编辑
                                form.on('submit(LAY-menu-btn-submit)', function (data) {
                                    var field = data.field; //获取提交的字段
                                    field.parentId = firSel;
                                    field.type = "2";
                                    field.menuId= menuId;
                                    console.log(field);
                                    admin.req({
                                        type:'post',
                                        url: 'http://192.168.0.155:8080/renren-fast/sys/menu/erpupdate'
                                        ,data: field
                                        ,done: function(res){
                                            console.log(res);
                                            layer.msg('按钮添加成功');
                                            layui.table.reload('sys_menu'); // 重载表格
                                        }
                                        ,fail: function (res) {
                                            layer.msg('按钮添加失败');
                                        },
                                    });
                                    layer.close(index); //执行关闭
                                    return false;
                                });
                            }
                        });
                        //监听提交
                        form.on('submit(LAY-user-front-submit)', function(data){
                            var field = data.field; //获取提交的字段
                            layui.table.reload('sys_menu'); //重载表格
                            layer.close(index); //执行关闭
                            return false;
                        });
                    });
                }
            });
        }
    });


    /**
     * @author tzh  新增菜单
     * @type {{menu_add: menu_add}}
     */

        //事件
    var active = {
        menu_add: function () {
            // 打开弹出页
            admin.popup({
                title:'添加菜单',
                area: ['717px','561px'],
                id:'LAY-popup-menu-add',
                success: function (layero,index) {
                    // 如果表单模板是否为undefined，自动清除表单内容
                    view(this.id).render('/infoManagement/iframeWindow/sys_menuAdd').done(function () {
                        // $("#menuAdd_tabDir").click();
                        form.render(null, 'user_menuAdd_form');
                        form.render(null, 'user_menuMe_form');
                        //监听tab，判断提交表单
                        element.on('tab(menu_tab)', function (data) {
                            var firSel = "0";
                            var tabNum = data.index;
                            if (tabNum == "0") {
                                //监听select
                                form.on('select(LAY-menu-dir-submit)',function (data) {
                                    var selValue = data.value;
                                    $("#menuAdd_menuup").find("option[text=selValue]").attr("selected",true);
                                    var firstSel =  $("#menuAdd_menuup  option:selected").attr('name'); //原始sel的name值
                                    firSel = firstSel;
                                });
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝监听目录提交
                                form.on('submit(LAY-menu-add-submit)', function (data) {
                                    var field = data.field; //获取提交的字段
                                    field.parentId = firSel;
                                    field.type = "0";
                                    console.log(field);
                                    admin.req({
                                        type:'post',
                                        url: 'http://192.168.0.155:8080/renren-fast/sys/menu/erpsave' //实际使用请改成服务端真实接口
                                        ,data: field
                                        ,done: function(res){
                                            console.log(res);
                                            layer.msg('菜单添加成功');
                                            layui.table.reload('sys_menu'); // 重载表格
                                        }
                                        ,fail: function (res) {
                                            layer.msg('菜单添加失败');
                                        },
                                    });
                                    layer.close(index); //执行关闭
                                    return false;
                                });
                            } else if (tabNum == "1") {
                                //监听select
                                form.on('select(LAY-menu-men-submit)',function (data) {
                                    var selValue = data.value;
                                    $("#menuAdd_menuTs").find("option[text=selValue]").attr("selected",true);
                                    var firstSel =  $("#menuAdd_menuTs  option:selected").attr('name'); //原始sel的name值
                                    firSel = firstSel;
                                    // alert(firstSel);
                                });
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝菜单提交
                                form.on('submit(LAY-menu-me-submit)', function (data) {
                                    var field = data.field; //获取提交的字段
                                    field.parentId = firSel;
                                    field.type = "1";
                                    console.log(field);
                                    console.log("field.type==>"+field.type)
                                    admin.req({
                                        type:'post',
                                        url: 'http://192.168.0.155:8080/renren-fast/sys/menu/erpsave' //实际使用请改成服务端真实接口
                                        ,data: field
                                        ,done: function(res){
                                            console.log(res);
                                            layer.msg('菜单添加成功');
                                            layui.table.reload('sys_menu'); // 重载表格
                                        }
                                        ,fail: function (res) {
                                            layer.msg('菜单添加失败');
                                        },
                                    });
                                    layer.close(index); //执行关闭
                                    return false;
                                });
                            } else if (tabNum == "2") {
                                //监听select
                                form.on('select(LAY-menu-btn-submit)',function (data) {
                                    var firstSel =  $("#menuAdd_tabsbtn  option:selected").attr('name'); //原始sel的name值
                                    var selValue = data.value;
                                    $("#menuAdd_tabsbtn").find("option[text=selValue]").attr("selected",true);
                                    firSel = firstSel;
                                });
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝按钮提交
                                form.on('submit(LAY-menu-btn-submit)', function (data) {
                                    if (firSel == 1 || firSel == 0){
                                        layer.tips('请选择与按钮同级所对应的二级菜单!', '#btnSjmenu',{tips: [1, '#0FA6D8']});
                                        return false;
                                    } else {
                                        var field = data.field; //获取提交的字段
                                        field.parentId = firSel;
                                        field.type = "2";
                                        admin.req({
                                            type:'post',
                                            url: 'http://192.168.0.155:8080/renren-fast/sys/menu/erpsave' //实际使用请改成服务端真实接口
                                            ,data: field
                                            ,done: function(res){
                                                console.log(res);
                                                layer.msg('按钮添加成功');
                                                layui.table.reload('sys_menu'); // 重载表格
                                            }
                                            ,fail: function (res) {
                                                layer.msg('按钮添加失败');
                                            },
                                        });
                                        layer.close(index); //执行关闭
                                        return false;
                                    }
                                });
                            }
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