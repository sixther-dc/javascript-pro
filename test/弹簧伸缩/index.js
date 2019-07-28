var lis = document.querySelectorAll("li"),
    bigPic = document.querySelector("#bigPic"),
    bigImages = document.querySelectorAll("#bigPic img"),
    maskEle = document.querySelector("#mask"),
    pre=document.querySelector('.pre'),
	next=document.querySelector('.next')
    
var imgs = [];
var loadImgs = [];
var curNum = 0;
//使用开关变量节流
var canClick = true;
for(var i=0; i<lis.length; i++) {
    imgs.push("../images/" + i + ".jpeg");
    loadImgs[i] = new Image();
    //只要imgage对象有src属性，onload事件就会被触发
    // loadImgs[i].onload = function() {
    // }
    (function(x){
        lis[x].onclick = function(){
            curNum = x;
            bigPic.style.display = maskEle.style.display = "block";
            //保证scale可以百分百生效
            setTimeout(function(){
                bigPic.style.transform = "scale(1)";
            }, 50);
            bigImages[1].src = "../images/" + x + ".jpeg";
            // bigImages[0].src = "../images/" + (x+1) + ".jpeg";
        }
    }(i))
}

maskEle.onclick = function(){
    bigPic.style.transform = "scale(0)";
    bigPic.style.display = this.style.display = "none";
}


next.onclick = function(){
    console.log(canClick);
    if(!canClick) {
        return;
    }
    canClick = false;
    var moveNum1 = 0;
    var moveNum2 = 0;
    curNum++;
    if(curNum == lis.length) {
        curNum = 0;
    }
    bigImages[0].src = "../images/" + curNum + ".jpeg";
    bigImages[1].className = bigImages[0].className = "moveToRight";
    bigImages[1].style.transform = "translateX(600px) rotateY(-10deg)";
    bigImages[1].addEventListener("transitionend", function(){
        moveNum1 ++;
        bigImages[0].style.transform = "rotateY(-10deg)";
        bigImages[0].style.zIndex = 2;
        bigImages[1].style.transform = "translateX(0px) rotateY(0deg)";
        bigImages[1].style.zIndex = 1;
        if (moveNum1 == 2) {
            bigImages[0].style.transform = "rotateY(0deg)";
        }
    })

    bigImages[0].addEventListener("transitionend", function(){
        moveNum2 ++;
        bigImages[0].style.zIndex = 1;
        bigImages[1].style.zIndex = 2;
        bigImages[1].src = "../images/" + (curNum) + ".jpeg";
        if(moveNum2 == 2) {
            canClick=true;
        }
    })
}


pre.onclick = function(){
    if(!canClick) {
        return;
    }
    canClick = false;
    var moveNum1 = 0;
    var moveNum2 = 0;
    curNum--;
    if(curNum == -1) {
        curNum = lis.length - 1;
    }
    bigImages[0].src = "../images/" + curNum + ".jpeg";
    bigImages[1].className = bigImages[0].className = "moveToLeft";
    bigImages[1].style.transform = "translateX(-600px) rotateY(10deg)";
    bigImages[1].addEventListener("transitionend", function(){
        moveNum1 ++;
        bigImages[0].style.transform = "rotateY(10deg)";
        bigImages[0].style.zIndex = 2;
        bigImages[1].style.transform = "translateX(0px) rotateY(0deg)";
        bigImages[1].style.zIndex = 1;
        if (moveNum1 == 2) {
            bigImages[0].style.transform = "rotateY(0deg)";
        }
    })

    bigImages[0].addEventListener("transitionend", function(){
        moveNum2 ++;
        bigImages[0].style.zIndex = 1;
        bigImages[1].style.zIndex = 2;
        bigImages[1].src = "../images/" + (curNum) + ".jpeg";
        if(moveNum2 == 2) {
            //合上变为true
            canClick=true;
        }
    })
}