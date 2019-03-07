/**

 @Name:    市场管理－－［内部合同］

 */


layui.define(['admin','table','index','element','form','laydate'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        // ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element;
        var $ = layui.jquery;

    // 全局变量
    var defVal = {
        orderType: 0,   //订单类型
        customerSn: null, //客户编号 如：a11
    };
    // 用户信息
    var userData = {
        userName: '',
        companyName: '',
        country: '',
        city: '',
        address: ''
    };
    // 表格对象
    var pcbtabObj;
    // 监听tab选项卡
    element.on('tab(tab-internalQuote)', function (data) {
        defVal.orderType = data.index;
    });

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    table.render({
        elem: '#inside_cotract_Tabpcb'
        ,url: setter.baseUrl+'epc/pcborder/internalContract'
        ,toolbar: "#inside_cotract_option"
        ,cellMinWidth: 80
        ,id: "inside_cotract_Tabpcb"
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
            {type:'checkbox'}
            ,{field: 'orderType',title: '订单类型'}    //1=新单  2=返单    3=返单有改
            ,{field: 'productNo', title: '内部编码',width: 130}
            // ,{field: 'invoiceNo',title: '合同号',minWidth: 140}
            ,{field: 'quoteOrderNo',title: '报价单号',minWidth: 160}
            ,{field: 'gerberName',title: '文件名',width: 160}
            ,{field: 'pcbType',title: 'PCB类型',width: 130}
            // 型号占位
            ,{field: 'dimensionsX',title: '单只(X)'}
            ,{field: 'dimensionsY',title: '单只(Y)'}
            ,{field: 'panelSizeX',title: 'Panel(X)',width: 90}
            ,{field: 'panelSizeY',title: 'Panel(Y)',width: 90}
            ,{field: 'panelWayX',title: 'PanelWay(X)',width: 110}
            ,{field: 'panelWayY',title: 'PanelWay(Y)',width: 110}
            ,{field: 'finishThickness',title: '板厚'}
            ,{field: 'layerNum',title: '层数',width: 80}
            ,{field: 'surfaceFinish',title: '表面处理'}
            ,{field: 'quantityPcs',title: 'PCS数量'}
            ,{field: 'quantityPanel',title: 'Panel数量'}
            ,{field: 'engineeringFee',title: '工程费'}
            ,{field: 'boardFee',title: '板费'}
            ,{field: 'testCostFee',title: '测试费'}
            ,{field: 'toolingFee',title: '工具费'}
            ,{field: 'overworkFee',title: '加急费'}
            ,{field: 'postFee',title: '运费'}
            ,{field: 'subtotal',title: '总价'}
            ,{field: 'boardType',title: '出货方式'}    // 1=单只 2=拼板
            // ,{field:'status',fixed: 'left', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110}
            ,{field:'status', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110,hide: true}
            ,{field: 'areaSq',title: '面积'}
            ,{field: 'material',title: '材料'}
            ,{field: 'productCode',title: '材料型号'}
            ,{field: 'productNo',title: '材料商'}
            ,{field: 'tg',title: 'TG'}
            ,{field: 'cti',title: 'CTI'}
            ,{field: 'halogenFree',title: '无卤素'}
            ,{field: 'outerLayerCopper',title: '外层铜厚'}
            ,{field: 'innerLayerCopper',title: '内层铜厚'}
            ,{field: 'heatConductivity',title: '导热系数'}
            ,{field: 'silkScreenTopColor',title: '字符颜色'}
            ,{field: 'solderMaskTopColor',title: '阻焊颜色'}
            ,{field: 'pthCopper',title: '孔铜'}
            ,{field: 'remark',title: '备注'}
            ,{field: 'buildTime',title: '交期'}
            ,{field: 'weight',title: '重量'}
            ,{field: 'thickness',title: '表面处理厚度'}
            ,{field: 'surfaceArea',title: '沉金面积'}
            ,{field: 'gmtCreate',title: '创建时间'}
            ,{field: 'gmtModified',title: '修改时间'}
            // ,{field: 'innerMinTrack',title: 'innerMinTrack',hide: true}
            ,{field: 'minHoleSize',title: '最小孔'}
            ,{field: 'nofHoles',title: '孔数'}
            ,{field: 'viaProcess',title: '过孔方式'}
            ,{field: 'stackUp',title: '压合'}
            ,{field: 'status',title: '状态'}
            ,{field: 'nofCore',title: '芯板数量'}
            ,{field: 'nofPp',title: 'PP数量'}
            ,{field: 'innerMinSpacing',title: '内层(线宽/线距)'}
            ,{field: 'outerMinSpacing',title: '外层最小(线宽/线距)'}
            ,{field: 'bgaSize',title: 'BGA大小'}
            // ,{field: 'outerMinTrack',title: 'outerMinTrack',hide: true}
            ,{field: 'testPoinType',title: '测试类型'}
            ,{field: 'testPoint',title: '测试点'}
            ,{field: 'testPointType',title: '测试方式'}
            ,{field: 'userId',title: '用户ID'}
            ,{field: 'uuid',title: 'uuid'}
            ,{field: 'panelRoutingPath',title: '锣程'}
            ,{field: 'bevellingCamfer',title: '斜边'}
            ,{field: 'blindHoles',title: '盲孔'}
            ,{field: 'buriedHoles',title: '埋孔'}
            ,{field: 'carbon',title: '碳油'}
            ,{field: 'contrlImpeance',title: '阻抗'}
            ,{field: 'deepMillRouting',title: '控深锣'}
            ,{field: 'punchingHoles',title: '冲孔数'}
            ,{field: 'punchingSlots',title: '冲槽数'}
            ,{field: 'peelable',title: '兰胶'}
            ,{field: 'peelableBrand',title: '兰胶型号'}
            // ,{field: 'differentDesign',title: 'differentDesign',hide: true}
            ,{field: 'edgePlated',title: '金属边'}
            ,{field: 'halfHoleLated',title: '半孔板'}
            ,{field: 'orderId',title: '订单ID'}
            ,{field: 'orderNo',title: '订单号'}
          
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
            ,{fixed: 'right', title:'操作', toolbar: '#inside_cotract_Bar', width:192}
        ]]
        ,done: function (res, curr, count) {
            var data = res.data;    //获取表格所有数据对象
            pcbtabObj = data;
        }
    });
    // 监听订单头工具栏事件
    table.on('toolbar(inside_cotract_Tabpcb)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        var popupData = {data:{}};
        popupData.data = checkStatus.data;
        var pTotala = 0;
        if (data.length >= 7) {
            layer.alert("最多只能选择6条数据！！");
            return false;
        }
        for (var i=0;i<data.length;i++){
            pTotala += parseFloat(data[i].subtotal);
        }
        popupData.total = pTotala;
        popupData.userName = userData.userName;
        popupData.companyName = userData.companName;
        popupData.country = userData.country;
        popupData.city = userData.city;
        popupData.address = userData.address;

        switch(obj.event){
            case 'submit':
                var invoiceNo = null;
                var customerSn = null; //客户编号标识 a11 a21....
                var qids = null;         //需要提交的字段
                for (var i=0;i<data.length;i++){
                    var i_customerSn = data[i].productNo.substring(0,3);
                    if (invoiceNo == null){
                        invoiceNo = data[i].invoiceNo;
                    } else if (invoiceNo != null && invoiceNo.indexOf(data[i].invoiceNo) == "-1") {
                        invoiceNo += ","+data[i].invoiceNo;
                    }
                    if (customerSn == null || customerSn == i_customerSn){
                        customerSn = i_customerSn;
                    } else {
                        layer.alert("请选择同一个客户下单");
                        return false;
                    }
                    if (qids == null){
                        qids = data[i].id;
                    } else {
                        qids += ","+data[i].id;
                    }
                }
                console.log("qids:"+qids);
                var viewName ="marketManagement/iframeWindow/quote_contractB";
                var productNo = null;
                var contractType;
                admin.popup({
                    title: '内部合同'
                    ,area: ['100%', '100%']
                    ,btn: ['生成合同','打印','关闭']
                    ,maxmin: true
                    ,yes:function(index, layero){
                       layer.confirm("确定生成合同编号吗？", function () {
                          admin.req({
                                type: 'post',
                                data: {'qids':qids},
                                url: setter.baseUrl+'epc/pcborder/createContractNo',
                                success: function () {
                                  layer.alert("提交成功！");
                                    layui.table.reload('inside_cotract_Tabpcb');
                                    layer.close(index);
                                }
                          });
                       });
                    }
                    ,btn2: function (index, layero) {
                        window.location.reload();
                        document.body.innerHTML=document.getElementById("quoteContract_AllB").innerHTML;
                        window.print();
                    }
                    ,success: function (layero, index) {
                        popupData.htmlType = 1;     //页面标识 1为内部合同 主要用于判断头部左侧标题
                        console.log(popupData);
                        view(this.id).render(viewName, popupData).done(function () {
                            productNo = null; // 初始化订单号
                            // 表格样式设置
                            if (contractType === 1){
                                // layui.each遍历的数据，td最少为6条，没有数据的显示空白
                                var tdSize = $(".contract-module-three-tab tbody tr").eq(0).find("td").size();
                                var dataLength = checkStatus.data.length;
                                var addTrNum;
                                if (dataLength < 4){
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
                            // 实时时间设置
                            let date = new Date();
                            let chinaDate = date.toDateString();
                            let chinaDateArray = chinaDate.split(' ');
                            let displayDate = `${chinaDateArray[1]} ${chinaDateArray[2]}, ${chinaDateArray[3]}`;
                            $("#contractBotDate").text(displayDate);
                            $("#topDate").text(displayDate);
                        });
                    }
                });
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(inside_cotract_Tabpcb)', function(obj){
        var data = obj.data;
        console.log(data);
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
                pTotala += pcbtabObj[i].subtotal;
            }
            console.log('pcbtabObj[i].invoiceNo:'+pcbtabObj[i].quoteOrderNo);
        }
        var quoteOrderNo = data.quoteOrderNo;
        //console.log(obj)
        if(obj.event === 'del'){
            layer.confirm('确定退回报价单号为［'+quoteOrderNo+'］', function(index){
                admin.req({
                    type: 'post',
                    data: {'quoteOrderNo': quoteOrderNo},
                    url: setter.baseUrl+'epc/pcborder/backInternalContract',
                    success: function () {
                        layer.alert('已退回报价单号为［'+quoteOrderNo+'］');
                        obj.del();
                        layui.table.reload('inside_cotract_Tabpcb');
                        layer.close(index);
                    }
                });
            });
        } else if(obj.event === 'search-contract'){
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
                            var viewName;
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
                                    viewName = "marketManagement/iframeWindow/quote_contractA";
                                } else if (productNo != null && productNo != obj.productNo) {
                                    contractType = 2;
                                    viewName = "marketManagement/iframeWindow/quote_contractB";
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
                                        printId = "quoteContract_AllA";
                                    } else if (contractType == "2"){
                                        printId = "quoteContract_AllB";
                                    }
                                    layer.alert(printId);
                                    window.location.reload();
                                    document.body.innerHTML=document.getElementById(printId).innerHTML;
                                    window.print();
                                }
                                // btn2: function(index, layero){}
                                ,success: function (layero, index) {
                                    popupData.htmlType = 1;     //页面标识 1为内部合同 主要用于判断头部左侧标题
                                    console.log(popupData);
                                    view(this.id).render(viewName, popupData).done(function () {
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
                                        // 实时时间设置
                                        let date = new Date();
                                        let chinaDate = date.toDateString();
                                        let chinaDateArray = chinaDate.split(' ');
                                        let displayDate = `${chinaDateArray[1]} ${chinaDateArray[2]}, ${chinaDateArray[3]}`;
                                        $("#contractBotDate").text(displayDate);
                                        $("#topDate").text(displayDate);
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else if(obj.event === 'search-list'){
            layer.msg("查看数据明细");
            admin.popup({
                title: '编辑PCB订单信息'
                ,area: ['76%', '90%']
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
                            console.log("提交的字段信息："+JSON.stringify(field));
                            admin.req({
                                type: 'post'
                                ,url: setter.baseUrl+'epc/pcborder/update'
                                ,data: field
                                ,done: function (res) {
                                    layer.msg('订单信息修改成功');
                                    layui.table.reload('inside_cotract_Tabpcb');
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
        }
    });
    //监听行点击获取用户信息
    table.on('row(inside_cotract_Tabpcb)', function (obj) {
        var data = obj.data;
        /**
         * 获取用户信息  回填到合同上
         */
        admin.req({
            type: 'get',
            data: '',
            url: setter.baseUrl+"sys/consumer/user/info/"+data.userId,
            success: function (data) {
                userData.userName = data.user.userName;
                userData.companyName = data.user.companName;
                userData.country = data.user.country;
                userData.city = data.user.city;
                userData.address = data.user.address;
            }
        });
    });


    function compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    }


    exports('market_insideContract', {});
});