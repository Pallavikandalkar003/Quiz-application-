const questions = [
    {
        question:"What is the chemical symbol for water?",
        answers: [
            { text: "CO2", correct: false },
            { text: "O2", correct: false },
            { text:"H2O", correct: true },
            { text: "N2", correct: false }
        ]
    },
    {
        question: "Who developed JavaScript?",
        answers: [
            { text: "Brendan Eich", correct: true },
            { text: "James Gosling", correct: false },
            { text: "Dennis Ritchie", correct: false },
            { text: "Guido van Rossum", correct: false }
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers:
         [
            { text: "Amazon River", correct: false },
            { text: "Yangtze River", correct: false },
            { text: " Nile River ", correct: true },
            { text: "Mississippi River", correct: false }
        ]
    },
    {
        question: "Which is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    scoreDisplay.innerText = `Score: ${score}`;
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtonsElement.innerHTML = "";
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    scoreDisplay.innerText = `Score: ${score}`;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    resetState();
    questionElement.innerText = `Quiz Completed! Your Score: ${score} / ${questions.length}`;
    nextButton.innerText = "Restart Quiz";
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", nextQuestionHandler);
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
