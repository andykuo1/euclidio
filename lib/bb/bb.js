//Objects ----------------------------------------------------------------------------------

function View(ctx, width, height, origx, origy, xinterval, yinterval)
{
	this.ctx = ctx;
	this.width = width;
	this.height = height;

	this.xinterval = xinterval;
	this.yinterval = yinterval;

	this.point = function(x, y){
		return {x: x, y: y};
	};
	this.posToPoint = function(graph, pos){
		var x = pos.x * this.xinterval;
		var y = -pos.y * this.yinterval;
		return this.point(x + this.origin.x, y + this.origin.y);
	};
	this.pointToPos = function(graph, point){
		var posx = (point.x - this.origin.x) / this.xinterval;
		var posy = -(point.y - this.origin.y) / this.yinterval;
		return graph.pos(posx, posy);
	};

	this.origin = this.point(origx, origy);
}

function Graph()
{
	this.elements = [];
	this.elementInFocus = null;
	this.pos = function(posx, posy) {
		return {x: posx * 1.0, y: posy * 1.0};
	};
	this.findElementAtPos = function(pos) {
		for(var i = 0; i < this.elements.length; ++i)
		{
			var element = this.elements[i];
			var epos = element.position();
			var dx = epos.x - pos.x;
			var dy = epos.y - pos.y;
			var r = 0.1;//TODO: This is the click radius in position scale
			if ((dx * dx) + (dy * dy) < r)
			{
				return element;
			}
		}
	};
	this.draw = function(view) {
		for(var i = 0; i < this.elements.length; ++i)
		{
			var element = this.elements[i];
			if (this.elementInFocus == element)
			{
				element.draw(view, true);
			}
			else
			{
				element.draw(view, false);
			}
		}
	};
	this.create = function(element) {
		element.graph = this;
		this.elements.push(element);
	};
}

// - - - - - IMPORTANT: All graph objects must have pos, graph, and draw(view, infocus)!

function GraphPoint(pos)
{
	this.pos = pos;

	this.graph = null;
	this.position = function() {
		return this.pos;
	}
	this.draw = function(view, infocus) {
		var pt = view.posToPoint(this.graph, this.position());
		drawPoint(view.ctx, pt.x, pt.y);

		if (infocus)
		{
			drawPoint(view.ctx, pt.x, pt.y, "#00FF00", false);
		}
	};
}

function GraphSegment(pos1, pos2)
{
	this.pos1 = pos1;
	this.pos2 = pos2;

	this.graph = null;
	this.position = function() {
		var xy = average([this.pos1, this.pos2]);
		return this.graph.pos(xy.x, xy.y);
	};
	this.draw = function(view, infocus) {
		var pt = view.posToPoint(this.graph, this.position());
		var pt1 = view.posToPoint(this.graph, this.pos1);
		var pt2 = view.posToPoint(this.graph, this.pos2);
		drawLine(ctx, pt1.x, pt1.y, pt2.x, pt2.y);

		if (infocus)
		{
			drawPoint(view.ctx, pt.x, pt.y, "#00FF00", true);
		}
	};
}

function GraphRay(pos1, pos2)
{
	this.pos1 = pos1;
	this.pos2 = pos2;

	this.graph = null;
	this.position = function() {
		return this.pos1;
	};
	this.draw = function(view, infocus) {
		var pt1 = view.posToPoint(this.graph, this.pos1);
		var pt2 = view.posToPoint(this.graph, this.pos2);

		//TODO: Extrapolate better!

		var dx = pt2.x - pt1.x;
		var dy = pt2.y - pt1.y;

		var dw = dx * view.width;
		var dh = dy * view.height;

		pt2.x += dw;
		pt2.y += dh;

		drawLine(ctx, pt1.x, pt1.y, pt2.x, pt2.y);

		if (infocus)
		{
			drawPoint(view.ctx, pt1.x, pt1.y, "#00FF00", true);
		}
	};
}

function GraphLine(pos1, pos2)
{
	this.pos1 = pos1;
	this.pos2 = pos2;

	this.graph = null;
	this.position = function() {
		var xy = average([this.pos1, this.pos2]);
		return this.graph.pos(xy.x, xy.y);
	};
	this.draw = function(view, infocus) {
		var pt = view.posToPoint(this.graph, this.position());
		var pt1 = view.posToPoint(this.graph, this.pos1);
		var pt2 = view.posToPoint(this.graph, this.pos2);

		//TODO: Extrapolate better!

		var dx = pt1.x - pt2.x;
		var dy = pt1.y - pt2.y;

		var dw = dx * view.width;
		var dh = dy * view.height;

		pt1.x += dw;
		pt1.y += dh;
		pt2.x -= dw;
		pt2.y -= dh;

		drawLine(ctx, pt1.x, pt1.y, pt2.x, pt2.y);

		if (infocus)
		{
			drawPoint(view.ctx, pt.x, pt.y, "#00FF00", true);
		}
	};
}

