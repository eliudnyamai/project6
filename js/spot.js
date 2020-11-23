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