function init() {
    showImages();
}

var imageBox = document.querySelector(".right")
var ninthIndex = Math.floor(Math.random() * 9);
init();

function showImages() {
    for (i=0; i<100; i++) {
        var itemDom = document.createElement('div');
        var imageIndex = Math.floor(Math.random() * 24);
        itemDom.setAttribute("class", "item");
        if (i % 9 == 0) {
            imageIndex = ninthIndex;
        }   
        itemDom.innerHTML = `
            <span>${i}</span>
            <img src="../images/${imageIndex}.jpeg" alt="">
        `
        imageBox.appendChild(itemDom);
    }

    bindEvent();
}

function bindEvent() {
    var cicleDom = document.querySelector(".cicle");
    var cicleImageDom = cicleDom.querySelector("img");
    cicleDom.addEventListener("click", function() {
        monition(cicleImageDom, 4, function(){
            this.style.transform = `rotate(${ 6 * 360 }deg)`;
            this.style.opacity = 0;
        }, function(){
            this.src = `../images/${ninthIndex}.jpeg`;
            this.style.transition = 'opacity 1s';
            this.style.transform = '';
            this.style.opacity = 1;
        })
        // var getRotateReg=/rotate\(([0-9]+)deg\)/;
        // var timer = requestAnimationFrame(function fn() {
        //     var roteteDeg = cicleImageDom.style.transform.match(getRotateReg) ? cicleImageDom.style.transform.match(getRotateReg)[1] : 0;
        //     console.log(roteteDeg);
        //     cicleImageDom.style.transform = `rotate(${  parseInt(roteteDeg) + 20 }deg)`;
        //     console.log(cicleImageDom.style.transform);
        //     timer = requestAnimationFrame(fn);
        //     if (roteteDeg >= 4 * 360) {
        //         cicleImageDom.style.transform = `rotate(${ 4 * 360 }deg)`;
        //         cancelAnimationFrame(timer);
        //     }
        // })
    })
}


function monition(ele, time, action, cb) {
    ele.style.transition = time + 's';
    //支持this调用
    action.call(ele);
    ele.addEventListener('transitionend', function callback(){
        cb.call(ele);
        //防止transitionend事件被多次触发
        this.removeEventListener('transitionend', callback);
    });
}