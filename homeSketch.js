var targetImage;
var targetImages = [];
var first = true;
var count = 0;
var vecs = [];

var dots = [];
var imageNo = 0;
var reachCount = 30;


var checkMousePos = true;
var pause = false;

var targets = [];
var totalDots = 3700;


var mouseSpeed = 0;
var mouseVel;
// = createVector(0, 0);
var previousPosition;
var middleMousePos;

var mouseArray = [];
var mouseArraySize = 10;


function preload() {

  var tempArray = [];

  targetImages.push(loadImage("./img/targetImage3.png"));



  tempArray.push(loadImage("./img/targetImage1.png"));
  tempArray.push(loadImage("./img/targetImage2.png"));
  tempArray.push(loadImage("./img/targetImage4.png"));
  tempArray.push(loadImage("./img/targetImage5.png"));
  tempArray.push(loadImage("./img/targetImage6.png"));
  tempArray.push(loadImage("./img/targetImage7.png"));


  while (tempArray.length > 0) {
    targetImages.push(tempArray.splice(floor(random(tempArray.length)), 1)[0]);
  }


  //TRY shuffling array


  // targetImages.push(loadImage("img/targetImage1.png"));
  // targetImage2 = loadImage()
}

function setup() {
  window.canvas = createCanvas(1280, 720);
  canvas.parent('canvas');

  frameRate(20);
  print("nice");
  pixelDensity(1);
  // targetImage = createImage(canvas.width, canvas.height);
  var count = 0;
  targetImages[imageNo].loadPixels();
  var scale = canvas.width / targetImages[imageNo].width;
  for (var y = 0; y < targetImages[imageNo].height; y += 5) {
    for (var x = 0; x < targetImages[imageNo].width; x += 5) {
      var index = (x + y * targetImages[imageNo].width) * 4;
      if (targetImages[imageNo].pixels[index + 0] == 0 && targetImages[imageNo].pixels[index + 1] == 0 && targetImages[imageNo].pixels[index + 2] == 0) {
        targets.push(createVector(x * scale, y * scale));
        // dots.push(new Dot(x * scale, y * scale));
      }
    }
  }

  for (var i = 0; i < totalDots; i++) {
    if (targets.length > 0) {
      var temp = targets.splice(floor(random(targets.length)), 1)[0];
      dots.push(new Dot(temp.x, temp.y));
    } else {
      dots.push(dots[floor(random(dots.length))].clone());
    }
  }

  // print(count);
  mouseVel = createVector();
  mouseSpeed = 0;
  previousPosition = createVector();
  middleMousePos = createVector();



}


function draw() {

  if (!pause) {
    background(0, 0, 0);
    checkMousePos = frameCount % 1 == 0;
    for (var d of dots) {
      d.move();
      d.show();
    }

    var allReached = true;
    for (var d of dots) {
      if (!d.reached) {
        allReached = false;
      }
    }

    if (allReached) {
      if (reachCount < 0) {
        reachCount = 50;
        nextImage();

      } else {
        reachCount--;
      }
    }

    mouseArray = [];
    let temp = previousPosition.copy();
    let adder = createVector(mouseX - previousPosition.x, mouseY - previousPosition.y);
    adder.mult(1.0 / mouseArraySize);
    for (var i = 0; i < mouseArraySize; i++) {
      temp.add(adder);
      mouseArray.push(temp.copy());
    }


    middleMousePos = createVector((mouseX + previousPosition.x) / 2, (mouseY + previousPosition.y) / 2);


    mouseVel = createVector(mouseX - previousPosition.x, mouseY - previousPosition.y);
    mouseSpeed = mouseVel.mag();
    previousPosition = createVector(mouseX, mouseY);

    fill(255, 255, 255, 100);
    if (mouseSpeed < 40) {
      mouseSpeed = 40
    }
    for (var m of mouseArray) {
      ellipse(m.x, m.y, 50);

    }
  }
}

function nextImage() {
  imageNo++;
  if (imageNo >= targetImages.length) {
    imageNo = 0;
  }

  vecs = [];

  targetImages[imageNo].loadPixels();
  var scale = canvas.width / targetImages[imageNo].width;
  for (var y = 0; y < targetImages[imageNo].height; y += 4) {
    for (var x = 0; x < targetImages[imageNo].width; x += 4) {
      var index = (x + y * targetImages[imageNo].width) * 4;
      if (targetImages[imageNo].pixels[index + 0] == 0 && targetImages[imageNo].pixels[index + 1] == 0 && targetImages[imageNo].pixels[index + 2] == 0) {
        vecs.push(createVector(x * scale, y * scale));
      }
    }
  }
  //
  // for(var i = 0; i < totalDots; i++) {
  //   if(targets.length > 0) {
  //     var temp = targets.splice(floor(random(targets.length)), 1)[0];
  //     dots.push(new Dot(temp.x, temp.y));
  //   } else {
  //     dots.push(dots[floor(random(dots.length))].clone());
  //   }
  // }
  for (var i = 0; i < dots.length; i++) {
    if (vecs.length > 0) {
      dots[i].resetTarget(vecs.splice(floor(random(vecs.length)), 1)[0]);
    } else {
      dots[i].resetTarget(dots[floor(random(i))].target);
    }
  }


}
