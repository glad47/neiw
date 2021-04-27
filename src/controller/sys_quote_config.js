layui.define(['admin', 'table', 'util','form','upload'], function(exports){
    var $ = layui.$
    ,admin = layui.admin
    ,setter = layui.setter
    ,table = layui.table
    ,form = layui.form
    ,upload = layui.upload
    ,view = layui.view
    ,element = layui.element;
    
    form.render(null,'sys-quote-config-form-list');

    //监听参数类型切换
    form.on('select(e)',function(data){
      $.get(setter.imUrl+"quoteConfig/getAllParameter",{parameterTypeId:data.value},function(data){
          $("select[name='parameterName']").empty();
          $("select[name='parameterValue']").empty();
          $.each(data.data, function (i, d) {
              $("select[name='parameterName']").append(
                  "<option value='" + d.id + "'>" + d.parameterName + "</option>");
          });
          form.render(null,'sys-quote-config-form-list');
      });
    });
  
    //监听参数切换
    form.on('select(f)',function(data){
        $.get(setter.imUrl+"quoteConfig/getAllParameterValue",{parameterId:data.value},function(data){
            var _this = $("select[name='parameter']");
            _this.empty();
            $.each(data.data, function (i, d) {
                $("select[name='parameter']").append(
                    "<option value='" + d.id + "'>" + d.parameterValue + "</option>");
            });
            form.render(null,'sys-quote-config-form-list');
        });
    });
    
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
        ,editUrl: setter.imUrl+'quoteConfig/updateQuoteWeight' 
        ,url: setter.imUrl+'quoteConfig/getAllQuoteWeights'
        ,cols:[[
          {field:'thicknaesName', title:'', width: 100,align:'center'}
          ,{field: 'fr41', title: 'FR-4 1层', width: 120,align:'center',edit: 'text'}
          ,{field: 'fr42', title: 'FR-4 2层', width: 120,align:'center',edit: 'text'}
          ,{field: 'fr44', title: 'FR-4 4层', width: 120,align:'center',edit: 'text'}
          ,{field: 'fr46', title: 'FR-4 6层', width: 120,align:'center',edit: 'text'}
          ,{field: 'fr48', title: 'FR-4 8层', width: 120,align:'center',edit: 'text'}
          ,{field: 'al1', title: 'AL 1层', width: 100,align:'center',edit: 'text'}
          ,{field: 'al2', title: 'AL 2层', width: 100,align:'center',edit: 'text'}
          ,{field: 'fr4al', title: 'FR-4+AL', width: 100,align:'center',edit: 'text'}
          ,{field: 'fpc', title: 'FPC', width: 100,align:'center',edit: 'text'}
        ]]
      }
      ,jsb: {
        text: '金属板配置'
        ,id: 'LAY-info-qc-jsb-table'
        ,editUrl: setter.imUrl+'quoteConfig/updateQuoteMetal'
        ,url: setter.imUrl+ 'quoteConfig/getAllQuotePremiumMetal'
        ,cols:[[
          {field:'name', title:'加价项', width: 200,align:'center'}
          ,{field: 'metalPriceValue', title: '参考值', width: 150,align:'center',edit: 'text'}
          ,{field: 'unitName', title: '单位', width: 150,align:'center'}
        ]]
      }
      ,fjsb: {
        text: '非金属板配置'
        ,id: 'LAY-info-qc-fjsb-table'
        ,editUrl: setter.imUrl+'quoteConfig/updateQuoteNoMetal'
        ,url: setter.imUrl+'quoteConfig/getAllQuotePremiumNoMetal'
        ,cols: [[
          {field:'name', title:'加价项', width: 200,align:'center'}
         ,{field: 'noMetalPriceValue', title: '参考值', width: 150,align:'center',edit: 'text'}
         ,{field: 'unitName', title: '单位', width: 150,align:'center'}
         ]]
      }
      ,qt: {
        text: '其他配置'
        ,id: 'LAY-info-qc-qt-table'
        ,editUrl: setter.imUrl+'quoteConfig/updateQuoteOther'
        ,url: setter.imUrl+'quoteConfig/getAllQuotePremiumOther'
        ,cols: [[
          {field:'name', title:'加价项', width: 200,align:'center'}
         ,{field: 'otherPriceValue', title: '参考值', width: 150,align:'center',edit: 'text'}
         ,{field: 'unitName', title: '单位', width: 150,align:'center'}
         ]] 
      }
      ,jq: {
        text: '交期配置'
        ,id: 'LAY-info-qc-jq-table'
        ,editUrl: setter.imUrl+'quoteConfig/updateQuoteUrgentBuilds'
        ,url: setter.imUrl+'quoteConfig/allQuoteUrgentBuilds'
        ,cols: [[
          {field:'areaParameterName', title:'平米类型', width: 150,align:'center'}
         ,{field: 'areaMinParameter', title: '平米最小值', width: 150,align:'center',templet:'<div>{{d.areaMinParameter || "0"}}<div>'}
         ,{field: 'areaMaxParameter', title: '平米最大值', width: 150,align:'center'}
         ,{field: 'urgentType', title: '加急类型', width: 150,align:'center'}
         ,{field: 'layerNum', title: '层数', width: 150,align:'center'}
         ,{field: 'dayNumber', title: '天数', width: 150,align:'center'}
         ,{field: 'price', title: '费用', width: 150,align:'center',templet:'<div>{{d.price || "0"}}<div>',edit: 'text'}
         ]]
      }
      ,pmlx: {
        text: '平米类型配置'
        ,id: 'LAY-info-qc-pmlx-table'
        ,editUrl: setter.imUrl+'quoteConfig/updateQuoteArea'
        ,url: setter.imUrl+'quoteConfig/getAllAreaParameter'
        ,cols: [[
          {field: 'areaParameterName', title:'平米类型', width: 150,align:'center'}
         ,{field: 'areaMinParameter', title: '面积区间最小值', width: 150,align:'center',templet:'<div>{{d.areaMinParameter || "0"}}<div>',edit: 'text'}
         ,{field: 'areaMaxParameter', title: '面积区间最大值', width: 150,align:'center',templet:'<div>{{d.areaMaxParameter || "0"}}<div>',edit: 'text'}
         ]] 
      }
      ,hl: {
        text: '汇率配置'
        ,id: 'LAY-info-qc-hl-table'
        ,editUrl: setter.imUrl+'quoteConfig/updateQuoteExchangeRate'
        ,url: setter.imUrl+'quoteConfig/getAllExchangeRate'
        ,cols: [[
          {field: 'id', title:'id', width: 150,align:'center'}
         ,{field: 'currency', title: '币种', width: 150,align:'center'}
         ,{field: 'exchangeRate', title: '汇率', width: 150,align:'center',edit: 'text'}
         ]] 
      }
      ,yf: {
        text: '运费配置'
        ,id: 'LAY-info-qc-yf-table'
        ,editUrl: setter.imUrl+'quoteConfig/updateCourierQuoteExtra'
        ,url: setter.imUrl+'quoteConfig/allCourierQuoteExtra'
        ,cols: [[
          {field: 'id', title:'id', width: 150,align:'center'}
         ,{field: 'itemName', title: '额外项名', width: 150,align:'center'}
         ,{field: 'itemRate', title: '比例', width: 150,align:'center',edit: 'text'}
         ]] 
      }
      ,gw: {
        text: '钢网配置'
        ,id: 'LAY-info-qc-gw-table'
        ,editUrl: setter.imUrl+'quoteConfig/updateQuoteStencil'
        ,url: setter.imUrl+'quoteConfig/getAllQuoteStencil'
        ,cols: [[
          {field: 'id', title:'id', width: 150,align:'center'}
         ,{field: 'materialName', title: '物料名称', width: 150,align:'center'}
         ,{field: 'stencilSizex', title: '尺寸x', width: 150,align:'center'}
         ,{field: 'stencilSizey', title: '尺寸y', width: 150,align:'center'}
         ,{field: 'stencilAreax', title: '面积x', width: 150,align:'center'}
         ,{field: 'stencilAreay', title: '面积y', width: 150,align:'center'}
         ,{field: 'price', title: '价格', width: 150,align:'center',edit: 'text'}
         ,{field: 'weight', title: '重量', width: 150,align:'center',edit: 'text'}
         ]]
      }
      ,tp: {
        text: '贴片配置'
        ,id: 'LAY-info-qc-tp-table'
        ,editUrl: setter.imUrl+'quoteConfig/updateQuoteAssembly'
        ,url: setter.imUrl+'quoteConfig/getAllQuoteAssembly'
        ,cols: [[
          {field: 'id', title:'id', width: 150,align:'center'}
         ,{field: 'name', title: '分项', width: 150,align:'center'}
         ,{field: 'value', title: '价格/RMB', width: 150,align:'center',edit: 'text'}
         ]] 
      }
      ,fedex: {
        text: 'Fedex运费配置',
        id: 'LAY-info-qc-fedex-table',
        editUrl: setter.baseUrl+ 'sys/freight/updateFedexRate',
        url: setter.baseUrl+'sys/freight/fedexRateList',
        cols: [[
          {field: 'id', title:'id',align:'center'},
          {field: 'weight', title:'重量',width: 85,align:'center'},
          {field: 'partitionA', title:'A区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionB', title:'B区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionD', title:'D区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionE', title:'E区',width: 82,align:'center',edit: 'text'},
          {field: 'partitionF', title:'F区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionG', title:'G区',width: 82,align:'center',edit: 'text'},
          {field: 'partitionH', title:'H区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionK', title:'K区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionM', title:'M区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionN', title:'N区',width: 82,align:'center',edit: 'text'},
          {field: 'partitionO', title:'O区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionP', title:'P区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionQ', title:'Q区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionR', title:'R区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionS', title:'S区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionT', title:'T区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionU', title:'U区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionV', title:'V区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionX', title:'X区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionY', title:'Y区',width: 75,align:'center',edit: 'text'},
          {field: 'partitionZ', title:'Z区',width: 75,align:'center',edit: 'text'},
          {field: 'partition1', title:'1区',width: 82,align:'center',edit: 'text'},
          {field: 'partition2', title:'2区',width: 82,align:'center',edit: 'text'},
        ]]
      }
    };
    
    //标题内容模板
    var tplTitle = function(d){
      return '<a lay-href="app/message/detail/id='+ d.id +'">'+ d.title;
    };
    jgpz();

    //监听tabs切换
    element.on('tab(sys-quoteConfig-tabs)', function(data){
      if(data.index != 0){
        $("#sqcfl").addClass('layui-hide');
      }else{
        $("#sqcfl").removeClass('layui-hide');
      }
      if(data.index === 1){
        var t = tabs['zl'];
        commonTableLoad(t.id,t.url,t.cols);
        commonTableEdit(t.id,t.editUrl);
      }else if(data.index === 2){
        var t = tabs['jsb'];
        commonTableLoad(t.id,t.url,t.cols);
        commonTableEdit(t.id,t.editUrl);
      }else if(data.index === 3){
        var t = tabs['fjsb'];
        commonTableLoad(t.id,t.url,t.cols);
        commonTableEdit(t.id,t.editUrl);
      }else if(data.index === 4){
        //qtpz();
        var t = tabs['qt'];
        commonTableLoad(t.id,t.url,t.cols);
        commonTableEdit(t.id,t.editUrl);
      }else if(data.index === 5){
        //jqpz();
        var t = tabs['jq'];
        commonTableLoad(t.id,t.url,t.cols);
        commonTableEdit(t.id,t.editUrl);
      }else if(data.index === 6){
        // pmlxpz();
        var t = tabs['pmlx'];
        commonTableLoad(t.id,t.url,t.cols);
        commonTableEdit(t.id,t.editUrl);
      }else if(data.index === 7){
        // hlpz();
        var t = tabs['hl'];
        commonTableLoad(t.id,t.url,t.cols);
        commonTableEdit(t.id,t.editUrl);
      }else if(data.index === 8){
        // yfpz();
        var t = tabs['yf'];
        commonTableLoad(t.id,t.url,t.cols);
        commonTableEdit(t.id,t.editUrl);
      }else if(data.index === 9){
        // gwpz();
        var t = tabs['gw'];
        commonTableLoad(t.id,t.url,t.cols);
        commonTableEdit(t.id,t.editUrl);
      }else if(data.index === 10){
        // tppz();
        var t = tabs['tp'];
        commonTableLoad(t.id,t.url,t.cols);
        commonTableEdit(t.id,t.editUrl);
      }else if(data.index === 11){
        var t = tabs['fedex'];
        commonTableLoad(t.id,t.url,t.cols,1);

        commonTableEdit(t.id,t.editUrl);
      }
    });

    //价格配置
    function jgpz(){
        table.render({
            elem: '#LAY-info-qc-jg-table'
            ,url: setter.imUrl+'quoteConfig/getAllQuoteConfigs' //模拟接口
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
                                url:setter.imUrl+'quoteConfig/editQuoteConfig',
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
                    url:setter.imUrl+'quoteConfig/deleteQuoteConfig',
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
                            url:setter.imUrl+"quoteConfig/saveQuoteConfig",
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

    //excel导入上传
    upload.render({
      elem: '#excelFedexRates' //绑定元素
      ,url: setter.baseUrl+'sys/freight/importFedexRates' //上传接口
      ,exts: 'xlsx|xls'
      ,headers:{access_token: layui.data('layuiAdmin').access_token}
      ,done: function(res){
        //上传完毕回调
        layer.msg(res.msg);
      }
      ,error: function(){
        //请求异常回调
        layer.error('上传异常！！');
      }
    });

    function commonTableEdit(id,url){
      //监听单元格编辑
      table.on(`edit(${id})`, function(obj){
        var value = obj.value //得到修改后的值
        ,data = obj.data //得到所在行所有键值
        ,field = obj.field
        ,dataParams = {}; //得到字段

        dataParams[field] = value;
        dataParams['id'] = data.id; 
        // layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);
        admin.req({
          url: url,
          type:"POST",
          data:dataParams,
          success:function(data){
              if (data.code === 0) {
                  layer.msg('修改成功！！');
              }else{
                  layer.msg(data.msg);
              }
          },
        }); 
      });
    }

    function commonTableLoad(id,url,cols,mark){
      table.render({
        elem: `#${id}`
        ,url: url //模拟接口
        ,method: 'POST'
        ,parseData: function (res) {
            if(mark){
              return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
              }
            }else{
              return{
                  "code": 0,
                  "data": res.data,
                  "count": res.data.length
              }
            }
            
        }
        ,cols: cols
        ,page: false
        // ,skin: 'row'
      }); 
    }


    //编辑联动数据回显
    function echoLinkageData(ptid,pnid,pvid){
        console.log(ptid + " "+ pnid + " "+pvid);
        $.ajaxSettings.async = false;
        $.get(setter.imUrl+"quoteConfig/getAllParameter",{parameterTypeId:ptid},function(data){
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
        $.get(setter.imUrl+"quoteConfig/getAllParameterValue",{parameterId:pnid},function(data){
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