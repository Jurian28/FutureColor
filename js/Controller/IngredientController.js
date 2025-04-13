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
        // for(let ingredient of this.ingredients.ingredients){
        //     this.createIngredient(ingredient);
        // }
        for(let ingredient of this.ingredients.ingredients){
            if (ingredient.inPotId === -1) {
                this.createIngredient(ingredient);
            } else {
                this.createIngredientInPot(ingredient);
            }
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

            let potId = this.potController.potCollidesWith(ingredientElement);
            if (potId !== -1) {
                if(this.potController.pots.find(potId).ingredients[0] === undefined || ingredient.mixSpeed === this.potController.pots.find(potId).ingredients[0].mixSpeed) {
                    dragDropController.destroy();
                    this.addIngredientToPot(potId, id);
                    return;
                } else {
                    alert("dit ingrediënt heeft een andere mengsnelheid dan de rest van de ingrediënten in deze pot");
                    return;
                }
            }

            this.ingredients.updatePosition(id, x, y);
        })
    }

    addIngredientToPot(potId, ingredientId) {
        this.ingredients.addIngredientToPot(potId, ingredientId);
        this.ingredientView.moveIngredientToPot(ingredientId, potId);

        let ingredient = this.ingredients.find(ingredientId);
        this.potController.addIngredientToPot(potId, ingredient);
    }

    createIngredientInPot(ingredient) {
        this.ingredientView.addIngredient(ingredient);
        this.ingredientView.moveIngredientToPot(ingredient.id, ingredient.inPotId);
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
            red = parseInt(createForm.elements["red"].value);
            green = parseInt(createForm.elements["green"].value);
            blue = parseInt(createForm.elements["blue"].value);
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