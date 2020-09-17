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

    form.render(null, 'article-help-formlist');

     //监听搜索
    form.on('submit(LAY-article-help-form-search)', function(data){
        var field = data.field;
    
        //执行重载
        table.reload('article_table_help', {
            where: field
        });
    })

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 文章博客管理
    table.render({
        elem: '#article_table_help'
        ,url: setter.baseUrl+'/article/help/list'
        ,toolbar: '#toolbar-add-help'
        ,cellMinWidth: 80
        ,id:"article_table_help"
        ,page: true
         ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,where: {
            at:1
        }
        ,cols: [[
            {field:'id', title: 'ID',hide: true}
            ,{field:'classifyOne', title: '一级分类', align:'center', width: 176, sort: true}
            ,{field:'classifyTwo', title: '二级分类', align:'center', sort: true}
            ,{field:'title', title: '主题', hide: false, align:'center', sort: true}
            // ,{field:'content', title: '内容', align:'center', sort: true}
            ,{field:'gmtCreate', title: '创建时间', align:'center', sort: true}
            ,{field:'gmtModified', title: '修改时间', align:'center', sort: true}
            ,{title: '操作', width: 120, align:'center', fixed: 'right', toolbar: '#Tabtb-article-help-management-option', sort: true}
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
    table.on('tool(article_table_help)',function(obj){
        var data = obj.data;
        console.log(data);
        if (obj.event === 'edit') {
            admin.popup({
                title: '修改Help',
                area: ['100%', '100%'],
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
                    view(this.id).render('articleManagement/help_edit_add_form',data).done(function () {
                        //清空form表单
                        form.render(null,'article-edit-add-form-list');
                        _t_layedit();
                        var edit = layedit.build('helpcontent',{
                            uploadImage:{
                                url:setter.imUrl+'file/fileupload'
                            }
                        });
                        // layedit.setContent(edit,data.articleContent);
                        //监听提交
                        form.on('submit(layuiadmin-app-form-submit)', function (data) {
                            var field = data.field;
                            console.log(field);
                            var c = layedit.getContent(edit);
                            field.content = c;
                            admin.req({
                                url: setter.baseUrl + 'article/help/update',
                                type: 'POST',
                                data: field,
                                success: function (data) {
                                    console.log(data);
                                    layui.table.reload('article_table_help'); //重载表格
                                    layer.close(index); //执行关闭
                                }
                            });
                            // var fn = field.articleName.trim().replace(/\s+/g,"_")+'_'+field.id+'.html';
                           
                        });
                    });
                }
            });
        } else if (obj.event === 'del') {
            layer.confirm('确定删除此博客？', function(index){
                admin.req({
                    url:setter.baseUrl+'article/help/delete',
                    type:'POST',
                    data:{ids:data.id},
                    success:function(data){
                        layui.table.reload('article_table_help'); //重载表格
                        layer.msg('已删除');
                    }
                });
            });
        }
    });


    table.on('toolbar(article_table_help)', function(obj) {
        switch (obj.event) {
            case 'add':
                clickTr = {};
                admin.popup({
                    title: '添加Help',
                    area: ['100%', '100%'],
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
                        view(this.id).render('articleManagement/help_edit_add_form').done(function () {
                            //清空form表单
                            form.render(null,'article-edit-add-form-list');
                            _t_layedit();
                            var i = layedit.build('helpcontent',{
                                uploadImage:{
                                    url:setter.imUrl+'file/fileupload'
                                }
                            });
                            //监听提交
                            form.on('submit(layuiadmin-app-form-submit)', function (data) {
                                var field = data.field;
                                //console.log(field);
                                var c = layedit.getContent(i);
                                //console.log(c);
                                field.content = c;
                                admin.req({
                                    url: setter.baseUrl + 'article/help/save',
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
                break;
        }
    });

    /**
     * 扩展富文本
     */
    function _t_layedit(){
        layedit.set({
            //暴露layupload参数设置接口 --详细查看layupload参数说明
            uploadImage: {
                url: 'your url',
                accept: 'image',
                acceptMime: 'image/*',
                exts: 'jpg|png|gif|bmp|jpeg',
                size: 1024 * 10,
                data: {
                    name: "测试参数",
                    age:99
                }
                ,done: function (data) {
                    console.log(data);
                }
            },
            uploadVideo: {
                url: 'your url',
                accept: 'video',
                acceptMime: 'video/*',
                exts: 'mp4|flv|avi|rm|rmvb',
                size: 1024 * 10 * 2,
                done: function (data) {
                    console.log(data);
                }
            }
            , uploadFiles: {
                url: 'your url',
                accept: 'file',
                acceptMime: 'file/*',
                size: '20480',
                autoInsert: true , //自动插入编辑器设置
                done: function (data) {
                    console.log(data);
                }
            }
            //右键删除图片/视频时的回调参数，post到后台删除服务器文件等操作，
            //传递参数：
            //图片： imgpath --图片路径
            //视频： filepath --视频路径 imgpath --封面路径
            //附件： filepath --附件路径
            , calldel: {
                url: 'your url',
                done: function (data) {
                    console.log(data);
                }
            }
            , rightBtn: {
                type: "layBtn",//default|layBtn|custom  浏览器默认/layedit右键面板/自定义菜单 default和layBtn无需配置customEvent
                customEvent: function (targetName, event) {
                    //根据tagName分类型设置
                    switch (targetName) {
                        case "img":
                            alert("this is img");
                            break;
                        default:
                            alert("hello world");
                            break;
                    };
                    //或者直接统一设定
                    //alert("all in one");
                }
            }
            //测试参数
            , backDelImg: true
            //开发者模式 --默认为false
            , devmode: true
            //是否自动同步到textarea
            , autoSync: true
            //内容改变监听事件
            , onchange: function (content) {
                console.log(content);
            }
            //插入代码设置 --hide:false 等同于不配置codeConfig
            , codeConfig: {
                hide: true,  //是否隐藏编码语言选择框
                default: 'javascript', //hide为true时的默认语言格式
                encode: true //是否转义
                ,class:'layui-code' //默认样式
            }
            //新增iframe外置样式和js
            , quote:{
                // style: ['Content/css.css'],
                //js: ['/Content/Layui-KnifeZ/lay/modules/jquery.js']
            }
            //自定义样式-暂只支持video添加
            //, customTheme: {
            //    video: {
            //        title: ['原版', 'custom_1', 'custom_2']
            //        , content: ['', 'theme1', 'theme2']
            //        , preview: ['', '/images/prive.jpg', '/images/prive2.jpg']
            //    }
            //}
            //插入自定义链接
            , customlink:{
                title: '插入layui官网'
                , href: 'https://www.layui.com'
                ,onmouseup:''
            }
            , facePath: 'http://knifez.gitee.io/kz.layedit/Content/Layui-KnifeZ/'
            , devmode: true
            , videoAttr: ' preload="none" '
            //预览样式设置，等同layer的offset和area规则，暂时只支持offset ,area两个参数
            //默认为 offset:['r'],area:['50%','100%']
            //, previewAttr: {
            //    offset: 'r'
            //    ,area:['50%','100%']
            //}
            , tool: [
                'html', 'undo', 'redo', 'code', 'strong', 'italic', 'underline', 'del', 'addhr', '|','removeformat', 'fontFomatt', 'fontfamily','fontSize', 'fontBackColor', 'colorpicker', 'face'
                , '|', 'left', 'center', 'right', '|', 'link', 'unlink', 'images', 'image_alt', 'video','attachment', 'anchors'
                , '|'
                , 'table','customlink'
                , 'fullScreen','preview'
            ]
            , height: '500px'
        });
    }


    // $('.test-table-operate-btn .layui-btn').on('click', function () {
    //         var type = $(this).data('type');
    //         active[type] ? active[type].call(this) : '';
    // });

    exports('article_help', {})
});