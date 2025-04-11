import { IngredientController } from "../Controller/IngredientController.js";
import { Pot } from "../Model/Pot.js";
import {Pots} from "../Model/Pots.js";
import { PotView } from "../View/PotView.js";
import {DragDropController} from "./DragDropController.js";

export class PotController {
    potView = new PotView();

    constructor() {
        let createButton = document.getElementById('make-pot-button');
        createButton.addEventListener('click', () => { this.addNewPot(); });

        this.pots = new Pots();
        for(let pot of this.pots.pots){
            this.createPot(pot);
        }
    }

    createPot(pot){

        let potElement = this.potView.addPot(pot);

        let dragDropController = new DragDropController(potElement, (potElement, x, y, event) => {
            let id = parseInt(potElement.dataset.id);

            // Check if the mouse position is within the 'machines' element
            if (x >= 50) { // behlave als die een machine raakt!!! TODO
                dragDropController.moveBack();
                return;
            }

            this.pots.updatePosition(id, x, y);

        })
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

        console.log(verticalMatch, horizontalMatch);
        
        if (horizontalMatch && verticalMatch){
          return true;
        } else {
          return false;
        }
    }

    addNewPot() {
        let x = 50;
        let y = 50; // middle of the screen (percentage)
        const id = this.pots.getNewId();

        let pot = new Pot(id, x, y);
        this.pots.add(pot);
        this.createPot(pot);
    }
}
