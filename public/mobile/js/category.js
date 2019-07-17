$(function() {

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false
    });

    // 一级分类
    getFristCategoryDate(function(data) {
        // 模板使用顺序： 1.得到json数据   2.定义模板   3.调用模板  4.返回html
        $('.cate_left ul').html(template("fristTemplate", data));
        // 第一个一级分类对应的二级分类的id
        var categoryId = $('.cate_left ul li').find('a').data('id');
        render(categoryId);
    });
    // 点击一级分类找到对应二级分类
    $('.cate_left ul').on('tap', 'a', function(e) {
        if ($(this).parent().hasClass('active')) return false;
        var categoryId = $(this).data('id');
        render(categoryId);
        $(this).parent().addClass('active').siblings().removeClass('active');

    });
});

// 获取一级分类数据
var getFristCategoryDate = function(callback) {
        $.getJSON("/category/queryTopCategory",
            function(data) {
                callback && callback(data);
            }
        );
    }
    // 根据一级分类id获取对应的二级分类数据
var getSecondCategoryDate = function(categoryId, callback) {
    $.getJSON("/category/querySecondCategory", { id: categoryId },
        function(data) {
            callback && callback(data);
        }
    );
}
var render = function(categoryId) {
    getSecondCategoryDate(categoryId, function(data) {
        $('.cate_right ul').html(template("secondTemplate", data));
    })
}