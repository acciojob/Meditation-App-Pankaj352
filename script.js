const video = document.getElementById("video");
const audio = document.getElementById("audio");
const playButton = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll(".time-button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600;
let timer;
let playing = false;

// Ensure media loads correctly
audio.onerror = () => console.error("Error loading audio file");
video.onerror = () => console.error("Error loading video file");

playButton.addEventListener("click", () => {
    if (!playing) {
        if (audio.readyState >= 2 && video.readyState >= 2) { // Ensure media is ready
            audio.play();
            video.play();
            playButton.textContent = "Pause";
            startTimer();
            playing = true;
        } else {
            console.error("Media not ready to play.");
        }
    } else {
        audio.pause();
        video.pause();
        playButton.textContent = "Play";
        clearInterval(timer);
        playing = false;
    }
});

timeButtons.forEach(button => {
    button.addEventListener("click", () => {
        duration = parseInt(button.getAttribute("data-time"));
        updateTimeDisplay();
    });
});

soundButtons.forEach(button => {
    button.addEventListener("click", () => {
        video.src = button.getAttribute("data-video");
        audio.src = button.getAttribute("data-sound");

        // Reload and play new media
        video.load();
        audio.load();
        video.oncanplaythrough = () => video.play();
        audio.oncanplaythrough = () => audio.play();

        playButton.textContent = "Pause";
        playing = true;
        startTimer();
    });
});

function startTimer() {
    clearInterval(timer);
    let timeLeft = duration;
    updateTimeDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimeDisplay(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timer);
            audio.pause();
            video.pause();
            playButton.textContent = "Play";
            playing = false;
        }
    }, 1000);
}

function updateTimeDisplay(time = duration) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
