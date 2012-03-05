(function() {
  var HEIGHT, WIDTH;
  WIDTH = HEIGHT = 600;
  window.onload = function() {
    var ctx, game, sky, view;
    ctx = document.getElementById('canvas').getContext('2d');
    view = new SkyView(ctx, WIDTH, HEIGHT);
    sky = new Sky();
    game = new Game(sky, view);
    return game.start();
  };
}).call(this);
