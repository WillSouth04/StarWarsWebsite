class Dot {
  constructor(targetX, targetY) {
    this.pos = createVector(random(canvas.width), random(canvas.height));
    this.target = createVector(targetX, targetY);
    this.vel = createVector();
    this.vel.x = this.target.x - this.pos.x;
    this.vel.y = this.target.y - this.pos.y;
    this.vel.mult(0.01);
    this.mago = this.vel.mag();
    this.run = false;
    this.alreadyHit = false;
    this.targetVel = this.vel.copy();
    this.fuckedWith = false;

    this.reached = false;
  }

  move() {
    if(!this.reached) {


      this.pos.add(this.vel);
      // if(!this.run && dist(this.pos.x, this.pos.y, this.target.x, this.target.y) < 5) {
      if(dist(this.pos.x, this.pos.y, this.target.x, this.target.y) < 10) {
        this.reached = true;
        this.pos = this.target.copy();
        this.pos.x += random(2);
        this.pos.y += random(2);
      }
    }

    if(checkMousePos) {
      // if(dist(this.pos.x, this.pos.y, mouseX, mouseY) < 70) {
      //   if(!this.run) {
      //     if(this.reached) {
      //       this.vel = createVector(random(1) - 0.50, random(1) - 0.5);
      //       this.vel.normalize();
      //       this.vel.mult(7);
      //
      //     }
      //     this.run = true;
      //     this.vel.mult(-1);
      //     this.reached = false;
      //   }
      // } else {
      //   if(this.run) {
      //     this.run = false;
      //
      //     this.vel.mult(-1);
      //   }
      // }

      //middleMousePos doing that
      //incorporate mouse speed
      // let x = 1;
      // if(mouseSpeed)

      for(var m of mouseArray) {
        if(!this.alreadyHit && dist(this.pos.x, this.pos.y, m.x, m.y) < 40) {
          this.fuckedWith = true;
          // this.alreadyHit = true;
          this.vel = mouseVel.copy();
          // this.vel.x += random(-50, 50);
          // this.vel.y += random(-50, 50);
          this.vel.x *= random(0.95, 1.05);
          this.vel.y *= random(0.95, 1.05);
          // this.vel = createVector(this.pos.x - mouseX, this.pos.y - mouseY);

          // this.vel.mult(-1);
          this.vel.add(createVector(this.pos.x - m.x, this.pos.y - m.y).normalize().mult(mouseSpeed / 2));

          this.vel.normalize();
          this.vel.mult(mouseSpeed);

          this.vel.mult(0.3);
          this.reached = false;
          if(this.vel.mag() < 0.01) {
            this.vel.add(createVector(this.target.x - this.pos.x, this.target.y - this.pos.y));
            this.vel.normalize();
          }
        } else {
          if(this.fuckedWith) {
            //turn it towards position
            let temp = this.vel.mag();
            let targetVel = createVector(this.target.x - this.pos.x, this.target.y - this.pos.y);
            targetVel.normalize();
            targetVel.mult(10);
            // this.vel.add(createVector(this.target.x - this.pos.x, this.target.y - this.pos.y).mult(0.2));
            // this.vel.normalize();
            // this.vel.mult(temp);
            //
            // if(temp < 10 - 0.1) {
            //   this.vel.mult(1.05);
            // } else if(temp > 10 + 0.1) {
            //   this.vel.mult(0.95);
            // } else {
            //   this.vel.normalize();
            //   this.vel.mult(10);
            // }
            let closeness = dist(this.vel.x, this.vel.y, targetVel.x, targetVel.y);

            if(closeness < 0.1) {
              this.vel = targetVel.copy();

              // this.vel.mult(1.05);
            } else {
              this.vel.mult(19);
              this.vel.add(targetVel);
              this.vel.mult(0.05)
            }
            // } else {
            //   this.vel.normalize();
            //   this.vel.mult(10);
            // }
          }


        }
      }
      this.alreadyHit = false;


      //final mouse position
      //
      //   if(!this.alreadyHit && dist(this.pos.x, this.pos.y, mouseX, mouseY) < 50) {
      //     this.vel = mouseVel.copy();
      //     this.vel.x += random(-100, 100);
      //     this.vel.y += random(-100, 100);
      //     // this.vel = createVector(this.pos.x - mouseX, this.pos.y - mouseY);
      //     this.vel.normalize();
      //     this.vel.mult(mouseSpeed);
      //
      //     this.vel.mult(0.2);
      //     this.reached = false;
      //     if(this.vel.mag() < 0.01) {
      //       this.vel.add(createVector(this.target.x - this.pos.x, this.target.y - this.pos.y));
      //       this.vel.normalize();
      //     }
      //   } else {
      //
      //     //turn it towards position
      //     let temp = this.vel.mag();
      //     this.vel.add(createVector(this.target.x - this.pos.x, this.target.y - this.pos.y).mult(0.2));
      //     this.vel.normalize();
      //     this.vel.mult(temp);
      //
      //     if(temp < this.mago - 0.1) {
      //       this.vel.mult(1.1);
      //     } else if(temp > this.mago + 0.1) {
      //       this.vel.mult(0.9);
      //     } else {
      //       this.vel.normalize();
      //       this.vel.mult(this.mago);
      //     }
      //
      //
      //   }
      //
      //
    }
  }



  show() {
    noStroke();
    fill(255, 255, 255);
    ellipse(this.pos.x, this.pos.y, 5);


  }
  resetTarget(vec) {
    this.target = vec;
    this.vel = createVector();
    this.vel.x = this.target.x - this.pos.x;
    this.vel.y = this.target.y - this.pos.y;
    this.vel.mult(0.01);
    this.reached = false;
    this.fuckedWith = false;
  }

  clone() {
    var clone = new Dot(this.target.x, this.target.y);
    return clone;
  }


}
