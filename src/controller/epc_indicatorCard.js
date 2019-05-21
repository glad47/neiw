
layui.define(['admin', 'table', 'index','element','form','laydate','upload', 'uploadCommon'], function(exports){
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element
        ,upload = layui.upload
        var $ = layui.jquery;
        var uploadCommon = layui.uploadCommon;

    var requestData = [];
    // pcb表格对象
    var tabPCBObj;
    var tabStencilObj;
    // pcb文件重新上传参数
    var pcbReUploadData = {
        id: null,
        access_token: layui.data('layuiAdmin').access_token
    };
    tabRenderPCB();
    // 全局变量
    var defVal = {
        orderType: 0,   //订单类型
    };
    // 监听tab选项卡
    element.on('tab(indicator_card_tab)', function (data) {
        defVal.orderType = data.index;
        if (defVal.orderType === 1) {
            tabRenderStencil();
        } else if (defVal.orderType === 2) {
            console.log("SMT订单选项卡");
        } else {
            tabRenderPCB();
        }
    });
    var _click_lineId;      //点击表格行===id
    laydate.render({
        elem: '#gmtCreate'
    });

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 内部PCB订单-编写指示卡
    function tabRenderPCB(){
        table.render({
            elem: '#epc_Tabpcb_ok_payment_order'
            ,url: setter.baseUrl+'epc/pcborder/list'
            ,toolbar: '#tbarIndcard'
            ,cellMinWidth: 80
            ,id:"epc_Tabpcb_ok_payment_order"
            ,page: true
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,cols: [[
                {type: 'checkbox', fixed: 'left'}
                ,{field:'id', title: 'ID',hide: true}
                ,{field:'productNo',fixed: 'left', title: 'Product No', align:'center', width: 114}
                ,{field:'status', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-epc-indicatorCard-status',width: 130}
                ,{field:'gerberName', title: '原始资料', align:'center', width: 254}
                ,{field:'quoteGerberName', title: '正式资料', align:'center', width: 254, templet:'#quote_gerber_file'}
                ,{field:'productionGerberName', title: '生产资料', align:'center', width: 254, templet:'#quote_gerber_file'}
                ,{field:'gmtCreate', title: 'Create Time', align:'center', width: 165}
                ,{field:'pcbType', title: 'PCB Type', align:'center', width: 114}
                ,{field:'layerNum', title: 'Layer', align:'center', width: 114}
                ,{field:'finishThickness', title: 'Finish Thickness', align:'center', width: 134}
                ,{field:'quantityPcs', title: 'Quantity Pcs', align:'center', width: 114}
                ,{field:'areaSq', title: 'Area Sq', align:'center', width: 110}

                ,{field:'userId', title: 'User ID',width: 80,hide: true}
                ,{field:'engineeringRemark', title: '工程备注',width: 80,hide: true}
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
                ,{field:'productionGerberPath', title: '生产资料路径', align:'center', hide: true, width: 114,hide: true}
                ,{field:'remark', title: 'Remark', align:'center', width: 80,hide: true}
                ,{field:'differentDesign', title: 'DifferentDesign', align:'center', width: 134,hide: true}
                ,{field:'gmtModified', title: 'gmtModified', align:'center', width: 114,hide: true}
                ,{field:'uuid', title: 'UuId', align:'center', width: 80,hide: true}
                ,{field:'buildTime', title: 'BuildTime', align:'center', width: 114,hide: true}
                ,{field:'isExistSmt', title: 'IsExistSmt', align:'center', width: 114,hide: true}
                ,{field:'weight', title: 'Weight', align:'center', width: 80,hide: true}
                ,{field:'nofCore', title: 'NofCore', align:'center', width: 80,hide: true}
                ,{field:'nofPp', title: 'NofPp', align:'center', width: 80,hide: true}
                ,{field:'nofHoles', title: 'NofHoles', align:'center', width: 90,hide: true}
                ,{title: '操作', width: 290, align:'center', fixed: 'right', toolbar: '#Tabtb-pcb-epc-indicatorCard-option'}
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
                // pcb_gerberUpload();
                tabPCBObj = res.data;
                layui.each($(".pcbReupload"),function(index, elem){
                    var _this_id = elem.id.substring(11);
                    var fileName;
                    var uploadInsts = upload.render({
                        elem: elem //绑定元素
                        ,url: setter.baseUrl+'sys/oss/upload/geber?access_token='+layui.data('layuiAdmin').access_token
                        ,field: 'file'
                        ,data: {id:_this_id}
                        ,accept: 'file'
                        ,exts: 'zip|rar|7z'
                        ,before: function (obj) {
                            obj.preview(function (index, file, result) {
                                fileName = file.name;   //文件名
                            });
                        }
                        ,done: function(res){
                            var url = res.url;
                            var r = /\[(.+?)\]/g;
                            var filePatha = url.match(r);
                            var filePath = filePatha[0].replace(/\[|]/g,'');    //去除前后两端的中括号
                            var saveObj = {
                                data: {'quoteGerberName':fileName,'quoteGerberPath':filePath,'id':_this_id,'access_token': layui.data('layuiAdmin').access_token},   // ajax请求传输的data数据  quoteGerberPath字段请求上传文件接口成功回调后再赋值
                                url: setter.baseUrl+'epc/pcborder/update',      // 将字段保存到数据库的接口
                                retab: 'epc_Tabpcb_ok_payment_order'            // 表格对象，请求成功后重新渲染表格
                            };
                            admin.req({
                               type: 'post',
                               url: saveObj.url,
                                data: saveObj.data,
                                success: function () {
                                    layer.alert("更改正式资料成功");
                                    table.reload('epc_Tabpcb_ok_payment_order');
                                }
                            });
                        }
                        ,error: function(){
                            layer.msg("文件上传失败！");
                        }
                    });
                });
            }
        });
    }

    //监听行单击事件（单击事件为：rowDouble）
    table.on('row(epc_Tabpcb_ok_payment_order)', function(obj){
        var data = obj.data;
        console.log(obj.index);
        _click_lineId = data.id;
        console.log("行id为："+_click_lineId);
    });
    //监听行单击事件（单击事件为：rowDouble）
    table.on('row(epc_Tabstencil_ok_payment_order)', function(obj){
        var data = obj.data;
        _click_lineId = data.id;
        console.log("行id为："+_click_lineId);
    });

    //监听工具条
    table.on('tool(epc_Tabpcb_ok_payment_order)', function(obj){
        var data = obj.data;
        console.log(data);
        if(obj.event === 'detail'){
            if (data.isExistIndicator === 2) {
                admin.req({
                    type: 'GET',
                    url: setter.baseUrl+'epc/pcborderprocess/infos/'+data.id,
                    done: function(res){
                        data.pop = res.pop;
                        admin.popup({
                            title: '订单id:［'+ data.id + '］-----------'+'订单时间：［'+data.gmtCreate+'］'
                            ,area: ['45%', '70%']
                            ,success: function (layero, index) {
                                view(this.id).render('marketManagement/iframeWindow/order_pcb_detail', data).done(function () {

                                })
                            }
                        })
                    },
                    fail: function (res) { 
                        layer.msg('服务器异常，稍后再试！');
                    }
                });
            }else{
                admin.popup({
                    title: '订单id:［'+ data.id + '］-----------'+'订单时间：［'+data.gmtCreate+'］'
                    ,area: ['45%', '70%']
                    ,success: function (layero, index) {
                        view(this.id).render('marketManagement/iframeWindow/order_pcb_detail', data).done(function () {

                        })
                    }
                });
            }
        } else if(obj.event === 'back'){
            layer.confirm('真的退回合同号为［'+data.productNo+'］吗', function(index){
                var contractNos = data.productNo;
                var isInternal = data.isInternal;

                admin.req({
                    type: 'post',
                    url: setter.baseUrl+'epc/pcborder/backByIo'    // 需要修改成退回的接口
                    ,data:{id:data.id,isInternal:isInternal,onlineOid:data.onlineOid,'bid':data.businessId,'sales':data.totalFee,'onlineSales':data.subtotal}
                    ,done: function (res) {
                        layer.msg('成功退回');
                        table.reload('epc_Tabpcb_ok_payment_order');
                        layer.close(index);
                    }
                    ,fail: function (res) {
                        layer.msg('服务器异常，稍后再试！');
                    }
                })
            });
        } else if(obj.event === 'epc-write-indicator'){
            admin.popup({
                title: '编写指示卡'
                ,area: ['45%', '561px']
                ,btn:['提交','取消']
                ,yes:function(index, layero){
                    $("#LAY-pcborder-update-submit").click();
                }
                ,end:function(){
                    localStorage.removeItem("saveBackResult");  // 清除localStorage
                }
                ,success: function (layero, index) {
                    view(this.id).render('epcManagement/Indicator_cardform', data).done(function () {
                        form.render(null, '')
                        form.on('submit(LAY-pcborder-update-submit)',function (data) {
                            var field = data.field;
                            console.log(field);
                            //获取table里的数据，监听行编辑事件。
                            table.on('edit(indicator_listTab)',function(obj){
                                // var value = obj.value //得到修改后的值
                                // ,data = obj.data //得到所在行所有键值
                                // ,field = obj.field; //得到字段
                                var data = obj.data;
                                data.pcbOrderId = field.id; //设置订单id
                                data.provessId = obj.data.id; //设置工序id
                                requestData.unshift(data);
                                console.log(requestData);
                            });
                            requestData = uniqueObjArray(requestData,"id");
                            // console.log(requestData);
                            field.processEntityList = requestData;
                            // console.log(field);
                            var token = layui.data('layuiAdmin').access_token;
                            // console.log(token);
                            if (requestData.length != 0) {
                                $.ajax({
                                    type: 'post'
                                    ,url: setter.baseUrl+'epc/pcborderprocess/saves'
                                    ,headers: {
                                        'access_token':token
                                    }
                                    ,data: JSON.stringify(requestData)
                                    ,dataType:"json"
                                    ,contentType : "application/json;charset=utf-8"
                                    ,done: function (res) {
                                        layer.msg('指示卡提交成功');
                                        table.reload('epc_Tabpcb_ok_payment_order');
                                    }
                                    ,fail: function (res) {
                                        layer.msg("订单信息修改失败，请稍后再试！");
                                    },
                                });
                                requestData = [];
                                layer.close(index);
                                table.reload('epc_Tabpcb_ok_payment_order');
                                return false;
                            }
                            layer.msg("请至少写入一条工序！");
                        })
                    })
                }
            })
        } else if (obj.event === 'edit') {
            if (data.quoteGerberName != "" && data.quoteGerberName != null && typeof data.quoteGerberName != 'undefined') {
                var _this_id = data.id,_this_isInternal = data.isInternal,_this_onlineOid = data.onlineOid;
                admin.popup({
                    title: '审核订单[PCB]'
                    ,area: ['867px', '325px']
                    ,id: 'epc_incSH'
                    ,btn:['审核','取消']
                    ,yes: function () {
                        $("#epc_auditOrders").click();
                    }
                    ,success: function (layero, index) {
                        view(this.id).render('epcManagement/iframeWindow/audit_orders', data).done(function () {
                            form.render();
                            form.on('submit(epc_auditOrders)', function (data) {
                                var field = data.field;
                                field.id = _this_id;
                                field.isInternal = _this_isInternal;
                                field.onlineOid = _this_onlineOid;
                                admin.req({
                                    type: 'post'
                                    ,url: setter.baseUrl+'epc/pcborder/auditPcbOrder'
                                    ,data: field
                                    ,done: function () {
                                        layer.alert('审核成功', function () {
                                            layui.table.reload('epc_Tabpcb_ok_payment_order');
                                            layer.closeAll();
                                        });
                                    }
                                });
                                return false;
                            });
                        });
                    }
                });
            } else {
                var $dataIndex = $(this).parents("tr").attr("data-index");      // 获取行下标
                console.log("$dataIndex:"+$dataIndex);
                layer.alert('请先上传正式资料！！！', function (layero, index) {
                    layer.closeAll();
                    $(".layui-table-click[data-index="+$dataIndex+"]").find("*[lay-event='fileMana']").click();
                });
            }
        } else if (obj.event == 'fileMana') {
            data.orderType = "pcbOrder";        // 根据orderType  发送不同的接口
            admin.popup({
                title: 'PCB订单资料管理'
                ,area: ['870px', '303px']
                ,success: function (layero, index) {
                    view(this.id).render('epcManagement/iframeWindow/file_management', data).done(function () {

                    });
                }
                ,end: function () {
                    localStorage.removeItem("saveBackResult");  // 清除localStorage
                }
            });
        }
    });

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 内部 Stencil 钢网 订单-编写指示卡
    function tabRenderStencil(){
        table.render({
            elem: '#epc_Tabstencil_ok_payment_order'
            ,url: setter.baseUrl+'epc/stencilorder/epcStencilOrderList'
            ,toolbar: '#tbarIndcardS'
            ,cellMinWidth: 80
            ,id:"epc_Tabstencil_ok_payment_order"
            ,page: true
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,cols: [[
                {type: 'checkbox', fixed: 'left'}
                ,{field:'id', title: 'ID',hide: true}
                ,{field:'productNo', fixed: 'left',title: 'Product No', align:'center', width: 114}
                ,{field:'status', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-epc-indicatorCard-status',width: 130}
                ,{field:'gerberName', title: '原始资料', align:'center', width: 254}
                ,{field:'quoteGerberName', title: '正式资料', align:'center', width: 254, templet:'#quote_gerber_fileS'}
                ,{field:'gmtCreate', title: 'Create Time', align:'center', width: 165}
                ,{field:'pcbType', title: 'PCB Type', align:'center', width: 114}
                ,{field:'layerNum', title: 'Layer', align:'center', width: 114}
                ,{field:'finishThickness', title: 'Finish Thickness', align:'center', width: 134}
                ,{field:'quantityPcs', title: 'Quantity Pcs', align:'center', width: 114}
                ,{field:'areaSq', title: 'Area Sq', align:'center', width: 110}
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
                ,{field:'buildTime', title: 'BuildTime', align:'center', width: 114,hide: true}
                ,{field:'isExistSmt', title: 'IsExistSmt', align:'center', width: 114,hide: true}
                ,{field:'weight', title: 'Weight', align:'center', width: 80,hide: true}
                ,{field:'nofCore', title: 'NofCore', align:'center', width: 80,hide: true}
                ,{field:'nofPp', title: 'NofPp', align:'center', width: 80,hide: true}
                ,{field:'nofHoles', title: 'NofHoles', align:'center', width: 90,hide: true}
                ,{title: '操作', width: 310, align:'center', fixed: 'right', toolbar: '#Tabtb-stencil-epc-indicatorCard-option'}
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
                stencil_gerberUpload();
                tabStencilObj = res.data;
                layui.each($(".stencilReupload"),function(index, elem){
                    var _this_id = elem.id.substring(15);
                    var fileName;
                    var uploadInsts = upload.render({
                        elem: elem //绑定元素
                        ,url: setter.baseUrl+'sys/oss/upload/geber?access_token='+layui.data('layuiAdmin').access_token
                        ,field: 'file'
                        ,data: {id:_this_id}
                        ,accept: 'file'
                        ,exts: 'zip|rar|7z'
                        ,before: function (obj) {
                            obj.preview(function (index, file, result) {
                                fileName = file.name;   //文件名
                            });
                        }
                        ,done: function(res){
                            var url = res.url;
                            var r = /\[(.+?)\]/g;
                            var filePatha = url.match(r);
                            var filePath = filePatha[0].replace(/\[|]/g,'');    //去除前后两端的中括号
                            var saveObj = {
                                data: {'quoteGerberName':fileName,'quoteGerberPath':filePath,'id':_this_id,'access_token': layui.data('layuiAdmin').access_token},   // ajax请求传输的data数据  quoteGerberPath字段请求上传文件接口成功回调后再赋值
                                url: setter.baseUrl+'epc/stencilorder/update',      // 将字段保存到数据库的接口
                                retab: 'epc_Tabstencil_ok_payment_order'            // 表格对象，请求成功后重新渲染表格
                            };
                            admin.req({
                                type: 'post',
                                url: saveObj.url,
                                data: saveObj.data,
                                success: function () {
                                    layer.alert("更改正式资料成功");
                                    table.reload(saveObj.retab);
                                }
                            });
                        }
                        ,error: function(){
                            layer.msg("文件上传失败！");
                        }
                    });
                });
            }
            });
    }

    function stencil_gerberUpload(e) {
        var fileInput = $(".filewareFileS");
        var addVersionBtn=$('#addVersionBtn');
        var cancelUploadBtn=$('#cancelUploadBtn');
        var speedLab = $("#showSpeed");
        var url = setter.baseUrl+'sys/oss/upload/geber?access_token='+layui.data('layuiAdmin').access_token;        // 上传文件接口
        fileInput.change(function () {
            var indexFileInput = ".filewareFileS"+_click_lineId;
            indexFileInput = $(indexFileInput);
            var fileObj = indexFileInput.get(0).files[0]; // js获取文件对象
            var saveObj = {
                data: {'quoteGerberName':fileObj.name,'quoteGerberPath':'','id':_click_lineId,'access_token': layui.data('layuiAdmin').access_token},   // ajax请求传输的data数据  quoteGerberPath字段请求上传文件接口成功回调后再赋值
                url: setter.baseUrl+'epc/stencilorder/update',      // 将字段保存到数据库的接口
                retab: 'epc_Tabpcb_ok_payment_order'            // 表格对象，请求成功后重新渲染表格
            };
            var ss,defbtn;
            ss = ".uploadPercentageS"+_click_lineId;
            defbtn = ".btn-fileuploadS"+_click_lineId;
            var processBar = $(ss); //div
            //获取文件上传实例
            var upload=uploadCommon.uploadcommon(url,processBar,speedLab,addVersionBtn,cancelUploadBtn, saveObj);
            console.log(fileObj);
            if (fileObj) {
                $(".file-tips").text('Gerber Name：' + fileObj.name);
                $(defbtn).css("display","none");
                $(ss).css("display","block");
                $(".upload-container").css("display","block");
                addVersionBtn.attr('disabled', false);
                var file = fileInput.get(0).files[0]
                if(file==null){
                    alert("固件文件不能为空")
                    return
                }
                // 创建提交数据
                var formData = new FormData();
                formData.append('file', fileInput.get(0).files[0]);
                // 上传文件
                upload.uploadFile(formData, function (e) {
                    alert(1);
                    console.log(e);
                });
            }
        });
    }
    //监听 Stencil 钢网 工具条
    table.on('tool(epc_Tabstencil_ok_payment_order)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            if (data.isExistIndicator === 2) {
                admin.req({
                    type: 'GET',
                    url: setter.baseUrl+'epc/pcborderprocess/infos/'+data.id,
                    done: function(res){
                        data.pop = res.pop;
                        admin.popup({
                            title: '订单id:［'+ data.id + '］-----------'+'订单时间：［'+data.gmtCreate+'］'
                            ,area: ['45%', '70%']
                            ,success: function (layero, index) {
                                view(this.id).render('marketManagement/iframeWindow/order_pcb_detail', data).done(function () {

                                })
                            }
                        })
                    },
                    fail: function (res) {
                        layer.msg('服务器异常，稍后再试！');
                    }
                });
            }else{
                admin.popup({
                    title: '订单id:［'+ data.id + '］-----------'+'订单时间：［'+data.gmtCreate+'］'
                    ,area: ['45%', '70%']
                    ,success: function (layero, index) {
                        view(this.id).render('marketManagement/iframeWindow/order_stencil_detail', data).done(function () {

                        })
                    }
                });
            }
        } else if(obj.event === 'back'){
            layer.confirm('真的退回钢网订单号为［'+data.invoiceNo+'］吗', function(index){
                admin.req({
                    type: 'post',
                    url: setter.baseUrl+'epc/stencilorder/backByAo'       // 需要修改成退回的接口
                    ,data:{id:data.id,isInternal:data.isInternal,onlineOid:data.onlineOid,'bid':data.businessId,'sales':data.totalStencilFee,'onlineSales':data.totalStencilFee}
                    ,done: function (res) {
                        layer.msg('成功退回')
                        table.reload('epc_Tabstencil_ok_payment_order');
                    }
                    ,fail: function (res) {
                        layer.msg('服务器异常，稍后再试！');
                    }
                })
                layer.close(index);
            });
        } else if(obj.event === 'epc-write-indicator'){
            admin.popup({
                title: '编写指示卡'
                ,area: ['45%', '561px']
                ,btn:['提交','取消']
                ,yes:function(index, layero){
                    $("#LAY-pcborder-update-submit").click();
                }
                ,end:function(){
                    localStorage.removeItem("saveBackResult");  // 清除localStorage
                }
                ,success: function (layero, index) {
                    view(this.id).render('epcManagement/Indicator_cardform', data).done(function () {
                        form.render(null, '')
                        form.on('submit(LAY-pcborder-update-submit)',function (data) {
                            var field = data.field;
                            console.log(field);
                            //获取table里的数据，监听行编辑事件。
                            table.on('edit(indicator_listTab)',function(obj){
                                // var value = obj.value //得到修改后的值
                                // ,data = obj.data //得到所在行所有键值
                                // ,field = obj.field; //得到字段
                                var data = obj.data;
                                data.pcbOrderId = field.id; //设置订单id
                                data.provessId = obj.data.id; //设置工序id
                                requestData.unshift(data);
                                console.log(requestData);
                            });
                            requestData = uniqueObjArray(requestData,"id");
                            // console.log(requestData);
                            field.processEntityList = requestData;
                            // console.log(field);
                            var token = layui.data('layuiAdmin').access_token;
                            // console.log(token);
                            if (requestData.length != 0) {
                                $.ajax({
                                    type: 'post'
                                    ,url: setter.baseUrl+'epc/pcborderprocess/saves'
                                    ,headers: {
                                        'access_token':token
                                    }
                                    ,data: JSON.stringify(requestData)
                                    ,dataType:"json"
                                    ,contentType : "application/json;charset=utf-8"
                                    ,done: function (res) {
                                        layer.msg('指示卡提交成功');
                                        layui.table.reload('epc_Tabpcb_ok_payment_order');
                                    }
                                    ,fail: function (res) {
                                        layer.msg("订单信息修改失败，请稍后再试！");
                                    },
                                });
                                requestData = [];
                                layer.close(index);
                                return false;
                            }
                            layer.msg("请至少写入一条工序！");
                        })
                    })
                }
            })
        } else if (obj.event === 'edit') {
            if (data.quoteGerberName != "" && data.quoteGerberName != null && typeof data.quoteGerberName != 'undefined') {
                var _this_id = data.id,_this_isInternal = data.isInternal,_this_onlineOid = data.onlineOid;;
                admin.popup({
                    title: '审核订单[钢网]'
                    ,area: ['867px', '325px']
                    ,id: 'epc_incSH'
                    ,btn:['审核','取消']
                    ,yes: function () {
                        $("#epc_auditOrders").click();
                    }
                    ,success: function (layero, index) {
                        view(this.id).render('epcManagement/iframeWindow/audit_orders', data).done(function () {
                            console.log(data);
                            form.render();
                            form.on('submit(epc_auditOrders)', function (data) {
                                var field = data.field;
                                field.id = _this_id;
                                field.isInternal = _this_isInternal;
                                field.onlineOid = _this_onlineOid;
                                admin.req({
                                    type: 'post'
                                    ,url: setter.baseUrl+'epc/stencilorder/epcAuditStencilOrder'
                                    ,data: field
                                    ,done: function () {
                                        layer.alert('钢网订单审核成功', function () {
                                            layui.table.reload('epc_Tabstencil_ok_payment_order');
                                            layer.closeAll();
                                        });
                                    }
                                });
                                return false;
                            });
                        });
                    }
                });
            } else {
                var $dataIndex = $(this).parents("tr").attr("data-index");      // 获取行下标
                console.log("$dataIndex:"+$dataIndex);
                layer.alert('请先上传正式资料！！！', function (layero, index) {
                    layer.closeAll();
                    $(".layui-table-click[data-index="+$dataIndex+"]").find("*[lay-event='fileMana']").click();
                });
            }
        } else if (obj.event === 'pcb-sendback') {
            layer.confirm('确定退回订单［'+data.productNo+'］?',function (index) {
                layer.msg('退回'+data.productNo);
                layui.table.reload('epc_Tabstencil_ok_payment_order');
                layer.close(index);
            })
        } else if (obj.event == 'fileMana') {
            data.orderType = "stencilOrder";        // 根据orderType  发送不同的接口
            admin.popup({
                title: 'PCB订单资料管理'
                ,area: ['45%', '40%']
                ,success: function (layero, index) {
                    view(this.id).render('epcManagement/iframeWindow/file_management', data).done(function () {

                    });
                }
                ,end: function () {
                    localStorage.removeItem("saveBackResult");  // 清除localStorage
                }
            });
        } else if (obj.event === 'supplier_update') {
            layer.msg('上传文件可能需要一定的时间，请稍后....');
        }
    });

    // 监听 stencil 头订单工具栏
    //头工具栏事件
    table.on('toolbar(epc_Tabstencil_ok_payment_order)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        switch(obj.event){
            case 'fileyzz':
                console.log('选择了'+data.length+'条数据！');
                if (data.length==1) {
                    var lineId = data[0].id;   // 行id
                    var gerberName = data[0].gerberName;   // 原始资料
                    var gerberPath = data[0].gerberPath;   // 原始资料路径+
                    layer.confirm('确定要把原始资料转为正式资料？', function () {
                        admin.req({
                            type: 'post',
                            data: {'quoteGerberName':gerberName,'quoteGerberPath':gerberPath,'id':lineId},
                            url:  setter.baseUrl+'epc/stencilorder/update',
                            success: function (data) {
                                layer.alert("原始资料已成功转为正式资料！");
                                table.reload('epc_Tabstencil_ok_payment_order');
                            }
                        });
                    });
                } else if (data.length == 0) {
                    layer.msg('请选择！');
                } else if (data.length>1) {
                    layer.msg('最多只能选择一条数据！！！');
                }
                break;
        };
    });

    var active = {
        indicatorAddFile: function () {
            layer.msg('文件上传！');
        }
    };

    $('.layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //数组去重
    function uniqueObjArray(arr, type){
        var newArr = [];
        var tArr = [];
        if(arr.length == 0){
            return arr;
        }else{
            if(type){
                for(var i=0;i<arr.length;i++){
                    if(!tArr[arr[i][type]]){
                        newArr.push(arr[i]);
                        tArr[arr[i][type]] = true;
                    }
                }
                return newArr;
            }else{
                for(var i=0;i<arr.length;i++){
                    if(!tArr[arr[i]]){
                        newArr.push(arr[i]);
                        tArr[arr[i]] = true;
                    }
                }
                return newArr;
            }
        }
    }

    // 监听搜索 PCB
    form.on('submit(Indicator_card_search)', function(data){
        var field = data.field;
        console.log(field);
        //执行重载
        table.reload('epc_Tabpcb_ok_payment_order', {
            where: field
        });
    });

    document.onkeydown = function(e) {
        var ev = document.all ? window.event : e;
        if(ev.keyCode == 13) {
            $("*[lay-filter='Indicator_card_search']").click();
        }
    }

      // 手机端，数据太多，这个页面单独写
    $("#indicatorCard-operation").on('click', function () {
        $(this).text($(this).text()=="隐藏操作"?"显示操作":"隐藏操作");
        $(".layui-table-fixed-r").toggle('slow');
    });

    exports('epc_indicatorCard', {})
});