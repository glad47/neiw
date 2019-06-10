layui.define(['admin', 'table','setter','form','jquery'], function(exports){
    var $ = layui.jquery
    ,table = layui.table
    ,admin = layui.admin
    ,setter = layui.setter
    ,view = layui.view
    ,form = layui.form;

    // form.render(null,'app-content-comment');
   //  //监听搜索
  	form.on('submit(plrTargerSet-search)', function(data){
    	var field = data.field;
    	console.log(field);
    	//执行重载
    	table.reload('pplr_targetListTab', {
      		where: field
    	});
  	});
    $(".pplrTargetSet-form-search input").bind("input propertychange", function (even) {
        $("*[lay-filter='plrTargerSet-search']").click();
    });
    form.on('select(pplrTargetSet-dateType-sel)', function(data){
        $("*[lay-filter='plrTargerSet-search']").click();
    });
    form.on('select(pplrTargetSet-type-sel)', function(data){
        $("*[lay-filter='plrTargerSet-search']").click();
    });

    table.render({
      elem: '#pplr_targetListTab'
      ,url: setter.baseUrl+'pplr/businesstarget/list'
      ,cols: [[
         {field:'id', minWidth:80, title: 'ID',align:'center'}
        ,{field:'businessName', minWidth:80, title: '跟单员',align:'center'}
        ,{field:'name', minWidth:80, title: '目标名称',align:'center'}
         ,{field:'dateType', minWidth:80, title: '时间类型',align:'center',templet:'#target_dataType_temple'}
          ,{field:'type', minWidth:80, title: '目标类型',align:'center',templet:'#target_type_temple'} 
          ,{field:'value', minWidth:80, title: '目标指标',align:'center'}
        ,{width:200, align:'center',align:'center',fixed: 'right', toolbar: '#target-table-operate-barDemo',title:'操作'}
      ]]
      ,page: true
      ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
    });

    //监听 工具条
    table.on('tool(pplr_targetListTab)',function(obj){
    	var data = obj.data;
    	console.log(data);
    	if (obj.event === 'target_edit') {
    		admin.popup({
    			title:'编辑目标',
    			area:['550px','550px'],
    			id:'LAY-pplr-target-edit',
    			btn:['提交','取消'],
    			yes:function(index, layero){
    				$("#layuiadmin-app-form-submit").click();
    			},
    			end:function(){},
    			success:function(layero,index){
    				view(this.id).render('infoManagement/pplr_targetSet_form',data).done(function(){
    					//form.render(null,'layuiadmin-app-form-list');
                        var bname;
                        form.on('select(rsf_business)',function(data){
                            bname = $(data.elem).find("option:selected").attr("data-name");
                        });
				        //监听提交
				        form.on('submit(layuiadmin-app-form-submit)',function(data){
				        	var field = data.field;
                            field.businessName = bname;
				        	admin.req({
				        		url:setter.baseUrl+'pplr/businesstarget/update',
				        		type:'POST',
				        		data:field,
				        		success:function(data){
				        			layui.table.reload('pplr_targetListTab'); //重载表格
               						layer.close(index); //执行关闭 
				        		}
				        	});
				        });
    				});
    			}
    		});
    	} else if (obj.event === 'target_del') {
    		layer.confirm('确定删除此目标？', function(index){
    			admin.req({
    				url:setter.baseUrl+'pplr/businesstarget/delete',
    				type:'POST',
    				data:{ids:data.id},
    				success:function(data){
    					layui.table.reload('pplr_targetListTab'); //重载表格
    					layer.msg('已删除');
    				}
    			});
    		});
    	}
    });

    var $ = layui.$, active = {
    	target_add: function(othis){
    		admin.popup({
    			title:'添加目标',
    			area: ['550px', '550px'],
    			btn: ['提交', '取消'],
    			yes: function(index, layero) {
					$('#layuiadmin-app-form-submit').click();
				},
				btn2: function(index, layero) {},
				end: function() {
					clickTr = {};
				},
    			id:'LAY-pplr-target-add',
    			success:function(layero,index){
    				view(this.id).render('infoManagement/pplr_targetSet_form').done(function(){
    					//清空form表单
    					form.render(null,'layuiadmin-app-form-list');
                        //监听select
                        var bname;
                        form.on('select(rsf_business)',function(data){
                            bname = $(data.elem).find("option:selected").attr("data-name");
                        });
    					//监听提交
    					form.on('submit(layuiadmin-app-form-submit)',function(data){
    						var field = data.field;
                            field.businessName = bname;
    						admin.req({
    							url: setter.baseUrl+'pplr/businesstarget/save',
    							type:'post',
    							data: field,
    							success:function(data){
    								console.log(data);
    								layui.table.reload('pplr_targetListTab'); //重载表格
               						layer.close(index); //执行关闭 
    							}
    						})

    					});
    				});
    			}
    		});
    	}
    };

    $('.test-table-operate-btn .layui-btn').on('click', function(){
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });

    exports('pplr_target', {})
});