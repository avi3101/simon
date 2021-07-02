var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
var highestScore=0;
$(document).on("keydown",function()
{
    if(!started)
    {
        
        nextSequence();
        started=true;
    }
});



$(".btn").on("click", function ()
{
    var UserChosenColour=$(this).attr("id");
    userClickedPattern.push(UserChosenColour);
    playSound(UserChosenColour);
    animatePress(UserChosenColour);
    checkAnswer(userClickedPattern.length-1);
}
);



function nextSequence()
{
    userClickedPattern=[];
    level++;
   $("h1").html("level "+level); 
   var randomNumber=Math.floor(4*Math.random());
   var randomChosenColor=buttonColours[randomNumber];
   gamePattern.push(randomChosenColor);
  
   $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColor);
  
   
}




function playSound(name)
{
    new Audio("sounds/"+name+".mp3").play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel)
{
   if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
   {
    console.log("success");
    if(gamePattern.length===userClickedPattern.length)
    {
        setTimeout(function()
        {
            nextSequence();
        },1000);
    }
   }
   else
   {
       playSound("wrong");
       $("body").addClass("game-over");
       setTimeout(function()
       {
           $("body").removeClass("game-over");
       },200);
       if(level>highestScore)
       highestScore=level;

       $("h2").html("Highest score "+highestScore);
       $("#level-title").text("You reached Level ="+level+" Game Over, Press Any Key to Restart");

       //2. Call startOver() if the user gets the sequence wrong.
       startOver();
 
   }

}
  

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  


