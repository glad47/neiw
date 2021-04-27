layui.define(['table', 'form', 'r', 'upload'], function(exports){
    var $ = layui.$
    ,table = layui.table
    ,form = layui.form
    ,upload = layui.upload
    ,setter = layui.setter
    ,r = layui.r;
  
    form.render(null, 'sys-country-list');

    //监听搜索
    form.on('submit(LAY-sys-country-search)', function(data){
        var field = data.field;
        //执行重载
        table.reload('LAY-sys-country-list', {
            where: field
        });
    });

    //国家管理
    table.render({
      elem: '#LAY-sys-country-list'
      ,url: setter.baseUrl+'sys/country/list' //模拟接口
      ,parseData: function (res) {
        return{
            "code": 0,
            "data": res.page.list,
            "count": res.page.totalCount
        }
      }
      ,cols: [[
        {type: 'checkbox', fixed: 'left'}
        ,{field: 'id', width: 100, title: 'ID', sort: true, align: 'center'}
        ,{field: 'name', title: '国家名(英)', minWidth: 100, align: 'center'}
        ,{field: 'cname', title: '国家名(中)', align: 'center'}
        ,{field: 'remark', title: '备注', align: 'center'}
        ,{field: 'partitionFedex', title: 'fedex分区', align: 'center'}
        ,{title: '操作', minWidth: 150, align: 'center', fixed: 'right', toolbar: '#table-country-list'}
      ]]
      ,page: true
    });
    
    //监听工具条
    table.on('tool(LAY-sys-country-list)', function(obj){
      if(obj.event === 'del'){
        window.del(obj.data);
      } else if(obj.event === 'edit'){
        window.edit(obj.data);
      }
    });

    var uploadInst = upload.render({
        elem: '#excelFedex' //绑定元素
        ,url: setter.baseURL+'sys/country/importPartitionFedex' //上传接口
        ,exts: 'xlsx|xls'
        ,headers:{token: layui.data('layuiAdmin').access_token}
        ,done: function(res){
          //上传完毕回调
          layer.msg(res.msg);
        }
        ,error: function(){
          //请求异常回调
          layer.error('上传异常！！');
        }
      });
  
    var active = {
      //添加
      add: function(){
        window.add({});
      }
      ,createCode: function(){
        window.couponGenerate({});
      }
    }; 


    window.del = function(obj){
      layer.confirm('确定删除吗？', function(index) {
        r.get('sys/country/delete',{ids:obj.id}).then(()=>{
            layer.msg('已删除'); 
            table.reload('LAY-sys-country-list');
            layer.clone(index);
        })
    });
    }

    window.edit = function(obj){
      let layerIndex;
       r.popup(
          '编辑国家',
          ['25%', '55%'],
          ['修改','取消'],
          'infoManagement/iframeWindow/sys_country_form',
          obj,
          'sys-country-form-submit',
          null,
          null
        ).then((d)=>{
            let sendData = d.formData.field;
            layerIndex = d.index;
            console.log(sendData);
            return r.post('sys/country/update',sendData);
        }).then((r)=>{
            layer.msg('修改成功！！！');
            table.reload('LAY-sys-country-list');
            layer.close(layerIndex);
        })
    }

    window.add = function(obj){
      let layerIndex;
      //获取所有的优惠券生成规则表
        r.popup(
          '添加国家',
          ['25%', '55%'],
          ['保存','取消'],
          'infoManagement/iframeWindow/sys_country_form',
          obj,
          'sys-country-form-submit',
          null,
          null
        ).then((d)=>{
        let sendData = d.formData.field;
        layerIndex = d.index;
        console.log(sendData);
        return r.post('sys/country/save',sendData)
      }).then((r)=>{
        layer.msg('添加成功！！！');
        table.reload('LAY-sys-country-list');
        layer.close(layerIndex);
      })
    }

    $('.layui-btn.layuiadmin-btn-list').on('click', function(){
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });

  
    exports('sys_country', {})
  });