"use strict";

const header = document.querySelector("header");
const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.querySelector(".btn--open-sidebar");

header.addEventListener("click", function (e) {
  if (!e.target.closest(".sidebar-toggle")) return;

  sidebar.classList.toggle("sidebar--close");
});
