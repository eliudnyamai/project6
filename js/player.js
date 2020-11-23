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