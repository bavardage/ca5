function WireworldCell(grid, x, y, initialState) {
	 Cell.call(this, grid, x, y);
	 this.state = initialState;
}
WireworldCell.prototype = {
  state : 0, //0 - empty, 1 - head 2 - tail 3 - conductor
  colors : [Color.black(), Color.red(), Color.yellow(), Color.silver()],
  nextState : 0,
  tick : function() {
    switch(this.state) {
    case 0 :
      this.nextState = 0; break;
    case 1 :
      this.nextState = 2; break;
    case 2 :
      this.nextState = 3; break;
    case 3 :
      var ns = this.grid.neighbours(this);
      var headCount = 0;
      ns.forEach(function(c) {
		   if(c.state == 1)
		     headCount += 1;
		 });
      if(headCount == 1 || headCount == 2)
	this.nextState = 1;
      else
	this.nextState = 3;
      break;
      }
  },
  tock : function() {
    this.state = this.nextState;
    this.fillColor = this.colors[this.state];
  },
  mouseDown : function(ev) {
    if(ev.button == 0) //left
      if(this.state == 0)
	this.state = 3;
      else
	this.state = 0;
    else if(ev.button == 1 && this.state == 3) //middle and conductor
      this.state = 1;
    this.fillColor = this.colors[this.state];
    this.grid.drawToCanvas();
  }
};
extend(WireworldCell, Cell);