document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btn");
    const message = document.getElementById("message");
    const canvas = document.getElementById("confetti");

    btn.addEventListener("click", () => {
        message.classList.remove("hidden");
        lancerConfettis(canvas);
    });
});

function lancerConfettis(canvas) {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettis = [];

    for (let i = 0; i < 120; i++) {
        confettis.push(creerConfetti(canvas));
    }

    function animation() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettis.forEach(c => {
            ctx.fillStyle = c.color;
            ctx.fillRect(c.x, c.y, c.size, c.size);

            c.y += c.speed;
            c.x += Math.sin(c.y / 50) * 0.5; // effet flottant

            // ♻️ Recyclage → animation infinie
            if (c.y > canvas.height) {
                Object.assign(c, creerConfetti(canvas));
                c.y = -c.size;
            }
        });

        requestAnimationFrame(animation);
    }

    animation();
}

function creerConfetti(canvas) {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 6 + 4,
        speed: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
    };
}
