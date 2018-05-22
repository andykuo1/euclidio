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

var distSqu = function(p1, p2)
{
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;
	return dx * dx + dy * dy;
};

var findNearestGraphPoint = function(element)
{
	if (graph.elements.length < 1) return null;
	var pos = element.position();

	var i;
	var e = null;
	var j = 0;
	for(i = 0; i < graph.elements.length; ++i)
	{
		var f = graph.elements[i];
		if (f === element || !(f instanceof GraphPoint)) continue;

		var k = distSqu(pos, f.position());
		if (e == null || k < j)
		{
			e = f;
			j = k;
		}
	}

	return e;
};

var createAcyclicPoint = function(pos)
{
	var point = new GraphPoint(pos);
	graph.create(point);
	var nearestPoint = findNearestGraphPoint(point);
	if (nearestPoint != null)
	{
		graph.create(new GraphSegment(point.position(), nearestPoint.position()));
	}
};

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
			createAcyclicPoint(mousepos);
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