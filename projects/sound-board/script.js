"use strict";

// hold sound instances
const soundsArr = [];

// sound effect class
class SoundEffect {
  constructor(src = null, name = null, emoji = null) {
    this.name = name;
    this.emoji = emoji;
    this.src = src;

    // properties derived from inputs
    this.audio = new Audio(`sounds/${this.src}`);

    // get the duration when audio is loaded
    this.audio.addEventListener(
      "canplaythrough",
      () => (this.fillAmount = 100 / this.audio.duration)
    );

    // to create the unique class name
    this.identifier = this.name.split(" ").join("").toLowerCase();

    // create and store the element
    this.audioEl = this.createElement();

    // add the created instance to the sounds Array
    soundsArr.push(this);
  }

  //  create an element
  createElement() {
    const audioEl = document.createElement("button");

    // span element to render progress
    const audioProgress = document.createElement("span");

    audioEl.textContent = `${this.name} ${this.emoji}`;
    audioEl.classList.add("sound-board__btn", `btn--${this.identifier}`);
    audioEl.dataset.id = this.identifier;

    // adding class to progress
    audioProgress.className = "progress";
    audioEl.append(audioProgress);

    return audioEl;
  }
}

// Adding sound effects
const soundRain = new SoundEffect("rain.mp3", "Rain", "🌧️");
const soundThunder = new SoundEffect("thunder.mp3", "Thunder", "⚡");
const soundStorm = new SoundEffect("storm.mp3", "Storm", "🍃");
const soundSeaWaves = new SoundEffect("sea-waves.mp3", "Sea Waves", "🌊");
const treeFall = new SoundEffect("tree-fall.mp3", "Tree Fall", "🌴");

// app class
class App {
  #soundBoard = document.querySelector(".sound-board");
  #volumeBar = document.getElementById("volume");
  constructor() {
    this.volume = 0.5;
    this.fill = 0;
    this.addSoundsToBoard();
    this.addClickListener();
    this.addVolumeListener();
  }

  // add sounds to board
  addSoundsToBoard() {
    this.#soundBoard.innerHTML = "";
    soundsArr.forEach((soundEffect) =>
      this.#soundBoard.insertAdjacentElement(
        "beforeend",
        soundEffect.createElement()
      )
    );
  }

  // Stop any playing sounds
  stopSound() {
    // stop previous playing sound
    this.currentPlay.audio.pause();
    this.currentPlay.audio.currentTime = 0;
  }

  // handle sound effects
  playSound(button) {
    if (this.currentPlay) {
      // stop any playing sounds
      this.stopSound();
      // clear any previous progress fills
      this.clearProgress();
    }

    // find the clicked sound effect
    this.currentPlay = soundsArr.find(
      (soundEl) => soundEl.identifier === button.dataset.id
    );

    // get progressBar
    this.currentProgressBar = button.querySelector(".progress");

    // play the found sound effect
    this.currentPlay.audio.volume = this.volume;
    this.currentPlay.audio.play();
    this.setProgressCounter();
  }

  // clear progress bar fill
  clearProgress() {
    if (!this.currentProgressBar) return;

    this.currentProgressBar.style.width = 0;
    this.fill = 0;
  }

  // fillProgress
  fillProgress() {
    // finish painting progress bar when it reaches 100%
    if (this.fill > 99) {
      clearInterval(this.counter);

      //   reset progress bar fill
      this.clearProgress();
      return;
    }

    // fill the progress bar
    this.fill += this.currentPlay.fillAmount;
    this.currentProgressBar.style.width = `${this.fill}%`;
  }

  // set progress fill amounts
  setProgressCounter() {
    // remove if an interval exists
    if (this.counter) {
      clearInterval(this.counter);
    }

    // initiate counter
    this.counter = setInterval(this.fillProgress.bind(this), 1000);
  }

  // change volume
  changeVolume(volumeEvent) {
    this.volume = +volumeEvent.target.value;

    if (this.currentPlay) this.currentPlay.audio.volume = this.volume;
  }

  // handle button clicks
  handleClicks(clickEvent) {
    if (clickEvent.target.tagName !== "BUTTON") return;

    // add the progress span element
    this.playSound(clickEvent.target);
  }

  // click  event listener
  addClickListener() {
    this.#soundBoard.addEventListener("click", this.handleClicks.bind(this));
  }

  // volume listener
  addVolumeListener() {
    this.#volumeBar.addEventListener("input", this.changeVolume.bind(this));
  }
}

// start the app
const app = new App();
