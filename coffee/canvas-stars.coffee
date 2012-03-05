WIDTH = HEIGHT = 600

window.onload = ->
    ctx = document.getElementById('canvas').getContext('2d')
    view = new SkyView(ctx, WIDTH, HEIGHT)
    sky = new Sky()
    game = new Game(sky, view)
    game.start()
