function LifeLikeCell(grid, x, y, rules, initialState) {
    Cell.call(this, grid, x, y);
    this.rules = rules;
    this.alive = initialState;
}
LifeLikeCell.prototype = {
    rules : {born : [3], stay : [2,3]},
    alive : false,
    nextAlive : false,
    aliveColor : new Color(255, 0, 0),
    deadColor : new Color(0,0,0),
    tick : function() {
    	ns = this.grid.neighbours(this);
    	aliveCount = 0;
    	ns.forEach(function(cell) {
    		if(cell.alive) aliveCount += 1;
    	    });
    	this.nextAlive = this.alive;
    	if(this.alive) {
    	    if(!inList(aliveCount, this.rules.stay)) {
    		this.nextAlive = false;
    	    }
    	} else {
    	    if(inList(aliveCount, this.rules.born))
    		this.nextAlive = true;
    	}
    },
    tock : function() {
    	this.alive = this.nextAlive;
    	this.fillColor = this.alive ? this.aliveColor : this.deadColor;
    },
    mouseDown : function() {
	
	this.alive = !this.alive;
	this.fillColor = this.alive ? this.aliveColor : this.deadColor;
	this.grid.drawToCanvas();
    }
};
extend(LifeLikeCell, Cell);

function GOLCell(grid, x, y, initialState) {
    LifeLikeCell.call(this, grid, x, y, {born : [3], stay: [2,3]}, initialState);
}
extend(GOLCell, LifeLikeCell);

function MazeCell(grid, x, y, initialState) {
    LifeLikeCell.call(this, grid, x, y, {born : [3], stay: [1,2,3,4,5]}, initialState);
}
extend(MazeCell, LifeLikeCell);