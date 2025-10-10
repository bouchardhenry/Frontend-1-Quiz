// Hämta DOM-element som används i appen
const Category1Btn = document.getElementById("category1"); // Kategori-knapp 1
const Category2Btn = document.getElementById("category2"); // Kategori-knapp 2
const fetchGeoQuestions = document.getElementById("startCategory1"); // Start-knapp geografi
const fetchMythologyQuestions = document.getElementById("startCategory2"); // Start-knapp mytologi
const nextQuestionBtn = document.getElementById("next-question"); // Ev. nästa-knapp (döljs)
const resetBtn = document.getElementById("resetBtn"); // Starta om-knapp
const questionTitle = document.getElementById("questionTitle"); // H1 för frågetext

// Sektioner och texter
const welcomeSection = document.getElementById("welcomeSection"); // Välkomstvy
const category1Section = document.getElementById("category1Section"); // Geografi-intro
const category2Section = document.getElementById("category2Section"); // Mytologi-intro
const resultSection = document.getElementById("resultSection"); // Resultatvy
const questionSection = document.getElementById("questionSection"); // Frågevy
const resultText = document.getElementById("resultText"); // Resultattext

const category1Title = document.getElementById("category1Title"); // Titel kategori 1
const category2Title = document.getElementById("category2Title"); // Titel kategori 2
const category1Text = document.getElementById("category1Text"); // Brödtext kategori 1
const category2Text = document.getElementById("category2Text"); // Brödtext kategori 2

// Globalt quiz-tillstånd
let questions = []; // Hämtade frågor
let currentIndex = 0; // Aktuell frågeindex
let scoreLog = []; // Svarshistorik: {question, selected, correctAnswer, isCorrect}

// Hjälpare: blanda en array (Fisher–Yates)
function shuffle(arr) {
  const a = [...arr]; // Kopiera för att inte mutera originalet
  for (let i = a.length - 1; i > 0; i--) { // Loop baklänges
    const j = Math.floor(Math.random() * (i + 1)); // Slumpa index
    [a[i], a[j]] = [a[j], a[i]]; // Byt plats på element
  }
  return a; // Returnera blandad array
}

// UI-hjälpare för att visa/dölja
function show(el) { el.style.display = "block"; } // Visa element
function hide(el) { el.style.display = "none"; } // Dölj element

// Återställ quizets interna state
function resetState() {
  questions = []; // Töm frågor
  currentIndex = 0; // Börja från första frågan
  scoreLog = []; // Töm svarshistorik
}

// Starta quiz för vald kategori-id och sektion vi lämnar
function startQuiz(categoryId, fromSection) {
  resetState(); // Nollställ state
  hide(fromSection); // Dölj kategori-intro
  // Hämta frågor från OpenTDB
  fetch(`https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=medium&type=multiple`)
    .then((res) => res.json()) // Parsa JSON
    .then((data) => {
      questions = data.results || []; // Spara frågor
      if (!questions.length) { // Inga frågor?
        resultText.textContent = "Inga frågor hittades."; // Visa fel
        hide(questionSection); // Dölj frågedel
        show(resultSection); // Visa resultat
        return; // Avsluta
      }
      show(questionSection); // Visa frågedel
      hide(resultSection); // Dölj resultat-vy
      renderQuestion(); // Rendera första frågan
    })
    .catch((err) => {
      console.error("Error fetching quiz questions:", err); // Logga fel
      resultText.textContent = "Kunde inte hämta frågor."; // Visa fel i UI
      hide(questionSection); // Dölj frågor
      show(resultSection); // Visa resultat-vy
    });
}

// Rendera aktuell fråga och fyll varje knapp
function renderQuestion() {
  if (currentIndex >= questions.length) { // Slut på frågor?
    return finishQuiz(); // Gå till resultat
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

  if (nextQuestionBtn) hide(nextQuestionBtn); // Dölj "Next" (auto-vidare)
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
  resultText.textContent = `Du fick ${correctCount} av ${questions.length} rätt!`; // Visa resultat
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
