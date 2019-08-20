layui.define(['admin', 'table','element','form'], function(exports){
	var table = layui.table,
    $ = layui.jquery,
    element = layui.element,
    admin = layui.admin,
    form = layui.form,
    view = layui.view,
    setter = layui.setter;

    form.render(null,'app-content-comment');

    form.on('submit(sys-dict-but-search)', function(data){
        var field = data.field;
        // console.log(field);
        //执行重载
        table.reload('sys_dict_listTab', {
            where: field
        });
    });

    table.render({
        elem: '#sys_dict_listTab'
        ,url: setter.baseUrl+'sys/dict/list'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
             {field:'dictId', title: 'id', sort: false}
            ,{field:'tableName', title: '菜单名'}
            ,{field:'fileName', title: '字段名', sort: false}
            ,{field:'dictKey',title:'键',sort:false}
            ,{field:'dictValue', title: '值', sort: false}
            ,{width:150, align:'center',align:'center',fixed: 'right',toolbar:'#sys-dict-operate',title:'操作'}
        ]]
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
    });

    //监听 工具条
    table.on('tool(sys_dict_listTab)',function(obj){
        var data = obj.data;
        console.log(data);
        if (obj.event === 'edit') {
            admin.popup({
                title:'编辑客户报价配置',
                area:['850px', '440px'],
                id:'LAY-popup-sys-dict-edit',
                btn:['提交','取消'],
                yes:function(index, layero){
                    $("#sys-dict-form-submit").click();
                },
                end:function(){},
                success:function(layero,index){
                    view(this.id).render('/infoManagement/iframeWindow/dict_form',data).done(function(){
                        form.render(null,'layuiadmin-app-form-list');
                        //监听提交
                        form.on('submit(sys-dict-form-submit)',function(data){
                            var field = data.field;
                            admin.req({
                                url:setter.baseUrl+'sys/dict/update',
                                type:'POST',
                                data:field,
                                success:function(data){
                                    layui.table.reload('sys_dict_listTab'); //重载表格
                                    layer.close(index); //执行关闭 
                                }
                            });
                        });
                    });
                }
            });
        } else if (obj.event === 'del') {
            layer.confirm('确定删除此报价？', function(index){
                admin.req({
                    url:setter.baseUrl+'sys/dict/delete',
                    type:'POST',
                    data:{ids:data.consumerAdjustQuoteId},
                    success:function(data){
                        layui.table.reload('sys_dict_listTab'); //重载表格
                        layer.msg('已删除');
                    }
                });
            });
        }
    });


    var active = {
        sys_dict_add:function(){
            var that = this;
            admin.popup({
                type: 1,
                title: '数据字典新增',
                shadeClose: true,
                shade: false,
                maxmin: false, //开启最大化最小化按钮
                area: ['850px', '700px'],
                content:'<div class="layui-row" id="sys_dict_info"></div>',
                btn:['添加','取消'],
                yes: function(index, layero) {
                    $('#sys-dict-form-submit').click();
                },
                success: function (layero,index) {
                    view('sys_dict_info').render('/infoManagement/iframeWindow/dict_form')
                    .then(function (value) {
                        //视图文件请求完毕，视图内容渲染前的回调
                    }).done(function(){
                        form.render(null,'layuiadmin-app-form-list');
                      
                        //监听提交
                        form.on('submit(sys-dict-form-submit)',function(data){
                            var field = data.field;
                            admin.req({
                                url:setter.baseUrl+'sys/dict/save',
                                type:"POST",
                                data:field,
                                success:function(data){
                                    layer.alert("订单协同修改成功");
                                    // layer.closeAll();
                                    table.reload('sys_dict_listTab');
                                    layer.close(index);   
                                }
                            });
                        });

                    });


                }
            });
        },

    };

    $('.layui-btn').on('click',function () {
        var type = $(this).data('type');
        active[type] && active[type].call(this);
    })

    $(".sys-dict-form-search input").bind("input propertychange", function (even) {
        $("*[lay-filter='sys-dict-but-search']").click();
    });

    exports('sys_dict', {});  

});