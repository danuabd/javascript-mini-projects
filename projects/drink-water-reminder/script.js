"use strict";

const waterBucket = document.querySelector(".water-reminder__bottle--fill");
const cups = document.querySelector(".water-reminder__cups");
const consumedPercentage = document.querySelector(
  ".water-reminder__percentage"
);
const consumedAmount = document.querySelector(
  ".water-reminder__consumed-amount"
);

const goal = 2500;
const cupWater = 250; // 250ml
const heightPerCup = 100 / 10;

// add a click event
cups.addEventListener("click", function (e) {
  if (!e.target.closest(".water-reminder__cup")) return;
  const consumedCups = e.target.dataset.num;

  // fill the bucket
  waterBucket.style.height = `${consumedCups * heightPerCup}%`;

  // update the percentage
  consumedPercentage.textContent = `${consumedCups * heightPerCup}%`;

  // update the consumed amount
  const consumedMl = consumedCups * cupWater;

  if (consumedMl < 1000) {
    consumedAmount.textContent = `${consumedCups * cupWater}ml`;
  } else {
    consumedAmount.textContent = `${((consumedCups * cupWater) / 1000).toFixed(
      2
    )}L`;
  }
});

// get the cup number * 250 ml

// increase the bottle's height (2700/100)

// increase the percentage (10%) and amount left (1.5L)
