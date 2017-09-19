function Bird(x, y, speedX, speedY = 0, minSY = -5, maxSY = 4, flyAY = -5,
  gravityAY = 0.28, isLive = true, score = 0) {
  // x坐标,y坐标,x轴上的速度,y轴上的速度,
  // y轴的最小速度,y轴的最大速度,飞起y的加速度,难度x的加速度,重力加速度,分数
  this.x = x;
  this.y = y;
  this.width =  34; // Bird.imgInfo[0][2]
  this.height = 24; // Bird.imgInfo[0][3]
  this.speedX = speedX;
  this.speedY = speedY;
  // x轴的的速度是在控制范围内的(只有难度对它有影响)
  // minSY的绝对值要小于maxSY的绝对值
  this.minSY = minSY;
  this.maxSY = maxSY;
  this.flyAY = flyAY;
  this.gravityAY = gravityAY;
  this.isLive = isLive;
  this.score = score;
}
// 图片资源信息
Bird.prototype.imgInfo = [
  [576, 488, 34, 24],
  [610, 488, 34, 24],
  [644, 488, 34, 24]
]

// 飞(没有向前)
Bird.prototype.fly = function () {
  this.speedY = this.flyAY;
  this.y += this.speedY;
}

// 坠落(有向前)
Bird.prototype.fall = function () {
  this.speedY += this.gravityAY;
  if (this.speedY > this.maxSY) {
    this.speedY = this.maxSY;
  }
  this.x += this.speedX;
  this.y += this.speedY;
}

// 返回bird旋转的度数(-75到75之间)
Bird.prototype.rotate = function () {
  if (this.speedY > 0) {
    return Math.floor((this.speedY / this.maxSY) * 75);
  } else {
    return -Math.floor((this.speedY / this.minSY) * 75);
  }
}

// 返回用于碰撞检测的图形
Bird.prototype.colShape = function () {
  return new Circle(this.x + this.width / 2, this.y + this.height / 2, (this.width + this.height) / 4 - 2);
}