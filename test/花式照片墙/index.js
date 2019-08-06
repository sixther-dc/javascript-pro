function init(){
    addImage();
}

init();

var imgs = document.querySelectorAll("img");
var clickFlag = true;

function addImage() {
    var arr = Array.from(
        {length:24},
        (v,i)=>i
    );
    var randomArr = arr.sort(function(a, b) {
        return (Math.random() - 0.5);
    })
    var imgBox = document.querySelector(".box");
    arr.forEach(function(i) {
        var dom = document.createElement('img');
        dom.src = "../images/" + randomArr[i] + ".jpeg";
        imgBox.appendChild(dom);
    })

    bindEvent();
}

function bindEvent() {
    var btn = document.querySelector(".btn");
    btn.addEventListener("click", function(){
        //动画 1, 缩小   2, 放大 opacity = 0  3 飞一圈回到原来的位置
        if (!clickFlag) {
            return
        }
        var moveNum = 0;
        clickFlag = false;
        imgs.forEach(function(i) {
            setTimeout(function() {
                monition(i, 1, function(){
                    this.style.transform = "scale(0)";
                }, function(){
                    monition(i, 1 ,function(){
                        this.style.transform = "scale(1)";
                        this.style.opacity = 0;
                    }, function(){
                        moveNum ++;
                        if (moveNum == 24) {
                            showImage();
                        }
                    })
                })
            }, Math.random() * 1000);
        })
    })
}

function showImage(){
    var moveNum = 0;
    imgs.forEach(function(i) {
        i.style.transition = '';
        i.style.transform = "rotate(0deg) translateZ(-" + Math.random() * 500 + "px)";
        setTimeout(function(){
            monition(i, 2, function(){
                this.style.opacity = 1;
                this.style.transform = "rotateY(-360deg) translateZ(0px)";
            }, function(){
                //可以多次点击, 过渡不支持多个transfrom 属性 过渡到一个 属性
                this.style.transition = "";
                this.style.transform = "";
                moveNum ++;
                if (moveNum == 24) {
                    clickFlag = true;
                }
            })
        }, Math.random() * 1000)
    })
}

function monition(ele, time, action, cb) {
    ele.style.transition = time + 's';
    //支持this调用
    console.log(ele);
    action.call(ele);
    ele.addEventListener('transitionend', function callback(){
        cb.call(ele);
        //防止transitionend事件被多次触发
        this.removeEventListener('transitionend', callback);
    });
}