"use strict";

const btnOpenModal = document.querySelector(".btn--open-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

btnOpenModal.addEventListener("click", () => openModal());

btnCloseModal.addEventListener("click", () => closeModal());

overlay.addEventListener("click", () => closeModal());

document.documentElement.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});
