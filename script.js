"use strict";

const pdImage = document.querySelector(".author__image");

const pdImageOriginal = document.createElement("img");

pdImageOriginal.src = "img/danuka prasad.png";

pdImageOriginal.addEventListener("load", function (e) {
  pdImage.src = "img/danuka prasad.png";

  pdImage.classList.remove("lazy-load");
});
