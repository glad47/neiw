layui.define(['admin', 'table','element','form', 'edit_customer_info'], function(exports){
    var table = layui.table,
    $ = layui.jquery,
    element = layui.element,
    admin = layui.admin,
    form = layui.form,
    edit_customer_info = layui.edit_customer_info,
    view = layui.view,
    setter = layui.setter;
    
    form.render(null,'app-content-comment');
    table.render({
        elem: '#customer_listTab'
        ,url: setter.baseUrl+'sys/consumer/user/list'

        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
             {field:'id', title: 'id', sort: true, width: 130}
            ,{field:'status', title: '状态', width: 130, templet:'#customerStatus'}
            ,{field:'userSystemId', title: '客户代码', sort: true, width: 130}
            ,{field:'userName', title: '用户名', width: 130}
            ,{field:'country', title: '国家', sort: true}
            ,{field:'email', title: '邮箱', sort: true, minWidth: 196}
            ,{field:'gmtCreate', title: '注册时间', sort: true}
            ,{field:'gmtModified', title: '更新时间', sort: true}

            ,{field:'userType',title:'内外',sort:true, templet:'#userType', width: 130, hide: true}
            ,{field:'userIp',title:'注册IP',sort:true, hide: true}
            ,{field:'skypeId', title: 'Skype', sort: true, hide: true}
            ,{field:'receiverTelephone', title: '收货电话',minWidth: 120, sort: true, hide: true}
            ,{field:'googleId', title: 'Google', sort: true, align: 'right', hide: true} //单元格内容水平居中
            ,{field:'facebookId', title: 'Facebook', sort: true, align: 'right', hide: true}
            ,{field:'receiverCompany',title:'公司名',sort:true, align:'right', hide: true}
            ,{field:'receiverAddress', title: '收货地址', sort: true, align: 'right', hide: true}
            ,{field:'receiverCity', title: '收货城市', sort: true, hide: true}
            ,{field:'jobrole', title: '工作角色', sort: true, hide: true}
            ,{field:'contact', title: '联系人', sort: true, hide: true}
            ,{field:'businessType', title: '业务类型', sort: true, hide: true}
            ,{field:'applications', title: '应用', sort: true, hide: true}
            ,{width:250, align:'center',align:'center',fixed: 'right',toolbar:'#role-table-operate-barDemo',title:'操作'}
        ]]
        ,done: function (res, curr, count) {
            $(".layui-table tr div").each(function () { //  已经审核  移除 审核按钮
               if ($(this).text().indexOf('已审核') > 0) {
                   $(this).parents("tr").children("td:last").find("a[lay-event='customerInfosh']").remove();
               }
            });
        }
        ,page: true
    });

    //监听 工具条
    table.on('tool(customer_listTab)',function(obj){
        var data = obj.data;
        console.log(data);
        if (obj.event === 'edit') {
            //edit_customer_info.editInfo(data)
            admin.req({
                type: 'post',
                data: {'userId': data.id},
                url: setter.baseUrl+'sys/receiveradders/queryReceiverAddersByUid/',
                success:function(ret){
                    // console.log(ret);
                    data.receiverAddersEntityList = ret.data;
                    admin.popup({
                        title:'编辑客户',
                        area:['60%', '100%'],
                        id:'LAY-popup-customer-edit',
                        btn:['提交','取消'],
                        yes:function(index, layero){
                            $("#layuiadmin-app-form-submit").click();
                        },
                        end:function(){},
                        success:function(layero,index){
                            view(this.id).render('/infoManagement/iframeWindow/customer_edit_info',data)
                            .then(function(value){
                                //视图文件请求完毕，视图内容渲染前的回调
                            }).done(function(){
                                form.render(null,'customer-add-edit-form-list');
                                //监听提交
                                var productionVerification;
                                form.on('switch(productionVerification)', function (data) {
                                    if (data.elem.checked == true) {
                                        layer.msg('需要确定生产资料');
                                        productionVerification = 0;
                                    }  else {
                                        layer.msg('不需要确定生产资料');
                                        productionVerification = 1;
                                    }
                                });
                                var invalidMark;
                                form.on('switch(optionUser)',function (data) {
                                    if (data.elem.checked == true){
                                        layer.msg('已启用');
                                        invalidMark =0;
                                    } else {
                                        layer.msg('停用');
                                        invalidMark =1;
                                    }
                                });
                                var userType;
                                form.on('switch(isneibuUser)',function (data) {
                                    if (data.elem.checked == true){
                                        layer.msg('内部用户');
                                        userType =1;
                                    } else {
                                        layer.msg('客户系统用户');
                                        userType =0;
                                    }
                                });
                                var auditMark;
                                form.on('switch(isAuditMark)',function(data){
                                    if (data.elem.checked == true) {
                                        layer.msg('需要审核');
                                        auditMark = 0;
                                    }else{
                                        layer.msg('不需审核');
                                        auditMark = 1;
                                    }
                                });
                                var deliveryReport = 0;
                                form.on('switch(deliveryReport)',function (data) {
                                    if (data.elem.checked == true){
                                        layer.msg('需要出货报告');
                                        deliveryReport =1;
                                    } else {
                                        layer.msg('不需要出货报告');
                                        deliveryReport =0;
                                    }
                                });

                                var addlist = data.receiverAddersEntityList;
                                // console.log(addlist);
                                if(addlist.length != 0){
                                    var tr = '',radiodiv = '';
                                    addlist.forEach(function(e,i){
                                        // console.log(e);
                                        if(e.isDefault != 0){
                                            radiodiv = "<input type='radio' name='isDefault' autocomplete='off' checked/>"
                                        }else{
                                            radiodiv = "<input type='radio' name='isDefault' autocomplete='off' />"
                                        }
                                        tr += "<tr><td>"+
                                        radiodiv+
                                        "<input type='hidden' autocomplete='off' value='"+(e.id == null ? "" : e.id)+"'/>"+
                                        "</td><td>"+
                                        "<input type='text' autocomplete='off' value='"+(e.receiverName == null ? "" : e.receiverName)+"'/>"+
                                        "</td><td>"+
                                        "<input type='text' autocomplete='off' value='"+(e.receiverTelephone == null ? "" : e.receiverTelephone)+"' />"+
                                        "</td><td>"+
                                        "<input type='text' autocomplete='off' value='"+(e.receiverCompany == null ? "" : e.receiverCompany)+"'/>"+
                                        "</td><td>"+
                                        "<input type='text' autocomplete='off' value='"+(e.receiverPostcode == null ? "" : e.receiverPostcode)+"'/>"+
                                        "</td><td>"+
                                        "<input type='text' autocomplete='off' value='"+(e.receiverAddress == null ? "" : e.receiverAddress)+"' />"+
                                        "</td><td><input type='button' class='layui-btn layui-btn-xs layui-btn-danger' value='删除' addid='"+e.id+"'></td></tr>";
                                    });
                                    $('#table_address').append(tr);
                                    resetTableIndex();
                                    form.render();
                                }else{
                                    resetTableIndex();
                                    form.render();
                                }
                               
                               
                                var add_del_array = [];

                                //监听添加时间
                                $('#add_address').click(function(){
                                    var tr = "<tr><td>"+
                                    "<input type='radio' name='isDefault' autocomplete='off'/>"+
                                    "<input type='hidden' autocomplete='off'/>"+
                                    "</td><td>"+
                                    "<input type='text' autocomplete='off'/>"+
                                    "</td><td>"+
                                    "<input type='text' autocomplete='off'/>"+
                                    "</td><td>"+
                                    "<input type='text' autocomplete='off'/>"+
                                    "</td><td>"+
                                    "<input type='text' autocomplete='off'/>"+
                                    "</td><td>"+
                                    "<input type='text' autocomplete='off'/>"+
                                    "</td><td><input type='button' class='layui-btn layui-btn-xs layui-btn-danger' value='删除'></td></tr>";
                                    $('#table_address').append(tr);
                                    resetTableIndex();
                                    form.render();
                                    $(":button").click(function () {    
                                        $(this).parent().parent().remove();     
                                        var addid = $(this).attr("addid");
                                        if(addid != undefined && addid != ""){
                                            add_del_array.push(addid);
                                        }
                                        resetTableIndex();
                                        form.render();
                                    });
                                });
            
                                $(":button").click(function () {    
                                    $(this).parent().parent().remove();     
                                    var addid = $(this).attr("addid");
                                    if(addid != undefined && addid != ""){
                                        add_del_array.push(addid);
                                    }
                                    //var height1=$(document.body).height()+10;
                                    //$(window.parent.document).find("#myiframe").attr("height",height1);  
                                    resetTableIndex();
                                    form.render();
                                });

                                function getFormData($form) {
                                    var unindexed_array = $form.serializeArray();
                                    var indexed_array = {};
                                    var add_array = [],add_obj = {}, receiverAddersEntityList = [];
                                    $.map(unindexed_array, function (n, i) {
                                        if(n['name'].indexOf('receiverAddersEntityList') === 0){
                                                return add_array.push(n['value']);
                                        }else{
                                            indexed_array[n['name']] = n['value'];
                                        }
                                    });
                                    add_array.forEach(function(e,i){
                                        if(((i+1)%6) == 0){
                                            // console.log(e);
                                            // console.log(i);
                                            add_obj.id = add_array[i-5];
                                            add_obj.receiverName = add_array[i-4];
                                            add_obj.receiverTelephone = add_array[i-3];
                                            add_obj.receiverCompany = add_array[i-2];
                                            add_obj.receiverPostcode = add_array[i-1];
                                            add_obj.receiverAddress = add_array[i];
                                            add_obj.isDefault = 0;
                                            receiverAddersEntityList.push(add_obj);
                                            add_obj = {};
                                        }
                                    });
                                    //console.log(unindexed_array);
                                    var isDefault = indexed_array.isDefault;
                                    if(isDefault != undefined && isDefault != null){
                                        //console.log(isDefault)
                                        receiverAddersEntityList[isDefault].isDefault = 1;
                                    }
                                    //console.log(receiverAddersEntityList);
                                    //var receiverAddersEntityList = handleAddersData(add);
                                    //console.log(receiverAddersEntityList);
                                    indexed_array.receiverAddersEntityList = receiverAddersEntityList;
                                    return indexed_array;
                                }

                                //动态加载行
                                function resetTableIndex(){
                                    $('#table_address tbody tr').each(function(index){
                                        $(this).find("td").eq(0).find("input[type=radio]").attr("value",index);
                                        $(this).find("td").eq(0).find("input[type='hidden']").attr("name",'receiverAddersEntityList['+index+'].id');
                                        $(this).find("td").eq(1).find("input[type='text']").attr("name",'receiverAddersEntityList['+index+'].receiverName');
                                        $(this).find("td").eq(2).find("input[type='text']").attr("name",'receiverAddersEntityList['+index+'].receiverTelephone');
                                        $(this).find("td").eq(3).find("input[type='text']").attr("name",'receiverAddersEntityList['+index+'].receiverCompany');
                                        $(this).find("td").eq(4).find("input[type='text']").attr("name",'receiverAddersEntityList['+index+'].receiverPostcode');
                                        $(this).find("td").eq(5).find("input[type='text']").attr("name",'receiverAddersEntityList['+index+'].receiverAddress');
                                    });
                                }

                                form.on('submit(customer-edit-info-form-submit)',function(formdata){
                                    var field = getFormData($('#customer-add-edit-form-list'));
                                    field.invalidMark = invalidMark;
                                    field.userType = userType;
                                    field.auditMark = auditMark;
                                    field.deliveryReport = deliveryReport;
                                    field.productionVerification = productionVerification;
                                    field.id = data.id;
                                    field.addDelIdList = add_del_array;
                                    console.log(field);
                                    admin.req({
                                        url: setter.baseUrl+'sys/consumer/user/update',
                                        type:'POST',
                                        dataType:'json',
                                        contentType:'application/json',
                                        data: JSON.stringify(field),
                                        success:function(data){
                                            console.log(data);
                                            layui.table.reload('customer_listTab'); //重载表格
                                            layer.close(index); //执行关闭
                                        }
                                    })
                    
                                });

                            });
                            
                        }
                    });
                }
            });
            

        } else if (obj.event === 'del') {
            layer.confirm('确定删除此客户？', function(index){
                admin.req({
                    url:setter.baseUrl+'sys/consumer/user/delete',
                    type:'POST',
                    data:{ids:data.id},
                    success:function(data){
                        layui.table.reload('customer_listTab'); //重载表格
                        layer.msg('已删除');
                    }
                });
            });
        } else if (obj.event === 'conversionCustomer') {    // 转客户
            admin.popup({
                type: 1,
                title: '选择跟单员',
                btn: ['转换', '取消'],
                area: ["400px","400px"],
                yes: function() {
                    $("*[lay-filter='conversionCustomer-submit']").click();
                },
                success: function (layero, index) {
                    view(this.id).render('/infoManagement/iframeWindow/conversionCustomer', data).done(function () {
                        form.render();
                    });
                }
            })
        } else if (obj.event === 'customerInfosh') {
            admin.popup({
                type: 1,
                title: '审核',
                btn: ['审核', '取消'],
                area: ["396px","299px"],
                id: "popupCustomerInfosh",
                yes: function () {
                    layer.confirm("确定提交审核？", function () {
                        $("input[lay-filter='customersh-submit']").click();
                    });
                },
                success: function () {
                    view(this.id).render('/infoManagement/iframeWindow/customer_sh', data).done(function () {
                        form.render();
                    });
                }
            })
        }
    });


    var active = {
        customerInfo_add:function(){
            var that = this;
            admin.popup({
                id: 'layer-customer-info-add-form',
                type: 1,
                title: '客户新增',
                shadeClose: true,
                shade: false,
                maxmin: false, //开启最大化最小化按钮
                area: ['60%', '100%'],
                content:'<div class="layui-row" id="customer_edit_info"></div>',
                btn:['确定','取消'],
                yes: function(index, layero) {
                    $('#layuiadmin-app-form-submit').click();
                },
                success: function (layero,index) {
                    view('customer_edit_info').render('/infoManagement/iframeWindow/customer_edit_info')
                    .then(function (value) {
                        //视图文件请求完毕，视图内容渲染前的回调
                        // console.log(value);
                    }).done(function(){
                        form.render(null, 'customer-add-edit-form-list');
                        //监听提交
                        var productionVerification;
                        form.on('switch(productionVerification)', function (data) {
                            if (data.elem.checked == true) {
                                layer.msg('需要确定生产资料');
                                productionVerification = 0;
                            }  else {
                                layer.msg('不需要确定生产资料');
                                productionVerification = 1;
                            }
                        });
                        var invalidMark;
                        form.on('switch(optionUser)',function (data) {
                            if (data.elem.checked == true){
                                layer.msg('已启用');
                                invalidMark =0;
                            } else {
                                layer.msg('停用');
                                invalidMark =1;
                            }
                        });
                        var userType;
                        form.on('switch(isneibuUser)',function (data) {
                            if (data.elem.checked == true){
                                layer.msg('内部用户');
                                userType =1;
                            } else {
                                layer.msg('客户系统用户');
                                userType =0;
                            }
                        });
                        var auditMark;
                        form.on('switch(isAuditMark)',function(data){
                            if (data.elem.checked == true) {
                                layer.msg('需要审核');
                                auditMark = 0;
                            }else{
                                layer.msg('不需审核');
                                auditMark = 1;
                            }
                        });
                        var deliveryReport = 0;
                        form.on('switch(deliveryReport)',function (data) {
                            if (data.elem.checked == true){
                                layer.msg('需要出货报告');
                                deliveryReport =1;
                            } else {
                                layer.msg('不需要出货报告');
                                deliveryReport =0;
                            }
                        });
            
                        //监听添加时间
                        $('#add_address').click(function(){
                            var tr = "<tr><td>"+
                            "<input type='radio' name='isDefault' autocomplete='off'/>"+
                            "</td><td>"+
                            "<input type='text' autocomplete='off'/>"+
                            "</td><td>"+
                            "<input type='text' autocomplete='off'/>"+
                            "</td><td>"+
                            "<input type='text' autocomplete='off'/>"+
                            "</td><td>"+
                            "<input type='text' autocomplete='off'/>"+
                            "</td><td>"+
                            "<input type='text' autocomplete='off'/>"+
                            "</td><td><input type='button' class='layui-btn layui-btn-xs layui-btn-danger' value='删除'></td></tr>";
                            $('#table_address').append(tr);
                            resetTableIndex();
                            form.render();
                            $(":button").click(function () {    
                                $(this).parent().parent().remove();     
                                var height1=$(document.body).height()+10;
                                $(window.parent.document).find("#myiframe").attr("height",height1);  
                                resetTableIndex();
                                form.render();
                            });
                        });
            
                        form.on('submit(customer-edit-info-form-submit)',function(data){
            
                            var field = getFormData($('#customer-add-edit-form-list'));
                            // var d = JSON.stringify(ff);
                            // console.log(d);
                            // console.log(ff);
                            // var field = data.field;
                            field.invalidMark = invalidMark;
                            field.userType = userType;
                            field.auditMark = auditMark;
                            field.deliveryReport = deliveryReport;
                            field.productionVerification = productionVerification;
                            // field.country = country;
                            console.log(field);
                            admin.req({
                                url: setter.baseUrl+'sys/consumer/user/save',
                                type:'POST',
                                dataType:'json',
                                contentType:'application/json',
                                data: JSON.stringify(field),
                                success:function(data){
                                    console.log(data);
                                    layui.table.reload('customer_listTab'); //重载表格
                                    layer.close(index); //执行关闭 
                                }
                            })
            
                        });
            
                        //动态加载行
                        function resetTableIndex(){
                            $('#table_address tbody tr').each(function(index){
                                $(this).find("td").eq(0).find("input[type=radio]").attr("value",index);
                                $(this).find("td").eq(1).find("input[type='text']").attr("name",'receiverAddersEntityList['+index+'].receiverName');
                                $(this).find("td").eq(2).find("input[type='text']").attr("name",'receiverAddersEntityList['+index+'].receiverTelephone');
                                $(this).find("td").eq(3).find("input[type='text']").attr("name",'receiverAddersEntityList['+index+'].receiverCompany');
                                $(this).find("td").eq(4).find("input[type='text']").attr("name",'receiverAddersEntityList['+index+'].receiverPostcode');
                                $(this).find("td").eq(5).find("input[type='text']").attr("name",'receiverAddersEntityList['+index+'].receiverAddress');
                            });
                        }
            
                        function getFormData($form) {
                            var unindexed_array = $form.serializeArray();
                            var indexed_array = {};
                            var add_array = [],add_obj = {}, receiverAddersEntityList = [];
                            $.map(unindexed_array, function (n, i) {
                                if(n['name'].indexOf('receiverAddersEntityList') === 0){
                                        return add_array.push(n['value']);
                                }else{
                                    indexed_array[n['name']] = n['value'];
                                }
                            });
                            add_array.forEach(function(e,i){
                                if(((i+1)%5) == 0){
                                    console.log(i);                                    
                                    console.log(e);
                                    add_obj.receiverName = add_array[i-4];
                                    add_obj.receiverTelephone = add_array[i-3];
                                    add_obj.receiverCompany = add_array[i-2];
                                    add_obj.receiverPostcode = add_array[i-1];
                                    add_obj.receiverAddress = add_array[i];
                                    add_obj.isDefault = 0;
                                    receiverAddersEntityList.push(add_obj);
                                    add_obj = {};
                                }
                            });
                            console.log(unindexed_array);
                            var isDefault = indexed_array.isDefault;
                            if(isDefault != undefined && isDefault != null){
                                console.log(isDefault)
                                receiverAddersEntityList[isDefault].isDefault = 1;
                            }
                            console.log(receiverAddersEntityList);
                            //var receiverAddersEntityList = handleAddersData(add);
                            //console.log(receiverAddersEntityList);
                            indexed_array.receiverAddersEntityList = receiverAddersEntityList;
                            return indexed_array;
                        }

                       
                    });


                }
            });
        },

    };

    $('.layui-btn').on('click',function () {
        var type = $(this).data('type');
        active[type] && active[type].call(this);
    })


    exports('sys_coustomer', {})
});