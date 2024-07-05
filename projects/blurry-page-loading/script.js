"use strict";

const backgroundImg = document.querySelector(".loading__img");
const loadingProgress = document.querySelector(".loading__progress");

// set the initial opacities
backgroundImg.style.opacity = 0;
loadingProgress.style.opacity = 1;

let progress = 0;
let loading;

// create a new img element to hold the image to be loaded.
const domContent = document.createElement("img");
domContent.src = "planet-earth-large.jpg";

function increaseLoadProgress() {
  // increase the progress count
  progress += 1;

  // apply the progress count
  loadingProgress.textContent = `${progress}%`;

  // apply the opacity to progress counter
  loadingProgress.style.opacity -= 1 / 100;

  // apply the opacity to image in the DOM
  backgroundImg.style.opacity = +backgroundImg.style.opacity + 1 / 100;

  // do this if progress count reaches 100%
  if (progress === 100) {
    // hide the counter number
    loadingProgress.style.opacity = 0;

    // Reveal the image
    backgroundImg.style.opacity = 1;
    // stop the counter
    clearInterval(loading);
  }
}

// Event handler for DOM load
document.addEventListener("DOMContentLoaded", function (e) {
  // start the counter (progress)
  loading = setInterval(increaseLoadProgress, 100);
});

// Event handler for IMAGE load
domContent.addEventListener("load", function (e) {
  // change document image source
  backgroundImg.src = domContent.src;

  // increase counting speed by 4x
  clearInterval(loading);
  loading = setInterval(increaseLoadProgress, 25);
});
