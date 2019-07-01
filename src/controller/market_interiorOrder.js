/**

 @Name:    市场管理－－［内部订单］

 */


layui.define(['admin','table','index','element','form','laydate', 'jsTools'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        // ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element;
        var $ = layui.jquery;
        var jstools = layui.jsTools;

    // 全局变量
    var defVal = {
        orderType: 0,   //订单类型
        customerSn: null, //客户编号 如：a11
        tabRowId: null,  // 表格行 id
        tipsId: null,  // tip绑定dom
    };

    tabRenderPCB();
    // 表格对象
    var pcbtabObj;
    var stenciltabObj;
    // 监听tab选项卡
    element.on('tab(tab-internalQuote)', function (data) {
        defVal.orderType = data.index;
        if (defVal.orderType === 1) {
            tabRenderStencil();
        } else if (defVal.orderType === 2) {
            console.log("SMT订单选项卡");
        } else {
            tabRenderPCB();
        }
    });

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ PCB订单
    function tabRenderPCB() {
        table.render({
            elem: '#interior_order_Tabpcb'
            ,url: setter.baseUrl+'/epc/pcborder/internalOkPay'
            ,toolbar: "#interior_order_option"
            ,cellMinWidth: 80
            ,id: "interior_order_Tabpcb"
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
                ,{field: 'productNo', title: '内部型号',width: 130, fixed: 'left'}
                ,{field:'status', title: '状态', align:'center',templet: '#interiorOrderStatus', width: 117}
                ,{field:'payLogId', title: '支付情况', align:'center',templet: '#interiorPayLog', width: 117}
                ,{field: 'orderType',title: '订单类型', templet: '#order_type'}    //1=新单  2=返单    3=返单有改
                ,{field: '',title: '资料下载', templet: '#interiorOrder_downP', align: 'center', width: 107}    //资料下载
                ,{field: 'pcbName',title: '客户型号', width: 131}
                ,{field: 'invoiceNo',title: '合同号', width: 172}
                ,{field: 'orderNo',title: '客户PO'}
                ,{field: 'courierName',title: '快递公司'}
                ,{field: 'courierNumber',title: '快递单号'}
                ,{field: 'gmtCreate',title: '创建时间', width: 230}
                ,{field: 'gmtModified',title: '修改时间', width: 230}
                // 型号占位
                ,{field: 'gerberName',title: '文件名',width: 160, hide: true}
                ,{field: 'pcbType',title: 'PCB类型',width: 130, hide: true}
                ,{field: 'dimensionsX',title: '单只(X)', hide: true}
                ,{field: 'dimensionsY',title: '单只(Y)', hide: true}
                ,{field: 'panelSizeX',title: 'Panel(X)',width: 90, hide: true}
                ,{field: 'panelSizeY',title: 'Panel(Y)',width: 90, hide: true}
                ,{field: 'panelWayX',title: 'PanelWay(X)',width: 110, hide: true}
                ,{field: 'panelWayY',title: 'PanelWay(Y)',width: 110, hide: true}
                ,{field: 'finishThickness',title: '板厚', hide: true}
                ,{field: 'layerNum',title: '层数',width: 80, hide: true}
                ,{field: 'surfaceFinish',title: '表面处理', hide: true}
                ,{field: 'quantityPcs',title: 'PCS数量', hide: true}
                ,{field: 'quantityPanel',title: 'Panel数量', hide: true}
                ,{field: 'engineeringFee',title: '工程费', hide: true}
                ,{field: 'boardFee',title: '板费', hide: true}
                ,{field: 'testCostFee',title: '测试费', hide: true}
                ,{field: 'toolingFee',title: '工具费', hide: true}
                ,{field: 'overworkFee',title: '加急费', hide: true}
                ,{field: 'postFee',title: '运费', hide: true}
                ,{field: 'subtotal',title: '总价', hide: true}
                ,{field: 'boardType',title: '出货方式', hide: true}    // 1=单只 2=拼板
                ,{field: 'areaSq',title: '面积', hide: true}
                ,{field: 'material',title: '材料', hide: true}
                ,{field: 'productCode',title: '材料型号', hide: true}
                ,{field: 'productNo',title: '材料商', hide: true}
                ,{field: 'tg',title: 'TG', hide: true}
                ,{field: 'cti',title: 'CTI', hide: true}
                ,{field: 'halogenFree',title: '无卤素', hide: true}
                ,{field: 'outerLayerCopper',title: '外层铜厚', hide: true}
                ,{field: 'innerLayerCopper',title: '内层铜厚', hide: true}
                ,{field: 'heatConductivity',title: '导热系数', hide: true}
                ,{field: 'silkScreenTopColor',title: '字符颜色', hide: true}
                ,{field: 'solderMaskTopColor',title: '阻焊颜色', hide: true}
                ,{field: 'pthCopper',title: '孔铜', hide: true}
                ,{field: 'remark',title: '备注', hide: true}
                ,{field: 'buildTime',title: '交期', hide: true}
                ,{field: 'weight',title: '重量', hide: true}
                ,{field: 'thickness',title: '表面处理厚度', hide: true}
                ,{field: 'surfaceArea',title: '沉金面积', hide: true}
                // ,{field: 'innerMinTrack',title: 'innerMinTrack',hide: true}
                ,{field: 'minHoleSize',title: '最小孔', hide: true}
                ,{field: 'nofHoles',title: '孔数', hide: true}
                ,{field: 'viaProcess',title: '过孔方式', hide: true}
                ,{field: 'stackUp',title: '压合', hide: true}
                ,{field: 'nofCore',title: '芯板数量', hide: true}
                ,{field: 'nofPp',title: 'PP数量', hide: true}
                ,{field: 'innerMinSpacing',title: '内层(线宽/线距)', hide: true}
                ,{field: 'outerMinSpacing',title: '外层最小(线宽/线距)', hide: true}
                ,{field: 'bgaSize',title: 'BGA大小', hide: true}
                // ,{field: 'outerMinTrack',title: 'outerMinTrack',hide: true}
                ,{field: 'testPoinType',title: '测试类型', hide: true}
                ,{field: 'testPoint',title: '测试点', hide: true}
                ,{field: 'testPointType',title: '测试方式', hide: true}
                ,{field: 'userId',title: '用户ID', hide: true}
                ,{field: 'uuid',title: 'uuid', hide: true}
                ,{field: 'panelRoutingPath',title: '锣程', hide: true}
                ,{field: 'bevellingCamfer',title: '斜边', hide: true}
                ,{field: 'blindHoles',title: '盲孔', hide: true}
                ,{field: 'buriedHoles',title: '埋孔', hide: true}
                ,{field: 'carbon',title: '碳油', hide: true}
                ,{field: 'contrlImpeance',title: '阻抗', hide: true}
                ,{field: 'deepMillRouting',title: '控深锣', hide: true}
                ,{field: 'punchingHoles',title: '冲孔数', hide: true}
                ,{field: 'punchingSlots',title: '冲槽数', hide: true}
                ,{field: 'peelable',title: '兰胶', hide: true}
                ,{field: 'peelableBrand',title: '兰胶型号', hide: true}
                // ,{field: 'differentDesign',title: 'differentDesign',hide: true}
                ,{field: 'edgePlated',title: '金属边', hide: true}
                ,{field: 'halfHoleLated',title: '半孔板', hide: true}
                ,{field: 'orderId',title: '订单ID', hide: true}
                ,{field: 'orderNo',title: '订单号', hide: true}
                ,{field: 'invoiceNo',title: '合同号', hide: true}
                ,{field: 'id', title: 'ID',hide:true}
                ,{field: 'userId', title: 'User ID',hide: true}
                ,{field: 'gerberPath',title: 'gerberPath',hide: true}
                ,{field: 'isExistIndicator',title: 'isExistIndicator',hide: true}
                ,{field: 'isExistSmt',title: 'isExistSmt',hide: true}
                ,{field: 'quoteConfigIdList',title: 'quoteConfigIdList',hide: true}
                ,{field: 'quoteConfigIds',title: 'quoteConfigIds',hide: true}
                ,{field: 'quoteGerberName',title: 'quoteGerberName',hide: true}
                ,{field: 'quoteGerberPath',title: 'quoteGerberPath',hide: true}
                ,{field: 'silkScreenBotColor',title: 'silkScreenBotColor',hide: true}
                ,{field: 'solderMaskBotColor',title: 'solderMaskBotColor',hide: true}
                ,{fixed: 'right', title:'操作', toolbar: '#interior_order_Bar', width: 256}
            ]]
            ,done: function (res, curr, count) {
                var data = res.data;    //获取表格所有数据对象
                pcbtabObj = data;
                // 表格固定右侧失效 解决方案
                $('.layui-table-fixed-r').removeClass('layui-hide');
                $("a[data='isOk']").each(function (i, n) {
                    $(this).css({'color':'#00CC66','font-weight':'500'});;
                });
                showPayDetail(0);
            }
        });
    }
    //pcb订单头工具栏事件
    table.on('toolbar(interior_order_Tabpcb)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'okquote':
                var postData = new Array();
                for (var i=0;i<checkStatus.data.length;i++) {
                    postData[i] = {'id': checkStatus.data[i].id,'isInternal':checkStatus.data[i].isInternal,'businessId':checkStatus.data[i].businessId,'totalFee':checkStatus.data[i].totalFee,'orderTime':checkStatus.data[i].orderTime,'exchangeId':checkStatus.data[i].exchangeId,'firstStatus':checkStatus.data[i].firstStatus}
                }
                console.log(postData);
                // return false;
                // var ids = checkStatus.data.map(function(elem){return elem.id}).join(",");
                   layer.confirm('确定提交？', function () {
                       admin.req({
                           type: 'post'
                           ,url: setter.baseUrl+'epc/pcborder/submitInternalOrder'
                           ,contentType: "application/json;charset=utf-8"
                           ,data: JSON.stringify(postData)
                           ,success: function (res) {
                               layer.msg('订单信息修改成功');
                               layui.table.reload('interior_order_Tabpcb');
                           }
                           ,error: function (res) {
                               layer.msg("订单信息修改失败，请稍后再试！");
                           },
                       });
                   });
                break;
            case 'getCheckLength':
                var data = checkStatus.data;
                layer.msg('选中了：'+ data.length + ' 个');
                break;
            case 'isAll':
                layer.msg(checkStatus.isAll ? '全选': '未全选');
                break;
        };
    });
    //监听搜索
    form.on('submit(interior-order-search)', function(data){
        var field = data.field;
        var reTab;
        if (defVal.orderType === 0) {   // PCB
            reTab = 'interior_order_Tabpcb';
        } else if (defVal.orderType === 1) {    //  Stencil
            reTab = 'interior_order_Tabstencil';
        }
        //执行重载
        table.reload(reTab, {
            where: field
        });
    });
    //监听select搜索
    form.on('select(interior-order-search1)', function (data) {
        $("*[lay-filter='interior-order-search']").click();
    });
    form.on('select(interior-order-search2)', function (data) {
        $("*[lay-filter='interior-order-search']").click();
    });
    form.on('select(interior-order-payLogId)', function (data) {
        $("*[lay-filter='interior-order-search']").click();
    });
    $(".interior-order-search input").bind("input propertychange", function (even) {
        $("*[lay-filter='interior-order-search']").click();
    })


    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(interior_order_Tabpcb)', function(obj){
        var data = obj.data;
        if(obj.event == 'edit'){
            admin.popup({
                title: '编辑PCB订单信息'
                ,btn:['立即提交','取消订单', '取消']
                ,area: ['820px', '90%']
                ,yes: function () {
                    $(".submit-ok").click();
                }
                ,btn2: function (index, layero) {
                    layer.confirm('确定取消订单['+data.productNo+']?', function (index) {
                       admin.req({
                           type: 'post',
                           data: {'id':data.id,'status':10},
                           url: setter.baseUrl+'epc/pcborder/update',
                           success: function () {
                               layer.msg("已取消");
                               layui.table.reload('interior_order_Tabpcb');
                           }
                       });
                    });
                }
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderPCB_update', data).done(function () {
                        console.log(data);
                        form.render(null, '');
                        form.on('submit(LAY-pcborder-update-submit)',function (data) {
                            var field = data.field;
                            console.log("提交的字段信息："+JSON.stringify(field));
                            if (field.remark == "" || field.remark == "null") {
                                field.remark = " ";
                            }
                            admin.req({
                                type: 'post'
                                ,url: setter.baseUrl+'epc/pcborder/update'
                                ,data: field
                                ,done: function (res) {
                                    layer.msg('订单信息修改成功');
                                    layui.table.reload('interior_order_Tabpcb');
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
        } else if(obj.event == 'search'){
            layer.msg('PCB订单合同');
            var invoiceNo = data.invoiceNo;
            var userId = data.userId;
            var this_invoiceNo = data.invoiceNo;
            var sameData = new Object();
            var sd_len = 0;
            for(var i=0;i<pcbtabObj.length;i++){
                if (this_invoiceNo == pcbtabObj[i].invoiceNo) {
                    sameData[sd_len] = pcbtabObj[i]
                    sd_len += 1;
                }
            }
            var popupData = {data:{}};
            admin.req({
                type: 'post',
                data: {'contractNo': invoiceNo},
                url: setter.baseUrl+'epc/pcborder/infoByContractNo',
                success: function (data) {
                    var viewName = "marketManagement/iframeWindow/quote_contractB";
                    var productNo = null;
                    var pTotala = 0;
                    var contractType;
                    popupData.data = sameData;
                    for (var i=0;i<data.data.length;i++){
                        pTotala += parseFloat(data.data[i].totalFee);
                    }
                    popupData.total = pTotala;
                    $.each(data, function (idx, obj) {
                        if (productNo == null || productNo == "") {
                            contractType = 1;
                            // productNo = obj.productNo;
                            // viewName = "marketManagement/iframeWindow/quote_contractA";
                        } else if (productNo != null && productNo != obj.productNo) {
                            contractType = 2;
                            // viewName = "marketManagement/iframeWindow/quote_contractB";
                            layer.msg("选择了不同型号");
                        }
                    });
                    admin.req({
                        type: 'get',
                        data: '',
                        url: setter.baseUrl+"sys/consumer/user/info/"+userId,
                        success: function (data) {
                            popupData.userName = data.user.userName;
                            popupData.companyName = data.user.companName;
                            popupData.country = data.user.country;
                            popupData.city = data.user.city;
                            popupData.address = data.user.address;
                            popupData.mobilePhone = data.user.mobilePhone;
                            popupData.postcode = data.user.postcode;
                            popupData.paymentType = data.user.paymentType;
                            popupData.deliveryType = data.user.deliveryType;
                            popupData.contact = data.user.contact;
                            admin.popup({
                                title: '内部合同'
                                ,area: ['100%', '100%']
                                ,btn: ['打印','关闭']
                                ,maxmin: true
                                ,yes:function(index, layero){
                                    var printId;
                                    if (contractType == "1"){
                                        printId = "quoteContract_AllB";
                                    } else if (contractType == "2"){
                                        printId = "quoteContract_AllA";
                                    }
                                    document.body.innerHTML=document.getElementById(printId).innerHTML;
                                    window.print();
                                    window.location.reload();
                                }
                                // btn2: function(index, layero){}
                                ,success: function (layero, index) {
                                    popupData.htmlType = 2;     //页面标识 1为内部合同 主要用于判断头部左侧标题
                                    view(this.id).render(viewName, popupData).done(function () {
                                        console.log(popupData);
                                        productNo = null; // 初始化订单号
                                        // 表格样式设置
                                        if (contractType === 1){
                                            // layui.each遍历的数据，td最少为6条，没有数据的显示空白
                                            var tdSize = $(".contract-module-three-tab tbody tr").eq(0).find("td").size();
                                            var dataLength = popupData.data.length;
                                            var addTrNum;
                                            if (sd_len < 4){
                                                addTrNum = 4;
                                            } else if (dataLength > 4) {
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
                                        } else if (contractType === 2){

                                        }
                                        // 实时时间设置   最新时间显示
                                        var timeArray = [];     // 修改时间
                                        var ctimeArray = [];    // 创建时间
                                        var newEstTime;
                                        if (sameData != null) {
                                            var nullNum = 0;
                                            for (var i=0;i<sd_len;i++) {
                                                timeArray[i] = sameData[i].gmtModified;
                                                ctimeArray[i] = sameData[i].gmtCreate;
                                                if (timeArray[i] == null) {
                                                    nullNum ++;
                                                }
                                            }
                                            if (nullNum == sd_len) {   // 判断 修改时间数组 是否全为null
                                                newEstTime = jstools.TimeContrast(ctimeArray);
                                                console.log(ctimeArray);
                                            } else {
                                                newEstTime = jstools.TimeContrast(timeArray);
                                            }
                                            $("#contractBotDate").text(newEstTime.substring(0,10));
                                            $("#topDate").text(newEstTime.substring(0,10));
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else if(obj.event == 'submit'){
            layer.confirm('确定要提交此订单？', function () {
               admin.req({
                   type: 'post',
                   contentType: "application/json;charset=utf-8",
                   data: JSON.stringify([{'id':data.id,'isInternal':data.isInternal,'businessId':data.businessId,'totalFee':data.totalFee,'orderTime':data.orderTime,'exchangeId':data.exchangeId,'firstStatus':data.firstStatus}]),
                   url: setter.baseUrl+'epc/pcborder/submitInternalOrder',
                   success: function (result) {
                       layer.alert("订单提交成功");
                       table.reload('interior_order_Tabpcb');
                       layer.closeAll();
                   }
               });
            });
        } else if (obj.event == 'del') {
            layer.confirm('真的删除行么', function(index){
                admin.req({
                    type: 'post',
                    data: {'ids': data.id},
                    url: setter.baseUrl+'epc/pcborder/delete',
                    success: function () {
                        layer.alert("删除成功！");
                        obj.del();
                        table.reload('interior_order_Tabpcb');
                    }
                });
                layer.close(index);
            });
        } else if (obj.event == 'detail') {
            console.log(data);
            admin.popup({
                title: '订单id:［'+ data.id + '］-----------'+'订单时间：［'+data.gmtCreate+'］'
                ,area: ['100%', '100%']
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/order_pcb_detail', data).done(function () {

                    })
                }
            })
        } else if (obj.event == 'showProcess') {
            var postData  = {'orderId':data.id,'isInternal':1,'orderType':1};
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

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Stencil 钢网 订单
    function tabRenderStencil() {
        table.render({
            elem: '#interior_order_Tabstencil'
            ,url: setter.baseUrl+'epc/stencilorder/internalOkPay'
            ,toolbar: "#interior_order_optionS"
            ,cellMinWidth: 80
            ,id: "interior_order_Tabstencil"
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
                ,{field: 'productNo', title: '内部型号', width: 130, fixed: 'left'}
                ,{field:'status', title: '状态', templet: '#interiorOrderStatus', width: 117}
                ,{field:'payLogId', title: '支付情况', align:'center',templet: '#interiorPayLogS', width: 117}
                ,{field: 'orderType',title: '订单类型', templet: '#order_type', width: 117}    //1=新单  2=返单    3=返单有改
                ,{field: '',title: '资料下载', templet: '#interiorOrder_downS', width: 107, align: 'center'}    //资料下载
                ,{field: 'gerberName',title: '客户型号', width: 131}
                ,{field: 'invoiceNo',title: '合同号', width: 172}
                ,{field: 'pcbName',title: 'F/N'}
                ,{field: 'orderNo',title: '客户PO'}
                ,{field: 'gmtCreate',title: '创建时间',minWidth: 230}
                ,{field: 'gmtModified',title: '修改时间',minWidth: 230}
                // 型号占位
                ,{field: 'quoteOrderNo',title: '报价单号',minWidth: 130, hide: true}
                ,{field: 'pcbType',title: 'PCB类型',minWidth: 130, hide: true}
                ,{field: 'dimensionsX',title: '单只(X)', hide: true}
                ,{field: 'dimensionsY',title: '单只(Y)', hide: true}
                ,{field: 'panelSizeX',title: 'Panel(X)',width: 90, hide: true}
                ,{field: 'panelSizeY',title: 'Panel(Y)',width: 90, hide: true}
                ,{field: 'panelWayX',title: 'PanelWay(X)',width: 110, hide: true}
                ,{field: 'panelWayY',title: 'PanelWay(Y)',width: 110, hide: true}
                ,{field: 'finishThickness',title: '板厚', hide: true}
                ,{field: 'layerNum',title: '层数',width: 80, hide: true}
                ,{field: 'surfaceFinish',title: '表面处理', hide: true}
                ,{field: 'quantityPcs',title: 'PCS数量', hide: true}
                ,{field: 'quantityPanel',title: 'Panel数量', hide: true}
                ,{field: 'engineeringFee',title: '工程费', hide: true}
                ,{field: 'boardFee',title: '板费', hide: true}
                ,{field: 'testCostFee',title: '测试费', hide: true}
                ,{field: 'toolingFee',title: '工具费', hide: true}
                ,{field: 'overworkFee',title: '加急费', hide: true}
                ,{field: 'postFee',title: '运费', hide: true}
                ,{field: 'subtotal',title: '总价', hide: true}
                ,{field: 'boardType',title: '出货方式', hide: true}    // 1=单只 2=拼板
                // ,{field:'status',fixed: 'left', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110}
                ,{field: 'areaSq',title: '面积', hide: true}
                ,{field: 'material',title: '材料', hide: true}
                ,{field: 'productCode',title: '材料型号', hide: true}
                ,{field: 'productNo',title: '材料商', hide: true}
                ,{field: 'tg',title: 'TG', hide: true}
                ,{field: 'cti',title: 'CTI', hide: true}
                ,{field: 'halogenFree',title: '无卤素', hide: true}
                ,{field: 'outerLayerCopper',title: '外层铜厚', hide: true}
                ,{field: 'innerLayerCopper',title: '内层铜厚', hide: true}
                ,{field: 'heatConductivity',title: '导热系数', hide: true}
                ,{field: 'silkScreenTopColor',title: '字符颜色', hide: true}
                ,{field: 'solderMaskTopColor',title: '阻焊颜色', hide: true}
                ,{field: 'pthCopper',title: '孔铜', hide: true}
                ,{field: 'remark',title: '备注', hide: true}
                ,{field: 'buildTime',title: '交期', hide: true}
                ,{field: 'weight',title: '重量', hide: true}
                ,{field: 'thickness',title: '表面处理厚度', hide: true}
                ,{field: 'surfaceArea',title: '沉金面积', hide: true}
                // ,{field: 'innerMinTrack',title: 'innerMinTrack',hide: true}
                ,{field: 'minHoleSize',title: '最小孔', hide: true}
                ,{field: 'nofHoles',title: '孔数', hide: true}
                ,{field: 'viaProcess',title: '过孔方式', hide: true}
                ,{field: 'stackUp',title: '压合', hide: true}
                ,{field: 'nofCore',title: '芯板数量', hide: true}
                ,{field: 'nofPp',title: 'PP数量', hide: true}
                ,{field: 'innerMinSpacing',title: '内层(线宽/线距)', hide: true}
                ,{field: 'outerMinSpacing',title: '外层最小(线宽/线距)', hide: true}
                ,{field: 'bgaSize',title: 'BGA大小', hide: true}
                // ,{field: 'outerMinTrack',title: 'outerMinTrack',hide: true}
                ,{field: 'testPoinType',title: '测试类型', hide: true}
                ,{field: 'testPoint',title: '测试点', hide: true}
                ,{field: 'testPointType',title: '测试方式', hide: true}
                ,{field: 'userId',title: '用户ID', hide: true}
                ,{field: 'uuid',title: 'uuid', hide: true}
                ,{field: 'panelRoutingPath',title: '锣程', hide: true}
                ,{field: 'bevellingCamfer',title: '斜边', hide: true}
                ,{field: 'blindHoles',title: '盲孔', hide: true}
                ,{field: 'buriedHoles',title: '埋孔', hide: true}
                ,{field: 'carbon',title: '碳油', hide: true}
                ,{field: 'contrlImpeance',title: '阻抗', hide: true}
                ,{field: 'deepMillRouting',title: '控深锣', hide: true}
                ,{field: 'punchingHoles',title: '冲孔数', hide: true}
                ,{field: 'punchingSlots',title: '冲槽数', hide: true}
                ,{field: 'peelable',title: '兰胶', hide: true}
                ,{field: 'peelableBrand',title: '兰胶型号', hide: true}
                // ,{field: 'differentDesign',title: 'differentDesign',hide: true}
                ,{field: 'edgePlated',title: '金属边', hide: true}
                ,{field: 'halfHoleLated',title: '半孔板', hide: true}
                ,{field: 'orderId',title: '订单ID', hide: true}
                ,{field: 'orderNo',title: '订单号', hide: true}
                ,{field: 'invoiceNo',title: '合同号', hide: true}
                ,{field: 'id', title: 'ID',hide:true}
                ,{field: 'userId', title: 'User ID',hide: true}
                ,{field: 'gerberPath',title: 'gerberPath',hide: true}
                ,{field: 'isExistIndicator',title: 'isExistIndicator',hide: true}
                ,{field: 'isExistSmt',title: 'isExistSmt',hide: true}
                ,{field: 'quoteConfigIdList',title: 'quoteConfigIdList',hide: true}
                ,{field: 'quoteConfigIds',title: 'quoteConfigIds',hide: true}
                ,{field: 'quoteGerberName',title: 'quoteGerberName',hide: true}
                ,{field: 'quoteGerberPath',title: 'quoteGerberPath',hide: true}
                ,{field: 'silkScreenBotColor',title: 'silkScreenBotColor',hide: true}
                ,{field: 'solderMaskBotColor',title: 'solderMaskBotColor',hide: true}
                ,{fixed: 'right', title:'操作', toolbar: '#interior_order_BarS', width: 256}
            ]]
            ,done: function (res, curr, count) {
                var data = res.data;    //获取表格所有数据对象
                stenciltabObj = data;
                $("a[data='isOk']").each(function (i, n) {
                    $(this).css({'color':'#00CC66','font-weight':'500'});;
                });
                showPayDetail(1);
            }
        });
    }
    // Stencil 订单头工具栏事件
    table.on('toolbar(interior_order_Tabstencil)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'okquote':
                var postData = new Array();
                for (var i=0;i<checkStatus.data.length;i++) {
                    postData[i] = {'id': checkStatus.data[i].id,'isInternal':checkStatus.data[i].isInternal,'businessId':checkStatus.data[i].businessId,'totalStencilFee':checkStatus.data[i].totalStencilFee,'orderTime':checkStatus.data[i].orderTime,'exchangeId':checkStatus.data[i].exchangeId,'firstStatus':checkStatus.data[i].firstStatus}
                }
                console.log(postData);
                // var contractNos = checkStatus.data.map(function(elem){return elem.invoiceNo}).join(",");
                layer.confirm('确定提交？', function () {
                    admin.req({
                        type: 'post'
                        ,url: setter.baseUrl+'epc/stencilorder/submitInternalOrder'
                        ,contentType: "application/json;charset=utf-8"
                        ,data: JSON.stringify(postData)
                        ,success: function (res) {
                            layer.msg('订单信息修改成功');
                            layui.table.reload('interior_order_Tabstencil');
                        }
                        ,error: function (res) {
                            layer.msg("订单信息修改失败，请稍后再试！");
                        },
                    });
                });
                break;
        };
    });
    //监听行工具事件＝＝＝＝》Stencil 钢网 订单
    table.on('tool(interior_order_Tabstencil)', function(obj){
        var data = obj.data;
        if(obj.event == 'edit'){
            admin.popup({
                title: '编辑Stencil 钢网订单信息'
                , area: ['885px', '550px']
                , btn: ['立即提交','取消订单','取消']
                , yes: function () {
                    $(".submitStencilUpB").click();
                    table.reload('interior_order_Tabstencil');
                }
                ,btn2: function (index, layero) {
                    layer.confirm('确定取消订单['+data.productNo+']?', function (index) {
                       admin.req({
                           type: 'post',
                           data: {'id':data.id,'status':10},
                           url: setter.baseUrl+'epc/stencilorder/update',
                           success: function () {
                               layer.msg("已取消");
                               layui.table.reload('interior_order_Tabstencil');
                           }
                       });
                    });
                }
                , success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderStencil_updateB', data).done(function () {

                    });
                }
            });
        } else if(obj.event == 'search'){
            layer.msg('钢网合同查看');
            var invoiceNo = data.invoiceNo;
            var this_invoiceNo = data.invoiceNo;
            var userId = data.userId;
            var sameData = new Object();
            var sd_len = 0;
            for(var i=0;i<stenciltabObj.length;i++){
                if (this_invoiceNo == stenciltabObj[i].invoiceNo) {
                    sameData[sd_len] = stenciltabObj[i]
                    sd_len += 1;
                }
            }
            var popupData = {data:{}};
            admin.req({
                type: 'post',
                data: {'contractNo': invoiceNo},
                url: setter.baseUrl+'epc/stencilorder/infoByContractNo',
                success: function (data) {
                    var viewName = "marketManagement/iframeWindow/quote_contractS";
                    var productNo = null;
                    var pTotala = 0;
                    var contractType;
                    popupData.data = sameData;
                    for (var i=0;i<data.data.length;i++){
                        pTotala += parseFloat(data.data[i].totalStencilFee);
                    }
                    popupData.total = pTotala;
                    $.each(data, function (idx, obj) {
                        if (productNo == null || productNo == "") {
                            contractType = 1;
                        } else if (productNo != null && productNo != obj.productNo) {
                            contractType = 2;
                        }
                    });
                    admin.req({
                        type: 'get',
                        data: '',
                        url: setter.baseUrl+"sys/consumer/user/info/"+userId,
                        success: function (data) {
                            popupData.userName = data.user.userName;
                            popupData.companyName = data.user.companName;
                            popupData.country = data.user.country;
                            popupData.city = data.user.city;
                            popupData.address = data.user.address;
                            popupData.mobilePhone = data.user.mobilePhone;
                            popupData.postcode = data.user.postcode;
                            popupData.paymentType = data.user.paymentType;
                            popupData.deliveryType = data.user.deliveryType;
                            popupData.contact = data.user.contact;
                            admin.popup({
                                title: '内部合同'
                                ,area: ['100%', '100%']
                                ,btn: ['打印','关闭']
                                ,maxmin: true
                                ,yes:function(index, layero){
                                    var printId = "quoteContract_AllS";
                                    document.body.innerHTML=document.getElementById(printId).innerHTML;
                                    window.print();
                                    window.location.reload();
                                }
                                // btn2: function(index, layero){}
                                ,success: function (layero, index) {
                                    popupData.htmlType = 2;     //页面标识 1为内部合同 主要用于判断头部左侧标题
                                    console.log(popupData);
                                    view(this.id).render(viewName, popupData).done(function () {
                                        productNo = null; // 初始化订单号
                                        // 实时时间设置   最新时间显示
                                        var timeArray = [];     // 修改时间
                                        var ctimeArray = [];    // 创建时间
                                        var newEstTime;
                                        if ( sameData != null) {
                                            var nullNum = 0;
                                            for (var i=0;i<sd_len;i++) {
                                                timeArray[i] =  sameData[i].gmtModified;
                                                ctimeArray[i] = sameData[i].gmtCreate;
                                                if (timeArray[i] == null) {
                                                    nullNum ++;
                                                }
                                            }
                                            if (nullNum == sd_len) {   // 判断 修改时间数组 是否全为null
                                                newEstTime = jstools.TimeContrast(ctimeArray);
                                                console.log(ctimeArray);
                                            } else {
                                                newEstTime = jstools.TimeContrast(timeArray);
                                            }
                                            $("#contractBotDateS").text(newEstTime.substring(0,10));
                                            $("#topDate").text(newEstTime.substring(0,10));
                                        }
                                    });
                                }
                            });
                        }
                    });

                }
            });
        } else if(obj.event == 'submit'){
            layer.confirm('确定要提交此订单？', function () {
                admin.req({
                    type: 'post',
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify([{'id':data.id,'isInternal':data.isInternal,'businessId':data.businessId,'totalStencilFee':data.totalStencilFee,'orderTime':data.orderTime,'exchangeId':data.exchangeId,'firstStatus':data.firstStatus}]),
                    url: setter.baseUrl+'epc/stencilorder/submitInternalOrder',
                    success: function (result) {
                        layer.alert("订单提交成功");
                        table.reload('interior_order_Tabstencil');
                        layer.closeAll();
                    }
                });
            });
        } else if (obj.event == 'del') {
            layer.confirm('真的删除行么', function(index){
                admin.req({
                    type: 'post',
                    data: {'ids': data.id},
                    url: setter.baseUrl+'epc/stencilorder/delete',
                    success: function () {
                        layer.alert("删除成功！");
                        obj.del();
                        table.reload('interior_order_Tabstencil');
                    }
                });
                layer.close(index);
            });
        } else if (obj.event == 'detail') {
            admin.popup({
                title: '订单号［'+data.productNo+']---'+'订单时间［'+data.gmtCreate+'］'
                ,area: ['837px', '373px']
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/order_stencil_detail', data).done(function () {
                    })
                }

            })
        } else if (obj.event == 'showProcess') {
            var postData  = {'orderId':data.id,'isInternal':1,'orderType':2};
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

    function showPayDetail (data) {
        var mainDom;
        console.log("data:"+data)
        if (data === 0) {
            mainDom = ".isPcbDonePay";
        } else if (data === 1) {
            mainDom = ".isStencilDonePay";
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
                }
            });
            layer.tips('付款Email：'+resData.payerEmail+'</br>交易金额：'+resData.mcGross+'</br>PayPal手续费：'+resData.paymentFee+'</br>总净额：'+resData.totalNet+'</br>付款时间：'+resData.paymentDate, '#'+$(this).attr('id'), {
                tips: [1, '#0c0c0cab']
            });
        });
    }


    exports('market_interiorOrder', {});
});
