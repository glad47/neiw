/**
 *
 @Name 发票列表
 */


layui.define(['table', 'form','r'], function(exports){
    var $ = layui.$
        ,admin = layui.admin
        ,view = layui.view
        ,table = layui.table
        ,setter = layui.setter
        ,form = layui.form
        ,r = layui.r;

    form.render(null, 'market-invoice-list-search-form');

    //监听搜索
    form.on('submit(market-invoice-list-search)', function(data){
        var field = data.field;
        //执行重载
        table.reload('LAY-market-invoice-list-table', {
            where: field
        });
    });

    table.render({
        elem: '#LAY-market-invoice-list-table'
        ,url: setter.baseUrl+'epc/orderinvoice/list'
        ,toolbar: "#invoiceList_TopBar"
        ,cellMinWidth: 80
        ,id: "LAY-market-invoice-list-table"
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field:'productNos',fixed: 'left', title: '聚谷型号', align:'center', minWidth: 154, sort: true}
            ,{field: 'invoiceNo', title: '发票号', minWidth: 150}
            ,{field: 'businessName', title: '跟单员'}
            ,{field: 'totalFee', title: '发票金额'}
            ,{field: 'gmtCreate', title: '创建时间', minWidth: 130}
            ,{field: 'businessId', title: '跟单员id', hide: true}
            ,{field: 'consumerId', title: '客户id', hide: true}
            ,{title: '操作', width: 190, align: 'center', fixed: 'right', toolbar: '#invoiceList_Bar'}
        ]]
    });

    table.on('toolbar(LAY-market-invoice-list-table)', function (obj) {
        if (obj.event === 'generateInvoice') {
            window.add();
        }
    });

    table.on('tool(LAY-market-invoice-list-table)', function (obj) {
        var data = obj.data;
        if (obj.event === 'il-edit') {
            window.edit(data);
        } else if (obj.event === 'il-del') {
            window.del(data);
        } else if (obj.event === 'il-search') {
            window.show(data);
            // var popupData = {data:{}};
            // var invoiceNo = data.invoiceNo;
            // var businessName = data.businessName;
            // popupData.data = getInvoice(data.id);
            // admin.req({
            //     type: 'get',
            //     data: '',
            //     url: setter.baseUrl+"sys/consumer/user/info/"+obj.data.consumerId,
            //     success: function (data) {
            //         popupData.userName = data.user.userName;
            //         popupData.companyName = data.user.companName;
            //         popupData.country = data.user.country;
            //         popupData.invoiceNo = invoiceNo;
            //         popupData.businessName = businessName;
            //         popupData.city = data.user.city;
            //         popupData.address = data.user.address;
            //         popupData.mobilePhone = data.user.mobilePhone;
            //         popupData.postcode = data.user.postcode;
            //         popupData.paymentType = data.user.paymentType;
            //         popupData.deliveryType = data.user.deliveryType;
            //         popupData.contact = data.user.contact;
            //         admin.popup({
            //             title: '发票合同'
            //             ,area: ['100%', '100%']
            //             ,btn: ['打印','关闭']
            //             ,maxmin: true
            //             ,yes:function(index, layero){
            //                 var printId = "quoteContract_AllB";
            //                 document.body.innerHTML=document.getElementById(printId).innerHTML;
            //                 window.print();
            //                 window.location.reload();
            //             }
            //             // btn2: function(index, layero){}
            //             ,success: function (layero, index) {
            //                 popupData.htmlType = 2;     //页面标识 1为内部合同 主要用于判断头部左侧标题
            //                 view(this.id).render("marketManagement/iframeWindow/quote_contractInvo", popupData).done(function () {
            //                     console.log(popupData);
            //                     // 实时时间设置   最新时间显示
            //                     var timeArray = [];     // 修改时间
            //                     var ctimeArray = [];    // 创建时间
            //                     var newEstTime;
            //                 });
            //             }
            //         });
            //     }
            // });
        }
    });

    
    window.show = function(obj){
        // console.log(obj);
        //订单项
        r.get('epc/custominvoice/queryCustomInvoiceById',{invoiceId: obj.id},false).then((res)=>{
            // console.log(res);
            obj.data = res;
            return r.get('sys/consumer/user/info/'+obj.consumerId)
        }).then((res)=>{
            // console.log(res);
            // obj.userInfo = res;
            obj.userName = res.userName;
            obj.companyName = res.companName;
            obj.country = res.country;
            // obj.invoiceNo = res.invoiceNo;
            // obj.businessName = businessName;
            obj.city = res.city;
            obj.address = res.address;
            obj.mobilePhone = res.mobilePhone;
            obj.postcode = res.postcode;
            obj.paymentType = res.paymentType;
            obj.deliveryType = res.deliveryType;
            obj.contact = res.contact;
            obj.fiscalCode = res.fiscalCode;
            return r.print(
                '发票合同',
                ['100%', '100%'],
                ['打印','关闭'],
                'marketManagement/iframeWindow/quote_contractInvo',
                obj,
                'quoteContract_AllB'
            )
        })
    }

    window.del = function(obj){
        layer.confirm('确定删除吗？', function(index) {
            r.get('epc/orderinvoice/delete',{ids:obj.id}).then(()=>{
                layer.msg('已删除'); 
                table.reload('LAY-market-invoice-list-table');
                layer.clone(index);
            })
        });
    }

    window.edit = function(obj){
        let layerIndex;
        r.get(
            'epc/custominvoice/queryCustomInvoiceById',
            {invoiceId:obj.id},
            false
        ).then((res)=>{
            // console.log(res);
            obj.customInvoiceList = res;
            return r.popup(
                '编辑发票',
                ['100%', '100%'],
                ['更新', '取消'],
                '/marketManagement/iframeWindow/market_invoicelList_add_edit_form',
                obj,
                'market-invoiceList-add-edit-submit',
                'LAY-market-custom-invoice-list-table',
                1 
            )
        }).then((d)=>{
            let sendData = d.formData.field;
            layerIndex = d.index;
            sendData.customInvoiceEntityList = d.tableData;
            sendData.productNos = d.tableData.map((i)=>i.productNo).join(",");
            return r.post('epc/orderinvoice/update',sendData) 
        }).then((res)=>{
            layer.msg('修改成功！！！');
            table.reload('LAY-market-invoice-list-table');
            layer.close(layerIndex); 
        })
    }

    window.add = function(){
        let layerIndex;
        r.popup(
            '添加发票',
            ['100%', '100%'],
            ['保存','取消'],
            '/marketManagement/iframeWindow/market_invoicelList_add_edit_form',
            null,
            'market-invoiceList-add-edit-submit',
            'LAY-market-custom-invoice-list-table',
            1
        ).then((d)=>{
            console.log(d);
            let sendData = d.formData.field;
            layerIndex = d.index;
            sendData.customInvoiceEntityList = d.tableData;
            sendData.productNos = d.tableData.map((i)=>i.productNo).join(",");
            console.log(sendData);
            //发送数据
            return r.post('epc/orderinvoice/addOrderInvoice',sendData);
        }).then((res)=>{
            //关闭窗口，刷新表格
            layer.msg('添加成功！！！');
            table.reload('LAY-market-invoice-list-table');
            layer.close(layerIndex);
        })
    }


    function getInvoice (invoiceId) {
        var _obj = new Object();
        admin.req({
            type: 'post',
            data: {invoiceId: invoiceId},
            async: false,
            url: setter.baseUrl + 'epc/custominvoice/queryCustomInvoiceById',
            success: function (res) {
                _obj = res.data;
            }
        });
        return _obj;
    }
    exports('market_invoiceList', {})
});