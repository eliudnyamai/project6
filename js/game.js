class Game {
  constructor() {
    this.board = new Board();
    this.obstacle = new Obstacle("obstacle");
    this.mwiko = new Weapon(10, 1, 1, "mwiko");
    this.spoon = new Weapon(10, 1, 1, "spoon");
    this.gun = new Weapon(20, 1, 1, "gun");
    this.ak47 = new Weapon(30, 1, 1, "ak47");
    this.machinegun = new Weapon(40, 1, 1, "machinegun");
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
      document.getElementById("turn1").innerHTML = "Player 1 turn";
      document.getElementById("turn2").innerHTML = "";
      $("."+this.playerA.getName()).prop("disabled", true);
    } else {
      document.getElementById("turn2").innerHTML = "Player 2 turn";
      document.getElementById("turn1").innerHTML = "";
      $("."+this.playerB.getName()).prop("disabled", true);//players cant click themselves so disable the cell they are in
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
    // shows each players currently owned weapon
    document.getElementById("weapon2").innerHTML = //for player 2
      "Weapon: " +
      this.playerB.getWeapon() +
      "<br><img class='weapon'  src='./images/" +
      this.playerB.getWeapon() +
      ".png'><br>Weapon Damage: " +
      this.WeaponDamage(this.playerB.getWeapon());
    document.getElementById("weapon1").innerHTML = //for player 1
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
        $("#"+previousX+previousY).prop("disabled", false);
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
            playerAwins();
          } else {
            playerBwins();
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
            playerAwins();
          } else {
            playerBwins();
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
