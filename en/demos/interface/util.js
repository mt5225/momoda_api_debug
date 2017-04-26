/**
 * A namespace for utility libraries.
 * @namespace util
 */
util = {}

/**
 * util.setTimeout
 * @param {function} callback function
 * @param {number} delay time
 * @returns {number} timer id
 */
util.setTimeout = function (callback, delayTime) {
	var id = 0;
    return id;
}

/**
 * util.setInterval
 * @param {function} callback function
 * @param {number} after time
 * @returns {number} timer id
 */
util.setInterval = function (callback, tickTime) {
	var id = 0;
    return id;
}

/**
 * util.clearTimeout
 * @param {function} timer id
 */
util.clearTimeout = function(timeoutID) {
}

/**
 * util.clearInterval
 * @param {function} timer id
 */
util.clearInterval = function(intervalID) {
}

/**
 * util.clearAllTimers
 */
util.clearAllTimers = function() {
}

/**
 * util.setRenderCallback
 * call evey time when render, single callback
 * @param {function} callback
 */
util.setRenderCallback = function (callback) {
}

/**
 * util.randomInt
 * @param {number} a
 * @param {number} b
 * @returns {number} random result
 */
util.randomInt = function(a, b) {
}

/**
 * util.randomFloat
 * @param {number} a
 * @param {number} b
 * @returns {number} random result
 */
util.randomFloat = function(a, b) {
}

/**
 * util.randomColor
 * @returns {number} random result
 */
util.randomColor = function() {
};

/**
 * util.randomVector3
 * @param {number} randius
 * @returns {number} random result
 */
util.randomVector3 = function(randius) {
}

/**
 * util.reloadScene
 */
util.reloadScene = function(){
}

/**
 * util.clearScriptObjects
 */
util.clearScriptObjects = function(){
}

/**
 * util.addEventListener
 * support: click, dbclick, mouseup, mousedown, mousemove, 
 *          drag, dragstart, dragend, keydown, keyup, resize
 * @param {string} eventType
 * @param {string} name
 */
util.addEventListener = function(eventType, callback) {
}

/**
 * util.clearAllEvents
 */
util.clearAllEvents = function() {
}


/**
 * util.downloadTexture
 * { 
 * 	"url": "",
 * 	"success": function(texture){}
 * 	"error": function(msg){}
 * 	"complete": function(){}
 * 	"progress": function(prog){}
 * 	"error": function(msg){}
 * } 
 * @param {table} {}
 */
util.downloadTexture = function(param) {
}

/**
 * util.downloadTextures
 * { 
 * 	"url": "",
 * 	"success": function(textures){}
 * 	"error": function(msg){}
 * 	"complete": function(){}
 * 	"progress": function(prog){}
 * 	"error": function(msg){}
 * } 
 * @param {table} {}
 */
util.downloadTextures = function(param) {
}

/**
 * A namespace for console libraries.
 * @namespace console
 */
console = {}

/**
 * console.log
 * @param {object} {}
 */
console.log = function(obj) {
    print(obj);
}

/**
 * console.show
 * @param {boolean} show
 */
console.show = function(b) {
    scriptManager.Show = b;
}

/**
 * console.clear
 */
console.clear = function() {
    scriptManager.Clear();
}

/**
 * console.catchError
 * @param {boolean} show
 */
console.catchError = function(b) {
    scriptManager.OpenCatch = b;
}