//scene iteration
let scene = 1; 
let nextScene = false;
let sceneChange = false;

//images
let kitchenBg;
let odysseusSprite;
let odysseusShockedSprite;
let breadImage;
let lightbulbImage;
let foreheadImage;
let cookieImage;
let boohbahImage;
let blurBathroomImg;
let mirrorImage;
let manBabyImg;
let medicineShelfImg
let odysseusLayingSprite;
let theEndImage;

//sprite movement
let odysseusX = -100; // Start off-screen
let odysseusY = 300;

//dialog
let thoughtText = ["I'm so hungry!", "What's that?"];
let thoughtIndex = 0;

// Sounds
let sound;
let magicSound;
let burpSound;
let munchSound;
let fartSound;
let ideaSound;
let walkSound;
let manBabySound;
let doorSound;
let yaySound;
let gulpSound;
let snoreSound
let yawnSound; 
let hungrySound;
let happySong;

//browser blocks automatic sounds
let soundEnabled = false;

//Single sound - no loop
let munchPlayed = false;
let burpPlayed = false;
let fartPlayed = false;
let ideaSoundPlayed = false;
let angrySoundPlayed = false;
let medicineShelfShown = false;
let textState = 0;
let hungryPlayed = false;
let yawnPlayed = false;
let snorePlayed = false;
let odysseusAsleep = false;
let moveOffScreen = false;


// Timer
let cookieStartTime = 0;
let boohbahStartTime = 0;
let walkStartTime = 0;
let postBabyManStartTime = 0;
let medicineSceneStartTime = 0;
let thoughtTimer = 0;
let breadStartTime = 0;
let fartStartTime = 0;
let dialogStartTime = 0;
let munchStartTime = 0;
let textStartTime = 0; 
let wakeUpTimer = 0; 
let hungrySoundTimer = 0;
let blackScreenTimer = 0; 
let weirdFaceStartTime = 0;
let uhOhTimer = 0;
let captureStartTime = 0;
let transitionStartTime;
let transitionDuration = 3000; 

//mirror distortions 
let capture; // Video capture
let gridSize = 10; 
let cellWidth, cellHeight;
let weirdFaceImg;
let videoGraphics;
let mirrorX = 330; 
let mirrorY = 132; 
let mirrorWidth = 310;
let mirrorHeight = 232;
let fadeBlack = 0; 

//bools
let videoDisplayed = false;
let textDisplayed = false; 
let lightbulbDisplayed = false;
let manBabyFinished = false;
let transitioning = false;

let ampAnalyzer; // To analyze audio amplitude
let distortionStrength = 0; // Used to control the intensity of distortion



function preload() {
  soundFormats('mp3'); //p5 reference 
  kitchenBg = loadImage('images/kitchen.jpg'); 
  odysseusSprite = loadImage('images/Odysseus-side.png'); 
  odysseusShockedSprite = loadImage('images/shocked.png');
  lightbulbImage = loadImage('images/lightbulb.png');
  breadImage = loadImage('images/yummy.jpg'); 
  foreheadImage = loadImage('images/forehead.png');
  cookieImage = loadImage('images/cookie.jpg');
  boohbahImage = loadImage('images/boohbah.jpg');
  blurBathroomImg = loadImage('images/blurbathroom.jpg');
  mirrorImage = loadImage('images/mirror.jpg');
  manBabyImg = loadImage('images/manBaby.png');
  weirdFaceImg = loadImage("images/mirror.jpg");
  medicineShelfImg = loadImage('images/medicine-shelf.jpg');
  odysseusLayingSprite = loadImage('images/odysseusLaying.png');
  theEndImage = loadImage('images/theEnd.jpg');

//sounds
  magicSound = loadSound('sound/magic.mp3'); 
  burpSound = loadSound('sound/burp.mp3'); 
  munchSound = loadSound('sound/munch.mp3');
  fartSound = loadSound('sound/fart.mp3');
  ideaSound = loadSound('sound/idea.mp3');
  angrySound = loadSound('sound/angry.mp3');
  walkSound = loadSound('sound/walk.mp3');
  manBabySound = loadSound('sound/manBaby.mp3');
  doorSound = loadSound('sound/door.mp3');
  yaySound = loadSound('sound/yay.mp3');
  gulpSound = loadSound('sound/gulp.mp3');
  snoreSound = loadSound('sound/snore.mp3');
  yawnSound = loadSound('sound/yawn.mp3');
  hungrySound = loadSound('sound/hungry.mp3');
  happySong = loadSound('sound/happyLittleSong.mp3');
}


