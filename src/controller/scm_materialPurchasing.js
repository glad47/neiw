/**


 */


layui.define(['admin','table','index','element','form','uploadCommon', 'filePathProcess','convertCurrency','requestInterface'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,element = layui.element
        ,$ = layui.jquery
        ,uploadCommon = layui.uploadCommon
        ,filePathProcess = layui.filePathProcess
        ,convertCurrency = layui.convertCurrency
        ,requestInterface = layui.requestInterface;

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 物料采购
    table.render({
        elem: '#scm_material_purchasing_tab'
        ,url: setter.baseUrl+'scm/procurement/materialPurchasingList'
        ,toolbar: "#scm_material_purchasing_tb"
        ,cellMinWidth: 80
        ,id: "scm_material_purchasing_tab"
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {type:'checkbox', fixed: 'left'}
            ,{field: 'productNo',title: '产品型号', width: 130, fixed: 'left'}      // 1 ＝ 待报价
            ,{field: 'productSpecification',title: '产品规格', width: 110}
            ,{field: 'productSize',title: '产品尺寸', width: 110}
            ,{field: 'number',title: '数量', width: 200}
            ,{field: 'unitPrice',title: '单价', width: 110}
            ,{field: 'unit',title: '单位', width: 200}
            ,{field: 'totalPrice',title: '总价', width: 183}
            ,{field: 'deliveryTime',title: '交期', width: 177}
            ,{field: 'remark',title: '备注', width: 177}
            ,{field: 'gmtCreate',title: '创建时间', width: 177}
            ,{fixed: 'right', title:'操作', toolbar: '#scm_material_purchasing_tab_tabbar',width: 210}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(scm_material_purchasing_tab)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        console.log(data);
        switch (obj.event) {
            case 'add':
                admin.popup({
                    title: '添加物料采购'
                    ,area: ['733px','532px']
                    ,btn: ['保存', '取消']
                    ,yes: function (index, layero) {
                        $("button[lay-filter='scm_add_material_purchasing_submit']").click();
                        table.reload('scm_material_purchasing_tab');
                    }
                    ,success: function (layero, index) {
                        view(this.id).render('scmManagement/iframeWindow/material_purchasing_edit_add').done(function () {

                        });
                    }
                });
                break;
            case 'create-contract':
                if (data.length == 0) {
                    layer.msg("请选择数据");
                    break;
                }else{
                    var supplier;
                    for (var i = data.length - 1; i >= 0; i--) {
                        if (supplier == null) {
                            supplier = data[i].supplier;
                        } else if (supplier != null && data[i].supplier != supplier) {
                            layer.alert('请选择相同的供应商!');
                            return false;
                        }
                    }
                    admin.popup({
                        title: '物料采购合同'
                        ,area: ['100%', '100%']
                        ,btn: ['生成合同', '取消']
                        ,yes: function (index, layero) {
                            layer.confirm('是否生成合同?', function(index){
                                $.ajax({
                                    type: 'post',
                                    headers: {access_token:layui.data('layuiAdmin').access_token},
                                    data:  JSON.stringify(data),
                                    contentType: "application/json;charset=utf-8",
                                    url: setter.baseUrl+'scm/procurement/createContractBeMp',
                                    success: function (data) {
                                        if (data.code == 0){
                                            layer.alert("提交成功！！");
                                            table.reload('scm_material_purchasing_tb');
                                            layer.closeAll();
                                        }
                                    }
                                });
                            });
                        }
                        ,success: function (layero, index) {
                            view(this.id).render('scmManagement/iframeWindow/outs_contract_mp',data).done(function () {
                            });
                        }
                    });
                }

        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(scm_material_purchasing_tab)', function (obj) {
        var data = obj.data;
        var _this_id = data.id;
        if (obj.event == 'edit'){
            admin.popup({
                title: '物料采购编辑'
                ,area: ['733px','532px']
                ,btn: ['保存', '取消']
                ,yes: function (index, layero) {
                    $("button[lay-filter='scm_add_material_purchasing_submit']").click();
                    table.reload('scm_material_purchasing_tab');
                }
                ,success: function (layero, index) {
                    view(this.id).render('scmManagement/iframeWindow/material_purchasing_edit_add', data).done(function () {

                    });
                }
            });
        } else if (obj.event == 'del'){
            layer.confirm('确定删除？', {
                btn: ['删除', '取消']
                ,btn1: function(index, layero){
                    admin.req({
                        type: 'post',
                        data: {'ids':_this_id},
                        url: setter.baseUrl + 'scm/procurement/delete',
                        success: function () {
                            // table.reload('epcToolMana_tab');
                            obj.del();
                            layer.close(index);
                            layer.msg('删除成功');
                        }
                    });
                }
            });
        }
    });

    //监听搜索
    form.on('submit(material-purchasing-search)', function(data){
        var field = data.field;
        //执行重载
        table.reload('scm_material_purchasing_tab', {
            where: field
        });
    });
    // form.on('select(search-toolMana)', function(data){
    //     $("*[lay-filter='tool-mangement-search']").click();
    // });

    //--------------------------------------------- 采购合同
    table.render({
        elem: '#scm_purchase_contract_tab'
        ,url: setter.baseUrl+'scm/procurement/purchaseContractList'
        //,toolbar: "#scm_material_purchasing"
        ,cellMinWidth: 80
        ,id: "scm_purchase_contract_tab"
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {type:'checkbox', fixed: 'left'}
            ,{field: 'productNo',title: '产品型号', width: 130, fixed: 'left'}      // 1 ＝ 待报价
            ,{field: 'productSpecification',title: '产品规格', width: 110}
            ,{field: 'productSize',title: '产品尺寸', width: 110}
            ,{field: 'number',title: '数量', width: 200}
            ,{field: 'unitPrice',title: '单价', width: 110}
            ,{field: 'unit',title: '单位', width: 200}
            ,{field: 'totalPrice',title: '总价', width: 183}
            ,{field: 'deliveryTime',title: '交期', width: 177}
            ,{field: 'remark',title: '备注', width: 177}
            ,{field: 'gmtCreate',title: '创建时间', width: 177}
            ,{fixed: 'right', title:'操作', toolbar: '#scm_purchase_contract_tab_tabbar',width: 210}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(scm_purchase_contract_tab)', function (obj) {
        var data = obj.data;
        if (obj.event == 'ckht'){
            admin.req({
                type: 'post',
                url: setter.baseUrl+'scm/procurement/findByOrderNo',
                data: {'orderNo':data.orderNo},
                async: false,
                success: function (result) {
                    var d = result.data;
                    d[0].supplierInfo = requestInterface.GetSupplierInfoByCompanyName(setter.baseUrl+'sys/supplier/getByCompanyName/'+d[0].supplier);
                    admin.popup({
                        title: '物料采购合同'
                        ,area: ['100%', '100%']
                        ,btn: ['打印', '取消']
                        ,yes: function (index, layero) {
                            document.body.innerHTML=document.getElementById('outsContract_mp').innerHTML;
                            window.print();
                            window.location.reload();
                        }
                        ,success: function (layero, index) {
                            view(this.id).render('scmManagement/iframeWindow/outs_contract_mp',d).done(function () {
                            });
                        }
                    });
                }
            });
        } else if (obj.event == 'th'){
            layer.confirm('确定退回？', {
                btn: ['确定', '取消']
                ,btn1: function(index, layero){
                    admin.req({
                        type: 'post',
                        data: {'orderNo':data.orderNo},
                        url: setter.baseUrl + 'scm/procurement/backBeOne',
                        success: function () {
                            // table.reload('epcToolMana_tab');
                            obj.del();
                            layer.close(index);
                            layer.msg('退回成功');
                        }
                    });
                }
            });
        }
    });
    //监听搜索
    form.on('submit(purchase-contract-search)', function(data){
        var field = data.field;
        //执行重载
        table.reload('scm_purchase_contract_tab', {
            where: field
        });
    });


    $(".material-purchasing-form-search input").bind("input propertychange", function (even) {
        $("*[lay-filter='material-purchasing-search']").click();
    });
    $(".purchase-contract-form-search input").bind("input propertychange", function (even) {
        $("*[lay-filter='purchase-contract-search']").click();
    });

    exports('scm_materialPurchasing', {});
});