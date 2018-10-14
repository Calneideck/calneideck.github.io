var points = [[],[],[]];
var speeds = [0.2, 0.4, 0.8];
var count = 50;

var star;
var starDir;
var shootingStar = false;
var starSpeed = 50;
var starSize = 50;
var starChance = 0.005;

var mousePos;
var mouseMove = 0.5;
var mouseDist = 30000
var accelRate = 0.003;
var deccelRate = 0.98;

function Point(rnd) {
    this.x = rnd ? random(0, windowWidth) : 0;
    this.y = rnd ? random(0, windowHeight) : 0;
    this.accelX = 0;
    this.accelY = 0;
    this.dY = 0;
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-holder');

    mousePos = new Point(false);

    for (var i = 0; i < 3; i++)
        for  (var j = 0; j < count; j++)
            points[i].push(new Point(true));

    noStroke();
}

function draw() {
    clear();

    shootStar();

    var dX = 0;
    var dY = 0;
    if (mousePos.x > 0) {
        dX = mouseX - mousePos.x;
        dY = mouseY - mousePos.y;
    }
    mousePos.x = mouseX;
    mousePos.y = mouseY;

    for (var i = 0; i < 3; i++)
        for  (var j = 0; j < count; j++) {
            // Move
            points[i][j].x += speeds[i];
            points[i][j].y += points[i][j].dY;

            // Move points with mouse
            /*var dist = sq(points[i][j].x - mousePos.x) + sq(points[i][j].y - mousePos.y);
            if (dist < mouseDist) {
                points[i][j].x += dX * mouseMove * (1 - dist / mouseDist);
                points[i][j].y += dY * mouseMove * (1 - dist / mouseDist);
            }*/

            points[i][j].accelX += dX * (i + 1) * accelRate;
            points[i][j].accelY += dY * (i + 1) * accelRate;
            points[i][j].x += points[i][j].accelX;
            points[i][j].y += points[i][j].accelY;
            points[i][j].accelX *= deccelRate;
            points[i][j].accelY *= deccelRate;

            // Wrap around
            if (points[i][j].x > windowWidth)
                points[i][j].x = 0;
            else if (points[i][j].x < 0)
                points[i][j].x = windowWidth;
            
            if (points[i][j].y > windowHeight)
                points[i][j].y = 0;
            else if (points[i][j].y < 0)
                points[i][j].y = windowHeight;

            ellipse(points[i][j].x, points[i][j].y, i + 1);
        }
}

function shootStar() {
    if (shootingStar) {
        star.x += starDir.x * starSpeed;
        star.y += starDir.y * starSpeed;
        
        stroke(255);
        line(star.x, star.y, star.x + starDir.x * starSize, star.y + starDir.y * starSize);
        noStroke();

        if (star.x < 0 || star.x > windowWidth || star.y < 0 || star.y > windowHeight)
            shootingStar = false;
    } else if (random() < starChance) {
        shootingStar = true;
        star = new Point(true);
        starDir = p5.Vector.random2D();

        while (star.x > 0 && star.x < windowWidth && star.y > 0 && star.y < windowHeight) {
            star.x -= starDir.x;
            star.y -= starDir.y;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    for (var i = 0; i < 3; i++)
        for  (var j = 0; j < count; j++) {
            points[i][j].x = random(0, windowWidth);
            points[i][j].y = random(0, windowHeight);
        }
}