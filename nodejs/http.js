//npm install -g supervisor  可是用supervisor http.js 一直监听http.js文件的变化，然后自动重启http server
var http=require('http');
var util=require('util');
var url=require('url');

/**  Verion 1
http.createServer(function(req,res){
	console.log(res);
	res.writeHead(200,{'Host':'sixther.me'});
	res.write('<h1>sixther</h1>');
	res.end('<p>This is My House</p>')
}).listen('3000')
**/



/**  Vertion 2  **/

var server=new http.Server();

server.on('request',function(req,res){
	console.log(req);
	res.writeHead(200,{'Host':'sixther.me'});
	res.write('<h1>sixther</h1>');
	res.write('<p>This is My House</p>');
	res.end(util.inspect(url.parse(req.url,true)));

});

server.on('close',function(){
	console.log('the connection has been closed');
})
server.listen(3000);