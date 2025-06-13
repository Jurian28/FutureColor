import {StorageModel} from "./Storage.js";

export class Pot {
    constructor(id, x, y, inMachineId = -1, red = 0, green = 0, blue = 0, colorAmount = 0, mixTime = 0, mixSpeed) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.ingredients = [];
        this.inMachineId = inMachineId;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.colorAmount = colorAmount;
        this.mixTime = mixTime;
        this.mixSpeed = mixSpeed;
        this.totalRed = 0;
        this.totalBlue = 0;
        this.totalGreen = 0;
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
    }

    addToMachine(machineId){
        this.inMachineId = machineId;
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }

    updateColorAndMixTime(red, green, blue, mixTime, mixSpeed, colorType) {
        this.colorAmount = this.colorAmount + 1;
        if(colorType == "HSL") {
            let rgbarray = this.HSLToRGB(red, green, blue);
            this.totalRed = this.totalRed + rgbarray[0];
            this.totalGreen = this.totalGreen + rgbarray[1];
            this.totalBlue = this.totalBlue + rgbarray[2];
            this.red = this.totalRed /this.colorAmount;
            this.green = this.totalGreen /this.colorAmount;
            this.blue = this.totalBlue /this.colorAmount;
        } else {
            this.totalRed = this.totalRed + red;
            this.totalBlue = this.totalBlue + blue;
            this.totalGreen = this.totalGreen + green;
            this.red = this.totalRed /this.colorAmount;
            this.green = this.totalGreen /this.colorAmount;
            this.blue = this.totalBlue /this.colorAmount;
        }
        if(this.mixTime < mixTime) {
            this.mixTime = mixTime;
        }
        this.mixSpeed = mixSpeed;
        console.log("red = " + this.red + "blue = " + this.blue + "green = " + this.green + "coloramount = " + this.colorAmount);
    }

    removeOneColorAmount() {
        this.colorAmount = this.colorAmount - 1;
    }

    HSLToRGB = (h, s, l) => {
        s /= 100;
        l /= 100;
        const k = (n) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n) =>
          l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [255 * f(0), 255 * f(8), 255 * f(4)];
      };   

    // hslToRgb(h, s, l) {
    //     let r, g, b;
      
    //     if (s === 0) {
    //         r = g = b = l;
    //     } else {
    //         const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    //         const p = 2 * l - q;
    //         r = this.hueToRgb(p, q, h + 1/3);
    //         g = this.hueToRgb(p, q, h);
    //         b = this.hueToRgb(p, q, h - 1/3);
    //     }
    //     return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    // }

    // hueToRgb(p, q, t) {
    //     if (t < 0) t += 1;
    //     if (t > 1) t -= 1;
    //     if (t < 1/6) return p + (q - p) * 6 * t;
    //     if (t < 1/2) return q;
    //     if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    //     return p;
    //   }
}
