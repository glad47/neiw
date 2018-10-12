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
        $("[name='perTest']").append("<button class=\"layui-btn per_userAdd\" id=\"userInfo_adds\" data-type=\"userInfo_add\">新增用户</button>");
    }
    exports('permissions', {
        permissions : this_permissions,
    })
})
