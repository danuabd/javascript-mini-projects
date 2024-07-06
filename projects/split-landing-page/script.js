"use strict";

// get the container
const container = document.querySelector(".landing-page");

// get two parts
const parts = document.querySelectorAll(".page__part");

container.addEventListener("mouseover", function (e) {
  const target = e.target;

  if (!target.closest(".landing-page")) {
    parts.forEach((part) => part.classList.remove("grow"));
    return;
  }

  parts.forEach((part) => part.classList.remove("grow"));

  target.closest("DIV").classList.add("grow");
});

container.addEventListener("mouseleave", function (e) {
  parts.forEach((part) => part.classList.remove("grow"));
});
