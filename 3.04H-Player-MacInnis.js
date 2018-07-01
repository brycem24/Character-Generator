var player = {};
player.x = 48;
player.y = 80;
player.angle = 60;

function drawPlayer(context) {
	context.fillStyle = "blue";
	context.fillRect(player.x - 2, player.y - 2, 4,4);	
}

function movePlayer() {
	player.x += Input.x * 2;
	player.y += Input.y * 2;
}
