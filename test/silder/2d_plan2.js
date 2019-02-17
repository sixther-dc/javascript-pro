var curDisplay = 0;
var imgs = document.getElementsByTagName('img');
var imgLen = imgs.length;

function init(){
    move();
    bindEvent();
}

init();

function move() {
    for (var i = 0; i < imgLen; i ++){
        imgs[i].style.transform = 'translateZ(50px)';
    };

    imgs[curDisplay].style.transform = 'translateZ(150px)';
};

function bindEvent() {
    for (var i = 0; i < imgLen; i ++){
        (function(i){
            imgs[i].addEventListener("mouseover", function(){
                curDisplay = i;
                move();
            }, false)
        }(i))
    };
}
