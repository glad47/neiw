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
            {field: '', fixed: 'left', title:'File', templet: '#file', align:'center'}
            ,{field:'id', title: 'ID',hide: true}
            ,{field:'status', title: '状态', hide: false, align:'center'}
            ,{field:'userId', title: 'User ID'}
            ,{field:'orderId', title: 'Order ID', width: 110, align:'center'}
            ,{field:'orderType', title: 'Order Type', width: 180, align:'center'}
            ,{field:'dimensionsX', title: 'DimensionsX', width: 120,templet: '#type', align:'center'}
            ,{field:'dimensionsY', title: 'DimensionsY', width: 120, align:'center'}
            ,{field:'panelSizeX', title: 'PanelSizeX', width: 120, align:'center'}
            ,{field:'panelSizeX', title: 'PanelSizeY', align: 'center', width: 120,align:'center'}
            ,{field:'panelWayX', title: 'PanelWayX', width:200, align:'center'}
            ,{field:'panelWayY', title: 'PanelWayY', align:'center'}
            ,{field:'quantityPcs', title: 'Quantity Pcs', align:'center'}
            ,{field:'quantityPanel', title: 'Quantity Panel', align:'center'}
            ,{field:'areaSq', title: 'Area Sq', width: 110, align:'center'}
            ,{field:'pcbType', title: 'PCB Type', align:'center'}
            ,{field:'tg', title: 'TG', align:'center'}
            ,{field:'material', title: 'Material', align:'center'}
            ,{field:'cti', title: 'CTI', align:'center'}
            ,{field:'productCode', title: 'Product Code', align:'center'}
            ,{field:'layerNum', title: 'Layer', align:'center'}
            ,{field:'halogenFree', title: 'Halogen Free', align:'center'}
            ,{field:'finishThickness', title: 'Finish Thickness', align:'center'}
            ,{field:'heatConductivity', title: 'Heat Conductivity', align:'center'}
            ,{field:'innerLayerCopper', title: 'InnerLayer Copper', align:'center'}
            ,{field:'stackUp', title: 'Stack Up', align:'center'}
            ,{field:'innerMinTrack', title: 'InnerMin Track', align:'center'}
            ,{field:'innerMinSpacing', title: 'InnerMin Spacing', align:'center'}
            ,{field:'outerLayerCopper', title: 'Outer Layer Copper', align:'center'}
            ,{field:'outerMinTrack', title: 'outerMinTrack', align:'center'}
            ,{field:'bgaSize', title: 'bgaSize', align:'center'}
            ,{field:'outerMinSpacing', title: 'outerMinSpacing', align:'center'}
            ,{field:'minHoleSize', title: 'minHoleSize', align:'center'}
            ,{field:'pthCopper', title: 'pthCopper', align:'center'}
            ,{field:'solderMaskTopColor', title: 'solderMaskTopColor', align:'center'}
            ,{field:'viaProcess', title: 'viaProcess', align:'center'}
            ,{field:'solderMaskBotColor', title: 'SolderMaskBotColor', align:'center'}
            ,{field:'silkScreenTopColor', title: 'SilkScreenTopColor', align:'center'}
            ,{field:'silkScreenBotColor', title: 'silkScreenBotColor', align:'center'}
            ,{field:'peelable', title: 'Peelable', align:'center'}
            ,{field:'peelableBrand', title: 'PeelableBrand', align:'center'}
            ,{field:'surfaceFinish', title: 'SurfaceFinish', align:'center'}
            ,{field:'thickness', title: 'Thickness', align:'center'}
            ,{field:'surfaceArea', title: 'SurfaceArea', align:'center'}
            ,{field:'panelRoutingPath', title: 'PanelRoutingPath', align:'center'}
            ,{field:'punchingHoles', title: 'PunchingHoles', align:'center'}
            ,{field:'punchingSlots', title: 'PunchingSlots', align:'center'}
            ,{field:'testPoint', title: 'TestPoint', align:'center'}
            ,{field:'testPointType', title: 'TestPointType', align:'center'}
            ,{field:'testPoinType', title: 'TestPoinType', align:'center'}
            ,{field:'testCost', title: 'TestCost', align:'center'}
            ,{field:'blindHoles', title: 'BlindHoles', align:'center'}
            ,{field:'edgePlated', title: 'EdgePlated', align:'center'}
            ,{field:'halfHoleLated', title: 'HalfHoleLated', align:'center'}
            ,{field:'contrlImpeance', title: 'ContrlImpeance', align:'center'}
            ,{field:'buriedHoles', title: 'BuriedHoles', align:'center'}
            ,{field:'carbon', title: 'Carbon', align:'center'}
            ,{field:'bevellingCamfer', title: 'BevellingCamfer', align:'center'}
            ,{field:'deepMillRouting', title: 'deepMillRouting', align:'center'}
            ,{field:'gerberPath', title: 'gerberPath', align:'center', hide: true}
            ,{field:'gerberName', title: 'gerberName', align:'center', hide: true}
            ,{field:'remark', title: 'Remark', align:'center'}
            ,{field:'differentDesign', title: 'DifferentDesign', align:'center'}
            ,{field:'gmtModified', title: 'gmtModified', align:'center'}
            ,{field:'gmtCreate', title: 'gmtCreate', align:'center'}
            ,{field:'uuid', title: 'UuId', align:'center'}
            ,{field:'boardFee', title: 'BoardFee', align:'center'}
            ,{field:'stencilFee', title: 'StencilFee', align:'center'}
            ,{field:'overworkFee', title: 'OverworkFee', align:'center'}
            ,{field:'productNo', title: 'ProductNo', align:'center'}
            ,{field:'buildTime', title: 'BuildTime', align:'center'}
            ,{field:'isExistSmt', title: 'IsExistSmt', align:'center'}
            ,{field:'weight', title: 'Weight', align:'center'}
            ,{field:'nofCore', title: 'NofCore', align:'center'}
            ,{field:'nofPp', title: 'NofPp', align:'center'}
            ,{field:'nofHoles', title: 'NofHoles', align:'center'}

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
                    view(this.id).render('marketManagement/iframeWindow/order_review_search', data).done(function () {

                    })
                }
            })
        } else if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            admin.popup({
                title: '编辑PCB订单信息'
                ,area: ['45%', '561px']
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderOffer_update', data).done(function () {
                        form.render(null, '')
                        form.on('submit(LAY-market-update-submit)',function (data) {
                            var field = data.field; //获取提交的字段
                            alert("提交的字段信息："+JSON.stringify(field));
                        })
                    })
                }
            })
        }
    });



//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 钢网订单
    table.render({
        elem: '#gw_orderTab'
        ,url: setter.baseUrl+'/market/stencil/audit/list'
        ,id: 'gw_orderTab'
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
            {field: '', fixed: 'left', title:'File', templet: '#gw_file', align:'center'}
            ,{field: 'status', title: '状态', align:'center'}
            ,{field: '', title: 'Order Type', align:'center'}
            ,{field: '', title: 'Type', align:'center'}
            ,{field: '', title: 'Order Time', align:'center'}
            ,{field: '', title: 'P/N', align:'center'}
            ,{field: '', title: 'Unit Price', align:'center'}
            ,{field: 'quantity', title: 'Quantity', align:'center'}
            ,{field: '', title: 'Shipping Time', align:'center'}
            ,{field: 'weight', title: 'Weight', align:'center'}
            ,{field: 'stencilType', title: 'Stencil Type', align:'center'}
            ,{field: 'stencilSide', title: 'Stencil Side', align:'center'}
            ,{field: 'size', title: 'Size', align:'center'}
            ,{field: 'thickness', title: 'Thickness', align:'center'}
            ,{field: 'note', title: 'Note', align:'center'}
        ]]
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