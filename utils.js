function extend(child, supertype) {
    child.prototype.__proto__ = supertype.prototype;
}

function debug(text) {
    $('#debug div').append(text + '<br/>');
}

function Color(r, g, b, a) {
    a = a || 1;
    this.r = r; this.g = g; this.b = b; this.a = a;
}
Color.prototype = {
    toString : function() {
	return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
    },
    normalise : function() {
	if(this.r < 0) this.r = 0;
	if(this.g < 0) this.g = 0;
	if(this.b < 0) this.b = 0;
	if(this.a < 0) this.a = 0;
	if(this.r > 255) this.r = 255;
	if(this.g > 255) this.g = 255;
	if(this.b > 255) this.b = 255;
	if(this.a > 255) this.a = 255;
    },
    copy : function() {
	return new Color(this.r, this.g, this.b, this.a);
    }
};
Color.aqua = function () { return new Color(0,255,255); };
Color.black = function () { return new Color(0,0,0); };
Color.blue = function () { return new Color(0,0,255); };
Color.fuchsia = function () { return new Color(255,0,255); };
Color.gray = function () { return new Color(128,128,128); };
Color.green = function () { return new Color(0,128,0); };
Color.lime = function () { return new Color(0, 255,0); };
Color.maroon = function () { return new Color(128,0,0); };
Color.navy = function () { return new Color(0,0,128); };
Color.olive = function () { return new Color(128,128,0); };
Color.purple = function () { return new Color(127,0,127); };
Color.red = function () { return new Color(255,0,0); };
Color.silver = function () { return new Color(192,192,192); };
Color.teal = function () { return new Color(0,128,128); };
Color.white = function () { return new Color(255,255,255); };
Color.yellow = function () { return new Color(255,255,0); };
Color.colors = [Color.aqua, Color.black, Color.blue, Color.fuchsia, Color.gray,
		Color.green, Color.lime, Color.maroon, Color.navy, Color.olive,
		Color.purple, Color.red, Color.silver, Color.teal, Color.white,
		Color.yellow];

function inList(ele, list) {
    here = false;
    list.forEach(function(e) {
	    if(e == ele) {here = true; return;}
	});
    return here;
}

function addCoordsToEvent(ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
	ev._x = ev.layerX;
	ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
	ev._x = ev.offsetX;
	ev._y = ev.offsetY;
    }
}

function randomElement(list) {
    var index = Math.floor(Math.random() * list.length);
    return list[index];
}