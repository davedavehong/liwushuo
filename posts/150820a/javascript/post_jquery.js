/**
 * Created by daved on 2015/8/23.
 */
var toggleBackTop = function () {
    if ($(window).scrollTop() > 240) {
        $('div.back-top-post').show();
    } else {
        $('div.back-top-post').hide();
    }
};

$(function () {
    toggleBackTop();
    $("div.header-right").click(function () {
        $('div.modal-backdrop').show();
    });
    $('div.modal-backdrop').click(function () {
        $(this).hide();
    });
    $('div.bt-button').click(function () {
        $("html,body").animate({scrollTop: "0px"}, 300, "swing");
    });
    $('li.share-wechat').click(function () {
        $('div.modal-backdrop').show();//todo

    });
    $('#code').qrcode({
        width: 142, height: 142,
        text: window.location.href
    });
    var weixinModal = $('#weixin-modal');
    weixinModal.css('left', ($(window).width() - weixinModal.outerWidth()) * 0.5 + 'px')
        .css('top', ($(window).height() - weixinModal.outerHeight()) * 0.5 + 'px')
});
$(window).scroll(toggleBackTop);

//$(function () {
//});
