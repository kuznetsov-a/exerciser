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
        
        // Create sample SVG files for exercises (in a real app, these would be preloaded)
        this.createSampleSVGs();
        
        // Check if all required components are loaded
        if (typeof exerciseManager === 'undefined' || 
            typeof exerciseTimer === 'undefined' || 
            typeof uiManager === 'undefined') {
            
            console.error('App initialization failed: required components not loaded');
            return;
        }
        
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
    
    // Create sample SVG files
    createSampleSVGs() {
        // Create a folder for exercises if it doesn't exist
        const exercisesDir = 'assets/exercises';
        
        // For each exercise type defined in exerciseData
        // This is a simplified version - in a real app, SVGs would be preloaded
        const simpleSVGs = {
            "jumping_jacks": '<svg viewBox="0 0 100 100"><circle cx="50" cy="30" r="10"/><line x1="50" y1="40" x2="50" y2="70" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="30" y2="60" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="70" y2="60" stroke="black" stroke-width="2"/><line x1="50" y1="70" x2="30" y2="90" stroke="black" stroke-width="2"/><line x1="50" y1="70" x2="70" y2="90" stroke="black" stroke-width="2"/></svg>',
            "high_knees": '<svg viewBox="0 0 100 100"><circle cx="50" cy="30" r="10"/><line x1="50" y1="40" x2="50" y2="70" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="30" y2="60" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="70" y2="40" stroke="black" stroke-width="2"/><line x1="50" y1="70" x2="30" y2="90" stroke="black" stroke-width="2"/><line x1="50" y1="70" x2="70" y2="60" stroke="black" stroke-width="2"/></svg>',
            "butt_kicks": '<svg viewBox="0 0 100 100"><circle cx="50" cy="30" r="10"/><line x1="50" y1="40" x2="50" y2="70" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="30" y2="40" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="70" y2="45" stroke="black" stroke-width="2"/><line x1="50" y1="70" x2="30" y2="90" stroke="black" stroke-width="2"/><line x1="50" y1="70" x2="70" y2="90" stroke="black" stroke-width="2"/></svg>',
            "mountain_climbers": '<svg viewBox="0 0 100 100"><circle cx="30" cy="40" r="8"/><line x1="30" y1="48" x2="30" y2="65" stroke="black" stroke-width="2"/><line x1="30" y1="55" x2="15" y2="40" stroke="black" stroke-width="2"/><line x1="30" y1="55" x2="70" y2="55" stroke="black" stroke-width="2"/><line x1="30" y1="65" x2="15" y2="80" stroke="black" stroke-width="2"/><line x1="70" y1="55" x2="85" y2="65" stroke="black" stroke-width="2"/></svg>',
            "jumping_rope": '<svg viewBox="0 0 100 100"><circle cx="50" cy="30" r="10"/><line x1="50" y1="40" x2="50" y2="70" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="30" y2="60" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="70" y2="60" stroke="black" stroke-width="2"/><line x1="50" y1="70" x2="30" y2="90" stroke="black" stroke-width="2"/><line x1="50" y1="70" x2="70" y2="90" stroke="black" stroke-width="2"/><path d="M 20,80 Q 50,95 80,80" stroke="black" fill="none" stroke-width="1"/></svg>',
            "push_ups": '<svg viewBox="0 0 100 100"><circle cx="30" cy="40" r="5"/><line x1="30" y1="45" x2="70" y2="45" stroke="black" stroke-width="2"/><line x1="70" y1="45" x2="80" y2="60" stroke="black" stroke-width="2"/><line x1="30" y1="45" x2="20" y2="60" stroke="black" stroke-width="2"/><line x1="20" y1="60" x2="20" y2="75" stroke="black" stroke-width="2"/><line x1="80" y1="60" x2="80" y2="75" stroke="black" stroke-width="2"/></svg>',
            "squats": '<svg viewBox="0 0 100 100"><circle cx="50" cy="30" r="10"/><line x1="50" y1="40" x2="50" y2="60" stroke="black" stroke-width="2"/><line x1="50" y1="60" x2="30" y2="80" stroke="black" stroke-width="2"/><line x1="50" y1="60" x2="70" y2="80" stroke="black" stroke-width="2"/><line x1="30" y1="80" x2="30" y2="90" stroke="black" stroke-width="2"/><line x1="70" y1="80" x2="70" y2="90" stroke="black" stroke-width="2"/></svg>',
            "lunges": '<svg viewBox="0 0 100 100"><circle cx="40" cy="30" r="10"/><line x1="40" y1="40" x2="40" y2="60" stroke="black" stroke-width="2"/><line x1="40" y1="60" x2="20" y2="80" stroke="black" stroke-width="2"/><line x1="40" y1="60" x2="70" y2="60" stroke="black" stroke-width="2"/><line x1="20" y1="80" x2="20" y2="90" stroke="black" stroke-width="2"/><line x1="70" y1="60" x2="70" y2="90" stroke="black" stroke-width="2"/></svg>',
            "plank": '<svg viewBox="0 0 100 100"><circle cx="30" cy="40" r="5"/><line x1="30" y1="45" x2="70" y2="45" stroke="black" stroke-width="2"/><line x1="30" y1="45" x2="15" y2="60" stroke="black" stroke-width="2"/><line x1="70" y1="45" x2="85" y2="60" stroke="black" stroke-width="2"/><line x1="15" y1="60" x2="15" y2="65" stroke="black" stroke-width="2"/><line x1="85" y1="60" x2="85" y2="65" stroke="black" stroke-width="2"/></svg>',
            "burpees": '<svg viewBox="0 0 100 100"><circle cx="50" cy="20" r="8"/><line x1="50" y1="28" x2="50" y2="50" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="30" y2="70" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="70" y2="70" stroke="black" stroke-width="2"/><line x1="30" y1="70" x2="30" y2="80" stroke="black" stroke-width="2"/><line x1="70" y1="70" x2="70" y2="80" stroke="black" stroke-width="2"/></svg>',
            "hamstring_stretch": '<svg viewBox="0 0 100 100"><circle cx="30" cy="30" r="10"/><line x1="30" y1="40" x2="30" y2="60" stroke="black" stroke-width="2"/><line x1="30" y1="60" x2="50" y2="80" stroke="black" stroke-width="2"/><line x1="30" y1="60" x2="10" y2="80" stroke="black" stroke-width="2"/><line x1="30" y1="45" x2="60" y2="45" stroke="black" stroke-width="2"/></svg>',
            "quad_stretch": '<svg viewBox="0 0 100 100"><circle cx="40" cy="30" r="10"/><line x1="40" y1="40" x2="40" y2="60" stroke="black" stroke-width="2"/><line x1="40" y1="60" x2="25" y2="40" stroke="black" stroke-width="2"/><line x1="40" y1="60" x2="55" y2="80" stroke="black" stroke-width="2"/><line x1="55" y1="80" x2="55" y2="90" stroke="black" stroke-width="2"/></svg>',
            "shoulder_stretch": '<svg viewBox="0 0 100 100"><circle cx="50" cy="30" r="10"/><line x1="50" y1="40" x2="50" y2="60" stroke="black" stroke-width="2"/><line x1="50" y1="45" x2="75" y2="45" stroke="black" stroke-width="2"/><line x1="50" y1="45" x2="25" y2="45" stroke="black" stroke-width="2"/><line x1="50" y1="60" x2="35" y2="80" stroke="black" stroke-width="2"/><line x1="50" y1="60" x2="65" y2="80" stroke="black" stroke-width="2"/></svg>',
            "calf_stretch": '<svg viewBox="0 0 100 100"><circle cx="35" cy="30" r="10"/><line x1="35" y1="40" x2="35" y2="60" stroke="black" stroke-width="2"/><line x1="35" y1="60" x2="20" y2="80" stroke="black" stroke-width="2"/><line x1="35" y1="60" x2="65" y2="60" stroke="black" stroke-width="2"/><line x1="20" y1="80" x2="10" y2="80" stroke="black" stroke-width="2"/><line x1="65" y1="60" x2="65" y2="80" stroke="black" stroke-width="2"/></svg>',
            "side_bend": '<svg viewBox="0 0 100 100"><circle cx="50" cy="30" r="10"/><line x1="50" y1="40" x2="40" y2="70" stroke="black" stroke-width="2"/><line x1="50" y1="45" x2="65" y2="55" stroke="black" stroke-width="2"/><line x1="40" y1="70" x2="25" y2="85" stroke="black" stroke-width="2"/><line x1="40" y1="70" x2="55" y2="85" stroke="black" stroke-width="2"/></svg>'
        };
        
        // For demonstration purposes, we mock the creation of SVG files
        // In a real app, these would be included in the repository
        if (typeof exerciseData !== 'undefined') {
            exerciseData.forEach(group => {
                group.exercises.forEach(exercise => {
                    const svgData = simpleSVGs[exercise.id] || 
                        `<svg viewBox="0 0 100 100"><text x="10" y="50" font-size="12">${exercise.name}</text></svg>`;
                    
                    // Mock the SVG files by defining them for fetch intercept
                    this.mockFetch(exercise.svgPath, svgData);
                });
            });
        }
        
        console.log('Sample SVGs created');
    }
    
    // Mock fetch for SVGs (for development only)
    mockFetch(url, data) {
        const originalFetch = window.fetch;
        
        if (!window._fetchMocks) {
            window._fetchMocks = {};
            
            // Override fetch
            window.fetch = function(input) {
                if (typeof input === 'string' && window._fetchMocks[input]) {
                    console.log(`Serving mocked SVG: ${input}`);
                    return Promise.resolve({
                        ok: true,
                        text: function() {
                            return Promise.resolve(window._fetchMocks[input]);
                        }
                    });
                }
                
                return originalFetch.apply(this, arguments);
            };
        }
        
        // Add this mock
        window._fetchMocks[url] = data;
    }
}

// Initialize the app
const app = new ExerciseApp(); 