function setup() {
  createCanvas(1000,660);
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);

  cellWidth = width / gridSize;
  cellHeight = height / gridSize;
  capture = createCapture(VIDEO);
  capture.size(200, 200); // Square dimensions for the video
  capture.hide();

  videoGraphics = createGraphics(200, 200);
}

function draw() {
  if (!soundEnabled) {
    // Display the initial sound prompt if sound is not enabled
    background(0);
    textSize(30);
    text("Odysseus' Ergot Poison Party", width / 2, height / 2.5);
    textSize(20);
    text("Click anywhere to enable sound", width / 2, height / 2);
  } else {
    // Scene-based logic
    if (scene === 1) {
      showIntro(); // Scene 1: Introduction scene
    } 
    else if (scene === 2) {
      focusOnBread(); // Scene 2: Focus on the bread
    } 
    else if (scene === 3) {
      eatingScene(); // Scene 3: Odysseus eating
    } 
    else if (scene === 4) {
      postEatingScene(); // Scene 4: After eating
    } 
    else if (scene === 5) {
      thinkScene(); // Scene 5: Thinking about the medicine
    } 
    else if (scene === 6) {
      odysseusWalkOffScene(); // Scene 6: Odysseus walks off-screen
    } 
    else if (scene === 7) {
      blurryWalk(); // Scene 7: Blurry walk effect
    } 
    else if (scene === 8) {
      weirdFace(); // Scene 8: Weird mirror distortion
    } 
    else if (scene === 9) {
      babyMan(); // Scene 9: Baby-Man scene
    } 
    else if (scene === 10) {
      postBabyManScene(); // Scene 10: Returning to mirror and "what's going on" text
    } 
    else if (scene === 11) {
      displayMedicineScene(); // Scene 11: Medicine shelf appears
    } 
    else if (scene === 12) {
      blackScreenWithGulp(); // Scene 12: Black screen with gulp sound
    } 
    else if (scene === 13) {
      displayCabinetWithText(); // Scene 13: Cabinet with "I feel sleepyyy" text
    } 
    else if (scene === 14) {
      fadeToBlackScene(); // Scene 14: Fade to black
    } 
    else if (scene === 15) {
      snoringScene(); // Scene 15: Odysseus sleeping
    }
    else if (scene === 16) {
      wakeUpScene(); // Scene 16: Odysseus waking up
    }
    else if (scene === 17) {
      showEndScene(); // Scene 18: Happy ending
    }
  }

  if (!transitioning) {
    // Display the second scene after the transition ends
    image(blurBathroomImg, 0, 0, width, height);
  } else {
    // Draw the radial wipe effect
    drawRadialWipe();
  }

}


function mousePressed() {
  if (!soundEnabled) {
    console.log("sound is enabled");
    soundEnabled = true;

    // I could not figure out why my sound wasn't playing consistently
    // It would play somtimes when opening ther server, but not everytime
    // I read that certain browsers block sound unless enabled 
    // I looked through the reference but I didn't understand so I asked google Gemini how to do this part
    if (getAudioContext().scene !== 'running') {
      getAudioContext().resume().then(() => {
        console.log("Audio is working");
      }).catch((err) => {
        console.error("Error audio isn't working", err);
      });
    }
  }
}

