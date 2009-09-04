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