/**
 *@Name 用户权限验证
 *说明：页面元素属性name＝"permission-xxx-yy"
 *权限js命名规则：permission-xxx-yy, xxx为页面的简称,yy为功能简称
 * 表格toolbar命名规则：user_info_Toolbar,user_info为页面名称，Toolbar为表格右侧工具栏
 *例如：permission-user-add 为用户页面新增用户信息的权限按钮
 **/

layui.define(['laytpl','layer','setter'], function (exports) {
    $ = layui.jquery,
    // sessionPermissions = layui.sessionData('layuiAdmin').permissions,
    Permissions = layui.data('layuiAdmin').permissions,
    Access_token = layui.data('layuiAdmin').access_token,
    console.log("this_permissions===>"+Permissions);
    console.log("access_token===>"+Access_token);


    // 全局变量配置
    // 属性name全局配置
    var userName = "permission-user-add";
    // 按钮data-type配置
    var userAddDataType = "userInfo_add";   //用户页面新增按钮
    // 右侧toolbar id配置
    var User_toolbarId =  "user_info_Toolbar";    //用户表格右侧toolbarid


    // 系统管理－－用户管理权限
    if(Permissions.indexOf("sys:user:save") != -1){
        $("[name="+userName+"]").append("<button class=\"layui-btn\" id=\"userInfo_adds\">新增用户</button>");
        var DOMInfo = $('[data-type'+'='+userAddDataType+']');
        var htmlInfo = DOMInfo.html();
        if (htmlInfo == null ||  htmlInfo == ""){
            $("[name="+userName+"] button:first").attr("data-type",userAddDataType);    //给按钮设置属性
        }
    }
    console.log($('[data-type'+'='+userAddDataType+']').html());
    if(Permissions.indexOf("sys:user:update") != -1 && Permissions.indexOf("sys:user:delete") != -1){
        $(".layui-table").after("<script type=\"text/html\" id=\"user_info_Toolbar\">\n" +
            "                <!--编辑权限标识判断-->\n" +
            "                    <a class=\"layui-btn layui-btn-xs\" lay-event=\"edit\" id=\"supplier_edit\">编辑</a>\n" +
            "                <!--删除权限判断-->\n" +
            "                    <a class=\"layui-btn layui-btn-danger layui-btn-xs\" lay-event=\"del\">删除</a>\n" +
            "            </script>");
        var htmlInfo = $(".layui-table script:first").html();
        $(".layui-table tbody tr td:last").append("<script type=\"text/html\" id=\"user_info_Toolbar\">\n" +
            "                <!--编辑权限标识判断-->\n" +
            "                    <a class=\"layui-btn layui-btn-xs\" lay-event=\"edit\" id=\"supplier_edit\">编辑</a>\n" +
            "                <!--删除权限判断-->\n" +
            "                    <a class=\"layui-btn layui-btn-danger layui-btn-xs\" lay-event=\"del\">删除</a>\n" +
            "            </script>")
        console.log("htmlInfo:"+htmlInfo);
        // if (htmlInfo == null)
    }else if (Permissions.indexOf("sys:user:delete") != -1) {
        $(".layui-table").after("<script type=\"text/html\" id=\"user_info_Toolbar\">\n" +
            "                <a class=\"layui-btn layui-btn-danger layui-btn-xs\" lay-event=\"del\">删除</a>\n" +
            "            </script>");
    } else if (Permissions.indexOf("sys:user:update") != -1) {
        $(".layui-table").after("<script type=\"text/html\" id=\"user_info_Toolbar\">\n" +
            "                <a class=\"layui-btn layui-btn-xs\" lay-event=\"edit\" id=\"supplier_edit\">编辑</a>\n" +
            "            </script>");
    }
    exports('permissions', {
        permissions : Permissions,
    })
})