function drawRadialWipe() {
  let elapsedTime = millis() - transitionStartTime;
  let progress = constrain(elapsedTime / transitionDuration, 0, 1); // Progress from 0 to 1

  // Draw the first scene
  image(kitchenBg, 0, 0, width, height);

  // Apply the mask for the radial wipe
  push();
  translate(width / 2, height / 2); // Center of the canvas
  let maxRadius = dist(0, 0, width / 2, height / 2); // Max radius for the arc

  // Create a graphics layer for masking
  let maskGraphics = createGraphics(width, height);
  maskGraphics.background(0);
  maskGraphics.translate(width / 2, height / 2);
  maskGraphics.fill(255);
  maskGraphics.noStroke();
  maskGraphics.arc(0, 0, maxRadius * 2, maxRadius * 2, -HALF_PI, -HALF_PI + TWO_PI * progress, PIE);

  // Apply the masked second scene
  image(blurBathroomImg, 0, 0, width, height);
  let imgMask = maskGraphics.get();
  blendMode(MULTIPLY);
  image(imgMask, 0, 0, width, height);
  pop();

  // End the transition after completion
  if (progress === 1) {
    transitioning = false;
  }
}

// Scene 1: Introduction scene
function showIntro() {
  image(kitchenBg, 0, 0); 

  // Odysseus walking
  if (odysseusX < width / 2) {
    odysseusX += 2; // speed 
  }
  image(odysseusSprite, odysseusX, odysseusY, 200, 322);

  // thought bubble
  fill(255);
  ellipse(odysseusX + 50, odysseusY - 50, 150, 75);
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text(thoughtText[thoughtIndex], odysseusX + 50, odysseusY - 50);

  thoughtTimer++;

  // how long text bubble is there
  if (thoughtTimer > 180) {
    thoughtIndex++;
    thoughtTimer = 0;
  }

  // next scene
  if (thoughtIndex >= thoughtText.length) {
    scene = 2;

    playSound(magicSound); //plays magic sound file
  }
}


// Scene 2: Focus on the bread
function focusOnBread() {
  if (breadStartTime === 0) {
    breadStartTime = millis();
  }
  
  background(0);
  image(breadImage, 0, 0, 1000, 660);

  // how much time has passed
  let timePassed = millis() - breadStartTime;
  if (timePassed > 5000) {
    scene = 3;
    breadStartTime = 0; // Reset 
  }
}


// Scene 3: Odysseus eating
function eatingScene() {
  // re-do kitchen scene layout
  image(kitchenBg, 0, 0); 
  image(odysseusSprite, odysseusX, odysseusY, 200, 322);

  fill(255);
  textSize(20);
  text("MUNCH! GULP!", width / 2, height / 2 - 50);

  if (munchStartTime === 0) {
    munchStartTime = millis(); 
    playSound(munchSound); 
  }

  if (millis() - munchStartTime > 3000 && !burpPlayed) {
    playSound(burpSound); 
    burpPlayed = true; 
  }

  if (burpPlayed && millis() - munchStartTime > 6000) {
    scene = 4;
    dialogStartTime = millis(); 
  }

}

let rippleShift = 20;
let rippleFreq = 0.05;

