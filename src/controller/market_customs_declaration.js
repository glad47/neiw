
layui.define(['table', 'form'], function(exports){
    var $ = layui.$
    ,admin = layui.admin
    ,view = layui.view
    ,table = layui.table
    ,form = layui.form;
    
    form.render(null, 'app-content-list');

    //监听搜索
    form.on('submit(LAY-app-contlist-search)', function(data){
        var field = data.field;
        
        //执行重载
        table.reload('LAY-app-content-list', {
            where: field
        });
    });
    
    //评论管理
    table.render({
      elem: '#LAY-app-content-comm'
      ,url: './json/content/comment.js' //模拟接口
      ,cols: [[
        {type: 'checkbox', fixed: 'left'}
        ,{field: 'id', width: 100, title: 'ID', sort: true}
        ,{field: 'reviewers', title: '评论者', minWidth: 100}
        ,{field: 'content', title: '评论内容', minWidth: 100}
        ,{field: 'commtime', title: '评论时间', minWidth: 100, sort: true}
        ,{title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-content-com'}
      ]]
      ,page: true
      ,limit: 10
      ,limits: [10, 15, 20, 25, 30]
      ,text: '对不起，加载出现异常！'
    });
    
    //监听工具条
    table.on('tool(LAY-app-content-comm)', function(obj){
      var data = obj.data;
      if(obj.event === 'del'){
        layer.confirm('确定删除此条评论？', function(index){
          obj.del();
          layer.close(index);
        });
      } else if(obj.event === 'edit'){
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
      }
    });

    var active = {
        batchdel: function(){
          var checkStatus = table.checkStatus('LAY-app-content-list')
          ,checkData = checkStatus.data; //得到选中的数据
  
          if(checkData.length === 0){
            return layer.msg('请选择数据');
          }
        
          layer.confirm('确定删除吗？', function(index) {
            
            //执行 Ajax 后重载
            /*
            admin.req({
              url: 'xxx'
              //,……
            });
            */
            table.reload('LAY-app-content-list');
            layer.msg('已删除');
          });
        }
        
        //添加
        ,add: function(othis){
          admin.popup({
            title: '添加文章'
            ,area: ['550px', '550px']
            ,id: 'LAY-popup-content-add'
            ,success: function(layero, index){
              view(this.id).render('app/content/listform').done(function(){
                form.render(null, 'layuiadmin-app-form-list');
                
                //监听提交
                form.on('submit(layuiadmin-app-form-submit)', function(data){
                  var field = data.field; //获取提交的字段
  
                  //提交 Ajax 成功后，关闭当前弹层并重载表格
                  //$.ajax({});
                  layui.table.reload('LAY-app-content-list'); //重载表格
                  layer.close(index); //执行关闭 
                });
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