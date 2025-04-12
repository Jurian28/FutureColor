import {StorageModel} from "./Storage.js";

export class MixedColors {
    constructor() {
        this.mixedColors = StorageModel.getData('mixedColors');
    }

    saveMixedColors() {
        StorageModel.saveData('mixedColors', this.mixedColors);
    }

    add(mixedColor) {
        this.mixedColors.push(mixedColor);

        this.saveMixedColors();
    }

    find(id) {
        return this.mixedColors.find(m => m.id === id);
    }

    updatePosition(id, x, y) {
        let mixedColor = this.find(id);
        mixedColor.x = x;
        mixedColor.y = y;

        this.saveMixedColors();

    }

    getNewId(){
        return Math.max(Math.max(...this.mixedColors.map(m => m.id)) + 1, 0);
    }
}