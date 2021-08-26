/**
 *@Name 报价页
 * _def_disableIn 默认值
 **/

layui.define(['admin','form','element','laytpl','layer','upload', 'jsTools', 'formSelects'], function (exports) {
    var $ = layui.jquery
        ,view = layui.view
        ,form = layui.form
        ,admin = layui.admin
        ,element = layui.element
        ,setter = layui.setter
        ,upload = layui.upload
        ,formSelects = layui.formSelects
        ,jstools = layui.jsTools
        ,layer = layui.layer;
    element.render();
    var arr_layer_options = [{text: 0,value: 0},{text: 1,value: 1},{text: 2,value: 2},{text: 4,value: 4},{text: 6,value: 6},{text: 8,value: 8}];
    var arr_layer_optionst = [{text: 0,value: 0},{text: 1,value: 1},{text: 2,value: 2}];
    var arr_layer_optionss = [{text: 0,value: 0},{text: 4,value: 4},{text: 6,value: 6},{text: 8,value: 8}];
    var arr_selkbsy_options = [{text: 'none', value: 'none'},{text: 'KB', value: 'KB'}, {text: 'SY', value: 'SY'}, {text: 'ventec', value: 'ventec'}];
    var arr_selkbsy_optionst = [{text: 'YG', value: 'YG'}];
    var arr_selkbsy_kb = [{text: 'KB6160', value: 'KB6160'}, {text: 'KB6150', value: 'KB6150'}, {text: 'KB6165', value: 'KB6165'}, {text: 'KB6167', value: 'KB6167'}];
    var arr_selkbsy_sy = [{text: 'SY1130', value: 'SY1130'}, {text: 'SY1141', value: 'SY1141'}, {text: 'SY1150', value: 'SY1150'}, {text: 'SY1170', value: 'SY1170'}, {text: 'SY1180', value: 'SY1180'}, {text: 'SY1000', value: 'SY1000'}, {text: 'SY1000-2', value: 'SY1000-2'}, {text: 'SY1600', value: 'SY1600'}];
    var arr_selkbsy_yg = [{text: 'YG0001', value: 'YG0001'}, {text: 'YG0002', value: 'YG0002'}, {text: 'YG0003', value: 'YG0003'}, {text: 'YG0004', value: 'YG0004'}];
    var arr_selkbsy_ventec = [{text: 'VT-4B3', value: 'VT-4B3'}, {text: 'VT-45', value: 'VT-4B5'}, {text: 'VT-901', value: 'VT-901'}];
    // 切换订单类型需要 显示/隐藏 的html元素 [class]
    var ct_hide = ['totalForm','addQuote'];
    // var arr_surfinish = [{text: 'HASL with lead', value: 'HASL_with_lead'},{text: 'HASL lead free', value: 'HASL_lead_free'},{text: 'Immersion Gold', value: 'Immersion_Gold'},{text: 'Immersion tin', value: 'Immersion_tin'},{text: 'Immersion silver', value: 'Immersion_silver'},{text: 'OSP', value: 'OSP'}];
    // var arr_selsurf_Hash_width_lead = [{text: '2.54-25.4um', value: '2.54-25.4um'}];
    // var arr_selsurf_Immer_tin = [{text: '0.5um-0.7um', value: '0.5um-0.7um'}];
    // var arr_selsurf_Immer_sil = [{text: '≥0.05um', value: '≥0.05um'}];
    // var arr_selsurf_osp = [{text: '0.25-0.5um', value: '0.25-0.5um'}];

    var firstQuote_data = null; // 第一次报价的参数（用来对比第二次的报价，判断是订单类型 新单/返单/返单有改）
    var strOrder = {"1":"新单", "2":"返单", "3":"返单有改"};

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
        courierId: 1,
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

    // 导进的pcb参数对象
    var importParams = {
        importPCBInfo: null
    };
    // 汇率 对象
    var exchangerate = [];
    var def_exchangeRate = 1;   // 汇率默认为 美元 所以为1
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
        quoteGerberName: '', // 正式资料
        quoteGerberPath: '', // 正式资料路径
        pcbName: '',     //客户型号
        orderNo: '',    //客户订单编号
        countries: 'Afghanistan',     //国家  默认Afghanistan
        courierName: def_expressCountry.courierId,    // 快递公司 String
        exchangeId: 1,      // 币种  默认为 => 美元
        unitPrice: '',
        mantissa: 0
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
        exchangeId: 1,                                  // 币种  默认为 => 美元 
    }

    var _MT_data = {};             //全局变量容器
    _init__MT_data();              //初始化全局变量
    _def_disableIn();              //执行变量
    _MT_oneInput(0);
    _def_layerOptipns("FR4");    // layer下拉内容
    _defkbsy_selOptions();           // kb/sy/yg
    _kbsy_linkage("kb");            // kb/sy/yg联动 默认kb
    getMerchandiser();              //获取客户信息
    getExchangerate();              // 获取币种信息

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
        // _get_topQuoteParam(topRadioType);
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
    $("#boardFee").bind("input propertychange", function (even) {
        quoteUnitPrice(0);
    });
    $("#quantityPCS").bind("input propertychange", function (even) {
        quoteUnitPrice(0);
    });
    $("#mPrice").bind("input propertychange", function (even) {
        quoteBoardPrice(parseFloat($(this).val()));
    });
    // 计算单价
    function quoteUnitPrice(_d) {
        console.log("data："+_d)
        var a = parseFloat($("#quantityPCS").val()); // PCS数
        var c = parseFloat($("#areasq").val());     // 面积
        var f = parseFloat($("#boardFee").val());   // 板费
        var unitPrice = parseFloat(f/a).toFixed(3); // 单价
        var mPrice = parseFloat(f/c).toFixed(3);    // 平米价
        console.log("计算单价")
        if (_d == "0") {
            $("#mPrice").val(mPrice);
        } else if (_d == "1") {
            $("#unitPrice").val(unitPrice);
        }
        pcb_container.unitPrice = unitPrice;
        console.log("板费/PCS="+f+"/"+a+"="+unitPrice);
        console.log("mPrice="+c+"/"+f+"="+mPrice);
    }
    // 计算板费
    function quoteBoardPrice(mPrice) {
        var c = parseFloat($("#areasq").val());     // 面积
        var boardPrice = parseFloat(c*mPrice).toFixed(2);
        $("#boardFee").val(boardPrice);
        quoteUnitPrice(1);
    }

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
        _kbsy_linkage(this_type);
    });

    form.on('select(selSurfacefinish)', function (data) {   //Surface finis
        var this_checkVal = data.value;
        if (this_checkVal == "HASL_with_lead" || this_checkVal == "HASL_lead_free") {
            $("#selSurfacethickness").val("2.54-25.4um");
        } else if (this_checkVal == "Immersion_Gold") {
            $("#selSurfacethickness").val("1u");
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
        var this_col_title = data.title.context.innerText;
        if (this_col_title.indexOf('PCB Phototype') != -1) {
            $(".rig-price-cardbody form").removeClass("quote-avtive");
            $(".rig-price").addClass("quote-avtive");
            ctHide(1);
            post_data.bordType = 1;
        } else if (this_col_title.indexOf('SMT-Stencil') != -1) {
            $(".rig-price-cardbody form").removeClass("quote-avtive");
            $("#stencilForm").addClass("quote-avtive");
            ctHide(0);
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
        var optionText = $("#selBuildTime").next(".layui-form-select").find(".layui-this[lay-value='"+ data.value +"']").text();
        pcbTo.shippingPrice = this_price;
        pcb_container.overworkFee = this_price;
        pcb_container.buildTime = optionText;
        $("#urgentFee").val(this_price);
        var obj = getRig_obj(); //获取右侧费用对象
        quotePCBCost(obj);      //计算右侧费用的小计

    });

    // formSelect 监听==>选择 快递
    layui.formSelects.on('selCompany', function (id, vals, val, isAdd, isDisabled) {
        var $thisName = val.name;
        var $thisID = val.value;
        post_data.companyId = $thisID;
        var courierId = post_data.companyId;
        var countryId = post_data.countrysId;
        getShippingCost(courierId,countryId);
    });

    // formSelect 监听==>选择 国家
    layui.formSelects.on('selCountrys', function (id, vals, val, isAdd, isDisabled) {
        var $thisName = val.name;
        var $thisID = val.value;
        post_data.countrysId = $thisID;
        pcb_container.countries = $thisName;     // 国家
        if (post_data.bordType === 2){
            quoteSMTStencilFuc();
        }
        var courierId = post_data.companyId;
        var countryId = post_data.countrysId;
        getShippingCost(courierId,countryId);

    });

    // formSelect 监听==>选择客户
    layui.formSelects.on('selCustomer', function (id, vals, val, isAdd, isDisabled) {
        var $thisName = val.name;
        var $thisID = val.value;
        public_data.customerAid = $thisID;
        pcb_container.userId = saveSMTStencil.userId = $thisID;
        saveSMTStencil.customerSysName = $thisName;
        $("#customerId").val($thisID);
        $("input[name='customerSysName']").val($thisName);
    });

    // 监听   ==>选择订单类型（新单/返单/返单有效）
    form.on('select(filterOrderType)', function (data) {
        pcb_container.orderType = saveSMTStencil.orderType = data.value;
    });

    // 监听 钢网选择 快递
    layui.formSelects.on('selCompanyt', function (id, vals, val, isAdd, isDisabled) {
        post_data.companyId = val.value;
        var courierId = post_data.companyId;
        var countryId = post_data.countrysId;
        getShippingCost(courierId,countryId);
    });

    // 监听 钢网选择 国家
    layui.formSelects.on('selCountryst', function (id, vals, val, isAdd, isDisabled) {
        post_data.countrysId = val.value;
        var courierId = post_data.companyId;
        var countryId = post_data.countrysId;
        getShippingCost(courierId,countryId);
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
    function _kbsy_linkage(material,productCode) {
            $("#selkbsy").children().remove();
            if (material == "KB"){
                for (var i=0;i < arr_selkbsy_kb.length;i++){
                    var title = arr_selkbsy_kb[i].text;
                    var options_val = arr_selkbsy_kb[i].value;
                    $("#selkbsy").append("<option value="+options_val+">"+title+"</option>");
                }
            } else if (material == "YG"){
                for (var i=0;i < arr_selkbsy_yg.length;i++){
                    var title = arr_selkbsy_yg[i].text;
                    var options_val = arr_selkbsy_yg[i].value;
                    $("#selkbsy").append("<option value="+options_val+">"+title+"</option>");
                }
            } else if (material == "SY"){
                for (var i=0;i < arr_selkbsy_sy.length;i++){
                    var title = arr_selkbsy_sy[i].text;
                    var options_val = arr_selkbsy_sy[i].value;
                    $("#selkbsy").append("<option value="+options_val+">"+title+"</option>");
                }
            } else if (material == 'ventec') {
                for (var i=0;i < arr_selkbsy_ventec.length; i++) {
                    var title = arr_selkbsy_ventec[i].text;
                    var options_val = arr_selkbsy_ventec[i].value;
                    $("#selkbsy").append("<option value="+options_val+">"+title+"</option>");
                }
            }
            if (productCode != null || productCode != "") {
                $("#selkbsy").find("option[value='"+productCode+"']").prop("selected",true);
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
        console.log(data)
        console.log('提价表单')
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
        data.exchangeId = pcb_container.exchangeId; // 币种
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
            if (data.surfaceFinish == "Immersion_Gold" && data.surfaceArea == "") {
            layer.msg('请输入沉金面积！');
            return false;
        }
        //发送请求获取价格
        admin.req({
            type: 'post',
            // dataType: 'json',
            url: setter.imUrl+'v1/quote/countAdditionInfo',
            data: data,
            success: function (data) {
                if (data.data.pcbPriceDetail != null && data.data.pcbPriceDetail != ""){
                    if (data.data.pcbPriceDetail.qcidList != null || data.data.pcbPriceDetail.qcidList != ""){
                        public_data.ids = data.data.pcbPriceDetail.qcidList;
                        pcb_container.quoteConfigIds = data.data.pcbPriceDetail.qcidList.join(',');
                        public_data.ids = data.data.pcbPriceDetail.qcidList;
                    }
                }
                // 给pcb明细容器赋值
                pcb_container.engineeringFee = data.data.projectQuoteToUSD;
                pcb_container.boardFee = data.data.totalBoardQuoteToUSD;
                pcb_container.testCostFee = data.data.totalTestPointToUSD;
                pcb_container.toolingFee= data.data.cncAndPunchingQuoteToUSD;
                pcb_container.weight = data.data.totalQuoteWeight;
                pcb_container.unitPrice = data.data.unitPrice;
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
            async: false,
            url: setter.imUrl+'v1/quote/getBuildTime',
            data: {areaSq:areaSq,layerNum: layerNum,'exchangeId':pcb_container.exchangeId},
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
        admin.req({
            type: 'post',
            url: setter.imUrl+'v1/quote/getCouriers',
            async: false,
            success: function (data) {
                $("select[id='"+SelectId+"'] option").remove();
                formSelects.render(SelectId)
                post_data.companyId = data.data[0].id;
                for (var i=0;i<data.data.length;i++){
                    $("select[xm-select='"+SelectId+"']").append("<option value="+data.data[i].id+">"+data.data[i].courierName+"</option>");
                    def_expressCountry.courierId = data.data[0].id;  //默认选中 快递id赋值
                    post_data.companyId = def_expressCountry.courierId;
                }
                formSelects.render(SelectId);
                formSelects.value(SelectId, [data.data[0].id]);
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
        formSelects.render(SelectId)
        form.render();
        admin.req({
            type: 'post',
            async: false,
            url: setter.imUrl+'v1/quote/getCountry',
            success: function (data) {
                post_data.countrysId = data.data[0].id;
                for (var i=0;i<data.data.length;i++){
                    $("select[xm-select='"+SelectId+"']").append("<option value="+data.data[i].id+">"+data.data[i].name+"</option>");
                    def_expressCountry.countryId = data.data[0].id; //默认选中 国家id
                    post_data.countrysId = def_expressCountry.countryId;
                }
                form.render();
                formSelects.render(SelectId);
                formSelects.value(SelectId, [data.data[0].id]);
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
            url: setter.imUrl+'v1/quote/getShippingCost',
            data: {courierId:courierId,countryId:countryId,totalWeight:this_weight,exchangeId:pcb_container.exchangeId},
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
                for (var i=0;i<data.data.length;i++){
                    $("select[xm-select='selCustomer']").append("<option id="+data.data[i].id+" value="+data.data[i].id+">"+data.data[i].userSystemId+"</option>");
                }
                formSelects.render('selCustomer');
                form.render('select');
            }
        })
    }

    /**
     * 查询所有汇率
     */
    function getExchangerate() {
        admin.req({
            type: 'post',
            url: setter.baseUrl+'market/exchangerate/all',
            success: function (res) {
                var $html;
                for (var i=0;i<res.data.length;i++){
                    $html += "<option id="+res.data[i].id+" value="+res.data[i].id+">"+res.data[i].currency+"</option>"
                    exchangerate.push(res.data[i]);
                }
                $("select[xm-select='exchangeId']").append($html);
                form.render('select');
                formSelects.render('exchangeId');
                formSelects.value('exchangeId',[res.data[0].id]);
            }
        });
    }
    // 监听选择汇率
    layui.formSelects.on('exchangeId', function (id, vals, val, isAdd, isDisabled) {
        pcb_container.exchangeId = val.value;
        saveSMTStencil.exchangeId = val.value;
        var courierId = post_data.companyId;
        var countryId = post_data.countrysId;
        var _currency = exchangerate.find(item => item.id == val.value).currency;   // 币种
        if (_currency == "USD") {   // 因为默认是美元，所当币种为美元的时候，汇率为1。
            def_exchangeRate = 1;
        } else if (_currency == "CNY") {    // 当币种为人民币的时候，汇率应当按美元的汇率
            def_exchangeRate = exchangerate.find(item => item.currency == "USD").exchangeRate;
        } else {
            def_exchangeRate = exchangerate.find(item => item.currency == _currency).exchangeRate;
        }
        getShippingCost(courierId,countryId);
    });
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
               view(this.id).render("marketManagement/iframeWindow/stencil_size_list",{'exchangeId':pcb_container.exchangeId}).done(function () {

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
        $("#pcbCost").val(pcbTo.pcbCost);
        quotePCBTotalPrice();
    }

    /**
     * 计算PCB Phototype 总价
     */
    function quotePCBTotalPrice() {
        var shippingPrice = $("#shippingPrice").val();
        pcbTo.shippingPrice = parseFloat(shippingPrice);
        $.each(pcbTo, function (i, val) {
            if (val == "" || val == null || isNaN(val)) {
                pcbTo[i] = 0;
            }
        });
        var pcbCost = parseFloat(pcbTo.pcbCost);
        var shippingPrice = parseFloat(pcbTo.shippingPrice);
        var totalPrice = (pcbCost+shippingPrice).toFixed(2);
        pcbTo.totalPrice = totalPrice;
        pcb_container.subtotal = pcbCost;
        tp.totalPriced = pcbTo.totalPrice;
        $("#totalPrice").val(pcbTo.totalPrice);
    }


    /**
     * 遍历获取pcb小计
     * @returns {number}
     */
    function getEachPCBCost() {
        var _val = 0;
        $.each($("input[class='pcb-fee']"), function () {
            var this_val = $(this).val();
            if (isNaN(this_val) || this_val == "") {
                this_val = 0;
            }
            _val += parseFloat(this_val);
        });
        return _val;
    }


    // Stencil 重量编辑
    var triggerStencilWeight;
    $("#stencilWeight").bind("input propertychange", function (even) {
        stencil_data.stencilWeight = $(this).val();
        clearTimeout(triggerStencilWeight);
        triggerStencilWeight = setTimeout(function () {
            getShippingCost();
        }, 800);
    });

    /**
     * 计算SMT-Stencil 单价
     */
    function quoteSMTStencilSubtotal() {
        var b;
        if (quoteSMTStencil.stencilSide == "Top And Bottom (On Single Stencil)" || quoteSMTStencil.stencilSide == "Top" || quoteSMTStencil.stencilSide == "Bottom") {
            b=1;
        } else {
            b=2;
        }
        // 钢网总价 = 钢网数量 * 单价 * 层数 * 汇率
        quoteSMTStencil.inStencilCost = quoteSMTStencil.sQuantity*stencil_data.stencilSize_price*b*def_exchangeRate;
        $("#inStencilCost").val(quoteSMTStencil.inStencilCost);
        quoteSMTStencilFuc();
    }
    /**
     * 计算SMT-Stencil 总价
     */
    function quoteSMTStencilFuc() {
        var _this = quoteSMTStencil;
        var totalPrice = _this.postFee+_this.inStencilCost;
        saveSMTStencil.totalStencilFee = totalPrice;
        tp.totalPricedS = totalPrice;
        $("#stotalPrice").val(totalPrice);
        doBackUnitStencil();
    }

    /**
     * SMT-Stencil 单价回显
     * @returns {Object}
     */
    function doBackUnitStencil() {
        var cost = parseInt($("#inStencilCost").val());
        var quantity = parseInt($("#stencil_quantity").val());
        var sunitPrice = (cost/quantity).toFixed(3);
        stencilSize.unitPrice = sunitPrice;
        $("#sunitPrice").val(sunitPrice);
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
            $(".up-subbtn").click();
            $("*[lay-filter='quoteForm']").click();
            var quote_data = Object.assign(pcb_rigdetaily,pcb_container);
            //console.log(quote_data);
            if (parseFloat(quote_data.areaSq) > 15 && quote_data.pcbType === 'Aluminum' && quote_data.toolingFee === 0) {
                    layer.confirm('此板为铝基板,请确认是否需要开模具？', {
                    btn: ['确定', '取消']
                }, function () {
                    return true;
                }, function () {
                    layer.closeAll();
                    return false;
                });
            }
            if (pcb_container.userId == null || pcb_container.userId == "") {
                layer.msg("请先选择客户");
                return false;
            } else if (pcb_container.gerberName == null || pcb_container.gerberName == ""){
                layer.tips('请先上传Gerber资料再添加当前报价 !', '#addFile', {
                    tips: [1, '#3595CC'],
                    time: 2000
                });
                return false;
            } else {
                // if (importParams.importPCBInfo) {
                //     var orderTypeObj = {"A":null,"B":null};
                //     orderTypeObj.A = quote_data;
                //     orderTypeObj.B = importParams.importPCBInfo;
                //     quote_data.orderType = contrastOrder(orderTypeObj);    // 获取订单类型
                // } else {
                //     quote_data.orderType = 1;       // 新单
                // }
                // if (firstQuote_data == null) {  // 给第一次报价的对象赋值
                //     firstQuote_data = quote_data;
                // } else {    // 不为空的情况下，两个对象进行对比
                //     var orderTypeObj = {"A":null,"B":null};
                //     orderTypeObj.A = quote_data;
                //     orderTypeObj.B = firstQuote_data;
                //     quote_data.orderType = contrastOrder(orderTypeObj);    // 获取订单类型
                // }
                var progress = $("button[data-type='addCustomerFile']").attr("data");
                if (progress != '100%') {
                    layer.msg('等待文件上传完毕，当前进度：' + progress);
                    return false;
                } else if (progress == '100%') {
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
                                    if (data.code != "500") {
                                        layer.alert("添加报价成功["+strOrder[quote_data.orderType]+"]");
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
                                    layer.alert("添加报价成功["+strOrder[quote_data.orderType]+"]");
                                }
                            }
                        });
                        tp.totalPric = tp.totalPriced;
                        tp.isQuote = true;
                    }
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

    var $progress = $(".customerProgress");
    var $progressShow = $("button[data-type='lookQuote']");
    var uploadInst = upload.render({
        elem: '#addFile' //绑定元素
        ,url: setter.baseUrl+'sys/oss/upload/geber?access_token='+layui.data('layuiAdmin').access_token//上传接口
        ,field: 'file'  //文件上传的字段名
        ,accept: 'file'
        ,exts: 'zip|rar|7z'
        ,progress: function (n) {
            $progress.fadeIn();
            $progress.css({
               width: n+'%'
            });
            $progressShow.text(n + '%');
            $("button[data-type='addCustomerFile']").attr("data",n + '%');
        }
        ,before: function (obj) {
            obj.preview(function (index, file, result) {
                var fileName = file.name;   //文件名
                pcb_container.gerberName = saveSMTStencil.gerberName = fileName;
                pcb_container.pcbName = saveSMTStencil.pcbName = jstools.CleanFileSuffix(fileName);
                if ($("#pcbName").val != null || $("#pcbName").val != ""){
                    $("#pcbName").val(pcb_container.pcbName);
                }
                form.render(null, '');
            });
        }
        ,done: function(res, index, upload){
            if(res.code != 0){
               layer.msg(res.msg);
               return; 
            }
            //上传完毕回调
            layer.msg("文件上传成功！");
            $progress.fadeOut();
            $progressShow.text("详情");
            var url = res.url;
            var r = /\[(.+?)\]/g;
            var filePatha = url.match(r);
            console.log("未处理的路径为："+filePatha);
            var filePath = filePatha[0].replace(/\[|]/g,'');    //去除前后两端的中括号
            pcb_container.gerberPath = saveSMTStencil.gerberPath = filePath;
            console.log("处理完的路径为："+filePath);
            layer.closeAll();
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
    
    // 2019-04-17 导入pcb订单信息
    $(".importPcbInfo>.importOrder").on('click', function () {
        admin.popup({
            title: '导入pcb订单信息'
            ,area: ['506px','506px']
            ,btn: ['导入', '取消']
            ,yes: function (layero, index) {
                $("#importPCBInfo").click();
                layer.closeAll();
            }
            ,success: function (layero, index) {
                view(this.id).render('marketManagement/iframeWindow/import_pcbInfoForm').done(function () {
                    formSelects.render()
                    //  监听表单提交
                    form.on('submit(importPCBInfo)', function (data) {
                        admin.req({
                            type: 'post',
                            url: setter.baseUrl+ 'pert/revieworder/reviewOrderInfo',
                            data: data.field,
                            success: function (res) {
                                var importPcbInfo = res.data;
                                if (importPcbInfo != null) {
                                    getBuildTime();getCouriers();getCountrys();    // 获取国家快递信息
                                    setAllInput(importPcbInfo);
                                } else {
                                    layer.alert('当前不存在PCB参数详情！');
                                }
                                layer.close(index);
                            }
                        });
                        return false;
                    });
                });
            }
        });
    });
    
    // 导入返单信息
    $(".importPcbInfo>.importReOrder").on('click', function () {
        admin.popup({
            title: '导入返单信息'
            ,area: ['506px','506px']
            ,btn: ['导入', '取消']
            ,id: 'popupImportReOrder'
            ,yes: function (layero, index) {
                $("#importRePCBInfo").click();
                layer.closeAll();
            }
            ,success: function (layero, index) {
                view(this.id).render('marketManagement/iframeWindow/import_pcbInfoReOreder').done(function () {
                   form.on('submit(importRePCBInfo)', function (data) {
                       var postData = data.field;
                       admin.req({
                           type: 'post',
                           url: setter.baseUrl+'epc/pcborder/findOrderByUidAndProductNo',
                           data: {'id':postData.productNo},
                           success: function (res) {
                               var importPcbInfo = res.data;
                               if (importPcbInfo != null) {
                                   importPcbInfo.mantissa = postData.mantissa;
                                   getBuildTime();getCouriers();getCountrys();    // 获取国家快递信息
                                   console.log(importPcbInfo);
                                   setAllInput(importPcbInfo);
                               } else {
                                   layer.alert('当前不存在PCB参数详情！');
                               }
                               layer.close(index);
                           }
                       });
                       return false;
                   });
                });
            }
        })
    });

    /**
     * 实现：导入参数给页面表单赋值
     * 1、接收 importPcbInfo 对象，
     * 2、一次性遍历两个表单里的input和select
     * 3、遍历时获取当前的name属性
     * 4、通过获取到的name属性和 获取importPcbInfo 对象里面的键[name]对应的key值，并赋给当前dom的val值
     * @param importPcbInfo
     */
    function setAllInput(importPcbInfo) {
        importParams.importPCBInfo = importPcbInfo;
        $("#inside_quote_all input,#inside_quote_all select").each(function () {
            var $name = $(this).attr("name");
            var $Pthis = $(this);
            var $Pthis_type = $(this).attr("type");
            if (isNaN(importPcbInfo[$name]) || importPcbInfo[$name] == "" || importPcbInfo[$name] == null) {    // 判断k值是否为空值，则为0
                if ($Pthis.parents(".rig-price").length>0) {    // 判断是否为右侧的价格下的input
                    importPcbInfo[$name] = 0;
                }
            }
            if ($Pthis.is("input")) {
                if ($Pthis_type == "text" || $Pthis_type == "number") {
                    $Pthis.val(importPcbInfo[$name]);
                } else if ($Pthis_type == 'checkbox') {
                    $("input[type=checkbox][name="+$name+"][value='"+importPcbInfo[$name]+"']").attr("checked","checked");
                } else if ($Pthis_type == "radio") {
                    $("input[name="+$name+"][value='"+importPcbInfo[$name]+"']").prop("checked","checked");
                    if ($name == "boardType") {     // 单独判断板类型 ==> 用于表单的 启/禁用
                        _MT_oneInput(importPcbInfo["boardType"]);
                        topRadioType = importPcbInfo["boardType"];  // 去掉会导致导入订单后无法计算面积
                    }
                }
            }
            if ($Pthis.is("select")) {
                // $("select[name="+$name+"]").find("option:contains('"+importPcbInfo[$name]+"')").attr("selected",true);
                $("select[name='"+$name+"'] option[value='"+importPcbInfo[$name]+"']").attr("selected",true);
                // 特殊处理下拉[普通下拉]，根据value选中
                if ($name == "nOfPp" || $name == "countries") {
                    $("select[name='"+$name+"'] option[value='"+importPcbInfo[$name]+"']").attr("selected",true);
                }
            }
            // 特殊处理表单
            $("*[name='remark']").val(importPcbInfo["remark"]);
            // 由于获取的是客户id，选择客户单独处理
            if ($name == "userId") {
                $("select[name='userId']").find("option[id="+importPcbInfo['userId']+"]").attr("selected",true);
                $("input[name='customerId']").val(importPcbInfo['userId']);
                pcb_container.userId = public_data.customerAid = importPcbInfo['userId'];
            }
            // pcb_container[$name] = importPcbInfo[$name];
        });
        // 特殊处理下拉[多级联动 KB&SY]
        _kbsy_linkage(importPcbInfo['material'],importPcbInfo['productCode']);
        // userid表单赋值，不然报价后台会抛出500错误
        $("input[name='customerSysName']").val($("#selCustomer").find("option:selected").text());
        // 给保存报价的对象赋值
        pcb_container.userId = public_data.customerAid = importPcbInfo['userId'];
        pcb_container.gerberName = importPcbInfo['gerberName'];
        pcb_container.gerberPath = importPcbInfo['gerberPath'];
        pcb_container.pcbName = saveSMTStencil.pcbName = importPcbInfo['pcbName'];
        pcb_container.productNo = importPcbInfo['productNo'];
        pcb_container.countries = post_data.countrysId = importPcbInfo['countries'];
        pcb_container.postFee = importPcbInfo['postFee'];
        pcb_container.quoteGerberName = importPcbInfo['quoteGerberName'];//报价资料
        pcb_container.quoteGerberPath = importPcbInfo['quoteGerberPath'];
        pcb_container.productionGerberName = importPcbInfo['productionGerberName'];//生产资料
        pcb_container.productionGerberPath = importPcbInfo['productionGerberPath'];

        pcb_container.mantissa = importPcbInfo['mantissa'];
        // 绑定客户id和客户名
        var userId = $("dl[xid='selCustomer']").children(".xm-select-this").attr("lay-value");
        var customerSysName = $("dl[xid='selCustomer'] .xm-select-this").find("span").attr("name");
        $("#customerId").val(userId);
        $("input[name='customerSysName']").val(customerSysName);
        // $("select[name='nOfPp'] option[value='3']").attr("selected",true);
        // 总价
        var $pcbcost = parseFloat($("input[name='subtotal']").val());
        var $postFee = parseFloat($("input[name='postFee']").val());
        if (isNaN($pcbcost) || $pcbcost == "") {
            $pcbcost = 0;
        }
        if (isNaN($postFee) || $postFee == "") {
            $postFee = 0;
        }
        var $pabtotal = $pcbcost+$postFee;
        $("input[id='totalPrice']").val($pabtotal);
        form.render();
        // 对象合并对比
        $('.bot-subbtn').click();
        var def_obj = Object.assign(pcb_rigdetaily,pcb_container);  // 默认要添加当前报价的对象
        // 特殊处理下拉[formSelects] ==> 国家、快递
        var countries,courierId;
        countries =importPcbInfo['countries'];
        courierId =importPcbInfo['courierId'];
        formSelects.value('selCompany',[1]);
        formSelects.value('selCountrys',[countries]);
        layer.msg('导入PCB信息成功');
    }

    /**
     * 对比数据，判断订单类型 0新单，1返单，2返单有改
     * @param quote_data
     * @param importPcbInfo
     * @returns {*}
     */
    // function contrastOrder(orderTypeObj) {
    //     var filterStrA = flagStr();
    //     var orderType;
    //     var qflag,iflag;
    //     var stop;
    //     // 特殊处理字段
    //     orderTypeObj.A.customerSysName = orderTypeObj.B.customerSysName;
    //     $.each(orderTypeObj.A,function (qk,qv) {
    //         if (qv == "" || qv == null || qv == "none") {       // 所有空值类型都过滤掉
    //             qflag = true;
    //         } else {
    //             qflag = false;
    //         }
    //         $.each(orderTypeObj.B,function (ik,iv) {
    //             if (iv == "" || iv == null || iv == "none") {       // 所有空值类型都过滤掉
    //                 iflag = true;
    //             } else {
    //                 iflag = false;
    //             }
    //             if (qk == ik) {
    //                 var aa = filterStrA.fd.indexOf(qk);
    //                 var bb = filterStrA.fdyg.indexOf(qk);
    //                 if (qv == iv) {
    //                     orderType = 2;
    //                 } else if (qflag && iflag) {
    //                     orderType = 2;
    //                 } else if (qv != iv && filterStrA.fd.indexOf(qk) == "-1" || filterStrA.fdyg.indexOf(qk) == "-1") {
    //                     console.log("key值不同的q["+qk+","+qv+"],i["+ik+","+iv+"]");
    //                     if (filterStrA.fdyg.indexOf(qk) >= 0) {
    //                         orderType = 3;
    //                         stop = true;
    //                     } else {
    //                         orderType = 2;
    //                     }
    //                 }
    //             }
    //         });
    //         if (stop == true) {
    //             return false;
    //         }
    //     });
    //     console.log("orderType:===>"+orderType);
    //     formSelects.value("orderType", orderType);
    //     return orderType;
    // }

    function flagStr() {
        var fd = "";
        var fdyg = "";
        $(".top-m-one input").each(function () {
            if (typeof $(this).attr("name") != "undefined") {
                fd += ","+$(this).attr("name");
            }
        });
        $(".top-price-one input").each(function () {
            if (typeof $(this).attr("name") != "undefined") {
                fd += ","+$(this).attr("name");
            }
        });
        $(".center-m-two input").each(function () {
            if (typeof $(this).attr("name") != "undefined") {
                fdyg += ","+$(this).attr("name");
            }
        });
        $(".center-m-two select").each(function () {
            if (typeof $(this).attr("name") != "undefined") {
                fdyg += ","+$(this).attr("name");
            }
        });
        var fdObj = {"fd":fd,"fdyg":fdyg};
        return fdObj;
    }

    // 计算运费
    $(".importPcbInfo>.quotePostFee").on('click', function () {
        admin.popup({
            title: '运费计算'
            ,area: ['660px','322px']
            ,btn: ['清空','返回']
            ,id: 'popupQuotePostFee'
            ,yes: function () {
                layer.msg('清空数据')
                $("#quotePostFeeRest").click();
            },
            btn1: function () {
                layer.closeAll();
            }
            ,success: function (layero, index) {
                view(this.id).render('marketManagement/iframeWindow/quote_postFee').done(function () {
                    form.render();
                });
            }
        })
    });

    /**
     *  遍历 ct_hide 数组 显示/隐藏表单[class, 切换订单类型的时候]
     */
    function ctHide(type) {
        var type = type;
        if (type === 0) {
            for (var i=0;i<ct_hide.length;i++) {
                $("."+ct_hide[i]).hide();
            }
        } else if (type === 1) {
            for (var i=0;i<ct_hide.length;i++) {
                $("."+ct_hide[i]).show();
            }
        }
    }

    exports('quote',{})
});