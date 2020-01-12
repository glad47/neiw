layui.define(['admin', 'table','setter','form','jquery'], function(exports){
    var $ = layui.jquery
    ,table = layui.table
    ,admin = layui.admin
    ,setter = layui.setter
    ,view = layui.view
    ,form = layui.form;

    form.render(null,'app-content-comment');

    table.render({
      elem: '#process_template_listTab'
      ,url: setter.baseUrl+'epc/processtemplate/list'
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
        ,{field:'processTemplateName',minWidth:80,title:'流程模板名称',align:'center'}
        ,{field:'processIds', minWidth:80, title: '流程ids',align:'center'}
        ,{width:200, align:'center',align:'center',fixed: 'right', toolbar: '#dept-table-operate-barDemo',title:'操作'}
      ]]
      ,page: true
    });

    //监听 工具条
    table.on('tool(process_template_listTab)',function(obj){
    	var data = obj.data;
    	console.log(data);
    	if (obj.event === 'edit') {
    		admin.popup({
    			title:'编辑工序流程',
    			area:['550px','550px'],
    			id:'LAY-popup-dept-edit',
    			btn:['提交','取消'],
    			yes:function(index, layero){
    				$("#layuiadmin-app-form-submit").click();
    			},
    			end:function(){},
    			success:function(layero,index){
    				view(this.id).render('infoManagement/process_templateform',data).done(function(){
    					//form.render(null,'layuiadmin-app-form-list');
				        //监听提交
				        form.on('submit(layuiadmin-app-form-submit)',function(data){
				        	var field = data.field;
                            var pids = "";

                            $("input[name='pids']:checked").each(function(){
                                pids += $(this).val()+",";
                            });

                            if (pids!="") {
                                pids = pids.substring(0,pids.length-1);
                                field.processIds = pids;
                            }
                            console.log(field);
				        	admin.req({
				        		url:setter.baseUrl+'epc/processtemplate/update',
				        		type:'POST',
				        		data:field,
				        		success:function(data){
				        			layui.table.reload('process_template_listTab'); //重载表格
               						layer.close(index); //执行关闭 
				        		}
				        	});
				        });
    				});
    			}
    		});
    	} else if (obj.event === 'del') {
    		layer.confirm('确定删除此模板？', function(index){
    			admin.req({
    				url:setter.baseUrl+'epc/processtemplate/delete',
    				type:'POST',
    				data:{ids:data.id},
    				success:function(data){
    					layui.table.reload('process_template_listTab'); //重载表格
    					layer.msg('已删除');
    				}
    			});
    		});
    	}
    });

    var $ = layui.$, active = {
    	dept_add: function(othis){
    		admin.popup({
    			title:'添加工序流程',
    			area: ['550px', '550px'],
    			btn: ['提交', '取消'],
    			yes: function(index, layero) {
					$('#layuiadmin-app-form-submit').click();
				},
				btn2: function(index, layero) {},
				end: function() {
					clickTr = {};
				},
    			id:'LAY-popup-dept-add',
    			success:function(layero,index){
    				view(this.id).render('infoManagement/process_templateform').done(function(){
    					//清空form表单
    					form.render(null,'layuiadmin-app-form-list');

    					//监听提交
    					form.on('submit(layuiadmin-app-form-submit)',function(data){
    						var field = data.field;
                            console.log(field);
                            var pids = "";

                            $("input[name='pids']:checked").each(function(){
                                pids += $(this).val()+",";
                            });

                            if (pids!="") {
                                pids = pids.substring(0,pids.length-1);
                                field.processIds = pids;
                            }
                            console.log(field);
    						admin.req({
    							url: setter.baseUrl+'epc/processtemplate/save',
    							type:'POST',
    							//dataType:'json',
    							//contentType:'application/json',
    							data: field,
    							success:function(data){
    								console.log(data);
    								layui.table.reload('process_template_listTab'); //重载表格
               						layer.close(index); //执行关闭 
    							}
    						});

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

    exports('sys_process_template', {})
});