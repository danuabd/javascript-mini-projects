"use strict";

const dadJokeContainer = document.querySelector(".section--dad-jokes");
const dadJoke = document.querySelector(".dad-joke");
const dadJokeQuestion = document.querySelector(".dad-joke__q");
const dadJokeAnswer = document.querySelector(".dad-joke__a");
const timeLeft = document.querySelector(".counter");

// default joke
const defaultJokeQ = "Do you know why you are confused?";
const defaultJokeA = `Because the DAD JOKES API doesn't work!`;

let interval,
  nextJokeIn = 7;

// reveal the answer (remove blur)
const revealAnswer = function () {
  dadJokeAnswer.classList.remove("blurred");
  startJokeTimer();
};

// blur the answer
const hideAnswer = function () {
  dadJokeAnswer.classList.add("blurred");
};

const resetTimeLeft = function () {
  nextJokeIn = 4;
  timeLeft.textContent = 5;
};

// render the constructed joke
const renderJoke = function (question = defaultJokeQ, answer = defaultJokeA) {
  hideAnswer();

  dadJokeQuestion.textContent = question;
  dadJokeAnswer.textContent = answer;

  //   set the animation
  dadJoke.style.animationName = "dadJokeAnimate";

  //   set the "Next Joke In" to 5 seconds
  resetTimeLeft();
};

// construct the joke from the joke Object
const constructJoke = function (jokeObj) {
  const joke = jokeObj.joke.split("?");

  // check if the joke is a question or else get another joke
  if (joke.length < 2 || !joke[0] || !joke[1]) {
    getJoke();
    return;
  }

  // construct joke question and answer
  const jokeQ = `${joke[0].trim()}?`;
  const jokeA = `${joke[1].trim()}`;

  //   render joke
  renderJoke(jokeQ, jokeA);
};

// fetch the joke from API
const getJoke = async function () {
  const url = "https://icanhazdadjoke.com/";
  const options = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const jokeRes = await fetch(url, options);
    const jokeObj = await jokeRes.json();

    // send to construct the joke
    constructJoke(jokeObj);
  } catch (error) {
    // render the default joke

    // display the error
    console.warn(error);
  }
};

// stop the timer
const stopJokeTimer = function () {
  if (interval) {
    clearInterval(interval);
    timeLeft.style.animationName = "";
  }
};

// render time left (5, 4, 3, 2, etc...)
const renderTimeLeft = function () {
  // clear the interval when
  if (nextJokeIn < 0) {
    stopJokeTimer();

    // get the joke and render it
    getJoke();

    // end the function (otherwise it will print -1)
    return;
  }

  timeLeft.textContent = nextJokeIn;
  nextJokeIn--;
  timeLeft.style.animationName = "counterAnimate";
};

// start the timer
const startJokeTimer = function () {
  // stop existing interval
  stopJokeTimer();

  // call this when the answer is revealed
  interval = setInterval(renderTimeLeft, 1000);
};

// clicks handler
dadJokeContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "DIV") return;

  //   when clicked on the answer
  if (e.target.closest(".dad-joke__a")) revealAnswer();

  //   when next joke is clicked
  if (e.target.closest("BUTTON")) {
    stopJokeTimer();
    hideAnswer();
    getJoke();
  }
});
