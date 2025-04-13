import { Pot } from "../Model/Pot.js";
import {Pots} from "../Model/Pots.js";
import { PotView } from "../View/PotView.js";
import {DragDropController} from "./DragDropController.js";
import {Machine} from "../Model/Machine.js";

export class PotController {
    potView = new PotView();

    constructor(machineController) {
        this.machineController = machineController;
        let createButton = document.getElementById('make-pot-button');
        createButton.addEventListener('click', () => { this.addNewPot(); });

        this.pots = new Pots();
        for(let pot of this.pots.pots){
            console.log(pot.inMachineId);
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
            if (machineId !== -1) {
                console.log(machineId + " hallo papa");
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
    }

    createPotInMachine(pot) {
        console.log("hallo")
        this.potView.addPot(pot);
        this.potView.movePotToMachine(pot.id, pot.inMachineId);
        console.log("hallo2")
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
    }
}
