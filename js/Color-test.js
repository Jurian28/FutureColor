import { ColorTestController } from "./Controller/ColorTestController.js";
import { PopupController } from "./Controller/PopupController.js";

let popupController = new PopupController();
let colorTestController = new ColorTestController(popupController);