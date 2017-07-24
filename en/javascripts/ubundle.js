// 命名空间
Namespace = new Object();
// 全局对象仅仅存在register函数，参数为名称空间全路径，如"Grandsoft.GEA"
Namespace.register = function(fullNS) {
	// 将命名空间切成N部分, 比如Grandsoft、GEA等
	var nsArray = fullNS.split('.');
	var sEval = "";
	var sNS = "";
	for ( var i = 0; i < nsArray.length; i++) {
		if (i != 0)
			sNS += ".";
		sNS += nsArray[i];
		// 依次创建构造命名空间对象（假如不存在的话）的语句
		// 比如先创建Grandsoft，然后创建Grandsoft.GEA，依次下去
		sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS
				+ " = new Object();";
	}
	if (sEval != "")
		eval(sEval);
};

// 工具类
Namespace.register('ubundle.util');
ubundle.util = {
	/**
	 * 替换死链图片
	 */
	errorimg : function(src, root) {
		root = root ? root : $('.overflow-hidden img');
		root.each(function() {
			$(this).error(function() {
				$(this).attr('src', src);
			});
		});
	},
	/**
	 * 获取应用根路径
	 */
	getRoot : function() {
		var path = this.getpath();
		var ret = ubundle.util.getServer() + '/';
		if (path != '') {
			ret += path + '/';
		}
		return ret;
	},
	getServer : function() {
		return 'http://' + window.location.host;
	},
	/*
	 * 获取项目名 没有返回''
	 */
	getpath : function() {
		if (ubundle.config.app_path == null) {
			alert('请配置项目路径[ubundle.config.app_path]');
		}
		return ubundle.config.app_path;
	},
	domain : function() {
		return ubundle.util.getRoot() + 'domain.html';
	},
	/**
	 * 获取url中的参数
	 * 
	 * @param name
	 * @returns
	 */
	geturlparam : function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return (r[2]);
		return null;
	},
	// 显示模型信息
	showBundleInfo : function(json) {

		var objs = $.parseJSON(json);
		var html = "";
		for ( var i = 0; i < objs.length; i++) {
			var obj = objs[i];
			for ( var key in obj) {
				if (key == "UserID" && obj["UserID"] == null) {
					// alert("对象没有管理ID");
				}
				html += "<span class='js-keyword'>\""
						+ key
						+ "\"</span>"
						+ "<span class='js-operator'> = </span><span class='js-string'>\""
						+ obj[key] + "\"</span><br/>";
			}
		}
		$("#dialog").html(html);

	}
};

