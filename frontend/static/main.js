let groundtiles;
let decorationtiles;
let player;
let zoom;

let spritelexicon;

const ASSETS_FOLDER = "static/assets/";

function preload() {
    loadStrings(ASSETS_FOLDER + "sprites.yaml", result => {
        let spritedata = jsyaml.load(result.join("\n"));
        spritelexicon = {};
        for (let spritename in spritedata) {
            if (spritedata.hasOwnProperty(spritename)) {
                let spriteimages = spritedata[spritename];
                spritelexicon[spritename] = [];
                for (let image of spriteimages) {
                    spritelexicon[spritename].push(loadImage(ASSETS_FOLDER + image));
                }
            }
        }
    });
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    noStroke();
    noSmooth();

    groundtiles = new Tilemap();
    decorationtiles = new Tilemap();
    player = new Player(0, 0, "ploop");
    zoom = 4;

    for (let i = 0; i <= 500; i++) {
        groundtiles.put(int(random(-15, 15)), int(random(-15, 15)), "water", true);
    }
    for (let i = 0; i <= 500; i++) {
        groundtiles.put(int(random(-15, 15)), int(random(-15, 15)), "grass", false);
    }
    for (let i = 0; i <= 50; i++) {
        decorationtiles.put(int(random(-15, 15)), int(random(-15, 15)), "upsidedowngrass", true);
    }
    groundtiles.put(0, 0, "grass", false);
}

function draw() {

    push();

    background("black");
    translate(windowWidth / 2, windowHeight / 2); // Use center of screen as (0, 0)
    scale(zoom) // Zoom in

    // Sprite width and height
    let w = spritelexicon["grass"][0].width;

    // Transformed player coordinates
    let px = w/2*(player.x - player.y);
    let py = w/4*(player.x + player.y);

    translate(-px, -py); // Center of screen is player position

    let left = true;
    let startx = tileAtX(-windowWidth / 2, -windowHeight / 2) - 1;
    let starty = tileAtY(-windowWidth / 2, -windowHeight / 2);
    let stopwidth = tileAtX(windowWidth / 2, -windowHeight / 2) - startx + 1;
    let stopheight = tileAtX(-windowWidth / 2, windowHeight / 2) - startx + player.y;
    let currx = startx;
    let curry = starty;
    while(curry < stopheight) {
        let tile = groundtiles.get(currx, curry);
        //groundtiles.put(currx, curry, grasssprite, false);
        if (tile) {
            let x = tile.x - tile.y;
            let y = tile.x + tile.y;
            let h = spritelexicon[tile.sprite][0].height;
            image(spritelexicon[tile.sprite][0], w/2*x, w/4*y + h/2 - w/4);
        }
        tile = decorationtiles.get(currx, curry);
        if (tile) {
            let x = tile.x - tile.y;
            let y = tile.x + tile.y;
            let h = spritelexicon[tile.sprite][0].height;
            image(spritelexicon[tile.sprite][0], w/2*x, w/4*y - h/2 + w/4 - 1);
        }
        currx++;
        curry--;
        if (currx == startx + stopwidth) {
            if (left) {
                currx = ++startx;
                curry = starty;
            } else {
                currx = startx;
                curry = ++starty;
            }
            left = !left;
        }
    }
    //for (let tile of groundtiles) {
    //    let x = tile.x - tile.y;
    //    let y = tile.x + tile.y;
    //    let h = tile.sprite.height;
    //    image(tile.sprite, w/2*x, w/4*y + h/2 - w/4);
    //}
    
    player.update();

    w = spritelexicon[player.sprite][0].width;
    let h = spritelexicon[player.sprite][0].height;
    image(spritelexicon[player.sprite][0], px, py - h/2 + w/4 - 1);
    //fill("blue");
    //quad(
    //    px - w/2, py,
    //    px,       py - w/4,
    //    px + w/2, py,
    //    px,       py + w/4
    //);

    pop();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    player.keyPressed();
    
    if (key == 'x') {
        console.log(upperLeftX());
        console.log(upperLeftY());
    }
}

function tileAtX(x, y) {
    let w = spritelexicon["grass"][0].width;
    let x1 = x/w; let y1 = y/w*2;
    x = x1 + y1;
    x /= zoom;
    x += player.x;
    return round(x);
}

function tileAtY(x, y) {
    let w = spritelexicon["grass"][0].width;
    let x1 = x/w; let y1 = y/w*2;
    y = -x1 + y1;
    y /= zoom;
    y += player.y;
    return round(y);
}
