let tiles;

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    noStroke();

    tiles = [];
    for (let i = -5; i <= 5; i++) {
        tiles.push(new Tile(i, i));
    }
}

function draw() {

    push();
    translate(windowWidth / 2, windowHeight / 2);

    fill("black");
    rect(0, 0, windowWidth - 20, windowHeight - 20);

    fill("blue");
    tiles.forEach(tile => {
        rect(tile.x*20, tile.y*20, 20, 20);
    });

    fill("red");
    rect(0, 0, 10, 10);

    pop();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
