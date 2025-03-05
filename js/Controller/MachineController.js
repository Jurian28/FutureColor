import { Machine } from "../Model/Machine.js";
import { MachineView } from "../View/MachineView.js";

export class MachineController {
    machines = [];
    machineView = new MachineView();

    constructor() {
        let createForm = document.getElementById('create-machine-form');
        createForm.addEventListener('submit', (event) => { this.createMachine(event); });
    }

    createMachine(event) {
        event.preventDefault();

        let createForm = document.getElementById('create-machine-form');
        let speed = createForm.elements["speed"].value;
        let time = createForm.elements["time"].value;

        let machine = new Machine(speed, time);
        this.machines.push(machine);

        this.machineView.update(this.machines);
    }
}