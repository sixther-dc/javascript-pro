process.stdout.write('>>>')

process.stdin.resume();

process.stdin.on('data',function(data){             //这个'data'有什么用,嗯，是一个事件类型
	process.stdout.write('read from console: ' + data.toString());
	process.stdout.write('>>>');    
});