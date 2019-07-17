$(function() {
    // 区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false
    });
    /*初始化上下拉*/
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            down: {
                auto: true,
                callback: function() {
                    /*1.初始化页面  自动下拉刷新*/
                    var that = this;
                    setTimeout(function() {
                        // 渲染数据
                        getCartData(function(data) {
                            if (data.length) {
                                $('.mui-table-view').html(template('cart', data));
                            } else {
                                mui.toast('购物车没有商品，去首页逛逛吧');
                            }

                            /*加载状态隐藏*/
                            that.endPulldownToRefresh();

                            // 注册点击刷新事件  防止多次绑定
                            $('.fa-refresh').off('tap').on('tap', function() {
                                that.pulldownLoading();
                            })
                        });
                    }, 1000);
                }
            }
        }
    });
    // 侧滑 点击编辑按钮 弹出对话框
    $('.mui-table-view').on('tap', '.mui-icon-compose', function() {
        // 获取当前id
        var id = $(this).parent().data('id');
        // 根据id去获取缓存数据
        var item = XT.getDataById(window.cartData.data, id);
        // 弹窗的内容
        var html = template('edit', item);
        mui.confirm(html.replace(/\n/g, ''), '商品编辑', ['确定', '取消'], function(e) {
            // 确认
            if (e.index == 0) {
                // 发送请求
                var size = $('.btn_size.now').html();
                var num = $('.p_number input').val();
                XT.loginAjax({
                    type: 'post',
                    url: '/cart/updateCart',
                    data: {
                        id: id,
                        size: size,
                        num: num
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data.success == true) {
                            // 列表更新
                            // item 与 window.cartData.data缓存数据 指向相同  item 更改 缓存数据 同样更改
                            item.size = size;
                            item.num = num;

                            // 渲染页面
                            $('.mui-table-view').html(template('cart', window.cartData));
                            mui.toast('修改成功');
                            setAmount();
                        }
                    }
                });

            } else { //取消
                // TODO

            }
        });
    });
    //删除  弹出对话框
    $('.mui-table-view').on('tap', '.mui-icon-trash', function() {
        // 获取当前元素
        var $this = $(this);
        // 获取当前id
        var id = $this.parent().data('id');

        // 删除对话框
        mui.confirm('您是否删除该商品！', '商品删除', ['是', '否'], function(e) {
            // 确认 删除
            if (e.index == 0) {

                XT.loginAjax({
                    type: 'get',
                    url: '/cart/deleteCart',
                    data: {
                        id: id
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data.success == true) {
                            //    删除数据
                            $this.parent().parent().remove();
                            mui.toast('删除成功');
                            setAmount();
                        }
                    }
                });

            } else { //取消
                // TODO

            }
        });
    });
    // 尺码编辑
    $('body').off('tap').on('tap', '.btn_size', function() {
        $(this).addClass('now').siblings().removeClass('now');
    });
    // 数量编辑
    $('body').on('tap', '.p_number span', function() {
        var $input = $(this).siblings('input');
        var currNum = $input.val();
        var maxNum = $input.data('max');
        if ($(this).hasClass('jian')) {
            if (currNum <= 1) {
                mui.toast('至少需要一件商品');
                return false;
            }
            currNum--;
        } else {
            if (currNum >= maxNum) {
                mui.toast('库存不足');
                return false
            }
            currNum++;
        }
        $input.val(currNum);
    });

    // 复选框 状态改变  计算总金额
    $('.mui-table-view').on('change', '[type=checkbox]', function() {

        setAmount();
    });

});

// 设置总金额
var setAmount = function() {
    // 总金额 = 商品数量 * 商品单价 的总和
    // 所有选中的复选框
    var $checkbox = $('[type=checkbox]:checked');
    // 总金额
    var amountSum = 0;
    // 遍历所有选中的复选框
    $checkbox.each(function(i, item) {
        // 获取每个复选框对应的商品id
        var id = $(this).data('id');
        // 获取对应id的数据
        var item = XT.getDataById(window.cartData.data, id);
        // 商品数量
        var num = item.num;
        // 商品单价
        var price = item.price;
        amountSum += num * price;
    });
    amountSum = Math.floor(amountSum * 100) / 100;
    if ((Math.floor(amountSum * 100) % 10 == 0)) {
        amountSum = amountSum.toString() + '0';
    }
    $('#cartAmount').html(amountSum);
}

// 获取购物车数据
var getCartData = function(callback) {
    XT.loginAjax({
        type: "get",
        url: "/cart/queryCartPaging",
        data: { page: 1, pageSize: 100 },
        dataType: "json",
        success: function(data) {
            // 缓存数据
            window.cartData = data;

            callback && callback(data);
        }
    });

}