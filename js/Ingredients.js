import { PotController } from "./Controller/PotController.js";
import { MachineController } from "./Controller/MachineController.js";
import { IngredientController } from "./Controller/IngredientController.js";

let potController = new PotController();
let ingredientController = new IngredientController(potController);
let machineController = new MachineController();
