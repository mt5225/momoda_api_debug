///////////////////////////////////////////
// object part begin
///////////////////////////////////////////

// create object and set color
var obj_green = object.create("76159D87D8F24601B80B3BB8F475E7BE", Vector3(0, 0, -44));
obj_green.setScale(0.3, 0.3, 0.3);
obj_green.uid = "obj_green";
obj_green.addProperty("info", "TK348901");


// set color yellow 
var obj_yellow = object.create("4E71B856E3A44747A4B763B880C6298E", Vector3(-4, 0, -46));
obj_yellow.setScale(0.3, 0.3, 0.3);
obj_yellow.uid = "obj_yellow";
obj_yellow.addProperty("info", "SEC8923");

// set color blue 
var obj_blue = object.create("02EC55309AEA4A95985B17D18C58CCC7", Vector3(-8, 0, -48));
obj_blue.setScale(0.3, 0.3, 0.3);
obj_blue.uid = "obj_blue";
obj_blue.addProperty("info", "Sandra Lee");

// set color clay 
var obj_clay = object.create("D691D9A5C10D471EBD498C8B1163C2F5", Vector3(-8, 0, -50));
obj_clay.setScale(0.3, 0.3, 0.3);
obj_clay.uid = "obj_clay";
obj_clay.addProperty("info", "Visitor V101");

// create and banner
var ui = null;

// init banner
util.download({
	"url": "http://www.3dmomoda.com/mmdclient/script/examples/demos/outline_button.bundle",
	"success": function (res) {
		ui = gui.create(res);
		ui.setObject(null, null);
		ui.setScale(0.3, 0.3);
	}
});

// register mouse down event
var downPos = null;

util.addEventListener("mousedown", function (event) {
	downPos = Vector2(event.x, event.y);
});

// register mouse click event
util.addEventListener("click", function (event) {
	if (input.getMouseButtonUp(1)) //hide the banner
	{
		//console.log("hide banner");
		ui.setObject(null, null);
	}
	if (event.obj) {
		//console.log(event.obj.uid);
		show_banner(event.obj);
	}
});

// start moving object
// define moving method
function move_to_next(obj) {
	obj.moveTo({
		"pos": util.randomVector3Around(obj, 2, 0, 2), // random location
		"delay": 2.0,
		"speed": 0.5,
		"oncomplete": function () {
			move_to_next(obj);
		}
	});
}

move_to_next(obj_green);
move_to_next(obj_yellow);
move_to_next(obj_blue);
move_to_next(obj_clay);


function change_ui_image(ui) {
	var urlBase = "http://www.3dmomoda.com/mmdclient/script/examples/demos/";
	util.downloadTexture({
		"url": urlBase + "demo_panel_001.png",
		"success": function (tex) {
			ui.setImage("Button", tex);
		}
	});
}

//////////////////////////
//show banner
var container01 = object.find("container01");
var container02 = object.find("container02");
container01.addProperty("info", "KNAADT188");
container01.addProperty("status", "Close");
container02.addProperty("info", "KNA6934J7");
container02.addProperty("status", "Close");

function show_banner(obj) {
	var offsetY = obj.size.y;
	ui.setObject(obj, Vector3(0, offsetY, 0));
	ui.setText("Button/Text", obj.getProperty("info"));
	change_ui_image(ui);

	if(obj.uid == "container01" ||  obj.uid == "container02") {
		var htmlName = null;
		if(obj.getProperty("status") == 'Open') {
			htmlName = obj.uid + "_open.html";
		} else {
			htmlName = obj.uid + ".html";
		}

		ui.regButtonEvent("Button", function () {
			util.externalEval("window.open('/" + htmlName + "','info',\"directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350\");");
		});
	} else {
	ui.regButtonEvent("Button", function () {
		util.externalEval("window.open('/" + obj.uid + ".html','info',\"directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350\");");
	});
	}
}

///////////////////////////////////////////
// object part end
///////////////////////////////////////////


/////////////////////////////////////
/// camera start
/////////////////////////////////////

var showBalloon = true;
var balloonList = [];
function init_balloon(res) {
	if (showBalloon) {
		for (var i = 1; i < 5; i++) {
			var obj = object.find("cam00" + i);
			var ui = gui.create(res);
			var offsetY = obj.size.y;
			ui.setObject(obj, Vector3(0, offsetY, 0));
			ui.setScale(0.3, 0.3);
			ui.setText("Button/Text", i);
			var url = "/cam00" + i + ".html";
			ui.regButtonEvent("Button", function () {
				util.externalEval("window.open('" + url + "','info',\"directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=350,height=350\");");
			});
			array.add(balloonList, ui);
		}
		showBalloon = false;
	} else {
		for (var i = 0; i < 4; i++) {
			balloonList[i].destroy();
		}
		balloonList = [];
		showBalloon = true;
	}

};

