/**

 @Name:    供应商管理－－［报价明细］

 */


layui.define(['admin','table','index','element','form', 'convertCurrency', 'requestInterface'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,element = layui.element;
    var $ = layui.jquery;
    var convertCurrency = layui.convertCurrency;
    var requestInterface = layui.requestInterface;
    var defVal = {
        orderType: 0,   //订单类型
    }
    tabRenderPCB();

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(tab-scmManagement)', function(data){
        defVal.orderType = data.index;
        if (data.index === 0){
            tabRenderPCB();
            $(".quote-detail-search").attr("reload-table", "scmMana_tabPcb");
        } else if (data.index === 1){
            tabRenderStencil();
            $(".quote-detail-search").attr("reload-table", "scmMana_tabStencil");
        } else if (data.index === 2){
            $(".quote-detail-search").attr("reload-table", "");
        }
    });

    //▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ PCB订单
    function tabRenderPCB() {
        table.render({
            elem: '#scmMana_tabPcb'
            ,url: setter.baseUrl+'/scm/pcborder/quoteDetail/list'
            ,toolbar: "#scmMana_toolbar"
            ,cellMinWidth: 80
            ,id: "scmMana_tabPcb"
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
                ,{field:'productNo', title: '内部型号', align:'center', width: 114,fixed: 'left', sort: true}
                ,{field: 'supplierNo', title: '供应商编号', width: 124, sort: true}
                ,{field: 'factoryMake', title: '供应商厂编', width: 117, sort: true}
                ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134, sort: true}
                ,{field: 'unitPrice', title: '单价', width: 96, sort: true}
                ,{field: 'engineeringFee', title: '工程费', width: 96, sort: true}
                ,{field: 'testCostFee', title: '飞针费', width: 96, sort: true}
                ,{field: 'testCostFee', title: '测试架费', width: 96, sort: true}
                ,{field: 'toolingFee', title: '模具', width: 96, sort: true}
                ,{field: 'totalFee', title: '合计', width: 96, sort: true}
                ,{field: 'supplierQuoteNo',title: '报价单号', width: 172, sort: true}
                ,{field: 'pcbName', title: '聚谷物料号', width: 144, sort: true}
                ,{field: 'gmtCreate',title: '报价时间', width: 166, sort: true}
                ,{field: 'remark', title: '报价备注', width: 168, sort: true}
                //▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃
                ,{field: 'status',title: '状态',templet: '#scmManaquo_status',width: 115, hide: true}      // 1 ＝ 待报价
                ,{field: 'dimensionsX', title: 'dimensionsX', hide: true}
                ,{field: 'existContractMark', title: 'existContractMark', hide: true}   // 是否生成合同标识 0 否 1 是
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
                ,{fixed: 'right', title:'操作', toolbar: '#scmMana_tabbar',width: 160}
            ]]
            ,done: function (res, curr, count) {
                $("a[data='1']").each(function () {
                    $(this).parents('tr').css('background-color','#c2c2c2');
                    $(this).parents('tr').find("input[type='checkbox']").prop("disabled",true);
                    form.render();
                });
            }
        });
    }
    table.on('toolbar(scmMana_tabPcb)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        var totalFee = 0;
        if(obj.event === 'evScmSubmit'){
            var orderSupplierList = new Array();
            var popupData = {data:{}};
            var supplierNo;
            popupData.data = data;
            for (var i=0;i<data.length;i++){
                if (supplierNo == null) {
                    supplierNo = data[i].supplierNo;
                } else if (supplierNo != null && data[i].supplierNo != supplierNo) {
                    layer.alert('请选择相同的供应商!');
                    console.log(111);
                    return false;
                }
                var forSt = data[i].totalFee;
                orderSupplierList.push({id:data[i].id,orderId:data[i].orderId,orderType:data[i].orderType,isInternal:data[i].isInternal,onlineOid:data[i].onlineOid});
                totalFee += forSt;
            }
            console.log("totalFee:"+totalFee);
            // 金额转换为中文大写
            convertSubtotal = convertCurrency.conversion(totalFee);
            popupData.totalFee = totalFee;
            popupData.convertSubtotal = convertSubtotal;    
            // 获取供应商信息
            popupData.supplierInfo =requestInterface.GetSupplierInfo(setter.baseUrl+'sys/supplier/info/'+data[0].supplierId);
            console.log(popupData);
            admin.popup({
                title: 'PCB合同'
                ,area: ['100%', '100%']
                ,btn: ['生成合同', '取消']
                ,yes: function (index, layero) {
                    layer.confirm('是否生成合同?', function(index){
                        $.ajax({
                            type: 'post',
                            headers: {access_token:layui.data('layuiAdmin').access_token},
                            data:  JSON.stringify(orderSupplierList),
                            contentType: "application/json;charset=utf-8",
                            url: setter.baseUrl+'/scm/pcborder/createContractBeOt',
                            success: function (data) {
                                if (data.code == '0'){
                                    layer.alert("提交成功！！");
                                    table.reload('scmMana_tabPcb');
                                    layer.closeAll();
                                }
                            }
                        });
                    });
                }
                ,success: function (layero, index) {
                    view(this.id).render('scmManagement/iframeWindow/outs_contract',popupData).done(function () {
                    });
                }
            })
        } else if (obj.event === 'directlySubmit') {
            var _len = data.length;
            var orderSupplierList = new Array();
            var supplierNo;
            if (_len < 1) {
                layer.msg('请至少选择一条数据');
            } else {
                for (var i = 0; i<_len; i++) {
                    if (supplierNo == null) {
                        supplierNo = data[i].supplierNo;
                    } else if (supplierNo != null && data[i].supplierNo != supplierNo) {
                        layer.alert('请选择相同的供应商!');
                        console.log(111);
                        return false;
                    }
                    var forSt = data[i].totalFee;
                    orderSupplierList.push({id:data[i].id,orderId:data[i].orderId,orderType:data[i].orderType,isInternal:data[i].isInternal,onlineOid:data[i].onlineOid});
                }
                layer.confirm('确定要直接提交？', function () {
                    $.ajax({
                        type: 'post',
                        headers: {access_token:layui.data('layuiAdmin').access_token},
                        data:  JSON.stringify(orderSupplierList),
                        contentType: "application/json;charset=utf-8",
                        url: setter.baseUrl+'/scm/pcborder/createContractBeOt',
                        success: function (data) {
                            if (data.code == '0'){
                                layer.alert("提交成功！！");
                                table.reload('scmMana_tabPcb');
                                layer.closeAll();
                            }
                        }
                    });
                });
            }
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(scmMana_tabPcb)', function (obj) {
        var data = obj.data;
        console.log(data)
        if (obj.event == 'eevScmedit'){
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
                    postData.overworkFee = data.overworkFee;                    //加急费
                    postData.deliveryTime = $("#pcbDeliveryDate").val();        //交期
                    postData.unitPrice = $("#qt_pcb_unitPrice").val();          //单价
                    postData.remark = $("#qRemark").val();                      //备注
                    postData.status = '';                                       //状态
                    postData.factoryMake = $("#pcbfactoryMake").val();          //厂编
                    postData.testPointType = $("#hiddenTestPoint").val();     //侧孔方式
                    postData.totalFee = $("#qt_pcb_totalFee").text();          //总价
                    // PCBA
                    postData.pcbaProcessFee = $("#qt_pcbaProcessFee").val();    //加工费
                    postData.pcbaPartsFee = $("#qt_pcbaPartsFee").val();        //零件费
                    postData.pcbaTestFee = $("#qt_pcbaTestFee").val();          //测试费
                    postData.pcbaToolFee = $("#qt_pcbaToolFee").val();          //工具费
                    postData.pcbaSubtotalFee = $("#qt_pcbaSubtotalFee").text(); //小计

                    // console.log(postData);
                    admin.req({
                        type: 'post',
                        data: postData,
                        url: setter.baseUrl+'scm/pcborder/updateQuoteBeOt',
                        success: function (data) {
                            layer.alert("供应商报价修改成功");
                            // layer.closeAll();
                            table.reload('scmMana_tabPcb');
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
                        // 下载客户资料， popup按钮顺序不能变
                        $(".layui-layer-btn1").prop("href",setter.baseUrl1+"quote/gerberFileDownload?filePathName="+data.gerberPath+"&fileName="+data.gerberName);
                    });
                }
            });
        } else if (obj.event == 'rollback'){
            layer.msg('回退操作');
            layer.confirm('确定退回订单['+data.productNo+']?', function (index) {
               obj.del();
               admin.req({
                  type: 'post',
                  data: {'ids':data.id},
                   url: setter.baseUrl+'/scm/pcborder/rollbackQuoteBeOt',
                   success: function () {
                       layer.alert("已退回["+data.productNo+']');
                       table.reload('scmMana_tabPcb');
                   }
               });
            });
        } else if (obj.event == 'eevScmdel'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                admin.req({
                    type: 'post',
                    data: {'ids':data.id},
                    url: setter.baseUrl+ '/scm/ordersupplier/delete',
                    success: function () {
                        layer.alert("删除成功！");
                        table.reload('scmMana_tabPcb');
                    }
                });
                layer.close(index);
            });
        }
    });

    //▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ Stencil 钢网 订单

    function tabRenderStencil() {
        table.render({
            elem: '#scmMana_tabStencil'
            ,url: setter.baseUrl+'scm/stencilorder/quoteDetail/list'
            ,toolbar: "#scmManaStencil_toolbar"
            ,cellMinWidth: 80
            ,id: "scmMana_tabStencil"
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
                ,{field:'productNo', title: '内部型号', align:'center', width: 114,fixed: 'left', sort: true}
                ,{field: 'supplierNo', title: '供应商编号', width: 124, sort: true}
                ,{field: 'factoryMake', title: '供应商厂编', width: 117, sort: true}
                ,{field: 'quantity', title: '订单数量(PCS)', width: 134, sort: true}
                ,{field: 'unitPrice', title: '单价', width: 96, sort: true}
                ,{field: 'totalFee', title: '合计', width: 96, sort: true}
                ,{field: 'remark', title: '报价备注', width: 168, sort: true}
                ,{field: 'pcbName', title: '聚谷物料号', width: 144, sort: true}
                ,{field: 'supplierQuoteNo',title: '报价单号', width: 172, sort: true}
                ,{field: 'gmtCreate',title: '报价时间', width: 166, sort: true}
                //▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃
                ,{field: 'status',title: '状态',templet: '#scmManaquo_status',width: 115, hide: true}      // 1 ＝ 待报价
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
                ,{fixed: 'right', title:'操作', toolbar: '#scmManaStencil_tabbar',width: 160}
            ]]
            ,done: function (res, curr, count) {
                $("a[data='1']").each(function () {
                    $(this).parents('tr').css('background-color','#c2c2c2');
                    $(this).parents('tr').find("input[type='checkbox']").prop("disabled",true);
                    form.render();
                });
            }
        });
    }
    table.on('toolbar(scmMana_tabStencil)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        var totalFee = 0;
        if(obj.event === 'evScmSubmit'){
            var ids = null;
            var popupData = {data:{}};
            var supplierNo;
            popupData.data = data;
            var orderSupplierList = new Array();
            for (var i=0;i<data.length;i++) {
                if (supplierNo == null) {
                    supplierNo = data[i].supplierNo;
                } else if (supplierNo != null && data[i].supplierNo != supplierNo) {
                    layer.alert('请选择相同的供应商!');
                    console.log(111);
                    return false;
                }
                var forSt = data[i].totalFee;
                totalFee += forSt;
                orderSupplierList.push({id:data[i].id,orderId:data[i].orderId,orderType:data[i].orderType,isInternal:data[i].isInternal,onlineOid:data[i].onlineOid});
            }
            console.log("totalFee:"+totalFee);
            // 金额转换为中文大写
            convertSubtotal = convertCurrency.conversion(totalFee);
            popupData.totalFee = totalFee;
            popupData.convertSubtotal = convertSubtotal;
            // 获取供应商信息
            popupData.supplierInfo =requestInterface.GetSupplierInfo(setter.baseUrl+'sys/supplier/info/'+data[0].supplierId);
            console.log(popupData.supplierInfo);
            admin.popup({
                title: 'Stencil合同'
                ,area: ['100%', '100%']
                ,btn: ['生成合同', '取消']
                ,yes: function (index, layero) {
                    layer.confirm('是否生成合同?', function(index){
                         $.ajax({
                            type: 'post',
                            headers: {access_token:layui.data('layuiAdmin').access_token},
                            data:  JSON.stringify(orderSupplierList),
                            contentType: "application/json;charset=utf-8",
                            url: setter.baseUrl+'scm/stencilorder/createContractBeOt',
                            success: function (data) {
                                if (data.code == '0'){
                                    layer.alert("提交成功！！");
                                    table.reload('scmMana_tabStencil');
                                    layer.closeAll();
                                }
                            }
                        });
                    });
                }
                ,success: function (layero, index) {
                    view(this.id).render('scmManagement/iframeWindow/outs_contractS',popupData).done(function () {
                    });
                }
            })
        } else if (obj.event === 'directlySubmit') {
            var _len = data.length;
            var orderSupplierList = new Array();
            var supplierNo;
            if (_len < 1) {
                layer.msg('请至少选择一条数据');
            } else {
                for (var i = 0; i<_len; i++) {
                    if (supplierNo == null) {
                        supplierNo = data[i].supplierNo;
                    } else if (supplierNo != null && data[i].supplierNo != supplierNo) {
                        layer.alert('请选择相同的供应商!');
                        console.log(111);
                        return false;
                    }
                    var forSt = data[i].totalFee;
                    orderSupplierList.push({id:data[i].id,orderId:data[i].orderId,orderType:data[i].orderType,isInternal:data[i].isInternal,onlineOid:data[i].onlineOid});
                }
                layer.confirm('确定要直接提交？', function () {
                    $.ajax({
                        type: 'post',
                        headers: {access_token:layui.data('layuiAdmin').access_token},
                        data:  JSON.stringify(orderSupplierList),
                        contentType: "application/json;charset=utf-8",
                        url: setter.baseUrl+'/scm/stencilorder/createContractBeOt',
                        success: function (data) {
                            if (data.code == '0'){
                                layer.alert("提交成功！！");
                                table.reload('scmMana_tabStencil');
                                layer.closeAll();
                            }
                        }
                    });
                });
            }
        }
    });
    //监听行工具事件＝＝＝＝》Stencil 钢网订单
    table.on('tool(scmMana_tabStencil)', function (obj) {
        var data = obj.data;
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
                    // console.log(postData);
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
                        // 下载客户资料， popup按钮顺序不能变
                        $(".layui-layer-btn1").prop("href",setter.baseUrl1+"quote/gerberFileDownload?filePathName="+data.gerberPath+"&fileName="+data.gerberName);
                    });
                }
            });
        } else if (obj.event == 'rollback'){
            layer.msg('回退操作');
            layer.confirm('确定退回订单sss['+data.productNo+']?', function (index) {
                obj.del();
                admin.req({
                    type: 'post',
                    data: {'ids':data.id},
                    url: setter.baseUrl+'scm/stencilorder/rollbackQuoteBeOt',
                    success: function () {
                        layer.alert("已退回["+data.productNo+']');
                        table.reload('scmMana_tabPcb');
                    }
                });
            });
        } else if (obj.event == 'eevScmdel'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                admin.req({
                    type: 'post',
                    data: {'ids':data.id},
                    url: setter.baseUrl+ '/scm/ordersupplier/delete',
                    success: function () {
                        layer.alert("删除成功！");
                        table.reload('scmMana_tabPcb');
                    }
                });
                layer.close(index);
            });
        }
    });

    exports('scmMana_quoteDetail', {});
});