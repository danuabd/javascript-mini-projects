"use strict";

const counterFacebook = document
  .querySelector(".facebook")
  .querySelector(".counter__count");

const counterInstagram = document
  .querySelector(".instagram")
  .querySelector(".counter__count");

const counterYoutube = document
  .querySelector(".youtube")
  .querySelector(".counter__count");

// Define followers/subscribers
const countFacebook = 9150;
const countInstagram = 2380;
const countYoutube = 4864;

// completion time
const timeToComplete = 340;
let start = 0;

// values to add
const numToAddFacebook = Math.floor(countFacebook / timeToComplete);
const numToAddInstagram = Math.floor(countInstagram / timeToComplete);
const numToAddYoutube = Math.floor(countYoutube / timeToComplete);

// reset values
counterFacebook.textContent = 0;
counterInstagram.textContent = 0;
counterYoutube.textContent = 0;

const increaseCount = function () {
  if (start === timeToComplete) {
    clearInterval(interval);
    counterFacebook.textContent = countFacebook;
    counterInstagram.textContent = countInstagram;
    counterYoutube.textContent = countYoutube;
    return;
  }
  counterFacebook.textContent = +counterFacebook.textContent + numToAddFacebook;

  counterInstagram.textContent =
    +counterInstagram.textContent + numToAddInstagram;

  counterYoutube.textContent = +counterYoutube.textContent + numToAddYoutube;

  start++;
};

const interval = setInterval(increaseCount, 1);
