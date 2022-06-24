const BASE_URL = `https://api.themoviedb.org/3/`;
const API_KEY = process.env.REACT_APP_ONLINE_MOVIE_DATABASE_API_KEY;
export const BASE_IMAGE_URL = `https://image.tmdb.org/t/p/w300`;
export const BACKDROP_URL = `https://image.tmdb.org/t/p/original`;

//MOVIES

export const fetchMovieByID = (movie_id) => {
  return fetch(
    `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
  ).then((res) => res.json());
};

export const fetchMovieTrailersByID = (movie_id) => {
  return fetch(
    `${BASE_URL}/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
  ).then((res) => res.json());
};

export const fetchMovieCreditsByID = (media_id) => {
  return fetch(`${BASE_URL}/movie/${media_id}/credits?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
};

//SHOWS

export const fetchShowByID = (show_id) => {
  return fetch(
    `${BASE_URL}/tv/${show_id}?api_key=${API_KEY}&language=en-US`
  ).then((res) => res.json());
};

export const fetchTVCreditsByID = (media_id) => {
  return fetch(`${BASE_URL}/tv/${media_id}/credits?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
};

//TRENDING

export const fetchAllTrending = (type = "movie", time = "day") => {
  console.log('poop',`${BASE_URL}trending/${type}/${time}?api_key=${API_KEY}`)
  return fetch(`${BASE_URL}/trending/${type}/${time}?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
};

//PERSON

export const fetchPersonByID = (person_id) => {
  return fetch(`${BASE_URL}/person/${person_id}?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
};