function GraphAngle(pos1, pos2, pos3)
{
	this.pos1 = pos1;
	this.pos2 = pos2;
	this.pos3 = pos3;

	this.graph = null;
	this.position = function() {
		return this.pos2;
	};
	this.draw = function(view, infocus) {
		var pt1 = view.posToPoint(this.graph, this.pos1);
		var pt2 = view.posToPoint(this.graph, this.pos2);
		var pt3 = view.posToPoint(this.graph, this.pos3);

		drawAngle(ctx, pt1.x, pt1.y, pt2.x, pt2.y, pt3.x, pt3.y);

		if (infocus)
		{
			drawPoint(view.ctx, pt2.x, pt2.y, "#00FF00", true);
		}
	};
}

function GraphCircle(pos1, pos2)
{
	this.pos1 = pos1;
	this.pos2 = pos2;

	this.graph = null;
	this.position = function() {
		return this.pos1;
	};
	this.draw = function(view, infocus) {
		var pt1 = view.posToPoint(this.graph, this.pos1);
		var pt2 = view.posToPoint(this.graph, this.pos2);

		drawCircle(ctx, pt1.x, pt1.y, Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2)), "#000000", 1);
	};
}

//Canvas Initialization Stuff ----------------------------------------------------------------------------------

function getCanvas(id)
{
	return document.getElementById(id);
}

function getCanvasContext(canvas)
{
	return canvas.getContext("2d");
}

function initCanvas(canvas, mouseCallback, buttonCallback)
{
	var onMouseMove = function(event) {
		var rect = canvas.getBoundingClientRect();
		var x = event.clientX - rect.left;
		var y = event.clientY - rect.top;

		mouseCallback(x, y, 0);
	};

	var onMouseDown = function(event) {
		buttonCallback(true);
	};

	var onMouseUp = function(event) {
		buttonCallback(false);
	};

	canvas.addEventListener('mousemove', onMouseMove, false);
	canvas.addEventListener('mousedown', onMouseDown, false);
	canvas.addEventListener('mouseup', onMouseUp, false);
}

function clearCanvas(ctx, canvas, background)
{
	ctx.fillStyle = background;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//Canvas Drawing Functions ----------------------------------------------------------------------------------

function drawLine (ctx, x1, y1, x2, y2, color = "#000000", width = 1)
{
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function drawCircle (ctx, x, y, radius, color = "#000000", width = 1)
{
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
}

function fillCircle (ctx, x, y, radius, color = "#000000")
{
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2* Math.PI);
	ctx.fill();
}

function drawPoint (ctx, x, y, color = "#000000", outline = true)
{
	fillCircle(ctx, x, y, 2, color);
	if (outline)
	{
		drawCircle(ctx, x, y, 12, "#a5a5a5");
	}
}

function drawAngle(ctx, x1, y1, x2, y2, x3, y3, color = "#0000FF", width = 2)
{
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.beginPath();
	var dx21 = x1 - x2;
	var dy21 = y1 - y2;
	var dx23 = x3 - x2;
	var dy23 = y3 - y2;
	var rad21 = Math.atan2(dy21, dx21);
	var rad23 = Math.atan2(dy23, dx23);
	ctx.arc(x2, y2, 22, rad23, rad21);
	ctx.stroke();
}

function drawGrid(ctx, width, height, origx, origy, xinterval, yinterval, color = "#d5d5d5")
{
	if (origx === null) origx = width / 2;
	if (origy === null) origy = height / 2;
	if (xinterval === null) xinterval = width / 11;
	if (yinterval === null) yinterval = height / 11;

	var q1w = width - origx;
	var q1h = origy;
	var q3w = origx;
	var q3h = height - origy;

	var i = 0, j = 0;

	for(i = 0; i < q1w; i += xinterval)
	{
		j = origx + i;
		drawLine(ctx, j, 0, j, height, color); //RIGHT
	}

	for(i = 0; i < q3w; i += xinterval)
	{
		j = origx - i;
		drawLine(ctx, j, 0, j, height, color); //LEFT
	}

	for(i = 0; i < q1h; i += yinterval)
	{
		j = origy - i;
		drawLine(ctx, 0, j, width, j, color); //DOWN
	}

	for(i = 0; i < q3h; i += yinterval)
	{
		j = origy + i;
		drawLine(ctx, 0, j, width, j, color); //UP
	}
}

function drawAxis(ctx, width, height, origx, origy, color = "#ED809A")
{
	if (origx === null) origx = width / 2;
	if (origy === null) origy = height / 2;

	drawLine(ctx, origx, 0, origx, height, color, 2);
	drawLine(ctx, 0, origy, width, origy, color, 2);
}



//Math Functions ----------------------------------------------------------------------------------



function average(xyarray)
{
	var len = xyarray.length;
	var x = 0.0;
	var y = 0.0;
	for(var i = 0; i < len; ++i)
	{
		var xy = xyarray[i];
		x += xy.x;
		y += xy.y;
	}
	return {x: x / len, y: y / len};
}