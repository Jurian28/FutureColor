import { Machine } from "../Model/Machine.js";
import { MachineView } from "../View/MachineView.js";
import {DragDropController} from "./DragDropController.js";
import {Machines} from "../Model/Machines.js";
import {MixingHallSwitchView} from "../View/MixingHallSwitchView.js";

export class MachineController {
    machineView = new MachineView();
    mixingHallView = new MixingHallSwitchView();
    currentHall = 1;

    constructor(mixController) {
        document.getElementById('mixingHall1').addEventListener('click', () => { this.switchMixingHall(1) })
        document.getElementById('mixingHall2').addEventListener('click', () => { this.switchMixingHall(2) })

        let createForm = document.getElementById('create-machine-form');
        createForm.addEventListener('submit', (event) => { this.addNewMachine(event); });

        this.machines = new Machines();
        for(let machine of this.machines.getMachines(1)){
            this.createMachine(machine, 1);
        }

        for(let machine of this.machines.getMachines(2)){
            this.createMachine(machine, 2);
        }
    }


    switchMixingHall(number) { this.currentHall = number;
        this.machineView.clear();

        // for(let machine of this.machines.getMachines(this.currentHall)) {
        //     this.createMachine(machine);
        // }

        let machines = [...document.getElementsByClassName("machine")];
        machines.forEach(machineElement => {
            for(let machine of this.machines.getMachines(this.currentHall)) {
                console.log(machine.id);
                if(machineElement.dataset.id === String(machine.id)) {
                    machineElement.style.display = "block";
                }
            }
        });

        this.mixingHallView.setCurrentMixingHall(number);

    }

    createMachine(machine, mixingHall){

        let machineElement = this.machineView.addMachine(machine);
        if(mixingHall === 2) {
            console.log("nummer 2");
            machineElement.style.display = "none";
        }

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

    machineCollidesWith(potElement){
        for(let machineElement of this.machineView.getMachines()) {
            const rect1 = potElement.getBoundingClientRect();
            const rect2 = machineElement.getBoundingClientRect();

            const verticalMatch = rect2.top < rect1.bottom && rect2.bottom > rect1.top;
            const horizontalMatch = rect2.left < rect1.right && rect2.right > rect1.left;

            if (verticalMatch && horizontalMatch) {
                return Number(machineElement.dataset.id);
            }
        }
        return -1
    }

    addPotToMachine(machineId, pot) {
        this.machines.addPotToMachine(machineId, pot);
    }
}