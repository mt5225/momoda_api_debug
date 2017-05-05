/**
 * uModel
 */
var uModel = uModel || {};
//
uModel.scene = "ubuilder-0.11.1408.unity3d";
uModel.debugging = "0";
uModel.loadJson = "";
uModel.param = "";
uModel.web = {};
uModel.dirtyScene = false;
uModel.send = function(objName, funName, param) {
	try {
		if (uModel.web.getUnity())
			uModel.web.getUnity().SendMessage(objName, funName, param);
	} catch (e) {
	}
};
uModel.externalInterface = function() {
	var param1 = arguments[0];
	if (param1 == "homepage") {
		//window.location.href = 'index.html';
	} else if (param1 == "分享") {
		ubundle.share.model.init(arguments[1]);
	} else if (param1 == "教程") {
		var lang = "";
		var stype = "mmd";
		try{
			var dataObj = eval("("+uModel.param+")");
			if (dataObj["language"] && dataObj["language"] == "en") {
				lang = "en";
			}
			if ( dataObj["stype"] == "udcb" ) {
				stype = "udcb";
			}
		} catch(e){}
		if (lang != "en") {
			if (stype == "udcb") {
				window.location.href = 'http://www.uinnova.cn/resource.jsp#studyvideo';
			} else {
				window.open("http://www.3dmomoda.com/faq");
			}
		}
	} else if (param1 == "texture") {
		//(数据点,sceneId,type,UserId)
		var title = arguments[1] == "CustomTexture" ? "自定义图片管理" : "底图管理";
		var lang = "";
		try{
			var dataObj = eval("("+uModel.param+")");
			if (dataObj["language"] && dataObj["language"] == "en") {
				lang = "_en";
				title = arguments[1] == "CustomTexture" ? "Custom texture manage" : "Base map manager";
			}
		} catch(e){}
		ubundle.dialog.win.openurl('photoeditor' + lang + '.html?type='+arguments[1],{title:title,bodyWidth:460,bodyHeight:300});
	} else if (param1 == "scene") {
		if (arguments[1] != "")
			window.location.href = 'browse.html?id=' + arguments[1];
	} else if (param1 == "objectsInfo") {
		if (arguments[1] != "")
			parent.ubundle.util.showBundleInfo(arguments[1]);
	} else if (param1 == "UrlWindow") {
		// url ,title, w , h
		try{
			ubundle.dialog.win.openurl(arguments[1],{title:arguments[2],bodyWidth:arguments[3],bodyHeight:arguments[4]});
		} catch(e){
			Pt.dialog.win.openurl(arguments[1],{title:arguments[2],bodyWidth:arguments[3],bodyHeight:arguments[4]});
		}
	} else if (param1 == "HtmlWindow") {
		// html ,title, w , h
		try{
			ubundle.dialog.win.openhtml(arguments[1],{title:arguments[2],bodyWidth:arguments[3],bodyHeight:arguments[4]});
		} catch(e){
			Pt.dialog.win.openhtml(arguments[1],{title:arguments[2],bodyWidth:arguments[3],bodyHeight:arguments[4]});
		}
	} else if (param1 == "HideWindow") {
		ubundle.dialog.win.hide();
	} else if (param1 == "download") {
		var lang = "";
		try{
			var dataObj = eval("("+uModel.param+")");
			if (dataObj["language"] && dataObj["language"] == "en") {
				lang = "en";
			}
		} catch(e){}
		
		var link;
		link = document.createElement('a');
		if (lang == "en") {
			link.download = "uDCB_export.json";
			link.target = '_blank';
			link.href =  arguments[1];
		} else {
			link.target = 'downloadIframe';
			link.href =  "rest/web/application/file/down/"+arguments[1];
		}
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} else if (param1 == "p2download") {
		var link;
		link = document.createElement('a');
		link.target = 'downloadIframe';
		link.href =  "jsonp/downFile?path="+arguments[1];
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);		
	} else if (param1 == "OpenUrl") {
		var params = arguments[2];		
		if ( params != "" ) {
			params = uModel.Trim( params.toLowerCase() );
			//"height=340px,left=500,top=270, width=860px, toolbar =no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=yes"
			if ( params.indexOf("left") == -1 &&  params.indexOf("top") == -1 ) {
				var w = 0;
				var h = 0;
				var strList = params.split(",");
				for (var i = 0 ; i < strList.length; i++ ) {
					var p = strList[i];
					var param = p.split("=");
					if ( param[0] == "width" ) {
						w = param[1].replace(/px/, "");
					}
					if ( param[0] == "height" ) {
						h = param[1].replace(/px/, "");
					}
				}
				var top  = (window.screen.availHeight-30-h)/2;
				var left =  (window.screen.availWidth-10-w)/2;
				params = "left="+ left+",top="+ top+"," + params;
			}
		}
		window.open(arguments[1],"",params);
	} else if (param1 == "ExecuteHtmlInterface") {
		uModel.ExecuteHtmlInterface(arguments[1]);
	} else if (param1 == "EVENT") {
		var ename = arguments[1];
		if ( ename = "LoadComplete" ) {
			uModel.OnLoadComplete();
		}
	} else if (param1 == "my") {
		window.open("zone/modellib");
	}
};
// 加载 用户场景
uModel.load = function(json) {
	if (json == null) {
		json = "";
	}
	try{
		if ( uModel.param == "" ) {
			var obj = ubundle.remote.user.getCurrent(true);
			if (obj["content"] != "请先登录") {
				uModel.param = "{\"userid\":\""+ obj["content"]["userid"] +"\"}";
				uModel.loadParam(uModel.param);
			}
		} else {
			var p = $.parseJSON(uModel.param);
			if ( p ) {
				var obj = ubundle.remote.user.getCurrent(true);
				if (obj["content"] != "请先登录") {
					p["userid"] = obj["content"]["userid"];
					uModel.param = $.toJSON(p);
				}
				uModel.loadParam(uModel.param);
			}
		}
	}catch(e){}
	uModel.send("WebCall", "EditScene", json);
};
uModel.loadPreview = function(json) {
	if (json == null) {
		json = "";
	}
	uModel.send("WebCall", "PreviewScene", json);
};
uModel.loadPreviewModel = function(json) {
	if (json == null)
		return;
	uModel.send("WebCall", "LoadModel", json);
};
uModel.loadParam = function(json) {
	if (json == null) {
		json = "";
	}
	uModel.send("WebCall", "SetSceneParam", json);
};
uModel.SetSaved = function(json) {
	if (json == null) {
		json = "";
	}
	uModel.send("WebCall", "SetSceneSaved", json);
};
uModel.RunCommand = function(str,bol) {
	if (str == null)
		return;
	if (bol === undefined || bol == null) {
		uModel.send("WebCall", "SetCommandImmediate", str);
	} else if ( bol == true ) {
		uModel.send("WebCall", "SetCommandImmediate", str);
	} else {
		uModel.send("WebCall", "SetCommand", str);
	}
};
uModel.RunFunction = function(name,str) {
	if (name == null && name != "")
		return;
	if (str == null) {
		str = "";
	}
	uModel.send("WebCall", name, str);
};
uModel.LoadScriptString = function(string) {
	if (string == null)
		return;
	uModel.send("WebCall", "LoadScriptString", string);
};
uModel.LoadScriptFile = function(url) {
	if (url == null)
		return;
	uModel.send("WebCall", "LoadScriptFile", url);
};
uModel.GetInfoCallbackFunc = function(){};
uModel.GetInfo = function( type, callback ) {
	if (callback == null)
		return;
	uModel.GetInfoCallbackFunc = callback;
	uModel.send("WebCall", "GetInfo", type );
};
uModel.SetDirtyScene = function(bl){
	uModel.dirtyScene = bl;
};
uModel.SaveScene = function(){
	uModel.send("WebCall", "SaveScene", "ok");
};
uModel.OnLoadComplete = function() {
};
uModel.OnApplicationFocus = function(bool) {
};
uModel.ExecuteHtmlInterface = function(json) {
};
uModel.ExecuteJavaScript = function() {
};
uModel.downloadImg = function(param) {
	window.open("down.jsp?file=" + param, "downloadImag");
};
uModel.login = function() {
	login_win(function() {
		try{
			if ( uModel.param == "" ) {
				var obj = ubundle.remote.user.getCurrent(true);
				if (obj["content"] != "请先登录") {
					uModel.param = "{\"userid\":\""+ obj["content"]["userid"] +"\"}";
					uModel.loadParam(uModel.param);
				}
			} else {
				var p = $.parseJSON(uModel.param);
				if ( p ) {
					var obj = ubundle.remote.user.getCurrent(true);
					if (obj["content"] != "请先登录") {
						p["userid"] = obj["content"]["userid"];
						uModel.param = $.toJSON(p);
					}
					uModel.loadParam(uModel.param);
				}
			}
		}catch(e){}
		uModel.send("WebCall", "LoginCallback", "ok");
	});
};
uModel.SendMessage = function(msg) {
	uModel.send("WebCall", "NotifyMessage", msg);
};
uModel.SetBaseMap = function(img) {
	uModel.send("WebCall", "SetBaseMap", img);
};
uModel.state = -1;
uModel.initHeight = 600;
uModel.callback;
// jQuery(function() {
uModel.start3d = function() {
	var ram = Math.ceil(Math.random() * 1000);
	var config = {
		height : function() {
			return uModel.initHeight;
		},
        autoInstall             : false,
		enableJava              : false,
        enableJVMPreloading     : false,
        enableClickOnce         : false,
        enableUnityAnalytics    : false,
        enableGoogleAnalytics   : false,
		fullInstall				: true,
		params : {
			enableDebugging : uModel.debugging,
			disableContextMenu : true,
			logoimage : "images/loading_toplogo.png?" + ram,
			progressbarimage : "images/loading_buttom_loading.png?" + ram,
			progressframeimage : "images/loading_buttombg.png?" + ram,
			fullInstall				: true,
            autoInstall             : false,
			enableJava              : false,
            enableJVMPreloading     : false,
            enableClickOnce         : false,
            enableUnityAnalytics    : false,
            enableGoogleAnalytics   : false
		}
	};
	
	try{
		var p = $.parseJSON(uModel.param);
		if (p["stype"] == "udcb") {
			config.params["logoimage"] = "images/loading_toplogo_dcb.png" + "?" + ram;
		}
		if ( p["loadinglogo"] != undefined ) {
			config.params["logoimage"] = p["loadinglogo"] + "?" + ram;
		}
	} catch(e){}
	
	uModel.web = new UnityObject2(config);
	uModel.web.PluginVersion = "";
	var $missingScreen = jQuery("#missing");
	var $brokenScreen = jQuery("#unityPlayer").find(".broken");
	$missingScreen.hide();
	$brokenScreen.hide();

	uModel.web.observeProgress(function(progress) {
		switch (progress.pluginStatus) {
		case "unsupported":
			$missingScreen.show();
			uModel.unsupported();
			break;
		case "broken":
			e.stopPropagation();
			e.preventDefault();
			uModel.broken();
			break;
		case "missing":
			$missingScreen.show();
			break;
		case "installed":
			$missingScreen.remove();
			if (uModel.callback)
				uModel.callback();
			break;
		case "first":
			$missingScreen.remove();
			uModel.firstFrameCallback();
			break;
		}
	});
	uModel.web.initPlugin(jQuery("#unityPlayer")[0], "javascripts/"+uModel.scene);
	uModel.web.detectUnity(function (status, version) {
	    var versionText = '';
	    switch(status) {
	      case "installed":
	        versionText = version.plugin;
	      break;
	    }
		uModel.web.PluginVersion = versionText;
	    return;
	 },true);
};
uModel.broken = function () {
		
};
uModel.unsupported = function () {
	
};
uModel.firstFrameCallback = function() {	
	//debugger;
	if (uModel.state == 0) { // 编辑
		uModel.loadParam(uModel.param);
		uModel.load(uModel.loadJson);
	} else if (uModel.state == -1) {// 预览
		uModel.loadParam(uModel.param);
		uModel.loadPreview(uModel.loadJson);
	} else if (uModel.state == 1) {
		// console.info("umodel:"+uModel.loadJson);
		// debugger;
		uModel.loadPreviewModel(uModel.loadJson);// 模型预览
	}
};
uModel.resize = function(w, h) {
	try {
		var wi = w.replace(/px/, ""); // document.body.offsetWidth;
		var he = h.replace(/px/, ""); // document.documentElement.clientHeight;
		uModel.web.getUnity().style.width = wi + "px";
		uModel.web.getUnity().style.height = he + "px";
	} catch (e) {
		try {
			uModel.web.getUnity().style.width = w + "px";
			uModel.web.getUnity().style.height = h + "px";
		} catch (e) {}
	}
};
// 计算窗体 resize
// window.onresize = uModel.resize;
// ///////////////
// Util
// ///////////////
uModel.getParam = function(paramName) {
	paramValue = "";
	isFound = false;
	if (location.search.indexOf("?") == 0 && location.search.indexOf("=") > 1) {
		arrSource = unescape(location.search).substring(1,
				location.search.length).split("&");
		i = 0;
		while (i < arrSource.length && !isFound) {
			if (arrSource[i].indexOf("=") > 0) {
				if (arrSource[i].split("=")[0].toLowerCase() == paramName
						.toLowerCase()) {
					paramValue = arrSource[i].split("=")[1];
					isFound = true;
				}
			}
			i++;
		}
	}
	return paramValue;
};
// 获取map size
uModel.getMapSize = function(map) {
	var size = 0;
	for ( var key in map) {
		size += 1;
	}
	return size;
};

uModel.setClipboard = function(maintext) {
	if (window.clipboardData) {
		return (window.clipboardData.setData("Text", maintext));
	} else if (window.netscape) {
		netscape.security.PrivilegeManager
				.enablePrivilege('UniversalXPConnect');
		var clip = Components.classes['@mozilla.org/widget/clipboard;1']
				.createInstance(Components.interfaces.nsIClipboard);
		if (!clip)
			return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1']
				.createInstance(Components.interfaces.nsITransferable);
		if (!trans)
			return;
		trans.addDataFlavor('text/unicode');
		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;1"]
				.createInstance(Components.interfaces.nsISupportsString);
		var copytext = maintext;
		str.data = copytext;
		trans.setTransferData("text/unicode", str, copytext.length * 2);
		var clipid = Components.interfaces.nsIClipboard;
		if (!clip)
			return false;
		clip.setData(trans, null, clipid.kGlobalClipboard);
		return true;
	}
	return false;
};
uModel.Trim = function(str) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    result = result.replace(/\s/g,"");
    return result;
};
