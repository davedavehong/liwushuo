/**
 * Created by daved on 2015/8/23.
 */
var toggleBackTop = function () {
    if ($(window).scrollTop() > 240) {
        $('div.back-top-post').show();
        $('.header-margin-fix').css('paddingTop', '40px');
        $('.header-nav').css('position', 'fixed').css('top', '0');
        $('.nav-searchBox').show()
    } else {
        $('div.back-top-post').hide();
        $('.header-margin-fix').css('paddingTop', '0');
        $('.header-nav').css('position', '').css('top', '');
        $('.nav-searchBox').hide()
    }
};

$(function () {
    var weixinModal = $('#weixin-modal');
    var loginModals = $('#login-modals');
    var modalBackdrop = $('div.modal-backdrop');
    toggleBackTop();
    $("div.header-right").click(function () {
        modalBackdrop.show();
    });
    modalBackdrop.click(function () {
        $(this).hide();
        $('.modal').hide()
    });
    $('div.bt-button').click(function () {
        $("html,body").animate({scrollTop: "0px"}, 300, "swing");
    });
    $('li.share-wechat').click(function () {
        modalBackdrop.show();
        weixinModal.css('left', ($(window).width() - weixinModal.outerWidth()) * 0.5 + 'px')
            .css('top', ($(window).height() - weixinModal.outerHeight()) * 0.5 + 'px')
            .show();
    });
    $('#code').qrcode({
        width: 142, height: 142,
        text: window.location.href
    });
    $('.header-right').click(function () {
        loginModals.css('left', ($(window).width() - loginModals.outerWidth()) * 0.5 + 'px')
            .css('top', ($(window).height() - loginModals.outerHeight()) * 0.5 + 'px')
            .show();
        modalBackdrop.show();
    });
    $('.modal-close').click(function () {
        modalBackdrop.hide();
        loginModals.hide();
    })
});
$(window).scroll(function () {
    toggleBackTop();
});

