// UI Manager class
class UIManager {
    constructor() {
        // Initialize theme
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        // Initialize tabs
        this.activeTab = 'timer-tab';
        
        // Initialize event listeners after DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.applyTheme(this.currentTheme);
            this.initializeEventListeners();
            console.log('UI Manager initialized');
        });
    }
    
    // Initialize event listeners
    initializeEventListeners() {
        // Theme toggle
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                this.toggleTheme();
            });
            console.log('Theme toggle button listener attached');
        } else {
            console.error('Theme toggle button not found');
        }
        
        // Tab navigation
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabId = e.target.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
    }
    
    // Toggle between light and dark themes
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.currentTheme = newTheme;
        localStorage.setItem('theme', newTheme);
        console.log(`Theme switched to ${newTheme}`);
    }
    
    // Apply theme to body
    applyTheme(theme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(`${theme}-theme`);
    }
    
    // Switch between tabs
    switchTab(tabId) {
        if (tabId === this.activeTab) return;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(tab => {
            if (tab.getAttribute('data-tab') === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
        
        this.activeTab = tabId;
        console.log(`Switched to tab: ${tabId}`);
    }
}

// Initialize UI Manager
const uiManager = new UIManager(); 