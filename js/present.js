/**
 * Created by dave on 2015/7/8.
 */
var bSys = true;
var backTimer = null;
window.onload = function () {
    backTotop();
    navFix();
    setLinksTarget();
    setItemIMG();
    addNewFlag();
    slideShow('slideShow',3)
};
window.onscroll = function () {
    navFix();
    checkBS();
};
var itemImgLinks = [
    'images/present/itemimg0.jpg',
    'images/present/itemimg1.jpg',
    'images/present/itemimg2.jpg',
    'images/present/itemimg3.jpg',
    'images/present/itemimg4.jpg',
    'images/present/itemimg5.jpg',
    'images/present/itemimg6.jpg',
    'images/present/itemimg7.jpg',
    'images/present/itemimg8.jpg',
    'images/present/itemimg9.jpg'
];
function navFix() {
    var header_fix = document.getElementsByClassName('header-margin-fix')[0];
    var backBottom = document.getElementsByClassName('backTotop')[0];
    var header_cont = document.getElementsByClassName('header')[0];
    var header_nav = document.getElementsByClassName('header-nav')[0];
    var nav_searchBox = document.getElementsByClassName('nav-searchBox')[0];
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop >= 240) {
        backBottom.style.display = 'block';
        header_fix.style.paddingTop = '124px';
        header_cont.style.display = 'none';
        header_nav.style.position = 'fixed';
        header_nav.style.top = '0';
        nav_searchBox.style.display = 'block';
    } else {
        header_fix.style.paddingTop = '0px';
        header_cont.style.display = 'flex';
        header_nav.style.position = '';
        header_nav.style.top = '';
        nav_searchBox.style.display = 'none';
        backBottom.style.display = 'none';
    }
}
function setLinksTarget() {
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].target = "_blank";
    }
}
function setItemIMG() {
    var itemImgHolder = document.getElementsByClassName('item-img');
    for (var i = 0; i < itemImgHolder.length; i++) {
        itemImgHolder[i].style.background = "url(" + itemImgLinks[i] + ")";
        itemImgHolder[i].style.backgroundSize = 'cover';
    }
}
function backTotop() {
    var backBottom = document.getElementsByClassName('backTotop')[0];
    backBottom.onclick = function () {
        var speedInit = Math.floor((document.documentElement.scrollTop || document.body.scrollTop) / 15);
        var backTimer = setInterval(function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop == 0) {
                clearInterval(backTimer);
            }
            bSys = true;
            document.documentElement.scrollTop = document.body.scrollTop = scrollTop - speedInit;
        }, 20)
    }
}
function checkBS() {
    if (!bSys) {
        clearInterval(backTimer);
    }
    bSys = false;
}
function addNewFlag() {
    var aNewFlag = document.getElementsByClassName("pItem");
    for (var i = 0; i < 3; i++) {
        var divNewFlag = document.createElement('div');
        divNewFlag.className = 'new-flag';
        aNewFlag[i].appendChild(divNewFlag);
    }
}
function slideShow(id, t) {//每t秒运行一次
    if (!document.getElementById(id)) {
        return false;
    }
    var doc = document,
        auto = '',
        oId = doc.getElementById(id),
        num = 0,
        bot = true,
        setOpacity = function (obj, opacity) {
            obj.style.filter = 'Alpha(Opacity=' + (opacity * 100) + ')';
            obj.style.opacity = opacity;
        },
        fadeIn = function (obj, timeLimit) {
            if (obj.style.display === 'none') {
                obj.style.display = 'block';
            }
            setOpacity(obj, 0);
            if (!timeLimit) {
                timeLimit = 200;
            }
            var opacity = 0,
                step = timeLimit / 10;
            var fadeInTime = setTimeout(function () {
                bot = false;
                if (opacity >= 1) {
                    bot = true;
                    return;
                }
                opacity += 1 / step;
                setOpacity(obj, opacity);
                fadeInTime = setTimeout(arguments.callee, 20);
            }, 20);
        },
        fadeOut = function (obj, timeLimit) {
            if (!timeLimit) {
                timeLimit = 200;
            }
            setOpacity(obj, 1);
            var opacity = 1,
                step = timeLimit / 10;
            var fadeOutTime = setTimeout(function () {
                if (opacity <= 0) {
                    setOpacity(obj, 0);
                    return;
                }
                opacity -= 1 / step;
                setOpacity(obj, opacity);
                fadeOutTime = setTimeout(arguments.callee, 20);
            }, 20);
        },
        getClass = function (oElem, strTagName, strClassName) {
            var arrElements = (strTagName == '*' && oElem.all) ? oElem.all : oElem.getElementsByTagName(strTagName);
            var returnArrElements = [];
            var oRegExp = new RegExp('(^|\\s)' + strClassName + '($|\\s)');
            for (var i = 0; i < arrElements.length; i++) {
                if (oRegExp.test(arrElements[i].className)) {
                    returnArrElements.push(arrElements[i]);
                }
            }
            return (returnArrElements);
        },
        showImg = function (n, b) {
            var turnPic = getClass(oId, 'ul', 'turn-pic')[0];
            var oLi = turnPic.getElementsByTagName('li');
            var turnBtn = getClass(oId, 'div', 'turn-btn')[0];
            var oSpan = turnBtn.getElementsByTagName('span')[0];
            fadeIn(oLi[n], 300);
            oSpan.innerHTML = (n + 1) + '/' + oLi.length;
            if (b == true) {//逆序
                if (n == oLi.length - 1) {
                    fadeOut(oLi[0], 300);
                }
                if (n < oLi.length - 1) {
                    fadeOut(oLi[n + 1], 300);
                }
            } else {//正序
                if (n > 0) {
                    fadeOut(oLi[n - 1], 300);
                }
                if (n == 0) {
                    fadeOut(oLi[oLi.length - 1], 300);
                }
            }
        },
        init = function () {
            showImg(0);
            oId.onmouseover = function () {
                clearInterval(auto);
            };
            oId.onmouseout = function () {
                auto = setInterval(autoTurn, t * 1000);
            };
            var turnPic = getClass(oId, 'ul', 'turn-pic')[0];
            var oLi = turnPic.getElementsByTagName('li');
            var oLb = getClass(oId, 'div', 'left')[0];
            var oRb = getClass(oId, 'div', 'right')[0];
            oLb.onmouseover = function () {
                this.style.backgroundPosition = '-12px 0';
            };
            oLb.onmouseout = function () {
                this.style.backgroundPosition = '0 0';
            };
            oLb.onclick = function () {
                if (!bot) {
                    return false;
                }
                if (num == 0) {
                    num = oLi.length - 1;
                } else {
                    num = num - 1;
                }
                showImg(num, 1);
            };
            oRb.onmouseover = function () {
                this.style.backgroundPosition = '-18px 0';
            };
            oRb.onmouseout = function () {
                this.style.backgroundPosition = '-6px 0';
            };
            oRb.onclick = function () {
                if (!bot) {
                    return false;
                }
                if (num == oLi.length - 1) {
                    num = 0;
                } else {
                    num = num + 1;
                }
                showImg(num);
            }
        },
        autoTurn = function () {
            var turnPic = getClass(oId, 'ul', 'turn-pic')[0];
            var oLi = turnPic.getElementsByTagName('li');
            if (num == oLi.length - 1) {
                num = 0;
            } else {
                num = num + 1;
            }
            showImg(num);
        };
    init();
    auto = setInterval(autoTurn, t * 1000);

}