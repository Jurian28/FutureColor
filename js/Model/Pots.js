import {StorageModel} from "./Storage.js";
import {Machine} from "./Machine.js";
import {Pot} from "./Pot.js";

export class Pots {
    constructor() {
        this.pots = StorageModel.getData('pots').map(data =>
            new Pot(data.id, data.x, data.y, data.inMachineId)
        );
    }

    savePots() {
        StorageModel.saveData('pots', this.pots);
    }

    add(pot) {
        this.pots.push(pot);

        this.savePots();
    }

    find(id) {
        return this.pots.find(p => p.id === id);
    }

    remove(id) {
         this.pots = this.pots.filter(p => p.id !== id);
    }

    updatePosition(id, x, y) {
        let pot = this.find(id);
        pot.x = x;
        pot.y = y;

        this.savePots();

    }

    updateMachineId(id, machineId) {
        let pot = this.find(id);
        pot.machineId = machineId;
        this.savePots();
    }

    addIngredient(id, ingredient) {
        let pot = this.find(id);
        pot.ingredients.push(ingredient);

        this.savePots();
    }

    updateColorAndMixTime(id, ingredient) {
        let pot = this.find(id);
        pot.updateColorAndMixTime(ingredient.red, ingredient.green, ingredient.blue, ingredient.mixTime, ingredient.mixSpeed, ingredient.colorType);

        this.savePots();
    }

    updateMixTime(id) {
        let pot = this.find(id);
        pot.removeOneColorAmount();
        this.savePots()
    }

    getNewId(){
        return Math.max(Math.max(...this.pots.map(m => m.id)) + 1, 0);
    }

    addPotToMachine(machineId, potId) {
        let pot = this.find(potId);
        pot.addToMachine(machineId);
        pot.inMachineId = machineId;
        this.savePots();
    }

    addIngredientToPot(potId, ingredient) {
        let pot = this.find(potId);
        if (pot) {
            pot.addIngredient(ingredient);
        }
    }
}
