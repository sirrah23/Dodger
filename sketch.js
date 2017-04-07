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