layui.define(['admin', 'table','setter','form','jquery'], function(exports){
    var $ = layui.jquery
    ,table = layui.table
    ,admin = layui.admin
    ,setter = layui.setter
    ,view = layui.view
    ,form = layui.form;

    form.render(null,'app-content-comment');

    table.render({
      elem: '#dept_listTab'
      ,url: setter.baseUrl+'sys/dept/list'
      ,cols: [[
        {type:'checkbox', fixed: 'left',width:50}
        ,{field:'deptId', minWidth:80, title: 'ID',align:'center'}
        ,{field:'deptName', minWidth:80, title: '部门名称',align:'center'}
        ,{width:200, align:'center',align:'center',fixed: 'right', toolbar: '#dept-table-operate-barDemo',title:'操作'}
      ]]
      ,page: true
    });

    //监听 工具条
    table.on('tool(dept_listTab)',function(obj){
    	var data = obj.data;
    	console.log(data);
    	if (obj.event === 'edit') {
    		admin.popup({
    			title:'编辑部门',
    			area:['550px','550px'],
    			id:'LAY-popup-dept-edit',
    			btn:['提交','取消'],
    			yes:function(index, layero){
    				$("#layuiadmin-app-form-submit").click();
    			},
    			end:function(){},
    			success:function(layero,index){
    				view(this.id).render('infoManagement/deptform',data).done(function(){
    					//form.render(null,'layuiadmin-app-form-list');
				        //监听提交
				        form.on('submit(layuiadmin-app-form-submit)',function(data){
				        	var field = data.field;
				        	admin.req({
				        		url:setter.baseUrl+'sys/dept/update',
				        		type:'POST',
				        		data:field,
				        		success:function(data){
				        			layui.table.reload('dept_listTab'); //重载表格
               						layer.close(index); //执行关闭 
				        		}
				        	});
				        });
    				});
    			}
    		});
    	} else if (obj.event === 'del') {
    		layer.confirm('确定删除此部门？', function(index){
    			admin.req({
    				url:setter.baseUrl+'sys/dept/delete',
    				type:'POST',
    				data:{deptIds:data.deptId},
    				success:function(data){
    					layui.table.reload('dept_listTab'); //重载表格
    					layer.msg('已删除');
    				}
    			});
    		});
    	}
    });

    var $ = layui.$, active = {
    	dept_add: function(othis){
    		admin.popup({
    			title:'添加部门',
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
    				view(this.id).render('infoManagement/deptform').done(function(){
    					//清空form表单
    					form.render(null,'layuiadmin-app-form-list');

    					//监听提交
    					form.on('submit(layuiadmin-app-form-submit)',function(data){
    						var field = data.field;
    						admin.req({
    							url: setter.baseUrl+'sys/dept/save',
    							type:'POST',
    							//dataType:'json',
    							//contentType:'application/json',
    							data: field,
    							success:function(data){
    								console.log(data);
    								layui.table.reload('dept_listTab'); //重载表格
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

    exports('sys_dept', {})
});