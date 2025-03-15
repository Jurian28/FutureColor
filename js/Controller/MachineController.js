import { Machine } from "../Model/Machine.js";
import { MachineView } from "../View/MachineView.js";
import {DragDropController} from "./DragDropController.js";
import {Machines} from "../Model/Machines.js";
import {MixingHallSwitchView} from "../View/MixingHallSwitchView.js";

export class MachineController {
    machineView = new MachineView();
    mixingHallView = new MixingHallSwitchView();
    currentHall = 1;

    constructor() {
        document.getElementById('mixingHall1').addEventListener('click', () => { this.switchMixingHall(1) })
        document.getElementById('mixingHall2').addEventListener('click', () => { this.switchMixingHall(2) })

        let createForm = document.getElementById('create-machine-form');
        createForm.addEventListener('submit', (event) => { this.addNewMachine(event); });

        this.machines = new Machines();
        for(let machine of this.machines.getMachines(this.currentHall)){
            this.createMachine(machine);
        }
    }

    switchMixingHall(number) {
        this.currentHall = number;
        this.machineView.clear();

        for(let machine of this.machines.getMachines(this.currentHall)) {
            this.createMachine(machine);
        }

        this.mixingHallView.setCurrentMixingHall(number);

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
        let speed = createForm.elements["machine-speed"].value;
        let time = createForm.elements["machine-time"].value;
        let x = 50;
        let y = 50; // middle of the screen (percentage)
        let id = this.machines.getNewId();

        let machine = new Machine(id, speed, time, x, y, this.currentHall);
        this.machines.add(machine);
        this.createMachine(machine);
    }
}