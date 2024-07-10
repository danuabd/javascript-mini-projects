"use strict";

const choiceContainer = document.querySelector(".choices");
const form = document.querySelector(".choice-picker__form");
const inputArea = document.querySelector("#input--choices");
const btnSubmit = document.querySelector(".form__btn");
const choices = document.getElementsByClassName("choices__choice");
let choiceList = [];

// defined time
const definedTime = 20;

// define animation time
let animationTime = definedTime;

// hold choices

// hold interval
let interval;

// hold a random index and choice
let randomIndex, randomChoice;

// hold current index and choice
let currentIndex, previousChoice;

// create a choice element
const choice = document.createElement("button");
choice.className = "choices__choice";

// add bg color to all choices (reset all)
const colorAllChoices = function () {
  // add elements to the array
  choiceList = [...choices];

  if (choiceList[0])
    choiceList.forEach((choiceEl) => (choiceEl.className = "choices__choice"));
};

// clear the choices container
const clearChoiceElements = function () {
  choiceContainer.innerHTML = "";
};

// when the user type comma render a button displaying the entered choice
const splitChoices = function (input) {
  const choiceArr = input.split(",");
  addChoice(choiceArr);
};

const addChoice = function (inputArr) {
  // clear any previously inserted choice elements
  clearChoiceElements();

  inputArr.forEach((input) => {
    if (input.trim()) {
      const newChoice = choice.cloneNode();
      newChoice.textContent = input;
      choiceContainer.insertAdjacentElement("beforeend", newChoice);
    }
  });
};

// generate an index for choice
const generateIndex = function () {
  //   get the random number between 0 and arr.length
  randomIndex = Math.trunc(Math.random() * choiceList.length);
};

// only highlight the last choice
const emphasizeFinalChoice = function () {
  choiceList.forEach(
    (choiceEl) =>
      choiceEl === previousChoice || choiceEl.classList.add("choice--reject")
  );
};

// animation function
const animateChoices = function () {
  if (animationTime === 0) {
    emphasizeFinalChoice();
    animationTime = definedTime;
    clearInterval(interval);
    return;
  }

  //   give the choice a bg and remove the bg from previous given choice
  if (previousChoice) {
    previousChoice.classList.remove("choice--select");
  }

  randomChoice.classList.add("choice--select");
  previousChoice = randomChoice;

  animationTime--;
  pickAChoice();
};

// start animation
const startAnimateChoice = function () {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(animateChoices, 200);
};

// pick a choice
const pickAChoice = function () {
  generateIndex();

  // ensure the random number doesn't repeat
  if (randomIndex === currentIndex) generateIndex();
  else currentIndex = randomIndex;

  randomChoice = choiceList[randomIndex];
};

// event handler: input
inputArea.addEventListener("input", function (e) {
  // clear the field when no inputs
  if (!this.value.trim()) clearChoiceElements();

  // detect ","
  if (this.value[this.value.length - 1] === ",")
    splitChoices(this.value.slice(0, -1));
});

// event handler: enter button
inputArea.addEventListener("keydown", function (e) {
  // when hit the enter button inside the text area add an animation

  if (e.code === "Enter") {
    e.preventDefault();
    inputArea.blur();

    // start picking a choice
    colorAllChoices();
    pickAChoice();
    startAnimateChoice();
  }
});

// event handler: button click
form.addEventListener("submit", function (e) {
  // when click the button button, add an animation
  e.preventDefault();

  colorAllChoices();
  pickAChoice();
  startAnimateChoice();
  inputArea.blur();
});
