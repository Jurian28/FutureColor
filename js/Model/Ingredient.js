export class Ingredient { 
    constructor(id, mixTime, mixSpeed, x, y, red, green, blue, structure, colorType, inPotId = -1) {
        this.id = id;
        this.mixTime = mixTime;
        this.mixSpeed = mixSpeed;
        this.x = x;
        this.y = y;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.structure = structure;
        this.colorType = colorType;
        this.inPotId = inPotId;
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }

    addToPot(potId) {
        this.inPotId = potId;
    }
}