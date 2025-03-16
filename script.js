//your JS code here. If required.
const video = document.getElementById('video');
        const audio = document.getElementById('audio');
        const playButton = document.querySelector('.play');
        const timeDisplay = document.querySelector('.time-display');
        const timeButtons = document.querySelectorAll('#time-select button');
        const soundButtons = document.querySelectorAll('.sound-picker button');

        let duration = 600;
        let timer;
        
        playButton.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                video.play();
                playButton.textContent = 'Pause';
                startTimer();
            } else {
                audio.pause();
                video.pause();
                playButton.textContent = 'Play';
                clearInterval(timer);
            }
        });
        
        timeButtons.forEach(button => {
            button.addEventListener('click', () => {
                duration = parseInt(button.getAttribute('data-time'));
                updateTimeDisplay();
            });
        });
        
        soundButtons.forEach(button => {
            button.addEventListener('click', () => {
                video.src = button.getAttribute('data-video');
                audio.src = button.getAttribute('data-sound');
                video.play();
                audio.play();
                playButton.textContent = 'Pause';
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
                    playButton.textContent = 'Play';
                }
            }, 1000);
        }
        
        function updateTimeDisplay(time = duration) {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }