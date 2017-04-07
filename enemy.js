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