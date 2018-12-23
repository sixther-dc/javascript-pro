//nodejs中的事件（回调函数）统一由node的事件队列维护，即EventEmitter对象维护。

var eventEmitter=require('events').EventEmitter;
var event = new eventEmitter();

event.on('some_event',function(){   //注册一个事件
	console.log('this is test for event');
});

event.emit('some_event');  //执行之前注册的时间


/**   测试模块用的代码
setTimeout(function(){
	event.emit('some_event');
},1000)


var Hello=require('./module');
var hello=new Hello();

hello.setName('simon');
hello.sayHello();

**/