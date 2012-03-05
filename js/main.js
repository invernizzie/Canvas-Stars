(function() {
  var Game, Sky, SkyView, Star;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Star = (function() {
    function Star(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.x = this.x || Math.random();
      this.y = this.y || Math.random();
      this.z = this.z || Math.random();
    }
    Star.prototype.advance = function(dt) {
      this.y += dt * this.speed();
      if (this.y > 1) {
        this.y = 0;
        this.x = Math.random();
        return this.z = Math.random();
      }
    };
    Star.prototype.speed = function() {
      return (0.25 + 3 * this.z * this.z / 4) / 2500;
    };
    return Star;
  })();
  Sky = (function() {
    var i;
    function Sky() {}
    Sky.prototype.stars = (function() {
      var _results;
      _results = [];
      for (i = 1; i <= 500; i++) {
        _results.push(new Star());
      }
      return _results;
    })();
    Sky.prototype.update = function(dt) {
      var star, _i, _len, _ref, _results;
      _ref = this.stars;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        star = _ref[_i];
        _results.push(star.advance(dt));
      }
      return _results;
    };
    return Sky;
  })();
  SkyView = (function() {
    function SkyView(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
    }
    SkyView.prototype.update = function(sky) {
      this.drawBg();
      return this.drawStars(sky);
    };
    SkyView.prototype.drawBg = function() {
      this.ctx.fillStyle = "black";
      return this.ctx.fillRect(0, 0, this.width, this.height);
    };
    SkyView.prototype.drawStars = function(sky) {
      var star, _i, _len, _ref, _results;
      _ref = sky.stars;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        star = _ref[_i];
        _results.push(this.drawStar(star));
      }
      return _results;
    };
    SkyView.prototype.drawStar = function(star) {
      this.ctx.fillStyle = this.starColor(star);
      this.ctx.beginPath();
      this.ctx.arc(star.x * this.width, star.y * this.height, 1.2, 0, 2 * Math.PI);
      return this.ctx.fill();
    };
    SkyView.prototype.starColor = function(star) {
      var light, z;
      z = star.z;
      light = Math.floor(16 + z * z * z * 240).toString(16);
      return "#" + light + light + light;
    };
    return SkyView;
  })();
  Game = (function() {
    function Game(model, view) {
      this.model = model;
      this.view = view;
      this.loop = __bind(this.loop, this);
    }
    Game.prototype.framerate = 30;
    Game.prototype.start = function() {
      var _base;
      this.stopped = false;
      this.lastModelUpdate = new Date().getTime();
      if (typeof (_base = this.model).init === "function") {
        _base.init();
      }
      return this.loop();
    };
    Game.prototype.end = function() {
      return this.stopped = true;
    };
    Game.prototype.update = function() {
      var now;
      now = new Date().getTime();
      this.model.update(now - this.lastModelUpdate);
      return this.lastModelUpdate = new Date().getTime();
    };
    Game.prototype.draw = function() {
      return this.view.update(this.model);
    };
    Game.prototype.loop = function() {
      var elapsed, start;
      if (this.stopped) {
        return;
      }
      start = new Date().getTime();
      this.update();
      this.draw();
      elapsed = new Date().getTime() - start;
      return setTimeout(this.loop, 1000 / this.framerate - elapsed);
    };
    return Game;
  })();
  window.SkyView = SkyView;
  window.Sky = Sky;
  window.Game = Game;
}).call(this);