// Scene 4: After eating
function postEatingScene() {
  if (fartStartTime === 0) {
    // Start timer 
    fartStartTime = millis();
  }

  let timeSinceStart = millis() - fartStartTime;

  if (timeSinceStart < 2000) {
    image(kitchenBg, 0, 0);
    image(odysseusSprite, odysseusX, odysseusY, 200, 322);
    // Speech bubble      
    fill(255);
    ellipse(odysseusX + 50, odysseusY - 50, 200, 100); 
    fill(0);
    text("That was yum-", odysseusX + 50, odysseusY - 50);
  
  } else if (timeSinceStart < 3000 + fartSound.duration() * 1000) {
    // Play fart sound and ripple background
    if (!fartPlayed) {
      playSound(fartSound);
      fartPlayed = true;
    }

    // fart ripple effect
    fartRipple();
    image(odysseusShockedSprite, odysseusX, odysseusY, 200, 322);
  } else {
    // Reset to normal background
    image(kitchenBg, 0, 0);
    image(odysseusSprite, odysseusX, odysseusY, 200, 322);
    let timeSinceFartEnd = timeSinceStart - (2000 + fartSound.duration() * 1000);

    if (timeSinceFartEnd < 2000) {
      if (!ideaSoundPlayed) {
        playSound(ideaSound);
        ideaSoundPlayed = true;
      }
      image(lightbulbImage, odysseusX + 50, odysseusY - 200, 100, 150);
    } else if (timeSinceFartEnd < 4000) {
      fill(255);
      ellipse(odysseusX + 50, odysseusY - 50, 300, 100);
      fill(0);
      text("I need to find that pink stuff...", odysseusX + 50, odysseusY - 50);
    } else if (timeSinceFartEnd < 6000) {
      fill(255);
      ellipse(odysseusX + 50, odysseusY - 50, 300, 100);
      fill(0);
      text("what was it called again...?", odysseusX + 50, odysseusY - 50);
    } else {
      scene = 5;
    }
  }
}

// Ripple fart function
function fartRipple() {
  background(0); // Clear background for redraw
  for (let y = 0; y < kitchenBg.height; y++) { //each row of pixles
    let offset = sin(y * rippleFreq + millis() * 0.001) * rippleShift; //creates wave effect on the row of pixels 
    //each row of img is drawn with the shift
    copy(
      kitchenBg,
      0, y, kitchenBg.width, 1,  
      offset, y, kitchenBg.width, 1 
    );
  }
}



// Scene 5: Thinking about the medicine
function thinkScene() {
  if (cookieStartTime === 0) {
    cookieStartTime = millis(); 
  }

  let timePassed = millis() - cookieStartTime;

  //forehead background
  if (timePassed < 500) {
    image(foreheadImage, 0, 0, width, height); 
  }

  // Show cookie image for 2 seconds
  else if (timePassed >= 1000 && timePassed < 3000) {
    image(foreheadImage, 0, 0, width, height); // Keep the forehead background
    image(cookieImage, width / 2 - 150, height / 2 - 150, 400, 400); // Show cookie image
  }

  else if (timePassed >= 3000 && timePassed < 5000) {
    image(foreheadImage, 0, 0, width, height); 
    image(cookieImage, width / 2 - 150, height / 2 - 150, 400, 400); 
    fill(255);
    ellipse(width / 2, height / 2 - 100, 300, 100); 
    fill(0);
    text("No... not that!", width / 2, height / 2 - 100); 
  }

  // Show Boohbah image for 2 seconds
  else if (timePassed >= 5000 && timePassed < 7000) {
    image(foreheadImage, 0, 0, width, height); // Keep the forehead background
    image(boohbahImage, width / 2 - 150, height / 2 - 150, 400, 267); // Show Boohbah image
  }

  else if (timePassed >= 7000 && timePassed < 11000) {
    image(foreheadImage, 0, 0, width, height); // Keep the forehead background

    if (!angrySoundPlayed) {
      playSound(angrySound); // Play the angry sound once
      angrySoundPlayed = true;
    }

    if (timePassed < 9000) {
      fill(255);
      ellipse(width / 2, height / 2 - 50, 400, 100);
      fill(0);
      text("UGH It’s not that!", width / 2, height / 2 - 50);
    } else {
      fill(255);
      ellipse(width / 2, height / 2 - 50, 500, 100);
      fill(0);
      text("I’m just gonna check the bathroom.", width / 2, height / 2 - 50);
      nextScene = true;
    }
  } else if (nextScene == true) {
    scene = 6;
    odysseusX = width / 2;
  }
}


// Scene 6: Odysseus walks off-screen
function odysseusWalkOffScene() {
  if (odysseusX < width) {
    image(kitchenBg, 0, 0); 
    image(odysseusSprite, odysseusX, odysseusY, 200, 322);
    odysseusX += 4; 
  } else {

    image(blurBathroomImg, 0, 0, width, height); 
    scene = 7;
    walkStartTime = 0;
  }

  
}


