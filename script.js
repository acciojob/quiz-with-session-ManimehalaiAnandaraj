document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('questions');
    const submitButton = document.getElementById('submit');
    const resultDiv = document.getElementById('score'); // Changed from '==' to '='

    // This code will just display the questions to the screen
    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
        },
        {
            question: "What is the highest mountain in the world?",
            choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
            answer: "Everest",
        },
        {
            question: "What is the largest country by area?",
            choices: ["Russia", "China", "Canada", "United States"],
            answer: "Russia",
        },
        {
            question: "Which is the largest planet in our solar system?",
            choices: ["Earth", "Jupiter", "Mars"],
            answer: "Jupiter",
        },
        {
            question: "What is the capital of Canada?",
            choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
            answer: "Ottawa",
        },
    ];

    // Initialize userAnswers
    let userAnswers = {};

    // Display the quiz questions and choices
    function renderQuestions() {
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const questionElement = document.createElement("div");
            const questionText = document.createTextNode(question.question);
            questionElement.appendChild(questionText);
            for (let j = 0; j < question.choices.length; j++) {
                const choice = question.choices[j];
                const choiceElement = document.createElement("input");
                choiceElement.setAttribute("type", "radio");
                choiceElement.setAttribute("name", `question-${i}`);
                choiceElement.setAttribute("value", choice);
                if (userAnswers[`question-${i}`] === choice) {
                    choiceElement.setAttribute("checked", true);
                }
                const choiceText = document.createTextNode(choice);
                questionElement.appendChild(choiceElement);
                questionElement.appendChild(choiceText);
            }
            quizForm.appendChild(questionElement); // Changed from 'questionsElement' to 'quizForm'
        }
    }
    renderQuestions();

    function loadProgress() {
        let progress = JSON.parse(sessionStorage.getItem('progress') || '{}');
        for (const questionId in progress) {
            const selectedAnswer = progress[questionId];
            const radio = document.querySelector(`input[name="${questionId}"][value="${selectedAnswer}"]`);
            if (radio) {
                radio.checked = true;
            }
        }
    }

    function saveProgress() {
        let progress = {};
        questions.forEach((question, index) => {
            const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedAnswer) {
                progress[`question-${index}`] = selectedAnswer.value;
            }
        });
        sessionStorage.setItem('progress', JSON.stringify(progress));
    }

    loadProgress(); // Call to load progress before rendering questions

    quizForm.addEventListener('change', saveProgress);

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        let score = 0;
        questions.forEach((question, index) => {
            const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedAnswer && selectedAnswer.value === question.answer) { // Changed 'correctAnswer' to 'answer'
                score++;
            }
        });
        resultDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
        localStorage.setItem('score', score);
        sessionStorage.removeItem('progress');
    });
});