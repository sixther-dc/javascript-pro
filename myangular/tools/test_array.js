var a = [{
    a : 1
},{
    a : 2
}]

a.forEach(function(item){
    console.log(item["a"])
})

var _ = "";
//_.forEach的写法也不知道对不对，反正这里这么写是错的
//哦哦，这里是需要加载了lodash库后才可以这么用。
var b = function(){
    _.forEach(a, function(item){
        console.log("with _.forEach " + item["a"])
    })
}

b()