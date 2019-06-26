$(function() {
    // 获取账户信息
    XT.loginAjax({
        url: '/user/queryUserMessage',
        type: 'get',
        data: '',
        success: function(data) {
            $('#user').html(data.username + '<p class="mui-ellipsis">' + data.mobile + '</p>');
        }
    });
    $('.btn_outLogin').off('tap').on('tap', function() {
        $.get("/user/logout",
            function(data) {
                if (data.success == true) {
                    location.href = XT.loginUrl;
                } else {
                    mui.toast('服务器繁忙');
                }
            },
            "json"
        );
    });

});