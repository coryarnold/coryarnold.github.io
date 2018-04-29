class Player {
  constructor() {
    this.money = parseInt(localStorage.getItem('money')) || 100;
    this.chosenNumber = 0;
    this.randomNumber;
    this.numberRoller;
  }

  roll() {
      this.numberRoller = setInterval(() => {
        this.randomNumber = Math.floor(Math.random() * 7 + 1);
        document.getElementById('numberDisplay').innerHTML = this.randomNumber;
      }, 50);
}
  stopRoll() {
    clearInterval(this.numberRoller);
  }
}

var player = new Player();
