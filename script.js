"use strict";

const pdImage = document.querySelector(".author__image");
const pdImageOriginal = document.createElement("img");
const projectList = document.querySelector(".mini-projects");
const projectCount = document.querySelector(".mini-project-count");

pdImageOriginal.src = "img/danuka prasad.png";

pdImageOriginal.addEventListener("load", function (e) {
  pdImage.src = "img/danuka prasad.png";

  pdImage.classList.remove("lazy-load");
});

projectCount.textContent = projectList.querySelectorAll("li").length;

document.querySelectorAll(".mini-project").forEach(function (item) {
  item.addEventListener("click", function () {
    const link = this.querySelector("a");
    if (link) {
      window.location.href = link.href;
    }
  });
});
