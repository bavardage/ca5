function extend(child, supertype) {
    child.prototype.__proto__ = supertype.prototype;
}

function debug(text) {
    $('#debug').append(text + '<br/>');
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
    }
};

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