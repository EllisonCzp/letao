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

XT.getDataById = function(data, id) {
    var obj = null;
    data.forEach(function(item, i) {
        if (item.id == id) {
            obj = item;
        }
    });
    return obj;
}


// 登录页地址
XT.loginUrl = '/m/user/login.html';
// 购物车页面地址
XT.cartUrl = '/m/user/cart.html';
// 首页地址
XT.indexUrl = '/m/user/index.html';

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
                location.href = XT.loginUrl + '?returnUrl=' + location.href;
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

// 数据格式转换 str to obj
XT.serialize2obj = function(serializeStr) {
    var obj = {};
    if (serializeStr) {
        var arr = serializeStr.split('&');
        arr.forEach(function(item, i) {
            var itemArr = item.split('=');
            obj[itemArr[0]] = itemArr[1];
        });
    }
    return obj;

}