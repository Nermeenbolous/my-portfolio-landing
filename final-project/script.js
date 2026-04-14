

let flashcards = JSON.parse(localStorage.getItem('myCards')) || [];


const questionInput = document.getElementById('question-input');
const answerInput = document.getElementById('answer-input');
const addBtn = document.getElementById('add-btn');
const cardContainer = document.getElementById('card-container');
const errorMsg = document.getElementById('error-msg');


function addCard() {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    
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
    
 
    questionInput.value = "";
    answerInput.value = "";
}


function saveAndRender() {
    localStorage.setItem('myCards', JSON.stringify(flashcards));
    renderCards();
}

function renderCards() {
    cardContainer.innerHTML = "";

    flashcards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        
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


window.flipCard = function(index) {
    flashcards[index].isFlipped = !flashcards[index].isFlipped;
    renderCards();
};

window.deleteCard = function(index) {
    flashcards.splice(index, 1);
    saveAndRender();
};


addBtn.addEventListener('click', addCard);


renderCards();
