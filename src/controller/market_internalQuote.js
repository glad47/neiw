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
            ,{field: 'id', title: 'ID',hide:true}
            ,{field: 'userId', title: 'User ID'}
            // ,{field:'status',fixed: 'left', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110}
            ,{field:'status', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110}
            ,{field: 'areaSq',title: '面积',edit: 'text'}
            ,{field: 'bevellingCamfer',title: '斜边',edit: 'text'}
            ,{field: 'bgaSize',title: 'BGA大小',edit: 'text'}
            ,{field: 'blindHoles',title: '盲孔',edit: 'text'}
            ,{field: 'boardFee',title: '板费',edit: 'text'}
            ,{field: 'boardType',title: '板类型',edit: 'text'}
            ,{field: 'buildTime',title: '交期',edit: 'text'}
            ,{field: 'buriedHoles',title: '埋孔',edit: 'text'}
            ,{field: 'carbon',title: '碳油',edit: 'text'}
            ,{field: 'contrlImpeance',title: '阻抗',edit: 'text'}
            ,{field: 'cti',title: 'CTI',edit: 'text'}
            ,{field: 'deepMillRouting',title: '控深锣',edit: 'text'}
            // ,{field: 'differentDesign',title: 'differentDesign',edit: 'text',hide: true}
            ,{field: 'dimensionsX',title: '尺寸(X)',edit: 'text'}
            ,{field: 'dimensionsY',title: '尺寸(Y)',edit: 'text'}
            ,{field: 'edgePlated',title: '金属边',edit: 'text'}
            ,{field: 'engineeringFee',title: '工程费',edit: 'text'}
            ,{field: 'finishThickness',title: '板厚',edit: 'text'}
            ,{field: 'gerberName',title: '文件名',edit: 'text'}
            ,{field: 'gerberPath',title: 'gerberPath',edit: 'text',hide: true}
            ,{field: 'gmtCreate',title: '创建时间',edit: 'text'}
            ,{field: 'gmtModified',title: '修改时间',edit: 'text'}
            ,{field: 'halfHoleLated',title: '半孔板',edit: 'text'}
            ,{field: 'halogenFree',title: '无卤素',edit: 'text'}
            ,{field: 'heatConductivity',title: '导热系数',edit: 'text'}
            ,{field: 'innerLayerCopper',title: '内层铜厚',edit: 'text'}
            ,{field: 'innerMinSpacing',title: '内层(线宽/线距)',edit: 'text'}
            // ,{field: 'innerMinTrack',title: 'innerMinTrack',edit: 'text',hide: true}
            ,{field: 'invoiceNo',title: '合同号',edit: 'text'}
            ,{field: 'isExistIndicator',title: 'isExistIndicator',edit: 'text'}
            ,{field: 'isExistSmt',title: 'isExistSmt',edit: 'text'}
            ,{field: 'layerNum',title: '层数',edit: 'text'}
            ,{field: 'material',title: '材料',edit: 'text'}
            ,{field: 'minHoleSize',title: '最小孔',edit: 'text'}
            ,{field: 'nofCore',title: '芯板数量',edit: 'text'}
            ,{field: 'nofHoles',title: '孔数',edit: 'text'}
            ,{field: 'nofPp',title: 'PP数量',edit: 'text'}
            ,{field: 'orderId',title: '订单ID',edit: 'text'}
            ,{field: 'orderNo',title: '订单号',edit: 'text'}
            ,{field: 'orderType',title: '订单类型',edit: 'text'}
            ,{field: 'outerLayerCopper',title: '外层铜厚',edit: 'text'}
            ,{field: 'outerMinSpacing',title: '外层最小(线宽/线距)',edit: 'text'}
            // ,{field: 'outerMinTrack',title: 'outerMinTrack',edit: 'text',hide: true}
            ,{field: 'overworkFee',title: '加急费',edit: 'text'}
            ,{field: 'panelRoutingPath',title: '锣程',edit: 'text'}
            ,{field: 'panelSizeX',title: 'Panel(X)',edit: 'text'}
            ,{field: 'panelSizeY',title: 'Panel(Y)',edit: 'text'}
            ,{field: 'panelWayX',title: 'PanelWay(X)',edit: 'text'}
            ,{field: 'panelWayY',title: 'PanelWay(Y)',edit: 'text'}
            ,{field: 'pcbType',title: 'PCB类型',edit: 'text'}
            ,{field: 'peelable',title: '兰胶',edit: 'text'}
            ,{field: 'peelableBrand',title: '兰胶型号',edit: 'text'}
            ,{field: 'productCode',title: '材料型号',edit: 'text'}
            ,{field: 'productNo',title: '材料商',edit: 'text'}
            ,{field: 'pthCopper',title: '孔铜',edit: 'text'}
            ,{field: 'punchingHoles',title: '冲孔数',edit: 'text'}
            ,{field: 'punchingSlots',title: '冲槽数',edit: 'text'}
            ,{field: 'quantityPanel',title: 'Panel数量',edit: 'text'}
            ,{field: 'quantityPcs',title: 'PCS数量',edit: 'text'}
            ,{field: 'quoteConfigIdList',title: 'quoteConfigIdList',edit: 'text',hide: true}
            ,{field: 'quoteConfigIds',title: 'quoteConfigIds',edit: 'text',hide: true}
            ,{field: 'quoteGerberName',title: 'quoteGerberName',edit: 'text'}
            ,{field: 'quoteGerberPath',title: 'quoteGerberPath',edit: 'text'}
            ,{field: 'remark',title: '备注',edit: 'text'}
            ,{field: 'silkScreenBotColor',title: 'silkScreenBotColor',edit: 'text',hide: true}
            ,{field: 'silkScreenTopColor',title: '字符颜色',edit: 'text'}
            ,{field: 'solderMaskBotColor',title: 'solderMaskBotColor',edit: 'text',hide: true}
            ,{field: 'solderMaskTopColor',title: '阻焊',edit: 'text'}
            ,{field: 'stackUp',title: '压合',edit: 'text'}
            ,{field: 'status',title: '状态',edit: 'text'}
            ,{field: 'subtotal',title: '总价',edit: 'text'}
            ,{field: 'surfaceArea',title: '沉金面积',edit: 'text'}
            ,{field: 'surfaceFinish',title: '表面处理',edit: 'text'}
            ,{field: 'testCostFee',title: '测试费',edit: 'text'}
            ,{field: 'testPoinType',title: '测试类型',edit: 'text'}
            ,{field: 'testPoint',title: '测试点',edit: 'text'}
            ,{field: 'testPointType',title: '测试方式',edit: 'text'}
            ,{field: 'tg',title: 'TG',edit: 'text'}
            ,{field: 'thickness',title: '表面处理厚度',edit: 'text'}
            ,{field: 'toolingFee',title: '工具费',edit: 'text'}
            ,{field: 'userId',title: '用户ID',edit: 'text'}
            ,{field: 'uuid',title: 'uuid',edit: 'text'}
            ,{field: 'viaProcess',title: '过孔方式',edit: 'text'}
            ,{field: 'weight',title: 'weight',edit: 'text'}
            ,{fixed: 'right', title:'操作', toolbar: '#iqpcbBar', width:70}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    //pcb订单头工具栏事件
    table.on('toolbar(iquote_Tabpcb)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'getCheckData':
                var data = checkStatus.data;
                // layer.alert(JSON.stringify(data));
                admin.popup({
                    title: '报价合同'
                    ,area: ['60%', '90%']
                    ,btn: ['提交', '取消']
                    ,success: function (layero, index) {
                        view(this.id).render('marketManagement/iframeWindow/quote_contract', data).done(function () {

                        });
                    }
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
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(iquote_Tabpcb)', function(obj){
        var data = obj.data;
        //console.log(obj)
        if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            layer.prompt({
                formType: 2
                ,value: data.email
            }, function(value, index){
                obj.update({
                    email: value
                });
                layer.close(index);
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

    exports('market_internalQuote', {});
});