/**

 @Name： 市场管理－－［订单评审］

 */


layui.define(['admin', 'table', 'index','element','form','laydate','r'], function(exports){
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,laydate = layui.laydate
        ,setter = layui.setter
        ,r = layui.r
        ,element = layui.element;
        var $ = layui.jquery;

    laydate.render({
        elem: '#gmtCreate'
    });
    // 全局变量
    var defVal = {
        orderType: 0,   //订单类型
    };

    form.render(null,'market-ok-payment-formlist');

    tabRenderPcb();

    // 监听tab选项卡
    element.on('tab(ok_payment_tab)', function (data) {
        defVal.orderType = data.index;
        var tabNum = data.index;
        if (tabNum === 0) {
            tabRenderPcb();
        }  else if (tabNum === 1) {
            tabRenderStencil();
        } else if (tabNum === 2){
            tabRenderAssembly();
        }
    });

    form.on('submit(LAY-app-ok-payment-search)', function (data) {
        var field = data.field;
        var tabNum = defVal.orderType;
        if (tabNum === 0) {   // PCB
            reTab = 'or_Tabpcb_ok_payment';
        } else if (tabNum === 1) {    //  Stencil
            reTab = 'stencil_orderTab_ok_payment';
        } else if(tabNum === 2){
            reTab = 'smt_orderTab_ok_payment'; //assembly
        }
        table.reload(reTab,{
            where: field
        });
    });

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单-网上已支付
    function tabRenderPcb(){
        table.render({
            elem: '#or_Tabpcb_ok_payment'
            ,url: setter.baseUrl+'/market/quote/okPaymentList'
            ,toolbar: true
            ,cellMinWidth: 80
            ,id:"or_Tabpcb_ok_payment"
            ,page: true
             ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,cols: [[
                {field:'id', title: 'ID',hide: true, sort: true}
                ,{field:'productNo',fixed: 'left', title: '内部型号', align:'center', width: 135, sort: true}
                ,{field:'businessName',title:'跟单员名字',width:100, sort: true}
                ,{field:'status', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-okPayment-status',width: 110, sort: true}
                ,{field:'payLogId', title: '支付情况', align:'center',templet: '#okPaymentPayLog', width: 117, sort: true}
                ,{field:'orderType', title: '订单类型', align:'center', width: 109, templet: '#orderOkPaymentOrdertype', sort: true}
                ,{field: '', title:'文件', templet: '#pcb-file', align:'center', sort: true}
                ,{field:'gerberName', title: '文件名', align:'center', width: 254, sort: true}
                ,{field:'courierName', title: '快递公司', align:'center', width: 154, sort: true}
                ,{field:'courierNo', title: '快递单号', align:'center', width: 154, templet:'#marker_orderOkPayment_courierNo', sort: true}
                ,{field:'pcbType', title: 'PCB 类型', align:'center', width: 114, sort: true}
                ,{field:'gmtCreate', title: '创建时间', align:'center', width: 165, sort: true}
                ,{field:'layerNum', title: '层数', align:'center', width: 114, sort: true}
                ,{field:'finishThickness', title: '完成板厚', align:'center', width: 134, sort: true}
                ,{field:'quantityPcs', title: '订单数量', align:'center', width: 114, sort: true}
                ,{field:'areaSq', title: '面积', align:'center', width: 110, sort: true}
                ,{field:'boardFee', title: '板费', align:'center', width: 114, sort: true}
    
                ,{field:'userId', title: 'User ID',width: 80,hide: true}
                ,{field:'orderId', title: 'Order ID', align:'center',width: 96,hide: true}
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
                ,{field:'weight', title: 'Weight', align:'center', width: 80,hide: true, sort: true}
                ,{field:'nofCore', title: 'NofCore', align:'center', width: 80,hide: true}
                ,{field:'nofPp', title: 'NofPp', align:'center', width: 80,hide: true}
                ,{field:'nofHoles', title: 'NofHoles', align:'center', width: 90,hide: true}
                ,{title: '操作', width: 300, align:'center', fixed: 'right', toolbar: '#Tabtb-pcb-market-okPayment-option'}
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
                showPayDetailMOK(0);
            }
        });
    }
   
    //双击
    table.on('rowDouble(or_Tabpcb_ok_payment)', function(obj){
        // console.log(obj);
        r.showPcbInfo(obj.data);
    }); 

    //监听工具条
    table.on('tool(or_Tabpcb_ok_payment)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            console.log(data);
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
                    url: setter.baseUrl+'market/quote/audit/delete'
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
                    layer.msg('yes');
                }
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderPCB_update', data).done(function () {
                        form.render(null, '')
                        form.on('submit(LAY-pcborder-update-submit)',function (data) {
                            var field = data.field;
                            if (field.remark == "" || field.remark == "null") {
                                field.remark = " ";
                            }
                            console.log("提交的字段信息："+JSON.stringify(field));
                            admin.req({
                                type: 'post'
                                ,url: setter.baseUrl+'market/quote/audit/update'
                                ,data: field
                                ,done: function (res) {
                                    layer.msg('订单信息修改成功');
                                    layui.table.reload('or_Tabpcb_ok_payment');
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
                var bool = false;
                if (!bool) {
                    bool = true;
                    admin.req({
                        type: 'post'
                        ,url: setter.baseUrl+'market/quote/okPaymentList/submit'
                        ,data: {"id":data.id,"contractNos":data.productNo,"isLock":data.isLock,"bid":data.businessId,"onlineSales":data.subtotal,"orderTime":data.orderTime,"firstStatus":data.firstStatus}
                        ,done: function () {
                            layer.msg('订单［'+data.productNo+'］提交成功！');
                            table.reload('or_Tabpcb_ok_payment');
                            bool = false;
                        }
                        ,fail: function () {
                            layer.msg('订单［'+data.productNo+'］提交失败，请重试！！！');
                            bool = false;
                        }
                    });
                    layui.table.reload('or_Tabpcb_ok_payment');
                    layer.close(index);
                }else{
                    layer.msg("请不要重复提交!!");
                }
            });
        } else if (obj.event === 'pcb-sendback') {
            layer.confirm('确定退回订单［'+data.productNo+'］?',function (index) {
                layer.msg('退回'+data.productNo);
                layui.table.reload('or_Tabpcb_no_payment');
                layer.close(index);
            })
        } else if (obj.event === 'info_pact') {
            //先发送请求得到数据，在页面里显示
            admin.req({
                type:'get',
                async: false,
                url: setter.baseUrl + 'market/order/info/'+data.orderId,
                success: function(res){
                   admin.popup({
                    title: '网上订单合同'
                    ,area: ['100%', '100%']
                    ,btn: ['打印','关闭']
                    ,yes:function(index, layero){
                        document.body.innerHTML=document.getElementById('order-interior-print').innerHTML;
                        window.print();
                        window.location.reload();
                    }
                    ,success: function (layero, index) {
                        view(this.id).render('marketManagement/iframeWindow/order_invoice', res.data).done(function () {
                        });
                    }
                }); 
                }
            })
            // layer.open({
            //     type: 2
            //     ,title: 'Look Invoice'
            //     ,content: setter.imUrl+'order/invoicePage?orderId='+ data.orderId
            //     ,maxmin: true
            //     ,area: ['75%', '70%']
            //     ,btn: ['确定', '取消']
            //     ,yes: function(index, layero){}
            // });
        } else if (obj.event == 'showProcess') {
            var postData  = {'orderId':data.id,'isInternal':2,'orderType':1};
            admin.req({
                type: 'post',
                data: postData,
                async: false,
                url: setter.baseUrl+ 'sys/processlog/showProcess',
                success: function (res) {
                    console.log(res);
                    admin.popup({
                        title: '内部订单流程'
                        ,area: ['837px', '373px']
                        ,success: function (layero, index) {
                            view(this.id).render('marketManagement/iframeWindow/order_process', res.data).done(function () {
                            });
                        }
                    });
                }
            });
        }
    });

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 钢网订单-网上已支付
    function tabRenderStencil(){
        table.render({
            elem: '#stencil_orderTab_ok_payment'
            ,id: "stencil_orderTab_ok_payment"
            ,url: setter.baseUrl+'market/stencil/okPayment/list'
            ,page: true
            ,toolbar: true
            ,done: function () {
    
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
    
                {field: 'productNo', title: '内部型号', align:'center', width: 135,fixed: 'left', sort: true}
                ,{field:'businessName',title:'跟单员名字',width:100, sort: true}
                ,{field: 'status' , title: '状态', align:'center', width: 100, templet: '#Tabtb-stencil-market-okPayment-status', sort: true}
                ,{field:'payLogId', title: '支付情况', align:'center',templet: '#okPaymentPayLogS', width: 117, sort: true}
                ,{field: '', title:'文件', templet: '#stencil-file', align:'center', sort: true}
                ,{field: 'gerberName', title: '文件名', align:'center', width: 224, sort: true}
                ,{field:'courierName', title: '快递公司', align:'center', width: 154, sort: true}
                ,{field:'courierNumber', title: '快递单号', align:'center', width: 154, sort: true}
                ,{field: 'totalStencilFee', title: 'TotalStencilFee($)', align:'center', width: 144, sort: true}
                ,{field: 'gmtCreate', title: '创建时间', align:'center', width: 165, sort: true}
                ,{field: 'stencilType', title: '钢网类型', align:'center', width: 124, sort: true}
                ,{field: 'stencilSide', title: '钢网大小', align:'center', width: 124, sort: true}
                ,{field: 'quantity', title: '数量', align:'center', width: 114, sort: true}
                ,{field: 'size', title: '厚度', align:'center', width: 80, sort: true}
                ,{field: 'id', title: 'ID', hide: true,fixed: 'left', sort: true}
                ,{field: 'quoteId', title: 'Quote ID', align:'center', width: 114, hide: true, sort: true}
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
                ,{field: 'note', title: 'Note', align:'center', width: 80, hide: true}
                ,{title: '操作', align:'center', toolbar: '#Tabtb-stencil-market-okPayment-option', width: 260, fixed: 'right'}
            ]]
            ,done: function () {
                showPayDetailMOK(1);
            }
        })
    }
   
    // 监听stencil表格工具条
    table.on('tool(stencil_orderTab_ok_payment)',function (obj) {
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
        } else if (obj.event === 'info_pact') {
            admin.req({
                type:'get',
                async: false,
                url: setter.baseUrl + 'market/order/info/'+data.orderId,
                success: function(res){
                   admin.popup({
                    title: '网上订单合同'
                    ,area: ['100%', '100%']
                    ,btn: ['打印','关闭']
                    ,yes:function(index, layero){
                        document.body.innerHTML=document.getElementById('order-interior-print').innerHTML;
                        window.print();
                        window.location.reload();
                    }
                    ,success: function (layero, index) {
                        view(this.id).render('marketManagement/iframeWindow/order_invoice', res.data).done(function () {
                        });
                    }
                }); 
                }
            })
        } else if (obj.event === 'stencil-submit') {
            var bool = false;
            if(!bool){
                bool = true;
                layer.confirm('确定提交订单［'+data.productNo+'］?',function (index) {
                    admin.req({
                        type: 'post'
                        ,url: setter.baseUrl+'market/stencil/okPayment/submit'
                        ,data: {"id":data.id,"isLock":data.isLock,"productNo":data.productNo,'bid':data.businessId,"onlineSales":data.totalStencilFee,"orderTime":data.orderTime}
                        ,done: function () {
                            layer.msg('订单［'+data.productNo+'］提交成功！');
                            table.reload('stencil_orderTab_ok_payment');
                            bool = false;
                        }
                        ,fail: function () {
                            layer.msg('订单［'+data.productNo+'］提交失败，请重试！！！');
                            bool = false;
                        }
                    })
                    layui.table.reload('stencil_orderTab_ok_payment');
                    layer.close(index);
                })
            }else{
                layer.msg("请不要重复提交！！");
            }

        } else if (obj.event === 'stencil-sendback') {
            layer.confirm('确定退回订单［'+data.productNo+'］?',function (index) {
                layer.msg('退回'+data.productNo);
                layui.table.reload('stencil_orderTab_ok_payment');
                layer.close(index);
            })
        } else if (obj.event === 'stencil-del') {
            layer.confirm('还没接网上钢网订单的删除接口！！', function () {
                // admin.req({
                //     type: 'post',
                //     url: setter.baseUrl+'market/quote/audit/delete'
                //     ,data:{"ids":data.id}
                //     ,done: function (res) {
                //         layer.msg('删除成功');
                //         table.reload('stencil_orderTab_ok_payment');
                //     }
                //     ,fail: function (res) {
                //         layer.msg('服务器异常，稍后再试！');
                //     }
                // });
            });
        } else if (obj.event == 'showProcess') {
            var postData  = {'orderId':data.id,'isInternal':2,'orderType':2};
            admin.req({
                type: 'post',
                data: postData,
                async: false,
                url: setter.baseUrl+ 'sys/processlog/showProcess',
                success: function (res) {
                    console.log(res);
                    admin.popup({
                        title: '内部订单流程'
                        ,area: ['837px', '373px']
                        ,success: function (layero, index) {
                            view(this.id).render('marketManagement/iframeWindow/order_process', res.data).done(function () {
                            });
                        }
                    });
                }
            });
        }
    })

    

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 贴片订单-网上已支付
    function tabRenderAssembly(){
        table.render({
            elem: '#smt_orderTab_ok_payment'
            ,id: "smt_orderTab_ok_payment"
            ,url: setter.baseUrl+'market/assembly/listByStatus'
            ,page: true
            ,toolbar: true
            ,done: function () {
    
            }
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,where: {
                statusMark:3
            }
            ,cols: [[
                {field: 'id', title: 'ID', hide: true, sort: true},
                {field: 'quoteId', title: 'ID', hide: true, sort: true}
                ,{field: 'productNo', fixed: 'left', title: '内部型号', align:'center', width: 135, sort: true}
                ,{field: 'status', fixed: 'left' , title: '状态', align:'center', width: 100, templet: '#Tabtb-smt-market-okPayment-status', sort: true}
                ,{field: '', title:'文件', templet: '#stencil-file', align:'center', sort: true}
                ,{field: 'gerberName', title: '文件名', align:'center', width: 224, sort: true}
                ,{field: 'smtPartNum', title: 'SMT PartNum', align:'center', width: 124, sort: true}
                ,{field: 'throughHolePartNum', title: 'Through Hole PartNum', align:'center', width: 224, sort: true}
                ,{field: 'gmtCreate', title: 'gmtCreate', align:'center', width: 165, sort: true}
                ,{field: 'assemblySide', title: 'Assembly Side', align:'center', width: 165, sort: true}
                ,{field: 'invoiceNo', title: 'Invoice No', align:'center', width: 134, sort: true}
                ,{field: 'totalAssemblyFee', title: 'TotalAssemblyFee($)', align:'center', width: 144, sort: true}
                ,{field: 'assemblyType', title: 'Stencil Type', align:'center', width: 124, sort: true}
                ,{field: 'uniquePartNum', title: 'Unique PartNum', align:'center', width: 124, sort: true}
                ,{field: 'quantity', title: 'Quantity', align:'center', width: 114, sort: true}
                ,{field: 'orderId', title: 'Order ID', align:'center', width: 114, hide: true}
                ,{field: 'orderNo', title: 'Order No', align:'center', width: 114, hide: true}
                ,{field: 'isLock', title: 'Is Lock', align:'center', width: 114, hide: true}
                ,{field: 'userId', title: 'User ID', align:'center', width: 100, hide: true}
                ,{field: 'gmtModified', title: 'gmtModified',width: 124, sort: true}
                ,{field: 'gerberPath', title: 'gerberPath', hide: true, width: 124}
                ,{field: 'ordertime', title: 'Order Time', width: 124, sort: true}
                ,{field: 'remark', title: 'Remark', align:'center', width: 80, hide: true, sort: true}
                ,{title: '操作', fixed: 'right', align:'center', width: 260,toolbar: '#Tabtb-smt-market-okPayment-option'}
            ]]
            ,done: function () {
                showPayDetailMOK(3);
            }
        })
    }
   
    // 监听smt表格工具条
    table.on('tool(smt_orderTab_ok_payment)',function (obj) {
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
        }  else if (obj.event === 'info_pact') {
            admin.req({
                type:'get',
                async: false,
                url: setter.baseUrl + 'market/order/info/'+data.orderId,
                success: function(res){
                   admin.popup({
                    title: '网上订单合同'
                    ,area: ['100%', '100%']
                    ,btn: ['打印','关闭']
                    ,yes:function(index, layero){
                        document.body.innerHTML=document.getElementById('order-interior-print').innerHTML;
                        window.print();
                        window.location.reload();
                    }
                    ,success: function (layero, index) {
                        view(this.id).render('marketManagement/iframeWindow/order_invoice', res.data).done(function () {
                        });
                    }
                }); 
                }
            })
        } else if (obj.event === 'smt-submit') {
            layer.confirm('确定提交订单［'+data.productNo+'］?',function (index) {
                data.isLock = 3;
                admin.req({
                    type: 'post'
                    ,url: setter.baseUrl+'market/assembly/okPaymentList/submit'
                    ,data: {"id":data.id,"isLock":data.isLock}
                    ,done: function () {
                        layer.msg('订单［'+data.productNo+'］提交成功！');
                        console.log('提交的信息为'+JSON.stringify(data));
                    }
                    ,fail: function () {
                        layer.msg('订单［'+data.productNo+'］提交失败，请重试！！！');
                    }
                })
                layui.table.reload('smt_orderTab_ok_payment');
                layer.close(index);
            })
        } else if (obj.event === 'smt-sendback') {
            layer.confirm('确定退回订单［'+data.productNo+'］?',function (index) {
                layer.msg('退回'+data.productNo);
                layui.table.reload('smt_orderTab_ok_payment');
                layer.close(index);
            })
        } else if (obj.event == 'showProcess') {
            var postData  = {'orderId':data.id,'isInternal':2,'orderType':2};
            admin.req({
                type: 'post',
                data: postData,
                async: false,
                url: setter.baseUrl+ 'sys/processlog/showProcess',
                success: function (res) {
                    console.log(res);
                    admin.popup({
                        title: '内部订单流程'
                        ,area: ['837px', '373px']
                        ,success: function (layero, index) {
                            view(this.id).render('marketManagement/iframeWindow/order_process', res.data).done(function () {
                            });
                        }
                    });
                }
            });
        }
    })


    // 手机端，数据太多，这个页面单独写
    $("#okPayment-operation").on('click', function () {
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

    function showPayDetailMOK (data) {
        var mainDom;
        console.log("data:"+data)
        if (data === 0) {
            mainDom = ".isOKPcbDonePay";
        } else if (data === 1) {
            mainDom = ".isOkStencilDonePay";
        }
        // 鼠标经过事件，显示支付信息
        $("table "+mainDom).on('mouseover', function () {
            var payLogId = $(this).attr('data');
            var resData;
            admin.req({
                type: 'post',
                async: false,
                url: setter.baseUrl+'paypal/paylog/info/'+payLogId,
                success: function (res) {
                    resData = res.payLog;
                    console.log(res)
                }
            });
            layer.tips('付款Email：'+resData.payerEmail+'</br>交易金额：'+resData.mcGross+'</br>PayPal手续费：'+resData.paymentFee+'</br>总净额：'+resData.totalNet+'</br>付款时间：'+resData.paymentDate, '#'+$(this).attr('id'), {
                tips: [1, '#0c0c0cab']
            });
        });
    }

    exports('market_orderOkPayment', {})
});
