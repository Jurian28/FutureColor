
export class MachineView {

    update(machines) {
        for (let machine of machines) {
            console.log(machine.speed, machine.time);
        }
        console.log("+===============+")
    }

}