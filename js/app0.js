  	/*--- Determine Guess Status ----*/
  	 var guessCounter=0;
  	 var newGame = 0;
  	 var guessNum = [];
  	 var rndNum = Math.floor((Math.random()*100)+1);
  	 var preDiff = rndNum;
  	 var feedback=["Enter 1 to 100", "Click + NEW GAME to Start a New Game", "Bad Guess!--Enter 1 to 100"];
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

    /*------GAME CONTROL CENTER--------*/
	$("#userGuess").click(function(event){
		event.preventDefault()
		if(newGame==1){//after ea sucess
			$("#feedback").text(feedback[1]);
		}
	});

	$("#guessButton").click(function(event){
		event.preventDefault();//(H1--prevents resetting)
		guessSecretNum();
	});

	$("a.new").click(function(){//+NEW GAME link clicked
		newGame=2;
		startNewGame();
  	});
});
	/*--- Named fn: Computes Guess Secret Number----*/
	var guessSecretNum = function (guess) {
			if(newGame){//disable input and wait for +NEW GAME
				$("#feedback").text(feedback[1]);
				return;
			}
			var guess = +$('#userGuess').val()//get data from user
			$("#userGuess").val("");
			computeGuessStatus(guess);
			return 0;
	}
	/*--- Named fn: Computes Guess Status----*/
    var computeGuessStatus = function (guess) {
  		if(!(guess>0 && guess< 101)){//Guess outside range
  			$("#feedback").text(feedback[2]);
  		}
  		else{
			guessCounter++;//count # of guesses
			guessNum.push(guess);
			var difference = Math.abs(rndNum-guess);//Compute distance from secret number
			var result = evaluateGuess(difference);//Get guess result
			updateUI(result);
		}
		return 0;
    };

    /*--- Named fn: Starts new game by +NEW GAME ----*/
    var startNewGame = function () {
			for(var i=guessCounter;i>=0;i--){//Clear stacked Html elements
				guessNum.pop();
			}
			updateUI(newGame);
			guessCounter=0;
			newGame = 0;//Prevents new-game request from interrupting current game
			rndNum = Math.floor((Math.random()*100)+1);//Get secret # for new game
    		preDiff = rndNum;//doesn't have to follow "rndNum"
    		return 0;
    };

    /*--- Named fn: Updates User Interface ----*/
    var updateUI = function (result) {
    	if(!newGame){//Update all UI containers
    		$("#feedback").text(result);//Display guess result
			$("#count").text(guessCounter);//Update # of guesses 
			$("#guessList").html("<li>"+guessNum+"</li>");//Build list of guesses
			if("SUCCESS!!"===result){
				newGame=1;
			}//Permit starting of new game
    	}
    	else{//Re-initialze all UI containers
			$("#userGuess").val("");//(H3) Display "Enter another guess
			$("#count").text(0);//(H2) Clear # of guesses
			$("#guessList").empty();//Clear guess list
			$("#feedback").text(feedback[0]);//
    		if(newGame==1){$("#feedback").text(feedback[1]);}//after sucess
    	}
    	return 0;
    };
  	 /*--- Named fn: Determines Guess Status ----
  	 var evaluateGuess = function (difference) {
        var endGame = "";//   ('c' to end Game)";
        if(difference>85){
      		return "ICE COLD" + endGame;
      	}
      	else if(difference>70)
      	{
      		return "COLD" + endGame;
      	}
      	else if(difference>55)
      	{
      		return "WARM" + endGame;
      	}
      	else if(difference>40)
      	{
      		return "HOT" + endGame;
      	}else if(difference>25)
      	{
      		return "VERY HOT" + endGame;
      	}
      	else if(difference>0)
      	{
      		return "ALMOST" + endGame;
      	}
      	else 
      	{
      		return "SUCCESS!!";
      	}
     };*/
     var evaluateGuess = function (difference) {
        //Could use hot, warm, cool, cold; getting hotter, warmer, cooler, colder
        var result;
        if(difference==0){
	    	result = "SUCCESS!!";
	    }
	    else{
        if(guessCounter==1){//1st Guess
        	if(difference<25){
    			result = "Hot";
	    	}
	    	else if(difference<50){
    			result = "Warm";
	    	}
	    	else if(difference<75){
    			result = "Cool";
	    	}
	    	else
	    	{
	    		result = "Cold";
        	}
        }
        else//Subsequent Guess
        {	
	        if(difference<preDiff){//&& in hot region
	        	result = "Getting Hotter!";
	    	}
	    	else if(difference>preDiff){//&& in cold region
	    		result = "Getting Colder";
	    	}
	    	else//difference==preDiff
	    	{
	    		result = "Try a Different Guess";
	      	}
	    }
	    preDiff = difference;
		}
       	return result;
	};         


