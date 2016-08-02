var express = require('express');
var app = express();
var fs= require('fs');
var path= require('path');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.use('/codemirror', express.static(__dirname + '/node_modules/codemirror/'));

app.get('/', function(req, res){
  res.sendFile('index.html');

});

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    if(files==0){
      files_.push("Empty>"+dir);
    }
    else{
      files_.push("Directory>"+dir);
    }
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);

        } else {
            files_.push("file>"+name);
        }
    }
    return files_;
}
function getFilesOrganised(files){
  var organisedFiles=[];
  var remainingFiles=[];
  for (var i in files){
  var checkDir = files[i].split(">");
  if(checkDir.length==2){
    var objA={};
    if(checkDir[0]=='Empty'){
      objA[checkDir[1]]=[];
      organisedFiles.push(objA);
    }
    else if(checkDir[0]=='Directory'){
      objA[checkDir[1]]=[];
      organisedFiles.push(objA);

    }
    else if(checkDir[0]=='file'){
      var fileSlipt=checkDir[1].split("/");
      // objA[checkDir[1]]="File";
      remainingFiles.push(checkDir[1]);
    }

  }

  }

  for (var i in remainingFiles){
  var checkDirectory = remainingFiles[i].split("/");
  var lastValue=checkDirectory.pop();
  var currentDirectory=checkDirectory.join("/");

  // for(var i = 0; i < organisedFiles.length; i++) {
  //   if (organisedFiles[i][currentDirectory] == currentDirectory) {
  //       console.log(currentDirectory)
  //   }
// }
  }


  return organisedFiles;
}
console.log(getFilesOrganised(getFiles('UserBin')))



io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('getFileNames', function(){
    var list=getFiles('UserBin');
    io.emit('setFileNames', list);
  //   fs.readdir('UserBin', function(err, list) {
  //  if (err) { return done(err); }
  //   io.emit('setFileNames', list);
  // });
  //  var files = fs.readdirSync('UserBin');

  });
  socket.on('getTheContentFromFile',function(fileName){
    fs.readFile('UserBin/'+fileName, function(err, contents) {

    io.emit('setTheContentFromFile', contents.toString(),path.extname(fileName));
});
  });
  socket.on('disconnect',function(){
    console.log("disconnect");
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
