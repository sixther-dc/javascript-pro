var name;   //声明一个全局变量
exports.setName=function(the_name){
	name=the_name;
};

exports.sayHello=function(){
	console.log('Hello ' + name);
};


//也可以在一个文件中export出一个函数，作为该文件的模块输出

function Hello() {
	var name;
	this.setName=function(the_name){
		name=the_name;
	};
	this.sayHello=function(){
		console.log('Fuck ' + name);
	}

	console.log(this);   //这里的this如果是直接在该脚本中执行Hello函数，则代表global对象，如果通过module.exports执行的Hello，则代表Hello定义的对象。
}


module.exports=Hello;