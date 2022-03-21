export default class ApiService {
    BASE_URL = 'https://api.themoviedb.org/3';
    #page = 1;

    fetchMovies(param) {
        const queryParams = new URLSearchParams({
            api_key: '288d413468bcdb13681c080a523b13ad',
            // language: 'ru-RU',
            page: this.#page,
        });

        return fetch(`${this.BASE_URL}/movie/${param}?${queryParams}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(new Error('Something went wrong'));
        });
    }

    set page(newPage) {
        this.#page = newPage;
    }
}