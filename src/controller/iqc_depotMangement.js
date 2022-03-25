layui.define(['admin','table','index','element','form'], function(exports) {
    var admin = layui.admin
    ,setter = layui.setter
    ,view = layui.view
    ,table = layui.table
    ,form = layui.form
    ,$ = layui.$;

    //仓库管理
    table.render({
        elem: '#LAY-iqc-depot-manage'
        ,url: setter.baseUrl+'iqc/depot/list'
        ,cellMinWidth: 80
        ,id: "LAY-iqc-depot-manage"
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
            ,{field: 'depotName',title: '仓库名', width: 100, fixed: 'left', sort: true}      // 1 ＝ 待报价
            ,{field: 'productName',title: '产品名', width: 100, sort: true}
            ,{field: 'specification',title: '规格', width: 120, sort: true}
            ,{field: 'size',title: '尺寸', width: 100, sort: true}
            ,{field: 'units',title: '单位', width: 80, sort: true}
            ,{field: 'number',title: '数量', width: 80, sort: true}
            ,{field: 'position',title: '位置', width: 200, sort: true}
            ,{field: 'model',title: '型号', width: 150, sort: true}
            ,{field: 'remarks',title: '备注', width: 250, sort: true}
            ,{field: 'gmtModified',title: '修改时间', width: 170, sort: true}
            ,{field: 'gmtCreate',title: '创建时间', width: 170, sort: true}
            ,{fixed: 'right', title:'操作', toolbar: '#table-iqc-depot-toolbar',width: 90}
        ]]
    });

    //监听工具条
    table.on('tool(LAY-iqc-depot-manage)', function(obj){
        var data = obj.data;
        if(obj.event === 'edit'){
          admin.popup({
            title: '编辑仓库'
            ,area: ['55%', '60%']
            ,id: 'LAY-popup-depot-edit'
            ,btn:['保存', '取消']
            ,yes: function () {
                $("#iqc-depot-sumbit").click();
            }
            ,success: function(layero, index){
              view(this.id).render('iqcManagement/iframeWindow/depot_form', data).done(function(){
                form.render(null, 'iqc-depot-edit-add-form');
                
                //监听提交
                form.on('submit(LAY-iqc-depot-submit)', function(data){
                    var field = data.field; //获取提交的字段
                    admin.req({
                        type:'post',
                        url: setter.baseUrl+'iqc/depot/update' //实际使用请改成服务端真实接口
                        ,data: field
                        ,done: function(res){
                            console.log(res);
                            layer.msg('仓库修改成功');
                            layui.table.reload('LAY-iqc-depot-manage'); //重载表格
                        }
                        ,fail: function (res) {
                            layer.msg('仓库修改失败');
                        },
                    });
                    layer.close(index); //执行关闭   
                });
              });
            }
          });
        }
      });


    exports('iqc_depotMangement',{});
});