"use strict";

const form = document.querySelector(".form");
const labels = document.getElementsByClassName("form__label");
const inputEmail = document.querySelector("#email");
const inputPW = document.querySelector("#password");

/**
 * Create a class to add the common functionalities
 */
class InputField {
  #delay = 0;
  #step = 20;

  constructor(labelEl, inputEl) {
    this.label = labelEl;
    this.input = inputEl;

    // properties derived from inputs
    this.labelLength = this.label.textContent.length;

    this.labelCharacters = [...this.label.textContent];

    // properties not based on user inputs
    this.labelCharacterElements = [...this.updateLabel()];
  }

  // Turn text into characters and replace the original with them
  updateLabel() {
    this.label.innerHTML = "";
    this.labelCharacters.forEach((char) => {
      if (char !== " ") {
        this.label.insertAdjacentHTML("beforeend", `<span>${char}</span>`);
      } else {
        // add a css class to empty elements to add some space
        this.label.insertAdjacentHTML(
          "beforeend",
          `<span class="space">${char}</span>`
        );
      }
    });

    // return the added children so we can save it to a variable
    return this.label.children;
  }

  // Add animation to characters
  addAnimation() {
    // add a className to the label
    this.label.className = "form__label forward";
    this.labelCharacterElements.forEach((char) => {
      char.style.animation = `${this.labelLength * this.#step}ms ease-in ${
        this.#delay
      }ms 1 normal forwards running charAnimateForward`;
      this.#delay += this.#step;
    });
    // reset the delay
    this.#delay = 0;
  }

  // Remove character animations
  removeAnimation() {
    // add a className to the label
    this.label.className = "form__label backward";
    this.labelCharacterElements.forEach((char) => {
      char.style.animation = `${this.labelLength * this.#step}ms ease-in ${
        this.#delay
      }ms 1 normal backwards running charAnimateBackward`;
      this.#delay += this.#step;
    });
    // reset the delay
    this.#delay = 0;
  }

  // Add the backward animation when there is no input
  removeAnimationConditionally() {
    if (this.hasForwardAnimation && !this.hasInput) this.removeAnimation();
  }

  // clear the input and apply backward animation
  clearInputs() {
    this.input.value = "";
    this.removeAnimation();
  }

  // check input
  get hasInput() {
    return this.input.value;
  }

  // check forward Animation
  get hasForwardAnimation() {
    return this.label.classList.contains("forward");
  }

  // check forward Animation
  get hasBackwardAnimation() {
    return this.label.classList.contains("forward");
  }
}

// create Class INSTANCES
const emailField = new InputField(labels[0], inputEmail);

const passwordField = new InputField(labels[1], inputPW);

// Event handler for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // clear inputs
  emailField.clearInputs();
  passwordField.clearInputs();
});

// Event handler for click events
document.body.addEventListener("click", function (e) {
  //   e.preventDefault();
  const origin = e.target;
  const container = origin.closest(".form__input-container");

  if (!container) {
    // check if email has animation and then is no input => remove animation
    emailField.removeAnimationConditionally();

    // check if password has animation and there is no inputs => remove animation
    passwordField.removeAnimationConditionally();

    return;
  }

  const inputType = container.querySelector(".form__input");

  // apply the forward animation
  if (inputType === inputEmail) emailField.addAnimation();

  if (inputType === inputPW) passwordField.addAnimation();
});

/**
 * Event handlers for focus events
 */
inputEmail.addEventListener("focus", function () {
  // if the element doesn't have an animation, add it
  if (!emailField.hasForwardAnimation) {
    emailField.addAnimation();
  }

  // check if password has animation and then is no input => remove animation
  passwordField.removeAnimationConditionally();
});

inputPW.addEventListener("focus", function () {
  // if the element doesn't have an animation, add it
  if (!passwordField.hasForwardAnimation) {
    passwordField.addAnimation();
  }

  // check if email has animation and then is no input => remove animation
  emailField.removeAnimationConditionally();
});

/**
 * Event handlers for change events
 */
inputEmail.addEventListener("input", function () {
  // if there is no input, remove the animation
  if (!emailField.hasInput) emailField.removeAnimation();
  else emailField.addAnimation();
});

inputPW.addEventListener("input", function () {
  // if there is no input, remove the animation
  if (!passwordField.hasInput) passwordField.removeAnimation();
  else passwordField.addAnimation();
});

/**OLD CODE
 * const step = 20;
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

  // return the added children so we can save it to a variable
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
 */
