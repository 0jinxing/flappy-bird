var God = {
  trial: function () {
    for (var i in God.pipes) {
      if(God.pipes[i].x+God.pipes[i].width == God.bird.x) {
        God.bird.score += 1;
      }
      if(God.bird.y+God.bird.height > God.refer.height-Display.oImgInfo['land'][3]){
        God.bird.isLive = false;
      }
      if(God.bird.y<God.refer.y){
        God.bird.isLive = false;
      }
      for (var j in God.pipes[i].colShapes()) {
        if (God.bird.colShape().collision(God.pipes[i].colShapes()[j])) {
          God.bird.isLive = false;
          return;
        }
      }
    }
  },
  factoryPipe: function () {
    if (God.pipes.length <= 0) {
      God.pipes.push(new Pipe(
        God.refer.x + God.refer.width,
        Math.floor(Math.random() * 228 + 192),
        100,
        320
      ));
    }
    if (God.pipes[0].x + God.pipes[0].width < God.refer.x) {
      God.pipes.shift();
    }
    if (God.pipes[God.pipes.length - 1].x + God.pipes[God.pipes.length - 1].width
      <= God.refer.x + God.refer.width - 240) {
      God.pipes.push(new Pipe(
        God.refer.x + God.refer.width,
        Math.floor(Math.random() * 228 + 192),
        100,
        320
      ));
    }
  },
  startTimer: function () {
    God.state = 2;
    God.timer = setInterval(
      function () {
        God.work();
      }, (1000/60)
    );
  },
  stopTimer: function () {
    God.state = 1;
    clearInterval(God.timer);
    God.timer = null;
    God.state = 2;
  },
  initGame: function () {
    God.bird = new Bird(576/3, 624/2, 4);
    God.refer = {
      x: 0,
      y: 0,
      width: 576,
      height: 624
    };
    God.pipes = [];
    // 0游戏初始化完成
    // 1游戏正在进行
    // 2游戏暂停
    God.state = 0;
  },
  work: function () {
    Display.work();
    God.factoryPipe();
    God.trial();
    God.bird.fall();
    God.refer.x += God.bird.speedX;
  }
};
$(function () {
  God.initGame();

  var tmpRefer = {
    x: 0,
    y: 0,
    width: 576,
    height: 624
  };
  var tmpTimer = setInterval(function () {
    Display.DrawBackground(Display.mapCtxBuff, tmpRefer);
    Display.DrawLand(Display.mapCtxBuff, tmpRefer);
    Display.mapCtx.drawImage(Display.mapCanvasBuff, 0, 0);
    tmpRefer.x++;
    if(God.state!=0){
      clearInterval(tmpTimer);
    }
  },1000/60);
});