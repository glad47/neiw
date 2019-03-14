/**

 @Name： 供应链管理－－［外发报价］

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

    // layerdate.render({
    //     elem: '#gmtCreate'
    // })
    laydate.render({
        elem: '#gmtCreate'
    });

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB内部订单-工程已审核
    table.render({
        elem: '#scm_Tabpcb_outgoing_quote'
        ,url: setter.baseUrl+'scm/pcborder/outgoing/list'
        ,toolbar: true
        ,cellMinWidth: 80
        ,id:"scm_Tabpcb_outgoing_quote"
        ,page: true
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
            {field:'id', title: 'ID',hide: true}
            ,{field:'status',fixed: 'left', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-scm-outgoingQuote-status',width: 130}
            ,{field: '', title:'File', toolbar: '#pcb-file', align:'center'}
            ,{field:'gerberName', title: 'Gerber Name', align:'center', width: 254}
            ,{field:'gmtCreate', title: 'Create Time', align:'center', width: 165}
            ,{field:'productNo', title: 'ProductNo', align:'center', width: 114}
            ,{field:'pcbType', title: 'PCB Type', align:'center', width: 114}
            ,{field:'layerNum', title: 'Layer', align:'center', width: 114}
            ,{field:'finishThickness', title: 'Finish Thickness', align:'center', width: 134}
            ,{field:'quantityPcs', title: 'Quantity Pcs', align:'center', width: 114}
            ,{field:'areaSq', title: 'Area Sq', align:'center', width: 110}
            ,{field:'boardFee', title: 'BoardFee', align:'center', width: 114}

            ,{field:'userId', title: 'User ID',width: 80,hide: true}
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
            ,{title: '操作', width: 260, align:'center', fixed: 'right', toolbar: '#Tabtb-pcb-scm-outgoingQuote-option'}
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
    table.on('tool(scm_Tabpcb_outgoing_quote)', function(obj){
        var data = obj.data;
        if(obj.event === 'assign'){
            admin.popup({
                title: '指定供应商'
                ,area: ['45%', '70%']
                ,btn:['提交','取消']
                ,yes:function(index, layero){
                    var checkStatus = table.checkStatus('scm_assign_supplier_table'),checkdata = checkStatus.data;
                    var ids = checkdata.map(function(elem){return elem.id}).join(",");
                    admin.req({
                        url:setter.baseUrl+"scm/pcborder/assignOrderToSupplier",
                        type:"POST",
                        data:{
                            orderId: data.id
                            ,supplierIds: ids
                        },
                        success:function(data){
                            if (data.code == 0 ) {
                                layer.msg("指派成功！");
                                layer.close(index); 
                            }else{
                                layer.msg(data.msg);
                            }
                        }
                    });

                }
                ,end:function(){}
                ,success: function (layero, index) {
                    view(this.id).render('scmManagement/assign_supplier').done(function () {
                        var cid_list;
                        admin.req({
                            type: 'post',
                            url: setter.baseUrl+'scm/pcborder/assignedSupplierIds',
                            data: {'oid':data.id},
                            async: false,
                            success: function (result) {
                                cid_list = result.data;
                            }
                        });
                        console.log(cid_list);
                        table.render({
                            elem: '#scm_assign_supplier_table'
                            ,url: setter.baseUrl+'scm/pcborder/allSupplier'
                            ,toolbar: true
                            ,cellMinWidth: 80
                            ,page:false
                            ,id:"scm_assign_supplier_table"
                            ,where: {
                                access_token: layui.data('layuiAdmin').access_token
                            }
                            ,cols: [[
                                {type:'checkbox'}
                                ,{field:'id', title: 'ID',hide: true}
                                ,{field:'supplierId', title: '供应商编号', hide: false, align:'center',width: 130}
                                ,{field:'companyName', title:'公司名', align:'center', hide: false}
                            ]],
                            done: function (res, curr, count) {
                                var tableId = this.id;
                                // 原dom
                                var tableElem = this.elem;
                                // layui渲染出来的表格dom
                                var tableViewElem = tableElem.next();
                                //var data = this.url ? res:res.data;
                                // 当前页面的数据
                                var data = table.cache[tableId];

                                // 遍历tbody的tr
                                layui.each(tableViewElem.find('.layui-table-main').find('tr'), function (index, trElem) {
                                    // 行节点
                                    trElem = $(trElem);
                                    // 行下标
                                    var trIndex = trElem.data('index');
                                    // 行数据
                                    var trData = data[trIndex];
                                    // 判断是否选中的逻辑这个根据自己的实际情况处理
                                    console.log("进入");
                                    for (var i=0;i<cid_list.length;i++){
                                        console.log(cid_list[i]);
                                        if (trData.id == cid_list[i]){
                                            console.log("aaa:"+cid_list[i])
                                            // 只加属性并不能在获得选中行中得到数据
                                            tableViewElem.find('tr[data-index="' + trIndex + '"] [name="layTableCheckbox"]').attr('checked', 'checked');
                                            tableViewElem.find('tr[data-index="' + trIndex + '"] [name="layTableCheckbox"]').attr('disabled', 'disabled');
                                            console.log(tableViewElem.find('tr[data-index="' + trIndex + '"] [name="layTableCheckbox"]').text());
                                            // 把cache的LAY_CHECKED设置成true才能在获得表格选中的数据中得到当前选中的行
                                            trData[table.config.checkName] = true;
                                        }
                                    }
                                    // if (trData.id == '2') {
                                    //     // 只加属性并不能在获得选中行中得到数据
                                    //     tableViewElem.find('tr[data-index="' + trIndex + '"] [name="layTableCheckbox"]').attr('checked', 'checked');
                                    //     tableViewElem.find('tr[data-index="' + trIndex + '"] [name="layTableCheckbox"]').attr('disabled', 'disabled');
                                    //     console.log(tableViewElem.find('tr[data-index="' + trIndex + '"] [name="layTableCheckbox"]').text());
                                    //     // 把cache的LAY_CHECKED设置成true才能在获得表格选中的数据中得到当前选中的行
                                    //     trData[table.config.checkName] = true;
                                    // }
                                });
                                // 最后渲染。参数看具体环境，如果有filter之类的尽量具体渲染到某一个form。
                                form.render(null, tableViewElem.attr('lay-filter'));
                            }
                            
                        });
                    })
                }
            });
        } 
    });

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 钢网订单-外发报价
    table.render({
        elem: '#scm_Tabstencil_outgoing_quote'
        ,id: "scm_Tabstencil_outgoing_quote"
        ,url: setter.baseUrl+'market/stencil/okPayment/list'
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
             {field: 'id', title: 'ID', hide: true}
            ,{field: 'status', fixed: 'left' , title: '状态', align:'center', width: 100, templet: '#Tabtb-stencil-scm-outgoingQuote-status'}
            ,{field: '', title:'File', templet: '#stencil-file', align:'center'}
            ,{field: 'gerberName', title: 'gerberName', align:'center', width: 224}
            ,{field: 'gmtCreate', title: 'gmtCreate', align:'center', width: 165}
            ,{field: 'productNo', title: 'Product No', align:'center', width: 134}
            ,{field: 'totalStencilFee', title: 'TotalStencilFee($)', align:'center', width: 144}
            ,{field: 'stencilType', title: 'Stencil Type', align:'center', width: 124}
            ,{field: 'stencilSide', title: 'Stencil Side', align:'center', width: 124}
            ,{field: 'quantity', title: 'Quantity', align:'center', width: 114}
            ,{field: 'size', title: 'Size', align:'center', width: 80}
            ,{field: 'quoteId', title: 'Quote ID', align:'center', width: 114, hide: true}
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
            ,{title: '操作', fixed: 'right', align:'center', toolbar: '#Tabtb-stencil-scm-outgoingQuote-option', width: 260}
        ]]
    })
    // 监听stencil表格工具条
    table.on('tool(scm_Tabstencil_outgoing_quote)',function (obj) {
        var data = obj.data;
        if (obj.event === 'assign'){
            admin.popup({
                title: '订单号［'+data.productNo+']---'+'订单时间［'+data.gmtCreate+'］'
                ,area: ['45%', '70%']
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/order_stencil_detail', data).done(function () {
                    })
                }

            })
        } 
    })

    form.on('submit(LAY-app-orderReview-search)', function (data) {
        var field = data.field;
        delete field.quiz;
            table.reload('or_Tabpcb',{
                where: field
            });
    });
    // 根据tab选项是否为pcb或者stencil监听表单，动态渲染表格
    element.on('tab(pcdorstencil_tab)', function (data) {
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
                table.reload('scm_Tabstencil_outgoing_quote',{
                    where: field
                });
            }
        });
    })

    // 手机端，数据太多，这个页面单独写
    $("#outgoingQuote-operation").on('click', function () {
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

    exports('scm_outgoingQuote', {})
});