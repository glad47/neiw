
layui.define(['admin', 'table','setter','form','authtree','jquery'], function(exports){
    var $ = layui.jquery
    ,table = layui.table
    ,admin = layui.admin
    ,setter = layui.setter
    ,view = layui.view
    ,form = layui.form
    ,authtree = layui.authtree;

    form.render(null,'app-content-comment')
    //监听搜索
  	form.on('submit(LAY-app-contlist-search)', function(data){
    	var field = data.field;
    	console.log(field);
    	//执行重载
    	table.reload('role_listTab', {
      		where: field
    	});
  	});
  
    table.render({
      elem: '#role_listTab'
      ,url: setter.baseUrl+'sys/role/list'
      ,where: {
    		access_token: layui.data('layuiAdmin').access_token
  	    }
      //,width: admin.screen() > 1 ? 1500 : ''
      ,cols: [[
         {field:'roleId', minWidth:20, title: 'ID',align:'center'}
        ,{field:'roleName', minWidth:80, title: '角色名称',align:'center'}
        ,{field:'remark', minWidth:100, title: '备注',align:'center'}
        ,{field:'createTime', minWidth:100, title: '创建时间',align:'center'}
        ,{width:190, align:'center',align:'center',fixed: 'right', toolbar: '#role-table-operate-barDemo',title:'操作'}
      ]]
      ,page: true
    });
    
    //监听 工具条
    table.on('tool(role_listTab)',function(obj){
    	var data = obj.data;
    	console.log(data.roleId);
    	if (obj.event === 'edit') {
    		admin.popup({
    			title:'编辑角色',
    			area:['550px','550px'],
    			id:'LAY-popup-role-edit',
    			btn:['提交','取消'],
    			yes:function(index, layero){
    				$("#layuiadmin-app-form-submit").click();
    			},
    			end:function(){},
    			success:function(layero,index){
    				view(this.id).render('infoManagement/roleformedit',data).done(function(){
    					//form.render(null,'layuiadmin-app-form-list');

    					//选中角色对应的菜单数据
    					console.log($("#rid").val());
				        admin.req({
				          url:setter.baseUrl+'sys/role/info/'+$("#rid").val(),
				          dataType:'json',
				          success:function(data){
				            // console.log(data.role.menuIdList);
				            //设置选定权限
				            authtree.setValue('#LAY-auth-tree-index',data.role.menuIdList);
				          }
				        });

				        //监听提交
				        form.on('submit(layuiadmin-app-form-submit)',function(data){
				        	var field = data.field;
				        	admin.req({
				        		url:setter.baseUrl+'/sys/role/update',
				        		type:'POST',
				        		data:field,
				        		success:function(data){
				        			layui.table.reload('role_listTab'); //重载表格
               						layer.close(index); //执行关闭 
				        		}
				        	});
				        });
    				});
    			}
    		});
    	} else if (obj.event === 'del') {
    		layer.confirm('确定删除此角色？', function(index){
    			admin.req({
    				url:setter.baseUrl+'sys/role/delete',
    				type:'POST',
    				data:{roleIds:data.roleId},
    				success:function(data){
    					layui.table.reload('role_listTab'); //重载表格
    					layer.msg('已删除');
    				}
    			});
    		});
    	}
    });

    var $ = layui.$, active = {
    	role_add: function(othis){
    		clickTr = {};
    		admin.popup({
    			title:'添加角色',
    			area: ['550px', '550px'],
    			btn: ['提交', '取消'],
    			yes: function(index, layero) {
					$('#layuiadmin-app-form-submit').click();
				},
				btn2: function(index, layero) {},
				end: function() {
					clickTr = {};
				},
    			id:'LAY-popup-role-add',
    			success:function(layero,index){
    				view(this.id).render('infoManagement/roleformadd').done(function(){
    					//清空form表单
    					//form.render(null,;'layuiadmin-app-form-list');

    					//监听提交
    					form.on('submit(layuiadmin-app-form-submit)',function(data){
    						var field = data.field;
                            //console.log(field);
                            //var leaf = authtree.getLeaf("#LAY-auth-tree-index");
                            //console.log(leaf);
                            //console.log(JSON.stringify(leaf));
                            //console.log(menuIdList);
    						admin.req({
    							url: setter.baseUrl+'sys/role/save',
    							type:'POST',
    							//dataType:'json',
    							//contentType:'application/json',
    							data: field,
    							success:function(data){
    								console.log(data);
    								layui.table.reload('role_listTab'); //重载表格
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
    
    exports('sys_role', {})
});