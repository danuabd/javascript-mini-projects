"use strict";

const itemInput = document.querySelector("#item-input");
const inputUpdate = document.querySelector("#update-input");
const groceryForm = document.querySelector(".grocery-form");
const groceryList = document.querySelector(".grocery-list");
const updateForm = document.querySelector(".popup--form");
const groceryItemName = document.querySelector(".grocery-item__name");
const overlay = document.querySelector(".overlay");
const errorMsg = document.querySelector(".error-msg");
const confirmMsg = document.querySelector(".confirm-msg");

// buttons
const btnClearAll = document.querySelector(".btn--clear-all");

// Popups
const errorPopup = document.querySelector(".popup--error");
const confirmPopup = document.querySelector(".popup--confirm");
const itemUpdatePopup = document.querySelector(".popup--form");

// hold popups
const popups = {
  error: errorPopup,
  confirm: confirmPopup,
  form: itemUpdatePopup,
};

let lastId = 0;
let clickedItem;
const groceryListArr = [];

// Check for local storage
function getGroceryList() {
  const savedList = JSON.parse(localStorage.getItem("groceryList"));

  savedList.forEach((item) => groceryListArr.push(item));
  lastId = groceryListArr.length;
}

// save grocery list to local storage
function saveGroceryList() {
  // reset the index
  let index = 0;
  groceryListArr.forEach((item) => (item.id = index++));

  //   save list to local storage
  localStorage.setItem("groceryList", JSON.stringify(groceryListArr));
}

// render grocery list form the array
function renderGroceryList() {
  renderEmptyList();
  if (groceryListArr[0]) {
    groceryListArr.forEach((item) => {
      const itemEl = `
    <div class="grocery-item" data-id="${item.id}">
        <p>${item.name}</p>
        <div class="grocery-item__btns">
            <button class="btn btn--edit">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="icon"
                    viewBox="0 0 16 16"
                >
                <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                </svg>
            </button>
            <button class="btn btn--delete">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="icon"
                    viewBox="0 0 16 16"
                    >
                    <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
                />
            </svg>
        </button>
    </div>
</div>`;
      groceryList.insertAdjacentHTML("beforeend", itemEl);
    });
    toggleClearAllBtn(1);
  } else {
    toggleClearAllBtn();
  }
}

// Set error
function setError(err) {
  errorMsg.textContent = err;
  if (+updateForm.dataset.active) {
    togglePopup("form");
  }
  togglePopup("error");
}

// Set confirm
function setConfirm(msg) {
  confirmMsg.textContent = msg;
  togglePopup("confirm");
}

// set update form state
function setConfirmPopupState(state) {
  confirmPopup.dataset.type = state;
}

// toggle popup with overlay
function togglePopup(name) {
  popups[name].classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}

// toggle clear items button
function toggleClearAllBtn(option = 0) {
  if (option) btnClearAll.classList.remove("hidden");

  if (!option) btnClearAll.classList.add("hidden");
}

// clear given input field
function clearInputField(el) {
  el.value = "";
}

// Clear grocery list
function clearAll() {
  groceryListArr.length = 0; // clear the list
  saveGroceryList();
  renderGroceryList();
  togglePopup("confirm");
}

// create and render empty list
function renderEmptyList() {
  groceryList.innerHTML = "";
}

// check user inputs
function checkInput(inputValue) {
  if (!inputValue) return 0;
  //   Basic input validation, needs more improvements
  const firstChar = inputValue.slice(0, 1);

  if (!isNaN(Number(firstChar))) {
    setError("Invalid input");
    return 0;
  }

  if (inputValue.length < 3) {
    setError("Enter at least 3 characters");
    return 0;
  }

  return 1;
}

// add grocery item to the list
function addItem(item) {
  groceryListArr.push({
    name: item,
    id: groceryListArr.length,
  });

  renderGroceryList();
  saveGroceryList();
}

// update selected grocery item
function updateItem(el, newName) {
  el.querySelector("P").textContent = newName;
  const changedItem = groceryListArr.forEach((item) => {
    if (item.id === +el.dataset.id) item.name = newName;
  });

  saveGroceryList();
}

// delete grocery item from the list
function deleteItem(itemId) {
  groceryListArr.splice(itemId, 1);
  saveGroceryList();
  renderGroceryList();
  togglePopup("confirm");
}

// event handler for adding grocery items
groceryForm.addEventListener("click", function (e) {
  e.preventDefault();

  if (!e.target.closest(".btn")) return;

  itemInput.blur();

  if (checkInput(itemInput.value)) addItem(itemInput.value);

  clearInputField(itemInput);
});

// event handler of error popup
errorPopup.addEventListener("click", function (e) {
  if (!e.target.closest(".btn")) return;
  togglePopup("error");
  if (+updateForm.dataset.active) togglePopup("form");
});

// event handler for confirm popup
confirmPopup.addEventListener("click", function (e) {
  if (!e.target.closest(".btn")) return;

  if (e.target.closest(".btn--confirm")) {
    //   to clear selected
    if (confirmPopup.dataset.type === "one") {
      deleteItem(clickedItem.dataset.id);
      togglePopup("confirm");
    }

    //   to clear all
    if (confirmPopup.dataset.type === "all") {
      clearAll();
      toggleClearAllBtn();
      togglePopup("confirm");
    }
  }

  //   reset confirm popup data type
  setConfirmPopupState("one");
  togglePopup("confirm");
});

// change update form default behavior
updateForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

// event handler for update form
updateForm.addEventListener("click", function (e) {
  e.preventDefault();

  if (!e.target.closest(".btn")) return;

  inputUpdate.blur();

  if (e.target.closest(".btn--cancel")) {
    clearInputField(inputUpdate);
    updateForm.dataset.active = 0;
    togglePopup("form");
  }

  if (e.target.closest(".btn--update")) {
    if (checkInput(inputUpdate.value)) {
      updateItem(clickedItem, inputUpdate.value);
      clearInputField(inputUpdate);
      updateForm.dataset.active = 0;
      togglePopup("form");
    }
  }
});

// event handler for clear all button
btnClearAll.addEventListener("click", function () {
  setConfirmPopupState("all");
  setConfirm("Do you want to clear all grocery items from the list?");
});

// event handler for grocery list
groceryList.addEventListener("click", function (e) {
  if (!e.target.closest(".btn")) return;

  clickedItem = e.target.closest(".grocery-item");

  if (e.target.closest(".btn--edit")) {
    togglePopup("form");
    updateForm.dataset.active = "1";
    groceryItemName.textContent = clickedItem.querySelector("P").textContent;
  }

  if (e.target.closest(".btn--delete")) {
    setConfirmPopupState("one");
    setConfirm("Do you want to delete this item?");
  }
});

// load grocery items from the array
function init() {
  renderEmptyList();
  getGroceryList();
  if (groceryListArr) {
    renderGroceryList();
  } else {
    renderEmptyList();
    toggleClearAllBtn();
  }
}

init();
