/**
 *@Name 用户权限验证
 **/

layui.define(['laytpl','layer','setter'], function (exports) {

    this_permissions = layui.data('layuiAdmin').permissions,
    this_access_token = layui.data('layuiAdmin').access_token,
    console.log("this_permissions===>"+this_permissions);
    console.log("token===>"+this_access_token);
    //对外接口
    exports('permissions', {})
})