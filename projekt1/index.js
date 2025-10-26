import createCardElement from "./createCardElement.js";

async function searchMovies(query) {
    if (query === "") {
        return { results: [] };
    }
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(
                `Błąd sieci: Status ${response.status} ${response.statusText}`
            );
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return { results: [] };
    }
}

async function handleSearchInput() {
    const query = document.getElementById("searchInput").value;
    if (query !== prevQuery) {
        prevQuery = query;
        const json = await searchMovies(query);
        console.log(json);
        const cardsContainer = document.getElementById("movieCards");
        cardsContainer.innerHTML = "";

        json.results.map((movie) => {
            const card = createCardElement(movie);
            cardsContainer.appendChild(card);
        });
    }
    setTimeout(handleSearchInput, 1000);
}

let prevQuery = "";
const API_KEY = "TOP_SECRET";
// daj do json

handleSearchInput();
