import { ColorTestTile } from "../Model/ColorTestTile.js";
import { ColorTestGrid } from "../Model/ColorTestGrid.js";
import { ColorTestView } from "../View/ColorTestView.js";
import { MixedColor } from "../Model/MixedColor.js";
import { MixedColors } from "../Model/MixedColors.js";

export class ColorTestController {
    colorTestView = new ColorTestView();

    constructor() {
        let generateButton = document.getElementById("generate-button");
        generateButton.addEventListener('click', () => { this.createGrid(); });

        this.mixedColors = new MixedColors();
        this.grid = new ColorTestGrid();
        this.mixedColor = null;

        this.checkGrid();

        for(let mixedColor of this.mixedColors.mixedColors){
            this.addMixedColors(mixedColor);
        }

        this.checkGridColors();
    }

    selectGrid(tile) {
        console.log("i");
        document.body.style.cursor = 'auto';
        if(this.mixedColor != null) {
            this.grid.updateColor(tile.dataset.id, this.mixedColor);
            this.colorTestView.updateColor(tile, this.mixedColor);
            this.mixedColor = null;
            tile.removeEventListener('click', this.selectGrid());
        } else {
            return;
        }
    }

    addMixedColors(mixedColor) {
        let mixedColorElement = this.colorTestView.addColor(mixedColor);
        mixedColorElement.addEventListener('click', () => {this.selectColor(mixedColor);});
    }

    selectColor(mixedColor) {
        document.body.style.cursor = 'pointer';
        this.mixedColor = mixedColor;

        let tiles = document.getElementsByClassName("tile");
        let tilesArray = Array.from(tiles);

        for(let i = 0; i < tilesArray.length; i++) { 
            tilesArray[i].addEventListener('click', () => {this.selectGrid(tilesArray[i]);});
        }
    }

    checkGrid() {
        let x = this.grid.findMaxX();
        let y = this.grid.findMaxY();
        this.colorTestView.generateGrid(x+1,y+1);
    }

    checkGridColors() {
        let tiles = document.getElementsByClassName("tile");
        let tilesArray = Array.from(tiles);

        for(let i = 0; i < this.grid.grid.length; i++) {
            if(this.grid.grid[i].mixedColor != null) {
                this.colorTestView.updateColor(tilesArray[i], this.grid.grid[i].mixedColor);
            }
        }
    }

    clearGrid() {
        this.grid.clearGrid();
        this.grid.resetGrid();
        this.colorTestView.clearGrid();
    }

    createGrid() {
        let xValue = document.getElementById("x-grid").value; 
        let yValue = document.getElementById("y-grid").value; 

        this.clearGrid();
        for(let x = 0; x < xValue; x++) {
            for(let y = 0; y < yValue; y++) {
                const id = this.grid.getNewId();
                let tile = new ColorTestTile(id, x, y);
                this.grid.add(tile);
            }
        }

        this.colorTestView.generateGrid(xValue, yValue);
    }
}