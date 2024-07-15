"use strict";

// get movie container
const movieCardsContainer = document.querySelector(".movie-cards");

// get live movie cards
const movieCards = document.getElementsByClassName("movie-cards__card");

// store movie cards in an array later
let movieCardsArr;

// create movie cards and add it to the container
const createMovieCards = function (movies) {
  movies.forEach((movie) => {
    const movieCard = `
    <div class="movie-cards__card">
      <div class="card__image-container">
        <img
          class="card__image"
          src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
          alt="${movie.original_title} poster"
        />
      </div>
      <div class="card__details">
        <div class="card__details--meta">
          <p class="card__details__name">${movie.original_title}</p>
          <p class="card__details__date">${movie.release_date}</p>
        </div>
      <div class="card__details--rating">${movie.vote_average.toFixed(2)}</div>
      </div>
        <div class="card__plot card__plot--hidden">
          <p class="p">
            ${movie.overview}
          </p>
        </div>
    </div>`;

    movieCardsContainer.insertAdjacentHTML("beforeend", movieCard);
  });
};

// hide movie cards overview
const hideMoviePlots = function () {
  if (!movieCardsArr) return;

  movieCardsArr.forEach((card) => {
    card.querySelector(".card__plot").classList.add("card__plot--hidden");
  });
};

// request options
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2NjZDlhZDE2N2RhYjI2NzQ3YTBjZjBkNTE3Yzk3NyIsIm5iZiI6MTcyMDk1MTAzMS4yMjc0NDksInN1YiI6IjY2OTNhMDFmMWJkZDUwNjUxZjg4Y2VjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7TPgQqAtXlIwne09qf4nDuy1kDfN1sMJ0zA8jLbyATA",
    // education purpose only. Do not use this token for production.
  },
};

// get movie data from API
const getMovies = async function () {
  try {
    const res = await fetch(
      "https:api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity",
      options
    );

    const resJSON = await res.json();

    const movieData = resJSON.results;

    createMovieCards(movieData);
    movieCardsArr = [...movieCards];
  } catch (err) {
    console.error(err.message);
  }
};

getMovies();

// click event handler to reveal summaries
document.body.addEventListener("click", function (e) {
  if (!e.target.closest(".card__details")) {
    hideMoviePlots();
    return;
  }

  // hide overviews of all cards
  hideMoviePlots();

  // display overview of clicked card
  e.target
    .closest(".movie-cards__card")
    .querySelector(".card__plot")
    .classList.toggle("card__plot--hidden");
});
