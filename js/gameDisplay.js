var Display = {
  // 画布,绘画对象,参考点(画布0,0点的游戏坐标)
  DrawBird: function (ctx, bird, refer) {
    // 像素鸟的中心位置,方便旋转
    var centerX = bird.x - refer.x + bird.width / 2;
    var centerY = bird.y - refer.y + bird.height / 2;
    var birdImginx = Math.floor(Display.birdN) % 3;
    // 重新设置原点
    ctx.translate(centerX, centerY);
    // 旋转
    ctx.rotate(bird.rotate() * Math.PI / 180);
    // 绘图
    ctx.drawImage(Display.img,
      bird.imgInfo[birdImginx][0],
      bird.imgInfo[birdImginx][1],
      bird.imgInfo[birdImginx][2],
      bird.imgInfo[birdImginx][3],
      (-bird.width / 2),
      (-bird.height / 2),
      bird.imgInfo[birdImginx][2],
      bird.imgInfo[birdImginx][3],
    )
    // 飞行图片切换
    Display.birdN += 0.3;
    // 恢复旋转和画布原点
    ctx.rotate(-bird.rotate() * Math.PI / 180);
    ctx.translate(-centerX, -centerY);
    // 测试
    // ctx.strokeStyle = '#ff0000';
    // ctx.beginPath();
    // ctx.arc(bird.colShape.x - refer.x, bird.colShape.y - refer.y, bird.colShape.radius, 0, 2 * Math.PI);
    // ctx.stroke();
  },

  DrawPipe: function (ctx, pipe, refer) {
    // 绘制开口向上,既靠近地面的Pipe
    ctx.drawImage(Display.img,
      pipe.imgInfo[0][0],
      pipe.imgInfo[0][1],
      pipe.imgInfo[0][2],
      pipe.imgInfo[0][3],
      pipe.x - refer.x,
      pipe.y - refer.y,
      pipe.imgInfo[0][2],
      pipe.imgInfo[0][3]
    );
    // 绘制开口向下,既靠近天空的Pipe
    ctx.drawImage(Display.img,
      pipe.imgInfo[1][0],
      pipe.imgInfo[1][1],
      pipe.imgInfo[1][2],
      pipe.imgInfo[1][3],
      pipe.x - refer.x,
      pipe.y - pipe.gap - pipe.imgInfo[1][3],
      pipe.imgInfo[1][2],
      pipe.imgInfo[1][3]
    );

    // window.test = pipe.colShapes;
    // ctx.strokeStyle = '#ff0000';
    // ctx.beginPath();
    // ctx.rect(test[0].x - refer.x, test[0].y - refer.y, test[0].width, test[0].height);
    // ctx.rect(test[1].x - refer.x, test[1].y - refer.y, test[1].width, test[1].height);
    // ctx.stroke();
  },

  DrawLand: function (ctx, refer) {
    ctx.drawImage(Display.img,
      refer.x % Display.oImgInfo['land'][2],
      Display.oImgInfo['land'][1],
      Display.oImgInfo['land'][2] - refer.x % Display.oImgInfo['land'][2],
      Display.oImgInfo['land'][3],
      0,
      refer.height - Display.oImgInfo['land'][3],
      Display.oImgInfo['land'][2] - refer.x % Display.oImgInfo['land'][2],
      Display.oImgInfo['land'][3]
    );
    ctx.drawImage(Display.img,
      Display.oImgInfo['land'][0],
      Display.oImgInfo['land'][1],
      refer.x % Display.oImgInfo['land'][2],
      Display.oImgInfo['land'][3],
      Display.oImgInfo['land'][2] - refer.x % Display.oImgInfo['land'][2],
      refer.height - Display.oImgInfo['land'][3],
      refer.x % Display.oImgInfo['land'][2],
      Display.oImgInfo['land'][3]
    );
  },

  DrawBackground: function (ctx, refer) {
    ctx.drawImage(Display.img,
      Math.floor(refer.x / 4) % Display.oImgInfo['bg'][2],
      Display.oImgInfo['bg'][1],
      Display.oImgInfo['bg'][2] - (refer.x / 4) % Display.oImgInfo['bg'][2],
      Display.oImgInfo['bg'][3],
      0,
      0,
      Display.oImgInfo['bg'][2] - (refer.x / 4) % Display.oImgInfo['bg'][2],
      Display.oImgInfo['bg'][3]
    );
    ctx.drawImage(Display.img,
      Display.oImgInfo['bg'][0],
      Display.oImgInfo['bg'][1],
      (refer.x / 4) % Display.oImgInfo['bg'][2],
      Display.oImgInfo['bg'][3],
      Display.oImgInfo['bg'][2] - (refer.x / 4) % Display.oImgInfo['bg'][2],
      0,
      (refer.x / 4) % Display.oImgInfo['bg'][2],
      Display.oImgInfo['bg'][3]
    );
  },
  birdN: 0,
  img: new Image(),
  // 图片素材的剪切信息(x,y,width,height)
  oImgInfo: {
    bg: [0, 0, 576, 512],
    land: [0, 512, 672, 112]
  },
  work: function () {
    Display.DrawBackground(Display.mapCtxBuff, God.refer);
    for (var i in God.pipes) {
      Display.DrawPipe(Display.mapCtxBuff, God.pipes[i], God.refer);
    }
    Display.DrawLand(Display.mapCtxBuff, God.refer);
    Display.mapCtx.drawImage(Display.mapCanvasBuff, 0, 0);
    Display.birdCtx.clearRect(0, 0, God.refer.width, God.refer.height);
    Display.DrawBird(Display.birdCtx, God.bird, God.refer);
  }
};
Display.img.src = 'src/flappybird.png';

$(function () {
  // 显示给用户
  Display.mapCtx = Control.$game.children('#map-canvas').get(0).getContext('2d'); //地图
  Display.birdCtx = Control.$game.children('#bird-canvas').get(0).getContext('2d'); //鸟
  // 双缓存
  Display.mapCanvasBuff = document.createElement('canvas');
  Display.mapCanvasBuff.width = Control.$game.children('#map-canvas').get(0).width;
  Display.mapCanvasBuff.height = Control.$game.children('#map-canvas').get(0).height;
  Display.mapCtxBuff = Display.mapCanvasBuff.getContext('2d');
});