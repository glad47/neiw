/**
 *@Name 报价页
 * _def_disableIn 默认值
 **/

layui.define(['laytpl','layer','setter','form','element'], function (exports) {
    var $ = layui.jquery
        ,form = layui.form
        ,element = layui.element;

    var arr_layer_options = [{text: 1,value: 1},{text: 2,value: 2},{text: 4,value: 4},{text: 6,value: 6},{text: 8,value: 8}];
    var arr_layer_optionst = [{text: 1,value: 1},{text: 2,value: 2}];
    var arr_layer_optionss = [{text: 4,value: 4},{text: 6,value: 6},{text: 8,value: 8}];
    var arr_selkbsy_options = [{text: 'KB', value: 'KB'}, {text: 'SY', value: 'SY'}];
    var arr_selkbsy_optionst = [{text: 'YG', value: 'YG'}];
    var arr_selkbsy_kb = [{text: 'KB6160', value: 'KB6160'}, {text: 'KB6150', value: 'KB6150'}, {text: 'KB6165', value: 'KB6165'}, {text: 'KB6167', value: 'KB6167'}];
    var arr_selkbsy_sy = [{text: 'SY1130', value: 'SY1130'}, {text: 'SY1141', value: 'SY1141'}, {text: 'SY1150', value: 'SY1150'}, {text: 'SY1170', value: 'SY1170'}, {text: 'SY1180', value: 'SY1180'}, {text: 'SY1000', value: 'SY1000'}, {text: 'SY1000-2', value: 'SY1000-2'}, {text: 'SY1600', value: 'SY1600'}];
    var arr_selkbsy_yg = [{text: 'YG0001', value: 'YG0001'}, {text: 'YG0002', value: 'YG0002'}, {text: 'YG0003', value: 'YG0003'}, {text: 'YG0004', value: 'YG0004'}];
    var _MO_data = {
        isDis:{
            itPanelway: true,
            itPanelsize: true
        }
    };
    var _MT_data = {};             //全局变量容器
    _init__MT_data();              //初始化全局变量
    _def_disableIn();              //执行变量
    _MT_oneInput(0);
    _def_layerOptipns("fr4");    // layer下拉内容
    _defkbsy_selOptions();           // kb/sy/yg
    _kbsy_linkage("kb");            // kb/sy/yg联动 默认kb

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
    function _top_quote(e) {
        if (topRadioType === 1){    //Single PCB
            _get_topQuoteParam("singlePCB");
            var areasq = parseFloat(singleSizeX*singleSizeY*quantityPCS)/1000000;
            $("#areasq").val(areasq.toFixed(2));
        } else if (topRadioType === 2){ //Panel as design
            _get_topQuoteParam("panelAsDesign");
            var areasq = parseFloat(panelSizeX*panelSizeY*quantityPanel)/1000000;
            $("#areasq").val(areasq.toFixed(2));
            if (quantityPanel != "" && panelWayX != "" && panelWayY != ""){
                var quantityPcs = Math.ceil(quantityPanel*panelWayX*panelWayY);
                $("#quantityPCS").val(quantityPcs);
            }
        }
    }
    //监听radio==>borderType
    form.on('radio(borderType)',function (data) {
        var this_type = data.value;
        if (this_type == "singlePcb"){
            topRadioType = 1;
            _MT_oneInput(1);
        } else if (this_type == "panelAsDesign"){
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
        if (this_type == "fr4"){
            secondModel_radio = 1;
            _def_layerOptipns("fr4");
            _def_secondModel();
            _defkbsy_selOptions("fr4");
        } else if (this_type == "aluminum"){
            secondModel_radio = 2;
            _def_layerOptipns("aluminum");
            _def_secondModel();
            _defkbsy_selOptions("aluminum");
        } else if (this_type == "fr4+aluminum"){
            secondModel_radio = 3;
            _def_layerOptipns("fr4+aluminum");
            _def_secondModel();
            _defkbsy_selOptions("fr4+aluminum");
        }
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
        if (e == "aluminum"){
            for (var i=0;i < arr_layer_optionst.length;i++){
                var title = arr_layer_optionst[i].text;
                var options_val = arr_layer_optionst[i].value;
                $("#selLayer").append("<option value="+options_val+">"+title+"</option>");
            }
        } else if (e == "fr4") {
            for (var i=0;i < arr_layer_options.length;i++){
                var title = arr_layer_options[i].text;
                var options_val = arr_layer_options[i].value;
                $("#selLayer").append("<option value="+options_val+">"+title+"</option>");
                _def_secondModel(1);
            }
        } else if (e == "fr4+aluminum") {
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
            if (e == "aluminum"){
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
        if (quoteType == "singlePCB"){
            singleSizeX = $("#singleSizeX").val();
            singleSizeY = $("#singleSizeY").val();
            quantityPCS = $("#quantityPCS").val();
        } else if (quoteType == "panelAsDesign"){
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

    exports('quote',{})
});