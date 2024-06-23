"use strict";

const navbar = document.querySelector(".section--navbar");
let oldScrollY = window.scrollY;
let revealNavbar = false;

// Reveal Sidebar on scroll
const navbarObserver = new IntersectionObserver(function (e) {
  const [observer] = e;
  if (!observer.isIntersecting) {
    revealNavbar = true;
  }
});
navbarObserver.observe(navbar);

window.addEventListener("scroll", function () {
  //   Reset when scrolled up
  if (Number(window.scrollY) < 200) {
    revealNavbar = false;
  } else {
    revealNavbar = true;
  }

  // when scrolled down
  if (oldScrollY < window.scrollY && revealNavbar) {
    navbar.style.opacity = 0;
  }

  // when scrolled up
  if (oldScrollY > window.scrollY && revealNavbar) {
    navbar.classList.add("navbar--sticky");
    navbar.style.opacity = 1;
  }
  oldScrollY = window.scrollY;
});
