// Exercise data
const exerciseData = [
    {
        type: "Cardio",
        exercises: [
            { id: "jumping_jacks", name: "Jumping Jacks", svgPath: "assets/exercises/jumping_jacks.svg" },
            { id: "high_knees", name: "High Knees", svgPath: "assets/exercises/high_knees.svg" },
            { id: "butt_kicks", name: "Butt Kicks", svgPath: "assets/exercises/butt_kicks.svg" },
            { id: "mountain_climbers", name: "Mountain Climbers", svgPath: "assets/exercises/mountain_climbers.svg" },
            { id: "jumping_rope", name: "Jumping Rope", svgPath: "assets/exercises/jumping_rope.svg" }
        ]
    },
    {
        type: "Strength",
        exercises: [
            { id: "push_ups", name: "Push-ups", svgPath: "assets/exercises/push_ups.svg" },
            { id: "squats", name: "Squats", svgPath: "assets/exercises/squats.svg" },
            { id: "lunges", name: "Lunges", svgPath: "assets/exercises/lunges.svg" },
            { id: "plank", name: "Plank", svgPath: "assets/exercises/plank.svg" },
            { id: "burpees", name: "Burpees", svgPath: "assets/exercises/burpees.svg" }
        ]
    },
    {
        type: "Flexibility",
        exercises: [
            { id: "hamstring_stretch", name: "Hamstring Stretch", svgPath: "assets/exercises/hamstring_stretch.svg" },
            { id: "quad_stretch", name: "Quad Stretch", svgPath: "assets/exercises/quad_stretch.svg" },
            { id: "shoulder_stretch", name: "Shoulder Stretch", svgPath: "assets/exercises/shoulder_stretch.svg" },
            { id: "calf_stretch", name: "Calf Stretch", svgPath: "assets/exercises/calf_stretch.svg" },
            { id: "side_bend", name: "Side Bend", svgPath: "assets/exercises/side_bend.svg" }
        ]
    }
];

// Local storage key
const SELECTED_EXERCISES_KEY = 'selectedExercises';

// Exercise manager
class ExerciseManager {
    constructor() {
        this.exerciseGroups = exerciseData;
        this.selectedExercises = this.loadSelectedExercises();
        this.initializeExerciseList();
    }

