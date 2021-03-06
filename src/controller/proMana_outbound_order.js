/**

 @Name:    成品管理－－［订单出货］

 */


layui.define(['admin','table','index','element','form','laydate','requestInterface', 'tools_printLable','proMana_global'], function (exports) {
    table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        // ,laydate = layui.laydate
        ,setter = layui.setter
        ,requestInterface = layui.requestInterface
        ,tools_printLable = layui.tools_printLable
        ,proMana_global = layui.proMana_global
        ,element = layui.element;
    var $ = layui.jquery;

    form.render(null,'pm-outbound-order-formlist');

    tabRenderPCB();
    // 全局变量
    var _public_val = {
        orderType: 1        //订单类型 （1 pcb 2钢网 3 贴片）
    };

    // 监听 tab切换 判断订单的类型 1 pcb 2钢网 3 贴片
    element.on('tab(pm-outbound-order-tabs-brief)', function(data){
        console.log(data.index);
        if (data.index === 0){
            tabRenderPCB();
            _public_val.orderType = 1;       //pcb
        } else if (data.index === 1){
            tabRenderStencil();
            _public_val.orderType = 2;      //钢网
        } else if (data.index === 2){
            _public_val.orderType = 3;      //贴片
        }
    });

    
    form.on('submit(LAY-outbound-order-search)', function (data) {
        var field = data.field;
        var reTab, tabNum = _public_val.orderType;;
        if (tabNum === 1) {   // PCB
            reTab = 'iqcMana_outBound';
        } else if (tabNum === 2) {    //  Stencil
            reTab = 'iqcMana_outBoundS';
        } else if(tabNum === 3){
            // reTab = 'smt_orderTab_no_payment'; //assembly
        }
        table.reload(reTab,{
            where: field
        });
    })

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ PCB订单
    function tabRenderPCB() {
        table.render({
            elem: '#iqcMana_outBound'
            ,url: setter.baseUrl+'iqc/pcborder/outboundOrder/list'
            ,toolbar: "#ord_proMana_ootb"
            ,cellMinWidth: 80
            ,id: "iqcMana_outBound"
            ,page: true
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,where: {
                access_token: layui.data('layuiAdmin').access_token
            }
            ,cols: [[
                {type:'checkbox',fixed: 'left'}
                ,{field: 'productNo',title: '聚谷型号', minWidth: 141,fixed: 'left', sort: true}
                ,{field: 'status',title: '状态', width: 110, templet: '#proManaquo_status', sort: true}      // 1 ＝ 待报价
                ,{field: 'invoiceNo',title: '合同号', minWidth: 165, sort: true}
                ,{field: 'pcbName',title: '客户型号', width: 132, sort: true}
                ,{field: 'quantityPcs',title: '订单PCS数', sort: true}
                ,{field: 'finishPcsNumber',title: '已交PCS数', templet: '<div>{{ d.finishPcsNumber || 0 }}</div>', sort: true}
                ,{field: 'deliveryDate',title: '交期', templet: '#outboundDDatePCB', sort: true}
                ,{field: 'courierName',title: '快递公司', sort: true}
                ,{field: 'courierNumber',title: '快递单号', sort: true}
                
                ,{fixed: 'right', title:'操作', toolbar: '#proManaNgveiw_tabbar',width: 230}
            ]]
            ,done: function (res, curr, count) {
                $("a[data='isOk']").each(function (i, n) {
                    $(this).css({'color':'#00CC66','font-weight':'500'});;
                });
                $("a[data='notOutbound']").each(function (i,n) {
                    $(this).parents('tr').css('background-color','#d2d2d2');
                    $(this).parents('tr').find("input[type='checkbox']").prop("disabled",true);
                    $(this).parents('td').css({'border-right':'none !important','border-bottom':'none !important'});
                    if (i>0) {
                        $(this).parents('.layui-table-box').children('.layui-table-header').find("input[type='checkbox']").prop("disabled",true);
                    }
                });
                form.render();
            }
        });
    }
    table.on('toolbar(iqcMana_outBound)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        var postData = new Array();
        if (obj.event === 'submit') {     //通知出货
            // // var id = data.map(function(elem){return elem.id}).join("id:");
            // var id = data.map(function(elem){
            //     // return elem.id;
            //     postData[id] = elem.id
            // }).join(",");
            // var uuid = data.map(function(elem){
            //     // return elem.uuid;
            //     postData[uuid] = elem.uuid
            // }).join(",");
            if (checkStatus.data.length < 1) {
                layer.msg('请选择一条数据');
                return false;
            }
            for (var i=0;i<data.length;i++) {
                postData[i] = {'id':data[i].id,'uuid':data[i].uuid,'courierNumber':data[i].courierNumber,'courierName':data[i].courierName,'isInternal':data[i].isInternal,'onlineOid':data[i].onlineOid,'orderId':data[i].id, 'orderType': data[i].orderType};
            }
            var newData = new Object();
            newData.shipmentVoList = postData;
            layer.confirm('确定出货？', function () {
                $.ajax({
                    type: 'post',
                    headers: {access_token:layui.data('layuiAdmin').access_token},
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(newData),
                    url: setter.baseUrl+'iqc/pcborder/shipment',
                    success: function () {
                        layer.alert('出货成功!');
                        table.reload("iqcMana_outBound");
                        layer.closeAll();
                    }
                });
                $.ajax({
                    type: 'post',
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(data),
                    url: setter.imUrl+'v1/quote/sendShippingEmail',
                    success: function () {}
                })

            });
        } else if (obj.event === 'outerLable') {
            data.outerType = obj.event
            tools_printLable.PrintLable(data);
        } else if (obj.event === 'n-outerLable') {
            data.outerType = obj.event
            tools_printLable.PrintLable(data);
        } else if (obj.event === 'g-outerLable') {
            data.outerType = obj.event
            tools_printLable.PrintLable(data);
        }
        else if (obj.event === 'outerCode') {
            admin.popup({
                title: '出货扫码',
                id: 'popOuterCode',
                area: ['90%', '90%'],
                btn: ['保存', '取消'],
                btn1: function () {
                    $("#outerCodeSubmit").click();
                },
                success: function () {
                    view(this.id).render('productManagement/iframeWindow/outer_Code', {orderType: 1, reTab: 'iqcMana_outBound'}).done(function () {
                        form.render();
                    });
                }
            });
        }
    });
    //监听行工具事件＝＝＝＝》pcb订单
    table.on('tool(iqcMana_outBound)', function (obj) {
        var data = obj.data;
        // console.log(data);
        if (obj.event == 'packReq'){
            let url = setter.baseUrl+'epc/pcborder/info/'+data.id;
            let dd = requestInterface.getData(url);
            let userInfoUrl = setter.baseUrl+'sys/consumer/user/info/'+data.userId;
            let userInfo = requestInterface.GetCustomerInfo(userInfoUrl);
            // console.log(userInfo);
            
            dd.userInfo = userInfo;
            // console.log(dd);
            admin.popup({
                title: '聚谷出货检查表'
                ,id: 'LAY-proMana-checkTable'
                ,area: ['80%','90%']
                ,btn: ['打印', '返回']
                ,btn1: function () {
                    // layer.msg('打印');
                    // document.body.innerHTML=document.getElementById("packReqAll").innerHTML;
                    document.body.innerHTML=document.getElementById("product-packing-check-print").innerHTML;
                    window.print();
                    window.location.reload();
                }
                ,success: function (layero, index0) {
                    // view(this.id).render('productManagement/iframeWindow/packaging_requirements', customerInfo).done(function () {
                    //     form.render();
                    // })
                    view(this.id).render('productManagement/iframeWindow/packaging_check', dd).done(function () {
                        form.render();
                    });
                }
            })
            // console.log(customerInfo);
        } else if (obj.event == 'search') {
             // title: '订单id:［'+ data.id + '］-----------'+'订单时间：［'+data.gmtCreate+'］'
            // ,area: ['100%', '100%']
            // ,success: function (layero, index) {
            //     view(this.id).render('marketManagement/iframeWindow/order_pcb_detail', data).done(function () {

            //     })
            // }
            // console.log(data);
            admin.req({
                type: 'post',
                url: setter.baseUrl+'scm/ordersupplier/infoByOid/'+data.id,
                done: function (res) {
                    // console.log(res);
                    data.deliveryTime = res.data.deliveryTime;
                    data.supplierNo = res.data.supplierNo;
                    data.ljSupplier = res.data.ljSupplier;
                    data.tpSupplier = res.data.tpSupplier;
                    data.pcbaPartsCount = res.data.pcbaPartsCount;
                    data.pcbaPasterCount = res.data.pcbaPasterCount;
                    admin.popup({
                        title: "查看［"+data.productNo+"］信息"
                        ,shadeClose: true
                        ,shade: false
                        ,maxmin: true
                        ,area: ['598px', '375px']
                        // ,id: 'sys_menu'
                        ,success: function(layero, index){
                            view(this.id).render('/sqeManagement/iframeWindow/pcbinfo_search_sqe', data).done(function(){
                                //监听提交
                            });
                        }
                    })
                }
            });
           
        } else if (obj.event == 'chxx') {
            data.table = 'iqcMana_outBound';
            proMana_global.chxx(data);
        }
    });

    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ Stencil 钢网订单
    function tabRenderStencil() {
        table.render({
            elem: '#iqcMana_outBoundS'
            ,url: setter.baseUrl+'iqc/stencilorder/outboundOrder/list'
            ,toolbar: "#ord_proMana_ootb"
            ,cellMinWidth: 80
            ,id: "iqcMana_outBoundS"
            ,page: true
            ,parseData: function (res) {
                return{
                    "code": 0,
                    "data": res.page.list,
                    "count": res.page.totalCount
                }
            }
            ,where: {
                access_token: layui.data('layuiAdmin').access_token
            }
            ,cols: [[
                {type:'checkbox',fixed: 'left'}
                ,{field: 'productNo',title: '聚谷型号', minWidth: 141,fixed: 'left', sort: true}
                ,{field: 'status',title: '状态', width: 110, templet: '#proManaquo_status', sort: true}      // 1 ＝ 待报价
                ,{field: 'invoiceNo',title: '合同号', minWidth: 165, sort: true}
                ,{field: 'pcbName',title: '客户型号', width: 132, sort: true}
                ,{field: 'quantity',title: '订单PCS数', sort: true}
                ,{field: 'finishNumber',title: '已交PCS数', templet: '<div>{{ d.finishNumber || 0 }}</div>', sort: true}
                ,{field: 'deliveryDate',title: '交期', templet: '#outboundDDateStencil', sort: true}
                ,{field: 'courierName',title: '快递公司', sort: true}
                ,{field: 'courierNumber',title: '快递单号', sort: true}
                ,{fixed: 'right', title:'操作', toolbar: '#proManaNgveiw_tabbar',width: 200}
            ]]
            ,done: function (res, curr, count) {
                $("a[data='isOk']").each(function (i, n) {
                    $(this).css({'color':'#00CC66','font-weight':'500'});;
                });
                $("a[data='notOutbound']").each(function (i,n) {
                    $(this).parents('tr').css('background-color','#d2d2d2');
                    $(this).parents('tr').find("input[type='checkbox']").prop("disabled",true);
                    $(this).parents('td').css({'border-right':'none !important','border-bottom':'none !important'});
                    if (i>0) {
                        $(this).parents('.layui-table-box').children('.layui-table-header').find("input[type='checkbox']").prop("disabled",true);
                    }
                });
                form.render();
            }
        });
    }

    // 钢网工具头事件
    table.on('toolbar(iqcMana_outBoundS)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        var postData = new Array();
        if (obj.event == 'submit') {    // 钢网通知出货
            if (checkStatus.data.length < 1) {
                layer.msg('请选择一条数据');
                return false;
            }
            for (var i=0;i<data.length;i++) {
                postData[i] = {'id':data[i].id,'uuid':data[i].uuid,'courierNumber':data[i].courierNumber,'courierName':data[i].courierName,'isInternal':data[i].isInternal,'onlineOid':data[i].onlineOid,'orderId':data[i].id, 'orderType': data[i].orderType};
            }
            var newData = new Object();
            newData.shipmentVoList = postData;
            console.log(newData);
            console.log(postData);
            layer.confirm('确定出货？', function () {
                $.ajax({
                    type: 'post',
                    headers: {access_token:layui.data('layuiAdmin').access_token},
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(newData),
                    url: setter.baseUrl+'iqc/stencilorder/shipment',
                    success: function () {
                        layer.alert('出货成功!');
                        table.reload("iqcMana_outBoundS");
                        layer.closeAll();
                    }
                });
                $.ajax({
                    type: 'post',
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(data),
                    url: setter.imUrl+'v1/quote/sendShippingEmail',
                    success: function () {
                    }
                })
            });
        } else if (obj.event == 'outerLable') {
            data.table = 'iqcMana_outBound';
            data.outerType = obj.event
            tools_printLable.PrintLable(data);
        } else if (obj.event === 'n-outerLable') {
            data.outerType = obj.event
            tools_printLable.PrintLable(data);
        } else if (obj.event === 'g-outerLable') {
            data.outerType = obj.event
            tools_printLable.PrintLable(data);
        }
        else if (obj.event === 'outerCode') {
            admin.popup({
                title: '出货扫码',
                id: 'popOuterCode',
                area: ['90%', '90%'],
                btn: ['保存', '取消'],
                btn1: function () {
                    $("#outerCodeSubmit").click();
                },
                success: function () {
                    view(this.id).render('productManagement/iframeWindow/outer_Code', {orderType: 2, reTab: 'iqcMana_outBoundS'}).done(function () {
                        form.render();
                    });
                }
            });
        }
    });

    // 钢网行事件
    table.on('tool(iqcMana_outBoundS)', function (obj) {
       var data = obj.data;
       if (obj.event == 'search') {
           admin.popup({
               title: '订单号［'+data.productNo+']---'+'订单时间［'+data.gmtCreate+'］'
               ,area: ['45%', '70%']
               ,success: function (layero, index) {
                   view(this.id).render('marketManagement/iframeWindow/order_stencil_detail', data).done(function () {
                   })
               }

           })
       } else if (obj.event == 'chxx') {
           admin.req({
               type: 'post',
               url: setter.baseUrl + 'iqc/shippinginfo/infoSml/'+data.id,
               success: function (res) {
                   data.shippingInfo = res.shippingInfo;
                   admin.popup({
                       title: 'Stencil出货信息'
                       ,area: ['734px','468px']
                       ,btn: ['保存', '提交', '返回']
                       ,btn1: function (index, layero) {
                           layer.msg('保存');
                           $(".outbound-submit").attr("data","save");
                           $(".outbound-submit").click();
                           return false;
                       },
                       btn2: function () {
                           $(".outbound-submit").attr("data","submit");
                           $(".outbound-submit").click();
                           return false;
                       },
                       btn3: function () {
                           layer.msg('取消');
                       }
                       ,success: function (layero, index) {
                           view(this.id).render('productManagement/iframeWindow/outbound_info',data).done(function () {
                               //监听出货提交
                               form.on('submit(fomrOutboundInfo)', function (data) {
                                   var field = data.field;
                                   field.orderType = 2;
                                   console.log(field);
                                   admin.req({
                                       url: setter.baseUrl+"iqc/stencilorder/saveShippingInfo",
                                       type: 'POST',
                                       data: field,
                                       success: function (data) {
                                           if (data.code == 0) {
                                               layer.msg(data.msg);
                                           }else {
                                               layer.msg(data.msg,{icon: 5});
                                           }
                                           layui.table.reload('iqcMana_outBoundS'); //重载表格
                                           layer.close(index); //执行关闭
                                       }
                                   });
                                   return false;
                               });
                           });

                       }
                   });
               }
           });
       } else if (obj.event == 'packReq') {
           layer.msg('包装要求');
           var url = setter.baseUrl+'/sys/consumer/user/info/'+data.userId;
           var customerInfo = requestInterface.GetCustomerInfo(url);
           admin.popup({
               title: '钢网包装要求'
               ,id: 'packReq'
               ,area: ['734px','468px']
               ,btn: ['打印', '返回']
               ,btn1: function () {
                   layer.msg('打印');
                   document.body.innerHTML=document.getElementById("packReqAll").innerHTML;
                   window.print();
                   window.location.reload();
               }
               ,success: function (layero, index0) {
                   view(this.id).render('productManagement/iframeWindow/packaging _requirements', customerInfo).done(function () {

                   })
               }
           })
           console.log(customerInfo);
       }
    });


    exports('proMana_outbound_order', {});
});