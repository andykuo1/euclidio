var canvas = getCanvas("mygraph");
var ctx = getCanvasContext(canvas);

var width = 400;
var height = 400;
var origx = 200;
var origy = 200;
var xinterval = width / 11;
var yinterval = height / 11;

var mousex = 0;
var mousey = 0;
var mouseprev = false;
var mousedown = false;

var view = new View(ctx, width, height, origx, origy, xinterval, yinterval);
var graph = new Graph();
var pos1 = graph.pos(2, 0);
var pos2 = graph.pos(0, 0);
var pos3 = graph.pos(-2, 0);

graph.create(new GraphPoint(pos1));
graph.create(new GraphPoint(pos2));
graph.create(new GraphPoint(pos3));
graph.create(new GraphLine(pos1, pos2));
graph.create(new GraphRay(pos2, pos3));
graph.create(new GraphSegment(pos1, pos3));
graph.create(new GraphAngle(pos1, pos2, pos3));
graph.create(new GraphCircle(pos2, pos3));

var drawCanvas = function() {
	clearCanvas(ctx, canvas, "#FFFFFF");

	drawGrid(ctx, width, height, origx, origy, xinterval, yinterval);
	drawAxis(ctx, width, height, origx, origy);

	if (graph.elementInFocus !== null && mousedown)
	{
		var mousepos = view.pointToPos(graph, view.point(mousex, mousey));
		var elementpos = graph.elementInFocus.position();
		elementpos.x = mousepos.x;
		elementpos.y = mousepos.y;
	}

	graph.draw(view);
};

var clickCanvas = function() {
	if (mousedown)
	{
		var mousepos = view.pointToPos(graph, view.point(mousex, mousey));
		var element = graph.findElementAtPos(mousepos);
		if (graph.elementInFocus == element)
		{
			element = null;
		}

		if (element != graph.elementInFocus)
		{
			graph.elementInFocus = element;
		}
		else
		{
			//CLICKED
		}
	}
	else
	{
		graph.elementInFocus = null;
	}
	graph.draw(view);
};

var mouseCallback = function(x, y) {
	mousex = x;
	mousey = y;

	drawCanvas();
};

var buttonCallback = function(state) {
	mouseprev = mousedown;
	mousedown = state;

	if (mouseprev != mousedown)
	{
		clickCanvas();
	}
}

initCanvas(canvas, mouseCallback, buttonCallback);