var curDisplay = 0;
var index = 0;
var imgs = document.getElementsByTagName('img');
var icons = document.getElementsByClassName("icon");
var imgLen = imgs.length;
var wrapper = document.getElementsByClassName("wrapper")[0];

function init() {
    move();
    bindEvent();
}

init();

function move() {
    var hLen = imgLen / 2;
    //对称的数组求左右两侧的元素
    var lNum, rNum;
    for (var i = 0; i < hLen; i++) {
        lNum = (curDisplay - i - 1 + imgLen) % imgLen;
        imgs[lNum].style.transform = 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (100 - i * 100) + 'px) rotateY(30deg)'

        rNum = (curDisplay + i + 1) % imgLen;
        imgs[rNum].style.transform = 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (100 - i * 100) + 'px) rotateY(-30deg)'

        imgs[curDisplay].style.transform = 'translateZ(200px)';
    }
}

function bindEvent() {

    //给每个img绑定事件
    for (var i = 0; i < imgLen; i++) {
        (function (i) {
            imgs[i].addEventListener("click", function () {
                curDisplay = i;
                move();
            }, false);
            imgs[i].addEventListener("mouseover", function () {
                clearInterval(timer);
            }, false);
            imgs[i].addEventListener("mouseout", function () {
                timer = setInterval(function () {
                    autoPlay();
                }, 3000)
            }, false);
        }(i))
    };

    //设置自动播放
    timer = setInterval(function () {
        autoPlay();
    }, 3000)
}

function autoPlay() {
    // if (curDisplay == imgLen - 1) {
    //     curDisplay = 0;
    // } else {
    //     curDisplay++;
    // }
    curDisplay = curDisplay%imgLen;
    curDisplay ++;
    // curDisplay = ++index%imgLen;
    move();
}