/**
 *
 @Name 发票列表
 */


layui.define(['table', 'form'], function(exports){
    var $ = layui.$
        ,admin = layui.admin
        ,view = layui.view
        ,table = layui.table
        ,setter = layui.setter
        ,form = layui.form;

    table.render({
        elem: '#invoiceList_Tabpcb'
        ,url: setter.baseUrl+'epc/orderinvoice/list'
        ,toolbar: "#invoiceList_TopBar"
        ,cellMinWidth: 80
        ,id: "invoiceList_Tabpcb"
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

    table.on('toolbar(invoiceList_Tabpcb)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        if (obj.event === 'generateInvoice') {
            checkStatus.data.type = '1';
            admin.popup({
                title: '添加发票'
                ,area: ['100%', '100%']
                ,btn: ['保存', '取消']
                ,id: 'popGenerateInvoice'
                ,yes: function (index, ) {
                    $(".gi-submit").click();
                }
                ,success: function () {
                    view(this.id).render('/marketManagement/iframeWindow/generate_invoice',checkStatus.data).done(function () {

                    })
                }
            })
        }
    });

    table.on('tool(invoiceList_Tabpcb)', function (obj) {
        var data = obj.data;
        if (obj.event === 'il-edit') {
            var getInvoiceData = getInvoice(data.id);
            getInvoiceData.type = '2';
            getInvoiceData.id = data.id;
            admin.popup({
                title: '查看发票'
                ,area: ['100%', '100%']
                ,btn: ['更新', '取消']
                ,id: 'popGenerateInvoiceUpdate'
                ,yes: function (index, ) {
                    $(".gi-submit").click();
                }
                ,success: function () {
                    view(this.id).render('/marketManagement/iframeWindow/generate_invoice',getInvoiceData).done(function () {

                    })
                }
            })

        } else if (obj.event === 'il-del') {
            layer.confirm('确定删除吗？', function(index) {
                admin.req({
                    type: 'post',
                    data: {ids: data.id},
                    url: setter.baseUrl + 'epc/orderinvoice/delete',
                    success: function () {
                        obj.del();
                        layer.msg('已删除');
                    }
                })
            });
        } else if (obj.event === 'il-search') {
            var popupData = {data:{}};
            var invoiceNo = data.invoiceNo;
            var businessName = data.businessName;
            popupData.data = getInvoice(data.id);
            admin.req({
                type: 'get',
                data: '',
                url: setter.baseUrl+"sys/consumer/user/info/"+obj.data.consumerId,
                success: function (data) {
                    popupData.userName = data.user.userName;
                    popupData.companyName = data.user.companName;
                    popupData.country = data.user.country;
                    popupData.invoiceNo = invoiceNo;
                    popupData.businessName = businessName;
                    popupData.city = data.user.city;
                    popupData.address = data.user.address;
                    popupData.mobilePhone = data.user.mobilePhone;
                    popupData.postcode = data.user.postcode;
                    popupData.paymentType = data.user.paymentType;
                    popupData.deliveryType = data.user.deliveryType;
                    popupData.contact = data.user.contact;
                    admin.popup({
                        title: '内部合同'
                        ,area: ['100%', '100%']
                        ,btn: ['打印','关闭']
                        ,maxmin: true
                        ,yes:function(index, layero){
                            var printId = "quoteContract_AllB";
                            document.body.innerHTML=document.getElementById(printId).innerHTML;
                            window.print();
                            window.location.reload();
                        }
                        // btn2: function(index, layero){}
                        ,success: function (layero, index) {
                            popupData.htmlType = 2;     //页面标识 1为内部合同 主要用于判断头部左侧标题
                            view(this.id).render("marketManagement/iframeWindow/quote_contractInvo", popupData).done(function () {
                                console.log(popupData);
                                // 实时时间设置   最新时间显示
                                var timeArray = [];     // 修改时间
                                var ctimeArray = [];    // 创建时间
                                var newEstTime;
                            });
                        }
                    });
                }
            });
        }
    });

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