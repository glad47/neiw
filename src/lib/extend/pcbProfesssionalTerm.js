/**
 * PCB 专业术语 转中文
 */
layui.define(['admin', 'index'],function (exports) {
    var $ = layui.jquery,
    admin = layui.admin;
    var solderMaskTopColor = {cname: '阻焊颜色', green: '绿色', black: '黑色', white: '白色', yellow: '黄色', red: '红色', blue: '蓝色', matte_black: '哑黑', matte_green: '哑绿', milky_white: '乳白色', none: 'none'};
    var silkScreenTopColor = {cname:'字符颜色', green: '绿色', black: '黑色', white: '白色', yellow: '黄色', red: '红色', matte_black: '哑黑', matte_green: '哑绿', matte_gray: '哑灰', none: 'none'};
    var halogenFree = {cname: '无卤素'};
    var viaProcess = {cname: '过孔方式', tenting: '盖油', plugged: '塞孔', vias_not_covered: '开窗', Follow_gerber: '按资料', none: '无'};
    var testWay = {cname: '测试方式', testPointType: [{1: '飞针'}, {2: '测试架'}], none: '无'};
    var surfaceFinish = {cname: '表面处理', HASL_with_lead: '有铅喷锡', HASL_lead_free: '无铅喷锡', Immersion_Gold: '沉金', Immersion_tin: '沉锡', Immersion_silver: '沉银', OSP: 'OSP', none: '无'};
    var thickness = {cname: '表面处理厚度'};
    var blindHoles = {cname: '盲孔', 1: '是', 0: '否'};
    var edgePlated = {cname: '金属包边', 1: '是', 0: '否'};
    var halfHoleLated = {cname: '半孔', 1: '是', 0: '否'};
    var contrlImpeance = {cname: '阻抗', 1: '是', 0: '否'};
    var deepMillRouting = {cname: '控深锣', 1: '是', 0: '否'};
    var carbon = {cname: '碳油', 1: '是', 0: '否'};
    var bevellingCamfer = {cname: '斜边', 1: '是', 0: '否'};
    exports('pcbProfesssionalTerm', obj)
})