var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var vhost = require('vhost')

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.use('/codemirror', express.static(__dirname + '/node_modules/codemirror/'));

app.get('/', function(req, res) {
    res.sendFile('index.html');

});

var UserBin = require('./UserBin/server.js')

var os = require('os');
var hostname = os.hostname();
console.log(hostname)
var hostile = require('hostile')  //https://www.npmjs.com/package/hostile
hostile.set('127.0.0.1', 'apple.localhost', function (err) {
  if (err) {
    console.error(err)
  } else {
    console.log('set /etc/hosts successfully!')
  }
})

// app.use('/UserBin', require('./UserBin/server.js').app);
app.use(vhost('apple.localhost', UserBin.app))

// app.get('/UserBin', UserBin.app);

var getFiles = require('./getFiles')
io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('getFileNames', function() {
        var list = getFiles.getFileNames('UserBin');
        io.emit('setFileNames', list);
        //   fs.readdir('UserBin', function(err, list) {
        //  if (err) { return done(err); }
        //   io.emit('setFileNames', list);
        // });
        //  var files = fs.readdirSync('UserBin');

    });
    socket.on('getTheContentFromFile', function(fileName) {
        fs.readFile('UserBin/' + fileName, function(err, contents) {
            if (err) {
             console.log(err);
            }
            io.emit('setTheContentFromFile', contents.toString(), path.extname(fileName));
        });
    });
    socket.on('disconnect', function() {
        console.log("disconnect");
    });
});

http.listen(process.env.PORT || 80, function() {
    console.log('listening on port -- '+this.address().port);
});
