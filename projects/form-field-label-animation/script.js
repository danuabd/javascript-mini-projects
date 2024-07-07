"use strict";

const form = document.querySelector(".form");
const labels = document.getElementsByClassName("form__label");
const inputEmail = document.querySelector("#email");
const inputPW = document.querySelector("#password");
const step = 20;
let delay = 0;

// take letters of label
const labelEmail = labels[0];
const labelPW = labels[1];

// split them by text
const arrEmail = [...labelEmail.textContent];
const arrPW = [...labelPW.textContent];

// add each of them as a span element
const emailCharArr = [...insertChar(labelEmail, arrEmail)];
const PWCharArr = [...insertChar(labelPW, arrPW)];

// check inputs to prevent backward animation
function checkInput(inputEl) {
  return inputEl.value;
}

// Turn text into characters and replace the original with them
function insertChar(el, arr) {
  el.innerHTML = "";
  arr.forEach((char) => {
    if (char !== " ") {
      el.insertAdjacentHTML("beforeend", `<span>${char}</span>`);
    } else {
      // add a class to empty elements to add some space (since they become inline-elements)
      el.insertAdjacentHTML("beforeend", `<span class="space">${char}</span>`);
    }
  });

  return el.children;
}

// Add animation to characters
const addAnimation = function (charArr, arrLabel) {
  // add a className to the label
  arrLabel.className = "form__label forward";
  charArr.forEach((char) => {
    char.style.animation = `${
      charArr.length * step
    }ms ease-in ${delay}ms 1 normal forwards running charAnimateForward`;
    delay += step;
  });
  // reset the delay
  delay = 0;
};

// Remove character animations
function removeAnimation(charArr, arrLabel) {
  // add a className to the label
  arrLabel.className = "form__label backward";
  charArr.forEach((char) => {
    char.style.animation = `${
      charArr.length * step
    }ms ease-in ${delay}ms 1 normal backwards running charAnimateBackward`;
    delay += step;
  });
  // reset the delay
  delay = 0;
}

// Event handler for form submission
form.addEventListener("submit", (e) => e.preventDefault());

// Event handler for click events
document.body.addEventListener("click", function (e) {
  //   e.preventDefault();
  const origin = e.target;
  const container = origin.closest(".form__input-container");

  if (!container) {
    // check if email has animation and then remove it
    if (labelEmail.classList.contains("forward") && !inputEmail.value) {
      removeAnimation(emailCharArr, labelEmail);
    }

    // check if password has animation and then remove it
    if (labelPW.classList.contains("forward") && !inputPW.value) {
      removeAnimation(PWCharArr, labelPW);
    }

    return;
  }

  const inputType = container.querySelector(".form__input");

  // clear animations
  // removeAnimation(emailCharArr);
  // removeAnimation(PWCharArr);

  // apply the animation with a delay for each
  if (inputType === inputEmail) addAnimation(emailCharArr, labelEmail);

  if (inputType === inputPW) addAnimation(PWCharArr, labelPW);
});

/**
 * Event handlers for focus events
 */
inputEmail.addEventListener("focus", function (e) {
  // if the element doesn't have an animation, add it
  if (!labelEmail.classList.contains("forward")) {
    addAnimation(emailCharArr, labelEmail);
  }

  if (labelPW.classList.contains("forward") && !checkInput(inputPW))
    removeAnimation(PWCharArr, labelPW);
});

inputPW.addEventListener("focus", function (e) {
  // if the element doesn't have an animation, add it
  if (!labelPW.classList.contains("forward")) {
    addAnimation(PWCharArr, labelPW);
  }

  if (labelEmail.classList.contains("forward") && !checkInput(inputEmail))
    removeAnimation(emailCharArr, labelEmail);
});

/**
 * Event handlers for change events
 */
inputEmail.addEventListener("input", function (e) {
  // if there is no input, remove the animation
  if (!checkInput(inputEmail)) removeAnimation(emailCharArr, labelEmail);
  else addAnimation(emailCharArr, labelEmail);
});

inputPW.addEventListener("input", function (e) {
  // if there is no input, remove the animation
  if (!checkInput(inputPW)) removeAnimation(PWCharArr, labelPW);
  else addAnimation(PWCharArr, labelPW);
});
