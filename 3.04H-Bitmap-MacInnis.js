class Bitmap {
	constructor(context, x, y, width, height) {
		this.imageData = context.getImageData(x, y, width, height);
		this.context = context;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.pixels = this.imageData.data;
	}
	
	getData() {
		return this.imageData;
	}
	
	setPixels(mode) {
		
		if (mode == 0) {
			for (var i = 0; i < this.width * this.height * 4; i += 4)
			{
				this.pixels[i] = Math.floor(Math.random() * 48); //RED PROPERTY
				this.pixels[i + 1] = Math.floor(Math.random() * 48); //GREEN PROPERTY
				this.pixels[i + 2] = Math.floor(Math.random() * 48); //BLUE PROPERTY
			}
		}
	}

	changePixels(x,y,width,height) {
		for (var i = 0; i < this.width * this.height * 4; i += 4)
		{
			this.pixels[i] = j;
		}
	}

	update() {
		this.context.putImageData(this.getData(), this.x, this.y);
	}	
}


