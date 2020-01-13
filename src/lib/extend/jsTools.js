1/**

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
        },

        // 获取 url 上的参数  取值 obj['参数名']
        GetRequertParams: function (url) {
            try {
                var result = url.split("?")[1];
                var keyValue = result.split("&");
                var obj = {};
                for (var i = 0; i < keyValue.length; i++) {
                    var item = keyValue[i].split("=");
                    obj[item[0]] = item[1];
                }
                return obj;
            } catch (e) {
                console.log(e);
            }
        },

        // 对比两个 对象的数据 传两个对象A、B到 obj
        contrastObj: function (orderTypeObj) {
            var filterStrA = flagStr();
            var orderType;
            var qflag,iflag;
            var stop;
            // 特殊处理字段
            orderTypeObj.A.customerSysName = orderTypeObj.B.customerSysName;
            $.each(orderTypeObj.A,function (qk,qv) {
                if (qv == "" || qv == null || qv == "none") {       // 所有空值类型都过滤掉
                    qflag = true;
                } else {
                    qflag = false;
                }
                $.each(orderTypeObj.B,function (ik,iv) {
                    if (iv == "" || iv == null || iv == "none") {       // 所有空值类型都过滤掉
                        iflag = true;
                    } else {
                        iflag = false;
                    }
                    if (qk == ik) {
                        var aa = filterStrA.fd.indexOf(qk);
                        var bb = filterStrA.fdyg.indexOf(qk);
                        if (qv == iv) {
                            orderType = 2;
                        } else if (qflag && iflag) {
                            orderType = 2;
                        } else if (qv != iv && filterStrA.fd.indexOf(qk) == "-1" || filterStrA.fdyg.indexOf(qk) == "-1") {
                            console.log("key值不同的q["+qk+","+qv+"],i["+ik+","+iv+"]");
                            if (filterStrA.fdyg.indexOf(qk) >= 0) {
                                orderType = 3;
                                stop = true;
                            } else {
                                orderType = 2;
                            }
                        }
                    }
                });
                if (stop == true) {
                    return false;
                }
            });
            console.log("orderType:===>"+orderType);
            return orderType;
        },
        // 获取字符串的宽度
        getStrWidth: function () {
            var str = arguments[0] ? arguments[0] : '';
            var fontFamily = arguments[1] ? arguments[1] : ''; //Microsoft YaHei
            var fontSize = arguments[2] ? arguments[2] : ''; //12px
            var addDivId = arguments[3] ? arguments[3] : 'labelText';
            var appendTo = arguments[4] || 'body';

            $(appendTo).append("<div id='" + addDivId + "' style='color:black;line-height:1.2;white-space:nowrap;top:0px;left:0px;position:fixed;display:block;visibility:visible;'>");
            var add = $('#' + addDivId);
            add.css({
                'font-size': fontSize,
                'font-family': fontFamily
            }).html(str);

            var ret = {'width': add.width(), 'height': add.height()};
            add.remove();
            return ret;
        },

        // 取中括号里面的数据
        getBracketStr (text) {
            var r = /\[(.+?)\]/g;
            var m = r.exec(text);
            if (m) {
                return m;
            } else {
                return ['当前不存在id'];
            }
        },

        // 判断数组重复元素
        checkArrayObjRepeat(arr, d) {
            for (var i=0; i< arr.length; i++) {
                delete arr[i].LAY_TABLE_INDEX
                delete d[i].LAY_TABLE_INDEX
                if (this.isObjectValueEqual(arr[i], d)) {
                    return false;
                }
            }
        },

        // 对比两个对象的值是否完全相等 返回值 true/false
        isObjectValueEqual (a, b) {
            //取对象a和b的属性名
            var aProps = Object.getOwnPropertyNames(a);
            var bProps = Object.getOwnPropertyNames(b);
            //判断属性名的length是否一致
            if (aProps.length != bProps.length) {
                return false;
            }
            //循环取出属性名，再判断属性值是否一致
            for (var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];
                if (a[propName] !== b[propName]) {
                    return false;
                }
            }
            return true;
        },

        /**
         * 函数节流 throttle(getFrom, null, 500, this.value, 1000)
         * @param fn 对应的方法，不能xx(),否则报错
         * @param context
         * @param delay
         * @param text  需要穿的参数 => xxx方法
         * @param mustApplyTime
         */
        throttle (fn,context,delay,text,mustApplyTime) {
            clearTimeout(fn.timer);
            fn._cur = Date.now();   // 记录当前时间
            if (!fn._start) {   //若该函数是第一次调用，则直接设置_start,即开始时间，为_cur，即此刻的时间
                fn._start = fn._cur;
            }
            if (fn._cur-fn._start>mustApplyTime) {
                //当前时间与上一次函数被执行的时间作差，与mustApplyTime比较，若大于，则必须执行一次函数，若小于，则重新设置计时器
                fn.call(context, text);
                fn._start = fn._cur;
            } else {
                fn.timer = setTimeout(function () {
                    fn.call(context, text);
                }, delay);
            }
        }
    }

    exports('jsTools', obj)
});
