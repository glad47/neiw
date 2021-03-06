/**

 @Name： 市场管理－－［订单评审］

 */


layui.define(['admin', 'table', 'index','element','form','laydate'], function(exports){
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element;
        var $ = layui.jquery;

    laydate.render({
        elem: '#gmtCreate'
    });

    var defVal = {
        orderType: 0,   //订单类型
    };

    form.render(null,'market-order-review-formlist');

    tabRenderPcb();

    // 根据tab选项是否为pcb或者stencil监听表单，动态渲染表格
    element.on('tab(pcdorstencil_tab)', function (data) {
        defVal.orderType = data.index;
        var tabNum = data.index;
        if (tabNum === 0) {
            tabRenderPcb();
        } else if (tabNum === 1) {
            tabRenderStencil();
        } else if (tabNum === 2) {
            tabRenderAssembly();
        }
    });

    form.on('submit(LAY-app-orderReview-search)', function (data) {
        var field = data.field;
        var tabNum = defVal.orderType;
        // console.log(tabNum);
        if (tabNum === 0) {
            layer.msg('PCBOrders');
            table.reload('or_Tabpcb',{
                where: field
            });
        } else if (tabNum === 1){
            layer.msg('StencilOrders');
            table.reload('stencil_orderTab',{
                where: field
            });
        } else if (tabNum === 2){
            layer.msg('AssemblyOrder')
            table.reload('smt_orderTab',{
                where: field
            })
        }
    });

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    function tabRenderPcb(){
        table.render({
            elem: '#or_Tabpcb'
            ,url: setter.baseUrl+'/market/quote/audit/list'
            ,toolbar: true
            ,cellMinWidth: 80
            ,id:"or_Tabpcb"
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
                ,{field:'id', title: 'ID',hide: true,fixed: 'left', sort: true}
                ,{field:'productNo',fixed: 'left', title: '内部型号', align:'center', width: 135, sort: true}
                ,{field:'businessName', title: '跟单员', align:'center', width: 124, sort: true}
                ,{field:'status', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-orderReview-status',width: 110, sort: true}
                ,{field: '', title:'File', toolbar: '#pcb-file', align:'center', sort: true}
                ,{field:'gerberName', title: 'Gerber Name', align:'center', width: 254, sort: true}
                ,{field:'pcbType', title: 'PCB Type', align:'center', width: 114, sort: true}
                ,{field:'layerNum', title: 'Layer', align:'center', width: 114, sort: true}
                ,{field:'finishThickness', title: 'Finish Thickness', align:'center', width: 134, sort: true}
                ,{field:'quantityPcs', title: 'Quantity Pcs', align:'center', width: 114, sort: true}
                ,{field:'areaSq', title: 'Area Sq', align:'center', width: 110, sort: true}
                ,{field:'boardFee', title: 'BoardFee', align:'center', width: 114, sort: true}
                ,{field:'gmtCreate', title: 'Create Time', align:'center', width: 165, sort: true}
                ,{field:'userId', title: 'User ID',width: 80,hide: true}
                ,{field:'isLock', title: 'Is Lock',width: 80,hide: true}
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
                ,{title: '操作', width: 260, align:'center', fixed: 'right', toolbar: '#Tabtb-pcb-market-orderReview-option'}
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
    }

    //监听工具条
    table.on('tool(or_Tabpcb)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            admin.popup({
                title: '订单id:［'+ data.id + '］-----------'+'订单时间：［'+data.gmtCreate+'］'
                ,area: ['60%', '90%']
                ,success: function (layero, index) {
                    console.log(data);
                    view(this.id).render('marketManagement/iframeWindow/order_pcb_detail', data).done(function () {

                    });
                }
            });
        } else if(obj.event === 'del'){
            layer.confirm('真的删除订单号为［'+data.productNo+'］吗', function(index){

                admin.req({
                    type: 'post',
                    url: setter.baseUrl+'market/quote/audit/delete'
                    ,data:{"ids":data.id}
                    ,done: function (res) {
                        layer.msg('删除成功')
                        obj.del();
                    }
                    ,fail: function (res) {
                        layer.msg('服务器异常，稍后再试！');
                    }
                });
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            admin.popup({
                title: '编辑PCB订单信息'
                ,area: ['820px', '90%']
                ,btn:['立即提交', '取消']
                ,yes: function () {
                    $(".submit-ok").click();
                    layer.msg('yes');
                }
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderPCB_update', data).done(function () {
                        form.render(null, '');
                        form.on('submit(LAY-pcborder-update-submit)',function (data) {
                            var field = data.field;
                            if (field.remark == "" || field.remark == "null") {
                                field.remark = " ";
                            }
                            console.log("提交的字段信息："+JSON.stringify(field));
                            admin.req({
                                type: 'post'
                                ,url: setter.baseUrl+'/market/quote/audit/update'
                                ,data: field
                                ,done: function (res) {
                                    layer.msg('订单信息修改成功');
                                    layui.table.reload('or_Tabpcb');
                                }
                                ,fail: function (res) {
                                    layer.msg("订单信息修改失败，请稍后再试！");
                                },
                            });
                            layer.close(index);
                            return false;
                        });
                    });
                }
            });
        } else if (obj.event === 'pcb-submit') {
            layer.confirm('确定提交订单［'+data.productNo+'］?',function (index) {
                data.status = 2;
                admin.req({
                    type: 'post'
                    ,url: setter.baseUrl+'market/quote/audit'
                    ,data: {"id":data.id,"userId":data.userId,"status":data.status,"productNo":data.productNo}
                    ,done: function () {
                        layer.msg('订单［'+data.productNo+'］提交成功！');
                    }
                    ,fail: function () {
                        layer.msg('订单［'+data.productNo+'］提交失败，请重试！！！');
                    }
                });
                //发送邮件
                $.ajax({
                    type: 'post',
                    data:{'userId':data.userId,'productNo':data.gerberName},
                    url:setter.imUrl+'v1/quote/sendAuditResultEmail',
                    success:function(){}
                })
                table.reload('or_Tabpcb');
                layer.close(index);
            })
        } else if (obj.event === 'pcb-lock') {
            layer.confirm('确定锁定订单［'+data.productNo+'］?',function (index) {
                admin.req({
                    type: 'post'
                    ,url: setter.baseUrl+'market/quote/audit/update'
                    ,data: {"id":data.id,"isLock": 2}
                    ,done: function () {
                        layer.msg('订单［'+data.productNo+'］已锁定！');
                        table.reload('or_Tabpcb');
                    }
                    ,fail: function () {
                        layer.msg('订单［'+data.productNo+'］锁定失败，稍后再试！');
                    }
                });
                layer.close(index);
            });
        } else if (obj.event === 'pcb-beenLocked') {
            layer.msg('订单［'+data.productNo+'］已锁定!!!');
            layer.confirm('确定解锁锁定订单［'+data.productNo+'］?',function (index) {
                admin.req({
                    type: 'post'
                    ,url: setter.baseUrl+'market/quote/audit/update'
                    ,data: {"id":data.id,"isLock": 1}
                    ,done: function () {
                        layer.msg('订单［'+data.productNo+'］已解锁！');
                        table.reload('or_Tabpcb');
                    }
                    ,fail: function () {
                        layer.msg('订单［'+data.productNo+'］解锁失败，稍后再试！');
                    }
                });
                table.reload('or_Tabpcb');
                layer.close(index);
            });
        }
    });

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 钢网订单
    function tabRenderStencil(){
        table.render({
            elem: '#stencil_orderTab'
            ,id: "stencil_orderTab"
            ,url: setter.baseUrl+'market/stencil/audit/list'
            ,page: true
            ,toolbar: true
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
                access_token: layui.data('layuiAdmin').access_token
            }
            ,cols: [[
                {field: 'id', title: 'ID', hide: true,fixed: 'left', sort: true}
                ,{field: 'productNo', title: 'Product No', align:'center', width: 135,fixed: 'left', sort: true}
                ,{field:'businessName', title: '跟单员', align:'center', width: 124, sort: true}
                ,{field: 'status', fixed: 'left' , title: '状态', align:'center', width: 100, templet: '#Tabtb-stencil-market-orderReview-status', sort: true}
                ,{field: '', title:'File', templet: '#stencil-file', align:'center', sort: true}
                ,{field: 'gerberName', title: 'gerberName', align:'center', width: 224, sort: true}
                ,{field: 'gmtCreate', title: 'gmtCreate', align:'center', width: 165, sort: true}
                ,{field: 'totalStencilFee', title: 'TotalStencilFee($)', align:'center', width: 144, sort: true}
                ,{field: 'stencilType', title: 'Stencil Type', align:'center', width: 124, sort: true}
                ,{field: 'stencilSide', title: 'Stencil Side', align:'center', width: 124, sort: true}
                ,{field: 'quantity', title: 'Quantity', align:'center', width: 114, sort: true}
                ,{field: 'size', title: 'Size', align:'center', width: 80, sort: true}
                ,{field: 'quoteId', title: 'Quote ID', align:'center', width: 114, hide: true}
                ,{field: 'isLock', title: 'Is Lock', align:'center', width: 114, hide: true}
                ,{field: 'thickness', title: 'Thickness', align:'center', width: 114, hide: true}
                ,{field: 'existingFiducials', title: 'Existing Fiducials', align:'center', width: 145, hide: true}
                ,{field: 'stencilSizeX', title: 'stencilSizeX', align:'center', width: 124, hide: true}
                ,{field: 'stencilSizeY', title: 'stencilSizeY', align:'center', width: 124, hide: true}
                ,{field: 'stencilAreaX', title: 'stencilSizeY', align:'center', width: 124, hide: true}
                ,{field: 'stencilAreaY', title: 'stencilSizeY', align:'center', width: 124, hide: true}
                ,{field: 'userId', title: 'User ID', align:'center', width: 100, hide: true}
                ,{field: 'gmtModified', title: 'gmtModified', hide: true, width: 124}
                ,{field: 'weight', title: 'Weight', align:'center', width: 85}
                ,{field: 'gerberPath', title: 'gerberPath', hide: true, width: 124}
                ,{field: 'note', title: 'Note', align:'center', width: 80, hide: true}
                ,{title: '操作', fixed: 'right', align:'center', toolbar: '#Tabtb-stencil-market-orderReview-option', width: 260}
            ]]
        })
    }
    
    // 监听stencil表格工具条
    table.on('tool(stencil_orderTab)',function (obj) {
        var data = obj.data;
        if (obj.event === 'detail'){
            admin.popup({
                title: '订单号［'+data.productNo+']---'+'订单时间［'+data.gmtCreate+'］'
                ,area: ['45%', '90%']
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/order_stencil_detail', data).done(function () {
                    })
                }

            })
        } else if (obj.event === 'edit') {
            admin.popup({
                title: '编辑：订单号［'+data.productNo+']'
                ,area: ['66%', '90%']
                ,yes: function () {
                    $("button[lay-filter='LAY-stencilorder-update-submit']").click();
                }
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderStencil_update', data).done(function () {
                        form.render();
                        form.on('submit(LAY-stencilorder-update-submit)',function (data) {
                            var field = data.field;
                            console.log("提交的字段信息："+JSON.stringify(field));
                            admin.req({
                                type: 'post'
                                ,url: setter.baseUrl+'/market/stencil/audit/update'
                                ,data: field
                                ,done: function (res) {
                                    layer.msg('订单信息修改成功');
                                    layui.table.reload('stencil_orderTab');
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
                    ,url: setter.baseUrl+'market/stencil/audit'
                    ,data: {"id":data.id,"status":data.status,"userId":data.userId,"productNo":data.productNo}
                    ,done: function () {
                        layer.msg('订单［'+data.productNo+'］提交成功！');
                        console.log('提交的信息为'+JSON.stringify(data));
                        layui.table.reload('stencil_orderTab');
                    }
                    ,fail: function () {
                        layer.msg('订单［'+data.productNo+'］提交失败，请重试！！！');
                    }
                });
                //发送邮件
                $.ajax({
                    type: 'post',
                    data:{'userId':data.userId,'productNo':data.gerberName},
                    url:setter.imUrl+'v1/quote/sendAuditResultEmail',
                    success:function(){}
                })
                layui.table.reload('stencil_orderTab');
                layer.close(index);
            })
        } else if (obj.event === 'stencil-lock') {
            layer.confirm('确定锁定订单［'+data.productNo+'］?',function (index) {
                admin.req({
                    type: 'post'
                    ,url: setter.baseUrl+'market/stencil/audit/update'
                    ,data: {"id":data.id,"isLock":2}
                    ,done: function () {
                        layer.msg('订单［'+data.productNo+'］已锁定！');
                        table.reload('stencil_orderTab');
                    }
                    ,fail: function () {
                        layer.msg('订单［'+data.productNo+'］锁定失败，稍后再试！');
                    }
                });
                $("a[title='刷新']").click();
                layer.close(index);
            })
        } else if (obj.event === 'stencil-beenLocked') {
            layer.msg('订单［'+data.productNo+'］已锁定!!!');
        }
    })

   

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ SMT订单
    function tabRenderAssembly(){
        table.render({
            elem: '#smt_orderTab'
            ,id: "smt_orderTab"
            ,url: setter.baseUrl+'market/assembly/listByStatus'
            ,page: true
            ,toolbar: true
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
                status: 1,
            }
            ,cols: [[
                {field: 'id', title: 'ID', hide: true,fixed: 'left', sort: true}
                ,{field: 'productNo', title: 'Product No', align:'center', width: 135,fixed: 'left', sort: true}
                ,{field: 'quoteId', title: 'ID', hide: true, sort: true}
                ,{field: 'status', fixed: 'left' , title: '状态', align:'center', width: 100, templet: '#Tabtb-stencil-market-orderReview-status', sort: true}
                ,{field: '', title:'File', templet: '#stencil-file', align:'center', sort: true}
                ,{field: 'gerberName', title: 'gerberName', align:'center', width: 224, sort: true}
                ,{field: 'smtPartNum', title: 'SMT PartNum', align:'center', width: 124, sort: true}
                ,{field: 'throughHolePartNum', title: 'Through Hole PartNum', align:'center', width: 224, sort: true}
                // ,{field: 'gmtCreate', title: 'gmtCreate', align:'center', width: 165}
                ,{field: 'assemblySide', title: 'Assembly Side', align:'center', width: 165, sort: true}
                ,{field: 'invoiceNo', title: 'Invoice No', align:'center', width: 134, sort: true}
                ,{field: 'totalAssemblyFee', title: 'TotalAssemblyFee($)', align:'center', width: 144, sort: true}
                ,{field: 'assemblyType', title: 'Assembly Type', align:'center', width: 124, sort: true}
                ,{field: 'uniquePartNum', title: 'Unique PartNum', align:'center', width: 124, sort: true}
                ,{field: 'quantity', title: 'Quantity', align:'center', width: 114, sort: true}
                ,{field: 'orderId', title: 'Order ID', align:'center', width: 114, hide: true}
                ,{field: 'orderNo', title: 'Order No', align:'center', width: 114, hide: true}
                ,{field: 'isLock', title: 'Is Lock', align:'center', width: 114, hide: true}
                ,{field: 'userId', title: 'User ID', align:'center', width: 100, hide: true}
                ,{field: 'gmtModified', title: 'gmtModified',width: 124, sort: true}
                ,{field: 'gerberPath', title: 'gerberPath', hide: true, width: 124, sort: true}
                ,{field: 'ordertime', title: 'Order Time', width: 124, sort: true}
                ,{field: 'remark', title: 'Remark', align:'center', width: 80, hide: true, sort: true}
                ,{title: '操作', fixed: 'right', align:'center', toolbar: '#Tabtb-smt-market-orderReview-option', width: 260}
            ]]
        });
    }
   

    //监听工具条
    table.on('tool(smt_orderTab)',function (obj) {
        var data = obj.data;
        if (obj.event === 'detail'){
            admin.popup({
                title: '订单id:［'+ data.id + '］-----------'+'订单时间：［'+data.gmtCreate+'］'
                ,area: ['45%', '90%']
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/order_smt_detail', data).done(function () {

                    })
                }
            })
        } else if (obj.event === 'del'){
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
        } else if (obj.event === 'edit'){
            admin.popup({
                title: '编辑SMT订单信息'
                ,area: ['66%', '90%']
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
                                    layer.msg('SMT订单信息修改成功');
                                    table.reload('smt_orderTab');
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
        } else if (obj.event === 'smt-submit') {
            layer.confirm('确定提交订单［'+data.productNo+'］?',function (index) {
                data.status = 2;
                admin.req({
                    type: 'post'
                    ,url: setter.baseUrl+'market/assembly/audit'
                    ,data: {"id":data.id,"status":data.status,"userId":data.userId,"productNo":data.productNo}
                    ,done: function () {
                        layer.msg('订单［'+data.productNo+'］提交成功！');
                        layui.table.reload('smt_orderTab');
                    }
                    ,fail: function () {
                        layer.msg('订单［'+data.productNo+'］提交失败，请重试！！！');
                    }
                })
                layui.table.reload('smt_orderTab');
                layer.close(index);
            })
        } else if (obj.event === 'smt-lock') {
            layer.confirm('确定锁定订单［'+data.productNo+'］?',function (index) {
                admin.req({
                    type: 'post'
                    ,url: setter.baseUrl+'market/assembly/update'
                    ,data: {"id":data.id,"isLock": 2}
                    ,done: function () {
                        layer.msg('订单［'+data.productNo+'］已锁定！');
                        table.reload('smt_orderTab');
                    }
                    ,fail: function () {
                        layer.msg('订单［'+data.productNo+'］锁定失败，稍后再试！');
                    }
                })
                layui.table.reload('smt_orderTab');
                layer.close(index);
            })
        } else if (obj.event === 'smt-beenLocked') {
            layer.msg('订单［'+data.productNo+'］已锁定!!!');
        }
    })

    //显示隐藏操作栏
    $("#orderReview-operation").on('click', function () {
        $(this).text($(this).text()=="隐藏操作栏"?"显示操作栏":"隐藏操作栏");
        $(".layui-table-fixed-r").toggle('slow');
    });

    exports('market_orderReview', {})
});