    // Initialize exercises tab with data
    initializeExerciseList() {
        const exerciseGroupsContainer = document.getElementById('exercise-groups');
        exerciseGroupsContainer.innerHTML = '';

        this.exerciseGroups.forEach(group => {
            const groupElement = document.createElement('div');
            groupElement.className = 'exercise-group';
            
            // Create group header
            const groupHeader = document.createElement('div');
            groupHeader.className = 'exercise-group-header';
            
            // Group title
            const groupTitle = document.createElement('h3');
            groupTitle.textContent = group.type;
            
            // Group checkbox for selecting all exercises in the group
            const groupCheckbox = document.createElement('input');
            groupCheckbox.type = 'checkbox';
            groupCheckbox.checked = this.isGroupFullySelected(group);
            groupCheckbox.addEventListener('change', () => {
                this.toggleGroupSelection(group, groupCheckbox.checked);
                this.updateUI();
                this.saveSelectedExercises();
                console.log(`${group.type} group ${groupCheckbox.checked ? 'selected' : 'deselected'}`);
            });
            
            groupHeader.appendChild(groupTitle);
            groupHeader.appendChild(groupCheckbox);
            groupElement.appendChild(groupHeader);
            
            // Create exercise list
            const exerciseList = document.createElement('div');
            exerciseList.className = 'exercise-list';
            
            group.exercises.forEach(exercise => {
                const exerciseItem = document.createElement('div');
                exerciseItem.className = 'exercise-item';
                
                // Exercise checkbox
                const exerciseCheckbox = document.createElement('input');
                exerciseCheckbox.type = 'checkbox';
                exerciseCheckbox.className = 'exercise-checkbox';
                exerciseCheckbox.checked = this.isExerciseSelected(exercise.id);
                exerciseCheckbox.addEventListener('change', () => {
                    this.toggleExerciseSelection(exercise.id, exerciseCheckbox.checked);
                    groupCheckbox.checked = this.isGroupFullySelected(group);
                    this.saveSelectedExercises();
                    console.log(`Exercise ${exercise.name} ${exerciseCheckbox.checked ? 'selected' : 'deselected'}`);
                });
                
                // Exercise thumbnail
                const exerciseThumbnail = document.createElement('div');
                exerciseThumbnail.className = 'exercise-thumbnail';
                
                // Load SVG thumbnail
                fetch(exercise.svgPath)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load exercise thumbnail: ${exercise.svgPath}`);
                        }
                        return response.text();
                    })
                    .then(svgContent => {
                        exerciseThumbnail.innerHTML = svgContent;
                    })
                    .catch(error => {
                        console.error(error);
                        exerciseThumbnail.textContent = '?';
                    });
                
                // Exercise name
                const exerciseName = document.createElement('span');
                exerciseName.textContent = exercise.name;
                
                exerciseItem.appendChild(exerciseCheckbox);
                exerciseItem.appendChild(exerciseThumbnail);
                exerciseItem.appendChild(exerciseName);
                
                exerciseList.appendChild(exerciseItem);
            });
            
            groupElement.appendChild(exerciseList);
            exerciseGroupsContainer.appendChild(groupElement);
        });

        // Initialize select/deselect all buttons
        document.getElementById('select-all-btn').addEventListener('click', () => {
            this.selectAllExercises();
            this.updateUI();
            console.log('All exercises selected');
        });

        document.getElementById('deselect-all-btn').addEventListener('click', () => {
            this.deselectAllExercises();
            this.updateUI();
            console.log('All exercises deselected');
        });
    }

    // Check if a specific exercise is selected
    isExerciseSelected(exerciseId) {
        return this.selectedExercises.includes(exerciseId);
    }

    // Check if all exercises in a group are selected
    isGroupFullySelected(group) {
        return group.exercises.every(exercise => this.isExerciseSelected(exercise.id));
    }

    // Toggle selection of a single exercise
    toggleExerciseSelection(exerciseId, isSelected) {
        const index = this.selectedExercises.indexOf(exerciseId);
        
        if (isSelected && index === -1) {
            this.selectedExercises.push(exerciseId);
        } else if (!isSelected && index !== -1) {
            this.selectedExercises.splice(index, 1);
        }
    }

    // Toggle selection of all exercises in a group
    toggleGroupSelection(group, isSelected) {
        group.exercises.forEach(exercise => {
            this.toggleExerciseSelection(exercise.id, isSelected);
        });
    }

    // Select all exercises
    selectAllExercises() {
        this.selectedExercises = [];
        this.exerciseGroups.forEach(group => {
            group.exercises.forEach(exercise => {
                this.selectedExercises.push(exercise.id);
            });
        });
        this.saveSelectedExercises();
    }

    // Deselect all exercises
    deselectAllExercises() {
        this.selectedExercises = [];
        this.saveSelectedExercises();
    }

    // Update UI based on current selection state
    updateUI() {
        const checkboxes = document.querySelectorAll('.exercise-checkbox');
        checkboxes.forEach(checkbox => {
            const exerciseItem = checkbox.closest('.exercise-item');
            const exerciseId = this.getExerciseIdFromElement(exerciseItem);
            checkbox.checked = this.isExerciseSelected(exerciseId);
        });

        const groupCheckboxes = document.querySelectorAll('.exercise-group-header input[type="checkbox"]');
        groupCheckboxes.forEach((checkbox, index) => {
            checkbox.checked = this.isGroupFullySelected(this.exerciseGroups[index]);
        });
    }

    // Get exercise ID from DOM element
    getExerciseIdFromElement(element) {
        const exerciseName = element.querySelector('span').textContent;
        for (const group of this.exerciseGroups) {
            for (const exercise of group.exercises) {
                if (exercise.name === exerciseName) {
                    return exercise.id;
                }
            }
        }
        return null;
    }

    // Save selected exercises to local storage
    saveSelectedExercises() {
        localStorage.setItem(SELECTED_EXERCISES_KEY, JSON.stringify(this.selectedExercises));
    }

    // Load selected exercises from local storage
    loadSelectedExercises() {
        const savedExercises = localStorage.getItem(SELECTED_EXERCISES_KEY);
        if (savedExercises) {
            return JSON.parse(savedExercises);
        } else {
            // Default: all exercises selected
            const allExercises = [];
            exerciseData.forEach(group => {
                group.exercises.forEach(exercise => {
                    allExercises.push(exercise.id);
                });
            });
            return allExercises;
        }
    }

    // Get a random selected exercise
    getRandomExercise() {
        if (this.selectedExercises.length === 0) {
            console.error("No exercises selected");
            return null;
        }

        const randomIndex = Math.floor(Math.random() * this.selectedExercises.length);
        const exerciseId = this.selectedExercises[randomIndex];
        
        // Find the exercise object by ID
        for (const group of this.exerciseGroups) {
            for (const exercise of group.exercises) {
                if (exercise.id === exerciseId) {
                    return exercise;
                }
            }
        }
        
        return null;
    }
}

// Create sample SVG files for exercises
function createSampleSVGs() {
    const simpleSVGs = {
        "jumping_jacks": '<svg viewBox="0 0 100 100"><circle cx="50" cy="30" r="10"/><line x1="50" y1="40" x2="50" y2="70" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="30" y2="60" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="70" y2="60" stroke="black" stroke-width="2"/><line x1="50" y1="70" x2="30" y2="90" stroke="black" stroke-width="2"/><line x1="50" y1="70" x2="70" y2="90" stroke="black" stroke-width="2"/></svg>',
        "high_knees": '<svg viewBox="0 0 100 100"><circle cx="50" cy="30" r="10"/><line x1="50" y1="40" x2="50" y2="70" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="30" y2="60" stroke="black" stroke-width="2"/><line x1="50" y1="50" x2="70" y2="40" stroke="black" stroke-width="2"/><line x1="50" y1="70" x2="30" y2="90" stroke="black" stroke-width="2"/><line x1="50" y1="70" x2="70" y2="60" stroke="black" stroke-width="2"/></svg>',
        "push_ups": '<svg viewBox="0 0 100 100"><circle cx="30" cy="40" r="5"/><line x1="30" y1="45" x2="70" y2="45" stroke="black" stroke-width="2"/><line x1="70" y1="45" x2="80" y2="60" stroke="black" stroke-width="2"/><line x1="30" y1="45" x2="20" y2="60" stroke="black" stroke-width="2"/><line x1="20" y1="60" x2="20" y2="75" stroke="black" stroke-width="2"/><line x1="80" y1="60" x2="80" y2="75" stroke="black" stroke-width="2"/></svg>',
        "squats": '<svg viewBox="0 0 100 100"><circle cx="50" cy="30" r="10"/><line x1="50" y1="40" x2="50" y2="60" stroke="black" stroke-width="2"/><line x1="50" y1="60" x2="30" y2="80" stroke="black" stroke-width="2"/><line x1="50" y1="60" x2="70" y2="80" stroke="black" stroke-width="2"/><line x1="30" y1="80" x2="30" y2="90" stroke="black" stroke-width="2"/><line x1="70" y1="80" x2="70" y2="90" stroke="black" stroke-width="2"/></svg>',
        "hamstring_stretch": '<svg viewBox="0 0 100 100"><circle cx="30" cy="30" r="10"/><line x1="30" y1="40" x2="30" y2="60" stroke="black" stroke-width="2"/><line x1="30" y1="60" x2="50" y2="80" stroke="black" stroke-width="2"/><line x1="30" y1="60" x2="10" y2="80" stroke="black" stroke-width="2"/><line x1="30" y1="45" x2="60" y2="45" stroke="black" stroke-width="2"/></svg>'
    };

    // For each exercise type
    exerciseData.forEach(group => {
        group.exercises.forEach(exercise => {
            // Create a folder for exercises if it doesn't exist
            const folder = 'assets/exercises';
            
            // Generate path for this exercise
            const svgContent = simpleSVGs[exercise.id] || 
                `<svg viewBox="0 0 100 100"><text x="10" y="50" font-size="12">${exercise.name}</text></svg>`;
            
            // Create the exercise SVG file
            const filePath = exercise.svgPath;
            
            // For debugging only, we'd normally save these to files
            console.log(`Would create SVG file at ${filePath} with content: ${svgContent}`);
        });
    });
    
    console.log("Sample SVGs would be created in a real environment");
}

// Export exercises
window.exerciseManager = new ExerciseManager();