/**
 * Created by hzy on 2016/12/24 0024.
 */

var scriptVersion = "v1319";

var exampleLib = {
    "maxtrak": [
         {"name": "maxtrak",    "file": "./demos/maxtrak.txt", "sceneId": "20170504082603304643309", action: "view"}
	],
     "office": [
         {"name": "office",    "file": "./demos/office.txt", "sceneId": "20150923601692", action: "view"}
	]
}

var exampleInterface = [
    {"name": "util", "file": "./demos/interface/util.js"}
	,{"name": "object", "file": "./demos/interface/object.js"}
	,{"name": "camera",  "file": "./demos/interface/camera.js"}
    ,{"name": "gui", "file": "./demos/interface/gui.js"}
    ,{"name": "input", "file": "./demos/interface/input.js"}
    ,{"name": "keycode", "file": "./demos/interface/keycode.js"}
    ,{"name": "chinese", "file": "./demos/interface/chinese.js"}
];


//momoda plugin callback
function external_function(param){
	setTimeout(function(){
		alert(param);
	}, 100);
}