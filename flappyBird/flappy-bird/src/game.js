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

    console.log(`${bird.y} + ${bird.height} >= ${canvas.height}`);

    if (bird.y + bird.height >= canvas.height) {
        console.log("aaa");
        gameOver = true;
        dieSound.play();
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
    drawScore();
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

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
