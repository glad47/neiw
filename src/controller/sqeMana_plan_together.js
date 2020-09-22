/**

 @Name:    供应商管理－－［报价协同］
 特别说明： 表格不支持下拉，这里引用了optimizeSelectOption扩展来实现表格里嵌套下拉的功能
 */


layui.define(['admin','table','index','element','form','laydate','jsTools','optimizeSelectOption'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,element = layui.element;
    var $ = layui.jquery;
    var jstools = layui.jsTools;

    var bunames = ['ada','alisa','tracy','tina','richard','donna','amber','zero'];
    var uname = layui.data('userInfo').uname;

    form.render(null,'sqe-plan-together-formlist');

    var cols,scols;
    if(bunames.indexOf(uname) != -1){
        cols = [[
            {type:'checkbox', fixed: 'left'}
            ,{field: 'productNo', title: '聚谷型号', width: 124,fixed: 'left', sort: true}
            ,{field: 'productionType',title: '生产类别', width: 110, sort: true}      // 1 ＝ 待报价
            // ,{field: 'supplierNo', title: '供应商编号', width: 117, sort: true}
            // ,{field: 'supplierNickname', title: '供应商昵称', width: 117, sort: true}
            ,{field: 'currentProcess',title: '当前工序', width: 160,templet: '#currentProcess', sort: true}
            ,{field: 'deliveryTime',title: '交期', width: 110, templet: '#sqeManaDt', sort: true}
            ,{field: 'gmtModified',title: '更新时间', width: 177, sort: true}
            ,{field: 'currPcsNumber', title: '此次数量(PCS)', width: 134, sort: true}
            ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134, sort: true}
            ,{field: 'donePcsNumber', title: '已交数量(PCS)', width: 134, sort: true}
            ,{field: 'surplusPcsNumber', title: '未交数量(PCS)', width: 134, sort: true}
            // ,{field: '',title: '进度', width: 110, sort: true}
            ,{field: 'supplierContractNo', title: '合同单号', minWidth: 171, sort: true}
            ,{field: 'gmtCreate',title: '签约日期', minWidth: 172, sort: true}
            // ,{field: 'gerberName',title: '文件名'}
            // ,{field: 'pcbType',title: 'PCB类型'}
            ,{fixed: 'right', title:'操作', toolbar: '#scmManaPlan_tabbar',minWidth: 160}
        ]];
        scols = [[
            {type:'checkbox',fixed: 'left'}
            ,{field: 'productNo', title: '聚谷型号', width: 124,fixed: 'left', sort: true}
            ,{field: 'productionType',title: '生产类别', width: 110, sort: true}      // 1 ＝ 待报价
            // ,{field: 'factoryMake', title: '供应商厂编', width: 117, sort: true}
            // ,{field: 'supplierNickname', title: '供应商昵称', width: 117, sort: true}
            ,{field: 'deliveryTime',title: '交期', width: 110, templet: '#sqeManaDtS', sort: true}
            ,{field: 'gmtModified',title: '更新时间', width: 177, sort: true}
            ,{field: 'quantity', title: '订单数量(PCS)', width: 134, sort: true}
            ,{field: 'donePcsNumber', title: '已交数量(PCS)', width: 134, sort: true}
            ,{field: 'surplusPcsNumber', title: '未交数量(PCS)', width: 134, sort: true}
            ,{field: '',title: '当前工序', width: 160,templet: '#currentProcess', sort: true}
            ,{field: '',title: '进度', width: 110, sort: true}
            ,{field: 'supplierContractNo', title: '合同单号', minWidth: 171, sort: true}
            ,{field: 'gmtCreate',title: '签约日期', minWidth: 172, sort: true}
            // ,{field: 'gerberName',title: '文件名'}
            // ,{field: 'pcbType',title: 'PCB类型'}
            ,{fixed: 'right', title:'操作', toolbar: '#scmManaPlan_tabbarS',minWidth: 160}
        ]]
    }else {
        cols = [[
            {type:'checkbox', fixed: 'left'}
            ,{field: 'productNo', title: '聚谷型号', width: 124,fixed: 'left', sort: true}
            ,{field: 'productionType',title: '生产类别', width: 110, sort: true}     // 1 ＝ 待报价
            ,{field: 'supplierNo', title: '供应商编号', width: 117, sort: true}
            ,{field: 'areaSq', title: '面积', width: 117, sort: true} 
            ,{field: 'supplierNickname', title: '供应商简称', width: 117, sort: true}
            ,{field: 'currentProcess',title: '当前工序', width: 160,templet: '#currentProcess', sort: true}
            ,{field: 'deliveryTime',title: '交期', width: 110, templet: '#sqeManaDt', sort: true}
            ,{field: 'gmtModified',title: '更新时间', width: 177, sort: true}
            ,{field: 'currPcsNumber', title: '此次数量(PCS)', width: 134, sort: true}
            ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134, sort: true}
            ,{field: 'donePcsNumber', title: '已交数量(PCS)', width: 134, sort: true}
            ,{field: 'surplusPcsNumber', title: '未交数量(PCS)', width: 134, sort: true}
            // ,{field: '',title: '进度', width: 110, sort: true}
            ,{field: 'supplierContractNo', title: '合同单号', minWidth: 171, sort: true}
            ,{field: 'gmtCreate',title: '签约日期', minWidth: 172, sort: true}
            // ,{field: 'gerberName',title: '文件名'}
            // ,{field: 'pcbType',title: 'PCB类型'}
            ,{fixed: 'right', title:'操作', toolbar: '#scmManaPlan_tabbar',minWidth: 160}
        ]];
        scols = [[
            {type:'checkbox',fixed: 'left'}
            ,{field: 'productNo', title: '聚谷型号', width: 124,fixed: 'left', sort: true}
            ,{field: 'productionType',title: '生产类别', width: 110, sort: true}     // 1 ＝ 待报价
            ,{field: 'factoryMake', title: '供应商厂编', width: 117, sort: true}
            ,{field: 'supplierNickname', title: '供应商简称', width: 117, sort: true}
            ,{field: 'deliveryTime',title: '交期', width: 110, templet: '#sqeManaDtS', sort: true}
            ,{field: 'gmtModified',title: '更新时间', width: 177, sort: true}
            ,{field: 'quantity', title: '订单数量(PCS)', width: 134, sort: true}
            ,{field: 'donePcsNumber', title: '已交数量(PCS)', width: 134, sort: true}
            ,{field: 'surplusPcsNumber', title: '未交数量(PCS)', width: 134, sort: true}
            ,{field: '',title: '当前工序', width: 160,templet: '#currentProcess', sort: true}
            ,{field: '',title: '进度', width: 110, sort: true}
            ,{field: 'supplierContractNo', title: '合同单号', minWidth: 171, sort: true}
            ,{field: 'gmtCreate',title: '签约日期', minWidth: 172, sort: true}
            // ,{field: 'gerberName',title: '文件名'}
            // ,{field: 'pcbType',title: 'PCB类型'}
            ,{fixed: 'right', title:'操作', toolbar: '#scmManaPlan_tabbarS',minWidth: 160}
        ]]
    }

    tabRenderPCB();
    // 全局变量
    var _public_val = {
        orderType: 1,        //订单类型 （1 pcb 2钢网 3 贴片）
        tableOn: 'sqeManaPlan_tabPcb',   // 监听表格
        rowData: null       // 被监听表格点击的行数据
    };

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(sqe-plan-together-tabs-brief)', function(data){
        if (data.index === 0){
            _public_val.orderType = 1;       //pcb
            _public_val.tableOn = 'sqeManaPlan_tabPcb';     // 监听换成pcb
            tabRenderPCB();
        } else if (data.index === 1){
            _public_val.orderType = 2;      //钢网
            _public_val.tableOn = 'sqeManaPlan_tabStencil'; // 监听换成stencil
            tabRenderStencil();
        } else if (data.index === 2){
            _public_val.orderType = 3;      //贴片
        }
        // layer.msg(_public_val.tableOn);
    });

    form.on('select(currentProcess-sel)', function (data) {
        var $this_val = data.value;
        var $this_id = _public_val.rowData.id;
        var url = 'scm/ordersupplier/update';
        admin.req({
           type: 'post',
            data:{'currentProcess':$this_val,'id':$this_id},
            url: setter.baseUrl+url,
            success: function (res) {
                layer.msg('当前工序修改成功!');
                table.reload(_public_val.tableOn);
            }
        });

    });
    //监听行单击事件（单击事件为：rowDouble）
    table.on('row(sqeManaPlan_tabPcb)', function(obj){
        _public_val.rowData = obj.data;
    });
    //监听行单击事件（单击事件为：rowDouble）
    table.on('row(sqeManaPlan_tabStencil)', function(obj){
        _public_val.rowData = obj.data;
    });

    //▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ PCB订单
    function tabRenderPCB() {
        table.render({
            elem: '#sqeManaPlan_tabPcb'
            ,url: setter.baseUrl+'sqe/pcborder/planTogether/list'
            ,toolbar: "#ord_sqpManaPlan_tb"
            ,cellMinWidth: 80
            ,id: "sqeManaPlan_tabPcb"
            ,page: true
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,cols: cols
            ,done: function (res, curr, count) {
                $("a[data='ok']").each(function () {
                    $(this).parents('tr').css('background-color','rgba(121, 228, 119, 0.43)');
                    $(this).parents('td').css({'border-right':'none !important','border-bottom':'none !important'});
                });
            }
        });
    }
    table.on('toolbar(sqeManaPlan_tabPcb)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        var supplierOrderIds = null;
        if (data.length == 0) {
            layer.msg('请选择一条数据！');
            return false;
        } else {
            var orderSupplierList = new Array();
            for (var i=0;i<data.length;i++){
                orderSupplierList.push({'id':data[i].id,'isInternal':data[i].isInternal,'onlineOid':data[i].onlineOid,'orderId':data[i].orderId,'surplusPcsNumber':data[i].surplusPcsNumber,'orderPcsNumber':data[i].quantityPcs,'donePcsNumber':data[i].donePcsNumber,'currPcsNumber':data[i].currPcsNumber,'orderType':data[i].orderType});
            }
            if(obj.event === 'submit') {     //通知出货
                var bool  = false;//提交锁
                layer.confirm('确定通知出货？', function () {
                    if (!bool) {
                        bool = true;
                        $.ajax({
                            type: 'post',
                            url: setter.baseUrl + 'sqe/pcborder/saveShipmentOrderByPt',
                            headers: {access_token:layui.data('layuiAdmin').access_token},
                            data:  JSON.stringify(orderSupplierList),
                            contentType: "application/json;charset=utf-8",
                            success: function (res) {
                                console.log(res);
                                if(res.code === 0){
                                    layer.msg('通知出货成功！');
                                }else{
                                    layer.msg(res.msg);
                                }
                                table.reload('sqeManaPlan_tabPcb');
                                layer.closeAll();
                                bool = false;
                            } ,error: function () {
                                bool = false;
                            }
                        });
                    }
                });
            } else if (obj.event === 'submitX') {   // 直接出货
                var bool  = false;//提交锁
                layer.confirm('确定通知出货？', function () {
                    if (!bool) {
                        bool = true;
                        $.ajax({
                            type: 'post',
                            url: setter.baseUrl + 'sqe/pcborder/saveAllShipmentOrder',
                            headers: {access_token:layui.data('layuiAdmin').access_token},
                            data:  JSON.stringify(orderSupplierList),
                            contentType: "application/json;charset=utf-8",
                            success: function (res) {
                                if(res.code === 0){
                                    layer.msg('通知出货成功！');
                                    table.reload('sqeManaPlan_tabPcb');
                                    layer.closeAll();
                                }else{
                                    layer.msg(res.msg);
                                }
                                bool = false;
                            } ,error: function () {
                                bool = false;
                            }
                        });
                    }
                });
            }
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(sqeManaPlan_tabPcb)', function (obj) {
        var data = obj.data;
        if (obj.event == 'edit'){
            var Pdata = {data:{},result:{}};     // data为表格数据/result为请求到的数据
            Pdata.orderType = 'pcb'
            Pdata.data = data;
            admin.req({
                type: 'post',
                data: {'oid':data.id},
                url: setter.baseUrl+'scm/ordershipment/infoByOid',
                success: function (result) {
                    Pdata.result = result.data;
                    console.log(Pdata);
                    admin.popup({
                        title: 'PCB交货明细'
                        ,area: ['702px','547px']
                        ,btn: ['保存', '取消']
                        ,yes: function (index, layero) {
                            $("#subdetailsDelivery").click();
                        }
                        ,success: function (layero, index) {
                            var id = Pdata.data.id;
                            view(this.id).render('sqeManagement/iframeWindow/details_delivery', Pdata).done(function () {
                                form.render();
                                // 监听快递选择
                                form.on('select(courierCompany)', function(data){
                                    if (data.value == '送货') {
                                        $("input[name='courierOrderNo']").attr('disabled',true);
                                    } else {
                                        $("input[name='courierOrderNo']").attr('disabled',false);
                                    }
                                    form.render();
                                });
                                form.on('submit(detailsDelivery)', function (data) {
                                    var data = data.field;
                                    if (result.data != null) {
                                        data.id = result.data.id;
                                    }
                                    data.orderSupplierId = Pdata.data.id;                               // 供应商订单id
                                    data.supplierNo = Pdata.data.supplierNo;                            // 供应商编号
                                    data.deliveryTime = Pdata.data.deliveryTime;                        // 交期
                                    data.orderPcsNumber = Pdata.data.quantityPcs;                       // 订单PCS数
                                    data.orderId = Pdata.data.orderId;                                  // 订单id
                                    data.donePcsNumber = parseInt($("#donePcsNumber").text());          // 已交PCS数
                                    data.surplusPcsNumber = parseInt($("#surplusPcsNumber").text());    // 未交PCS数
                                    if (data.courierCompany == '' || data.courierCompany == null) {
                                        data.courierCompany = "送货";
                                    }
                                    if (data.deliveryOrderNo == null || data.deliveryOrderNo == "" || typeof data.deliveryOrderNo == 'undefined') {
                                        layer.alert('送货单号不能为空');
                                        return false;
                                    }
                                    if (data.orderPcsNumber != data.donePcsNumber) {
                                        if (data.currPcsNumber <= 0 || data.currPcsNumber == null || data.currPcsNumber == "" || typeof data.currPcsNumber == "undefined") {
                                            layer.alert('此次数量不能为空或小于0');
                                            return false;
                                        }
                                        if(data.currPcsNumber > data.surplusPcsNumber){
                                            layer.alert('此次数量不能超过未交PCS数量！');
                                            return false;
                                        }
                                    }
                                    // console.log(data);
                                    admin.req({
                                        type: 'post',
                                        data: data,
                                        // url: setter.baseUrl+'sqe/pcborder/saveShipmentOrderByPt',
                                        url: setter.baseUrl+'sqe/pcborder/saveSo',
                                        success: function (result) {
                                            layer.alert('保存成功！', function () {
                                                layer.alert("提交成功！");
                                                table.reload('sqeManaPlan_tabPcb');
                                                layer.closeAll();
                                            });
                                        }
                                    });
                                    return false;
                                });
                            });
                        }
                    });
                }
            });
        } else if (obj.event == 'search'){
            layer.msg('查看订单协同');
        }
    });

    //▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ Stencil 钢网订单
    function tabRenderStencil() {
        table.render({
            elem: '#sqeManaPlan_tabStencil'
            ,url: setter.baseUrl+'sqe/stencilorder/planTogether/list'
            ,toolbar: "#ord_sqpManaPlan_tb"
            ,cellMinWidth: 80
            ,id: "sqeManaPlan_tabStencil"
            ,page: true
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,cols: scols
            ,done: function (res, curr, count) {
                $("a[data='ok']").each(function () {
                    $(this).parents('tr').css('background-color','rgba(121, 228, 119, 0.43)');
                    $(this).parents('td').css({'border-right':'none !important','border-bottom':'none !important'});
                });
            }
        });
    }
    table.on('toolbar(sqeManaPlan_tabStencil)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        if(obj.event === 'submit') {     //通知出货
            var bool  = false;//提交锁
            layer.confirm('确定通知出货', function () {
                if (data.length == 0) {
                    layer.msg('请选择一条数据！');
                    return false;
                }
                var orderSupplierList = new Array();
                for (var i=0;i<data.length;i++){
                    orderSupplierList.push({'id':data[i].id,'isInternal':data[i].isInternal,'onlineOid':data[i].onlineOid,'orderId':data[i].orderId,'surplusPcsNumber':data[i].surplusPcsNumber,'orderPcsNumber':data[i].quantity,'donePcsNumber':data[i].donePcsNumber,'currPcsNumber':data[i].currPcsNumber,'orderType':data[i].orderType});
                }
                if (!bool) {
                    bool = true;
                    $.ajax({
                       type: 'post',
                       url: setter.baseUrl + 'sqe/pcborder/saveShipmentOrderByPt',
                       headers: {access_token:layui.data('layuiAdmin').access_token},
                       data:  JSON.stringify(orderSupplierList),
                       contentType: "application/json;charset=utf-8",
                        success: function (res) {
                            if(res.code === 0){
                                layer.msg('通知出货成功！');
                            }else{
                                layer.msg(res.msg);   
                            }
                            table.reload('sqeManaPlan_tabStencil');
                            layer.closeAll();
                            bool = false;
                        } ,error: function () {
                            bool = false;
                        }
                    });
                }else{

                }
                 
            });
        } else if (obj.event === 'submitX') {
            if (data.length<1) {
                layer.msg('请选择一条数据！');
            } else {
                var ids = null;
                for (var i=0;i<data.length;i++){
                    if (ids == null){
                        ids = ids + data[i].id;
                    } else {
                        ids = ids + ',' + data[i].id;
                    }
                }
                var bool  = false;//提交锁
                layer.confirm('直接提交['+ids+']?', function () {
                    if (!bool) {
                        bool = true;
                        var orderSupplierList = new Array();
                        for (var i=0;i<data.length;i++){
                            orderSupplierList.push({'id':data[i].id,'isInternal':data[i].isInternal,'onlineOid':data[i].onlineOid,'orderId':data[i].orderId,'surplusPcsNumber':data[i].surplusPcsNumber,'orderPcsNumber':data[i].quantity,'donePcsNumber':data[i].donePcsNumber,'currPcsNumber':data[i].currPcsNumber,'orderType':data[i].orderType});
                        }
                        $.ajax({
                            type: 'post',
                            url: setter.baseUrl+'sqe/stencilorder/saveAllShipmentOrder',
                            headers: {access_token:layui.data('layuiAdmin').access_token},
                            data:  JSON.stringify(orderSupplierList),
                            contentType: "application/json;charset=utf-8",
                            success: function (res) {
                                if(res.code === 0){
                                    layer.msg('通知出货成功!!');
                                }else if(res.code === 444){
                                    layer.msg(res.msg);
                                }
                                table.reload('sqeManaPlan_tabStencil');
                                layer.close(index);
                                bool = false;
                            }
                        });
                    }
                    
                })
            }
        }
    });
    //监听行工具事件＝＝＝＝》stencil订单
    table.on('tool(sqeManaPlan_tabStencil)', function (obj){
       var data = obj.data;
       if (obj.event == 'edit') {
           var Pdata = {data:{},result:{}};     // data为表格数据/result为请求到的数据
           Pdata.orderType = 'stencil'
           Pdata.data = data;
           admin.req({
               type: 'post',
               data: {'oid':data.id},
               url: setter.baseUrl+'scm/ordershipment/infoByOid',
               success: function (result) {
                   Pdata.result = result.data;
                   console.log(Pdata);
                   admin.popup({
                       title: 'Stencil交货明细'
                       ,area: ['702px','547px']
                       ,btn: ['保存', '取消']
                       ,yes: function (index, layero) {
                           $("#subdetailsDelivery").click();
                       }
                       ,success: function (layero, index) {
                           var id = Pdata.data.id;
                           view(this.id).render('sqeManagement/iframeWindow/details_delivery', Pdata).done(function () {
                               form.render();
                               // 监听快递选择
                               form.on('select(courierCompany)', function(data){
                                   if (data.value == '送货') {
                                       $("input[name='courierOrderNo']").attr('disabled',true);
                                   } else {
                                       $("input[name='courierOrderNo']").attr('disabled',false);
                                   }
                                   form.render();
                               });
                               form.on('submit(detailsDelivery)', function (data) {
                                   layer.msg("提交");
                                   var data = data.field;
                                   data.orderSupplierId = Pdata.data.id;                               // 供应商订单id
                                   data.supplierNo = Pdata.data.supplierNo;                            // 供应商编号
                                   data.deliveryTime = Pdata.data.deliveryTime;                        // 交期
                                   data.orderPcsNumber = Pdata.data.quantity;                          // 订单PCS数
                                   data.orderId = Pdata.data.orderId;                                  // 订单id
                                   data.donePcsNumber = parseInt($("#donePcsNumber").text());          // 已交PCS数
                                   data.surplusPcsNumber = parseInt($("#surplusPcsNumber").text());    // 未交PCS数
                                   if (data.courierCompany == '' || data.courierCompany == null) {
                                       data.courierCompany = "送货";
                                   }
                                   if (data.deliveryOrderNo == null || data.deliveryOrderNo == "" || typeof data.deliveryOrderNo == 'undefined') {
                                       layer.alert('送货单号不能为空');
                                       return false;
                                   } else if (data.currPcsNumber == 0 || data.currPcsNumber == null || data.currPcsNumber == "" || typeof data.currPcsNumber == 'undefined' && data.orderPcsNumber == data.donePcsNumber) {
                                       layer.alert('此次数量不能为空');
                                       return false;
                                   }
                                   console.log(data);
                                   admin.req({
                                       type: 'post',
                                       data: data,
                                       url: setter.baseUrl+'sqe/pcborder/saveSo',
                                       success: function (result) {
                                           layer.alert('保存成功！', function () {
                                               layer.alert("提交成功！");
                                               table.reload('sqeManaPlan_tabStencil');
                                               layer.closeAll();
                                           });
                                       }
                                   });
                                   return false;
                               });
                           });
                       }
                   });
               }
           });
       }
    });
    //监听搜索
    form.on('submit(LAY-sqe-plan-together-search)', function(data){
        var field = data.field;
        var reTab;
        if (_public_val.orderType === 1) {   // PCB
            reTab = 'sqeManaPlan_tabPcb';
        } else if (_public_val.orderType === 2) {    //  Stencil
            reTab = 'sqeManaPlan_tabStencil';
        }
        table.reload(reTab, {
            where: field
        });
    });

    // $(".plan-together-search input").bind("input propertychange", function (even) {
    //     $("*[lay-filter='plan_together_search']").click();
    // })
    
    exports('sqeMana_plan_together', {});
});