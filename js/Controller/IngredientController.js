import { Ingredient } from "../Model/Ingredient.js";
import { IngredientsModel } from "../Model/IngredientsModel.js";
import { IngredientView } from "../View/IngredientView.js";
import { DragDropController } from "./DragDropController.js";

export class IngredientController {
    ingredientView = new IngredientView();

    constructor(potController) {
        let createButton = document.getElementById('create-ingredient-form');
        createButton.addEventListener('submit', (event) => { this.addNewIngredient(event); });

        let rgbButton = document.getElementById("rgb");
        let hslButton = document.getElementById("hsl");

        rgbButton.addEventListener('click', () => { this.changeColorType("rgb") } );
        hslButton.addEventListener('click', () => { this.changeColorType("hsl") } );

        this.potController = potController;

        this.ingredients = new IngredientsModel();
        this.createIngredients();
    }

    createIngredients() {
        for(let ingredient of this.ingredients.ingredients){
            this.createIngredient(ingredient);
        }
    }

    setPotController(potController) {
        this.potController = potController;
    }

    getIngredients() {
        return this.ingredients;
    }

    changeColorType(colorType) {
        let rgbFields = document.getElementById("rgbFields");
        let hslFields = document.getElementById("hslFields");
        if(colorType === "rgb") {
            rgbFields.style.display = "block";
            hslFields.style.display = "none";
        } else {
            rgbFields.style.display = "none";
            hslFields.style.display = "block";
        }
    }

    createIngredient(ingredient){

        let ingredientElement = this.ingredientView.addIngredient(ingredient);
        let pots = document.getElementsByClassName("pot");
        let potsArray = [].slice.call(pots);

        let dragDropController = new DragDropController(ingredientElement, (ingredientElement, x, y, event) => {
            let id = parseInt(ingredientElement.dataset.id);

            for(let i = 0; i < potsArray.length; i++) {
                if(this.checkIfTouching(ingredientElement, potsArray[i])) {
                    let potModel = this.potController.pots.find(i);
                    if(potModel.ingredients.indexOf(ingredient) == -1) {
                        if(potModel.ingredients[0] !== undefined) {
                            if(potModel.ingredients[0].mixSpeed != ingredient.mixSpeed) {
                                alert("dit ingrediënt heeft niet dezelfde mengsnelheid als de andere ingrediënten");
                                return;
                            }
                        }
                        ingredient.inPot = true;
                        this.potController.pots.addIngredient(potModel.id, ingredient);
                    }
    
                    potsArray[i].appendChild(ingredientElement);
    
                    dragDropController.destroy();
                    this.checkLocalStorage(ingredient, dragDropController, potsArray, ingredientElement);
                }
            }
            this.ingredients.updatePosition(id, x, y);
        })
        this.checkLocalStorage(ingredient, dragDropController, potsArray, ingredientElement);
    }

    checkLocalStorage(ingredient, dragDropController, potsArray, ingredientElement) {
        for(let i = 0; i < this.potController.pots.pots.length; i++) {
            for(let j = 0; j < this.potController.pots.pots[i].ingredients.length; j++) {
                if(this.potController.pots.pots[i].ingredients[j].id == ingredient.id) {
                    // if(j == 0) {
                    //     ingredient.x = 10;
                    //     ingredient.y = 40;
                    //     this.ingredients.updatePosition(ingredient.id, 10, 40);
                    // } else {
                    //     ingredient.x = 65;
                    //     ingredient.y = 40;
                    //     this.ingredients.updatePosition(ingredient.id, 65, 40);
                    // }
                    
                    potsArray[i].appendChild(ingredientElement);
                    dragDropController.destroy();
                }
            }
        }
    }

    checkIfTouching(ingredient, pot) {

        let div1 = pot.getBoundingClientRect();
        let div1Top = div1.top;
        let div1Left = div1.left;
        let div1Right = div1.right;
        let div1Bottom = div1.bottom;
        
        let div2 = ingredient.getBoundingClientRect();
        let div2Top = div2.top;
        let div2Left = div2.left;
        let div2Right = div2.right
        let div2Bottom = div2.bottom

        let verticalMatch;
        let horizontalMatch;
        
        if ((div2Top > div1Top && div2Top < div1Bottom)||(div2Bottom > div1Top && div2Bottom < div1Bottom)) {
          verticalMatch = true
        } else{
          verticalMatch = false
        }
        
        if ((div2Right > div1Left && div2Right < div1Right)||(div2Left < div1Right && div2Left > div1Left)) {
          horizontalMatch = true
        } else {
          horizontalMatch = false
        }
        
        if (horizontalMatch && verticalMatch){
          return true;
        } else {
          return false;
        }
    }

    addNewIngredient(event) {
        event.preventDefault();

        let createForm = document.getElementById('create-ingredient-form');
        let mixTime = createForm.elements["ingredient-time"].value;
        let mixSpeed = createForm.elements["ingredient-speed"].value;

        let radios = document.getElementsByTagName('input');
        let colorType;
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].type === 'radio' && radios[i].checked) {
                colorType = radios[i].value;       
            }
        }

        let red;
        let green;
        let blue;

        if(colorType === "RGB") {
            red = createForm.elements["red"].value;
            green = createForm.elements["green"].value;
            blue = createForm.elements["blue"].value;
        } else {
            red = createForm.elements["hue"].value;
            green = createForm.elements["saturation"].value;
            blue = createForm.elements["lightness"].value;
        }

        let structure = createForm.elements["structure"].value;

        let x = 50;
        let y = 50; // middle of the screen (percentage)
        const id = this.ingredients.getNewId();

        let ingredient = new Ingredient(id, mixTime, mixSpeed, x, y, red, green, blue, structure, colorType);
        this.ingredients.add(ingredient);
        this.createIngredient(ingredient);
    }
}