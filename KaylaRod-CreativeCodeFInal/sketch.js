//scene iteration
let scene = 1; 

//images
let kitchenBg;
let odysseusSprite;
let odysseusShockedSprite;
let breadImage;
let lightbulbImage;

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


//browser blocks automatic sounds
let soundEnabled = false;

//Single sound - no loop
let munchPlayed = false;
let burpPlayed = false;
let fartPlayed = false;
let ideaSoundPlayed = false;

// Timer
let thoughtTimer = 0;
let breadStartTime = 0;
let fartStartTime = 0;
let dialogStartTime = 0;
let munchStartTime = 0;


let lightbulbDisplayed = false;


function preload() {
  soundFormats('mp3'); //p5 reference 
  kitchenBg = loadImage('images/kitchen.jpg'); 
  odysseusSprite = loadImage('images/Odysseus-side.png'); 
  odysseusShockedSprite = loadImage('images/shocked.png');
  lightbulbImage = loadImage('images/lightbulb.png');
  breadImage = loadImage('images/yummy.jpg'); 
  magicSound = loadSound('sound/magic.mp3'); 
  burpSound = loadSound('sound/burp.mp3'); 
  munchSound = loadSound('sound/munch.mp3');
  fartSound = loadSound('sound/fart.mp3');
  ideaSound = loadSound('sound/idea.mp3');
}


function setup() {
  createCanvas(1000,660);
  textAlign(CENTER, CENTER);
  textSize(20);
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
    } else if (scene === 4) {
      postEatingScene();
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
  textSize(20);
  text("MUNCH! GULP!", width / 2, height / 2 - 50);

  if (munchStartTime === 0) {
    munchStartTime = millis(); // Record the start time for the munch sound
    playSound(munchSound); // Play the munch sound
  }

  if (millis() - munchStartTime > 3000 && !burpPlayed) {
    playSound(burpSound); // Play burp sound after munch
    burpPlayed = true; // Ensure burp sound only plays once
  }

  if (burpPlayed && millis() - munchStartTime > 6000) {
    scene = 4;
    dialogStartTime = millis(); // Start the dialog timer
  }

}

function postEatingScene() {
  image(kitchenBg, 0, 0);

  if (fartStartTime === 0) {
    // Show text
    fill(255);
    ellipse(odysseusX + 50, odysseusY - 50, 200, 100);
    fill(0);
    text("That was yum-", odysseusX + 50, odysseusY - 50);

    fartStartTime = millis();
    playSound(fartSound); // Play fart sound
  }

  // show shocked sprite until the fart sound finishes playing
  //found duration() in p5 reference
  if (millis() - fartStartTime < fartSound.duration() * 1000) {
    image(odysseusShockedSprite, odysseusX, odysseusY, 200, 322);
  } else {
    // Switch back to original odysseus
    image(odysseusSprite, odysseusX, odysseusY, 200, 322);

    let timeSinceFartEnd = millis() - (fartStartTime + fartSound.duration() * 1000);

    // show lightbulb for 2 seconds
    if (timeSinceFartEnd < 2000) {
      if (!ideaSoundPlayed) {
        playSound(ideaSound); // Play the idea sound once
        ideaSoundPlayed = true; // Mark as played
      }
      image(lightbulbImage, odysseusX + 50, odysseusY - 200, 100, 150);
    } else {
      // Show text after the lightbulb disappears
      fill(255);
      ellipse(odysseusX + 50, odysseusY - 50, 300, 100);
      fill(0);
      text("I need to find that pink stuff...", odysseusX + 50, odysseusY - 50);
    }
  }
}




function playSound(sound) {
  if (sound && !sound.isPlaying()) { //if the sound file exists and isn't already playing
    sound.play(); // then play audio 
  }
}
