export class ColorTestTile {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.mixedColor = null;
    }

    updateColor(mixedColor) {
        this.mixedColor = mixedColor;
    }
}