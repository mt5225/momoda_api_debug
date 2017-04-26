
/**
 * Vector3
 */
Vector3 = {
	x: 0,
	y: 0,
	z: 0,
	forward:[0,0,1],
	back:[0,0,-1],
	up:[0,1,0],
	down:[0,-1,0],
	zero:[0,0,0],
	one:[1,1,1]
}
Vec3 = Vector3;

/**
 * Quaternion
 */
Quaternion = {
	x: 0,
	y: 0,
	z: 0,
	identity:[0,0,1]
}
Quat = Quaternion;

/**
 * BaseObject
 */
BaseObject = {
	pos: new Vector3(0, 0, 0),
	center: new Vector3(0, 0, 0),
	size: new Vector3(0, 0, 0)
}

/**
 * setPosition
 * @param {Vector3} target pos / x, y, z
 */
BaseObject.setPosition = function(pos) {
}

/**
 * setPositionY
 * @param {float} target y
 */
BaseObject.setPositionY = function(y) {
}

/**
 * setPositionXZ
 * @param {float} target x,z
 */
BaseObject.setPositionXZ = function(x, z) {
}

/**
 * getPosition
 * @returns {Vector3} pos
 */
BaseObject.getPosition = function() {
	return new Vector3();
}

/**
 * yaw
 * @param {number} y axis degree
 */
BaseObject.yaw = function(f) {
}

/**
 * pitch
 * @param {number} x axis degree
 */
BaseObject.pitch = function(f) {
}

/**
 * roll
 * @param {number} z axis degree
 */
BaseObject.roll = function(f) {
}

/**
 * setScale
 * @param {Vector3} scale / x, y, z
 */
BaseObject.setScale = function(scale) {
}

/**
 * getScale
 * @returns {Vector3} pos
 */
BaseObject.getScale = function() {
	return new Vector3();
}

/**
 * setPickEnabled
 * @param {boolen} enable
 */
BaseObject.setPickEnabled = function(b) {
}

/**
 * translate
 * @param {Vector3} target pos / x, y, z
 */
BaseObject.translate = function(pos) {
}

/**
 * translate
 * @param {Vector3} target pos / x, y, z
 */
BaseObject.transformPoint = function(pos) {
	return new Vector3();
}
/**
 * add gravity
 * @param {number} mass
 */
BaseObject.addGravity = function(mass) {
}

/**
 * moveTo
 * @param {Vector3} target pos
 * @param {number} [c] time
 */
BaseObject.moveTo = function(pos, time) {
}

/**
 * movePath
 * @param {table} param
 */
BaseObject.movePath = function(param) {
}

/**
 * stopMoiving
 */
BaseObject.stopMoiving = function() {
}

/**
 * play animation
 * @param {string} anim name
 */
BaseObject.playAnim = function(animName) {
}

/**
 * stop animation
 */
BaseObject.stopAnim = function() {
}

/**
 * animation speed
 * @param {number} speed
 */
BaseObject.setAnimSpeed = function(speed) {
}

/**
 * set color
 * @param {Color} color: rgb or Color.red
 */
BaseObject.setColor = function(color) {
}

/**
 * set transparent
 * @param {number} 0 is empty, 1 is soild
 */
BaseObject.setTransparent = function(trans) {
}

/**
 * setColorFlash
 * @param {bool} enable flash or not
 * @param {Color} [c] color: rgb or Color.red
 * @param {number} [c] time
 * @param {number} [c] start value
 * @param {number} [c] end value
 */
BaseObject.setColorFlash = function(enable, color, time, start, end) {
}


/**
 * addTail
 * @param {bool} enable flash or not
 * @param {number} [c] startWidth
 * @param {number} [c] endWidth
 * @param {Color} [c] color: rgb or Color.red
 * @param {number} [c] time value
 * @returns {Tail} tail
 */
BaseObject.addTail = function(startWidth, endWidth, Color clr, time) {
}

/**
 * clone object
 */
BaseObject.clone = function() {
	var obj = new BaseObject();
    return obj;
}

/**
 * destroy object
 */
BaseObject.destroy = function() {
}

/**
 * ScriptObject
 */
ScriptObject = {
    Start: "Start",
    Update: "Update"
}

/**
 * addObjectScript
 * @param {ScriptObject} script
 * @param {string} [c] name
 * @returns {number} ScriptObject
 */
BaseObject.addScript = function(script, name) {
	var script = new ScriptObject();
    return script;
}

/**
 * removeObjectScript
 * @param {string} name
 */
BaseObject.removeScript = function(name) {
}

/**
 * A namespace for object libraries.
 * @namespace object
 */
object = {};

/**
 * create object
 * @param {string} bundle id
 * @param {BaseObject} [c] parent object
 * @param {function} [c] callback after bundle download
 * @param {Vector3} [c] init pos
 * @param {Quad} [c] init rot
 * @param {Vector3} [c] init scale
 * @returns {BaseObject} object
 */
object.create = function(bundleId, parentObj, callback, pos, rot, scale) {
	var obj = new BaseObject();
    return obj;
};

/**
 * destroy all obj born in script
 */
object.destroyAll = function() {
}


/**
 * find object by user defined id
 * @param {string} id
 * @returns {BaseObject} the product of the passed parameters
 */
object.find = function(uid) {
	var obj = new BaseObject();
    return obj;
}

/**
 * get object by user defined id
 * @param {string} id
 * @returns {BaseObject} the product of the passed parameters
 */
object.get = function(uid) {
	var obj = new BaseObject();
    return obj;
}

object.createCurveLine = function(vertices, bundleOrColorOrMat, parentObj, width, textiling, texOffSet) {
}

object.createArrowLine = function(vertices,param) {
}

