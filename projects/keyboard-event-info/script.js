"use strict";

// get the overlay
const overlay = document.querySelector(".overlay");

// get the container
const container = document.querySelector(".keyboard-event-info");

// get elements
const elements = {
  key: document.querySelector(".event__key"),
  code: document.querySelector(".event__code"),
  keyCode: document.querySelector(".event__keycode"),

  // elements to highlight in green
  ctrlKey: document.querySelector(".event__ctrl"),
  altKey: document.querySelector(".event__alt"),
  shiftKey: document.querySelector(".event__shift"),
  metaKey: document.querySelector(".event__meta"),

  // element to highlight in red
  repeat: document.querySelector(".event__repeat"),
};

// store event info
const eventInfo = new Map();

// detect mobile devices
const isDesktop = function () {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return false;
  } else {
    return true;
  }
};

// change container border color to alert the user
const alertUser = function () {
  // add the animation
  container.classList.toggle("event-info--pressed");
};

// display text info
const displayEventInfo = function () {
  eventInfo.forEach((val, key) => {
    elements[key].textContent = val;
    // get values that has either "true" or "false"

    // for other values
    if (val === true || val === false) {
      // for repeat value
      if (key === "repeat") {
        val
          ? elements[key].classList.add("key--repeat")
          : elements[key].classList.remove("key--repeat");
        return;
      } else
        val
          ? elements[key].classList.add("key--active")
          : elements[key].classList.remove("key--active");
    }
  });
};

// get keyboard info
const storeEventInfo = function (e) {
  // save the event info
  eventInfo.set("key", e.key);
  eventInfo.set("keyCode", e.keyCode);
  eventInfo.set("code", e.code);
  eventInfo.set("ctrlKey", e.ctrlKey);
  eventInfo.set("shiftKey", e.shiftKey);
  eventInfo.set("altKey", e.altKey);
  eventInfo.set("metaKey", e.metaKey);
  eventInfo.set("repeat", e.repeat);
};

// event handler
window.addEventListener("keydown", function (e) {
  if (isDesktop()) {
    // remove the overlay
    overlay.style.display = "none";

    storeEventInfo(e);
    alertUser();
    displayEventInfo();
  }
});

// to alert the user (toggle off)
window.addEventListener("keyup", function () {
  if (isDesktop()) {
    alertUser();

    // remove repeat box animation
    elements.repeat.classList.remove("key--repeat");
  }
});
