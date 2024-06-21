"use strict";

const tabs = document.querySelector(".tabs");
const tabImages = document.querySelectorAll(".tab__image");
const tabContents = document.querySelectorAll(".tab__content");
let activeTab = document.querySelector(".tab");

activeTab.classList.add("tab--active");

// loop through all images
// set src manually
tabImages.forEach((img) => {
  img.src = `img/${img.dataset.id}.jpg`;
});

// add load events to all of them
// remove blur
tabImages.forEach((img) => {
  img.addEventListener("load", function () {
    img.style.filter = "blur(0)";
  });
});

tabs.addEventListener("click", function (e) {
  if (!e.target.closest("BUTTON")) return;

  //   get the button data id
  const id = e.target.dataset.id;
  const clickedTab = e.target;

  if (clickedTab !== activeTab) {
    activeTab.classList.remove("tab--active");
    activeTab = e.target;
  }

  // hide all images
  // hide all content
  tabImages.forEach((img) =>
    img.dataset.id === id
      ? img.classList.remove("hidden")
      : img.classList.add("hidden")
  );
  tabContents.forEach((content) =>
    content.dataset.id === id
      ? content.classList.remove("hidden")
      : content.classList.add("hidden")
  );

  e.target.classList.add("tab--active");
});
