"use strict";

const btnNavbarToggle = document.querySelector(".btn--toggle-navbar");

const navbar = document.querySelector(".navbar");
const iconOpen = document.querySelector(".icon--open");
const iconClose = document.querySelector(".icon--close");

btnNavbarToggle.addEventListener("click", function () {
  iconOpen.classList.toggle("hidden");
  iconClose.classList.toggle("hidden");
  navbar.classList.toggle("navbar-bottom--open");
});
