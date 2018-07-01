class Map {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		
		//Create a new 2D grid
		var array = new Array(width);
		for (var y = 0; y < height; y++) {
			array[y] = new Array(width);
		}

		this.grid = array;

		//Initialize each value with 0s.
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				this.grid[y][x] = 0;
			}
		}
	}

	draw(context) {
		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
				var cell = this.grid[y][x];
				if (cell == 0)
					context.fillStyle = "red";
				else
					context.fillStyle = "pink";
				context.fillRect(x * 32, y * 32, 32, 32);
				
				context.strokeStyle = "white";
				context.strokeRect(x * 32, y * 32, 32, 32);
			}
		}
	}
	
	//Converts from Grid Coordinates to Screen Coordinates
	getScreenCoordinates(x,y) {	
		x = parseInt(x);
		y = parseInt(y);
		
		var position = {}
		position.x = x * 32;
		position.y = y * 32;

		return position;	
	}
	
	getCell(x,y) {
		return this.grid[y][x];
	}

	setCell(x,y, value) {
		this.grid[y][x] = value;
	}

	isBoundary(x,y) {
		if (x < 0 || x > this.width)
			return "out of bounds";
		else if (y < 0 || y > this.height)
			return "out of bounds";

		var cell = this.getCell(x,y);
		return cell == 1;
	}

	//Converts from Screen Coordinates to Grid Coordinates
	getGridCoordinates(x,y) {
		x = parseInt(x);
		y = parseInt(y);

		var position = {}
		position.x = Math.floor(x/32);
		position.y = Math.floor(y / 32);

		return position;
	}
}
