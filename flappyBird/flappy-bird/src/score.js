// ...new file...
(function () {
    const basePath = "assets/UI/Numbers/"; // oczekiwane pliki: 0.png .. 9.png
    const imgs = new Array(10);
    let loadedCount = 0;
    let allLoaded = false;

    function load() {
        for (let i = 0; i <= 9; i++) {
            const img = new Image();
            img.src = `${basePath}${i}.png`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === 10) allLoaded = true;
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === 10) allLoaded = true;
            };
            imgs[i] = img;
        }
    }

    // rysuje wynik w prawym górnym rogu za pomocą obrazków cyfr (używa CSS-px szerokości)
    window.drawScoreSprites = function (score, ctx, canvas, opts = {}) {
        const padding = opts.padding ?? 12;
        const digitHeight = opts.digitHeight ?? 36;
        const spacing = opts.spacing ?? 4;
        const useImages = allLoaded && imgs[0] && imgs[0].naturalHeight > 0;

        const text = String(Math.max(0, Math.floor(score)));
        const displayWidth = canvas.clientWidth || canvas.width; // CSS px

        if (!useImages) {
            // fallback: zwykły tekst (po prawej)
            ctx.fillStyle = "white";
            ctx.font = `${digitHeight}px Arial`;
            ctx.textBaseline = "top";
            const textWidth = ctx.measureText(text).width;
            ctx.fillText(text, displayWidth - padding - textWidth, padding);
            return;
        }

        const sample = imgs[0];
        const scale = digitHeight / sample.naturalHeight;
        const digitWidth = Math.round(sample.naturalWidth * scale);

        const totalWidth =
            text.length * digitWidth + Math.max(0, text.length - 1) * spacing;
        let x = displayWidth - padding - totalWidth;
        const y = padding;

        for (let i = 0; i < text.length; i++) {
            const d = +text[i];
            const img = imgs[d];
            ctx.drawImage(img, x, y, digitWidth, digitHeight);
            x += digitWidth + spacing;
        }
    };

    load();
})();
