//TODO: 1
// 块级作用域
// 只在代码块内生效，并且不会被提升到顶部
// 给js添加灵活性，以及与其他语言的一致性
{
    //console.log(aa);
    //即使在代码块内部，let声明的变量也不会给提升到顶部
    let aa = "javascript";
    console.log(aa);
}

// 是用const声明的变量，可以修改它的成员
const bb = {
    name: "dc"
}
bb.name = "dcc";
console.log(bb);

// 暂时性死区，表示let或者const声明的变量无法被访问
// js依然在预编译阶段寻找变量的声明， var声明的变量会放到作用域中， let，const会放在暂时性死区中
// typeof (cc);
let cc = 1;

//TODO: 2
//字符串,  es6新增了一些方法
var msg = "hello";
console.log(msg.includes('ell'));
console.log(msg.startsWith("hel"));
console.log(msg.endsWith("llo"));
console.log(msg.repeat(10));
// es6支持模板字符串， 反引号
//定义一个函数，来格式化的显示字符串
function tag(a, ...b){
    console.log(a);
    console.log(b);
    return "curry " + b[0] + a[0];
};
let foo = 'duan';
let bar = "chao";
let msg1 = tag`hello${foo}${bar}`;
console.log(msg1);

//TODO: 3
//函数
console.log("==========第三部分： 函数================")
{
    //函数的参数可以设置默认值
    function a (url, timeout = 20, callback = function(){}) {}
    //参数的默认值支持函数表达式
    //带有默认值参数的函数不能启用严格模式
    function b (url, callback = a()) {

    }
    function c (first = second , second) {
        return first + second
    }
    console.log(c(1, 1))
    // console.log(c(undefined,  1))
    // 这里会抛出错误，因为它相当于执行了如下语句，有暂时性死区的问题
    // let first = second;
    // let second = 1
 
    // 从一个对象中获取想要的子集
    // ...接收剩余参数，并将其转换成一个数组
    function pick(object, ...keys) {
        let result = Object.create(null);
        console.log(keys.length);
        for(let i=0; i<keys.length; i++) {

            console.log(keys[i]);
            result[keys[i]] = object[keys[i]]
        }
        return result;
    }
    const book = {
        title: "ttt",
        author: "sixther",
        date: "2019"
    }
    console.log(pick(book, "date", "author"));

    //使用函数构造器来生成函数
    let ccc = new Function("...keys", "return keys[0]");
    console.log(ccc("aa","bb"))

    console.log(ccc.name);
    console.log(pick.name);

    //js为函数提供了两个不同的内部方法 [[call]]   [[constuct]]

    function Person(name) {
        console.log(Object.prototype.toString(this));
        //如何区分是通过call还是construct来调用Persion方法呢，上面那个不行，输出都一样
        //es6引入了new.target来判断
        console.log(new.target, " new target");
        this.name = name
    }
    let p1 = new Person("name");
    Person('name');
    //检测类型
    console.log(`test  ${Object.prototype.toString.call(p1)}`);
    console.log(`test  ${Object.prototype.toString.call(Person)}`);
    console.log(`tset  ${Object.prototype.toString.call("tt")}`);

    //箭头函数 arrow function
    //1， 没有this, super, arguments, new.target的值，这几个值由最靠近的非箭头函数决定
    //2， 没有[[construct]]方法， 不能被new调用， 也就没有原型

    function simon() {
        this.name = "zhangximeng";
        var test = value => {
            console.log(this.name);
            return value
        };
        console.log(test("xian"))
    }
    simon()

    //箭头函数的简洁使得其特别被用于传递给sort方法来操作数组

    //尾调用的优化。es6对尾调用进行了一些优化，满足特定场景的尾调用性能会提升
    function a() {
        return simon()
        //下面这种不会被优化，需要格外注意
        // let result = simon()
        // return result
    }

    //优化斐波拉契数列
    let fib = (n) => {
        if (n <= 1) {
            return n;
        } else {
            //不会被优化，因为执行了fib() 后汗执行了加法
            return n + fib(n - 1)
        }
    }


    //优化后的方法
    fib = (n, p = 0) => {
        if (n <= 1) {
            return n + p
        } else {
            let result = n + p;
            return fib(n-1, result)
        }
    }

    console.log(fib(6));
}


