/**

 @Name： 市场管理－－［订单评审］

 */


layui.define(['admin', 'table', 'index','element','form','laydate', 'jsTools'], function(exports){
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element;
        var $ = layui.jquery;
        var jstools = layui.jsTools;

    // 全局变量
    var defVal = {
        orderType: 0,   //订单类型
        canOpenView: false //是否可以打开合同弹出页
    };
    laydate.render({
        elem: '#gmtCreate'
    });


//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单-网上待支付
    table.render({
        elem: '#or_Tabpcb_no_payment'
        ,url: setter.baseUrl+'market/quote/noPaymentList'
        ,toolbar: '#noPaymentToolbar'
        ,cellMinWidth: 80
        ,id:"or_Tabpcb_no_payment"
        ,page: true
         ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
            }
        }
        ,cols: [[
             {type:'checkbox', fixed: 'left'}
            ,{field:'id', title: 'ID',hide: true}
            ,{field:'productNo',fixed: 'left', title: '内部型号', align:'center', width: 114, sort: true}
            ,{field:'status', title: '状态', hide: false, align:'center',templet: '#pcbor_status',width: 150, sort: true}
            ,{field: '', title:'文件名', toolbar: '#pcb-file', align:'center', sort: true}
            ,{field:'gerberName', title: 'Gerber Name', align:'center', width: 254, sort: true}
            ,{field:'pcbType', title: '订单类型', align:'center', width: 114, sort: true}
            ,{field:'layerNum', title: '层数', align:'center', width: 114, sort: true}
            ,{field:'finishThickness', title: '完成板厚', align:'center', width: 134, sort: true}
            ,{field:'quantityPcs', title: 'Pcs数', align:'center', width: 114, sort: true}
            ,{field:'areaSq', title: '面积', align:'center', width: 110, sort: true}
            ,{field:'boardFee', title: '板费', align:'center', width: 114, sort: true}
            ,{field:'gmtCreate', title: '创建时间', align:'center', width: 165, sort: true}
            ,{field:'userId', title: 'User ID',width: 80,hide: true, sort: true}
            ,{field:'orderId', title: 'Order ID', align:'center',width: 96,hide: true}
            ,{field:'orderType', title: 'Order Type', align:'center', width: 109,hide: true}
            ,{field:'dimensionsX', title: 'DimensionsX',templet: '#type', align:'center', width: 114,hide: true}
            ,{field:'dimensionsY', title: 'DimensionsY', align:'center', width: 114,hide: true}
            ,{field:'panelSizeX', title: 'PanelSizeX', align:'center', width: 114,hide: true}
            ,{field:'panelSizeX', title: 'PanelSizeY', align: 'center',align:'center', width: 114,hide: true}
            ,{field:'panelWayX', title: 'PanelWayX', align:'center', width: 114,hide: true}
            ,{field:'panelWayY', title: 'PanelWayY', align:'center', width: 114,hide: true}
            ,{field:'quantityPanel', title: 'Quantity Panel', align:'center', width: 124,hide: true}
            ,{field:'tg', title: 'TG', align:'center', width: 80,hide: true}
            ,{field:'material', title: 'Material', align:'center', width: 110,hide: true}
            ,{field:'cti', title: 'CTI', align:'center', width: 114,hide: true}
            ,{field:'productCode', title: 'Product Code', align:'center', width: 124,hide: true}
            ,{field:'halogenFree', title: 'Halogen Free', align:'center', width: 114,hide: true}
            ,{field:'heatConductivity', title: 'Heat Conductivity', align:'center', width: 150,hide: true}
            ,{field:'innerLayerCopper', title: 'InnerLayer Copper', align:'center', width: 150,hide: true}
            ,{field:'stackUp', title: 'Stack Up', align:'center', width: 95,hide: true}
            ,{field:'innerMinTrack', title: 'InnerMin Track', align:'center', width: 134,hide: true}
            ,{field:'innerMinSpacing', title: 'InnerMin Spacing', align:'center', width: 134,hide: true}
            ,{field:'outerLayerCopper', title: 'Outer Layer Copper', align:'center', width: 134,hide: true}
            ,{field:'outerMinTrack', title: 'outerMinTrack', align:'center', width: 124,hide: true}
            ,{field:'bgaSize', title: 'bgaSize', align:'center', width: 90,hide: true}
            ,{field:'outerMinSpacing', title: 'outerMinSpacing', align:'center', width: 134,hide: true}
            ,{field:'minHoleSize', title: 'minHoleSize', align:'center', width: 124,hide: true}
            ,{field:'pthCopper', title: 'pthCopper', align:'center', width: 114,hide: true}
            ,{field:'solderMaskTopColor', title: 'solderMaskTopColor', align:'center', width: 134,hide: true}
            ,{field:'viaProcess', title: 'viaProcess', align:'center', width: 124,hide: true}
            ,{field:'solderMaskBotColor', title: 'SolderMaskBotColor', align:'center', width: 134,hide: true}
            ,{field:'silkScreenTopColor', title: 'SilkScreenTopColor', align:'center', width: 134,hide: true}
            ,{field:'silkScreenBotColor', title: 'silkScreenBotColor', align:'center', width: 134,hide: true}
            ,{field:'peelable', title: 'Peelable', align:'center', width: 85,hide: true}
            ,{field:'peelableBrand', title: 'PeelableBrand', align:'center', width: 118,hide: true}
            ,{field:'surfaceFinish', title: 'SurfaceFinish', align:'center', width: 114,hide: true}
            ,{field:'thickness', title: 'Thickness', align:'center', width: 96,hide: true}
            ,{field:'surfaceArea', title: 'SurfaceArea', align:'center', width: 114,hide: true}
            ,{field:'panelRoutingPath', title: 'PanelRoutingPath', align:'center', width: 124,hide: true}
            ,{field:'punchingHoles', title: 'PunchingHoles', align:'center', width: 124,hide: true}
            ,{field:'punchingSlots', title: 'PunchingSlots', align:'center', width: 124,hide: true}
            ,{field:'testPoint', title: 'TestPoint', align:'center', width: 114,hide: true}
            ,{field:'testPointType', title: 'TestPointType', align:'center', width: 124,hide: true}
            ,{field:'testPoinType', title: 'TestPoinType', align:'center', width: 114,hide: true}
            ,{field:'testCost', title: 'TestCost', align:'center', width: 90,hide: true}
            ,{field:'blindHoles', title: 'BlindHoles', align:'center', width: 92,hide: true}
            ,{field:'edgePlated', title: 'EdgePlated', align:'center', width: 100,hide: true}
            ,{field:'halfHoleLated', title: 'HalfHoleLated', align:'center', width: 114,hide: true}
            ,{field:'contrlImpeance', title: 'ContrlImpeance', align:'center', width: 114,hide: true}
            ,{field:'buriedHoles', title: 'BuriedHoles', align:'center', width: 114,hide: true}
            ,{field:'carbon', title: 'Carbon', align:'center', width: 80,hide: true}
            ,{field:'bevellingCamfer', title: 'BevellingCamfer', align:'center', width: 134,hide: true}
            ,{field:'deepMillRouting', title: 'deepMillRouting', align:'center', width: 134,hide: true}
            ,{field:'gerberPath', title: 'gerberPath', align:'center', hide: true, width: 114,hide: true}
            ,{field:'remark', title: 'Remark', align:'center', width: 80,hide: true}
            ,{field:'differentDesign', title: 'DifferentDesign', align:'center', width: 134,hide: true}
            ,{field:'gmtModified', title: 'gmtModified', align:'center', width: 114,hide: true}
            ,{field:'uuid', title: 'UuId', align:'center', width: 80,hide: true}
            ,{field:'stencilFee', title: 'StencilFee', align:'center', width: 114,hide: true}
            ,{field:'overworkFee', title: 'OverworkFee', align:'center', width: 114,hide: true}
            ,{field:'buildTime', title: 'BuildTime', align:'center', width: 114,hide: true}
            ,{field:'isExistSmt', title: 'IsExistSmt', align:'center', width: 114,hide: true}
            ,{field:'weight', title: 'Weight', align:'center', width: 80,hide: true}
            ,{field:'nofCore', title: 'NofCore', align:'center', width: 80,hide: true}
            ,{field:'nofPp', title: 'NofPp', align:'center', width: 80,hide: true}
            ,{field:'nofHoles', title: 'NofHoles', align:'center', width: 90,hide: true}
            ,{title: '操作', width: 200, align:'center', fixed: 'right', toolbar: '#Tabtb-pcb-market-noPayment-option'}
        ]]
        ,done : function (res, curr, count) {
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

    //监听工具条
    table.on('tool(or_Tabpcb_no_payment)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            admin.popup({
                title: '订单id:［'+ data.id + '］-----------'+'订单时间：［'+data.gmtCreate+'］'
                ,area: ['100%', '100%']
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/order_pcb_detail', data).done(function () {

                    })
                }
            })
        } else if(obj.event === 'del'){
            layer.confirm('真的删除订单号为［'+data.productNo+'］吗', function(index){

                admin.req({
                    type: 'post',
                    url: setter.baseUrl+'/market/quote/audit/delete'
                    ,data:{"ids":data.id}
                    ,done: function (res) {
                        layer.msg('删除成功')
                        obj.del();
                    }
                    ,fail: function (res) {
                        layer.msg('服务器异常，稍后再试！');
                    }
                })
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            admin.popup({
                title: '编辑PCB订单信息'
                ,area: ['45%', '561px']
                ,btn:['立即提交', '取消']
                ,yes: function () {
                    $(".submit-ok").click();
                }
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderPCB_update', data).done(function () {
                        form.render(null, '')
                        form.on('submit(LAY-pcborder-update-submit)',function (data) {
                            var field = data.field;
                            if (field.remark == "" || field.remark == "null") {
                                field.remark = " ";
                            }
                            admin.req({
                                type: 'post'
                                ,url: setter.baseUrl+'/market/quote/audit/update'
                                ,data: field
                                ,done: function (res) {
                                    layer.msg('订单信息修改成功');
                                    layui.table.reload('or_Tabpcb_no_payment');
                                }
                                ,fail: function (res) {
                                    layer.msg("订单信息修改失败，请稍后再试！");
                                },
                            });
                            layer.close(index);
                            return false;
                        })
                    })
                }
            })
        } else if (obj.event === 'pcb-submit') {
            layer.confirm('确定提交订单［'+data.productNo+'］?',function (index) {
                data.status = 2;
                admin.req({
                    type: 'post'
                    ,url: setter.baseUrl+'/market/quote/audit/update'
                    ,data: {"id":data.id,"status":data.status}
                    ,done: function () {
                        layer.msg('订单［'+data.productNo+'］提交成功！');
                    }
                    ,fail: function () {
                        layer.msg('订单［'+data.productNo+'］提交失败，请重试！！！');
                    }
                })
                layui.table.reload('or_Tabpcb_no_payment');
                layer.close(index);
            })
        } else if (obj.event === 'pcb-sendback') {
            layer.confirm('确定退回订单［'+data.productNo+'］?',function (index) {
                layer.msg('退回'+data.productNo);
                layui.table.reload('or_Tabpcb_no_payment');
                layer.close(index);
            })
        }
    });

    // 监听头部工具
    table.on('toolbar(or_Tabpcb_no_payment)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        if (checkStatus.data.length < 1) {
            layer.msg('请选择一条数据');
            return false;
        }
        if (obj.event == 'noPaymentToolbar-lookOrder') {
            openPopup(data, 1);
        }
    });

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 钢网订单-网上待支付
    table.render({
        elem: '#stencil_orderTab_no_payment'
        ,id: "stencil_orderTab_no_payment"
        ,url: setter.baseUrl+'market/stencil/noPayment/list'
        ,page: true
        ,toolbar: '#noPaymentToolbar'
        ,done: function () {
            $(window).resize();
            $('.layui-table-fixed-r').removeClass('layui-hide');
        }
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,where: {
            access_token: layui.data('layuiAdmin').access_token,
        }
        ,cols: [[
             {type:'checkbox', fixed: 'left'}
            ,{field: 'productNo', title: 'Product No', align:'center', width: 134, sort: true, fixed: 'left'}
            ,{field: 'id', title: 'ID', hide: true, sort: true}
            ,{field: 'status', fixed: 'left' , title: '状态', align:'center', width: 100, templet: '#stencil-status', sort: true}
            ,{field: '', title:'File', templet: '#stencil-file', align:'center', sort: true}
            ,{field: 'gerberName', title: 'gerberName', align:'center', width: 224, sort: true}
            ,{field: 'totalStencilFee', title: 'TotalStencilFee($)', align:'center', width: 144, sort: true}
            ,{field: 'stencilType', title: 'Stencil Type', align:'center', width: 124, sort: true}
            ,{field: 'stencilSide', title: 'Stencil Side', align:'center', width: 124, sort: true}
            ,{field: 'quantity', title: 'Quantity', align:'center', width: 114, sort: true}
            ,{field: 'size', title: 'Size', align:'center', width: 80, sort: true}
            ,{field: 'gmtCreate', title: 'gmtCreate', align:'center', width: 165, sort: true}
            ,{field: 'quoteId', title: 'Quote ID', align:'center', width: 114, hide: true}
            ,{field: 'thickness', title: 'Thickness', align:'center', width: 114, hide: true}
            ,{field: 'existingFiducials', title: 'Existing Fiducials', align:'center', width: 145, hide: true}
            ,{field: 'stencilSizeX', title: 'stencilSizeX', align:'center', width: 124, hide: true}
            ,{field: 'stencilSizeY', title: 'stencilSizeY', align:'center', width: 124, hide: true}
            ,{field: 'stencilAreaX', title: 'stencilSizeY', align:'center', width: 124, hide: true}
            ,{field: 'stencilAreaY', title: 'stencilSizeY', align:'center', width: 124, hide: true}
            ,{field: 'userId', title: 'User ID', align:'center', width: 100, hide: true}
            ,{field: 'gmtModified', title: 'gmtModified', hide: true, width: 124}
            ,{field: 'weight', title: 'Weight', align:'center', width: 85, sort: true}
            ,{field: 'gerberPath', title: 'gerberPath', hide: true, width: 124}
            ,{field: 'note', title: 'Note', align:'center', width: 80, hide: true, sort: true}
            ,{title: '操作', fixed: 'right', align:'center', toolbar: '#Tabtb-stencil-market-noPayment-option', width: 260}
        ]]
    })
    // 监听stencil表格工具条
    table.on('tool(stencil_orderTab_no_payment)',function (obj) {
        var data = obj.data;
        if (obj.event === 'detail'){
            admin.popup({
                title: '订单号［'+data.productNo+']---'+'订单时间［'+data.gmtCreate+'］'
                ,area: ['45%', '70%']
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/order_stencil_detail', data).done(function () {
                    })
                }

            })
        } else if (obj.event === 'edit') {
            admin.popup({
                title: '编辑：订单号［'+data.productNo+']'
                ,area: ['45%', '70%']
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderStencil_update', data).done(function () {
                        form.render()
                        form.on('submit(LAY-stencilorder-update-submit)',function (data) {
                            var field = data.field;
                            console.log("提交的字段信息："+JSON.stringify(field));
                            admin.req({
                                type: 'post'
                                ,url: setter.baseUrl+'/market/stencil/audit/update'
                                ,data: field
                                ,done: function (res) {
                                    layer.msg('订单信息修改成功');
                                    layui.table.reload('stencil_orderTab_no_payment');
                                }
                                ,fail: function (res) {
                                    layer.msg("订单信息修改失败，请稍后再试！");
                                },
                            });
                            layer.closeAll();
                            return false;
                        })
                    })
                }
            })
        } else if (obj.event === 'del') {
            layer.confirm('真的删除订单号为［'+data.productNo+'］吗', function(index){
                console.log(111);
               admin.req({
                   type: 'post'
                   ,url: setter.baseUrl+'market/stencil/audit/delete'
                   ,data: {"ids":data.id}
                   ,done: function (res) {
                       layer.msg('删除成功')
                       obj.del();
                   }
                   ,fail: function (res) {
                       layer.msg('服务器异常，稍后重试！');
                   }
               });
                layer.close(index);
            });
        } else if (obj.event === 'stencil-submit') {
            layer.confirm('确定提交订单［'+data.productNo+'］?',function (index) {
                data.status = 2;
                admin.req({
                    type: 'post'
                    ,url: setter.baseUrl+'market/stencil/audit/update'
                    ,data: {"id":data.id,"status":data.status}
                    ,done: function () {
                        layer.msg('订单［'+data.productNo+'］提交成功！');
                        console.log('提交的信息为'+JSON.stringify(data));
                    }
                    ,fail: function () {
                        layer.msg('订单［'+data.productNo+'］提交失败，请重试！！！');
                    }
                })
                layui.table.reload('stencil_orderTab_no_payment');
                layer.close(index);
            })
        } else if (obj.event === 'stencil-sendback') {
            layer.confirm('确定退回订单［'+data.productNo+'］?',function (index) {
                layer.msg('退回'+data.productNo);
                layui.table.reload('stencil_orderTab_no_payment');
                layer.close(index);
            })
        }
    })

    form.on('submit(LAY-app-noPayment-search)', function (data) {
        var field = data.field;
        var reTab;
        delete field.quiz;
        if (defVal.orderType === 0) {   // PCB
            reTab = 'or_Tabpcb_no_payment';
        } else if (defVal.orderType === 1) {    //  Stencil
            reTab = 'stencil_orderTab_no_payment';
        }
        table.reload(reTab,{
            where: field
        });
    });
    //监听select搜索
    form.on('select(no-payment-search-sel)', function (data) {
        $("*[lay-filter='LAY-app-noPayment-search']").click();
    });
    $(".no-payment-search input").bind("input propertychange", function (even) {
        $("*[lay-filter='LAY-app-noPayment-search']").click();
    })

    // 根据tab选项是否为pcb或者stencil监听表单，动态渲染表格
    element.on('tab(pcdorstencil_tab)', function (data) {
        defVal.orderType = data.index;
        var tabNum = data.index;
        form.on('submit(LAY-app-orderReview-search)', function (data) {
            var field = data.field;
            delete field.quiz;
            if (tabNum === 0) {
                layer.msg('PCBOrders');
                table.reload('or_Tabpcb',{
                    where: field
                });
            } else if (tabNum === 1){
                layer.msg('StencilOrders');
                table.reload('stencil_orderTab_no_payment',{
                    where: field
                });
            }
        });
    });

    // 监听头部工具
    table.on('toolbar(stencil_orderTab_no_payment)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        if (checkStatus.data.length < 1) {
            layer.msg('请选择一条数据');
            return false;
        }
        if (obj.event == 'noPaymentToolbar-lookOrder') {
            openPopup(data, 2);
        }
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－SMT订单-网上待支付
    table.render({
        elem: '#smt_orderTab_no_payment'
        ,id: "smt_orderTab_no_payment"
        ,url: setter.baseUrl+'market/assembly/listByStatus'
        ,page: true
        ,toolbar: '#noPaymentToolbar'
        ,done: function () {
            $(window).resize();
            $('.layui-table-fixed-r').removeClass('layui-hide');
        }
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,where: {
            status: 2
        }
        ,cols: [[
            {type:'checkbox', fixed: 'left'}
            ,{field: 'id', title: 'ID', hide: true, sort: true}
            ,{field: 'quoteId', title: 'ID', hide: true, sort: true}
            ,{field: 'productNo', title: 'Product No', align:'center', width: 134, sort: true}
            ,{field: 'status', fixed: 'left' , title: '状态', align:'center', width: 100, templet: '#Tabtb-smt-market-orderReview-status', sort: true}
            ,{field: '', title:'File', templet: '#stencil-file', align:'center', sort: true}
            ,{field: 'gerberName', title: 'gerberName', align:'center', width: 224, sort: true}
            ,{field: 'smtPartNum', title: 'SMT PartNum', align:'center', width: 124, sort: true}
            ,{field: 'throughHolePartNum', title: 'Through Hole PartNum', align:'center', width: 224, sort: true}
            ,{field: 'assemblySide', title: 'Assembly Side', align:'center', width: 165, sort: true}
            ,{field: 'invoiceNo', title: 'Invoice No', align:'center', width: 134, sort: true}
            ,{field: 'totalAssemblyFee', title: 'TotalAssemblyFee($)', align:'center', width: 144, sort: true}
            ,{field: 'assemblyType', title: 'Stencil Type', align:'center', width: 124, sort: true}
            ,{field: 'uniquePartNum', title: 'Unique PartNum', align:'center', width: 124, sort: true}
            ,{field: 'quantity', title: 'Quantity', align:'center', width: 114, sort: true}
            ,{field: 'gmtCreate', title: 'gmtCreate', align:'center', width: 165, sort: true}
            ,{field: 'orderId', title: 'Order ID', align:'center', width: 114, hide: true}
            ,{field: 'orderNo', title: 'Order No', align:'center', width: 114, hide: true}
            ,{field: 'isLock', title: 'Is Lock', align:'center', width: 114, hide: true}
            ,{field: 'userId', title: 'User ID', align:'center', width: 100, hide: true}
            ,{field: 'gmtModified', title: 'gmtModified',width: 124, sort: true}
            ,{field: 'gerberPath', title: 'gerberPath', hide: true, width: 124}
            ,{field: 'ordertime', title: 'Order Time', width: 124, sort: true}
            ,{field: 'remark', title: 'Remark', align:'center', width: 80, hide: true}
            ,{title: '操作', fixed: 'right', align:'center', toolbar: '#Tabtb-smt-market-noPayment-option', width: 260}
        ]]
    })
    // 监听SMT表格工具条
    table.on('tool(smt_orderTab_no_payment)',function (obj) {
        var data = obj.data;
        if (obj.event === 'detail'){
            admin.popup({
                title: '订单号［'+data.productNo+']---'+'订单时间［'+data.gmtCreate+'］'
                ,area: ['45%', '70%']
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/order_smt_detail', data).done(function () {
                    })
                }

            })
        } else if (obj.event === 'edit') {
            admin.popup({
                title: '编辑：订单号［'+data.productNo+']'
                ,area: ['45%', '70%']
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderSMT_update', data).done(function () {
                        form.render(null, '')
                        form.on('submit(LAY-smtorder-update-submit)',function (data) {
                            var field = data.field;
                            console.log("提交的字段信息："+JSON.stringify(field));
                            admin.req({
                                type: 'post'
                                ,url: setter.baseUrl+'market/assembly/update'
                                ,data: field
                                ,done: function (res) {
                                    layer.msg('订单信息修改成功');
                                    layui.table.reload('smt_orderTab_no_payment');
                                }
                                ,fail: function (res) {
                                    layer.msg("订单信息修改失败，请稍后再试！");
                                },
                            });
                            layer.close(index);
                            return false;
                        })
                    })
                }
            })
        } else if (obj.event === 'del') {
            layer.confirm('真的删除(SMT)订单号为［'+data.id+'］吗', function(index){

                admin.req({
                    type: 'post',
                    url: setter.baseUrl+'market/assembly/delete'
                    ,data:{"ids":data.id}
                    ,done: function (res) {
                        layer.msg('删除成功')
                        obj.del();
                    }
                    ,fail: function (res) {
                        layer.msg('服务器异常，稍后再试！');
                    }
                })
                layer.close(index);
            });
        } else if (obj.event === 'smt-submit') {
            layer.confirm('确定提交订单［'+data.productNo+'］?',function (index) {
                data.status = 2;
                admin.req({
                    type: 'post'
                    ,url: setter.baseUrl+'market/assembly/okPaymentList/submit'
                    ,data: {"id":data.id,"status":data.status}
                    ,done: function () {
                        layer.msg('订单［'+data.productNo+'］提交成功！');
                        console.log('提交的信息为'+JSON.stringify(data));
                    }
                    ,fail: function () {
                        layer.msg('订单［'+data.productNo+'］提交失败，请重试！！！');
                    }
                })
                layui.table.reload('smt_orderTab_no_payment');
                layer.close(index);
            })
        } else if (obj.event === 'stencil-sendback') {
            layer.confirm('确定退回订单［'+data.productNo+'］?',function (index) {
                layer.msg('退回'+data.productNo);
                layui.table.reload('smt_orderTab_no_payment');
                layer.close(index);
            })
        }
    })

    form.on('submit(LAY-app-orderReview-search)', function (data) {
        var field = data.field;
        delete field.quiz;
        table.reload('smt_orderTab_no_payment',{
            where: field
        });
    });

    // 打开订单详情
    function openPopup(obj, type) {
        var tabdata = {data:{}};
        tabdata.data = obj;
        tabdata.tabType = defVal.orderType;
        var productNo;
        var viewName;
        var contractType = 2;
        var contractTotal = 0;
        $.each(tabdata.data, function (idx, obj) {
            contractTotal = parseFloat(contractTotal+obj.subtotal);
            tabdata.total = contractTotal;
            tabdata.data[idx].totalFee = obj.subtotal;
            if (type === 2) {
                viewName = "marketManagement/iframeWindow/quote_contractS";
                contractType = 3;
                defVal.canOpenView = true;
            } else if (type === 1) {
                if (productNo == null || productNo == "") {
                    productNo = obj.productNo;
                    viewName = "marketManagement/iframeWindow/quote_contractA";
                    contractType = 1;
                    defVal.canOpenView = true;
                } else if (productNo != null && productNo != obj.productNo) {
                    contractType = 2;
                    viewName = "marketManagement/iframeWindow/quote_contractB";
                    layer.msg("选择了不同型号");
                    defVal.canOpenView = true;
                }
            }
            if (defVal.customerSn != null && defVal.customerSn != obj.productNo.substring(0,3)) {
                layer.alert("请选择同一个客户的订单！");
                defVal.customerSn = null;   //初始化客户编号 如a11
                defVal.canOpenView = false;
                return false;
            }
        });
        if (defVal.canOpenView) {
            // 获取地址，公司名
            admin.req({
                type: 'get',
                url: setter.baseUrl+'sys/consumer/user/info/'+tabdata.data[0].userId,
                success: function (data) {
                    tabdata.userName = data.user.userName;
                    tabdata.companyName = data.user.companName;
                    tabdata.country = data.user.country;
                    tabdata.city = data.user.city;
                    tabdata.address = data.user.address;
                    tabdata.mobilePhone = data.user.mobilePhone;
                    tabdata.postcode = data.user.postcode;
                    tabdata.paymentType = data.user.paymentType;
                    tabdata.deliveryType = data.user.deliveryType;
                    tabdata.contact = data.user.contact;
                    admin.popup({
                        title: '报价合同'
                        ,area: ['100%', '100%']
                        ,maxmin: true
                        ,btn: ['打印', '取消']
                        ,yes: function () {
                            var printId;
                            if (contractType == "1"){
                                printId = "quoteContract_AllA";
                            } else if (contractType == "2"){
                                printId = "quoteContract_AllB";
                            } else if (contractType == "3") {
                                printId = "quoteContract_AllS";
                            }
                            document.body.innerHTML=document.getElementById(printId).innerHTML;
                            window.print();
                            window.location.reload();
                        }
                        ,success: function () {
                            tabdata.htmlType = 1;     //页面标识 0为报价明细合同 主要用于判断头部左侧标题
                            view(this.id).render(viewName, tabdata).done(function () {
                                if (contractType === 1){
                                    // layui.each遍历的数据，td最少为6条，没有数据的显示空白
                                    var tdSize = $(".contract-module-three-tab tbody tr").eq(0).find("td").size();
                                    var dataLength = tabdata.data.length;
                                    var addTrNum;
                                    if (dataLength < 3){
                                        addTrNum = 4;
                                    } else if (dataLength >= 4) {
                                        addTrNum = 7;
                                    }
                                    for (var i=tdSize;i<addTrNum;i++){
                                        $(".contract-module-three-tab tbody").find("tr").append("<td></td>");
                                    }
                                    if (addTrNum == 4){
                                        for (var i=1;i<addTrNum;i++){
                                            $(".contract-module-three-tab tbody tr").find("td").eq(i).css({"width":"27.3%"});
                                        }
                                    } else {
                                        for (var i=1;i<addTrNum;i++){
                                            $(".contract-module-three-tab tbody tr").find("td").eq(i).css({"width":"13.6%"});
                                        }
                                    }
                                }
                                // 实时时间设置   最新时间显示
                                var timeArray = [];     // 修改时间
                                var ctimeArray = [];    // 创建时间
                                var newEstTime;
                                if ( obj != null) {
                                    var nullNum = 0;
                                    for (var i=0;i< obj.length;i++) {
                                        timeArray[i] =  obj[i].gmtModified;
                                        ctimeArray[i] = obj[i].gmtCreate;
                                        if (timeArray[i] == null) {
                                            nullNum ++;
                                        }
                                    }
                                    if (nullNum == obj.length) {   // 判断 修改时间数组 是否全为null
                                        newEstTime = jstools.TimeContrast(ctimeArray);
                                        console.log(ctimeArray);
                                    } else {
                                        newEstTime = jstools.TimeContrast(timeArray);
                                    }
                                    $("#contractBotDate").text(newEstTime.substring(0,10));
                                    $("#topDate").text(newEstTime.substring(0,10));
                                }
                            })
                        }
                    });
                }
            });
        }
    }


    // 手机端，数据太多，这个页面单独写
    $("#noPayment-operation").on('click', function () {
        $(this).text($(this).text()=="隐藏操作"?"显示操作":"隐藏操作");
        $(".layui-table-fixed-r").toggle('slow');
    });
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        //订单评审搜索表单
        $("#orderReview_searll").css({"display": ""});
        $("#orderReview_pcsear").css({"display": "none"});
        //监听select并给input name赋值
        form.on('select(orderReview-search-select)', function (data) {
            var selValue = data.value;
            var index = data.elem.selectedIndex;
            var text = data.elem.options[index].text; // 选中文本
            var Domobj = $("#orderReview_sinp");
            if (selValue != null || selValue != "") {
                Domobj.attr({"placeholder": text});
                $("input[id='orderReview_sinp']").attr("name", selValue)
            } else {
                Domobj.attr("placeholder", "请选取搜索条件");
            }
        });
    }

    exports('market_orderNoPayment', {})
});