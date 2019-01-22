/**
 *@Name 报价页
 * _def_disableIn 默认值
 **/

layui.define(['laytpl','layer','setter','form'], function (exports) {
    var $ = layui.jquery
        ,form = layui.form;
        _def_disableIn();

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
    function _top_quote() {
        if (topRadioType === 1){    //Single PCB
            _get_topQuoteParam("singlePCB")
            var areasq = parseFloat(singleSizeX*singleSizeY*quantityPCS)/1000000;
            $("#areasq").val(areasq.toFixed(2));
        } else if (topRadioType === 2){ //Panel as design
            _get_topQuoteParam("panelAsDesign")
            var areasq = parseFloat()
        }
    }
    //监听radio
    form.on('radio(borderType)',function (data) {
        var this_type = data.value;
        if (this_type == "singlePcb"){
            topRadioType = 1;
            _disable_topInput(1);
        } else if (this_type == "panelAsDesign"){
            topRadioType = 2;
            _disable_topInput(2);
        } else if (this_type == "panelByPcbonline"){
            _disable_topInput(3);
        }
    });


    /**
     * 默认值
     * @private
     */
    function _def_disableIn(){
            $(".itPanelway input").attr("disabled","disabled");
            $(".itPanelsize input").attr("disabled","disabled");
            $("#selHc").attr("disabled","disabled");
            $("#selInlayercoopper").attr("disabled","disabled");
            $("#selMintrack").attr("disabled","disabled");
            $("#selNofcore").attr("disabled","disabled");
            $("#selMinspaccing").attr("disabled","disabled");
            $("#selNofpp").attr("disabled","disabled");
            $("#radioSinglePcb").attr("checked","true");
            $("#ptfr4").attr("checked","true");
            $("#routingOne").attr("checked","true");
            // Select下拉
            $("#selLayer").val("2");
            $("#selFinishThickness").val("1.6mm");
            $("#selMaterial").val("KB");
            $("#selkbsy").val("KB6160");
            $("#selTg").val("135");
            $("#selHf").val("NO");
            $("#selHc").val("none");
            $("#selInlayercoopper").val("none");
            $("#selMintrack").val("none");
            $("#selNofcore").val("none");
            $("#selMinspaccing").val("none");
            $("#selNofpp").val("none");
            $("#selOuterlayercopper").val("1oz");
            $("#selMintrackb").val("5mil");
            $("#selBgasize").val("0.30");
            $("#selMinspacing").val("5mil");
            $("#selMinholesize").val("0.3");
            $("#selPthcopper").val("20um");
            $("#selSoldermc").val("green");
            $("#selViaprocess").val("Follow_gerber");
            $("#selSilksc").val("green");
            $("#selPeelable").val("none");
            $("#selSurfacefinish").val("HASL_with_lead");
            $("#selTestcost").val("1");
            form.render();
        }

    /**
     * 切换radio改变的input的属性
     * @param e
     * @private
     */
    function _disable_topInput(e){
        var borderType = e;
        $("#areasq").val("");
        if (borderType === 1){
            $(".top-quote * input").removeAttr("disabled","true");
            $(".itPanelway input").attr("disabled","disabled");
            $(".itPanelsize input").attr("disabled","disabled");
            $(".itPanelway input").val("");
            $(".itPanelsize input").val("");
        } else if (borderType === 2){
            $(".top-quote * input").removeAttr("disabled","true");
            $(".itSinlgesize input").attr("disabled","disabled");
            $(".itSinlgesize input").val("");
        } else if (borderType === 3){
            location.href="";
        }
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

    exports('quote',{})
});