console.log("==========第四部分： 对象部分================")
{
    //1，字面量定义oject更为简单，各种佘略写法，支持变量命名字段
    //Object.is()   取代 ===
    //Object.assign()   对象的mix
    // Object.getOwnPropertyNames() 默认排序    Object.keys() 不排序
    function Persion() {
        this.name = "persion"
    }
    Persion.prototype.age = 100;
    Dog.prototype.age = 100;
    function Dog() {
        this.name = "dog"
    }
    let a = new Persion();
    console.log(Object.getPrototypeOf(a));
    console.log(a.age);

    //2，修改对象的原型
    let pp = {
        age: 14
    }
    Object.setPrototypeOf(a, pp);
    console.log(Object.getPrototypeOf(a));
    console.log(a.age);

    //3，引入了super
    // super === Object.getPrototype(this)
    //使用super调用原型上的任何方法
    let aa = {
        num: 20,
        showMsg: () => {
            console.log("I am es6")
        }
    };
    let bb = {
        show() {
            console.log();
            super.showMsg()
        },
        // show: () => {
        //     此处的super不可用   
        //     super.showMsg()
        // }
    }
    Object.setPrototypeOf(bb, aa);
    console.log(Object.getPrototypeOf(bb));
    bb.showMsg();
    bb.show();
}

console.log("==========第四部分： 解构================")
{
    //1， 对象解构
    let obj = {
        name: "duan",
        age: 12
    }

    let { name: localName, age: localAge } = obj;
    // console.log(name);
    // console.log(age);
    console.log(localName);
    console.log(localAge);
    //支持嵌嵌套结构
    //2, 数组结构"
    let arry = ["a", "b", "c"];
    let [a, b, c] = arry;
    console.log(a, b, c)
    let [...d] = arry;
    console.log(d);
}

console.log("==========第五部分： 符号与符号属性  Symbol================")
{
    //1, 用于创建非字符类型的属性名称，也就是实现私有属性
    //因为keys检索不到，所以比较难以被修改
    let firstName  = Symbol("first name");
    let lastName = Symbol("last name");
    console.log(firstName);
    console.log(lastName);
    let aa = {
        [firstName]: "simon",
        age: 4
    }
    Object.defineProperties(aa, {
        lastName : {
            value: "chao"
        }
    })
    console.log(aa[firstName]);
    console.log(aa.lastName);
    console.log(aa.age);
    console.log(aa["age"]);
    console.log(Object.keys(aa));
    //检索符号属性
    console.log(Object.getOwnPropertySymbols(aa));

    //2, 共享符号
    // symbol会搜索有没有一个键值为uid的symbol，有的话直接返回
    let uid = Symbol.for('uid');
    console.log(uid);
}

console.log("==========第五部分： Set 和Map ================")
{
    //1， set去重
    let   aSet = new Set([1,1,3,4,5,4]);
    console.log(aSet);
    // 将set再转换为数组
    console.log([...aSet]);
    aSet.forEach(function(value, key) {
        console.log(value, key);
    })

    //2, weakSet， 当set元素是对象的时候，存储的是对象的引用，原始对象被销毁后，set也无法访问
    //weakSet不允许存储非对象的值
    let aWeakSet = new WeakSet();
    aWeakSet.add({});
    console.log(aWeakSet);

    //3, map
    let aMap = new Map();
    aMap.set("name", "duan");
    aMap.set("age", 14);
    console.log(aMap);
    console.log(aMap.get("age"));

    //4, weakMap
    //存储的元素的键必须是对象
    //重要：：：：
    //通常用来存储dom对象相关的东西
}

