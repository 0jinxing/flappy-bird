$(function () {
  $gameBtn = $('#game-btn');
  $gameBtn.click(function () {
    if($(this).children('span').hasClass('glyphicon-repeat')){
      God.initGame();
      God.startTimer();
      $(this).children('span').removeClass('glyphicon-repeat').addClass('glyphicon-pause');
      $(this).blur();
    }
    else if($(this).children('span').hasClass('glyphicon-play')){
      God.startTimer();
      $(this).children('span').removeClass('glyphicon-play').addClass('glyphicon-pause');
      $(this).blur();
    }
    else if($(this).children('span').hasClass('glyphicon-pause')){
      God.stopTimer();
      $(this).children('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
      $(this).blur();
    }
  })
  var $score = $('.score');
  var scoreTimer = setInterval(function () {
    if(God.state != 0){
      $score.text('分数:'+God.bird.score);
    }
    else{
      $score.text('');
    }
  });
  var $prompt = $('.prompt');
  var promptTimer = setInterval(function () {
    if(!God.bird.isLive){
      $prompt.text('Game Over');
      $gameBtn.children('span').removeClass('glyphicon-play')
        .removeClass('glyphicon-pause')
        .addClass('glyphicon-repeat');
      God.stopTimer();
    }
    else {
      $prompt.text('');
    }
  })
})
