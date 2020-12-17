layui.define(['admin', 'table','element','form', 'edit_customer_info'], function(exports){
    var table = layui.table,
    $ = layui.jquery,
    element = layui.element,
    admin = layui.admin,
    form = layui.form,
    edit_customer_info = layui.edit_customer_info,
    view = layui.view,
    setter = layui.setter;
    
    form.render(null,'customer-info-formlist');
    table.render({
        elem: '#customer_listTab'
        ,url: setter.baseUrl+'sys/consumer/user/list'

        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
             {field:'id', title: 'id', sort: true, width: 80}
            ,{field:'status', title: '状态', width: 130, templet:'#customerStatus'}
            ,{field:'userSystemId', title: '客户代码', sort: true, width: 130}
            ,{field:'businessName', title: '跟单员',width: 100}
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
            ,{fixed: 'right',align:'center',toolbar:'#role-table-operate-barDemo',title:'操作',width:250}
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

     //监听搜索
    form.on('submit(LAY-app-constomer-info-search)', function(data){
        var field = data.field;
        
        //执行重载
        table.reload('customer_listTab', {
        where: field
        });
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
                url: setter.baseUrl+'sys/receiveradders/queryReceiverAddersByUid',
                success:function(ret){
                    // console.log(ret);
                    data.receiverAddersEntityList = ret.data;
                    admin.popup({
                        title:'编辑客户',
                        area:['80%', '100%'],
                        id:'LAY-popup-customer-edit',
                        btn:['提交','取消'],
                        yes:function(index, layero){
                            $("#layuiadmin-app-form-submit").click();
                        },
                        success:function(layero,index){
                            view(this.id).render('/infoManagement/iframeWindow/customer_edit_info',data)
                            .then(function(value){
                                //视图文件请求完毕，视图内容渲染前的回调
                            }).done(function(){
                                form.render(null,'customer-add-edit-form-list');
                        
                                form.on('submit(customer-edit-info-form-submit)',function(formdata){
                                    // console.log(formdata);
                                    // console.log(formdata.field)
                                    //获取table数据
                                    let addressList = table.cache["sys-customer-address-list-table"],field = formdata.field;
                                    for (let i = 0; i <addressList.length ; i++) {
                                        if(addressList[i].LAY_CHECKED){
                                            addressList[i].isDefault = 1;
                                        }else{
                                            addressList[i].isDefault = 0;
                                        }
                                    }

                                    field.receiverAddersEntityList = addressList;
                                    //处理删除id
                                    if(field.delIdArr !== undefined && field.delIdArr !== ""){
                                        field.addDelIdList = field.delIdArr.split(",");
                                    }else{
                                        field.addDelIdList = [];
                                    }
                                    // console.log(addressList);
                                    console.log(field)
                                    //处理下默认地址数据
                                    let loadindex = layer.load(1, {shade: [0.1,'#fff']}); 
                                    admin.req({
                                        url: setter.baseUrl+'sys/consumer/user/update',
                                        type:'POST',
                                        dataType:'json',
                                        contentType:'application/json',
                                        data: JSON.stringify(field),
                                        success:function(data){
                                            layer.close(loadindex);
                                            if(data.code === 0){
                                                layer.msg('修改成功!');
                                                // console.log(data);
                                                layui.table.reload('customer_listTab'); //重载表格
                                                layer.close(index); //执行关闭 
                                            }
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

    function listonCheckbox(){
        var r = {}
         //监听提交
         let productionVerification = 1;
         form.on('switch(productionVerification)', function (data) {
             if (data.elem.checked == true) {
                 layer.msg('需要确定生产资料');
                 productionVerification = 0;
             }  else {
                 layer.msg('不需要确定生产资料');
                 productionVerification = 1;
             }
         });
         r.productionVerification = productionVerification;
         let invalidMark = 0;
         form.on('switch(optionUser)',function (data) {
             if (data.elem.checked == true){
                 layer.msg('已启用');
                 invalidMark =0;
             } else {
                 layer.msg('停用');
                 invalidMark =1;
             }
         });
         r.invalidMark = invalidMark;
         let userType = 0;
         form.on('switch(isneibuUser)',function (data) {
             if (data.elem.checked == true){
                 layer.msg('内部用户');
                 userType =1;
             } else {
                 layer.msg('客户系统用户');
                 userType =0;
             }
         });
         r.userType = userType;
         let auditMark = 0;
         form.on('switch(isAuditMark)',function(data){
             if (data.elem.checked == true) {
                 layer.msg('需要审核');
                 auditMark = 0;
             }else{
                 layer.msg('不需审核');
                 auditMark = 1;
             }
         });
         r.auditMark = auditMark;
         let deliveryReport = 0;
         form.on('switch(deliveryReport)',function (data) {
             if (data.elem.checked == true){
                 layer.msg('需要出货报告');
                 deliveryReport =1;
             } else {
                 layer.msg('不需要出货报告');
                 deliveryReport =0;
             }
         });
         r.deliveryReport = deliveryReport;

         let isSourceCompany = 0;
         form.on('switch(isSourceCompany)',function(data){
             if (data.elem.checked == true) {
                 layer.msg('来自公司');
                 isSourceCompany = 1;
             }else{
                 layer.msg('不来自公司');
                 isSourceCompany = 0;
             }
         });
         r.isSourceCompany = isSourceCompany;
         
         function f2(){
            console.log(r);
            return r;
         }
         return f2;
    }

    var active = {
        customerInfo_add:function(){
            admin.popup({
                // id: 'layer-customer-info-add-form',
                id:'LAY-popup-customer-add',
                title: '客户新增',
                // shadeClose: true,
                // shade: false,
                // maxmin: false, //开启最大化最小化按钮
                area:['80%', '100%'],
                // content:'<div class="layui-row" id="customer_edit_info"></div>',
                btn:['确定','取消'],
                yes: function(index, layero) {
                    $('#layuiadmin-app-form-submit').click();
                },
                success: function (layero,index) {
                    view(this.id).render('/infoManagement/iframeWindow/customer_edit_info')
                    .then(function (value) {
                        //视图文件请求完毕，视图内容渲染前的回调
                        console.log(value);
                    }).done(function(){
                        form.render(null, 'customer-add-edit-form-list');

                        form.on('submit(customer-edit-info-form-submit)',function(data){
                            let addressList = table.cache["sys-customer-address-list-table"],field = data.field;
                            for (let i = 0; i <addressList.length ; i++) {
                                if(addressList[i].LAY_CHECKED){
                                    addressList[i].isDefault = 1;
                                }else{
                                    addressList[i].isDefault = 0;
                                }
                            }
                            field.receiverAddersEntityList = addressList; 
                            console.log(field);
                            let loadindex = layer.load(1, {shade: [0.1,'#fff']}); 
                            admin.req({
                                url: setter.baseUrl+'sys/consumer/user/save',
                                type:'POST',
                                dataType:'json',
                                contentType:'application/json',
                                data: JSON.stringify(field),
                                success:function(data){
                                    layer.close(loadindex);
                                    // console.log(data);
                                    layer.msg('添加成功!'); 
                                    layui.table.reload('customer_listTab'); //重载表格
                                    layer.close(index); //执行关闭 
                                }
                            })
            
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


    exports('sys_coustomer', {})
});