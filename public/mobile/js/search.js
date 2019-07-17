$(function() {
    $('.xt_search a').on('tap', function() {
        // 跳转去搜索列表页 并且带上关键字
        var key = $.trim($('input').val());
        // 判断是否有关键字 无提示用户输入关键字
        if (!key) {
            // mui消息提示
            mui.toast('请输入搜索内容');
            return false;
        }
        // 合法就跳转
        location.href = './searchList.html?key=' + key;
        // localStorage.setItem('myCat', key);
        // console.log(localStorage.getItem('myCat'));


    });
})