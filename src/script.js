const rulesScreen = document.getElementById("rules-content");
const rulesButtons = document.querySelectorAll(".rules-button");
const closeRulesButton = document.getElementById("close-rules");
const playButton = document.getElementById("play-button")
const restartButton = document.getElementById("restart-button")
const homeButton = document.getElementById("home-button")
const finalResultText = document.getElementById("final-result");
const gameContent = document.getElementById("game-content");

const totalRounds = 3;
let currentRound = 1;

const glassSafeImgSrc = "./src/assets/glass-img-1.png";
const glassSafeImgAlt = "Imagem de um vidro seguro";
const glassBrokenImgSrc = "./src/assets/broken_glass-img-2.png";
const glassBrokenImgAlt = "Imagem de um vidro quebrado";

rulesButtons.forEach(button => {
    button.addEventListener("click", () => rulesScreen.classList.add("show"));
});

closeRulesButton.addEventListener("click", () => rulesScreen.classList.remove("show"));

playButton.addEventListener("click", startGame);

restartButton.addEventListener("click", () => {
    finalResultText.textContent = "Tente sua sorte";
    gameContent.innerHTML = "";
    startGame();
});

homeButton.addEventListener("click", () => showScreen("main-screen"));

function showScreen(screenId) {
    const screens = ["main-screen", "game-screen"];
    screens.forEach(id => {
        const screen = document.getElementById(id);
        screen.style.display = id === screenId ? "flex" : "none";
    });
}

function startGame() {
    currentRound = 1;
    gameContent.innerHTML = "";
    finalResultText.textContent = "Tente sua sorte";
    showScreen("game-screen");
    createRound();
}

function createRound() {
    const roundBox = document.createElement("div");
    roundBox.classList.add("game");

    const button1 = createGlassButton(1, roundBox);
    const button2 = createGlassButton(2, roundBox);

    roundBox.append(button1, button2);
    gameContent.appendChild(roundBox);
}

function createGlassButton(choice, roundBox) {
    const button = document.createElement("button");
    button.className = "glass-button";
    button.dataset.choice = choice;

    const glassBox = document.createElement("div");
    glassBox.classList.add("glass-box");

    button.appendChild(glassBox);
    button.addEventListener("click", () => evaluateChoice(choice));

    return button;
}

function evaluateChoice(choice) {
    const safeGlass = Math.floor(Math.random() * 2) + 1;
    const currentRoundBox = document.querySelector(`#game-content > .game:last-child`);
    const buttons = currentRoundBox.querySelectorAll(".glass-button");

    buttons.forEach((btn, index) => {
        btn.disabled = true;
        const chosen = parseInt(btn.dataset.choice);
        const isCorrect = chosen === safeGlass;
        const glassElement = btn.querySelector(".glass-box");

        if (glassElement) {
            if (isCorrect) {
                glassElement.classList.add("correct");
                glassElement.textContent = "Seguro";
            } else {
                glassElement.classList.add("incorrect");
                glassElement.textContent = "Quebrou";
            }
        }
    });

    if (choice === safeGlass) {
        finalResultText.textContent = "Você pisou no vidro certo!";
        currentRound++;

        if (currentRound <= totalRounds) {
            setTimeout(createRound, 1000);
        } else {
            setTimeout(() => {
                finalResultText.textContent = "🎉 Parabéns! Você atravessou a ponte!";
            }, 1000);
        }

    } else {
        finalResultText.textContent = "💥 O vidro quebrou! Você perdeu";
        setTimeout(() => startGame(), 2000);
    }
}