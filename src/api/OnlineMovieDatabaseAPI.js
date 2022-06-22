const BASE_URL = `https://api.themoviedb.org/3/`;
const API_KEY = process.env.REACT_APP_ONLINE_MOVIE_DATABASE_API_KEY;

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

export const fetchMovieByID = (movie_id) => {
  return fetch(
    `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
  ).then((res) => res.json());
};

export const fetchAllTrending = (type = "movie", time = "day") => {
  return fetch(
    `https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${API_KEY}`
  ).then((res) => res.json());
};
