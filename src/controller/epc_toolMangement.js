/**

 @Name:    工程管理－－［工具管理］

 */
layui.define(['admin','table','index','element','form','uploadCommon', 'filePathProcess'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,setter = layui.setter
        ,element = layui.element
        ,$ = layui.jquery
        ,uploadCommon = layui.uploadCommon
        ,filePathProcess = layui.filePathProcess;


    form.render(null,'tool-mangement-form-list');

    //监听搜索
    form.on('submit(LAY-tool-mangement-search)', function(data){
        var field = data.field;
        //执行重载
        table.reload('epcToolMana_tab', {
            where: field
        });
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    table.render({
        elem: '#epcToolMana_tab'
        ,url: setter.baseUrl+'epc/tool/list'
        ,toolbar: "#epcToolMana_tb"
        ,cellMinWidth: 80
        ,id: "epcToolMana_tab"
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
            ,{field: 'productNo',title: '内部型号', width: 150, fixed: 'left', sort: true}      // 1 ＝ 待报价
            ,{field: 'makeWay',title: '制作方式', width: 89, sort: true}
            ,{field: 'type',title: '类型', width: 110, sort: true}
            ,{field: 'cost',title: '费用', width: 110, sort: true}
            ,{field: 'manufacturers',title: '制造商', width: 200, sort: true}
            ,{field: 'productionTime',title: '制作时间', width: 110, sort: true}
            ,{field: 'supplier',title: '供应商存放', width: 200, sort: true}
            ,{field: 'supplierNo',title: '供应商编号', width: 183, sort: true}
            ,{field: 'gmtCreate',title: '创建时间', width: 177, sort: true}
            ,{field: 'gmtModified',title: '修改时间', width: 177, sort: true}
            ,{field: 'storageTime',title: '存放时间', width: 177, sort: true}
            ,{field: 'remark',title: '备注', width: 130, sort: true}
            ,{field: 'id',title: 'ID', hide: true}
            ,{fixed: 'right', title:'操作', toolbar: '#epcToolMana_tabbar',width: 260}
        ]]
        ,done: function (res, curr, count) {

        }
    });
    table.on('toolbar(epcToolMana_tab)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var pertData = new Object();
        switch (obj.event) {
            case 'add':
                admin.popup({
                    title: '添加工具'
                    ,area: ['733px','532px']
                    ,btn: ['保存', '取消']
                    ,yes: function (index, layero) {
                        $("button[lay-filter='add_tool_submit']").click();
                        table.reload('epcToolMana_tab');
                    }
                    ,success: function (layero, index) {
                        view(this.id).render('epcManagement/iframeWindow/add_tool').done(function () {

                        });
                    }
                });
                break;
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(epcToolMana_tab)', function (obj) {
        var data = obj.data;
        var _this_id = data.id;
        console.log("_this_id"+ _this_id);
        if (obj.event == 'edit'){
            admin.popup({
                title: '工具编辑'
                ,area: ['733px','532px']
                ,btn: ['保存', '取消']
                ,yes: function (index, layero) {
                    $("button[lay-filter='add_tool_submit']").click();
                }
                ,success: function (layero, index) {
                    view(this.id).render('epcManagement/iframeWindow/add_tool', data).done(function () {

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
                        url: setter.baseUrl + '/epc/tool/delete',
                        success: function () {
                            // table.reload('epcToolMana_tab');
                            obj.del();
                            layer.close(index);
                            layer.msg('删除成功');
                        }
                    });
                }
            });
        } else if (obj.event == 'zrs') {
            admin.popup({
                title: '资产保管责任书',
                area: ['56%','80%'],
                id: 'popup_zrs',
                btn: ['打印', '取消'],
                yes: function (index, layero) {
                    document.body.innerHTML=document.getElementById('print_toolZrs').innerHTML;
                    window.print();
                    window.location.reload();
                },
                success: function (layero, index) {
                    view(this.id).render('epcManagement/iframeWindow/tool_zrs', data).done(function () {
                        console.log(data);
                    });
                }
            })
        } else if (obj.event == 'tool-fileMang') {
            // data = filePathProcess.isInternal(data);
            console.log(data);
            admin.popup({
                title: '测试架资料管理'
                ,area: ['870px', '303px']
                ,success: function (layero, index) {
                    view(this.id).render('epcManagement/iframeWindow/tool_file_management', data).done(function () {
                    });
                }
                ,end: function () {
                    localStorage.removeItem("saveBackResult");  // 清除localStorage
                }
            });
        }
    });

    exports('epc_toolMangement', {});
});