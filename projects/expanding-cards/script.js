"use strict";

const expandingCardsContainer = document.querySelector(".expanding-cards");
const cards = document.querySelectorAll(".expanding__card");

// Event handler for clicks
expandingCardsContainer.addEventListener("click", function (e) {
  if (!e.target.closest("IMG")) return;
  console.log(e.target);

  // remove expanded class from all image figure elements
  cards.forEach((card) => card.classList.remove("card--expanded"));

  // add expanded class to the selected image figure element
  e.target.closest(".expanding__card").classList.add("card--expanded");
});
