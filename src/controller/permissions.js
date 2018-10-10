/**
 *@Name 用户权限验证
 **/

layui.define(['laytpl','layer','setter'], function (exports) {
    this_permissions = layui.data('layuiAdmin').permissions,
    this_access_token = layui.data('layuiAdmin').access_token,
    console.log("this_permissions===>"+this_permissions);
    console.log("access_token===>"+this_access_token);
    // 用户管理按钮权限
    // var user
    //对外接口
    exports('permissions', {
        permissions : this_permissions,
    })
})