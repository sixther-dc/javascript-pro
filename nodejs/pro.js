/** 1， 作用域的搜寻 **/
var someVar = 'value'
var f1 = function () {
    //console.log(someVar)    //这个时候会输出undifened，因为js的作用域是从内二外的，先看再f1中有someVar这个变量的定义，所以就不再
    // 往外搜寻了，有此也可以看出，js在执行一个函数的时候，会先确定其可以搜寻到哪些变量，然后再往下执行。
    var someVar = 'scope';
}

f1();


/** 2，call和apply **/

/** 基于一点，this总是指向调用函数的对象 **/

var someUser = {
    name: 'someuser',
    displayName: function () {
        console.log(this.name)
    }
}

//someUser.displayNmae()
/** 这里会输出undifined，以为这时候的this会变成了glolbal，而golbal并没有定义name这个变量 **/
//name='global';
func = someUser.displayName;
func();

/** 那如果想让someUser的displayName方法赋值给了global.func的时候，this的指向不变，还是someUser呢，就需要使用call/apply方法了 **/
func.apply(someUser);   //someUser的上下文来调用displayName函数
func = someUser.displayName.bind(someUser);  //注意，两次bind是没有效果的
func();