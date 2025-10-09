const fetchGeoQuestions = document.getElementById("category1");
const fetchMythologyQuestions = document.getElementById("category2");
const nextQuestion = document.getElementById("next-question");

// Declare buttons
const Category1Btn = document.getElementById("category1");
const Category2Btn = document.getElementById("category2");
const startCategory1 = document.getElementById("startCategory1");
const startCategory2 = document.getElementById("startCategory2");

// Declare sections
const welcomeSection = document.getElementById("welcomeSection");
const category1Section = document.getElementById("category1Section");
const category2Section = document.getElementById("category2Section");
const questionSection = document.getElementById("questionSection");
const resultSection = document.getElementById("resultSection");

//

// Welcome -> kategori 1
Category1Btn.addEventListener('click', (e)=> {
    welcomeSection.style.display = 'none';
    category1Section.style.display = 'block';
})

// Welcome -> kategori 2
Category2Btn.addEventListener('click', (e)=> {
    welcomeSection.style.display = 'none';
    category2Section.style.display = 'block';
})

// Kategori 1 -> Questions
startCategory1.addEventListener('click', (e) => {
    category1Section.style.display = 'none';
    questionSection.style.display = 'block';
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
        console.log(questions[currentQuestionIndex].question);

      } else {
        console.log("Inga frågor hittades.");
      }
      nextQuestion.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          console.log(questions[currentQuestionIndex].question);
        } else {
          console.log("Inga fler frågor.");
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching quiz questions:", error);
    });
})

// Kategori 2 -> Questions
startCategory2.addEventListener('click', (e) => {
    category2Section.style.display = 'none';
    questionSection.style.display = 'block';
    fetch(
    "https://opentdb.com/api.php?amount=5&category=20&difficulty=medium&type=multiple"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })

    .catch((error) => {
      console.error("Error fetching quiz questions:", error);
    });
    nextQuestion.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          console.log(questions[currentQuestionIndex].question);
        } else {
          console.log("Inga fler frågor.");
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching quiz questions:", error);
    });
