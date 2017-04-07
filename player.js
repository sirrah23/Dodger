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

function dirToNum(dir){
	if(dir === DIR_DOWN || dir === DIR_RIGHT){
		return 1;
	} 
	if(dir === DIR_UP || dir === DIR_LEFT){
		return -1;
	}
	return 0;
}