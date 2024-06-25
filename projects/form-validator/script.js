"use strict";

// Form element
const form = document.querySelector(".form");

// success message
const successMessage = document.querySelector(".success-msg");

// Form inputs
const inputAll = document.querySelectorAll(".form__input");
const inputFName = document.querySelector("#f-name");
const inputLName = document.querySelector("#l-name");
const inputEmail = document.querySelector("#email");
const inputUserName = document.querySelector("#username");
const inputPassword = document.querySelector("#password");
const inputConfirmPassword = document.querySelector("#password-confirm");

// hold values to check all inputs at once
const arr = [];

// Add animation
function showError(el, msg) {
  const errText = el
    .closest(".form__column")
    .querySelector(".form__input-warning");

  if (errText.classList.contains("hide")) {
    errText.textContent = `${msg}!`;
  }

  errText.classList.remove("hide");

  el.classList.add("warning-outline");
  el.classList.add("warning-animation");

  setTimeout(() => {
    el.classList.remove("warning-animation");
  }, 800);
}

// Reset error
function resetError(el) {
  const warningText = el
    .closest(".form__column")
    .querySelector(".form__input-warning");

  if (!warningText.classList.contains(".hide")) {
    warningText.classList.add("hide");
    el.classList.remove("warning-outline");
  }
}

// Check for empty inputs
function checkEmpty() {
  inputAll.forEach((input) => {
    if (!input.value) {
      showError(input, "Field cannot be empty");
    }
  });
}

// Check for spaces
function checkSpaces(el, err) {
  const elementVal = el.value;
  if (elementVal.trim() === "") {
    showError(el, "Field cannot be empty");
    return;
  }

  if (elementVal.includes(" ")) showError(el, err);
}

// Check character count
function checkCharacterCount(el, count) {
  const elementVal = el.value;

  if (elementVal.length < count)
    showError(el, `Please enter more than ${count} characters`);
}

// check email input
function checkEmail() {
  const emailValue = inputEmail.value;
  const emailName = emailValue.slice(0, emailValue.indexOf("@"));
  const emailDomain = emailValue.slice(emailValue.indexOf("@"), -1);

  if (!emailValue.includes("@")) {
    showError(inputEmail, '"@" is missing');
  } else if (!emailName) {
    showError(inputEmail, "Invalid Email");
  } else if (!emailDomain.includes(".")) {
    showError(inputEmail, "Email domain is incorrect");
  } else {
    checkSpaces(inputEmail, "Email cannot contain spaces");
  }
}

// check username input
function checkUsername() {
  checkSpaces(inputUserName, "Username cannot contain spaces");
}

// Check fName and lName
function checkNames() {
  checkSpaces(inputFName, "Name cannot contain spaces");
  checkSpaces(inputLName, "Name cannot contain spaces");
}

function checkPassword() {
  checkSpaces(inputPassword, "Do not enter spaces for password");
  checkCharacterCount(inputPassword, 6);
}

function checkConfirmPassword() {
  if (inputPassword.value !== inputConfirmPassword.value)
    showError(inputConfirmPassword, `Passwords don't match`);
}

// validate user input
function validate() {
  checkEmpty();

  checkEmail();

  checkNames();

  checkUsername();

  checkPassword();

  checkConfirmPassword();

  registerUser();
}

// Display success message
function displaySuccess() {
  if (arr.every((el) => el === 1)) {
    successMessage.classList.remove("success-msg-hidden");
    clearInputs();
    console.log("registered");
    console.log(arr);
  } else {
    successMessage.classList.add("success-msg-hidden");
    console.log("not yet");
    console.log(arr);
  }
}

// Register user
function registerUser() {
  inputAll.forEach((el) => {
    if (
      el
        .closest(".form__column")
        .querySelector(".form__input-warning")
        .classList.contains("hide")
    )
      arr.push(1);
    else arr.push(0);
  });

  displaySuccess();
  arr.length = 0;
}

// clear all input fields
function clearInputs() {
  inputAll.forEach((el) => {
    el.value = "";
    el.blur();
  });
}

// Submit event handler
form.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.closest(".btn--submit")) {
    validate();
  }
});

// Input event listener
form.addEventListener("input", function (e) {
  if (!e.target.closest("INPUT")) return;

  resetError(e.target);
});
