/**

 @Name:    市场管理－－［内部报价明细］

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
        canOpenView: false, //是否可以打开合同弹出页
    };

    // 监听tab选项卡
    element.on('tab(tab-internalQuote)', function (data) {
        defVal.orderType = data.index;
    });

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
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
        ,where: {
            access_token: layui.data('layuiAdmin').access_token
        }
        ,cols: [[
            {type:'checkbox'}
            ,{field: 'orderType',title: '订单类型',edit: 'text', Width: 110, templet: '#order_type'}    //1=新单  2=返单    3=返单有改
            ,{field: 'productNo', title: '内部编码',minWidth: 130}
            ,{field: 'gerberName',title: '文件名',edit: 'text',minWidth: 160}
            ,{field: 'pcbName',title: 'F/N',edit: 'text',minWidth: 130}
            ,{field: 'orderNo',title: '客户PO',edit: 'text'}
            ,{field: 'quoteOrderNo',title: '报价单号',edit: 'text',minWidth: 130}
            ,{field: 'gmtCreate',title: '创建时间',edit: 'text'}
            ,{field: 'gmtModified',title: '修改时间',edit: 'text'}
            // 型号占位
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
            ,{fixed: 'right', title:'操作', toolbar: '#iqpcbBar', width:120}
        ]]
        ,done: function (res, curr, count) {

        }
    });
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
                    companName: '',
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
                $.each(tabdata.data, function (idx, obj) {
                    console.log("obj.subtotal===>"+obj.subtotal);
                    console.log(obj);
                    contractTotal = parseFloat(contractTotal+obj.subtotal);
                    tabdata.total = contractTotal;
                    if (qidsPost == null){
                        qidsPost = obj.id;
                    } else {
                        qidsPost += ","+obj.id;
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
                if (defVal.canOpenView == true) {
                    // 获取地址，公司名
                    admin.req({
                        type: 'get',
                        data: '',
                        url: setter.baseUrl+'sys/consumer/user/info/'+tabdata.data[0].userId,
                        success: function (data) {
                            tabdata.userName = data.user.userName;
                            tabdata.companName = data.user.companName;
                            tabdata.country = data.user.country;
                            tabdata.city = data.user.city;
                            tabdata.address = data.user.address;
                            if (checkedLength >6){
                                layer.msg("最多只能选中6条数据");
                                return false;
                            } else {
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
                                        layer.alert(printId);
                                        window.location.reload();
                                        document.body.innerHTML=document.getElementById(printId).innerHTML;
                                        window.print();
                                    }
                                    ,success: function (layero, index) {
                                        tabdata.htmlType = 1;     //页面标识 0为报价明细合同 主要用于判断头部左侧标题
                                        view(this.id).render(viewName, tabdata).done(function () {
                                            productNo = null; // 初始化订单号
                                            defVal.customerSn = null;   //初始化客户编号 如a11
                                            console.log(tabdata);
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
        };
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(iquote_Tabpcb)', function(obj){
        var data = obj.data;
        console.log(data)
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
                                    layui.table.reload('iquote_Tabpcb');
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
    //监听单元格编辑
    table.on('edit(iquote_Tabpcb)', function(obj){
        var value = obj.value //得到修改后的值
            ,data = obj.data //得到所在行所有键值
            ,field = obj.field; //得到字段
        layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);
        admin.req({
            type: 'post',
            data: {id:data.id},
            url: setter.imUrl+"quote/getAssemblyQuote",
            success: function (data) {

            }
        });
    });
    //监听搜索
    form.on('submit(internal-quote-search)', function(data){
        var field = data.field;
        console.log(field);
        //执行重载
        table.reload('iquote_Tabpcb', {
            where: field
        });
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