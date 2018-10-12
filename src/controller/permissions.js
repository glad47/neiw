/**
 *@Name 用户权限验证
 **/

layui.define(['laytpl','layer','setter'], function (exports) {
    $ = layui.jquery,
    this_permissions = layui.data('layuiAdmin').permissions,
    this_access_token = layui.data('layuiAdmin').access_token,
    console.log("this_permissions===>"+this_permissions);
    console.log("access_token===>"+this_access_token);
    // 用户管理按钮权限
    if(layui.sessionData('layuiAdmin').permissions.indexOf("sys:user:update") != -1){
        $("[name='perTest']").append("<button class=\"layui-btn per_userAdd\" id=\"userInfo_adds\" data-type=\"userInfo_add\">新增1</button>");
    } else{
        alert('没有用户新增按钮权限!');
    }
    $("body").on("click", "#userInfo_adds", function () {
        // active.userInfo_add();
    })
    // var user
    //对外接口
    exports('permissions', {
        permissions : this_permissions,
    })
})