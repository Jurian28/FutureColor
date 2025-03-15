import {StorageModel} from "./Storage.js";

export class Machines {
    constructor() {
        this.machines = StorageModel.getData('machines');
    }

    saveMachines() {
        StorageModel.saveData('machines', this.machines);
    }

    add(machine) {
        this.machines.push(machine);

        this.saveMachines();
    }

    find(id) {
        return this.machines.find(m => m.id === id);
    }

    updatePosition(id, x, y) {
        let machine = this.find(id);
        machine.x = x;
        machine.y = y;

        this.saveMachines();

    }

    getNewId(){
        return Math.max(Math.max(...this.machines.map(m => m.id)) + 1, 0);
    }

    getMachines(currentHall) {
        return this.machines.filter(m => m.mixingHall === currentHall);
    }
}