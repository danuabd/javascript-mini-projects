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