Namespace.register('momoda.local.scene');
momoda.local.scene = {
	info : {
		"id" : "201510230318",
		"stype" : "mmd",
		"resource" : {
			"version" : "0.3.2",
			"baseObjIdx" : 3,
			"CamPos" : "-10.541 9.997 -12.835",
			"CamRot" : "0.266 0.305 -0.089 0.910",
			"objects" : {
				"0" : {
					"clsId" : 0,
					"plan" : {
						"1" : {
							"name" : "FloorPlan",
							"offset" : "-0.200",
							"plcs" : {
							// "2" : {
							// "clsId" : 3,
							// "userId" : "object01",
							// "pos" : "0.000 0.000 0.000",
							// "rot" : "0.000 1.000 0.000 0.000",
							// "bIdx" : 0
							// }
							}
						}
					}
				}
			},
			// "bIdList" : ["064FC137AC6F41F1931788EF05FCC1C9"],
			"bIdList" : [],
			"simplify" : "true"
		}
	},
	bundelserver : "http://model.3dmomoda.cn/librarys",
	init : function() {
		//uModel.state = -1;// 预览
		if(!uModel.loadJson){
			uModel.loadJson = JSON.stringify(this.info.resource); // 可以是空的,
		}
		// 空的代表新的作品创建,
		// 非空就是编辑老作品
		uModel.param = "{\"config\":\"NeedItemInfo\",\"language\":\"en\",\"stype\":\""
				+ this.info.stype + "\",\"bundle\":\"" + this.bundelserver
				+ "\"}";
		uModel.start3d();
		uModel.resize($(".ui-layout-east").width(), $(".ui-layout-east")
				.height());
	},
	cmds : [ {
		"cmd" : "HideEffectPanel"
	}, {
		"cmd" : "HideMonitorPanel"
	}, {
		"cmd" : "HideScreenshotPanel"
	}, {
		"cmd" : "EnableRectangleSelect",
		"enable" : false
	}
	]
};
Namespace.register('momoda.local.page');
momoda.local.page = {
	RegExpLib : {
		"<br>" : "\n",
		"&lt;" : "<",
		"&gt;" : ">"
	},
	_gobj : null,
	lib : {},
    currentObject: null,
	//resetLib : new Array(),
	showCmds : function() {
		this.lib = exampleLib;
		 $(".ui-layout-west #contents").empty().append(this.html());
	},
	html : function() {
		var html = $('<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"></div>');
		for ( var key in this.lib) {
			var item =
			'<div class="panel panel-default">\
				<div class="panel-heading" role="tab" id="headingOne">\
					<h4 class="panel-title">\
						<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">\
							title\
						</a>\
					</h4>\
				</div>\
				<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">\
					<div class="panel-body">\
				</div>\
			</div>';
			var obj = $(item);
			obj.find("#headingOne").attr("id", key);
			obj.find("a").attr("href", "#collapse" + key).attr("aria-controls", "collapseOne");
			obj.find("a").text(key);
			obj.find("#collapseOne").attr("id", "collapse" + key).attr("aria-labelledby", key);
            obj.find(".panel-body").css("padding", 0);
			html.append(obj);
			var tutorial = this.lib[key];
			if (hasNext(tutorial)) {
				var list = $("<ul class='list-group' style='margin-bottom: 0px;'></ul>");
				for ( var i in tutorial) {
					var str = "<li class='list-group-item' style='cursor: pointer;' data = '" + JSON.stringify(tutorial[i]) +"' onclick='momoda.local.page.selectSomeOne(this);'>"
							+ tutorial[i].name + "</li>";
                    list.append($(str));
				}
				obj.find(".panel-body").append(list);
			}
		}
		function hasNext(object) {
			return object && object.length > 0;
		}
		return html;
	},
	queryExample : function() {
		var term = $("#search").val();
		var map = {};
		for ( var key in exampleLib) {
			var lis = exampleLib[key];
			if (key.indexOf(term) != -1) {
				map[key] = lis;
			} else {
				for ( var li in lis) {
					if (lis[li].name.indexOf(term) != -1) {
						if (map[key] !== undefined && map[key] != null) {
							map[key][li] = lis[li];
						} else {
							map[key] = [];
							map[key].push(lis[li]);
						}
					}
				}
			}
		}
		this.lib = map;
		$(".ui-layout-west #contents").html(this.html());
	},
	selectSomeOne : function(object) {
		var lastObject;
		if (this._gobj){
			//$(this._gobj).removeAttr("style");
            $(this._gobj).removeClass("active");
			var lastData = $(this._gobj).attr("data");
			lastObject = JSON.parse(lastData);
		}
		this._gobj = object;
        $(this._gobj).addClass("active");
		// $(object).css({
		// 	"background-color" : "#27537a",
		// 	"color" : "#FFF"
		// });

		resetDocs();

		var data = $(object).attr("data");
		var object = JSON.parse(data);
        this.currentObject = object;

		if(object.files){
			for(var file in object.files){
				this.loadScript(object.files[file]);
			}
		}
		else if(object.file){
			this.loadScript(object.file);
		}
		$("#sceneId").val(object.sceneId);
		if(lastObject
			&& lastObject.sceneId == object.sceneId
			&& lastObject.action == object.action){
			this.resetting();
            this.onLoadComplete();
		}
		else{
			this.loadScene(object);
		}
	},
	// setEditorText: function(code){
	// 	var el = document.getElementById("editor");
	// 	el.env.editor.setValue(code, 1);
	// },
	// getEditorText: function(){
	// 	var el = document.getElementById("editor");
	// 	var code = el.env.editor.getValue();
	// 	return code;
	// },
	loadScript: function(file){
		var that = this;
		$.ajax({
			url: file,
			type: "get",
			timeout: "5000",
			async: false,
			data: {},
			dataType: "text",
			success: function(ret){
				//that.setEditorText(ret);
				registerDoc(file, ret);
			},
			error: function(ret){
				alert("fail to load script");
			}
		});
	},
	loadScene: function(object){
		var load_url = "http://momoda.3dmmd.com/scene/downjson?sceneid=" + object.sceneId
		if (object.sceneId === '20170109153114611633853' || object.sceneId === '20170417152241210691316' || object.sceneId === '20170418134129476336884' || object.sceneId === '20170504082603304643309' || object.sceneId === '20160329211902106773049' || object.sceneId === '20150923601692' || object.sceneId === '20170508194011659972') {
			load_url =  "scenes/" + object.sceneId + ".json"; 
		}
		$.ajax({
			//url: "http://momoda.3dmmd.com/scene/downjson?sceneid=" + object.sceneId,
			//url: "scenes/" + object.sceneId + ".json",
			url: load_url,
			type: "get",
			timeout: "20000",
			async: true,
			crossDomain: true,
			data: {},
			dataType: "json",
			success: function(ret){
				if(ret.state){
					uModel.loadJson = ret.content;
					uModel.state = object.action == "edit"? 0: -1;
					momoda.local.scene.init();
				}
			},
			error: function(ret){
				alert("Fail to load scene!");
			}
		});
	},
	loadScriptFromServer: function(object){
        var that = this;
		$.ajax({
			url: "http://www.3dmomoda.com/models/" + object.sceneId + ".config?" + (new Date()).getTime(),
			type: "get",
			timeout: "5000",
			async: false,
			data: {},
			dataType: "text",
			success: function(ret){
				if(ret){
					that.executeSingleCode(ret);
				}
			},
			error: function(ret){
				console.log("no script found");
			}
		});
	},
	executeCode : function() {
		var codes = getCodes();
		for(var i in codes){
			var cmd = {
				"cmd": "LoadScriptString",
				"script": codes[i]
			};
			uModel.RunCommand(JSON.stringify(cmd));
		}
	},
	executeSingleCode : function(code){
		var cmd = {
			"cmd": "LoadScriptString",
			"script": code
		};
		uModel.RunCommand(JSON.stringify(cmd));
	},
	resetting : function() {
		var cmd = { 
			"cmd":"LoadScriptString", 
			"script":"util.clearScriptObjects()" 
		};
		uModel.RunCommand(JSON.stringify(cmd));
	},
	createNew: function(){
		var id = $("#sceneId").val();
		if(id){
			var object = {sceneId: id, action: "view"};
            this.currentObject = object;
            this._gobj = null;
			resetDocs();
			registerDoc("new1", "");
			this.loadScene(object);
		}
        else{
            alert("Please enter scene ID");
        }
	},
	switchScene: function(){
		var id = $("#sceneId").val();
		if(id){
			var object = {sceneId: id, action: "view"};
			this.currentObject = object;
			this.loadScene(object);
		}
        else{
            alert("Please enter scene ID");
        }
	},
	openDocument: function(){
		window.open("http://momoda-api-20.readthedocs.io/en/latest/");
	},
	showShortcut: function(){
		var shortcuts = [
			"Ctrl+I    Showtype",
			// "Alt+.     Jump to definition",
			// "Alt+,     Jump back",
			"Ctrl+E    Find references",
			"Ctrl+Shift+E    Rename",
			"Ctrl+Enter      Execute script",
			"Ctrl+R    Reset scene",
			"Ctrl+/    Comment code"
		];
		alert(shortcuts.join("\n"));
	},
     onLoadComplete: function(){
        if(this.currentObject/* && this.currentObject.runServerCode*/){
            this.loadScriptFromServer(this.currentObject);
        }
     }
}

$(function(){
    uModel.OnLoadComplete = function(){
        momoda.local.page.onLoadComplete();
    }
})
