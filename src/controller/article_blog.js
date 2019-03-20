/**

 @Name： 文章管理－－［blog］

 */


layui.define(['admin', 'table', 'index','element','form','laydate','layedit'], function(exports){
    var table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element
        ,layedit = layui.layedit
        ,$ = layui.jquery;

    // layerdate.render({
    //     elem: '#gmtCreate'
    // })
    laydate.render({
        elem: '#gmtCreate'
    });

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 文章博客管理
    table.render({
        elem: '#article_Table_blog'
        ,url: setter.baseUrl+'/article/list'
        ,toolbar: true
        ,cellMinWidth: 80
        ,id:"article_Table_blog"
        ,page: true
         ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,where: {
            access_token: layui.data('layuiAdmin').access_token,
            at:1
        }
        ,cols: [[
            {field:'id', title: 'ID',hide: true}
            ,{field:'articleName', title: '文章名称', hide: false, align:'center',width: 110}
            ,{field:'articleTime', title: '发布时间', align:'center', width: 165}
            ,{field:'articleIp', title: '发布ip', align:'center', width: 165}
            ,{field:'articleClick', title: '查看人数', align:'center', width: 114}
            ,{field:'articleLike', title: '点赞数', align:'center', width: 114}
            ,{field:'articleComment', title: '评论数', align:'center', width: 114}
            ,{field:'articleClassify', title: '文章分类', align:'center', width: 134}
            ,{field:'articleType', title: '文章类型', align:'center', width: 114,templet:'#Tabtb-blog-type'}
            ,{field:'articleUserName', title: '文章发布用户', align:'center', width: 130}
            ,{field:'articleStatus', title: '文章状态', align:'center', width: 114 ,templet: '#Tabtb-article-management-status'}

            ,{title: '操作', width: 360, align:'center', fixed: 'right', toolbar: '#Tabtb-article-management-option'}
        ]]
        ,done : function (res, curr, count) {
            //手机端
            if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
                $("#LAY_app_body").each(function (e) {
                    $("a[lay-event='edit']").html("<i class=\"layui-icon layui-icon-edit\"></i>")
                    $("a[lay-event='search']").html("<i class=\"layui-icon layui-icon-search\"></i>")
                    $("a[lay-event='del']").html("<i class=\"layui-icon layui-icon-delete\"></i>")
                    $(".laytable-cell-1-0-22").css({"width":"130px"});
                })
            }
        }
    });

    //监听右侧工具条事件
    table.on('tool(article_Table_blog)',function(obj){
        var data = obj.data;
        console.log(data);
        if (obj.event === 'edit') {
            admin.popup({
                title: '修改Blog',
                area: ['750px', '750px'],
                btn: ['提交', '取消'],
                yes: function (index, layero) {
                    $('#layuiadmin-app-form-submit').click();
                },
                btn2: function (index, layero) {
                },
                end: function () {
                    clickTr = {};
                },
                id: 'LAY-popup-role-add',
                success: function (layero, index) {
                    view(this.id).render('articleManagement/blogformadd',data).done(function () {
                        //清空form表单
                        form.render(null,'layuiadmin-app-form-list');
                        var edit = layedit.build('blogcontent',{
                            uploadImage:{
                                url:setter.imUrl+'file/fileupload'
                            }
                        });
                        // layedit.setContent(edit,data.articleContent);
                        //监听提交
                        form.on('submit(layuiadmin-app-form-submit)', function (data) {
                            var field = data.field;
                            var c = layedit.getContent(edit);
                            field.articleContent = c;
                            if (field.articleKing == 'on') {
                                field.articleKing = 1;
                            } else {
                                field.articleKing = 0;
                            }
                            admin.req({
                                url: setter.baseUrl + 'article/update',
                                type: 'POST',
                                data: field,
                                success: function (data) {
                                    console.log(data);
                                    layui.table.reload('article_Table_blog'); //重载表格
                                    layer.close(index); //执行关闭
                                }
                            });
                        });
                    });
                }
            });
        } else if (obj.event === 'del') {
            layer.confirm('确定删除此博客？', function(index){
                admin.req({
                    url:setter.baseUrl+'article/delete',
                    type:'POST',
                    data:{ids:data.id},
                    success:function(data){
                        layui.table.reload('article_Table_blog'); //重载表格
                        layer.msg('已删除');
                    }
                });
            });
        }
    });

    var  active = {
        blog_add: function (othis) {
            clickTr = {};
            admin.popup({
                title: '添加Blog',
                area: ['750px', '750px'],
                btn: ['提交', '取消'],
                yes: function (index, layero) {
                    $('#layuiadmin-app-form-submit').click();
                },
                btn2: function (index, layero) {
                },
                end: function () {
                    clickTr = {};
                },
                id: 'LAY-popup-role-add',
                success: function (layero, index) {
                    view(this.id).render('articleManagement/blogformadd').done(function () {
                        //清空form表单
                        form.render(null,'layuiadmin-app-form-list');
                        var i = layedit.build('blogcontent',{
                            uploadImage:{
                                url:setter.imUrl+'file/fileupload'
                            }
                        });
                        //监听提交
                        form.on('submit(layuiadmin-app-form-submit)', function (data) {
                            var field = data.field;
                            console.log(field);
                            var c = layedit.getContent(i);
                            console.log(c);
                            field.articleContent = c;
                            admin.req({
                                url: setter.baseUrl + 'article/save',
                                type: 'POST',
                                //dataType:'json',
                                //contentType:'application/json',
                                data: field,
                                success: function (data) {
                                    console.log(data);
                                    layui.table.reload('article_Table_blog'); //重载表格
                                    layer.close(index); //执行关闭
                                }
                            })

                        });
                    });
                }
            });
        }
    }



    $('.test-table-operate-btn .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
    });

    exports('article_blog', {})
});