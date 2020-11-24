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

function playerAwins() {
  document.getElementById("player1fightbuttons").style.display =
  "none";
document.getElementById("player2fightbuttons").style.display =
  "none";
document.getElementById("end-screen").style.display = "block";
document.getElementById("end-message").innerText =
  "Game over-player 1 wins";
document.getElementById("winner").innerHTML =
  "<img class='player-img' src='./images/player.png'>";
}
function playerBwins() {
  document.getElementById("player1fightbuttons").style.display =
          "none";
  document.getElementById("player2fightbuttons").style.display =
          "none";
  document.getElementById("end-screen").style.display = "block";
  document.getElementById("end-message").innerText =
          "Game-over player 2 wins";
  document.getElementById("winner").innerHTML =
        "<img class='player-img' src='./images/soldier.png'>";
}
function player2turn() {
  document.getElementById("player1fightbuttons").style.display =
              "none";
  document.getElementById("player2fightbuttons").style.display =
              "block"; 
}
function player1turn() {
  document.getElementById("player1fightbuttons").style.display =
  "block";
  document.getElementById("player2fightbuttons").style.display =
  "none";
}

function yAxisMoves(x,y,increment,player) {
  for (let i = 1; i < 4; i++) {
    //highlight all possible moves below the player
    var positiony = y + i*increment;
    x = x.toString();
    positiony = positiony.toString();
    if (positiony < 10&&positiony>=0) {
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
function xAxisMoves(x,py,increment,player) {
  for (let i = 1; i < 4; i++) {
    //highlight all possible moves right of the player
    var positionx = x + i*increment;
    if (positionx < 10&&positionx>=0) {
      var obs = document
        .getElementById(positionx + py)
        .classList.contains("obstacle");
      var p1 = document
        .getElementById(positionx + py)
        .classList.contains("player1");
      var p2 = document
        .getElementById(positionx + py)
        .classList.contains("player2");
      // A cell is a valid move if it does not contain an obstacle or another player
      if (!obs && !p1 && !p2) {
        //loop through the cells highlighting all the valid cell which are valid moves
        document
          .getElementById(positionx + py)
          .classList.add(player.getName() + "moves");
      } else {
        break; // whenever you encounter an invalid cell stop highlighting at that point
      }
    }
  }
}