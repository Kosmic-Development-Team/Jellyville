"use strict";

class Tilemap {

    constructor() {
        this.northwest = [];
        this.northeast = [];
        this.southwest = [];
        this.southeast = [];
    }

    put(x, y, tile) {
        let quadrant = this.getQuadrant(x, y);
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
        for (let tile of this.northeast) yield tile;
        for (let tile of this.northwest) yield tile;
        for (let tile of this.southwest) yield tile;
        for (let tile of this.southeast) yield tile;
    }
}
