/**

 @Name:    供应商管理－－［报价协同］

 */


layui.define(['admin','table','index','element','form','laydate','convertCurrency'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        // ,laydate = layui.laydate
        ,setter = layui.setter
        ,laydate = layui.laydate
        ,element = layui.element;
        var $ = layui.jquery;
        var convertCurrency = layui.convertCurrency;

    // 全局变量
    var _public_val = {
        orderType: 1        //订单类型 （1 pcb 2钢网 3 贴片）
    };

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(tab-quotationToger)', function(data){
        console.log(data.index);
        if (data.index === 0){
            _public_val.orderType = 1;       //pcb
        } else if (data.index === 1){
            _public_val.orderType = 2;      //钢网
        } else if (data.index === 2){
            _public_val.orderType = 3;      //贴片
        }
    });
    //日期
    laydate.render({
        elem: '#todzDate'
    });
    //日期
    laydate.render({
        elem: '#fromdzDate'
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    table.render({
        elem: '#sqeMana_reconPcbTab'
        ,url: setter.baseUrl+'sqe/pcborder/reconciliation/list'
        ,toolbar: "#sqeMana_reconPcbTb"
        ,cellMinWidth: 80
        ,id: "sqeMana_reconPcbTab"
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
            ,{field: 'status',title: '状态',templet: '#pcb'}      // 1 ＝ 待报价
            ,{field: 'supplierQuoteNo',title: '报价单号', width: 125}
            ,{field: 'gmtCreate',title: '报价时间', width: 166}
            ,{field: 'supplierNo', title: '供应商编号', width: 124}
            ,{field: 'factoryMake', title: '供应商厂编', width: 117}
            ,{field: 'productNo', title: '聚谷型号', width: 124}
            ,{field: 'pcbName', title: '聚谷产品型号', width: 144}
            ,{field: 'quantityPcs', title: '订单数量(PCS)', width: 134}
            ,{field: 'unitPrice', title: '单价', width: 96}
            ,{field: 'engineeringFee', title: '工程费', width: 96}
            ,{field: 'testCostFee', title: '飞针费', width: 96}
            ,{field: 'testCostFee', title: '测试架费', width: 96}
            ,{field: 'toolingFee', title: '模具', width: 96}
            ,{field: 'subtotal', title: '合计', width: 96}
            ,{field: 'remark', title: '订单备注', width: 168}
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
            ,{fixed: 'right', title:'操作', toolbar: '#sqeMana_reconPcbTabbar',width: 130}
        ]]
        ,done: function (res, curr, count) {

        }
    });

    //监听提交
    form.on('submit(generateStatement)', function(data){
        var field = data.field; //获取提交的字段
        var startTime = field.startTime.replace(/-/g,'');   // 时间去除横杠
        var endTime = field.endTime.replace(/-/g,'');
        var reconciliationNo = 'BJDH'+startTime+'-'+endTime;
        admin.req({
            type: 'post',
            data: field,
            url: setter.baseUrl+'sqe/pcborder/createReconciliation',
            success: function (result) {
                var popData = {data:{}};
                popData.data = result.data;
                if (result.data != null && result.data.length > 0) {
                    // 所有订单总价计算
                    var subtotal = 0;
                    $.each(popData.data, function (i, d) {
                        subtotal += d.totalFee;
                    });
                    popData.subtotal = subtotal;        // 金额小写
                    popData.convertSubtotal = convertCurrency.conversion(subtotal);     // 金额转换为中文大写
                    popData.reconciliationNo = reconciliationNo;     // 对账编号
                    admin.popup({
                        title: '对账协同',
                        area: ['100%','100%'],
                        btn: ['保存', '打印', '取消'],
                        yes: function () {
                            var orderSupplierIds = popData.data.map(function(elem){return elem.id}).join(",");
                            var supplierId = popData.data[0].supplierId;
                            var saveData = {supplierId: supplierId, reconciliationNo:reconciliationNo,orderSupplierIds:orderSupplierIds};
                            layer.confirm('确定保存信息？', function () {
                                admin.req({
                                    type: 'post',
                                    data: saveData,
                                    url: setter.baseUrl+'fms/reconciliation/save',
                                    success: function (res) {
                                        if (res.code != '500') {
                                            layer.alert('对账协同保存成功');
                                            var trigger = setTimeout(function () {
                                                table.reload('sqeMana_reconPcbTab');
                                                layer.closeAll();
                                            },1500);
                                        } else {
                                            layer.alert('服务器异常！');
                                        }
                                    }
                                });
                            });
                        },
                        btn2: function () {
                            layer.msg('打印');
                            var printId = "statements_detail";
                            window.location.reload();
                            document.body.innerHTML = document.getElementById(printId).innerHTML;
                            window.print();
                        },
                        btn3: function () {
                            layer.msg('取消操作！');
                            layer.closeAll();
                        }
                        ,success: function (layero, index) {
                            view(this.id).render('sqeManagement/iframeWindow/statements',popData).done(function () {
                            });
                        }
                    });
                } else {
                    layer.alert(field.startTime+'到'+field.endTime+'没有数据！');
                }
            }
        });
        return false;
    });
    table.on('toolbar(sqeMana_reconPcbTab)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        if(obj.event === 'submitPcb'){
            var data = checkStatus.data;
            var ids = null;
            for (var i=0;i<data.length;i++){
                if (ids == null){
                    ids = ids + data[i].id;
                } else {
                    ids = ids + ',' + data[i].id;
                }
            }
            layer.confirm('确认提交 ['+ids+'] ?', function(index){
                admin.req({
                    type: 'post',
                    data: {ids},
                    url: setter.baseUrl+'sqe/pcborder/batch/submit',
                    success: function (data) {
                        if (data.code == '0'){
                            layer.alert("提交成功！！");
                            table.reload('sqeMana_reconPcbTab');
                            layer.close(index);
                        }
                    }
                });
            });
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(sqeMana_reconPcbTab)', function (obj) {
        var data = obj.data;
        if (obj.event == 'edit'){
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
                    if (postData.deliveryTime == null || postData.deliveryTime == '') {
                        layer.msg('交期不能为空！！！');
                        return false;
                    }
                    admin.req({
                        type: 'post',
                        data: postData,
                        url: setter.baseUrl+'sqe/pcborder/quotationTogether/update',
                        success: function (data) {
                            layer.alert("供应商报价修改成功");
                            // layer.closeAll();
                            table.reload('sqeMana_reconPcbTab');
                            layer.close(index);
                        }
                    });

                }
                ,btn2: function (index, layero) {
                    layer.msg('下载资料');
                    return false;
                }
                ,success: function (layero, index) {
                    view(this.id).render('sqeManagement/iframeWindow/quotation_together_pcb',data).done(function () {
                        $(".layui-layer-btn1").attr("href",setter.baseUrl+'sys/oss/download/geber?access_token='+layui.data('layuiAdmin').access_token+'&'+'fileName='+data.quoteGerberPath+'&filePathName='+data.quoteGerberName);
                    });
                }
            });
        } else if (obj.event == 'search'){
            layer.msg('查看订单协同');
        }
    })
    exports('sqeMana_reconciliation', {});
});