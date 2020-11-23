occupied = new Array();
var turn = 1;

function moveAllowed(x, y, previousX, previousY) {
  var distanceX = Math.abs(x - previousX);
  var distanceY = Math.abs(y - previousY);
  if (
    (distanceY == 0 && distanceX <= 3) ||
    (distanceX == 0 && distanceY <= 3)
  ) {
    return true;
  } else {
    return false;
  }
}

function pathClear(x, y, previousX, previousY) {
  var distanceX = Math.abs(x - previousX);
  var distanceY = Math.abs(y - previousY);
  y = y.toString();
  x = x.toString();
  if (distanceY == 0) {
    if (x > previousX) {
      increment = 1;
    } else {
      increment = -1;
    }
    for (let i = distanceX; i > 0; i--) {
      prevX = previousX + increment * i;
      var obs = document
        .getElementById(prevX + y)
        .classList.contains("obstacle");
      var p1 = document.getElementById(prevX + y).classList.contains("player1");
      var p2 = document.getElementById(prevX + y).classList.contains("player2");
      if (obs || p1 || p2) {
        return false;
      }
    }
    return true;
  } else {
    if (y > previousY) {
      increment = 1;
    } else {
      increment = -1;
    }
    for (let i = distanceY; i > 0; i--) {
      prevY = previousY + increment * i;
      i = i.toString();
      var obs = document
        .getElementById(x + prevY)
        .classList.contains("obstacle");
      var p1 = document.getElementById(x + prevY).classList.contains("player1");
      var p2 = document.getElementById(x + prevY).classList.contains("player2");
      if (obs || p1 || p2) {
        return false;
      }
    }
    return true;
  }
}
function pickWeapon(x, y, previousX, previousY, player) {
  var distanceX = Math.abs(x - previousX);
  var distanceY = Math.abs(y - previousY);
  y = y.toString();
  x = x.toString();
  if (distanceY == 0) {
    if (x > previousX) {
      increment = 1;
    } else {
      increment = -1;
    }
    for (let i = distanceX; i > 0; i--) {
      prevX = previousX + increment * i;
      var gun = document.getElementById(prevX + y).classList.contains("gun");
      var ak47 = document.getElementById(prevX + y).classList.contains("ak47");
      var machinegun = document
        .getElementById(prevX + y)
        .classList.contains("machinegun");
      var mwiko = document
        .getElementById(prevX + y)
        .classList.contains("mwiko");
      var spoon = document
        .getElementById(prevX + y)
        .classList.contains("spoon");
      if (mwiko) {
        document.getElementById(prevX + y).classList.add(player.getWeapon());
        player.setWeapon("mwiko");
        document.getElementById(prevX + y).classList.remove("mwiko");
      }
      if (spoon) {
        document.getElementById(prevX + y).classList.add(player.getWeapon());
        player.setWeapon("spoon");
        document.getElementById(prevX + y).classList.remove("spoon");
      }
      if (ak47) {
        document.getElementById(prevX + y).classList.add(player.getWeapon());
        player.setWeapon("ak47");
        document.getElementById(prevX + y).classList.remove("ak47");
      }
      if (gun) {
        document.getElementById(prevX + y).classList.add(player.getWeapon());
        player.setWeapon("gun");
        document.getElementById(prevX + y).classList.remove("gun");
      }
      if (machinegun) {
        document.getElementById(prevX + y).classList.add(player.getWeapon());
        player.setWeapon("machinegun");
        document.getElementById(prevX + y).classList.remove("machinegun");
      }
    }
  } else {
    if (y > previousY) {
      increment = 1;
    } else {
      increment = -1;
    }
    for (let i = distanceY; i > 0; i--) {
      prevY = previousY + increment * i;
      var gun = document.getElementById(x + prevY).classList.contains("gun");
      var ak47 = document.getElementById(x + prevY).classList.contains("ak47");
      var machinegun = document
        .getElementById(x + prevY)
        .classList.contains("machinegun");
      var mwiko = document
        .getElementById(x + prevY)
        .classList.contains("mwiko");
      var spoon = document
        .getElementById(x + prevY)
        .classList.contains("spoon");
      if (mwiko) {
        document.getElementById(x + prevY).classList.add(player.getWeapon());
        player.setWeapon("mwiko");
        document.getElementById(x + prevY).classList.remove("mwiko");
      }
      if (spoon) {
        document.getElementById(x + prevY).classList.add(player.getWeapon());
        player.setWeapon("spoon");
        document.getElementById(x + prevY).classList.remove("spoon");
      }
      if (ak47) {
        document.getElementById(x + prevY).classList.add(player.getWeapon());
        player.setWeapon("ak47");
        document.getElementById(x + prevY).classList.remove("ak47");
      }
      if (gun) {
        document.getElementById(x + prevY).classList.add(player.getWeapon());
        player.setWeapon("gun");
        document.getElementById(x + prevY).classList.remove("gun");
      }
      if (machinegun) {
        document.getElementById(x + prevY).classList.add(player.getWeapon());
        player.setWeapon("machinegun");
        document.getElementById(x + prevY).classList.remove("machinegun");
      }
    }
  }
}
function exists(arr, search) {
  for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(search) == JSON.stringify(arr[i])) {
      return true;
    }
  }
  return false;
}
function randomPosition() {
  x = Math.floor(Math.random() * 10);
  y = Math.floor(Math.random() * 10);
  while (exists(occupied, [x, y])) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  }
  position = new Array(x, y);
  return position;
}
class Spot {
  constructor(x, y, Item) {
    this.x = x;
    this.y = y;
    this.Item = Item;
  }
  getItem() {
    return this.Item;
  }
  setItem(item) {
    this.Item = item;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
}
class Player {
  constructor(x, y, turn, life, weapon, name, defence) {
    this.turn = turn;
    this.life = life;
    this.x = x;
    this.y = y;
    this.weapon = weapon;
    this.name = name;
    this.defence = defence;
  }

