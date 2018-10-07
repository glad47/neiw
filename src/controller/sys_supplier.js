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
    element.on('form(demo)', function(data){
        console.log(data);
        alert("1");
    });
    table.render({
        elem: '#supplier_infoTab'
        ,url: 'http://192.168.0.155:8080/renren-fast/sys/supplier/list'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,id:"supplier_infoTab"
        ,where: {
            access_token: layui.data('layuiAdmin').access_token
        }
        ,cols: [[
            {type:'checkbox'}
            ,{field:'supplierId', title: '供应商编号', sort: true,width: '120'}
            ,{field:'companyName', title: '公司名称',width: '180'} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'type', title: '类别', sort: true,width: '120'}
            ,{field:'contact', title: '联系人', sort: true,width: '120'}
            ,{field:'officePhone', title: '办公电话', sort: true,width: '120'}
            ,{field:'phone', title: '手机', align: 'center', sort: true,width: '120'} //单元格内容水平居中
            ,{field:'email', title: 'Email', sort: true} //单元格内容水平居中
            ,{field:'paymentType', title: '付款方式', sort: true}
            ,{field:'taxe', title: '是否含税', sort: true}
            ,{field:'invoiceType', title: '发票类型', sort: true}
            ,{field:'strengths', title: '类型', sort: true}
            ,{field:'evaluateDdelivery', title: '交期', sort: true}
            ,{field:'evaluateQuality', title: '品质', sort: true}
            ,{field:'evaluateCompatibility', title: '配合度', sort: true}
            ,{field:'evaluateRate', title: '评级', sort: true}
            ,{field:'createUserId', title: '创建人', sort: true}
            ,{field:'createTime', title: '创建时间', sort: true}
            ,{field:'updateUserId', title: '修改人', sort: true}
            ,{field:'updateTime', title: '修改时间', sort: true}
        ]]
    });

    var active = {
        /**
         * 动态获取id，并且传到下一个view子页面（子页面根据此id，动态渲染操作页面）
         */
        //供应商信息页面
        supplier_add:function(data){
            var this_id = $(this).attr('id');
            admin.popup({
                title: '供应商信息编辑／添加'
                ,shadeClose: true
                ,shade: false
                ,maxmin: true
                ,area: ['55%', '65%']
                // ,id: 'sys_menu'
                ,success: function(layero, index){
                    view(this.id).render('/infoManagement/iframeWindow/supplier_edit', data).done(function(){
                        form.render(null, 'supplierAdd_form');
                        // form.render(null, 'user_menuMe_form');

                        //监听提交
                        form.on('submit(LAY-supplier-add-submit)', function(data){
                            var field = data.field; //获取提交的字段
                            console.log(field);
                            layer.alert(JSON.stringify(data.field));
                            admin.req({
                                type:'post',
                                url: setter.baseUrl+'sys/supplier/save' //实际使用请改成服务端真实接口
                                // ,dataType: 'json'
                                // ,contentType: 'application/json'
                                ,data: field
                                ,done: function(res){
                                    console.log(res);
                                    layer.msg('供应商添加成功');
                                }
                                ,fail: function (res) {
                                    layer.msg('供应商加失败');
                                },
                            });
                            // layui.table.reload('sys_menu'); // 重载表格
                            // layer.close(index); //执行关闭
                            layui.table.reload('supplier_infoTab'); //重载表格
                            layer.close(index); //执行关闭
                        });
                    });
                }
            });




        },
        //供应商设置
        supplier_set:function(){
            var this_id = $(this).attr('id');
            layer.open({
                skin: 'demo-class',
                type: 1,
                title: '供应商设置',
                shadeClose: true,
                shade: false,
                maxmin: true,
                area: ['436px', '436px'],
                content:'<div id="supplier_edit"></div>',
                btn:['确定','取消'],
                success: function (index,layero) {
                    view('supplier_edit').render('/infoManagement/renderEdit/supplier_edit_render',{id:this_id}).then(function (value) {

                    }).done(function(){
                        form.render();
                    });
                }
            });
        },

    };

    $('.layui-btn').on('click',function () {
        var type = $(this).data('type');
        active[type] && active[type].call(this);
    })




    exports('sys_supplier', {})
});