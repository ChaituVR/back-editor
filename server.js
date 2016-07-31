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
    fs.readdir('UserBin', function(err, list) {
   if (err) { return done(err); }
    io.emit('setFileNames', list);
  });
  //  var files = fs.readdirSync('UserBin');

  });
  socket.on('getTheContentFromFile',function(fileName){
    fs.readFile('UserBin/'+fileName, function(err, contents) {
    io.emit('setTheContentFromFile', contents.toString());
});
  });
  socket.on('disconnect',function(){
    console.log("disconnect");
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
