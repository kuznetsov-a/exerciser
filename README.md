# Random Exercise Timer

A simple, mobile-friendly web application that helps users perform randomized exercises with timed intervals.

## Features

- Configure exercise and rest intervals with sliders
- View animated exercise demonstrations
- Receive audible notifications for interval changes
- Light and dark theme support
- Mobile-friendly design that works in both portrait and landscape orientation
- Stores user settings locally

## How to Use

1. Open `index.html` in any modern browser
2. Adjust the exercise and rest interval sliders as desired
3. Press the Start button to begin your workout
4. The timer will count down, showing you which exercise to perform
5. A beep will sound when it's time to switch between exercise and rest periods
6. Use the Exercises tab to customize which exercises appear in your routine

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript (no frameworks)
- Fully responsive design for mobile and desktop
- Exercises displayed as simple SVG animations
- Audio notifications via Web Audio API
- Settings saved using browser localStorage

## Project Structure

```
/
├── index.html          # Main application HTML
├── css/
│   ├── styles.css      # Main stylesheet
│   └── themes.css      # Light/dark theme styles
├── js/
│   ├── app.js          # Main application logic
│   ├── exercises.js    # Exercise data and management
│   ├── timer.js        # Timer functionality
│   └── ui.js           # UI handling and theme switching
└── assets/
    └── exercises/      # SVG exercise animations
```

## Specification

The full specification can be found in [random_exercise_timer_spec_v2.md](random_exercise_timer_spec_v2.md). 