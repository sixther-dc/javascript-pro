function Cat(name) {
    this.name = name;
    Cat.number = Cat.number + 1
    //不加var则为全局变量
    global_var = "duanchao"

}

//这种方法可以定义类变量
Cat.number = 0;

//prototype的函数需要new出一个对象方可调用
Cat.prototype.run = function() {
    console.log(this.name, "go go go..")
}

//不加prototype的时候，只有类可以调用
Cat.walk = function() {
    console.log(this.name, "walk walk walk..")
}

var cat1 = new Cat("Tom");

//在cat2对象处重写run方法
cat1.run = function(){
    console.log("I will overwite run function...")
}

//重写后新生成的对象调用run方法时不受影响
var cat2 = new Cat("Jerry");
cat2.run()

Cat.walk()

console.log(Cat.number)
console.log(global_var)