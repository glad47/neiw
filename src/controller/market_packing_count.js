
layui.define(['admin', 'table', 'index','element','form','laydate'], function(exports){
    var table = layui.table
        ,view = layui.view
        ,admin = layui.admin
        ,form = layui.form
        ,laydate = layui.laydate
        ,setter = layui.setter
        ,element = layui.element
        ,$ = layui.jquery;

    form.render(null,'market-packing-form');

    form.verify({
        myrequired: function(value,item){
            let optionMark = $(" input[ name='optionMark' ] ").val();
            //console.log(value);
            //console.log(optionMark);
            if(optionMark !== 'countArea'){
                if(!value){
                    return '必填不能为空！！';
                }
            }
        }
    })

    //监听计算面积
    $(".onblur-mark").bind('blur',function(){
        form.val("market-packing-form",{optionMark:"countArea"});
        $("#mpcs").click();
    });
    

    form.on('submit(market-packing-count-sumbit)',function(data){
        var field = data.field;
        // console.log(field);
        //计算面积
        if(field.optionMark === 'countArea'){
            let area = (parseFloat(field.qty / (field.panelX * field.panelY) * field.finishedSizeX * field.finishedSizeY)/1000000).toFixed(2);
            form.val("market-packing-form",{area:area});
            form.val("market-packing-form",{optionMark:"countResult"});
            return false;
        }

        //校验
        let checkStatus = table.checkStatus('market-packing-size-tab')
                ,checkData = checkStatus.data; //得到选中的数据 
        if(checkData.length === 0){
            return layer.msg('请至少选择一个箱子规格!!');
        }

        //计算装箱结果
        // let r = countResult(checkData,field);
        //装配
        // table.init('market-count-result-tab',{data:r})
        field.packingSpecificationEntityList = checkData;
        console.log(field);
        countR(field);
    });

    function countR(d){
        //加载结果
        table.reload('market-count-result-tab',{
            where: {...d, packingSpecificationEntityList: d.packingSpecificationEntityList},
            method: 'POST',
            contentType: 'application/json'
        });
    }

    function countResult(d, f){
        // console.log(d);
        // console.log(f);
        //计算高
        let tempHige = parseInt(f.finishThickness * f.packset);
        //计算可以放的包数
        let r = [];

        d.forEach(element => {
            console.log(element);  
            let rlist = {};
            //包数            
            let tempHigePack = parseInt((parseFloat(element.highPacking) * 10) / (parseFloat(tempHige)));
            rlist.higePack = tempHigePack;

            let tempWidePack1 = parseInt((parseFloat(element.widePacking) * 10 - 30) / (parseFloat(f.finishedSizeY)));
            let tempLongPack1 = parseInt((parseFloat(element.longPacking) * 10 - 30) / (parseFloat(f.finishedSizeX)));
            
            let tempWidePack2 = parseInt((parseFloat(element.widePacking) * 10 - 30) / (parseFloat(f.finishedSizeX)));
            let tempLongPack2 = parseInt((parseFloat(element.longPacking) * 10 - 30) / (parseFloat(f.finishedSizeY)));
            console.log('方案1 宽可放包数->'+tempWidePack1);
            console.log('方案1 长可放包数->'+tempLongPack1);

            
            console.log('方案2 宽可放包数->'+tempWidePack2);
            console.log('方案2 长可放包数->'+tempLongPack2);

            if((tempWidePack1 + tempLongPack1) >= (tempWidePack2 + tempLongPack2)){
                rlist.widePack = tempWidePack1;
                rlist.longPack = tempLongPack1;
            }else{
                rlist.winePack = tempWidePack2;
                rlist.longPack = tempLongPack2;
            }

            let sqm = parseInt(parseFloat(element.longPacking) * parseFloat(element.widePacking) * parseFloat(element.higePacking)/10000);
            rlist.packX = element.longPacking;
            rlist.packY = element.widePacking;
            rlist.packH = element.highPacking;
            rlist.sqm = sqm;


            r.push(rlist);
        });
        console.log(r);
        return r;
    }

    //箱子尺寸table
    table.render({
        elem: '#market-packing-size-tab'
        ,url: setter.baseUrl+'marker/packing/specificationList'
        // ,cellMinWidth: 80
        ,toolbar:''
        ,id:"market-packing-size-tab"
        ,page: true
        ,parseData: function (res) {
            return{
                "code": 0,
                "data": res.page.list,
                "count": res.page.totalCount
            }
        }
        ,cols: [[
            {type:'checkbox', fixed: 'left'}
            ,{field:'longPacking', title: '长（CM）',align: 'center', sort: true ,edit: 'text'}
            ,{field:'widePacking',title: '宽（CM）', align:'center', sort: true ,edit: 'text'}
            ,{field:'highPacking', title: '高（CM）', align:'center', sort: true ,edit: 'text'}
        ]]
    });

    //计算结果table
    table.render({
        elem: '#market-count-result-tab',
        url: setter.baseUrl+'marker/packing/countPackingResult',
        cellMinWidth: 80,
        id: 'market-count-result-tab',
        method: 'POST',
        contentType: 'application/json',
        cols:[[
            {type:'numbers',title:'序号',fixed: 'left'}
            ,{field:'packX', title: '长(CM)',align: 'center'}
            ,{field:'packY', title: '宽(CM)',align: 'center'}
            ,{field:'packH', title: '高(CM)',align: 'center'}
            ,{field:'utilization', title: '利用率',align: 'center', sort: true}
            ,{field:'cartonWeight', title: '箱重量',align: 'center'}
            ,{field:'cartonNumber', title: '箱数',align: 'center'}
            ,{field:'longPack', title: '长(包)',align: 'center'}
            ,{field:'winePack', title: '宽(包)',align: 'center'}
            ,{field:'highPack', title: '高(包)',align: 'center',}
            ,{field:'sqm', title: '体积(㎡)',align: 'center'}
        ]],
        done: function(res, curr, count){ this.where={};}

    })

    //监听单元格编辑
    table.on('edit(market-packing-size-tab)', function(obj){
        var value = obj.value //得到修改后的值
            ,data = obj.data //得到所在行所有键值
            ,field = obj.field
            ,dataParams = {}; //得到字段

        dataParams[field] = value;
        dataParams['id'] = data.id; 
        // layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);
        admin.req({
            url: setter.baseUrl+'/marker/packing/updateSpecification',
            type:"POST",
            data:dataParams,
            done: function (res) {
                layer.msg('修改成功');
                table.reload('market-packing-size-tab');
            }
            ,fail: function (res) {
                layer.msg("修改失败，请稍后再试！");
            }
        }); 
    });

    var active = {
        packingSizeAdd : function(){
            admin.popup({
                title: '添加箱子规格'
                ,area: ['500px', '350px']
                ,id: 'LAY-popup-packing-add'
                ,success: function(layero, index){
                  view(this.id).render('marketManagement/iframeWindow/packing_form_add').done(function(){
                    form.render(null, 'market-packing-add-form');
                    
                    //监听提交
                    form.on('submit(market-packing-form-submit)', function(data){
                      var field = data.field; //获取提交的字段
                        admin.req({
                            type: 'post'
                            ,url: setter.baseUrl+'/marker/packing/saveSpecification'
                            ,data: field
                            ,done: function (res) {
                                layer.msg('添加成功');
                                table.reload('market-packing-size-tab');
                            }
                            ,fail: function (res) {
                                layer.msg("添加失败，请稍后再试！");
                            },
                        });
                        layer.close(index); //执行关闭 
                    });
                  });
                }
            }); 
        },
        packingSizeDel : function(){
            var checkStatus = table.checkStatus('market-packing-size-tab')
                ,checkData = checkStatus.data; //得到选中的数据
            if(checkData.length === 0){
                return layer.msg('请选择数据');
            }
            layer.confirm('确定删除吗？', function(index) {
                //执行 Ajax 后重载
                admin.req({
                    url: setter.baseUrl+'/marker/packing/delSpecification',
                    data: {'ids':checkData.id},
                    url: setter.baseUrl + '/marker/packing/delSpecification',
                    success: function () {
                        table.reload('market-packing-size-tab');
                        layer.msg('已删除');
                    }
                });
               
            });
        }
    };

    $('.layui-btn.layuiadmin-btn-list').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    exports('market_packing_count',{});
});