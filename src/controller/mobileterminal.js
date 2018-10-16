/**
 @Name： 市场管理－－［订单评审］
 */


layui.define(['admin', 'table', 'index','element','form'], function(exports){
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,element = layui.element;
    var $ = layui.jquery;

    //手机端
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        // 移动端自动隐藏表格右侧操作栏
        $(".layui-btn-group").append("<button class=\"layui-btn\"  id=\"phone-operation\">隐藏操作</button>");
        $("#phone-operation").on('click', function () {
            $(this).text($(this).text()=="隐藏操作"?"显示操作":"隐藏操作");
            $(".layui-table-fixed-r").toggle('slow');
        });

        //订单评审搜索表单
        $("#orderReview_searll").css({"display":""});
        $("#orderReview_pcsear").css({"display":"none"});
        //监听select并给input name赋值
        form.on('select(orderReview-search-select)',function (data){
            var selValue = data.value;
            var index = data.elem.selectedIndex;
            var text = data.elem.options[index].text; // 选中文本
            var Domobj = $("#orderReview_sinp");
            if (selValue != null || selValue != ""){
                Domobj.attr({"placeholder":text});
                $("input[id='orderReview_sinp']").attr("name",selValue)
            } else {
                Domobj.attr("placeholder","请选取搜索条件");
            }
        });
    }

    exports('mobileterminal', {})
});