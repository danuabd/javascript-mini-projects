"use strict";

const slides = document.querySelectorAll(".slide");
const arrows = document.querySelector(".arrows");

const slidesArr = [];
// fill array with slide indexes
for (let i = 0; i < slides.length; i++) {
  slidesArr.push(i);
}

// slides to be added left from center
let slidesToLeft = 2;

// current slide
let currentSlide = 2;

// add transition
function addTransition() {
  setTimeout(function () {
    slides.forEach(
      (slide) =>
        (slide.style.transition = "transform 1.5s, scale 1s, box-shadow 1s")
    );
  }, 100);
}

// Add effects
function addEffects() {
  slides.forEach((slide, i) => {});
}

// update slides positions
const updateSlides = () => {
  slides.forEach((_, i) => {
    const index = slidesArr[i];
    if (index !== slidesArr[2]) {
      slides[index].style.transform = `scale(0.8) translateX(${
        (i - slidesToLeft) * 120
      }%)`;
      slides[index].classList.remove("shadow-400");
    } else {
      slides[index].style.transform = `scale(1) translateX(${
        (i - slidesToLeft) * 120
      }%)`;
      slides[index].classList.add("shadow-400");
    }
  });
};

// update slide position
function slideRight() {
  slidesArr.unshift(slidesArr.pop());

  hideSlide(slidesArr[0]);
  updateSlides();
  showSlide(slidesArr[0]);
}
function slideLeft() {
  slidesArr.push(slidesArr.shift());

  hideSlide(slidesArr[5]);
  updateSlides();
  showSlide(slidesArr[5]);
}

// hide moving slide
function hideSlide(i) {
  slides[i].style.display = "none";
}
// show moving slide
function showSlide(i) {
  setTimeout(function () {
    slides[i].style.display = "block";
  }, 50);
}

// initiate positions
updateSlides();
// add transitions
addTransition();

// Click events
arrows.addEventListener("click", function (e) {
  if (!e.target.closest("BUTTON")) return;

  //   left arrow
  if (e.target.closest(".arrow--left")) {
    slideLeft();
  }

  // right arrow
  else if (e.target.closest(".arrow--right")) {
    slideRight();
  }
});

// Key press events
window.addEventListener("keyup", function (e) {
  if (e.key === "ArrowRight") slideRight();

  if (e.key === "ArrowLeft") slideLeft();
});
