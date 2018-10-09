/**

 @Name： 供应商信息管理

 */


layui.define(['admin', 'table', 'index','element','form'], function(exports){
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,element = layui.element;
    var $ = layui.jquery;
    table.render({
        elem: '#user_infoTab'
        ,url: setter.baseUrl+'sys/user/list'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,id:"user_infoTab"
        ,page: true
        // ,toolbar: "toolbarSupplier" 开启后会自动开启打印和导出功能
        ,where: {
            access_token: layui.data('layuiAdmin').access_token
        }
        ,cols: [[
            {type:'checkbox'}
            ,{field:'msg', title: '用户ID', sort: true,width: 110}
            ,{field:'userId', title: '用户名',width: 180} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'username', title: '姓名', sort: true,width: 120,templet: '#type'}
            ,  ,{field: 'mobile', title: '办公电话',minWidth:106,align:'center'}
            ,{field:'deptId', title: '部门', sort: true,width: 120}
            ,{field:'officePhone', title: '职称', sort: true,width: 120}
            ,{field:'jobNumber', title: '工号', align: 'center', sort: true,width: 120} //单元格内容水平居中
            ,{field:'skype', title: 'Skype', sort: true,width:120} //单元格内容水平居中
            ,{field:'email', title: 'Email', sort: true}
            ,{field:'taxe', title: '状态', sort: true}
            ,{field:'createUserId', title: '创建人'}
            ,{field:'createTime', title: '创建时间',width: 110}
            ,{field:'createUserId', title: '修改人'}
            ,{field:'evaluateQuality', title: '修改时间'}
            ,{title: '操作', width: 160, align:'center'}
        ]]
        ,done : function () {
            layer.msg('表格加载完成');
            //手机端
            if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
                $("#LAY_app_body").each(function (e) {
                    $("a[lay-event='edit']").html("<i class=\"layui-icon layui-icon-edit\"></i>")
                    $("a[lay-event='search']").html("<i class=\"layui-icon layui-icon-search\"></i>")
                    $("a[lay-event='del']").html("<i class=\"layui-icon layui-icon-delete\"></i>")
                    $(".laytable-cell-1-0-22").css({"width":"130px"});
                })
            }
        }
    });



    exports('info_management', {})
});