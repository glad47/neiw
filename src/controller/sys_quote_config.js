layui.define(['admin', 'table', 'util','form'], function(exports){
    var $ = layui.$
    ,admin = layui.admin
    ,setter = layui.setter
    ,table = layui.table
    ,form = layui.form
    ,view = layui.view
    ,element = layui.element;
    
    form.render(null,'sys-quote-config-form-list');
    
    form.on('submit(LAY-sys-quote-config-formlist-search)', function(data){
        var field = data.field;
        //执行重载
        table.reload('LAY-info-qc-jg-table', {
          where: field
        });
    });

    var DISABLED = 'layui-btn-disabled'
    
    //区分各选项卡中的表格
    ,tabs = {
      jg: {
        text: '价格配置'
        ,id: 'LAY-info-qc-jg-table'
      }
      ,zl: {
        text: '重量配置'
        ,id: 'LAY-info-qc-zl-table'
      }
      ,jsb: {
        text: '金属板配置'
        ,id: 'LAY-info-qc-jsb-table'
      }
      ,fjsb: {
        text: '非金属板配置'
        ,id: 'LAY-info-qc-fjsb-table'
      }
      ,qt: {
        text: '其他配置'
        ,id: 'LAY-info-qc-qt-table'
      }
      ,jq: {
        text: '交期配置'
        ,id: 'LAY-info-qc-jq-table'
      }
      ,pmlx: {
        text: '平米类型配置'
        ,id: 'LAY-info-qc-pmlx-table'
      }
      ,hl: {
        text: '汇率配置'
        ,id: 'LAY-info-qc-hl-table'
      }
      ,yf: {
        text: '运费配置'
        ,id: 'LAY-info-qc-yf-table'
      }
      ,gw: {
        text: '钢网配置'
        ,id: 'LAY-info-qc-gw-table'
      }
      ,tp: {
        text: '贴片配置'
        ,id: 'LAY-info-qc-tp-table'
      }

     
    };
    
    //标题内容模板
    var tplTitle = function(d){
      return '<a lay-href="app/message/detail/id='+ d.id +'">'+ d.title;
    };
    jgpz();
    //价格配置
    function jgpz(){
        table.render({
            elem: '#LAY-info-qc-jg-table'
            ,url: setter.imUrl+'getAllQuoteConfigs' //模拟接口
            ,method: 'POST'
            ,data: {'areaSq':0}
            // ,contentType: 'application/json'
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.data,
                    "count": res.data.length
                }
            }
            ,cols: [[
             {type:'numbers',title:'序号',width: 50}
            ,{field: 'id', title: 'id', width: 70}
            ,{field: 'areaParameterName', title: '平米', width: 120, }//templet: '<div>{{ layui.util.timeAgo(d.time) }}</div>'
            ,{field: 'pcbTypeName', title: '基材', width: 100, }
            ,{field: 'layerNum', title: '层数', width: 50, }
            ,{field: 'urgentType', title: '加急类型', width: 120, }
            ,{field: 'parameterTypeName', title: '参数类型', width: 120, }
            ,{field: 'parameterName', title: '参数名', width: 180, }
            ,{field: 'quoteCondition', title: '判断', width: 70, }
            ,{field: 'parameterValue', title: '参数值', width: 100, }
            ,{field: 'premiumType', title: '加价类别', width: 120, }
            ,{field: 'quote', title: '标准值', width: 100, }
            ,{title: '操作', width: 180, align:'center', toolbar: '#info-qc-jg-toolbar'}
            ]]
            // ,skin: 'row'
        });
    }

    //监听 工具条
    table.on('tool(LAY-info-qc-jg-table)',function(obj){
        var data = obj.data;
        console.log(data);
        if (obj.event === 'edit') {
            admin.popup({
                title:'编辑报价配置',
                area:['850px', '440px'],
                btn:['提交','取消'],
                yes:function(index, layero){
                    $("#sys-quoteConfig-form-submit").click();
                },
                success:function(layero,index){
                    view(this.id).render('/infoManagement/iframeWindow/sys_quoteConfig_form',data).done(function(){
                        form.render(null,'layuiadmin-sys-quoteconfig-form-list');
                         //回显下拉联动
                        echoLinkageData(data.parameterTypeId,data.parameterNameId,data.parameterValueId);
                        //监听提交
                        form.on('submit(layuiadmin-sys-quoteConfig-form-submit)',function(data){
                            var field = data.field;
                            admin.req({
                                url:setter.imUrl+'editQuoteConfig',
                                type:'POST',
                                data:field,
                                success:function(data){
                                    layui.table.reload('LAY-info-qc-jg-table'); //重载表格
                                    layer.close(index); //执行关闭 
                                }
                            });
                        });
                    });
                }
            });
        } else if (obj.event === 'del') {
            layer.confirm('确定删除此报价？', function(index){
                admin.req({
                    url:setter.imUrl+'deleteQuoteConfig',
                    type:'POST',
                    data:data.field,
                    success:function(res){
                        layui.table.reload('LAY-info-qc-jg-table'); //重载表格
                        layer.msg('已删除');
                    }
                });
            });
        }
    });

    //事件处理
    var events = {
      add: function(othis, type){
        var thisTabs = tabs[type]
        // ,checkStatus = table.checkStatus(thisTabs.id)
        // ,data = checkStatus.data; //获得选中的数据
        admin.popup({
            title: '添加报价配置'
            ,area: ['766px', '510px']
            ,btn:['提交','取消']
            ,yes: function(index, layero) {
                $('#sys-quoteConfig-form-submit').click();
            }
            ,success: function (layero,index) {
                view(this.id).render('/infoManagement/iframeWindow/sys_quoteConfig_form').done(function () {
                    // echoLinkageData(data.parameterTypeId,data.parameterNameId,data.parameterValueId);
                    form.render(null,'layuiadmin-sys-quoteconfig-form-list');
                      
                    //监听提交
                    form.on('submit(layuiadmin-sys-quoteConfig-form-submit)',function(data){
                        var field = data.field;
                        admin.req({
                            url:setter.imUrl+"saveQuoteConfig",
                            type:"POST",
                            data:field,
                            success:function(data){
                                if (data.code === 0) {
                                    layer.msg('添加成功！！');
                                    layui.table.reload(thisTabs.id); //重载表格
                                    layer.close(index); //执行关闭 
                                }else{
                                    layer.msg(data.msg);
                                }
                            },
                            async:false
                        });
                    });
                })
            }
        })
      }
    };

    //编辑联动数据回显
    function echoLinkageData(ptid,pnid,pvid){
        console.log(ptid + " "+ pnid + " "+pvid);
        $.ajaxSettings.async = false;
        $.get(setter.imUrl+"getAllParameter",{parameterTypeId:ptid},function(data){
            $("select[name='parameterName']").empty();
            $("select[name='parameter']").empty();
            $.each(data.data, function (i, d) {
                if (d.id === pnid) {
                     $("#pn").append("<option value='" + d.id + "' selected>" + d.parameterName + "</option>");
                }else{
                     $("#pn").append("<option value='" + d.id + "'>" + d.parameterName + "</option>");
                }
               
            });
            // form.render();
        });
        // $.ajaxSettings.async = true;
        // $.ajaxSettings.async = false;
        $.get(setter.imUrl+"getAllParameterValue",{parameterId:pnid},function(data){
            var _this = $("select[name='parameter']");
            _this.empty();
            $.each(data.data, function (i, d) {
                if (d.id === pvid) {
                    $("#pa").append("<option value='" + d.id + "' selected>" + d.parameterValue + "</option>");
                }else{
                    $("#pa").append("<option value='" + d.id + "'>" + d.parameterValue + "</option>");
                }
                
            });
            // form.render();
        });
        $.ajaxSettings.async = true;
        form.render();
    }
    
    $('.LAY-sys-quote-config-btns .layui-btn').on('click', function(){
      var othis = $(this)
      ,thisEvent = othis.data('events')
      ,type = othis.data('type');
      events[thisEvent] && events[thisEvent].call(this, othis, type);
    });

    exports('sys_quote_config', {})
  });