
export class MachineView {
    addMachines(machines) {
        machines.forEach(machine => this.addMachine(machine));
    }
    addMachine(machine) {
        let machineList = document.getElementById('machines');

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

    clear() {
        let machineList = document.getElementById('machines');
        //machineList.innerHTML = '';
         let machines = [...document.getElementsByClassName("machine")];
         machines.forEach(machine => {
             machine.style.display = "none";
         });
    }

    getMachines(){
        return document.getElementById('machines').children;
    }
}