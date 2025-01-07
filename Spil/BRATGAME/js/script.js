// *** CHANGED in version 2: pointing to start instead of startGame ***
window.addEventListener("load", start);

// Declare variable "lives" and "points"
let lives, points;

// *************** Added in version 4 ***************
const flueSound = document.querySelector("#snd1");
const carlSound = document.querySelector("#snd2");
const loseSound = document.querySelector("#snd3");
const winSound = document.querySelector("#snd4");
const bgSound = document.querySelector("#snd5");
const muteBtn = document.querySelector("#mute");

// *************** Added in version 2 ***************
function start() {
  // Print the function in the console
  console.log("start");
  // Hide all screens
  hideAllScreens();
  // Show start screen
  document.querySelector("#start").classList.remove("hide");
  document.querySelector("#start_btn").addEventListener("click", startGame);
}
// *** CHANGES in version 2: added hideScreen function call & added eventlistener on animationiteration
// *** CHANGES in version 2: added initialization of fluesvamp
function startGame() {
  // Print the function name in the console
  console.log("start");
  // *************** Added in version 2 ***************
  // Show the game screen
  hideAllScreens();
  // Reset lives and points
  lives = 3;
  points = 0;
  // Update UI for score and energy
  updateUI();

  // *************** Added in version 4 ***************
  stopAllSound();

  bgSound.currentTime = 0;
  bgSound.play();
  bgSound.addEventListener("ended", loopSound);
  muteBtn.addEventListener("click", muteplay);

  // *************** Added in version 5 ***************
  // ************GOOD ELEMENTS*************************
  // create a random number (rndNumber) between 1 and 4
  let randomNumber = generateRandomNumber(4);
  console.log(randomNumber);
  // create "newPos" and give it the name "pos" + the generated number
  let newPos = "pos" + randomNumber;
  console.log(newPos);
  // Place the carljohan_container element at a start-position using a random number
  document.querySelector("#carljohan_container").classList.add(newPos);
  // apply class "fald" on the carljohan_container element
  document.querySelector("#carljohan_container").classList.add("fald");
  // Add eventListener to carljohan_container when user clicks
  document.querySelector("#carljohan_container").addEventListener("mousedown", clickCarl);
  // *************** Added in version 2 ***************
  // Add eventListener for restarting carljohan_container when reaching the bottom
  document.querySelector("#carljohan_container").addEventListener("animationiteration", restartCarl);

  // *************** Added in version 5 ***************
  randomNumber = generateRandomNumber(4);
  newPos = "pos" + randomNumber;
  document.querySelector("#carljohan_container1").classList.add(newPos);
  document.querySelector("#carljohan_container1").classList.add("fald");
  document.querySelector("#carljohan_container1").addEventListener("mousedown", clickCarl);
  document.querySelector("#carljohan_container1").addEventListener("animationiteration", restartCarl);

  // *************** Added in version 5 ***************
  randomNumber = generateRandomNumber(4);
  newPos = "pos" + randomNumber;
  document.querySelector("#carljohan_container2").classList.add(newPos);
  document.querySelector("#carljohan_container2").classList.add("fald");
  document.querySelector("#carljohan_container2").addEventListener("mousedown", clickCarl);
  document.querySelector("#carljohan_container2").addEventListener("animationiteration", restartCarl);

  // *************** Added in version 2 ***************
  // Create random number for fluesvamp_container position
  randomNumber = generateRandomNumber(4);
  newPos = "pos" + randomNumber;
  document.querySelector("#fluesvamp_container").classList.add(newPos);
  document.querySelector("#fluesvamp_container").classList.add("fald");
  document.querySelector("#fluesvamp_container").addEventListener("mousedown", clickFlue);
  document.querySelector("#fluesvamp_container").addEventListener("animationiteration", restartFlue);

  // *************** Added in version 5 ***************
  randomNumber = generateRandomNumber(4);
  newPos = "pos" + randomNumber;
  document.querySelector("#fluesvamp_container1").classList.add(newPos);
  document.querySelector("#fluesvamp_container1").classList.add("fald");
  document.querySelector("#fluesvamp_container1").addEventListener("mousedown", clickFlue);
  document.querySelector("#fluesvamp_container1").addEventListener("animationiteration", restartFlue);

  // *************** Added in version 3 ***************
  // Add time-goes class to #time element
  document.querySelector("#time").classList.add("time-goes");
  // Add eventListener to time
  document.querySelector("#time").addEventListener("animationend", gameOver);
}

// *** CHANGES in version 2: uses functions for adding points and updating UI
// *** CHANGES in version 5: referring to container with "this" and sprite whith "this.firstElementChild"
function clickCarl() {
  // Print the function name in the console
  console.log("clickCarl");
  // Remove click-eventListener
  // *************** Added in version 4 ***************
  carlSound.currentTime = 0;
  carlSound.play();
  this.removeEventListener("mousedown", clickCarl);
  // Add one point
  addPoint();
  // Update UI
  updateUI();
  // Pause the falling
  this.classList.add("frys");
  // Rotate sprite
  this.firstElementChild.classList.add("forsvind");
  // Restart falling of carljohan_container when rotation is finished
  this.addEventListener("animationend", restartCarl);
}

