import { PotController } from "./Controller/PotController.js";
import { MachineController } from "./Controller/MachineController.js";
import { IngredientController } from "./Controller/IngredientController.js";

let machineController = new MachineController();
let potController = new PotController(machineController);
let ingredientController = new IngredientController(potController);
