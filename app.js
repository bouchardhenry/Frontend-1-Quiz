// Hämta DOM-element som används i appen
const Category1Btn = document.getElementById("category1"); 
const Category2Btn = document.getElementById("category2"); 
const fetchGeoQuestions = document.getElementById("startCategory1"); 
const fetchMythologyQuestions = document.getElementById("startCategory2"); 
const resetBtn = document.getElementById("resetBtn"); 
const questionTitle = document.getElementById("questionTitle"); 

// Sektioner och texter
const welcomeSection = document.getElementById("welcomeSection"); 
const category1Section = document.getElementById("category1Section"); 
const category2Section = document.getElementById("category2Section"); 
const resultSection = document.getElementById("resultSection"); 
const questionSection = document.getElementById("questionSection"); 
const resultText = document.getElementById("resultText"); 

const category1Title = document.getElementById("category1Title"); 
const category2Title = document.getElementById("category2Title"); 
const category1Text = document.getElementById("category1Text"); 
const category2Text = document.getElementById("category2Text"); 

// Skapar arrayer för frågor och svar, samt variabel för aktuell fråga
let questions = []; 
let currentIndex = 0; 
let scoreLog = []; 

// Funktion för att blanda en array ur API:et, så att frågorna blir randomized
function shuffle(arr) {
  const a = [...arr]; 
  for (let i = a.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [a[i], a[j]] = [a[j], a[i]]; 
  }
  return a;
}

// Funktioner för att visa och dölja element
function show(element) { element.style.display = "block"; } 
function hide(element) { element.style.display = "none"; } 

// Återställer variabler när man startar om quizet
function resetState() {
  questions = []; 
  currentIndex = 0;
  scoreLog = []; 
}

// Funktion för att starta quiz för vald kategori
function startQuiz(categoryId, sectionToHide) {
  resetState(); 
  hide(sectionToHide); 
  // Hämtar data från API med vald kategori. 
  // categoryId är 22 för Geografi och 20 för Mythology
  fetch(`https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=medium&type=multiple`)
    .then((res) => res.json()) 
    .then((data) => {
      questions = data.results || []; 
      // Felhantering om inga frågor hittas
      if (!questions.length) { 
        resultText.textContent = "No questions found."; 
        hide(questionSection); 
        show(resultSection); 
        return; 
      }
      show(questionSection);
      hide(resultSection);
      renderQuestion();
    })
    .catch((err) => {
      console.error("Error fetching quiz questions:", err);
      resultText.textContent = "Unable to load questions.";
      hide(questionSection);
      show(resultSection); 
    });
}

// Funktion för att skriva ut aktuell fråga och svarsalternativ
function renderQuestion() {
  // OM det är slut på frågor, visa resultatet
  if (currentIndex >= questions.length) { 
    return finishQuiz();
  }

  const q = questions[currentIndex]; // Aktuell fråga
  questionTitle.innerHTML = q.question; // Sätt frågetext (innerHTML för att avkoda entiteter)

  const correctAnswer = q.correct_answer; // Rätt svar
  const incorrectAnswers = q.incorrect_answers; // Fel svar
  const options = shuffle([correctAnswer, ...incorrectAnswers]); // Blanda svarsalternativ

  const buttons = document.querySelectorAll(".answerBtn"); // Hämta de 4 knapparna
  buttons.forEach((btn, i) => {
    const text = options[i] ?? ""; // Text för denna knapp
    btn.innerHTML = text; // Sätt knappens text
    btn.disabled = false; // Säkerställ att den kan klickas
    btn.dataset.correct = String(text === correctAnswer); // Markera om rätt
    btn.onclick = () => handleAnswer(text, correctAnswer, text === correctAnswer); // Klick-handler
  });
}

// Hantera val, spara till scoreLog och gå vidare
function handleAnswer(selectedText, correctAnswer, isCorrect) {
  scoreLog.push({ // Spara försöket
    question: questions[currentIndex].question, // Frågetext
    selected: selectedText, // Valda svaret
    correctAnswer, // Korrekt svar
    isCorrect, // Om det blev rätt
  });

  currentIndex += 1; // Nästa fråga
  renderQuestion(); // Rendera nästa
}

// Slutresultat: summera och visa
function finishQuiz() {
  const correctCount = scoreLog.filter((r) => r.isCorrect).length; // Antal rätt
  resultText.textContent = `You got ${correctCount} out of ${questions.length} correct!`; // Visa resultat
  hide(questionSection); // Dölj frågor
  show(resultSection); // Visa resultat
}

// Välkomstvy -> Kategori 1 (Geografi)
Category1Btn.addEventListener("click", () => {
  hide(welcomeSection); // Dölj välkomstsida
  category1Title.textContent = "Geography"; // Sätt rubrik
  category1Text.textContent = "Test your knowledge of the world with our geography quiz! From capitals to landmarks, challenge yourself and discover fun facts along the way."; // Sätt text
  show(category1Section); // Visa kategori 1-intro
});

// Välkomstvy -> Kategori 2 (Mythology)
Category2Btn.addEventListener("click", () => {
  hide(welcomeSection); // Dölj välkomstsida
  category2Title.textContent = "Mythology"; // Sätt rubrik
  category2Text.textContent = "Dive into myths and legends from around the world. Test your knowledge of gods, heroes, and mythical creatures!"; // Sätt text
  show(category2Section); // Visa kategori 2-intro
});

// Starta respektive quiz
fetchGeoQuestions.addEventListener("click", () => startQuiz(22, category1Section)); // Starta geografi
fetchMythologyQuestions.addEventListener("click", () => startQuiz(20, category2Section)); // Starta mytologi

// Starta om appen till välkomstvy
resetBtn.addEventListener("click", () => {
  resetState(); // Nollställ data
  hide(category1Section); // Dölj kategori 1
  hide(category2Section); // Dölj kategori 2
  hide(questionSection); // Dölj frågedel
  hide(resultSection); // Dölj resultat
  show(welcomeSection); // Visa välkomstsida
});