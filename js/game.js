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
      "<br><img class='weapon'  src='./images/" +
      this.playerB.getWeapon() +
      ".png'><br>Weapon Damage: " +
      this.WeaponDamage(this.playerB.getWeapon());
    document.getElementById("weapon1").innerHTML =
      "Weapon: " +
      this.playerA.getWeapon() +
      "<br><img class='weapon' src='./images/" +
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

              document.getElementById("end-screen").style.display = "block";
              document.getElementById("end-message").innerText =
                "Game over-player 1 wins";
              document.getElementById("winner").innerHTML =
                "<img class='player-img' src='./images/player.png'>";
            } else {
              document.getElementById("player1fightbuttons").style.display =
                "none";
              document.getElementById("player2fightbuttons").style.display =
                "block";
              this.playerB.setTurn(1);
              this.playerA.setTurn(0);
              this.displayTurns();
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
              document.getElementById("end-screen").style.display = "block";
              document.getElementById("end-message").innerText =
                "Game over player 1 wins";
              document.getElementById("winner").innerHTML =
                "<img class='player-img' src='./images/player.png'>";
            } else {
              document.getElementById("player1fightbuttons").style.display =
                "none";
              document.getElementById("player2fightbuttons").style.display =
                "block";
              this.playerB.setTurn(1);
              this.playerA.setTurn(0);
              this.displayTurns();
            }
          }
        } else {
          this.playerA.setDefence(1);
          document.getElementById("player1fightbuttons").style.display = "none";
          document.getElementById("player2fightbuttons").style.display =
            "block";
          this.playerB.setTurn(1);
          this.playerA.setTurn(0);
          this.displayTurns();
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
              document.getElementById("end-screen").style.display = "block";
              document.getElementById("end-message").innerText =
                "Game over player 2 wins";
              document.getElementById("winner").innerHTML =
                "<img class='player-img' src='./images/soldier.png'>";
            } else {
              document.getElementById("player1fightbuttons").style.display =
                "block";
              document.getElementById("player2fightbuttons").style.display =
                "none";
              this.playerA.setTurn(1);
              this.playerB.setTurn(0);
              this.displayTurns();
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
              document.getElementById("end-screen").style.display = "block";
              document.getElementById("end-message").innerText =
                "Game over player 2 wins";
              document.getElementById("winner").innerHTML =
                "<img class='player-img' src='./images/soldier.png'>";
            } else {
              document.getElementById("player1fightbuttons").style.display =
                "block";
              document.getElementById("player2fightbuttons").style.display =
                "none";
              this.playerA.setTurn(1);
              this.playerB.setTurn(0);
              this.displayTurns();
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
