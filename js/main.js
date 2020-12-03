$(document).on("click", "#start", function () {
  document.getElementById("main").style.display = "flex";
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("board").innerHTML = "";
  game = new Game();
  game.initializeGame();
  game.highlightMoves();
  game.displayTurns();
  game.displayWeapon();
  game.displayLife();
});
$(document).on("click", "#instructions", function () {
  document.getElementById("instructions-modal").style.display = "block";
  document.getElementById("start-screen").style.display = "none";
});
$(document).on("click", "#dismiss-form", function () {
  document.getElementById("names-screen").style.display = "none";
});
$(document).on("click", "#change-name", function () {
  var player1name = document.getElementById("player1name").value;
  var player2name = document.getElementById("player2name").value;
  if (player1name != "" && player2name != "") {
    changePlayerNames(player1name, player2name);
  }
});
$(document).on("click", "#restart", function () {
  location.reload();
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
