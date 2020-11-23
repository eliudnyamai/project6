class Weapon {
  constructor(damage, availability, ammunition, name) {
    this.name = name;
    this.damage = damage;
    this.availability = availability;
    this.ammunition = ammunition;
  }
  getName() {
    return this.name;
  }

  getDamage() {
    return this.damage;
  }
}
