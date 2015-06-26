
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 320;
var FPS = 30;
var imgPlayer = "img/game/player.png";
var arrayAnimalsJson = [];
var animalsSprite = sjs.List();



var scene = sjs.Scene({w: CANVAS_WIDTH, h: CANVAS_HEIGHT, parent: document.getElementById("game1")});
var input  = scene.Input();

setInterval(function () {
    collision();
    update();
    draw();
}, 1000/FPS );

function draw() {
    drawAnimals();
     player.draw();
}

function update() {
    player.update();
}

function collision()
{
    var collision = player.sprite.collidesWithArray(animalsSprite);
    if(collision)
    {
        //alert("Ah chocado con: "+collision);
        player.x=0;
        player.y=0;
        player.draw();
    }
}

var player = {
    x: 0,
    y: 0,
    sprite: scene.Sprite(imgPlayer),
    draw: function () {
        this.sprite.update();
    },
    update: function ()
    {
        var right = false;
        var left = false;
  
        if (input.keyboard.left) {
            player.x -= 2;
            left = true;
            this.sprite.setAngle(Math.PI);
        }
        if (input.keyboard.right) {
            player.x += 2;
            right = true;
            this.sprite.setAngle(0);
        }
        if (input.keyboard.up) {
            player.y -= 2;
            if (left || right)
            {
                if (left)
                {
                    this.sprite.setAngle(5 * Math.PI / 4);
                } else
                {
                    this.sprite.setAngle(7 * Math.PI / 4);
                }
            } else
            {
                this.sprite.setAngle(3 * Math.PI / 2);
            }

        }
        if (input.keyboard.down) {
            player.y += 2;
            if (left || right)
            {
                if (left)
                {
                    this.sprite.setAngle(3 * Math.PI / 4);
                } else
                {
                    this.sprite.setAngle(Math.PI / 4);
                }
            } else
            {
                this.sprite.setAngle(Math.PI / 2);
            }

        }
        //Limito que el jugador no pueda salir del borde del juego.
        player.x = player.x.clamp(0, CANVAS_WIDTH - this.sprite.w);
        player.y = player.y.clamp(7, CANVAS_HEIGHT - this.sprite.w + 6);
        this.sprite.setX(player.x);
        this.sprite.setY(player.y);

    }
};


function createAnimals()
{
    var xAni=10;
    $.each(arrayAnimalsJson, function ( ) {
        var name = this.name;
        var img = this.image;
        var animal =  scene.Sprite(img);
        animalsSprite.add(animal);
        xAni+=50;
    });
}
;

function drawAnimals() {
    var x = 10;
    var ani;
    while (ani = animalsSprite.iterate()) {
        ani.setX(x);
        ani.setY(100);
        ani.update();
        x += 170;
    }

}
;

$(document).ready(function () {
    $.getJSON("json/data.json", function (data) {
        arrayAnimalsJson = data.words;
        createAnimals();
        drawAnimals();
    });

});
