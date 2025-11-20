// ...new file...
(function () {
    const STORAGE_KEY = "flappyBirdTopScores";
    const MAX_SCORES = 5;

    // załaduj top 5 wyników z localStorage
    function loadTopScores() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    // zapisz wynik do top 5
    function saveScore(newScore) {
        let scores = loadTopScores();
        scores.push(newScore);
        scores.sort((a, b) => b - a); // malejąco
        scores = scores.slice(0, MAX_SCORES); // tylko top 5
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
        return scores;
    }

    // załaduj obrazek Game Over
    const gameOverImage = new Image();
    gameOverImage.src = "assets/UI/gameover.png";

    // rysuj ekran Game Over
    window.drawGameOver = function (currentScore, ctx, canvas, onReplay) {
        const topScores = saveScore(currentScore);
        const bestScore = topScores[0] || 0;

        // półprzezroczyste tło
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // rysuj obrazek "Game Over"
        if (gameOverImage.naturalHeight > 0) {
            const imgWidth = 300;
            const imgHeight =
                (imgWidth / gameOverImage.naturalWidth) *
                gameOverImage.naturalHeight;
            ctx.drawImage(
                gameOverImage,
                canvas.width / 2 - imgWidth / 2,
                canvas.height / 2 - imgHeight - 40,
                imgWidth,
                imgHeight
            );
        }

        // wynik z poprzedniej gry
        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(
            `Wynik: ${currentScore}`,
            canvas.width / 2,
            canvas.height / 2 + 20
        );

        // najlepszy wynik
        ctx.fillText(
            `Najlepszy: ${bestScore}`,
            canvas.width / 2,
            canvas.height / 2 + 50
        );

        // przycisk "Zagraj ponownie"
        const buttonX = canvas.width / 2 - 80;
        const buttonY = canvas.height / 2 + 100;
        const buttonW = 160;
        const buttonH = 40;

        ctx.fillStyle = "rgba(100, 200, 100, 0.8)";
        ctx.fillRect(buttonX, buttonY, buttonW, buttonH);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(buttonX, buttonY, buttonW, buttonH);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(
            "Zagraj ponownie",
            canvas.width / 2,
            buttonY + buttonH / 2
        );

        // obsługa klikania przycisku
        canvas.addEventListener("click", function handleClick(e) {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            if (
                clickX >= buttonX &&
                clickX <= buttonX + buttonW &&
                clickY >= buttonY &&
                clickY <= buttonY + buttonH
            ) {
                canvas.removeEventListener("click", handleClick);
                if (typeof onReplay === "function") onReplay();
            }
        });
    };

    // publiczna funkcja do pobrania top 5 wyników
    window.getTopScores = function () {
        return loadTopScores();
    };
})();
