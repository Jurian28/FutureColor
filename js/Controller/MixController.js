export class MixController {
    constructor(potController) {
        this.potController = potController;
    }

    mixKorrel(ingredientElement, mixTime, mixSpeed, potsModel, pot, potElement ) {
        let repeat = 0;
        let offsetTop = ingredientElement.offsetTop;
        let offsetLeft = ingredientElement.offsetLeft;
        setInterval(function() {
            if(repeat >= mixTime/4) {
                clearInterval();
                ingredientElement.remove();
                potsModel.updateMachineId(pot.id,-1);
                //potElement.style.position = "absolute";
                //document.getElementById("drag-drop-field").appendChild(potElement);

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
                repeat++;
            }
        }, mixSpeed);
    }

    mixGroveKorrel(ingredientElement, mixTime, mixSpeed, potsModel, pot, potElement) {
        let repeat = 0;
        let offsetTop = ingredientElement.offsetTop;
        let offsetLeft = ingredientElement.offsetLeft;
        let offsetheight = 25;
        setInterval(function() {
            if(repeat >= mixTime/4) {
                clearInterval();
                ingredientElement.remove();
                potsModel.updateMachineId(pot.id,-1);
                //potElement.style.position = "absolute";
                //document.getElementById("drag-drop-field").appendChild(potElement);

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
        }, mixSpeed);
    }

    mixGlad(ingredientElement, mixTime, mixSpeed, potsModel, pot, potElement) {
        let repeat = 0;
        let offsetTop = ingredientElement.offsetTop;
        let offsetLeft = ingredientElement.offsetLeft;
        let offsetheight = 25;
        let offsetwidth = 25;
        setInterval(function() {
            if(repeat >= mixTime/4) {
                clearInterval();
                ingredientElement.remove();
                potsModel.updateMachineId(pot.id,-1);
                //potElement.style.position = "absolute";
                //document.getElementById("drag-drop-field").appendChild(potElement);

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
        }, mixSpeed);
    }

    mixSlijmerig(ingredientElement, mixTime, mixSpeed, potsModel, pot, potElement) {
        let repeat = 0;
        let offsetTop = ingredientElement.offsetTop;
        let offsetLeft = ingredientElement.offsetLeft;
        let offsetwidth = 25;
        setInterval(function() {
            if(repeat >= mixTime/4) {
                clearInterval();
                ingredientElement.remove();
                potsModel.updateMachineId(pot.id, -1);
                //potElement.style.position = "absolute";
                //document.getElementById("drag-drop-field").appendChild(potElement);

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
                    console.log(offsetwidth);
                    ingredientElement.style.width = offsetwidth + "%";
                    offsetwidth = offsetwidth + 1;
                }
                repeat++;
            }
        }, mixSpeed);
    }
}