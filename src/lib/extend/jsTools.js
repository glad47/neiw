/**

 @Name:    ［杂七乱八的工具集合］

 */

layui.define(['admin', 'index'],function (exports) {
    var $ = layui.jquery,
    admin = layui.admin;
    var obj = {

        // 时间对比 [最新时间]
        TimeContrast: function (timesJson) {
            var thisTime;
            if (timesJson != null) {
                $.each(timesJson, function (index, value) {
                    if (typeof value != "undefined" && value != null) {
                        var eaTime = new Date(value.replace("-", "/").replace("-", "/"));
                    }
                    if (thisTime == null || typeof thisTime == "undefined") {
                        thisTime = timesJson[index];
                    } else {
                        var  dbTime = new Date(thisTime.replace("-", "/").replace("-", "/"));
                        if (eaTime > dbTime) {
                            thisTime = timesJson[index];
                        }
                    }
                });
                return thisTime;
            } else {
                return null;
            }
        },

        // 数组去重
        ArrayClearRepeat: function (arr) {
            var new_arr = [];
            if (arr != null) {
                for (var i=0;i<arr.length;i++) {
                    var items=arr[i];
                    if ($.inArray(items,new_arr)==-1) {
                        new_arr.push(items);
                    }
                }
            }
            return new_arr;
        },

        // 去除文件名后缀,支持文件名带点的
        CleanFileSuffix: function (fileName) {
            var suffix = fileName.substr((~-fileName.lastIndexOf(".") >>> 0) + 1)
            return fileName.replace(suffix, "");
        },

        // 生成指定位数的随机数
        RandomNum: function (n) {
            var t='';
            for(var i=0;i<n;i++){
                t+=Math.floor(Math.random()*10);
            }
            return t;
        },

        // 货币转换 ===>> 人民币
        CurrenCyConversion: function (money,exchangeId) {
            var resultVal,rate;
            if (exchangeId == '2') {
                console.log('初始币种为人民币，无需转换！');
                resultVal = money;
            } else if (exchangeId != '2' && exchangeId != null) {    // 不是人民币
                admin.req({
                    type: 'post',
                    async: false,
                    url: setter.baseUrl+'market/exchangerate/info/'+exchangeId,
                    success: function (res) {
                        console.log(res);
                        rate = res.exchangeRate.exchangeRate;
                        resultVal = parseFloat(money*rate).toFixed(2);
                        console.log('转换币种为：'+res.exchangeRate.currency+'\n转换率为：'+res.exchangeRate.exchangeRate);
                        console.log("初始价格为："+money+"\n转化后的价格为："+resultVal);
                    },
                    error: function (err) {
                        resultVal = "请求异常， 没有获取到任何有用的信息！"
                    }
                });
            }
            return resultVal;
        }
    }

    exports('jsTools', obj)
});
