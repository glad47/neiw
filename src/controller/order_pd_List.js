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

    form.render(null,'market-order-pd-list-formlist');

    // 范围查询 对象
    var dateObj = {
        startOrderTime: null, // 开始时间
        endOrderTime: null,    // 结束时间
        orderField: null,    // 查询类型
        monthMark: null,     // 最近查询
        businessName: null  // 业务员
    }

    var popMonthlyStatisticalType = '销售额';
    var statisticalTime = 'currMonthMark';    // 统计时间
    var tabDate;
    laydate.render({
        elem: '#pdlStartOrderTime'
        ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function (value, date, endDate) {
            dateObj.startOrderTime = value;
            dateObj.monthMark = null;
            $("select[name='monthMark']").val('');
            form.render();
            if (dateObj.endOrderTime != null && dateCompare()) {
                // tabReloadOPL();
            }
        }
    });
    laydate.render({
        elem: '#pdlEndOrderTime'
        ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function (value, date, endDate) {
            dateObj.endOrderTime = value;
            dateObj.monthMark = null;
            $("select[name='monthMark']").val('');
            form.render();
            if (dateObj.startOrderTime != null && dateCompare()) {
                // tabReloadOPL();
            }
        }
    });

    function dateCompare () {
        if (dateObj.startOrderTime != null && dateObj.endOrderTime) {
            var sTime = dateObj.startOrderTime;
            var eTime = dateObj.endOrderTime;
            if (eTime < sTime) {
                layer.msg('结束时间不能小于开始时间, 请重新选择！！！');
                return false;
            } else {
                return true;
            }
        }
    }

    //监听搜索
    form.on('submit(LAY-app-order-pd-list-search)', function(data){
        var field = data.field;
        
        //执行重载
        table.reload('tab-order-pd-list', {
        where: field
        });
    });


    table.render({
        elem: '#tab-order-pd-list'
        ,url: setter.baseUrl+'/sys/pa/orderPaList'
        ,toolbar: "#tabOrderPdListTb"
        ,cellMinWidth: 80
        ,id: "tab-order-pd-list"
        ,page: false
        ,parseData: function (res) {
            return {
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,where: {
            orderField: 'pay_time',
            monthMark: 'currMonthMark',
            limit: 10000,
        }
        ,cols: [[
            {field: 'businessName',title: '业务员', width: 120, sort: true}      // 1 ＝ 待报价
            ,{field: 'orderTime',title: '下单日期', width: 120, sort: true, templet: '#oplOrderTime'}
            ,{field: 'productNo',title: '内部型号', width: 135, sort: true}
            ,{field: 'totalFee',title: '订单金额', width: 180, sort: true, templet: '#oplTotalFee'}
            ,{field: 'payLogId',title: '是否支付', width: 120, sort: true, templet: '#oplPayLogId'}
            ,{field: 'payTime',title: '支付日期', width: 120, sort: true, templet: '#oplPayTime'}
            ,{field: 'payLogId', title: '支付id', width: 120, sort: true}
            ,{field: 'isSourceCompany', title: '订单类型', width: 120, sort: true,templet: '#oplisSourceCompany'}
            ,{field: 'orderNumNo',title: '订单编号', width: 120, sort: true}
        ]]
        ,done: function (res, curr, count) {
            tabDate = res.data;
        }
    });

    table.on('toolbar(tab-order-pd-list)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var rowData = tabDate;
        // console.log(rowData);
       if (obj.event == 'MonthlyStatistical') {
           if (rowData.length < 1) {
               layer.msg('当前不存在数据，操作失败');
           } else {
               rowData.popMonthlyStatisticalType = getMSType();
               rowData.popMSTime = getMSTime();
               var gr =  rowData.filter(item => item.customerUserPaVO.isSourceCompany == 0);
               var gs = rowData.filter(item => item.customerUserPaVO.isSourceCompany == 1);
            //    console.log('gr',gr);
            //    console.log('gs',gs);
               rowData.gr = gr;
               rowData.gs = gs;
               admin.popup({
                   title: '月度统计表'
                   ,area: ['100%', '100%']
                   ,maxmin: true
                   ,id: 'popMonthlyStatistical'
                   ,btn: ['打印', '取消']
                   ,yes: function () {
                       var printId = 'monthlyStatistical';
                       document.body.innerHTML=document.getElementById(printId).innerHTML;
                       window.print();
                       window.location.reload();
                   }
                   ,success: function () {
                       var viewName = '/marketManagement/iframeWindow/monthly_statistical';
                       view(this.id).render(viewName, rowData).done(function () {
                           console.log(rowData)
                       });
                   }
               })
           }
       }
    });

    function getMSType () {     // Get orderField Type
        var typeText = $("select[name='orderField']").next('.layui-form-select').find('.layui-this').text();
        if (typeText == '销售日期') {
            popMonthlyStatisticalType = '销售额';
        } else if (typeText == '支付时间') {
            popMonthlyStatisticalType = '回款';
        }
        return popMonthlyStatisticalType;
    }

    // Listening to choose recent query
    $("select[lay-filter='order-pd-list-monthMark']").closest('.layui-input-inline').on('click', function () {
        $("input[name='startOrderTime']").val('');
        $("input[name='endOrderTime']").val('');
    });

    function getMSTime () {     // Get statistical Time
        var startOrderTime = $("input[name='startOrderTime']").val();
        var endOrderTime = $("input[name='endOrderTime']").val();
        var recentQuery = $("select[lay-filter='order-pd-list-monthMark']").next('.layui-form-select').find('.layui-this').text();
        if (startOrderTime.length != 0 && endOrderTime.length != 0 && recentQuery.length == 0) {
            return startOrderTime + '至' + endOrderTime
        } else if (recentQuery.length != 0) {
            return recentQuery;
        } else if (startOrderTime .length === 0 && endOrderTime .length === 0 && recentQuery .length === 0) {
            return '全部';
        }
    }
    exports('order_pd_List', {});
});