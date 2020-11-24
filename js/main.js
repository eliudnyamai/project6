$(document).on("click", "#start", function () {
  document.getElementById("main").style.display = "flex";
  document.getElementById("board").innerHTML = "";
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  game = new Game();
  game.initializeGame();
  game.highlightMoves();
  game.displayTurns();
  game.displayFightMessage();
  game.displayWeapon();
  game.displayLife();
});
$(document).on("click", "#instructions", function () {
  document.getElementById("instructions-modal").style.display = "block";
  document.getElementById("start-screen").style.display = "none";
});
$(document).on("click", "#end", function () {
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("main").style.display = "none";
  document.getElementById("end-game").style.display = "block";
 
});
$(document).on("click", "#close-instructions", function () {
  document.getElementById("instructions-modal").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
});
$(document).on("click", ".cell", function () {
  game.highlightMoves();
  let id = this.id;
  position = id.toString().split("");
  game.movePlayer(position[0], position[1]);
});
$(document).on("click", ".fight-button", function () {
  if (this.classList.contains("fight-button-attack")) {
    var fightoption = "attack";
  } else {
    var fightoption = "defend";
  }
  game.fight(fightoption);
});
