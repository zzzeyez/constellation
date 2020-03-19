const particles = [];
var col = {
	r: 0,
	g: 0,
	b: 0,
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
	frameRate(12);

	// random color
	col.r = random(200, 230);
	col.g = random(200, 230);
	col.b = random(200, 230);

  const particlesLength = Math.floor(window.innerWidth / 10);

  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(col.r,col.g,col.b);
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    p.checkParticles(particles.slice(index));
  });
}

function mousePressed() {
	col.r = random(200, 230);
	col.g = random(200, 230);
	col.b = random(200, 230);
}

class Particle {
  constructor() {
    // position
		this.pos = createVector(random(width), random(height));
		// this.pos = createVector(mouseX + random(-50, 50), mouseX + random(-50, 50));
    // velocity
    this.vel = createVector(random(-1, 1), random(-1, 1));
    // size
    this.size = random(3, 8);
  }

  // update movement by adding velocity
  update() {
    this.pos.add(this.vel);
    this.edges();


  }

  // draw single particle
  draw() {
    noStroke();
    fill("rgba(255,255,255,0.8)");
    circle(this.pos.x, this.pos.y, this.size);
  }

  // detect screen edges
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  // connect particles
  checkParticles(particles) {
    particles.forEach(particle => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

      if (d < 80) {
        stroke("rgba(255,255,255,0.5)");
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
