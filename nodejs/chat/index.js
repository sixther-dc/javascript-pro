var express=require('express')
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var pty = require('pty.js');


app.use('/',express.static(__dirname + '/public'));

app.get('/',function (req,res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/test',function (req,res) {
    res.send('this is test');
})

app.use('/public',express.static(__dirname + '/public'));


var term;

io.on('connection',function (socket) {

    term = pty.spawn('bash',[], {
        name: 'xterm-256color',
        cols: 80,
        rows: 30
    });

    term.on('data', function (data) {
        io.emit('output',data)
    });

    socket.on('resize', function(data) {
        term.resize(data.col, data.row);
    });

    socket.on('input',function (data) {
        term.write(data);
    });

    socket.on('disconnect', function() {
        term.end();
    });
})

http.listen(8000);