
layui.define(['table', 'form', 'util','requestInterface','jsTools','convertCurrency'], function(exports){
    var $ = layui.$
    ,admin = layui.admin
    ,view = layui.view
    ,table = layui.table
    ,setter = layui.setter
    ,form = layui.form
    ,jsTools = layui.jsTools
    ,convertCurrency = layui.convertCurrency
    ,requestInterface = layui.requestInterface;
    
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
        ,{field: 'commercialInvoice', title: '发票号（CI）'}
        ,{field: 'customerNo', title: '客户编号'}
        ,{field: 'gmtCreate', title: '创建时间', sort: true,  templet: "<div>{{ d.gmtCreate != null ? layui.util.toDateString(d.gmtCreate, 'yyyy-MM-dd') : ''}}</div>"}
        ,{title: '操作', width: 450, align: 'center', fixed: 'right', toolbar: '#table-customs-declaration-toolbar'}
      ]]
    });
    
    //监听工具条
    table.on('tool(market-customs-declaration-table)', function(obj){
      var data = obj.data;
      var userInfoUrl = setter.baseUrl+'sys/consumer/user/info/'+data.receiverId;
      //获取用户信息
      var userInfo = requestInterface.GetCustomerInfo(userInfoUrl);
      data.userInfo = userInfo;
      if(obj.event === 'packingListEn'){
        admin.req({
          type: 'post',
          url: setter.baseUrl+'market/customsdeclaration/detailedInfo/'+data.id,
          success: function (res) {
            if(res.data.length === 0) return layer.msg('详细为空，请添加数据');
            data.itemEntityList = res.data;
            // console.log(data);
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
          } 
        })
      } else if(obj.event === 'packingListCn'){
        admin.req({
          type: 'post', 
          url: setter.baseUrl+'market/customsdeclaration/detailedInfoGroup/'+data.id, 
          success: function(res){
            if(res.data.length === 0) return layer.msg('详细为空，请添加数据');
            data.itemEntityList = res.data;
            admin.popup({
              title: '装箱单(中)'
              ,area: ['100%', '100%']
              ,id: 'LAY-popup-packing-list-cn'
              ,btn:['打印', '取消'] 
              ,yes: function(index, layero){
                // console.log('ssssss')
                document.body.innerHTML=document.getElementById('market-packing-list-cn-print').innerHTML;
                window.print();
                window.location.reload();
              }
              ,success: function(layero, index){
                view(this.id).render('marketManagement/iframeWindow/packing_list_cn', data).done(function(){
                });
              }
            });
          }
        })
      } else if(obj.event === 'contract'){
        admin.req({
          type: 'post',
          url: setter.baseUrl + 'market/customsdeclaration/detailedInfoGroup/'+data.id,
          success: function(res){
            if(res.data.length === 0) return layer.msg('详细为空，请添加数据');
            data.itemEntityList = res.data;
            console.log(res.data);
            //计算总值
            let tp = res.data.map(i =>(Number(i.totalPrice))).reduce((total,num)=> total + num);
            let tp2 = convertCurrency.conversion(tp);
            //计算交期
            let tw = jsTools.TimeWeekage(data.orderTime,2);
            console.log(tw);
            data.tp = tp;
            data.tp2 =tp2;
            data.tw = tw;
            admin.popup({
              title: '合同'
              ,area: ['100%', '100%']
              ,id: 'LAY-popup-packing-list-contract'
              ,btn:['打印', '取消']
              ,yes: function(index, layero){
                  document.body.innerHTML=document.getElementById('market-packing-list-contract-print').innerHTML;
                  window.print();
                  window.location.reload();
              }
              ,success: function(layero, index){
                view(this.id).render('marketManagement/iframeWindow/packing_list_contract', data).done(function(){
                });
              }
            });   
          }
        })
      } else if(obj.event === 'invoice'){
        admin.req({
          type: 'post',
          url: setter.baseUrl + 'market/customsdeclaration/detailedInfoGroup/'+data.id,
          success: function(res){
            if(res.data.length === 0) return layer.msg('详细为空，请添加数据');
            data.itemEntityList = res.data;
            console.log(data);
            admin.popup({
              title: '发票'
              ,area: ['100%', '100%']
              ,id: 'LAY-popup-packing-list-invoice'
              ,btn:['打印', '取消']
              ,yes: function(index, layero){
                  // console.log('ssssss')
                  document.body.innerHTML=document.getElementById('market-packing-list-invoice-print').innerHTML;
                  window.print();
                  window.location.reload();
              }
              ,success: function(layero, index){
                view(this.id).render('marketManagement/iframeWindow/packing_list_invoice', data).done(function(){
                });
              }
            });   
          }
        })
      } else if(obj.event === 'declaration'){
        admin.req({
          type: 'post',
          url: setter.baseUrl + 'market/customsdeclaration/detailedInfoGroup/'+data.id,
          success: function(res){
            if(res.data.length === 0) return layer.msg('详细为空，请添加数据');
            data.itemEntityList = res.data;
            console.log(data);
            admin.popup({
              title: '报关单'
              ,area: ['100%', '100%']
              ,id: 'LAY-popup-packing-list-customs'
              ,btn:['打印', '取消']
              ,yes: function(index, layero){
                  document.body.innerHTML=document.getElementById('market-packing-list-customs-print').innerHTML;
                  window.print();
                  window.location.reload();
              }
              ,success: function(layero, index){
                view(this.id).render('marketManagement/iframeWindow/packing_list_customs', data).done(function(){
                });
              }
            });   
          }
        })
      }
    });

    //双击操作
    table.on('rowDouble(market-customs-declaration-table)',function(obj){
      editOperate(obj.data);
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
                    let loadindex = layer.load(1, {shade: [0.1,'#fff']}); 
                    //获取表格数据
                    let field = data.field,tableData = table.cache["market-packing-list-en-table"];
                    field.itemEntityList = tableData;
                    // console.log(field);
                    //提交表单
                    admin.req({
                        type: 'post'
                        ,headers: {access_token:layui.data('layuiAdmin').access_token}
                        ,url: setter.baseUrl+'market/customsdeclaration/save'
                        ,contentType: "application/json;charset=utf-8"
                        ,data: JSON.stringify(field)
                        ,success: function (res) {
                            layer.close(loadindex);
                            layer.msg('添加成功！！');
                            table.reload('market-customs-declaration-table');
                            layer.close(index);
                        }
                        ,error: function (res) {
                            layer.msg("添加失败，请稍后再试！");
                        }
                    });
                    
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
          editOperate(checkData[0]);
        }
    };
    
    function editOperate(data){
      admin.req({
        type: 'post',
        url: setter.baseUrl+'market/customsdeclaration/detailedInfo/'+data.id,
        success: function (res) {
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
  
    $('.layui-btn.layuiadmin-btn-list').on('click', function(){
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });
  
    exports('market_customs_declaration', {})
  });