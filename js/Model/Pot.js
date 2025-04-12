import {StorageModel} from "./Storage.js";

export class Pot {
    constructor(id, x, y, inMachineId = -1) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.ingredients = [];
        this.inMachineId = inMachineId;
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
    }

    addToMachine(machineId){
        this.inMachineId = machineId;
    }
}