// Scene 7: Blurry walk effect
function blurryWalk() {

  image(blurBathroomImg, 0, 0, width, height);

  // pixel manipulation
  for (let i = 0; i < 15; i++) {
    // random x and y coordinate from canvas
    let x1 = floor(random(width));
    let y1 = floor(random(height));

    //random offset for where the new pixles squares are drawns 
    let x2 = round(x1 + random(-10, 10)); 
    let y2 = round(y1 + random(-10, 10)); 

    // random w and h of pixle sqares
    let w = floor(random(20, 60)); 
    let h = floor(random(20, 60)); 

    // set found in reference 
    //Sets the color of a pixel or draws an image to the canvas
    set(x2, y2, get(x1, y1, w, h));
  }

  // Display text
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Why does everything look funny?", width / 2, 50);

  // Play the walking sound
  if (!walkSound.isPlaying()) {
    playSound(walkSound);
    console.log("Walk sound started.");
  }

  // Check if 4 seconds have passed 
  if (walkSound.isPlaying() && walkSound.currentTime() >= 4) {
    console.log("4 seconds passed since walk sound started."); // Debug 
    scene = 8; 
    console.log("Scene transitioned to:", scene); // Debug
  }
}



function imageDistortion() {
  //the image is going to be distorted and take rectangles from the grid of the image 
  // and randomly displace them to brake the image into little rectangles 
  // give the appearance that the image is broken and shaking around
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      //x and y coordinates of the image
      let x = i * cellWidth;
      let y = j * cellHeight;

      // x and y coordinates of the glitched image rectangles
      let sx = map(i, 0, gridSize, 0, weirdFaceImg.width);
      let sy = map(j, 0, gridSize, 0, weirdFaceImg.height);

      image(
        weirdFaceImg,
        //random coordinates
        x + random(-5, 5), 
        y + random(-5, 5), 
        //random wxh
        cellWidth + random(-10, 10), // Width distortion
        cellHeight + random(-10, 10), // Height distortion
        // maps the glitch rectangles 
        sx,
        sy,
        //this makes ure the image is broken into equal parts 
        // this controls how big each of the cells should be 
        weirdFaceImg.width / gridSize,
        weirdFaceImg.height / gridSize
      );
    }
  }
}


function nonlinearGridEffect(graphics, t) {
  let img = graphics.get(); // Gets the current video frame
  img.loadPixels(); 

  let resultGraphics = createGraphics(graphics.width, graphics.height);

  for (let x = 0; x < img.width; x += 20) {
    for (let y = 0; y < img.height; y += 20) {
      // gets distortion based on time and grid position
      // https://p5js.org/reference/p5/atan2/
      let angle = atan2(y - img.height / 2, x - img.width / 2);
      let distFromCenter = dist(x, y, img.width / 2, img.height / 2);

      // movement that is evolving over time
      let offsetX = sin(angle + t) * sin(distFromCenter * 0.02 + t) * 10;
      let offsetY = cos(angle + t) * cos(distFromCenter * 0.02 + t) * 10;

      // keeps coordinates in limit
      let sx = constrain(x + offsetX, 0, img.width - 20);
      let sy = constrain(y + offsetY, 0, img.height - 20);

      resultGraphics.copy(img, x, y, 20, 20, sx, sy, 20, 20);
    }
  }

  resultGraphics.filter(INVERT); 
  return resultGraphics;
}










function displayVideoCapture() {
  if (captureStartTime === 0) {
    captureStartTime = millis(); // Start timing when the function is first called
  }

  let elapsedTime = millis() - captureStartTime; // Calculate elapsed time
  let t = millis() * 0.001; // Time variable for animation

  if (elapsedTime < 2000) {
    // Display regular inverted video capture
    videoGraphics.image(capture, 0, 0, videoGraphics.width, videoGraphics.height);
    videoGraphics.filter(INVERT); // Apply inverted filter directly to the video graphics
    image(videoGraphics, mirrorX, mirrorY, mirrorWidth, mirrorHeight);
  } else if (elapsedTime < 5000) {
    // From 2 to 5 seconds, display the nonlinear grid effect
    let distortedGraphics = nonlinearGridEffect(videoGraphics, t);
    distortedGraphics.filter(INVERT); // Apply inverted filter to the distorted grid graphics
    image(distortedGraphics, mirrorX, mirrorY, mirrorWidth, mirrorHeight);
  } else {
    // Reset or transition after 5 seconds
    captureStartTime = millis(); // Reset for another cycle or transition
  }
}



