/**

 @Name： 市场管理－－［订单评审］

 */


layui.define(['admin', 'table', 'index','element','form'], function(exports){
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,element = layui.element;
    var $ = layui.jquery;

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    table.render({
        elem: '#or_Tabpcb'
        ,url: setter.baseUrl+'/market/quote/audit/list'
        ,cellMinWidth: 80
        ,id:"or_Tabpcb"
        ,page: true
        ,toolbar: true
         ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
            }
        }
        ,where: {
            access_token: layui.data('layuiAdmin').access_token
        }
        ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field:'status', title: '状态',hide: false,align:'center'}
            ,{field:'orderId', title: 'Order ID',width: 110,align:'center'}
            ,{field:'orderType', title: 'Order Type',width: 180,align:'center'}
            ,{field:'type', title: 'Type', width: 120,templet: '#type',align:'center'}
            ,{field:'gmtCreate', title: 'Order Time', width: 120,align:'center'}
            ,{field:'gerberName', title: 'File Name', width: 120,align:'center'}
            ,{field:'phone', title: 'P/N', align: 'center', width: 120,align:'center'}
            ,{field:'email', title: 'Unit Price', width:200,align:'center'}
            ,{field:'paymentType', title: 'Quantity', templet:'#paymentType',align:'center'}
            ,{field:'taxe', title: 'Total Prices', templet:'#taxe',align:'center'}
            ,{field:'invoiceType', title: 'Shipping Time', templet:'#invoiceType',align:'center'}
            ,{field:'weight', title: 'Weight', templet: '#strengths',width: 110,align:'center'}
            ,{field:'evaluateDdelivery', title: 'PCB Size', templet: '#evaluateDdelivery',align:'center'}
            ,{field:'', title: 'Panel Way', templet: '#panelWay',align:'center'}
            ,{field:'panelWayX', title: 'panelWayX',align:'center',hide: false}
            ,{field:'panelWayY', title: 'panelWayY',align:'center',hide: false}
            ,{field:'areaSq', title: 'Area Sq(m²)', templet: '#evaluateCompatibility',align:'center'}
            ,{field:'pcbType', title: 'PCB Type', templet: '#evaluateRate',align:'center'}
            ,{field:'layerNum', title: 'Layer',align:'center'}
            ,{field:'createTime', title: 'panel',align:'center'}
            ,{field:'updateUserId', title: 'Stack up',align:'center'}
            ,{field:'updateTime', title: 'Finish THK',align:'center'}
            ,{field:'material', title: 'Material',align:'center'}
            ,{field:'productCode', title: 'Product Code',align:'center'}
            ,{field:'tg', title: 'TG',align:'center'}
            ,{field:'cti', title: 'CTI',align:'center'}
            ,{field:'halogenFree', title: 'Halogen-free',align:'center'}
            ,{field:'heatConductivity', title: 'Heat Conductivity',align:'center'}
            ,{field:'innerLayerCopper', title: 'Inner layer copper',align:'center'}
            ,{field:'innerMinTrack', title: 'Inner Min Track',align:'center'}
            ,{field:'innerMinSpacing', title: 'Inner Min Spacing',align:'center'}
            ,{field:'nofCore', title: 'N. of Core',align:'center'}
            ,{field:'nofPp', title: 'N. of PP',align:'center'}
            ,{field:'outerLayerCopper', title: 'Outer Layer Copper',align:'center'}
            ,{field:'outerMinTrack', title: 'Outer Min Track',align:'center'}
            ,{field:'innerMinSpacing', title: 'Outer Spacing',align:'center'}
            ,{field:'bgaSize', title: 'BGA Size',align:'center'}
            ,{field:'nofHoles', title: 'N. of Holes',align:'center'}
            ,{field:'pthCopper', title: 'PTH Copper',align:'center'}
            ,{field:'solderMaskTopColor', title: 'Solder Mask Color',align:'center'}
            ,{field:'viaProcess', title: 'VIA Process',align:'center'}
            ,{field:'remark', title: 'Silkscreen Color',align:'center'}
            ,{field:'peelable', title: 'Peelable',align:'center'}
            ,{field:'peelableBrand', title: 'Peelable Brand',align:'center'}
            ,{field:'surfaceFinish', title: 'Surface Finish',align:'center'}
            ,{field:'remark', title: 'Gold Thickness',align:'center'}
            ,{field:'remark', title: 'Gold Area',align:'center'}
            ,{field:'gerberPath', title: 'CNC Path',align:'center'}
            ,{field:'punchingSlots', title: 'Punching',align:'center'}
            ,{field:'testPointType', title: 'Test Type',align:'center'}
            ,{field:'blindHoles', title: 'Blind Holes',align:'center'}
            ,{field:'edgePlated', title: 'Edge Plated',align:'center'}
            ,{field:'halfHoleLated', title: 'Half Hole Plated',align:'center'}
            ,{field:'contrlImpeance', title: 'Contrl Impeance',align:'center'}
            ,{field:'buriedHoles', title: 'Buried Holes',align:'center'}
            ,{field:'carbon', title: 'Carbon',align:'center'}
            ,{field:'bevellingCamfer', title: 'Bevelling',align:'center'}
            ,{field:'deepMillRouting', title: 'Deep Mill Routing',align:'center'}
            ,{field:'remark', title: 'Remark',align:'center'}
            ,{title: '操作', width: 160, align:'center', fixed: 'right', toolbar: '#Tabtb-orpcb'}
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

    };

    $('.layui-btn').on('click',function () {
        var type = $(this).data('type');
        active[type] && active[type].call(this);
    });

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ g订单

    //手机端
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
        // $("#orderReview_searll").css({"display":""});
        // $("#orderReview_pcsear").css({"display":"none"});
        //监听select并给input name赋值
        form.on('select(orderReview-search-select)',function (data){
            var selValue = data.value;
            var index = data.elem.selectedIndex;
            var text = data.elem.options[index].text; // 选中文本
            var Domobj = $("#orderReview_sinp");
            if (selValue != null || selValue != ""){
                Domobj.attr({"placeholder":text});
                $("input[id='orderReview_sinp']").attr("name",selValue)
            } else {
                Domobj.attr("placeholder","请选取搜索条件");
            }
        });
    }

    exports('market_orderReview', {})
});