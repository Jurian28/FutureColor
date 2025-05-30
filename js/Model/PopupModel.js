
export class PopupModel {
    calculateColors(color) {
        let [r, g, b] = this.getRgbFromText(color);
        let [ color1, color2 ] = this.getTriadicColors(r, g, b);

        let [colorText1, colorText2] = this.getTextFromRgb(color1, color2);
        return [ colorText1, colorText2 ];
    }

    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h *= 60;
        }

        return [h, s, l];
    }
    hslToRgb(h, s, l) {
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        let r, g, b;

        if (h < 60) [r, g, b] = [c, x, 0];
        else if (h < 120) [r, g, b] = [x, c, 0];
        else if (h < 180) [r, g, b] = [0, c, x];
        else if (h < 240) [r, g, b] = [0, x, c];
        else if (h < 300) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];

        return [
            Math.round((r + m) * 255),
            Math.round((g + m) * 255),
            Math.round((b + m) * 255)
        ];
    }

    getTriadicColors(r, g, b) {
        let [h, s, l] = this.rgbToHsl(r, g, b);
        const h1 = (h + 120) % 360;
        const h2 = (h + 240) % 360;

        const color1 = this.hslToRgb(h1, s, l);
        const color2 = this.hslToRgb(h2, s, l);

        return [color1, color2];
    }

    getRgbFromText(color) {
        let result = color.slice(4, -1);
        let [r, g, b] = result.split(",").map(Number);
        return [r, g, b];
    }
    getTextFromRgb(color1, color2) {
        let r1 = color1[0];
        let g1 = color1[1];
        let b1 = color1[2];

        let r2 = color2[0];
        let g2 = color2[1];
        let b2 = color2[2];

        let textColor1 = "rgb(" + r1 +", " + g1 + ", " + b1 + ")";
        let textColor2 = "rgb(" + r2 +", " + g2 + ", " + b2 + ")";
        return [textColor1, textColor2];
    }

    getFormattedHSL(rgb) {
        let [h, s, l] = this.rgbToHsl(rgb[0], rgb[1], rgb[2])

        const hRounded = Math.round(h);
        const sPercent = Math.round(s * 100);
        const lPercent = Math.round(l * 100);
        return `${hRounded}, ${sPercent}%, ${lPercent}%`;
    }
}