console.log("==========第五部分： 迭代器与生成器 ================")
{
    //1, es5实现迭代器
    function createIterator(item) {
        var i = 0;
        return {
            next: function() {
                var done = (i >= item.length);
                var value = !done? item[i++] : undefined;
                return {
                    done: done,
                    value: value
                }
            }
        }
    }

    var iIteratot = createIterator([1,2,3]);
    console.log(iIteratot.next());
    console.log(iIteratot.next());
    console.log(iIteratot.next());
    console.log(iIteratot.next());

    //2, 什么是生成器， 能生成迭代器的函数叫生成器
    //迭代器拥有在函数中停止执行的能力
    function *es6CreateIterator(item) {
        //yield只能用于生成器函数的内部，即使是函数的函数内部也不可以
        for (i=0; i<item.length; i++) {
            yield item[i];
        }
    }
    let a = es6CreateIterator([6,7,8]);
    console.log(a.next());
    console.log(a.next());

    //3, for of 用于遍历迭代器返回的对象

    //4, 数组， set, map  有entries(), keys(), values() 三个方法可以用来返回迭代器对象

    //5, Dom 返回的节点列表默认是一个迭代器对象，可以使用 for of语句

    //6, 迭代器的返回值与参数
    function *iter1 () {
        //first用来接收下一次迭代传进来的参数
        //貌似这里只能传一个参数，可以使用数组或者对象来扩展
        let first = yield "a";
        console.log(first,"iter1 output");
        yield first + " 333";
        return 1000;
    }

    let a1 = iter1();
    console.log(a1.next());
    console.log(a1.next([1,2]));
    console.log(a1.next(7));

    //7, 生成委托器，也就是迭代器的嵌套使用

    //8, 迭代器与异步任务
    function run(iterfun) {
        let task = iterfun();
        let result = task.next();
        function step(){
            if(!result.done) {
                result = task.next();
                step();
            }
        }
        step();
    }

    let iter3 = function *() {
        console.log(1);
        yield;
        console.log(2);
        yield;
        console.log(3);
    }

    run(iter3);
}

console.log("==========第六部分： js中的类 ================")
{

    //1, 类的定义
    class PersonClass {
        //相当于构造函数, 这里的属性会全部绑定在对象上
        constructor(name) {
            this.name = name;
            this.color = "red";
        }
        //相当于prototype
        sayName() {
            console.log(this.name)
        };
        //静态方法，只有类本身可以访问，实例无法方法
        static create(name) {
            new PersonClass(name);
        }
        //那类属性呢
        // get age() {
        //     return this.age;
        // }
        // set age(value) {
        //     this.age = value;
        // }
        //class中不能出现赋值语句
        // a = "test";
    }
    PersonClass.prototype.age = 14;
    //class只是function的一个语法糖
    console.log(typeof PersonClass);
    console.log(PersonClass.prototype);
    let a = new PersonClass("duanchao")
    a.sayName();
    console.log(a.age);
    a.age++;
    console.log(a.age);

    let b = new PersonClass("duanchao")
    console.log(b.age);


    //2, 类的声明跟let，const类似，存在暂时性死区的特征， 类内部的方法没有contructor属性，只有caller属性

    //3, 使用变量名作为类方法名, 次特性可用于类工厂的场景
    let fun1 = "aaa";
    class c1 {
        constructor() {

        }

        [fun1]() {
            return "func1"
        }
    }
    let obj1 = new c1();
    obj1.aaa();

    //4, 类的继承
    class Rectangle {
        constructor(width, height) {
            this.width = width;
            this.height = height
        }
        getArea() {
            return this.width * this.height;
        }
    }

    class Square extends Rectangle {
        constructor(width) {
            super(width, width)
        }
    }

    let ss1 = new Square(100, 100);
    console.log(ss1.getArea());

    //5，只要函数具备[constructor]内部函数，就可以被继承
    //意思说只要extends后面的表但是最终返回的是有[constructor]内部方法的方法即可
    function FF(name) {
        this.name = name;
    }

    FF.prototype.sayHello = () => {
        console.log("j hello");
    }

    class TT extends FF {
        constructor(name) {
            super(name)
        }
    }
    let ss2 = new TT("piafu");
    console.log(ss2.name);
    ss2.sayHello();
    //6, 可以继承内置类，以扩充内置类的功能，比如Array
    //7, new.target  使用它可以模拟一个不能被实例化的类，也就是抽象基类
    class NN {
        constructor(name) {
            if(new.target === NN) {
                throw new Error("this class can not instanced directory");
            };
            this.name = name;
        }
    }

    class MM extends NN {
        constructor(name) {
            super(name)
        }
    }

    let mm = new MM("cao");
    // let nn = new NN("nn");  //会被错
    console.log(mm.name);
}


