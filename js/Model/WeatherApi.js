export class WeatherApi {
    constructor(location) {
        this.location = location;
    }

    async setLocation(location) {
        if (await this.checkLocation(location)) {
            this.location = location;
            return true;
        }
        return false;
    }

    async checkLocation(location) {
        try {
            const response = await fetch(`https://wttr.in/${location}?land=en`);
            const data = await response.text();

            return !data.includes("404");

        } catch (error) {
            return false;
        }
    }

    async getWeatherCondition() {
        try {
            let result = await fetch(`https://wttr.in/${this.location}?lang=en&format=%C`) // gets the name of the weather condition
            return await result.text();
        } catch (error) {
            console.error("an error occurred", error);
            return "";
        }
    }

    async isRainingOrSnowing() {
        let weather = await this.getWeatherCondition();
        let normalizedWeather = weather.toLowerCase();

        return (normalizedWeather.includes('rain') ||
            normalizedWeather.includes('drizzle') ||
            normalizedWeather.includes('sleet') ||
            normalizedWeather.includes('hail') ||
            normalizedWeather.includes('thunderstorm') ||
            normalizedWeather.includes('snow'));
    }

    async getTemp() {
        try {
            let result = await fetch(`https://wttr.in/${this.location}?lang=en&format=%t`);
            let data = await result.text();
            return parseInt(data);
        } catch (error) {
            console.error("an error occurred", error);
            return 0;
        }
    }
}