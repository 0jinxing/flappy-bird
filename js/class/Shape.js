// 矩形类 左上角的坐标(x, y)和矩形的宽和高
function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

// 碰撞检测(发生相交碰撞返回true,否则false)
Rect.prototype.collision = function (oShape) {
  // 矩形和矩形间
  if (oShape instanceof Rect) {
    // 矩形和矩形之间的碰撞检测
    // 是否存在相交矩形
    var colLX = Math.max(this.x, oShape.x);
    var colLY = Math.max(this.y, oShape.y);
    var colRX = Math.min(this.x + this.width, oShape.x + oShape.width);
    var colRY = Math.min(this.y + this.height, oShape.y + oShape.height);
    if (colRX < colLX || colRY < colLY) {
      return false;
    }
    return true;
  } else if (oShape instanceof Circle) {
    // 矩形和圆形之间
    // 1:先判断圆心是否在矩形中　　　
    if (oShape.x >= this.x && oShape.x < this.x + this.width &&
      oShape.y >= this.y && oShape.y < this.y + this.height) {
      return true;
    }
    // 2:判断矩形四个点是否在圆中，如果矩形四个点不在圆中，可以排除圆心在矩形四个角区域外可能性　　
    var lu = [this.x, this.y];
    var ld = [this.x, this.y + this.height];
    var ru = [this.x + this.width, this.y];
    var rd = [this.x + this.width, this.y + this.height];
    // 左上角的点,左下角的点...
    var points = [lu, ld, ru, rd];
    for (var p in points) {
      var len = Math.sqrt(Math.pow(points[p].x - oShape.x, 2) + Math.pow(points[p].y - oShape.y, 2));
      if (len <= oShape.radius) {
        return true;
      }
    }
    // 3:判断圆是否和矩形的四个边相交
    // 用圆心到矩形四条边的距离是否小于圆半径
    // 这里的矩形的边都是垂直与x轴或y轴的
    var lens = [oShape.x - this.x, oShape.x - (this.x + this.width),
      oShape.y - this.y, oShape.y - (this.y + this.height)
    ];
    if ((Math.abs(lens[0]) <= oShape.radius || Math.abs(lens[1]) <= oShape.radius) &&
      oShape.y > this.y && oShape.y <= this.y + this.height) {
      return true;
    }
    if ((Math.abs(lens[2]) <= oShape.radius || Math.abs(lens[3]) <= oShape.radius) &&
      oShape.x > this.x && oShape.x <= this.x + this.width) {
      return true;
    }
    // 不满足以上3个条件,不相交
    return false;
  }
}
// 圆形类，圆形的圆心坐标(x, y)和圆的半径
function Circle(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
}

Circle.prototype.collision = function (oShape) {
  // 圆形和圆形之间,判断圆心到圆心的距离是否小于半径之和
  if (oShape instanceof Circle) {
    var len = Math.sqrt(Math.pow(this.x - oShape.x, 2) +
      Math.pow(this.y - oShape.y, 2));
    if (len <= this.radius + oShape.radius) {
      return true;
    }
    return false;
  } else if (oShape instanceof Rect) {
    // 依赖于矩形的碰撞检测
    return oShape.collision(this);
  }
}