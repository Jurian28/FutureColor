
export class MixingHallSwitchView {
    setCurrentMixingHall(number) {
        let mixingHallNav = document.getElementById('mixinghallnav')

        for (let button of mixingHallNav.children) {
            button.classList.remove('active');
        }

        document.getElementById('mixingHall' + number).classList.add('active');
    }
}