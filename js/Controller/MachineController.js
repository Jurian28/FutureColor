import { Machine } from "../Model/Machine.js";
import { MachineView } from "../View/MachineView.js";
import {DragDropController} from "./DragDropController.js";
import {Machines} from "../Model/Machines.js";

export class MachineController {
    machineView = new MachineView();

    constructor() {
        let createForm = document.getElementById('create-machine-form');
        createForm.addEventListener('submit', (event) => { this.addNewMachine(event); });

        this.machines = new Machines();
        for(let machine of this.machines.machines){
            this.createMachine(machine);
        }
    }

    createMachine(machine){

        let machineElement = this.machineView.addMachine(machine);

        let dragDropController = new DragDropController(machineElement, (machineElement, x, y, event) => {
            let id = parseInt(machineElement.dataset.id);
            this.machines.updatePosition(id, x, y);
        })
    }

    addNewMachine(event) {
        event.preventDefault();

        let createForm = document.getElementById('create-machine-form');
        let speed = createForm.elements["speed"].value;
        let time = createForm.elements["time"].value;
        let x = 50;
        let y = 50; // middle of the screen (percentage)
        const id = this.machines.getNewId();

        let machine = new Machine(id, speed, time, x, y);
        this.machines.add(machine);
        this.createMachine(machine);
    }
}