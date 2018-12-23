var net=require('net');

var netClient=net.connect({port:8124},function () {
    console.log('server connected');
    netClient.write('sixther');
})


netClient.on('data',function (data) {
    console.log(data.toString());
    netClient.end();
});

netClient.on('end',function () {
    console.log('client disconnected');
})