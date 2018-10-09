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
        // ,toolbar: "toolbarSupplier" 开启后会自动开启打印和导出功能
        ,where: {
            access_token: layui.data('layuiAdmin').access_token
        }
        ,cols: [[
            {type:'checkbox'}
            ,{field:'id', title: 'ID',hide: true}
            ,{field:'supplierId', title: '供应商编号', sort: true,width: 110}
            ,{field:'companyName', title: '公司名称',width: 180} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'type', title: '类别', sort: true,width: 120,templet: '#type'}
            ,{field:'contact', title: '联系人', sort: true,width: 120}
            ,{field:'officePhone', title: '办公电话', sort: true,width: 120}
            ,{field:'phone', title: '手机', align: 'center', sort: true,width: 120} //单元格内容水平居中
            ,{field:'email', title: 'Email', sort: true,width:200} //单元格内容水平居中
            ,{field:'paymentType', title: '付款方式', sort: true,templet:'#paymentType'}
            ,{field:'taxe', title: '是否含税', sort: true,templet:'#taxe'}
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
                ,id: 'supplierAdd_form'
                ,area: ['55%', '75%']
                ,success: function (layero, index) {
                    view(this.id).render('/infoManagement/iframeWindow/supplier_edit', data).done(function () {
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
                                }
                                ,fail: function (res) {
                                    layer.msg('供应商信息修改失败！！');
                                    console.log('供应商信息修改失败！！');
                                },
                            });
                            layui.table.reload('supplier_infoTab');
                            layer.close(index);
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
                ,area: ['360px', '360px']
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
                    }
                    ,fail: function (res) {
                        layer.msg('服务器异常，稍后再试！');
                    }
                })
                layer.close(index);
            });
        }
    })

    var active = {
        /**
         * 动态获取id，并且传到下一个view子页面（子页面根据此id，动态渲染操作页面）
         */
        //供应商信息页面
        supplier_add:function(data){
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
                                }
                                ,fail: function (res) {
                                    layer.msg('供应商加失败');
                                },
                            });
                            layui.table.reload('supplier_infoTab'); //重载表格
                            layer.close(index); //执行关闭
                        });
                    });
                }
            });
        },
        //供应商信息编辑
        supplier_edit :function(data){
            var checkStatus = table.checkStatus('supplier_infoTab')
            ,data = checkStatus.data
            ,twotest = JSON.stringify(data).substring(1, JSON.stringify(data).length -1)
            var checkLen = data.length; //获取选中的行的数量
            if (checkLen ===1){
                admin.popup({
                    title: '编辑供应商信息'
                    ,shadeClose: true
                    ,shade: false
                    ,maxmin: true
                    ,id: 'supplierAdd_form'
                    ,area: ['55%', '65%']
                    ,success: function (layero, index) {
                        view(this.id).render('/infoManagement/iframeWindow/supplier_edit', data).done(function () {
                            form.render(null, 'supplierAdd_form');
                            console.log("data:"+data);
                        })
                    }
                })
            } else if (checkLen === 0 || checkLen == null || checkLen == ""){
                layer.msg('请选择要编辑的行！！！');
            } else if (checkLen > 1) {
                layer.msg('只能选择一行，请重新选择！');
            }

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
    //手机端隐藏用户名，只显示头像
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
        layer.msg('1');
        $("a[lay-event='del']").css({"color":"red","background":"none"});
    }



    exports('sys_supplier', {})
});