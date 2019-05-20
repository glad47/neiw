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
        },

        /**
         * 外协合同 获取供应商信息【目前用于要求选框的选中】
         */
        GetSupplierInfo: function (url) {
            var supplierInfo = new Object();
            admin.req({
                type: 'get',
                url: url,
                async: false,
                success: function (data) {
                    if (data.supplier != null) {
                        supplierInfo = data.supplier;
                    } else {
                        return "没有查询到用户信息";
                    }
                }
            });
            return supplierInfo;
        },

        GetCustomerInfo: function (url) {
            var customerInfo = new Object();
            admin.req({
               type: 'get',
                url: url,
                async: false,
                success: function (data) {
                   customerInfo = data.user;
                }
            });
            return customerInfo;
        }
    }

    exports('requestInterface', obj)
});