/**
 *@Name 工程管理-评审初审-编辑PCB订单信息
 **/

layui.define(['admin', 'form', 'element', 'laytpl', 'layer'], function (exports) {
    var $ = layui.jquery
        , view = layui.view
        , form = layui.form
        , admin = layui.admin
        , element = layui.element
        , setter = layui.setter
        , upload = layui.upload
        , layer = layui.layer;
    element.render();
    var arr_layer_options = [{text: 1, value: 1}, {text: 2, value: 2}, {text: 4, value: 4}, {
        text: 6,
        value: 6
    }, {text: 8, value: 8}];
    var arr_layer_optionst = [{text: 1, value: 1}, {text: 2, value: 2}];
    var arr_layer_optionss = [{text: 4, value: 4}, {text: 6, value: 6}, {text: 8, value: 8}];
    var arr_selkbsy_options = [{text: 'KB', value: 'KB'}, {text: 'SY', value: 'SY'}];
    var arr_selkbsy_optionst = [{text: 'YG', value: 'YG'}];
    var arr_selkbsy_kb = [{text: 'KB6160', value: 'KB6160'}, {text: 'KB6150', value: 'KB6150'}, {
        text: 'KB6165',
        value: 'KB6165'
    }, {text: 'KB6167', value: 'KB6167'}];
    var arr_selkbsy_sy = [{text: 'SY1130', value: 'SY1130'}, {text: 'SY1141', value: 'SY1141'}, {
        text: 'SY1150',
        value: 'SY1150'
    }, {text: 'SY1170', value: 'SY1170'}, {text: 'SY1180', value: 'SY1180'}, {
        text: 'SY1000',
        value: 'SY1000'
    }, {text: 'SY1000-2', value: 'SY1000-2'}, {text: 'SY1600', value: 'SY1600'}];
    var arr_selkbsy_yg = [{text: 'YG0001', value: 'YG0001'}, {text: 'YG0002', value: 'YG0002'}, {
        text: 'YG0003',
        value: 'YG0003'
    }, {text: 'YG0004', value: 'YG0004'}];
    var _MO_data = {
        isDis: {
            itPanelway: true,
            itPanelsize: true
        }
    };
    /**
     * 顶部计算模块 --> 参数
     */
    var singleSizeX, singleSizeY, quantityPCS;
    var panelWayX, panelWayY, quantityPanel;
    var panelSizeX, panelSizeY;
    var topRadioType = 1;

    var _MT_data = {};             //全局变量容器
    var selPertDataText = $(".selPertData").attr("data");
    var selPertData = JSON.parse("{"+selPertDataText.replace(/\'/g,"\"")+"}");      // 获取偿还过来的下拉对象，选中动态生成的下拉
    // _init__MT_data();              //初始化全局变量
    _MT_oneInput(selPertData.borderType);
    _def_layerOptipns("FR4");                                       // layer下拉内容
    _defkbsy_selOptions(selPertData.pcbType);                       // kb/sy/yg
    _kbsy_linkage(selPertData.material.toLowerCase());            // kb/sy/yg联动 默认kb
    topRadioType = selPertData.borderType;
    _top_quote();


    //监听radio==>borderType
    form.on('radio(boardType)', function (data) {
        var this_type = data.value;
        $("#areasq").val("");
        if (this_type == "1") {
            topRadioType = 1;
            _MT_oneInput(1);
        } else if (this_type == "2") {
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


    $("#singleSizeX,#singleSizeY,#quantityPCS").bind("input propertychange", function (even) {
        _top_quote();
    });
    $("#panelSizeX,#panelSizeY,#quantityPanel").bind("input propertychange", function (even) {
        if (panelSizeX != null && panelSizeY != null && quantityPanel != null) {
            _top_quote();
        }
    });
    $("#panelWayX,#panelWayY,#quantityPanel").bind("input propertychange", function (even) {
        _top_quote();
    });

    function _top_quote(e) {
        console.log('开始计算');
        if (topRadioType === 1) {    //Single PCB
            _get_topQuoteParam("1");
            var areasq = parseFloat(singleSizeX * singleSizeY * quantityPCS) / 1000000;
            $("#areasq").val(areasq.toFixed(3));
        } else if (topRadioType === 2) { //Panel as design
            _get_topQuoteParam("2");
            var areasq = parseFloat(panelSizeX * panelSizeY * quantityPanel) / 1000000;
            $("#areasq").val(areasq.toFixed(3));
            if (quantityPanel != "" && panelWayX != "" && panelWayY != "") {
                var quantityPcs = Math.ceil(quantityPanel * panelWayX * panelWayY);
                $("#quantityPCS").val(quantityPcs);
            }
        }
    }


    /**
     * 顶部计算，获取input表单值赋给全局变量
     * @param e
     * @private
     */
    function _get_topQuoteParam(e) {
        var quoteType = e;
        if (quoteType == "1") {
            singleSizeX = $("#singleSizeX").val();
            singleSizeY = $("#singleSizeY").val();
            quantityPCS = $("#quantityPCS").val();
        } else if (quoteType == "2") {
            panelWayX = $("#panelWayX").val();
            panelWayY = $("#panelWayY").val();
            quantityPanel = $("#quantityPanel").val();
            panelSizeX = $("#panelSizeX").val();
            panelSizeY = $("#panelSizeY").val();
        }
    }


    /**
     * 默认值--all
     * @private
     */
    function _MT_oneInput(even) {
        // $("#areasq").val("");
        console.log(even);
        if (even === 0) {
            $(".itPanelway input").attr("disabled", _MO_data.isDis.itPanelway);
            $(".itPanelsize input").attr("disabled", _MO_data.isDis.itPanelsize);
        } else if (even === 1) {
            $(".mto-input").removeAttr("disabled", "true");
            $(".itPanelway input").attr("disabled", "disabled");
            $(".itPanelsize input").attr("disabled", "disabled");
            $(".itSinlgesize input").val("");
            $(".itPanelway input").val("");
            $(".itPanelsize input").val("");
        } else if (even === 2) {
            $(".mto-input").removeAttr("disabled", "true");
            $(".itSinlgesize input").attr("disabled", "disabled");
            $(".itSinlgesize input").val("");
        }
    }


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

    /**
     * layer 的下拉内容
     * arr_layer_options
     */
    function _def_layerOptipns(e) {
        $('#selLayer').children().remove();
        if (e == "Aluminum") {
            for (var i = 0; i < arr_layer_optionst.length; i++) {
                var title = arr_layer_optionst[i].text;
                var options_val = arr_layer_optionst[i].value;
                var $html = "";
                console.log(999);
                if (options_val == selPertData.layerNum) {
                    $html += "<option selected value=" + options_val + ">" + title + "</option>";
                } else {
                    $html += "<option value=" + options_val + ">" + title + "</option>";
                }
                $("#selLayer").append($html);
            }
        } else if (e == "FR4") {
            for (var i = 0; i < arr_layer_options.length; i++) {
                var title = arr_layer_options[i].text;
                var options_val = arr_layer_options[i].value;
                var $html = "";
                if (options_val == selPertData.layerNum) {
                    $html += "<option selected value=" + options_val + ">" + title + "</option>";
                } else {
                    $html += "<option value=" + options_val + ">" + title + "</option>";
                }
                $("#selLayer").append($html);
                _def_secondModel(1);
            }
        } else if (e == "FR4+Aluminum") {
            for (var i = 0; i < arr_layer_optionss.length; i++) {
                var title = arr_layer_optionss[i].text;
                var options_val = arr_layer_optionss[i].value;
                var $html = "";
                if (options_val == selPertData.layerNum) {
                    $html += "<option selected value=" + options_val + ">" + title + "</option>";
                } else {
                    $html += "<option value=" + options_val + ">" + title + "</option>";
                }
                $("#selLayer").append($html);
            }
        }
    }


    /**
     * kb/sy/yg的下拉框内容
     * @private
     */
    function _defkbsy_selOptions(e) {
        $('#selMaterial').children().remove();
        if (e == "Aluminum") {
            for (var i = 0; i < arr_selkbsy_optionst.length; i++) {
                var title = arr_selkbsy_optionst[i].text;
                var options_val = arr_selkbsy_optionst[i].value;
                var $html = "";
                if (selPertData.material == options_val) {
                    $html = "<option selected value=" + options_val + ">" + title + "</option>";
                } else {
                    $html = "<option value=" + options_val + ">" + title + "</option>";
                }
                $("#selMaterial").append($html);
            }
            _kbsy_linkage("yg");
        } else {
            for (var i = 0; i < arr_selkbsy_options.length; i++) {
                var title = arr_selkbsy_options[i].text;
                var options_val = arr_selkbsy_options[i].value;
                var $html = "";
                if (selPertData.material == options_val) {
                    $html = "<option selected value=" + options_val + ">" + title + "</option>";
                } else {
                    $html = "<option value=" + options_val + ">" + title + "</option>";
                }
                $("#selMaterial").append($html);
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
        if (e == "kb") {
            for (var i = 0; i < arr_selkbsy_kb.length; i++) {
                var title = arr_selkbsy_kb[i].text;
                var options_val = arr_selkbsy_kb[i].value;
                setKSYchirld(options_val,title);
            }
        } else if (e == "yg") {
            for (var i = 0; i < arr_selkbsy_yg.length; i++) {
                var title = arr_selkbsy_yg[i].text;
                var options_val = arr_selkbsy_yg[i].value;
                setKSYchirld(options_val,title);
            }
        } else if (e == "sy") {
            for (var i = 0; i < arr_selkbsy_sy.length; i++) {
                var title = arr_selkbsy_sy[i].text;
                var options_val = arr_selkbsy_sy[i].value;
                setKSYchirld(options_val,title);
            }
        }
    }

    // 设置KB/SY/YG的联动子选项
    function setKSYchirld(options_val,title) {
        var $html = "";
        if (selPertData.productCode == options_val) {
            $html = "<option selected value=" + options_val + ">" + title + "</option>";
        } else {
            $html = "<option value=" + options_val + ">" + title + "</option>";
        }
        $("#selkbsy").append($html);
        form.render('select');
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
    };

    exports('pert_pcbDetail', {});
});