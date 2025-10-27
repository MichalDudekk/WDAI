import API_KEY from "./API_KEY.js";
import createCardElement from "./createCardElement.js";
import { bookmarkedMovies } from "./handleCookie.js";

async function displayBookmarkedMovies() {
    const cardsContainer = document.getElementById("movieCards");
    if (bookmarkedMovies.size === 0) {
        const message = document.createElement("div");
        message.classList.add("message");
        message.innerHTML =
            "<p>It looks like you haven't bookmarked any movies yet.</p>";
        cardsContainer.classList.remove("cards");
        cardsContainer.appendChild(message);
        return;
    }

    for (const movieId of bookmarkedMovies) {
        const url = `https://api.themoviedb.org/3/movie/${movieId}`;
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
            const card = createCardElement(data);
            cardsContainer.appendChild(card);
        } catch (err) {
            console.error(err);
            return;
        }
    }
}

displayBookmarkedMovies();
