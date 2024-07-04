"use strict";

const postNavigation = document.querySelector(".navigation__toggle");
const post = document.querySelector(".rotating__blog-post");
const menu = document.querySelector(".navigation__menu");

postNavigation.addEventListener("click", function (e) {
  if (!e.target.closest("BUTTON")) return;

  post.classList.toggle("rotating__blog-post--rotate");

  menu.classList.toggle("navigation__menu--hidden");

  postNavigation.classList.toggle("navigation__toggle--rotate");
});
