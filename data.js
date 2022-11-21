const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

async function getData() {
  const api_url =
    "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&product_type=eyeshadow";
  const api_data = await fetch(api_url);
  const api_json = await api_data.json();
  const data = api_json.slice(
    (0 === "#2185C5", 1 === "#FFFAF0 ", 2 === "#FF1493 ", 3 === "#FF7F66 ")
  );

  console.log(data);

  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  const colors = ["#2185C5", "#FFFAF0 ", "#FF1493 ", "#FF7F66 "];

  addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
  });

  // Objects
  class Particle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }

    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.shadowColor = this.color;
      c.shadowBlur = 15;
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    }

    update() {
      this.draw();
    }
  }

  // Implementation
  let particles;
  function init() {
    particles = [];

    for (let i = 0; i < 1500; i++) {
      const canvasWidth = canvas.width + 100;
      const canvasHeight = canvas.height + 200;

      const x = Math.random() * canvasWidth - canvasWidth / 2;
      const y = Math.random() * canvasHeight - canvasHeight / 2;
      const radius = 2 * Math.random();

      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, radius, color));
    }
  }

  let radians = 0;
  let alpha = 1;
  function animate() {
    c.fillStyle = `rgba(10, 10, 10, ${alpha})`;
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.translate(canvas.width / 2, canvas.height / 2);
    c.rotate(radians);
    particles.forEach((particle) => {
      particle.update();
    });
    c.restore();

    radians += 0.003;
  }

  init();
  animate();
}
getData();
