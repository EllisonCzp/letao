var XT = {};
XT.getParamsByUrl = function() {
    var params = {};
    var search = location.search.slice(1);
    if (search) {
        var arr = search.split('&');
        arr.forEach(function(item, i) {
            var itemArr = item.split('=');
            params[itemArr[0]] = itemArr[1];

        })
    }
    return params;
};
// 登录页地址
XT.loginUrl = '/m/user/login.html';
// 购物车页面地址
XT.cartUrl = '/m/user/cart.html'
    // 需要登录的ajax请求
XT.loginAjax = function(params) {
    $.ajax({
        type: params.type || 'get',
        url: params.url || '#',
        data: params.data || '',
        dataType: params.dataType || 'json',
        success: function(data) {
            // 未登录的处理  error 400
            if (data.error == 400) {
                // 跳转到登录页 并且把当前页的地址传给登录页 登录成功后按这个地址返回
                location.href = XT.loginUrl + '?returnUrl' + location.href;
                return false;
            } else {
                params.success && params.success(data);
            }


        },
        error: function() {
            mui.toast('服务器繁忙');
        }
    });
}