import { Pot } from "../Model/Pot.js";
import {Pots} from "../Model/Pots.js";
import { PotView } from "../View/PotView.js";
import {DragDropController} from "./DragDropController.js";
import {Machine} from "../Model/Machine.js";
import { IngredientsModel } from "../Model/IngredientsModel.js";
import { Ingredient } from "../Model/Ingredient.js";
import { MixedColor } from "../Model/MixedColor.js";
import { MixedColors } from "../Model/MixedColors.js";
import { MixController } from "../Controller/MixController.js";

export class PotController {
    potView = new PotView();

    constructor(machineController) {
        this.machineController = machineController;
        let createButton = document.getElementById('make-pot-button');
        createButton.addEventListener('click', () => { this.addNewPot(); });

        this.ingredientsModel = new IngredientsModel();

        this.pots = new Pots();
        for(let pot of this.pots.pots){
            if (pot.inMachineId === -1) {
                this.createPot(pot);
            } else {
                this.createPotInMachine(pot);
            }
        }
    }

    createPot(pot){
        let potElement = this.potView.addPot(pot);

        let dragDropController = new DragDropController(potElement, (potElement, x, y, event) => {
            let id = parseInt(potElement.dataset.id);

            let machineId = this.machineController.machineCollidesWith(potElement);

            if(this.machineController.machines.find(machineId) !== undefined) {
                if(this.machineController.machines.find(machineId).pot !== null) {
                    alert("Er zit al een pot in deze machine");
                }
            }

            if ((this.machineController.machines.find(machineId) === undefined || this.machineController.machines.find(machineId).pot === null) && machineId !== -1) {
                dragDropController.destroy();
                this.addPotToMachine(machineId, id);
                return;
            }

            if (x >= 50) {
                dragDropController.moveBack();
                return;
            }

            this.pots.updatePosition(id, x, y);

        })
    }

    addNewPot() {
        let x = 50;
        let y = 50; // middle of the screen (percentage)
        const id = this.pots.getNewId();

        let pot = new Pot(id, x, y);
        this.pots.add(pot);
        this.createPot(pot);
    }


    addPotToMachine(machineId, potId) {
        this.pots.addPotToMachine(machineId, potId);
        this.potView.movePotToMachine(potId, machineId);

        let pot = this.pots.find(potId);
        this.machineController.addPotToMachine(machineId, pot);
        this.mix(pot);
    }

    createPotInMachine(pot) {
        this.potView.addPot(pot);
        this.potView.movePotToMachine(pot.id, pot.inMachineId);
    }

    potCollidesWith(ingredientElement){
        for(let potElement of this.potView.getPots()) {
            const rect1 = ingredientElement.getBoundingClientRect();
            const rect2 = potElement.getBoundingClientRect();

            const verticalMatch = rect2.top < rect1.bottom && rect2.bottom > rect1.top;
            const horizontalMatch = rect2.left < rect1.right && rect2.right > rect1.left;

            if (verticalMatch && horizontalMatch) {
                return Number(potElement.dataset.id);
            }
        }
        return -1
    }

    addIngredientToPot(potId, ingredient) {
        this.pots.addIngredientToPot(potId, ingredient);
        this.pots.updateColorAndMixTime(potId, ingredient);
    }

    mix(pot) {
        if(pot.colorAmount > 0) {
            let ingredient = new Ingredient(this.ingredientsModel.getNewId(), pot.mixTime, pot.mixSpeed, 50, 50, pot.red, pot.green, pot.blue, "korrel", "RGB", pot.id);
            this.ingredientsModel.getIngredients();
            let ingredientElements = [...document.getElementsByClassName("ingredient")];

            let parentElements = [...document.getElementsByClassName("pot")];
            let parentElement;
            parentElements.forEach(element => {
                if(element.dataset.id === String(pot.id)) {
                    parentElement = element;
                }
            });

            this.animate(parentElement, ingredientElements, pot);

            this.ingredientsModel.add(ingredient);

            this.ingredientsModel.saveIngredients();

            //this.pots.updateMixTime(pot.id);

            let mixedColors = new MixedColors();
            let mixedColor = new MixedColor(mixedColors.getNewId(), 50, 50, pot.red, pot.green, pot.blue);
            console.log("mixedColor = " + mixedColor);
            mixedColors.getMixedColors();
            mixedColors.add(mixedColor);
        } else {
            alert("er zit geen ingrediënt in de pot");
        }
    }

    animate(parentElement, ingredientElements, pot) {
        let mixController = new MixController(this);
        let length = this.ingredientsModel.ingredients.length;

        let removeIndexes = [];

        parentElement.style.position = "relative";

        for (let i = 0; i < length; i++) {
            let ingredientModel = this.ingredientsModel.ingredients[i];
            if(ingredientModel.inPotId == pot.id) { 
                let ingredientElement;
                for(let j = 0; j < ingredientElements.length; j++) {
                    if(parseInt(ingredientElements[j].dataset.id) === ingredientModel.id) {
                        ingredientElement = ingredientElements[j]; 
                        if(ingredientModel.structure === "korrel") {
                            mixController.mixKorrel(ingredientElement, pot.mixTime, pot.mixSpeed, this.pots, pot, parentElement);
                        } else if(ingredientModel.structure === "grove_korrel") {
                            mixController.mixGroveKorrel(ingredientElement, pot.mixTime, pot.mixSpeed, this.pots, pot, parentElement);
                        } else if(ingredientModel.structure === "glad") {
                            mixController.mixGlad(ingredientElement, pot.mixTime, pot.mixSpeed, this.pots, pot, parentElement);
                        } else {
                            mixController.mixSlijmerig(ingredientElement, pot.mixTime, pot.mixSpeed, this.pots, pot, parentElement);
                        }

                        let repeat = 0;
                        let interval = setInterval(function() {
                            if(repeat >= pot.mixTime/4) {
                                clearInterval(interval);
                                let test = document.createElement("div");
                                test.setAttribute("class", "ingredient");
                                test.style.backgroundColor = 'rgb(' + pot.red + ',' + pot.green + ',' + pot.blue + ')';
                                test.style.top = "40%";
                                test.style.left = "40%";

                                parentElement.appendChild(test);
                            } else {
                                repeat++;
                            }
                        }, pot.mixSpeed);
                        console.log(ingredientElements[j].dataset.id);
                        removeIndexes.push(ingredientElements[j].dataset.id);
                    }
                }
                //removeIndexes.push(i);
            }
        }

        for(let i = 0; i < removeIndexes.length; i++) {
            console.log("removeIndexes " + i + " " + removeIndexes[i] + " length = " + removeIndexes.length);
            // let removeIndex = this.ingredientsModel.find(parseInt(removeIndexes[i]));
            // console.log(removeIndex);
            this.ingredientsModel.ingredients.splice(removeIndexes[i]);
            // for(let j = 0; j < this.ingredientsModel.ingredients.length; j++) {
            //     if(this.ingredientsModel.ingredients[j].id === parseInt(removeIndexes[i])) {
            //     console.log("somet");
            //     this.ingredientsModel.ingredients.splice(j);
            //}
        }

        console.log(this.ingredientsModel.ingredients);
    }
}
