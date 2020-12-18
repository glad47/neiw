layui.define(['table', 'form', 'r'], function(exports){
    var $ = layui.$
    ,admin = layui.admin
    ,view = layui.view
    ,table = layui.table
    ,form = layui.form,
    r = layui.r;
  
    form.render(null, 'sys-coupons-list');

    //监听搜索
    form.on('submit(LAY-sys-coupons-search)', function(data){
        var field = data.field;
        //执行重载
        table.reload('LAY-sys-coupons-list', {
            where: field
        });
    });

    //优惠券管理
    table.render({
      elem: '#LAY-sys-coupons-list'
      ,url: './json/content/list.js' //模拟接口
      ,cols: [[
        {type: 'checkbox', fixed: 'left'}
        ,{field: 'id', width: 100, title: '文章ID', sort: true}
        ,{field: 'label', title: '文章标签', minWidth: 100}
        ,{field: 'title', title: '文章标题'}
        ,{field: 'author', title: '作者'}
        ,{field: 'uploadtime', title: '上传时间', sort: true}   
        ,{field: 'status', title: '发布状态', templet: '#buttonTpl', minWidth: 80, align: 'center'}
        ,{title: '操作', minWidth: 150, align: 'center', fixed: 'right', toolbar: '#table-content-list'}
      ]]
      ,page: true
      ,text: '对不起，加载出现异常！'
    });
    
    //监听工具条
    table.on('tool(LAY-app-content-list)', function(obj){
      var data = obj.data;
      if(obj.event === 'del'){
        layer.confirm('确定删除此文章？', function(index){
          obj.del();
          layer.close(index);
        });
      } else if(obj.event === 'edit'){
        admin.popup({
          title: '编辑文章'
          ,area: ['550px', '550px']
          ,id: 'LAY-popup-content-edit'
          ,success: function(layero, index){
            view(this.id).render('app/content/listform', data).done(function(){
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

  
    exports('sys_coupons', {})
  });