class Pipe {
    constructor(x, height) {
        this.x = x;
        this.height = height;
        this.width = 52; // Width of the pipe
        this.gap = 100; // Gap between the upper and lower pipes
        this.passed = false; // Flag to check if the bird has passed the pipe
        this.pipeImage = new Image();
        this.pipeImage.src = "assets/Flappy Bird/pipe-green.png"; // Path to pipe sprite
    }

    draw(ctx) {
        // Upper pipe
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.height / 2);
        ctx.rotate(Math.PI);
        ctx.drawImage(
            this.pipeImage,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.restore();

        // Lower pipe
        ctx.drawImage(
            this.pipeImage,
            this.x,
            this.height + this.gap,
            this.width,
            ctx.canvas.height - this.height - this.gap
        );
    }

    update() {
        this.x -= 2; // Move the pipe to the left
    }

    reset() {
        this.x = canvas.width; // Reset pipe position to the right of the canvas
        this.height =
            Math.floor(Math.random() * (canvas.height - this.gap - 20)) + 20; // Random height for the pipe
        this.passed = false; // Reset passed flag
    }

    collides(bird) {
        // Sprawdzenie kolizji z górną rurą
        if (
            bird.x + bird.width > this.x &&
            bird.x < this.x + this.width &&
            bird.y < this.height
        ) {
            return true;
        }

        // Sprawdzenie kolizji z dolną rurą
        if (
            bird.x + bird.width > this.x &&
            bird.x < this.x + this.width &&
            bird.y + bird.height > this.height + this.gap
        ) {
            return true;
        }

        return false; // No collision
    }

    offscreen() {
        return this.x + this.width < 0; // Zwraca true, jeśli rura wychodzi poza lewy brzeg
    }
}
