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
            var filePath = filePatha[0].replace(/\[|]/g,'');    //去除前后两端的中括号[路径处理完毕，下载的时候可以直接下载了]
            return filePath;
        }
    }
    exports('filePathProcess', obj)
});