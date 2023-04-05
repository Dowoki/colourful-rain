let raindrops = [];
let bgColor = 0;
let rainColor = 255;

function setup() {
  createCanvas(700, 500);
  frameRate(120)
}

function draw() {
  background(bgColor);
  
  let gravity = createVector(0, 0.001);
  //gives a vertical acceleration to the objects (0.005 being the acceleration. The bigger the number the faster it is)
  
  // draw raindrops
  for (let i = raindrops.length - 1; i >= 0; i--) {
    let r = raindrops[i];
    r.applyForce(gravity);
    r.update();
    r.show(rainColor);
    if (r.isDead()) {
      raindrops.splice(i, 1);
      //raindrops.length makes a loop for the object to appear and disappear continuously
      //the isDead function makes the object disappear when it reaches the end of its lifespan or goes out of bounds
    }
  }
  
  // Add new balls when mouse is clicked
  if (mouseIsPressed) {
    for (let i = 0; i < 10; i++) {
      let r = new Rain(mouseX, mouseY);
      raindrops.push(r);
      //push saves the current functions of our drawing/object
    }
  }
  
  // Change ball color when 'r' is pressed
  if (keyIsPressed && key === 'r') {
    for (let r of raindrops) {
      rainColor = color(random(255), random(255), random(255));
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    bgColor=color(random(255), random(255), random (255));
  }
}

class Rain {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0.1);
    this.color = rainColor;
    this.lifespan = random(500);
    //vector gives the object a position (pos), velocity (vel) and acceleration (acc)
    //lifespan decides when our object disappears 
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 5;
  }
  
  show() {
    noStroke();
    //noStroke = no outline
    fill(this.color, this.lifespan);
    ellipse(this.pos.x, this.pos.y, 10);
  }
  
  isDead() {
    return this.lifespan <= 0;
  }
}
