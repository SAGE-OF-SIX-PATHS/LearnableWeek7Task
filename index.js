const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");

const questions = [
          {
                    question: "What is the capital of Nigeria?",
                    options: ["Lagos", "Accra", "Abuja", "Lisbon"],
                    answer: "Abuja"
          },
          {
                    question: "What Programming Language is used by Genesys?",
                    options: ["Java", "Python", "C++", "JavaScript"],
                    answer: "JavaScript"
          },
          {
                    question: "Sin is any action wrong in the Eyes of?",
                    options: [" GOD", "Man", "God and Man", "NOTA"],
                    answer: "God and Man"
          },
          {
                    question: "What is the highest mountain on earth?",
                    options: ["kilimanjero", "Everest", "Ugwu onyeama", "Ugwuarji"],
                    answer: "Everest"
          },
          {
                    question: "What does Math.Random() method do?",
                    options: ["Find sum of numbers", "Truncate a number", "Remove sequence from a list of items", "Add sequence to a list of numbers"],
                    answer: "Remove sequence from a list of items"
          },
          {
                    question: "Who is the best player of all time?",
                    options: ["Maradona", "C. Ronaldo", "Lionel Messi", "NOTA"],
                    answer: "NOTA"
          },
          {
                    question: "Solve: 2LOG3 base 9?",
                    options: ["1", "2", "-1", "-2"],
                    answer: "1"
          },
          {
                    question: "The property of an object to possess different forms is known as?",
                    options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"],
                    answer: "Polymorphism"
          },
          {
                    question: "Orange is what?",
                    options: ["A color", "A fruit", "NOTA", "Object"],
                    answer: "Object"
          },
          {
                    question: "What is the full meaning of ICO in crypto?",
                    options: ["Initial cap offering", "Initial coin offering", "Initial call offering", "Inherited coin offering"],
                    answer: "Initial coin offering"
          }

];

let answeredQuestions = [];  // Store indexes of answered questions
let currentQuestionIndex = null;
let score = 0;

// Function to get a random question index that hasn't been used
function getRandomQuestionIndex() {
          let randomIndex;
          do {
                    randomIndex = Math.floor(Math.random() * questions.length);
          } while (answeredQuestions.includes(randomIndex));

          return randomIndex;
}

// Load a new question
async function loadQuestion() {
          if (answeredQuestions.length === questions.length) {
                    showResults();
                    return;
          }

          await new Promise(resolve => setTimeout(resolve, 500));  // Simulate API delay

          currentQuestionIndex = getRandomQuestionIndex();
          answeredQuestions.push(currentQuestionIndex);  // Store used question index

          const currentQuestion = questions[currentQuestionIndex];
          questionEl.innerText = currentQuestion.question;
          optionsContainer.innerHTML = "";

          currentQuestion.options.forEach(option => {
                    const li = document.createElement("li");
                    li.innerText = option;
                    li.classList.add("option");
                    li.addEventListener("click", () => selectAnswer(li, option));
                    optionsContainer.appendChild(li);
          });

          nextButton.disabled = true;
          progressEl.innerText = `Question ${answeredQuestions.length} of ${questions.length}`;
}

// Select an answer
function selectAnswer(selectedLi, selectedOption) {
          const correctAnswer = questions[currentQuestionIndex].answer;

          // Reset styles for all options
          document.querySelectorAll(".option").forEach(li => li.classList.remove("selected"));

          // Apply new style
          selectedLi.classList.add("selected");

          if (selectedOption === correctAnswer) {
                    score++;
          }

          nextButton.disabled = false;
}

// Load the next question
nextButton.addEventListener("click", () => {
          loadQuestion();
});

// Show results when quiz is finished
function showResults() {
          questionEl.innerText = `Quiz Complete! 🎉`;
          optionsContainer.innerHTML = `<p>Your Score: ${score} / ${questions.length}</p>`;
          nextButton.style.display = "none";
}

loadQuestion();

