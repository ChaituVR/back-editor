var ctrl_down = false;
var ctrl_key = 17;
var s_key = 83;

// $(document).keydown(function(e) {
//     if (e.keyCode == ctrl_key) ctrl_down = true;
// }).keyup(function(e) {
//     if (e.keyCode == ctrl_key) ctrl_down = false;
// });
//
// $(document).keydown(function(e) {
//     if (ctrl_down && (e.keyCode == s_key)) {
//         console.log("EFEWFEWFEF");
//         // Your code
//         return false;
//     }
// });


var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("myTextArea"), {
    lineWrapping: true,
    extraKeys: {
        'Ctrl-Space': 'autocomplete'
    },
    lineNumbers: true,
    autofocus: true,
    keyMap: "sublime",
    autoCloseBrackets: true,
    matchBrackets: true,
    showCursorWhenSelecting: true,
    theme: "monokai",
    tabSize: 2,

});



var socket = io();
getFileNames();


socket.on("setFileNames",function(files){
  setFileNames(files);
});
socket.on("setTheContentFromFile",function(fileContent,extName){
  setTheContentFromFile(fileContent,extName);
});

function getFileNames(){
  socket.emit('getFileNames');
}
function setFileNames(files){
  for(var file of files){
    $("#project-files").append("<button class='fileName-btn' value='"+file+"'>"+file+"</button><br>");
  }
  $(".fileName-btn").on('click',function(){
   getTheContentFromFile(this.value);
  });
}
function getTheContentFromFile(fileName){
  socket.emit('getTheContentFromFile',fileName);

}
function setTheContentFromFile(fileContent,extName){
  myCodeMirror.doc.setValue(fileContent);
  setFileType(extName);
}
function setFileType(extName){
  console.log(extName)
  if(extName == ".html"){

    myCodeMirror.setOption("mode", "text/html");
  }
  else if(extName==".css"){
    myCodeMirror.setOption("mode", "text/css");
  }
  else if(extName==".js"){
    myCodeMirror.setOption("mode", "javascript");
  }
}
