function WolframCell(grid, x, y, rule) {
    Cell.call(this, grid, x, y);
    this.rule = rule;
}
WolframCell.prototype = {
    alive : false,
    nextAlive : false,
    aliveColor : Color.black(),
    deadColor : Color.white(),
    tick : function() {
	this.nextAlive = this.alive;
	if(this.y == 0) //are we on the top layer? if so, pass
	    return;
	above = 0;
	if(this.x > 0 && this.grid.cells[this.x-1][this.y-1][0].alive)
	    above += 4;
	if(this.grid.cells[this.x][this.y-1][0].alive)
	    above += 2;
	if(this.x < (this.grid.width - 1) && this.grid.cells[this.x+1][this.y-1][0].alive)
	    above += 1;
	if(this.rule & Math.pow(2,above))
	    this.nextAlive = true;
	else
	    this.nextAlive = false;
    },
    tock : function() { //inherit from GOLCell perhaps!?
	this.alive = this.nextAlive;
	this.fillColor = this.alive ? this.aliveColor : this.deadColor;
    },
    mouseDown : function() {
	this.alive = !this.alive;
	this.fillColor = this.alive ? this.aliveColor : this.deadColor;
	this.grid.drawToCanvas();
    }
};
extend(WolframCell, Cell);