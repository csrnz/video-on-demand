/**
 * A class to render the video in an overlay
 */
class VideoPlayer {

    /**
     * Initialise the video player overlay
     * @param {Object} videoData The video meta data
     */
    constructor(videoData) {

        this.playVideo(videoData);
        this.initCloseButton();
    }

    /**
     * Show the video overlay and play the video
     */
    playVideo(videoData) {

        let videoOverlay = document.querySelector('.video-overlay');
        let video = videoOverlay.querySelector('.video');
        var source = document.createElement('source');

        // Get the video meta data
        let videoOptions = videoData.contents[0];

        // Show the video overlay
        videoOverlay.classList.add('visible');

        // Set options
        video.setAttribute('height', videoOptions.height);
        video.setAttribute('width', videoOptions.width);
        source.setAttribute('src', videoOptions.url);

        // Play the video
        video.appendChild(source);
        video.play();
    }

    /**
     * Initialise the Close button
     */
    initCloseButton() {

        let videoOverlay = document.querySelector('.video-overlay');
        let video = videoOverlay.querySelector('.video');
        let videoSource = videoOverlay.querySelector('source');
        let closeButton = videoOverlay.querySelector('.close-button');

        // On Close button click
        closeButton.addEventListener('click', event => {

            // Stop the video, remove the source and hide the overlay
            video.pause();
            videoSource.remove();
            videoOverlay.classList.remove('visible');
        });
    }
}
