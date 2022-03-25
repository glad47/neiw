layui.define(['table', 'form', 'r'], function(exports){
    var $ = layui.$
    ,table = layui.table
    ,form = layui.form
    ,setter = layui.setter
    ,r = layui.r;
  
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
      ,url: setter.baseUrl+'sys/coupons/list' //模拟接口
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
        ,{field: 'couponCode', title: '优惠码', minWidth: 100, align: 'center'}
        ,{field: 'couponMoney', title: '金额', align: 'center'}
        ,{field: 'startTime', title: '开始时间', align: 'center'}
        ,{field: 'endTime', title: '结束时间', align: 'center'}
        ,{field: 'userSystemId', title: '客户编号', align: 'center'}   
        ,{field: 'couponStatus', title: '状态', templet: '#couponStatusTpl', minWidth: 80, align: 'center'}
        ,{title: '操作', minWidth: 150, align: 'center', fixed: 'right', toolbar: '#table-content-list'}
      ]]
      ,page: true
    });
    
    //监听工具条
    table.on('tool(LAY-sys-coupons-list)', function(obj){
      if(obj.event === 'del'){
        window.del(obj.data);
      } else if(obj.event === 'edit'){
        window.edit(obj);
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
          table.reload('LAY-app-content-list');
          layer.msg('已删除');
        });
      }
      //添加
      ,add: function(){
        window.add({});
      }
      ,createCode: function(){
        window.couponGenerate({});
      }
    }; 


    window.del = function(obj){
      layer.confirm('确定删除吗？', function(index) {
        r.get('sys/coupons/delete',{ids:obj.id}).then(()=>{
            layer.msg('已删除'); 
            table.reload('LAY-sys-coupons-list');
            layer.close(index);
        })
    });
    }

    window.couponGenerate = function(obj){
      r.get('sys/coupons/ruleList',null,false).then((res)=>{
        obj.ruleList = res;
        obj.operateMark = 2;
        return r.popup(
          '选择生成规则',
          ['60%', '65%'],
          ['生成','取消'],
          'infoManagement/iframeWindow/sys_coupons_form',
          obj,
          'sys-coupons-form-submit',
          'sys-coupons-rule-list-table',
          2
        )
      }).then((d)=>{
        // console.log(d);
        layer.close(d.index);
        return r.get('sys/coupons/couponGenerate',{flag:d.tableData.codeFlag},true);
      }).then((res)=>{
        // console.log(res);
        layer.alert(res,{icon: 1,skin: 'layer-ext-moon' });
      })
    }

    window.edit = function(obj){
      let layerIndex;
      r.get('sys/coupons/ruleList',null,false).then((res)=>{
        obj.ruleList = res;
        obj.operateMark = 1;
        return r.popup(
          '编辑优惠券',
          ['60%', '65%'],
          ['修改','取消'],
          'infoManagement/iframeWindow/sys_coupons_form',
          obj,
          'sys-coupons-form-submit',
          'sys-coupons-rule-list-table',
          2
        ); 
      })
    }

    window.add = function(obj){
      let layerIndex;
      //获取所有的优惠券生成规则表
      r.get('sys/coupons/ruleList',null,false).then((res)=>{
        // console.log(res);
        obj.ruleList = res;
        obj.operateMark = 1;
        return r.popup(
          '添加优惠券',
          ['60%', '65%'],
          ['保存','取消'],
          'infoManagement/iframeWindow/sys_coupons_form',
          obj,
          'sys-coupons-form-submit',
          'sys-coupons-rule-list-table',
          2
        );
      }).then((d)=>{
        // console.log(d);
        let sendData = d.formData.field;
        layerIndex = d.index;
        sendData.couponRule = d.tableData;
        //处理删除id
        // if(sendData.delIdArr){
        //   sendData.delIdArr = sendData.delIdArr.split(",");
        // }else{
        //   sendData.delIdArr = [];
        // }
        return r.post('sys/coupons/save',sendData)
      }).then((r)=>{
        layer.msg('添加成功！！！');
        table.reload('LAY-sys-coupons-list');
        layer.close(layerIndex);
      })
    }

    $('.layui-btn.layuiadmin-btn-list').on('click', function(){
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });

  
    exports('sys_coupons', {})
  });