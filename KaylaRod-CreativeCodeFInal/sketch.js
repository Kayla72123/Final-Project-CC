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


//browser blocks automatic sounds
let soundEnabled = false;

//Single sound - no loop
let munchPlayed = false;
let burpPlayed = false;
let fartPlayed = false;
let ideaSoundPlayed = false;
let angrySoundPlayed = false;
let cookieStartTime = 0;
let boohbahStartTime = 0;
let walkStartTime = 0;


// Timer
let thoughtTimer = 0;
let breadStartTime = 0;
let fartStartTime = 0;
let dialogStartTime = 0;
let munchStartTime = 0;
let textStartTime = 0; 


let lightbulbDisplayed = false;

//mirror distortions 
let weirdFaceStartTime = 0; // Timer to manage scene steps
let videoDisplayed = false; // Flag for video display
let textDisplayed = false; // Flag for text overlay
let capture; // Video capture
let gridSize = 10; // Number of rows and columns in the grid
let cellWidth, cellHeight;
let weirdFaceImg;
let videoGraphics;

let mirrorX = 330; // X position of the mirror
let mirrorY = 132; // Y position of the mirror
let mirrorWidth = 310; // Width of the mirror
let mirrorHeight = 232;


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

//sounds
  magicSound = loadSound('sound/magic.mp3'); 
  burpSound = loadSound('sound/burp.mp3'); 
  munchSound = loadSound('sound/munch.mp3');
  fartSound = loadSound('sound/fart.mp3');
  ideaSound = loadSound('sound/idea.mp3');
  angrySound = loadSound('sound/angry.mp3');
  walkSound = loadSound('sound/walk.mp3');
  manBabySound = loadSound('sound/manBaby.mp3');
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
    // Display prompt until sound is enabled
    background(0);
    textSize(30);
    text("Odysseus' Ergot Poison party", width / 2, height / 2.5);
    textSize(20);
    text("Click anywhere to enable sound", width / 2, height / 2);
  } else {
    background(0); // Clear the screen
    if (scene === 1) {
      showIntro();

    } else if (scene === 2) {
      focusOnBread();

    } else if (scene === 3) {
      eatingScene();
    } else if (scene === 4) {
      postEatingScene();
    } else if (scene === 5){
      thinkScene();
    } else if (scene === 6) {
      odysseusWalkOffScene();
    } else if (scene === 7){
      blurryWalk();
    }else if (scene === 8){
      weirdFace();
    }else if (scene === 9){
      babyMan();
    }
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

function postEatingScene() {
  image(kitchenBg, 0, 0);

  if (fartStartTime === 0) {
    // start time for "That was yum-"
    fartStartTime = millis();
  }

  let timeSinceStart = millis() - fartStartTime;

  if (timeSinceStart < 2000) {
    image(odysseusSprite, odysseusX, odysseusY, 200, 322); 
    fill(255);
    // Speech bubble
    ellipse(odysseusX + 50, odysseusY - 50, 200, 100); 
    fill(0);
    text("That was yum-", odysseusX + 50, odysseusY - 50);
  } else if (timeSinceStart < 3000 + fartSound.duration() * 1000) {
    // Play fart sound and show shocked sprite
    if (!fartPlayed) {
      playSound(fartSound);
      // fart sound only plays once
      fartPlayed = true; 
    }
    // Show shocked sprite
    image(odysseusShockedSprite, odysseusX, odysseusY, 200, 322); 
  } else {

    image(odysseusSprite, odysseusX, odysseusY, 200, 322); 

    let timeSinceFartEnd = timeSinceStart - (2000 + fartSound.duration() * 1000);

    // Show lightbulb for 2 seconds
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


function displayVideoCapture() {
  // Render the static mirror image as the background
  image(weirdFaceImg, 0, 0, width, height); // Original mirror image (not distorted)

  // Draw the video capture on the separate graphics layer
  videoGraphics.image(capture, 0, 0, videoGraphics.width, videoGraphics.height);
  videoGraphics.filter(INVERT); // Apply invert filter only on the graphics layer

  // Render the inverted video graphics onto the canvas
  let videoX = width / 2 - videoGraphics.width / 2;
  let videoY = height / 2 - videoGraphics.height / 2;
  image(videoGraphics, mirrorX, mirrorY, mirrorWidth, mirrorHeight);
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
    text("What's happening?!", width / 2, height - 100);
  } else if (timePassed >= 3000 && timePassed < 6000) {
    // 2nd message after 3 seconds
    text("Uh Help me out!!", width / 2, height - 100);
  } else if (timePassed >= 6000) {
    // 3rd message after 6 seconds
    text("Click the screen or something!! I don't know?!?!", width / 2, height - 100);
  }
}





function weirdFace() {
  if (weirdFaceStartTime === 0) {
    // start time when function is called
    weirdFaceStartTime = millis(); 
  }

  let timePassed = millis() - weirdFaceStartTime;

  if (timePassed < 4000) {
    // call image distortion function 
    imageDistortion();
  } else if (timePassed >= 4000 && timePassed < 9000) {
    // turn camera from 4 to 9 seconds
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






function babyMan() {
  // Play the sound if not already playing
  if (!manBabySound.isPlaying()) {
    manBabySound.play();
  }

  background(0);
  let x = 0; 
  let y = 10; 
  let counter = 0; 
  let inputText = "Am I a Man or Am I a Baby? "; 

  // Font size parameters
  let fontSizeMax = 20;
  let fontSizeMin = 10;
  let lineSpacing = 12; // Line height
  let letterSpacing = 0.5; // Space between letters

  manBabyImg.loadPixels(); 


  while (y < height) {
    // x and y coordinate of image pixel
    let imgX = round(map(x, 0, width, 0, manBabyImg.width));
    let imgY = round(map(y, 0, height, 0, manBabyImg.height));

    //pixel color at coordinate
    let c = color(manBabyImg.get(imgX, imgY));
    let greyscale = red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071; // Convert to greyscale

    //font size based on brightness
    let fontSize = map(greyscale, 0, 255, fontSizeMax, fontSizeMin);
    fontSize = max(fontSize, 1); 

    push();
    translate(x, y); 
    textSize(fontSize); 
    fill(c); 

    // iterate through text input
    let letter = inputText.charAt(counter % inputText.length); 
    text(letter, 0, 0); 

    let letterWidth = textWidth(letter) + letterSpacing; 
    x += letterWidth; 
    pop();

    // line breaks
    if (x + letterWidth >= width) {
      x = 0; // Reset to the beginning of the row
      y += lineSpacing; // Move down to the next row
    }

    counter++; // Move to the next char
  }
  noLoop(); 
}

function playSound(sound) {
  if (sound && !sound.isPlaying()) { //if the sound file exists and isn't already playing
    sound.play(); // then play audio 
  }
}
