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

let prevQuery = "";
const API_KEY = "TOP_SECRET";

async function handleSearchInput() {
    const query = document.getElementById("searchInput").value;
    if (query !== prevQuery) {
        prevQuery = query;
        const json = await searchMovies(query);
        console.log(json);
        const cardsContainer = document.getElementById("movieCards");
        cardsContainer.innerHTML = "";

        json.results.map((movie) => {
            const card = document.createElement("div");
            card.className = "card";
            const img = document.createElement("img");
            img.src = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "temp.png";
            const bottom = document.createElement("div");
            bottom.className = "card-bottom";
            const title = document.createElement("div");
            title.className = "title";
            title.innerText = `${movie.title} ⭐ ${
                Math.round(movie.vote_average * 10) / 10
            }`;
            const bookmark = document.createElement("div");
            bookmark.className = "bookmark";
            bookmark.innerText = "🧾";

            bottom.appendChild(title);
            bottom.appendChild(bookmark);
            card.appendChild(img);
            card.appendChild(bottom);
            cardsContainer.appendChild(card);
        });
    }
    setTimeout(handleSearchInput, 1000);
}

handleSearchInput();
