/**
 * Carousel functionality
 */
class Carousel {

    /** The downloaded API data */
    apiVideoData = null;

    /**
     * Init
     */
    constructor(apiVideoData) {

        // Store data to use later
        this.apiVideoData = apiVideoData;

        // Initialise functionality
        this.renderVideoListCarousel();
        this.addVideoClickHandlers();
        this.addRightSlideButtonHandler();
        this.addLeftSlideButtonHandler();
    }

    /**
     * Render the video list
     */
    renderVideoListCarousel() {

        // Cache selector
        const carousel = document.querySelector('.carousel');
        const movieTemplate = document.querySelector('.movie-template');

        // Create a temp fragment to store the elements while looping
        let docFragment = document.createDocumentFragment();

        // Loop through the list of videos
        this.apiVideoData.entries.forEach((video, index) => {

            // Clone the template
            let movieTemplateClone = document.importNode(movieTemplate.content, true);

            // Get the image and title elements
            let movieItem = movieTemplateClone.querySelector('.movie-item');
            let movieImage = movieTemplateClone.querySelector('.movie-image');
            let movieTitle = movieTemplateClone.querySelector('.movie-title');

            // Set the image and title details
            movieItem.setAttribute('title', video.title + ': ' + video.description);
            movieItem.setAttribute('data-video-index', index || 0);
            movieImage.setAttribute('alt', video.description || 'N/A');            
            movieImage.setAttribute('height', video.images[0].height || 317);
            movieImage.setAttribute('src', video.images[0].url || 'img/default-poster.jpeg');
            movieImage.setAttribute('width', video.images[0].width || 214);
            movieTitle.textContent = video.title || 'N/A';
                        
            // Add to document fragment
            docFragment.appendChild(movieTemplateClone);
        });

        // Append all movie listings into the DOM at once
        carousel.appendChild(docFragment);
    }

    /**
     * Add the click handlers for the video
     */
    addVideoClickHandlers() {

        // Get all the video elements
        let videos = document.querySelectorAll('.movie-item');

        // For each video add a click handler
        videos.forEach(element => element.addEventListener('click', event => {

            // Get the index of the video in the apiVideoData.entries array and the data
            let videoIndex = element.getAttribute('data-video-index');
            var videoData = this.apiVideoData.entries[videoIndex];

            // Play that video
            new VideoPlayer(videoData);
        }));
    }

    /**
     * Add the right arrow button click handler to scroll right on the carousel
     */
    addRightSlideButtonHandler() {

        let carouselContainer = document.querySelector('.carousel-container');
        let rightSlideButton = carouselContainer.querySelector('.slide-button.right');
        let carousel = carouselContainer.querySelector('.carousel');

        // On Right arrow button click
        rightSlideButton.addEventListener('click', event => {

            // Scroll almost one screen across (measuring viewport width)
            let posterWidth = 214;
            let scrollLength = Math.floor(document.documentElement.clientWidth / posterWidth) * posterWidth;
            let currentScrollPosition = carousel.scrollLeft;

            // Smooth scroll
            carousel.scroll({
                left: currentScrollPosition + scrollLength,
                behavior: 'smooth'
            });

            // Prevent clicking behind which would play the movie
            event.preventDefault();
        });
    }

    /**
     * Add the left arrow button click handler to scroll left on the carousel
     */
    addLeftSlideButtonHandler() {

        let carouselContainer = document.querySelector('.carousel-container');
        let leftSlideButton = carouselContainer.querySelector('.slide-button.left');
        let carousel = carouselContainer.querySelector('.carousel');

        // On Right arrow button click
        leftSlideButton.addEventListener('click', event => {

            // Scroll back almost one screen across (measuring viewport width)
            let posterWidth = 214;
            let scrollLength = Math.floor(document.documentElement.clientWidth / posterWidth) * posterWidth;
            let currentScrollPosition = carousel.scrollLeft;
            let newScrollPosition = currentScrollPosition - scrollLength;
            
            // Don't allow negative scroll position
            if (newScrollPosition < 0) {
                newScrollPosition = 0;
            }

            // Smooth scroll
            carousel.scroll({
                left: newScrollPosition,
                behavior: 'smooth'
            });

            // Prevent clicking behind which would play the movie
            event.preventDefault();
        });
    }
}
