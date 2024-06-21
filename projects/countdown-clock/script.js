"use strict";

// Assign values to variables
const uiSectionCountdownClock = document.querySelector(
  ".section--countdown-clock"
);
const giveawayText = document.querySelector(".timeleft-text");
const uiDays = document.querySelector(".days");
const uiHours = document.querySelector(".hours");
const uiMinutes = document.querySelector(".minutes");
const uiSeconds = document.querySelector(".seconds");

const bgImg = document.createElement("img");
const monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayArr = [
  "Sunday",
  "Monday",
  "Sunday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// create date by adding 15 days to the current day 😤😤
const today = new Date();
const endDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 15,
  today.getHours(),
  today.getMinutes(),
  today.getSeconds()
);

let remainingTime = Math.trunc((endDate - today) / 1000);

// Change giveaway end date text
// ex: Friday, 2 April 2021 11:30am
giveawayText.textContent = `${dayArr[endDate.getDay()]}, ${endDate.getDate()} ${
  monthArr[endDate.getMonth()]
} ${endDate.getFullYear()} at ${endDate.getHours()}:${endDate.getMinutes()}${
  endDate.getMinutes() < 12 ? "am" : "pm"
}`;

// function to set dates
const setDate = function (el, val) {
  el.textContent = val.toString().padStart(2, 0);
};

// Create the clock and set dates
const clock = function () {
  --remainingTime;
  if (remainingTime === 0) clearInterval(countDown);

  let time = remainingTime;

  const days = Math.trunc(time / (60 * 60 * 24));
  setDate(uiDays, days);

  time = time - days * 24 * 60 * 60;

  const hours = Math.trunc(time / (60 * 60));
  setDate(uiHours, hours);

  time = time - hours * 60 * 60;

  const minutes = Math.trunc(time / 60);
  setDate(uiMinutes, minutes);

  time = time - minutes * 60;

  const seconds = Math.trunc(time);
  setDate(uiSeconds, seconds);
};

// start the countdown
const countDown = setInterval(clock, 1000);

// Add background-image
bgImg.src = "img/background-img.jpg";
bgImg.addEventListener("load", function () {
  uiSectionCountdownClock.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
    url("img/background-img.jpg")`;
});
