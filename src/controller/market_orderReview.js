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
        ,toolbar: true
        ,cellMinWidth: 80
        ,id:"or_Tabpcb"
        ,page: true
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
            {field: '', fixed: 'left', title:'File', toolbar: '#pcb-file', align:'center'}
            ,{field:'id', title: 'ID',hide: true}
            ,{field:'status', title: '状态', hide: false, align:'center',templet: '#pcbor_status',width: 110}
            ,{field:'userId', title: 'User ID',width: 80}
            ,{field:'orderId', title: 'Order ID', align:'center',width: 96}
            ,{field:'orderType', title: 'Order Type', align:'center', width: 109}
            ,{field:'dimensionsX', title: 'DimensionsX',templet: '#type', align:'center', width: 114}
            ,{field:'dimensionsY', title: 'DimensionsY', align:'center', width: 114}
            ,{field:'panelSizeX', title: 'PanelSizeX', align:'center', width: 114}
            ,{field:'panelSizeX', title: 'PanelSizeY', align: 'center',align:'center', width: 114}
            ,{field:'panelWayX', title: 'PanelWayX', align:'center', width: 114}
            ,{field:'panelWayY', title: 'PanelWayY', align:'center', width: 114}
            ,{field:'quantityPcs', title: 'Quantity Pcs', align:'center', width: 114}
            ,{field:'quantityPanel', title: 'Quantity Panel', align:'center', width: 124}
            ,{field:'areaSq', title: 'Area Sq', align:'center', width: 110}
            ,{field:'pcbType', title: 'PCB Type', align:'center', width: 114}
            ,{field:'tg', title: 'TG', align:'center', width: 80}
            ,{field:'material', title: 'Material', align:'center', width: 110}
            ,{field:'cti', title: 'CTI', align:'center', width: 114}
            ,{field:'productCode', title: 'Product Code', align:'center', width: 124}
            ,{field:'layerNum', title: 'Layer', align:'center', width: 114}
            ,{field:'halogenFree', title: 'Halogen Free', align:'center', width: 114}
            ,{field:'finishThickness', title: 'Finish Thickness', align:'center', width: 134}
            ,{field:'heatConductivity', title: 'Heat Conductivity', align:'center', width: 150}
            ,{field:'innerLayerCopper', title: 'InnerLayer Copper', align:'center', width: 150}
            ,{field:'stackUp', title: 'Stack Up', align:'center', width: 95}
            ,{field:'innerMinTrack', title: 'InnerMin Track', align:'center', width: 134}
            ,{field:'innerMinSpacing', title: 'InnerMin Spacing', align:'center', width: 134}
            ,{field:'outerLayerCopper', title: 'Outer Layer Copper', align:'center', width: 134}
            ,{field:'outerMinTrack', title: 'outerMinTrack', align:'center', width: 124}
            ,{field:'bgaSize', title: 'bgaSize', align:'center', width: 90}
            ,{field:'outerMinSpacing', title: 'outerMinSpacing', align:'center', width: 134}
            ,{field:'minHoleSize', title: 'minHoleSize', align:'center', width: 124}
            ,{field:'pthCopper', title: 'pthCopper', align:'center', width: 114}
            ,{field:'solderMaskTopColor', title: 'solderMaskTopColor', align:'center', width: 134}
            ,{field:'viaProcess', title: 'viaProcess', align:'center', width: 124}
            ,{field:'solderMaskBotColor', title: 'SolderMaskBotColor', align:'center', width: 134}
            ,{field:'silkScreenTopColor', title: 'SilkScreenTopColor', align:'center', width: 134}
            ,{field:'silkScreenBotColor', title: 'silkScreenBotColor', align:'center', width: 134}
            ,{field:'peelable', title: 'Peelable', align:'center', width: 85}
            ,{field:'peelableBrand', title: 'PeelableBrand', align:'center', width: 118}
            ,{field:'surfaceFinish', title: 'SurfaceFinish', align:'center', width: 114}
            ,{field:'thickness', title: 'Thickness', align:'center', width: 96}
            ,{field:'surfaceArea', title: 'SurfaceArea', align:'center', width: 114}
            ,{field:'panelRoutingPath', title: 'PanelRoutingPath', align:'center', width: 124}
            ,{field:'punchingHoles', title: 'PunchingHoles', align:'center', width: 124}
            ,{field:'punchingSlots', title: 'PunchingSlots', align:'center', width: 124}
            ,{field:'testPoint', title: 'TestPoint', align:'center', width: 114}
            ,{field:'testPointType', title: 'TestPointType', align:'center', width: 124}
            ,{field:'testPoinType', title: 'TestPoinType', align:'center', width: 114}
            ,{field:'testCost', title: 'TestCost', align:'center', width: 90}
            ,{field:'blindHoles', title: 'BlindHoles', align:'center', width: 92}
            ,{field:'edgePlated', title: 'EdgePlated', align:'center', width: 100}
            ,{field:'halfHoleLated', title: 'HalfHoleLated', align:'center', width: 114}
            ,{field:'contrlImpeance', title: 'ContrlImpeance', align:'center', width: 114}
            ,{field:'buriedHoles', title: 'BuriedHoles', align:'center', width: 114}
            ,{field:'carbon', title: 'Carbon', align:'center', width: 80}
            ,{field:'bevellingCamfer', title: 'BevellingCamfer', align:'center', width: 134}
            ,{field:'deepMillRouting', title: 'deepMillRouting', align:'center', width: 134}
            ,{field:'gerberPath', title: 'gerberPath', align:'center', hide: true, width: 114}
            ,{field:'gerberName', title: 'gerberName', align:'center', hide: true, width: 114}
            ,{field:'remark', title: 'Remark', align:'center', width: 80}
            ,{field:'differentDesign', title: 'DifferentDesign', align:'center', width: 134}
            ,{field:'gmtModified', title: 'gmtModified', align:'center', width: 114}
            ,{field:'gmtCreate', title: 'gmtCreate', align:'center', width: 114}
            ,{field:'uuid', title: 'UuId', align:'center', width: 80}
            ,{field:'boardFee', title: 'BoardFee', align:'center', width: 114}
            ,{field:'stencilFee', title: 'StencilFee', align:'center', width: 114}
            ,{field:'overworkFee', title: 'OverworkFee', align:'center', width: 114}
            ,{field:'productNo', title: 'ProductNo', align:'center', width: 114}
            ,{field:'buildTime', title: 'BuildTime', align:'center', width: 114}
            ,{field:'isExistSmt', title: 'IsExistSmt', align:'center', width: 114}
            ,{field:'weight', title: 'Weight', align:'center', width: 80}
            ,{field:'nofCore', title: 'NofCore', align:'center', width: 80}
            ,{field:'nofPp', title: 'NofPp', align:'center', width: 80}
            ,{field:'nofHoles', title: 'NofHoles', align:'center', width: 90}
            ,{title: '操作', width: 260, align:'center', fixed: 'right', toolbar: '#Tabtb-orpcb'}
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

    //监听工具条
    table.on('tool(or_Tabpcb)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            admin.popup({
                title: '订单id:［'+ data.id + '］-----------'+'订单时间：［'+data.gmtCreate+'］'
                ,area: ['45%', '70%']
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
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderPCB_update', data).done(function () {
                        form.render(null, '')
                        form.on('submit(LAY-pcborder-update-submit)',function (data) {
                            var field = data.field;
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
                        })
                    })
                }
            })
        }
        // else if (obj.event === 'downpcb-gerber'){
        //     layer.msg('文件下载'+"\npath==>"+data.gerberPath+"\nFileName==>"+data.gerberName);
        //     var regex = "\\[(.+?)\\]";
        //     var arr = data.gerberPath.match(regex)
        //     data.gerberPath = arr[1];
        //     admin.req({
        //         type: 'get'
        //         ,url: 'http://192.168.0.155:8871/quote/gerberFileDownload'
        //         ,data: {"filePathName":data.gerberPath,"fileName":data.gerberName}
        //         ,done: function (res) {
        //             layer.msg("正在下载gerber文件.....");
        //         }
        //         ,fail: function (res) {
        //             layer.msg("未知错误，请重新下载文件！");
        //             console.warn(data);
        //         }
        //     })
        // }
    });
    // table.on('row(or_Tabpcb)', function (obj) {
    //     var data = obj.data;
    //     var this_id = $(obj.target).attr('id');
    //     layer.msg("id为："+this_id);
    //     console.log("获取到的行数据为:"+JSON.stringify(data));
    //     $()
    // })

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 钢网订单
    table.render({
        elem: '#stencil_orderTab'
        ,id: "stencil_orderTab"
        ,url: setter.baseUrl+'/market/stencil/audit/list'
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
            }
        }
        ,where: {
            access_token: layui.data('layuiAdmin').access_token
        }
        ,cols: [[
            {field: '', fixed: 'left', title:'File', templet: '#stencil-file', align:'center'}
            ,{field: 'id', title: 'ID', hide: true}
            ,{field: 'status', title: '状态', align:'center', width: 100, templet: '#stencil-status'}
            ,{field: 'userId', title: 'User ID', align:'center', width: 100}
            ,{field: 'productNo', title: 'Product No', align:'center', width: 114}
            ,{field: 'quoteId', title: 'Quote ID', align:'center', width: 114}
            ,{field: 'stencilType', title: 'Stencil Type', align:'center', width: 124}
            ,{field: 'stencilSide', title: 'Stencil Side', align:'center', width: 124}
            ,{field: 'size', title: 'Size', align:'center', width: 80}
            ,{field: 'quantity', title: 'Quantity', align:'center', width: 114}
            ,{field: 'thickness', title: 'Thickness', align:'center', width: 114}
            ,{field: 'existingFiducials', title: 'Existing Fiducials', align:'center', width: 145}
            ,{field: 'stencilSizeX', title: 'stencilSizeX', align:'center', width: 124}
            ,{field: 'stencilSizeY', title: 'stencilSizeY', align:'center', width: 124}
            ,{field: 'stencilAreaX', title: 'stencilSizeY', align:'center', width: 124}
            ,{field: 'stencilAreaY', title: 'stencilSizeY', align:'center', width: 124}
            ,{field: 'totalStencilFee', title: 'TotalStencilFee', align:'center', width: 144}
            ,{field: 'gmtCreate', title: 'gmtCreate', hide: true, width: 124}
            ,{field: 'gmtModified', title: 'gmtModified', hide: true, width: 124}
            ,{field: 'weight', title: 'Weight', align:'center', width: 85}
            ,{field: 'gerberPath', title: 'gerberPath', hide: true, width: 124}
            ,{field: 'gerberName', title: 'gerberName', hide: true, width: 124}
            ,{field: 'note', title: 'Note', align:'center', width: 80}
            ,{title: '操作', fixed: 'right', align:'center', toolbar: '#Tabtb-orstencil', width: 260}
        ]]
    })
    // 监听stencil表格工具条
    table.on('tool(stencil_orderTab)',function (obj) {
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
                        form.render(null, '')
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
                            layer.close(index);
                            return false;
                        })
                    })
                }
            })
        } else if (obj.event === 'del') {
            layer.confirm('真的删除订单号为［'+data.productNo+'］吗', function(index){
               admin.popup({
                   type: 'post'
                   ,url: setter.baseUrl+'/market/stencil/audit/delete'
                   ,data: {"ids":data.id}
                   ,done: function (res) {
                       layer.msg('删除成功')
                       obj.del();
                   }
                   ,fail: function (res) {
                       layer.msg('服务器异常，稍后重试！');
                   }
               })
                layer.close(index);
            });
        }
    })


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



    // 手机端，数据太多，这个页面单独写
    $("#phone-operation").on('click', function () {
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

    exports('market_orderReview', {})
});