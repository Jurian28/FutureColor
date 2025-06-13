export class IngredientView {
    addIngredients(ingredient) {
        ingredient.forEach(ingredient => this.addIngredient(ingredient));
    }
    addIngredient(ingredient) {
        let ingredientList = document.getElementById('ingredients');

        let ingredientElement = document.createElement('div');
        ingredientElement.classList.add('ingredient');
        ingredientElement.style.left = ingredient.x + '%';
        ingredientElement.style.top = ingredient.y + '%';

        if(ingredient.colorType === "RGB") {
            ingredientElement.style.backgroundColor =  'rgb(' + ingredient.red + ',' + ingredient.green + ',' + ingredient.blue + ')';
        } else {
            ingredientElement.style.backgroundColor =  'hsl(' + ingredient.red + ',' + ingredient.green + '%,' + ingredient.blue + '%)';
        }

        if(ingredient.structure === "grove_korrel") {
            ingredientElement.style.borderStyle = "dotted";
        } else if(ingredient.structure === "glad") {
            ingredientElement.style.borderStyle = "solid";
        } else if(ingredient.structure === "slijmerig") {
            ingredientElement.style.borderStyle = "ridge";
        } else {
            ingredientElement.style.borderStyle = "hidden";
        }

        ingredientElement.dataset.id = ingredient.id;

        ingredientList.appendChild(ingredientElement);

        return ingredientElement;
    }
    _getIngredientElement(x, y){
        // TODO geeft het hele element terug met visuals en position en class
    }

    moveIngredientToPot(ingredientId, potId) {
        const ingredientElement = document.querySelector(`.ingredient[data-id="${ingredientId}"]`);
        const potElement = document.querySelector(`.pot[data-id="${potId}"]`);

        if (ingredientElement && potElement) {
            potElement.appendChild(ingredientElement);
        } else {
            console.warn("Ingredient or pot DOM element not found.");
            console.log(ingredientId, ", ", potId);
        }
    }
}