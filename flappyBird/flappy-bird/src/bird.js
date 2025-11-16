class Bird {
    constructor() {
        this.x = 50; // Starting x position
        this.y = 150; // Starting y position
        this.width = 34; // Width of the bird sprite
        this.height = 24; // Height of the bird sprite
        this.gravity = 0.4; // Gravity effect
        this.lift = -7; // Lift effect when jumping
        this.velocity = 0; // Initial velocity
        this.velocityY = 0; // Initial velocity Y
        this.image = new Image(); // Bird image
        this.image.src = "assets/Flappy Bird/yellowbird-downflap.png"; // Path to bird sprite
    }

    update() {
        this.velocity += this.gravity; // Apply gravity
        this.y += this.velocity; // Update y position

        // Prevent the bird from falling off the canvas
        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.velocity = 0; // Reset velocity
        }

        // Prevent the bird from flying off the top of the canvas
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0; // Reset velocity
        }
    }

    jump() {
        this.velocity += this.lift; // Apply lift
    }

    flap() {
        this.velocity = this.lift; // Użyj lift zamiast velocityY
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // Draw the bird
    }
}
