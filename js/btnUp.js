import refs from "./refs.js";

window.addEventListener('scroll', getScrollPageY);
refs.btnUp.addEventListener('click', onClickUp);

function getScrollPageY() {
    const rect = document.body.getBoundingClientRect();

    rect.y < -1000 ?
    refs.btnUp.classList.remove('visually-hidden') :
    refs.btnUp.classList.add('visually-hidden'); 
}

function onClickUp() {
    document.body.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
    });
}
