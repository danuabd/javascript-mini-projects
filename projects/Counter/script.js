"use strict";

const counterValue = document.querySelector(".counter");
const counterControls = document.querySelector(".counter__control-btns");
const btnDecrease = document.querySelector(".btn--decrease");
const btnIncrease = document.querySelector(".btn--increase");
const btnReset = document.querySelector(".btn--reset");

// initial state = 0
counterValue.textContent = 0;

function checkValue() {
  const counterNbr = Number(counterValue.textContent);
  if (counterNbr === 0) counterValue.style.color = "black";

  if (counterNbr > 0) counterValue.style.color = "green";

  if (counterNbr < 0) counterValue.style.color = "red";
}

counterControls.addEventListener("click", function (e) {
  //   guard clause
  if (e.target.tagName === "DIV") return;

  if (e.target.classList.contains("btn--decrease")) {
    counterValue.textContent = Number(counterValue.textContent) - 1;
  }

  if (e.target.classList.contains("btn--increase")) {
    counterValue.textContent = Number(counterValue.textContent) + 1;
  }

  if (e.target.classList.contains("btn--reset")) {
    counterValue.textContent = 0;
  }

  checkValue();
});
