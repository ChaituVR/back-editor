var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.use('/codemirror', express.static(__dirname + '/node_modules/codemirror/'));

app.get('/', function(req, res) {
    res.sendFile('index.html');

});
app.get('/king', function(req, res) {
    res.send("EFEFEF");
});
//var UserBin = require('./UserBin/server')



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

// app.listen(3001, function() {
//     console.log('listening on port -- '+this.address().port);
// });
module.exports.app=app;