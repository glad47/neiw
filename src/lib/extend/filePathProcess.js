/**

 @Name:    ［文件上传路径处理］

 */

layui.define(function (exports) {
    var $ = layui.jquery;
    var obj = {
        pathProcess: function (path) {
            var url = path;
            var r = /\[(.+?)\]/g;
            var filePatha = url.match(r);
            var filePath;
            console.log("前："+path.substring(0,1));
            console.log("后："+path.substring(path.length-1, path.length));
            if (path.substring(0,1) == '[' && path.substring(path.length-1, path.length) == ']') {
                filePath = filePatha[0].replace(/\[|]/g,'');    //去除前后两端的中括号[路径处理完毕，下载的时候可以直接下载了]
            } else {
                filePath = path;
            }
            return filePath;
        },
        // // 网上订单文件上传的路径未处理的，所以增加这个方法
        // dataObj: function (data) {
        //     console.log(data)
        //     if (data && data.isInternal == '2') {   // 网上订单
        //         console.log('网上订单！！！')
        //         $.each(data, function (k, v) {
        //             if (k == 'quoteGerberPath') {
        //                 if (v != null && v != "") {
        //                     data['quoteGerberPath'] = obj.pathProcess(v);
        //                 }
        //             }
        //         });
        //     }
        //     return data;
        // },
        // 网上订单 file ["xxx/xxx/xxx.zip"] 统一格式路径处理
        isInternal: function (data) {
            var r = /\[(.+?)\]/g;
            $.each(data, function (k, v) {
                if (k == 'gerberPath') {
                    if (v != null && v != "") {
                        if (data.isInternal == "2") {
                            data['gerberPath'] = r.exec(data.gerberPath);
                            data.gerberPath = data.gerberPath[1];
                        }
                    }
                }
            });
            return data;
        }
    }
    exports('filePathProcess', obj)
});