# Random Exercise Timer - Specification

## Overview

The Random Exercise Timer is a simple, mobile-friendly web application that helps users perform randomized exercises with timed intervals. The app provides a minimalistic interface to configure exercise and rest intervals, view animated exercise demonstrations, and receive audible notifications. It is designed to run on all major mobile browsers without requiring a backend, storing user settings locally for convenience.

## User Journey

1. User opens the app and sees the main tab with sliders for exercise and rest intervals, along with a start button.
2. User adjusts the interval sliders (exercise: 10-120 sec, rest: 5-60 sec) and presses start.
3. A large timer appears, counting down the exercise/rest periods with an accompanying exercise animation.
4. Each interval change is marked by a loud, generated beep sound.
5. User can pause, resume, or stop the timer at any time.
6. If the user switches to another app, the timer pauses manually upon return.
7. The user can switch to the exercise selector tab to check/uncheck exercises or entire exercise types.
8. All user actions and application events are logged to the console for debugging.

## Features

### Main Tab (Timer View)
- Two sliders: 
  - Exercise interval: 10-120 seconds
  - Rest interval: 5-60 seconds
- Large start button to begin the timer.
- Timer display:
  - Exercise/rest countdown with a loud generated beep at each interval change.
  - Basic vector animation (SVG) demonstrating the current exercise.
  - Portrait mode: Animation above the timer.
  - Landscape mode: Animation and timer side by side.
- Pause, resume, and stop buttons.
- Timer state is preserved upon orientation change.

### Exercise Selector Tab
- List of predefined exercises, each with:
  - Type (e.g., cardio, strength, flexibility).
  - Name.
  - Small picture.
- Check/uncheck individual exercises or entire types.
- By default, all exercises are selected.

### Additional Requirements
- **UI & Design**: Simple, clear, and mobile-friendly.
  - Light and dark themes (white on black / black on white).
  - Large, easy-to-use controls.
- **Audio & Alerts**:
  - Generated beep sound for interval changes.
  - If an exercise animation fails to load, display "Cannot load exercise animation" and log the error to the console.
- **Performance & Behavior**:
  - Fast loading with animation priority.
  - Timer pauses manually if the browser is switched to another app.
  - Manual resume after pausing.
- **Technology & Compatibility**:
  - Runs in all major mobile browsers (OS-independent).
  - Uses the simplest JavaScript framework that fulfills the requirements (no backend required).
  - Exercises are loaded from SVG files.
  - User settings stored in local storage.
- **Analytics & Logging**:
  - Google Analytics integration.
  - Detailed logging of user actions and application events to the console for debugging.

## Non-MVP Features
(Not required for the initial version but may be considered later)
- Background execution when the app is minimized.
- Offline support.
