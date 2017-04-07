var player,
	PLAYERSIZE = 50,
	ENEMYMINSIZE = 25,
	ENEMYMAXSIZE = 75,
	enemies = [],
	DIR_UP = "UP",
	DIR_DOWN = "DOWN",
	DIR_RIGHT = "RIGHT",
	DIR_LEFT = "LEFT",
	SPAWNRATE=50,
	SCORERATE = 100;
	COLLIDED = false,
	SCORE = 0;

function Player(x, y, size){
	this.x = x;
	this.y = y;
	this.size = size;
	this.stride = 5;
	this.color = createVector(255, 0, 0); // red
	this.dir = createVector(0, 0); // x and y direction of movement
}

Player.prototype.show = function(){
	push();
	fill(this.color.x, this.color.y, this.color.z);
	rect(this.x, this.y, this.size, this.size);
	pop();
}

Player.prototype.update = function(){
	this.x += this.dir.x * this.stride;
	this.y += this.dir.y * this.stride;
	this.realignEdge();
}

Player.prototype.resetDir = function(dir){
	if(dir === DIR_LEFT || dir === DIR_RIGHT){
		this.dir.x = 0;
	}
	if(dir === DIR_UP || dir === DIR_DOWN){
		this.dir.y = 0;	
	}
}

Player.prototype.moveY = function(dirY){
	dirY = dirToNum(dirY);
	this.dir.y = dirY;
}

Player.prototype.moveX = function(dirX){
	dirX = dirToNum(dirX);
	this.dir.x = dirX;
}

Player.prototype.realignEdge = function(){
	if (this.x < 0){
		this.x = 0;
	}
	if (this.x + this.size > width){
		this.x = width - this.size;
	}
	if (this.y < 0){
		this.y = 0;
	}
	if (this.y + this.size > height){
		this.y = height - this.size;
	}
}

Player.prototype.collide = function(enemy){
	if (
		(enemy.x + enemy.size) < this.x ||
		(enemy.y + enemy.size) < this.y ||
		enemy.x > (this. x + this.size) ||
		enemy.y > (this.y + this.size)
	){ 
		return false;
	}
	return true;
}

function Enemy(){
	this.size = random(ENEMYMINSIZE, ENEMYMAXSIZE);
	this.stride = random(0, 10);
	this.x = random(0 + this.size, width - this.size);
	this.y = 0;
	this.color = createVector(0, 255, 0);
}

Enemy.prototype.update = function(){
	this.y += this.stride;
}

Enemy.prototype.show = function(){
	push();
	fill(this.color.x, this.color.y, this.color.z);
	rect(this.x, this.y, this.size, this.size);
	pop();	
}

Enemy.prototype.offScreen = function(){
	return this.y > height;
}

function setup(){
	createCanvas(1000, 800);
	player = new Player(width/2, height/2, PLAYERSIZE);
	enemy = new Enemy();
}

function draw(){
	background(51);
	enemies.forEach(function(enemy){
		if(player.collide(enemy)){
			COLLIDED = true;
		}
	});
	if(COLLIDED){
		dispMsg("You lose!");
		noLoop();
	}
	for(var i = enemies.length - 1; i >= 0; i--){
		if(enemies[i].offScreen()){
			enemies.splice(i,1);
		}
	}
	if(frameCount % SPAWNRATE === 0){
		enemies.push(new Enemy());
	}
	if(frameCount % SCORERATE === 0){
		SCORE++;
	}
	enemies.forEach(function(enemy){
		enemy.update();
		enemy.show();
	});
	player.update();
	player.show();
	dispScore();
}

function dirToNum(dir){
	if(dir === DIR_DOWN || dir === DIR_RIGHT){
		return 1;
	} 
	if(dir === DIR_UP || dir === DIR_LEFT){
		return -1;
	}
	return 0;
}

function keyReleased(){
	if (keyCode === UP_ARROW){
		player.resetDir(DIR_UP);
	} else if (keyCode === DOWN_ARROW){
		player.resetDir(DIR_DOWN);
	} else if (keyCode === RIGHT_ARROW){
		player.resetDir(DIR_RIGHT);
	} else if (keyCode === LEFT_ARROW){
		player.resetDir(DIR_LEFT);
	}
}

function keyPressed(){
	if (keyCode === UP_ARROW){
		player.moveY(DIR_UP);
	} else if (keyCode === DOWN_ARROW){
		player.moveY(DIR_DOWN);
	} else if (keyCode === RIGHT_ARROW){
		player.moveX(DIR_RIGHT);
	} else if (keyCode === LEFT_ARROW){
		player.moveX(DIR_LEFT);
	}
}

function dispMsg(msg){
	background(51);
	textSize(42);
	textAlign("center");
	fill(255, 0, 0);
	text(msg, width/2, height/2);
}

function dispScore(){
	push();
	textSize(30);
	textAlign("center");
	fill(255);
	text("Score: " + SCORE, 100, 50);
	pop();
}