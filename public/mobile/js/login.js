$(function() {
    $('#login').on('tap', function() {
        // 表单序列化
        var dataStr = $('form').serialize();
        var dataObj = XT.serialize2obj(dataStr);
        // 校验数据
        if (!dataObj.username) {
            mui.toast('请您输入用户名！');
            return false;
        }
        if (!dataObj.password) {
            mui.toast('请您输入密码！')
            return false;
        }
        // 提交数据
        $.post("/user/login", dataObj,
            function(data) {
                // 业务成功
                if (data.success == true) {
                    // 获取其他页面传递的URL地址
                    var returnUrl = location.search.replace('?returnUrl=', '');


                    // 是否带有地址
                    if (returnUrl) {
                        // 带有url地址
                        location.href = returnUrl;
                    } else {
                        // 没带uri地址
                        location.href = XT.indexUrl;
                    }
                } else { //业务失败
                    mui.toast(data.message);
                }
            },
            "json"
        );

    });


});