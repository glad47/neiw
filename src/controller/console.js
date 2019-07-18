/**

 @Name：layuiAdmin 主页控制台
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL
    
 */


layui.define(function(exports){
  
  /*
    下面通过 layui.use 分段加载不同的模块，实现不同区域的同时渲染，从而保证视图的快速呈现
  */
  //区块轮播切换
  layui.use(['admin', 'carousel'], function(){
    var $ = layui.$
    ,admin = layui.admin
    ,carousel = layui.carousel
    ,element = layui.element
    ,device = layui.device();

    //轮播切换
    $('.layadmin-carousel').each(function(){
      var othis = $(this);
      carousel.render({
        elem: this
        ,width: '100%'
        ,arrow: 'none'
        ,interval: othis.data('interval')
        ,autoplay: othis.data('autoplay') === true
        ,trigger: (device.ios || device.android) ? 'click' : 'hover'
        ,anim: othis.data('anim')
      });
    });
    
    element.render('progress');
    
  });

  //数据概览
  layui.use(['carousel', 'echarts','admin'], function(){
    var $ = layui.$
    ,carousel = layui.carousel
    ,echarts = layui.echarts
    ,admin = layui.admin
    ,set = layui.setter;

    //发送请求
    admin.req({
      type:'get',
      url:set.baseUrl+'allGraphs/monthlySales',
      success: function (res) {
          // console.log(res.data);
          var result = lineChartCheckData(res.data);
          // console.log(result);
          var result3 =lineChartCheckData(res.userData);
          // console.log(result3);
          var result4 = barChartCheckData(res.data);
          //填充数据
          fillData(result,res.pieOrder,result3,result4);
      }
    });

    function fillData(data1,data2,data3,data4){
      // var series =[],legend=[];
      // data.data.forEach(function(x){
      //   var d = [];
      //   x.series.forEach(function(y){
      //     for(var i in y){
      //       d.push(y[i]);
      //     }
      //   })
      //   var s = {};
      //   //d.name = x.name;
      //   s.data = d;
      //   s.type = 'line';
      //   s.name = x.name;
      //   series.push(s);
      //   legend.push(x.name);
      // });
      // console.log(series);
      var currentYear = new Date().getFullYear();
      var echartsApp = [], options = [
        //今年月销售额
        {
          title: {
            text: currentYear+'年跟单员月销售额',
            x: 'left',
            textStyle: {
              fontSize: 14
            }
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:data1.legendData
          },
          xAxis : [{
            type : 'category',
            boundaryGap : false,
            data: data1.months
          }],
          yAxis : [{
            type : 'value',
            axisLabel : {
              formatter: '$ '+'{value}'
            }
          }],
          series : data1.seriesData
        },
        //总的月销售额
        {
          title : {
            text: currentYear+'年每月总销售额',
            subtext: '单位（$）'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['月销售额']
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'月销售额',
              type:'bar',
              data:data4,
              // markPoint : {
              //   data : [
              //     {type : 'max', name: '最大值'},
              //     // {type : 'min', name: '最小值'}
              //   ]
              // },
              // markLine : {
              //   data : [{type : 'average', name: '平均值'}]
              // }
            }
          ]
        },
        //访客浏览器分布
        { 
          title : {
            text: '跟单员销售额分布图',
            x: 'center',
            textStyle: {
              fontSize: 14
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : ${c} ({d}%)"
          },
          legend: {
            orient : 'vertical',
            x : 'left',
            data: data1.legendData
          },
          series : [{
            name:'销售额',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:data2
          }]
        },
        
        //新增的用户量
        {
          title: {
            text: currentYear+'年跟单员月客户数',
            x: 'left',
            textStyle: {
              fontSize: 14
            }
          },
          tooltip : { //提示框
            trigger: 'axis',
            //formatter: "{b}<br>用户数：{c}"
          },
          legend: {
            data:data3.legendData
          },
          xAxis : [{ //X轴
            type : 'category',
            boundaryGap : false,
            data : data3.months
          }],
          yAxis : [{  //Y轴
            type : 'value'
          }],
          series : data3.seriesData
        }
      ]
      ,elemDataView = $('#LAY-index-dataview').children('div')
      ,renderDataView = function(index){
        echartsApp[index] = echarts.init(elemDataView[index], layui.echartsTheme);
        echartsApp[index].setOption(options[index]);
        window.onresize = echartsApp[index].resize;
      };

      //没找到DOM，终止执行
      if(!elemDataView[0]) return;
      
      renderDataView(0);

      //监听数据概览轮播
      var carouselIndex = 0;
      carousel.on('change(LAY-index-dataview)', function(obj){
        renderDataView(carouselIndex = obj.index);
      });

        //监听侧边伸缩
      layui.admin.on('side', function(){
        setTimeout(function(){
          renderDataView(carouselIndex);
        }, 300);
      });
    
      //监听路由
      layui.admin.on('hash(tab)', function(){
        layui.router().path.join('') || renderDataView(carouselIndex);
      });

    }

    
   //柱状图数据拼接 
    function barChartCheckData(data){
      var result = [0,0,0,0,0,0,0,0,0,0,0,0];
      data.forEach(function(d){
          for (var i = d.data.length - 1; i >= 0; i--) {
            result[i] = Math.round(result[i]*100+d.data[i]*100)/100;
          }
      });
      // console.log(result);
      return result;
    }
  

    //折线图数据拼接
    function lineChartCheckData(data){
     var successData = {};
     var currentYear = new Date().getFullYear();
     var mKey = [];
     var mKeyStr = [];
     var yueFen = [
      {name: "一月", value: '01'},
      {name: "二月", value: '02'},
      {name: "三月", value: '03'},
      {name: "四月", value: '04'},
      {name: "五月", value: '05'},
      {name: "六月", value: '06'},
      {name: "七月", value: '07'},
      {name: "八月", value: '08'},
      {name: "九月", value: '09'},
      {name: "十月", value: '10'},
      {name: "十月", value: '11'},
      {name: "十二月", value: '12'}
     ];
     var legend = [];
     yueFen.forEach(function (x) {
      mKey.push(x.value);
      mKeyStr.push(x.name);
     });
     data.forEach(function (user) {
      legend.push(user.name);
      var map = new Map();
      //为空补0操作
      if(user.series.length){
       user.series.forEach(function (y) {
        for (var i = 0; i < mKey.length; i++) {
         if (y.months!=currentYear+mKey[i]) {
          if (!map.has(currentYear+mKey[i])) {
           map.set(currentYear+mKey[i], 0);
          }
         } else {
          map.set(y.months, y.total);
         }
        }
       })
      }else{
       for (var i = 0; i < mKey.length; i++) {
        map.set(currentYear+mKey[i], 0);
       }
      }
      //console.log(map);
      var data = [];
      map.forEach(function (k, v) {
       data.push(k);
      })
      user.data = data;
      user.type = 'line';
     })
     successData.seriesData = data;
     successData.months = mKeyStr;
     successData.legendData = legend;
     return successData;
    }

    function test(data){
      var yueFen = [
        {name: "一月", value: '01'},
        {name: "二月", value: '02'},
        {name: "三月", value: '03'},
        {name: "四月", value: '04'},
        {name: "五月", value: '05'},
        {name: "六月", value: '06'},
        {name: "七月", value: '07'},
        {name: "八月", value: '08'},
        {name: "九月", value: '09'},
        {name: "十月", value: '10'},
        {name: "十月", value: '11'},
        {name: "十二月", value: '12'}
       ];
      
       data.data.forEach(function(user){
          user.data = [];
          var map2 = getMap(yueFen);
          if (user.series.length) {
            user.series.forEach(function(y){
                map2.set(y.months,y.total);
            });

            map2.forEach(function(key){
                user.data.push(key);
            });
          } else{
            map2.forEach(function(key){
              user.data.push(key);
            });
          }
       });

       return data.data;
    }

    function getMap(yueFen){
      var map2 = new Map();
      yueFen.forEach(function(x){
        map2.set(new Date().getFullYear+x.value,0);
      });
      return map2;
    }

  });


  //最新订单
  layui.use('table', function(){
    var $ = layui.$
    ,table = layui.table;
    
    //今日热搜
    table.render({
      elem: '#LAY-index-topSearch'
      ,url: './json/console/top-search.js' //模拟接口
      ,page: true
      ,cols: [[
        {type: 'numbers', fixed: 'left'}
        ,{field: 'keywords', title: '关键词', minWidth: 300, templet: '<div><a href="https://www.baidu.com/s?wd={{ d.keywords }}" target="_blank" class="layui-table-link">{{ d.keywords }}</div>'}
        ,{field: 'frequency', title: '搜索次数', minWidth: 120, sort: true}
        ,{field: 'userNums', title: '用户数', sort: true}
      ]]
      ,skin: 'line'
    });
    
    //今日热贴
    table.render({
      elem: '#LAY-index-topCard'
      ,url: './json/console/top-card.js' //模拟接口
      ,page: true
      ,cellMinWidth: 120
      ,cols: [[
        {type: 'numbers', fixed: 'left'}
        ,{field: 'title', title: '标题', minWidth: 300, templet: '<div><a href="{{ d.href }}" target="_blank" class="layui-table-link">{{ d.title }}</div>'}
        ,{field: 'username', title: '发帖者'}
        ,{field: 'channel', title: '类别'}
        ,{field: 'crt', title: '点击率', sort: true}
      ]]
      ,skin: 'line'
    });
  });
  
  exports('console', {})
});