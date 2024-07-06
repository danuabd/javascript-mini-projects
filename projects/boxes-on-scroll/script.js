"use strict";

const boxContainer = document.querySelector(".boxes");
let boxes = document.getElementsByClassName("boxes__box");

// create a box to be inserted
const box = `<div class="boxes__box    
            box--moving-right">
              <h3 class="h3 margin-s">Lorem Ipsum</h3>
              <p class="p">
               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius
               commodi expedita facere consequuntur accusantium minima ea nulla
               quas voluptatibus!
              </p>
            </div>`;

// hold values to compare scroll positions
let previous = 0;
let present;

// hold last box element and (lastBox-1) box element
let lastBox, previousBox;

// check if scrolling up or down (throttle this later)
window.addEventListener("scroll", function (e) {
  present = document.documentElement.scrollTop.toFixed(0);

  // hold difference
  const change = present - previous;

  // get last box and previous box
  lastBox = boxes[boxes.length - 1];
  previousBox = boxes[boxes.length - 2];

  // Logic when scrolling DOWN
  if (change > 0) {
    observerUp.unobserve(lastBox);
    observerDown.observe(lastBox);
  }

  // Logic when scrolling UP
  if (change < 0) {
    observerDown.unobserve(lastBox);
    observerUp.observe(lastBox);
  }

  // set the previous value to current value to compare again
  previous = present;
});

// function for scroll DOWN
const scrollDown = function (ObserverEntry) {
  const entry = ObserverEntry[0];

  // prevent unnecessary calls
  if (!entry.isIntersecting) return;

  // remove observer from current last item
  observerDown.unobserve(lastBox);

  // insert the new box
  boxContainer.insertAdjacentHTML("beforeend", box);
};

// observer for scroll DOWN
const observerDown = new IntersectionObserver(scrollDown, {
  threshold: 1,
  // rootMargin: `-30px`,
});

// function for scroll UP
const scrollUp = function (ObserverEntry) {
  const entry = ObserverEntry[0];

  // prevent unnecessary calls
  if (entry.isIntersecting) return;

  // remove observer from current last item
  observerDown.unobserve(lastBox);

  // remove the last box after moving it to the left
  if (lastBox.classList.contains("box--moving-right")) {
    lastBox.classList.toggle("box--moving-right");
    lastBox.classList.toggle("box--moving-left");

    setTimeout(() => boxContainer.removeChild(lastBox), 100);
  }
};

// observer for scroll UP
const observerUp = new IntersectionObserver(scrollUp, {
  threshold: 0.5,
});
