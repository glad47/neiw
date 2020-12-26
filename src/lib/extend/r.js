/**
 * author ZL
 * 代码复用工具类
 */
layui.define(['layer', 'jquery', 'admin', 'form'], function (exports) {

    "use strict";

    let MOD_NAME = "r"
        ,layer = layui.layer
        ,$ = layui.jquery
        ,setter = layui.setter
        ,request = setter.request
        ,response = setter.response
        ,admin = layui.admin
        ,view = layui.view
        ,form = layui.form
        ,headers = {};

    headers[request.tokenName] = layui.data(setter.tableName)[request.tokenName] || '';
    
    let config = {
        headers: headers, //http请求头，
        baseURL: setter.baseUrl, //请求基地址
        timeout: 3000,//超时时间，为0时则无超时限制
    };

    let r = new function () {
        this.get = function (url, params, loading) {
            return ajax("GET", url, params, loading);
        };

        this.post = function (url, params, loading) {
            if(loading) loading = true;
            return ajax("POST", url, JSON.stringify(params),loading);
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

        this.popup = function(title,size,btn,url,data,clickSubmitMark,tableMark,gainTableDataMark){
            return popup(title,size,btn,url,data,clickSubmitMark,tableMark,gainTableDataMark);
        };

        this.print = function(title,area,btn,url,data,printId){
            return printPopup(title,area,btn,url,data,printId);
        }
    }

    function ajax(type, url, data, loading) {
        return new Promise(function (resolve, reject) {
            let roleSaveLoading;
            // console.log(loading);
            if(loading) {
               roleSaveLoading = layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
            }
            $.ajax({
                type: type,
                url: config.baseURL + url,
                headers: config.headers,
                contentType: "application/json; charset=utf-8",
                data: data,
                success: function (res) {
                    if(loading){
                        layer.close(roleSaveLoading);
                    }
                    if (res[response.statusName] != response.statusCode.ok) {
                        layer.msg(res[response.msgName]);
                    } else {
                        if(res[response.dataName] == null){
                            resolve(res['user']);
                        }else{
                            resolve(res[response.dataName]);
                        }
                        
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

    //todo 代码工具类 是否获取全部数据
    function popup(title,area,btn,url,data,clickSubmitMark,tableMark,gainTableDataMark){
       return new Promise(function(resolve,reject){
            admin.popup({
                title: title,
                area: area,
                btn: btn,
                yes:function(index, layero){
                    $(`#${clickSubmitMark}`).click();
                },
                success:function(layero,index){
                    view(this.id).render(url,data)
                    .then(function(value){}) //视图文件请求完毕，视图内容渲染前的回调 
                    .done(function(){
                        form.on(`submit(${clickSubmitMark})`,function(formdata){
                            let d = {};
                            if(tableMark){
                                if(gainTableDataMark == 1){//获取全部table表格的数据
                                    let tableData = table.cache[`${tableMark}`];
                                    d.tableData = tableData;
                                } else if(gainTableDataMark == 2){//获取单个
                                    let checkStatus = table.checkStatus(`${tableMark}`),tableData = checkStatus.data;
                                    if(tableData.length == 0) return layer.msg('请选择表格数据!!');
                                    d.tableData = tableData[0]; 
                                }
                            }
                            d.formData = formdata;
                            d.index = index;
                            resolve(d);
                        });
                    });
                }
            });
       }) 
    }

    //打印窗口弹出
    function printPopup(title,area,btn,url,data,printId){
        return new Promise(function(resolve,reject){
            admin.popup({
                title: title
                ,area: area
                ,btn: btn
                ,maxmin: true
                ,yes:function(index, layero){
                    document.body.innerHTML=document.getElementById(printId).innerHTML;
                    window.print();
                    window.location.reload();
                }
                // btn2: function(index, layero){}
                ,success: function (layero, index) {
                    view(this.id).render(url, data).done(function () {
                       resolve(index);
                    });
                }
            });
        })
    }

    exports(MOD_NAME, r);
})
