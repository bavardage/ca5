function setupInterface() {
    debug('initialising interface');
    g = new Grid(10, 10);
    $('#tick').click(function() {
	    g.tick();
	    debug('ticked grid');
	    $('#canvas').each(function() {
		    debug('drawing ' + g + ' a canvas' + this);
		    g.drawToCanvas(this);
		});
	    debug('all done');
	});
    
    $('#test1').click(function() {
	    if(!g.running) colourTest1();
	    $('#canvas').each(function() {
		    debug('toggling play');
		    g.togglePlay(this);
		});
	});
    $('#test2').click(function() {
	    if(!g.running) colourTest2();
	    $('#canvas').each(function() {
		    debug('toggling play');
		    g.togglePlay(this);
		});
	});

    $('#lifetest').click(function() {
	    if(!g.running) lifeTest();
	    $('#canvas').each(function() {
		    debug('toggling play');
		    g.togglePlay(this);
		});
	});

    $('#glidertest').click(function() {
	    if(!g.running) gliderTest();
	    $('#canvas').each(function() {
		    debug('toggling play');
		    g.togglePlay(this);
		});
	});
}

function colourTest1() {
    g.width = 20; g.height = 20;
    g.reset();
    c = new FunkyCell(g, 2, 2);
    new CopyCell(g, 2, 3, c);
    new CopyCell(g, 4, 2, c);
    new CopyCell(g, 3, 4, c);

    c = new FunkyCell(g, 15, 4);
    c.fillColor = new Color(0, 255, 0);
    new CopyCell(g, 15, 5, c);
    new CopyCell(g, 16, 4, c);
    new CopyCell(g, 16, 5, c);

    c = new FunkyCell(g, 5, 18);
    c.fillColor = new Color(0, 0, 255);
    c = new CopyCell(g, 5, 17, c);
    c = new CopyCell(g, 5, 16, c);
    c = new CopyCell(g, 5, 15, c);

    c = new FunkyCell(g, 10, 10);
    c.fillColor = new Color(255, 0, 255);
    
    c = new FunkyCell(g, 19, 17);
    c.fillColor = new Color(0, 255, 255);

    for(var i = 0; i < g.width; i++)
	for(var j = 0; j < g.height; j++)
	    new ChamCell(g, i, j);
}

function colourTest2() {
    debug('colourTest2');


    g.width = 40;
    g.height = 40;
    g.reset();
    debug('resized');

    new FunkyCell(g, 2, 2);
    debug('cell made');
    new FunkyCell(g, 10, 2);
    debug('cell made');
    new FunkyCell(g, 17, 2);
    debug('cell made');
    new FunkyCell(g, 5, 3);
    debug('cell made');
    new FunkyCell(g, 5, 9);
    debug('cell made');
    new FunkyCell(g, 7, 18);
    debug('cell made');
    new FunkyCell(g, 15, 1);
    debug('cell made');
    new FunkyCell(g, 15, 11);
    debug('cell made');
    new FunkyCell(g, 15, 19);
    debug('funkycells made');

    for(var i = 0; i < g.width; i++)
	for(var j = 0; j < g.height; j++)
	    new ChamCell(g, i, j);
}

function lifeTest() {
    debug('lifetest');
    g.width = 30;
    g.height = 30;
    g.reset();

    for(var i = 0; i < g.width; i++)
	for(var j = 0; j < g.height; j++) {
	    c = new GOLCell(g, i, j);
	    if(Math.random() > 0.7) {
		debug('making an alive cell');
		c.nextAlive = true;
		c.tock();
	    }
	}
    $('#canvas').each(function() {
	    g.drawToCanvas(this);
	});
}

function gliderTest() {
    debug('glidertest');
    g.width = 20;
    g.height = 20;
    g.reset();

    c = new GOLCell(g, 5, 5);
    c.nextAlive = true;
    c.tock();
    c = new GOLCell(g, 5, 6);
    c.nextAlive = true;
    c.tock();
    c = new GOLCell(g, 6, 6);
    c.nextAlive = true;
    c.tock();
    c = new GOLCell(g, 4, 7);
    c.nextAlive = true;
    c.tock();
    c = new GOLCell(g, 6, 7);
    c.nextAlive = true;
    c.tock();

    for(var i = 0; i < g.width; i++)
	for(var j = 0; j < g.width; j++)
	    if(!g.cells[i][j].length)
		new GOLCell(g, i, j);
    debug('made cells');
    


    $('#canvas').each(function() {
	    g.drawToCanvas(this);
	});
    
}