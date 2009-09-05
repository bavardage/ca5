simulations = [];
grid = null;

play_symbol = "\u25B6";
pause_symbol = "\u275A\u275A";


function Simulation(name, description, setup) {
    this.name = name;
    this.description = description;
    this.setup = setup;
    simulations.push(this);
}

function setupPlayButton() {
    if(grid.running)
	$('#playpause').html(pause_symbol);
    else
	$('#playpause').html(play_symbol);
}

function setupInterface() {
    canvas = document.getElementById('canvas');
    grid = new Grid(canvas, 10, 10);
    setupPlayButton();
    simulations.forEach(function(sim) {
	    $('#simulations ul').append("<li><a href='#' onClick='loadSim(\""
					+ sim.name + "\")'>" 
					+ sim.name 
					+ "</a></li>");
	});
    $('#playpause').click(function() {
	    debug('playpause');
	    grid.togglePlay();
	    setupPlayButton();
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
    grid.drawToCanvas();
    setupPlayButton();
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
		   grid.resize(40,40);
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
		   grid.resize(20,20);
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
		
new Simulation("Mouse Fade",
	       "Wiggle your mouse over the grid!",
	       function() {
		   grid.resize(15,15);
		   grid.forEach(function(x,y) {
			   new MouseFadeCell(grid, x, y);
		       });
});

new Simulation ("Colourful Mouse Fade",
		"Wiggle your mouse over the grid!",
		function() {
		    grid.resize(30,30);
		    grid.forEach(function(x,y) {
			    new ColourfulMouseFadeCell(grid, x, y);
			});
});
		