// ENEMIES //
var Enemy = function(x,y) {
    this.y = y;
    this.x = x;
    this.w = 61;
    this.h = 60;
    this.speed = Math.floor((Math.random() * 200)) + 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -100;
    }
    //Enemy & Player
    //Axis-Aligned Bounding Box(developer.mozilla.org)
    if (this.x < player.x + player.w &&
        this.x + this.w > player.x &&
        this.y < player.y + player.h &&
        this.h + this.y > player.y) {
        player.reset();
    } 
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var enemy1 = new Enemy(-300, 220, this.speed)
var enemy2 = new Enemy(-400, 140, this.speed)
var enemy3 = new Enemy(140, 50, this.speed)
var enemy4 = new Enemy(140, 60, this.speed)
var allEnemies = [enemy1,enemy2, enemy3, enemy4];


//PLAYER//
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.w = 22;
    this.h = 27;
    this.score = 0;
};

Player.prototype.update = function () {
    if (this.y <= 40) {
        this.reset();
        this.score += 50;

    }
    
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player movement
Player.prototype.handleInput = function (keyCode) {
  switch (keyCode) {
  case 'left':
    if (this.x > 0) {
      this.x -= 101;
    }
    break;
  case 'right':
    if (this.x < 400) {
      this.x += 101;
    }
    break;
  case 'up':
    if (this.y > 0) {
      this.y -= 85;
    }
    break;
  case 'down':
    if (this.y < 400) {
      this.y += 85;
    }
    break;
  }

};


Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

var player = new Player();

//COLLECTIBLE KEY
var Key = function(x,y) {
    this.sprite = 'images/Key.png';
    this.x = Math.round((Math.random() * 200));
    this.y = Math.round((Math.random() * 300));
    this.w = 75;
    this.h = 70;
};

Key.prototype.update = function(dt) {
    //Key & Player
    //Axis Aligned Bounding Box
    if (key.x < player.x + player.w &&
        key.x + key.w > player.x &&
        key.y < player.y + player.h &&
        key.h + key.y > player.y) {
        key.reset();
    }
};

Key.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Key.prototype.reset = function(x,y) {
    player.score += 100;
    this.x = Math.round((Math.random() * 200));
    this.y = Math.round((Math.random() * 300));
};

var key = new Key();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});