  getName() {
    return this.name;
  }
  getDefence() {
    return this.defence;
  }
  setDefence(d) {
    this.defence = d;
  }
  getWeapon() {
    return this.weapon;
  }
  setWeapon(w) {
    this.weapon = w;
  }
  getX() {
    return this.x;
  }
  setX(x) {
    this.x = x;
  }
  getY() {
    return this.y;
  }
  setY(y) {
    this.y = y;
  }
  setTurn(t) {
    this.turn = t;
  }
  getTurn() {
    return this.turn;
  }
  setLife(l) {
    this.life = l;
  }
  getLife() {
    return this.life;
  }
}
class Obstacle {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Weapon {
  constructor(damage, availability, ammunition, name) {
    this.name = name;
    this.damage = damage;
    this.availability = availability;
    this.ammunition = ammunition;
  }
  getName() {
    return this.name;
  }

  getDamage() {
    return this.damage;
  }
}
class Empty {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
class Board {
  constructor(boxes = []) {
    this.boxes = boxes;
  }
  resetBoard() {
    for (var i = 0; i < 10; i++) {
      this.boxes[i] = [];
      for (var j = 0; j < 10; j++) {
        if (typeof this.boxes[i][j] != "object") {
          this.boxes[i][j] = new Spot(i, j, new Empty("cell"));
          document.getElementById("board").innerHTML +=
            " <div id='" + i + j + "' class='cell'></div>";
        }
      }
    }
  }
  placeItem(x, y, Item) {
    this.boxes[x][y] = new Spot(x, y, Item);
    occupied.push([x, y]);
    x = x.toString();
    y = y.toString();
    document.getElementById(x + y).classList.add(Item.getName());
  }
  getBoxes() {
    return this.boxes;
  }
}

class Game {
  constructor() {
    this.board = new Board();
    this.obstacle = new Obstacle("obstacle");
    this.mwiko = new Weapon(20, 1, 1, "mwiko");
    this.spoon = new Weapon(20, 1, 1, "spoon");
    this.gun = new Weapon(30, 1, 1, "gun");
    this.ak47 = new Weapon(40, 1, 1, "ak47");
    this.machinegun = new Weapon(50, 1, 1, "machinegun");
    this.playerA = new Player(0, 0, 1, 100, "spoon", "player1", 0);
    this.playerB = new Player(0, 0, 1, 100, "mwiko", "player2", 0);
  }
  initializeGame() {
    this.board.resetBoard();
    position = randomPosition();
    this.board.placeItem(position[0], position[1], this.gun);
    position = randomPosition();
    this.board.placeItem(position[0], position[1], this.ak47);
    position = randomPosition();
    this.board.placeItem(position[0], position[1], this.machinegun);
    position = randomPosition();
    this.board.placeItem(position[0], position[1], this.playerA);
    this.playerA.setX(position[0]);
    this.playerA.setY(position[1]);
    position = randomPosition();
    this.board.placeItem(position[0], position[1], this.playerB);
    this.playerB.setX(position[0]);
    this.playerB.setY(position[1]);
    for (let index = 0; index < 15; index++) {
      position = randomPosition();
      this.board.placeItem(position[0], position[1], this.obstacle);
    }
  }
  disableMovement() {
    $(".cell").prop("disabled", true);
    $("." + this.playerA.getName() + "moves").removeClass(
      this.playerA.getName() + "moves"
    );
    $("." + this.playerB.getName() + "moves").removeClass(
      this.playerB.getName() + "moves"
    );
  }
  checkfight() {
    var playerAX = this.playerA.getX();
    var playerAY = this.playerA.getY();
    var playerBX = this.playerB.getX();
    var playerBY = this.playerB.getY();
    if (playerAX == playerBX && Math.abs(playerBY - playerAY) == 1) {
      if (this.playerA.getTurn() == 1) {
        document.getElementById("player1fightbuttons").style.display = "block";
      } else {
        document.getElementById("player2fightbuttons").style.display = "block";
      }
      this.disableMovement();
      return true;
    }
    if (playerAY == playerBY && Math.abs(playerBX - playerAX) == 1) {
      if (this.playerA.getTurn() == 1) {
        document.getElementById("player1fightbuttons").style.display = "block";
      } else {
        document.getElementById("player2fightbuttons").style.display = "block";
      }
      this.disableMovement();
      return true;
    }
    return false;
  }
  displayFightMessage() {
    if (this.checkfight()) {
      document.getElementById("fight-message").style.display = "block";
      setTimeout(function () {
        document.getElementById("fight-message").style.display = "none";
        if (this.player != undefined) {
          if (this.playerA.getTurn() == 1) {
            document.getElementById("player1fightbuttons").style.display =
              "block";
          } else {
            document.getElementById("player2fightbuttons").style.display =
              "block";
          }
        }
      }, 1000);
    }
  }
  displayTurns() {
    if (this.playerA.getTurn() == 1) {
      document.getElementById("turn1").innerHTML = "Player 1 turn";
      document.getElementById("turn2").innerHTML = "";
    } else {
      document.getElementById("turn2").innerHTML = "Player 2 turn";
      document.getElementById("turn1").innerHTML = "";
    }
  }
  displayLife() {
    document.getElementById("life2").innerHTML =
      "Life: " + this.playerB.getLife();
    document.getElementById("life1").innerHTML =
      "Life: " + this.playerA.getLife();
  }
  WeaponDamage(name) {
    if (name == "gun") {
      return this.gun.getDamage();
    }
    if (name == "mwiko") {
      return this.mwiko.getDamage();
    }
    if (name == "spoon") {
      return this.spoon.getDamage();
    }
    if (name == "machinegun") {
      return this.machinegun.getDamage();
    }
    if (name == "ak47") {
      return this.ak47.getDamage();
    }
  }
  displayWeapon() {
    document.getElementById("weapon2").innerHTML =
      "Weapon: " +
      this.playerB.getWeapon() +
      "<br><img class='weapon'  src='../images/" +
      this.playerB.getWeapon() +
      ".png'><br>Weapon Damage: " +
      this.WeaponDamage(this.playerB.getWeapon());
    document.getElementById("weapon1").innerHTML =
      "Weapon: " +
      this.playerA.getWeapon() +
      "<br><img class='weapon' src='../images/" +
      this.playerA.getWeapon() +
      ".png'><br>Weapon Damage: " +
      this.WeaponDamage(this.playerA.getWeapon());
  }

