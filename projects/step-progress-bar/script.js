"use strict";

const steps = document.querySelectorAll(".steps__step");
const progressBar = document.querySelector(".progress-bar");
const stepsController = document.querySelector(".progress-btns");
const btnPrev = document.querySelector(".btn--prev");
const btnNext = document.querySelector(".btn--next");

// set current step
const stepCount = 4;

// set the amount of filling required for one step
const fillUnit = Math.trunc(100 / (stepCount - 1));

// set the current step
let currentStep = 1;

// set the current progress bar fill
let progressBarFill = 0;

function fillStepBorder() {
  steps.forEach((step) => {
    if (step.dataset.step <= currentStep) {
      step.style.transitionDelay = "600ms";
      step.style.borderColor = "var(--clr-dark-2)";
    } else {
      step.style.transitionDelay = "0ms";
      step.style.borderColor = "var(--clr-gray-2)";
    }
  });
}

// fill the progress bar based on the direction (left or right)
function fillProgressBar(direction = 1) {
  if (direction) {
    progressBarFill += fillUnit;
    currentStep++;
  } else {
    progressBarFill -= fillUnit;
    currentStep--;
  }

  //   check for overflowing
  if (!(progressBarFill < 100 || progressBar > 0)) return;

  progressBar.style.width = `${progressBarFill}%`;
  fillStepBorder();
}

// make buttons disabled and enabled
function toggleControlBtn() {
  if (currentStep > 1) btnPrev.removeAttribute("disabled");

  if (currentStep === 1) btnPrev.setAttribute("disabled", "");

  if (currentStep === stepCount) btnNext.setAttribute("disabled", "");

  if (currentStep < stepCount) btnNext.removeAttribute("disabled");
}

// event handler for control buttons
stepsController.addEventListener("click", function (e) {
  if (!e.target.closest("BUTTON")) return;

  if (e.target === btnPrev) fillProgressBar(0);
  else fillProgressBar(1);

  toggleControlBtn();
});

// initialize progress bar
fillStepBorder();

// btnNext.setAttribute("disabled", "");
