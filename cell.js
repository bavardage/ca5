var TIMEOUT = 100;

// Grid - a grid of cells
function Grid(width, height) {
    this.width = width;
    this.height = height;
    this.cells = [width];
    this.allCells = [];
    for(var i = 0; i < width; i++) {
	this.cells[i] = Array(height);
	for(var j = 0; j < height; j++)
	    this.cells[i][j] = [];
    }
    this.ticks = 0;
};
Grid.prototype = {
    cells : null,
    running : false,
    add : function(cell) {
	this.cells[cell.x][cell.y].push(cell); //TODO: check within bounds
	this.allCells.push(cell);
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
function DrawableCell() {
    //pass
}
DrawableCell.prototype = {
    fillColor : new Color(0,0,0),
    draw : function(ctx, x, y, w, h) {
	ctx.fillStyle = this.fillColor.toString();
	ctx.fillRect(x,y,w,h);
    }
};

//now tack drawablecell on to cell
extend(Cell, DrawableCell);

//end DrawableCell
/////////////////////

//FunkyCell - random colours
function FunkyCell(grid, x, y) {
    Cell.call(this, grid, x, y);
    this.fillColor = new Color(255,0,0);
    this.changeOffset = Math.floor(Math.random()*15);
}
FunkyCell.prototype = {
    type : 'FunkyCell',
    fillColor : null,
    dr : 10,
    dg : 10,
    db : 10,
    tock : function() {
	if((this.grid.ticks + this.changeOffset) % 15 != 0) return;
	this.fillColor.r = Math.floor(Math.random()*255);
	this.fillColor.g = Math.floor(Math.random()*255);
	this.fillColor.b = Math.floor(Math.random()*255);
 	// this.fillColor.r += this.dr;
	// this.dr = Math.floor(Math.random()*100) - 50;
	// this.fillColor.g += this.dg;
	// this.dg = Math.floor(Math.random()*100) - 50;
	// this.fillColor.b += this.db;
	// this.db = Math.floor(Math.random()*100) - 50;
	// this.fillColor.normalise();
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


