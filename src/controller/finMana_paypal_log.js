/**

 @Name:    财务管理  - paypal到账记录

 */


layui.define(['admin','table','index','element','form','laydate'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        // ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element
        ,$ = layui.jquery;


    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    table.render({
        elem: '#finManaPaypalLog_tabPcb'
        ,url: setter.baseUrl+'paypal/paylog/list'
        ,toolbar: "#finManaPaypalLog_toolbar"
        ,cellMinWidth: 80
        ,id: "finManaPaypalLog_tabPcb"
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            // {type:'checkbox'}
            //{field: 'productNo',title: '内部型号', width: 115, templet: '<div>{{ d.status == 4 ? "待确认交期" : "" }}</div>'}      // 1 ＝ 待报价
            {field: 'id', title: 'id', width: 124, sort: true}
            ,{field: 'txnId',title: '交易id', width: 180, sort: true}
            ,{field: 'businessName',title: '跟单员名', width: 150, sort: true}
            ,{field: 'paymentDate',title: '付款时间', width: 210, sort: true}
            ,{field: 'payerEmail', title: '付款人email', width: 250, sort: true}
            ,{field: 'firstName', title: '付款人姓', width: 117, sort: true}
            ,{field: 'lastName', title: '付款人名', width: 144, sort: true}
            ,{field: 'currency',title:'币种',width:100, sort: true}
            ,{field: 'mcGross', title: '交易金额', width: 144, sort: true}
            ,{field: 'paymentFee', title: 'payPal 手续费', width: 144, sort: true}
            ,{field: 'totalNet', title: '总净额', width: 144, sort: true}
            ,{field: 'custom',title:'绑定信息',width:250, sort: true}
            ,{title: '操作', width: 260, align:'center', fixed: 'right', toolbar: '#finManaPaypalLog_tbar'}
        ]]
        ,done: function (res, curr, count) {

        }
    });

    // 监听stencil表格工具条
    table.on('tool(finManaPaypalLog_tabPcb)',function (obj) {
        var d = obj.data;
        console.log(d);
        if (obj.event === 'paypal_binding_order'){
            admin.popup({
                title: '绑定订单信息'
                ,shadeClose: true
                ,shade: false
                ,maxmin: true
                ,btn:['提交', '取消']
                ,yes: function () {
                    $("#paypalLogBindingOrderSubmit").click();
                }
                ,area: ['766px', '510px']
                ,success: function (layero,index) {
                    view(this.id).render('/finManagement/paypal_binding_order').done(function () {
                        form.render(null,'paypal_log_binding_order_form');
                        form.on('submit(LAY-paypal-log-binding-order-submit)',function (data) {
                            var field = data.field;
                            field.id = d.id;
                            field.payTime = d.paymentDate;
                            console.log(field);
                            admin.req({
                                type: 'post'
                                ,url: setter.baseUrl+'paypal/paylog/bindingOrder'
                                ,data: field
                                ,done: function (res) {
                                    console.log(res);
                                    layer.msg('绑定成功');
                                    layui.table.reload('finManaPaypalLog_tabPcb'); //重载表格
                                }
                                ,fail: function (res) {
                                    layer.msg("绑定失败");
                                },
                            });
                            layer.close(index); //执行关闭
                            return false;
                        })
                    })
                }
            })
        }else if (obj.event === 'paypal_update') {
            admin.popup({
                title: '修改支付记录'
                ,shadeClose: true
                ,shade: false
                ,maxmin: true
                ,area: ['55%', '75%']
                ,btn:['立即提交', '取消']
                ,yes: function () {
                    $("#paypalLogSubmit").click();
                }
                ,id: 'fin_paypal_add'
                ,success: function(layero, index){
                    view(this.id).render('/finManagement/paypal_add_edit',d).done(function(){
                        form.render(null, 'paypal_log_add_edit_form');
                        //监听提交
                        form.on('submit(LAY-paypal-log-submit)', function(data){
                            var field = data.field; //获取提交的字段
                            field.id = d.id;
                            // layer.alert(JSON.stringify(data.field));
                            admin.req({
                                type:'post',
                                url: setter.baseUrl+'paypal/paylog/update' //实际使用请改成服务端真实接口
                                ,data: field
                                ,done: function(res){
                                    // console.log(res);
                                    layer.msg('修改成功');
                                    layui.table.reload('finManaPaypalLog_tabPcb'); //重载表格
                                }
                                ,fail: function (res) {
                                    layer.msg('修改失败');
                                },
                            });
                            layer.close(index); //执行关闭
                            return false;
                        });
                    });
                }
            });
        } else if (obj.event === 'paypal_memo') {
            layer.msg('付款水单');
            admin.popup({
                title: '付款水单'
                ,shadeClose: true
                ,shade: false
                ,maxmin: true
                ,area: ['55%', '75%']
                ,btn:['确定', '取消']
                ,id: 'popupPayPalMemo'
                ,success: function () {
                    view(this.id).render('/finManagement/iframeWindow/paypal_memo', d).done(function () {

                    });
                }
            })
        }
    });

    table.on('toolbar(finManaPaypalLog_tabPcb)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        if (obj.event === 'evPaypalAdd') {
            admin.popup({
                title: '添加支付记录'
                ,shadeClose: true
                ,shade: false
                ,maxmin: true
                ,area: ['55%', '75%']
                ,btn:['立即提交', '取消']
                ,yes: function () {
                    $("#paypalLogSubmit").click();
                }
                ,id: 'fin_paypal_add'
                ,success: function(layero, index){
                    view(this.id).render('/finManagement/paypal_add_edit').done(function(){
                        form.render(null, 'paypal_log_add_edit_form');
                        //监听提交
                        form.on('submit(LAY-paypal-log-submit)', function(data){
                            var field = data.field; //获取提交的字段
                            // layer.alert(JSON.stringify(data.field));
                            admin.req({
                                type:'post',
                                url: setter.baseUrl+'paypal/paylog/save' //实际使用请改成服务端真实接口
                                ,data: field
                                ,done: function(res){
                                    // console.log(res);
                                    layer.msg('添加成功');
                                    layui.table.reload('finManaPaypalLog_tabPcb'); //重载表格
                                }
                                ,fail: function (res) {
                                    layer.msg('添加失败');
                                },
                            });
                            layer.close(index); //执行关闭
                            return false;
                        });
                    });
                }
            });
        }
    });


    //监听搜索
    form.on('submit(paypalLog-search)', function(data){
        var field = data.field;
        //执行重载
        table.reload('finManaPaypalLog_tabPcb', {
            where: field
        });
    });
    $(".paypal-form-search input").bind("input propertychange", function (even) {
        $("*[lay-filter='paypalLog-search']").click();
    })

    $('.layui-btn').on('click',function () {
        var type = $(this).data('type');
        active[type] && active[type].call(this);
    })

    exports('finMana_paypal_log', {});
});