"use strict";

// select elements
const searchForm = document.querySelector(".search");
const searchBar = document.querySelector("#search__bar");
const searchBtn = document.querySelector(".search__btn");
let searchBarState = 0;

// close/reveal search bar
function revealCloseSearchBar() {
  // return if user has typed something in search bar
  if (searchBar.value) return;

  if (searchBarState) {
    searchBar.classList.remove("search__bar--expanded");
    searchBar.classList.add("search__bar--collapsed");
    searchBarState = 0;
  } else {
    searchBar.classList.add("search__bar--expanded");
    searchBar.classList.remove("search__bar--collapsed");
    searchBarState = 1;
  }

  // toggle search bar classes

  // toggle search button class to add left border and radius
  searchBtn.classList.toggle("search__btn--collapsed");
}

// event handler for formSubmit button
searchForm.addEventListener("click", function (e) {
  // prevent form submission
  e.preventDefault();

  if (!e.target.closest("BUTTON")) return;

  // focus to search bar (cursor)
  searchBar.focus();

  // collapse/reveal search bar
  revealCloseSearchBar();
});

// // event handler for document body
document.body.addEventListener("click", function (e) {
  if (e.target.closest(".search")) return;

  // return if the search bar is already collapsed
  if (searchBtn.classList.contains("search__btn--collapsed")) return;

  // collapse/reveal search bar
  revealCloseSearchBar();
});
