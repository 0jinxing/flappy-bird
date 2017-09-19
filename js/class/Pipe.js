function Pipe(x, y, gap, height) {
  this.x = x;
  this.y = y;
  this.gap = gap;
  this.height = height;
  this.width = 52; // Pipe.imgInfo[0][2]
}

// 返回用于碰撞检测的图形数组
Pipe.prototype.colShapes = function () {
  // 包含两个碰撞检测的矩形(上下两个管)
  return [
    new Rect(this.x, this.y, this.width - 2, this.height),
    new Rect(this.x, 0, this.width - 2, this.y - this.gap)
  ];
}
Pipe.prototype.imgInfo = [
  [576, 0, 52, 320],  // 向上
  [628, 0, 52, 320]   // 向下
]