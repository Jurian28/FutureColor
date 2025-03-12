
export class Machine {
    constructor(id, speed, time, x, y) {
        this.id = id;
        this.speed = speed;
        this.time = time;
        this.x = x;
        this.y = y;

        // todo add to cookie
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
    }
}