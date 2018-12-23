var net=require('net');

var server=net.createServer(function (socket) {

    socket.setNoDelay(true);  //关闭Nagle算法，即服务端的数据产生后立即发出
    socket.on('data',function (data) {
        var cmd=data.toString().replace(/\r|\n/ig,"");
        if (cmd) {
            socket.write('hello');
        }
    });
    socket.on('end',function (data) {
        console.log('disconnect');
    })

    socket.write("welcome sixther's world\n");
})

server.listen(8124,function () {
    console.log('server up');
});

server.close(function () {          //服务器关闭的时候触发
    console.log('server closed');
});

server.error(function () {    //服务器关闭的时候触发
    console.log('server error')
})