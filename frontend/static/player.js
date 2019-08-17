const MOVE_FRAMES = 10;

class Player {

    x;
    y;
    nextmovex;
    nextmovey;
    framesleft;
    sprite;
    
    constructor(x, y, sprite) {
        this.x = 0;
        this.y = 0;
        this.sprite = sprite;
        this.nextmovex = 0;
        this.nextmovey = 0;
        this.framesleft = 0;
    }

    update() {
        if (this.framesleft > 0) { // Continue movement animation
            this.x += this.nextmovex;
            this.y += this.nextmovey;
            this.framesleft--;
        } else { // Lock position to grid if not moving
            this.x = round(this.x);
            this.y = round(this.y);
        }
    }

    move(x, y) {
        let groundtile = groundtiles.get(this.x+x, this.y+y);
        let decorationtile = decorationtiles.get(this.x+x, this.y+y);
        if (this.framesleft <= 0 && groundtile && !groundtile.solid && (!decorationtile || !decorationtile.solid)) { 
            this.framesleft = MOVE_FRAMES;
            this.nextmovex = x / (MOVE_FRAMES * 1.0);
            this.nextmovey = y / (MOVE_FRAMES * 1.0);
        }
    }
    
    keyPressed() {
        switch(key) {
            case 'w':
                this.move(0, -1);
                break;
            case 'a':
                this.move(-1, 0);
                break;
            case 's':
                this.move(0, 1);
                break;
            case 'd':
                this.move(1, 0);
                break;
        }
    }

}
