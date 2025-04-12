export class Machine {
    constructor(id, speed, time, x, y, mixingHall, pot = null) {
        this.id = id;
        this.speed = speed;
        this.time = time;
        this.x = x;
        this.y = y;
        this.mixingHall = mixingHall;
        this.pot = pot;

        // todo add to cookie
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
    }

    addPot(pot) {
        this.pot = pot;
    }
}