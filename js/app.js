import ApiService from "./fetchApi.js";
import refs from "./refs.js";

const api = new ApiService();
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
let counter = 1;
let staticParam = null;

refs.btnList.addEventListener('click', onClickFilter);
refs.loadBtn.addEventListener('click', onClickLoadElse);

function onClickFilter(e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    const param = snakeCaseString(e.target.textContent);
    staticParam = param;

    if (param === param) {
        refs.filmList.innerHTML = '';
    }

    counter = 1;
    api.page = counter;
    
    api.fetchMovies(param)
    .then(data => {
        console.log(data);
        refs.loadBtn.classList.remove('visually-hidden');
        refs.filmList.insertAdjacentHTML('beforeend', renderListFilm(data));
    })
    .catch(err => console.log(err));
}

function onClickLoadElse() {
    counter += 1;
    api.page = counter;
    api.fetchMovies(staticParam)
    .then(data => {
        console.log(data);
        refs.filmList.insertAdjacentHTML('beforeend', renderListFilm(data));
    })
    .catch(err => console.log(err));
} 

function snakeCaseString(str) {
    return str.includes(' ') ?
    str.replace(' ', '_').toLowerCase() :
    str.toLowerCase();
}

function renderListFilm(data) {
    return data.results.map(el => {
        return `
        <li class="item">
          <div class="img">
            <img src="${IMG_URL}/${el.poster_path}" alt="${el.title}">
          </div>
          <div class="content">
            <div class="title-container">
              <h2 class="film-title">${el.title}</h2>
            </div>
            <p class="info"><span class="title-info">Rating:</span> ${el.vote_average}</p>
            <p class="info"><span class="title-info">Realease date:</span> ${el.release_date}</p>
          </div>
        </li>
        `;
    }).join('');
}