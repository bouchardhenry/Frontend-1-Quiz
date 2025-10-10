// Declare buttons
const Category1Btn = document.getElementById("category1");
const Category2Btn = document.getElementById("category2");
const fetchGeoQuestions = document.getElementById("startCategory1");
const fetchMythologyQuestions = document.getElementById("startCategory2");
const nextQuestionBtn = document.getElementById("next-question");
const resetBtn = document.getElementById("resetBtn");
const answerButtons = document.querySelectorAll(".answerBtn");

// Declare titles and text
const welcomeTitle = document.getElementById("welcomeTitle");
const category1Title = document.getElementById("category1Title");
const category2Title = document.getElementById("category2Title");
const quiztext = document.getElementById("quiztext");
const category1Text = document.getElementById("category1Text");
const category2Text = document.getElementById("category2Text");
const questionTitle = document.getElementById("questionTitle");

// Declare sections
const welcomeSection = document.getElementById("welcomeSection");
const category1Section = document.getElementById("category1Section");
const category2Section = document.getElementById("category2Section");
const questionSection = document.getElementById("questionSection");
const resultSection = document.getElementById("resultSection");

// Welcome -> kategori 1
Category1Btn.addEventListener("click", (e) => {
  welcomeSection.style.display = "none";
  category1Section.style.display = "block";
});

// // Welcome -> kategori 2
Category2Btn.addEventListener("click", (e) => {
  welcomeSection.style.display = "none";
  category2Section.style.display = "block";
});

  function showQuestion(index, questions) {
  const currentQuestion = questions[index];
  const questionNumber = index + 1;
  console.log(`Fråga ${questionNumber}/${questions.length}:`);
  console.log(currentQuestion.question);
}


// Kategori 1 - Hämta frågor
fetchGeoQuestions.addEventListener("click", () => {
  fetch(
    "https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Visa en fråga i taget
      let currentQuestionIndex = 0;
      const questions = data.results;

      nextQuestionBtn.addEventListener("click", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
      questionTitle.innerHTML = questions[currentQuestionIndex].question;
      } else {
      console.log("Inga fler frågor.");
      questionSection.style.display = 'none';
      resultSection.style.display = 'block';
      }
});
      
      if (questions.length > 0) {
        // Visa första frågan i H1 och visa svarsalternativ
        questionTitle.innerHTML = questions[currentQuestionIndex].question;
        category1Section.style.display = 'none';
        questionSection.style.display = 'block';

        

        showQuestion();
      } else {
        console.log("Inga frågor hittades.");
      }
    })
    .catch((error) => {
      console.error("Error fetching quiz questions:", error);
    });
});


// Kategori 2 - Hämta frågor
fetchMythologyQuestions.addEventListener("click", () => {
  fetch(
    "https://opentdb.com/api.php?amount=5&category=20&difficulty=medium&type=multiple"
  )
    .then((response) => response.json())
    .then((data) => {
      let currentQuestionIndex = 0;
      const questions = data.results;

      if (questions.length > 0) {
        questionTitle.innerHTML = questions[currentQuestionIndex].question;
        category2Section.style.display = 'none';
        questionSection.style.display = 'block';
      } else {
        console.log("Inga frågor hittades.");
      }

      nextQuestionBtn.addEventListener("click", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
      questionTitle.innerHTML = questions[currentQuestionIndex].question;
      } else {
      console.log("Inga fler frågor.");
      questionSection.style.display = 'none';
      resultSection.style.display = 'block';
      }
});

    })
    .catch((error) => {
      console.error("Error fetching quiz questions:", error);
    });
});

// Reusable function for showing questions + randomized answers
function displayQuestion(questions, currentQuestionIndex) {
  const q = questions[currentQuestionIndex];
  questionTitle.innerHTML = q.question;
    const allAnswers = [...q.incorrect_answers, q.correct_answer];
  const shuffled = shuffled(allAnswers);

  // Update buttons with answers 
  const buttons = document.querySelectorAll(".answerBtn");
  buttons.forEach((btn, i) => {
    btn.textContent = shuffled[i];
    btn.disabled = false;
    // When player clicks an answer
    btn.onclick = () => handleAnswer(btn.textContent, q.correct_answer, btn, questions, currentQuestionIndex);
  });
}
// Shuffle helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Global score tracker
let score = 0;

function handleAnswer(selected, correct, btn, questions, currentQuestionIndex) {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((b) => (b.disabled = true));

const scoreText = document.getElementById("resultText")
function showResult (){
 resultText = 'Du fick ${score} av ${questions.lengt} rätt!'; 
}
function handleAnswer(selected, correct) {
  if (selected === correct) {
    score++;
    scoreText.textContent = `Poäng: ${score}`;
    console.log("Rätt svar!");
  } else {
    console.log("Fel svar!");
  }}};