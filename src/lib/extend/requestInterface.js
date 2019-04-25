/**

 @Name:    ［接口复用］

 */

layui.define(['admin', 'index'],function (exports) {
    var $ = layui.jquery;
    admin = layui.admin;
    var obj = {

        /**
         * 打开合同 回填 用户信息
         */
        ContractGetUserInfo: function (url) {
            var userInfo = new Object();
            admin.req({
                type: 'get',
                url: url,
                async: false,
                success: function (data) {
                    if (data.user != null) {
                        userInfo = data.user;
                    } else {
                        return "没有查询到用户信息";
                    }
                }
            });
            return userInfo;
        }
    }

    exports('requestInterface', obj)
});