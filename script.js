const searchField = document.querySelector('.search-field');
const searchInput = document.getElementById('search');
const container = document.querySelector('.container');

const imageUrl = 'https://image.tmdb.org/t/p/w500';
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${CONFIG.API_KEY}&query=`;
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${CONFIG.API_KEY}&sort_by=popularity.desc&page=1`;

function displayMovies(movies) {
  container.innerHTML = '';
  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img
      src="${imageUrl}${poster_path}"
      alt="${title}"
        class="movie__image"
      />
      <div class="movie__info">
        <span class="movie__info__title">${title}</span>
        <span class="movie__info__rating ${getClassByVoteRate(
          vote_average
        )}">${vote_average}</span>
      </div>
      <div class="movie__overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;
    container.append(movieEl);
  });
}

function getClassByVoteRate(voteRate) {
  if (voteRate >= 8) {
    return 'green';
  } else if (voteRate >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
  } catch (err) {
    console.log(err);
  }
}

searchField.addEventListener('submit', e => {
  e.preventDefault();
  searchTerm = searchInput.value.trim();
  if (searchTerm) {
    getMovies(`${searchUrl}${searchTerm}`);
    searchInput.value = '';
  }
});

getMovies(apiUrl);
