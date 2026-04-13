
// 1. Data Structure (Requirement: Use arrays/objects)
let flashcards = JSON.parse(localStorage.getItem('myCards')) || [];

// 2. Select Elements
const questionInput = document.getElementById('question-input');
const answerInput = document.getElementById('answer-input');
const addBtn = document.getElementById('add-btn');
const cardContainer = document.getElementById('card-container');
const errorMsg = document.getElementById('error-msg');

// 3. Add Card Function (Requirement: User input handling & Validation)
function addCard() {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    // Client-side Validation
    if (question === "" || answer === "") {
        errorMsg.classList.remove('hidden');
        return;
    }

    errorMsg.classList.add('hidden');

    const newCard = {
        id: Date.now(),
        question: question,
        answer: answer,
        isFlipped: false
    };

    flashcards.push(newCard);
    saveAndRender();
    
    // Clear inputs
    questionInput.value = "";
    answerInput.value = "";
}

// 4. Save and Render (Requirement: DOM Manipulation & Advanced Concept: localStorage)
function saveAndRender() {
    localStorage.setItem('myCards', JSON.stringify(flashcards));
    renderCards();
}

function renderCards() {
    cardContainer.innerHTML = "";

    flashcards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        // Dynamic Content
        cardElement.innerHTML = `
            <div class="card-content">
                <p class="text-label">${card.isFlipped ? "Answer:" : "Question:"}</p>
                <h3>${card.isFlipped ? card.answer : card.question}</h3>
            </div>
            <div class="card-actions">
                <button onclick="flipCard(${index})">Flip</button>
                <button class="delete-btn" onclick="deleteCard(${index})">Delete</button>
            </div>
        `;
        cardContainer.appendChild(cardElement);
    });
}

// 5. Card Logic (Requirement: Multiple interactive features)
window.flipCard = function(index) {
    flashcards[index].isFlipped = !flashcards[index].isFlipped;
    renderCards();
};

window.deleteCard = function(index) {
    flashcards.splice(index, 1);
    saveAndRender();
};

// Event Listeners
addBtn.addEventListener('click', addCard);

// Initial Load
renderCards();
