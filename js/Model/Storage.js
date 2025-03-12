
export class StorageModel {
    static getData(key) {
        const data = localStorage.getItem(key);
        try {
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error(`Error parsing data from localStorage (${key}):`, error);
            return [];
        }
    }

    static saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Error saving data to localStorage (${key}):`, error);
        }
    }

    static clearData(key) {
        localStorage.removeItem(key);
    }

    static clearAllData() {
        localStorage.clear();
    }
}