  highlightMoves() {
    var player;
    if (this.playerA.getTurn() == 1) {
      player = this.playerA;
    } else {
      player = this.playerB;
    }
    var x = player.getX();
    var y = player.getY();
    var py = y.toString();
    for (let i = 1; i < 4; i++) {
      var positionx = x + i;
      if (positionx < 10) {
        var obs = document
          .getElementById(positionx + py)
          .classList.contains("obstacle");
        var p1 = document
          .getElementById(positionx + py)
          .classList.contains("player1");
        var p2 = document
          .getElementById(positionx + py)
          .classList.contains("player2");

        if (!obs && !p1 && !p2) {
          document
            .getElementById(positionx + py)
            .classList.add(player.getName() + "moves");
        } else {
          break;
        }
      }
    }
    for (let i = 1; i < 4; i++) {
      var positionx = x - i;
      if (positionx >= 0) {
        var obs = document
          .getElementById(positionx + py)
          .classList.contains("obstacle");
        var p1 = document
          .getElementById(positionx + py)
          .classList.contains("player1");
        var p2 = document
          .getElementById(positionx + py)
          .classList.contains("player2");
        if (!obs && !p1 && !p2) {
          document
            .getElementById(positionx + py)
            .classList.add(player.getName() + "moves");
        } else {
          break;
        }
      }
    }
    for (let i = 1; i < 4; i++) {
      var positiony = y - i;
      x = x.toString();
      positiony = positiony.toString();
      if (positiony >= 0) {
        var obs = document
          .getElementById(x + positiony)
          .classList.contains("obstacle");
        var p1 = document
          .getElementById(x + positiony)
          .classList.contains("player1");
        var p2 = document
          .getElementById(x + positiony)
          .classList.contains("player2");
        if (!obs && !p1 && !p2) {
          document
            .getElementById(x + positiony)
            .classList.add(player.getName() + "moves");
        } else {
          break;
        }
      }
    }
    for (let i = 1; i < 4; i++) {
      var positiony = y + i;
      x = x.toString();
      positiony = positiony.toString();
      if (positiony < 10) {
        var obs = document
          .getElementById(x + positiony)
          .classList.contains("obstacle");
        var p1 = document
          .getElementById(x + positiony)
          .classList.contains("player1");
        var p2 = document
          .getElementById(x + positiony)
          .classList.contains("player2");
        if (!obs && !p1 && !p2) {
          document
            .getElementById(x + positiony)
            .classList.add(player.getName() + "moves");
        } else {
          break;
        }
      }
    }
  }
  movePlayer(x, y) {
    if (this.playerA.getTurn() == 1) {
      var player = this.playerA;
      var previousX = player.getX();
      var previousY = player.getY();
      if (pathClear(x, y, previousX, previousY)) {
        if (moveAllowed(x, y, previousX, previousY) && !this.checkfight()) {
          pickWeapon(x, y, previousX, previousY, player);
          previousY = previousY.toString();
          previousX = previousX.toString();
          document
            .getElementById(previousX + previousY)
            .classList.remove(player.getName());
          this.board.placeItem(parseInt(x, 10), parseInt(y, 10), player);
          player.setX(parseInt(x, 10));
          player.setY(parseInt(y, 10));
          this.playerA.setTurn(0);
          this.playerB.setTurn(1);
          $("." + this.playerA.getName() + "moves").removeClass(
            this.playerA.getName() + "moves"
          );
          this.highlightMoves();
          this.displayTurns();
          this.displayWeapon();
          this.displayFightMessage();
        }
      }
    } else if (this.playerB.getTurn() == 1) {
      var player = this.playerB;
      var previousX = player.getX();
      var previousY = player.getY();
      if (pathClear(x, y, previousX, previousY)) {
        if (moveAllowed(x, y, previousX, previousY) && !this.checkfight()) {
          pickWeapon(x, y, previousX, previousY, player);
          previousY = previousY.toString();
          previousX = previousX.toString();
          document
            .getElementById(previousX + previousY)
            .classList.remove("nonActiveplayer");
          document
            .getElementById(previousX + previousY)
            .classList.remove(player.getName());
          this.board.placeItem(parseInt(x, 10), parseInt(y, 10), player);
          player.setX(parseInt(x, 10));
          player.setY(parseInt(y, 10));
          this.playerA.setTurn(1);
          this.playerB.setTurn(0);
          $("." + this.playerB.getName() + "moves").removeClass(
            this.playerB.getName() + "moves"
          );
          this.highlightMoves();
          this.displayTurns();
          this.displayWeapon();
          this.displayFightMessage();
        }
      }
    }
  }
  fight(fightoption) {
    if (this.checkfight()) {
      var player;
      if (this.playerA.getTurn() == 1) {
        player = this.playerA;
        if (fightoption == "attack") {
          if (this.playerB.getDefence() == 1) {
            var damage = this.WeaponDamage(this.playerA.getWeapon()) / 2;
            this.playerB.setLife(this.playerB.getLife() - damage);
            this.displayLife();
            this.playerA.setDefence(0);
            if (this.playerB.getLife() <= 0) {
              document.getElementById("player1fightbuttons").style.display =
                "none";
              document.getElementById("player2fightbuttons").style.display =
                "none";
           
              document.getElementById('end-screen').style.display="block"
              document.getElementById('end-message').innerText="Game over player 1 wins"
            } else {
              document.getElementById("player1fightbuttons").style.display =
                "none";
              document.getElementById("player2fightbuttons").style.display =
                "block";
              this.playerB.setTurn(1);
              this.playerA.setTurn(0);
            }
          } else {
            var damage = this.WeaponDamage(this.playerA.getWeapon());
            this.playerB.setLife(this.playerB.getLife() - damage);
            this.displayLife();
            this.playerA.setDefence(0);
            if (this.playerB.getLife() <= 0) {
              document.getElementById("player1fightbuttons").style.display =
                "none";
              document.getElementById("player2fightbuttons").style.display =
                "none";
              document.getElementById('end-screen').style.display="block"
              document.getElementById('end-message').innerText="Game over player 1 wins"
            } else {
              document.getElementById("player1fightbuttons").style.display =
                "none";
              document.getElementById("player2fightbuttons").style.display =
                "block";
              this.playerB.setTurn(1);
              this.playerA.setTurn(0);
            }
          }
        } else {
          this.playerA.setDefence(1);
          document.getElementById("player1fightbuttons").style.display = "none";
          document.getElementById("player2fightbuttons").style.display =
            "block";
          this.playerB.setTurn(1);
          this.playerA.setTurn(0);
        }
      } else {
        if (fightoption == "attack") {
          if (this.playerA.getDefence() == 1) {
            var damage = this.WeaponDamage(this.playerB.getWeapon()) / 2;
            this.playerA.setLife(this.playerA.getLife() - damage);
            this.displayLife();
            this.playerB.setDefence(0);
            if (this.playerA.getLife() <= 0) {
              document.getElementById("player1fightbuttons").style.display =
                "none";
              document.getElementById("player2fightbuttons").style.display =
                "none";
              document.getElementById('end-screen').style.display="block"
              document.getElementById('end-message').innerText="Game over player 2 wins"
            } else {
              document.getElementById("player1fightbuttons").style.display =
                "block";
              document.getElementById("player2fightbuttons").style.display =
                "none";
              this.playerA.setTurn(1);
              this.playerB.setTurn(0);
            }
          } else {
            var damage = this.WeaponDamage(this.playerB.getWeapon());
            this.playerA.setLife(this.playerA.getLife() - damage);
            this.displayLife();
            this.playerB.setDefence(0);
            if (this.playerA.getLife() <= 0) {
              document.getElementById("player1fightbuttons").style.display =
                "none";
              document.getElementById("player2fightbuttons").style.display =
                "none";
              document.getElementById('end-screen').style.display="block"
              document.getElementById('end-message').innerText="Game over player 2 wins"
            } else {
              document.getElementById("player1fightbuttons").style.display =
                "block";
              document.getElementById("player2fightbuttons").style.display =
                "none";
              this.playerA.setTurn(1);
              this.playerB.setTurn(0);
            }
          }
        } else {
          this.playerB.setDefence(1);
          document.getElementById("player1fightbuttons").style.display =
            "block";
          document.getElementById("player2fightbuttons").style.display = "none";
          this.playerA.setTurn(1);
          this.playerB.setTurn(0);
        }
      }
    }
  }
}

$(document).on("click", "#start", function () {
document.getElementById('main').style.display="flex";
document.getElementById('board').innerHTML="";
document.getElementById('start-screen').style.display="none";
document.getElementById('end-screen').style.display="none";
game = new Game();
game.initializeGame();
game.highlightMoves();
game.displayTurns();
game.displayFightMessage();
game.displayWeapon();
game.displayLife();
});
$(document).on("click", "#instructions", function () {
  document.getElementById('instructions-modal').style.display="block";
  document.getElementById('start-screen').style.display="none";
});
$(document).on("click", "#end", function () {
  document.getElementById('end-screen').style.display="none";
  document.getElementById('main').style.display="none";
  document.getElementById('end-game').style.display="block";
});
$(document).on("click", "#close-instructions", function () {
  document.getElementById('instructions-modal').style.display="none";
  document.getElementById('start-screen').style.display="block";
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
