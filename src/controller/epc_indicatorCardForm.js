
layui.define(['admin', 'table', 'index','element','form','laydate'], function(exports){
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element;
        var $ = layui.jquery;
    //监听搜索
      form.on('submit(LAY-app-indicator-contlist-search)', function(data){
        var field = data.field;
        console.log(field);
        //执行重载
        table.reload('indicator_listTab', {
            where: field
        });
      });

    table.render({
      elem: '#indicator_listTab'
      ,url: setter.baseUrl+'epc/process/list'
      ,parseData: function (res) {
          return{
              "code": 0,
              "data": res.page.list,
              "count": res.page.totalCount
          }
       }
      ,cols: [[
        {type:'checkbox', fixed: 'left',width:50}
        ,{field:'id', minWidth:80, title: 'ID',align:'center'}
        ,{field:'processCname',minWidth:80,title:'工序名称（中）',align:'center'}
        ,{field:'processInfo', minWidth:140, title: '详细',align:'center',edit: 'text'}
        ,{field:'orderNum', minWidth:80, title: '排序',align:'center',edit: 'text'}
      ]]
      ,page: true,
      limit: 30
    });

    exports('epc_indicatorCardForm', {})
});