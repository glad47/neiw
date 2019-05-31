/**

 @Name：表格右侧工具栏过多，收缩再打开点击不了
 @Author：Parker
 @License: LPPL

 */

layui.define('form', function(exports) {
    var $ = layui.$
    $(document).off('mousedown', '.layui-table-grid-down')
        .on('mousedown', 'layui-table-grid-down', function (event) {
            layer.msg('点击')
            table._tableTrCurr = $(this).closest('td');
        });

    $(document).off('click', '.layui-table-tips-main [lay-event]')
        .on('click', '.layui-table-tips-main [lay-event]', function (event) {
            var elem = $(this);
            var tableTrCurr = table._tableTrCurr;
            console.log(111)
            if (!tableTrCurr) {
                return;
            }
            var layerIndex = elem.closest('.layui-table-tips').attr('times');
            layer.close(layerIndex);
            table._tableTrCurr.find('[lay-event="' + elem.attr('lay-event') + '"]').first().click();
        })
    //对外暴露的接口
    exports('bug-tabRigTools', {});
});