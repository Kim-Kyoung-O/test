const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };
document.addEventListener('mousemove', function (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Raindrop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.length = Math.random() * 20 + 10;
    this.speed = Math.random() * 3 + 2;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      this.x -= dx / dist * 2;
      this.y -= dy / dist * 2;
    } else {
      this.y += this.speed;
    }

    if (this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(135, 206, 250, ${this.opacity})`;
    ctx.lineWidth = 1;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

let raindrops = [];
for (let i = 0; i < 300; i++) {
  raindrops.push(new Raindrop());
}

// 💧 클릭 시 퍼지는 물방울 클래스
class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.opacity = 0.5;
  }
