
export class PotView {

    addPots(pots) {
        pots.forEach(pot => this.addPot(pot));
    }

    addPot(pot) {
        let machineList = document.getElementById('drag-drop-field');

        let potElement = document.createElement('div');
        potElement.classList.add('pot');
        potElement.style.left = pot.x + '%';
        potElement.style.top = pot.y + '%';

        potElement.dataset.id = pot.id;

        machineList.appendChild(potElement);

        return potElement;
    }
    _getPotElement(x, y){
        // TODO geeft het hele element terug met visuals en position en class
    }

    movePotToMachine(potId, machineId) {
        const potElement = document.querySelector(`.pot[data-id="${potId}"]`);
        const machineElement = document.querySelector(`.machine[data-id="${machineId}"]`);

        if (potElement && machineElement) {
            machineElement.appendChild(potElement);
        }
    }

    getPots(){
        let pots = document.getElementsByClassName("pot");
        return Array.from(pots);
    }
}
