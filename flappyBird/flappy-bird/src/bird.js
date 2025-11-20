class Bird {
    constructor() {
        this.x = 50;
        this.y = 150;
        this.width = 34;
        this.height = 24;

        this.gravity = 0.4;
        this.lift = -7;
        this.velocity = 0;

        // animacja - trzy klatki
        this.frames = [];
        const base = "assets/Flappy Bird/";
        const names = [
            "yellowbird-downflap.png",
            "yellowbird-midflap.png",
            "yellowbird-upflap.png",
        ];
        names.forEach((n) => {
            const img = new Image();
            img.src = base + n;
            this.frames.push(img);
        });

        this.frameIndex = 0;
        this.animTick = 0;
        this.animSpeed = 5; // zmień, aby przyspieszyć/zwolnić animację
    }

    update() {
        // animacja skrzydeł
        this.animTick++;
        if (this.animTick >= this.animSpeed) {
            this.animTick = 0;
            this.frameIndex = (this.frameIndex + 1) % this.frames.length;
        }

        // fizyka
        this.velocity += this.gravity;
        this.y += this.velocity;

        // ograniczenia górny/lewy dolny
        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.velocity = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    flap() {
        this.velocity = this.lift;
    }

    // rysowanie z rotacją zależną od prędkości
    draw(ctx) {
        const img = this.frames[this.frameIndex];
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;

        // kąt pochylania (skaluj i ogranicz)
        let angle = this.velocity * 0.06;
        angle = Math.max(-0.8, Math.min(1.0, angle));

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.drawImage(
            img,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.restore();
    }
}
