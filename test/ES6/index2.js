//TODO:  包含promise， 反射部分
console.log("==========第八部分： Promise和异步编程 ================")
{
    //dom的事件模型
    //nodejs的回调模型，比较容易串联多个回调，但是会有回调地狱的缺陷
    //Promise   es6引进的异步方法， 函数返回一个promise对象
    //三种状态  pending  resolved  reject

    let promise = new Promise(function(resolve, reject) {
        console.log("hi, primise");
        resolve(43);
        reject(44);
    })

    // promise.then(function(value){
    //     console.log(value);
    //     console.log("promise 执行完毕")
    // }, function(value) {
    //     console.log(value);
    // })

    // promise.catch(function(value) {
    //     console.log(value);
    // })

    //Promise.all   接收多个promise对象，都返回后才会执行resolv方法
    //Promise.race  接收多个promise对象，任意一个返回便可以执行resolv方法
}

console.log("==========第九部分： 代理与反射接口 ================")
{
    //代理是一种封装，能够拦截并改变js引擎的底层操作
    // new Proxy()
    let target = {};
    //使用{}  代理 target
    let proxy = new Proxy(target, {
        //代理set方法
        //receiver就是proxy本身
        set(trapTarget, key, value, receiver) {
            console.log("代理的set方法是否被执行");
            //Reflect尽在Proxy内部才可以使用
            Reflect.set(trapTarget, key, value, receiver);
        },
        get(trapTarget, key, receiver)  {
            console.log("代理的get方法是否被执行");
            return Reflect.get(trapTarget, key, receiver);
        }
        //此外，还有has，  deleteProperty, getPrototypeOf, setPrototypeof
    })
    proxy.name = "es6";
    console.log(proxy.name);

    //apply construct 对应 [call]  [construct] 两个内部方法
    //可以用来验证函数的参数
}

