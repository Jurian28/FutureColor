
export class ColorTestView {
    generateGrid(maxX, maxY) {
        let id = 0
        for(let y = 0; y < maxY; y++) {
            let tileDiv = document.getElementById("grid-div");
            let tileRow = document.createElement("div");
            tileRow.classList.add("grid-row");
            tileDiv.appendChild(tileRow);

            for(let x = 0; x < maxX; x++) {
                let tile = document.createElement("div");
                //tile.style.position = "absolute";
                tile.classList.add("tile");
                tile.style.height = 100 + "px";
                tile.style.width = 100 + "px";
                tile.style.border = 5 + "px" + " solid" + " black";
                tile.dataset.id = id;
                tileRow.appendChild(tile);
                id++;
            }
        }
    }

    updateColor(tileElement, mixedColor) {
        tileElement.style.backgroundColor = 'rgb(' + mixedColor.red + ',' + mixedColor.green + ',' + mixedColor.blue + ')';
    }

    clearGrid() {
        let tileDiv = document.getElementById("grid-div");
        tileDiv.innerHTML = "";
    }

    addColor(color) {
        let colorDiv = document.createElement("div");
        //colorDiv.style.position = "absolute";
        colorDiv.style.height = 75 + "px";
        colorDiv.style.width = 75 + "px";
        //colorDiv.style.x = color.x + 'px';
        //colorDiv.style.y = color.y + 'px';
        colorDiv.style.left = color.x + '%';
        colorDiv.style.top = color.y + '%';
        colorDiv.style.backgroundColor = 'rgb(' + color.red + ',' + color.green + ',' + color.blue + ')';
        colorDiv.dataset.id = color.id;
        let mixedColorsDiv = document.getElementById("mixed-colors");
        mixedColorsDiv.appendChild(colorDiv);

        return colorDiv;
    }

    moveMixedColor(colorDiv, x, y) {
        colorDiv.style.left = x + '%';
        colorDiv.style.top = y + '%';
    }
}