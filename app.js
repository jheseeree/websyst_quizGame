// Get the DOM Elements
const scoreContainer = document.querySelector(".score-wrapper span");
const questionsContainer = document.querySelector(".questions-wrapper span");
const currentQuestionContainer = document.querySelector(".quiz-number-wrapper");
const buttonsContainer = document.querySelector(".choices-wrapper");
const restartBtn = document.querySelector("#restart-btn");

// Initialize variables
let shuffleQuestionsOrder = []; //For storing shuffled questions order
let currentQuestionIndex = 0;
let score = 0;

// Initialize the game
const startGame = () => {
    // Set the displayed value of the question to 1
    currentQuestionContainer.textContent = `Question: ${
        currentQuestionIndex + 1
    }/${questions.length}`;

    // Add random question order
    while (shuffleQuestionsOrder.length < questions.length) {
        let random = Math.floor(Math.random() * questions.length);
        if (!shuffleQuestionsOrder.includes(random)) {
            shuffleQuestionsOrder.push(random);
        }
    }

    // Call the next question function
    newQuestion();
};

// Reset the game
const resetGame = () => {
    // Reset the variables' values o default values
    currentQuestionIndex = 0;
    score = 0;
    shuffleQuestionsOrder = [];

    // Enable all the buttons
    const buttons = document.querySelectorAll(".choice");
    buttons.forEach((button) => {
        button.disabled = false;
        button.style.cursor = "auto";
    });

    // Call the start game function
    startGame();
};

// Generate new question to be displayed
const newQuestion = () => {
    // Reset the displayed choices to empty
    buttonsContainer.innerHTML = ``;

    // Displaying the new question
    questionsContainer.textContent =
        questions[shuffleQuestionsOrder[currentQuestionIndex]].question;

    // Displaying the choices of the current question
    for (let i = 0; i < 4; i++) {
        buttonsContainer.innerHTML += `
                <button class="choice ${
                    questions[shuffleQuestionsOrder[currentQuestionIndex]]
                        .choices[i].isCorrect
                        ? "correct"
                        : "wrong"
                }">${
            questions[shuffleQuestionsOrder[currentQuestionIndex]].choices[i]
                .text
        }</button>
        `;
    }

    // Add event listeners to the buttons
    const buttons = document.querySelectorAll(".choice");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            // Increase score by one and alert "Correct" if the answer is correct
            if (button.classList.contains("correct")) {
                alert("Correct");
                score++;
            } else {
                // Alert "Wrong" if the answer is incorrect
                alert("Wrong");
            }

            // Update the score display
            scoreContainer.textContent = `Score: ${score}`;

            // Check if the player can still continue playing
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;

                // Update the questions counter display
                currentQuestionContainer.textContent = `Question: ${
                    currentQuestionIndex + 1
                }/${questions.length}`;

                // Generate new question and choices
                newQuestion();
            } else {
                // Alert "Game Over" and disable the choices so they cannot be clicked again
                alert("Game Over");
                buttons.forEach((button) => {
                    button.disabled = true;
                    button.style.cursor = "not-allowed";
                });
                // Display your final score
                alert(`Your final score is: ${score}`);
            }
        });
    });
};

// Questions Array
const questions = [
    {
        question: "What is the color of the sun?",
        choices: [
            { text: "Blue", isCorrect: false },
            { text: "Red", isCorrect: false },
            { text: "Yellow", isCorrect: true },
            { text: "Green", isCorrect: false },
        ],
    },
    {
        question: "How many continents are there in the world?",
        choices: [
            { text: "Five", isCorrect: false },
            { text: "Six", isCorrect: false },
            { text: "Seven", isCorrect: true },
            { text: "Eight", isCorrect: false },
        ],
    },
    {
        question: "What gas do plants absorb from the atmosphere?",
        choices: [
            { text: "Oxygen", isCorrect: false },
            { text: "Carbon dioxide", isCorrect: true },
            { text: "Nitrogen", isCorrect: false },
            { text: "Hydrogen", isCorrect: false },
        ],
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        choices: [
            { text: "Elephant", isCorrect: false },
            { text: "Lion", isCorrect: true },
            { text: "Tiger", isCorrect: false },
            { text: "Bear", isCorrect: false },
        ],
    },
    {
        question: "Who invented the light bulb?",
        choices: [
            { text: "Nikola Tesla", isCorrect: false },
            { text: "Thomas Edison", isCorrect: true },
            { text: "Alexander Graham Bell", isCorrect: false },
            { text: "Marie Curie", isCorrect: false },
        ],
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: [
            { text: "Earth", isCorrect: false },
            { text: "Jupiter", isCorrect: true },
            { text: "Mars", isCorrect: false },
            { text: "Saturn", isCorrect: false },
        ],
    },
    {
        question: "What is the main ingredient in guacamole?",
        choices: [
            { text: "Tomato", isCorrect: false },
            { text: "Avocado", isCorrect: true },
            { text: "Onion", isCorrect: false },
            { text: "Pepper", isCorrect: false },
        ],
    },
    {
        question: "Where is the Great Pyramid of Giza?",
        choices: [
            { text: "Mexico", isCorrect: false },
            { text: "Egypt", isCorrect: true },
            { text: "Peru", isCorrect: false },

            { text: "India", isCorrect: false },
        ],
    },
    {
        question: "What musical instrument has keys, pedals, and strings?",
        choices: [
            { text: "Guitar", isCorrect: false },
            { text: "Piano", isCorrect: true },
            { text: "Violin", isCorrect: false },
            { text: "Harp", isCorrect: false },
        ],
    },
    {
        question: "Which season comes after summer?",
        choices: [
            { text: "Spring", isCorrect: false },
            { text: "Winter", isCorrect: false },
            { text: "Autumn", isCorrect: true },
            { text: "Monsoon", isCorrect: false },
        ],
    },
];

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
    startGame();
});

// Restarts the game when restart button is clicked
restartBtn.addEventListener("click", resetGame);
