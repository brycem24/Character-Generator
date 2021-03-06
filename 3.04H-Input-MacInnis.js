//Abstract singleton class for storing input on a cartesian plane.
class Input {
    //PROCESSING: When an input key is pressed, save the input.
    static handleInput(keyEvent) {
        var keyNumber = keyEvent.which || keyEvent.keyCode;

        //UP movement
        if (keyNumber == 87)
            Input.y = -1;
        //DOWN movement
        else if (keyNumber == 83)
            Input.y = 1;
		//LEFT movement
        else if (keyNumber == 65)
            Input.x = -1;
        //RIGHT movement
        else if (keyNumber == 68)
            Input.x = 1;
        //ENTER/SPACE pushed
        else if (keyNumber == 13 || keyNumber == 32 && !Input.isTriggered) {
            Input.isTriggered = true;
        }
        //NO movement
        else {
            Input.x = 0;
            Input.y = 0;
        }
		
		//ROTATE RIGHT
		if (keyNumber == 39) {
			Input.rotation -= 1;
			console.log("rotated right");
		}
		//ROTATE LEFT		
		else if (keyNumber == 37) {
			Input.rotation += 1;
			console.log("rotated left");
		}
		
		if (Input.rotation > 360)
			Input.rotation -= 360;
		else if (Input.rotation < 0)
			Input.rotation += 360;
			
		console.log("Rotated " + Input.rotation + " degrees");
    }

    //PROCESSING: When an input key is released, reset the input.
    static releaseInput(keyEvent) {
        var keyNumber = keyEvent.which || keyEvent.keyCode;

        //UP movement
        if (keyNumber == 87 || keyNumber == 38)
            Input.y = 0;
        //DOWN movement
        else if (keyNumber == 83 || keyNumber == 40)
            Input.y = 0;
        //LEFT movement
        if (keyNumber == 65 || keyNumber == 37)
            Input.x = 0;
        //RIGHT movement
        else if (keyNumber == 68 || keyNumber == 39)
            Input.x = 0;
        //ENTER/SPACE released
        else if (keyNumber == 13 || keyNumber == 32) {
            Input.isTriggered = false;
        }
    }

    //PROCESSING: Returns the user's input as a vector.
    static getInput() {
       return new Vector2(Input.x, Input.y);
    }
}

//INITIALIZATION: Defines x,y input.
Input.x = 0;
Input.y = 0;

Input.rotation = 0;


//Was the enter/space key pushed?
Input.isTriggered = false;
