/**
 *@Name 报价页
 * _def_disableIn 默认值
 **/

layui.define(['admin','form','element','laytpl','layer','upload'], function (exports) {
    var $ = layui.jquery
        ,view = layui.view
        ,form = layui.form
        ,admin = layui.admin
        ,element = layui.element
        ,setter = layui.setter
        ,upload = layui.upload
        ,layer = layui.layer;
    element.render();
    var arr_layer_options = [{text: 1,value: 1},{text: 2,value: 2},{text: 4,value: 4},{text: 6,value: 6},{text: 8,value: 8}];
    var arr_layer_optionst = [{text: 1,value: 1},{text: 2,value: 2}];
    var arr_layer_optionss = [{text: 4,value: 4},{text: 6,value: 6},{text: 8,value: 8}];
    var arr_selkbsy_options = [{text: 'KB', value: 'KB'}, {text: 'SY', value: 'SY'}];
    var arr_selkbsy_optionst = [{text: 'YG', value: 'YG'}];
    var arr_selkbsy_kb = [{text: 'KB6160', value: 'KB6160'}, {text: 'KB6150', value: 'KB6150'}, {text: 'KB6165', value: 'KB6165'}, {text: 'KB6167', value: 'KB6167'}];
    var arr_selkbsy_sy = [{text: 'SY1130', value: 'SY1130'}, {text: 'SY1141', value: 'SY1141'}, {text: 'SY1150', value: 'SY1150'}, {text: 'SY1170', value: 'SY1170'}, {text: 'SY1180', value: 'SY1180'}, {text: 'SY1000', value: 'SY1000'}, {text: 'SY1000-2', value: 'SY1000-2'}, {text: 'SY1600', value: 'SY1600'}];
    var arr_selkbsy_yg = [{text: 'YG0001', value: 'YG0001'}, {text: 'YG0002', value: 'YG0002'}, {text: 'YG0003', value: 'YG0003'}, {text: 'YG0004', value: 'YG0004'}];
    // var arr_surfinish = [{text: 'HASL with lead', value: 'HASL_with_lead'},{text: 'HASL lead free', value: 'HASL_lead_free'},{text: 'Immersion Gold', value: 'Immersion_Gold'},{text: 'Immersion tin', value: 'Immersion_tin'},{text: 'Immersion silver', value: 'Immersion_silver'},{text: 'OSP', value: 'OSP'}];
    // var arr_selsurf_Hash_width_lead = [{text: '2.54-25.4um', value: '2.54-25.4um'}];
    // var arr_selsurf_Immer_tin = [{text: '0.5um-0.7um', value: '0.5um-0.7um'}];
    // var arr_selsurf_Immer_sil = [{text: '≥0.05um', value: '≥0.05um'}];
    // var arr_selsurf_osp = [{text: '0.25-0.5um', value: '0.25-0.5um'}];

    var _MO_data = {
        isDis:{
            itPanelway: true,
            itPanelsize: true
        }
    };
    //发送的数据
    var post_data = {
        bordType: 1,
        companyId: 1,
        countrysId: 70,
        totalWeight: 0,
    };
    //popup得到的数据
    var stencil_data = {
        stencilSize_price: '',
        stencilWeight: '',
        stencil_shippingPrice: ''
    };
    //公共数据
    var public_data = {
        postFee: '',
        customerAid:'',
        ids:'',
        orderNo:'',
    };
    // 快递/国家/重量 默认选中
    var def_expressCountry = {
        courierId: '',
        countryId: '',
        totalWeight: ''
    };
    // 计算得出的价格
    var quote_price_group = {
        shipping: ''
    };
    // 计算总价数据
    var quote_total = {
        pcbCost: 0,
        totalPrice: 0
    };
    // 用来判断是否重复添加相同参数的报价
    var tp = {
        totalPric: null,
        totalPriced: null,
        isQuote: false,    // false 表示没有计算过
        // 钢网
        totalPricS: null,
        totalPricedS: null,
        isQuoteS: false
    }
    // 报价后判断是否为样板   1为样板 2不是
    var areaType = null;

    /**
     * 报存当前报价需要传输的字段 所有对象
     * @type {{enginnerFee: *}}
     */
    //右侧 pcb 明细容器
    var pcb_container = {
        engineeringFee: '',
        boardFee: '',
        testCostFee: '',
        toolingFee: '',
        overworkFee: 0,  //加急费
        buildTime: '',
        weight: '',
        postFee: 0,
        subtotal: '', //总价
        quoteConfigIds:'',
        productNo:'',   //客户编号
        userId: '', //用户id
        orderType: 1,  //订单类型（新单/返单/返单有效）
        gerberName: '',
        gerberPath: '',
        pcbName: '',     //客户型号
        orderNo: ''     //客户订单编号
        // pcbCost: '',
    };
    var pcb_rigdetaily = {};
    // 右侧 SMT-Stencil 明细容器
    var stmStencil_container = {
        stencilWeight: '',
        inStencilCost: '',
    };
    // pcb ==> 小计、总价、运费
    var pcbTo = {
        pcbCost: 0,         // 小计
        totalPrice: 0,      // 总价
        shippingPrice: 0    // 运费
    }
    // Stencil 总价容器
    var quoteSMTStencil = {
        postFee: stencil_data.stencil_shippingPrice,          // 邮费
        inStencilCost: null,    // 小计 == 单价 * quantity
        sQuantity: 1,    // 小计 == 单价 * quantity
        stencilSide: "Top And Bottom (On Single Stencil)",    // 小计 == 单价 * quantity
        sunitPrice: stencil_data.stencilSize_price,       // 单价
        stotalPrice: null,      // 总价
    };

    // Stencil Size 参数
    var stencilSize = new Object();
    // Stencil 添加报价参数
    var saveSMTStencil = {
        stencilSide: "Top And Bottom (On Single Stencil)",       // 钢网侧边
        quantity: quoteSMTStencil.sQuantity ,           // 数量
        thickness: 0.12,                                // 厚度
        existingFiducials: 0.10,                        // 基准
        totalStencilFee: quoteSMTStencil.stotalPrice,   // 钢网总价
        gerberPath: null,                               // 上传的gerber文件路径
        gerberName: null,                               // 文件名
        orderId: null,                                  // 客户订单编号
        orderType: 1,                                   // 订单类型（1 默认为新单，2位返单）
        pcbName: null,                                  // 客户型号
        postFee: null,               // 运费
        orderNo: null,                 // 客户P/O
        companyId: post_data.companyId,                 // 快递
        countrysId: post_data.countrysId,               // 国家
        customerSysName: null,                          // 客户名
        userId: null,
        productNo: null,
    }

    var _MT_data = {};             //全局变量容器
    _init__MT_data();              //初始化全局变量
    _def_disableIn();              //执行变量
    _MT_oneInput(0);
    _def_layerOptipns("FR4");    // layer下拉内容
    _defkbsy_selOptions();           // kb/sy/yg
    _kbsy_linkage("kb");            // kb/sy/yg联动 默认kb
    getMerchandiser();              //获取客户信息

    /**
     * 顶部计算模块
     */
    var singleSizeX,singleSizeY,quantityPCS;
    var panelWayX,panelWayY,quantityPanel;
    var panelSizeX,panelSizeY;
    var topRadioType =1;
    $("#singleSizeX,#singleSizeY,#quantityPCS").bind("input propertychange", function (even) {
        _top_quote();
    });
    $("#panelSizeX,#panelSizeY,#quantityPanel").bind("input propertychange", function (even) {
        if (panelSizeX != null && panelSizeY != null && quantityPanel != null){
            _top_quote();
        }
    });
    $("#panelWayX,#panelWayY,#quantityPanel").bind("input propertychange", function (even) {
        _top_quote();
    });
    $("input[name='testPoint']").bind("input propertychange", function (even) {
        var trigger = setTimeout(function () {
            $(".up-subbtn").click();    //重新报价
        },1800);
    });
    $("input[name='panelRoutingPath']").bind("input propertychange", function (even) {
        var trigger = setTimeout(function () {
            $(".up-subbtn").click();    //重新报价
        },1800);
    });
    $("input[name='punchingHoles']").bind("input propertychange", function (even) {
        var trigger = setTimeout(function () {
            $(".up-subbtn").click();    //重新报价
        },1800);
    });
    $("input[name='punchingSlots']").bind("input propertychange", function (even) {
        var trigger = setTimeout(function () {
            $(".up-subbtn").click();    //重新报价
        },1800);
    });
    $("input[name='surfaceArea']").bind("input propertychange", function (even) {
        var trigger = setTimeout(function () {
            $(".up-subbtn").click();    //重新报价
        },1800);
    });
    $("#mPrice").bind("input propertychange", function (even) {
        var a = $("#mPrice").val();
        var c = $("#areasq").val();
        var d = parseFloat(a*c).toFixed(2);
        var f = $("#boardFee").val()
        $("#unitPrice").val(parseFloat(f/c).toFixed(2));
        $("#boardFee").val(d);
        // quotePCBTotalPrice();
        layer.msg(d);
    });

    // 右侧价格表单及时响应
    $("#rPcbForm").bind('input propertychange', function () {       //监听右侧所有费用的变化
        var obj = getRig_obj(); //获取右侧费用对象
        quotePCBCost(obj);      //计算右侧费用的小计
        // quotePCBTotalPrice();      //计算总价
        pcb_container.postFee = parseFloat($("#shippingPrice").val());
        pcb_container.engineeringFee = parseFloat($("#enginnerFee").val());
        pcb_container = Object.assign(pcb_container,obj);   //修改后合并对象
        console.log(pcb_container);
    });

    // Stencil Quantity
    $("#stencil_quantity").bind('input propertychange', function () {
        var _this = parseFloat($(this).val());
        if (_this =="" || _this == null || typeof _this == "undefined" || isNaN(_this)) {
            _this = 0;
        }
        quoteSMTStencil.sQuantity = saveSMTStencil.quantity =  _this;
        quoteSMTStencilSubtotal();
    });

    function _top_quote(e) {
        if (topRadioType === 1){    //Single PCB
            _get_topQuoteParam("1");
            var areasq = parseFloat(singleSizeX*singleSizeY*quantityPCS)/1000000;
            $("#areasq").val(areasq.toFixed(3));
        } else if (topRadioType === 2){ //Panel as design
            _get_topQuoteParam("2");
            var areasq = parseFloat(panelSizeX*panelSizeY*quantityPanel)/1000000;
            $("#areasq").val(areasq.toFixed(3));
            if (quantityPanel != "" && panelWayX != "" && panelWayY != ""){
                var quantityPcs = Math.ceil(quantityPanel*panelWayX*panelWayY);
                $("#quantityPCS").val(quantityPcs);
            }
        }
    }
    //监听radio==>borderType
    form.on('radio(boardType)',function (data) {
        var this_type = data.value;
        if (this_type == "1") {
            topRadioType = 1;
            _MT_oneInput(1);
        } else if (this_type == "2"){
            topRadioType = 2;
            _MT_oneInput(2);
        }
    });

    // 监听select==>
    form.on('select(material)', function (data) {   // material
        var this_type = data.value;
        if (this_type == "KB"){
            _kbsy_linkage("kb");
        } else if (this_type == "SY"){
            _kbsy_linkage("sy");
        } else if (this_type == "YG"){
            _kbsy_linkage("yg");
        }
    });

    form.on('select(selSurfacefinish)', function (data) {   //Surface finis
        var this_checkVal = data.value;
        if (this_checkVal == "HASL_with_lead" || this_checkVal == "HASL_lead_free") {
            $("#selSurfacethickness").val("2.54-25.4um");
        } else if (this_checkVal == "Immersion_Gold") {
            $("#selSurfacethickness").val("2u");
        } else if (this_checkVal == "Immersion_tin") {
            $("#selSurfacethickness").val("0.5um-0.7um");
        } else if (this_checkVal == "Immersion_silver") {
            $("#selSurfacethickness").val("≥0.05um");
        } else if (this_checkVal == "OSP") {
            $("#selSurfacethickness").val("0.25-0.5um");
        }
        if (this_checkVal == "Immersion_Gold"){
            $("input[name='surfaceArea']").removeAttr("disabled");
        } else {
            $("input[name='surfaceArea']").attr("disabled",true);
        }
        form.render('select','quoteForm');
        form.render(null,'quoteForm');
    });

    form.on('select(testPointType)', function (data) {
        var this_checkVal = data.value;
        if (this_checkVal == "1") {
            $("#testPointT").text("飞针费：");
        }  else {
            $("#testPointT").text("测试架：");
        }
        $(".up-subbtn").click();    //重新报价
    });

    // 监听钢网 Stencil Size
    form.on('select(stencilSide)', function (data) {
        var this_checkVal = data.value;
        console.log(this_checkVal);
        quoteSMTStencil.stencilSide = saveSMTStencil.stencilSide = this_checkVal;
        quoteSMTStencilSubtotal();
    });

    // 监听钢网 radio 基准
    form.on('radio(existingFiducials)', function(data){
        var _this_val = saveSMTStencil.existingFiducials = data.value;
        layer.msg(_this_val);
    });

    // 监听钢网 radio 厚度
    form.on('radio(sthickness)', function(data){
        var _this_val = saveSMTStencil.thickness = data.value;
        layer.msg(_this_val);
    });

    form.on('radio(routingType)', function(data){
        var this_val = data.value;
        if (this_val == "1"){
            $("input[name='panelRoutingPath']").removeAttr("disabled");
            $("input[name='punchingHoles']").attr("disabled",true);
            $("input[name='punchingSlots']").attr("disabled",true);
        } else {
            $("input[name='panelRoutingPath']").attr("disabled",true);
            $("input[name='punchingHoles']").removeAttr("disabled");
            $("input[name='punchingSlots']").removeAttr("disabled");
        }
        $(".up-subbtn").click();    //重新报价
        form.render();
    });

    //监听element==> 订单类型(PCB/Stencil/SMT)
    element.on('collapse(orderTypeCol)', function(data){
        // console.log(data.show); //得到当前面板的展开状态，true或者false
        // console.log(data.title); //得到当前点击面板的标题区域DOM对象
        // console.log(data.content); //得到当前点击面板的内容区域DOM对象
        var this_col_title = data.title.context.innerText;
        if (this_col_title.indexOf('PCB Phototype') != -1) {
            $(".rig-price-cardbody form").removeClass("quote-avtive");
            $(".rig-price").addClass("quote-avtive");
            post_data.bordType = 1;
        } else if (this_col_title.indexOf('SMT-Stencil') != -1) {
            $(".rig-price-cardbody form").removeClass("quote-avtive");
            $("#stencilForm").addClass("quote-avtive");
            post_data.bordType = 2;
        } else if (this_col_title.indexOf('Assembly Service') != -1) {
            $(".rig-price-cardbody form").removeClass("quote-avtive");
            $("#assemblyForm").addClass("quote-avtive");
            post_data.bordType = 3;
        }
        _init_form_rig();

    });
    form.on('select(layer)', function (data) {  // Layer
        var this_type = data.value;
        _MT_data.selLayer = this_type;
        if (secondModel_radio == "1"){
            if (this_type == "1"){
                _MT_data.selPthcopper = 'none';
                _MT_data.selViaprocess = 'none';
            } else if (this_type == "2") {
                _MT_data.selPthcopper = '20um';
                _MT_data.selViaprocess = 'Follow_gerber';
            } else if (this_type == "4"){
                _init__MT_data();
                _MT_data.selLayer = this_type;
                _MT_data.selInlayercoopper = '1oz';
                _MT_data.isDis.selInlayercoopper = false;
                _MT_data.selInnerMintrack = '5mil';
                _MT_data.isDis.selInnerMintrack = false;
                _MT_data.selNofcore = '1';
                _MT_data.isDis.selNofcore = false;
                _MT_data.selNofpp = '2';
                _MT_data.isDis.selNofpp = false;
            } else if (this_type == "6"){
                _init__MT_data();
                _MT_data.selLayer = this_type;
                _MT_data.selInlayercoopper = '1oz';
                _MT_data.isDis.selInlayercoopper = false;
                _MT_data.selInnerMintrack = '5mil';
                _MT_data.isDis.selInnerMintrack = false;
                _MT_data.selNofcore = '2';
                _MT_data.isDis.selNofcore = false;
                _MT_data.selNofpp = '3';
                _MT_data.isDis.selNofpp = false;
                _MT_data.selPthcopper = 'none';
            } else if (this_type == "8"){
                _init__MT_data();
                _MT_data.selLayer = this_type;
                _MT_data.selInlayercoopper = '1oz';
                _MT_data.isDis.selInlayercoopper = false;
                _MT_data.selInnerMintrack = '5mil';
                _MT_data.isDis.selInnerMintrack = false;
                _MT_data.selNofcore = '3';
                _MT_data.isDis.selNofcore = false;
                _MT_data.selNofpp = '4';
                _MT_data.isDis.selNofpp = false;
                _MT_data.selPthcopper = 'none';
            }
            _def_disableIn();
        }

    });

    /**
     * 第二大模块，切换变值，多级联动
     * @type {number}
     *  _def_layerOptipns() layer层数
     * _def_secondModel()   第二个模块的默认值
     * _defkbsy_selOptions() kb/sy/yg
     */
    var secondModel_radio = 1;
    //监听第二大模块的radio
    form.on('radio(pcbType)',function (data) {
        var this_type = data.value;
        layer.msg(this_type);
        if (this_type == "FR4"){
            secondModel_radio = 1;
            _def_layerOptipns("FR4");
            _def_secondModel();
            _defkbsy_selOptions("FR4");
        } else if (this_type == "Aluminum"){
            secondModel_radio = 2;
            _def_layerOptipns("Aluminum");
            _def_secondModel();
            _defkbsy_selOptions("Aluminum");
        } else if (this_type == "FR4+Aluminum"){
            secondModel_radio = 3;
            _def_layerOptipns("FR4+Aluminum");
            _def_secondModel();
            _defkbsy_selOptions("FR4+Aluminum");
        }
    });

    //监听==>构造时间的radio
    form.on("radio(buildTimeRadio)", function (data) {
        var this_price = data.value;
        console.log(data);
        console.log(data);
        // 给pcb明细容器赋值
        pcb_container.overworkFee = this_price;
        // pcb_container.buildTime = $("input[name='buildTime']").attr("title");
        $("#urgentFee").val(this_price);
        quotePCBCost();
        // quotePCBTotalPrice();
    });

    //监听==>构造时间的 select
    form.on("select(selBuildTime)", function (data) {   //构造时间天数
        var this_price = data.value;
        var optionText = $("#selBuildTime").find("option[value="+data.value+"]").text();
        pcbTo.shippingPrice = this_price;
        pcb_container.overworkFee = this_price;
        pcb_container.buildTime = optionText;
        $("#urgentFee").val(this_price);
        var obj = getRig_obj(); //获取右侧费用对象
        quotePCBCost(obj);      //计算右侧费用的小计

    });

    //监听==>选择快递
    form.on("select(company)",function (data) {
        post_data.companyId = $(data.elem).find("option:selected").attr("value");
        var courierId = post_data.companyId;
        var countryId = post_data.countrysId;
        getShippingCost(courierId,countryId);
        getShippingCost();
    });

    //监听==>选择国家
    form.on("select(countrys)",function (data) {
        post_data.countrysId = $(data.elem).find("option:selected").attr("value");
        if (post_data.bordType === 2){
            quoteSMTStencilFuc();
        }
        var courierId = post_data.companyId;
        var countryId = post_data.countrysId;
        getShippingCost(courierId,countryId);
    });

    //监听 ==>选择客户
    form.on('select(filterCustomer)',function (data) {
        // $("#inCustomer").val($(data.elem).find("option:selected").text());
        var dv = $(data.elem).find("option:selected").text();
        $("#orderPN").val('');  //重新选择客户的时候，内部型号清空
        public_data.customerAid = data.value;
        pcb_container.userId = saveSMTStencil.userId = data.value;
        saveSMTStencil.customerSysName = dv;
        $("#customerId").val(data.value);
        $("#customerSysName").val($(data.elem).find("option:selected").text());
        form.render('');
    });

    //监听   ==>选择订单类型（新单/返单/返单有效）
    form.on('select(filterOrderType)', function (data) {
        pcb_container.orderType = saveSMTStencil.orderType = data.value;
    });



    $("#postFees").bind("input propertychange", function (even) {
        quoteSMTStencil.postFee = parseFloat($(this).val());
        quoteSMTStencilSubtotal();
    });
    $("#inStencilCost").bind("input propertychange", function (even) {
        quoteSMTStencil.inStencilCost = parseFloat($(this).val());
        quoteSMTStencilFuc();
    });
    //监听Assembly 表单
    form.on('submit(assemblyService)', function (data) {
        var data = data.field;
        admin.req({
            type: 'post',
            data: data,
            url: setter.imUrl+"quote/getAssemblyQuote",
            success: function (data) {
                var pcbQuantity = $("#pcbQuantity").val();
                var pricePCS = parseFloat(data.data.totalAssemblyQuote/pcbQuantity);
                $("#pricePCS").val(pricePCS.toFixed(2));
                $("#assemblyCost").val(data.data.totalAssemblyQuote);
                if (data.data.totalAssemblyWeight != null && data.data.totalAssemblyWeight != ""){
                    $("#assemblyWeight").val(data.data.totalAssemblyWeight);
                }
                console.log(data);
                var totalAssemblyQuote = data.data.totalAssemblyQuote;
                var totalAssemblyWeight = data.data.totalAssemblyWeight;
            }
        });
        return false;
    });


    /**
     * 默认值--all
     * @private
     */
    function _MT_oneInput(even) {
        $("#areasq").val("");
        if (even === 0){
            $(".itPanelway input").attr("disabled",_MO_data.isDis.itPanelway);
            $(".itPanelsize input").attr("disabled",_MO_data.isDis.itPanelsize);
        } else if (even === 1){
            $(".mto-input").removeAttr("disabled","true");
            $(".itPanelway input").attr("disabled","disabled");
            $(".itPanelsize input").attr("disabled","disabled");
            $(".itSinlgesize input").val("");
            $(".itPanelway input").val("");
            $(".itPanelsize input").val("");
        } else if (even === 2){
            $(".mto-input").removeAttr("disabled","true");
            $(".itSinlgesize input").attr("disabled","disabled");
            $(".itSinlgesize input").val("");
        }
    }

    /**
     * 给表单赋值容器
     * @private
     */
    function _def_disableIn(){
        $("#selHc").attr("disabled",_MT_data.isDis.selHc);
        $("#selInlayercoopper").attr("disabled",_MT_data.isDis.selInlayercoopper);
        $("#selInnerMintrack").attr("disabled",_MT_data.isDis.selInnerMintrack);
        $("#selNofcore").attr("disabled",_MT_data.isDis.selNofcore);
        $("#selMinspaccing").attr("disabled",_MT_data.isDis.selMinspaccing);
        $("#selNofpp").attr("disabled",_MT_data.isDis.selNofpp);

        $("#radioSinglePcb").attr("checked","true");
        $("#ptfr4").attr("checked","true");
        $("#routingOne").attr("checked","true");
        // Select下拉
        $("#selLayer").val(_MT_data.selLayer);
        $("#selFinishThickness").val(_MT_data.selFinishThickness);
        $("#selMaterial").val(_MT_data.selMaterial);
        $("#selkbsy").val(_MT_data.selkbsy);
        $("#selTg").val(_MT_data.selTg);
        $("#selHf").val(_MT_data.selHf);
        $("#selHc").val(_MT_data.selHc);
        $("#selInlayercoopper").val(_MT_data.selInlayercoopper);
        $("#selInnerMintrack").val(_MT_data.selInnerMintrack);
        $("#selNofcore").val(_MT_data.selNofcore);
        $("#selMinspaccing").val(_MT_data.selMinspaccing);
        $("#selNofpp").val(_MT_data.selNofpp);
        $("#selOuterlayercopper").val(_MT_data.selOuterlayercopper);
        $("#selOutMintrack").val(_MT_data.selOutMintrack);
        $("#selBgasize").val(_MT_data.selBgasize);
        $("#selMinspacing").val(_MT_data.selMinspacing);
        $("#selMinholesize").val(_MT_data.selMinholesize);
        $("#selPthcopper").val(_MT_data.selPthcopper);
        $("#selSoldermc").val(_MT_data.selSoldermc);
        $("#selViaprocess").val(_MT_data.selViaprocess);
        $("#selSilksc").val(_MT_data.selSilksc);
        $("#selPeelable").val(_MT_data.selPeelable);
        $("#selSurfacefinish").val(_MT_data.selSurfacefinish);
        $("#selTestcost").val(_MT_data.selTestcost);
        form.render();
        }


    /**
     * layer 的下拉内容
     * arr_layer_options
     */
    function _def_layerOptipns(e) {
        $('#selLayer').children().remove();
        if (e == "Aluminum"){
            for (var i=0;i < arr_layer_optionst.length;i++){
                var title = arr_layer_optionst[i].text;
                var options_val = arr_layer_optionst[i].value;
                $("#selLayer").append("<option value="+options_val+">"+title+"</option>");
            }
        } else if (e == "FR4") {
            for (var i=0;i < arr_layer_options.length;i++){
                var title = arr_layer_options[i].text;
                var options_val = arr_layer_options[i].value;
                $("#selLayer").append("<option value="+options_val+">"+title+"</option>");
                _def_secondModel(1);
            }
        } else if (e == "FR4+Aluminum") {
            for (var i=0;i < arr_layer_optionss.length;i++){
                var title = arr_layer_optionss[i].text;
                var options_val = arr_layer_optionss[i].value;
                $("#selLayer").append("<option value="+options_val+">"+title+"</option>");
            }
        }
    }
    /**
     * kb/sy/yg的下拉框内容
     * @private
     */
    function _defkbsy_selOptions(e) {
            $('#selMaterial').children().remove();
            if (e == "Aluminum"){
                for (var i=0;i < arr_selkbsy_optionst.length;i++){
                    var title = arr_selkbsy_optionst[i].text;
                    var options_val = arr_selkbsy_optionst[i].value;
                    $("#selMaterial").append("<option value="+options_val+">"+title+"</option>");
                }
                _kbsy_linkage("yg");
            } else {
                for (var i=0;i < arr_selkbsy_options.length;i++){
                    var title = arr_selkbsy_options[i].text;
                    var options_val = arr_selkbsy_options[i].value;
                    $("#selMaterial").append("<option value="+options_val+">"+title+"</option>");
                }
                _kbsy_linkage("kb");
            }
            form.render('select');
        }

    /**
     * kb/sy/yg对应下拉的联动效果
     */
    function _kbsy_linkage(e) {
            $("#selkbsy").children().remove();
            if (e == "kb"){
                for (var i=0;i < arr_selkbsy_kb.length;i++){
                    var title = arr_selkbsy_kb[i].text;
                    var options_val = arr_selkbsy_kb[i].value;
                    $("#selkbsy").append("<option value="+options_val+">"+title+"</option>");
                }
            } else if (e == "yg"){
                for (var i=0;i < arr_selkbsy_yg.length;i++){
                    var title = arr_selkbsy_yg[i].text;
                    var options_val = arr_selkbsy_yg[i].value;
                    $("#selkbsy").append("<option value="+options_val+">"+title+"</option>");
                }
            } else if (e == "sy"){
                for (var i=0;i < arr_selkbsy_sy.length;i++){
                    var title = arr_selkbsy_sy[i].text;
                    var options_val = arr_selkbsy_sy[i].value;
                    $("#selkbsy").append("<option value="+options_val+">"+title+"</option>");
                }
            }
        form.render('select');
        }


    /**
     * 顶部计算，获取input表单值赋给全局变量
     * @param e
     * @private
     */
    function _get_topQuoteParam(e){
        var quoteType = e;
        if (quoteType == "1"){
            singleSizeX = $("#singleSizeX").val();
            singleSizeY = $("#singleSizeY").val();
            quantityPCS = $("#quantityPCS").val();
        } else if (quoteType == "2"){
            panelWayX = $("#panelWayX").val();
            panelWayY = $("#panelWayY").val();
            quantityPanel = $("#quantityPanel").val();
            panelSizeX = $("#panelSizeX").val();
            panelSizeY = $("#panelSizeY").val();
        }
    }

    /**
     * 第二个模块的默认值
     * @param e
     * @private
     */
    function _def_secondModel(e){
        _init__MT_data();
        if (secondModel_radio === 2){
            _MT_data.selLayer = 1;
            _MT_data.selMaterial = 'YG';
            _MT_data.selkbsy = 'YG0001';
            _MT_data.selHc = '1W';
            _MT_data.selMinholesize = '1.5';
            _MT_data.selPthcopper = 'none';
            _MT_data.selSoldermc = 'white';
            _MT_data.selViaprocess = 'none';
            _MT_data.selSilksc = 'black';
            _MT_data.isDis.selHc = false;
        } else if (secondModel_radio === 3){
            _MT_data.selLayer = 4;
            _MT_data.selHc = '1W';
            _MT_data.selInlayercoopper = '1oz';
            _MT_data.selMintrack = '5mil';
            _MT_data.selNofcore = '1';
            _MT_data.selMinspaccing = '5mil';
            _MT_data.selNofpp = '2';
            _MT_data.selInnerMintrack = '5mil';
            _MT_data.selMinholesize = '1.5';
            _MT_data.selPthcopper = 'none';
            _MT_data.selSoldermc = 'white';
            _MT_data.selSilksc = 'black';
            _MT_data.selPeelable = 'none';
            _MT_data.isDis.selInlayercoopper = false;
            _MT_data.isDis.selInnerMintrack = false;
            _MT_data.isDis.selNofcore = false;
            _MT_data.isDis.selMinspaccing = false;
            _MT_data.isDis.selNofpp = false;
        }
        _def_disableIn();

    }


    /**
     *  初始化全局变量
     */
    function _init__MT_data(){
        _MT_data.selLayer = 2;
        _MT_data.selFinishThickness = '1.6mm';
        _MT_data.selMaterial = 'KB';
        _MT_data.selkbsy = 'KB6160';
        _MT_data.selTg = '135';
        _MT_data.selHf = 'NO';
        _MT_data.selHc = 'none';
        _MT_data.selInlayercoopper = 'none';
        _MT_data.selMintrack = 'none';
        _MT_data.selNofcore = 'none';
        _MT_data.selMinspaccing = 'none';
        _MT_data.selNofpp = 'none';
        _MT_data.selOuterlayercopper = '1oz';
        _MT_data.selInnerMintrack = 'none',
        _MT_data.selOutMintrack = '5mil';
        _MT_data.selBgasize = '0.30';
        _MT_data.selMinspacing = '5mil';
        _MT_data.selMinholesize = '0.3';
        _MT_data.selPthcopper = '20um';
        _MT_data.selSoldermc = 'green';
        _MT_data.selViaprocess = 'Follow_gerber';
        _MT_data.selSilksc = 'white';
        _MT_data.selPeelable = 'none';
        _MT_data.selSurfacefinish = 'HASL_with_lead';
        _MT_data.selTestcost = '1';
        _MT_data.selCti = '175≤CTI<250';
        _MT_data.isDis = {};
        _MT_data.isDis.selHc = true;
        _MT_data.isDis.selInlayercoopper = true;
        _MT_data.isDis.selInnerMintrack = true;
        _MT_data.isDis.selNofcore = true;
        _MT_data.isDis.selMinspaccing = true;
        _MT_data.isDis.selNofpp = true;
    }

    //限制键盘只能按数字键、小键盘数字键、退格键
    $("#panelWayX,#panelWayY,#quantityPanel").keydown(function (e) {
        var code = parseInt(e.keyCode);
        if (code == 110) {
            return false;
        } else {
            return true;
        }
    });
    $("#panelWayX,#panelWayY,#quantityPanel").bind("cut copy paste", function(e){
        e.preventDefault();
    });

    /**
     * 提交表单
     */
    form.on('submit(quoteForm)',function (data) {
        var data = data.field;
        var cncAndPunchType = data.cncAndPunch;
        pcb_rigdetaily = data;
        data.isExistSmt = 0;
        data.stackUp = "none";
        data.innerMinTrack = data.innerMinSpacing;
        data.outerMinSpacing = data.outerMinTrack;
        data.silkScreenBotColor = data.solderMaskTopColor;
        data.solderMaskBotColor = data.solderMaskTopColor;
        data.surfaceArea = data.surfaceArea;
        // data.differentDesign = '';      //原来注释掉的
        data.orderNo = $("#orderNo").val();//客户PO号
        pcb_container.orderNo = data.orderNo;
        data.pcbName = pcb_container.pcbName;
        console.log(data);
        if (topRadioType===2){
            if (data.panelWayX == null || data.panelWayX == "" || data.panelWayY == null || data.panelWayY == "") {
                layer.tips('请输入拼版方式 !', '#panelWayX', {
                    tips: [1, '#3595CC'],
                    time: 5000
                });
                return false;
            }
        }
        if (data.testPoint == null || data.testPoint == "") {
            // $("#testPoint").focus();
            $('html,body').animate({scrollTop:200},'slow');
            layer.msg('请输入测试点数量 !');
            return false;
        }
        console.log('surfaceFinish:'+data.surfaceFinish+'\nsurfaceArea:'+data.surfaceArea);
        // if (data.surfaceFinish == "Immersion_Gold" && data.surfaceArea == null) {
        if (data.surfaceFinish == "Immersion_Gold" && data.surfaceArea == "") {
            layer.msg('请输入沉金面积！');
            return false;
        }
        //发送请求获取价格
        admin.req({
            type: 'post',
            // dataType: 'json',
            url: setter.imUrl+'quote/countAdditionInfo',
            data: data,
            success: function (data) {
                if (data.data.pcbPriceDetail != null && data.data.pcbPriceDetail != ""){
                    if (data.data.pcbPriceDetail.qcidList != null || data.data.pcbPriceDetail.qcidList != ""){
                        public_data.ids = data.data.pcbPriceDetail.qcidList;
                        pcb_container.quoteConfigIds = data.data.pcbPriceDetail.qcidList.join(',');
                        public_data.ids = data.data.pcbPriceDetail.qcidList;
                        console.log(public_data.ids);
                    }
                }
                console.log(data);
                // 给pcb明细容器赋值
                pcb_container.engineeringFee = data.data.projectQuoteToUSD;
                pcb_container.boardFee = data.data.totalBoardQuoteToUSD;
                pcb_container.testCostFee = data.data.totalTestPointToUSD;
                pcb_container.toolingFee= data.data.cncAndPunchingQuoteToUSD;
                pcb_container.weight = data.data.totalQuoteWeight;
                //给页面元素赋值
                post_data.totalWeight = data.data.totalQuoteWeight;
                $("#boardFee").val(data.data.totalBoardQuoteToUSD);
                $("#enginnerFee").val(data.data.projectQuoteToUSD);
                $("#pcbWeight").val(data.data.totalQuoteWeight+" KG");
                $("#testFee").val(data.data.totalTestPointToUSD);
                $("#flyingTest").val(data.data.totalTestPointToUSD);
                $("#routingCost").val(data.data.cncAndPunchingQuoteToUSD);
                $("#unitPrice").val(data.data.unitPrice);
                // $("input[name='punchingHoles']").val(data.data.punchingHoles);
                // $("input[name='punchingSlots']").val(data.data.punchingSlots);
                def_expressCountry.totalWeight = data.data.totalQuoteWeight;
                post_data.totalWeight = data.data.totalQuoteWeight;
                areaType = data.data.areaType;  //是否为样板标识
                console.log("areaType:"+areaType);
                if (cncAndPunchType == "1") {
                    $("#toolingFee").val(0);
                } else {
                    $("#toolingFee").val(data.data.cncAndPunchingQuoteToUSD);
                }
                if (areaType == "1"){
                    $("#mPrice").val("");
                    $("#mPrice").attr("disabled",true);
                } else {
                    var _mPrice = parseFloat(data.data.totalBoardQuoteToUSD/$("#areasq").val()).toFixed(2);
                    $("#mPrice").val(_mPrice);
                    $("#mPrice").removeAttr("disabled");
                }
                quotePCBCost();
                getBuildTime();
                if (def_expressCountry.courierId == null || def_expressCountry.courierId == "") {
                    getCouriers();
                }
                if (def_expressCountry.countryId == null || def_expressCountry.countryId == "") {
                    getCountrys();
                }
                if (post_data.companyId != null && post_data.companyId != "" && post_data.countrysId != null && post_data.countrysId != ""){
                    var courierId = post_data.companyId;
                    var countryId = post_data.countrysId;
                    getShippingCost(courierId,countryId);
                }
                var obj = getRig_obj(); //获取右侧费用对象
                quotePCBCost(obj);      //计算右侧费用的小计
                // quotePCBTotalPrice();      //计算总价
            },
            error: function (data) {
                alert("Services Error!!!");
            }
        });
        form.render();
        return false;
    });

    /**
     * 发送请求获取构造天数
     */
    function getBuildTime(){
        var areaSq = $("#areasq").val();
        var layerNum = $("#selLayer").val();
        $("input[name='buildTime']").remove();
        $(".build-time-item .layui-form-radio").remove();
        //发送请求获取构造天数
        admin.req({
            type: 'post',
            url: setter.imUrl+'quote/getBuildTime',
            data: {areaSq:areaSq,layerNum: layerNum},
            success: function (data) {
                $(".build-time-item").css("display","");
                var def_buildTime;
                $('#selBuildTime').children().remove();
                for (var i=0;i<data.data.length;i++){
                    $("#selBuildTime").append("<option value="+data.data[i].price+">"+data.data[i].dayNumber+"</option>");
                    def_buildTime = data.data[0].dayNumber;
                }
                pcb_container.buildTime = def_buildTime;
                //去掉天数为none的
                $(".build-time-item input").each(function () {
                   var flag = $(this).attr("title");
                    console.log(flag);
                   if (flag == "none"){
                       this.remove();
                   }
                });
                form.render();
            },
            error: function () {
                layer.msg("Get BuildTime Fail!!!");
            }
        });
    }

    /**
     * 发送请求获取快递信息
     */
    function getCouriers(){
        // 不同订单操作不同 DOM
        var SelectId = null;
        if (post_data.bordType === 1) {
            SelectId ='selCompany';
        } else if(post_data.bordType === 2) {
            SelectId ='selCompanyt';
        } else if (post_data.bordType === 3) {
            SelectId ='selCompany';
        }
        console.log("SelectId:"+SelectId);
        admin.req({
            type: 'post',
            url: setter.imUrl+'quote/getCouriers',
            success: function (data) {
                $("select[id='"+SelectId+"'] option").remove();
                post_data.companyId = data.data[0].id;
                for (var i=0;i<data.data.length;i++){
                    $("#"+SelectId+"").append("<option value="+data.data[i].id+">"+data.data[i].courierName+"</option>");
                    def_expressCountry.courierId = data.data[0].id;  //默认选中 快递id赋值
                    post_data.companyId = def_expressCountry.courierId;
                }
                form.render('select');
            },
            error: function () {
                layer.msg("Get Couriers Fail!!!");
            }
        });
    }

    /**
     * 发送请求获取国家信息
     */
    function getCountrys(){
        // 不同订单操作不同 DOM
        var SelectId = null;
        if (post_data.bordType === 1) {
            SelectId ='selCountrys';
        } else if(post_data.bordType === 2) {
            SelectId ='selCountryst';
        } else if (post_data.bordType === 3) {
            SelectId ='selCountryss';
        }
        $("select[id='"+SelectId+"'] option").remove();
        form.render();
        admin.req({
            type: 'post',
            url: setter.imUrl+'quote/getCountry',
            success: function (data) {
                post_data.countrysId = data.data[0].id;
                for (var i=0;i<data.data.length;i++){
                    $("#"+SelectId).append("<option value="+data.data[i].id+">"+data.data[i].name+"</option>");
                    def_expressCountry.countryId = data.data[0].id; //默认选中 国家id
                    post_data.countrysId = def_expressCountry.countryId;
                    console.log("国家的选中id值为："+def_expressCountry.countryId);
                }
                form.render();
            },
            error: function () {
                layer.msg("Get Countrys Fail!!!");
            }
        });
    }

    /**
     * 发送请求获取快递的费用
     */
    function getShippingCost(courierId,countryId){
        var this_weight;
        if (courierId == null || typeof courierId == 'undefined' || courierId == '') {
            courierId = 1;
        }
        if (countryId == null || typeof countryId == 'undefined' || countryId == '') {
            countryId = 70;
        }
        if (post_data.bordType === 2){
            this_weight = stencil_data.stencilWeight;
        } else {
            this_weight = post_data.totalWeight;
        }
        admin.req({
            type: 'post',
            url: setter.imUrl+'quote/getShippingCost',
            data: {courierId:courierId,countryId:countryId,totalWeight:this_weight},
            success: function (data) {
                if (data.data != null && post_data.bordType === 1){
                    // 给pcb明细容器赋值
                    pcb_container.postFee = data.data.shippingCost;
                    public_data.postFee = data.data.shippingCost;
                    quote_price_group.shipping = data.data.shippingCost
                    $("#shippingPrice").val(quote_price_group.shipping);
                    quotePCBTotalPrice();
                } else if (data.data != null && post_data.bordType === 2) {
                    stencil_data.stencil_shippingPrice = quoteSMTStencil.postFee = data.data.shippingCost;
                    console.log("stencil_shippingPrice:"+stencil_data.stencil_shippingPrice);
                    $("#postFees").val(stencil_data.stencil_shippingPrice);
                    quoteSMTStencilSubtotal();
                } else {
                    $("#shippingPrice").val("不支持该配送");
                }
            },
            error: function () {
                layer.msg("Get ShippingCost Fail!!!");
            }
        })
    }

    /**
     * 获取跟单员的信息
     */
    function getMerchandiser(){
        admin.req({
            type: 'post',
            url: setter.baseUrl+'sys/consumer/user/all',
            success: function (data) {
                console.log(data);
                for (var i=0;i<data.data.length;i++){
                    $("#selCustomer").append("<option id="+data.data[i].id+" value="+data.data[i].id+">"+data.data[i].userSystemId+"</option>");
                }
                form.render('select');
            }
        })

    }

    /**
     * Stencil 订单弹出页面
     * @type {{addCustomer: addCustomer}}
     */
    $(".stencilSide").click(function () {
       admin.popup({
           title: 'Stencil Size',
           area: ['60%', '85%'],
           btn: ['确定', '取消'],
           yes: function (layero, index) {
               var stencilList = layui.data('stencilList');     // 获取本地存储 Stencil Size 数据
               stencilSize = stencilList.params;
               stencil_data.stencilSize_price = stencilSize.unitPrice;    //价格
               stencil_data.stencilWeight = stencilSize.weight;    //重量
               stmStencil_container.stencilWeight = stencil_data.stencilWeight; // 右侧 SMT-Stencil 明细容器
               $("#stencilWeight").val(stencil_data.stencilWeight+" KG ");  //页面重量
               stmStencil_container.stencilWeight = stencil_data.stencilSize_price; // 右侧 SMT-Stencil 明细容器
               $("#sunitPrice").val(stencil_data.stencilSize_price);
               $("#inStencilSize").val($("#stenContainer").val());
               getCouriers();
               getCountrys();
               getShippingCost();
               layer.closeAll();
           },
           success: function (layero, index) {
               view(this.id).render("marketManagement/iframeWindow/stencil_size_list",null).done(function () {

               });
           }
       })
    });

    /**
     * 计算PCB Cost 价格
     */
    function quotePCBCost(obj) {
        // pcbTo.pcbCost = 0;
        var pcbCost = 0;
        $.each(obj, function (i, val) {
            var _val = parseFloat(val);
            if (_val == "" || _val == null || isNaN(_val)) {
                obj[i] = 0;
                _val = 0;
            }
            pcbCost += _val;
        });
        pcbTo.pcbCost = pcbCost.toFixed(2);
        console.log(pcbTo);
        $("#pcbCost").val(pcbTo.pcbCost);
        quotePCBTotalPrice();
    }

    /**
     * 计算PCB Phototype 总价
     */
    function quotePCBTotalPrice() {
        var shippingPrice = $("#shippingPrice").val();
        pcbTo.shippingPrice = parseFloat(shippingPrice);
        // console.log("pcbTo.shippingPrice:"+pcbTo.shippingPrice);
        $.each(pcbTo, function (i, val) {
            if (val == "" || val == null || isNaN(val)) {
                pcbTo[i] = 0;
            }
        });
        var pcbCost = parseFloat(pcbTo.pcbCost);
        var shippingPrice = parseFloat(pcbTo.shippingPrice);
        var totalPrice = (pcbCost+shippingPrice).toFixed(2);
        pcbTo.totalPrice = totalPrice;
        // pcb_container.postFee = data.data.shippingCost;
        // public_data.postFee = data.data.shippingCost;
        console.log("totalPrice:"+totalPrice);
        pcb_container.subtotal = pcbTo.totalPrice;
        tp.totalPriced = pcbTo.totalPrice;
        $("#totalPrice").val(pcbTo.totalPrice);
    }


    /**
     * 计算SMT-Stencil 单价
     */
    function quoteSMTStencilSubtotal() {
        var b;
        if (quoteSMTStencil.stencilSide == "Top And Bottom (On Single Stencil)") {
            b=1;
        } else {
            b=2;
        }
        quoteSMTStencil.inStencilCost = quoteSMTStencil.sQuantity*stencil_data.stencilSize_price*b;
        $("#inStencilCost").val(quoteSMTStencil.inStencilCost);
        quoteSMTStencilFuc();
    }
    /**
     * 计算SMT-Stencil 总价
     */
    function quoteSMTStencilFuc() {
        var _this = quoteSMTStencil;
        console.log("inStencilCost:"+_this.inStencilCost);
        var totalPrice = _this.postFee+_this.inStencilCost;
        saveSMTStencil.totalStencilFee = totalPrice;
        tp.totalPricedS = totalPrice;
        $("#stotalPrice").val(totalPrice);
    }

    // 获取右侧表单对象
    function getRig_obj() {
        var _rig_obj = new Object();
        // _rig_obj.mPrice = $("#mPrice").val();               // 平米价
        _rig_obj.enginnerFee = parseFloat($("#enginnerFee").val());     // 工程费
        _rig_obj.boardFee = parseFloat($("#boardFee").val());           // 板费
        _rig_obj.testCostFee = parseFloat($("#testFee").val());             // 飞针费/测试架费
        _rig_obj.toolingFee = parseFloat($("#toolingFee").val());       // 模具费
        _rig_obj.overworkFee = parseFloat($("#urgentFee").val());         // 加急费
        return _rig_obj;
    }

    // 跟单员修改价格参数
    function setRig_obj() {
        var _sub_obj = getRig_obj();    //获取右侧费用明细对象
        var total
    }

    /**
     * 计算Assembly 总价
     */

    /**
     * 清除表单
     */
    function _init_form_rig() {
        $("#inStencilCost").val('');
        $("#shippingPrice").val('');
        $("#totalPrice").val('');
        form.render();
        // $("button[type='reset']").click();
    }
    

    var active = {
        // 重置报价表
        resetQuoteTab: function () {
            $("a[title='刷新']").click();
            layer.msg("重置报价表");
        },
        // 添加客户资料
        addCustomerFile: function () {
            layer.msg("添加客户资料");
        },
        // 添加当前报价
        addThisQuote: function () {
            var quote_data = Object.assign(pcb_rigdetaily,pcb_container);
            console.log(quote_data);
            console.log("userId:"+pcb_container.userId);
            if (pcb_container.userId == null || pcb_container.userId == ""){
                layer.msg("请先选择客户");
                return false;
            } else if (pcb_container.gerberName == null || pcb_container.gerberName == ""){
                layer.tips('请先上传Gerber资料再添加当前报价 !', '#addFile', {
                    tips: [1, '#3595CC'],
                    time: 2000
                });
                return false;
            } else {
                if (tp.totalPric == tp.totalPriced && tp.isQuote == true) {
                    layer.confirm("你已经添加了相同参数的报价，是否再次添加？", function () {
                        admin.req({
                            type: 'post',
                            data: quote_data,
                            url: setter.baseUrl+"epc/pcborder/save",
                            success: function (data) {
                                $("#orderPN").val(data.pn);
                                pcb_container.productNo = data.pn;
                                form.render(null,'checkCustomer');
                                if (data.code != "500"){
                                    layer.alert("你已成功添加当前报价！");
                                }
                            }
                        });
                    });
                } else {
                    admin.req({
                        type: 'post',
                        data: quote_data,
                        url: setter.baseUrl+"epc/pcborder/save",
                        success: function (data) {
                            $("#orderPN").val(data.pn);
                            pcb_container.productNo = data.pn;
                            form.render(null,'checkCustomer');
                            if (data.code != "500"){
                                layer.alert("你已成功添加当前报价！");
                            }
                        }
                    });
                    tp.totalPric = tp.totalPriced;
                    tp.isQuote = true;
                }
            }
        },
        // 查看报价详情
        lookQuote: function () {
            var ids = pcb_container.quoteConfigIds;
            if (public_data.customerAid == null || public_data.customerAid == ""){
                layer.msg("请选择对应的客户");
            } else {
                admin.popup({
                    title: '产看报价详情',
                    area: ['70%', '85%'],
                    btn: ['确定', '取消'],
                    yes: function (layero, index) {
                        layer.closeAll();
                    },
                    success: function (layero, index) {
                        var data = {ids: ''};
                        data.ids = pcb_container.quoteConfigIds;
                        view(this.id).render("marketManagement/iframeWindow/quote_detaily",data).done(function () {
                            $("#sss").text(ids);
                            $("#sss").attr("name",ids);
                            console.log(data);
                        });
                    }
                });
            }
        },
        // 报价
        upSubbtn: function () {
            if (post_data.bordType == '1') {
                if (public_data.customerAid == null || public_data.customerAid == "") {
                    layer.tips('请先选择客户 !', '#selCustomer_container', {
                        tips: [1, '#3595CC'],
                        time: 2000
                    });
                } else {
                    $('.bot-subbtn').click();
                }
            } else if (post_data.bordType === 2) {
                $('.rStencilSubmit').click();
                var postData = Object.assign(saveSMTStencil, stencilSize);
                postData.orderNo = $("#orderNo").val();     //客户PO号
                postData.postFee = quoteSMTStencil.postFee;     //客户PO号
                console.log(postData);
                console.log("saveSMTStencil.gerberPath:"+saveSMTStencil.gerberPath);
                if (postData.userId == null || postData.userId == "") {
                    layer.msg("请先选择客户");
                    return false;
                } else if (postData.gerberName == null || postData.gerberName == "") {
                    layer.tips('请先上传Gerber资料再添加当前报价 !', '#addFile', {
                        tips: [1, '#3595CC'],
                        time: 2000
                    });
                    return false;
                }
                if (tp.totalPricS == tp.totalPricedS && tp.isQuoteS == true) {
                    layer.confirm("你已经添加了相同参数的报价，是否再次添加？", function () {
                        admin.req({
                            type: 'post',
                            data: postData,
                            url: setter.baseUrl+'epc/stencilorder/save',
                            success: function (res) {
                                layer.alert("钢网报价成功！");
                                $("#orderPN").val(res.pn);
                                saveSMTStencil.productNo = res.pn;
                            }
                        });
                    });
                } else {
                    admin.req({
                        type: 'post',
                        data: postData,
                        url: setter.baseUrl+'epc/stencilorder/save',
                        success: function (res) {
                            layer.alert("钢网报价成功！");
                            $("#orderPN").val(res.pn);
                            saveSMTStencil.productNo = res.pn;
                        }
                    });
                    tp.totalPricS = tp.totalPricedS;
                    tp.isQuoteS = true;
                }
            } else if (post_data.bordType === 3) {
                $('.rAssemblySubmit').click();
            }
        }
    };

    var uploadInst = upload.render({
        elem: '#addFile' //绑定元素
        ,url: setter.baseUrl+'sys/oss/upload/geber?access_token='+layui.data('layuiAdmin').access_token//上传接口
        ,field: 'file'  //文件上传的字段名
        ,accept: 'file'
        ,exts: 'zip|rar|7z'
        ,before: function (obj) {
            obj.preview(function (index, file, result) {
                var fileName = file.name;   //文件名
                pcb_container.gerberName = saveSMTStencil.gerberName = fileName;
                console.log("上传的文件名为："+fileName);
                pcb_container.pcbName = saveSMTStencil.pcbName = fileName.substring(0,fileName.indexOf("."));
                if ($("#pcbName").val != null || $("#pcbName").val != ""){
                    $("#pcbName").val(pcb_container.pcbName);
                }
                form.render(null, '');
            });
        }
        ,done: function(res, index, upload){
            //上传完毕回调
            layer.msg("文件上传成功！");
            var url = res.url;
            var r = /\[(.+?)\]/g;
            var filePatha = url.match(r);
            console.log("未处理的路径为："+filePatha);
            var filePath = filePatha[0].replace(/\[|]/g,'');    //去除前后两端的中括号
            pcb_container.gerberPath = saveSMTStencil.gerberPath = filePath;
            console.log("处理完的路径为："+filePath);
        }
        ,error: function(){
            layer.msg("文件上传失败！");
            //请求异常回调
        }
    });

    $('.layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $('.up-rsetbtn').on('click', function () {
        $('.bot-rsetbtn').click();
    });


    /**
     * 数据监听
     */
    // Object.defineProperty(post_data, 'totalWeight',{
    //     set: function (newShipping) {
    //
    //     },
    //     get: function (newShipping) {
    //         this._shipping = newShipping;
    //         console.log("get修改后的shipping为==========>>>>>>>"+this._shipping);
    //     }
    // });

    exports('quote',{})
});