function displayTextOverlay() {
  if (textStartTime === 0) {
    // start time when the function is called
    textStartTime = millis(); 
  }
  let timePassed = millis() - textStartTime;

  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);

  if (timePassed < 3000) {
    // 1st message for 3 seconds
    text("What's happening?! Who AM I??", width / 2, height - 100);
  }
}




// Scene 8: Weird mirror distortion
function weirdFace() {
  if (weirdFaceStartTime === 0) {
    weirdFaceStartTime = millis(); 
  }
  let timePassed = millis() - weirdFaceStartTime;

  if (timePassed < 4000) {
    // call image distortion function 
    imageDistortion();
  } else if (timePassed >= 4000 && timePassed < 9000) {
    // turn camera on from 4 to 9 seconds
    if (!videoDisplayed) {
      //checks if this is only shown once 
      videoDisplayed = true; 
    }
    displayVideoCapture();
  } else if (timePassed >= 9000 && timePassed < 12000) {
    //shows the video capture while keeping the background image
    displayVideoCapture(); 

    //show text
    displayTextOverlay();
  } else {
    scene = 9;
  }
}





//Scene 9: Baby-Man scene
function babyMan() {
  if (!manBabyFinished) {
    manBabySound.play(); // Play sound ONCE
    manBabyFinished = true; // Prevent it from playing again
  }

  background(0);
  let x = 0;
  let y = 10;
  let counter = 0;
  let inputText = "Am I a Man or Am I a Baby? ";

  manBabyImg.loadPixels();

  while (y < height) {
    // map x and y coordinate of image pixel
    //round them bc there cant be half a pixle
    let imgX = round(map(x, 0, width, 0, manBabyImg.width));
    let imgY = round(map(y, 0, height, 0, manBabyImg.height));

    //pixel color at coordinate
    let c = color(manBabyImg.get(imgX, imgY));

    //calculates brighness based off RGB values
    let RGB = red(c) + green(c) + blue(c);
    
    // min and max font sizes
    let fontSize = map(RGB, 0, 255 * 3, 30, 5); 
     fontSize = max(fontSize, 1);

    push(); 
    translate(x, y);
    textSize(fontSize);
    fill(c);

    //draw current char
    let letter = inputText.charAt(counter % inputText.length);
    text(letter, 0, 0);
    x += textWidth(letter) + 0.5;
    pop();


    if (x >= width) {
      x = 0; //reset x 
      y += 12; //move down line
    }
    counter++;
  }

  // Transition to next scene after sound ends
  if (!manBabySound.isPlaying() && manBabyFinished) {
    scene = 10; // Move to the next scene
    postBabyManStartTime = millis();
  }
}



// Scene 10: Returning to mirror and "what's going on" text
function postBabyManScene() {
  let timeElapsed = millis() - postBabyManStartTime;

  if (timeElapsed < 3000) {
    background(0);
    image(mirrorImage, 0, 0, width, height);
    fill(255);
    textSize(30);
    //show text for 3 seconds
    text("I don't know what's going on anymore...", width / 2, height - 100);
  } else if (timeElapsed < 6000) {
    background(0);
    image(mirrorImage, 0, 0, width, height);
    fill(255);
    textSize(30);
    //show text for next 3 seconds
    text("Oh yeah, my medicine!", width / 2, height - 100);
  } else if (!doorSound.isPlaying()) {
    background(0);
    doorSound.play();
    scene = 11;
    medicineSceneStartTime = millis();
  }
}



