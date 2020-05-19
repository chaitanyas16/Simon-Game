var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;

/*************KeyPress Event to start the game***************/

$(document).keypress(function(){
  if (!started){
  nextSequence();
  started = true;
}
});



/***********Function to Generate Random Number the Color********/
  function nextSequence(){
  var randomNum = Math.floor(Math.random() * 3) + 1;
  randomChosenColor = buttonColors[randomNum];
  playSound(randomChosenColor);
  $("#" +randomChosenColor).fadeOut().fadeIn();
  gamePattern[gamePattern.length] = randomChosenColor;
  console.log(gamePattern);
  level = level + 1;
  $("h1").text("You are at level  " +level);
}

/********User Click Event to Select Color **************/

$("div[type='button']").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickPattern[userClickPattern.length] = userChosenColor;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkPattern();



})

/********** Function to play Sound on Click and sequence color selection*****/
function playSound(color){
  var audio = new Audio("sounds/" +color+".mp3")
  audio.play();
}

function animatePress(userChosenColor){
  console.log($('div [id="' +userChosenColor +'"]'));
  $('div [id="' +userChosenColor +'"]').addClass("pressed");
  setTimeout(function(){
    $('div [id="' +userChosenColor +'"]').removeClass("pressed");
  },100);
}

/********* Function to check user selection with game pattern slection*******/
function checkPattern() {
  var isEqual = true;
  if (userClickPattern[userClickPattern.length - 1] !== gamePattern[userClickPattern.length - 1]) {
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over! Press Any Key to Restart");
    isEqual = false;
    startOver();

  }

  if (isEqual && userClickPattern.length === gamePattern.length) {
      userClickPattern = [];
    nextSequence();
  }

}

/********* Function to restart the game*******/

function startOver() {
  randomChosenColor;
  gamePattern = [];
  userClickPattern = [];
  level = 0;
  started = false;

}
