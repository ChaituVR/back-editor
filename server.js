var express = require('express');
var app = express();


var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
  console.log()
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect',function(){
    console.log("disconnect");
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
