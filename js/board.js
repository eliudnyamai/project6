occupied = new Array();
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
