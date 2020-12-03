class Weapon {
  constructor(damage, name) {
    this.name = name;
    this.damage = damage;
  }
  getName() {
    return this.name;
  }

  getDamage() {
    return this.damage;
  }
}
