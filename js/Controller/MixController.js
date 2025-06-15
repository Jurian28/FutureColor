export class MixController {
    constructor(potController) {
        this.potController = potController;
    }

    mixKorrel(ingredientElement, mixTime, potsModel, pot ) {
        let repeat = 0;
        let offsetTop = ingredientElement.offsetTop;
        let offsetLeft = ingredientElement.offsetLeft;
        let interval = setInterval(function() {
            console.log(mixTime);
            if(repeat >= mixTime/10) {
                clearInterval(interval);
                ingredientElement.remove();
                potsModel.updateMachineId(pot.id,-1);

            } else {
                if(offsetTop > 40) {
                    ingredientElement.style.top = offsetTop + "%";
                    offsetTop = offsetTop - 0.1;
                }
                if(offsetTop < 40) {
                    ingredientElement.style.top = offsetTop + "%";
                    offsetTop = offsetTop + 0.1;
                }
                if(offsetLeft > 40) {
                    ingredientElement.style.left = offsetLeft + "%";
                    offsetLeft = offsetLeft - 0.1;
                }
                if(offsetLeft < 40) {
                    ingredientElement.style.left = offsetLeft + "%";
                    offsetLeft = offsetLeft + 0.1;
                }
                repeat++;
            }
        }, 1);

    }

    mixGroveKorrel(ingredientElement, mixTime, potsModel, pot) {
        let repeat = 0;
        let offsetTop = ingredientElement.offsetTop;
        let offsetLeft = ingredientElement.offsetLeft;
        let offsetheight = 25;
        let interval = setInterval(function() {
            if(repeat >= mixTime/10) {
                clearInterval(interval);
                ingredientElement.remove();
                potsModel.updateMachineId(pot.id,-1);

            } else {
                if(offsetTop > 25) {
                    ingredientElement.style.top = offsetTop + "%";
                    offsetTop = offsetTop - 1;
                }
                if(offsetTop < 25) {
                    ingredientElement.style.top = offsetTop + "%";
                    offsetTop = offsetTop + 1;
                }
                if(offsetLeft > 40) {
                    ingredientElement.style.left = offsetLeft + "%";
                    offsetLeft = offsetLeft - 1;
                }
                if(offsetLeft < 40) {
                    ingredientElement.style.left = offsetLeft + "%";
                    offsetLeft = offsetLeft + 1;
                }
                if(offsetheight !== 50) {
                    ingredientElement.style.height = offsetheight + "%";
                    offsetheight = offsetheight + 1;
                }
                repeat++;
            }
        }, 1);
    }

    mixGlad(ingredientElement, mixTime, potsModel, pot) {
        let repeat = 0;
        let offsetTop = ingredientElement.offsetTop;
        let offsetLeft = ingredientElement.offsetLeft;
        let offsetheight = 25;
        let offsetwidth = 25;
        let interval = setInterval(function() {
            if(repeat >= mixTime/10) {
                clearInterval(interval);
                ingredientElement.remove();
                potsModel.updateMachineId(pot.id,-1);

            } else {
                if(offsetTop > 40) {
                    ingredientElement.style.top = offsetTop + "%";
                    offsetTop = offsetTop - 1;
                }
                if(offsetTop < 40) {
                    ingredientElement.style.top = offsetTop + "%";
                    offsetTop = offsetTop + 1;
                }
                if(offsetLeft > 40) {
                    ingredientElement.style.left = offsetLeft + "%";
                    offsetLeft = offsetLeft - 1;
                }
                if(offsetLeft < 40) {
                    ingredientElement.style.left = offsetLeft + "%";
                    offsetLeft = offsetLeft + 1;
                }
                if(offsetheight !== 50) {
                    ingredientElement.style.height = offsetheight + "%";
                    offsetheight = offsetheight + 1;
                }
                if(offsetwidth !== 50) {
                    ingredientElement.style.height = offsetwidth + "%";
                    offsetwidth = offsetwidth + 1;
                }
                repeat++;
            }
        }, 1);
    }

    mixSlijmerig(ingredientElement, mixTime, potsModel, pot) {
        let repeat = 0;
        let offsetTop = ingredientElement.offsetTop;
        let offsetLeft = ingredientElement.offsetLeft;
        let offsetwidth = 25;
        let interval = setInterval(function() {
            if(repeat >= mixTime) {
                clearInterval(interval/10);
                ingredientElement.remove();
                potsModel.updateMachineId(pot.id, -1);

            } else {
                if(offsetTop > 40) {
                    ingredientElement.style.top = offsetTop + "%";
                    offsetTop = offsetTop - 1;
                }
                if(offsetTop < 40) {
                    ingredientElement.style.top = offsetTop + "%";
                    offsetTop = offsetTop + 1;
                }
                if(offsetLeft > 25) {
                    ingredientElement.style.left = offsetLeft + "%";
                    offsetLeft = offsetLeft - 2;
                }
                if(offsetLeft < 25) {
                    ingredientElement.style.left = offsetLeft + "%";
                    offsetLeft = offsetLeft + 2;
                }
                if(offsetwidth !== 50) {
                    ingredientElement.style.width = offsetwidth + "%";
                    offsetwidth = offsetwidth + 1;
                }
                repeat++;
            }
        }, 1);
    }
}