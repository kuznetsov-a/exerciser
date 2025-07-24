// Main Application Class
class ExerciseApp {
    constructor() {
        this.initialized = false;
        
        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeApp();
        });
    }
    
    // Initialize the app
    initializeApp() {
        if (this.initialized) return;
        
        // Check if all required components are loaded
        if (typeof window.exerciseManager === 'undefined' ||
            typeof window.exerciseTimer === 'undefined' ||
            typeof window.uiManager === 'undefined') {
            
            console.error('App initialization failed: required components not loaded');
            return;
        }

        window.uiManager.applyTheme(window.uiManager.currentTheme);
        window.uiManager.initializeEventListeners();
        window.exerciseManager.initializeExerciseList();
        window.exerciseTimer.initializeEventListeners();
        window.exerciseTimer.loadSettings();
        
        console.log('Exercise Timer App initialized successfully');
        this.initialized = true;
        
        // Log app start to Google Analytics
        if (typeof gtag === 'function') {
            gtag('event', 'app_initialized', {
                'event_category': 'app',
                'event_label': 'initialization'
            });
        }
    }
}

// Initialize the app
const app = new ExerciseApp();