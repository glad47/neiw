/**

 @Name:    市场管理－－［内部报价明细］

 */


layui.define(['admin','table','index','element','form','laydate', 'jsTools','uploadCommon', 'filePathProcess'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        // ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element;
        var $ = layui.jquery;
        var jstools = layui.jsTools;
        var uploadCommon = layui.uploadCommon;
        var filePathProcess = layui.filePathProcess;

    form.render(null,'market-internal-quote-formlist');

    tabRenderPCB();

    // 全局变量
    var defVal = {
        orderType: 0,   //订单类型
        customerSn: null, //客户编号 如：a11
        canOpenView: false, //是否可以打开合同弹出页
    };

    // 监听tab选项卡
    element.on('tab(internal-quote-tabs-brief)', function (data) {
        defVal.orderType = data.index;
        var tabNum = data.index;
        if (tabNum === 0) {
            tabRenderPCB();
        }  else if (tabNum === 1){
            tabRenderStencil();
        } else if (tabNum === 2){
            tabRenderAssembly();
        }
    });

    //监听搜搜
    form.on('submit(LAY-app-internal-quote-search)', function (data) {
        var field = data.field;
        var tabNum = defVal.orderType;
        if (tabNum === 0) {   // PCB
            reTab = 'iquote_Tabpcb';
        } else if (tabNum === 1) {    //  Stencil
            reTab = 'iquote_Tabstencil';
        } else if(tabNum === 2){
            reTab = 'smt_orderTab_ok_payment'; //assembly
        }
        table.reload(reTab,{
            where: field
        });
    });

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ PCB订单
    function tabRenderPCB() {
        table.render({
            elem: '#iquote_Tabpcb'
            ,url: setter.baseUrl+'/epc/pcborder/internalQuoteList'
            ,toolbar: "#tbiquotePcb"
            ,cellMinWidth: 80
            ,id: "iquote_Tabpcb"
            ,page: true
            ,parseData: function (res) {
                
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,cols: [[
                {type:'checkbox',fixed: 'left'}
                ,{field: 'productNo', title: '内部编码',width: 135,fixed: 'left', sort: true}
                ,{field: 'orderType',title: '订单类型', Width: 110, templet: '#order_type', sort: true}    //1=新单  2=返单    3=返单有改
                ,{field: 'pcbName',title: '文件名',width: 130, sort: true}
                ,{field: 'orderNo',title: '客户PO', sort: true}
                ,{field: 'quoteOrderNo',title: '报价单号',width: 130, sort: true}
                ,{field: 'gmtCreate',title: '创建时间', sort: true}
                ,{field: 'gmtModified',title: '修改时间', sort: true}
                // 型号占位
                ,{field: 'gerberName',title: '文件名',minWidth: 160, hide: true}
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
                ,{field:'status', title: '状态', align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110,hide: true}
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
                ,{field: 'status',title: '状态', hide: true}
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
                ,{fixed: 'right', title:'操作', toolbar: '#iqpcbBar', width:180}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }

    //pcb订单头工具栏事件
    table.on('toolbar(iquote_Tabpcb)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'getCheckData':
                var tabdata = {data:{}};
                tabdata.data = checkStatus.data;
                // 给对象进行排序
                tabdata.data = tabdata.data.sort(compare('quantityPcs'));
                // productNo = tabdata[0].productNo;   //给订单编号赋值
                defVal.customerSn = tabdata.data[0].productNo.substring(0,3);
                var userData = {
                    userName: '',
                    companyName: '',
                    country: '',
                    city: '',
                    address: ''
                };
                tabdata.tabType = defVal.orderType;
                var checkedLength = tabdata.data.length;
                var productNo;
                var viewName;
                var contractType = 2;
                var contractTotal = 0;
                var qidsPost;
                var isExistPcbA;
                $.each(tabdata.data, function (idx, obj) {
                    contractTotal = parseFloat(contractTotal+obj.totalFee);
                    tabdata.total = contractTotal;
                    if (qidsPost == null){
                        qidsPost = obj.id;
                    } else {
                        qidsPost += ","+obj.id;
                    }
                    if(obj.pcbaSubtotalFee != null && obj.pcbaSubtotalFee != 0){
                        isExistPcbA = true;
                    }else{
                        isExistPcbA = false;
                    }
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
                    if (defVal.customerSn != null && defVal.customerSn != obj.productNo.substring(0,3)) {
                        layer.alert("请选择同一个客户的订单！");
                        defVal.customerSn = null;   //初始化客户编号 如a11
                        defVal.canOpenView = false;
                        return false;
                    }
                });
                tabdata.isExistPcbA = isExistPcbA; 
                if (defVal.canOpenView == true) {
                    // 获取地址，公司名
                    admin.req({
                        type: 'get',
                        data: '',
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
                            tabdata.isMilitaryProject = data.user.isMilitaryProject;
                            admin.popup({
                                title: '报价合同'
                                ,area: ['100%', '100%']
                                ,maxmin: true
                                ,btn: ['提交','打印', '取消']
                                ,yes:function(index, layero){
                                    layer.confirm('确定提交此订单合同？', function (index) {
                                        admin.req({
                                            type: 'post',
                                            data: {'qids':qidsPost,'cid':tabdata.data[0].userId},
                                            url: setter.baseUrl+"epc/pcborder/createQuoteOrderNo",    //3-7 之前的版本 epc/pcborder/createContractNo
                                            success: function (data) {
                                                if (data.code != "444"){
                                                    layer.alert("合同提交成功！");
                                                    layui.table.reload('iquote_Tabpcb');
                                                    layer.closeAll();
                                                }
                                            }
                                        });

                                    });
                                }, btn2: function(index, layero){
                                    var printId;
                                    if (contractType == "1"){
                                        printId = "quoteContract_AllA";
                                    } else if (contractType == "2"){
                                        printId = "quoteContract_AllB";
                                    }
                                    document.body.innerHTML=document.getElementById(printId).innerHTML;
                                    window.print();
                                    window.location.reload();
                                }
                                ,success: function (layero, index) {
                                    tabdata.htmlType = 1;     //页面标识 0为报价明细合同 主要用于判断头部左侧标题
                                    view(this.id).render(viewName, tabdata).done(function () {
                                        productNo = null; // 初始化订单号
                                        defVal.customerSn = null;   //初始化客户编号 如a11
                                        // console.log(tabdata);
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
                                        } else if (contractType === 2){

                                        }
                                        // 实时时间设置   最新时间显示
                                        var timeArray = [];     // 修改时间
                                        var ctimeArray = [];    // 创建时间
                                        var newEstTime;
                                        if ( checkStatus.data != null) {
                                            var nullNum = 0;
                                            for (var i=0;i< checkStatus.data.length;i++) {
                                                timeArray[i] =  checkStatus.data[i].gmtModified;
                                                ctimeArray[i] = checkStatus.data[i].gmtCreate;
                                                if (timeArray[i] == null) {
                                                    nullNum ++;
                                                }
                                            }
                                            if (nullNum == checkStatus.data.length) {   // 判断 修改时间数组 是否全为null
                                                newEstTime = jstools.TimeContrast(ctimeArray);
                                                // console.log(ctimeArray);
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
                break;
            case 'getCheckLength':
                var data = checkStatus.data;
                layer.msg('选中了：'+ data.length + ' 个');
                break;
            case 'isAll':
                layer.msg(checkStatus.isAll ? '全选': '未全选');
                break;
            case 'batchDelP':
                if (checkStatus.data.length < 1) {
                    layer.msg('请选择一条数据');
                    return false;
                }
                var ids = checkStatus.data.map(function(elem){return elem.id}).join(",");
                // console.log(ids);
                layer.confirm('确认批量删除?', function(index){
                    admin.req({
                        type: 'post',
                        data: {ids:ids},
                        url: setter.baseUrl+'epc/pcborder/batchDelete',
                        success: function (data) {
                            if (data.code == '0'){
                                layer.alert("删除成功！！");
                                table.reload('iquote_Tabpcb');
                                layer.close(index);
                            }
                        }
                    });
                });
                break;

        };
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(iquote_Tabpcb)', function(obj){
        var data = obj.data;
        if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                admin.req({
                    type: 'post',
                    data: {'ids':data.id},
                    url: setter.baseUrl+ '/epc/pcborder/delete',
                    success: function () {
                        layer.alert("删除成功！");
                    }
                });
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            data.tabId = "iquote_Tabpcb";
            admin.popup({
                title: '编辑PCB订单信息'
                ,area: ['820px', '90%']
                ,btn:['立即提交', '取消']
                ,yes: function () {
                    $(".submit-ok").click();
                    // layui.table.reload('epc_Tabpcb_ok_payment_order');
                }
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderPCB_update', data).done(function () {
                        form.render(null, '');
                    });
                }
            });
        } else if (obj.event == 'internal_quote_fileMana') {
            data.orderType = "pcbOrder";        // 根据orderType  发送不同的接口
            data.retab = "iquote_Tabpcb";
            data = filePathProcess.isInternal(data);
            // console.log(data);
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


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Stencil订单
    function tabRenderStencil() {
        table.render({
            elem: '#iquote_Tabstencil'
            ,url: setter.baseUrl+'epc/stencilorder/internalQuoteList'
            ,toolbar: "#tbiquoteStencil"
            ,cellMinWidth: 80
            ,id: "iquote_Tabstencil"
            ,page: true
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,cols: [[
                {type:'checkbox'}
                ,{field: 'orderType',title: '订单类型', width: 110, templet: '#order_type', sort: true}    //1=新单  2=返单    3=返单有改
                ,{field: 'productNo', title: '内部编码',width: 135, sort: true}
                ,{field: 'pcbName',title: '文件名',width: 130, sort: true}
                ,{field: 'orderNo',title: '客户PO', sort: true}
                ,{field: 'quoteOrderNo',title: '报价单号',width: 130, sort: true}
                ,{field: 'gmtCreate',title: '创建时间', sort: true}
                ,{field: 'gmtModified',title: '修改时间', sort: true}
                // 型号占位
                ,{field: 'gerberName',title: '文件名',minWidth: 160, hide: true}
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
                ,{field:'status', title: '状态', align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110,hide: true}
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
                ,{field: 'status',title: '状态', hide: true}
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
                ,{fixed: 'right', title:'操作', toolbar: '#iqpcbBar', width:180}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }
    //监听行工具事件＝＝＝＝》 Stencil 钢网订单
    table.on('tool(iquote_Tabstencil)', function(obj){
        var data = obj.data;
        // console.log(data)
        if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                admin.req({
                    type: 'post',
                    data: {'ids':data.id},
                    url: setter.baseUrl+ 'epc/stencilorder/delete',
                    success: function () {
                        layer.alert("删除成功！");
                    }
                });
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            admin.popup({
                title: '编辑Stencil订单信息'
                ,area: ['885px', '550px']
                ,btn:['立即提交', '取消']
                ,yes: function () {
                    $(".submitStencilUpB").click();
                    table.reload('iquote_Tabstencil');
                }
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderStencil_updateB', data).done(function () {

                    });
                }
            });
        } else if (obj.event == 'internal_quote_fileMana') {
            data.orderType = "stencilOrder";        // 根据orderType  发送不同的接口
            data.retab = "iquote_Tabstencil";
            // 测试代码
            data = filePathProcess.isInternal(data);
            // console.log(data);
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
        }
    });

    // Stencil 钢网 订单头工具栏事件
    table.on('toolbar(iquote_Tabstencil)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'getCheckData':
                var tabdata = {data:{}};
                tabdata.data = checkStatus.data;
                // 给对象进行排序
                tabdata.data = tabdata.data.sort(compare('quantityPcs'));
                // productNo = tabdata[0].productNo;   //给订单编号赋值
                defVal.customerSn = tabdata.data[0].productNo.substring(0,3);
                var userData = {
                    userName: '',
                    companyName: '',
                    country: '',
                    city: '',
                    address: ''
                };
                tabdata.tabType = defVal.orderType;
                var checkedLength = tabdata.data.length;
                var productNo;
                var viewName = "marketManagement/iframeWindow/quote_contractS";
                var contractType = 2;
                var contractTotal = 0;
                var qidsPost;
                $.each(tabdata.data, function (idx, obj) {
                    contractTotal = parseFloat(contractTotal+obj.totalStencilFee);
                    tabdata.total = contractTotal;
                    if (qidsPost == null){
                        qidsPost = obj.id;
                    } else {
                        qidsPost += ","+obj.id;
                    }
                    if (defVal.customerSn != null && defVal.customerSn != obj.productNo.substring(0,3)) {
                        layer.alert("请选择同一个客户的订单！");
                        defVal.customerSn = null;   //初始化客户编号 如a11
                        defVal.canOpenView = false;
                        return false;
                    } else {
                        defVal.canOpenView = true;
                    }
                });
                if (defVal.canOpenView == true) {
                    // 获取地址，公司名
                    admin.req({
                        type: 'get',
                        data: '',
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
                                ,btn: ['提交','打印', '取消']
                                ,yes:function(index, layero){
                                    layer.confirm('确定提交此订单合同？', function (index) {
                                        admin.req({
                                            type: 'post',
                                            data: {'sids':qidsPost,'cid':tabdata.data[0].userId},
                                            url: setter.baseUrl+"epc/stencilorder/createQuoteOrderNo",    //3-7 之前的版本 epc/pcborder/createContractNo
                                            success: function (data) {
                                                if (data.code != "444"){
                                                    layer.alert("合同提交成功！");
                                                    var trigger = setTimeout(function () {
                                                        layui.table.reload('iquote_Tabstencil');
                                                        layer.closeAll();
                                                    },1500)
                                                }
                                            }
                                        });

                                    });
                                }, btn2: function(index, layero){
                                    var printId = "quoteContract_AllS";
                                    document.body.innerHTML=document.getElementById(printId).innerHTML;
                                    window.print();
                                    window.location.reload();
                                }
                                ,success: function (layero, index) {
                                    tabdata.htmlType = 1;     //页面标识 0为报价明细合同 主要用于判断头部左侧标题
                                    view(this.id).render(viewName, tabdata).done(function () {
                                        // console.log(tabdata);
                                        productNo = null; // 初始化订单号
                                        defVal.customerSn = null;   //初始化客户编号 如a11
                                    });
                                }
                            });
                        }
                    });
                }
                break;
            case 'getCheckLength':
                var data = checkStatus.data;
                layer.msg('选中了：'+ data.length + ' 个');
                break;
            case 'isAll':
                layer.msg(checkStatus.isAll ? '全选': '未全选');
                break;
            case 'batchDelS':
                if (checkStatus.data.length < 1) {
                    layer.msg('请选择一条数据');
                    return false;
                }
                var ids = checkStatus.data.map(function(elem){return elem.id}).join(",");
                // console.log(ids);
                layer.confirm('确认批量删除?', function(index){
                    admin.req({
                        type: 'post',
                        data: {ids:ids},
                        url: setter.baseUrl+'epc/stencilorder/batchDelete',
                        success: function (data) {
                            if (data.code == '0'){
                                layer.alert("删除成功！！");
                                table.reload('iquote_Tabstencil');
                                layer.close(index);
                            }
                        }
                    });
                });
                break;
        };
    });

    // 排序方法
    function compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    }

    exports('market_internalQuote', {});
});