function restartCarl() {
  // Print the function name in the console
  console.log("restartCarl");
  // Remove all classes from carljohan_container and carljohan_sprite
  this.classList = "";
  this.firstElementChild.classList = "";
  // Force Reflow
  this.offsetHeight;
  // Place the carljohan_container element at a start-position using a random number
  let randomNumber = generateRandomNumber(4);
  let newPos = "pos" + randomNumber;
  this.classList.add(newPos);
  // apply class "fald" on the carljohan_container element
  this.classList.add("fald");
  // Add eventListener to carljohan_container
  this.addEventListener("mousedown", clickCarl);
}

// *** ADDED in version 2
// *** CHANGES in version 5: referring to container with "this" and sprite whith "this.firstElementChild"
function clickFlue() {
  // Print the function name in the console
  console.log("clickFlue");
  // Remove click-eventListener
  this.removeEventListener("mousedown", clickFlue);
  // *************** Added in version 4 ***************
  flueSound.currentTime = 0;
  flueSound.play();
  // Lose a life
  loseLife();
  // Update UI
  updateUI();
  // Pause the falling
  this.classList.add("frys");
  // Rotate sprite
  this.firstElementChild.classList.add("forsvind");
  // Restart falling of fluesvamp_container when rotation is finished
  this.addEventListener("animationend", restartFlue);
}
// *** ADDED in version 2
function restartFlue() {
  // Print the function name in the console
  console.log("restartFlue");
  // Remove all classes from fluesvamp_container and fluesvamp_sprite
  this.classList = "";
  this.firstElementChild.classList = "";
  // Force Reflow
  this.offsetHeight;
  // Place the fluesvamp_container element at a start-position using a random number
  let randomNumber = generateRandomNumber(4);
  let newPos = "pos" + randomNumber;
  this.classList.add(newPos);
  // apply class "fald" on the fluesvamp_container element
  this.classList.add("fald");
  // Add eventListener to fluesvamp_container
  this.addEventListener("mousedown", clickFlue);
}

// **************************************************************
// Game over, win, lose and restart game
// **************************************************************
// *************** Added in version 2 ***************
function gameOver() {
  // Print function name in console
  console.log("gameOver");

  // Hide all screens
  hideAllScreens();
  // Stop all animations

  // *************** Added in version 4 ***************
  stopAllSound();

  // tiden er gået - har jeg point nok? --
  // --> vinder : gå til winGame
  // --> Taber (har ikke point nok): gå loseGame

  // hvis jeg mister alle liv--> loseGame
  if (lives === 0) {
    loseGame();
  } else if (points > 4) {
    winGame();
  } else {
    loseGame();
  }
}

// *************** Added in version 2 ***************
function loseGame() {
  // Print function name in console
  console.log("loseGame");
  // show relevant screen (you lose)
  document.querySelector("#game_over").classList.remove("hide");

  // *************** Added in version 4 ***************
  loseSound.currentTime = 0;
  loseSound.play();
}
// *************** Added in version 2 ***************
function winGame() {
  // Print function name in console
  console.log("winGame");
  // show relevant screen (you lose)
  document.querySelector("#level_complete").classList.remove("hide");

  // *************** Added in version 4 ***************
  winSound.currentTime = 0;
  winSound.play();
}

// **************************************************************
// Utility functions
// **************************************************************
// Make function that generates a random number
function generateRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

// ********** UPDATED in version 2 **********
// Make function that updates UI
function updateUI() {
  document.querySelector("#score").textContent = points;

  // ********** Added in version 2 **********
  // Handle 3 hearts for lives
  if (lives === 3) {
    document.querySelector("#energy1").classList.remove("hide");
    document.querySelector("#energy2").classList.remove("hide");
    document.querySelector("#energy3").classList.remove("hide");
  }
  if (lives === 2) {
    document.querySelector("#energy3").classList.add("hide");
  }
  if (lives === 1) {
    document.querySelector("#energy2").classList.add("hide");
  }
  if (lives === 0) {
    document.querySelector("#energy1").classList.add("hide");
  }
}

// ********** Added in version 2 **********
// Make function that subtract 1 life
function loseLife() {
  lives = lives - 1;
  if (lives === 0) {
    gameOver();
  }
}
// ********** Added in version 2 **********
function addPoint() {
  points = points + 1;
}

// *************** Added in version 2 ***************
// Make function that hide all screens
function hideAllScreens() {
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
}

function stopAllSound() {
  bgSound.pause();
  winSound.pause();
  loseSound.pause();
  carlSound.pause();
  flueSound.pause();
}

function muteplay() {
  console.log("muteplay");
  if (bgSound.paused === true) {
    bgSound.play();
  } else {
    bgSound.pause();
  }
}

function loopSound() {
  console.log("loopSound");
  bgSound.play();
}
