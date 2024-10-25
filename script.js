function showSignup() {
    document.getElementById("formTitle").textContent = "Sign Up";
    document.getElementById("confirmPasswordGroup").style.display = "block";
}

function showLogin() {
    document.getElementById("formTitle").textContent = "Login";
    document.getElementById("confirmPasswordGroup").style.display = "none";
}

// Mouse Following Particle Animation //

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let particlesArray = [];

// Particle class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles(e) {
  const x = e.x;
  const y = e.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle(x, y));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    // Remove small particles
    if (particlesArray[i].size <= 0.2) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animateParticles);
}

// Event listeners
window.addEventListener('mousemove', createParticles);
animateParticles();