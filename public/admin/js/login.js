$(function() {
    $('#login').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '请输入用户名'
                    },
                    callback: {
                        message: '用户名错误'
                    },
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '请输入密码'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码在6-18个字符内'
                    },
                    callback: {
                        message: '密码错误'
                    }

                }
            }
        }

    }).on('success.form.bv', function(e) {
        e.preventDefault();
        var $form = $(e.target);
        var loginData = $form.serialize();
        $.post("/employee/employeeLogin", loginData,
            function(data) {
                if (data.success == true) {
                    location.href = '/a/';
                } else {
                    if (data.error == 1000) {
                        $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                    } else if (data.error == 1001) {
                        $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                    }
                }
            },
            "json"
        );


    });
});