// 加载模块
//如果向后台接口发送post发送数据，可以在这个页面向后台接口发送表单数据，iframe层创建ajax方法
layui.define(['admin', 'table','index','jquery','form','element'], function(exports){
    var $ = layui.$ ;
    form = layui.form;
    admin = layui.admin,
    element = layui.element,

        //监听form表单checkbox,管理复选框，全选/取消全选操作
        //监听权限管理checkbox
        form.on('checkbox(usereditQxgl)',function(data){
            var this_checkboxValue = data.elem.value;
            var  a = data.elem.checked;
            if (this_checkboxValue == 'usereditQxgl' && a == true) {
                layer.msg("全选");
                $("#user_qxgl input[type='checkbox']").prop("checked",true);
                form.render('checkbox');
            } else {
                $("#user_qxgl input[type='checkbox']").prop("checked",false);
                form.render('checkbox');
            }
            console.log("得到checkbox原始DOM对象:"+data.elem); //得到checkbox原始DOM对象
            console.log("是否被选中:"+data.elem.checked); //是否被选中，true或者false
            console.log("复选框value值:"+data.value); //复选框value值
            console.log("得到美化后的DOM对象"+data.othis); //得到美化后的DOM对象
        });
    //监听栏目管理checkbox
    form.on('checkbox(usereditLmgl)',function (data) {
        var a = data.elem.checked;
        var this_checkboxValue = data.elem.value;
        if (this_checkboxValue == 'usereditLmgl' && a == true) {
            layer.msg("全选");
            $("#user_lmgl input[type='checkbox']").prop("checked",true);
            form.render('checkbox');
        } else {
            $("#user_lmgl input[type='checkbox']").prop("checked",false);
            form.render('checkbox');
        }
    });
    //监听文档管理checkbox
    form.on('checkbox(usereditWdgl)',function (data) {
        var a = data.elem.checked;
        var this_checkboxValue = data.elem.value;
        if (this_checkboxValue == 'usereditWdgl' && a == true) {
            layer.msg("全选");
            $("#user_wdgl input[type='checkbox']").prop("checked",true);
            form.render('checkbox');
        } else {
            $("#user_wdgl input[type='checkbox']").prop("checked",false);
            form.render('checkbox');
        }
    });
    form.on('submit(demo1)', function(data){
        var userEditAllJson = JSON.stringify(data.field);
        layer.msg(userEditAllJson);
        // console.log(userEditAllJson);
        // admin.req({
        //     type: "post",
        //     url: '',
        //     data: userEditAllJson,
        //     done: function () {
        //         layer.msg("用户信息添加成功！")
        //     },
        //     fail: function () {
        //         layer.msg("请求异常！")
        //     }
        // })
        return false;
    });
    var parentTjson = $("#renderJson").text();
        var arr = JSON.parse(parentTjson);
    form.val("demo1",{
        "username":arr[0].name,
        "pwd":arr[0].username,
        "uname":arr[0].status,
    })
    $("#testp").click(function(){
        parent.layui.$('#user_uname').val('我被改变了');
        parent.layer.tips('Look here', '#user_uname', {time: 5000});
    })
    // $(document).ready(function () {
    //     //编辑，给表单设置默认值
    //     var parentTjson = $("#renderJson").text();
    //     var arr = JSON.parse(parentTjson);
    //     $("#user_edit_yhm").val(arr[0].name);
    // })
    alert('1');
    exports('user_edit_info', {})
});