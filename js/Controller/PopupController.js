import { PopupView } from "../View/PopupView.js";
import { PopupModel } from "../Model/PopupModel.js";

export class PopupController {
    popupView = new PopupView();
    popupModel = new PopupModel();

    constructor() {
    }

    onClick(element, e) {
        let [color1, color2] = this.popupModel.calculateColors(element.style.backgroundColor);
        let rgb1 = this.popupModel.getRgbFromText(color1);
        let hsl1 = this.popupModel.getFormattedHSL(rgb1)
        let rgb2 = this.popupModel.getRgbFromText(color2);
        let hsl2 = this.popupModel.getFormattedHSL(rgb2)
        this.popupView.doPopup(color1, rgb1, hsl1, color2, rgb2, hsl2, e);
        this.removePopupOnMouseLeave(element);
    }

    addPopupOnClick(element) {
        element.addEventListener('click', (e) => {
            this.onClick(element, e);
        });
    }

    removePopupOnMouseLeave(element) {
        const colorPopupElement = document.getElementById('color-popup');

        function handleMouseLeave(event) {
            const relatedTarget = event.relatedTarget;

            // If mouse moved into either element or popup, do nothing
            if ( element.contains(relatedTarget) || colorPopupElement.contains(relatedTarget) ) {
                return;
            }

            colorPopupElement.style.visibility = 'hidden';

            element.removeEventListener('mouseleave', handleMouseLeave);
            colorPopupElement.removeEventListener('mouseleave', handleMouseLeave);
        }
        element.addEventListener('mouseleave', handleMouseLeave);
        colorPopupElement.addEventListener('mouseleave', handleMouseLeave);
    }
}