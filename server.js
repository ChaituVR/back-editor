var express = require('express');
var app = express();
var fs= require('fs');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile('index.html');

});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('getFileNames', function(){
    var files = fs.readdirSync('UserBin');
    io.emit('setFileNames', files);
  });
  socket.on('disconnect',function(){
    console.log("disconnect");
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
