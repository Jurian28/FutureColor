
export class MachineView {
    addMachines(machines) {
        machines.forEach(machine => this.addMachine(machine));
    }
    addMachine(machine) {
        let machineList = document.getElementById('machine-list');

        let machineElement = document.createElement('div');
        machineElement.classList.add('machine');
        machineElement.style.left = machine.x + '%';
        machineElement.style.top = machine.y + '%';

        machineElement.dataset.id = machine.id;

        machineList.appendChild(machineElement);

        return machineElement;
    }
    _getMachineElement(x, y){
        // TODO geeft het hele element terug met visuals en position en class
    }

// Method to calculate the new position of the machine in percentage
    moveMachine(machineElement, x, y) {
        let machineList = document.getElementById('machine-list');

        // Get the bounding rectangle of the machineList container to calculate position relative to it
        let machineListRect = machineList.getBoundingClientRect();

        // Calculate the new X and Y positions as percentages of the machineList container
        let newX = ((x - machineListRect.left) / machineListRect.width) * 100;
        let newY = ((y - machineListRect.top) / machineListRect.height) * 100;

        // Get the width and height of the machine element
        let machineWidth = machineElement.offsetWidth;
        let machineHeight = machineElement.offsetHeight;

        // Adjust the position by subtracting half of the width and height to center the element
        let centeredX = newX - (machineWidth / machineListRect.width) * 50;  // Center horizontally
        let centeredY = newY - (machineHeight / machineListRect.height) * 50; // Center vertically

        // Update the position of the machineElement on the screen
        machineElement.style.left = centeredX + '%';
        machineElement.style.top = centeredY + '%';
    }
}