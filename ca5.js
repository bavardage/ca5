simulations = [];
grid = new Grid(10, 10);

function Simulation(name, description, setup) {
    this.name = name;
    this.description = description;
    this.setup = setup;
    simulations.push(this);
}

function setupInterface() {
    simulations.forEach(function(sim) {
	    $('#simulations').append("<li><a href='#' onClick='loadSim(\""
				     + sim.name + "\")'>" 
				     + sim.name 
				     + "</a></li>");
	});
    $('#controls a').click(function() {
	    debug('playpause');
	    $('#canvas').each(function() {
		    grid.togglePlay(this);
		});
	});
}

function loadSim(name) {
    debug('loading sim');
    len = simulations.length;
    for(var i = 0; i < len; i++)
	if(simulations[i].name == name) {
	    debug('sim is: ' + simulations[i].description);
	    simulations[i].setup();
	}
}

new Simulation("Pretty Colours",
	       "Displays some randomly changing colours and stuff.",
	       function() {
		   grid.width = 10; grid.height = 10;
		   grid.reset();
		   c = new FunkyCell(grid, 2, 2);
		   new CopyCell(grid, 2, 3, c);
		   new CopyCell(grid, 4, 2, c);
		   new CopyCell(grid, 3, 4, c);
		   grid.forEach(function(x, y) {
			   new ChamCell(grid, x, y);
		       });
});

new Simulation("Life",
	       "Conway's game of life",
	       function() {
		   grid.width = 30;
		   grid.height = 30;
		   grid.reset();
		   grid.forEach(function(x,y) {
			   var alive = false;
			   if(Math.random() > 0.7)
			       alive = true;
			   c = new GOLCell(grid, x, y, alive);
		       });
});

new Simulation("Glider",
	       "Conway's game of life with a single glider",
	       function() {
		   grid.width = 20; grid.height = 20;
		   grid.reset();
		   new GOLCell(grid, 5, 5, true);
		   new GOLCell(grid, 5, 6, true);
		   new GOLCell(grid, 6, 6, true);
		   new GOLCell(grid, 4, 7, true);
		   new GOLCell(grid, 6, 7, true);
		   grid.forEach(function(x,y) {
			   if(!grid.cells[x][y].length)
			       new GOLCell(grid, x, y);
		       });
});
		
