// Cell - a basic cell
function Cell(grid, x, y) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    grid.add(this);
}

Cell.prototype = {
    type : 'Cell',
    grid : null,
    x : 0,
    y : 0,
    describe : function() {
	return "A " + this.type + " at (" + this.x + "," + this.y + ")";
    },
    tick : function() {},
    tock : function() {},
};
//end Cell
/////////////////////



//DrawableCell - a basic coloured cell
function DrawableCell() {}
DrawableCell.prototype = {
    fillColor : new Color(0,0,0),
    draw : function(ctx, x, y, w, h) {
	ctx.fillStyle = this.fillColor.toString();
	ctx.fillRect(x,y,w,h);
    }
};
extend(Cell, DrawableCell);
//end DrawableCell
/////////////////////
