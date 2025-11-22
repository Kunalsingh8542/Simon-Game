var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPatter = [];
var started = false;
var level = 0;


function nextSequence() {

  userClickPatter = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  var sound = new Audio("sounds/" + randomChosenColor + ".mp3");
  sound.play();


}




$(".btn").on("click", function () {

  var userChosenColor = $(this).attr("id");
  userClickPatter.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickPatter.length - 1);
})


function playSound(name) {

  $("#" + name).fadeOut(50).fadeIn(50);

  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();


}


// press animation 
function animatePress(currentColor) {

  $("." + currentColor).addClass("pressed");

  setTimeout(function () {
    $('.' + currentColor).removeClass('pressed');
  }, 50);

}


// start the game  



$(document).on("keypress", function () {

  if (!started) {

    nextSequence();

    started = true;

  }



})


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickPatter[currentLevel]) {
    if (userClickPatter.length === gamePattern.length) {
      setTimeout(function () {

        nextSequence();



      }, 1000)
    }
  }

  else {

    var wrongAnswer = new Audio("sounds/wrong.mp3");
    wrongAnswer.play();
    $("body").addClass("game-over");
    setTimeout(function () {

      $("body").removeClass("game-over");



    }, 200)

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

  }


}


function startOver() {

  level = 0;
  gamePattern = [];
  started = false;


}