/**
 @Name：手机端适配
 @Author：Parker
 */
layui.define('form', 'index', function(exports){
    var $ = layui.$;
    console.log('进入手机端')
    $(".layui-form").each(function () {
        console.log("移除")
        $(this).children("i[class='layui-icon-search']").parents("button").hidden();
    });

    exports('mobile_adapter', {});
})