let tiles;
let playerx;
let playery;
const FIVE_HALVES = 5.0 / 2.0;
const FIVE_FOURTHS = 5.0 / 4.0;
const FIVE_EIGHTHS = 5.0 / 8.0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    noStroke();

    playerx = 0;
    playery = 0;
    tiles = new Tilemap();
    for (let i = 0; i <= 25; i++) {
        tiles.put(int(random(-15, 15)), int(random(-15, 15)));
    }
}

function draw() {

    push();
    translate(windowWidth / 2, windowHeight / 2);
    applyMatrix(20, 10, -20, 10, 0, 0);

    fill("black");
    rect(0, 0, windowWidth - 20, windowHeight - 20);

    fill("blue");
    for (let tile of tiles) {
        rect(tile.x, tile.y, 1, 1);
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
            playery--;
            break;
        case 'a':
            playerx--;
            break;
        case 's':
            playery++;
            break;
        case 'd':
            playerx++;
            break;
    }
}