console.log("==========第七部分： 增强的数组的功能 ================")
{
    //1, 创建数组新方法
    let a1 = Array.of(1,2,3,4);
    console.log(a1);
    (function f1(x,y) {
        //arguments是一个类数组
        console.log(arguments);  //[Arguments] { '0': 1, '1': 2 }
        console.log(arguments.length);   //2
        console.log(typeof arguments);   //object
        //将类数组转换给数组
        console.log(Array.prototype.slice.call(arguments));   //[ 1, 2 ]
        //es6新功能用于转换类数组
        console.log(Array.from(arguments))   //[1, 2]
        //Array.from 支持数据定制
        console.log(Array.from(arguments, (value) => {
            return value + 1
        }))  // [2, 3]
    })(1,2)

    //创建一个内部可迭代的对象
    let numbers = {
        *[Symbol.iterator]() {
            yield 1;
            yield 2;
            yield 3;
        }
    }

    for (i of numbers) {
        console.log(i);   //1, 2, 3
    }
    console.log(Array.from(numbers));  //[1, 2, 3]

    //2, 数组上的新方法
    let n1 = [1,3,4,5,6];
    //找到第一个满足调前的值或者索引
    console.log(n1.find(n => n > 3))   //4
    console.log(n1.findIndex(n => n > 3)) //2

    //修改数组中的某些值,  改变了原数组
    console.log(n1.fill(1));   //[1,1,1,1,1]
    n1 = [1,3,4,5,6];
    console.log(n1.fill(9, 3, 4));   //[1,3,4,9,6]
    //使用数组内部的数据改变原数组
    n1 = [1,2,3,4,5];
    console.log(n1.copyWithin(2,0)); //[1,2,1,2,3]

    //3, 类型化数组
    //js默认所有的数据类型都采用64位的存储方式，会有内存浪费的现象
    //缓存区可以更加精细的利用内存
    //创建一个空的数组缓存区，单位是字节
    let buffer = new ArrayBuffer(10);
    console.log(buffer.byteLength);  //10
    let buffer1 = buffer.slice(4, 6);
    console.log(buffer1.byteLength);  //2

    //使用视图（view）来操作数组缓冲区
    let view = new DataView(buffer);
    let view1 = new DataView(buffer, 4, 6)
    console.log(view);
    // DataView {
    //     byteLength: 10,
    //     byteOffset: 0,
    //     buffer: ArrayBuffer { byteLength: 10 } }
    console.log(view1);
    
    //读取写入数据
    //getInt8(byteOffset, littleEndlian)
    //setInt8(byteOffset, value, littleEndlian)
    view.setInt8(0, 8);
    view.setInt8(1, 8);
    view.setInt8(2, 4);
    view.setInt8(3, 8);
    console.log(view.getInt8(0));  //8
    console.log(view.getInt16(0));  //2056
    //0000100000001000   -->  2048 + 8  -->  2056

    //可见，视图是部分数据类型的，多种数据类型可以混用
    //类型化数组，就是特定类型的视图
    let buffer3 = new ArrayBuffer(10);
    //这样生成的数组更小占 8 * 10 bite， 一般的10长度的数组大小为 64 * 10 bite
    let view3  = new Int8Array(buffer3);
    console.log(view3);
    view3.set([1, 3, 5, 6, 7]);
    console.log(view3); //Int8Array [ 1, 3, 5, 6, 7, 0, 0, 0, 0, 0 ]
    console.log(view3.length);  //10
    //一般数组可以使用的方法，在类型化数组里都可以使用, 处理完后依然是类型化数组，且具有类型化数组的特性，比如不能伸缩的特性
    // 不能伸缩就表明，所有修改数组的长度的方法都不能用
    console.log(view3.find(value => value > 2))  //2
}
