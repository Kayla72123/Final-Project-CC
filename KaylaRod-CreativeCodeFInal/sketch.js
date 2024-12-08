//scene iteration
let scene = 1; 

//images
let kitchenBg;
let odysseusSprite;
let breadImage;

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

//browser blocks automatic sounds
let soundEnabled = false;

//Single sound - no loop
let burpPlayed = false;

// Timer
let thoughtTimer = 0;
let breadStartTime = 0;


function preload() {
  soundFormats('mp3'); //p5 reference 
  kitchenBg = loadImage('images/kitchen.jpg'); 
  odysseusSprite = loadImage('images/Odysseus-side.png'); 
  breadImage = loadImage('images/yummy.jpg'); 
  magicSound = loadSound('sound/magic.mp3'); 
  burpSound = loadSound('sound/burp.mp3'); 
}


function setup() {
  createCanvas(1000,660);
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);
}

function draw() {
  if (!soundEnabled) {
    // Display prompt until sound is enabled
    background(0);
    text("Click anywhere to enable sound", width / 2, height / 2);
  } else {
    background(0); // Clear the screen
    if (scene === 1) {
      showIntro();

    } else if (scene === 2) {
      focusOnBread();

    } else if (scene === 3) {
      eatingScene();
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
  textSize(16);
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
  let elapsedTime = millis() - breadStartTime;
  // check if bread scene lasted 5 seconds
  if (elapsedTime > 5000) {
    scene = 3;
    breadStartTime = 0; // Reset timer
  }


}

function eatingScene() {
  // re-create kitchen scene layout
  image(kitchenBg, 0, 0); 
  image(odysseusSprite, odysseusX, odysseusY, 200, 322);

  fill(255);
  textSize(32);
  text("MUNCH! GULP!", width / 2, height / 2 - 50);

  
  if (burpPlayed == false) { //this loop is so the burp sound effect only plays once
    playSound(burpSound); //plays burp sound file
    burpPlayed = true; //sets true so the loop ends
  }

}


function playSound(sound) {
  if (sound && !sound.isPlaying()) { //if the sound file exists and isn't already playing
    sound.play(); // then play audio 
  }
}
