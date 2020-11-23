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
