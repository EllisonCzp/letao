$(function() {
    barCharts();
    pieCharts();
});
var barCharts = function() {
    // 获取数据
    var data = [{
            name: '一月',
            value: 300

        },
        {
            name: '二月',
            value: 600

        },
        {
            name: '三月',
            value: 500

        },
        {
            name: '四月',
            value: 100

        },
        {
            name: '五月',
            value: 900

        },
        {
            name: '六月',
            value: 200

        },
    ];

    var xdata = [],
        ydata = [];
    data.forEach(function(item, i) {
        xdata.push(item.name);
        ydata.push(item.value);
    });

    var box = document.querySelector('.picTable:first-child');
    var myChart = echarts.init(box);
    // 数据
    var option = {
        color: ['red'],
        title: {
            text: '2017年注册人数'
        },
        legend: {
            data: [{
                name: '注册人数',
                // 强制设置图形为圆。
                icon: 'bar',
                // 设置文本为红色
                textStyle: {
                    color: 'red'
                }
            }]
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '注册人数',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
        }]
    };
    option.xAxis[0].data = xdata;
    option.series[0].data = ydata;


    myChart.setOption(option);
};
var pieCharts = function() {
    var box = document.querySelector('.picTable:last-child');
    var myChart = echarts.init(box);
    // 数据
    var option = {
        title: {
            text: '2017年销售数据',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['李宁', '阿迪', '回力', '耐克', '匡威']
        },
        series: [{
            name: '销售量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 335, name: '李宁' },
                { value: 310, name: '阿迪' },
                { value: 234, name: '回力' },
                { value: 135, name: '耐克' },
                { value: 1548, name: '匡威' }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    myChart.setOption(option);
};