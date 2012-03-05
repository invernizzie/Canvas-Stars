class Star
    constructor: (@x, @y, @z) ->
        @x = @x or Math.random()
        @y = @y or Math.random()
        @z = @z or Math.random()
    
    advance: (dt) ->
        @y += dt * @speed()
        if @y > 1
            @y = 0
            @x = Math.random()
            @z = Math.random()
    
    # Speed in units/ms
    speed: -> (0.25 + 3 * @z * @z / 4) / 2500

class Sky
    stars: (new Star() for i in [1..500])

    update: (dt) ->
        star.advance(dt) for star in @stars

class SkyView
    constructor: (@ctx, @width, @height) ->

    update: (sky) ->
        @drawBg()
        @drawStars(sky)

    drawBg: ->
        @ctx.fillStyle = "black"
        @ctx.fillRect(0, 0, @width, @height)

    drawStars: (sky) ->
        @drawStar(star) for star in sky.stars

    drawStar: (star) ->
        @ctx.fillStyle = @starColor(star)
        @ctx.beginPath()
        @ctx.arc(star.x * @width, star.y * @height, 1.2, 0, 2 * Math.PI)
        @ctx.fill()

    starColor: (star) ->
        z = star.z
        light = Math.floor(16 + z * z * z * 240).toString(16)
        "##{light}#{light}#{light}"

# Lacking a controller until it's needed
class Game
    constructor: (@model, @view) ->
    framerate: 30

    start: ->
        @stopped = false
        @lastModelUpdate = new Date().getTime()
        @model.init?()
        @loop()

    end: -> @stopped = true

    update:  ->
        now = new Date().getTime()
        @model.update(now - @lastModelUpdate)
        @lastModelUpdate = new Date().getTime()

    draw: ->
        @view.update(@model)

    loop: =>
        return if @stopped
        start = new Date().getTime()
        @update()
        @draw()
        elapsed = new Date().getTime() - start
        setTimeout(@loop, 1000 / @framerate - elapsed)

window.SkyView = SkyView
window.Sky = Sky
window.Game = Game
