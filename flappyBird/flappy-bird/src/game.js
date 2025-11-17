// This file manages the game state, including starting, updating, and ending the game.
// It handles collision detection and score tracking.

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ustaw rozmiar atrybutów canvasa tak, aby odpowiadały rzeczywistemu rozmiarowi w DOM
// (wykonujemy to przed tworzeniem Bird i uruchomieniem gry)
const rect = canvas.getBoundingClientRect();
canvas.width = Math.round(rect.width);
canvas.height = Math.round(rect.height);

let bird;
let pipes = [];
let score = 0;
let gameOver = false;
let frameCount = 0;
let backgroundImage = new Image();
backgroundImage.src = "assets/Flappy Bird/background-day.png";

// dodane: base (ziemia) i wysokość (dopasuj BASE_HEIGHT jeśli potrzeba)
const baseImage = new Image();
baseImage.src = "assets/Flappy Bird/base.png";
const BASE_HEIGHT = 112; // typowa wysokość "base" w pikselach; zmień jeśli używasz innego obrazu
const BASE_OFFSET = 40; // przesunięcie "base" w dół (większa wartość = bardziej w dół)

function startGame() {
    bird = new Bird();
    pipes = [];
    score = 0;
    gameOver = false;
    frameCount = 0;
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (gameOver) {
        return;
    }

    frameCount++;
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    bird.update();

    // kolizja z "base" (ziemią) - używamy wysokości base i offsetu
    const baseTopY = canvas.height - BASE_HEIGHT + BASE_OFFSET;
    if (bird.y + bird.height >= baseTopY) {
        // ustaw ptaka dokładnie na ziemi (opcjonalne), odtwórz dźwięk i zakończ grę
        bird.y = baseTopY - bird.height;
        gameOver = true;
        if (typeof dieSound !== "undefined") dieSound.play();
    }

    if (frameCount % 100 === 0) {
        const randomHeight =
            Math.floor(Math.random() * (canvas.height - 150 - 20)) + 20;
        pipes.push(new Pipe(canvas.width, randomHeight));
    }

    pipes.forEach((pipe) => {
        pipe.update();
        if (pipe.offscreen()) {
            pipes.splice(pipes.indexOf(pipe), 1);
            score++;
        }
        if (pipe.collides(bird)) {
            gameOver = true;
            dieSound.play();
        }
    });
}

function draw() {
    // Narysuj tło
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    bird.draw(ctx);
    pipes.forEach((pipe) => pipe.draw(ctx));

    // rysuj ziemię (base) na dole z offsetem
    ctx.drawImage(
        baseImage,
        0,
        canvas.height - BASE_HEIGHT + BASE_OFFSET,
        canvas.width,
        BASE_HEIGHT
    );

    // rysuj wynik obrazkami
    if (typeof drawScoreSprites === "function") {
        drawScoreSprites(score, ctx, canvas, {
            padding: 12,
            digitHeight: 36,
            spacing: 4,
        });
    } else {
        // debug: funkcja niedostępna
        // console.warn("drawScoreSprites is not defined");
    }
}

// function drawScoreSprites(score, ctx, canvas, options) {
//     const { padding, digitHeight, spacing } = options;
//     const fontSize = digitHeight;
//     const lineHeight = digitHeight + spacing;
//     const x = padding;
//     const y = canvas.height - BASE_HEIGHT - lineHeight;

//     ctx.font = `${fontSize}px Arial`;
//     ctx.fillStyle = "black";

//     const digits = score.toString().split("").reverse();
//     for (let i = 0; i < digits.length; i++) {
//         const digit = digits[i];
//         const x = padding + i * (digitHeight + spacing);
//         ctx.fillText(digit, x, y);
//     }
// }

function endGame() {
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !gameOver) {
        bird.flap();
    }
});

startGame();
