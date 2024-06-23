"use strict";

const faqSection = document.querySelector(".section--faq");
const faqBodies = document.querySelectorAll(".faq__body");
let previousFaq;

function returnSelector(e, selector) {
  e.target.closest(".faq").querySelector(".faq__head").querySelector("span");
}

faqSection.addEventListener("click", function (e) {
  // guard clause
  if (!e.target.closest(".faq__head")) {
    return;
  }

  // close if there are any opened faqs
  if (previousFaq && previousFaq !== e.target.closest(".faq")) {
    // close faq body
    previousFaq.querySelector(".faq__body").classList.remove("faq--open");

    // change faq button text
    previousFaq
      .querySelector(".faq__head")
      .querySelector("span")
      .classList.remove("faq__btn--open");
  }

  // open clicked faq
  e.target
    .closest(".faq")
    .querySelector(".faq__body")
    .classList.toggle("faq--open");

  // Change button text or clicked faq
  e.target
    .closest(".faq")
    .querySelector(".faq__head")
    .querySelector("span")
    .classList.toggle("faq__btn--open");

  // store clicked faq
  previousFaq = e.target.closest(".faq");
});
