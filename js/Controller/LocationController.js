import { WeatherApi } from "../Model/WeatherApi.js";

export class LocationController {
    weatherApi = new WeatherApi("Amsterdam");

    constructor() {
        let button = document.getElementById('location-button');
        let input = document.getElementById('location-input');
        let display = document.getElementById('location-display');
        display.textContent = 'Locatie: Amsterdam'; // default waarde van hierboven


        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const location = input.value.trim();
            let successful = await this.weatherApi.setLocation(location);
            if (successful) {
                display.textContent = `Locatie: ${location}`;
            } else {
                display.textContent = 'Locatie niet gevonden';
            }
        });
    }
}