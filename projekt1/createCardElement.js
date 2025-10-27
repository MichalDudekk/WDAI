import { toggleBookmark, bookmarkedMovies } from "./handleCookie.js";

const createCardElement = (movie) => {
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

    title.innerText = `${movie.title} ⭐ ${(
        Math.round(movie.vote_average * 10) / 10
    ).toFixed(1)}`;

    const bookmark = document.createElement("div");
    bookmark.className = "bookmark";
    bookmark.innerHTML = `  <svg viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19 3H5c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
                                />
                            </svg>`;
    bookmark.addEventListener("click", () => {
        toggleBookmark(movie.id, bookmark);
    });
    if (bookmarkedMovies.has(movie.id)) bookmark.classList.add("bookmarked");

    bottom.appendChild(title);
    bottom.appendChild(bookmark);
    card.appendChild(img);
    card.appendChild(bottom);
    return card;
};

export default createCardElement;
