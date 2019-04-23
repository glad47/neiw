/**

 @Name:    ［杂七乱八的工具集合］

 */

layui.define(function (exports) {
    var $ = layui.jquery;
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
        }

    }

    exports('jsTools', obj)
});
