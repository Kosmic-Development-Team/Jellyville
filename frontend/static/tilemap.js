"use strict";

class Tilemap {

    constructor() {
        this.northwest = [];
        this.northeast = [];
        this.southwest = [];
        this.southeast = [];
    }

    put(x, y) {
        let quadrant = this.getQuadrant(x, y);
        let tile = new Tile(x, y);
        x = abs(x); y = abs(y);
        if (!quadrant[y])
            quadrant[y] = [];
        quadrant[y][x] = tile;
    }

    get(x, y) {
        let quadrant = this.getQuadrant(x, y);
        x = abs(x); y = abs(y);
        if (!quadrant[y])
            return null;
        if (!quadrant[y][x])
            return null;
        return quadrant[y][x];
    }

    getQuadrant(x, y) {
        let quadrant = (x >= 0 ? (y >= 0 ? this.northeast : this.southeast) : (y >= 0 ? this.northwest : this.southwest));
        return quadrant;
    }

    *[Symbol.iterator]() {
        for (let row of this.northeast) if (row != undefined) for (let tile of row) if (tile != undefined) yield tile;
        for (let row of this.northwest) if (row != undefined) for (let tile of row) if (tile != undefined) yield tile;
        for (let row of this.southwest) if (row != undefined) for (let tile of row) if (tile != undefined) yield tile;
        for (let row of this.southeast) if (row != undefined) for (let tile of row) if (tile != undefined) yield tile;
    }
}
