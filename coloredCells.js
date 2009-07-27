

//FunkyCell - a cell which changes colour randomly.
function FunkyCell(grid, x, y) {
    Cell.call(this, grid, x, y);
    this.fillColor = new Color(255,0,0);
    this.changeOffset = Math.floor(Math.random()*15);
}
FunkyCell.prototype = {
    type : 'FunkyCell',
    fillColor : null,
    tock : function() {
	if((this.grid.ticks + this.changeOffset) % 15 != 0) return;
	this.fillColor.r = Math.floor(Math.random()*255);
	this.fillColor.g = Math.floor(Math.random()*255);
	this.fillColor.b = Math.floor(Math.random()*255);
    }
}
extend(FunkyCell, Cell);
//end FunkyCell
//////////////////////



//CopyCell - copy the specified cell's colour
function CopyCell(grid, x, y, toCopy) {
    Cell.call(this, grid, x, y);
    this.toCopy = toCopy;
    this.nextColor = new Color(0,0,0);
}
CopyCell.prototype = {
    nextColor : null,
    tick : function() {
	this.nextColor = this.toCopy.fillColor;
    },
    tock : function() {
	this.fillColor = this.nextColor;
    }
};
extend(CopyCell, Cell);
//end CopyCell
/////////////////////



//ChamCell - follow the colours of the cells around
function ChamCell(grid, x, y) {
     Cell.call(this, grid, x, y);
     this.fillColor = new Color(0,0,0);
     this.nextColor = new Color(0,0,0);
};
ChamCell.prototype = {
    nextColor : null,
    tick : function() {
	ns = this.grid.neighbours(this);
	l = 0;
	ns.forEach(function(cell) {
		if(cell.fillColor.toString() != 'rgba(0,0,0,1)')
		    l += 1;
	    });
	if(l == 0) l = 1;
	var r = 0; var g = 0; var b = 0;
	ns.forEach(function(n) {
		r += n.fillColor.r;
		g += n.fillColor.g;
		b += n.fillColor.b;
	    });
	this.nextColor = new Color(Math.floor(r/l),
				   Math.floor(g/l),
				   Math.floor(b/l));	    
    },
    tock : function() {
	this.fillColor = this.nextColor;
    }
};
extend(ChamCell, Cell);
//end ChamCell
/////////////////////
