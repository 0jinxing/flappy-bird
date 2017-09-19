var Control = {
  isCon: false
}
$(function () {
  // 画布的控制对象
  Control.$game = $('#game');
  $(document).keyup(function (ev) {
    ev = ev || window.event;
    if(ev.keyCode == 32 && God.timer){
      God.bird.fly();
    }
  });
});
