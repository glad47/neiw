layui.define(['admin','table','index','element','form','laydate'], function(exports) {
    var table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element
        ,$ = layui.jquery;

    form.render(null,'iqc-mantissa-management-formlist');

    //日期
    laydate.render({
        elem: '#storageDate',
    });
    //日期
    laydate.render({
        elem: '#gmtModified',
    });

    //监听搜索
    form.on('submit(LAY-iqc-mantissa-search)', function(data){
        var field = data.field;
        //执行重载
        table.reload('LAY-iqc-mantissa-tab', {
            where: field
        });
    });

    //table
    table.render({
        elem: '#LAY-iqc-mantissa-tab'
        ,url: setter.baseUrl+'iqc/mantissa/list'
        ,cellMinWidth: 80
        ,id: "LAY-iqc-mantissa-tab"
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {type:'checkbox', fixed: 'left'}
            ,{field: 'productNo', title: '聚谷型号', fixed: 'left', sort: true}
            ,{field: 'orderType',title: '订单类型', sort: true}      // 1 ＝ 已指派  2= 已报价
            ,{field: 'cycle', title: '周期', sort: true}
            ,{field: 'position', title: '摆放位置', width: 280, sort: true}
            ,{field: 'quantity',title: '数量', sort: true}
            ,{field: 'unit', title: '单位',sort: true}
            ,{field: 'storageDate',title: '入库时间', templet: ' <a>{{ layui.util.toDateString(d.storageDate,"yyyy-MM-dd") }}</a> ', sort: true}
            ,{field: 'gmtModified', title: '修改时间', sort: true}
            ,{fixed: 'right', title:'操作', toolbar: '#table-iqc-mantissa', width: 110}
        ]]
    });

    //监听工具条
    table.on('tool(LAY-iqc-mantissa-tab)', function(obj){
        var data = obj.data;
        if(obj.event === 'edit'){
            admin.popup({
                title: '编辑尾数'
                ,area: ['50%', '50%']
                ,id: 'LAY-popup-iqc-mantissa-add'
                ,btn:['保存', '取消']
                ,yes: function(){
                    $("#iqc-mantissa-sumbit").click();
                }
                ,success: function(layero, index){
                view(this.id).render('productManagement/iframeWindow/mantissa_add_edit', data).done(function(){
                    form.render(null, 'iqc-mantissa-edit-add-form');
                    
                    //监听提交
                    form.on('submit(LAY-iqc-mantissa-submit)', function(data){
                        var field = data.field; //获取提交的字段
                    
                        admin.req({
                            type:'post',
                            url: setter.baseUrl+'iqc/mantissa/update' //实际使用请改成服务端真实接口
                            ,data: field
                            ,done: function(res){
                                // console.log(res);
                                layer.msg('修改成功');
                                layui.table.reload('LAY-iqc-mantissa-tab'); //重载表格
                            }
                            ,fail: function (res) {
                                layer.msg('修改失败');
                            },
                        });
                        layer.close(index); //执行关闭  
                    });
                });
                }
            });
        }
    });

    //事件
    var active = {
        add: function(){
            admin.popup({
                title: '添加尾数'
                ,area: ['50%', '50%']
                ,id: 'LAY-popup-mantissa-add'
                ,btn:['保存', '取消']
                ,yes: function(){
                    $("#iqc-mantissa-sumbit").click();
                }
                ,success: function(layero, index){
                    view(this.id).render('productManagement/iframeWindow/mantissa_add_edit').done(function(){
                        form.render(null, 'iqc-mantissa-edit-add-form');
                        
                        //监听提交
                        form.on('submit(LAY-iqc-mantissa-submit)', function(data){
                            var field = data.field; //获取提交的字段
                            admin.req({
                                type:'post',
                                url: setter.baseUrl+'iqc/mantissa/save' //实际使用请改成服务端真实接口
                                ,data: field
                                ,done: function(res){
                                    // console.log(res);
                                    layer.msg('添加成功');
                                    layui.table.reload('LAY-iqc-mantissa-tab'); //重载表格
                                }
                                ,fail: function (res) {
                                    layer.msg('添加失败');
                                },
                            });
                            layer.close(index); //执行关闭  
                        });
                    
                    });
                }
            });
        },
        batchdel: function(){
            var checkStatus = table.checkStatus('LAY-iqc-mantissa-tab')
            ,checkData = checkStatus.data; //得到选中的数据
    
            if(checkData.length === 0){
              return layer.msg('请选择数据');
            }
            var ids = checkStatus.data.map(function(elem){return elem.id}).join(",");
            layer.confirm('确定删除吗？', function(index) {
              //执行 Ajax 后重载
              admin.req({
                type: 'post',
                url: setter.baseUrl+"iqc/mantissa/delete",
                data: {'ids': ids},
                done: function(res){
                    layer.msg('已删除');
                    table.reload('LAY-iqc-mantissa-tab');
                }
                ,fail: function (res) {
                    layer.msg('删除失败');
                },
              });
              
            });
        }
    };

    $('.layui-btn.layuiadmin-btn-useradmin').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    })
    
    exports('iqc_mantissa_management',{});
});