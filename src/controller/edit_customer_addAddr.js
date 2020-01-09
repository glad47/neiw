/**
 * 用户添加地址
 */
layui.define(['admin'], function (exports) {
    var $ = layui.jquery,
        form = layui.form,
        admin = layui.admin;
   var obj = {
       addAddr: (data) => {
           admin.popup({
               title: data.title + '地址'
               ,area: ['409px', '589px']
               ,id: 'popAddAddr'
               ,btn: [data.title, '取消']
               ,yes: function () {
                   $("#customer-add-addr-submit").click();
               }
               ,success: function (layero, index) {
                   view(this.id).render('/infoManagement/iframeWindow/customer_addAddr', data.data).done(function () {
                       form.render(null, 'customer-add-addr-form');
                       // 监听提交
                       form.on('submit(customer-add-addr-submit)', (data) => {
                           data.field.id = Date.parse(new Date()); // 唯一id，用于判断
                           var receiverAddersEntityList = [];
                           var _ls = localStorage.getItem("receiverAddersEntityList");
                           if (_ls) {
                               receiverAddersEntityList = JSON.parse(_ls)
                           }
                           receiverAddersEntityList.push(data.field);
                           localStorage.setItem("receiverAddersEntityList", JSON.stringify(receiverAddersEntityList));
                           $("select[name='ssdz']").append("<option value=" + data.field.id + ">" + "联系人：" + data.field.receiverName + "联系电话：" + data.field.receiverTelephone + "</option>");
                           layer.msg('添加成功！')
                           setTimeout(() => {
                               layer.close(index);
                           }, 800);
                           // 父级操作
                           form.render();
                       });
                   });
               }
           })
       }
   }
    exports('edit_customer_addAddr', obj)
})