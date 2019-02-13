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
        ,toolbar: true
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
            ,{field: 'id', title: 'ID'}
            ,{field: 'userId', title: 'User ID'}
            // ,{field:'status',fixed: 'left', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110}
            ,{field:'status', title: '状态', hide: false, align:'center',templet: '#Tabtb-pcb-market-iQuote-status',width: 110}
            ,{field: 'areaSq',title: 'areaSq'}
            ,{field: 'bevellingCamfer',title: 'bevellingCamfer'}
            ,{field: 'bgaSize',title: 'bgaSize'}
            ,{field: 'blindHoles',title: 'blindHoles'}
            ,{field: 'boardFee',title: 'boardFee'}
            ,{field: 'boardType',title: 'boardType'}
            ,{field: 'buildTime',title: 'buildTime'}
            ,{field: 'buriedHoles',title: 'buriedHoles'}
            ,{field: 'carbon',title: 'carbon'}
            ,{field: 'contrlImpeance',title: 'contrlImpeance'}
            ,{field: 'cti',title: 'cti'}
            ,{field: 'deepMillRouting',title: 'deepMillRouting'}
            ,{field: 'differentDesign',title: 'differentDesign'}
            ,{field: 'dimensionsX',title: 'dimensionsX'}
            ,{field: 'dimensionsY',title: 'dimensionsY'}
            ,{field: 'edgePlated',title: 'edgePlated'}
            ,{field: 'engineeringFee',title: 'engineeringFee'}
            ,{field: 'finishThickness',title: 'finishThickness'}
            ,{field: 'gerberName',title: 'gerberName'}
            ,{field: 'gerberPath',title: 'gerberPath'}
            ,{field: 'gmtCreate',title: 'gmtCreate'}
            ,{field: 'gmtModified',title: 'gmtModified'}
            ,{field: 'halfHoleLated',title: 'halfHoleLated'}
            ,{field: 'halogenFree',title: 'halogenFree'}
            ,{field: 'heatConductivity',title: 'heatConductivity'}
            ,{field: 'innerLayerCopper',title: 'innerLayerCopper'}
            ,{field: 'innerMinSpacing',title: 'innerMinSpacing'}
            ,{field: 'innerMinTrack',title: 'innerMinTrack'}
            ,{field: 'invoiceNo',title: 'invoiceNo'}
            ,{field: 'isExistIndicator',title: 'isExistIndicator'}
            ,{field: 'isExistSmt',title: 'isExistSmt'}
            ,{field: 'layerNum',title: 'layerNum'}
            ,{field: 'material',title: 'material'}
            ,{field: 'minHoleSize',title: 'minHoleSize'}
            ,{field: 'nofCore',title: 'nofCore'}
            ,{field: 'nofHoles',title: 'nofHoles'}
            ,{field: 'nofPp',title: 'nofPp'}
            ,{field: 'orderId',title: 'orderId'}
            ,{field: 'orderNo',title: 'orderNo'}
            ,{field: 'orderType',title: 'orderType'}
            ,{field: 'outerLayerCopper',title: 'outerLayerCopper'}
            ,{field: 'outerMinSpacing',title: 'outerMinSpacing'}
            ,{field: 'outerMinTrack',title: 'outerMinTrack'}
            ,{field: 'overworkFee',title: 'overworkFee'}
            ,{field: 'panelRoutingPath',title: 'panelRoutingPath'}
            ,{field: 'panelSizeX',title: 'panelSizeX'}
            ,{field: 'panelSizeY',title: 'panelSizeY'}
            ,{field: 'panelWayX',title: 'panelWayX'}
            ,{field: 'panelWayY',title: 'panelWayY'}
            ,{field: 'pcbType',title: 'pcbType'}
            ,{field: 'peelable',title: 'peelable'}
            ,{field: 'peelableBrand',title: 'peelableBrand'}
            ,{field: 'productCode',title: 'productCode'}
            ,{field: 'productNo',title: 'productNo'}
            ,{field: 'pthCopper',title: 'pthCopper'}
            ,{field: 'punchingHoles',title: 'punchingHoles'}
            ,{field: 'punchingSlots',title: 'punchingSlots'}
            ,{field: 'quantityPanel',title: 'quantityPanel'}
            ,{field: 'quantityPcs',title: 'quantityPcs'}
            ,{field: 'quoteConfigIdList',title: 'quoteConfigIdList'}
            ,{field: 'quoteConfigIds',title: 'quoteConfigIds'}
            ,{field: 'quoteGerberName',title: 'quoteGerberName'}
            ,{field: 'quoteGerberPath',title: 'quoteGerberPath'}
            ,{field: 'remark',title: 'remark'}
            ,{field: 'silkScreenBotColor',title: 'silkScreenBotColor'}
            ,{field: 'silkScreenTopColor',title: 'silkScreenTopColor'}
            ,{field: 'silkScreenTopColor',title: 'silkScreenTopColor'}
            ,{field: 'solderMaskBotColor',title: 'solderMaskBotColor'}
            ,{field: 'solderMaskTopColor',title: 'solderMaskTopColor'}
            ,{field: 'stackUp',title: 'stackUp'}
            ,{field: 'status',title: 'status'}
            ,{field: 'subtotal',title: 'subtotal'}
            ,{field: 'surfaceArea',title: 'surfaceArea'}
            ,{field: 'surfaceFinish',title: 'surfaceFinish'}
            ,{field: 'testCostFee',title: 'testCostFee'}
            ,{field: 'testPoinType',title: 'testPoinType'}
            ,{field: 'testPoint',title: 'testPoint'}
            ,{field: 'testPointType',title: 'testPointType'}
            ,{field: 'tg',title: 'tg'}
            ,{field: 'thickness',title: 'thickness'}
            ,{field: 'toolingFee',title: 'toolingFee'}
            ,{field: 'userId',title: 'userId'}
            ,{field: 'uuid',title: 'uuid'}
            ,{field: 'viaProcess',title: 'viaProcess'}
            ,{field: 'weight',title: 'weight'}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    exports('market_internalQuote', {});
});