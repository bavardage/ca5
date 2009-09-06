simulations = [];
grid = null;

play_symbol = "\u25B6";
pause_symbol = "\u275A\u275A";
skip_symbol = "\u21e5";


function Simulation(name, description, setup) {
    this.name = name;
    this.description = description;
    this.setup = setup;
    simulations.push(this);
}

function setupPlayControls() {
    $('#skipforward').html(skip_symbol);
    if(grid.running) {
	$('#playpause').html(pause_symbol);
	$('#skipforward').addClass('inactive');
    } else {
	$('#playpause').html(play_symbol);
	$('#skipforward').removeClass('inactive');
    }
}

function setupInterface() {
    canvas = document.getElementById('canvas');
    grid = new Grid(canvas, 10, 10);
    setupPlayControls();
    var n = 0;
    simulations.forEach(function(sim) {
	    $('#simulations ul').append("<li><a id='simulation" + n 
					+ "' href='#'>" 
					+ sim.name 
					+ "</a></li>");
	    $('#simulation' + n).click(function() {
		    loadSim(sim.name);
		});
	    $('#simulation' + n).wTooltip({
		    content : sim.description, className : "tooltip largeTooltip"});
	    n += 1;
	});
    $('#playpause').click(function() {
	    debug('Playing/pausing simulation');
	    grid.togglePlay();
	    setupPlayControls();
	});
    $('#playpause').wTooltip({
	    content : "Play or pause the simulation",
		className : "tooltip",
		});
    $('#skipforward').click(function() {
	    debug('Skipping forward one tick');
	    grid.tick();
	    grid.drawToCanvas();
	});
    $('#skipforward').wTooltip({
	    content : "Advance the simulation by one tick",
	    className : "tooltip"
		});
    $('#save').click(function(e) {
	    e.preventDefault();
	    window.location = document.getElementById('canvas').toDataURL("image/png");
	});
    $('#save').wTooltip({
	    content : "View the current state of the canvas as an image, which you can save",
	    className : "tooltip"
		});
    loadSim(simulations[0].name);
}

function loadSim(name) {
    debug('loading sim');
    len = simulations.length;
    for(var i = 0; i < len; i++)
	if(simulations[i].name == name) {
	    debug('sim is: ' + simulations[i].description);
	    simulations[i].setup();
	    $('#simname').html(simulations[i].name);
	}
    grid.drawToCanvas();
    setupPlayControls();
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

new Simulation("Life (Random Start)",
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
new Simulation("Life (Blank)",
	       "Conway's game of life",
	       function() {
		   grid.resize(40,40);
		   grid.forEach(function(x,y) {
			   c = new GOLCell(grid, x, y, false);
		       });
});
new Simulation("Maze World (Random Start)",
	       "A life-like variant that produces maze patterns - rule 12345/3",
	       function() {
		   grid.resize(40,40);
		   grid.forEach(function(x,y) {
			   var alive = false;
			   if(Math.random() > 0.9)
			       alive = true;
			   new MazeCell(grid, x, y, alive);
		       });
});
new Simulation("Maze World (Blank)",
	       "A life-like variant that produces maze patterns - rule 12345/3",
	       function() {
		   grid.resize(40,40);
		   grid.forEach(function(x,y) {
			   new LifeLikeCell(grid, x, y,
					    {born: [3], stay: [1,2,3,4,5]},
					    false);
		       });
});
new Simulation("Generic Life-Like Rule ??? (Random Start)",
	       "A life-like automata - what's the rule? You decide.<br/>",
	       function() {
		   grid.resize(40,40);
		   born = [3];
		   stay = [2,3];
		   try {
		       born = eval("[" 
				   + prompt("Enter the conditions for cells being born as a comma seperated list ", "1,2,3")
				   + "]");
		       stay = eval("[" 
				   + prompt("Enter the conditions for cells staying alive as a comma seperated list ", "1,2,3")
				   + "]");
		   } catch (e) {
		       alert("Error with input, resorting to Conway's rules");
		   }
		   grid.forEach(function(x,y) {
			   new LifeLikeCell(grid, x, y,
					    {born: born, stay: stay},
					    (Math.random() > 0.7));
		       });
});
new Simulation("Generic Life-Like Rule ??? (Blank)",
	       "A life-like automata - what's the rule? You decide.<br/>",
	       function() {
		   grid.resize(40,40);
		   born = [3];
		   stay = [2,3];
		   try {
		       born = eval("[" 
				   + prompt("Enter the conditions for cells being born as a comma seperated list ", "1,2,3")
				   + "]");
		       stay = eval("[" 
				   + prompt("Enter the conditions for cells staying alive as a comma seperated list ", "1,2,3")
				   + "]");
		   } catch (e) {
		       alert("Error with input, resorting to Conway's rules");
		   }
		   grid.forEach(function(x,y) {
			   new LifeLikeCell(grid, x, y,
					    {born: born, stay: stay},
					    false);
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

new Simulation("Colourful Mouse Fade",
		"Wiggle your mouse over the grid and observe the pretty colours!",
		function() {
		    grid.resize(30,30);
		    grid.forEach(function(x,y) {
			    new ColourfulMouseFadeCell(grid, x, y);
			});
});
		

new Simulation("Wolfram Rule 30",
	       "The 1d automata specified by Wolfram Code 30",
	       function() {
		   grid.resize(50,50);
		   grid.forEach(function(x,y) {
			   new WolframCell(grid, x, y, 30);
		       });
});
new Simulation("Wolfram Rule 110",
	       "The 1d automata specified by Wolfram Code 110",
	       function() {
		   grid.resize(50,50);
		   grid.forEach(function(x,y) {
			   new WolframCell(grid, x, y, 110);
		       });
});
new Simulation("Wolfram Rule 182",
	       "The 1d automata specified by Wolfram Code 182 - produces a Sierpinski triangle type pattern",
	       function() {
		   grid.resize(50,50);
		   grid.forEach(function(x,y) {
			   new WolframCell(grid, x, y, 182);
		       });
});	       
new Simulation("Wolfram Rule ???",
	       "What's the rule? YOU decide!",
	       function() {
		   rule = parseInt(prompt("Enter rule number - 0 to 255"));
		   if(rule < 0 || rule > 255) {
		       alert("invalid rule, defaulting to 34");
		       rule = 34;
		   }
		   grid.resize(50,50);
		   grid.forEach(function(x,y) {
			   new WolframCell(grid, x, y, rule);
		       });
});