var ansi = require('ansi');
var keylistener = require('keypress');

var cursor = ansi(process.stdout);
var height = 20;
var width = 40;
var cursPosX = 0;
var cursPosy = 0;
var directionX = 0;
var directionY = 0;
var positionX = 0;
var positionY = 0;
var posAppleX = 0;
var posAppleY = 0;
var isStarted = false;

keylistener(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

try {
    process.stdout.write('\x1Bc');
    process.stdout.write('\x1B[?25l');
    draw();
    process.stdin.on('keypress', function (ch, key) {
        switch (key.name) {
            case 'e': endgame();
                break;
            case 'left':
                directionX = -1;
                directionY = 0;
                break;
            case 'right':
                directionX = 1;
                directionY = 0;
                break;
            case 'up':
                directionX = 0;
                directionY = -1;
                break;
            case 'down':
                directionX = 0;
                directionY = 1;
        }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();

    cursPosY = Math.round(height/2);
    cursPosX = Math.round(width/2);
    
    game();






} catch (ex) {
    console.log(ex.toString());
    endgame();
}

function delSnake(){
    cursor.bg.black();
    drawPoint(positionX, positionY);
    cursor.bg.reset();
}

function game(){
    setApple();
    if(isStarted === false){
        delSnake();
    }
    isStarted= true;
    positionX = cursPosX + directionX;
    positionY = cursPosY + directionY;



    if(positionX === width || positionX === 1 || positionY === height || positionY === 1){
        process.stdout.write("GAMER OVER");
        endgame();
    }
    drawSnake();

    setTimeout(game,1000);
}

function placeApple() {
    cursor.goto(posAppleX + 1, posAppleY + 1);
    cursor.bg.red().write(' ');
    cursor.bg.reset();
    process.stdout.write('\x1B[?25l');
}

function setApple() {
    posAppleX = Math.round(Math.random() * Math.floor(width - 1) + 1);
    posAppleY = Math.round(Math.random() * Math.floor(height - 1) + 1);
    placeApple();
}


function drawSnake(){
    cursor.bg.green();
    drawPoint(positionX+1,positionY+1);
    cursor.bg.reset();
}

function drawPoint(col, row) {
    cursor.goto(col, row).write(' ');
}

function endgame() {
    process.exit(1);
}


function draw() {
    cursor.bg.grey();
    drawHline(1, 1, width);
    drawHline(1, height, width);
    drawVline(1, 1, height);
    drawVline(width, 1, height);
    cursor.bg.reset();
}


function drawHline(col, row, length) {
    for (var i = 0; i < length; i++) {
        cursor.goto(col + i, row).write(' ');
    }
}

function drawVline(col, row, length) {
    for (var i = 0; i < length; i++) {
        cursor.goto(col, row + i).write(' ');
    }
}