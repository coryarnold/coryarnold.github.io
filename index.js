class Player {
  constructor() {
    this.money = parseInt(localStorage.getItem('money')) || 100;
    this.bet = 10;
    this.chosenNumber = 0;
    this.randomNumber;
    this.numberRoller;
    this.betPlace = 0;
    this.rolling = false;
  }

  reset() {
    if (confirm('Are you sure?')) {
      localStorage.clear();
      window.location.reload(false);
    }
  }

  update() {
    document.getElementById('money').innerHTML = this.money;
    document.getElementById('bet').innerHTML = this.bet;
    localStorage.setItem('money', this.money);
  }

  changeBet(amount) {
    if (!this.rolling) {
      if (this.bet >= 10 && amount > 0 && this.bet < 1000) {
        this.bet += amount;
      } else if (this.bet > 10 && amount < 0 && this.bet <= 1000) {
        this.bet -= amount;
      }
    }
  }

  roll() {
    if (!this.rolling) {
      if (this.betPlace === 0) {
        alert('Please choose a number first.');
      } else {
        this.numberRoller = setInterval(() => {
          this.rolling = true;
          this.randomNumber = Math.floor(Math.random() * 7 + 1);
          document.getElementById('numberDisplay').innerHTML = this.randomNumber;
        }, 50);
      }
    }
  }
  stopRoll() {
    clearInterval(this.numberRoller);
    this.rolling = false;
    this.checkRoll();
  }

  setBetPlace(place) {
    if (!this.rolling) {
      if (this.betPlace !== 0) {
        document.getElementById(this.betPlace).style.backgroundColor = '#4281a4';
      }
      document.getElementById(place).style.backgroundColor = '#4f517d';
      this.betPlace = place;
    }
  }

  checkRoll() {
    if (this.betPlace === this.randomNumber) {
      console.log('you win!');
      this.money += this.bet * 6;
    } else {
      this.money -= this.bet;
      console.log('you lose.');
    }
    this.update();
  }
}

var player = new Player();
player.update();
