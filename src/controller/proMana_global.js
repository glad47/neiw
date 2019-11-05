/**
 * 成品管理-- 通用 JS类
 * 打印标签
 */
layui.define(['admin'], function (exports) {
    var $ = layui.jquery
        ,setter = layui.setter
        ,admin = layui.admin;
    var obj = {
        /**
         * 出货信息
         * @param data
         * @returns {boolean}
         */
        chxx: function (data) {
            var _reloadTab = data.table;
            admin.req({
                type: 'post',
                url: setter.baseUrl + 'iqc/shippinginfo/info/'+data.id,
                success: function (res) {
                    data.shippingInfo = res.shippingInfo;
                    admin.popup({
                        title: '出货信息'
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
                                    field.orderType = 1;
                                    console.log(field);
                                    admin.req({
                                        url: setter.baseUrl+"iqc/pcborder/saveShippingInfo",
                                        type: 'POST',
                                        data: field,
                                        success: function (data) {
                                            if (data.code == 0) {
                                                layer.msg(data.msg);
                                            }else {
                                                layer.msg(data.msg,{icon: 5});
                                            }
                                            layui.table.reload(_reloadTab); //重载表格
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
            if (data.finishPcsNumber !== data.quantityPcs) {
                layer.msg('PCS数未全部交清，操作失败！');
            } else {
                layer.msg('PCS数全交期，操作成功！');
            }
        }
    }
    exports('proMana_global', obj)
});