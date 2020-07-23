/**

 @Name:    ［表格 头部 搜索栏方法封装］
 template:  <div class="layui-form" data-type="search-form" reload-table="需要刷新的表格id">     内嵌套一个提交按钮即可      </div>

 */
layui.define(['admin', 'index', 'form'],function (exports) {
    var $ = layui.jquery,
        form = layui.form;
        admin = layui.admin;

    var $form;
    var formSelectsArr = [];    // 监听 select 对象数组
    var formSubmitFilter;       // 表单搜索按钮 lay-filter
    var reloadTab;              // 当前要重载的表格
    var lock = false;
    $(document).on('click', function (e) {
        // formSelectsArr.splice(0, formSelectsArr.length);    // 清空数组
        $form = $(e.target).closest(".layui-form"); // 点击的Form
        var _d_type = $form.attr("data-type");
        if (_d_type == 'search-form') {
            reloadTab = $form.attr("reload-table");
            formSubmitFilter = $form.find(".layui-btn[lay-submit]").attr("lay-filter");
            obj.formOnSubmit();
        }
    });
    $(document).on('keypress',function(e){
        if(e.which == 13){
            reloadTab = $form.attr("reload-table"); 
            formSubmitFilter = $form.find(".layui-btn[lay-submit]").attr("lay-filter");
            //obj.formOnSubmit();
            $("button[lay-filter='"+ formSubmitFilter + "']").click();
        }
    });

    var obj = {
        formOnSelect: function (reTab) {     // 监听  select
            var $this = this;
            if (formSelectsArr.length > 0) {
                for (var i=0;i<formSelectsArr.length; i++) {    // 下拉监听
                    form.on('select('+ formSelectsArr[i] +')', function (data) {
                        $("button[lay-filter='"+ formSubmitFilter + "']").click();
                    });
                }
            }
        },
        formOnSubmit: function () {     // 监听 表单提交
          form.on('submit('+ formSubmitFilter +')', function (data) {
             var field = data.field;
            //   obj.tabReload(reloadTab, field);
              table.reload(reloadTab,{
                  where: field
              })
          });
        },
        initInputKeypress: function () {
          $form.find("input").keypress(function (e) {
              //console.log(e.which);
             if (e.which == 13) {
                 console.log("aaaa");
                //  $("button[lay-filter='"+ formSubmitFilter + "']").click();
             }
          });
        },
        tabReload: function (reTab, field) {
            table.reload(reTab, {
                where: field
            });
        },
    };
    exports('tableSearch', obj)
})
