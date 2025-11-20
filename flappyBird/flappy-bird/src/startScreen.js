(function () {
    const messageImage = new Image();
    messageImage.src = "assets/UI/message.png";

    let gameStarted = false;

    window.drawStartScreen = function (ctx, canvas) {
        // tło
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // rysuj obrazek message.png w środku
        if (messageImage.naturalHeight > 0) {
            const imgWidth = 280;
            const imgHeight =
                (imgWidth / messageImage.naturalWidth) *
                messageImage.naturalHeight;
            ctx.drawImage(
                messageImage,
                canvas.width / 2 - imgWidth / 2,
                canvas.height / 2 - imgHeight / 2,
                imgWidth,
                imgHeight
            );
        }

        // tekst instrukcji
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
            "Naciśnij SPACJĘ aby zacząć",
            canvas.width / 2,
            canvas.height / 2 + 100
        );
    };

    window.isGameStarted = function () {
        return gameStarted;
    };

    window.setGameStarted = function (value) {
        // jeśli wartość się nie zmienia — nic nie rób
        if (Boolean(value) === gameStarted) return;

        gameStarted = Boolean(value);

        if (gameStarted) {
            // uruchom BGM jeśli dostępne
            if (
                typeof Sounds !== "undefined" &&
                typeof Sounds.startBGM === "function"
            ) {
                Sounds.startBGM();
            }
        } else {
            // zatrzymaj BGM (np. przy resetowaniu gry)
            if (
                typeof Sounds !== "undefined" &&
                typeof Sounds.stopBGM === "function"
            ) {
                Sounds.stopBGM();
            }
        }
    };
})();
