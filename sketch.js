var player,
	PLAYERSIZE = 50,
	ENEMYMINSIZE = 25,
	ENEMYMAXSIZE = 75,
	enemies = [],
	DIR_UP = "UP",
	DIR_DOWN = "DOWN",
	DIR_RIGHT = "RIGHT",
	DIR_LEFT = "LEFT";

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
	for(var i = enemies.length - 1; i >= 0; i--){
		if(enemies[i].offScreen()){
			enemies.splice(i,1);
		}
	}
	background(51);
	if(frameCount % 10 === 0){
		enemies.push(new Enemy());
	}
	enemies.forEach(function(enemy){
		enemy.update();
		enemy.show();
	});
	player.update();
	player.show();
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