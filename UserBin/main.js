var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("myTextArea"), {
    mode: 'javascript',
    lineWrapping: true,
    extraKeys: {
        'Ctrl-Space': 'autocomplete'
    },
    lineNumbers: true,
    autofocus: true
});
