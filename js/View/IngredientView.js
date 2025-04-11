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
        

        ingredientElement.dataset.id = ingredient.id;

        ingredientList.appendChild(ingredientElement);

        return ingredientElement;
    }
    _getIngredientElement(x, y){
        // TODO geeft het hele element terug met visuals en position en class
    }
}