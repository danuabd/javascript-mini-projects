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

// check if scrolling up or down
window.addEventListener("scroll", function (e) {
  present = document.documentElement.scrollTop.toFixed(0);

  const change = present - previous;

  if (change > 0) console.log("down");
  if (change < 0) console.log("up");

  previous = present;
});
