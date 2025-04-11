export class Pot {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.ingredients = [];

        // todo add to cookie
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
    }
}
