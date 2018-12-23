module.exports={};  

//闭包只能取得包含函数中任何变量的最后一个值
function createFunctions() {
	var results = new Array();
	for (var i = 0; i <10; i++){
		results[i]=function(num) {
			return num;
		}(i)
	}
	return results
}	

var cc=createFunctions()
for (var i = 0; i <10; i++){
	//console.log(cc[i]);
}

//闭包中的this，闭包中的this执行全局环境，即window
var name = 'the windows';
var object = {
	name : 'the objects',
	getName : function() {
		return function() {
			return this.name;
		};
	}
};
//console.log(object.getName()());

// JS中没有块级元素
function a(){
	for (var i=0; i < 10; i++) {
		//console.log(i);
	}
	//console.log(i);
}

a();

//
//var test1Var = 'test';
function test1() {
	global.test1Var = 'test';
};
console.log(test1Var);   //这里有一个大大的不明白

// 闭包,按道理如下的代码会创建三个函数，以此为输出0，1，2，其实在循环结束后，i的值已经变成了三了，而实现创建的那三个函数中的i只是i的引用，所以实际上为全部输出222
var task=[];

for (var i=0; i<3; i++) {
	task[i]=function() {
		console.log(i - 1);
	}
}
//task[0]();
//task[1]();
//task[2]();
// 上述问题的解决办法是将i的值固化下来，即作为实际的值传给一个函数，然后再这个函数中用匿名函数的方式将函数复制给task的元素，因为函数内的函数可以继承父函数的上线文环境
for (var i=0; i<3; i++) {
	(function(n){
		task[i]=function() {
			console.log('>>> ' + n)
		}
	})(i)
}

//由于闭包会占用其引用函数的上下文，所以闭包跟器父函数为互相引用，根据JavaScript的垃圾回收机制(计数器)，这段内存将永远不能被回收，
task[0]();
task[1]();
task[2]();

function test(n,m){
	console.log(n + m);
}
test(1);

// nodeJS特有的异步回调机制，下面的代码段中的setTimeout不会顺序的sleep2秒，而是在每次循环都注册一个2秒后执行回调函数的的任务，然后继续执行下一个循环。
function test(){
	for(var i=0; i<10; i++) {
		console.log(new Date);
		setTimeout(function(){}, 2000);
	}
}
//要实现同步的sleep，修改程序,其实也不对，这个会直接注册10个打印当前时间的异步任务，
function test(){
	for(var i=0; i<10; i++) {
		setTimeout(function(){
			console.log(new Date);
		},2000);
	}
}
test();