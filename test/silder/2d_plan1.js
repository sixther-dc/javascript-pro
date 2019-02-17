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

function move(){
    for (var i = 0; i < imgLen; i++){
        imgs[i].style.opacity = 0;
        icons[i].style.backgroundColor = "#fff";
    }
    imgs[curDisplay].style.opacity = 1;
    icons[curDisplay].style.backgroundColor = "#f40";
}

function bindEvent(){
    //给每个icon绑定实践
    for (var i = 0; i < imgLen; i++){
        (function(i){
            icons[i].addEventListener("click",function(){
                curDisplay = i;
                move();
            }, false)
        }(i))
    };

    //鼠标移动到轮播区域是消除定时器
    wrapper.addEventListener("mouseover",function(){
        clearInterval(timer);
    }, false)

    //鼠标移出轮播区域是恢复定时器
    wrapper.addEventListener("mouseout",function(){
        timer = setInterval(function(){
            autoPlay();
        }, 3000)
    }, false)

    //设置自动播放
    timer = setInterval(function(){
        autoPlay();
    }, 3000)
}

function autoPlay() {
    if (curDisplay == imgLen - 1) {
        curDisplay = 0;
    } else {
        curDisplay ++;
    }
    // curDisplay = ++index%imgLen;
    move();
}