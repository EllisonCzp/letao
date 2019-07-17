$(function() {
    var productId = XT.getParamsByUrl().id;
    getProductData(productId, function(data) {
        // 停止加载状态
        $('.loading').remove();
        // 渲染商品详情数据
        $('.mui-scroll').html(template('detail', data));
        // 区域滚动
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            indicators: false
        });
        // 轮播图
        //获得slider插件对象
        mui('.mui-slider').slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
        });

        // 尺码选择
        $('.btn_size').on('tap', function() {
            $(this).addClass('now').siblings().removeClass('now');
        });
        // 数量选择
        $('.p_number span').on('tap', function() {
            var $input = $(this).siblings('input');
            var currNum = $input.val();
            var maxNum = $input.data('max');
            if ($(this).hasClass('jian')) {
                if (currNum <= 0) return false;
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

        // 加入购物车
        $('.btn_addCart').on('tap', function() {
            // 校验数据
            // 是否选择尺码
            var $changeBtn = $('.btn_size.now');
            if (!$changeBtn.length) {

                mui.toast('请您选择尺码');
                return false;
            }
            // 是否选择数量
            var num = $('.p_number input').val();
            if (num <= 0) {
                mui.toast('请您选择数量');
                return false;
            }
            // 提交数据
            XT.loginAjax({
                url: '/cart/addCart',
                type: 'post',
                data: {
                    productId: productId,
                    num: num,
                    size: $changeBtn.html()
                },
                dataType: 'json',
                success: function(data) {
                    if (data.success == true) {
                        mui.confirm('添加成功  去购物车看看', '温馨提示', ['否', '是'], function(e) {
                            if (e.index == 0) {
                                // TODO
                            } else {
                                location.href = XT.cartUrl;
                            }
                        })
                    }
                }
            });

        })
    });
});
var getProductData = function(productId, callback) {
    $.getJSON("/product/queryProductDetail", { id: productId },
        function(data) {
            setTimeout(function() {
                callback && callback(data);
            }, 1000);
        }
    );

}