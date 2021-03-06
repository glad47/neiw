/**

 @Name:    供应商管理－－［确认交期］

 */


layui.define(['admin','table','index','element','form','convertCurrency', 'requestInterface', 'formSelects','laydate'], function (exports) {
    var table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,formSelects = layui.formSelects
        ,laydate = layui.laydate
        ,element = layui.element
        ,$ = layui.jquery;

    var convertCurrency = layui.convertCurrency;
    var requestInterface = layui.requestInterface;

    form.render(null,'scm-outgoing-contract-formlist');

    var defVal = {
        orderType: 0,   //订单类型
    }
    tabRenderPCB();

    var pcbtabObj;  // PCB表格数据对象
    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(scm-outsourcing-contract-tabs-brief)', function(data){
        defVal.orderType = data.index;
        var tabNum = data.index;
        if (tabNum === 0) {
            tabRenderPCB();
        } else if (tabNum === 1) {
            tabRenderStencil();
        } else if (tabNum === 2) {
            // tabRenderAssembly();
        }
    });

    form.on('submit(LAY-scm-outsourcing-contract-search)', function (data) {
        var field = data.field;
        var reTab, tabNum = defVal.orderType;;
        if (tabNum === 0) {   // PCB
            reTab = 'scmManaOutSC_tabPcb';
        } else if (tabNum === 1) {    //  Stencil
            reTab = 'scmManaOutSC_tabStencil';
        } else if(tabNum === 2){
            // reTab = 'smt_orderTab_no_payment'; //assembly
        }
        table.reload(reTab,{
            where: field
        });
    })


    //▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ PCB订单
    function tabRenderPCB() {
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
            ,cols: [[
                {type:'checkbox',fixed: 'left'}
                ,{field: 'productNo', title: '聚谷型号', width: 135, sort: true}
                ,{field: 'supplierNo', title: '供应商编号', width: 124, sort: true}
                ,{field: 'status',title: '状态',templet: '#og_status', minWidth: 104, sort: true}      // 1 ＝ 待报价
                ,{field: 'gmtCreate',title: '创建时间', width: 166, sort: true}
                ,{field: 'pcbName', title: '聚谷物料号', width: 144, sort: true}
                ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134, sort: true}
                ,{field: 'unitPrice', title: '单价', width: 96, sort: true}
                ,{field: 'engineeringFee', title: '工程费', width: 96, sort: true}
                ,{field: 'testCostFee', title: '飞针费', width: 96, sort: true}
                ,{field: 'testCostFee', title: '测试架费', width: 96, sort: true}
                ,{field: 'toolingFee', title: '模具', width: 96, sort: true}
                ,{field: 'totalFee', title: '合计', width: 96, sort: true}
                ,{field: 'remark', title: '订单备注', width: 168, sort: true}
                ,{field: 'supplierContractNo',title: '合同编号', minWidth: 171, sort: true}
                ,{field: 'factoryMake', title: '供应商厂编', minWidth: 190, sort: true}
                
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
                var data = res.data;    //获取表格所有数据对象
                pcbtabObj = data;
            }
        });
    }
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
                    done: function (res) {
                        layer.alert("提交成功！！");
                        table.reload('scmManaOutSC_tabPcb');
                        layer.close(index);
                    }
                });
            });
        } else if (obj.event == 'confirmDate') {
            var orderSupplierList = new Array();
            for (var i=0;i<data.length;i++) {
                orderSupplierList.push({orderId:data[i].orderId,supplierContractNo:data[i].supplierContractNo});
            }
            layer.confirm('是否确认交期？', function () {
               $.ajax({
                   type: 'post',
                   headers: {access_token:layui.data('layuiAdmin').access_token},
                   data:  JSON.stringify(orderSupplierList),
                   contentType: "application/json;charset=utf-8",
                   url: setter.baseUrl+'scm/pcborder/confirmDeliveryByOc',
                   done: function () {
                       layer.alert('已确认');
                       table.reload('scmManaOutSC_tabPcb');
                   },
                   fail: function (res) {
                        layer.msg('供应商加失败');
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
                ,area: ['65%','80%']
                ,btn: ['保存', '下载客户资料', '取消']
                ,yes: function (index, layero) {
                    form.val("scm-quote-detail-form-list",{optionMark:"save"});
                    $("#scm-quote-detail-form-submit").click();
                }
                ,btn2: function (index, layero) {
                    layer.msg('下载资料');
                    return false;
                }
                ,success: function (layero, index) {
                    view(this.id).render('scmManagement/iframeWindow/quote_detail_pcb',data).done(function () {
                        form.render(null,'scm-quote-detail-form-list');
                       
                        form.on('submit(LAY-scm-quote-detail-form-submit)',function(data){
                            let field = data.field;
                            if(field.optionMark === "pricing"){//计算小计和总计
                                let pcbTotal = (parseFloat(field.engineeringFee) + parseFloat(field.overworkFee) + parseFloat(field.testCostFee) + parseFloat(field.toolingFee) + parseFloat(field.otherFee) + parseFloat(field.unitPrice * field.quantityPcs)).toFixed(2);
                                let pcbaTotal = (parseFloat(field.pcbaToolFee) + parseFloat(field.pcbaTestFee) + parseFloat(field.pcbaPartsFee) + parseFloat(field.pcbaProcessFee)).toFixed(2);
                                let allTotal = (parseFloat(pcbTotal) + parseFloat(pcbaTotal)).toFixed(2);
                                form.val("scm-quote-detail-form-list",{allFee:allTotal,totalFee:pcbTotal,pcbaSubtotalFee:pcbaTotal});
                                return false;
                            }else if(field.optionMark === "save"){//保存操作
                                admin.req({
                                    type: 'post',
                                    data: field,
                                    url: setter.baseUrl+'scm/pcborder/updateQuoteBeOt',
                                    done: function (res) {
                                        layer.msg('修改成功');
                                        table.reload('scmManaOutSC_tabPcb');
                                    },
                                    fail: function (res) {
                                        layer.msg('修改失败');
                                    }
                                });
                                layer.close(index);   
                            }
                        });
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

    //▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ Stencil 钢网 订单
    function tabRenderStencil() {
        table.render({
            elem: '#scmManaOutSC_tabStencil'
            ,url: setter.baseUrl+'scm/stencilorder/outsourcingContract/list'
            ,toolbar: "#scmManaOutSC_toolbarS"
            ,cellMinWidth: 80
            ,id: "scmManaOutSC_tabStencil"
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
                ,{field: 'productNo', title: '聚谷型号', width: 135, sort: true}
                ,{field: 'supplierNo', title: '供应商编号', width: 124, sort: true}
                ,{field: 'status',title: '状态',templet: '#og_statusS', minWidth: 104, sort: true}      // 1 ＝ 待报价
                ,{field: 'gmtCreate',title: '创建时间', width: 166, sort: true}
                ,{field: 'pcbName', title: '聚谷物料号', width: 144, sort: true}
                ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134, sort: true}
                ,{field: 'unitPrice', title: '单价', width: 96, sort: true}
                ,{field: 'engineeringFee', title: '工程费', width: 96, sort: true}
                ,{field: 'testCostFee', title: '飞针费', width: 96, sort: true}
                ,{field: 'testCostFee', title: '测试架费', width: 96, sort: true}
                ,{field: 'toolingFee', title: '模具', width: 96, sort: true}
                ,{field: 'subtotal', title: '合计', width: 96, sort: true}
                ,{field: 'remark', title: '订单备注', width: 168, sort: true}
                ,{field: 'supplierContractNo',title: '合同编号', minWidth: 171, sort: true}
                ,{field: 'factoryMake', title: '供应商厂编', minWidth: 190, sort: true}
                
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
                ,{fixed: 'right', title:'操作', toolbar: '#scmManaOutsource_tabbarS',width: 160}
            ]]
            ,done: function (res, curr, count) {
                var data = res.data;    //获取表格所有数据对象
                stenciltabObj = data;

                console.log("i am inside the done function of the table  --- -- -- printing the stenciltabObj info  -- -- -- >  ");
                console.log(stenciltabObj)
            }
        });
    }
    table.on('toolbar(scmManaOutSC_tabStencil)', function (obj) {
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
                    url: setter.baseUrl+'scm/stencilorder/signBackByOc',
                    success: function (data) {
                        if (data.code == '0'){
                            layer.alert("提交成功！！");
                            table.reload('scmManaOutSC_tabStencil');
                            layer.close(index);
                        }
                    }
                });
            });
        } else if (obj.event == 'confirmDate') {
            var orderSupplierList = new Array();
            for (var i=0;i<data.length;i++) {
                orderSupplierList.push({orderId:data[i].orderId,supplierContractNo:data[i].supplierContractNo});
            }
            layer.confirm('是否确认交期？', function () {
                admin.req({
                    type: 'post',
                    headers: {access_token:layui.data('layuiAdmin').access_token},
                    data:  JSON.stringify(orderSupplierList),
                    contentType: "application/json;charset=utf-8",
                    url: setter.baseUrl+'scm/stencilorder/confirmDeliveryByOc',
                    success: function () {
                        layer.alert('已确认');
                        table.reload('scmManaOutSC_tabStencil');
                    }
                });
                layer.closeAll();
            });
        }
    });

    //监听行工具事件＝＝＝＝》Stencil 钢网 订单
    table.on('tool(scmManaOutSC_tabStencil)', function (obj) {
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
            console.log("i am inside the search  --------------> > >  ")
            var popupData = {data:{}};
            var lineData = obj.data;
            console.log("************************very important iyou need tio understands this data structure *****************************")
            console.log(obj.data)
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
        } else if (obj.event == 'signBack'){
            layer.confirm('确定退回？', function(index){
                admin.req({
                    type: 'post',
                    data: {'supplierContractNo':supplierContractNo},
                    url: setter.baseUrl+ 'scm/stencilorder/rollbackOrderByOc',
                    success: function () {
                        layer.alert("退回成功！");
                        table.reload('scmManaOutSC_tabStencil');
                    }
                });
                layer.close(index);
            });
        }
    });

    exports('scmMana_outContract', {});
});