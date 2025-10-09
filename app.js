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
})

// Kategori 2 -> Questions
startCategory2.addEventListener('click', (e) => {
    category2Section.style.display = 'none';
    questionSection.style.display = 'block';
})