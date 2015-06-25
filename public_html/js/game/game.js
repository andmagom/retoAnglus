
var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;
var FPS = 30;
var imgPlayer="img/game/player.png";




var scene = sjs.Scene({w:CANVAS_WIDTH, h:CANVAS_HEIGHT});

var canvasElement = $("<canvas width='" + CANVAS_WIDTH +
        "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");




setInterval(function () {
    update();
    draw();
}, 1000 / FPS);

function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    player.draw();
}

function update() {
    player.update();
}

var player = {
    x: CANVAS_WIDTH/2,
    y: CANVAS_HEIGHT/2,
    sprite : scene.Sprite(imgPlayer),
    draw: function () {
        this.sprite.update();
    },
    update: function ()
    {
        var right=false;
        var left = false;
        if (keydown.left) {
            player.x -= 2;
            left=true;
            this.sprite.setAngle(Math.PI);
        }
        if (keydown.right) {
            player.x += 2;
            right=true;
            this.sprite.setAngle(0);
        }
        if (keydown.up) {
            player.y -= 2;
            if(left || right)
            {
                if(left)
                {
                    this.sprite.setAngle(5*Math.PI/4);
                }else
                {
                    this.sprite.setAngle(7*Math.PI/4);
                }
            }else
            {
                this.sprite.setAngle(3*Math.PI/2);
            }
            
        }
        if (keydown.down) {
            player.y += 2;
            if(left || right)
            {
                if(left)
                {
                    this.sprite.setAngle(3*Math.PI/4);
                }else
                {
                    this.sprite.setAngle(Math.PI/4);
                }
            }else
            {
                this.sprite.setAngle(Math.PI/2);
            }
            
        }
        //Limito que el jugador no pueda salir del borde del juego.
        player.x = player.x.clamp(0, CANVAS_WIDTH - this.sprite.w);
        player.y = player.y.clamp(7, CANVAS_HEIGHT - this.sprite.w);
        this.sprite.setX(player.x);
        this.sprite.setY(player.y);
        
    }
};

canvasElement.appendTo("game1");