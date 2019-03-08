/**

 @Name:    供应商管理－－［报价协同］

 */


layui.define(['admin','table','index','element','form'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,element = layui.element;
    var $ = layui.jquery;

    // 全局变量
    var _public_val = {
        orderType: 1        //订单类型 （1 pcb 2钢网）
    };

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(tab-scmManagement)', function(data){
        console.log(data.index);
        if (data.index === 0){
            _public_val.orderType = 1;       //pcb
        } else if (data.index === 1){
            _public_val.orderType = 2;      //钢网
        } else if (data.index === 2){
            _public_val.orderType = 3;      //贴片
        }
    });

    //▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ PCB订单
    table.render({
        elem: '#scmManaOutSC_tabPcb'
        ,url: setter.baseUrl+'/scm/pcborder/outsourcingContract/list'
        ,toolbar: "#scmManaOutSC_toolbar"
        ,cellMinWidth: 80
        ,id: "scmManaOutSC_tabPcb"
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
            ,{field: 'status',title: '状态',templet: '<div>{{ d.status == 6 ? "已确认交期" : "未确认" }}</div>', minWidth: 104}      // 1 ＝ 待报价
            ,{field: '',title: '报价单号', width: 125}
            ,{field: 'gmtCreate',title: '报价时间', width: 166}
            ,{field: 'supplierNo', title: '供应商编号', width: 124}
            ,{field: 'supplierQuoteNo', title: '供应商厂编', minWidth: 190}
            ,{field: 'productNo', title: '聚谷P/N', width: 124}
            ,{field: 'pcbName', title: '聚谷产品型号', width: 144}
            ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134}
            ,{field: 'unitPrice', title: '单价', width: 96}
            ,{field: 'engineeringFee', title: '工程费', width: 96}
            ,{field: 'testCostFee', title: '飞针费', width: 96}
            ,{field: 'testCostFee', title: '测试架费', width: 96}
            ,{field: 'toolingFee', title: '模具', width: 96}
            ,{field: 'subtotal', title: '合计', width: 96}
            ,{field: 'remark', title: '订单备注', width: 168}
            //▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃
            ,{field: 'dimensionsX', title: 'dimensionsX', hide: true}
            ,{field: 'dimensionsY', title: 'dimensionsY', hide: true}
            ,{field: 'panelSizeX', title: 'panelSizeX', hide: true}
            ,{field: 'panelSizeY', title: 'panelSizeY', hide: true}
            ,{field: 'panelWayX', title: 'panelWayX', hide: true}
            ,{field: 'panelWayY', title: 'panelWayY', hide: true}
            //▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃
            ,{field: 'unitPriceCustomer', title: 'unitPriceCustomer', hide: true}
            ,{field: 'engineeringFeeCustomer', title: 'engineeringFeeCustomer', hide: true}
            ,{field: 'testCostFeeCustomer', title: 'testCostFeeCustomer', hide: true}
            ,{field: 'toolingFeeCustomer', title: 'toolingFeeCustomer', hide: true}
            ,{field: 'subtotal', title: 'subtotal', hide: true}
            // ,{field: 'gerberName',title: '文件名'}
            // ,{field: 'pcbType',title: 'PCB类型'}
            ,{fixed: 'right', title:'操作', toolbar: '#scmManaOutsource_tabbar',width: 160}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(scmManaOutSC_tabPcb)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        if(obj.event === 'evScmSubmit'){
            var data = checkStatus.data;
            console.log(data);
            var supplierContractNo = null;
            var ids = null;
            if(data.length < 1){
                layer.msg("至少选择一条数据！");
                return false;
            }
            for (var i=0;i<data.length;i++){
                if (ids == null){
                    ids += + data[i].id;
                } else {
                    ids += ',' + data[i].id;
                }
                if (supplierContractNo == null){
                    supplierContractNo = data[i].supplierContractNo;
                } else {
                    supplierContractNo += ',' + data[i].supplierContractNo;
                }
            }
            layer.confirm('确认回签 ['+supplierContractNo+'] ?', function(index){
                admin.req({
                    type: 'post',
                    data: {'supplierContractNo':supplierContractNo},
                    url: setter.baseUrl+'scm/pcborder/signBackByOc',
                    success: function (data) {
                        if (data.code == '0'){
                            layer.alert("提交成功！！");
                            table.reload('scmManaOutSC_tabPcb');
                            layer.close(index);
                        }
                    }
                });
            });
        } else if (obj.event == 'confirmDate') {
            var supplierContractNo = null;
            for (var i=0;i<data.length;i++) {
                if (supplierContractNo == null){
                    supplierContractNo = data[i].supplierContractNo;
                } else {
                    supplierContractNo += ","+data[i].supplierContractNo;
                }
            }
            layer.confirm('是否确认交期？', function () {
               admin.req({
                   type: 'post',
                   data: {'supplierContractNo':supplierContractNo},
                   url: setter.baseUrl+'scm/pcborder/confirmDeliveryByOc',
                   success: function () {
                       layer.alert('已确认');
                       table.reload('scmManaOutSC_tabPcb');
                   }
               });
            layer.closeAll();
            });
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(scmManaOutSC_tabPcb)', function (obj) {
        var data = obj.data;
        var supplierContractNo = data.supplierContractNo;
        if (obj.event == 'eevScmedit'){
            layer.msg('编辑操作');
            admin.popup({
                title: 'PCB报价协同编辑'
                ,area: ['50%','80%']
                ,btn: ['保存', '下载客户资料', '取消']
                ,yes: function (index, layero) {
                    layer.msg('提交信息');
                    var postData = new Object();
                    // 供应商修改报价
                    // 接口：sqe/pcborder/quotationTogether/update
                    // 参数：OrderSupplierEntity对象
                    postData.id = data.id;                                      //id
                    postData.orderId = data.orderId;                            //订单id
                    postData.orderType = _public_val.orderType;                 //订单类型（1 pcb 2钢网 3 贴片）
                    postData.supplierId = data.supplierId;                      //供应商id
                    postData.supplierQuoteNo = data.supplierQuoteNo;            //供应商报价单号
                    postData.boardFee = data.boardFee;                          //板费
                    postData.testCostFee = $("#qt_pcb_testCostFee").val();      //测试费
                    postData.engineeringFee = $("#qt_pcb_engineeringFee").val();//工程费
                    postData.toolingFee = $("#qt_pcb_toolingFee").val();        //cnc磨具费
                    postData.overworkFee = data.overworkFee;                    //加急费
                    postData.deliveryTime = $("#pcbDeliveryDate").val();        //交期
                    postData.unitPrice = $("#qt_pcb_unitPrice").val();          //单价
                    postData.remark = $("#qRemark").val();                      //备注
                    postData.status = '';                                       //状态
                    postData.factoryMake = $("#pcbfactoryMake").val();          //厂编
                    postData.testPointType = $("#hiddenTestPoint").val();     //侧孔方式
                    postData.totalFee = $("#qt_pcb_totalFee").text();          //总价
                    console.log(postData);
                    admin.req({
                        type: 'post',
                        data: postData,
                        url: setter.baseUrl+'scm/pcborder/updateQuoteBeOt',
                        success: function (data) {
                            layer.alert("供应商报价修改成功");
                            // layer.closeAll();
                            table.reload('scmManaOutSC_tabPcb');
                            layer.close(index);
                        }
                    });

                }
                ,btn2: function (index, layero) {
                    layer.msg('下载资料');
                    return false;
                }
                ,success: function (layero, index) {
                    view(this.id).render('scmManagement/iframeWindow/quote_detail_pcb',data).done(function () {

                    });
                }
            });
        } else if (obj.event == 'search'){
            layer.msg('查看订单协同');
        } else if (obj.event == 'signBack'){
            layer.confirm('确定退回？', function(index){
                admin.req({
                    type: 'post',
                    data: {'supplierContractNo':supplierContractNo},
                    url: setter.baseUrl+ 'scm/pcborder/rollbackOrderByOc',
                    success: function () {
                        layer.alert("退回成功！");
                        table.reload('scmManaOutSC_tabPcb');
                    }
                });
                layer.close(index);
            });
        }
    });
    exports('scmManagement_outContract', {});
});