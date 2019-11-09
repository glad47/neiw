/**

 @Name:    市场管理－－［绩效订单统计表］

 */


layui.define(['admin','table','index','element','form', 'laydate'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,laydate = layui.laydate
        // ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element;
    var $ = layui.jquery;

    // 范围查询 对象
    var dateObj = {
        startOrderTime: null, // 开始时间
        endOrderTime: null,    // 结束时间
        orderField: null,    // 查询类型
        monthMark: null,     // 最近查询
        businessName: null  // 业务员
    }

    //日期
    laydate.render({
        elem: '#pdlStartOrderTime',
        done: function (value, date, endDate) {
            dateObj.startOrderTime = value;
            dateObj.monthMark = null;
            $("select[name='monthMark']").val('');
            form.render();
            if (dateObj.endOrderTime != null && dateCompare()) {
                tabReloadOPL();
            }
        }
    });
    laydate.render({
        elem: '#pdlEndOrderTime',
        done: function (value, date, endDate) {
            dateObj.endOrderTime = value;
            dateObj.monthMark = null;
            $("select[name='monthMark']").val('');
            form.render();
            if (dateObj.startOrderTime != null && dateCompare()) {
                tabReloadOPL();
            }
        }
    });

    function dateCompare () {
        if (dateObj.startOrderTime != null && dateObj.endOrderTime) {
            var sTime = dateObj.startOrderTime;
            var eTime = dateObj.endOrderTime;
            console.log(12112)
            if (eTime < sTime) {
                layer.msg('结束时间不能小于开始时间, 请重新选择！！！');
                return false;
            } else {
                return true;
            }
        }
    }

    table.render({
        elem: '#tabOrderPdList'
        ,url: setter.baseUrl+'/sys/pa/orderPaList'
        ,toolbar: "#tabOrderPdListTb"
        ,cellMinWidth: 80
        ,id: "tabOrderPdList"
        ,page: true
        ,parseData: function (res) {
            return {
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {type:'checkbox',fixed: 'left'}
            ,{field: 'orderTime',title: '下单日期', width: 210, sort: true}
            ,{field: 'pcbName',title: '型号', width: 210, sort: true}
            ,{field: 'businessName',title: '业务员', width: 160, sort: true}      // 1 ＝ 待报价
            ,{field: 'customerUserPaVO',title: '客户名称', Width: 110, sort: true, templet: '<a>{{ d.customerUserPaVO.userName || 0 }}</a>',}
            ,{field: 'customerUserPaVO',title: '国家', minWidth: 219, sort: true, templet: '<a>{{ d.customerUserPaVO.cname || 0 }}</a>'}
            ,{field: 'customerUserPaVO',title: '网站', minWidth: 219, sort: true, templet: '<a>{{ d.customerUserPaVO.siteUrl || 0 }}</a>'}
            ,{field: 'customerUserPaVO',title: '客户邮箱', minWidth: 219, sort: true, templet: '<a>{{ d.customerUserPaVO.email || 0 }}</a>'}
            ,{field: 'payLogId',title: '是否支付', minWidth: 219, sort: true, templet: '#oplPayLogId'}
            ,{field: 'payTime',title: '支付日期', width: 210, sort: true}
            ,{field: 'totalFee',title: '订单金额', width: 180, sort: true}
            ,{field: 'commission',title: '提成', width: 150, sort: true, edit: 'text'}
            ,{field: 'customerUserPaVO',title: '渠道', minWidth: 219, sort: true, templet: '<a>{{ d.customerUserPaVO.channel || 0 }}</a>'}
            // ,{field: 'toolingFee',title: '支付', width: 110, sort: true}
            ,{field: 'unitPrice',title: '新客户', width: 110, sort: true}
            ,{field: 'orderNumNo',title: '订单编号', width: 110, hide: true, sort: true}
            // ,{fixed: 'right', title:'操作', toolbar: '#orderReviewB_pertSys_tabbar',width: 220, sort: true}
        ]]
        ,done: function (res, curr, count) {

        }
    });

    // 搜索
    //监听搜索
    form.on('submit(order-pd-list-search)', function(data){
        var field = data.field;
    });
    //监听select搜索
    form.on('select(order-pd-list-monthMark)', function (data) {
        dateObj.startOrderTime = dateObj.endOrderTime = null;
        $("input[name='startOrderTime']").val('');
        $("input[name='endOrderTime']").val('');
        form.render();
        dateObj.monthMark = data.value;
        tabReloadOPL();
    });
    // 类型
    form.on('select(order-pd-list-orderField)', function (data) {
        dateObj.orderField = data.value;
        tabReloadOPL();
    });
    // 业务员
    form.on('select(sel-order-pd-list-businessName)', function (data) {
        dateObj.businessName = data.value;
        tabReloadOPL();
    });

    function tabReloadOPL () {
        //执行重载
        var reTab = 'tabOrderPdList';
        table.reload(reTab, {
            where: dateObj
        });
    }

    exports('order_pd_List', {});
});