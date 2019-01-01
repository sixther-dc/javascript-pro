function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target);
        //装饰器这里可以给类赋值
        //target究竟代表什么，可以访问类的各个属性，也就是说在装饰的时候可以对类进行预配置
        target.name = "duan"
        target.method();
        console.log("g(): called");
    }
}

function sealed(constructor: Function): void {
    console.log("类装饰器被执行");
    constructor("test");
    // console.log(value);
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

//类装饰器不用加参数，因为唯一的参数就是类的构造函数
@sealed
class C {
    private name: string = "chao";

    constructor(message:string) {
        console.log(message);
    }
    @f()
    @g()
    method() {
        console.log("本方法被调用");
        console.log(this.name);
    }
}