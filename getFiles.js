var fs = require('fs');

var getFileNames = function(dir){
 return getFilesOrganised(ReadFileNames(dir))
}

var ReadFileNames = function(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    if (files == 0) {
        files_.push("Empty>" + dir);
    } else {
        files_.push("Directory>" + dir);
    }
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            ReadFileNames(name, files_);

        } else {
            files_.push("file>" + name);
        }
    }
    return files_;
}

function getFilesOrganised(files) {
    var organisedFiles = [];
    var remainingFiles = [];
    for (var i in files) {
        var checkDir = files[i].split(">");
        if (checkDir.length == 2) {
            var objA = {};
            if (checkDir[0] == 'Empty') {
                objA[checkDir[1]] = [];
                organisedFiles.push(objA);
            } else if (checkDir[0] == 'Directory') {
                objA[checkDir[1]] = [];
                organisedFiles.push(objA);

            } else if (checkDir[0] == 'file') {
                var fileSlipt = checkDir[1].split("/");
                // objA[checkDir[1]]="File";
                remainingFiles.push(checkDir[1]);
            }

        }

    }

    for (var i in remainingFiles) {
        var checkDirectory = remainingFiles[i].split("/");
        var lastValue = checkDirectory.pop();
        var currentDirectory = checkDirectory.join("/");
        for (var k in organisedFiles) {
            var currentKey = Object.keys(organisedFiles[k])[0]
            if (currentKey == currentDirectory) {
                organisedFiles[k][currentKey].push(lastValue);

            }
        }
    }
    console.log(organisedFiles)
    return organisedFiles;
}

module.exports.getFileNames = getFileNames;
