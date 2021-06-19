/**
 * 供应链管理
 */


layui.define(['admin','table','index','element','form','uploadCommon', 'filePathProcess','convertCurrency','requestInterface','r'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,element = layui.element
        ,$ = layui.jquery
        ,r = layui.r
        ,uploadCommon = layui.uploadCommon
        ,filePathProcess = layui.filePathProcess
        ,convertCurrency = layui.convertCurrency
        ,requestInterface = layui.requestInterface;

    form.render(null,'material-purchasing-form-list');
    //监听搜索
    form.on('submit(material-purchasing-search)', function(data){
        var field = data.field;
        //执行重载
        table.reload('scm_material_purchasing_tab', {
            where: field
        });
    });
    //－－－－－－－－－－－－－－－－－－－－ 物料采购
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
            ,{field: 'productNo',title: '产品型号', width: 135, fixed: 'left', sort: true}      // 1 ＝ 待报价
            ,{field: 'productSpecification',title: '产品规格', width: 110, sort: true}
            ,{field: 'productSize',title: '产品尺寸', width: 110, sort: true}
            ,{field: 'number',title: '数量', width: 200, sort: true}
            ,{field: 'unitPrice',title: '单价', width: 110, sort: true}
            ,{field: 'unit',title: '单位', width: 200, sort: true}
            ,{field: 'totalPrice',title: '总价', width: 183, sort: true}
            ,{field: 'deliveryTime',title: '交期', width: 177, sort: true}
            ,{field: 'remark',title: '备注', width: 177, sort: true}
            ,{field: 'gmtCreate',title: '创建时间', width: 177, sort: true}
            ,{fixed: 'right', title:'操作', toolbar: '#scm_material_purchasing_tab_tabbar',width: 140}
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
                    ,id: 'LAY-popup-scm-material-purchasing-add'
                    ,btn: ['保存', '取消']
                    ,yes: function (index, layero) {
                        $("#scm-material-purchasin-edit-add-sumbit").click();
                    }
                    ,success: function (layero, index) {
                        view(this.id).render('scmManagement/iframeWindow/material_purchasing_edit_add').done(function () {
                            form.render(null,'scm-material-purchasin-edit-add-form');

                            form.on('submit(scm-material-purchasin-edit-add-sumbit)', function(data){
                                var field = data.field;
                                // data.field.supplier = supplier;
                                // data.field.supplierId = supplierId;
                                admin.req({
                                    type: 'post',
                                    url: setter.baseUrl+'scm/procurement/save',
                                    data: field,
                                    success: function (res) {
                                        layer.msg('添加物料采购成功');
                                        layui.table.reload('scm_material_purchasing_tab');
                                        layer.close(index);
                                    }
                                })
                                return false;
                            });       
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
                    data.supplierInfo = requestInterface.GetSupplierInfo(setter.baseUrl+'sys/supplier/info/'+data[0].supplierId);
                    admin.popup({
                        title: '物料采购合同'
                        ,area: ['100%', '100%']
                        ,btn: ['生成合同', '取消']
                        ,id: 'LAY-popup-scm-material-purchasing-create'
                        ,yes: function (index, layero) {
                            layer.confirm('是否生成合同?', function(i){
                                $.ajax({
                                    type: 'post',
                                    headers: {access_token:layui.data('layuiAdmin').access_token},
                                    data:  JSON.stringify(data),
                                    contentType: "application/json;charset=utf-8",
                                    url: setter.baseUrl+'scm/procurement/createContractBeMp',
                                    success: function (data) {
                                        if (data.code == 0){
                                            layer.alert("提交成功！！");
                                            layer.close(index);
                                        }
                                        table.reload('scm_material_purchasing_tab');
                                    }
                                });
                            });
                        }
                        ,success: function (layero, index) {
                            view(this.id).render('scmManagement/iframeWindow/outs_contract_mp',data).done(function () {
                                console.log(data)
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
            // var reTab = 'scm_material_purchasing_tab';
            // p_wlcg_edit.wlcgEdit(data, reTab);
            admin.popup({
                title: '编辑物料采购'
                ,area: ['733px','532px']
                ,id: 'LAY-popup-scm-material-puchasing-edit'
                ,btn: ['保存', '取消']
                ,yes: function (index, layero) {
                    $("#scm-material-purchasin-edit-add-sumbit").click();
                }
                ,success: function (layero, index) {
                    view(this.id).render('scmManagement/iframeWindow/material_purchasing_edit_add',data).done(function () {
                        form.render(null,'scm-material-purchasin-edit-add-form');

                        form.on('submit(scm-material-purchasin-edit-add-sumbit)', function(data){
                            var field = data.field;
                            // data.field.supplier = supplier;
                            // data.field.supplierId = supplierId;
                            admin.req({
                                type: 'post',
                                url: setter.baseUrl+'scm/procurement/update',
                                data: field,
                                success: function (res) {
                                    layer.msg('更新物料采购成功');
                                    layui.table.reload('scm_material_purchasing_tab');
                                    layer.close(index);
                                }
                            })
                            return false;
                        });       
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
                            table.reload('scm_material_purchasing_tab');
                            // obj.del();
                            layer.close(index);
                            layer.msg('删除成功');
                        }
                    });
                }
            });
        }
    });
    


    //--------------------------------------------- 采购合同

    form.render(null,'scm-purchase-contract-form-list');
    //监听搜索
    form.on('submit(LAY-scm-purchase-contract-search)', function(data){
        var field = data.field;
        //执行重载
        table.reload('scm_purchase_contract_tab', {
            where: field
        });
    });

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
            ,{field: 'productNo',title: '产品型号', width: 135, fixed: 'left', sort: true}      // 1 ＝ 待报价
            ,{field: 'productSpecification',title: '产品规格', width: 110, sort: true}
            ,{field: 'productSize',title: '产品尺寸', width: 110, sort: true}
            ,{field: 'number',title: '数量', width: 200, sort: true}
            ,{field: 'unitPrice',title: '单价', width: 110, sort: true}
            ,{field: 'unit',title: '单位', width: 200, sort: true}
            ,{field: 'totalPrice',title: '总价', width: 183, sort: true}
            ,{field: 'deliveryTime',title: '交期', width: 177, sort: true}
            ,{field: 'remark',title: '备注', width: 177, sort: true}
            ,{field: 'gmtCreate',title: '创建时间', width: 177, sort: true}
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
        } else if (obj.event == 'pcedit') {
            //p_wlcg_edit.wlcgEdit(data, 'scm_purchase_contract_tab');
            admin.popup({
                title: '编辑物料采购'
                ,area: ['733px','532px']
                ,id: 'LAY-popup-scm-puchasing-contract-edit'
                ,btn: ['保存', '取消']
                ,yes: function (index, layero) {
                    $("#scm-material-purchasin-edit-add-sumbit").click();
                }
                ,success: function (layero, index) {
                    view(this.id).render('scmManagement/iframeWindow/material_purchasing_edit_add',data).done(function () {
                        form.render(null,'scm-material-purchasin-edit-add-form');

                        form.on('submit(scm-material-purchasin-edit-add-sumbit)', function(data){
                            var field = data.field;
                            admin.req({
                                type: 'post',
                                url: setter.baseUrl+'scm/procurement/update',
                                data: field,
                                success: function (res) {
                                    layer.msg('更新物料采购成功');
                                    layui.table.reload('scm_purchase_contract_tab');
                                    layer.close(index);
                                }
                            })
                            return false;
                        });       
                    });
                }
            });
        }
    });
    
    var active = {
        import: function(data){
            if(!data){
                var checkStatus = table.checkStatus('scm_purchase_contract_tab')
                ,checkData = checkStatus.data; //得到选中的数据
                if(checkData.length === 0){
                return layer.msg('请选择数据');
                }
                if(checkData.length > 1){
                return layer.msg('只能选择一条数据');
                }
                data = checkData[0];
            }
            let layerIndex;
            r.popup(
                '导入物料数据',
                ['733px','532px'],
                ['导入', '取消'], 
                'scmManagement/iframeWindow/material_purchasing_edit_add',
                data,
                'scm-material-purchasin-edit-add-sumbit',
                null,
                0
            ).then((d)=>{
                console.log(d);
                let sendData = d.formData.field;
                layerIndex = d.index;
                return r.get('scm/procurement/save',sendData,true);
            }).then((res)=>{
                layer.msg('导入添加成功！！！');
                // table.reload('market-customs-declaration-table');
                layer.close(layerIndex); 
              });

        }
    }

    // $(".material-purchasing-form-search input").bind("input propertychange", function (even) {
    //     $("*[lay-filter='material-purchasing-search']").click();
    // });
    // $(".purchase-contract-form-search input").bind("input propertychange", function (even) {
    //     $("*[lay-filter='purchase-contract-search']").click();
    // });
    $('.layui-btn.layuiadmin-btn-list').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    

    exports('scm_materialPurchasing', {});
});