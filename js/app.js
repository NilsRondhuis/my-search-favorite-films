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
    handleActiveBtn(e.target);

    const param = snakeCaseString(e.target.textContent);
    staticParam = param;

    resetPage();
    resetCounter();

    api.fetchMovies(param)
    .then(data => {
        refs.filmList.insertAdjacentHTML('beforeend', renderListFilm(data));
        refs.loadBtn.classList.remove('visually-hidden');
    })
    .catch(handleError);
}

function onClickLoadElse() {
    incrementCounter(counter);
    handleDisabledBtn(refs.loadBtn);

    api.fetchMovies(staticParam)
    .then(data => {
        refs.filmList.insertAdjacentHTML('beforeend', renderListFilm(data));
        handleEnabledBtn(refs.loadBtn);
    })
    .catch(handleError);
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

function handleError(error) {
    console.log(error);
    resetPage();
}

function handleDisabledBtn(btn) {
    btn.disabled = true;
    btn.textContent = 'Loading...';
}

function handleEnabledBtn(btn) {
    btn.disabled = false;
    btn.textContent = 'Load More';
}

function resetCounter() {
    counter = 1;
    api.page = counter;
}

function incrementCounter() {
    counter += 1;
    api.page = counter;
}

function resetPage() {
    refs.loadBtn.classList.add('visually-hidden');
    refs.filmList.innerHTML = '';
}

function handleActiveBtn(target) {
    const isActiveBtn = document.querySelector('.active-btn');
    if (isActiveBtn) {
        isActiveBtn.classList.remove('active-btn')
    }
    target.classList.add('active-btn');
}