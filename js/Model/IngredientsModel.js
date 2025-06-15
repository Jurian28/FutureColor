import { StorageModel } from "./Storage.js";

export class IngredientsModel {
    constructor() {
        this.ingredients = StorageModel.getData('ingredients');
    }

    getIngredients() {
        this.ingredients = StorageModel.getData('ingredients');
    }

    saveIngredients() {
        StorageModel.saveData('ingredients', this.ingredients);
    }

    add(ingredient) {
        this.ingredients.push(ingredient);

        this.saveIngredients();
    }

    find(id) {
        return this.ingredients.find(m => m.id === id);
    }

    updatePosition(id, x, y) {
        let ingredient = this.find(id);
        ingredient.x = x;
        ingredient.y = y;

        this.saveIngredients();

    }

    addIngredientToPot(potId, ingredientId) {
        let ingredient = this.find(ingredientId);
        ingredient.addToPot(potId);
        ingredient.inPotId = potId;
        this.saveIngredients();
    }

    updateAfterMix(id, red, green, blue, mixTime) {
        let ingredient = this.find(id);
        ingredient.red = red;
        ingredient.green = green;
        ingredient.blue = blue;
        ingredient.mixTime = mixTime;

        this.saveIngredients();
    }

    getNewId(){
        return Math.max(Math.max(...this.ingredients.map(m => m.id)) + 1, 0);
    }
}