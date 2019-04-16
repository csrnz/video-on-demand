/**
 * A class to initialise the application
 */
class Main {

    /** The API URL */
    apiVideoList = 'https://demo2697834.mockable.io/movies';

    /**
     * Main application init
     */
    constructor() {

        this.init();
    }

    /**
     * Load API data in async function and display the carousel after loading
     */
    async init() {

        // Fetch API data
        let apiVideoData = await this.fetchVideoList();

        // Load the data into the carousel
        new Carousel(apiVideoData);
    }

    /**
     * Fetch the list of videos to be rendered in the carousel
     */
    async fetchVideoList() {

        // Get the API data and convert it from JSON
        const response = await fetch(this.apiVideoList);
        const data = await response.json();

        return data;
    }
}

// Start app
var app = new Main();
