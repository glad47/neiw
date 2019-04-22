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
