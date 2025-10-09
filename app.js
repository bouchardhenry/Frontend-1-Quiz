// Declare buttons
const Category1Btn = document.getElementById("category1");
const Category2Btn = document.getElementById("category2");
const fetchGeoQuestions = document.getElementById("startCategory1");
const fetchMythologyQuestions = document.getElementById("startCategory2");
const nextQuestion = document.getElementById("next-question");
const restartQuiz = document.getElementById("restartQuiz");
const questionTitle = document.getElementById("questionTitle");

// Declare titles and text
const welcomeTitle = document.getElementById("welcomeTitle");
const category1Title = document.getElementById("category1Title");
const category2Title = document.getElementById("category2Title");
const quiztext = document.getElementById("quiztext");
const category1Text = document.getElementById("category1Text");
const category2Text = document.getElementById("category2Text");

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
  category1Title.innerText = "Geografi";
  category1Text.innerText = "Testa dina kunskaper om världen med vårt geografi-quiz! Från huvudstäder till landmärken – utmana dig själv och lär dig roliga fakta på vägen. Perfekt för quizkvällar eller bara som ett roligt sätt att fördriva tiden. Är du redo att utforska?";
});

// // Welcome -> kategori 2
Category2Btn.addEventListener("click", (e) => {
  welcomeSection.style.display = "none";
  category2Section.style.display = "block";
  category2Title.innerText = "Mytologi";
  category2Text.innerText = "Dyk ner i myternas och legendernas fascinerande värld med vårt mytologi-quiz! Testa dina kunskaper om gudar, hjältar och mytiska varelser från olika kulturer runt om i världen. Oavsett om du är en mytologi-entusiast eller bara nyfiken kommer det här quizet garanterat att både underhålla och lära dig något nytt. Är du redo att ge dig ut på en mytisk resa?";
});

  function showQuestion(index, questions) {
  const currentQuestion = questions[index];
  const questionNumber = index + 1;
  console.log(`Fråga ${questionNumber}/${questions.length}:`);
  console.log(currentQuestion.question);
}


// Kategori 1 - Hämta frågor
fetchGeoQuestions.addEventListener("click", () => {
  category1Section.style.display = "none";
  questionSection.style.display = "block";
  fetch(
    "https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Visa en fråga i taget
      let currentQuestionIndex = 0;
      const questions = data.results;

      if (questions.length > 0) {
        // Visa första frågan
        showQuestion(currentQuestionIndex, questions);
      } else {
        console.log("Inga frågor hittades.");
      }

      nextQuestion.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          showQuestion(currentQuestionIndex, questions);
        } else {
          console.log("Inga fler frågor.");
            questionSection.style.display = "none";
            resultSection.style.display = "block";
        }
      });
    })
    })
    // .catch((error) => {
    //   console.error("Error fetching quiz questions:", error);
    // });


// Kategori 2 - Hämta frågor
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
      
      if (questions.length > 0) {
        // Visa första frågan i H1 och visa svarsalternativ
        questionTitle.innerHTML = questions[currentQuestionIndex].question;
        category1Section.style.display = 'none';
        questionSection.style.display = 'block';
      } else {
        console.log("Inga frågor hittades.");
      }

      nextQuestion.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          questionTitle.innerHTML = questions[currentQuestionIndex].question;
        } else {
          console.log("Inga fler frågor.");
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching quiz questions:", error);
    });
});

 const allAnswers = [...q.incorrect_answers, q.correct_answer];
  const shuffled = shuffled(allAnswers);


let score = 0;
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
  }};
