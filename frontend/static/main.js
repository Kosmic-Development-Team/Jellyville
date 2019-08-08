let tiles;
let playerx;
let playery;
let framesleft;
let pendingmovex;
let pendingmovey;

const FIVE_HALVES = 5.0 / 2.0;
const FIVE_FOURTHS = 5.0 / 4.0;
const FIVE_EIGHTHS = 5.0 / 8.0;
const MAX_FRAMES = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    noStroke();

    playerx = 0;
    playery = 0;
    framesleft = 0;
    pendingmovex = 0;
    pendingmovey = 0;
    tiles = new Tilemap();
    tiles.put(0, 0);
    for (let i = 0; i <= 500; i++) {
        tiles.put(int(random(-15, 15)), int(random(-15, 15)));
    }
}

function draw() {

    background("white");

    push();
    translate(windowWidth / 2, windowHeight / 2);

    fill("black");
    rect(0, 0, windowWidth - 20, windowHeight - 20);

    applyMatrix(20, 10, -20, 10, 0, 0);
    translate(-playerx, -playery);
    fill("blue");
    for (let tile of tiles) {
        rect(tile.x, tile.y, 1, 1);
    }
    
    if (framesleft > 0) {
        playerx += pendingmovex;
        playery += pendingmovey;
        framesleft--;
    } else {
        playerx = round(playerx);
        playery = round(playery);
    }

    fill("red");
    rect(playerx, playery, 1, 1);
    pop();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    switch(key) {
        case 'w':
            move(0, -1);
            break;
        case 'a':
            move(-1, 0);
            break;
        case 's':
            move(0, 1);
            break;
        case 'd':
            move(1, 0);
            break;
    }
}

function move(x, y) {
    if (framesleft <= 0 && tiles.get(playerx+x, playery+y)) {
        framesleft = MAX_FRAMES;
        pendingmovex = x / (MAX_FRAMES * 1.0);
        pendingmovey = y / (MAX_FRAMES * 1.0);
    }
}
