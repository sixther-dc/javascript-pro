var topbar  = document.querySelector("#topbar");
var firstPage = document.querySelector(".firstPage");
var topbarUl = document.querySelector("#topbar ul");
//添加滚动事件
document.onscroll = function() {
    var topbarPosition = topbar.getBoundingClientRect();
    var firstPagePosition = firstPage.getBoundingClientRect();
    var firstPageHeight = firstPage.offsetHeight;
    if (topbarPosition.y <= 0) {
        topbar.classList.add("fixed");
    }
    if(firstPagePosition.y >= -firstPageHeight ) {
        topbar.classList.remove("fixed");
    }
}

function init() {
    //绘制技能树
    drawSkillGraph();
    //添加topbar上的点击事件
    addTopbarClickEvent();
}

init();

function addTopbarClickEvent(){
    topbarUl.onclick = function(e) {
        var topbar  = document.querySelector("#topbar");
        var itemName = e.target.id;
        if (itemName) {
            var itemOffsetTop = document.querySelector("." + itemName).offsetTop;
            if (topbar.classList.contains("fixed")) {
                document.documentElement.scrollTop = itemOffsetTop - 30;
            } else {
                document.documentElement.scrollTop = itemOffsetTop - 30 - 50;
            }
        }
    }
}
function drawSkillGraph(){
    var a = document.getElementById("a").getContext("2d");
    var b = document.getElementById("b").getContext("2d");
    var c = document.getElementById("c").getContext("2d");
    var d = document.getElementById("d").getContext("2d");
    drawCicle(a, 65);
    drawCicle(b, 70);
    drawCicle(c, 80);
    drawCicle(d, 85);
}

function drawCicle(context, value) {
    context.beginPath();
    context.strokeStyle = "#ccc"
    context.lineWidth = 20;
    context.arc(200, 200, 190, 0, Math.PI * 2);
    context.font = '80px serif';
    context.stroke();
    context.closePath();

    var deg = 0;
    var timer = requestAnimationFrame(function fn() {
        context.beginPath();
        context.lineCap = 'round';
        context.strokeStyle = "#00bcd4";
        context.arc(200, 200, 190, 0, Math.PI * 2 * 0.01 * deg);
        context.clearRect(80, 80, 200, 200);
        context.fillText(deg + '%', 150, 230);
        deg++;
        context.stroke();
        context.closePath();
        timer = requestAnimationFrame(fn);
        if (deg >= value) {
            context.clearRect(80, 80, 200, 200);
            context.fillText(value+ '%', 150, 230);
            cancelAnimationFrame(timer);
        }
    })
}