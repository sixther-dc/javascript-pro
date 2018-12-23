/*
 * WebSocket协议主要分为两个部分：握手和数据传输
 * 1，握手通过HTTP发起请求报文，与普通的HTTP请求不同的是增加了两个报头，表示请求服务器端升级协议为WebSocket
 *
 * Upgrade: websocket
 * Connection: Upgrade
 *
 * 2, 数据传输采用WebSocket数据帧协议
 */

var app=require('http').createServer(handler);
var io=require('socket.io')(app);
var util=require('util');
var url=require('url');


function handler(req,res) {
     console.log(req);
     res.write('hello\n');
     res.end(util.inspect(url.parse(req.url,true)));
}

app.listen(3000);



io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});