
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 320;
var FPS = 30;
var imgPlayer = "img/game/player.png";
var arrayAnimalsJson = [];
var animalsSprite = sjs.List();
var animalString = [];
var point = 0;
var level = 0;
var target = "";
var play = true;


var scene = sjs.Scene({w: CANVAS_WIDTH, h: CANVAS_HEIGHT, parent: document.getElementById("game1")});

var input = scene.Input();



function draw() {
    drawAnimals();
    player.draw();
}

function update() {
    player.update();
}
function drawString()
{
    if (play)
    {
        $("#target").html("<p>" + animalString[level] + "</p>");
        $("#point").html("<p>" + point + "</p>");
    } else
    {
        if(point>0)
        {
            $("#target").html("<p>Excellent!</p>");
        }else
        {
            $("#target").html("<p>Game Over</p>");
        }
        
    }

}

function collision()
{
    var collision = player.sprite.collidesWithArray(animalsSprite);
    if (collision)
    {
        var lista = animalsSprite.list;
        for (var i = 0; i < lista.length; i++)
        {
            if (collision == lista[i])
            {
                if (i == 0)
                {
                    point += 10;
                    level++;
                    animalsSprite.remove(collision);
                    collision.remove();
                    if (lista.length==0)
                    {
                        play = false;
                    }
                } else
                {
                    player.x=0;
                    player.y=CANVAS_HEIGHT;
                    player.update();
                    point -= 10;
                }
                break;
            }
        }
        player.draw();
        drawString();
    }
    if (!play)
    {
        clearInterval(interval);
    }
}

var player = {
    x: 0,
    y: CANVAS_HEIGHT,
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
    $.each(arrayAnimalsJson, function ( ) {
        var name = this.name;
        var img = this.image;
        var animal = scene.Sprite(img);
        animalsSprite.add(animal);
        animalString.push(name);
    });
}
;

function setPoints()
{
    var x = 10;
    var y = 10;
    var y2 = 200;
    var aux = 0;
    var ani;
    while (ani = animalsSprite.iterate()) {
        ani.setX(x);
        if (aux == 0)
        {
            ani.setY(y);
            aux = 1;
        } else
        {
            ani.setY(y2);
            aux = 0;
        }
        x += CANVAS_WIDTH / animalString.length;
    }

}
function drawAnimals() {
    var ani;
    while (ani = animalsSprite.iterate()) {
        ani.update();
    }
}
;
var interval;
$(document).ready(function () {

    player.sprite.setY(CANVAS_WIDTH);

    $.getJSON("http://reto.anglus.co/data.json", function (data) {
        arrayAnimalsJson = data.words;
        createAnimals();
        setPoints();
        drawAnimals();
        drawString();
    });

    interval = setInterval(function () {
        draw();
        collision();
        update();

    }, 1000 / FPS);

});