gui.createButton("CAM", Rect(100, 50, 70, 30), function () {
	util.download({
		"url": "http://www.3dmomoda.com/mmdclient/script/examples/demos/balloon_button.bundle",
		"success": init_balloon
	});

});

/////////////////////////////////////
/// camera end
/////////////////////////////////////




/////////////////////////////////////////////////////////////
///// elevator part begin
/////////////////////////////////////////////////////////////
var elevatorObj = null;
var elevatorUI = null;
var currentFloorNumber = 0;
var btnElevators = [];

function playAnimation(floorNumber, action) {
	var door = object.find("door_" + floorNumber);
	if (door != null) {
		if (action == 'open') {
			door.Open();
		} else {
			door.Close();
		}
	}
}

function moveToFloor(destFloor) {
	//console.log("move to : " + destFloor);
	//get elevator position
	var pos = elevatorObj.getPosition();
	//console.log("elevator position: " + pos);
	if (destFloor != currentFloorNumber) //about to move
	{
		var target = Building.current.planList.get_Item(destFloor);
		var pos = elevatorObj.getPosition();
		pos.y = target.getPosition().y;
		var timeStep = 1;
		elevatorObj.setColorFlash(true, Color.red);
		//playAnimation(currentFloorNumber, 'open');
		elevatorObj.moveTo({
			"pos": pos,
			"orientToPath": false,
			"speed": timeStep,
			"easeType": "easeInOutCubic",
			"oncomplete": function () {
				//playAnimation(destFloor, 'open');
				elevatorObj.setColorFlash(false);
				currentFloorNumber = destFloor;

			}
		});
	}

}

////////////////
// create elevator menu
////////////////
function initElevatorMenu() {
	//// create a set of button to move elevator
	array.add(btnElevators, gui.createButton("1st floor", Rect(10, 100, 70, 30),
		function () {
			moveToFloor(0)
		}));
	//// create a set of button
	array.add(btnElevators, gui.createButton("2nd floor", Rect(10, 150, 70, 30),
		function () {
			moveToFloor(1)
		}));
	//// create a set of button
	array.add(btnElevators, gui.createButton("3rd floor", Rect(10, 200, 70, 30),
		function () {
			moveToFloor(2)
		}));
	//// create a set of button
	array.add(btnElevators, gui.createButton("4th floor", Rect(10, 250, 70, 30),
		function () {
			moveToFloor(3)
		}));

	//// create a set of button
	array.add(btnElevators, gui.createButton("5th floor", Rect(10, 300, 70, 30),
		function () {
			moveToFloor(4)
		}));
}

///////////////////////////////
// create button: fly into building and make it transparent
// TODO: adjust camera
///////////////////////////////
gui.createButton("B_001", Rect(10, 50, 70, 30), function () {
	if (world.buildingList.Count > 0) {
		var building = world.buildingList.get_Item(0);

		//fly into building
		util.setTimeout(function () {
			level.change(building);
			// test set building transparent
			var cmdJson = json.encode({
				"cmd": "SetBuildingTransparent",
				"id": building.ID,
				"trans": 0.3
			});
			commandManager.RunJson(cmdJson, true);
			// create elevator menu

		}, 500);

		// create the elevator
		elevatorObj = object.find("elevator01");
		initElevatorMenu();
	}
});

// hide menu if needed
util.addEventListener("levelchange", function (obj) {
	//console.log(obj.ClsID);
	if (obj.ClsID == ObjectFactory.CLSID_WORLD) {
		if (btnElevators.length == 5) {
			for (var i = 0; i < 5; i++) {
				gui.destroy(btnElevators[i]);
			}
			btnElevators = [];
		}
	} else if (obj.ClsID == ObjectFactory.CLSID_BUILDING) {
	} else if (obj.ClsID == ObjectFactory.CLSID_FLOORPLAN) {
	}
})
/////////////////////////////////////////////////////////////
///// elevator part end
/////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////
//// send alarm
/////////////////////////////////////////////////////////////
util.setInterval(function () {
	server.sim.push({
		"container01": {
			"alarm": "Open",
		}
	});
}, 1000 * 20 * 1.5);


util.setInterval(function () {
	if (container01.data && container01.data["alarm"]) {
		container01.setColorFlash(true, Color.red);
		container01.addProperty("status", "Open");
		container02.setColorFlash(true, Color.red);
		container02.addProperty("status", "Open");
	}
}, 1000 * 60);