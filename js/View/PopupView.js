export class PopupView {
    constructor() {
        this.popupElement = document.getElementById("color-popup");
        this.popupElement.style.visibility = 'hidden';
    }

    doPopup(color1, rgb1, hsl1, color2, rgb2, hsl2, e) {
        this.setColors(color1, color2);
        this.setText(rgb1, hsl1, rgb2, hsl2);
        this.moveToMouse(e);
        this.popupElement.style.visibility = 'visible';
    }

    setColors(color1, color2) {
        let colorElement1 = this.popupElement.querySelector("#popup-color-1 > div");
        let colorElement2 = this.popupElement.querySelector("#popup-color-2 > div");

        colorElement1.style.backgroundColor = color1;
        colorElement2.style.backgroundColor = color2;


    }

    moveToMouse(e) {
        this.popupElement.style.left = e.clientX + 'px';
        this.popupElement.style.top = e.clientY + 'px';
    }

    setText(rgb1, hsl1, rgb2, hsl2) {
        let textElement1 = this.popupElement.querySelector("#popup-color-1 > p");
        let textElement2 = this.popupElement.querySelector("#popup-color-2 > p");

        textElement1.innerHTML = "rgb(" + rgb1 + "), hsl(" + hsl1 + ")"
        textElement2.innerHTML = "rgb(" + rgb2 + "), hsl(" + hsl2 + ")"
    }
}

