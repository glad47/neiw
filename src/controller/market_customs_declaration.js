
layui.define(['table', 'form', 'util'], function(exports){
    var $ = layui.$
    ,admin = layui.admin
    ,view = layui.view
    ,table = layui.table
    ,setter = layui.setter
    ,form = layui.form;
    
    form.render(null, 'marker-customs-declaration-list');

    //监听搜索
    form.on('submit(market-customs-declaration-search)', function(data){
        var field = data.field;
        
        //执行重载
        table.reload('market-customs-declaration-table', {
            where: field
        });
    });
    
    //table
    table.render({
      elem: '#market-customs-declaration-table'
      ,id: "market-customs-declaration-table"
      ,url: setter.baseUrl+'market/customsdeclaration/list'
      ,page: true
      ,parseData: function (res) {
          return{
              "code": 0,
              "data": res.page.list,
              "count": res.page.totalCount
          }
      }
      ,cols: [[
        {type: 'checkbox', fixed: 'left'}
        ,{field: 'id', width: 100, title: 'ID', sort: true}
        ,{field: 'orderNos', title: '订单号串'}
        ,{field: 'customerNo', title: '客户编号'}
        ,{field: 'gmtCreate', title: '创建时间', sort: true,  templet: "<div>{{ d.gmtCreate != null ? layui.util.toDateString(d.gmtCreate, 'yyyy-MM-dd') : ''}}</div>"}
        ,{title: '操作', width: 450, align: 'center', fixed: 'right', toolbar: '#table-customs-declaration-toolbar'}
      ]]
    });
    
    //监听工具条
    table.on('tool(market-customs-declaration-table)', function(obj){
      var data = obj.data;
      if(obj.event === 'packingListEn'){
        admin.popup({
            title: '装箱单(英)'
            ,area: ['100%', '100%']
            ,id: 'LAY-popup-packing-list-en'
            ,btn:['打印', '取消']
            ,yes: function(index, layero){
                // console.log('ssssss')
                document.body.innerHTML=document.getElementById('market-packing-list-en-print').innerHTML;
                window.print();
                window.location.reload();
            }
            ,success: function(layero, index){
              view(this.id).render('marketManagement/iframeWindow/packing_list_en', data).done(function(){
              });
            }
         });
      } else if(obj.event === 'packingListCn'){
        admin.popup({
          title: '编辑评论'
          ,area: ['450px', '300px']
          ,id: 'LAY-popup-content-comm'
          ,success: function(layero, index){
            view(this.id).render('app/content/contform', data).done(function(){
              form.render(null, 'layuiadmin-form-comment');
              
              //监听提交
              form.on('submit(layuiadmin-app-com-submit)', function(data){
                var field = data.field; //获取提交的字段
  
                //提交 Ajax 成功后，关闭当前弹层并重载表格
                //$.ajax({});
                layui.table.reload('LAY-app-content-comm'); //重载表格
                layer.close(index); //执行关闭 
              });
            });
          }
        });
      } else if(obj.event === 'contract'){

      } else if(obj.event === 'invoice'){

      } else if(obj.event === 'declaration'){

      }
    });

    var active = {
        //删除
        batchdel: function(){
          var checkStatus = table.checkStatus('market-customs-declaration-table')
          ,checkData = checkStatus.data; //得到选中的数据
  
          if(checkData.length === 0){
            return layer.msg('请选择数据');
          }
          var ids = checkData.map(function(elem){return elem.id}).join(",");
          layer.confirm('确定删除吗？', function(index) {
            admin.req({
                type: 'post',
                url: setter.baseUrl+'market/customsdeclaration/delete',
                data: {'ids':ids},
                success: function () {
                    table.reload('market-customs-declaration-table');
                    layer.msg('已删除');
                }
            });
          });
        }
        //添加
        ,add: function(othis){
          admin.popup({
            title: '添加报关单'
            ,area: ['90%', '85%']
            ,id: 'LAY-popup-customs-declaration-add'
            ,btn:['保存', '取消']
            ,yes: function(){
                $("#mcdfs").click();
            }
            ,success: function(layero, index){
              view(this.id).render('marketManagement/iframeWindow/customs_declaration_form').done(function(){
                form.render(null,'market-customs-declaration-form');

                //监听提交
                form.on('submit(market-customs-declaration-form-submit)',function (data) {
                    //获取表格数据
                    let field = data.field,tableData = table.cache["market-packing-list-en-table"];
                    field.itemEntityList = tableData;
                    console.log(field);
                    //提交表单
                    admin.req({
                        type: 'post'
                        ,headers: {access_token:layui.data('layuiAdmin').access_token}
                        ,url: setter.baseUrl+'market/customsdeclaration/save'
                        ,contentType: "application/json;charset=utf-8"
                        ,dataType:'json'
                        ,data: JSON.stringify(field)
                        ,success: function (res) {
                            layer.msg('添加成功！！');
                            table.reload('market-customs-declaration-table');
                        }
                        ,error: function (res) {
                            layer.msg("添加失败，请稍后再试！");
                        }
                    });
                    layer.close(index);
                });
              });
            }
          });
        }
        //修改
        ,edit: function(){
          var checkStatus = table.checkStatus('market-customs-declaration-table')
          ,checkData = checkStatus.data; //得到选中的数据
  
          if(checkData.length === 0){
            return layer.msg('请选择数据');
          }
          if(checkData.length > 1){
            return layer.msg('只能选择一条数据');
          }

          admin.req({
            type: 'post',
            url: setter.baseUrl+'market/customsdeclaration/detailedInfo/'+checkData[0].id,
            success: function (res) {
              let data = checkData[0];
              data.itemEntityList = res.data;
              admin.popup({
                title: '编辑报关单'
                ,area: ['90%', '85%']
                ,id: 'LAY-popup-customs-declaration-edit'
                ,btn:['修改', '取消']
                ,yes: function(){
                    $("#mcdfs").click();
                }
                ,success: function(layero, index){
                  view(this.id).render('marketManagement/iframeWindow/customs_declaration_form',data).done(function(){
                    form.render(null,'market-customs-declaration-form');
    
                    //监听提交
                    form.on('submit(market-customs-declaration-form-submit)',function (data) {
                        //获取表格数据
                        let field = data.field,tableData = table.cache["market-packing-list-en-table"];
                        field.itemEntityList = tableData;
                        console.log(field);
                        //提交表单
                        admin.req({
                            type: 'post'
                            ,headers: {access_token:layui.data('layuiAdmin').access_token}
                            ,url: setter.baseUrl+'market/customsdeclaration/update'
                            ,contentType: "application/json;charset=utf-8"
                            ,dataType:'json'
                            ,data: JSON.stringify(field)
                            ,success: function (res) {
                                layer.msg('修改成功！！');
                                table.reload('market-customs-declaration-table');
                            }
                            ,error: function (res) {
                                layer.msg("添加失败，请稍后再试！");
                            }
                        });
                        layer.close(index);
                    });
                  });
                }
              }); 
              
            }
        });
        }
    }; 
  
    $('.layui-btn.layuiadmin-btn-list').on('click', function(){
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });
  
    exports('market_customs_declaration', {})
  });