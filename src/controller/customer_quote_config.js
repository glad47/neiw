layui.define(['admin', 'table','element','form'], function(exports){
	var table = layui.table,
    $ = layui.jquery,
    element = layui.element,
    admin = layui.admin,
    form = layui.form,
    view = layui.view,
    setter = layui.setter;

    form.render(null,'app-content-comment');

    //监听搜索
    form.on('submit(LAY-app-contlist-search)', function(data){
        var field = data.field;
        console.log(field);
        //执行重载
        table.reload('customer_quote_config_listTab', {
            where: field
        });
    });


    //监听select下拉选框
    form.on('select',function(data){

    })
    //监听参数类型切换
    form.on('select(f)',function(data){
        $.get(setter.imUrl+"getAllParameter",{parameterTypeId:data.value},function(data){
            $("select[name='g']").empty();
            $("select[name='h']").empty();
            $.each(data.data, function (i, d) {
                $("select[name='g']").append(
                    "<option value='" + d.id + "'>" + d.parameterName + "</option>");
            });
            form.render();
        });
    });

    //监听参数切换
    form.on('select(g)',function(data){
        $.get(setter.imUrl+"getAllParameterValue",{parameterId:data.value},function(data){
            var _this = $("select[name='h']");
            _this.empty();
            $.each(data.data, function (i, d) {
                $("select[name='h']").append(
                    "<option value='" + d.id + "'>" + d.parameterValue + "</option>");
            });
            form.render();
        });
    });

    //编辑联动数据回显
    function echoLinkageData(ptid,pnid,pvid){
        console.log(ptid + " "+ pnid + " "+pvid);
        $.ajaxSettings.async = false;
        $.get(setter.imUrl+"getAllParameter",{parameterTypeId:ptid},function(data){
            $("select[name='g']").empty();
            $("select[name='h']").empty();
            $.each(data.data, function (i, d) {
                if (d.id === pnid) {
                     $("select[name='g']").append(
                    "<option value='" + d.id + "' selected>" + d.parameterName + "</option>");
                }else{
                     $("select[name='g']").append(
                    "<option value='" + d.id + "'>" + d.parameterName + "</option>");
                }
               
            });
            // form.render();
        });
        // $.ajaxSettings.async = true;
        // $.ajaxSettings.async = false;
        $.get(setter.imUrl+"getAllParameterValue",{parameterId:pnid},function(data){
            var _this = $("select[name='h']");
            _this.empty();
            $.each(data.data, function (i, d) {
                if (d.id === pvid) {
                    $("select[name='h']").append(
                    "<option value='" + d.id + "' selected>" + d.parameterValue + "</option>");
                }else{
                    $("select[name='h']").append(
                    "<option value='" + d.id + "'>" + d.parameterValue + "</option>");
                }
                
            });
            // form.render();
        });
        $.ajaxSettings.async = true;
        form.render();
    }

    table.render({
        elem: '#customer_quote_config_listTab'
        ,url: setter.imUrl+'getAllQuoteConfigByConsumerAdjusten'
        ,where: {
            //access_token: layui.data('layuiAdmin').access_token
        }
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
             {field:'consumerAdjustQuoteId', title: 'id', sort: true}
            ,{field:'userSysName', title: '用户系统名'}
            // ,{field:'userId', title: '用户id', sort: true}
            ,{field:'userEmail', title: '用户邮箱', sort: true}
            ,{field:'id', title: '报价id', sort: true}
            ,{field:'areaParameterName',title:'平米',sort:true}
            ,{field:'pcbTypeName', title: '基材', sort: true}
            ,{field:'layerNum', title: '层数', sort: true}
            ,{field:'urgentType', title: '加急类型', sort: true}
            ,{field:'parameterTypeName', title: '参数类型', sort: true, align: 'right'} //单元格内容水平居中
            ,{field:'parameterName', title: '参数名', sort: true, align: 'right'}
            ,{field:'parameterValue', title: '参数值', sort: true, align: 'right'}
            ,{field:'premiumType', title: '加价类别', sort: true}
            ,{field:'quote', title: '正常报价', sort: true}
            ,{field:'adjustedQuote', title: '调整价', sort: true}
            ,{width:150, align:'center',align:'center',fixed: 'right',toolbar:'#customer-quote-config-operate',title:'操作'}
        ]]
        ,page: true
    });

    //监听 工具条
    table.on('tool(customer_quote_config_listTab)',function(obj){
        var data = obj.data;
        console.log(data);
        if (obj.event === 'edit') {
           
            admin.popup({
                title:'编辑客户报价配置',
                area:['850px', '440px'],
                id:'LAY-popup-customer-edit',
                btn:['提交','取消'],
                yes:function(index, layero){
                    $("#layuiadmin-app-form-submit").click();
                },
                end:function(){},
                success:function(layero,index){
                    view(this.id).render('/infoManagement/iframeWindow/customer_quote_config_form',data).done(function(){
                        form.render(null,'layuiadmin-app-form-list');
                         //回显下拉联动
                        echoLinkageData(data.parameterTypeId,data.parameterNameId,data.parameterValueId);
                        //监听提交
                        form.on('submit(layuiadmin-app-form-submit)',function(data){
                            var field = data.field;
                            admin.req({
                                url:setter.baseUrl+'sys/consumeradjustenquote/update',
                                type:'POST',
                                data:field,
                                success:function(data){
                                    layui.table.reload('customer_quote_config_listTab'); //重载表格
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
                    url:setter.baseUrl+'sys/consumeradjustenquote/delete',
                    type:'POST',
                    data:{ids:data.consumerAdjustQuoteId},
                    success:function(data){
                        layui.table.reload('customer_quote_config_listTab'); //重载表格
                        layer.msg('已删除');
                    }
                });
            });
        }
    });


    var active = {
        customerQuoteConfig_add:function(){
            var that = this;
            admin.popup({
                type: 1,
                title: '客户报价配置新增',
                shadeClose: true,
                shade: false,
                maxmin: false, //开启最大化最小化按钮
                area: ['850px', '700px'],
                content:'<div class="layui-row" id="customer_edit_info"></div>',
                btn:['添加','查询','取消'],
                yes: function(index, layero) {
                    $('#layuiadmin-app-form-submit').click();
                },
                btn2:function(index,layero){
                    $('#layuiadmin-app-form-submit').click();
                    return false //开启该代码可禁止点击该按钮关闭
                },
                success: function (layero,index) {
                    view('customer_edit_info').render('/infoManagement/iframeWindow/customer_quote_config_form')
                    .then(function (value) {
                        //视图文件请求完毕，视图内容渲染前的回调
                    }).done(function(){
                        form.render(null,'layuiadmin-app-form-list');
                      
                        //监听提交
                        form.on('submit(layuiadmin-app-form-submit)',function(data){
                            var field = data.field;
                            console.log(field);

                            var field = data.field;
                            admin.req({
                                url:setter.imUrl+"findQuoteConfig",
                                type:"POST",
                                data:{
                                    areaSq: field.a
                                    ,pcbtype: field.b
                                    ,layerNum: field.c
                                    ,urgentType: field.d
                                    ,parameterType: field.f
                                    ,parameterName: field.g
                                    ,parameter: field.h
                                    ,premiumType: field.e,
                                },
                                success:function(data){
                                    if (data.code == 0 & data.data != null) {
                                        field.quoteConfigId = data.data.id;

                                        $("#imgtalk").attr("value",data.data.quote);
                                    }else{
                                        layer.msg("没有该报价！");
                                    }
                                },
                                async:false
                            });
                            console.log(field);
                            if (field.quote !== "") {//查询标准报价
                                if (field.adjustedQuote !== "") {
                                    admin.req({
                                        url: setter.baseUrl+'sys/consumeradjustenquote/save',
                                        type:'POST',
                                        //dataType:'json',
                                        //contentType:'application/json',
                                        data: field,
                                        success:function(data){
                                            console.log(data);
                                            if (data.code === 0) {
                                                layui.table.reload('customer_quote_config_listTab'); //重载表格
                                                layer.close(index); //执行关闭 
                                            }else{
                                                layer.msg(data.msg);
                                            }
                                            
                                            
                                        }
                                    });    
                                }
                            }
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


    exports('customer_quote_config', {});  

});