/**

 @Name:    市场管理－－［内部合同］

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

    tabRenderPCB();
    // 全局变量
    var defVal = {
        orderType: 0,   //订单类型
        customerSn: null, //客户编号 如：a11
    };
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
            elem: '#inside_no_payment_Tabpcb'
            ,url: setter.baseUrl+'/epc/pcborder/internalNoPay'
            ,toolbar: "#inside_no_payment_option"
            ,cellMinWidth: 80
            ,id: "inside_no_payment_Tabpcb"
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
                ,{field: 'orderType',title: '订单类型',edit: 'text', Width: 110, templet: '#order_type'}    //1=新单  2=返单    3=返单有改
                ,{field: 'productNo', title: '内部编码',minWidth: 130}
                ,{field: 'gerberName',title: '文件名',edit: 'text',minWidth: 160}
                ,{field: 'pcbName',title: 'F/N',edit: 'text',minWidth: 130}
                ,{field: 'orderNo',title: '客户PO',edit: 'text'}
                ,{field: 'invoiceNo',title: '合同单号',edit: 'text',minWidth: 130}
                ,{field: 'gmtCreate',title: '创建时间',edit: 'text'}
                ,{field: 'gmtModified',title: '修改时间',edit: 'text'}
                // 型号占位
                ,{field: 'quoteOrderNo',title: '报价单号',edit: 'text',minWidth: 130, hide: true}
                ,{field: 'pcbType',title: 'PCB类型',edit: 'text',minWidth: 130, hide: true}
                ,{field: 'dimensionsX',title: '单只(X)',edit: 'text', hide: true}
                ,{field: 'dimensionsY',title: '单只(Y)',edit: 'text', hide: true}
                ,{field: 'panelSizeX',title: 'Panel(X)',edit: 'text',width: 90, hide: true}
                ,{field: 'panelSizeY',title: 'Panel(Y)',edit: 'text',width: 90, hide: true}
                ,{field: 'panelWayX',title: 'PanelWay(X)',edit: 'text',width: 110, hide: true}
                ,{field: 'panelWayY',title: 'PanelWay(Y)',edit: 'text',width: 110, hide: true}
                ,{field: 'finishThickness',title: '板厚',edit: 'text', hide: true}
                ,{field: 'layerNum',title: '层数',edit: 'text',width: 80, hide: true}
                ,{field: 'surfaceFinish',title: '表面处理',edit: 'text', hide: true}
                ,{field: 'quantityPcs',title: 'PCS数量',edit: 'text', hide: true}
                ,{field: 'quantityPanel',title: 'Panel数量',edit: 'text', hide: true}
                ,{field: 'engineeringFee',title: '工程费',edit: 'text', hide: true}
                ,{field: 'boardFee',title: '板费',edit: 'text', hide: true}
                ,{field: 'testCostFee',title: '测试费',edit: 'text', hide: true}
                ,{field: 'toolingFee',title: '工具费',edit: 'text', hide: true}
                ,{field: 'overworkFee',title: '加急费',edit: 'text', hide: true}
                ,{field: 'postFee',title: '运费',edit: 'text', hide: true}
                ,{field: 'subtotal',title: '总价',edit: 'text', hide: true}
                ,{field: 'boardType',title: '出货方式',edit: 'text', hide: true}    // 1=单只 2=拼板
                // ,{field:'status',fixed: 'left', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110}
                ,{field:'status', title: '状态', align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110,hide: true}
                ,{field: 'areaSq',title: '面积',edit: 'text', hide: true}
                ,{field: 'material',title: '材料',edit: 'text', hide: true}
                ,{field: 'productCode',title: '材料型号',edit: 'text', hide: true}
                ,{field: 'productNo',title: '材料商',edit: 'text', hide: true}
                ,{field: 'tg',title: 'TG',edit: 'text', hide: true}
                ,{field: 'cti',title: 'CTI',edit: 'text', hide: true}
                ,{field: 'halogenFree',title: '无卤素',edit: 'text', hide: true}
                ,{field: 'outerLayerCopper',title: '外层铜厚',edit: 'text', hide: true}
                ,{field: 'innerLayerCopper',title: '内层铜厚',edit: 'text', hide: true}
                ,{field: 'heatConductivity',title: '导热系数',edit: 'text', hide: true}
                ,{field: 'silkScreenTopColor',title: '字符颜色',edit: 'text', hide: true}
                ,{field: 'solderMaskTopColor',title: '阻焊颜色',edit: 'text', hide: true}
                ,{field: 'pthCopper',title: '孔铜',edit: 'text', hide: true}
                ,{field: 'remark',title: '备注',edit: 'text', hide: true}
                ,{field: 'buildTime',title: '交期',edit: 'text', hide: true}
                ,{field: 'weight',title: '重量',edit: 'text', hide: true}
                ,{field: 'thickness',title: '表面处理厚度',edit: 'text', hide: true}
                ,{field: 'surfaceArea',title: '沉金面积',edit: 'text', hide: true}
                // ,{field: 'innerMinTrack',title: 'innerMinTrack',edit: 'text',hide: true}
                ,{field: 'minHoleSize',title: '最小孔',edit: 'text', hide: true}
                ,{field: 'nofHoles',title: '孔数',edit: 'text', hide: true}
                ,{field: 'viaProcess',title: '过孔方式',edit: 'text', hide: true}
                ,{field: 'stackUp',title: '压合',edit: 'text', hide: true}
                ,{field: 'status',title: '状态',edit: 'text', hide: true}
                ,{field: 'nofCore',title: '芯板数量',edit: 'text', hide: true}
                ,{field: 'nofPp',title: 'PP数量',edit: 'text', hide: true}
                ,{field: 'innerMinSpacing',title: '内层(线宽/线距)',edit: 'text', hide: true}
                ,{field: 'outerMinSpacing',title: '外层最小(线宽/线距)',edit: 'text', hide: true}
                ,{field: 'bgaSize',title: 'BGA大小',edit: 'text', hide: true}
                // ,{field: 'outerMinTrack',title: 'outerMinTrack',edit: 'text',hide: true}
                ,{field: 'testPoinType',title: '测试类型',edit: 'text', hide: true}
                ,{field: 'testPoint',title: '测试点',edit: 'text', hide: true}
                ,{field: 'testPointType',title: '测试方式',edit: 'text', hide: true}
                ,{field: 'userId',title: '用户ID',edit: 'text', hide: true}
                ,{field: 'uuid',title: 'uuid',edit: 'text', hide: true}
                ,{field: 'panelRoutingPath',title: '锣程',edit: 'text', hide: true}
                ,{field: 'bevellingCamfer',title: '斜边',edit: 'text', hide: true}
                ,{field: 'blindHoles',title: '盲孔',edit: 'text', hide: true}
                ,{field: 'buriedHoles',title: '埋孔',edit: 'text', hide: true}
                ,{field: 'carbon',title: '碳油',edit: 'text', hide: true}
                ,{field: 'contrlImpeance',title: '阻抗',edit: 'text', hide: true}
                ,{field: 'deepMillRouting',title: '控深锣',edit: 'text', hide: true}
                ,{field: 'punchingHoles',title: '冲孔数',edit: 'text', hide: true}
                ,{field: 'punchingSlots',title: '冲槽数',edit: 'text', hide: true}
                ,{field: 'peelable',title: '兰胶',edit: 'text', hide: true}
                ,{field: 'peelableBrand',title: '兰胶型号',edit: 'text', hide: true}
                // ,{field: 'differentDesign',title: 'differentDesign',edit: 'text',hide: true}
                ,{field: 'edgePlated',title: '金属边',edit: 'text', hide: true}
                ,{field: 'halfHoleLated',title: '半孔板',edit: 'text', hide: true}
                ,{field: 'orderId',title: '订单ID',edit: 'text', hide: true}
                ,{field: 'orderNo',title: '订单号',edit: 'text', hide: true}
                ,{field: 'invoiceNo',title: '合同号',edit: 'text', hide: true}
                ,{field: 'id', title: 'ID',hide:true}
                ,{field: 'userId', title: 'User ID',hide: true}
                ,{field: 'gerberPath',title: 'gerberPath',edit: 'text',hide: true}
                ,{field: 'isExistIndicator',title: 'isExistIndicator',edit: 'text',hide: true}
                ,{field: 'isExistSmt',title: 'isExistSmt',edit: 'text',hide: true}
                ,{field: 'quoteConfigIdList',title: 'quoteConfigIdList',edit: 'text',hide: true}
                ,{field: 'quoteConfigIds',title: 'quoteConfigIds',edit: 'text',hide: true}
                ,{field: 'quoteGerberName',title: 'quoteGerberName',edit: 'text',hide: true}
                ,{field: 'quoteGerberPath',title: 'quoteGerberPath',edit: 'text',hide: true}
                ,{field: 'silkScreenBotColor',title: 'silkScreenBotColor',edit: 'text',hide: true}
                ,{field: 'solderMaskBotColor',title: 'solderMaskBotColor',edit: 'text',hide: true}
                ,{fixed: 'right', title:'操作', toolbar: '#inside_no_payment_Bar', width:180}
            ]]
            ,done: function (res, curr, count) {
                var data = res.data;    //获取表格所有数据对象
                pcbtabObj = data;
            }
        });
    }
    //pcb订单头工具栏事件
    table.on('toolbar(inside_no_payment_Tabpcb)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'confirmCheckData':
                var contractNos = null;
                for (var i=0;i<checkStatus.data.length;i++){
                    if (contractNos == null){
                        contractNos =  checkStatus.data[i].invoiceNo
                    } else if (contractNos != null && contractNos.indexOf(checkStatus.data[i].invoiceNo) == "-1") {
                        contractNos += ","+checkStatus.data[i].invoiceNo;
                    }
                }
                layer.confirm('确定提交['+contractNos+']', function () {
                    admin.req({
                        type: 'post',
                        data: {'contractNos':contractNos},
                        url: setter.baseUrl+'epc/pcborder/confirmQuoteInInternalNoPay',
                        success: function () {
                            layer.alert("提交成功！");
                            table.reload('inside_no_payment_Tabpcb');
                        }
                    });
                    layer.closeAll();
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
    form.on('submit(nopayment-search)', function(data){
        var field = data.field;
        console.log(field);
        //执行重载
        table.reload('inside_no_payment_Tabpcb', {
            where: field
        });
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(inside_no_payment_Tabpcb)', function(obj){
        var data = obj.data;
        var lineData = data;
        var this_quoteOrderNo = data.quoteOrderNo;
        var sameData = new Object();
        var sd_len = 0;
        var pTotala = 0;
        for(var i=0;i<pcbtabObj.length;i++){
            if (this_quoteOrderNo == pcbtabObj[i].quoteOrderNo) {
                console.log('sd_len:'+sd_len);
                sameData[sd_len] = pcbtabObj[i]
                sd_len += 1;
                pTotala += pcbtabObj[i].totalFee;
            }
            console.log('pcbtabObj[i].invoiceNo:'+pcbtabObj[i].quoteOrderNo);
        }
        var quoteOrderNo = data.quoteOrderNo;
        //console.log(obj)
        if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                admin.req({
                   type: 'post',
                   data: {'ids': data.id},
                   url: setter.baseUrl+'epc/pcborder/delete',
                    success: function () {
                        layer.alert("删除成功！");
                        obj.del();
                        table.reload('inside_no_payment_Tabpcb');
                    }
                });
                layer.close(index);
            });
        } else if(obj.event == 'edit') {
            admin.popup({
                title: '编辑PCB订单信息'
                , area: ['76%', '90%']
                , btn: ['立即提交', '取消']
                , yes: function () {
                    $(".submit-ok").click();
                    layer.msg('yes');
                }
                , success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderPCB_update', data).done(function () {
                        form.render(null, '');
                        form.on('submit(LAY-pcborder-update-submit)', function (data) {
                            var field = data.field;
                            console.log("提交的字段信息：" + JSON.stringify(field));
                            admin.req({
                                type: 'post'
                                , url: setter.baseUrl + 'epc/pcborder/update'
                                , data: field
                                , done: function (res) {
                                    layer.msg('订单信息修改成功');
                                }
                                , fail: function (res) {
                                    layer.msg("订单信息修改失败，请稍后再试！");
                                },
                            });
                            table.reload('inside_no_payment_Tabpcb');
                            layer.close(index);
                            return false;
                        });
                    });
                }
            });
        } else if (obj.event == 'search') {
            var popupData = {data:{}};
            /**
             * 获取用户信息  回填到合同上
             */
            admin.req({
                type: 'get',
                data: '',
                url: setter.baseUrl+"sys/consumer/user/info/"+data.userId,
                success: function (data) {
                    popupData.userName = data.user.userName;
                    popupData.companyName = data.user.companName;
                    popupData.country = data.user.country;
                    popupData.city = data.user.city;
                    popupData.address = data.user.address;
                    admin.req({
                        type: 'post',
                        data: {'quoteOrderNo': quoteOrderNo},
                        url: setter.baseUrl+'epc/pcborder/infoByQuoteOrderNo', //3-7之前的版本 epc/pcborder/infoByContractNo
                        success: function (data) {
                            var viewName = "marketManagement/iframeWindow/quote_contractB";
                            var productNo = null;
                            var contractType;
                            popupData.data = sameData;
                            popupData.total = pTotala;
                            console.log(popupData);
                            // console.log = popupData.sort(compare('quantityPcs'));
                            $.each(data.data, function (idx, obj) {
                                if (productNo == null || productNo == "") {
                                    contractType = 1;
                                    productNo = obj.productNo;
                                } else if (productNo != null && productNo != obj.productNo) {
                                    contractType = 2;
                                    layer.msg("选择了不同型号");
                                }
                            });
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
                                    layer.alert(printId);
                                    document.body.innerHTML=document.getElementById(printId).innerHTML;
                                    window.print();
                                    window.location.reload();
                                }
                                // btn2: function(index, layero){}
                                ,success: function (layero, index) {
                                    popupData.htmlType = 2;     //页面标识 1为内部合同 主要用于判断头部左侧标题
                                    console.log(popupData);
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
                                            } else if (sd_len > 4) {
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
                                            for (var i=0;i<sameData.length;i++) {
                                                timeArray[i] = sameData[i].gmtModified;
                                                ctimeArray[i] = sameData[i].gmtCreate;
                                                if (timeArray[i] == null) {
                                                    nullNum ++;
                                                }
                                            }
                                            if (nullNum == sameData.length) {   // 判断 修改时间数组 是否全为null
                                                newEstTime = jstools.TimeContrast(ctimeArray);
                                                console.log(ctimeArray);
                                            } else {
                                                newEstTime = jstools.TimeContrast(timeArray);
                                            }
                                            $("#contractBotDate").text(newEstTime);
                                            $("#topDate").text(newEstTime);
                                        }
                                    });
                                }
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
            elem: '#inside_no_payment_Tabstencil'
            ,url: setter.baseUrl+'epc/stencilorder/internalNoPay'
            ,toolbar: "#inside_no_payment_optionS"
            ,cellMinWidth: 80
            ,id: "inside_no_payment_Tabstencil"
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
                ,{field: 'orderType',title: '订单类型',edit: 'text', Width: 110, templet: '#order_type'}    //1=新单  2=返单    3=返单有改
                ,{field: 'productNo', title: '内部编码',minWidth: 130}
                ,{field: 'gerberName',title: '文件名',edit: 'text',minWidth: 160}
                ,{field: 'pcbName',title: 'F/N',edit: 'text',minWidth: 130}
                ,{field: 'orderNo',title: '客户PO',edit: 'text'}
                ,{field: 'invoiceNo',title: '合同单号',edit: 'text',minWidth: 130}
                ,{field: 'gmtCreate',title: '创建时间',edit: 'text'}
                ,{field: 'gmtModified',title: '修改时间',edit: 'text'}
                // 型号占位
                ,{field: 'quoteOrderNo',title: '报价单号',edit: 'text',minWidth: 130, hide: true}
                ,{field: 'pcbType',title: 'PCB类型',edit: 'text',minWidth: 130, hide: true}
                ,{field: 'dimensionsX',title: '单只(X)',edit: 'text', hide: true}
                ,{field: 'dimensionsY',title: '单只(Y)',edit: 'text', hide: true}
                ,{field: 'panelSizeX',title: 'Panel(X)',edit: 'text',width: 90, hide: true}
                ,{field: 'panelSizeY',title: 'Panel(Y)',edit: 'text',width: 90, hide: true}
                ,{field: 'panelWayX',title: 'PanelWay(X)',edit: 'text',width: 110, hide: true}
                ,{field: 'panelWayY',title: 'PanelWay(Y)',edit: 'text',width: 110, hide: true}
                ,{field: 'finishThickness',title: '板厚',edit: 'text', hide: true}
                ,{field: 'layerNum',title: '层数',edit: 'text',width: 80, hide: true}
                ,{field: 'surfaceFinish',title: '表面处理',edit: 'text', hide: true}
                ,{field: 'quantityPcs',title: 'PCS数量',edit: 'text', hide: true}
                ,{field: 'quantityPanel',title: 'Panel数量',edit: 'text', hide: true}
                ,{field: 'engineeringFee',title: '工程费',edit: 'text', hide: true}
                ,{field: 'boardFee',title: '板费',edit: 'text', hide: true}
                ,{field: 'testCostFee',title: '测试费',edit: 'text', hide: true}
                ,{field: 'toolingFee',title: '工具费',edit: 'text', hide: true}
                ,{field: 'overworkFee',title: '加急费',edit: 'text', hide: true}
                ,{field: 'postFee',title: '运费',edit: 'text', hide: true}
                ,{field: 'subtotal',title: '总价',edit: 'text', hide: true}
                ,{field: 'boardType',title: '出货方式',edit: 'text', hide: true}    // 1=单只 2=拼板
                // ,{field:'status',fixed: 'left', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110}
                ,{field:'status', title: '状态', align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110,hide: true}
                ,{field: 'areaSq',title: '面积',edit: 'text', hide: true}
                ,{field: 'material',title: '材料',edit: 'text', hide: true}
                ,{field: 'productCode',title: '材料型号',edit: 'text', hide: true}
                ,{field: 'productNo',title: '材料商',edit: 'text', hide: true}
                ,{field: 'tg',title: 'TG',edit: 'text', hide: true}
                ,{field: 'cti',title: 'CTI',edit: 'text', hide: true}
                ,{field: 'halogenFree',title: '无卤素',edit: 'text', hide: true}
                ,{field: 'outerLayerCopper',title: '外层铜厚',edit: 'text', hide: true}
                ,{field: 'innerLayerCopper',title: '内层铜厚',edit: 'text', hide: true}
                ,{field: 'heatConductivity',title: '导热系数',edit: 'text', hide: true}
                ,{field: 'silkScreenTopColor',title: '字符颜色',edit: 'text', hide: true}
                ,{field: 'solderMaskTopColor',title: '阻焊颜色',edit: 'text', hide: true}
                ,{field: 'pthCopper',title: '孔铜',edit: 'text', hide: true}
                ,{field: 'remark',title: '备注',edit: 'text', hide: true}
                ,{field: 'buildTime',title: '交期',edit: 'text', hide: true}
                ,{field: 'weight',title: '重量',edit: 'text', hide: true}
                ,{field: 'thickness',title: '表面处理厚度',edit: 'text', hide: true}
                ,{field: 'surfaceArea',title: '沉金面积',edit: 'text', hide: true}
                // ,{field: 'innerMinTrack',title: 'innerMinTrack',edit: 'text',hide: true}
                ,{field: 'minHoleSize',title: '最小孔',edit: 'text', hide: true}
                ,{field: 'nofHoles',title: '孔数',edit: 'text', hide: true}
                ,{field: 'viaProcess',title: '过孔方式',edit: 'text', hide: true}
                ,{field: 'stackUp',title: '压合',edit: 'text', hide: true}
                ,{field: 'status',title: '状态',edit: 'text', hide: true}
                ,{field: 'nofCore',title: '芯板数量',edit: 'text', hide: true}
                ,{field: 'nofPp',title: 'PP数量',edit: 'text', hide: true}
                ,{field: 'innerMinSpacing',title: '内层(线宽/线距)',edit: 'text', hide: true}
                ,{field: 'outerMinSpacing',title: '外层最小(线宽/线距)',edit: 'text', hide: true}
                ,{field: 'bgaSize',title: 'BGA大小',edit: 'text', hide: true}
                // ,{field: 'outerMinTrack',title: 'outerMinTrack',edit: 'text',hide: true}
                ,{field: 'testPoinType',title: '测试类型',edit: 'text', hide: true}
                ,{field: 'testPoint',title: '测试点',edit: 'text', hide: true}
                ,{field: 'testPointType',title: '测试方式',edit: 'text', hide: true}
                ,{field: 'userId',title: '用户ID',edit: 'text', hide: true}
                ,{field: 'uuid',title: 'uuid',edit: 'text', hide: true}
                ,{field: 'panelRoutingPath',title: '锣程',edit: 'text', hide: true}
                ,{field: 'bevellingCamfer',title: '斜边',edit: 'text', hide: true}
                ,{field: 'blindHoles',title: '盲孔',edit: 'text', hide: true}
                ,{field: 'buriedHoles',title: '埋孔',edit: 'text', hide: true}
                ,{field: 'carbon',title: '碳油',edit: 'text', hide: true}
                ,{field: 'contrlImpeance',title: '阻抗',edit: 'text', hide: true}
                ,{field: 'deepMillRouting',title: '控深锣',edit: 'text', hide: true}
                ,{field: 'punchingHoles',title: '冲孔数',edit: 'text', hide: true}
                ,{field: 'punchingSlots',title: '冲槽数',edit: 'text', hide: true}
                ,{field: 'peelable',title: '兰胶',edit: 'text', hide: true}
                ,{field: 'peelableBrand',title: '兰胶型号',edit: 'text', hide: true}
                // ,{field: 'differentDesign',title: 'differentDesign',edit: 'text',hide: true}
                ,{field: 'edgePlated',title: '金属边',edit: 'text', hide: true}
                ,{field: 'halfHoleLated',title: '半孔板',edit: 'text', hide: true}
                ,{field: 'orderId',title: '订单ID',edit: 'text', hide: true}
                ,{field: 'orderNo',title: '订单号',edit: 'text', hide: true}
                ,{field: 'invoiceNo',title: '合同号',edit: 'text', hide: true}
                ,{field: 'id', title: 'ID',hide:true}
                ,{field: 'userId', title: 'User ID',hide: true}
                ,{field: 'gerberPath',title: 'gerberPath',edit: 'text',hide: true}
                ,{field: 'isExistIndicator',title: 'isExistIndicator',edit: 'text',hide: true}
                ,{field: 'isExistSmt',title: 'isExistSmt',edit: 'text',hide: true}
                ,{field: 'quoteConfigIdList',title: 'quoteConfigIdList',edit: 'text',hide: true}
                ,{field: 'quoteConfigIds',title: 'quoteConfigIds',edit: 'text',hide: true}
                ,{field: 'quoteGerberName',title: 'quoteGerberName',edit: 'text',hide: true}
                ,{field: 'quoteGerberPath',title: 'quoteGerberPath',edit: 'text',hide: true}
                ,{field: 'silkScreenBotColor',title: 'silkScreenBotColor',edit: 'text',hide: true}
                ,{field: 'solderMaskBotColor',title: 'solderMaskBotColor',edit: 'text',hide: true}
                ,{fixed: 'right', title:'操作', toolbar: '#inside_no_payment_Bar', width:180}
            ]]
            ,done: function (res, curr, count) {
                var data = res.data;    //获取表格所有数据对象
                stenciltabObj = data;
            }
        });
    }
    //pcb订单头工具栏事件
    table.on('toolbar(inside_no_payment_Tabstencil)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        console.log(checkStatus.data)
        switch(obj.event){
            case 'confirmCheckData':
                var contractNos = null;
                for (var i=0;i<checkStatus.data.length;i++){
                    if (contractNos == null){
                        contractNos =  checkStatus.data[i].invoiceNo
                    } else if (contractNos != null && contractNos.indexOf(checkStatus.data[i].invoiceNo) == "-1") {
                        contractNos += ","+checkStatus.data[i].invoiceNo;
                    }
                }
                layer.confirm('确定提交['+contractNos+']', function () {
                    admin.req({
                        type: 'post',
                        data: {'contractNos':contractNos},
                        url: setter.baseUrl+'epc/stencilorder/submitInternalContractNo',
                        success: function () {
                            layer.alert("提交成功！");
                            table.reload('inside_no_payment_Tabstencil');
                        }
                    });
                    layer.closeAll();
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
    //监听行工具事件＝＝＝＝》Stencil 钢网 订单
    table.on('tool(inside_no_payment_Tabstencil)', function(obj){
        var data = obj.data;
        var this_quoteOrderNo = data.quoteOrderNo;
        var sameData = new Object();
        var sd_len = 0;
        var pTotala = 0;
        for(var i=0;i<stenciltabObj.length;i++){
            if (this_quoteOrderNo == stenciltabObj[i].quoteOrderNo) {
                console.log('sd_len:'+sd_len);
                sameData[sd_len] = stenciltabObj[i]
                sd_len += 1;
                pTotala += stenciltabObj[i].totalStencilFee;
            }
            console.log('stenciltabObj[i].invoiceNo:'+stenciltabObj[i].quoteOrderNo);
        }
        var quoteOrderNo = data.invoiceNo;
        //console.log(obj)
        if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                admin.req({
                    type: 'post',
                    data: {'ids': data.id},
                    url: setter.baseUrl+'epc/stencilorder/delete',
                    success: function () {
                        layer.alert("删除成功！");
                        obj.del();
                        table.reload('inside_no_payment_Tabstencil');
                    }
                });
                layer.close(index);
            });
        } else if(obj.event == 'edit') {
            admin.popup({
                title: '编辑Stencil 钢网订单信息'
                , area: ['885px', '550px']
                , btn: ['立即提交', '取消']
                , yes: function () {
                    $(".submitStencilUpB").click();
                    table.reload('inside_no_payment_Tabstencil');
                }
                , success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/orderStencil_updateB', data).done(function () {

                    });
                }
            });
        } else if (obj.event == 'search') {
            var popupData = {data:{}};
            /**
             * 获取用户信息  回填到合同上
             */
            admin.req({
                type: 'get',
                data: '',
                url: setter.baseUrl+"sys/consumer/user/info/"+data.userId,
                success: function (data) {
                    popupData.userName = data.user.userName;
                    popupData.companyName = data.user.companName;
                    popupData.country = data.user.country;
                    popupData.city = data.user.city;
                    popupData.address = data.user.address;
                    admin.req({
                        type: 'post',
                        data: {'contractNo': quoteOrderNo},
                        url: setter.baseUrl+'epc/stencilorder/infoByContractNo', //3-7之前的版本 epc/pcborder/infoByContractNo
                        success: function (data) {
                            var viewName = "marketManagement/iframeWindow/quote_contractS";
                            var productNo = null;
                            var contractType;
                            popupData.data = sameData;
                            popupData.total = pTotala;
                            console.log(popupData);
                            // console.log = popupData.sort(compare('quantityPcs'));
                            $.each(data.data, function (idx, obj) {
                                if (productNo == null || productNo == "") {
                                    contractType = 1;
                                    productNo = obj.productNo;
                                } else if (productNo != null && productNo != obj.productNo) {
                                    contractType = 2;
                                    layer.msg("选择了不同型号");
                                }
                            });
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
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    exports('market_insideNoPayment', {});
});
