class Player {
  constructor() {
    this.money = parseInt(localStorage.getItem('money')) || 100; //fetch money from storage or default to 100
    this.bet = 10;
    this.randomNumber; //random number given by computer
    this.numberRoller; //interval that runs the number roll
    this.betPlace = 0; //chosen number by player
    this.rolling = false; //number isn't rolling
  }

  reset() { //reset all stats
    if (confirm('Are you sure?')) {
      localStorage.clear(); //clear all data
      window.location.reload(false); //reload window
    }
  }

  update() { //update display and storage
    document.getElementById('money').innerHTML = this.money;
    document.getElementById('bet').innerHTML = this.bet;
    localStorage.setItem('money', this.money); //save money to local storage
  }

  changeBet(amount) { //change bet amount
    if (!this.rolling) { //if not rolling
      if (this.bet >= 10 && amount > 0 && this.bet < 1000) { //minimum 10 max 1000
        this.bet += amount;
      } else if (this.bet > 10 && amount < 0 && this.bet <= 1000) { //minimum 10 max 1000
        this.bet -= amount;
      }
    }
  }

  roll() { //generate number
    if (!this.rolling) { //if not rolling (prevents bug where it can't be stopped)
      if (this.betPlace === 0) { //if the player hasn't chosen a number yet
        alert('Please choose a number first.');
      } else {
        document.getElementById('start').setAttribute('onClick', 'javascript: player.stopRoll();');
        document.getElementById('start').innerHTML = "Stop";
        this.money -= this.bet;
        this.update();
        this.numberRoller = setInterval(() => { //generates a number every 50 milliseconds
          this.rolling = true; //currently rolling
          this.randomNumber = Math.floor(Math.random() * 7 + 1);
          document.getElementById('numberDisplay').innerHTML = this.randomNumber;
        }, 50);
      }
    }
  }
  stopRoll() { //stops the interval from continuing
    clearInterval(this.numberRoller);
    this.rolling = false; //no longer rolling
    this.checkRoll();
  }

  setBetPlace(place) { //choose where to bet
    if (!this.rolling) { //if not rolling
      if (this.betPlace !== 0) { //if not players first choice
        document.getElementById(this.betPlace).style.backgroundColor = '#4281a4';
      }
      document.getElementById(place).style.backgroundColor = '#4f517d';
      this.betPlace = place; //sets bet place
    }
  }

  checkRoll() { //checks roll
    if (this.betPlace === this.randomNumber) { //if correct guess
      console.log('you win!');
      this.money += this.bet * 6; //bet * 6
    }
    this.update(); //update display
  }
}

var player = new Player(); //initiates Player class under name "player"
player.update(); //update display on page load