// Scene 11: Medicine shelf appears
function displayMedicineScene() {
  if (medicineSceneStartTime === 0) medicineSceneStartTime = millis();
  let timeElapsed = millis() - medicineSceneStartTime;

  if (timeElapsed < yaySound.duration() * 1000 + 2000) {
    // Display medicine shelf and play yay sound
    image(medicineShelfImg, 0, 0, width, height);
    if (!yaySound.isPlaying()) yaySound.play();// Play the "yay" sound if it's not already playing
  } else {
    scene = 12; 
    blackScreenTimer = millis();
  }
}


// Scene 12: Fade to black
function blackScreenWithGulp() {
  background(0);

  if (!gulpSound.isPlaying() && millis() - blackScreenTimer > 500) {
    gulpSound.play(); // Play gulp sound after black screen
  }

  if (millis() - blackScreenTimer > gulpSound.duration() * 1000 + 2000) {
    scene = 13; // next scene
    medicineSceneStartTime = millis();
  }
}


// Scene 13: Snoring + Laying Down
function displayCabinetWithText() {
  if (medicineSceneStartTime === 0) medicineSceneStartTime = millis();
  let timeElapsed = millis() - medicineSceneStartTime;

  image(medicineShelfImg, 0, 0, width, height);
  fill(255);
  textSize(30);
  text("I feel sleepyyy...", width / 2, height / 2 + 100);

  if (timeElapsed > 2000) {
    scene = 14; // Move to fade to black
    fadeBlack = 0;
  }
}


// Scene 14: Waking Up
function fadeToBlackScene() {
  background(0, 0, 0, fadeBlack); // Gradual fade
  fadeBlack += 5;

  if (fadeBlack >= 255 && !snorePlayed) {
    snoreSound.play();
    snorePlayed = true;
  }

  if (snorePlayed && !snoreSound.isPlaying()) {
    scene = 15; // Move to Odysseus lying down
    wakeUpTimer = millis();
  }
}


// Scene 15: Hungry and Lunch Scene
function snoringScene() {
  image(blurBathroomImg, 0, 0, width, height);
  image(odysseusLayingSprite, width / 2 - 100, height / 2 - 100, 300, 200);

  if (millis() - wakeUpTimer > 2000 && !yawnPlayed) {
    yawnSound.play();
    yawnPlayed = true;
  }

  if (yawnPlayed && !yawnSound.isPlaying()) {
    scene = 16; // Move to waking up
    wakeUpTimer = millis();
  }
}


// Scene 16: Waking up with hungry sound
function wakeUpScene() {
  image(blurBathroomImg, 0, 0, width, height);
  image(odysseusSprite, width / 2 - 100, height / 2 - 150, 200, 322);

  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);

  // Display "Wow, how long was I asleep for?"
  if (uhOhTimer === 0) {
    text("Wow, how long was I asleep for?", width / 2, height / 2 + 100);
    if (!hungryPlayed && millis() - wakeUpTimer > 3000) {
      hungrySound.play();
      hungryPlayed = true;
    }
    // Start timer for "Uh Oh..." text
    if (hungryPlayed && !hungrySound.isPlaying()) {
      uhOhTimer = millis();
    }
  }

  // Display "Uh Oh..." for 2 seconds
  if (uhOhTimer > 0) {
    let elapsed = millis() - uhOhTimer;
    if (elapsed < 2000) {
      text("Uh Oh...", width / 2, height / 2 + 150);
    } else {
      // After 2 seconds, go to the final ending scene
      scene = 17;
    }
  }
}



//scene 17: ending scene
function showEndScene() {
  background(0);
  image(theEndImage, 0, 0, width, height); // Display the uploaded "theEnd.jpg"

  // Play happy little song only once
  if (!happySong.isPlaying()) {
    happySong.play();
  }
}


function playSound(sound) {
  if (sound && !sound.isPlaying()) { //if the sound file exists and isn't already playing
    sound.play(); // then play audio 
  }
}