function MouseFadeCell(grid, x, y) {
    Cell.call(this, grid, x, y);
}
MouseFadeCell.prototype = {
    excitement : 0,
    tick : function() {
	this.fillColor = new Color(this.excitement,
				   this.excitement,
				   this.excitement);
	this.excitement -= 10;
	if(this.excitement < 0)
	    this.excitement = 0;
    },
    mouseOver : function() {
	this.excitement = 255;
    }
};
extend(MouseFadeCell, Cell);

function ColourfulMouseFadeCell(grid, x, y) {
    Cell.call(this, grid, x, y);
    this.excitement = new Color(0,0,0);
}
ColourfulMouseFadeCell.prototype = {
    tick : function() {
	this.fillColor = this.excitement.copy();
	this.excitement.r -= 10;
	this.excitement.g -= 10;
	this.excitement.b -= 10;
	this.excitement.normalise();     
    },
    mouseOver : function() {
	this.excitement = randomElement(Color.colors)();
    }
};
extend(ColourfulMouseFadeCell, Cell);