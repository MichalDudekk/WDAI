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
let gameOverTriggered = false; // flaga, aby endGame() wywoływał się tylko raz
let backgroundImage = new Image();
backgroundImage.src = "assets/Flappy Bird/background-day.png";

// dodane: base (ziemia) i wysokość (dopasuj BASE_HEIGHT jeśli potrzeba)
const baseImage = new Image();
baseImage.src = "assets/Flappy Bird/base.png";
const BASE_HEIGHT = 112; // typowa wysokość "base" w pikselach; zmień jeśli używasz innego obrazu
const BASE_OFFSET = 40; // przesunięcie "base" w dół (większa wartość = bardziej w dół)

let birdCrashed = false; // nowa flaga: ptak uderzył w rurę
let crashFrames = 0; // licznik klatek dla animacji spadania

function startGame() {
    bird = new Bird();
    pipes = [];
    score = 0;
    gameOver = false;
    gameOverTriggered = false;
    birdCrashed = false; // zresetuj
    crashFrames = 0; // zresetuj
    frameCount = 0;
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    // jeśli gra się nie zaczęła — rysuj ekran startowy
    if (!isGameStarted()) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        bird.draw(ctx);
        ctx.drawImage(
            baseImage,
            0,
            canvas.height - BASE_HEIGHT + BASE_OFFSET,
            canvas.width,
            BASE_HEIGHT
        );
        console.log("Drawing1");
        if (typeof drawStartScreen === "function") {
            console.log("Drawing start screen");
            drawStartScreen(ctx, canvas);
        }
        requestAnimationFrame(gameLoop);
        return;
    }

    if (gameOver && !gameOverTriggered) {
        gameOverTriggered = true;
        endGame();
        return;
    }

    if (gameOverTriggered) {
        return; // czekaj na klik przycisku "Zagraj ponownie"
    }

    frameCount++;
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // jeśli ptak się nie rozbił — normalna aktualizacja
    if (!birdCrashed) {
        bird.update();
    }

    // kolizja z "base" (ziemią)
    const baseTopY = canvas.height - BASE_HEIGHT + BASE_OFFSET;
    if (bird.y + bird.height >= baseTopY && !birdCrashed) {
        bird.y = baseTopY - bird.height;
        gameOver = true;
        birdCrashed = true;
        if (typeof Sounds !== "undefined") Sounds.die();
    }

    // generuj nowe rury TYLKO jeśli ptak się nie rozbił
    if (frameCount % 100 === 0 && !birdCrashed) {
        const randomHeight =
            Math.floor(Math.random() * (canvas.height - 150 - 20)) + 20;
        pipes.push(new Pipe(canvas.width, randomHeight));
    }

    // aktualizuj ruchy rur TYLKO jeśli ptak się nie rozbił
    if (!birdCrashed) {
        pipes.forEach((pipe) => {
            pipe.update();
            if (pipe.offscreen()) {
                pipes.splice(pipes.indexOf(pipe), 1);
                score++;
                if (typeof Sounds !== "undefined") Sounds.score(); // dźwięk punktu
            }
            if (pipe.collides(bird) && !birdCrashed) {
                birdCrashed = true;
                crashFrames = 0;
                if (typeof Sounds !== "undefined") Sounds.hit();
            }
        });
    }

    // animacja spadania po uderzeniu w rurę
    if (birdCrashed && !gameOver) {
        crashFrames++;
        bird.velocity += 0.5; // przyspieszenie spadania
        bird.y += bird.velocity;

        // po 30 klatkach lub gdy ptak dotknie ziemi — koniec gry
        if (crashFrames > 30 || bird.y + bird.height >= baseTopY) {
            bird.y = baseTopY - bird.height;
            gameOver = true;
        }
    }
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

function endGame() {
    if (typeof drawGameOver === "function") {
        drawGameOver(score, ctx, canvas, () => {
            // callback: Zagraj ponownie
            startGame();
        });
    } else {
        // fallback jeśli gameOver.js nie załadowany
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !gameOver) {
        if (!isGameStarted()) setGameStarted(true);
        bird.flap();
        if (typeof Sounds !== "undefined") Sounds.flap(); // dźwięk machania skrzydłami
    }
});

// start gry — włącz BGM
startGame();
if (typeof Sounds !== "undefined") Sounds.startBGM();
