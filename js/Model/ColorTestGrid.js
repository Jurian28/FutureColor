import {StorageModel} from "./Storage.js";

export class ColorTestGrid {
    constructor() {
        this.grid = StorageModel.getData('grid');
    }

    resetGrid() {
        this.grid = StorageModel.getData('grid');
    }

    saveGrid() {
        StorageModel.saveData('grid', this.grid);
    }

    add(tile) {
        this.grid.push(tile);

        this.saveGrid();
    }

    find(id) {
        return this.grid.find(m => m.id === id);
    }

    findMaxX() {
        return Math.max(...this.grid.map(m => m.x));
    }

    findMaxY() {
        return Math.max(...this.grid.map(m => m.y));
    }

    updateColor(id, mixedColor) {
        let tile = this.grid[id];

        tile.mixedColor = mixedColor;

        this.saveGrid();

    }

    clearGrid() {
        StorageModel.clearData('grid');
    }

    getNewId(){
        return Math.max(Math.max(...this.grid.map(m => m.id)) + 1, 0);
    }
}