/**
 * Created by hzy on 2016/12/29 0029.
 */
var server,
    editor,
    docs = [],
    curDoc;

jQuery(function () {
    editor = ace.edit("editor");
    editor.getSession().setUseWorker(true);
    editor.setTheme("ace/theme/monokai");
    //editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setWrapLimitRange(null, null);
    editor.setShowPrintMargin(false);
    editor.$blockScrolling = Infinity;
    ace.config.loadModule('ace/ext/tern', function () {
        editor.setOptions({
            /**
             * Either `true` or `false` or to enable with custom options pass object that
             * has options for tern server: http://ternjs.net/doc/manual.html#server_api
             * If `true`, then default options will be used
             */
            enableTern: {
                /* http://ternjs.net/doc/manual.html#option_defs */
                defs: [],
                /* http://ternjs.net/doc/manual.html#plugins */
                plugins: {
                    doc_comment: {
                        fullDocs: true
                    }
                },
                /**
                 * (default is true) If web worker is used for tern server.
                 * This is recommended as it offers better performance, but prevents this from working in a local html file due to browser security restrictions
                 */
                useWorker: true,
                /* if your editor supports switching between different files (such as tabbed interface) then tern can do this when jump to defnition of function in another file is called, but you must tell tern what to execute in order to jump to the specified file */
                switchToDoc: function (name, start) {
                    console.log('switchToDoc called but not defined. name=' + name + '; start=', start);
                },
                /**
                 * if passed, this function will be called once ternServer is started.
                 * This is needed when useWorker=false because the tern source files are loaded asynchronously before the server is started.
                 */
                startedCb: function () {
                    //once tern is enabled, it can be accessed via editor.ternServer
                    console.log('editor.ternServer:', editor.ternServer);
                },
            },
            /**
             * when using tern, it takes over Ace's built in snippets support.
             * this setting affects all modes when using tern, not just javascript.
             */
            enableSnippets: true,
            /**
             * when using tern, Ace's basic text auto completion is enabled still by deafult.
             * This settings affects all modes when using tern, not just javascript.
             * For javascript mode the basic auto completion will be added to completion results if tern fails to find completions or if you double tab the hotkey for get completion (default is ctrl+space, so hit ctrl+space twice rapidly to include basic text completions in the result)
             */
            enableBasicAutocompletion: false,

        });

        function load(file, c) {
            var xhr = new XMLHttpRequest();
            xhr.open("get", file, true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) c(xhr.responseText, xhr.status);
            };
        }

        // function newAceDoc(documentText) {
        //     var EditSession = ace.require("ace/edit_session").EditSession;
        //     return new EditSession(documentText, "ace/mode/javascript");
        // }

        function loadInterface(file, name) {
            load(file, function (body) {
                server.addDoc(name, newAceDoc(body));
            });
        }

        server = editor.ternServer;
        if (!server) {
            console.log("fail to load ternServer");
        }

        for (var i in exampleInterface) {
            loadInterface(exampleInterface[i].file, exampleInterface[i].name);
        }

        //添加默认编辑页面
        var pathname = window.location.pathname;
        var url = 'demos/maxtrak.txt';
        if (pathname.indexOf('office') > 0) {
            url = 'demos/office.txt';
        }
        console.log(url);
        $.ajax({
            url: url,
            type: "get",
            timeout: "5000",
            async: false,
            data: {},
            dataType: "text",
            success: function (ret) {
                //that.setEditorText(ret);
                console.log(ret);
                //registerDoc("new1", ret);
            },
            error: function (ret) {
                alert("fail to load script");
            }
        });

    });

    docsBindClick();
});

function setSelectedDoc(pos) {
    $("#docs .selected").removeClass("selected");
    $($("#docs li")[pos]).addClass("selected");
}

function registerDoc(name, text) {
    name = name.substring(name.lastIndexOf("/") + 1);
    var doc = newAceDoc(text);
    doc.session = doc;
    server.addDoc(name, doc);
    var data = {
        name: name,
        doc: doc
    };
    docs.push(data);
    $("<li></li>").text(name).insertBefore($("#docs #addFile"));
    if (!curDoc) {
        curDoc = data;
        selectDoc(docs.length - 1);
    }
}

function newAceDoc(documentText) {
    var EditSession = ace.require("ace/edit_session").EditSession;
    var session = new EditSession(documentText, "ace/mode/javascript");
    var UndoManager = ace.require("ace/undomanager").UndoManager;
    session.setUndoManager(new UndoManager());
    return session;
}

//selects a tab by index.
function selectDoc(pos) {
    server.hideDoc(curDoc.name);
    setSelectedDoc(pos);
    curDoc = docs[pos];
    editor.setSession(curDoc.doc); //    editor.swapDoc(curDoc.doc);
}

//bind click on docs (tabs) to change tab
function docsBindClick() {
    $('#docs').on('click', function (e) {
        var tabs = $("#docs li");
        for (var i in tabs) {
            if (tabs[i] == e.target) {
                return selectDoc(i);
            }
        }
    });

    $("#addFile").on("click", function () {
        for (var i = 1; i < 20; i++) {
            var find = false;
            var name = "new" + i;
            for (var j in docs) {
                if (docs[j].name == name) {
                    find = true;
                }
            }
            if (!find) {
                registerDoc(name, "");
                break;
            }
        }
    })
}

function getCodes() {
    var codes = [];
    for (var i in docs) {
        codes.push(docs[i].doc.getValue());
    }
    return codes;
}

function resetDocs() {
    $("#docs li").remove();
    for (var i in docs) {
        server.delDoc(docs[i].name);
    }
    docs.length = 0;
    curDoc = null;
}

function resizeEditor() {
    var editor = ace.edit("editor");
    editor.resize(true);
}