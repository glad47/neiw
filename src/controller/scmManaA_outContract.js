/**

 @Name:    供应商管理－－［报价协同］

 */


layui.define(['admin','table','index','element','form','convertCurrency', 'requestInterface', 'formSelects'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,formSelects = layui.formSelects
        ,element = layui.element;
    var $ = layui.jquery;
    var convertCurrency = layui.convertCurrency;
    var requestInterface = layui.requestInterface;
    var defVal = {
        orderType: 0,   //订单类型
    }
    tabRenderPCB();

    var pcbtabObj;  // PCB表格数据对象
    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(tab-scmManagement)', function(data){
        defVal.orderType = data.index;
        if (data.index === 1){
            $(".outsourcing-contract-all-search").attr("reload-table", "scmManaOutSCA_tabStencil");
            tabRenderStencil();
        } else if (data.index === 2){
            $(".outsourcing-contract-all-search").attr("reload-table", "");
        } else {
            $(".outsourcing-contract-all-search").attr("reload-table", "scmManaOutSCA_tabPcb");
            tabRenderPCB();
        }
    });

 

    function tabRenderPCB(){
        table.render({
            elem: '#scmManaOutSCA_tabPcb'
            ,url: setter.baseUrl+'scm/pcborder/outsourcingContractAll/list'
            ,cellMinWidth: 80
            ,id: "scmManaOutSCA_tabPcb"
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
                ,{field: 'status',title: '状态',templet: '#og_statusA', minWidth: 104, sort: true}      // 1 ＝ 待报价
                ,{field: 'supplierContractNo',title: '合同编号', minWidth: 171, sort: true}
                ,{field: 'gmtCreate',title: '创建时间', width: 166, sort: true}
                ,{field: 'supplierNo', title: '供应商编号', width: 124, sort: true}
                ,{field: 'factoryMake', title: '供应商厂编', minWidth: 190, sort: true}
                ,{field: 'productNo', title: '聚谷型号', width: 124, sort: true}
                ,{field: 'pcbName', title: '聚谷物料号', width: 144, sort: true}
                ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134, sort: true}
                ,{field: 'unitPrice', title: '单价', width: 96, sort: true}
                ,{field: 'engineeringFee', title: '工程费', width: 96, sort: true}
                ,{field: '', title: '飞针费', width: 96, sort: true, templet:'<div>{{ d.testPointType == 1 ? d.testCostFee : "" }}</div>'}
                ,{field: '', title: '测试架费', width: 96, sort: true ,templet:'<div>{{ d.testPointType != 1 ? d.testCostFee : "" }}</div>'}
                ,{field: 'toolingFee', title: '模具', width: 96, sort: true}
                ,{field: 'totalFee', title: '合计', width: 96, sort: true}
                ,{field: 'remark', title: '订单备注', width: 168, sort: true}
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
                ,{fixed: 'right', title:'操作', toolbar: '#scmManaOutsourceA_tabbar',width: 160}
            ]]
            ,done: function (res, curr, count) {
                var data = res.data;    //获取表格所有数据对象
                pcbtabObj = data;
            }
        });
    }
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(scmManaOutSCA_tabPcb)', function (obj) {
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
                    postData.supplierId = data.supplierId;                      //供应商id
                    postData.supplierQuoteNo = data.supplierQuoteNo;            //供应商报价单号
                    postData.boardFee = data.boardFee;                          //板费
                    postData.testCostFee = $("#qt_pcb_testCostFee").val();      //测试费
                    postData.engineeringFee = $("#qt_pcb_engineeringFee").val();//工程费
                    postData.toolingFee = $("#qt_pcb_toolingFee").val();        //cnc磨具费
                    postData.overworkFee = $("#qt_pcb_overworkFee").val();      //加急费
                    postData.deliveryTime = $("#pcbDeliveryDate").val();        //交期
                    postData.unitPrice = $("#qt_pcb_unitPrice").val();          //单价
                    postData.remark = $("#qRemark").val();                      //备注
                    postData.status = '';                                       //状态
                    postData.factoryMake = $("#pcbfactoryMake").val();          //厂编
                    postData.testPointType = $("#hiddenTestPoint").val();     //侧孔方式
                    postData.totalFee = $("#qt_pcb_totalFee").text();          //总价
                    // PCBA
                    postData.pcbaProcessFee = $("#qt_pcbaProcessFee").val();          //加工费
                    postData.pcbaPartsFee = $("#qt_pcbaPartsFee").val();          //零件费
                    postData.pcbaTestFee = $("#qt_pcbaTestFee").val();          //测试费
                    postData.pcbaToolFee = $("#qt_pcbaToolFee").val();          //工具钢网费
                    postData.pcbaSubtotalFee = $("#qt_pcbaSubtotalFee").text();          //小计
                    console.log(postData);
                    admin.req({
                        type: 'post',
                        data: postData,
                        url: setter.baseUrl+'scm/pcborder/updateQuoteBeOt',
                        success: function (data) {
                            layer.alert("供应商报价修改成功");
                            // layer.closeAll();
                            table.reload('scmManaOutSCA_tabPcb');
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
            var popupData = {data:{}};
            var lineData = obj.data;
            var supplierContractNo = lineData.supplierContractNo;
            var sd_len = 0;
            var totalFee = 0;
            var convertSubtotal;
            for (var i=0;i<pcbtabObj.length;i++) {
                if (supplierContractNo == pcbtabObj[i].supplierContractNo) {
                    sd_len += 1;
                    var forData = pcbtabObj[i];
                    popupData.data[sd_len] = forData;
                    totalFee += pcbtabObj[i].totalFee;
                }
            }
            for (var i=0;i<popupData.data.length;i++){
                var forSt = popupData.data[i].subtotal;
                totalFee += forSt;
                console.log("totalFee:"+totalFee);
                console.log("sd_len:"+sd_len);
            }
            // 金额转换为中文大写
            convertSubtotal = convertCurrency.conversion(totalFee);
            console.log("convertSubtotal:"+convertSubtotal);
            popupData.totalFee = totalFee;
            popupData.convertSubtotal = convertSubtotal;
            // 获取供应商信息
            popupData.supplierInfo =requestInterface.GetSupplierInfo(setter.baseUrl+'sys/supplier/info/'+data.supplierId);
            console.log(popupData)
            admin.popup({
                title: '外协合同'
                ,area: ['100%', '100%']
                ,btn: ['打印','关闭']
                ,yes: function () {
                    var printId = "outsContract";
                    document.body.innerHTML = document.getElementById(printId).innerHTML;
                    window.print();
                    window.location.reload();
                }
                ,success: function () {
                    view(this.id).render('scmManagement/iframeWindow/outs_contract', popupData).done(function () {
                        // var str = convertCurrency.conversion(12.03);
                        // layer.alert(str);
                    })
                }
            });
        }
    });

    function tabRenderStencil(){
        table.render({
            elem: '#scmManaOutSCA_tabStencil'
            ,url: setter.baseUrl+'scm/stencilorder/outsourcingContractAll/list'
            ,cellMinWidth: 80
            ,id: "scmManaOutSCA_tabStencil"
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
                ,{field: 'status',title: '状态',templet: '#og_statusSA', minWidth: 104, sort: true}      // 1 ＝ 待报价
                ,{field: 'supplierContractNo',title: '合同编号', minWidth: 171, sort: true}
                ,{field: 'gmtCreate',title: '创建时间', width: 166, sort: true}
                ,{field: 'supplierNo', title: '供应商编号', width: 124, sort: true}
                ,{field: 'factoryMake', title: '供应商厂编', minWidth: 190, sort: true}
                ,{field: 'productNo', title: '聚谷型号', width: 124, sort: true}
                ,{field: 'pcbName', title: '聚谷物料号', width: 144, sort: true}
                ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134, sort: true}
                ,{field: 'unitPrice', title: '单价', width: 96, sort: true}
                ,{field: 'engineeringFee', title: '工程费', width: 96, sort: true}
                ,{field: 'testCostFee', title: '飞针费', width: 96, sort: true}
                ,{field: 'testCostFee', title: '测试架费', width: 96, sort: true}
                ,{field: 'toolingFee', title: '模具', width: 96, sort: true}
                ,{field: 'totalFee', title: '合计', width: 96, sort: true}
                ,{field: 'remark', title: '订单备注', width: 168, sort: true}
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
                ,{fixed: 'right', title:'操作', toolbar: '#scmManaOutsourceA_tabbarS',width: 160}
            ]]
            ,done: function (res, curr, count) {
                var data = res.data;    //获取表格所有数据对象
                stenciltabObj = data;
            }
        });
    }
    //监听行工具事件＝＝＝＝》Stencil 钢网 订单
    table.on('tool(scmManaOutSCA_tabStencil)', function (obj) {
        var data = obj.data;
        var supplierContractNo = data.supplierContractNo;
        if (obj.event == 'eevScmedit'){
            layer.msg('编辑操作');
            admin.popup({
                title: 'Stencil 钢网报价协同编辑'
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
                    postData.supplierId = data.supplierId;                      //供应商id
                    postData.supplierQuoteNo = data.supplierQuoteNo;            //供应商报价单号
                    postData.deliveryTime = $("#stencilDeliveryDate").val();    //交期
                    postData.unitPrice = $("#qt_stencil_unitPrice").val();      //单价
                    postData.remark = $("#sRemark").val();                      //备注
                    postData.status = '';                                       //状态
                    postData.factoryMake = $("#stencilfactoryMake").val();     // 厂编
                    postData.totalFee = $("#qt_stencil_totalFee").text();          //总价
                    console.log(postData);
                    admin.req({
                        type: 'post',
                        data: postData,
                        url: setter.baseUrl+'scm/stencilorder/updateQuoteBeOt',
                        success: function (data) {
                            layer.alert("供应商报价修改成功");
                            // layer.closeAll();
                            table.reload('scmMana_tabStencil');
                            layer.close(index);
                        }
                    });

                }
                ,btn2: function (index, layero) {
                    layer.msg('下载资料');
                    return false;
                }
                ,success: function (layero, index) {
                    view(this.id).render('scmManagement/iframeWindow/quote_detail_stencil',data).done(function () {

                    });
                }
            });
        } else if (obj.event == 'search'){
            var popupData = {data:{}};
            var lineData = obj.data;
            var supplierContractNo = lineData.supplierContractNo;
            var sd_len = 0;
            var subtotal = 0;
            var convertSubtotal;
            for (var i=0;i<stenciltabObj.length;i++) {
                if (supplierContractNo == stenciltabObj[i].supplierContractNo) {
                    sd_len += 1;
                    var forData = stenciltabObj[i];
                    popupData.data[sd_len] = forData;
                    subtotal += stenciltabObj[i].totalStencilFee;
                }
            }
            for (var i=0;i<popupData.data.length;i++){
                console.log("开始循环");
                var forSt = popupData.data[i].totalStencilFee;
                subtotal += forSt;
                console.log("subtotal:"+subtotal);
                console.log("sd_len:"+sd_len);
            }
            // 金额转换为中文大写
            convertSubtotal = convertCurrency.conversion(subtotal);
            console.log("convertSubtotal:"+convertSubtotal);
            popupData.subtotal = subtotal;
            popupData.convertSubtotal = convertSubtotal;
            // 获取供应商信息
            popupData.supplierInfo =requestInterface.GetSupplierInfo(setter.baseUrl+'sys/supplier/info/'+data.supplierId);
            admin.popup({
                title: '外协合同'
                ,area: ['100%', '100%']
                ,btn: ['打印','关闭']
                ,yes: function () {
                    var printId = "outsContract";
                    document.body.innerHTML = document.getElementById(printId).innerHTML;
                    window.print();
                    window.location.reload();
                }
                ,success: function () {
                    view(this.id).render('scmManagement/iframeWindow/outs_contractS', popupData).done(function () {
                        // var str = convertCurrency.conversion(12.03);
                        // layer.alert(str);
                    })
                }
            });
        }
    });

   //监听搜索
    form.on('submit(outsourcing_contract_all_search)', function(data){
        var field = data.field;
        var reTab;
        if (defVal.orderType === 0) {   // PCB
            reTab = 'scmManaOutSCA_tabPcb';
        } else if (defVal.orderType === 1) {    //  Stencil
            reTab = 'scmManaOutSCA_tabStencil';
        }
        table.reload(reTab, {
            where: field
        });
    });

    $(".outsourcing-contract-all-search input").bind("input propertychange", function (even) {
        $("*[lay-filter='outsourcing_contract_all_search']").click();
    });
    layui.formSelects.on('status', function (id, vals, val, isAdd, isDisabled) {
        formSelects.value('status', [val.value]);
        $("*[lay-filter='outsourcing_contract_all_search']").click();
    });
    exports('scmManaA_outContract', {});
});