var util = require('util');

function Base(){            //这里称之为构造函数,就是指构造对象的函数
	this.name='Base';
	this.base=1991;
	this.sayHello=function(){
		console.log('Hello ' + this.name);
	}
}

Base.prototype.fuckName=function(){       //prototype称之为原型
	console.log('fuck ' + this.name);
}

/** 原型变量跟在构造函数内部定义的变量有什么不同呢 **/
/** 1，子对象只能继承原型中定义的变量 **/
/** 2，原型是所有对象共有的属性（采用原型定义函数可以减少开销），构造函数中定义的变量为每个对象所独有 **/

function Sub(){
	this.name='sub';
}

util.inherits(Sub, Base)


var objBase=new Base();
objBase.sayHello();
objBase.fuckName();

var objSub=new Sub();
//objSub.sayHello();
objSub.fuckName();      //inherits只会继承在原型中定义的函数，而在构造函数内部定义的属性跟函数都不会被继承


console.log(objBase);
console.log(util.inspect(objBase,true));
console.log(objBase.toString())