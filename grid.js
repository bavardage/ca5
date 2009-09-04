var TIMEOUT = 50;

// Grid - a grid of cells
function Grid(canvas, width, height) {
    this.canvas = canvas;
    grid = this;
    this.canvas.addEventListener('mousedown',
				 function(ev) {
				     grid.mouseDown(ev);
				 }, false);
    this.canvas.addEventListener('mousemove', 
				 function(ev) {
				     grid.mouseMove(ev);
				 }, false);
    this.width = width;
    this.height = height;
    this.reset();
};
Grid.prototype = {
    canvas : null,
    cells : null,
    running : false,
    add : function(cell) {
	this.cells[cell.x][cell.y].push(cell); //TODO: check within bounds
	this.allCells.push(cell);
    },
    reset : function(cell) {
	debug('resetting grid');
	this.cells = [this.width];
	this.allCells = [];
	for(var i = 0; i < this.width; i++) {
	    this.cells[i] = Array(this.height);
	    for(var j =0; j < this.height; j++)
		this.cells[i][j] = [];
	}
	this.ticks = 0;
	this.running = false;
    },
    getCells : function(x, y) {
	x = ((x % this.width) + this.width) % this.width;
	y = ((y % this.height) + this.height) % this.height;
	return this.cells[x][y];
    },
    togglePlay : function() {
	
	this.running = !this.running;
	if(this.running)
	    setTimeout(this.ticktock, TIMEOUT, this);
    },
    prettyPrint : function() {
	result = "";
	for(var i = 0; i < this.width; i++) {
	    for(var j = 0; j < this.height; j++)
		if(this.cells[i][j].length)
		    result += '+';
		else
		    result += '0';
	    result += "<br/>";
	}
	return result;
    },
    drawToCanvas : function() {
	canvas = this.canvas;
	var ctx = canvas.getContext('2d');
	//	ctx.globalAlpha = 0.5;
	var cellWidth = canvas.width / this.width;
	var cellHeight = canvas.height / this.height;
	var len = this.allCells.length
	for(var i = 0; i < len; i++) {
	    cell = this.allCells[i];
	    var x = cell.x * cellWidth;
	    var y = cell.y * cellHeight;
	    this.allCells[i].draw(ctx, x, y, cellWidth, cellHeight);
	}
    },
    tick : function() {
	this.allCells.forEach(function(cell) {
		cell.tick();
	    });
	this.allCells.forEach(function(cell) {
		cell.tock();
	    });
	this.ticks += 1;
    },
    ticktock : function(that) {
	if(!that) that = this;
	that.tick();
	that.drawToCanvas();

	if(that.running) {
	    setTimeout(that.ticktock, TIMEOUT, that);
	}
    },
    neighbours : function(cell) {
	var x = cell.x; var y = cell.y;
	neighbours = [];

	function addN(n) { neighbours.push(n); };

	this.getCells(x-1,y-1).forEach(addN);
	this.getCells(x,y-1).forEach(addN);
	this.getCells(x+1,y-1).forEach(addN);
	this.getCells(x-1,y).forEach(addN);
	this.getCells(x,y).forEach(function(n) {
		if(cell != n)
		    neighbours.push(n);
	    });
	this.getCells(x+1,y).forEach(addN);

	this.getCells(x-1,y+1).forEach(addN);
	this.getCells(x,y+1).forEach(addN);
	this.getCells(x+1,y+1).forEach(addN);

	return neighbours;
    },
    forEach : function(f) {
	for(var i = 0; i < this.width; i++)
	    for(var j = 0; j < this.height; j++)
		f(i, j);
    },
    eventToCells : function(ev) {
	canvas = this.canvas;
	addCoordsToEvent(ev);
	ev._x -= $(canvas).offset().left;
	ev._y -= $(canvas).offset().top;
	var cellWidth = canvas.width / this.width; //TODO: make cellWidth a property
	var cellHeight = canvas.height / this.height;
	cell_x = Math.floor(ev._x / cellWidth);
	cell_y = Math.floor(ev._y / cellHeight);
	return this.getCells(cell_x, cell_y);
    },
    mouseDown : function(ev) {
	this.eventToCells(ev).forEach(function(c) {c.mouseDown()});
    },
    mouseMove : function(ev) {
	this.eventToCells(ev).forEach(function(c) {c.mouseOver()});
    },
}
// end Grid
/////////////////////
