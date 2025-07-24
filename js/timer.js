// Timer class
class ExerciseTimer {
    constructor() {
        this.exerciseTime = 30; // Default: 30 seconds
        this.restTime = 15; // Default: 15 seconds
        this.currentTime = 0;
        this.timer = null;
        this.isRunning = false;
        this.isPaused = false;
        this.isExercisePhase = true; // true = exercise, false = rest
        this.currentExercise = null;
        
        // DOM elements
        this.timerDisplay = null;
        this.currentStateDisplay = null;
        this.currentExerciseDisplay = null;
        this.animationContainer = null;
        
        // Visibility change event to detect when browser tab is changed
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden' && this.isRunning && !this.isPaused) {
                this.pause();
                console.log('Timer paused due to tab change');
            }
        });
    }
    
    // Initialize event listeners
    initializeEventListeners() {
        // DOM elements
        this.timerDisplay = document.getElementById('timer');
        this.currentStateDisplay = document.getElementById('current-state');
        this.currentExerciseDisplay = document.getElementById('current-exercise-name');
        this.animationContainer = document.getElementById('animation-container');

        // Slider inputs
        document.getElementById('exercise-time').addEventListener('input', (e) => {
            this.exerciseTime = parseInt(e.target.value);
            document.getElementById('exercise-time-value').textContent = this.exerciseTime;
            this.saveSettings();
            console.log(`Exercise time set to ${this.exerciseTime}s`);
        });
        
        document.getElementById('rest-time').addEventListener('input', (e) => {
            this.restTime = parseInt(e.target.value);
            document.getElementById('rest-time-value').textContent = this.restTime;
            this.saveSettings();
            console.log(`Rest time set to ${this.restTime}s`);
        });
        
        // Button controls
        document.getElementById('start-btn').addEventListener('click', () => {
            this.start();
        });
        
        document.getElementById('pause-btn').addEventListener('click', () => {
            this.pause();
        });
        
        document.getElementById('resume-btn').addEventListener('click', () => {
            this.resume();
        });
        
        document.getElementById('stop-btn').addEventListener('click', () => {
            this.stop();
        });
        
        // Handle window resize or orientation change
        window.addEventListener('resize', () => {
            if (this.isRunning) {
                this.adjustLayout();
            }
        });
        
        window.addEventListener('orientationchange', () => {
            if (this.isRunning) {
                this.adjustLayout();
            }
        });
    }
    
    // Start the timer
    start() {
        if (this.isRunning) return;
        
        console.log('Timer started');
        
        this.isRunning = true;
        this.isPaused = false;
        this.isExercisePhase = true;
        
        // Show timer display, hide controls
        document.getElementById('timer-display').classList.remove('hidden');
        document.getElementById('pause-btn').classList.remove('hidden');
        document.getElementById('resume-btn').classList.add('hidden');
        document.querySelector('.controls-container').classList.add('hidden');
        
        // Set initial state
        this.currentExercise = exerciseManager.getRandomExercise();
        if (!this.currentExercise) {
            alert('No exercises selected. Please select at least one exercise.');
            this.stop();
            return;
        }
        
        this.currentTime = this.exerciseTime;
        this.updateTimerDisplay();
        this.updatePhaseDisplay();
        this.loadExerciseAnimation();
        
        // Play beep sound
        this.playBeep();
        
        // Start timer interval
        this.timer = setInterval(() => {
            this.tick();
        }, 1000);
        
        // Adjust layout based on orientation
        this.adjustLayout();
    }
    
    // Pause the timer
    pause() {
        if (!this.isRunning || this.isPaused) return;
        
        console.log('Timer paused');
        
        this.isPaused = true;
        clearInterval(this.timer);
        
        document.getElementById('pause-btn').classList.add('hidden');
        document.getElementById('resume-btn').classList.remove('hidden');
    }
    
    // Resume the timer
    resume() {
        if (!this.isRunning || !this.isPaused) return;
        
        console.log('Timer resumed');
        
        this.isPaused = false;
        
        document.getElementById('pause-btn').classList.remove('hidden');
        document.getElementById('resume-btn').classList.add('hidden');
        
        this.timer = setInterval(() => {
            this.tick();
        }, 1000);
    }
    
    // Stop the timer
    stop() {
        if (!this.isRunning) return;
        
        console.log('Timer stopped');
        
        this.isRunning = false;
        this.isPaused = false;
        clearInterval(this.timer);
        
        // Show controls, hide timer
        document.getElementById('timer-display').classList.add('hidden');
        document.querySelector('.controls-container').classList.remove('hidden');
    }
    
    // Timer tick (1 second)
    tick() {
        this.currentTime--;
        
        if (this.currentTime <= 0) {
            this.switchPhase();
        } else {
            this.updateTimerDisplay();
        }
    }
    
    // Switch between exercise and rest phases
    switchPhase() {
        // Play beep sound
        this.playBeep();
        
        this.isExercisePhase = !this.isExercisePhase;
        
        if (this.isExercisePhase) {
            // Switch to a new exercise
            this.currentExercise = exerciseManager.getRandomExercise();
            this.currentTime = this.exerciseTime;
            this.loadExerciseAnimation();
        } else {
            // Switch to rest phase
            this.currentTime = this.restTime;
            // Show "Rest" animation or text
            this.animationContainer.innerHTML = '<svg viewBox="0 0 100 100"><text x="25" y="55" font-size="15">REST</text></svg>';
        }
        
        this.updateTimerDisplay();
        this.updatePhaseDisplay();
        
        console.log(`Switched to ${this.isExercisePhase ? 'exercise' : 'rest'} phase`);
    }
    
    // Update the timer display
    updateTimerDisplay() {
        this.timerDisplay.textContent = this.currentTime;
    }
    
    // Update the phase display (Exercise/Rest)
    updatePhaseDisplay() {
        this.currentStateDisplay.textContent = this.isExercisePhase ? 'Exercise' : 'Rest';
        if (this.isExercisePhase && this.currentExercise) {
            this.currentExerciseDisplay.textContent = this.currentExercise.name;
        } else {
            this.currentExerciseDisplay.textContent = 'Get Ready';
        }
    }
    
    // Load the exercise animation
    loadExerciseAnimation() {
        if (!this.currentExercise) return;
        
        fetch(this.currentExercise.svgPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load exercise animation: ${this.currentExercise.svgPath}`);
                }
                return response.text();
            })
            .then(svgContent => {
                this.animationContainer.innerHTML = svgContent;
            })
            .catch(error => {
                console.error(error);
                this.animationContainer.innerHTML = '<div>Cannot load exercise animation</div>';
            });
    }
    
    // Play beep sound
    playBeep() {
        // Create a beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.5;
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        
        // Beep duration: 0.3 seconds
        setTimeout(() => {
            oscillator.stop();
        }, 300);
        
        console.log('Beep sound played');
    }
    
    // Adjust layout based on orientation
    adjustLayout() {
        const isLandscape = window.innerWidth > window.innerHeight;
        const timerContainer = document.querySelector('.timer-container');
        
        if (isLandscape) {
            timerContainer.classList.add('landscape');
        } else {
            timerContainer.classList.remove('landscape');
        }
        
        console.log(`Layout adjusted to ${isLandscape ? 'landscape' : 'portrait'} mode`);
    }
    
    // Save timer settings to local storage
    saveSettings() {
        const settings = {
            exerciseTime: this.exerciseTime,
            restTime: this.restTime
        };
        
        localStorage.setItem('timerSettings', JSON.stringify(settings));
    }
    
    // Load timer settings from local storage
    loadSettings() {
        const settings = localStorage.getItem('timerSettings');
        
        if (settings) {
            const parsedSettings = JSON.parse(settings);
            
            this.exerciseTime = parsedSettings.exerciseTime || 30;
            this.restTime = parsedSettings.restTime || 15;
            
            // Update the DOM
            document.getElementById('exercise-time').value = this.exerciseTime;
            document.getElementById('exercise-time-value').textContent = this.exerciseTime;
            
            document.getElementById('rest-time').value = this.restTime;
            document.getElementById('rest-time-value').textContent = this.restTime;
            
            console.log('Timer settings loaded from local storage');
        }
    }
}

// Initialize timer
window.exerciseTimer = new ExerciseTimer();