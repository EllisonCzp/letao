$(function() {
    // 区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false
    });


    // 页面初始化时：关键字在搜索框中显示
    // 获取关键字
    var paramsUrl = XT.getParamsByUrl();
    var $input = $('input').val(paramsUrl.key || '');

    // 页面初始化时：根据关键字查询第1页4条数据
    // 下拉刷新配置自动执行 重复操作
    /*getSearchData({
        proName: paramsUrl.key,
        page: 1,
        pageSize: 4
    }, function(data) {
        // 渲染数据
        $('.xt_product').html(template('searchTemplate', data))
    });*/

    // 用户点击搜索的时候：根据新的关键字查询商品 重置排序
    $('.xt_search a').on('tap', function() {
        // 重置上拉加载
        mui('#refreshContainer').pullRefresh().refresh(true);
        // 重置排序
        $('.xt_order a').removeClass('active').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        var key = getKey();
        getSearchData({
            proName: key,
            page: 1,
            pageSize: 4,
        }, function(data) {
            // 渲染数据
            $('.xt_product').html(template('searchTemplate', data))
        });

    });
    // 用户点击排序的时候：根据排序的选项进行排序（默认是降序 再次点击 升序）
    $('.xt_order a').on('tap', function() {
        mui('#refreshContainer').pullRefresh().refresh(true);
        // 改变当前样式
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active').siblings().removeClass('active').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        } else {
            if ($this.find('span').hasClass('fa-angle-down')) {
                $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up')
            } else {
                $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
            }

        }
        // 获取当前点击的功能参数
        var order = $this.data('order');
        var orderVal = $this.find('span').hasClass('fa-angle-up') ? 1 : 2;

        var key = getKey();

        var params = {
            proName: key,
            page: 1,
            pageSize: 4,
        };
        params[order] = orderVal;
        // 获取数据
        getSearchData(params, function(data) {
            // 渲染数据
            $('.xt_product').html(template('searchTemplate', data))
        });

    });
    // 用户下拉的时候：根据当前的条件刷新 上拉加载重置 排序重置
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                auto: true, //可选,默认false.首次加载自动上拉刷新一次
                callback: function() {
                        $('.xt_order a').removeClass('active').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
                        var that = this;
                        var key = getKey();
                        getSearchData({
                            proName: key,
                            page: 1,
                            pageSize: 4,
                        }, function(data) {
                            var time = setTimeout(function() {
                                // 渲染数据
                                $('.xt_product').html(template('searchTemplate', data));
                                // 停止上拉加载
                                that.endPulldownToRefresh();
                                // 上拉加载重置
                                that.refresh(true);
                            }, 1000);


                        });
                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            // 用户上拉的时候： 加载下一页（没有数据就不去加载）
            up: {
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function() {
                        window.page++;
                        var that = this;
                        var key = getKey();
                        // 排序功能
                        // 获取当前点击的功能参数
                        var order = $('.xt_order a').data('order');
                        var orderVal = $('.xt_order a').hasClass('fa-angle-up') ? 1 : 2;
                        var params = {
                            proName: key,
                            page: 1,
                            pageSize: 4,
                        };
                        params[order] = orderVal;
                        getSearchData(params, function(data) {
                            var time = setTimeout(function() {
                                // 渲染数据
                                $('.xt_product').append(template('searchTemplate', data));
                                // 停止上拉加载
                                that.endPullupToRefresh(data.data.length);

                            }, 1000);


                        });
                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }

        }
    });

});

var getSearchData = function(params, callback) {
    $.getJSON("/product/queryProduct", params,
        function(data) {
            // 存储当前页码
            window.page = data.page;

            callback && callback(data);
        }
    );

}
var getKey = function() {
    var key = $.trim($('input').val());
    // 判断是否有关键字 无提示用户输入关键字
    if (!key) {
        // mui消息提示
        mui.toast('请输入搜索内容');
        return false;
    }
    return key;
}