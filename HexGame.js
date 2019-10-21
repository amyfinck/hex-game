var numSquares = 6;
var numbers = [];
var pickedNumber;
var squares = document.querySelectorAll(".square");
var numberDisplay = document.getElementById("numberDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var won = false; 
var start = 0; 
var end = 1;


init();

function init()
{
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons()
{
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
        
            if(this.textContent === "To Hex") 
            {
                start = 0;
                end = 1;
                document.querySelector(".type").textContent = "Hexidecimal"
            }
            else
            {
                start = 1; 
                end = 0;
                document.querySelector(".type").textContent = "Decimal"
            } 

			reset();
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab number of clicked square
			var clickedNumber = this.textContent;
			//compare number to pickedNumber
            if(clickedNumber == pickedNumber[end])
            {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
                changeColor("#b5e6b6");
                $(".square").css("color", "#b5e6b6");
                h1.style.background = "#b5e6b6";
                won = true; 
            } else if (!won)
             {
				this.style.background = "#232323";
                messageDisplay.textContent = "Try Again"
			}
		});
	}
}

function reset(){
    numbers = generateRandomNumbers(numSquares);
    changeColor("#f0a07c")
    $(".square").css("color", "#232323");
    won = false;
	//pick a new random number from array
    pickedNumber = pickNumber();
    pickedNumberStart = pickedNumber[start]
    pickedNumberEnd = pickedNumber[end];
	//change numberDisplay to match picked Number
	numberDisplay.textContent = pickedNumberStart;
	resetButton.textContent = "New Numbers"
	messageDisplay.textContent = "";
	//change numbers of squares
	for(var i = 0; i < squares.length; i++){
		if(numbers[i]){
			squares[i].style.display = "block"
			squares[i].textContent = numbers[i][end];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "#4a274f";
}

resetButton.addEventListener("click", function(){
	reset();
})

function changeColor(number){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each number to match given number
		squares[i].style.background = number;
	}
}//

function pickNumber()
{ 
	var random = Math.floor(Math.random() * numbers.length);
	return numbers[random];
} //picks a random number from numbers array

function generateRandomNumbers(num)
{ 
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
        //get random number and push into arr
        var decimal = randomNumber();
        var hex = toHex(decimal);
        var arrayelement = [decimal, hex];
		arr.push(arrayelement)
	}
	//return that array
	return arr;
} //creates a string of 3 or 6 random numbers in the form [decimal, hex]

function randomNumber(){
	//pick a "red" from 0 - 255
	var random = Math.floor(Math.random() * 100000);
	return random;
}//generates a random number

function toHex(decimal)
{
    if (decimal < 0)
    {
        decimal = 0xFFFFFFFF + decimal + 1;
    }
    
    return decimal.toString(16).toUpperCase();
}//takes in a number, returns a string containing its hex value
