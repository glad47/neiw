/**

 @Name:    ［接口复用］

 */

layui.define(['admin', 'index'],function (exports) {
    var $ = layui.jquery
        ,setter = layui.setter;
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
         * 外协合同 获取供应商信息【目前用于要求选框的选中传入供应商的id】
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
                        console.log("没有查询到用户信息");
                    }
                }
            });
            return supplierInfo;
        },

        /**
         * 获取客户信息
         * @param url
         * @returns {Object}
         * @constructor
         */
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
        },

        GetSupplierInfoByCompanyName: function(url){
            var result = new Object();
            admin.req({
                type: 'get',
                url: url,
                async: false,
                success: function (data) {
                    if (data.data != null) {
                        result = data.data;
                    } else {
                        console.log("没有查询到用户信息");
                    }
                }
            });
            return result;
        },

        /**
         * 获取所有国家信息 并存入localStorage
         *  如果国家显示的为  可以用这个来转换成 国家 字符串
         * @constructor
         */
        GetCountry: function () {
            console.log("获取国家信息")
            var _url = setter.imUrl+'quote/getCountry';
            if (localStorage.getItem("allCountry") == null) {
                admin.req({
                    type: 'get',
                    url: _url,
                    async: false,
                    success: function (res) {
                        localStorage.setItem("allCountry", JSON.stringify(res.data));
                    }
                });
            }
        },

        /**
         * 获取所有客户信息
         * @returns {*}
         */
        getAllCustomer () {
            var result = new Object();
            admin.req({
                type: 'post',
                async: false,
                url: setter.baseUrl + 'sys/consumer/user/all',
                success: function (data) {
                    result = data.data;
                },
                error: function () {
                    layer.msg('查询失败，请稍后再试.')
                }
            });
            return result;
        }
    }

    exports('requestInterface', obj)
});