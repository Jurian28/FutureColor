import {StorageModel} from "./Storage.js";

export class Pots {
    constructor() {
        this.pots = StorageModel.getData('pots');
    }

    savePots() {
        StorageModel.saveData('pots', this.pots);
    }

    add(pot) {
        this.pots.push(pot);

        this.savePots();
    }

    find(id) {
        return this.pots.find(m => m.id === id);
    }

    updatePosition(id, x, y) {
        let pot = this.find(id);
        pot.x = x;
        pot.y = y;

        this.savePots();

    }

    getNewId(){
        return Math.max(Math.max(...this.pots.map(m => m.id)) + 1, 0);
    }
}
