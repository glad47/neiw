/**

 @Name:    供应商管理－－［订单协同］

 */


layui.define(['admin','table','index','element','form','laydate','requestInterface','convertCurrency'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        // ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element;
    var $ = layui.jquery;
    var requestInterface = layui.requestInterface;
    var convertCurrency = layui.convertCurrency;

    tabRenderPCB();
    // 全局变量
    var _public_val = {
        orderType: 1        //订单类型 （1 pcb 2钢网 3 贴片）
    };
    var pcbtabObj;  // PCB表格数据对象

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(tabot-scmManagement)', function(data){
        console.log(data.index);
        if (data.index === 0){
            _public_val.orderType = 1;       //pcb
            tabRenderPCB();
        } else if (data.index === 1){
            _public_val.orderType = 2;      //钢网
            tabRenderStencil();
        } else if (data.index === 2){
            _public_val.orderType = 3;      //贴片
        }
    });

    //▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉  PCB订单
    function tabRenderPCB() {
        table.render({
            elem: '#sqeManaOrderT_tabPcb'
            ,url: setter.baseUrl+'/sqe/pcborder/orderTogether/list'
            ,toolbar: "#ord_tother_tb"
            ,cellMinWidth: 80
            ,id: "sqeManaOrderT_tabPcb"
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
                ,{field: 'status',title: '状态',templet: '#pcb', width: 115, templet: '<div>{{ d.status == 4 ? "待确认交期" : "" }}</div>'}      // 1 ＝ 待报价
                ,{field: 'gmtCreate',title: '报价时间', width: 168}
                ,{field: 'supplierNo', title: '供应商编号'}
                ,{field: 'factoryMake', title: '供应商厂编'}
                ,{field: 'productNo', title: '聚谷型号'}
                ,{field: 'pcbName', title: '聚谷物料号'}
                ,{field: 'quantityPcs', title: '订单数量(PCS)'}
                ,{field: 'unitPrice', title: '单价'}
                ,{field: 'totalFee', title: '合计'}
                ,{field: 'remark', title: '订单备注'}
                ,{field: 'engineeringFee', title: '工程费', width: 96, hide: true}
                ,{field: 'testCostFee', title: '飞针费', width: 96, hide: true}
                ,{field: 'testCostFee', title: '测试架费', width: 96, hide: true}
                ,{field: 'toolingFee', title: '模具', width: 96, hide: true}
                ,{field: 'supplierQuoteNo',title: '报价单号', hide: true}
                ,{field: 'dimensionsX', title: 'dimensionsX', hide: true}
                ,{field: 'dimensionsY', title: 'dimensionsY', hide: true}
                ,{field: 'panelSizeX', title: 'panelSizeX', hide: true}
                ,{field: 'panelSizeY', title: 'panelSizeY', hide: true}
                ,{field: 'panelWayX', title: 'panelWayX', hide: true}
                ,{field: 'panelWayY', title: 'panelWayY', hide: true}
                ,{field: 'gerberName', title: 'gerberName', hide: true}
                ,{field: 'gerberPath', title: 'gerberPath', hide: true}
                // ,{field: 'gerberName',title: '文件名'}
                // ,{field: 'pcbType',title: 'PCB类型'}
                ,{fixed: 'right', title:'操作', toolbar: '#scmManaOrderT_tabbar',width: 150}
            ]]
            ,done: function (res, curr, count) {
                var data = res.data;    //获取表格所有数据对象
                pcbtabObj = data;
            }
        });
    }
    table.on('toolbar(sqeManaOrderT_tabPcb)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        if(obj.event === 'submit'){
            var data = checkStatus.data;
            var supplierContractNo = null;
            for (var i=0;i<data.length;i++){
                if (supplierContractNo == null){
                    supplierContractNo = data[i].supplierContractNo;
                } else if (supplierContractNo != data[i].supplierContractNo && supplierContractNo != null) {
                    supplierContractNo += ',' + data[i].supplierContractNo;
                }
            }
            if (checkStatus.data.length < 1) {
                layer.msg('请选择一条数据');
                return false;
            }
            layer.confirm('确认提交 ['+supplierContractNo+'] ?', function(index){
                console.log(data);
                admin.req({
                    type: 'post',
                    data: {'supplierContractNo':supplierContractNo,'orderId':data[0].orderId},
                    url: setter.baseUrl+'sqe/pcborder/submitByOt',
                    success: function (data) {
                        if (data.code == '0'){
                            layer.alert("提交成功！！");
                            table.reload('sqeManaOrderT_tabPcb');
                            layer.close(index);
                        }
                    }
                });
            });
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(sqeManaOrderT_tabPcb)', function (obj) {
        var data = obj.data;
        if (obj.event == 'edit'){
            admin.popup({
                title: '订单协同编辑'
                ,area: ['434px','448px']
                ,btn: ['保存', '取消']
                ,yes: function (index, layero) {
                    $(".otEdit").click();
                }
                ,success: function (layero, index) {
                    var id = data.id;
                    var supplierId = data.supplierId;
                    var orderId = data.orderId;
                    view(this.id).render('sqeManagement/iframeWindow/order_together_edit',data).done(function () {
                        form.on('submit(otEdit)', function (data) {
                            var field = data.field;
                            field.id = id;
                            field.orderId = orderId;
                            field.supplierId = supplierId;
                            console.log(field);
                            admin.req({
                                type: 'post',
                                data: field,
                                url: setter.baseUrl+'scm/ordersupplier/update',
                                success: function (data) {
                                    layer.alert("订单协同修改成功");
                                    // layer.closeAll();
                                    table.reload('sqeManaOrderT_tabPcb');
                                    layer.close(index);
                                }
                            });
                            return false;
                        });
                    });
                }
            });
        } else if (obj.event == 'search'){
            // 查看的是外协合同
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
        } else if (obj.event == 'del') {
            layer.msg('删除操作！');
            layer.confirm('确定删除？', function () {
               admin.req({
                   type: 'post',
                   data: {'ids':data.id},
                   url: setter.baseUrl + 'scm/ordersupplier/delete',
                   success: function () {
                       layer.alert('删除成功！');
                       obj.del();
                       table.reload('sqeManaOrderT_tabPcb');
                       layer.closeAll();
                   }
               });
            });
        }
    });

    //▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉  Stencil 钢网订单
    function tabRenderStencil() {
        table.render({
            elem: '#sqeManaOrderT_tabStencil'
            ,url: setter.baseUrl+'sqe/stencilorder/orderTogether/list'
            ,toolbar: "#ord_tother_tbS"
            ,cellMinWidth: 80
            ,id: "sqeManaOrderT_tabStencil"
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
                ,{field: 'status',title: '状态',templet: '#pcb', width: 115, templet: '<div>{{ d.status == 4 ? "待确认交期" : "" }}</div>'}      // 1 ＝ 待报价
                ,{field: 'gmtCreate',title: '报价时间', width: 168}
                ,{field: 'supplierNo', title: '供应商编号'}
                ,{field: 'factoryMake', title: '供应商厂编'}
                ,{field: 'productNo', title: '聚谷型号'}
                ,{field: 'pcbName', title: '聚谷物料号'}
                ,{field: 'quantityPcs', title: '订单数量(PCS)'}
                ,{field: 'unitPrice', title: '单价'}
                ,{field: 'totalFee', title: '合计'}
                ,{field: 'remark', title: '订单备注'}
                ,{field: 'engineeringFee', title: '工程费', width: 96, hide: true}
                ,{field: 'testCostFee', title: '飞针费', width: 96, hide: true}
                ,{field: 'testCostFee', title: '测试架费', width: 96, hide: true}
                ,{field: 'toolingFee', title: '模具', width: 96, hide: true}
                ,{field: 'supplierQuoteNo',title: '报价单号', hide: true}
                ,{field: 'dimensionsX', title: 'dimensionsX', hide: true}
                ,{field: 'dimensionsY', title: 'dimensionsY', hide: true}
                ,{field: 'panelSizeX', title: 'panelSizeX', hide: true}
                ,{field: 'panelSizeY', title: 'panelSizeY', hide: true}
                ,{field: 'panelWayX', title: 'panelWayX', hide: true}
                ,{field: 'panelWayY', title: 'panelWayY', hide: true}
                ,{field: 'gerberName', title: 'gerberName', hide: true}
                ,{field: 'gerberPath', title: 'gerberPath', hide: true}
                // ,{field: 'gerberName',title: '文件名'}
                // ,{field: 'pcbType',title: 'PCB类型'}
                ,{fixed: 'right', title:'操作', toolbar: '#scmManaOrderT_tabbarS',width: 150}
            ]]
            ,done: function (res, curr, count) {

            }
        });
    }
    table.on('toolbar(sqeManaOrderT_tabStencil)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        if(obj.event === 'submit'){
            var data = checkStatus.data;
            var supplierContractNo = null;
            for (var i=0;i<data.length;i++){
                if (supplierContractNo == null){
                    supplierContractNo = data[i].supplierContractNo;
                } else {
                    supplierContractNo += ',' + data[i].supplierContractNo;
                }
            }
            if (checkStatus.data.length < 1) {
                layer.msg('请选择一条数据');
                return false;
            }
            layer.confirm('确认提交 ['+supplierContractNo+'] ?', function(index){
                console.log(data);
                admin.req({
                    type: 'post',
                    data: {'supplierContractNo':supplierContractNo,'orderId':data[0].orderId},
                    url: setter.baseUrl+'sqe/stencilorder/submitByOt',
                    success: function (data) {
                        if (data.code == '0'){
                            layer.alert("Stencil 提交成功！！");
                            table.reload('sqeManaOrderT_tabStencil');
                            layer.close(index);
                        }
                    }
                });
            });
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(sqeManaOrderT_tabStencil)', function (obj) {
        var data = obj.data;
        if (obj.event == 'edit'){
            admin.popup({
                title: '订单协同编辑'
                ,area: ['434px','448px']
                ,btn: ['保存', '取消']
                ,yes: function (index, layero) {
                    layer.msg('提交信息');
                    $(".otEdit").click();
                }
                ,success: function (layero, index) {
                    var id = data.id;
                    var supplierId = data.supplierId;
                    var orderId = data.orderId;
                    view(this.id).render('sqeManagement/iframeWindow/order_together_edit',data).done(function () {
                        form.on('submit(otEdit)', function (data) {
                            var field = data.field;
                            field.id = id;
                            field.orderId = orderId;
                            field.supplierId = supplierId;
                            console.log(field);
                            admin.req({
                                type: 'post',
                                data: field,
                                url: setter.baseUrl+'scm/ordersupplier/update',
                                success: function (data) {
                                    layer.alert("订单协同修改成功");
                                    // layer.closeAll();
                                    table.reload('sqeManaOrderT_tabStencil');
                                    layer.close(index);
                                }
                            });
                            return false;
                        });
                    });
                }
            });
        } else if (obj.event == 'search'){
            admin.popup({
                title: '订单id:［'+ data.id + '］-----------'+'订单时间：［'+data.gmtCreate+'］'
                ,area: ['837px', '373px']
                ,success: function (layero, index) {
                    view(this.id).render('marketManagement/iframeWindow/order_stencil_detail', data).done(function () {

                    });
                }
            });
        } else if (obj.event == 'del') {
            layer.confirm('确定删除？', function () {
                admin.req({
                    type: 'post',
                    data: {'ids':data.id},
                    url: setter.baseUrl + 'scm/ordersupplier/delete',
                    success: function () {
                        layer.alert('删除成功！');
                        obj.del();
                        table.reload('sqeManaOrderT_tabPcb');
                        layer.closeAll();
                    }
                });
            });
        }
    });
    exports('sqeMana_order_together', {});
});