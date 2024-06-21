"use strict";

// select elements
const input = document.querySelector("#paragraph-count");
const btnGenerate = document.querySelector(".btn--generate");
const outputContainer = document.querySelector(".generator__output");
const outputText = document.querySelector(".output__text");
const btnCopy = document.querySelector(".btn--copy");

// text to generate
const generateText = `Our Earth, a vibrant blue and green jewel in the vast expanse of space, is a sanctuary of life and diversity. From the towering mountains that pierce the skies to the deepest oceans that cradle mysterious creatures, our planet is a testament to nature's grandeur. The lush forests breathe life into the atmosphere, while the sprawling deserts hold secrets of ancient civilizations.`;

// set default text
outputText.textContent = generateText;

// function to generate and print text to DOM
const generate = function (num) {
  for (let i = 0; i < +num; i++) {
    const output = document.createElement("p");
    output.classList.add("output__text");
    output.textContent = generateText;
    outputContainer.insertAdjacentElement("beforeend", output);
  }
};

// function to add DOM content to clipboard
const copyText = function () {
  const outputTextAll = document.querySelectorAll(".output__text");
  let text = "";
  outputTextAll.forEach((el) => (text += el.textContent + "\n\n"));
  return text;
};

btnGenerate.addEventListener("click", function (e) {
  e.preventDefault();

  if (Number(input.value) === 1) return;

  generate(Number(input.value));
});

btnCopy.addEventListener("click", function () {
  if (Number(input.value) === 1) return;

  outputContainer.style.backgroundImage =
    "linear-gradient(rgba(0, 128, 0, 0.1), rgba(0, 128, 0, 0.1))";

  navigator.clipboard.writeText(copyText());

  setTimeout(function () {
    outputContainer.style.backgroundImage = "none";
  }, 500);
});
