const fetchGeoQuestions = document.getElementById("category1");
const fetchMythologyQuestions = document.getElementById("category2");
const nextQuestion = document.getElementById("next-question");

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
});

fetchMythologyQuestions.addEventListener("click", () => {
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
});
