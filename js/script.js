occupied= new Array();
class Spot {
  constructor(x, y, Item) {
    this.x = x;
    this.y = y;
    this.Item = Item;
  }
  getItem() {
    return this.Item;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
}
class Obstacle {
  constructor(imgPath) {
    this.imgPath = imgPath;
  }
  path() {
    return this.imgPath;
  }
}
class Weapon {
  constructor(damage,availability, ammunition, imgPath){
    this.damage=damage;
    this.availability=availability;
    this.ammunition=ammunition;
    this.imgPath=imgPath;
  }
  path() {
    return this.imgPath;
  }
  getDamage(){
    return this.damage;
  }
  setAvailability(a){
    this.availability=a;
  }
  getAvailability(){
    return this.availability;
  }
  getAmmunition(){
     return this.ammunition;
  }
  setAmmunition(a){
    this.ammunition=a;
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
          this.boxes[i][j] = new Spot(i, j, null);
          document.getElementById("board").innerHTML +=
            " <div class='cell'></div>";
        }
      }
    }
  }
  placeItem(x,y,Item){
    this.boxes[x] = [];
    this.boxes[x][y] = new Spot(x, y, Item);
     occupied.push([x,y]);
    var left = this.boxes[x][y].getY()+414 +(this.boxes[x][y].getY()*54);
    var top = this.boxes[x][y].getX() + 15 + (this.boxes[x][y].getX()*52);
    var path = this.boxes[x][y].getItem().path();
    document.getElementById("board").innerHTML +=
      " <div ><img  style='position:absolute; left:" +
      left +
      "px; top:" +
      top +
      "px' class='items' src='" +
      path +
      "'/></div>";
      return occupied;
  }
}
function exists(arr, search) {
  for (let i = 0; i < arr.length; i++) {
    if(JSON.stringify(search)==JSON.stringify(arr[i])){
      return true;
    } 
  }
  return false;
}
function randomPosition() {
  x=Math.floor(Math.random() * 10); 
  y=Math.floor(Math.random() * 10); 
  while(exists(occupied,[x,y])){
        x=Math.floor(Math.random() * 10); 
        y=Math.floor(Math.random() * 10); 
      }
      position=new Array(x,y); 
      return position;
}

board = new Board();
obstacle = new Obstacle("images/obstacle.png"); 
gun=new Weapon(1,1,1,"images/gun.png");
board.resetBoard();
position= randomPosition();
board.placeItem(position[0],position[1],gun);
position= randomPosition();
ak47=new Weapon(1,1,1,"images/ak47.png");
board.placeItem(position[0],position[1],ak47);
machinegun=new Weapon(1,1,1,"images/machinegun.png");
position= randomPosition();
board.placeItem(position[0],position[1],machinegun);

for (let index = 0; index <20; index++) {
  position= randomPosition();
  board.placeItem(position[0],position[1],obstacle);
}
console.table(occupied);
console.log(occupied[0]);

console.log(exists(occupied,[3,4]));
