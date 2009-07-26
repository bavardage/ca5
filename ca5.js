function test() {
    debug('running test');
    g = new Grid(20, 20);
    debug('grid made');

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

    for(var i = 0; i < 20; i++)
	for(var j = 0; j < 20; j++)
	    new ChamCell(g, i, j);

		

    $('#tick').click(function() {
	    g.tick();
	    debug('ticked grid');
	    $('#canvas').each(function() {
		    debug('drawing ' + g + ' a canvas' + this);
		    g.drawToCanvas(this);
		});
	    debug('all done');
	});

    $('#playpause').click(function() {
	    $('#canvas').each(function() {
		    debug('toggling play');
		    g.togglePlay(this);
		});
	});

    $('#canvas').each(function() {
	    g.drawToCanvas(this);
	});
    
}