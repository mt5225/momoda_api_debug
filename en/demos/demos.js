/**
 * Created by hzy on 2016/12/24 0024.
 */

var scriptVersion = "v1319";

var exampleLib = {
    "creation": [
         {"name": "creating object",    "file": "./demos/test_hello.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "finding object",    "file": "./demos/test_find.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "properties",    "file": "./demos/test_props.txt", "sceneId": "20170508194011659972", action: "view"}
	],
    "movement": [
		 {"name": "moving object",    "file": "./demos/test_moveto.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "properties",    "file": "./demos/test_moveto_param.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "along path",    "file": "./demos/test_movepath.txt", "sceneId": "20170508194011659972", action: "view"}
        ,{"name": "connecting object",    "file": "./demos/test_planets.txt", "sceneId": "20170508194011659972", action: "view"}
    ],
    "effect": [
		 {"name": "color",    "file": "./demos/test_color.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "animation",    "file": "./demos/test_anim.txt", "sceneId": "20170508194011659972", action: "view"}
        ,{"name": "curve",    "file": "./demos/test_curve_line.txt", "sceneId": "20170508194011659972", action: "view"}
    ],
    "script": [
        {"name": "automatic rotation",  "file": "./demos/test_auto_rotate.txt", "sceneId": "20170508194011659972", action: "view"}
    ],
    "event": [
         {"name": "mouse event",    "file": "./demos/test_mouse_events.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "mouse event2",    "file": "./demos/test_mouse_same_point.txt", "sceneId": "20170508194011659972", action: "view"}		
		,{"name": "dragging event",    "file": "./demos/test_drag.txt", "sceneId": "20170508194011659972", action: "view"}		
        ,{"name": "keyboard event",    "file": "./demos/test_keyboard_events.txt", "sceneId": "20170508194011659972", action: "view"}
        ,{"name": "input event",    "file": "./demos/test_input.txt", "sceneId": "20170508194011659972", action: "view"}
    ],

    "GUI": [
        {"name": "simple GUI",    "file": "./demos/test_gui.txt", "sceneId": "20170508194011659972", action: "view"}
        ,{"name": "texture GUI",    "file": "./demos/test_gui_res.txt", "sceneId": "20170508194011659972", action: "view"}
        ,{"name": "advanced GUI",    "file": "./demos/test_ugui.txt", "sceneId": "20170508194011659972", action: "view"}
    ],
    "overhead-card": [
        {"name": "fixed position",    "file": "./demos/test_ugui_balloon.txt", "sceneId": "20170508194011659972", action: "view"}
        ,{"name": "tracking object",    "file": "./demos/test_ugui_balloon_obj.txt", "sceneId": "20170508194011659972", action: "view"}
    ],
    "camera": [
        {"name": "camera position",  "file": "./demos/test_camera_pos.txt", "sceneId": "20170508194011659972", action: "view"}
        ,{"name": "camera jump",  "file": "./demos/test_flyto.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "roller coaster",  "file": "./demos/test_roller_coaster.txt", "sceneId": "20170508194011659972", action: "view"}
    ],
    "data-interaction": [
		{"name": "getting data",  "file": "./demos/test_server_asset_info.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "monitoring data",  "file": "./demos/test_server_monitor.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "external call",  "file": "./demos/test_external.txt", "sceneId": "20170508194011659972", action: "view"}
    ],
    "deployment": [
		{"name": "dragging object",  "file": "./demos/test_pan_left_rot.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "selecting&dragging",  "file": "./demos/test_drag_select.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "drawing curve",  "file": "./demos/test_draw_curveline.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "dragging&drawing&area",  "file": "./demos/test_deploy.txt", "sceneId": "20170508194011659972", action: "view"}
    ],
    "miscellaneous": [
		{"name": "container operation",  "file": "./demos/test_array_list_dict.txt", "sceneId": "20170508194011659972", action: "view"}
		
    ],
    "comprehensive": [
        {"name": "elevator",  "file": "./demos/test_elevator.txt", "sceneId": "20170417152241210691316", action: "view"}
		,{"name": "sphere transformation",  "file": "./demos/test_chr.txt", "sceneId": "20170508194011659972", action: "view"}
		,{"name": "data center",  "files": ["./demos/test_datacenter/opening.txt", "./demos/test_datacenter/bar_chart.txt", "./demos/test_datacenter/cabinet.txt", "./demos/test_datacenter/main.txt"], "sceneId": "20170418134129476336884", action: "view"}
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