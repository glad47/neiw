/**

 @Name:    ［杂七乱八的工具集合］

 */

layui.define(function (exports) {
    var $ = layui.jquery;
    var obj = {
        // 时间对比 [最新时间]
        TimeContrast: function (timesJson) {
            var thisTime;
            timesJson = ["2019-04-16 10:28:57", "2019-04-22 11:05:34", "2019-04-22 11:05:31", "2019-04-22 11:05:29", "2019-04-22 11:05:26"];
            if (timesJson != null) {
                $.each(timesJson, function (index, value) {
                    var eaTime = new Date(value.replace("-", "/").replace("-", "/"));
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
        }
    }

    exports('jsTools', obj)
});
