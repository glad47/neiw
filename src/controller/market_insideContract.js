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

    // 监听tab选项卡
    element.on('tab(tab-internalQuote)', function (data) {
        defVal.orderType = data.index;
    });

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    table.render({
        elem: '#inside_cotract_Tabpcb'
        ,url: setter.baseUrl+'/epc/pcborder/internalContract'
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
            ,{field: 'orderType',title: '订单类型',edit: 'text'}    //1=新单  2=返单    3=返单有改
            ,{field: 'productNo', title: '内部编码',width: 130}
            ,{field: 'invoiceNo',title: '合同号',edit: 'text'}
            ,{field: 'gerberName',title: '文件名',edit: 'text',width: 160}
            ,{field: 'pcbType',title: 'PCB类型',edit: 'text',width: 130}
            // 型号占位
            ,{field: 'dimensionsX',title: '单只(X)',edit: 'text'}
            ,{field: 'dimensionsY',title: '单只(Y)',edit: 'text'}
            ,{field: 'panelSizeX',title: 'Panel(X)',edit: 'text',width: 90}
            ,{field: 'panelSizeY',title: 'Panel(Y)',edit: 'text',width: 90}
            ,{field: 'panelWayX',title: 'PanelWay(X)',edit: 'text',width: 110}
            ,{field: 'panelWayY',title: 'PanelWay(Y)',edit: 'text',width: 110}
            ,{field: 'finishThickness',title: '板厚',edit: 'text'}
            ,{field: 'layerNum',title: '层数',edit: 'text',width: 80}
            ,{field: 'surfaceFinish',title: '表面处理',edit: 'text'}
            ,{field: 'quantityPcs',title: 'PCS数量',edit: 'text'}
            ,{field: 'quantityPanel',title: 'Panel数量',edit: 'text'}
            ,{field: 'engineeringFee',title: '工程费',edit: 'text'}
            ,{field: 'boardFee',title: '板费',edit: 'text'}
            ,{field: 'testCostFee',title: '测试费',edit: 'text'}
            ,{field: 'toolingFee',title: '工具费',edit: 'text'}
            ,{field: 'overworkFee',title: '加急费',edit: 'text'}
            ,{field: 'postFee',title: '运费',edit: 'text'}
            ,{field: 'subtotal',title: '总价',edit: 'text'}
            ,{field: 'boardType',title: '出货方式',edit: 'text'}    // 1=单只 2=拼板
            // ,{field:'status',fixed: 'left', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110}
            ,{field:'status', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110,hide: true}
            ,{field: 'areaSq',title: '面积',edit: 'text'}
            ,{field: 'material',title: '材料',edit: 'text'}
            ,{field: 'productCode',title: '材料型号',edit: 'text'}
            ,{field: 'productNo',title: '材料商',edit: 'text'}
            ,{field: 'tg',title: 'TG',edit: 'text'}
            ,{field: 'cti',title: 'CTI',edit: 'text'}
            ,{field: 'halogenFree',title: '无卤素',edit: 'text'}
            ,{field: 'outerLayerCopper',title: '外层铜厚',edit: 'text'}
            ,{field: 'innerLayerCopper',title: '内层铜厚',edit: 'text'}
            ,{field: 'heatConductivity',title: '导热系数',edit: 'text'}
            ,{field: 'silkScreenTopColor',title: '字符颜色',edit: 'text'}
            ,{field: 'solderMaskTopColor',title: '阻焊颜色',edit: 'text'}
            ,{field: 'pthCopper',title: '孔铜',edit: 'text'}
            ,{field: 'remark',title: '备注',edit: 'text'}
            ,{field: 'buildTime',title: '交期',edit: 'text'}
            ,{field: 'weight',title: '重量',edit: 'text'}
            ,{field: 'thickness',title: '表面处理厚度',edit: 'text'}
            ,{field: 'surfaceArea',title: '沉金面积',edit: 'text'}
            ,{field: 'gmtCreate',title: '创建时间',edit: 'text'}
            ,{field: 'gmtModified',title: '修改时间',edit: 'text'}
            // ,{field: 'innerMinTrack',title: 'innerMinTrack',edit: 'text',hide: true}
            ,{field: 'minHoleSize',title: '最小孔',edit: 'text'}
            ,{field: 'nofHoles',title: '孔数',edit: 'text'}
            ,{field: 'viaProcess',title: '过孔方式',edit: 'text'}
            ,{field: 'stackUp',title: '压合',edit: 'text'}
            ,{field: 'status',title: '状态',edit: 'text'}
            ,{field: 'nofCore',title: '芯板数量',edit: 'text'}
            ,{field: 'nofPp',title: 'PP数量',edit: 'text'}
            ,{field: 'innerMinSpacing',title: '内层(线宽/线距)',edit: 'text'}
            ,{field: 'outerMinSpacing',title: '外层最小(线宽/线距)',edit: 'text'}
            ,{field: 'bgaSize',title: 'BGA大小',edit: 'text'}
            // ,{field: 'outerMinTrack',title: 'outerMinTrack',edit: 'text',hide: true}
            ,{field: 'testPoinType',title: '测试类型',edit: 'text'}
            ,{field: 'testPoint',title: '测试点',edit: 'text'}
            ,{field: 'testPointType',title: '测试方式',edit: 'text'}
            ,{field: 'userId',title: '用户ID',edit: 'text'}
            ,{field: 'uuid',title: 'uuid',edit: 'text'}
            ,{field: 'panelRoutingPath',title: '锣程',edit: 'text'}
            ,{field: 'bevellingCamfer',title: '斜边',edit: 'text'}
            ,{field: 'blindHoles',title: '盲孔',edit: 'text'}
            ,{field: 'buriedHoles',title: '埋孔',edit: 'text'}
            ,{field: 'carbon',title: '碳油',edit: 'text'}
            ,{field: 'contrlImpeance',title: '阻抗',edit: 'text'}
            ,{field: 'deepMillRouting',title: '控深锣',edit: 'text'}
            ,{field: 'punchingHoles',title: '冲孔数',edit: 'text'}
            ,{field: 'punchingSlots',title: '冲槽数',edit: 'text'}
            ,{field: 'peelable',title: '兰胶',edit: 'text'}
            ,{field: 'peelableBrand',title: '兰胶型号',edit: 'text'}
            // ,{field: 'differentDesign',title: 'differentDesign',edit: 'text',hide: true}
            ,{field: 'edgePlated',title: '金属边',edit: 'text'}
            ,{field: 'halfHoleLated',title: '半孔板',edit: 'text'}
            ,{field: 'orderId',title: '订单ID',edit: 'text'}
            ,{field: 'orderNo',title: '订单号',edit: 'text'}
          
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
            ,{fixed: 'right', title:'操作', toolbar: '#inside_cotract_Bar', width:112}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(inside_cotract_Tabpcb)', function(obj){
        var data = obj.data;
        var invoiceNo = data.invoiceNo;
        //console.log(obj)
        if(obj.event === 'del'){
            layer.confirm('确定退回合同［'+invoiceNo+'］', function(index){
                admin.req({
                    type: 'post',
                    data: {'contractNo': invoiceNo},
                    url: setter.baseUrl+'epc/pcborder/backInternalContract',
                    success: function () {
                        layer.alert('已退回合同［'+invoiceNo+'］');
                        obj.del();
                        layui.table.reload('inside_cotract_Tabpcb');
                        layer.close(index);
                    }
                });
            });
        } else if(obj.event === 'search-contract'){
            var popupData;
            layer.msg("查看合同操作");
            admin.req({
                type: 'post',
                data: {'contractNo': invoiceNo},
                url: setter.baseUrl+'epc/pcborder/infoByContractNo',
                success: function (data) {
                    var viewName;
                    var productNo = null;
                    var contractType;
                    popupData = data.data;
                    alert(1);
                    console.log = popupData.sort(compare('quantityPcs'));
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
                        title: '查看报价合同'
                        ,area: ['60%', '90%']
                        ,btn: ['打印','关闭']
                        ,yes:function(index, layero){
                            var printId;
                            if (contractType == "1"){
                                printId = "quoteContract_AllA";
                            } else if (contractType == "2"){
                                printId = "quoteContract_AllB";
                            }
                            layer.alert(printId);
                            document.body.innerHTML=document.getElementById(printId).innerHTML;
                            window.print();
                        }
                        // btn2: function(index, layero){}
                        ,success: function (layero, index) {
                            popupData.htmlType = 1;     //页面标识 1为内部合同 主要用于判断头部左侧标题
                            view(this.id).render(viewName, popupData).done(function () {
                                productNo = null; // 初始化订单号
                                console.log(popupData);
                                // 表格样式设置
                                if (contractType === 1){
                                    // layui.each遍历的数据，td最少为6条，没有数据的显示空白
                                    var tdSize = $(".contract-module-three-tab tbody tr").eq(0).find("td").size();
                                    var dataLength = popupData.length;
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
        }
    });
    //监听单元格编辑
    table.on('edit(inside_cotract_Tabpcb)', function(obj){
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

    function compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    }

    exports('market_insideContract', {});
});