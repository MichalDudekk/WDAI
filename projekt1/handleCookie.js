const daneJSON = localStorage.getItem("bookmarkedMoviesIDs");
const bookmarkedMovies = daneJSON ? new Set(JSON.parse(daneJSON)) : new Set();

const toggleBookmark = (movieId, bookmarkElement) => {
    if (bookmarkedMovies.has(movieId)) {
        bookmarkedMovies.delete(movieId);
        bookmarkElement.classList.remove("bookmarked");
    } else {
        bookmarkedMovies.add(movieId);
        bookmarkElement.classList.add("bookmarked");
    }
    uppdateBookmarkedMoviesCookie();
};

const uppdateBookmarkedMoviesCookie = () => {
    const tab = Array.from(bookmarkedMovies);
    localStorage.setItem("bookmarkedMoviesIDs", JSON.stringify(tab));
};

export { toggleBookmark, bookmarkedMovies };
