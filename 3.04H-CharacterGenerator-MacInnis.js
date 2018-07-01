//Called once at initializing
function start(map) {
	map.setCell(0,0,1);
	map.setCell(1,0,1);
	map.setCell(2,0,1);
	map.setCell(3,0,1);
	map.setCell(4,0,1);
	
	
	map.setCell(0,2,1);
	map.setCell(1,2,1);
	map.setCell(2,2,1);
	map.setCell(3,2,1);
	map.setCell(4,2,1);
	
	map.setCell(4,1,1);
	map.setCell(0,1,1);
}

//Called every frame
function tick(context, map) {
	map.draw(context);
	drawPlayer(context);	
	movePlayer();
	player.angle = Input.rotation;

	
	for (var i = player.angle - player.angle / 2; i <= player.angle + player.angle / 2; i += 60/160) {
		drawRays(context,map, i);
	}
	
}

function getQuadrantOfAngle(angle) {
	if (angle > 360)
		angle -= 360;
	if (angle >= 0 && angle <= 90) {
		return "i";
	}
	else if (angle > 90 && angle <= 180) {
		return "ii";
	}
	else if (angle > 180 && angle <= 270) {
		return "iii";
	}

	else if (angle > 270 && angle < 360) {
		return "iv";
	}
	
}

//Initializes the Canvas
function initializeCanvas(width, height, scale) {
	var canvas = document.getElementById("canvasID");
	canvas.width = width;
	canvas.height = height;
	canvas.style.width = width * scale + "px";
	canvas.style.height = height * scale + "px";
	
	return canvas;
}

function drawRays(context, map, angle) {
	if (angle % Math.PI / 2 == 0)
		return;

	var angleQuadrant = getQuadrantOfAngle(angle);

	//A is the first collision point
	var A = {}

	A.y = Math.floor(player.y / 32) * 32 - 1;
	A.x = player.x + (player.y - A.y) / Math.tan(angle * Math.PI/180);
	
	var B = {}
	
	B.x = Math.floor(player.x / 32) * 32 + 32;
	B.y = player.y + (player.x - B.x) * Math.tan(angle * Math.PI / 180);

	var Ya; 
	var Xa;
	var Yb;
	var Xb;

	Ya = -32;
	
	Xa = 32 / Math.tan(angle * Math.PI / 180);
		
	Xb = 32;
	
	Yb = -32 * Math.tan(angle * Math.PI / 180);
	
	A.hasFoundWall = false;
	B.hasFoundWall = false;	

	var Apos = map.getGridCoordinates(A.x,A.y);
	var Bpos = map.getGridCoordinates(B.x, B.y);

	while (!A.hasFoundWall) {
		if (map.isBoundary(Apos.x, Apos.y)) {
			A.hasFoundWall = true;
		}
		
		else {
			A.x = A.x + Xa;
			A.y = A.y + Ya;			
			
			Apos = map.getGridCoordinates(A.x, A.y);
		}
	}

	while (!B.hasFoundWall) {
		if (map.isBoundary(Bpos.x,Bpos.y)) {
			B.hasFoundWall = true;
		}

		else {
			B.x = B.x + Xb;
			B.y = B.y + Yb;
		
			Bpos = map.getGridCoordinates(B.x, B.y);
		}
	}

	context.fillStyle = "orange";
	context.fillRect(B.x - 2, B.y - 2, 4,4);	
	var gradient = context.createLinearGradient(player.x, player.y, B.x, B.y);
	gradient.addColorStop(0, "pink");
	gradient.addColorStop(1, "green");
	
	context.beginPath();
	context.strokeStyle = gradient;
	context.moveTo(player.x, player.y);
	context.lineTo(B.x, B.y);
	context.stroke();

	context.fillStyle = "orange";
	context.fillRect(A.x - 2, A.y - 2, 4,4);	
	var gradient = context.createLinearGradient(player.x, player.y, A.x, A.y);
	gradient.addColorStop(0, "blue");
	gradient.addColorStop(1, "orange");
	
	context.beginPath();
	context.strokeStyle = gradient;
	context.moveTo(player.x, player.y);
	context.lineTo(A.x, A.y);
	context.stroke();
}

function mainProcedure() {
	//Our virtual resolution
	var SCREEN_WIDTH = 160;
	var SCREEN_HEIGHT = 120;
	
	//Factor we scale our virtual resolution by
	var SCALE_FACTOR = 4;
		
	var canvas = initializeCanvas(SCREEN_WIDTH, SCREEN_HEIGHT, 4);
	var context = canvas.getContext("2d");
	
	canvas.width = 160;
	canvas.height = 120;
	
	context.fillStyle="#000000";
	context.fillRect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT);
	
	//Get the pixels from the Canvas element
	
	context.strokeStyle="#FF00FF";
	
	context.strokeRect(0,0,SCREEN_WIDTH, SCREEN_HEIGHT);

	var MAP_HEIGHT = 3;
	var MAP_WIDTH = 5;

	var map = new Map(MAP_WIDTH, MAP_HEIGHT);

	setInterval(function() {
		tick(context, map);
	}, 16.7);

	start(map);
}

//When the window loads, load the game.
//window.onload = mainProcedure;
mainProcedure();

window.onkeydown = Input.handleInput;
window.onkeyup = Input.releaseInput;
