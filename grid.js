var TIMEOUT = 100;

// Grid - a grid of cells
function Grid(width, height) {
    this.width = width;
    this.height = height;
    this.reset();
};
Grid.prototype = {
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
    togglePlay : function(canvas) {
	this.running = !this.running;
	if(this.running)
	    setTimeout(this.ticktock, TIMEOUT, canvas, this);
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
    drawToCanvas : function(canvas) {
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
    ticktock : function(canvas, that) {
	if(!that) that = this;
	that.tick();
	that.drawToCanvas(canvas);

	if(that.running) {
	    setTimeout(that.ticktock, TIMEOUT, canvas, that);
	}
    },
    neighbours : function(cell) {
	var x = cell.x; var y = cell.y;
	var xStart = x < 1 ? 0 : x - 1;
	var yStart = y < 1 ? 0 : y - 1;
	neighbours = [];
	for(var i = xStart; i <= x + 1; i++) {
	    for(var j = yStart; j <= y + 1; j++) {
		//		if(i != x || j != y)
		    this.cells[i % this.width][j % this.height].forEach(function(n) {
			    if(cell != n)
				neighbours.push(n);
			});
	    }
	}
	return neighbours;
    }
}
// end Grid
/////////////////////
