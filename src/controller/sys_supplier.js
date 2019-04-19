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
    form.render(null,'supplierInfo_from');
    form.on('submit(LAY-app-supplier-search)',function (data) {
        var field = data.field;
        table.reload('supplier_infoTab',{
            where:field
        });
    });
    table.render({
        elem: '#supplier_infoTab'
        ,url: setter.baseUrl+'sys/supplier/list'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,id:"supplier_infoTab"
        ,page: true
        ,toolbar: true
        ,cols: [[
             {field:'id', title: 'ID',hide: false}
            ,{field:'supplierId', title: '供应商编号', sort: true,width: 110}
            ,{field:'companyName', title: '公司名称',width: 180} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'type', title: '类别', sort: true,width: 120,templet: '#type'}
            ,{field:'contact', title: '联系人', sort: true,width: 120}
            ,{field:'officePhone', title: '办公电话', sort: true,width: 120}
            ,{field:'phone', title: '手机', align: 'center', sort: true,width: 120} //单元格内容水平居中
            ,{field:'email', title: 'Email', sort: true,width:200} //单元格内容水平居中
            ,{field:'paymentType', title: '付款方式', sort: true,templet:'#paymentType', minWidth: 104}
            ,{field:'taxe', title: '是否含税', sort: true,templet:'#taxe', minWidth: 110}
            ,{field:'invoiceType', title: '发票类型', sort: true,templet:'#invoiceType'}
            ,{field:'strengths', title: '强项类型', sort: true,templet: '#strengths',width: 110}
            ,{field:'evaluateDdelivery', title: '交期', sort: true,templet: '#evaluateDdelivery'}
            ,{field:'evaluateQuality', title: '品质', sort: true,templet: '#evaluateQuality'}
            ,{field:'evaluateCompatibility', title: '配合度', sort: true,templet: '#evaluateCompatibility'}
            ,{field:'evaluateRate', title: '评级', sort: true,templet: '#evaluateRate'}
            ,{field:'createUserId', title: '创建人', sort: true}
            ,{field:'createTime', title: '创建时间', sort: true}
            ,{field:'updateUserId', title: '修改人', sort: true}
            ,{field:'updateTime', title: '修改时间', sort: true}
            ,{field:'remark', title: '备注', hide:true}
            ,{title: '操作', width: 160, align:'center', fixed: 'right', toolbar: '#table-supplier'}
        ]]
        ,done : function () {
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

    //监听右侧工具条事件
    table.on('tool(supplier_infoTab)',function (obj) {
        var data = obj.data;
        var id = data.id;
        var companyName = data.companyName;
        if (obj.event === 'edit'){
            admin.popup({
                title: '编辑供应商信息'
                ,shadeClose: true
                ,shade: false
                ,maxmin: true
                ,btn:['提交']['取消']
                ,id: 'supplierAdd_form'
                ,area: ['55%', '75%']
                ,success: function (layero, index) {
                    view(this.id).render('/infoManagement/iframeWindow/supplier_edit', data).done(function () {
                        console.log(data);
                        form.render(null, 'supplierAdd_form');
                        form.on('submit(LAY-supplier-add-submit)', function(data){
                            var field = data.field;
                            field.id = id;
                            console.log('修改供应商的信息为:'+JSON.stringify(field));
                            admin.req({
                                type: 'post'
                                ,url: setter.baseUrl+'sys/supplier/update'
                                ,data: field
                                ,done: function (res) {
                                    layer.msg('供应商信息修改成功');
                                    console.log('供应商信息修改成功');
                                    layui.table.reload('supplier_infoTab');
                                }
                                ,fail: function (res) {
                                    layer.msg('供应商信息修改失败！！');
                                    console.log('供应商信息修改失败！！');
                                },
                            });
                            layer.close(index);
                            return false;
                        })
                    })
                }
            })
        } else if (obj.event === 'search'){
            admin.popup({
                title: "供应商［"+companyName+"］信息"
                ,shadeClose: true
                ,shade: false
                ,maxmin: true
                ,area: ['362px', '399px']
                // ,id: 'sys_menu'
                ,success: function(layero, index){
                    view(this.id).render('/infoManagement/iframeWindow/supplier_search', data).done(function(){
                        //监听提交
                    });
                }
            });
        } else if (obj.event === 'del'){
            layer.confirm('确定删除公司名为［'+companyName+"］的供应商？", function(index){
                admin.req({
                    type:'post',
                    url: setter.baseUrl+'sys/supplier/delete'
                    ,data: {"supplierIds":id}
                    ,done : function (res) {
                        layer.msg('删除成功');
                        obj.del();
                        layer.close(index);
                        layui.table.reload('supplier_infoTab');
                    }
                    ,fail: function (res) {
                        layer.msg('服务器异常，稍后再试！');
                    }
                })
            });
        }
    })

    var active = {
        /**
         * 动态获取id，并且传到下一个view子页面（子页面根据此id，动态渲染操作页面）
         */
        //供应商信息页面
        supplier_add_but:function(data){
            var this_id = $(this).attr('id');
            admin.popup({
                title: '添加供应商信息'
                ,shadeClose: true
                ,shade: false
                ,maxmin: true
                ,area: ['55%', '75%']
                // ,id: 'sys_menu'
                ,success: function(layero, index){
                    view(this.id).render('/infoManagement/iframeWindow/supplier_edit', data).done(function(){
                        form.render(null, 'supplierAdd_form');
                        //监听提交
                        form.on('submit(LAY-supplier-add-submit)', function(data){
                            var field = data.field; //获取提交的字段
                            layer.alert(JSON.stringify(data.field));
                            admin.req({
                                type:'post',
                                url: setter.baseUrl+'sys/supplier/save' //实际使用请改成服务端真实接口
                                ,data: field
                                ,done: function(res){
                                    console.log(res);
                                    layer.msg('供应商添加成功');
                                    layui.table.reload('supplier_infoTab'); //重载表格
                                }
                                ,fail: function (res) {
                                    layer.msg('供应商加失败');
                                },
                            });
                            layer.close(index); //执行关闭
                            return false;
                        });
                    });
                }
            });
        },
        
        // reload: function () {
        //     var idReload = $('#supplier_id');
        //     layer.msg(idReload.val())
        //     var companyNameReload = $('#supplier_companyName');
        //     var typeReload = $('#supplier_type');
        //     var contactReload = $("#supplier_contact");
        //     table.reload('supplier_infoTab',{
        //         page: {
        //             curr: 1
        //         }
        //         ,where: {
        //             key: {
        //                 id:idReload.val()
        //             }
        //         }
        //     })
        // }


    };

    $('.layui-btn').on('click',function () {
        var type = $(this).data('type');
        active[type] && active[type].call(this);
    })


    exports('sys_supplier', {})
});