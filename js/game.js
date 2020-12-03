class Game {
  constructor() {
    this.board = new Board();
    this.obstacle = new Obstacle("obstacle");
    this.mwiko = new Weapon(10,"mwiko");
    this.spoon = new Weapon(10,"spoon");
    this.gun = new Weapon(20,"gun");
    this.ak47 = new Weapon(30, "ak47");
    this.machinegun = new Weapon(50, "machinegun");
    this.playerA = new Player(0, 0, 1, 100, "spoon", "player1", 0);
    this.playerB = new Player(0, 0, 1, 100, "mwiko", "player2", 0);
  }
  placePlayer() {
    position = randomPosition();
    x = position[0];
    y = position[1];
    if (x + 1 >= 0 && x + 1 < 10) {
      var right =
        document
          .getElementById((x + 1).toString() + y.toString())
          .classList.contains("player1") ||
        document
          .getElementById((x + 1).toString() + y.toString())
          .classList.contains("player2");
    } else {
      var right = false;
    }
    if (x - 1 >= 0 && x - 1 < 10) {
      var left =
        document
          .getElementById((x - 1).toString() + y.toString())
          .classList.contains("player1") ||
        document
          .getElementById((x - 1).toString() + y.toString())
          .classList.contains("player2");
    } else {
      var left = false;
    }
    if (y + 1 >= 0 && y + 1 < 10) {
      var top =
        document
          .getElementById(x.toString() + (y + 1).toString())
          .classList.contains("player1") ||
        document
          .getElementById(x.toString() + (y + 1).toString())
          .classList.contains("player2");
    } else {
      var top = false;
    }
    if (y - 1 >= 0 && y - 1 < 10) {
      var bottom =
        document
          .getElementById(x.toString() + (y - 1).toString())
          .classList.contains("player1") ||
        document
          .getElementById(x.toString() + (y - 1).toString())
          .classList.contains("player2");
    } else {
      var bottom = false;
    }
    while (right || left || top || bottom) {
      position = randomPosition();
      x = position[0];
      y = position[1];
      if (x + 1 >= 0 && x + 1 < 10) {
        var right =
          document
            .getElementById((x + 1).toString() + y.toString())
            .classList.contains("player1") ||
          document
            .getElementById((x + 1).toString() + y.toString())
            .classList.contains("player2");
      } else {
        var right = false;
      }
      if (x - 1 >= 0 && x - 1 < 10) {
        var left =
          document
            .getElementById((x - 1).toString() + y.toString())
            .classList.contains("player1") ||
          document
            .getElementById((x - 1).toString() + y.toString())
            .classList.contains("player2");
      } else {
        var left = false;
      }
      if (y + 1 >= 0 && y + 1 < 10) {
        var top =
          document
            .getElementById(x.toString() + (y + 1).toString())
            .classList.contains("player1") ||
          document
            .getElementById(x.toString() + (y + 1).toString())
            .classList.contains("player2");
      } else {
        var top = false;
      }
      if (y - 1 >= 0 && y - 1 < 10) {
        var bottom =
          document
            .getElementById(x.toString() + (y - 1).toString())
            .classList.contains("player1") ||
          document
            .getElementById(x.toString() + (y - 1).toString())
            .classList.contains("player2");
      } else {
        var bottom = false;
      }
    }
    return position;
  }
  initializeGame() {
    this.board.resetBoard();
    for (let index = 0; index < 15; index++) {
      position = randomPosition();
      this.board.placeItem(position[0], position[1], this.obstacle);
    }
    position = randomPosition();
    this.board.placeItem(position[0], position[1], this.gun);
    position = randomPosition();
    this.board.placeItem(position[0], position[1], this.ak47);
    position = randomPosition();
    this.board.placeItem(position[0], position[1], this.machinegun);
    position = this.placePlayer();
    this.board.placeItem(position[0], position[1], this.playerA);
    this.playerA.setX(position[0]);
    this.playerA.setY(position[1]);
    position = this.placePlayer();
    this.board.placeItem(position[0], position[1], this.playerB);
    this.playerB.setX(position[0]);
    this.playerB.setY(position[1]); 
    document.getElementById('names-screen').style.display="block";
  }
  
  disableMovement() {
    //makes all cells unclickable and unhighlights the highlighted
    $(".cell").prop("disabled", true);
    $("." + this.playerA.getName() + "moves").removeClass(
      this.playerA.getName() + "moves"
    );
    $("." + this.playerB.getName() + "moves").removeClass(
      this.playerB.getName() + "moves"
    );
  }
  checkfight() {
    //check if players are adjacent either along the x or y axis
    var playerAX = this.playerA.getX();
    var playerAY = this.playerA.getY();
    var playerBX = this.playerB.getX();
    var playerBY = this.playerB.getY();
    if (playerAX == playerBX && Math.abs(playerBY - playerAY) == 1) {
      //Players are on the same x axix
      if (this.playerA.getTurn() == 1) {
        document.getElementById("player1fightbuttons").style.display = "block";
      } else {
        document.getElementById("player2fightbuttons").style.display = "block";
      }
      this.disableMovement(); // if there is adjacency disable movement
      return true;
    }
    if (playerAY == playerBY && Math.abs(playerBX - playerAX) == 1) {
      ////Players are on the same Y axix
      if (this.playerA.getTurn() == 1) {
        document.getElementById("player1fightbuttons").style.display = "block";
      } else {
        document.getElementById("player2fightbuttons").style.display = "block";
      }
      this.disableMovement(); // if there is adjacency disable movement
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
      document.getElementById("player1turn").innerHTML = "Your Turn";
      document.getElementById("player2turn").innerHTML = "Wait";
      $("." + this.playerA.getName()).prop("disabled", true);
    } else {
      document.getElementById("player2turn").innerHTML = "Your Turn";
      document.getElementById("player1turn").innerHTML = "Wait";
      $("." + this.playerB.getName()).prop("disabled", true); //players cant click themselves so disable the cell they are in
    }
  }
  displayLife() {
    document.getElementById("player2life").innerHTML =
      "Life: " + this.playerB.getLife();
    document.getElementById("player1life").innerHTML =
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
    // shows each players currently owned weapon
    document.getElementById("player2weapon").innerHTML = //for player 2
      "Weapon: " +
      this.playerB.getWeapon() +
      "<br><img class='weapon'  src='./images/" +
      this.playerB.getWeapon() +
      ".png'><br>Weapon Damage: " +
      this.WeaponDamage(this.playerB.getWeapon());
    document.getElementById("player1weapon").innerHTML = //for player 1
      "Weapon: " +
      this.playerA.getWeapon() +
      "<br><img class='weapon' src='./images/" +
      this.playerA.getWeapon() +
      ".png'><br>Weapon Damage: " +
      this.WeaponDamage(this.playerA.getWeapon());
  }
  highlightMoves() {
    //highlighs the current valid moves according to player's turn
    //py means position Y
    var player;
    if (this.playerA.getTurn() == 1) {
      player = this.playerA;
    } else {
      player = this.playerB;
    }
    var x = player.getX();
    var y = player.getY();
    var py = y.toString();
    var i = 1;
    xAxisMoves(x, py, i, player); //right moves
    var i = -1;
    xAxisMoves(x, py, i, player); //left moves
    var increment = 1;
    yAxisMoves(x, y, increment, player); //downward moves
    var increment = -1;
    yAxisMoves(x, y, increment, player); //upward moves
  }
  move(x, y, previousX, previousY, player, nonActivePlayer) {
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
        player.setTurn(0);
        nonActivePlayer.setTurn(1);

        $("." + player.getName() + "moves").removeClass(
          player.getName() + "moves"
        );
        //After a player moves out of a cell enable that cell for clicking
        $("#" + previousX + previousY).prop("disabled", false);
        this.highlightMoves();
        this.displayTurns();
        this.displayWeapon();
        this.displayFightMessage();
      }
    }
  }
  movePlayer(x, y) {
    if (this.playerA.getTurn() == 1) {
      var player = this.playerA;
      var previousX = player.getX();
      var previousY = player.getY();
      var nonActivePlayer = this.playerB;

      this.move(x, y, previousX, previousY, player, nonActivePlayer);
    } else if (this.playerB.getTurn() == 1) {
      var player = this.playerB;
      var previousX = player.getX();
      var previousY = player.getY();
      var nonActivePlayer = this.playerA;
      this.move(x, y, previousX, previousY, player, nonActivePlayer);
    }
  }
  fightAction(player, nonActivePlayer, fightoption) {
    if (fightoption == "attack") {
      //player decided to attack
      if (nonActivePlayer.getDefence() == 1) {
        //the opponent had the defence on
        var damage = this.WeaponDamage(player.getWeapon()) / 2;
        nonActivePlayer.setLife(nonActivePlayer.getLife() - damage);
        this.displayLife();
        player.setDefence(0);
        if (nonActivePlayer.getLife() <= 0) {
          //someone has probably won
          if (player.getName() == "player1") {
            player1wins();
          } else {
            player2wins();
          }
        } else {
          if (player.getName() == "player1") {
            player2turn();
          } else {
            player1turn();
          }
          nonActivePlayer.setTurn(1);
          player.setTurn(0);
          this.displayTurns();
        }
      } else {
        //The opponent had no defence
        var damage = this.WeaponDamage(player.getWeapon());
        nonActivePlayer.setLife(nonActivePlayer.getLife() - damage);
        this.displayLife();
        player.setDefence(0);
        if (nonActivePlayer.getLife() <= 0) {
          if (player.getName() == "player1") {
            player1wins();
          } else {
            player2wins();
          }
        } else {
          if (player.getName() == "player1") {
            player2turn();
          } else {
            player1turn();
          }
          nonActivePlayer.setTurn(1);
          player.setTurn(0);
          this.displayTurns();
        }
      }
    } else {
      //player decided to defend against the next attack
      player.setDefence(1);
      if (player.getName() == "player1") {
        player2turn();
      } else {
        player1turn();
      }
      nonActivePlayer.setTurn(1);
      player.setTurn(0);
      this.displayTurns();
    }
  }
  fight(fightoption) {
    if (this.checkfight()) {
      if (this.playerA.getTurn() == 1) {
        var player = this.playerA;
        var nonActivePlayer = this.playerB;
        this.fightAction(player, nonActivePlayer, fightoption);
      } else {
        player = this.playerB;
        nonActivePlayer = this.playerA;
        this.fightAction(player, nonActivePlayer, fightoption);
      }
    }
  }
}
