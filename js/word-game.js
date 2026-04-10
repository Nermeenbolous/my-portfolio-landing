const game = {
    targetWord: "APPLE",
    currentRow: 0,
    currentCol: 0,
    guesses: ["", "", "", "", "", ""],
    state: "playing"
};

const boardElement = document.getElementById("game-board");
const messageElement = document.getElementById("message");

// 1. Initialize Board
function initBoard() {
    boardElement.innerHTML = "";
    for (let i = 0; i < 30; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("id", `tile-${i}`);
        boardElement.appendChild(tile);
    }
}

// 2. Logic: Process Input
function processInput(key) {
    if (game.state !== "playing") return;

    const currentGuess = game.guesses[game.currentRow];

    if (key === "BACKSPACE") {
        game.guesses[game.currentRow] = currentGuess.slice(0, -1);
    } else if (key === "ENTER") {
        if (currentGuess.length === 5) {
            checkGuess();
        }
    } else if (key.length === 1 && /[A-Z]/.test(key)) {
        if (currentGuess.length < 5) {
            game.guesses[game.currentRow] += key;
        }
    }
}

// 3. Logic: Check Win/Loss
function checkGuess() {
    const guess = game.guesses[game.currentRow];
    
    if (guess === game.targetWord) {
        game.state = "win";
        messageElement.innerText = "You Win! 🎉";
    } else if (game.currentRow === 5) {
        game.state = "lose";
        messageElement.innerText = `Game Over. The word was ${game.targetWord}.`;
    } else {
        game.currentRow++;
    }
}

// 4. UI: Render Game
function renderGame() {
    game.guesses.forEach((guess, rowIdx) => {
        for (let colIdx = 0; colIdx < 5; colIdx++) {
            const tileIdx = rowIdx * 5 + colIdx;
            const tile = document.getElementById(`tile-${tileIdx}`);
            const letter = guess[colIdx] || "";
            
            tile.innerText = letter;

            // Only color rows that have been submitted
            if (rowIdx < game.currentRow || game.state !== "playing") {
                applyColors(tile, letter, colIdx);
            }
        }
    });
}

function applyColors(tile, letter, index) {
    if (!letter) return;
    if (game.targetWord[index] === letter) {
        tile.classList.add("correct");
    } else if (game.targetWord.includes(letter)) {
        tile.classList.add("present");
    } else {
        tile.classList.add("absent");
    }
}

// Listeners
document.addEventListener("keydown", (e) => {
    processInput(e.key.toUpperCase());
    renderGame();
});

document.getElementById("restart-btn").addEventListener("click", () => {
    game.currentRow = 0;
    game.guesses = ["", "", "", "", "", ""];
    game.state = "playing";
    messageElement.innerText = "Guess the 5-letter word!";
    initBoard();
});

initBoard();
