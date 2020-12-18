layui.define(['layer', 'jquery'], function (exports) {
    "use strict";

    let MOD_NAME = "r"
        ,layer = layui.layer
        ,$ = layui.jquery
        ,setter = layui.setter
        ,request = setter.request
        ,response = setter.response
        ,headers = {};

    headers[request.tokenName] = layui.data(setter.tableName)[request.tokenName] || '';
    
    let config = {
        headers: headers, //http请求头，
        baseURL: setter.baseUrl, //请求基地址
        timeout: 3000,//超时时间，为0时则无超时限制
    };

    let r = new function () {
        this.get = function (url, params) {
            return ajax("GET", url, params);
        };

        this.post = function (url, params) {
            return ajax("POST", url, JSON.stringify(params));
        };

        this.delete = function (url, params) {
            return ajax("DELETE", url, params);
        }

        this.put = function (url, params) {
            return ajax("PUT", url, JSON.stringify(params));
        }

        this.setData = function (key, value) {
            layui.data('LocalData', {
                key: key,
                value: value
            })
        };

        this.getData = function (key) {
            let localData = layui.data('LocalData');
            return localData[key];
        };
    }

    function ajax(type, url, data) {
        return new Promise(function (resolve, reject) {
            let roleSaveLoading = layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
            $.ajax({
                type: type,
                url: config.baseURL + url,
                headers: config.headers,
                contentType: "application/json; charset=utf-8",
                data: data,
                success: function (res) {
                    layer.close(roleSaveLoading);
                    if (res[response.statusName] != response.statusCode.ok) {
                        layer.msg(res[response.msgName]);
                    } else {
                        resolve(res[response.dataName]);
                    }
                },
                error: function () {
                    layer.close(roleSaveLoading);
                    layer.msg("系统错误，请联系开发管理人员！");
                    reject();
                }
            });
        });
    };

    exports(MOD_NAME, r);
})
