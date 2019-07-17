// 后台管理系统的公共js文件

// 1.当页面执行ajax操作时  显示进度条
NProgress.configure({ showSpinner: false });
$(window).ajaxStart(function() {
    NProgress.set(0.4);
});
// 2. ajax 执行完毕时 结束进度条
$(window).ajaxComplete(function() {
    NProgress.done();
});
// 侧边栏显示/隐藏
$('[data-menu]').on('click', function() {
    $('.ad_aside').toggle();
    $('.ad_section').toggleClass('menu');
});
// 显示二级菜单
$('.menu [href="javascript:;"]').on('click', function() {
    $(this).siblings().slideToggle();
});
// 退出功能

// 需要一个模态框 而且每个页面都需要
var modalhtml = ['  <div class="modal fade" id="logout">',
    '        <div class="modal-dialog modal-sm">',
    '            <div class="modal-content">',
    '                <div class="modal-header">',
    '                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>',
    '                    <h4 class="modal-title">温馨提示</h4>',
    '                </div>',
    '                <div class="modal-body">',
    '                    <p class="text-danger"><span class="glyphicon glyphicon-info-sign">您确定要退出后台管理系统?</span></p>',
    '                </div>',
    '                <div class="modal-footer">',
    '                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
    '                    <button type="button" class="btn btn-primary">确定</button>',
    '                </div>',
    '            </div>',
    '        </div>',
    '    </div>'
].join("");
$('body').append(modalhtml);

$('[data-logout]').on('click', function() {
    var $logout = $('#logout')
    $logout.modal('show');
    $logout.find('.btn-primary').on('click', function() {
        $.getJSON("/employee/employeeLogout",
            function(data) {
                if (data.success == true) {
                    $logout.modal('hide');
                    location.href = '/a/login.html';
                }
            }
        );

    });

});